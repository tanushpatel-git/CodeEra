import {useMutation, useQuery} from '@tanstack/react-query'
import toast from 'react-hot-toast'
import {sessionApi} from "../service/sessionService.js";

export const useCreateSession = () => {
    return useMutation({
        mutationKey:["createSession"],
        mutationFn: async (data) => {
            return await sessionApi.createSession(data);
        },
        onSuccess: () => {
            toast.success("Session successfully created!");
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.response?.data?.message||"Error creating room");
        }
    })
}

export const useActiveSession = () => {
    return useQuery({
        queryKey: ["activeSession"],
        queryFn:sessionApi.getActiveSessions
    })
}

export const useMyRecentSession = () => {
    return useQuery({
        queryKey: ["MyRecentSession"],
        queryFn:sessionApi.getMyRecentSessions
    })
}

export const useSessionById = (id) => {
    return useQuery({
        queryKey: ["session",id],
        queryFn:() => sessionApi.getMyRecentSessions(id),
        enabled: !!id,
        refetchInterval: 5000, // refetch every 5 seconds to detect session change
    })
}

export const useJoinSession =  (id) => {
    return  useMutation({
        mutationKey: ["joinSession"],
        mutationFn: async () => {
            return await sessionApi.joinSession(id);
        },
        onSuccess: () => toast.success("Joining room"),
        onError: (error) => {
            toast.error(error.response?.data?.message||"Error joining room");
        }
    })
}

export const useEndSession = (id) => {
    return useMutation({
        mutationKey: ["endSession"],
        mutationFn:() => sessionApi.endSession(id),
        onSuccess: () => toast.success("Session end successfully"),
        onError: (error) => {
            toast.error(error.response?.data?.message||"Error ending session");
        }
    })
}