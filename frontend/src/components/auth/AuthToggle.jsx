export default function AuthToggle({
    isSignup,
    onToggle,
}) {
    return (
        <p>
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
                type="button"
                onClick={onToggle}
                className="cursor-pointer text-red-500 hover:text-red-600 underline underline-offset-4 font-medium transition"
            >
                {isSignup ? "Login" : "Sign Up"}
            </button>
        </p>
    )
}