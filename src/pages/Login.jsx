import {
  Container,
  Form,
  Button,
  Card,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_ENDPOINTS, apiCall } from "../config/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await apiCall(API_ENDPOINTS.AUTH.LOGIN, {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      // Accept several common response shapes
      // Replace this part in Login.jsx
      const token =
        response?.token ||
        response?.data?.token ||
        response?.user?.token ||
        response?.authToken;

      // capture the full user object
      const user =
        response?.user || response?.data?.user || response?.data || response;

      if (token && user) {
        login(user, token);
      }

      setSuccessMessage("Login successful! Redirecting...");

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      // Log full error for debugging
      console.error("Login error:", error);
      // Prefer server-provided message when available
      const serverMsg =
        error?.response?.message ||
        (error?.response && typeof error.response === "string"
          ? error.response
          : null);
      setErrorMessage(
        serverMsg || error.message || "An error occurred during login",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={5}>
          <Card className="p-4 shadow-sm border-0">
            <h3 className="mb-2">Welcome Back</h3>
            <p className="text-muted mb-4">Sign in to your account</p>

            {successMessage && (
              <Alert variant="success" dismissible>
                {successMessage}
              </Alert>
            )}

            {errorMessage && (
              <Alert variant="danger" dismissible>
                {errorMessage}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email Address*</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  isInvalid={!!errors.email}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password*</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  isInvalid={!!errors.password}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-flex justify-content-end mb-4">
                <Link to="/forgot-password" className="text-decoration-none">
                  Forgot Password?
                </Link>
              </div>

              <Button
                variant="primary"
                className="w-100 py-2 mb-3"
                type="submit"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </Form>

            <div className="text-center pt-3 border-top">
              <p className="mb-0">
                Don't have an account?{" "}
                <Link
                  to="/membership"
                  className="text-decoration-none fw-semibold"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
