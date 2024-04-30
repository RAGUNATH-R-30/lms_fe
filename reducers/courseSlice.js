import { createSlice } from "@reduxjs/toolkit";

export const courseSlice = createSlice({
    name:"courseslice",
    initialState:{
        course:{},
        mycourses:[]
    },
    reducers:{
        setcourse:(state,action)=>{
            state.course = action.payload
            console.log(state.course)
            return state;
        },
        setmycourses:(state,action)=>{
            state.mycourses = action.payload
            console.log(state.mycourses)
            return state;
        }
    }
    
})
export const {setcourse,setmycourses} = courseSlice.actions;