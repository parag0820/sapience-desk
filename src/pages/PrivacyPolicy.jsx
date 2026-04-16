import React, { useEffect, useState } from "react";
import { API_ENDPOINTS, apiCall } from "../config/api";

const PrivacyPolicy = () => {
  const [content, setContent] = useState("");
  console.log("content", content);

  useEffect(() => {
    fetchPrivacy();
  }, []);

  const fetchPrivacy = async () => {
    try {
      const res = await apiCall(API_ENDPOINTS.PRIVACY); // your API
      setContent(res?.data[0]?.text || "No privacy policy available");
    } catch (error) {
      console.log("Error fetching privacy:", error);
    }
  };

  return (
    <div className="container">
      <h1 style={{ padding: 10 }}>Privacy Policy</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default PrivacyPolicy;
