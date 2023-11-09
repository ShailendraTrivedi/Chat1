import {
  Timestamp,
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React from "react";
import { AiOutlineLink, AiOutlineSend } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { db, storage } from "../../firebase.config";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { ref } from "firebase/database";
import { Field, Form, Formik } from "formik";

const handleImgSrc = () => {};

const PersonalChat = ({ selectedUser, currentUser, idSelected, message }) => {
  const handleSendMessage = async (values, { resetForm }) => {
    const { text } = values;
    resetForm();
    console.log(text);
    if (text.trim() === "") return;

    try {
      const chatDocRef = doc(db, "chats", idSelected);

      const chatDocSnapshot = await getDoc(chatDocRef);
      if (!chatDocSnapshot.exists()) {
        await setDoc(chatDocRef, { messages: [] });
      }

      await updateDoc(chatDocRef, {
        messages: arrayUnion({
          id: new Date().getTime().toString(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [idSelected + ".lastMessage"]: {
          text,
        },
        [idSelected + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", selectedUser.uid), {
        [idSelected + ".lastMessage"]: {
          text,
        },
        [idSelected + ".date"]: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="sm:h-[32.5rem] h-[38rem] py-1 px-2">
        <div className="flex flex-col gap-2 h-full w-full overflow-y-scroll">
          {message.map((item, i) => {
            return (
              <div
                key={i}
                className={`flex ${
                  item.senderId === currentUser.uid
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div className="bg-[rgb(0,171,228)] max-w-[60%] text-white rounded-xl p-2">
                  {item.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Formik
        initialValues={{
          uploadImg: null,
          text: "",
        }}
        onSubmit={(values, { resetForm }) =>
          handleSendMessage(values, { resetForm })
        }
      >
        {() => (
          <Form>
            <div className="h-[3rem] bg-gray-300 rounded-br-3xl w-full flex sm:gap-5 gap-2 items-center sm:px-5 px-3">
              <div className="w-full flex sm:gap-5 gap-2 justify-between items-center">
                <Field
                  name="text"
                  type="text"
                  className="w-full h-10 outline-none px-2"
                  placeholder="Write a message...."
                />
                <button type="submit">
                  <AiOutlineSend size={25} onClick={handleSendMessage} />
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PersonalChat;
