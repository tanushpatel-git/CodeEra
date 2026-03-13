import { Code2, Clock, Users, Trophy, Loader } from "lucide-react";
import { getDifficultyColor } from "../hook/getDifficultyColor.js";
import { formatDistanceToNow } from "date-fns";

function RecentSessions({ sessions, isLoading }) {
    return (
        <div className="mt-8 border rounded-2xl border-zinc-800 bg-black text-white shadow-lg">

            {/* Header */}
            <div className="p-6 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500">
                        <Clock className="w-5 h-5 text-white" />
                    </div>

                    <h2 className="text-2xl font-extrabold">
                        Your Past Sessions
                    </h2>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                    {/* Loading */}
                    {isLoading ? (
                        <div className="col-span-full flex justify-center py-20">
                            <Loader className="w-10 h-10 animate-spin text-indigo-400" />
                        </div>
                    ) : sessions.length > 0 ? (

                        sessions.map((session) => (
                            <div
                                key={session._id}
                                className={`relative border rounded-xl p-5 transition hover:shadow-xl hover:scale-[1.02]
                ${
                                    session.status === "active"
                                        ? "bg-green-950 border-green-800"
                                        : "bg-zinc-900 border-zinc-800"
                                }`}
                            >

                                {/* Active Badge */}
                                {session.status === "active" && (
                                    <div className="absolute top-3 right-3 flex items-center gap-1 text-xs font-semibold bg-green-900 text-green-300 px-2 py-1 rounded-full">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                        ACTIVE
                                    </div>
                                )}

                                {/* Header */}
                                <div className="flex items-start gap-3 mb-4">

                                    <div
                                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-white
                    ${
                                            session.status === "active"
                                                ? "bg-green-600"
                                                : "bg-indigo-600"
                                        }`}
                                    >
                                        <Code2 className="w-6 h-6" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-base truncate">
                                            {session.problem}
                                        </h3>

                                        <span
                                            className={`text-xs font-semibold px-2 py-1 rounded-md mt-1 inline-block ${getDifficultyColor(
                                                session.difficulty
                                            )}`}
                                        >
                      {session.difficulty}
                    </span>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="space-y-2 text-sm text-zinc-400 mb-4">

                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>
                      {formatDistanceToNow(new Date(session.createdAt), {
                          addSuffix: true,
                      })}
                    </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4" />
                                        <span>
                      {session.participant ? "2 participants" : "1 participant"}
                    </span>
                                    </div>

                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-3 border-t border-zinc-800 text-xs text-zinc-500">

                  <span className="font-semibold uppercase">
                    Completed
                  </span>

                                    <span>
                    {new Date(session.updatedAt).toLocaleDateString()}
                  </span>

                                </div>

                            </div>
                        ))

                    ) : (

                        /* Empty State */
                        <div className="col-span-full text-center py-16">

                            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-3xl bg-zinc-900">
                                <Trophy className="w-10 h-10 text-indigo-400" />
                            </div>

                            <p className="text-lg font-semibold text-zinc-200">
                                No sessions yet
                            </p>

                            <p className="text-sm text-zinc-500">
                                Start your coding journey today!
                            </p>

                        </div>

                    )}

                </div>

            </div>
        </div>
    );
}

export default RecentSessions;