import React from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/useAuth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";

export default function App() {
  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="div w-100" style={{ maxWidth: "400px" }}>
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/" Component={Dashboard} />
                <Route path="/signup" Component={Signup} />
                <Route path="/login" Component={Login} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </div>
      </Container>
    </>
  );
}
