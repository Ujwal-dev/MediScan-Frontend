import React, { useState , useContext} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext  from "../../Contexts/UserContext";

export default function LoginBox() {

  const [password , setPassword] = useState('')
  const [email , setEmail] = useState('')
  const [errorMsg , setErrorMsg] = useState('')
  
  const {setUser} = useContext(UserContext);

  const dest = "https://mediscan-backend.onrender.com/authenticate"
  const navigate = useNavigate()
  const validateUser = async (e) => {
    e.preventDefault()
    try {
      const data = {
        "email" : email,
        "password" : password
      }
      const response = await axios.post(dest, data);
      setErrorMsg(response.data)
      setUser(email)
      localStorage.setItem('user', email);
      navigate("/")

      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      setErrorMsg(error.response.data);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    
    <div className="h-[90vh] flex items-center justify-center">
      <div
        className="w-[350px] flex flex-col p-8 px-25 rounded-md text-black bg-white"
      >
        <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">
          <span className="text-[cadetblue]">Welcome back!</span>
        </div>
        <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">
          Log in to your account
        </div>
        <form onSubmit={validateUser} className="flex flex-col gap-3">
          <div className="block relative">
            <label
              for="email"
              className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
              onChange={(e) => {setEmail(e.target.value)}}
            />
          </div>
          <div className="block relative">
            <label
              for="password"
              className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
              onChange={(e) => {setPassword(e.target.value)}}
            />
          </div>
          <div className="text-sm font-normal mb-4 text-center text-[red]">
          {errorMsg}
        </div>
          <div>
          <Link className="text-sm text-[cadetblue]" to="/forget-password">
              Forgot your password?
            </Link>
          </div>
          <button
            type="submit"
            className="bg-[cadetblue] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
          >
            Submit
          </button>
        </form>
        <div className="text-sm text-center mt-[1.6rem]">
          Don’t have an account yet?{" "}
          <Link className="text-sm text-[cadetblue]" to="/register">
            Sign up for free!
          </Link>
        </div>
      </div>
    </div>
  );
}
