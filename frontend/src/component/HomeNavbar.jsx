import React, {useEffect, useState} from 'react'
import LoginPopUp from "./LoginPopUp.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getUser, logOutUser} from "../service/loginService.js";
import {updateEmail, updateUser} from "../redux/userDetails/userDetail.js";
import toast from "react-hot-toast";

const HomeNavbar = () => {

    const [isLogin, setIsLogin] = useState(false);
    const {email, name} = useSelector(state => state.userData.user);
    const dispatch = useDispatch();

    const getInfo = async () => {
        try {
            const userData = await getUser();
            if (userData && userData.name) {
                dispatch(updateUser(userData.name));
                dispatch(updateEmail(userData.email));
            } else {
                dispatch(updateUser(""));
                dispatch(updateEmail(""));
            }
        } catch (error) {
            dispatch(updateUser(""));
            dispatch(updateEmail(""));
        }
    }

    useEffect(() => {
        if (email === "" && name === "") {
            getInfo()
        }
    }, [])

    return (<>
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[70vw]">

            <div className="flex items-center justify-between gap-10 px-10 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg text-white">

          <span className="font-bold text-lg tracking-wide">
            CodeStudio
          </span>

                {email === "" ? <button
                    onClick={() => {
                        setIsLogin(!isLogin)
                    }}
                    className="px-5 py-1.5 rounded-full bg-white text-blue-700 text-sm font-semibold">
                    Login
                </button> : null}
                {email !== "" ? <button
                    onClick={async () => {
                        const {message, status} = await logOutUser();
                        dispatch(updateUser(""));
                        dispatch(updateEmail(""));
                        status === "success" ? toast.success(message) : toast.error(message)
                    }}
                    className="px-5 py-1.5 rounded-full bg-white text-blue-700 text-sm font-semibold">
                    Log out
                </button> : null}

            </div>
        </nav>
        {isLogin ? <LoginPopUp onClick={() => setIsLogin(!isLogin)}/> : null}
    </>)
}
export default HomeNavbar
