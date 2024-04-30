import { createSlice } from "@reduxjs/toolkit";

export const courseSlice = createSlice({
    name:"courseslice",
    initialState:{
        course:{}
    },
    reducers:{
        setcourse:(state,action)=>{
            state.course = action.payload
            console.log(state.course)
            return state;
        }
    }
    
})
export const {setcourse} = courseSlice.actions;