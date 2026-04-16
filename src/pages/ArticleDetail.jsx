// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Image,
//   Button,
//   Form,
//   ListGroup,
//   InputGroup,
//   Spinner,
//   Modal,
// } from "react-bootstrap";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import {
//   CiUser,
//   CiCalendar,
//   CiFolderOn,
//   CiChat1,
//   CiSearch,
// } from "react-icons/ci";
// import { API_ENDPOINTS, apiCall, API_BASE_URL } from "../config/api";

// const ArticleDetail = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const params = useParams();

//   // Route param fallback
//   const routeArticleId =
//     params.id ||
//     params.articleId ||
//     params._id ||
//     Object.values(params)[0] ||
//     null;

//   const [article, setArticle] = useState(location.state || null);
//   const [categories, setCategories] = useState([]);
//   const [recentPosts, setRecentPosts] = useState([]);
//   const [recentComments, setRecentComments] = useState([]);
//   const [archives, setArchives] = useState([]);
//   const [loadingSidebar, setLoadingSidebar] = useState(true);

//   const [commentText, setCommentText] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // --- SEARCH STATES ---
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);

//   // comment modal
//   const [showLoginPopup, setShowLoginPopup] = useState(false);
//   const [modalData, setModalData] = useState({
//     show: false,
//     type: "", // login | error | success
//     title: "",
//     message: "",
//   });
//   console.log("Article Details With Id", article?._id);

//   useEffect(() => {
//     fetchSidebarData();
//     const ensureArticle = async () => {
//       if ((!article || !(article._id || article.id)) && routeArticleId) {
//         try {
//           const isObjectId = /^[a-fA-F0-9]{24}$/.test(routeArticleId);
//           if (isObjectId) {
//             const res = await apiCall(
//               API_ENDPOINTS.ARTICLE.GET_BY_ID(routeArticleId),
//             );
//             const fetched = res?.article || res?.data || res;
//             setArticle(fetched);
//             return;
//           }

//           const allRes = await apiCall(API_ENDPOINTS.ARTICLE.GET_ALL);
//           const allArticles =
//             allRes?.articles ||
//             allRes?.data ||
//             (Array.isArray(allRes) ? allRes : []);

//           const slugify = (s = "") =>
//             s
//               .toString()
//               .toLowerCase()
//               .trim()
//               .replace(/\s+/g, "-")
//               .replace(/[^a-z0-9\-]/g, "")
//               .replace(/-+/g, "-");

//           const found = allArticles.find((a) => {
//             const title = a?.title || a?.name || "";
//             return (
//               slugify(title) === slugify(routeArticleId) ||
//               a?._id === routeArticleId ||
//               a?.id === routeArticleId
//             );
//           });

//           if (found) {
//             setArticle(found);
//           }
//         } catch (err) {
//           console.error("Failed to fetch article:", err);
//         }
//       }
//     };

//     ensureArticle();
//     window.scrollTo(0, 0);
//   }, [article, routeArticleId]);

//   const fetchSidebarData = async () => {
//     try {
//       setLoadingSidebar(true);
//       const [catRes, artRes, commRes] = await Promise.all([
//         apiCall(API_ENDPOINTS.CATEGORY.GET_ALL),
//         apiCall(API_ENDPOINTS.ARTICLE.GET_ALL),
//         apiCall(API_ENDPOINTS.ARTICLE_COMMENT.GET_BY_ARTICLE_ID(article?._id)),
//       ]);

//       setCategories(
//         (catRes?.categories || catRes?.data || []).filter(
//           (c) => c.status === "active",
//         ),
//       );

//       const allArts = artRes?.articles || artRes?.data || [];

//       setRecentPosts(allArts.slice(0, 5));

//       const arch = new Set();
//       allArts.forEach((a) => {
//         const d = new Date(a.createdAt);
//         arch.add(
//           d.toLocaleString("default", { month: "long", year: "numeric" }),
//         );
//       });
//       setArchives(Array.from(arch).slice(0, 5));

//       setRecentComments((commRes?.comments || []).slice(0, 5));
//     } catch (err) {
//       console.error("Sidebar Load Error:", err);
//     } finally {
//       setLoadingSidebar(false);
//     }
//   };

//   // --- SEARCH LOGIC ---
//   const handleSidebarSearch = async (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);

//     if (query.length < 2) {
//       setSearchResults([]);
//       return;
//     }

//     setIsSearching(true);
//     try {
//       const [artRes, catRes, subRes] = await Promise.all([
//         apiCall(API_ENDPOINTS.ARTICLE.GET_ALL),
//         apiCall(API_ENDPOINTS.CATEGORY.GET_ALL),
//         apiCall(API_ENDPOINTS.SUBCATEGORY.GET_ALL),
//       ]);

//       const articles = (artRes?.articles || artRes?.data || [])
//         .filter((a) => a.title.toLowerCase().includes(query.toLowerCase()))
//         .map((item) => ({ ...item, type: "Article", display: item.title }));

//       const categories = (catRes?.categories || catRes?.data || [])
//         .filter((c) =>
//           c.categoryName.toLowerCase().includes(query.toLowerCase()),
//         )
//         .map((item) => ({
//           ...item,
//           type: "Category",
//           display: item.categoryName,
//         }));

//       const subCategories = (subRes?.subCategories || subRes?.data || [])
//         .filter((s) =>
//           s.subCategoryName.toLowerCase().includes(query.toLowerCase()),
//         )
//         .map((item) => ({
//           ...item,
//           type: "Subcategory",
//           display: item.subCategoryName,
//         }));

//       setSearchResults(
//         [...articles, ...categories, ...subCategories].slice(0, 8),
//       );
//     } catch (err) {
//       console.error("Search Error:", err);
//     } finally {
//       setIsSearching(false);
//     }
//   };
//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();

//     const user = JSON.parse(localStorage.getItem("user"));

//     // Login Required
//     if (!user) {
//       setModalData({
//         show: true,
//         type: "login",
//         title: "Login Required",
//         message: "You must be logged in to post a comment.",
//       });
//       return;
//     }

//     const trimmed = (commentText || "").trim();

//     // Empty Comment
//     if (!trimmed) {
//       setModalData({
//         show: true,
//         type: "error",
//         title: "Empty Comment",
//         message: "Please enter a comment before submitting.",
//       });
//       return;
//     }

//     const articleId = article?._id || article?.id || routeArticleId;
//     const userId = user?._id || user?.id || user?.userId;

//     try {
//       setIsSubmitting(true);

//       const payload = {
//         userId,
//         articleId,
//         comment: trimmed,
//         status: "active",
//       };

//       await apiCall(API_ENDPOINTS.COMMENT.CREATE, {
//         method: "POST",
//         body: JSON.stringify(payload),
//       });

//       setCommentText("");

//       // Success Modal
//       setModalData({
//         show: true,
//         type: "success",
//         title: "Comment Posted",
//         message: "Your comment has been posted successfully.",
//       });

//       fetchSidebarData();
//     } catch (err) {
//       console.error("Comment post error:", err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const goToFilterPage = (type, value, title, id = null) => {
//     navigate("/filtered-articles", { state: { type, value, title, id } });
//   };

//   if (!article)
//     return (
//       <Container className="py-5 text-center">
//         <Spinner animation="grow" variant="warning" />
//         <h4 className="mt-3">Loading Article...</h4>
//       </Container>
//     );

//   return (
//     <div className="bg-light py-5" style={{ overflowX: "hidden" }}>
//       <Container>
//         <Row className="gy-4 align-items-start">
//           {/* LEFT COLUMN: MAIN CONTENT */}
//           <Col lg={8} md={12} className="pe-lg-5">
//             <div
//               className="bg-white p-4 p-md-5 rounded-4 shadow-sm"
//               style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
//             >
//               <div className="mb-3">
//                 <span className="text-warning fw-bold text-uppercase small">
//                   {article.category?.categoryName || article.category}
//                 </span>
//               </div>
//               <h1 className="display-6 fw-bold mb-4">{article.title}</h1>

//               <Image
//                 src={
//                   article.image ||
//                   (article.featureImage?.startsWith("http")
//                     ? article.featureImage
//                     : `${API_BASE_URL}/${article.featureImage}`)
//                 }
//                 className="rounded-3 w-100 mb-4 shadow-sm"
//                 style={{ maxHeight: "450px", objectFit: "cover" }}
//               />

//               <div className="article-content lh-lg text-secondary">
//                 <div dangerouslySetInnerHTML={{ __html: article.content }} />
//               </div>

//               <div className="py-3 border-top border-bottom mt-5 d-flex flex-wrap gap-4 text-muted small bg-light px-3 rounded-3">
//                 <div className="d-flex align-items-center gap-1">
//                   <CiUser className="text-warning" /> <span>Admin</span>
//                 </div>
//                 <div className="d-flex align-items-center gap-1">
//                   <CiCalendar className="text-warning" />{" "}
//                   <span>
//                     {new Date(
//                       article.createdAt || Date.now(),
//                     ).toLocaleDateString()}
//                   </span>
//                 </div>
//                 <div className="d-flex align-items-center gap-1">
//                   <CiFolderOn className="text-warning" />{" "}
//                   <span>
//                     {article.category?.categoryName || article.category}
//                   </span>
//                 </div>
//               </div>
//               {/* Recent Comments */}
//               <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border">
//                 <h5 className="fw-bold mb-3 border-bottom pb-2">
//                   Recent Comments
//                 </h5>
//                 {recentComments.length > 0 ? (
//                   recentComments.map((c) => (
//                     <div
//                       key={c._id}
//                       className="small mb-2 border-bottom pb-2 hover-link-comment"
//                       onClick={() => {
//                         if (c.articleId) {
//                           navigate(`/article/${c.articleId._id}`, {
//                             state: c.articleId,
//                           });
//                         }
//                       }}
//                     >
//                       <span className="text-muted italic">"{c.comment}"</span>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="small text-muted">No comments yet.</p>
//                 )}
//               </div>
//               <div className="mt-5 pt-4">
//                 <h3 className="fw-bold mb-3">Leave a Reply</h3>
//                 <Form onSubmit={handleCommentSubmit}>
//                   <Form.Group className="mb-3">
//                     <Form.Control
//                       as="textarea"
//                       rows={4}
//                       placeholder="Your comment..."
//                       value={commentText}
//                       onChange={(e) => setCommentText(e.target.value)}
//                       required
//                     />
//                   </Form.Group>
//                   <Button variant="dark" type="submit" disabled={isSubmitting}>
//                     {isSubmitting ? "Posting..." : "Post Comment"}
//                   </Button>
//                 </Form>
//               </div>
//             </div>
//           </Col>
//           <Modal
//             show={modalData.show}
//             onHide={() => setModalData({ ...modalData, show: false })}
//             centered
//           >
//             <Modal.Header closeButton>
//               <Modal.Title>{modalData.title}</Modal.Title>
//             </Modal.Header>

//             <Modal.Body className="text-muted">{modalData.message}</Modal.Body>

//             <Modal.Footer>
//               {modalData.type === "login" && (
//                 <>
//                   <Button
//                     variant="secondary"
//                     onClick={() => setModalData({ ...modalData, show: false })}
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     variant="dark"
//                     onClick={() => {
//                       setModalData({ ...modalData, show: false });
//                       navigate("/login");
//                     }}
//                   >
//                     Login
//                   </Button>
//                 </>
//               )}

//               {modalData.type === "error" && (
//                 <Button
//                   variant="dark"
//                   onClick={() => setModalData({ ...modalData, show: false })}
//                 >
//                   OK
//                 </Button>
//               )}

//               {modalData.type === "success" && (
//                 <Button
//                   variant="dark"
//                   onClick={() => setModalData({ ...modalData, show: false })}
//                 >
//                   Close
//                 </Button>
//               )}
//             </Modal.Footer>
//           </Modal>

//           {/* RIGHT COLUMN: SIDEBAR */}
//           <Col lg={4} md={12}>
//             <div className="sticky-top" style={{ top: "100px", zIndex: "10" }}>
//               {/* --- SEARCH WIDGET --- */}
//               <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border">
//                 <h5 className="fw-bold mb-3 border-bottom pb-2">Search</h5>
//                 <InputGroup className="bg-light rounded-pill border overflow-hidden px-2 py-1">
//                   <Form.Control
//                     type="search"
//                     placeholder="Search categories..."
//                     className="bg-light border-0 shadow-none small"
//                     value={searchQuery}
//                     onChange={handleSidebarSearch}
//                   />
//                   <Button
//                     variant="link"
//                     className="text-dark border-0 p-0 ps-1"
//                   >
//                     {isSearching ? (
//                       <Spinner animation="border" size="sm" variant="warning" />
//                     ) : (
//                       <CiSearch size={20} />
//                     )}
//                   </Button>
//                 </InputGroup>

//                 {/* Search Results List */}
//                 {searchResults.length > 0 && (
//                   <ListGroup className="mt-2 shadow-sm border-0 result-container">
//                     {searchResults.map((item, idx) => (
//                       <ListGroup.Item
//                         key={idx}
//                         action
//                         className="border-0 border-bottom py-2"
//                         onClick={() => {
//                           setSearchQuery("");
//                           setSearchResults([]);
//                           if (item.type === "Article") {
//                             navigate(`/article/${item._id}`, { state: item });
//                           } else if (item.type === "Category") {
//                             goToFilterPage(
//                               "category",
//                               item.categoryName,
//                               item.categoryName,
//                               item._id,
//                             );
//                           } else if (item.type === "Subcategory") {
//                             goToFilterPage(
//                               "subcategory",
//                               item.subCategoryName,
//                               item.subCategoryName,
//                               item._id,
//                             );
//                           }
//                         }}
//                       >
//                         <div
//                           style={{ fontSize: "10px" }}
//                           className="text-warning fw-bold text-uppercase"
//                         >
//                           {item.type}
//                         </div>
//                         <div className="small text-dark fw-semibold">
//                           {item.display}
//                         </div>
//                       </ListGroup.Item>
//                     ))}
//                   </ListGroup>
//                 )}
//                 {searchQuery.length >= 2 &&
//                   !isSearching &&
//                   searchResults.length === 0 && (
//                     <div className="small text-muted mt-2 ps-2">
//                       No results found.
//                     </div>
//                   )}
//               </div>

//               {/* Recent Posts */}
//               <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border">
//                 <h5 className="fw-bold mb-3 border-bottom pb-2">
//                   Recent Posts
//                 </h5>
//                 <ListGroup variant="flush">
//                   {recentPosts.map((post) => (
//                     <ListGroup.Item
//                       key={post._id}
//                       action
//                       onClick={() =>
//                         navigate(`/article/${post._id}`, { state: post })
//                       }
//                       className="border-0 px-0 small py-2 text-muted bg-transparent"
//                     >
//                       • {post.title}
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               </div>

//               {/* Archives */}
//               <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border">
//                 <h5 className="fw-bold mb-3 border-bottom pb-2">Archives</h5>
//                 {archives.map((a) => (
//                   <div
//                     key={a}
//                     className="small py-2 hover-link text-muted"
//                     onClick={() => goToFilterPage("archive", a, a)}
//                   >
//                     • {a}
//                   </div>
//                 ))}
//               </div>

//               {/* Categories */}
//               <div className="bg-white p-4 rounded-4 shadow-sm border">
//                 <h5 className="fw-bold mb-3 border-bottom pb-2">Categories</h5>
//                 {categories.map((cat) => (
//                   <div
//                     key={cat._id}
//                     className="small py-2 hover-link text-muted"
//                     onClick={() =>
//                       goToFilterPage(
//                         "category",
//                         cat.categoryName,
//                         cat.categoryName,
//                         cat._id,
//                       )
//                     }
//                   >
//                     • {cat.categoryName}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//       <style>{`
//         .hover-link { cursor: pointer; transition: 0.2s; }
//         .hover-link:hover { color: #d4af37 !important; padding-left: 5px; }
//         .hover-link-comment { cursor: pointer; transition: 0.2s; padding: 5px; border-radius: 5px; }
//         .hover-link-comment:hover { background-color: #f8f9fa; color: #d4af37 !important; }
//         .italic { font-style: italic; }
//         .article-content img { max-width: 100% !important; height: auto !important; border-radius: 8px; margin: 15px 0; }
//         .result-container { max-height: 300px; overflow-y: auto; z-index: 999; }
//       `}</style>
//     </div>
//   );
// };

// export default ArticleDetail;

// Final Code-------------------------------------------------------------------------------------
// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Image,
//   Button,
//   Form,
//   ListGroup,
//   InputGroup,
//   Spinner,
//   Modal,
// } from "react-bootstrap";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import {
//   CiUser,
//   CiCalendar,
//   CiFolderOn,
//   CiSearch,
//   CiShare2, // New Import
// } from "react-icons/ci";
// import { API_ENDPOINTS, apiCall, API_BASE_URL } from "../config/api";

// const ArticleDetail = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const params = useParams();

//   // Route param fallback
//   const routeArticleId =
//     params.id ||
//     params.articleId ||
//     params._id ||
//     Object.values(params)[0] ||
//     null;

//   const [article, setArticle] = useState(location.state || null);
//   const [categories, setCategories] = useState([]);
//   const [recentPosts, setRecentPosts] = useState([]);
//   const [recentComments, setRecentComments] = useState([]);
//   const [archives, setArchives] = useState([]);
//   const [loadingSidebar, setLoadingSidebar] = useState(true);

//   const [commentText, setCommentText] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // --- SEARCH STATES ---
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
//   console.log("ALL ARTICLE Details ", article);

//   // comment modal
//   const [showLoginPopup, setShowLoginPopup] = useState(false);
//   const [modalData, setModalData] = useState({
//     show: false,
//     type: "", // login | error | success
//     title: "",
//     message: "",
//   });

//   // --- SHARE LOGIC ---
//   const handleShare = async () => {
//     const shareData = {
//       title: article?.title,
//       text: `Check out this article: ${article?.title}`,
//       url: window.location.href,
//     };

//     if (navigator.share) {
//       // Mobile / Supported Browsers
//       try {
//         await navigator.share(shareData);
//       } catch (err) {
//         console.log("Error sharing:", err);
//       }
//     } else {
//       // Desktop Fallback: Copy to Clipboard
//       try {
//         await navigator.clipboard.writeText(window.location.href);
//         setModalData({
//           show: true,
//           type: "success",
//           title: "Link Copied",
//           message: "The article link has been copied to your clipboard.",
//         });
//       } catch (err) {
//         console.error("Failed to copy link:", err);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchSidebarData();
//     const ensureArticle = async () => {
//       if ((!article || !(article._id || article.id)) && routeArticleId) {
//         try {
//           const isObjectId = /^[a-fA-F0-9]{24}$/.test(routeArticleId);
//           if (isObjectId) {
//             const res = await apiCall(
//               API_ENDPOINTS.ARTICLE.GET_BY_ID(routeArticleId),
//             );
//             const fetched = res?.article || res?.data || res;
//             setArticle(fetched);
//             return;
//           }

//           const allRes = await apiCall(API_ENDPOINTS.ARTICLE.GET_ALL);
//           const allArticles =
//             allRes?.articles ||
//             allRes?.data ||
//             (Array.isArray(allRes) ? allRes : []);

//           const slugify = (s = "") =>
//             s
//               .toString()
//               .toLowerCase()
//               .trim()
//               .replace(/\s+/g, "-")
//               .replace(/[^a-z0-9\-]/g, "")
//               .replace(/-+/g, "-");

//           const found = allArticles.find((a) => {
//             const title = a?.title || a?.name || "";
//             return (
//               slugify(title) === slugify(routeArticleId) ||
//               a?._id === routeArticleId ||
//               a?.id === routeArticleId
//             );
//           });

//           if (found) {
//             setArticle(found);
//           }
//         } catch (err) {
//           console.error("Failed to fetch article:", err);
//         }
//       }
//     };

//     ensureArticle();
//     window.scrollTo(0, 0);
//   }, [article, routeArticleId]);

//   const fetchSidebarData = async () => {
//     try {
//       setLoadingSidebar(true);
//       const [catRes, artRes, commRes] = await Promise.all([
//         apiCall(API_ENDPOINTS.CATEGORY.GET_ALL),
//         apiCall(API_ENDPOINTS.ARTICLE.GET_ALL),
//         apiCall(API_ENDPOINTS.ARTICLE_COMMENT.GET_BY_ARTICLE_ID(article?._id)),
//       ]);

//       setCategories(
//         (catRes?.categories || catRes?.data || []).filter(
//           (c) => c.status === "active",
//         ),
//       );

//       const allArts = artRes?.articles || artRes?.data || [];

//       setRecentPosts(allArts.slice(0, 5));

//       const arch = new Set();
//       allArts.forEach((a) => {
//         const d = new Date(a.createdAt);
//         arch.add(
//           d.toLocaleString("default", { month: "long", year: "numeric" }),
//         );
//       });
//       setArchives(Array.from(arch).slice(0, 5));

//       setRecentComments((commRes?.comments || []).slice(0, 5));
//     } catch (err) {
//       console.error("Sidebar Load Error:", err);
//     } finally {
//       setLoadingSidebar(false);
//     }
//   };

//   const handleSidebarSearch = async (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);

//     if (query.length < 2) {
//       setSearchResults([]);
//       return;
//     }

//     setIsSearching(true);
//     try {
//       const [artRes, catRes, subRes] = await Promise.all([
//         apiCall(API_ENDPOINTS.ARTICLE.GET_ALL),
//         apiCall(API_ENDPOINTS.CATEGORY.GET_ALL),
//         apiCall(API_ENDPOINTS.SUBCATEGORY.GET_ALL),
//       ]);

//       const articles = (artRes?.articles || artRes?.data || [])
//         .filter((a) => a.title.toLowerCase().includes(query.toLowerCase()))
//         .map((item) => ({ ...item, type: "Article", display: item.title }));

//       const categories = (catRes?.categories || catRes?.data || [])
//         .filter((c) =>
//           c.categoryName.toLowerCase().includes(query.toLowerCase()),
//         )
//         .map((item) => ({
//           ...item,
//           type: "Category",
//           display: item.categoryName,
//         }));

//       const subCategories = (subRes?.subCategories || subRes?.data || [])
//         .filter((s) =>
//           s.subCategoryName.toLowerCase().includes(query.toLowerCase()),
//         )
//         .map((item) => ({
//           ...item,
//           type: "Subcategory",
//           display: item.subCategoryName,
//         }));

//       setSearchResults(
//         [...articles, ...categories, ...subCategories].slice(0, 8),
//       );
//     } catch (err) {
//       console.error("Search Error:", err);
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();

//     const user = JSON.parse(localStorage.getItem("user"));

//     if (!user) {
//       setModalData({
//         show: true,
//         type: "login",
//         title: "Login Required",
//         message: "You must be logged in to post a comment.",
//       });
//       return;
//     }

//     const trimmed = (commentText || "").trim();

//     if (!trimmed) {
//       setModalData({
//         show: true,
//         type: "error",
//         title: "Empty Comment",
//         message: "Please enter a comment before submitting.",
//       });
//       return;
//     }

//     const articleId = article?._id || article?.id || routeArticleId;
//     const userId = user?._id || user?.id || user?.userId;

//     try {
//       setIsSubmitting(true);

//       const payload = {
//         userId,
//         articleId,
//         comment: trimmed,
//         status: "active",
//       };

//       await apiCall(API_ENDPOINTS.COMMENT.CREATE, {
//         method: "POST",
//         body: JSON.stringify(payload),
//       });

//       setCommentText("");

//       setModalData({
//         show: true,
//         type: "success",
//         title: "Comment Posted",
//         message: "Your comment has been posted successfully.",
//       });

//       fetchSidebarData();
//     } catch (err) {
//       console.error("Comment post error:", err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const goToFilterPage = (type, value, title, id = null) => {
//     navigate("/filtered-articles", { state: { type, value, title, id } });
//   };

//   if (!article)
//     return (
//       <Container className="py-5 text-center">
//         <Spinner animation="grow" variant="warning" />
//         <h4 className="mt-3">Loading Article...</h4>
//       </Container>
//     );

//   return (
//     <div className="bg-light py-5" style={{ overflowX: "hidden" }}>
//       <Container>
//         <Row className="gy-4 align-items-start">
//           {/* LEFT COLUMN: MAIN CONTENT */}
//           <Col lg={8} md={12} className="pe-lg-5">
//             <div
//               className="bg-white p-4 p-md-5 rounded-4 shadow-sm"
//               style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
//             >
//               <div className="mb-2 d-flex justify-content-between align-items-center">
//                 {/* Left Side: Category */}
//                 <span className="text-warning fw-bold text-uppercase small">
//                   {article.category?.categoryName || article.category}
//                 </span>

//                 {/* Right Side: Print Button */}
//                 <button
//                   onClick={() => window.print()}
//                   className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1 shadow-sm"
//                   style={{ borderRadius: "20px", padding: "2px 12px" }}
//                 >
//                   <i className="bi bi-printer"></i>{" "}
//                   {/* Using Bootstrap Icon or your preferred icon */}
//                   <span className="small fw-bold">Print</span>
//                 </button>
//               </div>
//               <h1 className="display-6 fw-bold mb-2">{article.title}</h1>
//               <div className="d-flex align-items-center flex-wrap gap-3 text-muted small mb-2 pb-2 border-bottom border-light">
//                 {/* Author Name Section */}
//                 <div className="d-flex align-items-center gap-1">
//                   <span
//                     className="fw-bold text-dark"
//                     style={{ letterSpacing: "0.5px" }}
//                   >
//                     Rituraj
//                   </span>
//                 </div>

//                 {/* Decorative Vertical Separator */}
//                 <span
//                   className="text-secondary d-none d-sm-block"
//                   style={{ opacity: 0.5 }}
//                 >
//                   |
//                 </span>

//                 {/* Date Section */}
//                 <div className="d-flex align-items-center gap-1">
//                   <CiCalendar
//                     className="text-warning"
//                     style={{ fontSize: "1.1rem" }}
//                   />
//                   <span style={{ fontWeight: "500" }}>
//                     {new Date(
//                       article.createdAt || Date.now(),
//                     ).toLocaleDateString("en-GB", {
//                       day: "2-digit",
//                       month: "2-digit",
//                       year: "numeric",
//                     })}
//                   </span>
//                 </div>
//               </div>
//               <Image
//                 src={
//                   article.image ||
//                   (article.featureImage?.startsWith("http")
//                     ? article.featureImage
//                     : `${API_BASE_URL}/${article.featureImage}`)
//                 }
//                 className="rounded-3 w-100 mb-4 shadow-sm"
//                 style={{ maxHeight: "450px", objectFit: "cover" }}
//               />

//               <div className="article-content lh-lg text-secondary">
//                 <div dangerouslySetInnerHTML={{ __html: article.content }} />
//               </div>

//               {/* Metadata with Share Button */}
//               <div className="py-3 border-top border-bottom mt-5 d-flex flex-wrap gap-4 text-muted small bg-light px-3 rounded-3 align-items-center">
//                 <div className="d-flex align-items-center gap-1">
//                   <CiUser className="text-warning" /> <span>Admin</span>
//                 </div>
//                 <div className="d-flex align-items-center gap-1">
//                   <CiCalendar className="text-warning" />{" "}
//                   <span>
//                     {new Date(
//                       article.createdAt || Date.now(),
//                     ).toLocaleDateString()}
//                   </span>
//                 </div>
//                 <div className="d-flex align-items-center gap-1">
//                   <CiFolderOn className="text-warning" />{" "}
//                   <span>
//                     {article.category?.categoryName || article.category}
//                   </span>
//                 </div>
//                 <div className="d-flex align-items-center gap-1">
//                   <CiFolderOn className="text-warning" />{" "}
//                   <span>
//                     {article.subCategory?.subCategoryName || article.category}
//                   </span>
//                 </div>

//                 {/* --- SHARE BUTTON START --- */}
//                 <Button
//                   variant="outline-warning"
//                   size="sm"
//                   className="ms-auto rounded-pill d-flex align-items-center gap-2 border-0 shadow-sm bg-white share-btn"
//                   onClick={handleShare}
//                 >
//                   <CiShare2 size={18} />
//                   <span className="fw-bold">Share</span>
//                 </Button>
//                 {/* --- SHARE BUTTON END --- */}
//               </div>

//               {/* Recent Comments */}
//               <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border mt-4">
//                 <h5 className="fw-bold mb-3 border-bottom pb-2">
//                   Recent Comments
//                 </h5>
//                 {recentComments.length > 0 ? (
//                   recentComments.map((c) => (
//                     <div
//                       key={c._id}
//                       className="small mb-2 border-bottom pb-2 hover-link-comment"
//                       onClick={() => {
//                         if (c.articleId) {
//                           navigate(`/article/${c.articleId._id}`, {
//                             state: c.articleId,
//                           });
//                         }
//                       }}
//                     >
//                       <span className="text-muted italic">"{c.comment}"</span>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="small text-muted">No comments yet.</p>
//                 )}
//               </div>

//               <div className="mt-5 pt-4">
//                 <h3 className="fw-bold mb-3">Leave a Reply</h3>
//                 <Form onSubmit={handleCommentSubmit}>
//                   <Form.Group className="mb-3">
//                     <Form.Control
//                       as="textarea"
//                       rows={4}
//                       placeholder="Your comment..."
//                       value={commentText}
//                       onChange={(e) => setCommentText(e.target.value)}
//                       required
//                     />
//                   </Form.Group>
//                   <Button variant="dark" type="submit" disabled={isSubmitting}>
//                     {isSubmitting ? "Posting..." : "Post Comment"}
//                   </Button>
//                 </Form>
//               </div>
//             </div>
//           </Col>

//           <Modal
//             show={modalData.show}
//             onHide={() => setModalData({ ...modalData, show: false })}
//             centered
//           >
//             <Modal.Header closeButton>
//               <Modal.Title>{modalData.title}</Modal.Title>
//             </Modal.Header>

//             <Modal.Body className="text-muted">{modalData.message}</Modal.Body>

//             <Modal.Footer>
//               {modalData.type === "login" && (
//                 <>
//                   <Button
//                     variant="secondary"
//                     onClick={() => setModalData({ ...modalData, show: false })}
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     variant="dark"
//                     onClick={() => {
//                       setModalData({ ...modalData, show: false });
//                       navigate("/login");
//                     }}
//                   >
//                     Login
//                   </Button>
//                 </>
//               )}

//               {modalData.type === "error" && (
//                 <Button
//                   variant="dark"
//                   onClick={() => setModalData({ ...modalData, show: false })}
//                 >
//                   OK
//                 </Button>
//               )}

//               {modalData.type === "success" && (
//                 <Button
//                   variant="dark"
//                   onClick={() => setModalData({ ...modalData, show: false })}
//                 >
//                   Close
//                 </Button>
//               )}
//             </Modal.Footer>
//           </Modal>

//           {/* RIGHT COLUMN: SIDEBAR */}
//           <Col lg={4} md={12}>
//             <div className="sticky-top" style={{ top: "100px", zIndex: "10" }}>
//               {/* --- SEARCH WIDGET --- */}
//               <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border">
//                 <h5 className="fw-bold mb-3 border-bottom pb-2">Search</h5>
//                 <InputGroup className="bg-light rounded-pill border overflow-hidden px-2 py-1">
//                   <Form.Control
//                     type="search"
//                     placeholder="Search categories..."
//                     className="bg-light border-0 shadow-none small"
//                     value={searchQuery}
//                     onChange={handleSidebarSearch}
//                   />
//                   <Button
//                     variant="link"
//                     className="text-dark border-0 p-0 ps-1"
//                   >
//                     {isSearching ? (
//                       <Spinner animation="border" size="sm" variant="warning" />
//                     ) : (
//                       <CiSearch size={20} />
//                     )}
//                   </Button>
//                 </InputGroup>

//                 {/* Search Results List */}
//                 {searchResults.length > 0 && (
//                   <ListGroup className="mt-2 shadow-sm border-0 result-container">
//                     {searchResults.map((item, idx) => (
//                       <ListGroup.Item
//                         key={idx}
//                         action
//                         className="border-0 border-bottom py-2"
//                         onClick={() => {
//                           setSearchQuery("");
//                           setSearchResults([]);
//                           if (item.type === "Article") {
//                             navigate(`/article/${item._id}`, { state: item });
//                           } else if (item.type === "Category") {
//                             goToFilterPage(
//                               "category",
//                               item.categoryName,
//                               item.categoryName,
//                               item._id,
//                             );
//                           } else if (item.type === "Subcategory") {
//                             goToFilterPage(
//                               "subcategory",
//                               item.subCategoryName,
//                               item.subCategoryName,
//                               item._id,
//                             );
//                           }
//                         }}
//                       >
//                         <div
//                           style={{ fontSize: "10px" }}
//                           className="text-warning fw-bold text-uppercase"
//                         >
//                           {item.type}
//                         </div>
//                         <div className="small text-dark fw-semibold">
//                           {item.display}
//                         </div>
//                       </ListGroup.Item>
//                     ))}
//                   </ListGroup>
//                 )}
//                 {searchQuery.length >= 2 &&
//                   !isSearching &&
//                   searchResults.length === 0 && (
//                     <div className="small text-muted mt-2 ps-2">
//                       No results found.
//                     </div>
//                   )}
//               </div>

//               {/* Recent Posts */}
//               <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border">
//                 <h5 className="fw-bold mb-3 border-bottom pb-2">
//                   Recent Posts
//                 </h5>
//                 <ListGroup variant="flush">
//                   {recentPosts.map((post) => (
//                     <ListGroup.Item
//                       key={post._id}
//                       action
//                       onClick={() =>
//                         navigate(`/article/${post._id}`, { state: post })
//                       }
//                       className="border-0 px-0 small py-2 text-muted bg-transparent"
//                     >
//                       • {post.title}
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               </div>

//               {/* Archives */}
//               <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border">
//                 <h5 className="fw-bold mb-3 border-bottom pb-2">Archives</h5>
//                 {archives.map((a) => (
//                   <div
//                     key={a}
//                     className="small py-2 hover-link text-muted"
//                     onClick={() => goToFilterPage("archive", a, a)}
//                   >
//                     • {a}
//                   </div>
//                 ))}
//               </div>

//               {/* Categories */}
//               <div className="bg-white p-4 rounded-4 shadow-sm border">
//                 <h5 className="fw-bold mb-3 border-bottom pb-2">Categories</h5>
//                 {categories.map((cat) => (
//                   <div
//                     key={cat._id}
//                     className="small py-2 hover-link text-muted"
//                     onClick={() =>
//                       goToFilterPage(
//                         "category",
//                         cat.categoryName,
//                         cat.categoryName,
//                         cat._id,
//                       )
//                     }
//                   >
//                     • {cat.categoryName}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//       <style>{`
//         .hover-link { cursor: pointer; transition: 0.2s; }
//         .hover-link:hover { color: #d4af37 !important; padding-left: 5px; }
//         .hover-link-comment { cursor: pointer; transition: 0.2s; padding: 5px; border-radius: 5px; }
//         .hover-link-comment:hover { background-color: #f8f9fa; color: #d4af37 !important; }
//         .italic { font-style: italic; }
//         .article-content img { max-width: 100% !important; height: auto !important; border-radius: 8px; margin: 15px 0; }
//         .result-container { max-height: 300px; overflow-y: auto; z-index: 999; }
//         .share-btn:hover { background-color: #f8f9fa !important; color: #ffc107 !important; transform: scale(1.05); }
//       `}</style>
//     </div>
//   );
// };

// export default ArticleDetail;
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Form,
  ListGroup,
  InputGroup,
  Spinner,
  Modal,
} from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  CiUser,
  CiCalendar,
  CiFolderOn,
  CiSearch,
  CiShare2,
} from "react-icons/ci";
import { API_ENDPOINTS, apiCall, API_BASE_URL } from "../config/api";

const ArticleDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  // Unified ID extraction
  const routeArticleId =
    params.id || params.articleId || params._id || Object.values(params)[0];

  // Initialize with null to ensure the loader shows while fetching new article data
  const [article, setArticle] = useState(null);
  const [categories, setCategories] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [recentComments, setRecentComments] = useState([]);
  const [archives, setArchives] = useState([]);
  const [loadingSidebar, setLoadingSidebar] = useState(true);

  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [modalData, setModalData] = useState({
    show: false,
    type: "",
    title: "",
    message: "",
  });

  const handleShare = async () => {
    const shareData = {
      title: article?.title,
      text: `Check out this article: ${article?.title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setModalData({
          show: true,
          type: "success",
          title: "Link Copied",
          message: "The article link has been copied to your clipboard.",
        });
      } catch (err) {
        console.error("Failed to copy link:", err);
      }
    }
  };

  // --- MAIN FETCH EFFECT ---
  useEffect(() => {
    const fetchData = async () => {
      window.scrollTo(0, 0);

      // Important: If we have state from navigate, use it immediately, otherwise reset to null to show loader
      if (
        location.state &&
        (location.state._id === routeArticleId ||
          location.state.id === routeArticleId)
      ) {
        setArticle(location.state);
      } else {
        setArticle(null);
      }

      // Fetch Sidebar Data
      fetchSidebarData();

      // Ensure we have the specific article data
      if (routeArticleId) {
        try {
          const isObjectId = /^[a-fA-F0-9]{24}$/.test(routeArticleId);
          if (isObjectId) {
            const res = await apiCall(
              API_ENDPOINTS.ARTICLE.GET_BY_ID(routeArticleId),
            );
            const fetched = res?.article || res?.data || res;
            setArticle(fetched);
          } else {
            // Fallback: search by slug in all articles
            const allRes = await apiCall(API_ENDPOINTS.ARTICLE.GET_ALL);
            const allArticles = allRes?.articles || allRes?.data || [];

            const slugify = (s = "") =>
              s
                .toString()
                .toLowerCase()
                .trim()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9\-]/g, "")
                .replace(/-+/g, "-");

            const found = allArticles.find((a) => {
              const title = a?.title || "";
              return (
                slugify(title) === slugify(routeArticleId) ||
                a?._id === routeArticleId
              );
            });
            if (found) setArticle(found);
          }
        } catch (err) {
          console.error("Failed to fetch article:", err);
        }
      }
    };

    fetchData();
    // We include location.key or location.state to track navigation changes specifically
  }, [routeArticleId, location.key]);

  const fetchSidebarData = async () => {
    try {
      setLoadingSidebar(true);
      const [catRes, artRes, commRes] = await Promise.all([
        apiCall(API_ENDPOINTS.CATEGORY.GET_ALL),
        apiCall(API_ENDPOINTS.ARTICLE.GET_ALL),
        apiCall(
          API_ENDPOINTS.ARTICLE_COMMENT.GET_BY_ARTICLE_ID(
            article?._id || routeArticleId,
          ),
        ),
      ]);

      setCategories(
        (catRes?.categories || catRes?.data || []).filter(
          (c) => c.status === "active",
        ),
      );
      const allArts = artRes?.articles || artRes?.data || [];
      setRecentPosts(allArts.slice(0, 5));

      const arch = new Set();
      allArts.forEach((a) => {
        const d = new Date(a.createdAt);
        arch.add(
          d.toLocaleString("default", { month: "long", year: "numeric" }),
        );
      });
      setArchives(Array.from(arch).slice(0, 5));
      setRecentComments((commRes?.comments || []).slice(0, 5));
    } catch (err) {
      console.error("Sidebar Load Error:", err);
    } finally {
      setLoadingSidebar(false);
    }
  };

  const handleSidebarSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const [artRes, catRes, subRes] = await Promise.all([
        apiCall(API_ENDPOINTS.ARTICLE.GET_ALL),
        apiCall(API_ENDPOINTS.CATEGORY.GET_ALL),
        apiCall(API_ENDPOINTS.SUBCATEGORY.GET_ALL),
      ]);

      const articles = (artRes?.articles || artRes?.data || [])
        .filter((a) => a.title.toLowerCase().includes(query.toLowerCase()))
        .map((item) => ({ ...item, type: "Article", display: item.title }));

      const categories = (catRes?.categories || catRes?.data || [])
        .filter((c) =>
          c.categoryName.toLowerCase().includes(query.toLowerCase()),
        )
        .map((item) => ({
          ...item,
          type: "Category",
          display: item.categoryName,
        }));

      const subCategories = (subRes?.subCategories || subRes?.data || [])
        .filter((s) =>
          s.subCategoryName.toLowerCase().includes(query.toLowerCase()),
        )
        .map((item) => ({
          ...item,
          type: "Subcategory",
          display: item.subCategoryName,
        }));

      setSearchResults(
        [...articles, ...categories, ...subCategories].slice(0, 8),
      );
    } catch (err) {
      console.error("Search Error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setModalData({
        show: true,
        type: "login",
        title: "Login Required",
        message: "You must be logged in to post a comment.",
      });
      return;
    }
    const trimmed = (commentText || "").trim();
    if (!trimmed) {
      setModalData({
        show: true,
        type: "error",
        title: "Empty Comment",
        message: "Please enter a comment before submitting.",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await apiCall(API_ENDPOINTS.COMMENT.CREATE, {
        method: "POST",
        body: JSON.stringify({
          userId: user?._id || user?.id,
          articleId: article?._id || routeArticleId,
          comment: trimmed,
          status: "active",
        }),
      });
      setCommentText("");
      setModalData({
        show: true,
        type: "success",
        title: "Comment Posted",
        message: "Your comment has been posted successfully.",
      });
      fetchSidebarData();
    } catch (err) {
      console.error("Comment post error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToFilterPage = (type, value, title, id = null) => {
    navigate("/filtered-articles", { state: { type, value, title, id } });
  };

  if (!article)
    return (
      <Container className="py-5 text-center">
        <Spinner animation="grow" variant="warning" />
        <h4 className="mt-3">Loading Article...</h4>
      </Container>
    );

  return (
    <div
      key={routeArticleId}
      className="bg-light py-5"
      style={{ overflowX: "hidden" }}
    >
      <Container>
        <Row className="gy-4 align-items-start">
          <Col lg={8} md={12} className="pe-lg-5">
            <div
              id="printable-article"
              className="bg-white p-4 p-md-5 rounded-4 shadow-sm"
            >
              <div className="mb-2 d-flex justify-content-between align-items-center">
                <span className="text-warning fw-bold text-uppercase small">
                  {article.category?.categoryName || article.category}
                </span>
                <button
                  onClick={() => window.print()}
                  className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1 shadow-sm print-hide-btn"
                >
                  <i className="bi bi-printer"></i>{" "}
                  <span className="small fw-bold">Print</span>
                </button>
              </div>
              <h1 className="display-6 fw-bold mb-2">{article.title}</h1>

              <div className="d-flex align-items-center flex-wrap gap-3 text-muted small mb-2 pb-2 border-bottom border-light">
                <div className="d-flex align-items-center gap-1">
                  <span className="fw-bold text-dark">{article?.author}</span>
                </div>
                <span className="text-secondary d-none d-sm-block">|</span>
                <div className="d-flex align-items-center gap-1">
                  <CiCalendar className="text-warning" />
                  <span>
                    {new Date(
                      article.createdAt || Date.now(),
                    ).toLocaleDateString("en-GB")}
                  </span>
                </div>
              </div>

              <Image
                src={
                  article.image ||
                  (article.featureImage?.startsWith("http")
                    ? article.featureImage
                    : `${API_BASE_URL}/${article.featureImage}`)
                }
                className="rounded-3 w-100 mb-4 shadow-sm"
                style={{ maxHeight: "450px", objectFit: "cover" }}
              />

              <div className="article-content lh-lg text-secondary">
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              </div>

              <div className="py-3 border-top border-bottom mt-5 d-flex flex-wrap gap-4 text-muted small bg-light px-3 rounded-3 align-items-center">
                <div className="d-flex align-items-center gap-1">
                  <CiUser className="text-warning" /> <span>Admin</span>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <CiCalendar className="text-warning" />{" "}
                  <span>
                    {new Date(article.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <CiFolderOn className="text-warning" />{" "}
                  <span>
                    {article.category?.categoryName || article.category}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <CiFolderOn className="text-warning" />{" "}
                  <span>
                    {article.subCategory?.subCategoryName || article.category}
                  </span>
                </div>
                <Button
                  variant="outline-warning"
                  size="sm"
                  className="ms-auto rounded-pill d-flex align-items-center gap-2 border-0 shadow-sm bg-white share-btn print-hide-btn"
                  onClick={handleShare}
                >
                  <CiShare2 size={18} /> <span className="fw-bold">Share</span>
                </Button>
              </div>

              <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border mt-4 print-hide">
                <h5 className="fw-bold mb-3 border-bottom pb-2">
                  Recent Comments
                </h5>
                {recentComments.length > 0 ? (
                  recentComments.map((c) => (
                    <div
                      key={c._id}
                      className="small mb-2 border-bottom pb-2 hover-link-comment"
                      onClick={() =>
                        c.articleId &&
                        navigate(`/article/${c.articleId._id}`, {
                          state: c.articleId,
                        })
                      }
                    >
                      <span className="text-muted italic">"{c.comment}"</span>
                    </div>
                  ))
                ) : (
                  <p className="small text-muted">No comments yet.</p>
                )}
              </div>

              <div className="mt-5 pt-4 print-hide">
                <h3 className="fw-bold mb-3">Leave a Reply</h3>
                <Form onSubmit={handleCommentSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Your comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button variant="dark" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Posting..." : "Post Comment"}
                  </Button>
                </Form>
              </div>
            </div>
          </Col>

          <Col lg={4} md={12}>
            <div className="sticky-top" style={{ top: "100px", zIndex: "10" }}>
              <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border">
                <h5 className="fw-bold mb-3 border-bottom pb-2">Search</h5>
                <InputGroup className="bg-light rounded-pill border overflow-hidden px-2 py-1">
                  <Form.Control
                    type="search"
                    placeholder="Search..."
                    className="bg-light border-0 shadow-none small"
                    value={searchQuery}
                    onChange={handleSidebarSearch}
                  />
                  <Button
                    variant="link"
                    className="text-dark border-0 p-0 ps-1"
                  >
                    {isSearching ? (
                      <Spinner animation="border" size="sm" variant="warning" />
                    ) : (
                      <CiSearch size={20} />
                    )}
                  </Button>
                </InputGroup>
                {searchResults.length > 0 && (
                  <ListGroup className="mt-2 shadow-sm border-0 result-container">
                    {searchResults.map((item, idx) => (
                      <ListGroup.Item
                        key={idx}
                        action
                        className="border-0 border-bottom py-2"
                        onClick={() => {
                          setSearchQuery("");
                          setSearchResults([]);
                          if (item.type === "Article") {
                            // Clear state before navigating to force re-fetch if necessary
                            navigate(`/article/${item._id}`, { state: item });
                          } else {
                            goToFilterPage(
                              item.type.toLowerCase(),
                              item.display,
                              item.display,
                              item._id,
                            );
                          }
                        }}
                      >
                        <div
                          style={{ fontSize: "10px" }}
                          className="text-warning fw-bold text-uppercase"
                        >
                          {item.type}
                        </div>
                        <div className="small text-dark fw-semibold">
                          {item.display}
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </div>

              <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border">
                <h5 className="fw-bold mb-3 border-bottom pb-2">
                  Recent Posts
                </h5>
                <ListGroup variant="flush">
                  {recentPosts.map((post) => (
                    <ListGroup.Item
                      key={post._id}
                      action
                      onClick={() =>
                        navigate(`/article/${post._id}`, { state: post })
                      }
                      className="border-0 px-0 small py-2 text-muted bg-transparent"
                    >
                      • {post.title}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>

              <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border">
                <h5 className="fw-bold mb-3 border-bottom pb-2">Archives</h5>
                {archives.map((a) => (
                  <div
                    key={a}
                    className="small py-2 hover-link text-muted"
                    onClick={() => goToFilterPage("archive", a, a)}
                  >
                    • {a}
                  </div>
                ))}
              </div>

              <div className="bg-white p-4 rounded-4 shadow-sm border">
                <h5 className="fw-bold mb-3 border-bottom pb-2">Categories</h5>
                {categories.map((cat) => (
                  <div
                    key={cat._id}
                    className="small py-2 hover-link text-muted"
                    onClick={() =>
                      goToFilterPage(
                        "category",
                        cat.categoryName,
                        cat.categoryName,
                        cat._id,
                      )
                    }
                  >
                    • {cat.categoryName}
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal
        show={modalData.show}
        onHide={() => setModalData({ ...modalData, show: false })}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalData.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-muted">{modalData.message}</Modal.Body>
        <Modal.Footer>
          {modalData.type === "login" ? (
            <Button variant="dark" onClick={() => navigate("/login")}>
              Login
            </Button>
          ) : (
            <Button
              variant="dark"
              onClick={() => setModalData({ ...modalData, show: false })}
            >
              Close
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <style>{`
        .hover-link:hover { color: #d4af37 !important; padding-left: 5px; cursor: pointer; transition: 0.2s; }
        .hover-link-comment:hover { background-color: #f8f9fa; color: #d4af37 !important; cursor: pointer; }
        .article-content img { max-width: 100%; height: auto; border-radius: 8px; margin: 15px 0; }
        .result-container { max-height: 300px; overflow-y: auto; position: absolute; width: 100%; left: 0; background: white; z-index: 1000; }
        @media print {
          body * { visibility: hidden; }
          #printable-article, #printable-article * { visibility: visible; }
          #printable-article { position: absolute; left: 0; top: 0; width: 100%; padding: 20px; border: none !important; }
          .print-hide, .print-hide-btn { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default ArticleDetail;
