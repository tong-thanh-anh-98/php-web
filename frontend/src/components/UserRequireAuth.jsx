import { useContext } from "react";
import { UserAuthContext } from "./context/UserAuthContext";
import { Navigate } from "react-router-dom";


export const UserRequireAuth = ({ children }) => {
    const { user } = useContext(UserAuthContext);

    if (!user) {
        return <Navigate to={`/account/login`} />
    }

    return children;
}

