import React from 'react'
import {PROBLEMS} from "../data/problems.js";
import {Code2Icon, LoaderIcon, PlusIcon} from "lucide-react";

const CreateSessionModal = ({
                                isOpen, onClose, roomConfig, setRoomConfig, onCreateRoom, isCreating,
                            }) => {

    const problems = Object.values(PROBLEMS);
    if(!isOpen) return null;
    return (<div className="fixed inset-0 z-50 flex items-center justify-center">

        {/* Backdrop */}
        <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
        />

        {/* Modal */}
        <div className="relative w-full max-w-2xl mx-4 rounded-3xl bg-white shadow-2xl p-8">

            {/* Title */}
            <h3 className="text-2xl font-bold mb-6">
                Create New Session
            </h3>

            <div className="space-y-8">

                {/* PROBLEM SELECTION */}
                <div className="space-y-2">

                    <label className="flex items-center gap-2 font-semibold text-gray-700">
                        Select Problem
                        <span className="text-red-500">*</span>
                    </label>

                    <select
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        value={roomConfig.problem}
                        onChange={(e) => {
                            const selectedProblem = problems.find(
                                (p) => p.title === e.target.value
                            );

                            setRoomConfig({
                                difficulty: selectedProblem?.difficulty || "",
                                problem: e.target.value,
                            });
                        }}
                    >
                        <option value="" disabled>
                            Choose a coding problem...
                        </option>

                        {problems.map((problem) => (
                            <option key={problem.id} value={problem.title}>
                                {problem.title} ({problem.difficulty})
                            </option>
                        ))}
                    </select>

                </div>

                {/* ROOM SUMMARY */}
                {roomConfig.problem && (
                    <div className="flex gap-4 rounded-xl border border-green-200 bg-green-50 p-4">

                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-100">
                            <Code2Icon className="w-5 h-5 text-green-600" />
                        </div>

                        <div className="text-sm">
                            <p className="font-semibold text-gray-800">
                                Room Summary
                            </p>

                            <p className="text-gray-600">
                                Problem: <span className="font-medium">{roomConfig.problem}</span>
                            </p>

                            <p className="text-gray-600">
                                Max Participants: <span className="font-medium">2 (1-on-1 session)</span>
                            </p>
                        </div>

                    </div>
                )}

            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 mt-10">

                <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                    Cancel
                </button>

                <button
                    onClick={onCreateRoom}
                    disabled={isCreating || !roomConfig.problem}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >

                    {isCreating ? (
                        <LoaderIcon className="w-5 h-5 animate-spin" />
                    ) : (
                        <PlusIcon className="w-5 h-5" />
                    )}

                    {isCreating ? "Creating..." : "Create"}

                </button>

            </div>

        </div>

    </div>)
}
export default CreateSessionModal
