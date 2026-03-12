import React, { useEffect, useState } from 'react'
import { getUser } from "../service/loginService.js";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {updateEmail, updateId, updateImage, updateUser} from "../redux/userDetails/userDetail.js";

const Authcheck = ({ children}) => {

    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const {email,name} = useSelector((state) => state.userData.user);

    const getInfo = async () => {
        try {
            const userData = await getUser();
            if (userData && userData.name && userData.email) {
                dispatch(updateUser(userData.name));
                dispatch(updateEmail(userData.email));
                dispatch(updateId(userData.id));
                dispatch(updateImage(userData.image));
            }
            setLoading(false);
        } catch (error) {
            dispatch(updateUser(""));
            dispatch(updateEmail(""));
            dispatch(updateId(""));
            dispatch(updateImage(""));
            setLoading(false);
        }
    }

    useEffect(() => {
        getInfo();
    }, []);

    if (loading) return null;

    if (email && name) {
        return children;
    } else {
        return <Navigate to="/" />;
    }
}

export default Authcheck;