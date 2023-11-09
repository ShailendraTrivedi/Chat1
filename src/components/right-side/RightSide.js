import React, { useEffect, useState } from "react";
import NoChat from "./NoChat";
import PersonalChat from "./PersonalChat";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase.config";
import { AiOutlineArrowLeft } from "react-icons/ai";

const RightSide = ({ selectedUser, chatting, setChatting, setMobile }) => {
  const [message, setMessage] = useState([]);
  const [idSelected, setIdSelected] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("uid"));

  useEffect(() => {
    const fetchChatMessages = async () => {
      if (selectedUser) {
        const combinedId =
          currentUser.uid < selectedUser.uid
            ? `${currentUser.uid}_${selectedUser.uid}`
            : `${selectedUser.uid}_${currentUser.uid}`;
        setIdSelected(combinedId);
        const unsubscribe = onSnapshot(doc(db, "chats", combinedId), (doc) => {
          if (doc.exists()) {
            setMessage(doc.data().messages || []);
          }
        });

        return () => {
          unsubscribe();
        };
      }
    };

    fetchChatMessages();
  }, [selectedUser, currentUser.uid]);

  return (
    <>
      {selectedUser === null ? (
        <div className="flex justify-center items-center w-full h-full">
          <NoChat />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col">
          <div className="flex gap-2 items-center sm:px-5 w-full bg-gray-200 rounded p-2">
            <AiOutlineArrowLeft
              onClick={() => setMobile(false)}
              className="sm:hidden block"
              size={25}
            />
            <div className="relative h-12 w-12 rounded-full bg-black">
              <img
                className="h-full w-full object-cover rounded-full"
                src={selectedUser.userImg}
                alt={selectedUser.userName}
              />
              {selectedUser.online && (
                <span className="absolute bottom-0 right-0 h-2 w-2 bg-[green] m-1 rounded-full" />
              )}
            </div>
            <div className="flex flex-col">
              <div className="text-xl">{selectedUser.userName}</div>
              <div className="text-gray-500">{selectedUser.type}</div>
            </div>
          </div>
          <PersonalChat
            selectedUser={selectedUser}
            currentUser={currentUser}
            idSelected={idSelected}
            message={message}
          />
        </div>
      )}
    </>
  );
};

export default RightSide;
