"use client";
import InputBox from "@/components/InputBox";
import InputButton from "@/components/InputButton";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");

  const handleSignUp = async () => {
    try {
      const response = await axios.post("/api/signup", {
        name,
        username,
        password,
        role,
      });

      if (response.data) {
        router.push("/signin");
      }
    } catch (error) {
      console.log("signup failed: " + error);
    }
  };
  return (
    <div className="flex mx-auto items-center justify-center h-screen">
      <div className="border border-gray-500 rounded-2xl flex flex-col p-5 w-lg justify-center">
        <h1 className="text-4xl mb-4 text-center font-bold">Sign up</h1>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-gray-400 rounded-lg p-2 mb-4"
        >
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
        </select>
        <InputBox
          handleChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          placeholder="Name"
        />
        <InputBox
          handleChange={(e) => {
            setUsername(e.target.value);
          }}
          type="text"
          placeholder="Username"
        />
        <InputBox
          handleChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="Enter your Password"
        />
        <InputButton buttonText="Sign up" onSubmit={handleSignUp} />
        <h3 className="text-center text-neutral-500">
          Already have an account?{" "}
          <Link href={"/signin"}>
            {" "}
            <span className="text-blue-800 cursor-pointer underline">
              Sign in
            </span>
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default Signup;
