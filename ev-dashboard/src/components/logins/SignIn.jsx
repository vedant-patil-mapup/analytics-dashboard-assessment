// src/components/logins/SignIn.jsx
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import evcar from "../../assets/images/EV-scaled.jpg";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import evcar1 from "../../assets/images/pexels-taras-makarenko-188506-593172.jpg";

const SignIn = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("Account created successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage("Registration failed: " + error.message);
    }
  };

  return (
    // <section className="min-h-screen bg-gray-100 flex items-center justify-center">
    <section 
      className="min-h-screen flex items-center justify-center"
      style={{ 
        backgroundImage: `url(${evcar1})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center'
      }}
    >
      <div className="bg-gradient-to-r from-blue-200 to-orange-200 rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create an Account</h2>
        {message && <div className="bg-green-100 text-green-700 p-4 rounded mb-4">{message}</div>}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
          <button type="submit" className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-gray-600 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignIn;
