// import { Container, Row, Col, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { apiCall, API_ENDPOINTS, API_BASE_URL } from "../config/api";

// const getImageUrl = (imagePath) => {
//   if (!imagePath) return "https://via.placeholder.com/600x400?text=No+Image";
//   if (imagePath.startsWith("http")) return imagePath;

//   const cleanPath = imagePath.replace(/^public[\\/]/, "");
//   return `${API_BASE_URL}/${cleanPath.replace(/\\/g, "/")}`;
// };

// const About = () => {
//   const [aboutData, setAboutData] = useState([]);
//   const [mission, setMission] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAboutUs = async () => {
//       try {
//         setLoading(true);
//         const response = await apiCall(API_ENDPOINTS.ABOUTUS.GET_ALL);

//         if (response.status && response.data) {
//           setAboutData(response.data.sections || []);
//           setMission(response.data.mission || "About Us");
//         }
//       } catch (err) {
//         console.error("Failed to load about us content", err);
//         setAboutData([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAboutUs();
//   }, []);

//   return (
//     <div className="about-page bg-light" style={{ minHeight: "100vh" }}>
//       {/* Header Section */}
//       <section className="bg-white py-5 mb-4 shadow-sm">
//         <Container>
//           <div className="text-center py-4">
//             <h1
//               className="fw-bold display-4 mb-3 "
//               style={{ fontSize: "2.5rem" }}
//             >
//               About Us
//             </h1>
//             <p
//               className="text-muted fs-5 mx-auto"
//               style={{ maxWidth: "700px" }}
//             >
//               {mission}
//             </p>
//           </div>
//         </Container>
//       </section>

//       {/* Main Sections */}
//       <Container className="py-4">
//         {loading ? (
//           <div className="text-center py-5">
//             <div className="spinner-border text-primary" role="status"></div>
//             <p className="mt-3">Loading our story...</p>
//           </div>
//         ) : (
//           aboutData.map((item, index) => (
//             <div
//               key={item._id}
//               className="mb-5 shadow-sm rounded-4 overflow-hidden bg-white"
//             >
//               <Row
//                 className={`g-0 align-items-stretch ${
//                   index % 2 !== 0 ? "flex-row-reverse" : ""
//                 }`}
//               >
//                 {/* Text Column */}
//                 <Col md={6} className="d-flex align-items-center">
//                   <div className="p-4 p-md-5 w-100">
//                     <div
//                       style={{
//                         wordBreak: "break-word",
//                         textAlign: "left",
//                         color: "#333",
//                         fontSize: "1.1rem",
//                         lineHeight: "1.8",
//                       }}
//                       dangerouslySetInnerHTML={{ __html: item.text }}
//                     />
//                   </div>
//                 </Col>

//                 {/* Image Column */}
//                 <Col md={6} className="p-0">
//                   <div className="about-image-wrapper">
//                     <img
//                       src={getImageUrl(item.image)}
//                       alt="About Section"
//                       className="about-image"
//                       onError={(e) => {
//                         e.target.src =
//                           "https://via.placeholder.com/800x600?text=Image+Unavailable";
//                       }}
//                     />
//                   </div>
//                 </Col>
//               </Row>
//             </div>
//           ))
//         )}
//       </Container>

//       {/* CTA Section */}
//       <section className="py-5">
//         <Container>
//           <div
//             className=" text-white p-5 rounded-5 shadow text-center my-4"
//             style={{ backgroundColor: "#ffffff" }}
//           >
//             <h2 className="mb-3 fw-bold">Ready to join our community?</h2>
//             <p className="mb-4 text-light-50">
//               Stay updated with the latest in tech and business by becoming a
//               member.
//             </p>
//             <Button
//               as={Link}
//               to="/membership"
//               size="lg"
//               className="rounded-pill px-5 py-3 fw-bold shadow-sm"
//               style={{
//                 backgroundColor: "#d4af37",
//                 borderColor: "#d4af37",
//                 color: "#ffffff",
//               }}
//             >
//               Join Membership Now
//             </Button>
//           </div>
//         </Container>
//       </section>
//     </div>
//   );
// };

// export default About;
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiCall, API_ENDPOINTS, API_BASE_URL } from "../config/api";

const getImageUrl = (imagePath) => {
  if (!imagePath) return "https://via.placeholder.com/600x400?text=No+Image";
  if (imagePath.startsWith("http")) return imagePath;
  const cleanPath = imagePath.replace(/^public[\\/]/, "");
  return `${API_BASE_URL}/${cleanPath.replace(/\\/g, "/")}`;
};

const About = () => {
  const [aboutData, setAboutData] = useState([]);
  const [mission, setMission] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        setLoading(true);
        const response = await apiCall(API_ENDPOINTS.ABOUTUS.GET_ALL);
        if (response.status && response.data) {
          setAboutData(response.data.sections || []);
          setMission(response.data.mission || "About Us");
        }
      } catch (err) {
        console.error("Failed to load about us content", err);
        setAboutData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAboutUs();
  }, []);

  return (
    <div className="about-page bg-light" style={{ minHeight: "100vh" }}>
      {/* Header Section */}
      <section className="bg-white  shadow-sm">
        <Container>
          <div className="text-center py-4">
            <h1 className="fw-bold mb-3" style={{ fontSize: "2.5rem" }}>
              About Us
            </h1>
            <p
              className="text-muted fs-5 mx-auto"
              style={{ maxWidth: "700px" }}>
              {mission}
            </p>
          </div>
        </Container>
      </section>

      {/* Main Sections */}
      <Container className="py-2 py-md-4">
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3 text-muted">Loading our story...</p>
          </div>
        ) : (
          aboutData.map((item, index) => (
            <div
              key={item._id}
              className=" shadow-sm rounded-4 overflow-hidden bg-white border-0">
              {/* flex-md-row-reverse ensures alternating only on Desktop */}
              <Row
                className={`g-0 align-items-center ${
                  index % 2 !== 0 ? "flex-md-row-reverse" : ""
                }`}>
                {/* Text Column */}
                <Col md={6} xs={12}>
                  <div className="p-4 p-md-5">
                    <div
                      className="about-text-content"
                      style={{
                        wordBreak: "break-word",
                        textAlign: "left",
                        color: "#333",
                        fontSize: "1.1rem",
                        lineHeight: "1.8",
                      }}
                      dangerouslySetInnerHTML={{ __html: item.text }}
                    />
                  </div>
                </Col>

                {/* Image Column */}
                <Col md={6} xs={12}>
                  <div className="about-image-wrapper">
                    <img
                      src={getImageUrl(item.image)}
                      alt="About Section"
                      className="about-image"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/800x600?text=Image+Unavailable";
                      }}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          ))
        )}
      </Container>

      {/* CTA Section */}
      <section className="">
        <Container>
          {/* Used bg-premium-dark from your CSS for professional look and visibility */}
          <div className="bg-premium-dark text-white p-3  rounded-section shadow text-center my-4">
            <h2 className="mb-3 fw-bold text-white">
              Ready to join our community?
            </h2>
            <p className="mb-4 text-accent opacity-75">
              Stay updated with the latest in tech and business by becoming a
              member.
            </p>
            <Button
              as={Link}
              to="/membership"
              size="lg"
              className="rounded-pill fw-bold shadow-sm border-0"
              style={{
                backgroundColor: "#d4af37",
                color: "#ffffff",
              }}>
              Join Membership Now
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default About;
