import { createSlice } from "@reduxjs/toolkit";

export const courseSlice = createSlice({
    name:"courseslice",
    initialState:{
        course:{},
        mycourses:[],
        videos:[],
        allcourses:[]
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
        },
        setvideos:(state,action)=>{
            state.videos = action.payload
            console.log(state.videos)
            return state
        },
        setallcourses:(state,action)=>{
            state.allcourses = action.payload
            console.log(state.allcourses)
            return state
        }
    }
    
})
export const {setcourse,setmycourses,setvideos,setallcourses} = courseSlice.actions;