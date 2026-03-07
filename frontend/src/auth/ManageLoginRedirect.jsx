import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../service/loginService.js";
import {updateEmail, updateUser} from "../redux/userDetails/userDetail.js";
import {Navigate} from "react-router-dom";

const ManageLoginRedirect = ({children}) => {

    const [loadingM, setLoadingM] = useState(true);
    const dispatch = useDispatch();

    const {email,name} = useSelector((state) => state.userData.user);

    const getInfo = async () => {
        try {
            const userData = await getUser();
            if (userData && userData.name && userData.email) {
                dispatch(updateUser(userData.name));
                dispatch(updateEmail(userData.email));
            }
            setLoadingM(false);
        } catch (error) {
            dispatch(updateUser(""));
            dispatch(updateEmail(""));
            setLoadingM(false);
        }
    }

    useEffect(() => {
        getInfo();
    }, []);

    if (loadingM) return null;

    if (email && name) {
        return <Navigate to="/dashboard" />;
    } else {
        return children;
    }
}
export default ManageLoginRedirect
