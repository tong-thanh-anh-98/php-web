import { useState } from "react";
import { UserAuthContext } from "./UserAuthContext";
import { toast } from 'react-toastify';

export const UserAuthProvider = ({ children }) => {
    const userInfo = localStorage.getItem('userInfo');
    const [user, setUser] = useState(userInfo ? JSON.parse(userInfo) : null);

    const login = (user) => {
        setUser(user)
    }

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        toast.success('You have successfully logged out of your account.');
    }

    return <UserAuthContext.Provider value={{ user, login, logout }}>
        {children}
    </UserAuthContext.Provider>
};