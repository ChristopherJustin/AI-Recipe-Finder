import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

import useAuth from "../hooks/useAuth"
import { loginUser, registerUser } from "../api/authApi"

import AuthForm from "../components/auth/AuthForm"
import AuthToggle from "../components/auth/AuthToggle"

export default function Login() {
    const [isSignup, setIsSignup] = useState(false)
    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { login } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        try {
            const data = isSignup
                ? await registerUser({
                    name,
                    phone_number: phoneNumber,
                    email,
                    password,
                })
                : await loginUser({
                    email,
                    password,
                })

            login(data)
            queryClient.clear()
            navigate("/")
        } catch (err) {
            const message =
                err.response?.data?.detail?.[0]?.msg ||
                err.response?.data?.detail ||
                "Authentication failed"

            setError(typeof message === "string" ? message : "Authentication failed")
        }
    }

    const handleToggle = () => {
        setIsSignup((prev) => !prev)
        setError("")
    }

    return (
        <div className="min-h-screen bg-purple text-white">
            <section className="pt-20 min-h-screen flex flex-col items-center justify-center text-center px-6">
                <div className="w-full max-w-5xl rounded-3xl bg-zinc-900/30 backdrop-blur-xl shadow-2xl p-8 space-y-6">
                    <h1 className="text-4xl font-bold text-center">
                        {isSignup ? "Sign Up" : "Log In"}
                    </h1>

                    <AuthForm
                        isSignup={isSignup}
                        name={name}
                        setName={setName}
                        phoneNumber={phoneNumber}
                        setPhoneNumber={setPhoneNumber}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        onSubmit={handleSubmit}
                    />

                    {error && <p className="text-red-500">{error}</p>}

                    <AuthToggle
                        isSignup={isSignup}
                        onToggle={handleToggle}
                    />
                </div>
            </section>
        </div>
    )
}

