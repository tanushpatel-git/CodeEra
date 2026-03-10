import React from "react";
import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon } from "lucide-react";
import { LANGUAGE_CONFIG } from "../data/problems.js";

const CodeEditor = ({
                        code,
                        selectedLanguage,
                        onLanguageChange,
                        onCodeChange,
                        onRunCode,
                        isRunning,
                    }) => {

    return (
        <div className="text-white h-full flex flex-col bg-[#0f0f0f] rounded-xl border border-zinc-800 overflow-hidden">

            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#161616] border-b border-zinc-800">

                {/* Language Selector */}
                <div className="w-5 h-5 absolute">
                    <img src={LANGUAGE_CONFIG[selectedLanguage].icon} alt={LANGUAGE_CONFIG[selectedLanguage].name} className="h-full w-full"/>
                </div>
                <select
                    value={selectedLanguage}
                    onChange={(e) => onLanguageChange(e.target.value)}
                    className="bg-[#1e1e1e] text-white px-3 py-2 ml-7 rounded-md outline-none border border-zinc-700"
                >
                    {Object.keys(LANGUAGE_CONFIG).map((lang) => (
                        <option key={lang} value={lang} onChange={(e) => onLanguageChange(e.target.value)}>
                            {LANGUAGE_CONFIG[lang].name}
                        </option>
                    ))}
                </select>

                {/* Run Button */}
                <button
                    onClick={onRunCode}
                    disabled={isRunning}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md transition"
                >
                    {isRunning ? (
                        <>
                            <Loader2Icon className="animate-spin" size={16} />
                            Running...
                        </>
                    ) : (
                        <>
                            <PlayIcon size={16} />
                            Run Code
                        </>
                    )}
                </button>
            </div>

            {/* Monaco Editor */}
            <div className="flex-1">
                <Editor
                    height="100%"
                    language={LANGUAGE_CONFIG[selectedLanguage].monacoLanguage}
                    value={code}
                    theme="vs-dark"
                    onChange={(value) => onCodeChange(value || "")}
                    options={{
                        fontSize: 14,
                        minimap: { enabled: false },
                        automaticLayout: true,
                        scrollBeyondLastLine: false,
                    }}
                />
            </div>

        </div>
    );
};

export default CodeEditor;
