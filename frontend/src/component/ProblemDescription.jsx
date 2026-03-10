import React, {useState} from "react";
import {getDifficultyColor} from '../hook/getDifficultyColor.js'


const ProblemDescription = ({problem, problemId, onProblemChange, allProblem}) => {
    const [copied, setCopied] = useState(null);

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopied(id);

        setTimeout(() => setCopied(null), 1500);
    };

    if (!problem) return null;

    return (<div className="h-[88vh] overflow-y-auto bg-zinc-950 text-zinc-200">

        {/* HEADER */}
        <div className="sticky top-0 z-10 bg-zinc-900 border-b border-zinc-800 p-6 backdrop-blur">

            <div className="flex justify-between items-start mb-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        {problem.title}
                    </h1>
                    <p className="text-sm text-zinc-400 mt-1">{problem.category}</p>
                </div>

                <span
                    className={`px-3 py-1 text-xs font-semibold border rounded-md ${getDifficultyColor(problem.difficulty)}`}
                >
            {problem.difficulty}
          </span>
            </div>

            {/* Problem Selector */}
            <select
                value={problemId}
                onChange={(e) => onProblemChange(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {allProblem?.map((p) => (<option key={p.id} value={p.id}>
                    {p.title} • {p.difficulty}
                </option>))}
            </select>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-8 max-w-4xl">

            {/* DESCRIPTION */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">

                <h2 className="text-xl font-semibold text-white mb-4">
                    Description
                </h2>

                <div className="space-y-4 text-zinc-300 leading-relaxed text-[15px]">
                    <p>{problem.description.text}</p>

                    {problem.description.notes?.map((note, index) => (<p key={index}>{note}</p>))}
                </div>
            </div>

            {/* EXAMPLES */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">

                <h2 className="text-xl font-semibold text-white mb-6">
                    Examples
                </h2>

                <div className="space-y-6">

                    {problem.examples?.map((example, index) => (<div
                        key={index}
                        className="bg-zinc-800 rounded-lg p-5 border border-zinc-700"
                    >
                        <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-zinc-400">
                    Example {index + 1}
                  </span>
                        </div>

                        {/* INPUT */}
                        <div className="mb-4">

                            <div className="flex justify-between items-center mb-1">
                    <span className="text-blue-400 text-sm font-semibold">
                      Input
                    </span>

                                <button
                                    onClick={() => copyToClipboard(example.input, `input-${index}`)}
                                    className="text-xs px-2 py-1 rounded bg-zinc-700 hover:bg-zinc-600 transition"
                                >
                                    {copied === `input-${index}` ? "Copied" : "Copy"}
                                </button>
                            </div>

                            <pre className="bg-zinc-900 p-3 rounded text-sm font-mono overflow-x-auto">
                    {example.input}
                  </pre>
                        </div>

                        {/* OUTPUT */}
                        <div className="mb-3">

                            <div className="flex justify-between items-center mb-1">
                    <span className="text-purple-400 text-sm font-semibold">
                      Output
                    </span>

                                <button
                                    onClick={() => copyToClipboard(example.output, `output-${index}`)}
                                    className="text-xs px-2 py-1 rounded bg-zinc-700 hover:bg-zinc-600 transition"
                                >
                                    {copied === `output-${index}` ? "Copied" : "Copy"}
                                </button>
                            </div>

                            <pre className="bg-zinc-900 p-3 rounded text-sm font-mono overflow-x-auto">
                    {example.output}
                  </pre>
                        </div>

                        {example.explanation && (<div className="border-t border-zinc-700 pt-3 text-sm text-zinc-400">
                    <span className="font-semibold text-zinc-300">
                      Explanation:
                    </span>{" "}
                            {example.explanation}
                        </div>)}
                    </div>))}
                </div>
            </div>

            {/* CONSTRAINTS */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">

                <h2 className="text-xl font-semibold text-white mb-4">
                    Constraints
                </h2>

                <ul className="space-y-2 text-sm text-zinc-300">
                    {problem.constraints?.map((constraint, index) => (<li key={index} className="flex gap-2">
                        <span className="text-blue-400">•</span>
                        <code className="font-mono">{constraint}</code>
                    </li>))}
                </ul>
            </div>

        </div>
    </div>);
};

export default ProblemDescription;