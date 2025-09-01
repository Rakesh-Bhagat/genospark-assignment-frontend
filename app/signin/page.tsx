"use client"
import InputBox from "@/components/InputBox"
import InputButton from "@/components/InputButton"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Signin = () => {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSignin = async() => {
        try {
      const response = await axios.post("http://localhost:8000/signin",
        { username, password }
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      router.push("/");
    } catch (error) {
      console.log("signin failed: " + error);
    }

    }
  return (
    
    <div className="flex mx-auto items-center justify-center h-screen">
        <div className="border border-gray-500 rounded-2xl flex flex-col p-5 w-lg justify-center">
            <h1 className="text-4xl mb-4 text-center font-bold">Sign in</h1>
            
            <InputBox handleChange={(e)=>{setUsername(e.target.value)}} type="text" placeholder="Username"/>
            <InputBox handleChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Enter your Password"/>
            <InputButton buttonText="Sign in" onSubmit={handleSignin}/>
            <h3 className="text-center text-neutral-500">Don&apos;t have an account? <Link href={"/signup"}> <span className="text-blue-800 cursor-pointer underline">Sign up</span></Link></h3>
        </div>
    </div>
  )
}
export default Signin