import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { API_ENDPOINTS, apiCall, API_BASE_URL } from "../config/api";

const RelatedArticles = () => {
  const { state } = useLocation(); // Filter type aur value yahan se milegi
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilteredArticles = async () => {
      try {
        setLoading(true);
        const res = await apiCall(API_ENDPOINTS.ARTICLE.GET_ALL);
        const allArticles = res?.articles || res?.data || [];

        let filtered = allArticles;
        if (state?.type === "category") {
          filtered = allArticles.filter(
            (a) =>
              a.category?._id === state.id ||
              a.category?.categoryName === state.value,
          );
        } else if (state?.type === "archive") {
          filtered = allArticles.filter((a) => {
            const date = new Date(a.createdAt).toLocaleString("default", {
              month: "long",
              year: "numeric",
            });
            return date === state.value;
          });
        }
        setArticles(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFilteredArticles();
  }, [state]);

  return (
    <Container className="py-5">
      <h2 className="mb-4">{state?.title || "Related Articles"}</h2>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Row className="g-4">
          {articles.map((art) => (
            <Col md={4} key={art._id}>
              <Card
                className="h-100 border-0 shadow-sm"
                onClick={() => navigate("/article-detail", { state: art })}
                style={{ cursor: "pointer" }}>
                <Card.Img
                  variant="top"
                  src={
                    art.image?.startsWith("http")
                      ? art.image
                      : `${API_BASE_URL}${art.image}`
                  }
                />
                <Card.Body>
                  <Card.Title className="h6 fw-bold">{art.title}</Card.Title>
                  <Card.Text
                    className="small text-muted text-truncate"
                    dangerouslySetInnerHTML={{ __html: art.content }}
                  />
                </Card.Body>
              </Card>
            </Col>
          ))}
          {articles.length === 0 && <p>No articles found for this filter.</p>}
        </Row>
      )}
    </Container>
  );
};

export default RelatedArticles;
