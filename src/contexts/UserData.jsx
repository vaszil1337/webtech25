import { createContext, useContext, useState, useEffect } from "react";
import { getStoredUser, setStoredUser, clearStoredUser } from "../utils/storage";

export const UserDataContext = createContext(null);

const defaultUser = {
    username: "",
    isLoggedIn: false,
};

export function UserDataProvider({ children }) {
    const [user, setUser] = useState(() => getStoredUser() || defaultUser);

    useEffect(() => {
        if (user.isLoggedIn) {
            setStoredUser(user);
        } else {
            clearStoredUser();
        }
    }, [user]);

    function login(userData) {
        setUser(current => ({
            ...current,
            ...userData,
            isLoggedIn: true
        }));
    }

    function logout() {
        setUser(defaultUser);
    }

    return (
        <UserDataContext.Provider value={{ user, login, logout }}>
            {children}
        </UserDataContext.Provider>
    );
}

export function useUserData() {
    const context = useContext(UserDataContext);
    if (context === null) {
        throw new Error("useUserData must be used within a UserDataProvider");
    }
    return context; // { user, login, logout }
}