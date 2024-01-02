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
    <nav className="bg-blue-800 p-6 text-xl w-full flex justify-between md:px-40 text-white">
      <Link href={"/"} className="text-2xl text-white font-semibold font-serif">
        PersonalisedNews
      </Link>
      <div>
        
      </div>
    </nav>
  );
}
