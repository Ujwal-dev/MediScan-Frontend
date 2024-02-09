import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function ForgetPasswordBox({setFp}) {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("")

  const dest = "https://mediscan-backend.onrender.com/forgot-password/otp"

  const onForget = async (e) => {
    e.preventDefault()
    try {
      const data = {
        "email" : email
      }
      const response = await axios.post(dest, data);
      console.log(response)
      setErrorMsg(response.data)
      setFp({
        "email":email,
        "generated":true
      })
    } catch (error) {
      console.log(error)
      setErrorMsg(error.response.data);
      setFp({
        "email":email,
        "generated":true
      })    }
  };

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="w-[350px] flex flex-col p-8 px-25 rounded-md text-black bg-white">
        <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">
          <span className="text-[cadetblue]">Forget your password?</span>
        </div>
        <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">
          Enter your account details
        </div>
        <form onSubmit={onForget} className="flex flex-col gap-3">
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
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="text-sm font-normal mb-4 text-center text-[red]">
            {errorMsg}
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

export default ForgetPasswordBox;
