import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ isLoggedIn }) {
    if (isLoggedIn === null) {
        return <p>Loading...</p>; // Prevents redirection until we know if logged in
    }
    
    return isLoggedIn ? <Outlet /> : <Navigate to="/home" replace />;
}

export default ProtectedRoute;
