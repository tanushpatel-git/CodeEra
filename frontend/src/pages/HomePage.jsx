import React from 'react'
import Navbar from "../component/ui/Navbar.jsx";

const HomePage = () => {
    return (
        <div className="min-h-screen bg-[#0f172a] text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center px-6 py-28">
                <h1 className="text-4xl md:text-6xl font-bold mt-20">
                    Solve Problems. <span className="text-blue-500">Together.</span>
                </h1>

                <p className="mt-6 max-w-2xl text-gray-400 text-lg">
                    Practice coding challenges, discuss solutions in real-time, and
                    collaborate using chat and video calls — all in one platform.
                </p>

                {/* CTA */}
                <div className="mt-10 flex gap-4 flex-wrap justify-center">
                    <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold">
                        Start Solving
                    </button>
                </div>
            </section>

            {/* Features */}
            <section className="px-6 pb-32 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Feature
                        title="Coding Problems"
                        desc="Hundreds of algorithmic challenges with real-time submissions and rankings."
                    />
                    <Feature
                        title="Live Chat"
                        desc="Discuss solutions instantly with teammates or global coders."
                    />
                    <Feature
                        title="Video Calling"
                        desc="Pair program and debug together with built-in video calls."
                    />
                </div>
            </section>
        </div>
    );
}

function Feature({ title, desc }) {
    return (
        <div className="bg-[#020617] p-6 rounded-xl border border-gray-800 hover:border-blue-500 transition">
            <h3 className="text-xl font-semibold mb-3">{title}</h3>
            <p className="text-gray-400">{desc}</p>
        </div>
    );
}
export default HomePage
