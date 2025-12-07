import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ClientDashboard from "../pages/Dashboard/ClientDashboard";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import Counsellors from "../pages/Counsellors/Counsellors";
import Resources from "../pages/Resources/Resources";
import Bookings from "../pages/Bookings/Bookings";
import ManageCounsellors from "../pages/Dashboard/ManageCounsellors";
import ManageResources from "../pages/Dashboard/ManageResources";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import AdminBookings from "../pages/Dashboard/AdminBookings";
import ClientLayout from "../layouts/ClientLayout";
import AdminLayout from "../layouts/AdminLayout";
import ClientGuard from "../hooks/useClientGuard";
import AdminGuard from "../hooks/useAdminGuard";
import { useAuth } from "../hooks/useAuth";
import TestFirebase from "../components/TestFirebase";

const AppRoutes = () => {
    const { user, role, loading, logout } = useAuth();

    if (loading) {
        return <div className="flex items-center justify-center h-screen text-slate-600">Loading...</div>;
    }

    return (
        <Routes>
            {/* Public Routes */}
            {/* Public Routes */}
            <Route path="/test-firebase" element={<TestFirebase />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/login" element={!user ? <Login /> : (role ? <Navigate to={role === 'admin' ? '/admin' : '/dashboard'} /> : <div className="p-10 text-center">Account setup incomplete. Please contact support or register again. <br /><button onClick={() => logout()} className="text-blue-600 underline mt-4">Logout & Try Again</button></div>)} />
            <Route path="/auth/register" element={!user ? <Register /> : (role ? <Navigate to={role === 'admin' ? '/admin' : '/dashboard'} /> : <Navigate to="/auth/login" />)} />

            {/* Root Redirect */}
            <Route path="/" element={<Navigate to={user ? (role === 'admin' ? '/admin' : '/dashboard') : '/auth/login'} />} />

            {/* Client Protected Routes */}
            <Route element={<ClientGuard />}>
                <Route element={<ClientLayout />}>
                    <Route path="/dashboard" element={<ClientDashboard />} />
                    <Route path="/counsellors" element={<Counsellors />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/bookings" element={<Bookings />} />
                </Route>
            </Route>

            {/* Admin Protected Routes */}
            <Route element={<AdminGuard />}>
                <Route element={<AdminLayout />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/counsellors" element={<ManageCounsellors />} />
                    <Route path="/admin/resources" element={<ManageResources />} />
                    <Route path="/admin/users" element={<ManageUsers />} />
                    <Route path="/admin/bookings" element={<AdminBookings />} />
                </Route>
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;
