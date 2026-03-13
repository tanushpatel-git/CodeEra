import {
    ArrowRightIcon,
    Code2Icon,
    CrownIcon,
    SparklesIcon,
    UsersIcon,
    ZapIcon,
    LoaderIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getDifficultyColor } from "../hook/getDifficultyColor.js";
import React from "react";

const ActiveSession = ({ sessions, loading, isUserInSession }) => {
    return (
        <div className="lg:col-span-2 h-full rounded-2xl border border-neutral-800 bg-neutral-950 shadow-sm">
            <div className="p-6">
                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500">
                            <ZapIcon className="w-5 h-5 text-white" />
                        </div>

                        <h2 className="text-xl font-bold tracking-tight text-white">
                            Live Sessions
                        </h2>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                        <span className="text-emerald-400 font-medium">
              {sessions.length} active
            </span>
                    </div>
                </div>

                {/* SESSION LIST */}
                <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2">
                    {loading ? (
                        <div className="flex justify-center py-16">
                            <LoaderIcon className="w-8 h-8 animate-spin text-indigo-500" />
                        </div>
                    ) : sessions.length > 0 ? (
                        sessions.map((session) => (
                            <div
                                key={session._id}
                                className="group flex items-center justify-between gap-4 rounded-xl border border-neutral-800 bg-neutral-900 p-4 transition hover:border-indigo-500/50 hover:bg-neutral-900/80"
                            >
                                {/* LEFT SIDE */}
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    {/* ICON */}
                                    <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500">
                                        <Code2Icon className="w-6 h-6 text-white" />

                                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-neutral-950 rounded-full"></span>
                                    </div>

                                    {/* SESSION INFO */}
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-white truncate">
                                                {session.problem}
                                            </h3>

                                            <span
                                                className={`text-xs px-2 py-0.5 rounded-md font-medium ${getDifficultyColor(
                                                    session.difficulty
                                                )}`}
                                            >
                        {session.difficulty.charAt(0).toUpperCase() +
                            session.difficulty.slice(1)}
                      </span>
                                        </div>

                                        <div className="flex items-center gap-4 text-sm text-neutral-400">
                                            <div className="flex items-center gap-1">
                                                <CrownIcon className="w-4 h-4" />
                                                <span>{session.host?.name}</span>
                                            </div>

                                            <div className="flex items-center gap-1">
                                                <UsersIcon className="w-4 h-4" />
                                                <span>
                          {session.participant ? "2/2" : "1/2"}
                        </span>
                                            </div>

                                            {session.participant && !isUserInSession(session) ? (
                                                <span className="text-xs px-2 py-0.5 rounded bg-red-500/20 text-red-400">
                          FULL
                        </span>
                                            ) : (
                                                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                          OPEN
                        </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* ACTION BUTTON */}
                                {session.participant && !isUserInSession(session) ? (
                                    <button
                                        disabled
                                        className="px-4 py-2 text-sm rounded-lg bg-neutral-800 text-neutral-500 cursor-not-allowed"
                                    >
                                        Full
                                    </button>
                                ) : (
                                    <Link
                                        to={`/session/${session._id}`}
                                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition"
                                    >
                                        {isUserInSession(session) ? "Rejoin" : "Join"}
                                        <ArrowRightIcon className="w-4 h-4" />
                                    </Link>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-16">
                            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-500/10">
                                <SparklesIcon className="w-8 h-8 text-indigo-400" />
                            </div>

                            <p className="text-lg font-semibold text-neutral-300">
                                No active sessions
                            </p>

                            <p className="text-sm text-neutral-500">
                                Be the first to create one!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActiveSession;