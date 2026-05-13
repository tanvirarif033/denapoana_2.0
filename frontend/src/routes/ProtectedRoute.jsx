import {
  Navigate
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";



function ProtectedRoute({
  children
}) {

  const {
    isAuthenticated,
    loading
  } = useAuth();


  // loading
  if (loading) {

    return (

      <div
        className="
        d-flex
        justify-content-center
        align-items-center
        vh-100
        "
      >

        <h3>
          Loading...
        </h3>

      </div>
    );
  }


  // not logged in
  if (!isAuthenticated) {

    return (
      <Navigate to="/login" />
    );
  }


  return children;
}

export default ProtectedRoute;