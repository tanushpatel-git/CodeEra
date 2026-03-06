import React, {useEffect, useState} from 'react'
import LoginPopUp from "./LoginPopUp.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getUser, logOutUser} from "../../service/loginService.js";
import {updateEmail, updateUser} from "../../redux/userDetails/userDetail.js";

const Navbar = () => {

    const [isLogin, setIsLogin] = useState(false);
    const {email} = useSelector(state => state.userData.user);
    const dispatch = useDispatch();

    const getInfo = async () => {
        try {
            const userData = await getUser();
            if (userData && userData.data) {
                dispatch(updateUser(userData.data.name));
                dispatch(updateEmail(userData.data.email));
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
        if (email === "") {
            getInfo()
        }
    },[])

    return (
        <>
            <nav className="w-full flex items-center justify-center fixed top-5">
                <div className=" w-[80vw] px-8 py-4 flex items-center justify-between bg-slate-800 rounded-full">
                    {/*logo of the navbar*/}
                    <h1 className="text-2xl font-bold text-white">
                        CodeEra
                    </h1>

                    {/* Login Button */}
                    {email === "" ? <button
                        onClick={() => {
                            setIsLogin(!isLogin)
                        }
                    }
                        className="bg-sky-400 text-slate-900 px-5 py-2 rounded-full font-medium hover:bg-sky-500 hover:text-white transition">
                        Login
                    </button> : null}
                    {email !== "" ? <button
                        onClick={async () => {
                            const {message} = await logOutUser();
                            dispatch(updateUser(""));
                            dispatch(updateEmail(""));
                            alert(message);
                        }}
                        className="bg-red-400 text-slate-900 px-5 py-2 rounded-full font-medium hover:bg-red-500 hover:text-white transition">
                        Log out
                    </button> : null}
                </div>
            </nav>
            {isLogin ? <LoginPopUp onClick={()=>setIsLogin(!isLogin)}/> : null}
        </>
    )
}
export default Navbar
