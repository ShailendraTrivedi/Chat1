import { signInWithEmailAndPassword } from "firebase/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { auth } from "../../firebase.config";
import { useNavigate } from "react-router-dom";

/** Firbase */

const SignIn = ({ setFlag }) => {
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.userEmail,
        values.userPassword
      );
      const user = userCredential.user;
      localStorage.setItem("uid", JSON.stringify(user));
      navigate("/chat");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/user-not-found") {
        console.log("User not found error: " + errorMessage);
      } else if (errorCode === "auth/wrong-password") {
        console.log("Wrong password error: " + errorMessage);
      } else {
        console.error("Firebase error: " + errorCode, errorMessage);
      }
    }
  };

  return (
    <div className="sm:w-[30rem] w-full bg-white rounded p-2 m-2">
      <Formik
        initialValues={{
          userEmail: "",
          userPassword: "",
        }}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="flex flex-col gap-10 justify-center items-center sm:p-5 h-full w-full">
            <div className="w-full h-full space-y-5 rounded-2xl p-5">
              <div className="text-3xl text-center font-bold">Login</div>
              <div className="space-y-1">
                <label htmlFor="" className="">
                  Email
                </label>
                <Field
                  name="userEmail"
                  type="text"
                  className="blader w-full focus:outline-none p-1 px-2"
                  placeholder="Enter your email address..."
                />
                <ErrorMessage
                  name="userEmail"
                  component="div"
                  className="text-[10px] text-[red]"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="" className="">
                  Password
                </label>
                <Field
                  name="userPassword"
                  type="password"
                  className="blader w-full focus:outline-none p-1 px-2"
                  placeholder="Enter your password..."
                />
                <ErrorMessage
                  name="userEmail"
                  component="div"
                  className="text-[10px] text-[red]"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-[rgb(0,171,228)] text-white p-2 w-[10rem]"
                >
                  Login
                </button>
              </div>
            </div>
            <hr className="border-2 border-[rgb(0,171,228)] w-full" />
            <div
              className="bg-[rgb(0,171,228)]  text-white p-2 w-[10rem] text-center rounded cursor-pointer"
              onClick={() => setFlag(false)}
            >
              Register
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;
