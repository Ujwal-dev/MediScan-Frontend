import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ChangePassword({email}) {

  const [errorMsg, setErrorMsg] = useState("");
  const [fields, setFields] = useState({
    "password":"",
    "confirmPassword":""
  })
  const [formSuccess, setFormSuccess] = useState(false);

  const dest="https://mediscan-backend.onrender.com/forget-password/set-new-password"
  const onInputChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const changePassword = async (e) => {
    
    e.preventDefault();
    if(fields.password.length < 8) {
        setErrorMsg("Password must be 8 characters long!")
        setFormSuccess(false)
        return
    }
    if(fields.confirmPassword !== fields.password) {
        setErrorMsg("Passwords does not match!")
        setFormSuccess(false)
        return
    }
    try {
      const requestBody = {"password":fields.password, "email":email}
      const response = await axios.post(dest, requestBody);
      setErrorMsg(response.data);
      setFormSuccess(true)
    } catch (error) {
      setFormSuccess(false)
      setErrorMsg(error.response.data);
    }
  };

  const notSuccess = (
    <div className="h-[max-content] py-[20px] flex items-center justify-center">
        <div className="w-[350px] h-[fit-content] flex flex-col p-8 px-25 rounded-md text-black bg-white">
          <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">
            <span className="text-[cadetblue]">Change Password</span>
          </div>
          <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">
            Create a new password
          </div>
          <form onSubmit={changePassword} className="flex flex-col gap-3">
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
                name="password"
                onChange={onInputChange}
                className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
              />
            </div>
            <div className="block relative">
              <label
                for="check-password"
                className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={onInputChange}
                className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
              />
            </div>
            <div className={"text-sm font-normal mb-4 text-center text-["+(formSuccess ? "cadetblue" : "red")+"]"}>
              {errorMsg}
            </div>
            <button
              type="submit"
              className="bg-[cadetblue] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
  )

  const success = (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="w-[450px] h-[fit-content] flex flex-col p-8 px-25 rounded-md text-black bg-white">
        <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">
          <span className="text-[cadetblue]">Password changed Successfully</span>
        </div>
        <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">
          Sign in to access our services.
        </div>
        <div className="text-sm text-center mt-[1.6rem]">
          Click here to ?{" "}
          <Link className="text-sm text-[cadetblue]" to="/login">
            Sign in!
          </Link>
        </div>
      </div>
    </div>
  )
  return (
      formSuccess ? success : notSuccess
  );
}
