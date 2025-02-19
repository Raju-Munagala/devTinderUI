import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
        await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      return navigate("/login");
    } catch (error) {
        console.log(error)
        setErrorMessage(error.response.data)
    }
  };
  return (
    <div className="flex justify-center mt-10">
      <div className="card bg-neutral text-neutral-content w-96">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Login</h2>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-white">First Name</span>
            </div>
            <input
              type="text"
              placeholder={firstName}
              className="input input-bordered w-full max-w-xs text-black"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-white">Last Name</span>
            </div>
            <input
              type="text"
              placeholder={lastName}
              className="input input-bordered w-full max-w-xs text-black"
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-white">Email ID</span>
            </div>
            <input
              type="text"
              placeholder={emailId}
              className="input input-bordered w-full max-w-xs text-black"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </label>
          <label className="form-control w-full max-w-xs mb-5">
            <div className="label">
              <span className="label-text text-white">Password</span>
            </div>
            <input
              type="text"
              placeholder={password}
              className="input input-bordered w-full max-w-xs text-black"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <p className="text-red-500">{errorMessage}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleSignup}>
              SignUp
            </button>
          </div>
          <Link to="/login" className="text-white my-2">
            exiting user?please login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
