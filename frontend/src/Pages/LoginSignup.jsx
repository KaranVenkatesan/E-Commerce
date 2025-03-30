import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // for login
  const login = async () => {
    if (!agree) {
      alert("You must agree to the Terms & Conditions.");
      return;
    }

    console.log("Login function Executed", formData);
    let responseData;
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json", 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      navigate("/"); 
    } else {
      alert(responseData.errors);
    }
  };

  // For signup
  const signup = async () => {
    if (!agree) {
      alert("You must agree to the Terms & Conditions.");
      return;
    }

    console.log("Sign Up function Executed", formData);
    let responseData;
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json", 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      navigate("/"); 
    } else {
      alert(responseData.errors);
    }
  };

  return (
    <div className="bg-[#fce3fe] w-full h-screen flex justify-center items-center px-4 sm:px-0">
      <div className="bg-white max-w-[580px] w-full h-auto px-6 sm:px-10 py-10 sm:py-14 rounded-lg shadow-lg">
        <h1 className="mb-5 font-bold text-xl sm:text-2xl text-center">{state}</h1>

        <div className="flex flex-col gap-4 sm:gap-6">
          {state === "Sign Up" ? (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              className="h-[50px] sm:h-[60px] w-full pl-4 sm:pl-5 border border-[#c9c9c9] outline-none text-[#5c5c5c] text-sm sm:text-lg rounded-md"
              type="text"
              placeholder="Your Name"
            />
          ) : null}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            className="h-[50px] sm:h-[60px] w-full pl-4 sm:pl-5 border border-[#c9c9c9] outline-none text-[#5c5c5c] text-sm sm:text-lg rounded-md"
            type="email"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            className="h-[50px] sm:h-[60px] w-full pl-4 sm:pl-5 border border-[#c9c9c9] outline-none text-[#5c5c5c] text-sm sm:text-lg rounded-md"
            type="password"
            placeholder="Enter Your Password"
          />
        </div>

        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
          className="w-full h-[50px] sm:h-[60px] text-white bg-[#ff4141] mt-5 sm:mt-6 border-none text-base sm:text-xl font-medium rounded-md hover:bg-[#e62e2e] transition duration-200"
        >
          Continue
        </button>

        {state === "Sign Up" ? (
          <p className="mt-4 sm:mt-5 text-[#5c5c5c] text-sm sm:text-lg text-center">
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
              className="text-[#ff4141] font-medium cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="mt-4 sm:mt-5 text-[#5c5c5c] text-sm sm:text-lg text-center">
            Create an account?{" "}
            <span
              onClick={() => {
                setState("Sign Up");
              }}
              className="text-[#ff4141] font-medium cursor-pointer hover:underline"
            >
              Click here
            </span>
          </p>
        )}

        <div className="flex items-start sm:items-center mt-4 sm:mt-5 gap-2 sm:gap-3 text-[#5c5c5c] text-xs sm:text-base font-normal">
          <input
            type="checkbox"
            id="terms"
            className="w-4 sm:w-5 h-4 sm:h-5 accent-[#ff4141] cursor-pointer"
            checked={agree}
            onChange={() => setAgree(!agree)}
          />
          <label htmlFor="terms" className="cursor-pointer leading-tight sm:leading-normal">
            By continuing, I agree to the Terms of Use & Privacy Policy.
          </label>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
