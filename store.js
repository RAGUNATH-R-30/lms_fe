import { configureStore } from "@reduxjs/toolkit";
import { courseSlice } from "./reducers/courseSlice";

export const store = configureStore({
  reducer: { 
    app: courseSlice.reducer 
},
});
