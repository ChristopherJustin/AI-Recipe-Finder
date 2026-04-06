import { useState } from "react"
import { sendContactMessage } from "../api/contactApi"

export default function Contact() {
    const [form, setForm] = useState({
        email: "",
        subject: "",
        message: ""
    })

    const [status, setStatus] = useState("")
    const [error, setError] = useState("")
    const [isSending, setIsSending] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSending(true)
        setStatus("")
        setError("")

        try {
            await sendContactMessage(form)
            setStatus("✅ Message sent successfully!")
            setForm({ email: "", subject: "", message: "" })
        } catch (err) {
            const message =
                err.response?.data?.detail || "❌ Failed to send message."
            setError(message)
        } finally {
            setIsSending(false)
        }
    }

    return (
        <div className="min-h-screen bg-purple text-white">
            <section className="pt-24 pb-40 relative min-h-screen flex justify-center px-6">
                <div className="w-full max-w-xl rounded-3xl bg-zinc-900/30 backdrop-blur-xl shadow-2xl p-8 space-y-6">
                    <h1 className="text-4xl font-bold text-center">
                        Contact Me
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Your email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl bg-black/10 px-4 py-3 outline-none"
                        />

                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            value={form.subject}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl bg-black/10 px-4 py-3 outline-none"
                        />

                        <textarea
                            name="message"
                            placeholder="Your message"
                            rows={5}
                            value={form.message}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl bg-black/10 px-4 py-3 outline-none resize-none"
                        />

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={isSending}
                                className="cursor-pointer px-6 py-3 rounded-xl bg-white/90 text-black font-medium hover:bg-gray-200 transition disabled:opacity-60"
                            >
                                {isSending ? "Sending..." : "Send Message"}
                            </button>
                        </div>
                    </form>

                    {status && (
                        <p className="text-center text-sm text-green-300">
                            {status}
                        </p>
                    )}

                    {error && (
                        <p className="text-center text-sm text-red-300">
                            {error}
                        </p>
                    )}
                </div>
            </section>
        </div>
    )
}
