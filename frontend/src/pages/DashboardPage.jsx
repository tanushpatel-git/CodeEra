import MainNavbar from "../component/MainNavbar.jsx";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useState} from "react";
import {useActiveSession, useCreateSession, useMyRecentSession} from "../hook/useSessions.js";
import WelcomeSection from "../component/WelcomeSection.jsx";
import ActiveSession from "../component/ActiveSession.jsx";
import StatsCard from "../component/StatsCard.jsx";
import RecentSession from "../component/RecentSession.jsx";
import CreateSessionModal from "../component/CreateSessionModal.jsx";
import toast from "react-hot-toast";

const DashboardPage = () => {
    const navigate = useNavigate();
    const {id} = useSelector(state => state.userData.user);
    const [showCreateModel, setShowCreateModel] = useState(false);
    const [roomConfig, setRoomConfig] = useState({problem:"",difficulty:""})
    const createSessionMutation = useCreateSession();
    const {data:activeSessionData,isLoading:loadingActiveSession} = useActiveSession();
    const {data:recentSessionData, isLoading:loadingRecentSession} = useMyRecentSession();

    const activeSessionCount = activeSessionData?.session || [];
    const recentSessionCount = recentSessionData?.session || [];

    const handleCreateRoom = () => {

        if(!roomConfig.problem || !roomConfig.difficulty) {
            toast.error("Please select a problem");
            return;
        }

        createSessionMutation.mutate({
            problem: roomConfig.problem,
            difficulty: roomConfig.difficulty.toLowerCase(),
        },{
            onSuccess: (data) => {
                setShowCreateModel(false);
                navigate(`/session/${data?.session?._id}`);
            }
        })
    }


    const isUserInSession = (session) => {
        if(!id) return false;

        return session.host?._id === id || session.participant?._id === id;
    }



    return (
            <>
                <div className="bg-black text-white h-screen w-full">
                    <MainNavbar/>
                    <div>
                        <WelcomeSection onCreateSession={()  => setShowCreateModel(true)}/>
                        {/*Grid layout*/}
                        <div className="mx-auto px-6 pb-16">
                            <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
                                <StatsCard
                                    activeSessionCount={activeSessionCount.length}
                                    recentSessionCount={recentSessionCount.length}
                                />
                                <ActiveSession
                                sessions={activeSessionCount}
                                loading={loadingActiveSession}
                                isUserInSession={isUserInSession}
                                />
                            </div>
                            <RecentSession
                                sessions={recentSessionCount}
                                isLoading={loadingRecentSession}
                            />
                        </div>
                    </div>
                </div>
                <CreateSessionModal
                    isOpen={showCreateModel}
                    onClose={() => {
                        setShowCreateModel(false)
                        setRoomConfig({
                        problem:"",difficulty:""
                        })
                    }}
                    roomConfig={roomConfig}
                    setRoomConfig={setRoomConfig}
                    onCreateRoom={handleCreateRoom}
                    isCreating={createSessionMutation.isPending}
                />
            </>
    )
}
export default DashboardPage