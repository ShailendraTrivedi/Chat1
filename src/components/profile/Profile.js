import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db, storage, updateProfile } from "../../firebase.config";
import { Field, Form, Formik } from "formik";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const currentUser = JSON.parse(localStorage.getItem("uid"));

  useEffect(() => {
    const getUserDetails = async (userId) => {
      try {
        const userDocRef = doc(db, "users", userId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userDetails = userDocSnapshot.data();
          setUserDetails(userDetails);
        } else {
          console.log("User not found.");
        }
      } catch (error) {
        console.error("Error getting user details:", error);
      }
    };

    currentUser && getUserDetails(currentUser.uid);
  }, [currentUser.uid]);

  const [editOption, setEditOption] = useState(false);

  const [img, setImg] = useState(null);
  const handleSubmit = async (values) => {
    const user = auth.currentUser;

    if (user) {
      try {
        const storageRef = ref(storage, user.uid);
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.error("Error uploading image:", error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            // Update Firebase Authentication profile picture
            await updateProfile(user, {
              displayName: values.userName,
              photoURL: downloadURL,
            });

            // Update additional information in Firestore
            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, {
              userImg: downloadURL,
              userName: values.userName,
              phoneNumber: values.phoneNumber,
              status: values.status,
            });
            toast.success("Profile picture updated successfully");
            setEditOption(false);
            console.log("Profile picture updated successfully");
          }
        );
      } catch (error) {
        console.error("Error updating profile picture and Firestore:", error);
      }
    } else {
      console.error("User not signed in");
    }
  };
  return (
    <div>
      <div className="absolute transform sm:translate-x-[25%] translate-x-0 sm:translate-y-10 translate-y-0 z-10 bg-transparent select-none">
        <div className="relative flex justify-center items-center">
          <div className="sm:w-[60rem] sm:h-[40rem] w-full m-2 h-[45rem] bg-white rounded-3xl  flex overflow-hidden">
            <Sidebar />
            <div className="flex flex-col items-center justify-center w-full">
              <div className="p-10">
                <div className="text-2xl font-bold text-center">
                  User Details
                </div>
                <div className="sm:p-10 flex flex-col w-full items-center gap-5">
                  {editOption ? (
                    <>
                      <div className="">
                        <input
                          name="userImg"
                          type="file"
                          className=""
                          onChange={(event) =>
                            setImg(event.currentTarget.files[0])
                          }
                        />
                      </div>
                      <Formik
                        initialValues={{
                          // userImg: null,
                          userName: "",
                          phoneNumber: "",
                          status: "",
                        }}
                        onSubmit={(values) => handleSubmit(values)}
                      >
                        {({ setFieldValue }) => (
                          <Form className="flex flex-col gap-5">
                            <Field
                              name="userName"
                              type="text"
                              className="blader p-2"
                              placeholder="Enter your name"
                            />
                            <Field
                              name="phoneNumber"
                              type="text"
                              className="blader p-2"
                              placeholder="Enter you phone number"
                            />
                            <Field
                              name="status"
                              type="text"
                              className="blader p-2"
                              placeholder="Enter your status"
                            />
                            <div className="flex justify-around gap-5">
                              <button
                                type="submit"
                                className="w-[10rem] p-2 bg-[rgb(0,170,255)] text-white"
                              >
                                Submit
                              </button>
                              <button
                                onClick={() => setEditOption(false)}
                                className="w-[10rem] p-2 bg-[red] text-white"
                              >
                                Cancel
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </>
                  ) : (
                    <>
                      <div className="blader h-[10rem] w-[10rem] rounded-full flex justify-center items-center overflow-hidden">
                        <img
                          src={userDetails.userImg}
                          alt=""
                          className="w-full h-full object-cover "
                        />
                      </div>
                      <div className="uppercase">{userDetails.userName}</div>
                      <div className="">{userDetails.userEmail}</div>
                      {userDetails.phoneNumber && (
                        <div className="">{userDetails.phoneNumber}</div>
                      )}
                      {userDetails.status && (
                        <div className="">{userDetails.status}</div>
                      )}
                      <button
                        onClick={() => setEditOption(true)}
                        className="w-[10rem] p-2 bg-[rgb(0,170,255)] text-white"
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
