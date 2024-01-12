import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { getData, postData } from "@/functions/api";
import { deleteClientCookie } from "@/functions/client-cookies";
import { VERIFY_COOKIE_NAME } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { createContext, useContext } from "react";
import { useAuthContext } from "./AuthContext";

interface VerifyCodeContextProps {
    verifyCode: (code: string) => Promise<void>;
    resendEmail: () => Promise<void>;
    cancelVerification: () => void;
}

const VerifyCodeContext = createContext({} as VerifyCodeContextProps);

export default function VerifyCodeContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    const { signUpUser, login } = useAuthContext();

    async function verifyCode(code: string) {
        try {
            await postData(`/auth/verifyCode/${code}`, null);

            if (signUpUser) {
                await login({
                    email: signUpUser.email,
                    password: signUpUser.password,
                });
            }

            deleteClientCookie(VERIFY_COOKIE_NAME);

            router.push("/dashboard");
            router.refresh();

            toast({
                title: "Success",
                description: "Account created successfully.",
            });
        } catch (e: any) {
            toast({
                title: String(e.message),
                variant: "destructive",
            });
        }
    }

    async function resendEmail() {
        try {
            const data = await getData<string>("/auth/resendEmail");

            toast({
                title: "Success",
                description: data,
            });
        } catch (e: any) {
            toast({
                title: String(e.message),
                variant: "destructive",
                description: "Try to sign up again.",
                action: (
                    <ToastAction
                        altText="Try again"
                        className="bg-foreground text-background py-1 px-2 rounded"
                        onClick={cancelVerification}
                    >
                        Try again
                    </ToastAction>
                ),
            });
        }
    }

    function cancelVerification() {
        deleteClientCookie(VERIFY_COOKIE_NAME);
        router.push("/auth/signup");
    }

    return (
        <VerifyCodeContext.Provider
            value={{ verifyCode, cancelVerification, resendEmail }}
        >
            {children}
        </VerifyCodeContext.Provider>
    );
}

export const useVerifyCodeContext = () => useContext(VerifyCodeContext);
