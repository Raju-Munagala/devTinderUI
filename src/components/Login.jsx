import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(user.data));
      return navigate("/");
    } catch (error) {
      setErrorMessage(error.response.data);
    }
  };
  return (
    <div className="flex justify-center mt-10">
      <div className="card bg-neutral text-neutral-content w-96">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Login</h2>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-white">Email ID</span>
            </div>
            <input
              type="text"
              placeholder="Enter Email"
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
              placeholder="Enter Password"
              className="input input-bordered w-full max-w-xs text-black"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <p className="text-red-500">{errorMessage}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
          <Link to="/signup" className="text-white my-2">new user?please signup here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
