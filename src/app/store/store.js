"use client";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import dataReducer from "./dataSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    newsData: dataReducer,
  },
});

export default store;
