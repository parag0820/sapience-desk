// import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
// import { useEffect, useState } from "react";
// import { API_ENDPOINTS, apiCall } from "../config/api";

// const EventPage = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const response = await apiCall(API_ENDPOINTS.EVENT.GET_ALL);
//       const activeEvents = (response?.events || []).filter(
//         (e) => e.status === "active",
//       );
//       console.log("activeEvents", activeEvents);

//       setEvents(activeEvents);
//     } catch (err) {
//       console.error("Event fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-light">
//       {/* Hero Section */}
//       <div className="event-hero d-flex align-items-center text-white">
//         <Container className="text-center">
//           <h1 className="display-5 fw-bold" style={{ color: "#fff" }}>
//             Upcoming Events
//           </h1>
//           <p className="lead" style={{ color: "#ddd" }}>
//             Stay updated with our latest events, workshops & seminars.
//           </p>
//         </Container>
//       </div>

//       {/* Events Grid */}
//       <Container className="py-5">
//         <Row className="g-4">
//           {loading ? (
//             <p className="text-center">Loading events...</p>
//           ) : events.length === 0 ? (
//             <p className="text-center">No events available.</p>
//           ) : (
//             events.map((event) => (
//               <Col xs={12} sm={6} lg={4} key={event._id}>
//                 <Card className="event-card h-100 border-0 shadow-sm">
//                   <div className="overflow-hidden">
//                     <Card.Img
//                       variant="top"
//                       src={event.image}
//                       className="event-img"
//                     />
//                   </div>

//                   <Card.Body className="d-flex flex-column">
//                     <Badge bg="warning" className="mb-2 align-self-start">
//                       {new Date(event.startDate).toLocaleDateString()}
//                     </Badge>

//                     <Card.Title className="fw-bold">{event.title}</Card.Title>

//                     <Card.Text className="text-muted small flex-grow-1">
//                       {event.description?.slice(0, 100)}...
//                     </Card.Text>

//                     <div className="mt-3">
//                       <small className="text-muted d-block">
//                         📍 {event.location}
//                       </small>

//                       <Button variant="dark" size="sm" className="mt-2 w-100">
//                         View Details
//                       </Button>
//                     </div>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))
//           )}
//         </Row>
//       </Container>

//       {/* Styles */}
//       <style>{`
//         .event-hero {
//           height: 300px;
//           background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
//                       url("https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600");
//           background-size: cover;
//           background-position: center;
//         }

//         .event-card {
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//           border-radius: 16px;
//         }

//         .event-card:hover {
//           transform: translateY(-8px);
//           box-shadow: 0 12px 30px rgba(0,0,0,0.15);
//         }

//         .event-img {
//           height: 220px;
//           object-fit: cover;
//           transition: transform 0.4s ease;
//         }

//         .event-card:hover .event-img {
//           transform: scale(1.05);
//         }

//         @media (max-width: 768px) {
//           .event-hero {
//             height: 200px;
//           }
//           .event-img {
//             height: 180px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default EventPage;

// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Button,
//   Badge,
//   Modal,
// } from "react-bootstrap";
// import { useEffect, useState } from "react";
// import { API_ENDPOINTS, apiCall } from "../config/api";
// import eventImage from "../assets/events.jpg";

// const EventPage = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const response = await apiCall(API_ENDPOINTS.EVENT.GET_ALL);

//       const activeEvents = (response?.events || []).filter(
//         (e) => e.status === "active",
//       );

//       setEvents(activeEvents);
//     } catch (err) {
//       console.error("Event fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOpenModal = (event) => {
//     setSelectedEvent(event);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setSelectedEvent(null);
//   };

//   return (
//     <div className="bg-light">
//       {/* Hero Section */}
//       <div
//         className="event-hero d-flex align-items-center text-white"
//         style={{
//           backgroundImage: `
//       linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
//       url(${eventImage})
//     `,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <Container className="text-center">
//           <h1 className="display-5 fw-bold text-white">Upcoming Events</h1>
//           <p className="lead text-light">
//             Stay updated with our latest events, workshops & seminars.
//           </p>
//         </Container>
//       </div>

//       {/* Events Grid */}
//       <Container className="py-5">
//         <Row className="g-4">
//           {loading ? (
//             <p className="text-center">Loading events...</p>
//           ) : events.length === 0 ? (
//             <p className="text-center">No events available.</p>
//           ) : (
//             events.map((event) => (
//               <Col xs={12} sm={6} lg={4} key={event._id}>
//                 <Card className="event-card h-100 border-0 shadow-sm">
//                   <div className="overflow-hidden">
//                     <Card.Img
//                       variant="top"
//                       src={event.image}
//                       className="event-img"
//                     />
//                   </div>

//                   <Card.Body className="d-flex flex-column">
//                     {/* Date */}
//                     <Badge bg="warning" className="mb-2 align-self-start">
//                       {new Date(event.startDate).toLocaleDateString()} -{" "}
//                       {new Date(event.endDate).toLocaleDateString()}
//                     </Badge>

//                     <Card.Title className="fw-bold">{event.title}</Card.Title>

//                     <Card.Text className="text-muted small flex-grow-1">
//                       {event.description?.slice(0, 100)}...
//                     </Card.Text>

//                     {/* Time + Location */}
//                     <div className="mt-2 small text-muted">
//                       🕒 {event.startTime} - {event.endTime}
//                     </div>

//                     <div className="mt-1 small text-muted">
//                       📍 {event.location}
//                     </div>

//                     <Button
//                       variant="dark"
//                       size="sm"
//                       className="mt-3 w-100"
//                       onClick={() => handleOpenModal(event)}
//                     >
//                       View Details
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))
//           )}
//         </Row>
//       </Container>

//       {/* Event Details Modal */}
//       <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
//         {selectedEvent && (
//           <>
//             <Modal.Header closeButton>
//               <Modal.Title>{selectedEvent.title}</Modal.Title>
//             </Modal.Header>

//             <Modal.Body>
//               <img
//                 src={selectedEvent.image}
//                 alt="event"
//                 className="img-fluid rounded mb-3"
//               />

//               <p>
//                 <strong>Date:</strong>{" "}
//                 {new Date(selectedEvent.startDate).toLocaleDateString()} -{" "}
//                 {new Date(selectedEvent.endDate).toLocaleDateString()}
//               </p>

//               <p>
//                 <strong>Time:</strong> {selectedEvent.startTime} -{" "}
//                 {selectedEvent.endTime}
//               </p>

//               <p>
//                 <strong>Location:</strong> {selectedEvent.location}
//               </p>

//               <hr />

//               <p>{selectedEvent.description}</p>
//             </Modal.Body>

//             <Modal.Footer>
//               <Button variant="secondary" onClick={handleCloseModal}>
//                 Close
//               </Button>
//             </Modal.Footer>
//           </>
//         )}
//       </Modal>

//       {/* Styles */}
//       <style>{`
//   .event-hero {
//     height: 300px;
//   }

//   @media (max-width: 768px) {
//     .event-hero {
//       height: 200px;
//     }
//   }

//         .event-card {
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//           border-radius: 16px;
//         }

//         .event-card:hover {
//           transform: translateY(-8px);
//           box-shadow: 0 12px 30px rgba(0,0,0,0.15);
//         }

//         .event-img {
//           height: 220px;
//           object-fit: cover;
//           transition: transform 0.4s ease;
//         }

//         .event-card:hover .event-img {
//           transform: scale(1.05);
//         }

//         @media (max-width: 768px) {
//           .event-hero {
//             height: 200px;
//           }
//           .event-img {
//             height: 180px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default EventPage;
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Table,
  Spinner,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { API_ENDPOINTS, apiCall } from "../config/api";
import eventImage from "../assets/events.jpg";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await apiCall(API_ENDPOINTS.EVENT.GET_ALL);
      const activeEvents = (response?.events || []).filter(
        (e) => e.status === "active",
      );
      setEvents(activeEvents);
    } catch (err) {
      console.error("Event fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Hero Section */}
      <div
        className="event-hero d-flex align-items-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${eventImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container className="text-center">
          <h1 className="display-5 fw-bold text-white">Upcoming Events</h1>
          <p className="lead text-light">
            Stay updated with our latest events, workshops & seminars.
          </p>
        </Container>
      </div>

      {/* Events Table List */}
      <Container className="py-5">
        <div className="bg-white shadow-sm rounded-3 overflow-hidden border">
          <div
            className="p-3 border-bottom  d-flex justify-content-between align-items-center"
            style={{ backgroundColor: "#e4c4cd" }}
          >
            <h5 className="mb-0 fw-bold">All Events</h5>
            <span className="badge bg-dark">Total: {events.length}</span>
          </div>

          <div className="table-responsive">
            <Table hover className="mb-0 align-middle custom-event-table">
              <thead className="table-light text-uppercase small fw-bold">
                <tr>
                  <th className="ps-4">Event</th>
                  <th>Details</th>
                  <th>Location</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="text-center py-5">
                      <Spinner animation="border" size="sm" variant="warning" />
                      <span className="ms-2">Loading events...</span>
                    </td>
                  </tr>
                ) : events.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-5 text-muted">
                      No events available.
                    </td>
                  </tr>
                ) : (
                  events.map((event) => (
                    <tr key={event._id} className="event-row">
                      <td className="ps-4">
                        <div
                          className="fw-bold text-primary text-decoration-none cursor-pointer event-title-link"
                          onClick={() => handleOpenModal(event)}
                        >
                          {event.title}
                        </div>
                        <div className="small text-muted d-md-none mt-1">
                          {event.location}
                        </div>
                      </td>
                      <td>
                        <div className="small">
                          <strong>Date:</strong>{" "}
                          {new Date(event.startDate).toLocaleDateString()} -{" "}
                          {new Date(event.endDate).toLocaleDateString()}
                        </div>
                        <div className="small text-muted mt-1">
                          <strong>Time:</strong> {event.startTime} -{" "}
                          {event.endTime}
                        </div>
                      </td>
                      <td className="text-secondary small">{event.location}</td>
                      <td className="text-center">
                        <Button
                          variant="outline-dark"
                          size="sm"
                          className="rounded-pill px-3 fw-bold"
                          onClick={() => handleOpenModal(event)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
          <div className="p-3 bg-light border-top small text-muted">
            Showing {events.length} of {events.length}
          </div>
        </div>
      </Container>

      {/* Event Details Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        {selectedEvent && (
          <>
            <Modal.Header closeButton>
              <Modal.Title className="fw-bold">
                {selectedEvent.title}
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <img
                src={selectedEvent.image}
                alt="event"
                className="img-fluid rounded-3 mb-4 shadow-sm"
                style={{
                  width: "100%",
                  maxHeight: "400px",
                  objectFit: "cover",
                }}
              />

              <Row className="mb-4">
                <Col md={6}>
                  <div className="p-3 bg-light rounded-3 h-100">
                    <p className="mb-1 text-muted small">EVENT PERIOD</p>
                    <h6 className="fw-bold mb-0">
                      {new Date(selectedEvent.startDate).toLocaleDateString()}{" "}
                      to {new Date(selectedEvent.endDate).toLocaleDateString()}
                    </h6>
                  </div>
                </Col>
                <Col md={6} className="mt-3 mt-md-0">
                  <div className="p-3 bg-light rounded-3 h-100">
                    <p className="mb-1 text-muted small">TIMINGS & LOCATION</p>
                    <h6 className="fw-bold mb-1">
                      {selectedEvent.startTime} - {selectedEvent.endTime}
                    </h6>
                    <p className="mb-0 small text-primary fw-bold">
                      📍 {selectedEvent.location}
                    </p>
                  </div>
                </Col>
              </Row>

              <h6 className="fw-bold text-uppercase small text-muted border-bottom pb-2">
                Description
              </h6>
              <p
                className="lh-lg text-secondary"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {selectedEvent.description}
              </p>
            </Modal.Body>

            <Modal.Footer className="border-0">
              <Button
                variant="secondary"
                onClick={handleCloseModal}
                className="rounded-pill px-4"
              >
                Close
              </Button>
              {/* <Button variant="warning" className="rounded-pill px-4 fw-bold">
                Register Now
              </Button> */}
            </Modal.Footer>
          </>
        )}
      </Modal>

      <style>{`
        .event-hero {
          height: 250px;
        }

        .custom-event-table thead th {
          background-color: #853a44;
          border-bottom: 2px solid #eee;
          color: #ffffff;
          padding: 15px 10px;
        }

        .event-row:hover {
          background-color: #f1f0eb !important;
        }

        .event-title-link {
          color: #d43f3a !important; /* Adjust to match your Shiv Yog theme red if preferred */
          cursor: pointer;
          transition: 0.2s;
        }

        .event-title-link:hover {
          text-decoration: underline !important;
        }

        .cursor-pointer {
          cursor: pointer;
        }

        .table-responsive {
          scrollbar-width: thin;
        }

        @media (max-width: 768px) {
          .event-hero {
            height: 180px;
          }
        }
      `}</style>
    </div>
  );
};

export default EventPage;
