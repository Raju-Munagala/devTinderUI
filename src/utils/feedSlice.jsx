import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"feed",
    initialState:[],
    reducers:{
        addFeed:(state,action)=>action.payload,
        removeUser:(state,action)=>{
            const result = state.filter(user=>user._id!==action.payload)
            return result
        },
        removeFeed:()=>null
    }
})

export const {addFeed,removeUser,removeFeed} = feedSlice.actions
export default feedSlice.reducer;