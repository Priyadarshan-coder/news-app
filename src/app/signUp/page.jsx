"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { auth, db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { status: isuser } = useSelector((state) => state.auth);
  const [confirmPassword, setconfirmPassword] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (isuser) {
      router.push("/");
    }
  }, []);
  const SignUp = () => {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed up
          console.log(userCredential);
          const user = userCredential.user;

          const docRef = await addDoc(collection(db, "users"), {
            uid: user.uid,
            email: user.email,
            favourites: [],
          });
          setEmail("");
          setPassword("");
          setconfirmPassword("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="flex h-screen justify-center items-center ">
      <div className="flex flex-col lg:w-1/5 bg-yellow-600 rounded-xl p-6 text-white text-xl ">
        <p className="text-xl">Sign Up</p>
        <input
          type="text"
          placeholder="Enter Email"
          name="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setconfirmPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 rounded-xl text-lg mt-3"
          onClick={SignUp}
        >
          Sign Up
        </button>
        <p className="text-sm text-center text-gray-200 mt-5">
          Already a user? <Link href={"/signIn"}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}
