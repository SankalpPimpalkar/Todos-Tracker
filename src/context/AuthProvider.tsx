"use client";
import { useState } from "react";
import { AuthContext } from "./authContext";

export default function AuthProvider({
    children,
}: { children: React.ReactNode }) {

    const [userData, setUserData] = useState(null);
    const [authStatus, setAuthStatus] = useState(false);

    const values = {
        userData,
        setUserData,
        authStatus,
        setAuthStatus
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}