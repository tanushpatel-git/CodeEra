import React from "react";

const CodeOutput = ({ output }) => {
    const normalizedOutput = output?.output ?? output ?? "";
    const isError =
        normalizedOutput.toLowerCase().includes("error") ||
        normalizedOutput.toLowerCase().includes("traceback") ||
        normalizedOutput.toLowerCase().includes("exception");

    return (
        <div className="w-full h-full bg-zinc-900 border border-zinc-700 rounded-xl flex flex-col">

            {/* Header */}
            <div className="flex justify-between items-center px-4 py-2 border-b border-zinc-700 bg-zinc-800 rounded-t-xl">
                <h2 className="text-white text-sm font-semibold">Output</h2>

                <span
                    className={`text-xs font-medium ${
                        isError ? "text-red-400" : "text-green-400"
                    }`}
                >
          {isError ? "Compilation Error" : "Success"}
        </span>
            </div>

            {/* Console */}
            <div className="flex-1 p-4 overflow-auto font-mono text-sm">
                {normalizedOutput ? (
                    <pre
                        className={`whitespace-pre-wrap ${
                            isError ? "text-red-400" : "text-green-400"
                        }`}
                    >
            {normalizedOutput}
          </pre>
                ) : (
                    <p className="text-zinc-500">Run your code to see output...</p>
                )}
            </div>
        </div>
    );
};

export default CodeOutput;