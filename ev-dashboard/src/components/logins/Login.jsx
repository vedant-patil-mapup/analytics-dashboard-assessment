// src/components/logins/Login.jsx
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import evcar from "../../assets/images/evs.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { auth, googleProvider } from "../../firebaseConfig";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      // Redirect to the root of the app to avoid double /electric-vehicle
      navigate("/");
    } catch (error) {
      setMessage("Google Sign-in failed: " + error.message);
    }
  };

  const handleFromLogin = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    try {
      const response = await axios.post("http://192.168.0.123:3500/api/login", {
        email,
        password,
      });
      console.log("Response:", response);
      if (response.data.success) {
        navigate("/");
      } else if (response.data.error === "User not found") {
        setMessage("Account does not exist, please create a new account.");
      } else {
        setMessage(response.data.message || "Login failed.");
      }
    } catch (error) {
      console.log("Error:", error);
      // Handle case where response from server indicates user doesn't exist
      if (error.response?.data?.error === "User not found") {
        setMessage("Account does not exist, please create a new account.");
      } else {
        setMessage("Error: " + error.response?.data?.error || "An error occurred");
      }
    }
  };

  return (
    <section >
      <div className="bg-gradient-to-r from-blue-200 to-orange-300 grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Sign in
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Don&apos;t have an account?
              <Link
                to="/signin"
                className="font-semibold text-black transition-all duration-200 hover:underline"
              >
                Create an account
              </Link>
            </p>
            <form onSubmit={handleFromLogin} className="mt-8">
              <div className="space-y-5">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex h-10 w-full rounded-md border bg-transparent px-3 py-2"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex h-10 w-full rounded-md border bg-transparent px-3 py-2"
                />
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-orange-500 px-3.5 py-2.5 font-semibold text-white"
                >
                  Get started <ArrowRight className="ml-2" size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-blue-500 px-3.5 py-2.5 font-semibold text-white"
                >
                  Sign in with Google
                </button>
                {message && <span>{message}</span>}
              </div>
            </form>
          </div>
        </div>
        <div className="h-full w-full">
          <img src={evcar} alt="" className="h-screen w-full rounded-tl-xl rounded-bl-xl" />
        </div>
      </div>
    </section>
  );
};

export default Login;
