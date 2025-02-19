import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    removeRequest:(state,action)=>{
        const result = state.filter(request=>request._id!==action.payload)
        return result
    }
  },
});

export const { addRequests,removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
