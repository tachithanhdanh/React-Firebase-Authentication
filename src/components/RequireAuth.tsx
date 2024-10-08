import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContextProps, useAuth } from "../contexts/AuthContext";

export interface RequireAuthProps {
  children: JSX.Element;
}

// I used this implementation https://stackoverflow.com/a/69870303
// This is ok too: https://stackoverflow.com/a/69869761
export default function RequireAuth({ children }: RequireAuthProps) {
  const { currentUser }: AuthContextProps = useAuth()!;
  const location = useLocation();

  if (!currentUser) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{from:location}} />;
  }

  return children;
}
