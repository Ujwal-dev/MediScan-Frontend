import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import EmailRegistration from './EmailRegistration';

export default function RegisterDone({email}) {
  
  const [emailVerified , setEmailVerified ] = useState(false)

  const successRegistration = (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="w-[450px] h-[fit-content] flex flex-col p-8 px-25 rounded-md text-black bg-white">
        <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">
          <span className="text-[cadetblue]">Registration Successful</span>
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
  );

  
  return (
    <div>
      {
        emailVerified ? 
          successRegistration 
            :
          <EmailRegistration 
            email={email} 
            emailVerified={emailVerified} 
            setEmailVerified={setEmailVerified}
            path={"validate-otp"}
            retry={"/register"}
          />
      }
    </div>
  )
}
