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

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    axios
      .get("/dashboard", {
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((res) => setUser(res.data))
      .catch(() => toast.error("Failed to fetch dashboard."));
  }, []);

  const connectWallet = async () => {
    try {
      const address = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(address[0]);
      await axios.post(
        "/wallet-connect",
        { walletAddress: address[0] },
        { headers: { Authorization: localStorage.getItem("accessToken") } }
      );
      toast.success("Wallet connected successfully.");
    } catch {
      toast.error("Wallet connection failed.");
    }
  };

  return (
    <div className="dashboard">
      <Toaster />
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Referral Points: {user.points}</p>
          <p>Referral Code: {user.referralCode}</p>
          {user.walletAddress ? (
            <p>Wallet Address: {user.walletAddress}</p>
          ) : (
            <button onClick={connectWallet}>Connect Wallet</button>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DashboardPage;
