import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { API_ENDPOINTS, apiCall, API_BASE_URL } from "../config/api";

const ArticlesList = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/500?text=No+Image";
    if (imagePath.startsWith("http")) return imagePath;
    return `${API_BASE_URL}/${imagePath.replace(/\\/g, "/")}`;
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await apiCall(API_ENDPOINTS.ARTICLE.GET_ALL);
        const allArticles = response.articles || response.data || [];

        let filtered = allArticles;

        if (state?.type === "subcategory") {
          filtered = allArticles.filter(
            (art) =>
              art.subCategory?.subCategoryName
                ?.toLowerCase()
                .replace(/\s+/g, "-") === state.slug,
          );
        } else if (state?.type === "archive") {
          filtered = allArticles.filter(
            (art) =>
              new Date(art.createdAt).toLocaleString("default", {
                month: "long",
                year: "numeric",
              }) === state.value,
          );
        } else if (state?.type === "category") {
          filtered = allArticles.filter(
            (art) => art.category?._id === state.id,
          );
        }

        setArticles(filtered);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
    window.scrollTo(0, 0);
  }, [state]);

  return (
    <Container className="py-5">
      <div className="mb-5">
        <h2 className="fw-bold">{state?.title || ""}</h2>
        {/* <div className="text-muted small">Articles Found</div> */}
        <div
          style={{
            width: "40px",
            height: "3px",
            backgroundColor: "#d4af37",
            marginTop: "10px",
          }}
        />
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2 text-muted">Loading Articles...</p>
        </div>
      ) : (
        <Row>
          {articles.length > 0 ? (
            articles.map((art) => (
              <Col lg={4} md={6} sm={12} key={art._id} className="mb-4">
                <Card
                  className="h-100 border-0 shadow-sm overflow-hidden card-hover"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/article/${generateSlug(art.title)}`, {
                      state: art,
                      articleId: art._id, // Pass article ID for detail page fetching
                    })
                  }
                >
                  <Card.Img
                    variant="top"
                    src={getImageUrl(art.featureImage)}
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Badge
                      bg="light"
                      text="dark"
                      className="mb-2 border text-uppercase"
                    >
                      {art.category?.categoryName || "Uncategorized"}
                    </Badge>
                    <h4
                      className="mb-3 mt-1 fw-bold"
                      style={{ fontSize: "1.25rem", color: "#1a1a1a" }}
                    >
                      {art.title}
                    </h4>
                    <div
                      className="text-muted small mb-3"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: "3",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                      dangerouslySetInnerHTML={{ __html: art.content }}
                    />
                    <div className="text-accent fw-bold small">
                      Read Article →
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center py-5">
              <div className="alert alert-light border">
                No articles found in this section.
              </div>
            </Col>
          )}
        </Row>
      )}

      <style>{`
        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
        .text-accent {
          color: #d4af37;
        }
      `}</style>
    </Container>
  );
};

export default ArticlesList;
