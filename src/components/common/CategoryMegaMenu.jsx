import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS, apiCall, API_BASE_URL } from "../../config/api";

const CategoryMegaMenu = ({ setVisible, closeNavbar }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = React.useState([]);

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const res = await apiCall(API_ENDPOINTS.CATEGORY.GET_ALL);
        const dataArray =
          res?.categories || res?.data || (Array.isArray(res) ? res : []);
        setCategories(dataArray.filter((cat) => cat.status === "active"));
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    getAllCategories();
  }, []);

  const handleCategoryClick = (id) => {
    setVisible(false);
    if (closeNavbar) closeNavbar();
    navigate(`/articles/${id}`);
  };

  return (
    <>
      <style>{`
        .mega-menu-main {
          background: white;
          width: 100%;
        }

        @media (max-width: 991px) {
          .mega-menu-main {
            max-height: 450px; 
            overflow-y: auto;  
            overflow-x: hidden;
            padding: 10px 0;
          }
          .mega-menu-main::-webkit-scrollbar { width: 4px; }
          .mega-menu-main::-webkit-scrollbar-thumb {
            background: #d4af37;
            border-radius: 10px;
          }
        }
      `}</style>

      <div
        className="mega-menu-main"
        onMouseEnter={() => window.innerWidth > 991 && setVisible(true)}
        onMouseLeave={() => window.innerWidth > 991 && setVisible(false)}
      >
        <Container className="py-3 py-lg-4">
          <div className="d-flex align-items-center mb-3">
            <h6
              className="text-uppercase fw-bold text-muted small mb-0"
              style={{ letterSpacing: "1px", fontSize: "12px" }}
            >
              Explore Categories
            </h6>
            <div
              className="flex-grow-1 ms-3 bg-light"
              style={{ height: "1px" }}
            ></div>
          </div>

          <Row className="g-3">
            {categories.map((cat) => {
              const iconSrc = cat.icon?.startsWith("http")
                ? cat.icon
                : `${API_BASE_URL}${cat.icon}`;

              return (
                <Col key={cat._id} xs={6} md={4} lg={3} xl={2}>
                  <div
                    className="d-flex align-items-center p-2 rounded-3 border border-transparent h-100"
                    style={{ cursor: "pointer", transition: "0.2s" }}
                    onClick={() => handleCategoryClick(cat._id)}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8f9fa";
                      e.currentTarget.style.borderColor = "#eee";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.borderColor = "transparent";
                    }}
                  >
                    <div
                      className="d-flex align-items-center justify-content-center rounded-3 me-2"
                      style={{
                        width: "45px",
                        height: "45px",
                        backgroundColor: `${cat.color}15`,
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={iconSrc}
                        alt=""
                        style={{
                          width: "30px",
                          height: "30px",
                          objectFit: "contain",
                        }}
                        onError={(e) =>
                          (e.target.src = "https://via.placeholder.com/28")
                        }
                      />
                    </div>

                    <div className="d-flex flex-column overflow-hidden">
                      <span
                        className="fw-bold text-dark small text-truncate"
                        style={{ fontSize: "13px" }}
                      >
                        {cat.categoryName}
                      </span>
                      <span
                        className="fw-bold text-uppercase"
                        style={{
                          fontSize: "9px",
                          color: cat.color || "#d4af37",
                        }}
                      >
                        View Articles
                      </span>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CategoryMegaMenu;
