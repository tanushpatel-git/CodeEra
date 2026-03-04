import React from 'react'

const Navbar = () => {
    return (
        <nav className="w-full flex items-center justify-center mt-5">
            <div className=" w-[80vw] px-8 py-4 flex items-center justify-between bg-slate-900 rounded-full">
                {/*logo of the navbar*/}
                <h1 className="text-2xl font-bold text-white">
                    CodeEra
                </h1>

                {/* Login Button */}
                <button className="bg-sky-400 text-slate-900 px-5 py-2 rounded-full font-medium hover:bg-sky-500 hover:text-white transition">
                    Login
                </button>
            </div>
        </nav>
    )
}
export default Navbar
