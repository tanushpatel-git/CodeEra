import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Video, MessageCircle, Code2 } from "lucide-react";
import HomeNavbar from "../component/HomeNavbar.jsx";

export default function HomePage() {

    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-200, 200], [15, -15]);
    const rotateY = useTransform(x, [-200, 200], [-15, 15]);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();

        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;

        x.set(mouseX);
        y.set(mouseY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    /* ---------------- CODE TYPING ANIMATION ---------------- */

    const code = `function twoSum(nums, target) {
  const map = {}

  for (let i = 0; i < nums.length; i++) {
    let diff = target - nums[i]

    if (map[diff] !== undefined) {
      return [map[diff], i]
    }

    map[nums[i]] = i
  }
}`;

    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayed(code.slice(0, i));
            i++;
            if (i > code.length) clearInterval(interval);
        }, 20);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative h-screen w-screen overflow-hidden bg-[#020a06] flex items-center justify-center"
        >

            {/* Premium Dark Green Gradient */}

            <div className="absolute inset-0 bg-linear-to-br from-[#022c22] via-[#064e3b] to-[#021a14] opacity-90" />

            {/* Extra Radial Glow */}

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(34,197,94,0.25),transparent_40%)]" />

            {/* Glow Orbs */}

            <motion.div
                animate={{ x: [0, 100, -100, 0], y: [0, 50, -50, 0] }}
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute w-150 h-150 bg-emerald-500 rounded-full blur-[200px] opacity-35"
            />

            <motion.div
                animate={{ x: [0, -120, 80, 0], y: [0, -80, 40, 0] }}
                transition={{ duration: 25, repeat: Infinity }}
                className="absolute right-0 bottom-0 w-125 h-125 bg-green-500 rounded-full blur-[200px] opacity-35"
            />

            {/* GRID BACKGROUND */}

            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[40px_40px]" />

            {/* NAVBAR */}

            <HomeNavbar />

            {/* HUGE BACKGROUND TEXT */}

            <h1 className="absolute text-[25vw] font-black text-white/5 left-0 top-10 select-none">
                code
            </h1>

            <h1 className="absolute text-[25vw] font-black text-white/5 right-0 bottom-0 select-none">
                live
            </h1>

            {/* 3D CODE EDITOR */}

            <motion.div
                style={{ rotateX, rotateY }}
                transition={{ type: "spring", stiffness: 120 }}
                className="relative z-10"
            >

                <div className="w-150 bg-[#0b1a14] rounded-3xl shadow-2xl border border-white/10 overflow-hidden">

                    {/* editor top */}

                    <div className="flex items-center gap-2 px-4 py-3 bg-[#0f1f17]">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>

                        <span className="ml-3 text-xs text-gray-400">
                            twoSum.js
                        </span>
                    </div>

                    {/* code typing */}

                    <pre className="p-6 font-mono text-sm text-emerald-300 whitespace-pre-wrap">
                        {displayed}
                    </pre>

                </div>

            </motion.div>

            {/* FEATURE CARDS */}

            <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute left-16 bottom-20 bg-white/90 rounded-2xl p-4 shadow-xl w-52.5"
            >
                <div className="flex items-center gap-3">
                    <Video className="text-emerald-600" />
                    <div>
                        <p className="font-semibold text-sm">Live Interviews</p>
                        <p className="text-xs text-gray-500">Video coding sessions</p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute right-16 bottom-24 bg-white/90 rounded-2xl p-4 shadow-xl w-52.5"
            >
                <div className="flex items-center gap-3">
                    <MessageCircle className="text-emerald-600" />
                    <div>
                        <p className="font-semibold text-sm">Real-time Chat</p>
                        <p className="text-xs text-gray-500">Discuss solutions</p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute right-40 top-32 bg-white/90 rounded-2xl p-4 shadow-xl w-52.5"
            >
                <div className="flex items-center gap-3">
                    <Code2 className="text-emerald-600" />
                    <div>
                        <p className="font-semibold text-sm">Collaborative Coding</p>
                        <p className="text-xs text-gray-500">Code together live</p>
                    </div>
                </div>
            </motion.div>

        </div>
    );
}