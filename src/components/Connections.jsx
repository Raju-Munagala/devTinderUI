import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL, USER_IMAGE } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    const res = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });
    dispatch(addConnections(res.data.data));
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if (connections.length === 0) return <div className="text-lg font-medium text-center pt-10">No Connections</div>;
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-lg font-medium pt-5 underline">Connections</h1>
      <div className="w-4/6">
        {connections.map((connection) => {
          return (
            <div key={connection._id} className="flex bg-base-300 w-full p-4 rounded-lg items-center my-4">
              <img className="size-24" src={USER_IMAGE} alt="user avatar" />
              <div className="flex justify-between w-5/6 p-4">
                <div>
                  <h1 className="text-lg font-medium">{connection.firstName + " " + connection.lastName}</h1>
                  <p>{connection.about}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
