import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import useAuth from "../../hooks/useAuth"

export default function ProfileDropdown() {
    const [open, setOpen] = useState(false)
    const menuRef = useRef(null)

    const { user, logout } = useAuth()
    const queryClient = useQueryClient()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleLogout = () => {
        logout()
        queryClient.clear()
        setOpen(false)
    }

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 transition"
            >
                <span className="hidden sm:inline">
                    {user?.name || user?.email || "Profile"}
                </span>
                <span>▾</span>
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-zinc-900 shadow-xl overflow-hidden z-50">
                    <div className="border-b border-white/10 px-4 py-3">
                        <p className="text-sm font-medium text-white">
                            {user?.name || "My Account"}
                        </p>
                        <p className="text-xs text-gray-300 break-all">
                            {user?.email}
                        </p>
                    </div>

                    <div className="py-1">
                        <Link
                            to="/profile"
                            onClick={() => setOpen(false)}
                            className="block px-4 py-3 text-sm text-gray-200 hover:bg-white/10 transition"
                        >
                            My Profile
                        </Link>

                        <Link
                            to="/saved"
                            onClick={() => setOpen(false)}
                            className="block px-4 py-3 text-sm text-gray-200 hover:bg-white/10 transition"
                        >
                            Saved Recipes
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-white/10 transition"
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}