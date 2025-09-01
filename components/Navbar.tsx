"use client";
import { useRouter } from "next/navigation";
import LoginButton from "./LoginButton";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";



const Navbar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState("")

  useEffect(()=>{
    setToken(localStorage.getItem('token') as string)

  }, [])


  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("")
  };

  return (
    <nav className=" p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl sm:text-3xl font-bold font-mono text-black">
          Productify
        </h1>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-6">
          

          {token ? (
            <>
              <button
                onClick={handleLogout}
                className="text-black border border-gray-500 px-4 py-2 rounded hover:bg-gray-700 cursor-pointer"
              >
                Logout
              </button>
              </>
            
          ) : (
            <LoginButton onclick={() => router.push("/signin")} text="Login" />
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-white"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="sm:hidden mt-3 space-y-4 bg-[#1f2937] p-4 rounded-lg shadow-lg">
          

          {token ? (
            <>
              <div className="flex items-center gap-3">
                
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-white border border-gray-500 px-4 py-2 rounded hover:bg-gray-700 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <LoginButton
              onclick={() => {
                router.push("/signin");
                setMenuOpen(false);
              }}
              text="Login"
            />
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
