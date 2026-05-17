import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  allowedRole,
}) {
  const token =
    localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // NOT LOGGED IN
  if (!token || !user) {
    return <Navigate to="/" />;
  }

  // WRONG ROLE
  if (
    allowedRole &&
    user.role !== allowedRole
  ) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;