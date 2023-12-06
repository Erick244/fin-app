import { createContext, useContext } from "react";

interface AuthContextProps {}

const AuthContext = createContext({} as AuthContextProps);

export default function AuthContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);
