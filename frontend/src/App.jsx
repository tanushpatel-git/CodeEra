import React from 'react'
import HomePage from "./pages/HomePage.jsx";
import {Route, Routes} from "react-router-dom";
import ProblemPage from "./pages/ProblemPage.jsx";
import Authcheck from "./auth/Authcheck.jsx";
import {Toaster} from "react-hot-toast";
import DashboardPage from "./pages/DashboardPage.jsx";
import ManageLoginRedirect from "./auth/ManageLoginRedirect.jsx";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<ManageLoginRedirect><HomePage /></ManageLoginRedirect>} />
                <Route path="/problems" element={<Authcheck redirect="/"><ProblemPage /></Authcheck>}/>
                <Route path="/dashboard" element={<Authcheck redirect="/"><DashboardPage /></Authcheck>}/>
            </Routes>
            <Toaster/>
        </>
    )
}
export default App
