import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import MainLayout from "./components/Layout/MainLayout";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Membership from "./pages/Membership";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Videos from "./pages/Videos";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Articles from "./pages/Articles";
import ArticlesList from "./pages/ArticlesList";
import ArticleDetail from "./pages/ArticleDetail";
import Events from "./pages/Events";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="events" element={<Events />} />
            <Route path="membership" element={<Membership />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="videos" element={<Videos />} />
            <Route path="termsconditions" element={<TermsConditions />} />
            <Route path="privacypolicy" element={<PrivacyPolicy />} />
            <Route path="articles/:categoryId" element={<Articles />} />
            <Route path="filtered-articles" element={<ArticlesList />} />
            <Route path="article/:slug" element={<ArticleDetail />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
