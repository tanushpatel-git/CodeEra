import React from 'react'
import {TrophyIcon, UsersIcon} from "lucide-react";

const StatsCard = ({ activeSessionsCount, recentSessionsCount }) => {

    return (
        <div className="lg:col-span-1 grid grid-cols-1 gap-6">

            {/* Active Sessions */}
            <div className="group relative overflow-hidden rounded-3xl border border-indigo-200 bg-orange-300 p-6 shadow-sm transition hover:shadow-xl hover:-translate-y-1">

                {/* subtle glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition"></div>

                <div className="relative flex items-start justify-between mb-6">

                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-100">
                        <UsersIcon className="w-7 h-7 text-indigo-600" />
                    </div>

                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-600">
        Live
      </span>

                </div>

                <div className="text-4xl font-bold text-gray-900 mb-1">
                    {activeSessionsCount || 0}
                </div>

                <p className="text-sm text-gray-500">
                    Active Sessions
                </p>

            </div>


            {/* Total Sessions */}
            <div className="group relative overflow-hidden rounded-3xl border border-purple-200 bg-purple-300 p-6 shadow-sm transition hover:shadow-xl hover:-translate-y-1">

                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition"></div>

                <div className="relative flex items-start justify-between mb-6">

                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-100">
                        <TrophyIcon className="w-7 h-7 text-purple-600" />
                    </div>

                </div>

                <div className="text-4xl font-bold text-gray-900 mb-1">
                    {recentSessionsCount || 0}
                </div>

                <p className="text-sm text-gray-500">
                    Total Sessions
                </p>

            </div>

        </div>
    )
}
export default StatsCard
