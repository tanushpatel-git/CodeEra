import React from 'react'
import {useSelector} from "react-redux";
import {ArrowRightIcon, SparklesIcon, ZapIcon} from "lucide-react";

const WelcomeSection = ({onCreateSession}) => {


    const {name} = useSelector(state => state.userData.user);

    return (
        <div className="relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-40"></div>

            <div className="relative max-w-7xl mx-auto px-6 py-16">
                <div className="flex items-center justify-between gap-10">

                    {/* Left */}
                    <div>
                        <div className="flex items-center gap-4 mb-4">

                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                                <SparklesIcon className="w-7 h-7 text-white" />
                            </div>

                            <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                Welcome back, {name || "there"}!
                            </h1>
                        </div>

                        <p className="text-lg text-gray-500 ml-[72px] max-w-xl leading-relaxed">
                            Ready to continue your journey and level up your coding skills today?
                        </p>
                    </div>

                    {/* Button */}
                    <button
                        onClick={onCreateSession}
                        className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold text-white text-lg shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-[1.04]"
                    >
                        <div className="flex items-center gap-3">
                            <ZapIcon className="w-6 h-6 transition-transform group-hover:rotate-12" />
                            <span>Create Session</span>
                            <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </div>
                    </button>

                </div>
            </div>
        </div>
    )
}
export default WelcomeSection
