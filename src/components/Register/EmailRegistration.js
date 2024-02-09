import axios from 'axios';
import React, { useState } from 'react';
import OTPField from './OTPField';
import { Link } from 'react-router-dom';

function EmailRegistration({ email, emailVerified, setEmailVerified, retry, path }) {
  const [otp, setOtp] = useState(Array(5).fill(''));
  const [msg, setMsg] = useState('');

  const verifyOTP = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const url = "https://mediscan-backend.onrender.com/" + path;
    const data = {
      "email": email,
      "otp": otp.join(''), // Convert array to string
    };

    try {
      const response = await axios.post(url, data);
      setMsg(response.data);
      setEmailVerified(true);
    } catch (error) {
      setMsg(error.response.data);
    }
  };

  return (
    <div className="h-[90vh] py-[20px] flex items-center justify-center">
      <div className="w-[350px] h-[fit-content] flex flex-col p-8 px-25 rounded-md text-black bg-white">
        <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">
          <span className="text-[cadetblue]">OTP Verification</span>
        </div>
        <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">
          An OTP has been sent to your email.
        </div>
        <form onSubmit={verifyOTP} className="flex flex-col gap-3">
          <div className="block relative">
            <OTPField setOtp={setOtp} otp={otp} numInputs={5} />
          </div>

          <div className={`text-sm font-normal mb-4 text-center text-${emailVerified ? 'cadetblue' : 'red'}`}>
            {msg}
          </div>
          {
            msg === "Time Expired!" ?

            (<Link to={retry}><button
                className="bg-[red] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
            >
            Retry
            </button>
            </Link>
            )
                :
            (<button
                type="submit"
                className="bg-[cadetblue] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
            >
            Verify
            </button>)
        }
        </form>
      </div>
    </div>
  );
}

export default EmailRegistration;
