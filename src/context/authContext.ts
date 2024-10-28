/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";

export const AuthContext = createContext<{
    authStatus: boolean;
    userData: any;
    setUserData: (user: any) => void;
    setAuthStatus: (status: boolean) => void;
}>({
    authStatus: false,
    setAuthStatus: () => { },
    userData: null,
    setUserData: () => { }
})
