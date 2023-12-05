"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { logout } from "@/app/store/authSlice";
export default function Nav() {
  const { userData: user, status: isUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        console.log("Error while signing out", errorToJSON);
      });
  };
  return (
    <nav className="bg-neutral-800 p-6 text-xl w-full flex justify-between md:px-40 text-white">
      <Link href={"/"} className="text-2xl text-white font-semibold font-serif">
        InfoPulse
      </Link>
      <div>
        {isUser ? (
          <div className="flex justify-center items-center gap-3">
            <Link href={"/favourites"}>
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
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            </Link>
            <button
              onClick={logOut}
              className="rounded-full p-3 h-11 items-center mr-3 bg-blue_light "
            >
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/ios-filled/50/FFFFFF/exit.png"
                alt="exit"
              />
            </button>
            <Link
              href={"/"}
              className="w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center text-xl"
            >
              {user[1].charAt(0).toUpperCase()}
            </Link>
          </div>
        ) : (
          <Link className="font-serif" href={"/signIn"}>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
