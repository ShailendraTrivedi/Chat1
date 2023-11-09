import React, { useState } from "react";
import SignIn from "../components/signin/SignIn";
import SignUp from "../components/signup/SignUp";

const Auth = () => {
  const [flag, setFlag] = useState(true);
  return (
    <>
      <div className="bg-transparent">
        {flag ? (
          <div className="absolute transform sm:translate-x-[100%] translate-x-0 translate-y-20 z-10 bg-transparent select-none">
            <SignIn setFlag={setFlag} />
          </div>
        ) : (
          <div className="absolute transform sm:translate-x-[100%] translate-x-0 sm:translate-y-10 translate-y-10 z-10 bg-transparent select-none">
            <SignUp setFlag={setFlag} />
          </div>
        )}
      </div>
    </>
  );
};

export default Auth;
