// File: src/components/common/ProtectedRoute.jsx

import { Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

function ProtectedRoute({

    children,

    allowedRoles = []

}) {

    const {

        isAuthenticated,

        user

    } = useAuth();

    // User is not logged in

    if (!isAuthenticated) {

        return <Navigate to="/login" replace />;

    }

    // Role not allowed

    if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user?.role)
) {

    return (
        <Navigate
            to="/login"
            replace
        />
    );

}
    return children;

}

export default ProtectedRoute;