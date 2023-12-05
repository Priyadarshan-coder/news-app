"use client";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  newsData: [],
  favouriteNews: [],
};

const dataSlice = createSlice({
  name: "newsData",
  initialState,
  reducers: {
    addData: (state, action) => {
      state.newsData = [...action.payload.newData];
    },
    addFavourite: (state, action) => {
      state.favouriteNews = [...state.favouriteNews, action.payload.article];
    },
    removeFovouriteNews: (state, action) => {
      const newFavourites = state.favouriteNews.filter(
        (news) => news.title !== action.payload.article.title
      );
      state.favouriteNews = newFavourites;
    },
    getFavourites: (state, action) => {
      state.favouriteNews = [...action.payload.favourites];
    },
  },
});

export const { addData, addFavourite, removeFovouriteNews, getFavourites } =
  dataSlice.actions;
export default dataSlice.reducer;
