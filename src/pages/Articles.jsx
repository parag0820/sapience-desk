import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { API_ENDPOINTS, apiCall, API_BASE_URL } from "../config/api";

const Articles = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [subCategories, setSubCategories] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSubCategories = async () => {
    try {
      setLoading(true);
      const response = await apiCall(API_ENDPOINTS.SUBCATEGORY.GET_ALL, "GET");
      const allData = response?.data || [];

      // Filter subcategories by matching categoryId
      const filtered = allData.filter(
        (item) => item?.category?._id === categoryId,
      );

      setSubCategories(filtered);

      if (filtered.length > 0) {
        setCategoryInfo(filtered[0].category);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchSubCategories();
    }
  }, [categoryId]);

  if (!categoryId)
    return <h4 className="text-center py-5">Select a Category</h4>;

  return (
    <div className="py-5 bg-white" style={{ minHeight: "100vh" }}>
      <Container>
        {/* HEADER */}
        <div className="text-left mb-5">
          <h2 className="fw-bold mb-2 h3">
            {categoryInfo?.categoryName || "Category"} Topics
          </h2>
          <p className="text-muted small text-uppercase tracking-widest">
            Selected Curations
          </p>
          <div
            style={{
              width: "30px",
              height: "3px",
              backgroundColor: "#d4af37",
              borderRadius: "10px",
            }}
          />
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" />
          </div>
        ) : subCategories.length === 0 ? (
          <div className="text-center py-5 text-muted">No Topics Found</div>
        ) : (
          <Row className="g-3">
            {subCategories.map((item) => {
              const slug = item.subCategoryName
                .toLowerCase()
                .replace(/\s+/g, "-");

              // Image logic (Cloudinary vs Local)
              const iconSrc = item.icon?.startsWith("http")
                ? item.icon
                : `${API_BASE_URL}${item.icon}`;

              return (
                <Col key={item._id} lg={4} md={6}>
                  <Card
                    className="h-100 border-0 shadow-sm subtopic-card"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate("/filtered-articles", {
                        state: {
                          type: "subcategory",
                          slug: slug,
                          title: item.subCategoryName,
                        },
                      })
                    }
                  >
                    <Card.Body className="p-3 d-flex align-items-center">
                      <div className="sub-icon me-3">
                        <img
                          src={iconSrc}
                          alt={item.subCategoryName}
                          className="sub-icon-img"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <h6 className="fw-bold mb-0 text-truncate text-dark">
                          {item.subCategoryName}
                        </h6>
                        <small
                          className="text-muted opacity-75"
                          style={{ fontSize: "0.75rem" }}
                        >
                          Explore Deeply
                        </small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </Container>

      <style>{`
        .tracking-widest { letter-spacing: 2px; font-size: 0.7rem; font-weight: 700; }
        .sub-icon { width: 40px; height: 40px; border-radius: 10px; background: #f8f9fa; display: flex; align-items: center; justify-content: center; flex-shrink: 0; overflow: hidden; }
        .sub-icon-img { width: 100%; height: 100%; object-fit: cover; }
        .subtopic-card { transition: all 0.25s ease; border-radius: 12px; border: 1px solid #f8fafc !important; }
        .subtopic-card:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.06) !important; border-left: 4px solid #d4af37 !important; background: #fafafa; }
      `}</style>
    </div>
  );
};

export default Articles;
