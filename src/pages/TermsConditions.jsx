import React, { useEffect, useState } from "react";
import { API_ENDPOINTS, apiCall } from "../config/api";

const TermsConditions = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
    try {
      const res = await apiCall(API_ENDPOINTS.TERMS); // your API
      setContent(res?.data[0]?.text || "No terms and conditions available");
    } catch (error) {
      console.log("Error fetching terms:", error);
    }
  };

  return (
    <div className="container">
      <h1 style={{ padding: 10 }}>Terms & Conditions</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default TermsConditions;
