// import { Container, Row, Col, Card, Badge, Image } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { API_ENDPOINTS, apiCall, API_BASE_URL } from "../config/api";
// import Contact from "./Contact";

// const Home = () => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [banners, setBanners] = useState([]);
//   console.log("articles", articles);

//   const heroBanner = banners?.[0]?.image;
//   const bottomBanner = banners?.[1]?.image;

//   const generateSlug = (title) => {
//     return title
//       .toLowerCase()
//       .trim()
//       .replace(/[^\w\s-]/g, "")
//       .replace(/\s+/g, "-")
//       .replace(/-+/g, "-");
//   };

//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return "https://via.placeholder.com/500?text=No+Image";
//     if (imagePath.startsWith("http")) return imagePath;
//     return `${API_BASE_URL}/${imagePath.replace(/\\/g, "/")}`;
//   };

//   const getBannerImage = async () => {
//     try {
//       const response = await apiCall(API_ENDPOINTS.LOGO.GET_LOGO);
//       const activeItems = (response?.data || []).filter(
//         (item) => item.status === "active",
//       );
//       const bannerItems = activeItems
//         .filter((item) => item.type?.type === "banner")
//         .slice(0, 2);
//       setBanners(bannerItems);
//     } catch (err) {
//       console.error("Failed to fetch banner image", err);
//     }
//   };

//   useEffect(() => {
//     getBannerImage();
//     const fetchArticles = async () => {
//       try {
//         setLoading(true);
//         const response = await apiCall(API_ENDPOINTS.ARTICLE.GET_ALL);

//         // 1. Extract the array
//         const articleData = Array.isArray(response)
//           ? response
//           : response.articles || response.data || [];

//         // 2. Sort the data (Most recent first)
//         const sortedArticles = articleData.sort((a, b) => {
//           return new Date(b.updatedAt) - new Date(a.updatedAt);
//         });

//         // 3. Update state with sorted array
//         setArticles(sortedArticles);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchArticles();
//   }, []);

//   const trendingArticles = articles.filter(
//     (art) => art.featured === false || art.featured === "false",
//   );
//   const featureArticles = articles.filter(
//     (art) => art.featured === true || art.featured === "true",
//   );

//   return (
//     <main className="bg-light">
//       {/* Custom Styles for nuances not covered by standard Bootstrap classes */}
//       {/* Custom Styles */}
//       <style>{`
//   .hero-section {
//     min-height: 30vh; /* Standard desktop height */
//     background-size: cover;
//     background-position: center;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     transition: all 0.3s ease;
//   }

//   .article-card-img {
//     height: 200px;
//     object-fit: cover;
//   }

//   /* Mobile Specific Adjustments */
//   @media (max-width: 576px) {
//     .hero-section {
//       min-height: 9vh; /* Reduced height for mobile */
//       max-height: 12vh; /* Cap height to prevent excessive space */
//        object-fit: cover;
//     }
//     .hero-container {
//       padding-top: 2rem !important;
//       padding-bottom: 2rem !important;
//     }
//     .article-card-img { height: 180px; }
//     .display-responsive {
//       font-size: 1.5rem !important;
//       font-weight: 700;
//     }
//     .hero-text-small {
//       font-size: 0.9rem !important;
//     }
//   }

//   @media (min-width: 1200px) {
//     .display-responsive { font-size: 3.5rem; font-weight: 800; }
//   }

//   .hover-shadow:hover {
//     transform: translateY(-5px);
//     transition: all 0.3s ease;
//     box-shadow: 0 1rem 3rem rgba(0,0,0,.175)!important;
//   }
// `}</style>

//       {/* Hero Section */}
//       <header
//         className="hero-section text-white mb-5"
//         style={{
//           backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
//     url("${heroBanner || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200"}")`,
//         }}
//       >
//         <Container className="text-center py-5 hero-container">
//           <h1 className="display-responsive mb-2">Insights, Stories & Ideas</h1>
//           <p className="lead px-md-5 hero-text-small mb-0">
//             Subscribe to read our premium articles and latest updates.
//           </p>
//         </Container>
//       </header>

//       <Container>
//         {/* Section Header */}
//         <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4 border-start border-primary border-4 ps-3">
//           <h2 className="fw-bold m-0">Recent</h2>
//           {/* <span className="text-muted small mt-2 mt-sm-0">
//             {trendingArticles.length} Articles
//           </span> */}
//         </div>

//         {loading ? (
//           <div className="text-center py-5">
//             <div className="spinner-border text-primary" role="status"></div>
//           </div>
//         ) : error ? (
//           <div className="alert alert-danger mx-auto">Error: {error}</div>
//         ) : (
//           <Row className="g-4">
//             {trendingArticles.map((art) => (
//               <Col lg={4} md={6} xs={12} key={art._id}>
//                 <Card className="h-100 border-0 shadow-sm hover-shadow">
//                   <Card.Img
//                     variant="top"
//                     className="article-card-img"
//                     src={getImageUrl(art.featureImage)}
//                     loading="lazy"
//                   />
//                   <Card.Body className="d-flex flex-column">
//                     <div className="mb-2">
//                       <Badge
//                         bg="info"
//                         className="text-dark bg-opacity-10 border border-info px-2 py-1"
//                       >
//                         {art.category?.categoryName || "General"}
//                       </Badge>
//                     </div>
//                     <Card.Title className="fw-bold mb-3 line-clamp-2">
//                       {art.title}
//                     </Card.Title>
//                     <Card.Text className="text-muted small mb-4 flex-grow-1">
//                       {art.excerpt ||
//                         `Latest updates and insights regarding ${art.title}.`}
//                     </Card.Text>
//                     <Link
//                       to={`/article/${generateSlug(art.title)}`}
//                       className="btn btn-outline-primary btn-sm w-fit mt-auto"
//                       style={{ width: "fit-content" }}
//                     >
//                       Read →
//                     </Link>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         )}

//         {/* Featured Section */}
//         <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4 mt-5 border-start border-warning border-4 ps-3">
//           <h2 className="fw-bold m-0">Featured</h2>
//           <span className="text-muted small mt-2 mt-sm-0">
//             {featureArticles.length} Handpicked
//           </span>
//         </div>

//         <Row className="g-4">
//           {featureArticles.map((art) => (
//             <Col lg={4} md={6} xs={12} key={art._id}>
//               <Card className="h-100 border-0 shadow-sm hover-shadow bg-dark text-white">
//                 <Card.Img
//                   variant="top"
//                   className="article-card-img opacity-75"
//                   src={getImageUrl(art.featureImage)}
//                 />
//                 <Card.Body>
//                   <Badge bg="warning" text="dark" className="mb-2">
//                     FEATURED
//                   </Badge>
//                   <Card.Title className="fw-bold h5">{art.title}</Card.Title>
//                   <Link
//                     to={`/article/${generateSlug(art.title)}`}
//                     className="link-warning text-decoration-none small fw-bold mt-2 d-block"
//                   >
//                     View Special Report →
//                   </Link>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Container>

//       {/* Bottom Ad Section */}
//       <Container className="my-5">
//         <div className="rounded-4 overflow-hidden shadow">
//           <Image
//             src={
//               bottomBanner ||
//               "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200"
//             }
//             className="w-100"
//             style={{ height: "auto", maxHeight: "200px", objectFit: "cover" }}
//             alt="Promotional Banner"
//             fluid
//           />
//         </div>
//       </Container>

//       <Contact />
//     </main>
//   );
// };

// export default Home;
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Image,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react"; // Added useMemo
import { API_ENDPOINTS, apiCall, API_BASE_URL } from "../config/api";
import { CiSearch } from "react-icons/ci";
import Contact from "./Contact";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [banners, setBanners] = useState([]);
  const [localSearch, setLocalSearch] = useState("");

  const location = useLocation();

  // 1. Get query from URL (e.g., from Header search)
  const queryParams = new URLSearchParams(location.search);
  const urlSearchQuery = queryParams.get("search") || "";

  // 2. Prioritize local typing, then URL query
  const effectiveSearch = localSearch || urlSearchQuery;

  // 3. Optimized filtering using useMemo
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const searchStr = effectiveSearch.toLowerCase();
      return (
        art.title?.toLowerCase().includes(searchStr) ||
        art.category?.categoryName?.toLowerCase().includes(searchStr)
      );
    });
  }, [articles, effectiveSearch]);

  const trendingArticles = filteredArticles.filter(
    (art) => art.featured === false || art.featured === "false",
  );
  const featureArticles = filteredArticles.filter(
    (art) => art.featured === true || art.featured === "true",
  );

  const heroBanner = banners?.[0]?.image;
  const bottomBanner = banners?.[1]?.image;

  // ... (generateSlug, getImageUrl, getBannerImage remain the same)
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/500?text=No+Image";
    if (imagePath.startsWith("http")) return imagePath;
    return `${API_BASE_URL}/${imagePath.replace(/\\/g, "/")}`;
  };

  useEffect(() => {
    const fetchBannersAndArticles = async () => {
      try {
        setLoading(true);
        // Fetch Banners
        const bannerResponse = await apiCall(API_ENDPOINTS.LOGO.GET_LOGO);
        const bannerItems = (bannerResponse?.data || [])
          .filter(
            (item) => item.status === "active" && item.type?.type === "banner",
          )
          .slice(0, 2);
        setBanners(bannerItems);

        // Fetch Articles
        const response = await apiCall(API_ENDPOINTS.ARTICLE.GET_ALL);
        const articleData = Array.isArray(response)
          ? response
          : response.articles || response.data || [];
        const sortedArticles = articleData.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
        );
        setArticles(sortedArticles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBannersAndArticles();
  }, []);

  return (
    <main className="bg-light">
      {/* ... (Styles and Hero Section remain the same) */}
      <style>{`
        .hero-section { min-height: 30vh; background-size: cover; background-position: center; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; }
        .article-card-img { height: 200px; object-fit: cover; }
        .search-bar-home { max-width: 500px; margin: -25px auto 0; position: relative; z-index: 10; }
        .hover-shadow:hover { transform: translateY(-5px); transition: all 0.3s ease; box-shadow: 0 1rem 3rem rgba(0,0,0,.175)!important; }
        /* Mobile View Fix */
        @media (max-width: 768px) {
        .hero-section {
         min-height: 12vh; /* Reduced height from 30vh */
        }
        .hero-section .container {
         padding-top: 1rem !important; /* Reduced top padding */
         padding-bottom: 1rem !important; /* Reduced bottom padding */
        }
       .search-bar-home {
        margin-top: -15px; /* Adjust search bar overlap for smaller banner */
        padding: 0 15px; /* Prevent search bar from touching screen edges */
    }
  }
      `}</style>

      <header
        className="hero-section text-white mb-5"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("${heroBanner || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200"}")`,
        }}
      >
        <Container className="text-center py-5">
          {/* <h1 className="display-responsive mb-2">Insights, Stories & Ideas</h1>
          <p className="lead px-md-5 hero-text-small mb-0">
            Subscribe to read our premium articles and latest updates.
          </p> */}
        </Container>
      </header>

      <Container>
        {/* Search Bar */}
        <div className="search-bar-home mb-5">
          <InputGroup className="shadow-sm rounded-pill overflow-hidden bg-white border-0">
            <InputGroup.Text className="bg-white border-0 ps-4">
              <CiSearch size={22} className="text-muted" />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search..."
              className="border-0 py-3 shadow-none"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          </InputGroup>
        </div>

        <div className="d-flex border-start border-primary border-4 ps-3 mb-4">
          <h2 className="fw-bold m-0">
            {effectiveSearch ? `Results for "${effectiveSearch}"` : "Recent"}
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary"></div>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-5">
            <h4>No articles found matching "{effectiveSearch}"</h4>
            <button
              className="btn btn-link"
              onClick={() => {
                setLocalSearch("");
                window.history.replaceState({}, "", "/");
              }}
            >
              Clear Search
            </button>
          </div>
        ) : (
          <Row className="g-4">
            {trendingArticles.map((art) => (
              <Col lg={4} md={6} xs={12} key={art._id}>
                <Card className="h-100 border-0 shadow-sm hover-shadow">
                  <Link to={`/article/${generateSlug(art.title)}`}>
                    <Card.Img
                      variant="top"
                      className="article-card-img"
                      src={getImageUrl(art.featureImage)}
                    />
                  </Link>
                  <Card.Body className="d-flex flex-column">
                    <Badge
                      bg="info"
                      className="text-dark bg-opacity-10 border border-info mb-2"
                      style={{ width: "fit-content" }}
                    >
                      {art.category?.categoryName || "General"}
                    </Badge>
                    <Link
                      to={`/article/${generateSlug(art.title)}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Card.Title className="fw-bold mb-3">
                        {art.title}
                      </Card.Title>
                    </Link>
                    <Card.Text className="text-muted small mb-4">
                      {art.excerpt || "Latest updates..."}
                    </Card.Text>
                    <Link
                      to={`/article/${generateSlug(art.title)}`}
                      className="btn btn-outline-primary btn-sm mt-auto w-fit"
                      style={{ width: "fit-content" }}
                    >
                      Read →
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Featured Section (Only if not searching) */}
        {!effectiveSearch && featureArticles.length > 0 && (
          <>
            <div className="d-flex border-start border-warning border-4 ps-3 mb-4 mt-5">
              <h2 className="fw-bold m-0">Featured</h2>
            </div>
            <Row className="g-4">
              {featureArticles.map((art) => (
                <Col lg={4} md={6} xs={12} key={art._id}>
                  <Card className="h-100 border-0 shadow-sm hover-shadow bg-dark text-white">
                    <Card.Img
                      variant="top"
                      className="article-card-img opacity-75"
                      src={getImageUrl(art.featureImage)}
                    />
                    <Card.Body>
                      <Badge bg="warning" text="dark" className="mb-2">
                        FEATURED
                      </Badge>
                      <Card.Title className="fw-bold h5">
                        {art.title}
                      </Card.Title>
                      <Link
                        to={`/article/${generateSlug(art.title)}`}
                        className="link-warning text-decoration-none small fw-bold mt-2 d-block"
                      >
                        View Special Report →
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
      <Contact />
    </main>
  );
};

export default Home;
