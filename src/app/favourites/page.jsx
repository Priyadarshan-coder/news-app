"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "@/firebase";
import Link from "next/link";
import { addFavourite, removeFovouriteNews } from "@/app/store/dataSlice";
export default function Favourites() {
  const dispatch = useDispatch();
  const { favouriteNews, newsData } = useSelector((state) => state.newsData);
  const { userData: user } = useSelector((state) => state.auth);
  const isFavorite = (article) => {
    return favouriteNews.some(
      (favArticle) => favArticle.title === article.title
    );
  };
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4 gap-8  md:p-2`}
    >
      {favouriteNews.map((article, index) => (
        <Link
          href={`/news/${newsData.findIndex(
            (news) => news.title === article.title
          )}`}
          key={article.title + index}
          className={`bg-white p-4 rounded  cursor-pointer relative`}
        >
          <button
            className={`absolute right-8 top-6 hover:cursor-pointer h-7 w-7 rounded-full  flex justify-center items-center text-white ${
              isFavorite(article) ? "bg-red-500" : "bg-neutral-400"
            }`}
            onClick={async (e) => {
              e.preventDefault();
              try {
                const docRef = doc(db, "users", user[2]);
                if (isFavorite(article)) {
                  await updateDoc(docRef, {
                    favourites: arrayRemove(article),
                  });
                  dispatch(removeFovouriteNews({ article }));
                } else {
                  await updateDoc(docRef, {
                    favourites: arrayUnion(article),
                  });
                  dispatch(addFavourite({ article }));
                }
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
          <img src={article.urlToImage} className="w-full  h-4/5  " />
          <h3 className="md:text-lg text font-semibold mb-2">
            {article.title}
          </h3>
          <div className=" truncate  text-gray-500 text-lg">
            {article.author}
          </div>
        </Link>
      ))}
    </div>
  );
}
