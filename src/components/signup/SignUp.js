import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import InputHelper from "../../helper/Input.helper";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const SignUp = ({ setFlag }) => {
  const [userImg, setUserImg] = useState(null);

  const handleSubmit = async (values) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        values.userEmail,
        values.userPassword
      );

      const storageRef = ref(storage, response.user.uid);
      const uploadTask = uploadBytesResumable(storageRef, userImg);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.error("Error uploading image:", error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          await updateProfile(response.user, {
            displayName: values.userName,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, "users", response.user.uid), {
            userUID: response.user.uid,
            userName: values.userName,
            userEmail: values.userEmail,
            userImg: downloadURL,
            userStatus: "",
            userPhoneNumber: "",
          });

          await setDoc(doc(db, "userChats", response.user.uid), {});

          toast.success("Account Created Successfully");
        }
      );
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="sm:w-[30rem] w-full bg-white rounded p-2 m-0">
      <Formik
        initialValues={{
          userName: "",
          userEmail: "",
          userPassword: "",
          confirmPassword: "",
          userProfileImg: null,
        }}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="flex flex-col gap-2 justify-center items-center sm:p-5 h-full w-full">
            <div className="w-full h-full space-y-5 rounded p-5">
              <div className="text-3xl text-center font-bold">Register</div>
              <InputHelper
                name="userName"
                label="Name"
                type="text"
                placeholder="Enter your name"
              />
              <InputHelper
                name="userEmail"
                label="Email"
                type="text"
                placeholder="Enter your email address"
              />
              <InputHelper
                name="userPassword"
                label="Password"
                type="password"
                placeholder="Enter your Password"
              />
              <InputHelper
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Re-write your password"
              />
              <div className="space-y-1">
                <label htmlFor="userProfileImg">Upload Image</label>
                <input
                  id="userProfileImg"
                  type="file"
                  className="blader w-full focus:outline-none p-1 px-2"
                  onChange={(e) => setUserImg(e.target.files[0])}
                />
                <ErrorMessage
                  name="userProfileImg"
                  component="div"
                  className="text-[10px] text-[red]"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-[rgb(0,171,228)] p-2 text-white w-[10rem] text-center rounded cursor-pointer"
                >
                  Register
                </button>
              </div>
            </div>
            <hr className="w-full border-2 border-[rgb(0,171,228)]" />
            <div
              className="bg-[rgb(0,171,228)] p-2 text-white w-[10rem] text-center rounded cursor-pointer"
              onClick={() => setFlag(true)}
            >
              Login
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
