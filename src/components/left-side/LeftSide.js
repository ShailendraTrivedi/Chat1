import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { BsSearch } from "react-icons/bs";
import { db } from "../../firebase.config";

const LeftSide = ({ chatting, handleSelectUser }) => {
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchText) {
        const q = query(
          collection(db, "users"),
          where("userName", "==", searchText)
        );
        try {
          const querySnapshot = await getDocs(q);
          const usersData = [];
          querySnapshot.forEach((doc) => {
            usersData.push(doc.data());
          });
          setUsers(usersData);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    };
    handleSearch();
  }, [searchText]);

  function convertTimestampToTimeWithAMPM(timestampInSeconds) {
    if (!timestampInSeconds) {
      return null;
    }

    const date = new Date(timestampInSeconds * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  function isTimeDifferenceLessThan2Minutes(chatTimeInSeconds) {
    if (!chatTimeInSeconds) {
      return null;
    }
    const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);

    const timeDifferenceInSeconds = currentTimeInSeconds - chatTimeInSeconds;

    return timeDifferenceInSeconds < 120;
  }

  return (
    <div>
      <div className="w-full h-full p-5 overflow-y-scroll bg-gray-50 select-none">
        <div className="space-y-10">
          <div className="relative">
            <span className="absolute top-3 left-3">
              <BsSearch size={20} />
            </span>
            <input
              type="text"
              className="input w-full ps-10 p-2 rounded-full"
              placeholder="Search User Here..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            {users.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  handleSelectUser(item, "user");
                }}
                className="flex gap-2 items-center px-5 w-full hover:bg-gray-200 rounded p-2"
              >
                <div className="relative h-12 w-12 rounded-full bg-black">
                  <img
                    className="h-full w-full object-cover rounded-full"
                    src={item.userImg}
                    alt={item.userName}
                  />
                  {item.online && (
                    <span className="absolute bottom-0 right-0 h-2 w-2 bg-[green] m-1 rounded-full" />
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="text-xl">{item.userName}</div>
                </div>
              </div>
            ))}

            {Object.entries(chatting).map(([_, chatInfo], i) => {
              const timestampInSeconds = chatInfo.date?.seconds;

              const formattedTime =
                convertTimestampToTimeWithAMPM(timestampInSeconds);

              return (
                <div
                  key={i}
                  onClick={() => handleSelectUser(chatInfo.userInfo)}
                  className="grid grid-cols-4 w-full hover:bg-gray-200 rounded p-2"
                >
                  <div className="relative blader h-12 w-12 rounded-full bg-black">
                    {chatInfo.userInfo?.userImg && (
                      <img
                        className="h-full w-full object-cover rounded-full"
                        src={chatInfo.userInfo.userImg}
                        alt={chatInfo.userInfo.userName}
                      />
                    )}
                    {isTimeDifferenceLessThan2Minutes(timestampInSeconds) && (
                      <div className="absolute bottom-[-5px] right-[-5px] h-3 w-3 bg-[green] m-1 rounded-full" />
                    )}
                  </div>
                  <div className=" col-span-3 flex flex-col w-full">
                    <div className="text-xl">{chatInfo.userInfo?.userName}</div>
                    <div className="text-sm text-gray-500 flex justify-between">
                      <span>
                        {" "}
                        {chatInfo.lastMessage?.text.substring(0, 10)}....
                      </span>
                      {formattedTime && <span>{formattedTime}</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
