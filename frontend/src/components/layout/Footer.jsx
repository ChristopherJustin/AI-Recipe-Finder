import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-black/20 backdrop-blur-xl relative text-white">

            {/* Glass background */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-xl -z-10" />
            <div className="absolute inset-0 border-t border-white/10 -z-10" />

            <div className="mx-auto max-w-7xl px-6 py-16">

                {/* TOP */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-sm">

                    {/* BRAND */}
                    <div className="col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-xl">🍳</span>
                            <span className="font-semibold text-lg tracking-tight">
                                Recipe Finder
                            </span>
                        </div>
                        <p className="text-gray-400 max-w-sm">
                            Discover recipes from ingredients you already have —
                            powered by AI.
                        </p>
                    </div>

                    {/* COMPANY */}
                    <div>
                        <p className="mb-3 font-medium">Company</p>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link to="/about" className="hover:text-white">About</Link></li>
                            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                        </ul>
                    </div>

                    {/* PRODUCT */}
                    <div>
                        <p className="mb-3 font-medium">Product</p>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link to="/" className="hover:text-white">AI Recipes</Link></li>
                            <li><Link to="/recipes" className="hover:text-white">Browse Recipes</Link></li>
                            <li><Link to="/saved" className="hover:text-white">Saved</Link></li>
                        </ul>
                    </div>
                </div>

                {/* BOTTOM */}
                <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">

                    <span>
                        © {new Date().getFullYear()} Recipe Finder. All rights reserved.
                    </span>

                    <div className="flex items-center gap-4">
                        <a href="/contact" className="hover:text-white transition">Email</a>
                        <a href="https://github.com/ChristopherJustin" className="hover:text-white transition">GitHub</a>
                    </div>
                </div>
                <div></div>
            </div>
        </footer>
    );
}
