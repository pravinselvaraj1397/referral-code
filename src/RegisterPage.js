import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import "./App.css";
import { GoogleLogin } from "react-google-login";
import toast, { Toaster } from "react-hot-toast";

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [referralCode] = useState(location.state?.referralCode || null);

  const handleGoogleSuccess = async (response) => {
    const token = response.tokenId;
    try {
      const res = await axios.post("/register", { token, referralCode });
      toast.success(res.data.message);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Registration failed.");
    }
  };

  const handleGoogleFailure = () => {
    toast.error("Google login failed.");
  };

  return (
    <div className="register">
      <Toaster />
      <h1>Register</h1>
      <p>{referralCode && `Referred by code: ${referralCode}`}</p>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Sign up with Google"
        onSuccess={handleGoogleSuccess}
        onFailure={handleGoogleFailure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default RegisterPage;
