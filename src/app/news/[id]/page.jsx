"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFavourite, removeFovouriteNews } from "@/app/store/dataSlice";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "@/firebase";

export default function NewsPage({ params }) {
  const { newsData: data, favouriteNews } = useSelector(
    (state) => state.newsData
  );
  const [formattedDate, setFormattedDate] = useState("");
  const { userData: user, status: isuser } = useSelector((state) => state.auth);
  //   const { favouriteNews } = useSelector((state) => state.newsData);
  const [article, setArticle] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    setArticle(data[params.id]);

    const newDate = new Date(data[params.id].publishedAt).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
    setFormattedDate(newDate);
  }, []);
  const isFavorite = (article) => {
    return favouriteNews.some(
      (favArticle) => favArticle.title === article.title
    );
  };
  return (
    <>
      <div className="gradient" />
      <div className="p-5 w-full md:w-3/5 md:m-auto z-10 ">
        <h1 className="text-2xl md:text-4xl  font-mono font-extrabold mb-5">
          {article.title}
        </h1>
        <div className="flex justify-between md:pr-20">
          <div>
            <span className="text-gray-600 font-semibold font-serif  md:text-lg">
              By {article.author} |
            </span>
            <span className="font-mono"> {formattedDate}</span>
          </div>
          <div className="flex gap-4">
            <a
              href={article.url}
              className=" text-white w-7 h-7 bg-gray-500  rounded-full flex justify-center items-center"
              target="_blank"
            >
              <svg
                width="16px"
                height="16px"
                viewBox="0 0 16 16"
                className="bi bi-box-arrow-up-right"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                />
                <path
                  fillRule="evenodd"
                  d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
                />
              </svg>
            </a>
            {isuser && (
              <button
                className={` hover:cursor-pointer h-7 w-7 rounded-full  flex justify-center items-center text-white ${
                  isFavorite(article) ? "bg-red-500" : "bg-neutral-400"
                }`}
                onClick={async (e) => {
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
            )}
          </div>
        </div>

        <img src={article.urlToImage} className="w-3/4 shadow-2xl mt-5" />
        <p className="mt-8 text-xl md:text-2xl font-serif text-gray-700 pr-8">
          {article.description}
        </p>
      </div>
    </>
  );
}
