// Import dependencies
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
import HomePage from "./HomePage";
import RegisterPage from "./RegisterPage";
import DashboardPage from "./DashboardPage";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  </Router>
);

export default App;
