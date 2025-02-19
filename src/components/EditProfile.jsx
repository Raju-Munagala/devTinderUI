import React from "react";
import { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [about, setAbout] = useState(user.about);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const saveProfile = async () => {
    const updateData = { firstName, lastName, about };
    try {
      const res = await axios.put(BASE_URL + "/profile/edit", updateData, {
        withCredentials: true,
      });
      dispatch(addUser(res.user));
      setShowSuccessMessage(true)
      setTimeout(()=>{
        setShowSuccessMessage(false)
      },2000)
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      {showSuccessMessage && <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile Updated Successfully.</span>
        </div>
      </div>}
      <div className="flex justify-center">
        <div className="card bg-neutral text-neutral-content my-5 w-3/6 mx-10">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Edit Profile</h2>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-white">First Name</span>
              </div>
              <input
                type="text"
                value={firstName}
                className="input input-bordered w-full max-w-xs text-black"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs mb-5">
              <div className="label">
                <span className="label-text text-white">Last Name</span>
              </div>
              <input
                type="text"
                value={lastName}
                className="input input-bordered w-full max-w-xs text-black"
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs mb-5">
              <div className="label">
                <span className="label-text text-white">About</span>
              </div>
              <input
                type="text"
                value={about}
                className="input input-bordered w-full max-w-xs text-black"
                onChange={(e) => setAbout(e.target.value)}
              />
            </label>
            <div className="card-actions justify-end">
              <button className="btn btn-success" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
        <div>
          <UserCard user={{ firstName, lastName, about }} />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
