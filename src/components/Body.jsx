import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const user = useSelector(store=>store.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const fetchUser = async () => {
    try {
        if(location.pathname==="/signup") return navigate("/signup")
        if(location.pathname==="/login") return navigate("/login")
        if(user) return
        const userData = await axios.get(
        BASE_URL + "/profile/view",
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(userData.data));
    } catch (error) {
      if (
        error.response.data === "error :jwt expired" ||
        error.response.data === "error :no token"
      ) {
        return navigate("/login");
      }
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchUser();
  },[]);

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
