"use client";

import { toast } from "@/components/ui/use-toast";
import { getData, postData } from "@/functions/api";
import {
    deleteClientCookie,
    getClientCookie,
    setClientCookie,
} from "@/functions/client-cookies";
import { User } from "@/models/User";
import { UserAndToken } from "@/models/UserAndToken";
import { SignInFormData } from "@/schemas/SignIn.schema";
import { SignUpFormData } from "@/schemas/SignUp.schema";
import { AUTH_TOKEN_NAME, VERIFY_COOKIE_NAME } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
    user: User | null;
    signUpUser: SignUpFormData | null;
    login: (data: SignInFormData) => Promise<void>;
    signUp: (data: SignUpFormData) => Promise<void>;
    isAuth: () => boolean;
    logOut: () => void;
}

const AuthContext = createContext({} as AuthContextProps);

const authToken = getClientCookie(AUTH_TOKEN_NAME);

export default function AuthContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);
    const [signUpUser, setSignUpUser] = useState<SignUpFormData | null>(null);

    const router = useRouter();

    async function retrieveUserByToken() {
        try {
            const user = await getData<User>(`/auth/userByToken/${authToken}`);
            setUser(user);
        } catch (e: any) {
            toast({
                title: "An error occurred while retrieving the user",
                description:
                    "For your security, we will redirect you to the login area.",
                variant: "destructive",
            });

            logOut();
        }
    }

    useEffect(() => {
        if (authToken) {
            retrieveUserByToken();
        }
    }, []);

    async function login(data: SignInFormData) {
        try {
            setSignUpUser(null);

            const { jwtToken, user } = await postData<UserAndToken>(
                "/auth/login",
                data
            );

            setClientCookie(AUTH_TOKEN_NAME, jwtToken);
            setUser(user);

            router.prefetch("/dashboard");
            router.push("/dashboard");
        } catch (e: any) {
            toast({
                title: String(e.message),
                variant: "destructive",
            });
        }
    }

    async function signUp(data: SignUpFormData) {
        try {
            setSignUpUser(data);

            await postData("/auth/signup", data);

            setClientCookie(VERIFY_COOKIE_NAME, true);
            router.push("/auth/verify");

            toast({
                title: "Success",
                description: "A code has been sent to your e-mail.",
            });
        } catch (e: any) {
            toast({
                title: String(e.message),
                variant: "destructive",
            });
        }
    }

    function isAuth() {
        const authToken = getClientCookie(AUTH_TOKEN_NAME);

        return !!authToken;
    }

    function logOut() {
        deleteClientCookie(AUTH_TOKEN_NAME);
        setUser(null);

        router.push("/auth");
        router.refresh();
    }

    return (
        <AuthContext.Provider
            value={{ user, login, signUp, isAuth, logOut, signUpUser }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);
