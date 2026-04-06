from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
import smtplib
from email.message import EmailMessage
import logging
from time import time

from app.core.config import settings

router = APIRouter()
logger = logging.getLogger(__name__)

LAST_REQUEST = {}


class ContactRequest(BaseModel):
    email: EmailStr
    subject: str
    message: str


@router.post("/contact")
def send_contact_email(data: ContactRequest):
    if not settings.email_from or not settings.email_to or not settings.email_password:
        raise HTTPException(status_code=500, detail="Email configuration is missing")

    try:
        client_ip = "global"
        now = time()

        if client_ip in LAST_REQUEST and now - LAST_REQUEST[client_ip] < 5:
            raise HTTPException(status_code=429, detail="Too many requests")

        LAST_REQUEST[client_ip] = now

        msg = EmailMessage()
        msg["From"] = settings.email_from
        msg["To"] = settings.email_to
        msg["Subject"] = f"Contact Form: {data.subject}"

        msg.set_content(
            f"""
New Contact Form Submission

From: {data.email}
Subject: {data.subject}

Message:
{data.message}
"""
        )

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(settings.email_from, settings.email_password)
            smtp.send_message(msg)

        return {"message": "Email sent successfully"}

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Email send failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to send email")