import React from 'react'
import HomePage from "./pages/HomePage.jsx";
import {Route, Routes} from "react-router-dom";
import ProblemsPage from "./pages/ProblemsPage.jsx";
import Authcheck from "./auth/Authcheck.jsx";
import {Toaster} from "react-hot-toast";
import DashboardPage from "./pages/DashboardPage.jsx";
import ManageLoginRedirect from "./auth/ManageLoginRedirect.jsx";
import ProblemPage from "./pages/ProblemPage.jsx";
import SessionPage from "./pages/SessionPage.jsx";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<ManageLoginRedirect><HomePage /></ManageLoginRedirect>} />
                <Route path="/problems" element={<Authcheck><ProblemsPage /></Authcheck>}/>
                <Route path="/problem/:id" element={<Authcheck><ProblemPage /></Authcheck>}/>
                <Route path="/session/:id" element={<Authcheck><SessionPage /></Authcheck>}/>
                <Route path="/dashboard" element={<Authcheck><DashboardPage /></Authcheck>}/>
            </Routes>
            <Toaster/>
        </>
    )
}
export default App
