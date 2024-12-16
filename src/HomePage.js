import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [referralCode, setReferralCode] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("referralCode");
    if (code) {
      axios
        .get(`/validate-referral/${code}`)
        .then((res) => {
          setReferralCode(code);
          toast.success("Referral code is valid!");
        })
        .catch(() => {
          toast.error("Invalid referral code.");
        });
    }
  }, [location]);

  return (
    <div className="home">
      <Toaster />
      <h1>Welcome to the Referral Platform</h1>
      <p>
        {referralCode
          ? `Referred by code: ${referralCode}`
          : "No referral code detected."}
      </p>
      <button
        onClick={() => navigate("/register", { state: { referralCode } })}
      >
        Proceed to Register
      </button>
    </div>
  );
};

export default HomePage;
