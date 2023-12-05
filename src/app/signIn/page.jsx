"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { status: isuser } = useSelector((state) => state.auth);
  const router = useRouter();
  const SignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (isuser) {
      router.push("/");
    }
  }, []);

  return (
    <div className="flex h-screen justify-center items-center ">
      <div className="flex flex-col lg:w-1/5 bg-neutral-600 rounded-xl p-6  text-white text-xl ">
        <p className="text-xl">Sign In</p>
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
        <button
          className="bg-emerald-500 rounded-xl text-lg mt-3"
          onClick={SignIn}
        >
          Sign In
        </button>
        <p className="text-sm text-center text-gray-200 mt-5">
          Don't have an Account? <Link href={"/signUp"}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
