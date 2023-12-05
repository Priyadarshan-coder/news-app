"use client";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { collection, query, where, getDocs } from "firebase/firestore";
import { login, logout } from "./store/authSlice";
import { getFavourites } from "./store/dataSlice";
import Feed from "@/components/Feed";

export default function App({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        let data = [user.uid, user.email];
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        getDocs(q).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            data.push(doc.id);
            const { favourites } = doc.data();
            dispatch(login({ data }));
            dispatch(getFavourites({ favourites }));
          });
        });
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return (
    <div>
      <Feed />
    </div>
  );
}
