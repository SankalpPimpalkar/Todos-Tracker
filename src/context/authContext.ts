/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";

export const AuthContext = createContext<{
    authStatus: boolean;
    userData: any;
    setUserData: (user: any) => void;
    setAuthStatus: (status: boolean) => void;
    isLoading: boolean
    setIsLoading: (status: boolean) => void;
    reFetchUser: () => void;
}>({
    authStatus: false,
    setAuthStatus: () => { },
    userData: null,
    setUserData: () => { },
    isLoading: true,
    setIsLoading: () => { },
    reFetchUser: () => { }
})
