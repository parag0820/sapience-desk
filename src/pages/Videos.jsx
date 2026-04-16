// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Ratio,
//   Card,
//   Button,
//   Spinner,
// } from "react-bootstrap";
// import { API_ENDPOINTS, apiCall } from "../config/api";

// const Videos = () => {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   const fetchVideos = async () => {
//     try {
//       const response = await apiCall(API_ENDPOINTS.VIDEO.GET_ALL);
//       setVideos(response?.data || []);
//     } catch (err) {
//       console.error("Video fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Convert normal YouTube link → embed link
//   const getEmbedUrl = (url) => {
//     if (!url) return "";
//     const videoId = url.split("v=")[1]?.split("&")[0];
//     return `https://www.youtube.com/embed/${videoId}`;
//   };

//   return (
//     <div className="videos-section py-5">
//       <Container>
//         {/* Header */}
//         <div className="text-center mb-5">
//           <h1 className="display-6 fw-bold">All Videos</h1>
//           {/* <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
//             Designed to help you.
//           </p> */}
//         </div>

//         {/* Grid */}
//         <Row className="g-4">
//           {loading ? (
//             <div className="text-center">
//               <Spinner animation="border" />
//             </div>
//           ) : videos.length === 0 ? (
//             <p className="text-center">No videos available.</p>
//           ) : (
//             videos.map((video) => (
//               <Col key={video._id} xs={12} sm={6} lg={4}>
//                 <Card className="video-card border-0 shadow-sm h-100">
//                   <div className="video-wrapper">
//                     <Ratio aspectRatio="16x9">
//                       <iframe
//                         src={getEmbedUrl(video.videoLink)}
//                         title={video.title}
//                         allowFullScreen
//                       />
//                     </Ratio>
//                   </div>

//                   <Card.Body className="d-flex flex-column">
//                     <h5 className="fw-bold">{video.title}</h5>

//                     <p className="text-muted small flex-grow-1">
//                       {video.description?.slice(0, 100)}...
//                     </p>

//                     <Button
//                       variant="primary"
//                       size="sm"
//                       className="w-100 rounded-pill"
//                       href={video.videoLink}
//                       target="_blank"
//                     >
//                       Watch on YouTube
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))
//           )}
//         </Row>
//       </Container>

//       {/* Responsive Styling */}
//       <style>{`
//         .videos-section {
//           background: #f9fafb;
//         }

//         .video-card {
//           border-radius: 16px;
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//         }

//         .video-card:hover {
//           transform: translateY(-6px);
//           box-shadow: 0 10px 30px rgba(0,0,0,0.1);
//         }

//         .video-wrapper {
//           overflow: hidden;
//           border-top-left-radius: 16px;
//           border-top-right-radius: 16px;
//         }

//         iframe {
//           border-radius: 0;
//         }

//         @media (max-width: 768px) {
//           .videos-section {
//             padding: 40px 15px;
//           }

//           .video-card {
//             border-radius: 12px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Videos;
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Ratio,
  Card,
  Button,
  Spinner,
} from "react-bootstrap";
import { API_ENDPOINTS, apiCall } from "../config/api";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await apiCall(API_ENDPOINTS.VIDEO.GET_ALL);

      console.log("API RESPONSE:", response);

      if (response?.status) {
        setVideos(response?.data || []);
      } else if (response?.data?.status) {
        setVideos(response?.data?.data || []);
      }
    } catch (err) {
      console.error("Video fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Robust YouTube ID Extractor
  const getYouTubeId = (url) => {
    if (!url) return null;

    const regExp =
      /(?:youtube\.com\/(?:.*v=|embed\/|v\/|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/;

    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  // const getEmbedUrl = (url) => {
  //   const videoId = getYouTubeId(url);
  //   return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0` : "";
  // };
  const getEmbedUrl = (url) => {
    if (!url) return "";

    let videoId = "";

    // Standard watch URL
    if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1].split("&")[0];
    }

    // Short URL
    else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0` : "";
  };

  const getThumbnail = (url) => {
    const videoId = getYouTubeId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";
  };

  return (
    <div className="videos-section py-5">
      <Container>
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="display-6 fw-bold">All Videos</h1>
        </div>

        {/* Grid */}
        <Row className="g-4">
          {loading ? (
            <div className="text-center w-100">
              <Spinner animation="border" />
            </div>
          ) : videos.length === 0 ? (
            <p className="text-center w-100">No videos available.</p>
          ) : (
            videos.map((video) => (
              <Col key={video._id} xs={12} sm={6} lg={4}>
                <Card className="video-card border-0 shadow-sm h-100">
                  <div className="video-wrapper">
                    {getEmbedUrl(video.videoLink) ? (
                      <Ratio aspectRatio="16x9">
                        <iframe
                          src={getEmbedUrl(video.videoLink)}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          referrerPolicy="strict-origin-when-cross-origin"
                        />
                      </Ratio>
                    ) : (
                      <img
                        src={getThumbnail(video.videoLink)}
                        alt={video.title}
                        className="img-fluid"
                      />
                    )}
                  </div>

                  <Card.Body className="d-flex flex-column">
                    <h5 className="fw-bold">{video.title}</h5>

                    <p className="text-muted small flex-grow-1">
                      {video.description
                        ? video.description.slice(0, 100)
                        : "No description available"}
                      ...
                    </p>

                    <Button
                      variant="dark"
                      size="sm"
                      className="w-100 rounded-pill mt-2"
                      href={video.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch on YouTube
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>

      {/* Styling */}
      <style>{`
        .videos-section {
          background: #f9fafb;
        }

        .video-card {
          border-radius: 16px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .video-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
        }

        .video-wrapper {
          overflow: hidden;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
        }

        iframe {
          width: 100%;
          height: 100%;
        }

        @media (max-width: 768px) {
          .videos-section {
            padding: 40px 15px;
          }

          .video-card {
            border-radius: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default Videos;
