import {React, useState} from 'react'
import {createUser, loginUser, getUser} from "../service/loginService.js";
import {useDispatch} from "react-redux";
import {updateEmail, updateUser} from "../redux/userDetails/userDetail.js";
import toast from "react-hot-toast";

const LoginPopUp = ({onClick}) => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })
    const [registrationData, setRegistrationData] = useState({
        email: "",
        password: "",
        name: ""
    })
    const handleChange = e => {
        if (isLogin) {
            setLoginData({...loginData, [e.target.name]: e.target.value});
        }else{
            setRegistrationData({...registrationData, [e.target.name]: e.target.value});
        }
    }

    const handleRegistration = async (e) => {
        e.preventDefault();
        setLoading(true);

        const {message, status} = await createUser(registrationData);

        if (status === 200) {
            toast.success(message);
        }else{
            toast.error(message);
        }

        setLoading(false);

        if (status === 'success') {
            const userData = await getUser();
            if (userData && userData.name) {
                dispatch(updateUser(userData.name));
                dispatch(updateEmail(userData.email));
            }
            onClick();
        }

        setRegistrationData({
            email: "",
            password: "",
            name: ""
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const {message, status} = await loginUser(loginData);

        if (status === 'success' ) {
            toast.success(message);
        }else{
            toast.error(message);
        }

        setLoading(false);

        if (status === 'success') {
            const userData = await getUser();
            if (userData && userData.name) {
                dispatch(updateUser(userData.name));
                dispatch(updateEmail(userData.email));
            }
            onClick();
        }

        setLoginData({
            email: "",
            password: "",
        })
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center text-white">

            {/* Dark Blur Background */}

            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Modal */}

            <div className="relative w-full max-w-md p-[1px] rounded-2xl bg-gradient-to-br from-emerald-500/30 via-green-500/20 to-transparent">

                <div className="bg-[#07130f] backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10">

                    {/* Close Button */}

                    <button
                        onClick={onClick}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
                    >
                        ✕
                    </button>

                    {/* Title */}

                    <h2 className="text-2xl font-bold text-center mb-6 text-emerald-400">
                        {isLogin ? "Login to CodeLive" : "Create Your Account"}
                    </h2>

                    <form
                        className="space-y-4"
                        onSubmit={isLogin ? handleLogin : handleRegistration}
                    >

                        {/* Name */}

                        {!isLogin && (
                            <input
                                type="text"
                                placeholder="Full Name"
                                name="name"
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-[#0b1a14] border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        )}

                        {/* Email */}

                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={isLogin ? loginData.email : registrationData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-[#0b1a14] border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />

                        {/* Password */}

                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={isLogin ? loginData.password : registrationData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-[#0b1a14] border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />

                        {/* Submit */}

                        <button
                            type="submit"
                            className="w-full py-3 cursor-pointer rounded-lg font-semibold bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 transition"
                        >
                            {isLogin ? (loading ? "Login..." : "Login") : (loading ? "Registration..." : "Registration")}
                        </button>

                    </form>

                    {/* Toggle */}

                    <p className="text-center text-sm mt-5 text-gray-400">

                        {isLogin ? (
                            <>
                                Don’t have an account?{" "}
                                <button
                                    onClick={() => setIsLogin(false)}
                                    className="text-emerald-400 hover:text-emerald-300"
                                >
                                    Registration
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <button
                                    onClick={() => setIsLogin(true)}
                                    className="text-emerald-400 hover:text-emerald-300"
                                >
                                    Login
                                </button>
                            </>
                        )}

                    </p>

                </div>

            </div>

        </div>
    )
}
export default LoginPopUp
