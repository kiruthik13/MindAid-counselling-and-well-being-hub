import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ClientGuard = () => {
    const { user, role, loading } = useAuth();

    if (loading) {
        return <div className="flex items-center justify-center h-screen text-slate-600">Loading...</div>;
    }

    if (!user || role !== "client") {
        return <Navigate to="/auth/login" replace />;
    }

    return <Outlet />;
};

export default ClientGuard;
