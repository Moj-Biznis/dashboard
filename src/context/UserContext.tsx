import { ReactNode, createContext, useContext, useState } from "react";
import axios_instance from "../config/api_defaults";
import { AxiosError } from "axios";

interface User {
    id: number;
    name: string;
    email: string;
    company_name: string;
    avatar_url: string;
    business_type_slug: string;
    email_verified_at: string | null;
    company: CompanyDetails;
}
interface CompanyDetails {
    available_sms_to_spend: number;
    plan_expires_at: string;
    trial_expires_at: string;
    plan_expires_within: number;
    plan_name: string;
    is_plan_cancelled: boolean;
    is_subscription_resumable: boolean;
}
interface UserProviderProps {
    children: ReactNode;
}
interface UserContextProps {
    user: User | null;
    refreshUserState: () => void;
    logout: () => void;
}

const UserContext = createContext<UserContextProps | null>(null);

const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

const UserProvider = (props: UserProviderProps) => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    const [user, setUser] = useState<User | null>(storedUser);

    const login = (newUser: User) => {
        setUser(() => {
            localStorage.setItem("user", JSON.stringify(newUser));
            return newUser;
        });
    };
    const refreshUserState = () => {
        axios_instance()
            .post("/auth/me")
            .then((r) => {
                login(r.data);
            })
            .catch((e: AxiosError) => {
                if (e.response?.status === 401) {
                    logout();
                }
            });
    };
    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("auth_token");
        setUser(null);
    };
    const contextValues = {
        user,
        logout,
        refreshUserState,
    };
    return (
        <UserContext.Provider value={contextValues}>
            {props.children}
        </UserContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export { UserProvider, useUser };
