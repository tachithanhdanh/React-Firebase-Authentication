import React, { useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { AuthContextProps, useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState<string>("");
  const { currentUser, logout }: AuthContextProps = useAuth()!;
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      // wait for logout function complete to continue
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out!");
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="h2 text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser!.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
