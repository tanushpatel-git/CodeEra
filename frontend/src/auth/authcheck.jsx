import React, { useEffect, useState } from 'react'
import { getUser } from "../service/loginService.js";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateEmail, updateUser } from "../redux/userDetails/userDetail.js";

const Authcheck = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const user = useSelector((state) => state.userData.user);

    const getInfo = async () => {
        try {
            const { email, name } = await getUser();
            dispatch(updateUser(name));
            dispatch(updateEmail(email));
        } catch (error) {
            dispatch(updateUser(""));
            dispatch(updateEmail(""));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getInfo();
    }, []);

    if (loading) return <div>Loading...</div>;

    if (user.email) {
        return children;
    } else {
        return <Navigate to="/" />;
    }
}

export default Authcheck;