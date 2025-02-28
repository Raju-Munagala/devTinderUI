import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const fetchFeed = async () => {
    try {
        const feedData = await axios.get(
          BASE_URL + "/user/feed",
          { withCredentials: true }
        );
        dispatch(addFeed(feedData.data))
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if(!feed) return

  if(feed.length===0) return <div className="flex justify-center py-10">No New Users</div>

  if(feed.length!==0) return <UserCard user={feed[0]}/>;
};

export default Feed;
