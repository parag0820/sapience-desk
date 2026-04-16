import { Container, Form, Button, Card, Row, Col, Alert, ProgressBar } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINTS, apiCall } from "../config/api";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Reset Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  // Validate email
  const validateEmail = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate OTP
  const validateOtp = () => {
    const newErrors = {};
    if (!otp.trim()) {
      newErrors.otp = "OTP is required";
    } else if (otp.length < 4 || otp.length > 6) {
      newErrors.otp = "OTP must be 4-6 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate password reset
  const validatePasswordReset = () => {
    const newErrors = {};
    if (!password) {
      newErrors.password = "New password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!validateEmail()) return;

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await apiCall(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      setSuccessMessage("OTP sent to your email. Check your inbox.");
      setOtpSent(true);
      setResendCountdown(60);

      // Countdown timer for resend
      const interval = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      setStep(2);
    } catch (error) {
      setErrorMessage(error.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!validateOtp()) return;

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await apiCall(API_ENDPOINTS.AUTH.VERIFY_OTP, {
        method: "POST",
        body: JSON.stringify({ email, otp }),
      });

      setSuccessMessage("OTP verified successfully! Enter your new password.");
      setOtpVerified(true);
      setStep(3);
    } catch (error) {
      setErrorMessage(error.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!validatePasswordReset()) return;

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await apiCall(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
        method: "PUT",
        body: JSON.stringify({ email, newPassword: password, confirmPassword }),
      });

      setSuccessMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle resend OTP
  const handleResendOtp = async () => {
    if (resendCountdown > 0) return;
    await handleSendOtp({ preventDefault: () => {} });
  };

  // Progress bar percentage
  const progressPercentage = step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={5} md={7} sm={12}>
          <Card className="p-4 shadow-sm border-0">
            <div className="mb-4">
              <h3 className="mb-2">Reset Your Password</h3>
              <p className="text-muted small">
                {step === 1 && "Enter your email address"}
                {step === 2 && "Enter the OTP sent to your email"}
                {step === 3 && "Create a new password"}
              </p>
              <ProgressBar
                now={progressPercentage}
                label={`Step ${step} of 3`}
                className="mt-3"
                style={{ height: "12px" }}
              />
            </div>

            {successMessage && (
              <Alert variant="success" dismissible className="small">
                {successMessage}
              </Alert>
            )}

            {errorMessage && (
              <Alert variant="danger" dismissible className="small">
                {errorMessage}
              </Alert>
            )}

            {/* Step 1: Email */}
            {step === 1 && (
              <Form onSubmit={handleSendOtp}>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Email Address*</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    isInvalid={!!errors.email}
                    required
                    className="py-2"
                  />
                  <Form.Control.Feedback type="invalid" className="small">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  variant="primary"
                  className="w-100 py-2 fw-semibold"
                  type="submit"
                  disabled={loading}>
                  {loading ? "Sending OTP..." : "Send OTP"}
                </Button>
              </Form>
            )}

            {/* Step 2: OTP Verification */}
            {step === 2 && (
              <Form onSubmit={handleVerifyOtp}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Enter OTP*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter 4-6 digit OTP"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value.trim());
                      if (errors.otp) setErrors({ ...errors, otp: "" });
                    }}
                    isInvalid={!!errors.otp}
                    required
                    className="py-2 text-center"
                    maxLength="6"
                  />
                  <Form.Control.Feedback type="invalid" className="small">
                    {errors.otp}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex gap-2 mb-4">
                  <Button
                    variant="primary"
                    className="flex-grow-1 py-2 fw-semibold"
                    type="submit"
                    disabled={loading}>
                    {loading ? "Verifying..." : "Verify OTP"}
                  </Button>
                  <Button
                    variant="outline-secondary"
                    className="py-2"
                    onClick={handleResendOtp}
                    disabled={resendCountdown > 0}>
                    {resendCountdown > 0 ? `Resend (${resendCountdown}s)` : "Resend"}
                  </Button>
                </div>

                <Button
                  variant="link"
                  className="text-decoration-none p-0 small"
                  onClick={() => {
                    setStep(1);
                    setOtp("");
                    setOtpSent(false);
                    setErrors({});
                  }}>
                  ← Back
                </Button>
              </Form>
            )}

            {/* Step 3: Reset Password */}
            {step === 3 && (
              <Form onSubmit={handleResetPassword}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">New Password*</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: "" });
                    }}
                    isInvalid={!!errors.password}
                    required
                    className="py-2"
                  />
                  <Form.Control.Feedback type="invalid" className="small">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Confirm Password*</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword)
                        setErrors({ ...errors, confirmPassword: "" });
                    }}
                    isInvalid={!!errors.confirmPassword}
                    required
                    className="py-2"
                  />
                  <Form.Control.Feedback type="invalid" className="small">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  variant="primary"
                  className="w-100 py-2 fw-semibold mb-3"
                  type="submit"
                  disabled={loading}>
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>

                <Button
                  variant="link"
                  className="text-decoration-none p-0 small w-100"
                  onClick={() => {
                    setStep(2);
                    setPassword("");
                    setConfirmPassword("");
                    setErrors({});
                  }}>
                  ← Back
                </Button>
              </Form>
            )}

            {/* Footer Links */}
            <div className="text-center pt-3 border-top mt-4">
              <p className="mb-0 small">
                Remember your password?{" "}
                <Link to="/login" className="text-decoration-none fw-semibold">
                  Sign In
                </Link>
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
