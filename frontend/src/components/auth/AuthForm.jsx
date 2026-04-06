export default function AuthForm({
    isSignup,
    name,
    setName,
    phoneNumber,
    setPhoneNumber,
    email,
    setEmail,
    password,
    setPassword,
    onSubmit,
}) {
    return (
        <form onSubmit={onSubmit} className="flex flex-col items-center space-y-4">

            {isSignup && (
                <>
                    <input
                        className="w-full max-w-md rounded-xl bg-black/10 p-4 text-white placeholder-gray-300 outline-none border border-white/10 focus:border-white/30 transition"
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        className="w-full max-w-md rounded-xl bg-black/10 p-4 text-white placeholder-gray-300 outline-none border border-white/10 focus:border-white/30 transition"
                        type="tel"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </>
            )}

            <input
                className="w-full max-w-md rounded-xl bg-black/10 p-4 text-white placeholder-gray-300 outline-none border border-white/10 focus:border-white/30 transition"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <input
                className="w-full max-w-md rounded-xl bg-black/10 p-4 text-white placeholder-gray-300 outline-none border border-white/10 focus:border-white/30 transition"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <button
                type="submit"
                className="cursor-pointer mt-2 bg-white/90 text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
            >
                {isSignup ? "Create Account" : "Login"}
            </button>
        </form>
    )
}