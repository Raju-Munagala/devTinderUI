import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL, USER_IMAGE } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestsSlice'

const Requests = () => {
    const requests = useSelector(store=>store.requests)
    const dispatch = useDispatch();

    const handleRequest = async (status,id)=>{
        await axios.post(BASE_URL+"/connection/recieved/"+status+"/"+id,{},{withCredentials:true})
        dispatch(removeRequest(id))
    }
    const fetchRequests = async ()=>{
        const res = await axios.get(BASE_URL+"/user/requests",{withCredentials:true})
        dispatch(addRequests(res.data.data))
    }
  useEffect(()=>{
    fetchRequests()
  },[])
  if (requests.length === 0) return <div className='text-lg font-medium text-center'>No Requests</div>;
    return (
      <div className="flex flex-col items-center mt-5">
        <h1 className='text-lg font-medium underline'>Requests</h1>
        <div className="w-4/6">
          {requests.map((request) => {
            return (
              <div key={request._id} className="flex bg-base-300 w-full p-4 rounded-lg items-center">
                <img className="size-24" src={USER_IMAGE} alt="user avatar" />
                <div className="flex justify-between w-5/6 p-4">
                  <div>
                    <h1 className="text-lg font-medium">{request?.fromUserId?.firstName + " " + request?.fromUserId?.lastName}</h1>
                    <p>{request?.fromUserId?.about}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn btn-active" onClick={()=>handleRequest("rejected",request._id)}>Reject</button>
                    <button className="btn btn-active btn-accent" onClick={()=>handleRequest("accepted",request._id)}>Accept</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
}

export default Requests