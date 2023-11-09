import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import LeftSide from "../components/left-side/LeftSide";
import RightSide from "../components/right-side/RightSide";
import { auth, db } from "../firebase.config";
import {
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ChatApplication = () => {
  const navigate = useNavigate();

  const [userSelected, setUserSelected] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("uid"));
  console.log(currentUser, userSelected);

  const handleSelectUser = async (selectedUser, user) => {
    setUserSelected(selectedUser);
    if (window.innerWidth < 600 && user !== "user") {
      setMobile(true);
    }
    if (user === "user") {
      const combinedId =
        currentUser.uid < selectedUser.userUID
          ? `${currentUser.uid}_${selectedUser.userUID}`
          : `${selectedUser.userUID}_${currentUser.uid}`;
      console.log({ combinedId });
      try {
        const chatDoc = doc(db, "chats", combinedId);
        const chatDocSnapshot = await getDoc(chatDoc);

        if (!chatDocSnapshot.exists()) {
          await setDoc(chatDoc, { messages: [] });
        }

        const currentUserChatDoc = doc(db, "userChats", currentUser.uid);
        await updateDoc(currentUserChatDoc, {
          [combinedId]: {
            userInfo: {
              uid: selectedUser.userUID,
              userName: selectedUser.userName,
              userImg: selectedUser.userImg,
            },
            data: serverTimestamp(),
          },
        });

        const selectedUserChatDoc = doc(db, "userChats", selectedUser.userUID);
        await updateDoc(selectedUserChatDoc, {
          [combinedId]: {
            userInfo: {
              uid: currentUser.uid,
              userName: currentUser.displayName,
              userImg: currentUser.photoURL,
            },
            data: serverTimestamp(),
          },
        });
      } catch (error) {
        console.error("Error selecting user:", error);
      }
    }
  };

  const [chatting, setChatting] = useState([]);

  useEffect(() => {
    const getChats = () => {
      const unSub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChatting(doc.data());
      });

      return () => {
        unSub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const [mobile, setMobile] = useState(false);

  return (
    <div className="absolute transform sm:translate-x-[25%] translate-x-0 sm:translate-y-10 translate-y-0 z-10 bg-transparent select-none">
      <div className="relative flex justify-center items-center">
        <div className="sm:w-[60rem] sm:h-[40rem] w-full m-2 h-[45rem] bg-white rounded-3xl  flex overflow-hidden">
          <Sidebar />
          <div className="w-full h-full sm:grid hidden grid-cols-3">
            <LeftSide chatting={chatting} handleSelectUser={handleSelectUser} />
            <div className="col-span-2 sm:flex hidden">
              <RightSide
                selectedUser={userSelected}
                chatting={chatting}
                setChatting={setChatting}
              />
            </div>
          </div>
          <div className="sm:hidden w-full h-full">
            {!mobile ? (
              <LeftSide
                chatting={chatting}
                handleSelectUser={handleSelectUser}
              />
            ) : (
              <RightSide
                setMobile={setMobile}
                selectedUser={userSelected}
                chatting={chatting}
                setChatting={setChatting}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApplication;
