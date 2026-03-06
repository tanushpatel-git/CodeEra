import React from 'react'
import HomePage from "./pages/HomePage.jsx";
import {Route, Routes} from "react-router-dom";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />}/>
            </Routes>
        </div>
    )
}
export default App
