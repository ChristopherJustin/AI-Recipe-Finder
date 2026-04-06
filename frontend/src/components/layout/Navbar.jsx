import { Link, useLocation } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import ProfileDropdown from "./ProfileDropdown"

export default function Navbar() {
    const location = useLocation()
    const { isAuthenticated } = useAuth()

    const navigation = [
        { name: "Home", href: "/" },
        { name: "Browse Recipes", href: "/recipes" },
        { name: "Contact", href: "/contact" },
        { name: "About", href: "/about" },
        // { name: "Pantry", href: "/pantry" },
        // { name: "Meal Planner", href: "/meal-planner" },
    ]

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10 text-white">
            <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
                <Link to="/" className="text-xl font-semibold tracking-tight hover:opacity-80">
                    🍳 Recipe Finder
                </Link>

                <div className="hidden md:flex space-x-6 text-sm">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={`transition ${location.pathname === item.href
                                    ? "text-white"
                                    : "text-gray-300 hover:text-white"
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4 text-sm">
                    {!isAuthenticated ? (
                        <Link
                            to="/login"
                            className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
                        >
                            Log in
                        </Link>
                    ) : (
                        <ProfileDropdown />
                    )}
                </div>
            </div>
        </nav>
    )
}