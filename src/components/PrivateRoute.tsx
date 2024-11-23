import { Navigate } from "react-router-dom";

function PrivateRoute({ children }: { children: JSX.Element }) {
    const token = getTokenFromLocalStorage();

    return token ? children : <Navigate to="/login" />;
}

function getTokenFromLocalStorage() {
    return localStorage.getItem("jwtToken");
}

export default PrivateRoute;