import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContextProps, useAuth } from '../contexts/AuthContext';

// https://stackoverflow.com/a/69869761
export default function PrivateRoute() {
    const { currentUser }: AuthContextProps = useAuth()!;

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return currentUser ? <Outlet /> : <Navigate to="/login" />;
}