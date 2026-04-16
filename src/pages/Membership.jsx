// import {
//   Container,
//   Form,
//   Button,
//   Card,
//   Row,
//   Col,
//   Alert,
//   Modal,
// } from "react-bootstrap";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { API_ENDPOINTS, apiCall } from "../config/api";
// import { useAuth } from "../context/AuthContext";

// const Membership = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phone: "",
//     country: "",
//     profilePic: null,
//   });

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [showOtpModal, setShowOtpModal] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [otpError, setOtpError] = useState("");
//   const [verifyingOtp, setVerifyingOtp] = useState(false);
//   const [registeredEmail, setRegisteredEmail] = useState("");
//   const [acceptTerms, setAcceptTerms] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//     // Clear error for this field when user starts typing
//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: "",
//       });
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData({
//       ...formData,
//       profilePic: file,
//     });
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!acceptTerms) {
//       newErrors.acceptTerms = "You must accept Terms & Conditions";
//     }

//     if (!formData.fullName.trim()) {
//       newErrors.fullName = "Full name is required";
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = "Please confirm your password";
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }
//     if (!formData.country.trim()) {
//       newErrors.country = "Country is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);
//     setErrorMessage("");
//     setSuccessMessage("");

//     try {
//       // Prepare data for API (exclude confirmPassword)
//       const apiData = new FormData();
//       apiData.append("fullName", formData.fullName);
//       apiData.append("email", formData.email);
//       apiData.append("password", formData.password);
//       apiData.append("phone", formData.phone);
//       apiData.append("country", formData.country);
//       if (formData.profilePic) {
//         apiData.append("profilePic", formData.profilePic);
//       }

//       const response = await apiCall(API_ENDPOINTS.AUTH.SIGNUP, {
//         method: "POST",
//         body: apiData,
//       });

//       // If server asks to verify OTP first, open modal
//       const msg = (response && response.message) || "";
//       if (msg && /otp|verify/i.test(msg)) {
//         setRegisteredEmail(formData.email);
//         setShowOtpModal(true);
//         setSuccessMessage("OTP sent — please verify to complete signup.");
//         return;
//       }

//       const data = response;
//       setSuccessMessage(
//         "Registration successful! You'll be redirected shortly.",
//       );
//       // Auto-login user after signup
//       if (data.user && data.token) {
//         login(data.user, data.token);
//       } else if (data.user) {
//         login(data.user, "");
//       }

//       // Reset form
//       setFormData({
//         fullName: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         phone: "",
//         country: "",
//         profilePic: null,
//       });

//       // Redirect after 2 seconds
//       setTimeout(() => {
//         navigate("/");
//       }, 2000);
//     } catch (error) {
//       setErrorMessage(error.message || "An error occurred during registration");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOtp = async () => {
//     setOtpError("");
//     if (!otp) {
//       setOtpError("Please enter the OTP");
//       return;
//     }

//     try {
//       setVerifyingOtp(true);
//       const resp = await apiCall(API_ENDPOINTS.AUTH.VERIFY_OTP, {
//         method: "POST",
//         body: JSON.stringify({ email: registeredEmail || formData.email, otp }),
//       });

//       // If verification returns token, login and close modal
//       const token =
//         resp?.token ||
//         resp?.data?.token ||
//         resp?.user?.token ||
//         resp?.authToken;
//       const user = resp?.user || resp?.data?.user || null;
//       if (token) {
//         login(user, token);
//       }

//       setShowOtpModal(false);
//       setOtp("");
//       setSuccessMessage("Signup complete — logged in successfully.");
//       setTimeout(() => navigate("/"), 1500);
//     } catch (err) {
//       console.error("OTP verify error:", err);
//       const serverMsg = err?.response?.message || err.message;
//       setOtpError(serverMsg || "OTP verification failed");
//     } finally {
//       setVerifyingOtp(false);
//     }
//   };

//   return (
//     <>
//       <Container className="py-3">
//         <Row className="justify-content-center">
//           <Col md={6}>
//             <Card className="p-3 shadow-sm border-0">
//               <h3>Join our Community</h3>
//               <p>Sign up for exclusive content and updates.</p>

//               {successMessage && (
//                 <Alert variant="success" dismissible>
//                   {successMessage}
//                 </Alert>
//               )}

//               {errorMessage && (
//                 <Alert variant="danger" dismissible>
//                   {errorMessage}
//                 </Alert>
//               )}

//               <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Name*</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="fullName"
//                     placeholder="John Doe"
//                     value={formData.fullName}
//                     onChange={handleInputChange}
//                     isInvalid={!!errors.fullName}
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.fullName}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Email Address*</Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     placeholder="name@example.com"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     isInvalid={!!errors.email}
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.email}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Password*</Form.Label>
//                   <Form.Control
//                     type="password"
//                     name="password"
//                     placeholder="Enter password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     isInvalid={!!errors.password}
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.password}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Confirm Password*</Form.Label>
//                   <Form.Control
//                     type="password"
//                     name="confirmPassword"
//                     placeholder="Confirm password"
//                     value={formData.confirmPassword}
//                     onChange={handleInputChange}
//                     isInvalid={!!errors.confirmPassword}
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.confirmPassword}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Phone Number (Optional)</Form.Label>
//                   <Form.Control
//                     type="tel"
//                     name="phone"
//                     placeholder="+91..."
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Country*</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="country"
//                     placeholder="India"
//                     value={formData.country}
//                     onChange={handleInputChange}
//                     isInvalid={!!errors.country}
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.country}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group className="mb-4">
//                   <Form.Label>Profile Picture (Optional)</Form.Label>
//                   <Form.Control
//                     type="file"
//                     name="profilePic"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                   />
//                   <Form.Text className="text-muted">
//                     Supported formats: JPG, PNG, GIF (Max 5MB)
//                   </Form.Text>
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Check
//                     type="checkbox"
//                     id="termsCheck"
//                     checked={acceptTerms}
//                     onChange={(e) => {
//                       setAcceptTerms(e.target.checked);
//                       if (errors.acceptTerms) {
//                         setErrors({ ...errors, acceptTerms: "" });
//                       }
//                     }}
//                     label={
//                       <span>
//                         I agree to the{" "}
//                         <Link
//                           to="/terms"
//                           className="fw-semibold text-decoration-none"
//                         >
//                           Terms & Conditions
//                         </Link>{" "}
//                         and{" "}
//                         <Link
//                           to="/privacy"
//                           className="fw-semibold text-decoration-none"
//                         >
//                           Privacy Policy
//                         </Link>
//                       </span>
//                     }
//                   />
//                   {errors.acceptTerms && (
//                     <div className="text-danger small mt-1">
//                       {errors.acceptTerms}
//                     </div>
//                   )}
//                 </Form.Group>

//                 <Button
//                   variant="primary"
//                   className="w-100 py-2"
//                   type="submit"
//                   disabled={loading || !acceptTerms}
//                 >
//                   {loading ? "Processing..." : "Register"}
//                 </Button>
//               </Form>

//               <div className="text-center pt-3 border-top mt-4">
//                 <p className="mb-0">
//                   Already have an account?{" "}
//                   <Link
//                     to="/login"
//                     className="text-decoration-none fw-semibold"
//                   >
//                     Sign In
//                   </Link>
//                 </p>
//               </div>
//             </Card>
//           </Col>
//         </Row>
//       </Container>

//       <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Enter OTP</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {otpError && <Alert variant="danger">{otpError}</Alert>}
//           <Form.Group>
//             <Form.Label>
//               OTP sent to {registeredEmail || formData.email}
//             </Form.Label>
//             <Form.Control
//               type="text"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               placeholder="Enter OTP"
//             />
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowOtpModal(false)}>
//             Cancel
//           </Button>
//           <Button
//             variant="primary"
//             onClick={handleVerifyOtp}
//             disabled={verifyingOtp}
//           >
//             {verifyingOtp ? "Verifying..." : "Verify OTP"}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default Membership;
import {
  Container,
  Form,
  Button,
  Card,
  Row,
  Col,
  Alert,
  Modal,
} from "react-bootstrap";
import { useState, useMemo } from "react"; // Added useMemo
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS, apiCall } from "../config/api";
import { useAuth } from "../context/AuthContext";

// New library imports
import countryList from "react-select-country-list";
import { getCountryCallingCode } from "libphonenumber-js";

const Membership = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Get country list options
  const countryOptions = useMemo(() => countryList().getData(), []);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    country: "",
    profilePic: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

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

  // Logic to handle Country Selection and update Phone Code
  const handleCountryChange = (e) => {
    const selectedCountryLabel = e.target.value;
    const countryData = countryOptions.find(
      (c) => c.label === selectedCountryLabel,
    );

    let updatedPhone = formData.phone;

    if (countryData) {
      try {
        const code = getCountryCallingCode(countryData.value); // countryData.value is ISO code like "IN"
        updatedPhone = `+${code} `;
      } catch (err) {
        updatedPhone = "";
      }
    }

    setFormData({
      ...formData,
      country: selectedCountryLabel,
      phone: updatedPhone,
    });

    if (errors.country) {
      setErrors({ ...errors, country: "" });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      profilePic: file,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!acceptTerms) {
      newErrors.acceptTerms = "You must accept Terms & Conditions";
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
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
      // Prepare data for API (exclude confirmPassword)
      const apiData = new FormData();
      apiData.append("fullName", formData.fullName);
      apiData.append("email", formData.email);
      apiData.append("password", formData.password);
      apiData.append("phone", formData.phone);
      apiData.append("country", formData.country);
      if (formData.profilePic) {
        apiData.append("profilePic", formData.profilePic);
      }

      const response = await apiCall(API_ENDPOINTS.AUTH.SIGNUP, {
        method: "POST",
        body: apiData,
      });

      // If server asks to verify OTP first, open modal
      const msg = (response && response.message) || "";
      if (msg && /otp|verify/i.test(msg)) {
        setRegisteredEmail(formData.email);
        setShowOtpModal(true);
        setSuccessMessage("OTP sent — please verify to complete signup.");
        return;
      }

      const data = response;
      setSuccessMessage(
        "Registration successful! You'll be redirected shortly.",
      );
      // Auto-login user after signup
      if (data.user && data.token) {
        login(data.user, data.token);
      } else if (data.user) {
        login(data.user, "");
      }

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        country: "",
        profilePic: null,
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setOtpError("");
    if (!otp) {
      setOtpError("Please enter the OTP");
      return;
    }

    try {
      setVerifyingOtp(true);
      const resp = await apiCall(API_ENDPOINTS.AUTH.VERIFY_OTP, {
        method: "POST",
        body: JSON.stringify({ email: registeredEmail || formData.email, otp }),
      });

      // If verification returns token, login and close modal
      const token =
        resp?.token ||
        resp?.data?.token ||
        resp?.user?.token ||
        resp?.authToken;
      const user = resp?.user || resp?.data?.user || null;
      if (token) {
        login(user, token);
      }

      setShowOtpModal(false);
      setOtp("");
      setSuccessMessage("Signup complete — logged in successfully.");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error("OTP verify error:", err);
      const serverMsg = err?.response?.message || err.message;
      setOtpError(serverMsg || "OTP verification failed");
    } finally {
      setVerifyingOtp(false);
    }
  };

  return (
    <>
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="p-3 shadow-sm border-0">
              <h3>Join our Community</h3>
              <p>Sign up for exclusive content and updates.</p>

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
                  <Form.Label>Name*</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    isInvalid={!!errors.fullName}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fullName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email Address*</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    isInvalid={!!errors.email}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password*</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleInputChange}
                    isInvalid={!!errors.password}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password*</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    isInvalid={!!errors.confirmPassword}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Country Field as a Select Dropdown */}
                <Form.Group className="mb-3">
                  <Form.Label>Country*</Form.Label>
                  <Form.Select
                    name="country"
                    value={formData.country}
                    onChange={handleCountryChange}
                    isInvalid={!!errors.country}
                    required
                  >
                    <option value="">Select a country</option>
                    {countryOptions.map((country) => (
                      <option key={country.value} value={country.label}>
                        {country.label}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.country}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Phone Field - Automatically prefixes code when country is selected */}
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number (Optional)</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    placeholder="+1 123..."
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Profile Picture (Optional)</Form.Label>
                  <Form.Control
                    type="file"
                    name="profilePic"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <Form.Text className="text-muted">
                    Supported formats: JPG, PNG, GIF (Max 5MB)
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    id="termsCheck"
                    checked={acceptTerms}
                    onChange={(e) => {
                      setAcceptTerms(e.target.checked);
                      if (errors.acceptTerms) {
                        setErrors({ ...errors, acceptTerms: "" });
                      }
                    }}
                    label={
                      <span>
                        I agree to the{" "}
                        <Link
                          to="/terms"
                          className="fw-semibold text-decoration-none"
                        >
                          Terms & Conditions
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy"
                          className="fw-semibold text-decoration-none"
                        >
                          Privacy Policy
                        </Link>
                      </span>
                    }
                  />
                  {errors.acceptTerms && (
                    <div className="text-danger small mt-1">
                      {errors.acceptTerms}
                    </div>
                  )}
                </Form.Group>

                <Button
                  variant="primary"
                  className="w-100 py-2"
                  type="submit"
                  disabled={loading || !acceptTerms}
                >
                  {loading ? "Processing..." : "Register"}
                </Button>
              </Form>

              <div className="text-center pt-3 border-top mt-4">
                <p className="mb-0">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-decoration-none fw-semibold"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Enter OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {otpError && <Alert variant="danger">{otpError}</Alert>}
          <Form.Group>
            <Form.Label>
              OTP sent to {registeredEmail || formData.email}
            </Form.Label>
            <Form.Control
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOtpModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleVerifyOtp}
            disabled={verifyingOtp}
          >
            {verifyingOtp ? "Verifying..." : "Verify OTP"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Membership;
