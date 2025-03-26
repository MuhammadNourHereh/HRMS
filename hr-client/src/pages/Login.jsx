import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { requestMethods } from "../utils/enums/request.methods";
import { request } from "../utils/remote/axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();


  const handleInputChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const login = async () => {
    if (!form.email || !form.password) {
      setErrorMessage("Email and password are required.");
      return;
    }
    
    try {
    const response = await request({
      method: requestMethods.POST,
      route: "/login",
      body: form,  
    });

    if (response.success && response.authorization?.token) {
      localStorage.setItem("employee_id", response.employee.id);
      localStorage.setItem("token", response.authorization.token); 

      console.log(response);
      
      navigate("/");

    } else {
      setErrorMessage(response.message || "Login failed. Please check your credentials.");
    }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage("An error occurred. Please try again.");
    }

  };

  return (
    <div className="auth-container">
      <div className="auth-box">
      <img className="login-img" src="https://rsssc.org/assest/img/Login.jpg" alt="pic" />

      <h1 className="auth-title">Login</h1>

      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        placeholder="Enter your email"
        onChange={handleInputChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={handleInputChange}
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      
      <button onClick={login} className="auth-button">Login</button>
      <p className="auth-link">Don't have an account? <Link to="/auth/signup">Sign Up</Link></p> 
      

    </div>
    </div>
  );
};

export default Login;
