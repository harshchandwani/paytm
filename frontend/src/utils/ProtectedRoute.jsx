    import { Navigate, Outlet } from "react-router-dom";

    const ProtectedRoute = () => {
    const jwt = localStorage.getItem("token");
    return <>{jwt ? <Outlet /> : <Navigate to={"/signin"} />}</>;
    };

    export default ProtectedRoute;