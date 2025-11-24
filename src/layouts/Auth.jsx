import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useUserData } from "../contexts/UserData";
import Navbar from "../components/Navbar.jsx";

export default function AuthLayout() {
    const { user } = useUserData();
    const navigate = useNavigate();

    useEffect(() => {
        if (user === undefined || user === null) return;
        if (!user.isLoggedIn) {
            navigate("/", { replace: true });
        }
    }, [user, navigate]);

    if (user?.isLoggedIn) {
        return <>
            <Navbar />
            <Outlet />
        </>
    }
    return null;
}