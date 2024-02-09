import React, { useState } from "react";
import EmailRegistration from "../Register/EmailRegistration";
import ChangePassword from "./ChangePassword";

function ForgetPasswordDone({email}) {
  const [emailVerified, setEmailVerified] = useState(false);
  return (
    <div className="h-[90vh] flex items-center justify-center">
      {emailVerified ? (
        <ChangePassword email={email}/>
      ) : (
        console.log(email) ||
        <EmailRegistration
          email={email}
          emailVerified={emailVerified}
          setEmailVerified={setEmailVerified}
          retry={"/forget-password"}
          path={"forget-password/validate-otp"}
        />
      )}
    </div>
  );
}

export default ForgetPasswordDone;
