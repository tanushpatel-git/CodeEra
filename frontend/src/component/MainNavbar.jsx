import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getUser, logOutUser} from "../service/loginService.js";
import {updateEmail, updateId, updateImage, updateUser} from "../redux/userDetails/userDetail.js";
import toast from "react-hot-toast";
import {Link} from "react-router-dom";

const MainNavbar = () => {

    const {email: emailM, name: nameM} = useSelector(stateM => stateM.userData?.user );
    const dispatchM = useDispatch();

    const getInfo = async () => {
        try {
            const userData = await getUser();
            if (userData && userData.name) {
                dispatchM(updateUser(userData.name));
                dispatchM(updateEmail(userData.email));
                dispatchM(updateId(userData.id));
                dispatchM(updateImage(userData.image));
            } else {
                dispatchM(updateUser(""));
                dispatchM(updateEmail(""));
                dispatchM(updateId(""));
                dispatchM(updateImage(""));
            }
        } catch (error) {
            dispatchM(updateUser(""));
            dispatchM(updateEmail(""));
            dispatchM(updateId(""));
            dispatchM(updateImage(""));
        }
    }

    useEffect(() => {
        if (emailM === "" && nameM === "") {
            getInfo()
        }
    }, [])

    return (<>
        <nav className="relative top-6 left-1/2 -translate-x-1/2 z-50 w-[70vw]">

            <div className="flex justify-between items-center gap-10 px-10 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg text-white">

          <span className="font-bold text-lg tracking-wide">
            <Link to="/dashboard">CodeStudio</Link>
          </span>


                <ul className="flex gap-10 ">
                    <Link to="/dashboard" className="text-white hover:opacity-100 opacity-70">DashBoard</Link>
                    <Link to="/problems" className="text-white hover:opacity-100 opacity-70">Problems</Link>
                </ul>


                <button
                    onClick={async () => {
                        const {message, status} = await logOutUser();
                        dispatchM(updateUser(""));
                        dispatchM(updateEmail(""));
                        dispatchM(updateId(""));
                        dispatchM(updateImage(""));
                        status === "success" ? toast.success(message) : toast.error(message)
                    }}
                    className="px-5 py-1.5 rounded-full active:scale-95 cursor-pointer bg-green-600 hover:bg-red-600 transition-all duration-300 text-white text-sm font-semibold">
                    Log out
                </button>

            </div>
        </nav>
    </>)
}
export default MainNavbar
