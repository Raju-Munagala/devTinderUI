import React from "react";
import { BASE_URL, USER_IMAGE } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { firstName, lastName, about } = user;
  const handleFeed = async (status, userId) => {
    await axios.post(BASE_URL + "/connection/send/" + status + "/" + userId,{}, {
      withCredentials: true,
    });
    dispatch(removeUser(userId));
  };
  return (
    <div className="min-w-48 max-w-xs mx-auto my-4 p-4 border border-gray-300 rounded-lg shadow-lg">
      <img
        className="w-20 h-20 rounded-full mx-auto"
        src={USER_IMAGE}
        alt={`${firstName}'s avatar`}
      />
      <div className="text-center my-5">
        <h2 className="text-xl font-semibold">{firstName + " " + lastName}</h2>
        <p className="text-gray-600 break-words">{about}</p>
      </div>
      <div className="flex justify-center">
        <button className="border p-4 m-2 bg-green-400 rounded-lg text-white text-lg font-medium" onClick={()=>handleFeed("interested",user._id)}>
          Interested
        </button>
        <button className="border p-4 m-2 bg-gray-500 rounded-lg text-white text-lg font-medium" onClick={()=>handleFeed("ignored",user._id)}>
          Ignore
        </button>
      </div>
    </div>
  );
};

export default UserCard;
