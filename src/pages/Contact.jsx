// import { useEffect, useState } from "react";
// import { Container, Form, Button, Row, Col } from "react-bootstrap";
// import DOMPurify from "dompurify";
// import { API_ENDPOINTS, apiCall } from "../config/api";

// const Contact = () => {
//   const [contactDetails, setContactDetails] = useState({});
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//     contactNo: "",
//   });

//   // -----------------------------
//   // Handle Input Change
//   // -----------------------------
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // -----------------------------
//   // Submit Form
//   // -----------------------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       !formData.name ||
//       !formData.email ||
//       !formData.subject ||
//       !formData.message ||
//       !formData.contactNo
//     ) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await apiCall(API_ENDPOINTS.QUERY.CREATE, {
//         method: "POST",
//         body: JSON.stringify(formData),
//       });

//       alert(response?.message || "Message sent successfully!");

//       setFormData({
//         name: "",
//         email: "",
//         subject: "",
//         message: "",
//         contactNo: "",
//       });
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert(error.message || "Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // -----------------------------
//   // Get Contact Details (Editor Content)
//   // -----------------------------
//   const getContactUs = async () => {
//     try {
//       const response = await apiCall(API_ENDPOINTS.CONTACTUS.GET_ALL, "GET");

//       setContactDetails(response?.data?.[0] || {});
//     } catch (error) {
//       console.error("Error fetching contact details:", error);
//     }
//   };

//   useEffect(() => {
//     getContactUs();
//   }, []);

//   return (
//     <Container fluid className="contact-wrapper py-5">
//       <Container>
//         <Row className="align-items-start gy-5">
//           {/* LEFT SIDE */}
//           <Col lg={5} md={12}>
//             <div className="contact-left">
//               <h2 className="mb-3 fw-bold">Get In Touch</h2>

//               {contactDetails?.text ? (
//                 <div
//                   className="contact-editor-content"
//                   dangerouslySetInnerHTML={{
//                     __html: DOMPurify.sanitize(contactDetails?.text),
//                   }}
//                 />
//               ) : (
//                 <p className="text-muted">Loading contact information...</p>
//               )}
// {/*
//               {contactDetails?.updatedAt && (
//                 <p className="text-muted small mt-3">
//                   Last Updated:{" "}
//                   {new Date(contactDetails.updatedAt).toLocaleDateString()}
//                 </p>
//               )} */}
//             </div>
//           </Col>

//           {/* RIGHT SIDE */}
//           <Col lg={7} md={12}>
//             <p
//               className="form-intro mb-4"
//               style={{ color: "#000", fontSize: 18 }}
//             >
//               Thank you for your interest. Please fill out the form and our team
//               will respond within 24 hours.
//             </p>
//             <div className="contact-form-box">
//               <Form onSubmit={handleSubmit}>
//                 <Row>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Full Name</Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         placeholder="Enter your name"
//                       />
//                     </Form.Group>
//                   </Col>

//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Email</Form.Label>
//                       <Form.Control
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         placeholder="Enter your email"
//                       />
//                     </Form.Group>
//                   </Col>

//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Mobile No.</Form.Label>
//                       <Form.Control
//                         type="tel"
//                         name="contactNo"
//                         value={formData.contactNo}
//                         onChange={handleChange}
//                         placeholder="Enter your mobile number"
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Subject</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     placeholder="What is this regarding?"
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-4">
//                   <Form.Label>Message</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={4}
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     placeholder="Tell us more details..."
//                   />
//                 </Form.Group>

//                 <div className="d-grid">
//                   <Button
//                     type="submit"
//                     className="submit-btn"
//                     disabled={loading}
//                   >
//                     {loading ? "Sending..." : "Send Message"}
//                   </Button>
//                 </div>
//               </Form>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </Container>
//   );
// };

// export default Contact;
import { useEffect, useState } from "react";

import { Container, Form, Button, Row, Col } from "react-bootstrap";

import DOMPurify from "dompurify";

import { API_ENDPOINTS, apiCall } from "../config/api";

const Contact = () => {
  const [contactDetails, setContactDetails] = useState({});

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",

    email: "",

    subject: "",

    message: "",

    contactNo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message ||
      !formData.contactNo
    ) {
      alert("Please fill all fields");

      return;
    }

    try {
      setLoading(true);

      const response = await apiCall(API_ENDPOINTS.QUERY.CREATE, {
        method: "POST",

        body: JSON.stringify(formData),
      });

      alert(response?.message || "Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        contactNo: "",
      });
    } catch (error) {
      alert(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const getContactUs = async () => {
    try {
      const response = await apiCall(API_ENDPOINTS.CONTACTUS.GET_ALL, "GET");

      setContactDetails(response?.data?.[0] || {});
    } catch (error) {
      console.error("Error fetching contact details:", error);
    }
  };

  useEffect(() => {
    getContactUs();
  }, []);

  return (
    <Container fluid className="contact-wrapper py-5">
      <Container>
        <Row className="contact-row">
          {/* LEFT CONTENT (DESCRIPTION) */}
          <Col lg={6} md={6} sm={12} className="contact-left-col pe-lg-5">
            <div className="contact-left" style={{ maxWidth: "100%" }}>
              <h2 className="mb-3 fw-bold">Get In Touch</h2>

              {contactDetails?.text ? (
                <div
                  className="contact-editor-content"
                  style={{
                    textAlign: "left",

                    wordBreak: "normal", // Words won't split like "a-bout"

                    overflowWrap: "break-word", // Ensures text stays inside the column

                    whiteSpace: "pre-wrap", // Keeps line breaks and wraps naturally

                    maxWidth: "100%", // Strictly stay inside the 50% area

                    overflow: "hidden", // Safety to prevent overflow

                    display: "block",

                    lineHeight: "1.6", // Better readability
                  }}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(contactDetails.text),
                  }}
                />
              ) : (
                <p className="text-muted">Loading contact information...</p>
              )}
            </div>
          </Col>

          {/* RIGHT FORM */}
          <Col lg={6} md={6} sm={12} className="contact-right-col">
            <p className="form-intro mb-4">
              Thank you for your interest. Please fill out the form and our team
              will respond within 24 hours.
            </p>

            <div className="contact-form-box p-4 shadow-sm border rounded bg-white">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Mobile No.</Form.Label>
                      <Form.Control
                        type="tel"
                        name="contactNo"
                        value={formData.contactNo}
                        onChange={handleChange}
                        placeholder="Enter your mobile number"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                  />
                </Form.Group>
                <div className="d-grid">
                  <Button
                    type="submit"
                    className="submit-btn py-2 fw-bold"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Contact;
