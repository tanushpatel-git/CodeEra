import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {PROBLEMS} from "../data/problems.js";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import MainNavbar from "../component/MainNavbar.jsx";
import ProblemDescription from "../component/ProblemDescription.jsx";
import CodeEditor from "../component/CodeEditor.jsx";
import CodeOutput from "../component/CodeOutput.jsx";
import executeCode from "../lib/piston.js";
import toast from "react-hot-toast";
import confetti from 'canvas-confetti'


const ProblemPage = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [currentProblemId, setCurrentProblemId] = useState("two-sum");
    const [selectedLanguage, setSelectedLanguage] = useState("javascript");
    const [code, setCode] = useState(PROBLEMS[currentProblemId].starterCode.javascript);
    const [output, setOutput] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const currentProblem = PROBLEMS[currentProblemId];

    useEffect(() => {
        if (id && PROBLEMS[id]) {
            setCurrentProblemId(id);
            setCode(PROBLEMS[id].starterCode[selectedLanguage]);
            setOutput(null);

        }
    }, [id, selectedLanguage])

    const handleLanguageChange = (lang) => {
        setSelectedLanguage(lang);
        setOutput(null);
        setCode(currentProblem.starterCode[lang]);
    }
    const handleProblemChange = (id) => {
        navigate(`/problem/${id}`);
    }
    const normalizeOutput = (output) => {
        // normalize output for comparison (trim whitespace, handle different spacing)
        return output
            .trim()
            .split("\n")
            .map((line) =>
                line
                    .trim()
                    // remove spaces after [ and before ]
                    .replace(/\[\s+/g, "[")
                    .replace(/\s+\]/g, "]")
                    // normalize spaces around commas to single space after comma
                    .replace(/\s*,\s*/g, ",")
            )
            .filter((line) => line.length > 0)
            .join("\n");
    };

    const executeSuccess = (actualOutput,expectedOutput) => {
        // const normalizeActualCode = normalizeOutput(actualOutput);
        // const normalizeExpected = normalizeOutput(expectedOutput);

        return actualOutput === expectedOutput;
    }
    const handleCodeExecute = async () => {
        setIsRunning(true);
        setOutput(null);

        const result = await executeCode(selectedLanguage,code);
        setOutput(result);
        setIsRunning(false);

        //check if it is executed or not
        if (result.success) {
            const expectedOutput = currentProblem.expectedOutput[selectedLanguage];
            const testOutput = executeSuccess(result.output,expectedOutput);

            if (testOutput) {
                triggerConfetii();
                toast.success("All test passed successfully!");
            }else{
                toast.error("Test failed.Check your problem.");
            }
        }else{
            toast("Code Execution failed!");
        }

    }

    const triggerConfetii = () => {
            confetti({
                particleCount: 80,
                spread: 250,
                origin: {x:0.2,  y: 0.6 },
            });

            confetti({
                particleCount: 150,
                spread: 250,
                origin: { x:0.8, y: 0.6 },
            });
    }


    return (
        <div className="h-screen w-screen flex flex-col bg-zinc-950 text-zinc-200">

            {/* NAVBAR */}
                <MainNavbar />

            {/* MAIN CONTENT */}
            <div className="flex-1 overflow-hidden mt-10">

                <PanelGroup direction="horizontal">

                    {/* LEFT PANEL (Problem Description) */}
                    <Panel defaultSize={40} minSize={30} className="bg-zinc-950">
                        <div className="h-full overflow-hidden border-r border-zinc-800">
                            <ProblemDescription
                                problem={currentProblem}
                                problemId={currentProblemId}
                                onProblemChange={handleProblemChange}
                                allProblem={Object.values(PROBLEMS)}
                            />
                        </div>
                    </Panel>

                    {/* RESIZE HANDLE */}
                    <PanelResizeHandle className="w-1 bg-zinc-800 hover:bg-blue-500 transition-colors" />

                    {/* RIGHT PANEL */}
                    <Panel defaultSize={60} minSize={30}>

                        <PanelGroup direction="vertical">

                            {/* CODE EDITOR */}
                            <Panel defaultSize={70} minSize={40}>
                                <div className="h-full border-b border-zinc-800 bg-zinc-950">
                                    <CodeEditor
                                        code={code}
                                        selectedLanguage={selectedLanguage}
                                        onLanguageChange={handleLanguageChange}
                                        onCodeChange={setCode}
                                        onRunCode={handleCodeExecute}
                                        isRunning={isRunning}
                                    />
                                </div>
                            </Panel>

                            {/* RESIZE HANDLE */}
                            <PanelResizeHandle className="h-1 bg-zinc-800 hover:bg-blue-500 transition-colors" />

                            {/* OUTPUT PANEL */}
                            <Panel defaultSize={30} minSize={20}>
                                <div className="h-full bg-zinc-900">
                                    <CodeOutput output={output} />
                                </div>
                            </Panel>

                        </PanelGroup>

                    </Panel>

                </PanelGroup>

            </div>
        </div>
    );
}
export default ProblemPage
