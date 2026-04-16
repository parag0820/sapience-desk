// // // import {
// // //   Navbar,
// // //   Nav,
// // //   Container,
// // //   Button,
// // //   Form,
// // //   InputGroup,
// // //   Spinner,
// // //   Modal,
// // //   Row,
// // //   Col,
// // //   ListGroup,
// // // } from "react-bootstrap";
// // // import { Link, NavLink, useNavigate } from "react-router-dom";
// // // import { CiSearch, CiCreditCard1, CiHeart } from "react-icons/ci";
// // // import { useState, useEffect, useRef } from "react";
// // // import { useAuth } from "../../context/AuthContext";
// // // import LogoutModal from "./LogoutModal";
// // // import CategoryMegaMenu from "./CategoryMegaMenu";
// // // import { API_ENDPOINTS, apiCall } from "../../config/api";

// // // const Header = () => {
// // //   const { isAuthenticated, user } = useAuth();
// // //   const navigate = useNavigate();
// // //   const [showLogoutModal, setShowLogoutModal] = useState(false);
// // //   const [showDonateModal, setShowDonateModal] = useState(false);
// // //   const [showMegaMenu, setShowMegaMenu] = useState(false);
// // //   const [expanded, setExpanded] = useState(false);

// // //   const [searchQuery, setSearchQuery] = useState("");
// // //   const [results, setResults] = useState([]);
// // //   const [isSearching, setIsSearching] = useState(false);
// // //   const [showResults, setShowResults] = useState(false);
// // //   const [Logo, setLogo] = useState("");
// // //   const searchRef = useRef(null);

// // //   useEffect(() => {
// // //     getlogo();
// // //     const handleClickOutside = (event) => {
// // //       if (searchRef.current && !searchRef.current.contains(event.target)) {
// // //         setShowResults(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   const getlogo = async () => {
// // //     try {
// // //       const response = await apiCall(API_ENDPOINTS.LOGO.GET_LOGO);
// // //       if (response?.data?.length > 0) {
// // //         setLogo(`${response.data[0]?.image}`);
// // //       }
// // //     } catch (err) {
// // //       console.error("Failed to fetch logo", err);
// // //     }
// // //   };

// // //   const handleSearch = async (e) => {
// // //     const query = e.target.value;
// // //     setSearchQuery(query);
// // //     if (query.length < 2) {
// // //       setResults([]);
// // //       setShowResults(false);
// // //       return;
// // //     }
// // //     setIsSearching(true);
// // //     setShowResults(true);
// // //     try {
// // //       const [artRes, catRes, subRes] = await Promise.all([
// // //         apiCall(API_ENDPOINTS.ARTICLE.GET_ALL),
// // //         apiCall(API_ENDPOINTS.CATEGORY.GET_ALL),
// // //         apiCall(API_ENDPOINTS.SUBCATEGORY.GET_ALL),
// // //       ]);
// // //       const articles = (artRes?.articles || artRes?.data || [])
// // //         .filter((a) => a.title.toLowerCase().includes(query.toLowerCase()))
// // //         .map((item) => ({
// // //           ...item,
// // //           type: "Article",
// // //           display: item.title,
// // //           link: `/article/${item._id}`,
// // //         }));

// // //       const categories = (catRes?.categories || catRes?.data || [])
// // //         .filter((c) =>
// // //           c.categoryName.toLowerCase().includes(query.toLowerCase()),
// // //         )
// // //         .map((item) => ({
// // //           ...item,
// // //           type: "Category",
// // //           display: item.categoryName,
// // //           link: `/category/${item._id}`,
// // //         }));

// // //       const subCategories = (subRes?.subCategories || subRes?.data || [])
// // //         .filter((s) =>
// // //           s.subCategoryName.toLowerCase().includes(query.toLowerCase()),
// // //         )
// // //         .map((item) => ({
// // //           ...item,
// // //           type: "Subcategory",
// // //           display: item.subCategoryName,
// // //           link: `/subcategory/${item._id}`,
// // //         }));

// // //       setResults([...articles, ...categories, ...subCategories].slice(0, 10));
// // //     } catch (err) {
// // //       console.error("Search failed", err);
// // //     } finally {
// // //       setIsSearching(false);
// // //     }
// // //   };

// // //   // Function to handle clicking a search result
// // //   // Inside Header.js
// // //   const handleResultClick = (item) => {
// // //     setSearchQuery(""); // Clear the input field
// // //     setShowResults(false);
// // //     setExpanded(false);

// // //     // Navigate to Home with the search term instead of the article ID
// // //     // This avoids the "Loading Article..." screen and triggers Home's search logic
// // //     navigate(`/?search=${encodeURIComponent(item.display)}`);
// // //   };

// // //   return (
// // //     <>
// // //       <style>{`
// // //         .navbar-logo-custom { height: 55px; width: 180px; max-width: 200px; object-fit: contain; }
// // //         @media (max-width: 991px) { .navbar-logo-custom { height: 40px; width:120px } }

// // //         .nav-custom-link {
// // //           position: relative; color: #333 !important; text-decoration: none;
// // //           transition: color 0.3s ease; display: inline-flex; align-items: center;
// // //           padding: 0.5rem 0; font-weight: 600;
// // //         }
// // //         .nav-custom-link::after {
// // //           content: ""; position: absolute; width: 0; height: 2px;
// // //           bottom: 0; left: 0; background-color: #d4af37; transition: all 0.3s ease;
// // //         }
// // //         .nav-custom-link:hover::after,
// // //         .nav-custom-link.active::after { width: 100%; } /* Standard Home Active State */
// // //         .nav-custom-link.active { color: #d4af37 !important; }

// // //         .search-results-dropdown {
// // //           position: absolute; top: 100%; left: 0; right: 0; background: white;
// // //           border: 1px solid #eee; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);
// // //           z-index: 2000; max-height: 300px; overflow-y: auto; margin-top: 5px;
// // //         }

// // //         .header-btn { height: 38px; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.8rem; border-radius: 50px !important; padding: 0 18px; white-space: nowrap; transition: all 0.3s ease; border: none; }
// // //         .btn-donate { background: linear-gradient(45deg, #d4af37, #f1d592); color: #000 !important; text-transform: uppercase; letter-spacing: 0.5px; }
// // //         .btn-donate:hover { background: linear-gradient(45deg, #b8962d, #d4af37); transform: translateY(-1px); }
// // //         .button-row { display: flex; flex-direction: row; align-items: center; gap: 10px; }

// // //         @media (max-width: 991px) {
// // //           .button-row { justify-content: center; width: 100%; padding: 15px 0; }
// // //           .header-btn { flex: 1; max-width: 150px; }
// // //         }

// // //         .user-greeting { font-size: 0.85rem; font-weight: 500; color: #555; white-space: nowrap; }
// // //         .payment-card { border: 1px solid #eee; border-radius: 12px; padding: 20px; background: #fcfcfc; }
// // //         @media (min-width: 992px) {
// // //           .desktop-flex-layout { display: flex; width: 100%; align-items: center; justify-content: space-between; }
// // //           .nav-wrapper { height: 80px; display: flex; align-items: center; padding: 0 15px; }
// // //           .mega-menu-wrapper { position: fixed; top: 80px; left: 0; right: 0; width: 100vw; z-index: 1050; background: white; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
// // //         }
// // //       `}</style>

// // //       <Navbar
// // //         bg="white"
// // //         expand="lg"
// // //         sticky="top"
// // //         expanded={expanded}
// // //         onToggle={(val) => setExpanded(val)}
// // //         className="shadow-sm p-0"
// // //       >
// // //         <Container fluid className="px-2 px-lg-4 d-flex align-items-center">
// // //           <Navbar.Brand
// // //             as={Link}
// // //             to="/"
// // //             className="d-lg-none py-2"
// // //             onClick={() => setExpanded(false)}
// // //           >
// // //             <img src={Logo} alt="Logo" className="navbar-logo-custom" />
// // //           </Navbar.Brand>

// // //           <div className="ms-auto d-lg-none d-flex align-items-center">
// // //             {isAuthenticated && (
// // //               <span className="user-greeting me-2">
// // //                 Hi, <strong>{user?.fullName?.split(" ")[0] || "User"}</strong>
// // //               </span>
// // //             )}
// // //             <Navbar.Toggle
// // //               aria-controls="basic-navbar-nav"
// // //               className="border-0 shadow-none"
// // //             />
// // //           </div>

// // //           <Navbar.Collapse id="basic-navbar-nav">
// // //             <div className="desktop-flex-layout">
// // //               <div className="d-none d-lg-block">
// // //                 <Navbar.Brand
// // //                   as={Link}
// // //                   to="/"
// // //                   onClick={() => setExpanded(false)}
// // //                   className="p-0"
// // //                 >
// // //                   <img src={Logo} alt="Logo" className="navbar-logo-custom" />
// // //                 </Navbar.Brand>
// // //               </div>

// // //               <Nav className="mx-auto">
// // //                 <div className="nav-wrapper">
// // //                   <Nav.Link
// // //                     as={NavLink}
// // //                     to="/"
// // //                     end
// // //                     className="nav-custom-link"
// // //                     onClick={() => setExpanded(false)}
// // //                   >
// // //                     Home
// // //                   </Nav.Link>
// // //                 </div>
// // //                 <div className="nav-wrapper">
// // //                   <Nav.Link
// // //                     as={NavLink}
// // //                     to="/events"
// // //                     end
// // //                     className="nav-custom-link"
// // //                     onClick={() => setExpanded(false)}
// // //                   >
// // //                     Event
// // //                   </Nav.Link>
// // //                 </div>
// // //                 <div className="nav-wrapper">
// // //                   <Nav.Link
// // //                     as={NavLink}
// // //                     to="/videos"
// // //                     end
// // //                     className="nav-custom-link"
// // //                     onClick={() => setExpanded(false)}
// // //                   >
// // //                     Video
// // //                   </Nav.Link>
// // //                 </div>
// // //                 <div
// // //                   className="nav-wrapper"
// // //                   onMouseEnter={() =>
// // //                     window.innerWidth > 991 && setShowMegaMenu(true)
// // //                   }
// // //                   onMouseLeave={() =>
// // //                     window.innerWidth > 991 && setShowMegaMenu(false)
// // //                   }
// // //                 >
// // //                   <div
// // //                     className="nav-custom-link"
// // //                     style={{ cursor: "pointer" }}
// // //                     onClick={() =>
// // //                       window.innerWidth <= 991 && setShowMegaMenu(!showMegaMenu)
// // //                     }
// // //                   >
// // //                     Articles{" "}
// // //                     <span className="ms-1" style={{ fontSize: "10px" }}>
// // //                       {showMegaMenu ? "▲" : "▼"}
// // //                     </span>
// // //                   </div>
// // //                   {showMegaMenu && (
// // //                     <div className="mega-menu-wrapper">
// // //                       <CategoryMegaMenu
// // //                         setVisible={setShowMegaMenu}
// // //                         closeNavbar={() => {
// // //                           setExpanded(false);
// // //                           setShowMegaMenu(false);
// // //                         }}
// // //                       />
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               </Nav>

// // //               <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-3">
// // //                 <div className="position-relative" ref={searchRef}>
// // //                   <InputGroup
// // //                     className="bg-light rounded-pill border px-3"
// // //                     style={{ height: "38px", minWidth: "220px" }}
// // //                   >
// // //                     <Form.Control
// // //                       placeholder="Search articles..."
// // //                       className="bg-transparent border-0 small shadow-none"
// // //                       value={searchQuery}
// // //                       onChange={handleSearch}
// // //                     />
// // //                     <Button
// // //                       variant="link"
// // //                       className="text-dark p-0 d-flex align-items-center"
// // //                     >
// // //                       {isSearching ? (
// // //                         <Spinner animation="border" size="sm" />
// // //                       ) : (
// // //                         <CiSearch size={20} />
// // //                       )}
// // //                     </Button>
// // //                   </InputGroup>

// // //                   {/* SEARCH RESULTS DROPDOWN */}
// // //                   {showResults && results.length > 0 && (
// // //                     <div className="search-results-dropdown">
// // //                       <ListGroup variant="flush">
// // //                         {results.map((item, index) => (
// // //                           <ListGroup.Item
// // //                             key={index}
// // //                             action
// // //                             onClick={() => handleResultClick(item.link)}
// // //                             className="small d-flex justify-content-between align-items-center"
// // //                           >
// // //                             <span>{item.display}</span>
// // //                             <span
// // //                               className="badge bg-secondary"
// // //                               style={{ fontSize: "10px" }}
// // //                             >
// // //                               {item.type}
// // //                             </span>
// // //                           </ListGroup.Item>
// // //                         ))}
// // //                       </ListGroup>
// // //                     </div>
// // //                   )}
// // //                 </div>

// // //                 <div className="button-row">
// // //                   <Button
// // //                     className="header-btn btn-donate"
// // //                     onClick={() => {
// // //                       setShowDonateModal(true);
// // //                       setExpanded(false);
// // //                     }}
// // //                   >
// // //                     <CiHeart size={18} className="me-1" /> Donate
// // //                   </Button>

// // //                   {isAuthenticated ? (
// // //                     <div className="d-flex align-items-center gap-2">
// // //                       <span className="user-greeting d-none d-lg-inline">
// // //                         Hello, <strong>{user?.fullName?.split(" ")[0]}</strong>
// // //                       </span>
// // //                       <Button
// // //                         variant="danger"
// // //                         className="header-btn"
// // //                         onClick={() => {
// // //                           setShowLogoutModal(true);
// // //                           setExpanded(false);
// // //                         }}
// // //                       >
// // //                         Logout
// // //                       </Button>
// // //                     </div>
// // //                   ) : (
// // //                     <Button
// // //                       as={Link}
// // //                       to="/login"
// // //                       variant="dark"
// // //                       className="header-btn"
// // //                       onClick={() => setExpanded(false)}
// // //                     >
// // //                       Login
// // //                     </Button>
// // //                   )}
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </Navbar.Collapse>
// // //         </Container>
// // //       </Navbar>

// // //       {/* Modals remain exactly as they were */}
// // //       <Modal
// // //         show={showDonateModal}
// // //         onHide={() => setShowDonateModal(false)}
// // //         centered
// // //         size="md"
// // //       >
// // //         <Modal.Header closeButton className="border-0 pb-0" />
// // //         <Modal.Body className="px-4 pb-4">
// // //           <div className="text-center mb-4">
// // //             <CiHeart size={40} className="text-warning mb-2" />
// // //             <h4 className="fw-bold">Support Us</h4>
// // //             <p className="text-muted small">
// // //               Your contribution helps keep our content free.
// // //             </p>
// // //           </div>
// // //           <div className="payment-card">
// // //             <Form>
// // //               <Form.Group className="mb-3">
// // //                 <Form.Label className="small fw-bold">
// // //                   Cardholder Name
// // //                 </Form.Label>
// // //                 <Form.Control
// // //                   type="text"
// // //                   placeholder="Full Name"
// // //                   className="shadow-none"
// // //                 />
// // //               </Form.Group>
// // //               <Form.Group className="mb-3">
// // //                 <Form.Label className="small fw-bold">Card Number</Form.Label>
// // //                 <InputGroup>
// // //                   <Form.Control
// // //                     type="text"
// // //                     placeholder="**** **** **** ****"
// // //                     className="shadow-none"
// // //                   />
// // //                   <InputGroup.Text>
// // //                     <CiCreditCard1 />
// // //                   </InputGroup.Text>
// // //                 </InputGroup>
// // //               </Form.Group>
// // //               <Row>
// // //                 <Col xs={6}>
// // //                   <Form.Control
// // //                     type="text"
// // //                     placeholder="MM/YY"
// // //                     className="shadow-none"
// // //                   />
// // //                 </Col>
// // //                 <Col xs={6}>
// // //                   <Form.Control
// // //                     type="text"
// // //                     placeholder="CVV"
// // //                     className="shadow-none"
// // //                   />
// // //                 </Col>
// // //               </Row>
// // //               <Button
// // //                 variant="dark"
// // //                 className="w-100 py-2 fw-bold mt-3"
// // //                 onClick={() => setShowDonateModal(false)}
// // //               >
// // //                 COMPLETE DONATION
// // //               </Button>
// // //             </Form>
// // //           </div>
// // //         </Modal.Body>
// // //       </Modal>

// // //       <LogoutModal
// // //         show={showLogoutModal}
// // //         handleClose={() => setShowLogoutModal(false)}
// // //       />
// // //     </>
// // //   );
// // // };

// // // export default Header;

// // import {
// //   Navbar,
// //   Nav,
// //   Container,
// //   Button,
// //   Form,
// //   InputGroup,
// //   Spinner,
// //   Modal,
// //   Row,
// //   Col,
// //   ListGroup,
// // } from "react-bootstrap";
// // import { Link, NavLink, useNavigate } from "react-router-dom";
// // import {
// //   CiSearch,
// //   CiCreditCard1,
// //   CiHeart,
// //   CiUser,
// //   CiMail,
// //   CiPhone,
// // } from "react-icons/ci";
// // import { useState, useEffect, useRef } from "react";
// // import { useAuth } from "../../context/AuthContext";
// // import LogoutModal from "./LogoutModal";
// // import CategoryMegaMenu from "./CategoryMegaMenu";
// // import { API_ENDPOINTS, apiCall } from "../../config/api";

// // const Header = () => {
// //   const { isAuthenticated, user } = useAuth();
// //   const navigate = useNavigate();
// //   const [showLogoutModal, setShowLogoutModal] = useState(false);
// //   const [showDonateModal, setShowDonateModal] = useState(false);
// //   const [showMegaMenu, setShowMegaMenu] = useState(false);
// //   const [expanded, setExpanded] = useState(false);

// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [results, setResults] = useState([]);
// //   const [isSearching, setIsSearching] = useState(false);
// //   const [showResults, setShowResults] = useState(false);
// //   const [Logo, setLogo] = useState("");
// //   const searchRef = useRef(null);

// //   // --- Payment States ---
// //   const [donationStep, setDonationStep] = useState(1);
// //   const [amount, setAmount] = useState("");
// //   const [isProcessing, setIsProcessing] = useState(false);

// //   useEffect(() => {
// //     getlogo();
// //     const handleClickOutside = (event) => {
// //       if (searchRef.current && !searchRef.current.contains(event.target)) {
// //         setShowResults(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   const getlogo = async () => {
// //     try {
// //       const response = await apiCall(API_ENDPOINTS.LOGO.GET_LOGO);
// //       if (response?.data?.length > 0) {
// //         setLogo(`${response.data[0]?.image}`);
// //       }
// //     } catch (err) {
// //       console.error("Failed to fetch logo", err);
// //     }
// //   };

// //   const handleSearch = async (e) => {
// //     const query = e.target.value;
// //     setSearchQuery(query);
// //     if (query.length < 2) {
// //       setResults([]);
// //       setShowResults(false);
// //       return;
// //     }
// //     setIsSearching(true);
// //     setShowResults(true);
// //     try {
// //       const [artRes, catRes, subRes] = await Promise.all([
// //         apiCall(API_ENDPOINTS.ARTICLE.GET_ALL),
// //         apiCall(API_ENDPOINTS.CATEGORY.GET_ALL),
// //         apiCall(API_ENDPOINTS.SUBCATEGORY.GET_ALL),
// //       ]);
// //       const articles = (artRes?.articles || artRes?.data || [])
// //         .filter((a) => a.title.toLowerCase().includes(query.toLowerCase()))
// //         .map((item) => ({
// //           ...item,
// //           type: "Article",
// //           display: item.title,
// //           link: `/article/${item._id}`,
// //         }));

// //       const categories = (catRes?.categories || catRes?.data || [])
// //         .filter((c) =>
// //           c.categoryName.toLowerCase().includes(query.toLowerCase()),
// //         )
// //         .map((item) => ({
// //           ...item,
// //           type: "Category",
// //           display: item.categoryName,
// //           link: `/category/${item._id}`,
// //         }));

// //       const subCategories = (subRes?.subCategories || subRes?.data || [])
// //         .filter((s) =>
// //           s.subCategoryName.toLowerCase().includes(query.toLowerCase()),
// //         )
// //         .map((item) => ({
// //           ...item,
// //           type: "Subcategory",
// //           display: item.subCategoryName,
// //           link: `/subcategory/${item._id}`,
// //         }));

// //       setResults([...articles, ...categories, ...subCategories].slice(0, 10));
// //     } catch (err) {
// //       console.error("Search failed", err);
// //     } finally {
// //       setIsSearching(false);
// //     }
// //   };

// //   const handleResultClick = (item) => {
// //     setSearchQuery("");
// //     setShowResults(false);
// //     setExpanded(false);
// //     navigate(`/?search=${encodeURIComponent(item.display)}`);
// //   };

// //   // --- Donation Logic ---
// //   const handleDonateOpen = () => {
// //     if (!isAuthenticated) {
// //       navigate("/login");
// //       return;
// //     }
// //     setDonationStep(1);
// //     setAmount("");
// //     setShowDonateModal(true);
// //     setExpanded(false);
// //   };

// //   const handleProcessToPay = () => {
// //     if (!amount || amount <= 0) {
// //       alert("Please enter a valid amount");
// //       return;
// //     }
// //     setDonationStep(2);
// //   };

// //   // --- FIXED PAYMENT FUNCTION ---
// //   // --- FIXED PAYMENT FUNCTION ---
// //   const handleFinalPayment = async () => {
// //     setIsProcessing(true);
// //     try {
// //       const paymentPayload = {
// //         amount: Number(amount),
// //         currency: "inr",
// //         userId: user?.id || user?._id || user?.userId,
// //       };

// //       // 1. Create Payment Intent
// //       const intentResponse = await apiCall(
// //         API_ENDPOINTS.PAYMENT.CREATE_INTENT,
// //         {
// //           method: "POST",
// //           body: JSON.stringify(paymentPayload),
// //         },
// //       );

// //       console.log("Intent Response:", intentResponse); // Debugging के लिए

// //       let pi_id = "";

// //       if (intentResponse?.paymentIntentId) {
// //         pi_id = intentResponse.paymentIntentId;
// //       } else if (intentResponse?.clientSecret) {
// //         pi_id = intentResponse.clientSecret.split("_secret_")[0];
// //       } else if (intentResponse?.id) {
// //         pi_id = intentResponse.id;
// //       }

// //       if (pi_id) {
// //         // 2. Verify Payment
// //         const verifyRes = await apiCall(API_ENDPOINTS.PAYMENT.VERIFY, {
// //           method: "POST",
// //           body: JSON.stringify({
// //             paymentIntentId: pi_id,
// //           }),
// //         });

// //         if (verifyRes) {
// //           alert("Donation Successful! Thank you for your support.");
// //           setShowDonateModal(false);
// //           setDonationStep(1);
// //           setAmount(""); // Amount reset करें
// //         }
// //       } else {
// //         // अगर ऊपर कोई भी ID नहीं मिली तो यह एरर आएगा
// //         throw new Error("Payment ID not found in server response");
// //       }
// //     } catch (error) {
// //       console.error("Payment Error:", error);
// //       alert(error.message || "An error occurred during payment");
// //     } finally {
// //       setIsProcessing(false);
// //     }
// //   };

// //   return (
// //     <>
// //       <style>{`
// //         .navbar-logo-custom { height: 55px; width: 180px; max-width: 200px; object-fit: contain; }
// //         @media (max-width: 991px) { .navbar-logo-custom { height: 40px; width:120px } }
// //         .nav-custom-link { position: relative; color: #333 !important; text-decoration: none; transition: color 0.3s ease; display: inline-flex; align-items: center; padding: 0.5rem 0; font-weight: 600; }
// //         .nav-custom-link::after { content: ""; position: absolute; width: 0; height: 2px; bottom: 0; left: 0; background-color: #d4af37; transition: all 0.3s ease; }
// //         .nav-custom-link:hover::after, .nav-custom-link.active::after { width: 100%; }
// //         .nav-custom-link.active { color: #d4af37 !important; }
// //         .search-results-dropdown { position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid #eee; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 2000; max-height: 300px; overflow-y: auto; margin-top: 5px; }
// //         .header-btn { height: 38px; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.8rem; border-radius: 50px !important; padding: 0 18px; white-space: nowrap; transition: all 0.3s ease; border: none; }
// //         .btn-donate { background: linear-gradient(45deg, #d4af37, #f1d592); color: #000 !important; text-transform: uppercase; letter-spacing: 0.5px; }
// //         .btn-donate:hover { background: linear-gradient(45deg, #b8962d, #d4af37); transform: translateY(-1px); }
// //         .button-row { display: flex; flex-direction: row; align-items: center; gap: 10px; }
// //         @media (max-width: 991px) { .button-row { justify-content: center; width: 100%; padding: 15px 0; } .header-btn { flex: 1; max-width: 150px; } }
// //         .user-greeting { font-size: 0.85rem; font-weight: 500; color: #555; white-space: nowrap; }
// //         .payment-card { border: 1px solid #eee; border-radius: 12px; padding: 20px; background: #fcfcfc; }
// //         @media (min-width: 992px) { .desktop-flex-layout { display: flex; width: 100%; align-items: center; justify-content: space-between; } .nav-wrapper { height: 80px; display: flex; align-items: center; padding: 0 15px; } .mega-menu-wrapper { position: fixed; top: 80px; left: 0; right: 0; width: 100vw; z-index: 1050; background: white; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); } }
// //       `}</style>

// //       <Navbar
// //         bg="white"
// //         expand="lg"
// //         sticky="top"
// //         expanded={expanded}
// //         onToggle={(val) => setExpanded(val)}
// //         className="shadow-sm p-0">
// //         <Container fluid className="px-2 px-lg-4 d-flex align-items-center">
// //           <Navbar.Brand
// //             as={Link}
// //             to="/"
// //             className="d-lg-none py-2"
// //             onClick={() => setExpanded(false)}>
// //             <img src={Logo} alt="Logo" className="navbar-logo-custom" />
// //           </Navbar.Brand>
// //           <div className="ms-auto d-lg-none d-flex align-items-center">
// //             {isAuthenticated && (
// //               <span className="user-greeting me-2">
// //                 Hi, <strong>{user?.fullName?.split(" ")[0] || "User"}</strong>
// //               </span>
// //             )}
// //             <Navbar.Toggle
// //               aria-controls="basic-navbar-nav"
// //               className="border-0 shadow-none"
// //             />
// //           </div>
// //           <Navbar.Collapse id="basic-navbar-nav">
// //             <div className="desktop-flex-layout">
// //               <div className="d-none d-lg-block">
// //                 <Navbar.Brand
// //                   as={Link}
// //                   to="/"
// //                   onClick={() => setExpanded(false)}
// //                   className="p-0">
// //                   <img src={Logo} alt="Logo" className="navbar-logo-custom" />
// //                 </Navbar.Brand>
// //               </div>
// //               <Nav className="mx-auto">
// //                 <div className="nav-wrapper">
// //                   <Nav.Link
// //                     as={NavLink}
// //                     to="/"
// //                     end
// //                     className="nav-custom-link"
// //                     onClick={() => setExpanded(false)}>
// //                     Home
// //                   </Nav.Link>
// //                 </div>
// //                 <div className="nav-wrapper">
// //                   <Nav.Link
// //                     as={NavLink}
// //                     to="/events"
// //                     end
// //                     className="nav-custom-link"
// //                     onClick={() => setExpanded(false)}>
// //                     Event
// //                   </Nav.Link>
// //                 </div>
// //                 <div className="nav-wrapper">
// //                   <Nav.Link
// //                     as={NavLink}
// //                     to="/videos"
// //                     end
// //                     className="nav-custom-link"
// //                     onClick={() => setExpanded(false)}>
// //                     Video
// //                   </Nav.Link>
// //                 </div>
// //                 <div
// //                   className="nav-wrapper"
// //                   onMouseEnter={() =>
// //                     window.innerWidth > 991 && setShowMegaMenu(true)
// //                   }
// //                   onMouseLeave={() =>
// //                     window.innerWidth > 991 && setShowMegaMenu(false)
// //                   }>
// //                   <div
// //                     className="nav-custom-link"
// //                     style={{ cursor: "pointer" }}
// //                     onClick={() =>
// //                       window.innerWidth <= 991 && setShowMegaMenu(!showMegaMenu)
// //                     }>
// //                     Articles{" "}
// //                     <span className="ms-1" style={{ fontSize: "10px" }}>
// //                       {showMegaMenu ? "▲" : "▼"}
// //                     </span>
// //                   </div>
// //                   {showMegaMenu && (
// //                     <div className="mega-menu-wrapper">
// //                       <CategoryMegaMenu
// //                         setVisible={setShowMegaMenu}
// //                         closeNavbar={() => {
// //                           setExpanded(false);
// //                           setShowMegaMenu(false);
// //                         }}
// //                       />
// //                     </div>
// //                   )}
// //                 </div>
// //               </Nav>

// //               <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-3">
// //                 <div className="position-relative" ref={searchRef}>
// //                   <InputGroup
// //                     className="bg-light rounded-pill border px-3"
// //                     style={{ height: "38px", minWidth: "220px" }}>
// //                     <Form.Control
// //                       placeholder="Search articles..."
// //                       className="bg-transparent border-0 small shadow-none"
// //                       value={searchQuery}
// //                       onChange={handleSearch}
// //                     />
// //                     <Button
// //                       variant="link"
// //                       className="text-dark p-0 d-flex align-items-center">
// //                       {isSearching ? (
// //                         <Spinner animation="border" size="sm" />
// //                       ) : (
// //                         <CiSearch size={20} />
// //                       )}
// //                     </Button>
// //                   </InputGroup>
// //                   {showResults && results.length > 0 && (
// //                     <div className="search-results-dropdown">
// //                       <ListGroup variant="flush">
// //                         {results.map((item, index) => (
// //                           <ListGroup.Item
// //                             key={index}
// //                             action
// //                             onClick={() => handleResultClick(item)}
// //                             className="small d-flex justify-content-between align-items-center">
// //                             <span>{item.display}</span>
// //                             <span
// //                               className="badge bg-secondary"
// //                               style={{ fontSize: "10px" }}>
// //                               {item.type}
// //                             </span>
// //                           </ListGroup.Item>
// //                         ))}
// //                       </ListGroup>
// //                     </div>
// //                   )}
// //                 </div>

// //                 <div className="button-row">
// //                   <Button
// //                     className="header-btn btn-donate"
// //                     onClick={handleDonateOpen}>
// //                     <CiHeart size={18} className="me-1" /> Donate
// //                   </Button>
// //                   {isAuthenticated ? (
// //                     <div className="d-flex align-items-center gap-2">
// //                       <span className="user-greeting d-none d-lg-inline">
// //                         Hello, <strong>{user?.fullName?.split(" ")[0]}</strong>
// //                       </span>
// //                       <Button
// //                         variant="danger"
// //                         className="header-btn"
// //                         onClick={() => {
// //                           setShowLogoutModal(true);
// //                           setExpanded(false);
// //                         }}>
// //                         Logout
// //                       </Button>
// //                     </div>
// //                   ) : (
// //                     <Button
// //                       as={Link}
// //                       to="/login"
// //                       variant="dark"
// //                       className="header-btn"
// //                       onClick={() => setExpanded(false)}>
// //                       Login
// //                     </Button>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //           </Navbar.Collapse>
// //         </Container>
// //       </Navbar>

// //       <Modal
// //         show={showDonateModal}
// //         onHide={() => !isProcessing && setShowDonateModal(false)}
// //         centered
// //         size="md">
// //         <Modal.Header closeButton={!isProcessing} className="border-0 pb-0" />
// //         <Modal.Body className="px-4 pb-4">
// //           <div className="text-center mb-4">
// //             <CiHeart size={40} className="text-warning mb-2" />
// //             <h4 className="fw-bold">
// //               {donationStep === 1 ? "Support Us" : "Confirm Donation"}
// //             </h4>
// //             <p className="text-muted small">
// //               {donationStep === 1
// //                 ? "Your contribution helps keep our content free."
// //                 : "Please review your details before proceeding."}
// //             </p>
// //           </div>

// //           <div className="payment-card">
// //             {donationStep === 1 ? (
// //               <Form>
// //                 <Form.Group className="mb-3">
// //                   <Form.Label className="small fw-bold text-uppercase">
// //                     Enter Amount (INR)
// //                   </Form.Label>
// //                   <InputGroup>
// //                     <InputGroup.Text className="bg-white border-end-0">
// //                       ₹
// //                     </InputGroup.Text>
// //                     <Form.Control
// //                       type="number"
// //                       placeholder="e.g. 500"
// //                       className="shadow-none border-start-0"
// //                       value={amount}
// //                       onChange={(e) => setAmount(e.target.value)}
// //                     />
// //                   </InputGroup>
// //                 </Form.Group>
// //                 <Button
// //                   variant="dark"
// //                   className="w-100 py-2 fw-bold"
// //                   onClick={handleProcessToPay}>
// //                   PROCESS TO PAY
// //                 </Button>
// //               </Form>
// //             ) : (
// //               <div className="donation-review">
// //                 <div className="mb-3 d-flex align-items-center">
// //                   <CiUser className="me-2 text-muted" size={20} />
// //                   <div>
// //                     <small className="text-muted d-block">Name</small>
// //                     <strong>{user?.fullName}</strong>
// //                   </div>
// //                 </div>
// //                 <div className="mb-3 d-flex align-items-center">
// //                   <CiMail className="me-2 text-muted" size={20} />
// //                   <div>
// //                     <small className="text-muted d-block">Email</small>
// //                     <strong>{user?.email}</strong>
// //                   </div>
// //                 </div>
// //                 <hr />
// //                 <div className="d-flex justify-content-between align-items-center mb-4">
// //                   <span className="fw-bold">Total Amount</span>
// //                   <span className="h4 mb-0 fw-bold text-warning">
// //                     ₹{amount}
// //                   </span>
// //                 </div>
// //                 <div className="d-flex gap-2">
// //                   <Button
// //                     variant="outline-dark"
// //                     className="flex-grow-1"
// //                     onClick={() => setDonationStep(1)}
// //                     disabled={isProcessing}>
// //                     BACK
// //                   </Button>
// //                   <Button
// //                     variant="dark"
// //                     className="flex-grow-1"
// //                     onClick={handleFinalPayment}
// //                     disabled={isProcessing}>
// //                     {isProcessing ? <Spinner size="sm" /> : "PAY NOW"}
// //                   </Button>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </Modal.Body>
// //       </Modal>

// //       <LogoutModal
// //         show={showLogoutModal}
// //         handleClose={() => setShowLogoutModal(false)}
// //       />
// //     </>
// //   );
// // };;

// // export default Header;

// import {
//   Navbar,
//   Nav,
//   Container,
//   Button,
//   Form,
//   InputGroup,
//   Spinner,
//   Modal,
//   Row,
//   Col,
//   ListGroup,
//   Alert,
// } from "react-bootstrap";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import {
//   CiSearch,
//   CiCreditCard1,
//   CiHeart,
//   CiUser,
//   CiMail,
//   CiPhone,
// } from "react-icons/ci";
// import { useState, useEffect, useRef } from "react";
// import { useAuth } from "../../context/AuthContext";
// import LogoutModal from "./LogoutModal";
// import CategoryMegaMenu from "./CategoryMegaMenu";
// import { API_ENDPOINTS, apiCall } from "../../config/api";

// const Header = () => {
//   const { isAuthenticated, user } = useAuth();
//   const navigate = useNavigate();
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const [showDonateModal, setShowDonateModal] = useState(false);
//   const [showAuthModal, setShowAuthModal] = useState(false); // Auth popup ke liye
//   const [showMegaMenu, setShowMegaMenu] = useState(false);
//   const [expanded, setExpanded] = useState(false);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [Logo, setLogo] = useState("");
//   const searchRef = useRef(null);

//   // --- Payment States ---
//   const [donationStep, setDonationStep] = useState(1);
//   const [amount, setAmount] = useState("");
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [paymentStatus, setPaymentStatus] = useState({ type: "", msg: "" }); // Alert ki jagah msg dikhane ke liye

//   useEffect(() => {
//     getlogo();
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setShowResults(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const getlogo = async () => {
//     try {
//       const response = await apiCall(API_ENDPOINTS.LOGO.GET_LOGO);
//       if (response?.data?.length > 0) {
//         setLogo(`${response.data[0]?.image}`);
//       }
//     } catch (err) {
//       console.error("Failed to fetch logo", err);
//     }
//   };

//   const handleSearch = async (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     if (query.length < 2) {
//       setResults([]);
//       setShowResults(false);
//       return;
//     }
//     setIsSearching(true);
//     setShowResults(true);
//     try {
//       const [artRes, catRes, subRes] = await Promise.all([
//         apiCall(API_ENDPOINTS.ARTICLE.GET_ALL),
//         apiCall(API_ENDPOINTS.CATEGORY.GET_ALL),
//         apiCall(API_ENDPOINTS.SUBCATEGORY.GET_ALL),
//       ]);
//       const articles = (artRes?.articles || artRes?.data || [])
//         .filter((a) => a.title.toLowerCase().includes(query.toLowerCase()))
//         .map((item) => ({
//           ...item,
//           type: "Article",
//           display: item.title,
//           link: `/article/${item._id}`,
//         }));

//       const categories = (catRes?.categories || catRes?.data || [])
//         .filter((c) =>
//           c.categoryName.toLowerCase().includes(query.toLowerCase()),
//         )
//         .map((item) => ({
//           ...item,
//           type: "Category",
//           display: item.categoryName,
//           link: `/category/${item._id}`,
//         }));

//       const subCategories = (subRes?.subCategories || subRes?.data || [])
//         .filter((s) =>
//           s.subCategoryName.toLowerCase().includes(query.toLowerCase()),
//         )
//         .map((item) => ({
//           ...item,
//           type: "Subcategory",
//           display: item.subCategoryName,
//           link: `/subcategory/${item._id}`,
//         }));

//       setResults([...articles, ...categories, ...subCategories].slice(0, 10));
//     } catch (err) {
//       console.error("Search failed", err);
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   const handleResultClick = (item) => {
//     setSearchQuery("");
//     setShowResults(false);
//     setExpanded(false);
//     navigate(`/?search=${encodeURIComponent(item.display)}`);
//   };

//   // --- Donation Logic ---
//   const handleDonateOpen = () => {
//     if (!isAuthenticated) {
//       setShowAuthModal(true); // Redirection ki jagah modal open hoga
//       setExpanded(false);
//       return;
//     }
//     setPaymentStatus({ type: "", msg: "" });
//     setDonationStep(1);
//     setAmount("");
//     setShowDonateModal(true);
//     setExpanded(false);
//   };

//   const handleProcessToPay = () => {
//     if (!amount || amount <= 0) {
//       setPaymentStatus({ type: "danger", msg: "Please enter a valid amount" });
//       return;
//     }
//     setPaymentStatus({ type: "", msg: "" });
//     setDonationStep(2);
//   };

//   const handleFinalPayment = async () => {
//     setIsProcessing(true);
//     setPaymentStatus({ type: "", msg: "" });
//     try {
//       const paymentPayload = {
//         amount: Number(amount),
//         currency: "inr",
//         userId: user?.id || user?._id || user?.userId,
//       };

//       const intentResponse = await apiCall(
//         API_ENDPOINTS.PAYMENT.CREATE_INTENT,
//         {
//           method: "POST",
//           body: JSON.stringify(paymentPayload),
//         },
//       );

//       let pi_id =
//         intentResponse?.paymentIntentId ||
//         (intentResponse?.clientSecret
//           ? intentResponse.clientSecret.split("_secret_")[0]
//           : null) ||
//         intentResponse?.id;

//       if (pi_id) {
//         const verifyRes = await apiCall(API_ENDPOINTS.PAYMENT.VERIFY, {
//           method: "POST",
//           body: JSON.stringify({ paymentIntentId: pi_id }),
//         });

//         if (verifyRes) {
//           setPaymentStatus({
//             type: "success",
//             msg: "Donation Successful! Thank you.",
//           });
//           setTimeout(() => {
//             setShowDonateModal(false);
//             setDonationStep(1);
//             setAmount("");
//           }, 2000);
//         }
//       } else {
//         throw new Error("Payment ID not found in server response");
//       }
//     } catch (error) {
//       setPaymentStatus({
//         type: "danger",
//         msg: error.message || "Payment Failed",
//       });
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <>
//       <style>{`
//         .navbar-logo-custom { height: 55px; width: 180px; max-width: 200px; object-fit: contain; }
//         @media (max-width: 991px) { .navbar-logo-custom { height: 50px; width:120px } }
//         .nav-custom-link { position: relative; color: #333 !important; text-decoration: none; transition: color 0.3s ease; display: inline-flex; align-items: center; padding: 0.5rem 0; font-weight: 600; }
//         .nav-custom-link::after { content: ""; position: absolute; width: 0; height: 2px; bottom: 0; left: 0; background-color: #d4af37; transition: all 0.3s ease; }
//         .nav-custom-link:hover::after, .nav-custom-link.active::after { width: 100%; }
//         .nav-custom-link.active { color: #d4af37 !important; }
//         .search-results-dropdown { position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid #eee; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 2000; max-height: 300px; overflow-y: auto; margin-top: 5px; }
//         .header-btn { height: 38px; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.8rem; border-radius: 50px !important; padding: 0 18px; white-space: nowrap; transition: all 0.3s ease; border: none; }
//         .btn-donate { background: linear-gradient(45deg, #d4af37, #f1d592); color: #000 !important; text-transform: uppercase; letter-spacing: 0.5px; }
//         .btn-donate:hover { background: linear-gradient(45deg, #b8962d, #d4af37); transform: translateY(-1px); }
//         .button-row { display: flex; flex-direction: row; align-items: center; gap: 10px; }
//         @media (max-width: 991px) { .button-row { justify-content: center; width: 100%; padding: 15px 0; } .header-btn { flex: 1; max-width: 150px; } }
//         .user-greeting { font-size: 0.85rem; font-weight: 500; color: #555; white-space: nowrap; }
//         .payment-card { border: 1px solid #eee; border-radius: 12px; padding: 20px; background: #fcfcfc; }
//         @media (min-width: 992px) { .desktop-flex-layout { display: flex; width: 100%; align-items: center; justify-content: space-between; } .nav-wrapper { height: 80px; display: flex; align-items: center; padding: 0 15px; } .mega-menu-wrapper { position: fixed; top: 80px; left: 0; right: 0; width: 100vw; z-index: 1050; background: white; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); } }
//       `}</style>

//       <Navbar
//         bg="white"
//         expand="lg"
//         sticky="top"
//         expanded={expanded}
//         onToggle={(val) => setExpanded(val)}
//         className="shadow-sm p-0"
//       >
//         <Container fluid className="px-2 px-lg-4 d-flex align-items-center">
//           <Navbar.Brand
//             as={Link}
//             to="/"
//             className="d-lg-none py-2"
//             onClick={() => setExpanded(false)}
//           >
//             <img src={Logo} alt="Logo" className="navbar-logo-custom" />
//           </Navbar.Brand>
//           <div className="ms-auto d-lg-none d-flex align-items-center">
//             {isAuthenticated && (
//               <span className="user-greeting me-2">
//                 Hi, <strong>{user?.fullName?.split(" ")[0] || "User"}</strong>
//               </span>
//             )}
//             <Navbar.Toggle
//               aria-controls="basic-navbar-nav"
//               className="border-0 shadow-none"
//             />
//           </div>
//           <Navbar.Collapse id="basic-navbar-nav">
//             <div className="desktop-flex-layout">
//               <div className="d-none d-lg-block">
//                 <Navbar.Brand
//                   as={Link}
//                   to="/"
//                   onClick={() => setExpanded(false)}
//                   className="p-0"
//                 >
//                   <img src={Logo} alt="Logo" className="navbar-logo-custom" />
//                 </Navbar.Brand>
//               </div>
//               <Nav className="mx-auto">
//                 <div className="nav-wrapper">
//                   <Nav.Link
//                     as={NavLink}
//                     to="/"
//                     end
//                     className="nav-custom-link"
//                     onClick={() => setExpanded(false)}
//                   >
//                     Home
//                   </Nav.Link>
//                 </div>
//                 <div className="nav-wrapper">
//                   <Nav.Link
//                     as={NavLink}
//                     to="/events"
//                     end
//                     className="nav-custom-link"
//                     onClick={() => setExpanded(false)}
//                   >
//                     Event
//                   </Nav.Link>
//                 </div>
//                 <div className="nav-wrapper">
//                   <Nav.Link
//                     as={NavLink}
//                     to="/videos"
//                     end
//                     className="nav-custom-link"
//                     onClick={() => setExpanded(false)}
//                   >
//                     Video
//                   </Nav.Link>
//                 </div>
//                 <div
//                   className="nav-wrapper"
//                   onMouseEnter={() =>
//                     window.innerWidth > 991 && setShowMegaMenu(true)
//                   }
//                   onMouseLeave={() =>
//                     window.innerWidth > 991 && setShowMegaMenu(false)
//                   }
//                 >
//                   <div
//                     className="nav-custom-link"
//                     style={{ cursor: "pointer" }}
//                     onClick={() =>
//                       window.innerWidth <= 991 && setShowMegaMenu(!showMegaMenu)
//                     }
//                   >
//                     Articles{" "}
//                     <span className="ms-1" style={{ fontSize: "10px" }}>
//                       {showMegaMenu ? "▲" : "▼"}
//                     </span>
//                   </div>
//                   {showMegaMenu && (
//                     <div className="mega-menu-wrapper">
//                       <CategoryMegaMenu
//                         setVisible={setShowMegaMenu}
//                         closeNavbar={() => {
//                           setExpanded(false);
//                           setShowMegaMenu(false);
//                         }}
//                       />
//                     </div>
//                   )}
//                 </div>
//               </Nav>

//               <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-3">
//                 {/* <div className="position-relative" ref={searchRef}>
//                   <InputGroup
//                     className="bg-light rounded-pill border px-3"
//                     style={{ height: "38px", minWidth: "220px" }}
//                   >
//                     <Form.Control
//                       placeholder="Search articles..."
//                       className="bg-transparent border-0 small shadow-none"
//                       value={searchQuery}
//                       onChange={handleSearch}
//                     />
//                     <Button
//                       variant="link"
//                       className="text-dark p-0 d-flex align-items-center"
//                     >
//                       {isSearching ? (
//                         <Spinner animation="border" size="sm" />
//                       ) : (
//                         <CiSearch size={20} />
//                       )}
//                     </Button>
//                   </InputGroup>
//                   {showResults && results.length > 0 && (
//                     <div className="search-results-dropdown">
//                       <ListGroup variant="flush">
//                         {results.map((item, index) => (
//                           <ListGroup.Item
//                             key={index}
//                             action
//                             onClick={() => handleResultClick(item)}
//                             className="small d-flex justify-content-between align-items-center"
//                           >
//                             <span>{item.display}</span>
//                             <span
//                               className="badge bg-secondary"
//                               style={{ fontSize: "10px" }}
//                             >
//                               {item.type}
//                             </span>
//                           </ListGroup.Item>
//                         ))}
//                       </ListGroup>
//                     </div>
//                   )}
//                 </div> */}

//                 <div className="button-row">
//                   <Button
//                     className="header-btn btn-donate"
//                     onClick={handleDonateOpen}
//                   >
//                     <CiHeart size={18} className="me-1" /> Donate
//                   </Button>
//                   {isAuthenticated ? (
//                     <div className="d-flex align-items-center gap-2">
//                       <span className="user-greeting d-none d-lg-inline">
//                         Hello, <strong>{user?.fullName?.split(" ")[0]}</strong>
//                       </span>
//                       <Button
//                         variant="danger"
//                         className="header-btn"
//                         onClick={() => {
//                           setShowLogoutModal(true);
//                           setExpanded(false);
//                         }}
//                       >
//                         Logout
//                       </Button>
//                     </div>
//                   ) : (
//                     <Button
//                       as={Link}
//                       to="/login"
//                       variant="dark"
//                       className="header-btn"
//                       onClick={() => setExpanded(false)}
//                     >
//                       Login
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       {/* AUTH PROMPT MODAL (Signup Popub) */}
//       <Modal
//         show={showAuthModal}
//         onHide={() => setShowAuthModal(false)}
//         centered
//         size="sm"
//       >
//         <Modal.Header closeButton className="border-0" />
//         <Modal.Body className="text-center pb-4">
//           <CiUser size={50} className="text-warning mb-3" />
//           <h5 className="fw-bold">Login Required</h5>
//           <p className="text-muted small">
//             Please login or signup to continue with the donation.
//           </p>
//           <div className="d-grid gap-2">
//             <Button
//               variant="dark"
//               onClick={() => {
//                 setShowAuthModal(false);
//                 navigate("/login");
//               }}
//             >
//               Login Now
//             </Button>
//             <Button
//               variant="outline-dark"
//               onClick={() => {
//                 setShowAuthModal(false);
//                 navigate("/signup");
//               }}
//             >
//               Create Account
//             </Button>
//           </div>
//         </Modal.Body>
//       </Modal>

//       {/* DONATION MODAL */}
//       <Modal
//         show={showDonateModal}
//         onHide={() => !isProcessing && setShowDonateModal(false)}
//         centered
//         size="md"
//       >
//         <Modal.Header closeButton={!isProcessing} className="border-0 pb-0" />
//         <Modal.Body className="px-4 pb-4">
//           <div className="text-center mb-4">
//             <CiHeart size={40} className="text-warning mb-2" />
//             <h4 className="fw-bold">
//               {donationStep === 1 ? "Support Us" : "Confirm Donation"}
//             </h4>
//             {paymentStatus.msg && (
//               <Alert variant={paymentStatus.type} className="small py-2 mt-2">
//                 {paymentStatus.msg}
//               </Alert>
//             )}
//           </div>

//           <div className="payment-card">
//             {donationStep === 1 ? (
//               <Form>
//                 <Form.Group className="mb-3">
//                   <Form.Label className="small fw-bold text-uppercase">
//                     Enter Amount (INR)
//                   </Form.Label>
//                   <InputGroup>
//                     <InputGroup.Text className="bg-white border-end-0">
//                       ₹
//                     </InputGroup.Text>
//                     <Form.Control
//                       type="number"
//                       placeholder="e.g. 500"
//                       className="shadow-none border-start-0"
//                       value={amount}
//                       onChange={(e) => setAmount(e.target.value)}
//                     />
//                   </InputGroup>
//                 </Form.Group>
//                 <Button
//                   variant="dark"
//                   className="w-100 py-2 fw-bold"
//                   onClick={handleProcessToPay}
//                 >
//                   PROCESS TO PAY
//                 </Button>
//               </Form>
//             ) : (
//               <div className="donation-review">
//                 <div className="mb-3 d-flex align-items-center">
//                   <CiUser className="me-2 text-muted" size={20} />
//                   <div>
//                     <small className="text-muted d-block">Name</small>
//                     <strong>{user?.fullName}</strong>
//                   </div>
//                 </div>
//                 <div className="mb-3 d-flex align-items-center">
//                   <CiMail className="me-2 text-muted" size={20} />
//                   <div>
//                     <small className="text-muted d-block">Email</small>
//                     <strong>{user?.email}</strong>
//                   </div>
//                 </div>
//                 <hr />
//                 <div className="d-flex justify-content-between align-items-center mb-4">
//                   <span className="fw-bold">Total Amount</span>
//                   <span className="h4 mb-0 fw-bold text-warning">
//                     ₹{amount}
//                   </span>
//                 </div>
//                 <div className="d-flex gap-2">
//                   <Button
//                     variant="outline-dark"
//                     className="flex-grow-1"
//                     onClick={() => setDonationStep(1)}
//                     disabled={isProcessing}
//                   >
//                     BACK
//                   </Button>
//                   <Button
//                     variant="dark"
//                     className="flex-grow-1"
//                     onClick={handleFinalPayment}
//                     disabled={isProcessing}
//                   >
//                     {isProcessing ? <Spinner size="sm" /> : "PAY NOW"}
//                   </Button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </Modal.Body>
//       </Modal>

//       <LogoutModal
//         show={showLogoutModal}
//         handleClose={() => setShowLogoutModal(false)}
//       />
//     </>
//   );
// };

// export default Header;
// import {
//   Navbar,
//   Nav,
//   Container,
//   Button,
//   Form,
//   InputGroup,
//   Spinner,
//   Modal,
//   Row,
//   Col,
//   ListGroup,
//   Alert,
// } from "react-bootstrap";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import {
//   CiSearch,
//   CiCreditCard1,
//   CiHeart,
//   CiUser,
//   CiMail,
//   CiPhone,
//   CiLock,
// } from "react-icons/ci";
// import {
//   FaCcVisa,
//   FaCcMastercard,
//   FaCcAmex,
//   FaCcDiscover,
//   FaCcDinersClub,
//   FaCcJcb,
//   FaCreditCard,
// } from "react-icons/fa";
// import { useState, useEffect, useRef } from "react";
// import { useAuth } from "../../context/AuthContext";
// import LogoutModal from "./LogoutModal";
// import CategoryMegaMenu from "./CategoryMegaMenu";
// import { API_ENDPOINTS, apiCall } from "../../config/api";

// const Header = () => {
//   const { isAuthenticated, user } = useAuth();
//   const navigate = useNavigate();
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const [showDonateModal, setShowDonateModal] = useState(false);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [showMegaMenu, setShowMegaMenu] = useState(false);
//   const [expanded, setExpanded] = useState(false);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [Logo, setLogo] = useState("");
//   const searchRef = useRef(null);

//   // --- Payment & Card States ---
//   const [donationStep, setDonationStep] = useState(1);
//   const [amount, setAmount] = useState("");
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [paymentStatus, setPaymentStatus] = useState({ type: "", msg: "" });
//   const [cardData, setCardData] = useState({
//     number: "",
//     name: "",
//     expiry: "",
//     cvv: "",
//     type: "unknown",
//   });

//   useEffect(() => {
//     getlogo();
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setShowResults(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const getlogo = async () => {
//     try {
//       const response = await apiCall(API_ENDPOINTS.LOGO.GET_LOGO);
//       if (response?.data?.length > 0) {
//         setLogo(`${response.data[0]?.image}`);
//       }
//     } catch (err) {
//       console.error("Failed to fetch logo", err);
//     }
//   };

//   // --- Card Logic ---
//   const detectCardType = (number) => {
//     const n = number.replace(/\s/g, "");
//     if (/^4/.test(n)) return "visa";
//     if (/^5[1-5]|^2[2-7]/.test(n)) return "mastercard";
//     if (/^3[47]/.test(n)) return "amex";
//     if (/^6(?:011|5)/.test(n)) return "discover";
//     if (/^3(?:0[0-5]|[68])/.test(n)) return "diners";
//     if (/^(?:2131|1800|35)/.test(n)) return "jcb";
//     return "unknown";
//   };

//   const handleCardChange = (e) => {
//     let { name, value } = e.target;
//     if (name === "number") {
//       value = value.replace(/\D/g, "").substring(0, 16);
//       const type = detectCardType(value);
//       const formatted = value.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
//       setCardData((prev) => ({ ...prev, number: formatted, type }));
//     } else if (name === "expiry") {
//       value = value.replace(/\D/g, "").substring(0, 4);
//       if (value.length >= 3)
//         value = value.substring(0, 2) + "/" + value.substring(2);
//       setCardData((prev) => ({ ...prev, expiry: value }));
//     } else if (name === "cvv") {
//       value = value.replace(/\D/g, "").substring(0, 4);
//       setCardData((prev) => ({ ...prev, cvv: value }));
//     } else {
//       setCardData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const renderCardIcon = (size = 30) => {
//     const style = { size };
//     switch (cardData.type) {
//       case "visa":
//         return <FaCcVisa {...style} className="text-white" />;
//       case "mastercard":
//         return <FaCcMastercard {...style} className="text-white" />;
//       case "amex":
//         return <FaCcAmex {...style} className="text-white" />;
//       case "discover":
//         return <FaCcDiscover {...style} className="text-white" />;
//       case "diners":
//         return <FaCcDinersClub {...style} className="text-white" />;
//       case "jcb":
//         return <FaCcJcb {...style} className="text-white" />;
//       default:
//         return <FaCreditCard {...style} className="text-white opacity-50" />;
//     }
//   };

//   // --- Original Logic Kept ---
//   const handleSearch = async (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     if (query.length < 2) {
//       setResults([]);
//       setShowResults(false);
//       return;
//     }
//     setIsSearching(true);
//     setShowResults(true);
//     try {
//       const [artRes, catRes, subRes] = await Promise.all([
//         apiCall(API_ENDPOINTS.ARTICLE.GET_ALL),
//         apiCall(API_ENDPOINTS.CATEGORY.GET_ALL),
//         apiCall(API_ENDPOINTS.SUBCATEGORY.GET_ALL),
//       ]);
//       const articles = (artRes?.articles || artRes?.data || [])
//         .filter((a) => a.title.toLowerCase().includes(query.toLowerCase()))
//         .map((item) => ({
//           ...item,
//           type: "Article",
//           display: item.title,
//           link: `/article/${item._id}`,
//         }));

//       const categories = (catRes?.categories || catRes?.data || [])
//         .filter((c) =>
//           c.categoryName.toLowerCase().includes(query.toLowerCase()),
//         )
//         .map((item) => ({
//           ...item,
//           type: "Category",
//           display: item.categoryName,
//           link: `/category/${item._id}`,
//         }));

//       const subCategories = (subRes?.subCategories || subRes?.data || [])
//         .filter((s) =>
//           s.subCategoryName.toLowerCase().includes(query.toLowerCase()),
//         )
//         .map((item) => ({
//           ...item,
//           type: "Subcategory",
//           display: item.subCategoryName,
//           link: `/subcategory/${item._id}`,
//         }));

//       setResults([...articles, ...categories, ...subCategories].slice(0, 10));
//     } catch (err) {
//       console.error("Search failed", err);
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   const handleResultClick = (item) => {
//     setSearchQuery("");
//     setShowResults(false);
//     setExpanded(false);
//     navigate(`/?search=${encodeURIComponent(item.display)}`);
//   };

//   const handleDonateOpen = () => {
//     if (!isAuthenticated) {
//       setShowAuthModal(true);
//       setExpanded(false);
//       return;
//     }
//     setPaymentStatus({ type: "", msg: "" });
//     setDonationStep(1);
//     setAmount("");
//     setCardData({ number: "", name: "", expiry: "", cvv: "", type: "unknown" });
//     setShowDonateModal(true);
//     setExpanded(false);
//   };

//   const handleProcessToPay = () => {
//     if (!amount || amount <= 0) {
//       setPaymentStatus({ type: "danger", msg: "Please enter a valid amount" });
//       return;
//     }
//     setPaymentStatus({ type: "", msg: "" });
//     setDonationStep(2);
//   };

//   const handleFinalPayment = async () => {
//     setIsProcessing(true);
//     setPaymentStatus({ type: "", msg: "" });
//     try {
//       const paymentPayload = {
//         amount: Number(amount),
//         currency: "inr",
//         userId: user?.id || user?._id || user?.userId,
//       };

//       const intentResponse = await apiCall(
//         API_ENDPOINTS.PAYMENT.CREATE_INTENT,
//         {
//           method: "POST",
//           body: JSON.stringify(paymentPayload),
//         },
//       );

//       let pi_id =
//         intentResponse?.paymentIntentId ||
//         (intentResponse?.clientSecret
//           ? intentResponse.clientSecret.split("_secret_")[0]
//           : null) ||
//         intentResponse?.id;

//       if (pi_id) {
//         const verifyRes = await apiCall(API_ENDPOINTS.PAYMENT.VERIFY, {
//           method: "POST",
//           body: JSON.stringify({ paymentIntentId: pi_id }),
//         });

//         if (verifyRes) {
//           setPaymentStatus({
//             type: "success",
//             msg: "Donation Successful! Thank you.",
//           });
//           setTimeout(() => {
//             setShowDonateModal(false);
//             setDonationStep(1);
//             setAmount("");
//           }, 2000);
//         }
//       } else {
//         throw new Error("Payment ID not found in server response");
//       }
//     } catch (error) {
//       setPaymentStatus({
//         type: "danger",
//         msg: error.message || "Payment Failed",
//       });
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <>
//       <style>{`
//         .navbar-logo-custom { height: 55px; width: 180px; max-width: 200px; object-fit: contain; }
//         @media (max-width: 991px) { .navbar-logo-custom { height: 50px; width:120px } }
//         .nav-custom-link { position: relative; color: #333 !important; text-decoration: none; transition: color 0.3s ease; display: inline-flex; align-items: center; padding: 0.5rem 0; font-weight: 600; }
//         .nav-custom-link::after { content: ""; position: absolute; width: 0; height: 2px; bottom: 0; left: 0; background-color: #d4af37; transition: all 0.3s ease; }
//         .nav-custom-link:hover::after, .nav-custom-link.active::after { width: 100%; }
//         .nav-custom-link.active { color: #d4af37 !important; }
//         .search-results-dropdown { position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid #eee; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 2000; max-height: 300px; overflow-y: auto; margin-top: 5px; }
//         .header-btn { height: 38px; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.8rem; border-radius: 50px !important; padding: 0 18px; white-space: nowrap; transition: all 0.3s ease; border: none; }
//         .btn-donate { background: linear-gradient(45deg, #d4af37, #f1d592); color: #000 !important; text-transform: uppercase; letter-spacing: 0.5px; }
//         .btn-donate:hover { background: linear-gradient(45deg, #b8962d, #d4af37); transform: translateY(-1px); }
//         .button-row { display: flex; flex-direction: row; align-items: center; gap: 10px; }
//         @media (max-width: 991px) { .button-row { justify-content: center; width: 100%; padding: 15px 0; } .header-btn { flex: 1; max-width: 150px; } }
//         .user-greeting { font-size: 0.85rem; font-weight: 500; color: #555; white-space: nowrap; }

//         /* New Payment Card UI */
//         .card-preview-box {
//           background: linear-gradient(135deg, #1a1a1a 0%, #434343 100%);
//           border-radius: 15px; padding: 20px; color: white; margin-bottom: 20px;
//           box-shadow: 0 10px 20px rgba(0,0,0,0.2); position: relative; overflow: hidden;
//         }
//         .card-preview-box::before {
//           content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
//           background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
//         }
//         .card-num-display { font-family: 'Courier New', monospace; font-size: 1.25rem; letter-spacing: 2px; margin: 15px 0; display: block; }
//         .secure-input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; margin-bottom: 12px; }
//         .secure-input:focus { border-color: #d4af37; outline: none; }
//         .label-tiny { font-size: 10px; font-weight: 700; color: #888; text-transform: uppercase; margin-bottom: 4px; display: block; }

//         @media (min-width: 992px) {
//           .desktop-flex-layout { display: flex; width: 100%; align-items: center; justify-content: space-between; }
//           .nav-wrapper { height: 80px; display: flex; align-items: center; padding: 0 15px; }
//           .mega-menu-wrapper { position: fixed; top: 80px; left: 0; right: 0; width: 100vw; z-index: 1050; background: white; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
//         }
//       `}</style>

//       <Navbar
//         bg="white"
//         expand="lg"
//         sticky="top"
//         expanded={expanded}
//         onToggle={(val) => setExpanded(val)}
//         className="shadow-sm p-0"
//       >
//         <Container fluid className="px-2 px-lg-4 d-flex align-items-center">
//           <Navbar.Brand
//             as={Link}
//             to="/"
//             className="d-lg-none py-2"
//             onClick={() => setExpanded(false)}
//           >
//             <img src={Logo} alt="Logo" className="navbar-logo-custom" />
//           </Navbar.Brand>
//           <div className="ms-auto d-lg-none d-flex align-items-center">
//             {isAuthenticated && (
//               <span className="user-greeting me-2">
//                 Hi, <strong>{user?.fullName?.split(" ")[0] || "User"}</strong>
//               </span>
//             )}
//             <Navbar.Toggle
//               aria-controls="basic-navbar-nav"
//               className="border-0 shadow-none"
//             />
//           </div>
//           <Navbar.Collapse id="basic-navbar-nav">
//             <div className="desktop-flex-layout">
//               <div className="d-none d-lg-block">
//                 <Navbar.Brand
//                   as={Link}
//                   to="/"
//                   onClick={() => setExpanded(false)}
//                   className="p-0"
//                 >
//                   <img src={Logo} alt="Logo" className="navbar-logo-custom" />
//                 </Navbar.Brand>
//               </div>
//               <Nav className="mx-auto">
//                 <div className="nav-wrapper">
//                   <Nav.Link
//                     as={NavLink}
//                     to="/"
//                     end
//                     className="nav-custom-link"
//                     onClick={() => setExpanded(false)}
//                   >
//                     Home
//                   </Nav.Link>
//                 </div>
//                 <div className="nav-wrapper">
//                   <Nav.Link
//                     as={NavLink}
//                     to="/events"
//                     end
//                     className="nav-custom-link"
//                     onClick={() => setExpanded(false)}
//                   >
//                     Event
//                   </Nav.Link>
//                 </div>
//                 <div className="nav-wrapper">
//                   <Nav.Link
//                     as={NavLink}
//                     to="/videos"
//                     end
//                     className="nav-custom-link"
//                     onClick={() => setExpanded(false)}
//                   >
//                     Video
//                   </Nav.Link>
//                 </div>

//                 <div
//                   className="nav-wrapper"
//                   onMouseEnter={() =>
//                     window.innerWidth > 991 && setShowMegaMenu(true)
//                   }
//                   onMouseLeave={() =>
//                     window.innerWidth > 991 && setShowMegaMenu(false)
//                   }
//                 >
//                   <div
//                     className="nav-custom-link"
//                     style={{ cursor: "pointer" }}
//                     onClick={() =>
//                       window.innerWidth <= 991 && setShowMegaMenu(!showMegaMenu)
//                     }
//                   >
//                     Articles{" "}
//                     <span className="ms-1" style={{ fontSize: "10px" }}>
//                       {showMegaMenu ? "▲" : "▼"}
//                     </span>
//                   </div>
//                   {showMegaMenu && (
//                     <div className="mega-menu-wrapper">
//                       <CategoryMegaMenu
//                         setVisible={setShowMegaMenu}
//                         closeNavbar={() => {
//                           setExpanded(false);
//                           setShowMegaMenu(false);
//                         }}
//                       />
//                     </div>
//                   )}
//                 </div>
//               </Nav>

//               <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-3">
//                 <div className="button-row">
//                   <Button
//                     className="header-btn btn-donate"
//                     onClick={handleDonateOpen}
//                   >
//                     <CiHeart size={18} className="me-1" /> Donate
//                   </Button>
//                   {isAuthenticated ? (
//                     <div className="d-flex align-items-center gap-2">
//                       <span className="user-greeting d-none d-lg-inline">
//                         Hello, <strong>{user?.fullName?.split(" ")[0]}</strong>
//                       </span>
//                       <Button
//                         variant="danger"
//                         className="header-btn"
//                         onClick={() => {
//                           setShowLogoutModal(true);
//                           setExpanded(false);
//                         }}
//                       >
//                         Logout
//                       </Button>
//                     </div>
//                   ) : (
//                     <Button
//                       as={Link}
//                       to="/login"
//                       variant="dark"
//                       className="header-btn"
//                       onClick={() => setExpanded(false)}
//                     >
//                       Login
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       {/* AUTH PROMPT MODAL */}
//       <Modal
//         show={showAuthModal}
//         onHide={() => setShowAuthModal(false)}
//         centered
//         size="sm"
//       >
//         <Modal.Header closeButton className="border-0" />
//         <Modal.Body className="text-center pb-4">
//           <CiUser size={50} className="text-warning mb-3" />
//           <h5 className="fw-bold">Login Required</h5>
//           <p className="text-muted small">
//             Please login or signup to continue with the donation.
//           </p>
//           <div className="d-grid gap-2">
//             <Button
//               variant="dark"
//               onClick={() => {
//                 setShowAuthModal(false);
//                 navigate("/login");
//               }}
//             >
//               Login Now
//             </Button>
//             <Button
//               variant="outline-dark"
//               onClick={() => {
//                 setShowAuthModal(false);
//                 navigate("/signup");
//               }}
//             >
//               Create Account
//             </Button>
//           </div>
//         </Modal.Body>
//       </Modal>

//       {/* UPGRADED DONATION MODAL */}
//       <Modal
//         show={showDonateModal}
//         onHide={() => !isProcessing && setShowDonateModal(false)}
//         centered
//         size="md"
//       >
//         <Modal.Header closeButton={!isProcessing} className="border-0 pb-0" />
//         <Modal.Body className="px-4 pb-4">
//           <div className="text-center mb-4">
//             <CiHeart size={40} className="text-warning mb-2" />
//             <h4 className="fw-bold">
//               {donationStep === 1 ? "Support Us" : "Payment Details"}
//             </h4>
//             {paymentStatus.msg && (
//               <Alert variant={paymentStatus.type} className="small py-2 mt-2">
//                 {paymentStatus.msg}
//               </Alert>
//             )}
//           </div>

//           {donationStep === 1 ? (
//             <div className="payment-card p-3">
//               <Form.Group className="mb-4">
//                 <Form.Label className="small fw-bold text-uppercase">
//                   Enter Amount (INR)
//                 </Form.Label>
//                 <InputGroup size="lg">
//                   <InputGroup.Text className="bg-white border-end-0">
//                     ₹
//                   </InputGroup.Text>
//                   <Form.Control
//                     type="number"
//                     placeholder="500"
//                     className="shadow-none border-start-0 fw-bold"
//                     value={amount}
//                     onChange={(e) => setAmount(e.target.value)}
//                   />
//                 </InputGroup>
//               </Form.Group>
//               <Button
//                 variant="dark"
//                 className="w-100 py-3 fw-bold rounded-pill"
//                 onClick={handleProcessToPay}
//               >
//                 NEXT STEP
//               </Button>
//             </div>
//           ) : (
//             <div className="donation-review">
//               {/* Virtual Card Preview */}
//               <div className="card-preview-box">
//                 <div className="d-flex justify-content-between align-items-start">
//                   <CiCreditCard1 size={35} />
//                   {renderCardIcon(40)}
//                 </div>
//                 <div className="card-num-display">
//                   {cardData.number || "•••• •••• •••• ••••"}
//                 </div>
//                 <div className="d-flex justify-content-between">
//                   <div>
//                     <span className="label-tiny text-white-50">
//                       Card Holder
//                     </span>
//                     <div className="small">{cardData.name || "YOUR NAME"}</div>
//                   </div>
//                   <div>
//                     <span className="label-tiny text-white-50">Expires</span>
//                     <div className="small">{cardData.expiry || "MM/YY"}</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Form Fields */}
//               <Row className="g-2">
//                 <Col xs={12}>
//                   <span className="label-tiny">Full Name on Card</span>
//                   <input
//                     name="name"
//                     placeholder="John Doe"
//                     className="secure-input"
//                     onChange={handleCardChange}
//                   />
//                 </Col>
//                 <Col xs={12}>
//                   <span className="label-tiny">Card Number</span>
//                   <input
//                     name="number"
//                     placeholder="0000 0000 0000 0000"
//                     className="secure-input"
//                     value={cardData.number}
//                     onChange={handleCardChange}
//                   />
//                 </Col>
//                 <Col xs={6}>
//                   <span className="label-tiny">Expiry Date</span>
//                   <input
//                     name="expiry"
//                     placeholder="MM/YY"
//                     className="secure-input"
//                     value={cardData.expiry}
//                     onChange={handleCardChange}
//                   />
//                 </Col>
//                 <Col xs={6}>
//                   <span className="label-tiny">CVV</span>
//                   <input
//                     name="cvv"
//                     placeholder="•••"
//                     type="password"
//                     className="secure-input"
//                     value={cardData.cvv}
//                     onChange={handleCardChange}
//                   />
//                 </Col>
//               </Row>

//               <hr />
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <span className="fw-bold">Donation Amount</span>
//                 <span className="h4 mb-0 fw-bold text-dark">₹{amount}</span>
//               </div>

//               <div className="d-flex gap-2">
//                 <Button
//                   variant="outline-dark"
//                   className="flex-grow-1 rounded-pill"
//                   onClick={() => setDonationStep(1)}
//                   disabled={isProcessing}
//                 >
//                   BACK
//                 </Button>
//                 <Button
//                   variant="dark"
//                   className="flex-grow-1 rounded-pill"
//                   onClick={handleFinalPayment}
//                   disabled={isProcessing}
//                 >
//                   {isProcessing ? (
//                     <Spinner size="sm" />
//                   ) : (
//                     <>
//                       <CiLock className="me-1" /> PAY NOW
//                     </>
//                   )}
//                 </Button>
//               </div>
//             </div>
//           )}
//         </Modal.Body>
//       </Modal>

//       <LogoutModal
//         show={showLogoutModal}
//         handleClose={() => setShowLogoutModal(false)}
//       />
//     </>
//   );
// };

// export default Header;
// import { Navbar, Nav, Container, Button, Modal } from "react-bootstrap";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { CiHeart, CiUser } from "react-icons/ci";
// import { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";
// import LogoutModal from "./LogoutModal";
// import CategoryMegaMenu from "./CategoryMegaMenu";
// import { API_ENDPOINTS, apiCall } from "../../config/api";
// import DonateComponent from "../DonateComponent";

// const Header = () => {
//   const { isAuthenticated, user } = useAuth();
//   const navigate = useNavigate();
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const [showDonateUI, setShowDonateUI] = useState(false);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [showMegaMenu, setShowMegaMenu] = useState(false);
//   const [expanded, setExpanded] = useState(false);
//   const [Logo, setLogo] = useState("");

//   useEffect(() => {
//     getlogo();
//   }, []);

//   const getlogo = async () => {
//     try {
//       const response = await apiCall(API_ENDPOINTS.LOGO.GET_LOGO);
//       if (response?.data?.length > 0) {
//         setLogo(`${response.data[0]?.image}`);
//       }
//     } catch (err) {
//       console.error("Failed to fetch logo", err);
//     }
//   };

//   const handleDonateClick = () => {
//     if (!isAuthenticated) {
//       setShowAuthModal(true);
//       setExpanded(false);
//       return;
//     }
//     setShowDonateUI(true);
//     setExpanded(false);
//   };

//   return (
//     <>
//       <style>{`
//         .navbar-logo-custom { height: 55px; width: 180px; max-width: 200px; object-fit: contain; }
//         @media (max-width: 991px) { .navbar-logo-custom { height: 50px; width:120px } }
//         .nav-custom-link { position: relative; color: #333 !important; text-decoration: none; transition: color 0.3s ease; display: inline-flex; align-items: center; padding: 0.5rem 0; font-weight: 600; }
//         .nav-custom-link::after { content: ""; position: absolute; width: 0; height: 2px; bottom: 0; left: 0; background-color: #d4af37; transition: all 0.3s ease; }
//         .nav-custom-link:hover::after, .nav-custom-link.active::after { width: 100%; }
//         .nav-custom-link.active { color: #d4af37 !important; }
//         .header-btn { height: 38px; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.8rem; border-radius: 50px !important; padding: 0 18px; white-space: nowrap; transition: all 0.3s ease; border: none; }
//         .btn-donate { background: linear-gradient(45deg, #d4af37, #f1d592); color: #000 !important; text-transform: uppercase; letter-spacing: 0.5px; }
//         .btn-donate:hover { background: linear-gradient(45deg, #b8962d, #d4af37); transform: translateY(-1px); }
//         .button-row { display: flex; flex-direction: row; align-items: center; gap: 10px; }
//         @media (max-width: 991px) { .button-row { justify-content: center; width: 100%; padding: 15px 0; } .header-btn { flex: 1; max-width: 150px; } }
//         .user-greeting { font-size: 0.85rem; font-weight: 500; color: #555; white-space: nowrap; }

//         @media (min-width: 992px) {
//           .desktop-flex-layout { display: flex; width: 100%; align-items: center; justify-content: space-between; }
//           .nav-wrapper { height: 80px; display: flex; align-items: center; padding: 0 15px; }
//           .mega-menu-wrapper { position: fixed; top: 80px; left: 0; right: 0; width: 100vw; z-index: 1050; background: white; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
//         }
//       `}</style>

//       <Navbar
//         bg="white"
//         expand="lg"
//         sticky="top"
//         expanded={expanded}
//         onToggle={(val) => setExpanded(val)}
//         className="shadow-sm p-0"
//       >
//         <Container fluid className="px-2 px-lg-4 d-flex align-items-center">
//           <Navbar.Brand
//             as={Link}
//             to="/"
//             className="d-lg-none py-2"
//             onClick={() => setExpanded(false)}
//           >
//             <img src={Logo} alt="Logo" className="navbar-logo-custom" />
//           </Navbar.Brand>

//           <div className="ms-auto d-lg-none d-flex align-items-center">
//             {isAuthenticated && (
//               <span className="user-greeting me-2">
//                 Hi, <strong>{user?.fullName?.split(" ")[0] || "User"}</strong>
//               </span>
//             )}
//             <Navbar.Toggle
//               aria-controls="basic-navbar-nav"
//               className="border-0 shadow-none"
//             />
//           </div>

//           <Navbar.Collapse id="basic-navbar-nav">
//             <div className="desktop-flex-layout">
//               <div className="d-none d-lg-block">
//                 <Navbar.Brand
//                   as={Link}
//                   to="/"
//                   onClick={() => setExpanded(false)}
//                   className="p-0"
//                 >
//                   <img src={Logo} alt="Logo" className="navbar-logo-custom" />
//                 </Navbar.Brand>
//               </div>

//               <Nav className="mx-auto">
//                 <div className="nav-wrapper">
//                   <Nav.Link
//                     as={NavLink}
//                     to="/"
//                     end
//                     className="nav-custom-link"
//                     onClick={() => setExpanded(false)}
//                   >
//                     Home
//                   </Nav.Link>
//                 </div>
//                 <div className="nav-wrapper">
//                   <Nav.Link
//                     as={NavLink}
//                     to="/events"
//                     end
//                     className="nav-custom-link"
//                     onClick={() => setExpanded(false)}
//                   >
//                     Events
//                   </Nav.Link>
//                 </div>
//                 <div className="nav-wrapper">
//                   <Nav.Link
//                     as={NavLink}
//                     to="/videos"
//                     end
//                     className="nav-custom-link"
//                     onClick={() => setExpanded(false)}
//                   >
//                     Videos
//                   </Nav.Link>
//                 </div>

//                 <div
//                   className="nav-wrapper"
//                   onMouseEnter={() =>
//                     window.innerWidth > 991 && setShowMegaMenu(true)
//                   }
//                   onMouseLeave={() =>
//                     window.innerWidth > 991 && setShowMegaMenu(false)
//                   }
//                 >
//                   <div
//                     className="nav-custom-link"
//                     style={{ cursor: "pointer" }}
//                     onClick={() =>
//                       window.innerWidth <= 991 && setShowMegaMenu(!showMegaMenu)
//                     }
//                   >
//                     Articles{" "}
//                     <span className="ms-1" style={{ fontSize: "10px" }}>
//                       {showMegaMenu ? "▲" : "▼"}
//                     </span>
//                   </div>
//                   {showMegaMenu && (
//                     <div className="mega-menu-wrapper">
//                       <CategoryMegaMenu
//                         setVisible={setShowMegaMenu}
//                         closeNavbar={() => {
//                           setExpanded(false);
//                           setShowMegaMenu(false);
//                         }}
//                       />
//                     </div>
//                   )}
//                 </div>
//               </Nav>

//               <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-3">
//                 <div className="button-row">
//                   {/* FIX: Keep the Button here to trigger the state */}
//                   <Button
//                     className="header-btn btn-donate"
//                     onClick={handleDonateClick}
//                   >
//                     <CiHeart size={18} className="me-1" /> Donate
//                   </Button>

//                   {isAuthenticated ? (
//                     <div className="d-flex align-items-center gap-2">
//                       <span className="user-greeting d-none d-lg-inline">
//                         Hello, <strong>{user?.fullName?.split(" ")[0]}</strong>
//                       </span>
//                       <Button
//                         variant="danger"
//                         className="header-btn"
//                         onClick={() => {
//                           setShowLogoutModal(true);
//                           setExpanded(false);
//                         }}
//                       >
//                         Logout
//                       </Button>
//                     </div>
//                   ) : (
//                     <Button
//                       as={Link}
//                       to="/login"
//                       variant="dark"
//                       className="header-btn"
//                       onClick={() => setExpanded(false)}
//                     >
//                       Login
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       {/* FIX: Render the custom Stripe component here (it's a Modal) */}
//       <DonateComponent
//         show={showDonateUI}
//         onHide={() => setShowDonateUI(false)}
//         user={user}
//       />

//       {/* Auth Prompt Modal */}
//       <Modal
//         show={showAuthModal}
//         onHide={() => setShowAuthModal(false)}
//         centered
//         size="sm"
//       >
//         <Modal.Header closeButton className="border-0" />
//         <Modal.Body className="text-center pb-4">
//           <CiUser size={50} className="text-warning mb-3" />
//           <h5 className="fw-bold">Login Required</h5>
//           <p className="text-muted small">
//             Please login or signup to continue with the donation.
//           </p>
//           <div className="d-grid gap-2">
//             <Button
//               variant="dark"
//               onClick={() => {
//                 setShowAuthModal(false);
//                 navigate("/login");
//               }}
//             >
//               Login Now
//             </Button>
//             <Button
//               variant="outline-dark"
//               onClick={() => {
//                 setShowAuthModal(false);
//                 navigate("/signup");
//               }}
//             >
//               Create Account
//             </Button>
//           </div>
//         </Modal.Body>
//       </Modal>

//       <LogoutModal
//         show={showLogoutModal}
//         handleClose={() => setShowLogoutModal(false)}
//       />
//     </>
//   );
// };

// export default Header;
// import { Navbar, Nav, Container, Button, Modal } from "react-bootstrap";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { CiHeart, CiUser } from "react-icons/ci";
// import { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";
// import LogoutModal from "./LogoutModal";
// import CategoryMegaMenu from "./CategoryMegaMenu";
// import { API_ENDPOINTS, apiCall } from "../../config/api";
// import DonateComponent from "../DonateComponent";

// const Header = () => {
//   const { isAuthenticated, user } = useAuth();
//   const navigate = useNavigate();
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const [showDonateUI, setShowDonateUI] = useState(false);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [showMegaMenu, setShowMegaMenu] = useState(false);
//   const [expanded, setExpanded] = useState(false);
//   const [Logo, setLogo] = useState("");

//   useEffect(() => {
//     getlogo();
//   }, []);

//   const getlogo = async () => {
//     try {
//       const response = await apiCall(API_ENDPOINTS.LOGO.GET_LOGO);
//       if (response?.data?.length > 0) {
//         setLogo(`${response.data[0]?.image}`);
//       }
//     } catch (err) {
//       console.error("Failed to fetch logo", err);
//     }
//   };

//   const handleDonateClick = () => {
//     if (!isAuthenticated) {
//       setShowAuthModal(true);
//       setExpanded(false);
//       return;
//     }
//     setShowDonateUI(true);
//     setExpanded(false);
//   };

//   return (
//     <>
//       <style>{`
//         .navbar-logo-custom { height: 55px; width: 180px; max-width: 200px; object-fit: contain; }
//         @media (max-width: 991px) { .navbar-logo-custom { height: 50px; width:120px } }
//         .nav-custom-link { position: relative; color: #333 !important; text-decoration: none; transition: color 0.3s ease; display: inline-flex; align-items: center; padding: 0.5rem 0; font-weight: 600; }
//         .nav-custom-link::after { content: ""; position: absolute; width: 0; height: 2px; bottom: 0; left: 0; background-color: #d4af37; transition: all 0.3s ease; }
//         .nav-custom-link:hover::after, .nav-custom-link.active::after { width: 100%; }
//         .nav-custom-link.active { color: #d4af37 !important; }
//         .header-btn { height: 38px; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.8rem; border-radius: 50px !important; padding: 0 18px; white-space: nowrap; transition: all 0.3s ease; border: none; }
//         .btn-donate { background: linear-gradient(45deg, #d4af37, #f1d592); color: #000 !important; text-transform: uppercase; letter-spacing: 0.5px; }
//         .btn-donate:hover { background: linear-gradient(45deg, #b8962d, #d4af37); transform: translateY(-1px); }
//         .button-row { display: flex; flex-direction: row; align-items: center; gap: 10px; }
//         @media (max-width: 991px) { .button-row { justify-content: center; width: 100%; padding: 15px 0; } .header-btn { flex: 1; max-width: 150px; } }
//         .user-greeting { font-size: 0.85rem; font-weight: 500; color: #555; white-space: nowrap; }

//         @media (min-width: 992px) {
//           .desktop-flex-layout { display: flex; width: 100%; align-items: center; justify-content: space-between; }
//           .nav-wrapper { height: 80px; display: flex; align-items: center; padding: 0 15px; }
//           .mega-menu-wrapper { position: fixed; top: 80px; left: 0; right: 0; width: 100vw; z-index: 1050; background: white; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
//         }

//         /* --- Custom Toggle Cross Animation --- */
//         .navbar-toggler {
//           width: 30px;
//           height: 30px;
//           position: relative;
//           transition: .5s ease-in-out;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 0;
//         }

//         .navbar-toggler-icon {
//           background-image: none !important;
//           display: block;
//           width: 24px;
//           height: 2px;
//           background-color: black;
//           position: relative;
//           transition: background 0.2s ease-in-out;
//         }

//         .navbar-toggler-icon::before,
//         .navbar-toggler-icon::after {
//           content: "";
//           position: absolute;
//           width: 24px;
//           height: 2px;
//           background-color: black;
//           transition: all 0.3s ease-in-out;
//           left: 0;
//         }

//         .navbar-toggler-icon::before { top: -8px; }
//         .navbar-toggler-icon::after { top: 8px; }

//         /* Style when expanded */
//         .toggler-open .navbar-toggler-icon {
//           background-color: transparent !important;
//         }

//         .toggler-open .navbar-toggler-icon::before {
//           top: 0;
//           transform: rotate(45deg);
//         }

//         .toggler-open .navbar-toggler-icon::after {
//           top: 0;
//           transform: rotate(-45deg);
//         }
//       `}</style>

//       <Navbar
//         bg="white"
//         expand="lg"
//         sticky="top"
//         expanded={expanded}
//         onToggle={(val) => setExpanded(val)}
//         className="shadow-sm p-0"
//       >
//         <Container fluid className="px-2 px-lg-4 d-flex align-items-center">
//           <Navbar.Brand
//             as={Link}
//             to="/"
//             className="d-lg-none py-2"
//             onClick={() => setExpanded(false)}
//           >
//             <img src={Logo} alt="Logo" className="navbar-logo-custom" />
//           </Navbar.Brand>

//           <div className="ms-auto d-lg-none d-flex align-items-center">
//             {isAuthenticated && (
//               <span className="user-greeting me-2">
//                 Hi, <strong>{user?.fullName?.split(" ")[0] || "User"}</strong>
//               </span>
//             )}
//             <Navbar.Toggle
//               aria-controls="basic-navbar-nav"
//               className={`border-0 shadow-none ${expanded ? "toggler-open" : ""}`}
//             >
//               <span className="navbar-toggler-icon"></span>
//             </Navbar.Toggle>
//           </div>

//           <Navbar.Collapse id="basic-navbar-nav">
//             <div className="desktop-flex-layout">
//               <div className="d-none d-lg-block">
//                 <Navbar.Brand
//                   as={Link}
//                   to="/"
//                   onClick={() => setExpanded(false)}
//                   className="p-0"
//                 >
//                   <img src={Logo} alt="Logo" className="navbar-logo-custom" />
//                 </Navbar.Brand>
//               </div>

//               <Nav className="mx-auto">
//                 <div className="nav-wrapper">
//                   <Nav.Link
//                     as={NavLink}
//                     to="/"
//                     end
//                     className="nav-custom-link"
//                     onClick={() => setExpanded(false)}
//                   >
//                     Home
//                   </Nav.Link>
//                 </div>
//                 <div className="nav-wrapper">
//                   <Nav.Link
//                     as={NavLink}
//                     to="/events"
//                     end
//                     className="nav-custom-link"
//                     onClick={() => setExpanded(false)}
//                   >
//                     Events
//                   </Nav.Link>
//                 </div>
//                 <div className="nav-wrapper">
//                   <Nav.Link
//                     as={NavLink}
//                     to="/videos"
//                     end
//                     className="nav-custom-link"
//                     onClick={() => setExpanded(false)}
//                   >
//                     Videos
//                   </Nav.Link>
//                 </div>

//                 <div
//                   className="nav-wrapper"
//                   onMouseEnter={() =>
//                     window.innerWidth > 991 && setShowMegaMenu(true)
//                   }
//                   onMouseLeave={() =>
//                     window.innerWidth > 991 && setShowMegaMenu(false)
//                   }
//                 >
//                   <div
//                     className="nav-custom-link"
//                     style={{ cursor: "pointer" }}
//                     onClick={() =>
//                       window.innerWidth <= 991 && setShowMegaMenu(!showMegaMenu)
//                     }
//                   >
//                     Articles{" "}
//                     <span className="ms-1" style={{ fontSize: "10px" }}>
//                       {showMegaMenu ? "▲" : "▼"}
//                     </span>
//                   </div>
//                   {showMegaMenu && (
//                     <div className="mega-menu-wrapper">
//                       <CategoryMegaMenu
//                         setVisible={setShowMegaMenu}
//                         closeNavbar={() => {
//                           setExpanded(false);
//                           setShowMegaMenu(false);
//                         }}
//                       />
//                     </div>
//                   )}
//                 </div>
//               </Nav>

//               <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-3">
//                 <div className="button-row">
//                   <Button
//                     className="header-btn btn-donate"
//                     onClick={handleDonateClick}
//                   >
//                     <CiHeart size={18} className="me-1" /> Donate
//                   </Button>

//                   {isAuthenticated ? (
//                     <div className="d-flex align-items-center gap-2">
//                       <span className="user-greeting d-none d-lg-inline">
//                         Hello, <strong>{user?.fullName?.split(" ")[0]}</strong>
//                       </span>
//                       <Button
//                         variant="danger"
//                         className="header-btn"
//                         onClick={() => {
//                           setShowLogoutModal(true);
//                           setExpanded(false);
//                         }}
//                       >
//                         Logout
//                       </Button>
//                     </div>
//                   ) : (
//                     <Button
//                       as={Link}
//                       to="/login"
//                       variant="dark"
//                       className="header-btn"
//                       onClick={() => setExpanded(false)}
//                     >
//                       Login
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       <DonateComponent
//         show={showDonateUI}
//         onHide={() => setShowDonateUI(false)}
//         user={user}
//       />

//       <Modal
//         show={showAuthModal}
//         onHide={() => setShowAuthModal(false)}
//         centered
//         size="sm"
//       >
//         <Modal.Header closeButton className="border-0" />
//         <Modal.Body className="text-center pb-4">
//           <CiUser size={50} className="text-warning mb-3" />
//           <h5 className="fw-bold">Login Required</h5>
//           <p className="text-muted small">
//             Please login or signup to continue with the donation.
//           </p>
//           <div className="d-grid gap-2">
//             <Button
//               variant="dark"
//               onClick={() => {
//                 setShowAuthModal(false);
//                 navigate("/login");
//               }}
//             >
//               Login Now
//             </Button>
//             <Button
//               variant="outline-dark"
//               onClick={() => {
//                 setShowAuthModal(false);
//                 navigate("/signup");
//               }}
//             >
//               Create Account
//             </Button>
//           </div>
//         </Modal.Body>
//       </Modal>

//       <LogoutModal
//         show={showLogoutModal}
//         handleClose={() => setShowLogoutModal(false)}
//       />
//     </>
//   );
// };

// export default Header;
// import { Navbar, Nav, Container, Button, Modal } from "react-bootstrap";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { CiHeart, CiUser } from "react-icons/ci";
// import { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";
// import LogoutModal from "./LogoutModal";
// import CategoryMegaMenu from "./CategoryMegaMenu";
// import { API_ENDPOINTS, apiCall } from "../../config/api";
// import DonateComponent from "../DonateComponent";

// const Header = () => {
//   const { isAuthenticated, user } = useAuth();
//   const navigate = useNavigate();
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const [showDonateUI, setShowDonateUI] = useState(false);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [showMegaMenu, setShowMegaMenu] = useState(false);
//   const [expanded, setExpanded] = useState(false);
//   const [Logo, setLogo] = useState("");

//   useEffect(() => {
//     getlogo();
//   }, []);

//   const getlogo = async () => {
//     try {
//       const response = await apiCall(API_ENDPOINTS.LOGO.GET_LOGO);
//       if (response?.data?.length > 0) {
//         setLogo(`${response.data[0]?.image}`);
//       }
//     } catch (err) {
//       console.error("Failed to fetch logo", err);
//     }
//   };

//   const handleDonateClick = () => {
//     if (!isAuthenticated) {
//       setShowAuthModal(true);
//       setExpanded(false);
//       return;
//     }
//     setShowDonateUI(true);
//     setExpanded(false);
//   };

//   return (
//     <>
//       <style>{`
//         /* --- Logo Styles --- */
//         .navbar-logo-custom {
//           height: 55px;
//           width: 180px;
//           object-fit: contain;
//           transition: all 0.3s ease;
//         }

//         @media (max-width: 991px) {
//           .navbar-logo-custom {
//             height: 50px !important;
//             width: 160px !important;
//             max-height: 50px;
//             max-width: 180px;
//           }
//         }

//         /* --- Navigation Links --- */
//         .nav-custom-link {
//           position: relative;
//           color: #333 !important;
//           text-decoration: none;
//           transition: color 0.3s ease;
//           display: inline-flex;
//           align-items: center;
//           padding: 0.5rem 0;
//           font-weight: 600;
//         }
//         .nav-custom-link::after {
//           content: "";
//           position: absolute;
//           width: 0;
//           height: 2px;
//           bottom: 0;
//           left: 0;
//           background-color: #d4af37;
//           transition: all 0.3s ease;
//         }
//         .nav-custom-link:hover::after, .nav-custom-link.active::after { width: 100%; }
//         .nav-custom-link.active { color: #d4af37 !important; }

//         /* --- Buttons --- */
//         .header-btn {
//           height: 38px;
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           font-weight: 700;
//           font-size: 0.8rem;
//           border-radius: 50px !important;
//           padding: 0 18px;
//           white-space: nowrap;
//           transition: all 0.3s ease;
//           border: none;
//         }
//         .btn-donate {
//           background: linear-gradient(45deg, #d4af37, #f1d592);
//           color: #000 !important;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }
//         .btn-donate:hover {
//           background: linear-gradient(45deg, #b8962d, #d4af37);
//           transform: translateY(-1px);
//         }
//         .button-row { display: flex; flex-direction: row; align-items: center; gap: 10px; }

//         @media (max-width: 991px) {
//           .button-row { justify-content: center; width: 100%; padding: 15px 0; }
//           .header-btn { flex: 1; max-width: 150px; }
//         }

//         .user-greeting { font-size: 0.85rem; font-weight: 500; color: #555; white-space: nowrap; }

//         /* --- Layout --- */
//         @media (min-width: 992px) {
//           .desktop-flex-layout { display: flex; width: 100%; align-items: center; justify-content: space-between; }
//           .nav-wrapper { height: 80px; display: flex; align-items: center; padding: 0 15px; }
//           .mega-menu-wrapper {
//             position: fixed;
//             top: 80px;
//             left: 0;
//             right: 0;
//             width: 100vw;
//             z-index: 1050;
//             background: white;
//             box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
//           }
//         }

//         /* --- Custom Toggle Cross Animation --- */
//         .navbar-toggler {
//           width: 30px;
//           height: 30px;
//           position: relative;
//           transition: .5s ease-in-out;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 0;
//         }

//         .navbar-toggler-icon {
//           background-image: none !important;
//           display: block;
//           width: 24px;
//           height: 2px;
//           background-color: black;
//           position: relative;
//           transition: background 0.2s ease-in-out;
//         }

//         .navbar-toggler-icon::before,
//         .navbar-toggler-icon::after {
//           content: "";
//           position: absolute;
//           width: 24px;
//           height: 2px;
//           background-color: black;
//           transition: all 0.3s ease-in-out;
//           left: 0;
//         }
//         .navbar-toggler-icon::before { top: -8px; }
//         .navbar-toggler-icon::after { top: 8px; }

//         .toggler-open .navbar-toggler-icon { background-color: transparent !important; }
//         .toggler-open .navbar-toggler-icon::before { top: 0; transform: rotate(45deg); }
//         .toggler-open .navbar-toggler-icon::after { top: 0; transform: rotate(-45deg); }
//       `}</style>

//       <Navbar
//         bg="white"
//         expand="lg"
//         sticky="top"
//         expanded={expanded}
//         onToggle={(val) => setExpanded(val)}
//         className="shadow-sm p-0"
//       >
//         <Container fluid className="px-2 px-lg-4 d-flex align-items-center">
//           {/* Mobile Logo Container */}
//           <Navbar.Brand
//             as={Link}
//             to="/"
//             className="d-lg-none py-2"
//             onClick={() => setExpanded(false)}
//           >
//             <img src={Logo} alt="Logo" className="navbar-logo-custom" />
//           </Navbar.Brand>

//           {/* Mobile Right Side (Greeting + Toggler) */}
//           <div className="ms-auto d-lg-none d-flex align-items-center">
//             {isAuthenticated && (
//               <span className="user-greeting me-2">
//                 Hi, <strong>{user?.fullName?.split(" ")[0] || "User"}</strong>
//               </span>
//             )}
//             <Navbar.Toggle
//               aria-controls="basic-navbar-nav"
//               className={`border-0 shadow-none ${expanded ? "toggler-open" : ""}`}
//             >
//               <span className="navbar-toggler-icon"></span>
//             </Navbar.Toggle>
//           </div>

//           <Navbar.Collapse id="basic-navbar-nav">
//             <div className="desktop-flex-layout">
//               {/* Desktop Logo */}
//               <div className="d-none d-lg-block">
//                 <Navbar.Brand
//                   as={Link}
//                   to="/"
//                   onClick={() => setExpanded(false)}
//                   className="p-0"
//                 >
//                   <img src={Logo} alt="Logo" className="navbar-logo-custom" />
//                 </Navbar.Brand>
//               </div>

//               {/* Main Navigation */}
//               <Nav className="mx-auto">
//                 <div className="nav-wrapper">
//                   <Nav.Link
//                     as={NavLink}
//                     to="/"
//                     end
//                     className="nav-custom-link"
//                     onClick={() => setExpanded(false)}
//                   >
//                     Home
//                   </Nav.Link>
//                 </div>
//                 <div className="nav-wrapper">
//                   <Nav.Link
//                     as={NavLink}
//                     to="/events"
//                     className="nav-custom-link"
//                     onClick={() => setExpanded(false)}
//                   >
//                     Events
//                   </Nav.Link>
//                 </div>
//                 <div className="nav-wrapper">
//                   <Nav.Link
//                     as={NavLink}
//                     to="/videos"
//                     className="nav-custom-link"
//                     onClick={() => setExpanded(false)}
//                   >
//                     Videos
//                   </Nav.Link>
//                 </div>

//                 {/* Mega Menu Toggle */}
//                 <div
//                   className="nav-wrapper"
//                   onMouseEnter={() =>
//                     window.innerWidth > 991 && setShowMegaMenu(true)
//                   }
//                   onMouseLeave={() =>
//                     window.innerWidth > 991 && setShowMegaMenu(false)
//                   }
//                 >
//                   <div
//                     className="nav-custom-link"
//                     style={{ cursor: "pointer" }}
//                     onClick={() =>
//                       window.innerWidth <= 991 && setShowMegaMenu(!showMegaMenu)
//                     }
//                   >
//                     Articles{" "}
//                     <span className="ms-1" style={{ fontSize: "10px" }}>
//                       {showMegaMenu ? "▲" : "▼"}
//                     </span>
//                   </div>
//                   {showMegaMenu && (
//                     <div className="mega-menu-wrapper">
//                       <CategoryMegaMenu
//                         setVisible={setShowMegaMenu}
//                         closeNavbar={() => {
//                           setExpanded(false);
//                           setShowMegaMenu(false);
//                         }}
//                       />
//                     </div>
//                   )}
//                 </div>
//               </Nav>

//               {/* Desktop Actions */}
//               <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-3">
//                 <div className="button-row">
//                   <Button
//                     className="header-btn btn-donate"
//                     onClick={handleDonateClick}
//                   >
//                     <CiHeart size={18} className="me-1" /> Donate
//                   </Button>

//                   {isAuthenticated ? (
//                     <div className="d-flex align-items-center gap-2">
//                       <span className="user-greeting d-none d-lg-inline">
//                         Hello, <strong>{user?.fullName?.split(" ")[0]}</strong>
//                       </span>
//                       <Button
//                         variant="danger"
//                         className="header-btn"
//                         onClick={() => {
//                           setShowLogoutModal(true);
//                           setExpanded(false);
//                         }}
//                       >
//                         Logout
//                       </Button>
//                     </div>
//                   ) : (
//                     <Button
//                       as={Link}
//                       to="/login"
//                       variant="dark"
//                       className="header-btn"
//                       onClick={() => setExpanded(false)}
//                     >
//                       Login
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       {/* Modals & Components */}
//       <DonateComponent
//         show={showDonateUI}
//         onHide={() => setShowDonateUI(false)}
//         user={user}
//       />

//       <Modal
//         show={showAuthModal}
//         onHide={() => setShowAuthModal(false)}
//         centered
//         size="sm"
//       >
//         <Modal.Header closeButton className="border-0" />
//         <Modal.Body className="text-center pb-4">
//           <CiUser size={50} className="text-warning mb-3" />
//           <h5 className="fw-bold">Login Required</h5>
//           <p className="text-muted small">
//             Please login or signup to continue with the donation.
//           </p>
//           <div className="d-grid gap-2">
//             <Button
//               variant="dark"
//               onClick={() => {
//                 setShowAuthModal(false);
//                 navigate("/login");
//               }}
//             >
//               Login Now
//             </Button>
//             <Button
//               variant="outline-dark"
//               onClick={() => {
//                 setShowAuthModal(false);
//                 navigate("/signup");
//               }}
//             >
//               Create Account
//             </Button>
//           </div>
//         </Modal.Body>
//       </Modal>

//       <LogoutModal
//         show={showLogoutModal}
//         handleClose={() => setShowLogoutModal(false)}
//       />
//     </>
//   );
// };

// export default Header;
import { Navbar, Nav, Container, Button, Modal } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CiHeart, CiUser } from "react-icons/ci";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import LogoutModal from "./LogoutModal";
import CategoryMegaMenu from "./CategoryMegaMenu";
import { API_ENDPOINTS, apiCall } from "../../config/api";
import DonateComponent from "../DonateComponent";

const Header = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDonateUI, setShowDonateUI] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [Logo, setLogo] = useState("");

  useEffect(() => {
    getlogo();
  }, []);

  const getlogo = async () => {
    try {
      const response = await apiCall(API_ENDPOINTS.LOGO.GET_LOGO);
      if (response?.data?.length > 0) {
        setLogo(`${response.data[0]?.image}`);
      }
    } catch (err) {
      console.error("Failed to fetch logo", err);
    }
  };

  const handleDonateClick = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      setExpanded(false);
      return;
    }
    setShowDonateUI(true);
    setExpanded(false);
  };

  return (
    <>
      <style>{`
        /* --- Logo Constraints --- */
        .navbar-logo-custom { 
          height: 55px; width: 180px; object-fit: contain; transition: all 0.3s ease; 
        }

        @media (max-width: 991px) { 
          .navbar-logo-custom { 
            height: 50px !important; width: 160px !important; 
            max-height: 50px; max-width: 140px; 
          } 

          /* --- Mobile Centering --- */
          .navbar-nav {
            text-align: center;
            align-items: center;
            padding: 15px 0;
          }
          
          .nav-wrapper {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: auto !important;
            padding: 8px 0 !important;
          }

          /* --- Category Menu AT THE TOP Fix --- */
          .mobile-reverse-menu {
            /* This flips the order: Menu on Top, Text on Bottom */
            flex-direction: column-reverse !important; 
            background: #fcfcfc;
            border-radius: 10px;
          }

          .mega-menu-wrapper {
            position: relative !important;
            width: 100% !important;
            top: 0 !important;
            box-shadow: none !important;
            margin-bottom: 10px; /* Space between categories and "Articles" text */
            max-height: 350px;
            overflow-y: auto;
          }
        }

        /* --- Link Styling --- */
        .nav-custom-link { 
          position: relative; color: #333 !important; text-decoration: none; 
          font-weight: 600; display: inline-flex; align-items: center;
        }
        .nav-custom-link::after { 
          content: ""; position: absolute; width: 0; height: 2px; bottom: -2px; 
          left: 0; background-color: #d4af37; transition: all 0.3s ease; 
        }
        .nav-custom-link:hover::after, .nav-custom-link.active::after { width: 100%; }
        .nav-custom-link.active { color: #d4af37 !important; }

        /* --- Desktop Layout --- */
        @media (min-width: 992px) {
          .desktop-flex-layout { display: flex; width: 100%; align-items: center; justify-content: space-between; }
          .nav-wrapper { height: 80px; display: flex; align-items: center; padding: 0 15px; }
          .mega-menu-wrapper { 
            position: fixed; top: 80px; left: 0; right: 0; width: 100vw; 
            z-index: 1050; background: white; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); 
          }
        }

        /* --- Buttons --- */
        .header-btn { 
          height: 40px; display: inline-flex; align-items: center; justify-content: center; 
          font-weight: 700; border-radius: 50px !important; padding: 0 20px; border: none; 
        }
        .btn-donate { background: linear-gradient(45deg, #d4af37, #f1d592); color: #000 !important; }
        .button-row { display: flex; flex-direction: row; align-items: center; gap: 10px; }
        
        @media (max-width: 991px) { 
          .button-row { justify-content: center; width: 100%; padding: 20px 0; border-top: 1px solid #eee; margin-top: 10px; } 
          .header-btn { flex: 1; max-width: 140px; } 
        }

        /* --- Toggler Animation --- */
        .navbar-toggler { width: 30px; height: 30px; border: none !important; box-shadow: none !important; }
        .navbar-toggler-icon { background-image: none !important; display: block; width: 22px; height: 2px; background-color: #f59e0b; position: relative; }
        .navbar-toggler-icon::before, .navbar-toggler-icon::after { content: ""; position: absolute; width: 22px; height: 2px; background-color: #f59e0b; transition: all 0.3s; left: 0; }
        .navbar-toggler-icon::before { top: -7px; }
        .navbar-toggler-icon::after { top: 7px; }
        .toggler-open .navbar-toggler-icon { background-color: transparent !important; }
        .toggler-open .navbar-toggler-icon::before { top: 0; transform: rotate(45deg); }
        .toggler-open .navbar-toggler-icon::after { top: 0; transform: rotate(-45deg); }
      `}</style>

      <Navbar
        bg="white"
        expand="lg"
        sticky="top"
        expanded={expanded}
        onToggle={(val) => setExpanded(val)}
        className="shadow-sm p-0"
      >
        <Container fluid className="px-3 px-lg-4 d-flex align-items-center">
          {/* Logo Brand */}
          <Navbar.Brand
            as={Link}
            to="/"
            className="d-lg-none py-2"
            onClick={() => setExpanded(false)}
          >
            <img src={Logo} alt="Logo" className="navbar-logo-custom" />
          </Navbar.Brand>

          <div className="ms-auto d-lg-none d-flex align-items-center">
            {isAuthenticated && (
              <span
                className="user-greeting me-2"
                style={{ fontSize: "0.8rem" }}
              >
                Hi, <strong>{user?.fullName?.split(" ")[0]}</strong>
              </span>
            )}
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className={expanded ? "toggler-open" : ""}
            >
              <span className="navbar-toggler-icon"></span>
            </Navbar.Toggle>
          </div>

          <Navbar.Collapse id="basic-navbar-nav">
            <div className="desktop-flex-layout">
              <div className="d-none d-lg-block">
                <Navbar.Brand
                  as={Link}
                  to="/"
                  onClick={() => setExpanded(false)}
                  className="p-0"
                >
                  <img src={Logo} alt="Logo" className="navbar-logo-custom" />
                </Navbar.Brand>
              </div>

              <Nav className="mx-auto">
                <div className="nav-wrapper">
                  <Nav.Link
                    as={NavLink}
                    to="/"
                    end
                    className="nav-custom-link"
                    onClick={() => setExpanded(false)}
                  >
                    Home
                  </Nav.Link>
                </div>
                <div className="nav-wrapper">
                  <Nav.Link
                    as={NavLink}
                    to="/events"
                    className="nav-custom-link"
                    onClick={() => setExpanded(false)}
                  >
                    Events
                  </Nav.Link>
                </div>
                <div className="nav-wrapper">
                  <Nav.Link
                    as={NavLink}
                    to="/videos"
                    className="nav-custom-link"
                    onClick={() => setExpanded(false)}
                  >
                    Videos
                  </Nav.Link>
                </div>

                {/* Articles with Reverse Column logic for mobile */}
                <div
                  className={`nav-wrapper ${showMegaMenu ? "mobile-reverse-menu" : ""}`}
                >
                  {showMegaMenu && (
                    <div className="mega-menu-wrapper">
                      <CategoryMegaMenu
                        setVisible={setShowMegaMenu}
                        closeNavbar={() => {
                          setExpanded(false);
                          setShowMegaMenu(false);
                        }}
                      />
                    </div>
                  )}

                  <div
                    className="nav-custom-link"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowMegaMenu(!showMegaMenu)}
                  >
                    Articles{" "}
                    <span className="ms-1" style={{ fontSize: "10px" }}>
                      {showMegaMenu ? "▲" : "▼"}
                    </span>
                  </div>
                </div>
              </Nav>

              <div className="d-flex flex-column flex-lg-row align-items-lg-center">
                <div className="button-row">
                  <Button
                    className="header-btn btn-donate"
                    onClick={handleDonateClick}
                  >
                    <CiHeart size={20} className="me-1" /> Donate
                  </Button>

                  {isAuthenticated ? (
                    <Button
                      variant="danger"
                      className="header-btn"
                      onClick={() => {
                        setShowLogoutModal(true);
                        setExpanded(false);
                      }}
                    >
                      Logout
                    </Button>
                  ) : (
                    <Button
                      as={Link}
                      to="/login"
                      variant="dark"
                      className="header-btn"
                      onClick={() => setExpanded(false)}
                    >
                      Login
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <DonateComponent
        show={showDonateUI}
        onHide={() => setShowDonateUI(false)}
        user={user}
      />
      <LogoutModal
        show={showLogoutModal}
        handleClose={() => setShowLogoutModal(false)}
      />

      {/* Login Reminder Modal */}
      <Modal
        show={showAuthModal}
        onHide={() => setShowAuthModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <CiUser size={50} className="mb-3 text-warning" />
          <h5>Please Login First</h5>
          <p className="text-muted">
            You need to be logged in to make a donation.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAuthModal(false)}>
            Close
          </Button>
          <Button
            variant="dark"
            onClick={() => {
              setShowAuthModal(false);
              navigate("/login");
            }}
          >
            Go to Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
