'use client';

import {createContext, ReactNode, useContext, useEffect, useState} from "react"
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

export const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({children}: { children: ReactNode }) => {
    const router: AppRouterInstance = useRouter();

    const [user, setUser] = useState<any>(null);
    const [cookieLoaded, setCookieLoaded] = useState(false);


    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
