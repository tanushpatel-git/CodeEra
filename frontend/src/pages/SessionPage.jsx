import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {useEndSession, useJoinSession, useSessionById} from "../hook/useSessions.js";
import {useSelector} from "react-redux";
import {PROBLEMS} from "../data/problems.js";
import executeCode from "../lib/piston.js";
import {Loader2Icon, LogOutIcon, PhoneOffIcon} from "lucide-react";
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import MainNavbar from "../component/MainNavbar.jsx";
import CodeEditor from "../component/CodeEditor.jsx";
import CodeOutput from "../component/CodeOutput.jsx";
import {difficultyStyle} from "../hook/difficultyStyle.js";
import {StreamCall, StreamVideo} from "@stream-io/video-react-sdk";
import useStreamClient from "../hook/useStreamClient.js";
import VideoCallUI from "../component/VideoCallUi.jsx";

const SessionPage = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const userInfo = useSelector((state) => state.userData.user);
    const [output, setOutput] = useState(null);
    const [isRunning, setIsRunning] = useState(false);

    const {data:sessionData, isLoading : loadingSession, refetch} = useSessionById(id);

    const joinSessionMutation = useJoinSession();
    const endSessionMutation = useEndSession();
    const session = sessionData?.session;
    const isHost = session?.host?._id === userInfo.id;
    const isParticipant = session?.participant?._id === userInfo?.id;

    // find the problem data based on session problem tittle
    const problemData = session?.problem?Object.values(PROBLEMS).find((p) => p.title === session.problem) : null;

    const [selectedLanguage, setSelectedLanguage] = useState("javascript");
    const [code , setCode] = useState(problemData?.starterCode?.[selectedLanguage] || "");
    const { call, channel, chatClient, isInitializingCall, streamClient } = useStreamClient(
        session,
        loadingSession,
        isHost,
        isParticipant
    );

    // auto join session if user is not a already a participant and not the host
    useEffect(() => {
        if (!session || !userInfo || loadingSession) return;
        if(isHost || isParticipant) return

        joinSessionMutation.mutate(id,{
            onSuccess: refetch
        })
    },[session,userInfo.id,isHost,isParticipant,id,isHost])

    useEffect(() => {
        if(!session || loadingSession) return;

        if (session.status === "completed") navigate("/dashboard");
    },[session,loadingSession,navigate]);

    // update code when problem loads or changes
    useEffect(() => {
        if (problemData?.starterCode?.[selectedLanguage]) {
            setCode(problemData.starterCode[selectedLanguage]);
        }
    }, [problemData, selectedLanguage]);


    const handleChange = (newLang) => {
        setSelectedLanguage(newLang);
        const starterCode = problemData?.starterCode?.[newLang] || "";
        setCode(starterCode);
        setOutput(null);
    }

    const handleRunCode = async () => {
        setIsRunning(true);
        setOutput(null);

        const result = await executeCode(selectedLanguage, code);
        setOutput(result);
        setIsRunning(false);
    };

    const handleEndSession = async () => {
        if (confirm("Are you sure you want to continue and end this session?")) {
            endSessionMutation.mutate(id,{
                onSuccess: () => {
                    // this will navigate the host to dashboard Page
                    navigate("/dashboard");
                }
            });
        }
    }


    return (
        <div className="h-screen bg-gray-950 text-gray-200 flex flex-col">
            <MainNavbar />

            <div className="flex-1">
                <PanelGroup direction="horizontal">

                    {/* LEFT PANEL */}
                    <Panel defaultSize={50} minSize={30}>
                        <PanelGroup direction="vertical">

                            {/* PROBLEM DESCRIPTION */}
                            <Panel defaultSize={50} minSize={20}>
                                <div className="h-full overflow-y-auto bg-gray-900">

                                    {/* HEADER */}
                                    <div className="p-6 bg-gray-950 border-b border-gray-800">
                                        <div className="flex items-start justify-between">

                                            <div>
                                                <h1 className="text-3xl font-bold tracking-tight">
                                                    {session?.problem || "Loading..."}
                                                </h1>

                                                {problemData?.category && (
                                                    <p className="text-sm text-gray-400 mt-1">
                                                        {problemData.category}
                                                    </p>
                                                )}

                                                <p className="text-sm text-gray-500 mt-2">
                                                    Host: {session?.host?.name || "Loading..."} •{" "}
                                                    {session?.participant ? 2 : 1}/2 participants
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-3">

                                                {/* Difficulty Badge */}
                                                <span
                                                    className={`badge badge-lg ${difficultyStyle(session?.difficulty.slice(0, 1).toUpperCase() +
                                                        session?.difficulty.slice(1)
                                                    )}`}
                                                >
                          {session?.difficulty.slice(0, 1).toUpperCase() +
                              session?.difficulty.slice(1) || "Easy"}
                        </span>

                                                {isHost && session?.status === "active" && (
                                                    <button
                                                        onClick={handleEndSession}
                                                        disabled={endSessionMutation.isPending}
                                                        className="flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-red-600 hover:bg-red-500 transition"
                                                    >
                                                        {endSessionMutation.isPending ? (
                                                            <Loader2Icon className="w-4 h-4 animate-spin" />
                                                        ) : (
                                                            <LogOutIcon className="w-4 h-4" />
                                                        )}
                                                        End Session
                                                    </button>
                                                )}

                                                {session?.status === "completed" && (
                                                    <span className="px-3 py-1 text-xs rounded-md border border-gray-700 text-gray-400">
                        Completed
                      </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* BODY */}
                                    <div className="p-6 space-y-6">

                                        {/* DESCRIPTION */}
                                        {problemData?.description && (
                                            <div className="bg-gray-950 border border-gray-800 rounded-xl p-6">
                                                <h2 className="text-lg font-semibold mb-4">
                                                    Description
                                                </h2>

                                                <div className="space-y-3 text-gray-300 leading-relaxed">
                                                    <p>{problemData.description.text}</p>

                                                    {problemData.description.notes?.map((note, idx) => (
                                                        <p key={idx}>{note}</p>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* EXAMPLES */}
                                        {problemData?.examples?.length > 0 && (
                                            <div className="bg-gray-950 border border-gray-800 rounded-xl p-6">
                                                <h2 className="text-lg font-semibold mb-4">
                                                    Examples
                                                </h2>

                                                <div className="space-y-5">
                                                    {problemData.examples.map((example, idx) => (
                                                        <div key={idx}>

                                                            <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs px-2 py-1 bg-gray-800 rounded">
                              {idx + 1}
                            </span>
                                                                <p className="font-medium">
                                                                    Example {idx + 1}
                                                                </p>
                                                            </div>

                                                            <div className="bg-black rounded-lg p-4 font-mono text-sm space-y-2 border border-gray-800">

                                                                <div className="flex gap-2">
                              <span className="text-blue-400 font-semibold min-w-[70px]">
                                Input:
                              </span>
                                                                    <span>{example.input}</span>
                                                                </div>

                                                                <div className="flex gap-2">
                              <span className="text-green-400 font-semibold min-w-[70px]">
                                Output:
                              </span>
                                                                    <span>{example.output}</span>
                                                                </div>

                                                                {example.explanation && (
                                                                    <div className="pt-2 border-t border-gray-800 text-gray-400 text-xs">
                                <span className="font-semibold">
                                  Explanation:
                                </span>{" "}
                                                                        {example.explanation}
                                                                    </div>
                                                                )}

                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* CONSTRAINTS */}
                                        {problemData?.constraints?.length > 0 && (
                                            <div className="bg-gray-950 border border-gray-800 rounded-xl p-6">
                                                <h2 className="text-lg font-semibold mb-4">
                                                    Constraints
                                                </h2>

                                                <ul className="space-y-2 text-gray-300">
                                                    {problemData.constraints.map((constraint, idx) => (
                                                        <li key={idx} className="flex gap-2">
                                                            <span className="text-blue-400">•</span>
                                                            <code className="text-sm">{constraint}</code>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </Panel>

                            <PanelResizeHandle className="h-[2px] bg-gray-800 hover:bg-blue-500 transition cursor-row-resize" />

                            {/* CODE EDITOR */}
                            <Panel defaultSize={50} minSize={20}>
                                <PanelGroup direction="vertical">

                                    <Panel defaultSize={70} minSize={30}>
                                        <CodeEditor
                                            selectedLanguage={selectedLanguage}
                                            code={code}
                                            isRunning={isRunning}
                                            onLanguageChange={handleChange}
                                            onCodeChange={(value) => setCode(value)}
                                            onRunCode={handleRunCode}
                                        />
                                    </Panel>

                                    <PanelResizeHandle className="h-[2px] bg-gray-800 hover:bg-blue-500 transition cursor-row-resize" />

                                    <Panel defaultSize={30} minSize={15}>
                                        <CodeOutput output={output} />
                                    </Panel>

                                </PanelGroup>
                            </Panel>

                        </PanelGroup>
                    </Panel>

                    <PanelResizeHandle className="w-[2px] bg-gray-800 hover:bg-blue-500 transition cursor-col-resize" />

                    {/* RIGHT PANEL */}
                    <Panel defaultSize={50} minSize={30}>
                        <div className="h-full bg-base-200 p-4 overflow-auto">
                            {isInitializingCall ? (
                                <div className="h-full flex items-center justify-center">
                                    <div className="text-center">
                                        <Loader2Icon className="w-12 h-12 mx-auto animate-spin text-primary mb-4" />
                                        <p className="text-lg">Connecting to video call...</p>
                                    </div>
                                </div>
                            ) : !streamClient || !call ? (
                                <div className="h-full flex items-center justify-center">
                                    <div className="card bg-base-100 shadow-xl max-w-md">
                                        <div className="card-body items-center text-center">
                                            <div className="w-24 h-24 bg-error/10 rounded-full flex items-center justify-center mb-4">
                                                <PhoneOffIcon className="w-12 h-12 text-error" />
                                            </div>
                                            <h2 className="card-title text-2xl">Connection Failed</h2>
                                            <p className="text-base-content/70">Unable to connect to the video call</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full">
                                    <StreamVideo client={streamClient}>
                                        <StreamCall call={call}>
                                            <VideoCallUI chatClient={chatClient} channel={channel} />
                                        </StreamCall>
                                    </StreamVideo>
                                </div>
                            )}
                        </div>
                    </Panel>

                </PanelGroup>
            </div>
        </div>
    )
}
export default SessionPage
