import { useState } from "react"

export default function ChangePasswordForm({ onSubmit, isSaving }) {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage("")
        setError("")

        if (newPassword.length < 8) {
            setError("New password must be at least 8 characters")
            return
        }

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match")
            return
        }

        if (currentPassword === newPassword) {
            setError("New password must be different from current password")
            return
        }

        try {
            await onSubmit({
                current_password: currentPassword,
                new_password: newPassword,
            })

            setMessage("Password updated successfully")
            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
        } catch (err) {
            const msg =
                err.response?.data?.detail || "Failed to update password"
            setError(msg)
        }
    }

    return (
        <div className="rounded-2xl bg-zinc-900/30 backdrop-blur-xl shadow-xl p-6 space-y-5">
            <div>
                <h2 className="text-2xl font-semibold">Security</h2>
                <p className="text-sm text-gray-300 mt-1">
                    Update your password to keep your account secure.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Current Password"
                    className="w-full rounded-xl bg-black/10 border border-white/10 px-4 py-3 text-white placeholder-gray-300 outline-none focus:border-white/30 transition"
                    required
                />

                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                    className="w-full rounded-xl bg-black/10 border border-white/10 px-4 py-3 text-white placeholder-gray-300 outline-none focus:border-white/30 transition"
                    required
                />

                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm New Password"
                    className="w-full rounded-xl bg-black/10 border border-white/10 px-4 py-3 text-white placeholder-gray-300 outline-none focus:border-white/30 transition"
                    required
                />

                <p className="text-xs text-gray-300">
                    Password must be at least 8 characters.
                </p>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="bg-white text-black px-5 py-2 rounded-lg font-medium hover:bg-gray-200 transition disabled:opacity-60"
                    >
                        {isSaving ? "Updating..." : "Change Password"}
                    </button>
                </div>
            </form>

            {message && <p className="text-sm text-green-300">{message}</p>}
            {error && <p className="text-sm text-red-400">{error}</p>}
        </div>
    )
}