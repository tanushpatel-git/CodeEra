import {React,useState} from 'react'

const LoginPopUp = ({onClick}) => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center text-black">
            {/* Dim Background */}
            <div
                className="absolute inset-0 bg-black opacity-75"
            />

            {/* Modal */}
            <div className="relative w-full max-w-md bg-white p-8 rounded-xl shadow-lg z-10">
                {/* Close Button */}
                <button
                    onClick={onClick}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold text-center mb-6">
                    {isLogin ? "Login" : "Create Account"}
                </h2>

                <form className="space-y-4">
                    {/* Name (Register only) */}
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    )}

                    {/* Email */}
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Password */}
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        {isLogin ? "Login" : "Register"}
                    </button>
                </form>

                {/* Toggle */}
                <p className="text-center text-sm mt-4">
                    {isLogin ? (
                        <>
                            Don’t have an account?{" "}
                            <button
                                onClick={() => setIsLogin(false)}
                                className="text-blue-600 hover:underline"
                            >
                                Register
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <button
                                onClick={() => setIsLogin(true)}
                                className="text-blue-600 hover:underline"
                            >
                                Login
                            </button>
                        </>
                    )}
                </p>
            </div>
        </div>
    )
}
export default LoginPopUp
