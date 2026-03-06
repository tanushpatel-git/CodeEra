import {React, useState} from 'react'
import {createUser, loginUser, getUser} from "../../service/loginService.js";
import {useDispatch} from "react-redux";
import {updateEmail, updateUser} from "../../redux/userDetails/userDetail.js";

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

        alert(message);

        setLoading(false);

        if (status === 'success') {
            const userData = await getUser();
            if (userData && userData.data) {
                dispatch(updateUser(userData.data.name));
                dispatch(updateEmail(userData.data.email));
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

        alert(message);

        setLoading(false);

        if (status === 'success') {
            const userData = await getUser();
            if (userData && userData.data) {
                dispatch(updateUser(userData.data.name));
                dispatch(updateEmail(userData.data.email));
            }
            onClick();
        }

        setLoginData({
            email: "",
            password: "",
        })
    }

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

                <form
                    className="space-y-4"
                    onSubmit={isLogin ? handleLogin : handleRegistration}
                >
                    {/* Name (Register only) */}
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Full Name"
                            onChange={handleChange}
                            name="name"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    )}

                    {/* Email */}
                    <input
                        type="email"
                        placeholder="Email Address"
                        onChange={handleChange}
                        value={isLogin ? loginData.email : registrationData.email}
                        name="email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Password */}
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={isLogin ? loginData.password : registrationData.password}
                        onChange={handleChange}
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
                                onClick={()=>setIsLogin(false)}
                                className="text-blue-600 hover:underline"
                            >
                                {loading ? "Registration....." : "Register"}
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <button
                                onClick={()=>setIsLogin(true)}
                                className="text-blue-600 hover:underline"
                            >
                                {loading ? "Login....." : "Login"}
                            </button>
                        </>
                    )}
                </p>
            </div>
        </div>
    )
}
export default LoginPopUp
