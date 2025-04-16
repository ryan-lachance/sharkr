import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ isLoggedIn }) {
    if (isLoggedIn === null) {
        return <p>Loading...</p>
    }
    
    return isLoggedIn ? <Outlet /> : <Navigate to="/home" replace />;
}

export default ProtectedRoute;
