// import { Container, Row, Col } from "react-bootstrap";
// import { Link } from "react-router-dom";
// // import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
// import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
// // import { FaXTwitter } from "react-icons/fa6";
// // import Logo from "../../assets/logo.png";
// import { useEffect, useState } from "react";
// import { API_ENDPOINTS, apiCall } from "../../config/api";

// const Footer = () => {
//   const [logo, setLogo] = useState("");

//   useEffect(() => {
//     getLogo();
//   }, []);

//   const getLogo = async () => {
//     try {
//       const response = await apiCall(API_ENDPOINTS.LOGO.GET_LOGO);
//       console.log("response", response?.data[0]?.image);

//       if (response?.data?.length > 0) {
//         setLogo(`${response.data[0]?.image}`);
//       }
//     } catch (err) {
//       console.error("Failed to fetch logo", err);
//     }
//   };

//   return (
//     <footer
//       className="border-top py-5 mt-5"
//       style={{ backgroundColor: "hsl(0, 0%, 94%)" }}
//     >
//       <style>{`
//         .social-circle {
//           width: 35px;
//           height: 35px;
//           background-color: #e0e0e0;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: #333;
//           transition: all 0.3s ease;
//           text-decoration: none;
//         }
//         .social-circle:hover {
//           background-color: #d4af37;
//           color: #fff;
//           transform: translateY(-3px);
//         }
//         .footer-heading {
//           font-weight: 700;
//           margin-bottom: 1.5rem;
//           font-size: 1rem;
//           color: #212529;
//           text-transform: uppercase; /* Professional touch */
//           letter-spacing: 0.5px;
//         }
//       `}</style>

//       <Container>
//         {/* Changed text-center to text-start for mobile alignment */}
//         <Row className="gy-5 text-start">
//           {/* Brand Section */}
//           <Col lg={4} md={12} xs={12}>
//             {/* Removed align-items-center to keep logo left-aligned */}
//             <div className="d-flex flex-column align-items-center">
//               <img
//                 src={logo}
//                 alt="Logo"
//                 style={{ width: "150px", height: "50px", objectFit: "contain" }}
//                 className="mb-3"
//               />
//               <p
//                 className="text-muted small mb-0"
//                 style={{ maxWidth: "300px", lineHeight: "1.6" }}
//               >
//                 Your premium destination for high-quality journalism and
//                 deep-dive technical insights.
//               </p>
//             </div>
//           </Col>

//           {/* Explore Section */}
//           <Col lg={2} md={4} xs={6}>
//             <h5 className="footer-heading">Explore</h5>
//             <ul className="list-unstyled mb-0">
//               <li className="mb-2">
//                 <Link to="/" className="text-decoration-none text-muted small">
//                   Home
//                 </Link>
//               </li>
//               <li className="mb-2">
//                 <Link
//                   to="/about"
//                   className="text-decoration-none text-muted small"
//                 >
//                   About Us
//                 </Link>
//               </li>
//               <li className="mb-2">
//                 <Link
//                   to="/contact"
//                   className="text-decoration-none text-muted small"
//                 >
//                   Contact
//                 </Link>
//               </li>
//             </ul>
//           </Col>

//           {/* Follow Us Section */}
//           <Col lg={3} md={4} xs={6}>
//             <h5 className="footer-heading">Follow Us</h5>
//             {/* Changed justify-content-center to justify-content-start */}
//             <div className="d-flex gap-2 justify-content-start">
//               <a href="#" className="social-circle">
//                 <FaFacebookF size={14} />
//               </a>

//               <a href="#" className="social-circle">
//                 <FaXTwitter size={14} />
//               </a>

//               <a href="#" className="social-circle">
//                 <FaLinkedinIn size={14} />
//               </a>

//               {/* ✅ New YouTube Icon */}
//               <a href="#" className="social-circle">
//                 <FaYoutube size={14} />
//               </a>
//             </div>
//           </Col>

//           {/* Legal Section */}
//           <Col lg={3} md={4} xs={12}>
//             <h5 className="footer-heading">Legal</h5>
//             <ul className="list-unstyled mb-0">
//               <li className="mb-2">
//                 <Link
//                   to="/privacypolicy"
//                   className="text-decoration-none text-muted small"
//                 >
//                   Privacy Policy
//                 </Link>
//               </li>
//               <li className="mb-2">
//                 <Link
//                   to="/termsconditions"
//                   className="text-decoration-none text-muted small"
//                 >
//                   Terms & Conditions
//                 </Link>
//               </li>
//             </ul>
//           </Col>
//         </Row>

//         <hr className="my-4" style={{ opacity: "0.1" }} />

//         {/* Bottom bar left-aligned on mobile */}
//         <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-1">
//           <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>
//             © 2026 Sapience Desk. All Rights Reserved.
//           </p>
//         </div>
//       </Container>
//     </footer>
//   );
// };

// export default Footer;
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { API_ENDPOINTS, apiCall } from "../../config/api";

const Footer = () => {
  const [logo, setLogo] = useState("");
  // State to store social links
  const [socialLinks, setSocialLinks] = useState({
    facebook: "#",
    twitter: "#",
    linkedin: "#",
    youtube: "#",
  });
  const [footerText, setFooterText] = useState(null);
  useEffect(() => {
    getLogo();
    getSocialLinks();
    getFooterText();
  }, []);

  const getLogo = async () => {
    try {
      const response = await apiCall(API_ENDPOINTS.LOGO.GET_LOGO);
      if (response?.data?.length > 0) {
        setLogo(`${response.data[0]?.image}`);
      }
    } catch (err) {
      console.error("Failed to fetch logo", err);
    }
  };

  // ✅ New function to fetch social media links
  const getSocialLinks = async () => {
    try {
      // Assuming your API_ENDPOINTS has a key for ADMIN.GET_ALL
      const response = await apiCall(API_ENDPOINTS.ADMIN.GET_ALL);
      if (response?.status && response?.admins?.length > 0) {
        const admin = response.admins[0];

        setSocialLinks({
          facebook: admin.facebook || "#",
          twitter: admin.twitter || "#",
          linkedin: admin.linkedin || "#",
          youtube: admin.youtube || "#",
        });
      }
    } catch (err) {
      console.error("Failed to fetch social links", err);
    }
  };
  const getFooterText = async () => {
    try {
      // Assuming your API_ENDPOINTS has a key for ADMIN.GET_ALL
      const response = await apiCall(
        API_ENDPOINTS.FooterContent.GET_Footer_Text,
      );
      console.log("FOOTER CONTENT ", response?.admins);
      const admin = response.admins[0];
      console.log("Footer FInal", admin);

      setFooterText(admin);

      // setSocialLinks({
      //   facebook: admin.facebook || "#",
      //   twitter: admin.twitter || "#",
      //   linkedin: admin.linkedin || "#",
      //   youtube: admin.youtube || "#",
      // });
    } catch (err) {
      console.error("Failed to fetch social links", err);
    }
  };

  return (
    <footer
      className="border-top py-5 mt-5"
      style={{ backgroundColor: "hsl(0, 0%, 94%)" }}
    >
      <style>{`
        .social-circle {
          width: 35px;
          height: 35px;
          background-color: #e0e0e0; 
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #333;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .social-circle:hover {
          background-color: #d4af37; 
          color: #fff;
          transform: translateY(-3px);
        }
        .footer-heading {
          font-weight: 700;
          margin-bottom: 1.5rem;
          font-size: 1rem;
          color: #212529;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      `}</style>

      <Container>
        <Row className="gy-5 text-start">
          {/* Brand Section */}
          <Col lg={4} md={12} xs={12}>
            <div className="d-flex flex-column align-items-center">
              <img
                src={logo}
                alt="Logo"
                style={{ width: "150px", height: "50px", objectFit: "contain" }}
                className="mb-3"
              />
              <p
                className="text-muted small mb-0"
                style={{ maxWidth: "300px", lineHeight: "1.6" }}
              >
                {footerText?.textEditor}
              </p>
            </div>
          </Col>

          {/* Explore Section */}
          <Col lg={2} md={4} xs={6}>
            <h5 className="footer-heading">Explore</h5>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none text-muted small">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/about"
                  className="text-decoration-none text-muted small"
                >
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/contact"
                  className="text-decoration-none text-muted small"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </Col>

          {/* Follow Us Section */}
          <Col lg={3} md={4} xs={6}>
            <h5 className="footer-heading">Follow Us</h5>
            <div className="d-flex gap-2 justify-content-start">
              {/* ✅ Integrated dynamic links below */}
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="social-circle"
              >
                <FaFacebookF size={14} />
              </a>

              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                className="social-circle"
              >
                <FaXTwitter size={14} />
              </a>

              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="social-circle"
              >
                <FaLinkedinIn size={14} />
              </a>

              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="social-circle"
              >
                <FaYoutube size={14} />
              </a>
            </div>
          </Col>

          {/* Legal Section */}
          <Col lg={3} md={4} xs={12}>
            <h5 className="footer-heading">Legal</h5>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link
                  to="/privacypolicy"
                  className="text-decoration-none text-muted small"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/termsconditions"
                  className="text-decoration-none text-muted small"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </Col>
        </Row>

        <hr className="my-4" style={{ opacity: "0.1" }} />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-1">
          <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>
            © 2026 Sapience Desk. All Rights Reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
