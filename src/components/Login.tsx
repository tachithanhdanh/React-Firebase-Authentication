import React, { useRef } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { AuthContextProps, useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const { login }: AuthContextProps = useAuth()!;
  const navigate = useNavigate();

  function validateEmail(email: string | undefined): boolean {
    if (!email) return false;
    // Regular expression for email validation
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
    return re.test(email);
  }

  function validatePassword(password: string | undefined): boolean {
    if (!password) return false;
    // Regular expression for password validation
    // lenght have to be at least 6 characters
    const re = /.{6,}/;
    return re.test(password);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // prevent the browser from refreshing the page
    e.preventDefault();
    
    // if the email or password or passwordConfirm is not available, return
    if (!emailRef.current || !passwordRef.current) {
      return;
    }

    // Validation check
    if (!validateEmail(emailRef.current?.value)) {
      setError("Invalid email");
      return;
    }

    if (!validatePassword(passwordRef.current?.value)) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    try {
      // Set loading to true to to prevent the user from clicking the button multiple times
      setLoading(true);
      // Reset the error message
      setError("");
      // Wait for the signup function to complete
      await login(emailRef.current?.value, passwordRef.current?.value);
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
    navigate("/");
  }

  return (
    <>
      {/* The below Card component is used to create a card */}
      {/* This card contains a form to log in */}
      <Card>
        <Card.Body>
          <h2 className="h2 text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required ref={emailRef} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required ref={passwordRef} />
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100 mt-4">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      {/* The below div is used to redirect to login page */}
      {/* It contains a text and a link to login page */}
      {/* The text is centered */}
      {/* It uses all the width specified */}
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
