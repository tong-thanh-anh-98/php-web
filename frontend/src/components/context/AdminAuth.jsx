import { useState } from "react";
import { AdminAuthContext } from "./AdminAuthContext";
import { toast } from 'react-toastify';

// export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const adminInfo = localStorage.getItem('adminInfo');
    // const [user, setUser] = useState(adminInfo);
    const [user, setUser] = useState(adminInfo ? JSON.parse(adminInfo) : null);

    const login = (user) => {
        setUser(user)
    }

    const logout = () => {
        localStorage.removeItem('adminInfo');
        setUser(null);
        toast.success('You have successfully logged out of your account.');
    }

    return <AdminAuthContext.Provider value={{ user, login, logout }}>
        {children}
    </AdminAuthContext.Provider>
};