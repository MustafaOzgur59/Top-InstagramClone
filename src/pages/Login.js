import React from "react";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import FirebaseContext from "../context/firebase";

const Login = () => {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || email === "";

  useEffect(() => {
    document.title = "Login-Instagram";
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      setEmail("");
      setPassword("");
      setError(error.message);
    }
  };

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="\images\iphone-with-profile.jpg" alt="iPhone with profile" />
      </div>

      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary rounded mb-4">
          <h1 className="flex justify-center w-full">
            <img
              src="\images\logo.png"
              alt="Logo"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleLogin} method="POST">
            <input
              type="text"
              aria-label="Enter your email address"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              aria-label="Enter your password"
              placeholder="password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full h-8 font-bold rounded
            ${isInvalid && "opacity-50"}`}
            >
              Login
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
