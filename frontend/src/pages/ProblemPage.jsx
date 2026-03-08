import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {difficultyStyle} from '../hook/difficultyStyle.js'

import MainNavbar from "../component/MainNavbar.jsx";
import {PROBLEMS} from "../data/problems.js";

const ProblemPage = () => {
    const problems = Object.values(PROBLEMS);

    /* ---------------------- STATE ---------------------- */

    const [search, setSearch] = useState("");
    const [difficulty, setDifficulty] = useState("All");
    const navigate = useNavigate();

    /* ---------------------- FILTER ---------------------- */

    const filteredProblems = problems.filter((problem) => {
        const matchesSearch = problem.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesDifficulty = difficulty === "All" || problem.difficulty === difficulty;

        return matchesSearch && matchesDifficulty;
    });

    /* ---------------------- STATS ---------------------- */

    const totalProblems = problems.length;

    const easyCount = problems.filter((p) => p.difficulty === "Easy").length;

    const mediumCount = problems.filter((p) => p.difficulty === "Medium").length;

    const hardCount = problems.filter((p) => p.difficulty === "Hard").length;

    const easyPercent = (easyCount / totalProblems) * 100;
    const mediumPercent = (mediumCount / totalProblems) * 100;
    const hardPercent = (hardCount / totalProblems) * 100;


    /* ---------------------- UI ---------------------- */

    return (<section className="min-h-screen bg-black text-white">
        <MainNavbar/>

        <div className="max-w-7xl mx-auto px-6 py-12">

            {/* ---------------- PAGE TITLE ---------------- */}

            <div className="text-center mb-12">

                <h1 className="
    text-4xl
    md:text-5xl
    font-extrabold
    tracking-tight
    text-white
  ">
                    Coding <span className="text-green-500">Problems</span>
                </h1>

                <p className="text-gray-400 mt-3 text-sm md:text-base">
                    Practice coding challenges and improve your problem-solving skills
                </p>

                <div className="flex justify-center mt-6">
                    <div className="w-24 h-0.75 bg-green-600 rounded-full"></div>
                </div>

            </div>

            {/* ---------------- SEARCH + FILTER ---------------- */}

            <div className="flex flex-col md:flex-row gap-4 mb-12">

                <input
                    type="text"
                    placeholder="Search problems..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="
              w-full
              bg-[#111]
              border border-gray-700
              rounded-lg
              px-4 py-2
              text-white
              placeholder-gray-400
              focus:outline-none
              focus:border-[#05402A]
            "
                />

                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="
              bg-[#111]
              border border-gray-700
              rounded-lg
              px-4 py-2
              text-white
              focus:outline-none
              focus:border-[#05402A]
            "
                >
                    <option value="All">All Difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>

            </div>

            {/* ---------------- PROBLEM Tables ---------------- */}

            <div className=" border border-gray-800 rounded-xl">

                <table className="w-full text-left">

                    {/* Header */}
                    <thead className="bg-[#111] border-b border-gray-800 sticky top-0">
                    <tr>
                        <th className="px-6 py-4 text-sm text-gray-400">Title</th>
                        <th className="px-6 py-4 text-sm text-gray-400">Difficulty</th>
                        <th className="px-6 py-4 text-sm text-gray-400">Category</th>
                        <th className="px-6 py-4 text-sm text-gray-400">Description</th>
                    </tr>
                    </thead>

                    {/* Body */}
                    <tbody>

                    {filteredProblems.map((problem) => (

                        <tr
                            key={problem.id}
                            onClick={() => navigate(`/problem/${problem.id}`)}
                            className="
            border-b border-gray-800
            hover:bg-[#0f0f0f]
            hover:border-green-500
            cursor-pointer
            transition
          "
                        >

                            {/* Title */}
                            <td className="px-6 py-4 font-medium">
                                {problem.title}
                            </td>

                            {/* Difficulty */}
                            <td className="px-6 py-4">
            <span
                className={`
                text-xs
                px-3 py-1
                border
                rounded-full
                ${difficultyStyle(problem.difficulty)}
              `}
            >
              {problem.difficulty}
            </span>
                            </td>

                            {/* Category */}
                            <td className="px-6 py-4 text-gray-400 text-sm">
                                {problem.category}
                            </td>

                            {/* Description */}
                            <td className="px-6 py-4 text-gray-300 text-sm max-w-md truncate">
                                {problem.description.text}
                            </td>

                        </tr>

                    ))}

                    </tbody>

                </table>

            </div>

            {/* ---------------- STATS SECTION ---------------- */}

            <div className="mt-20">

                <h2 className="text-2xl font-semibold mb-8">
                    Problem Overview
                </h2>

                <div className="grid md:grid-cols-4 gap-6">

                    {/* TOTAL */}

                    <div className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6">
                        <p className="text-gray-400 text-sm">
                            Total Problems
                        </p>
                        <h3 className="text-3xl font-bold mt-2">
                            {totalProblems}
                        </h3>
                    </div>

                    {/* EASY */}

                    <div className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6">

                        <div className="flex justify-between mb-3">
                            <p className="text-green-400 font-medium">
                                Easy
                            </p>
                            <span>{easyCount}</span>
                        </div>

                        <div className="w-full bg-gray-800 rounded-full h-2">
                            <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{width: `${easyPercent}%`}}
                            />
                        </div>

                    </div>

                    {/* MEDIUM */}

                    <div className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6">

                        <div className="flex justify-between mb-3">
                            <p className="text-yellow-400 font-medium">
                                Medium
                            </p>
                            <span>{mediumCount}</span>
                        </div>

                        <div className="w-full bg-gray-800 rounded-full h-2">
                            <div
                                className="bg-yellow-500 h-2 rounded-full"
                                style={{width: `${mediumPercent}%`}}
                            />
                        </div>

                    </div>

                    {/* HARD */}

                    <div className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6">

                        <div className="flex justify-between mb-3">
                            <p className="text-red-400 font-medium">
                                Hard
                            </p>
                            <span>{hardCount}</span>
                        </div>

                        <div className="w-full bg-gray-800 rounded-full h-2">
                            <div
                                className="bg-red-500 h-2 rounded-full"
                                style={{width: `${hardPercent}%`}}
                            />
                        </div>

                    </div>

                </div>

            </div>

        </div>
    </section>);
};

export default ProblemPage;