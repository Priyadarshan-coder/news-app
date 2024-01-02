"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "@/firebase";
import {
  addData,
  addFavourite,
  removeFovouriteNews,
} from "@/app/store/dataSlice";
import Link from "next/link";

export default function Feed() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { favouriteNews } = useSelector((state) => state.newsData);
  const { userData: user, status: isUser } = useSelector((state) => state.auth);
  const [isGridView, setIsGridView] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!navigator.onLine) {
          const cache = await caches.open("newsArticlesCache");
          const cachedResponse = await cache.match("cachedArticles");

          if (cachedResponse) {
            const newData = await cachedResponse.json();
            setData(newData);
            dispatch(addData({ newData }));
          }
        } else {
          const { data } = await axios.get(
            "https://newsapi.org/v2/top-headlines?country=us",
            {
              headers: {
               // Authorization: process.env.NEXT_PUBLIC_NEWS_APIKEY,
                Authorization:190cb26d2281478891856301be1946ef,
              },
            }
          );

          const newData = data.articles.filter(
            (news) => news.title !== "[Removed]"
          );

          dispatch(addData({ newData }));
          setData(newData);

          // Cache the fetched articles using the Cache API
          const cache = await caches.open("newsArticlesCache");
          const response = new Response(JSON.stringify(newData));
          cache.put("cachedArticles", response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const isFavorite = (article) => {
    return favouriteNews.some(
      (favArticle) => favArticle.title === article.title
    );
  };
  return (
    <div className="m-4">
      <div className="flex justify-end mr-10 md:mr-20 mb-5">
        <div className="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex">
          <button
            className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded-l-full px-4 py-2 ${
              isGridView && "active"
            }`}
            id="grid"
            onClick={() => setIsGridView(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="fill-current w-4 h-4 mr-2"
            >
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span>Grid</span>
          </button>
          <button
            className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded-l-full px-4 py-2  ${
              !isGridView && "active"
            } `}
            id="list"
            onClick={() => setIsGridView(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="fill-current w-4 h-4 mr-2"
            >
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
            <span>List</span>
          </button>
        </div>
      </div>
      {isGridView ? (
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4 gap-8  md:p-2`}
        >
          {data.map((article, index) => (
            <Link
              href={`/news/${index}`}
              key={article.title + index}
              className={`bg-white p-4 rounded  cursor-pointer relative`}
            >
              {isUser && (
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
              )}

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
      ) : (
        <ul className="list-disc md:pl-4 flex flex-wrap gap-8 md:justify-around justify-center ">
          {data.map((article, index) => (
            <Link
              href={`/news/${index}`}
              key={article.title + index}
              className="border-y-2 mb-2 p-2 cursor-pointer w-4/5 md:w-2/5 h-max-2/3 min-h-4/6 flex gap-2 relative"
            >
              {isUser && (
                <button
                  className={`absolute right-2 bottom-3 hover:cursor-pointer h-7 w-7 rounded-full  flex justify-center items-center text-white ${
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
              )}

              <img
                src={article.urlToImage}
                className="h-full w-1/3"
                style={{ backgroundSize: "contain" }}
              />
              <div>
                <h4 className="text-wrap text-xs md:text-base font-semibold mb-2">
                  {article.title}
                </h4>
                <span className="text-gray-500">{article.author}</span>
              </div>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
