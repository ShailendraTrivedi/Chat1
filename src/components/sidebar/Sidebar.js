import React, { useState } from "react";

/** Icons */
import { BsChat } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineSetting } from "react-icons/ai";
import { Link } from "react-router-dom";
import Setting from "../setting/Setting";

const Sidebar = () => {
  const [clickSetting, setClickSetting] = useState(false);
  return (
    <div className="w-[5rem] bg-black flex flex-col justify-between items-center text-white h-full py-5">
      <div className="flex flex-col items-center gap-10">
        <div className="relative h-12 w-12 rounded-full bg-white">
          <img src="" alt="" className="" />
          <span className="absolute bottom-0 right-0 h-2 w-2 bg-[green] m-1 rounded-full" />
        </div>
        <div className="flex flex-col gap-5">
          <Link to="/profile">
            <FaRegUser size={25} />
          </Link>
          <Link to="/chat">
            <BsChat size={25} />
          </Link>
        </div>
      </div>
      <div className="relative">
        <AiOutlineSetting
          size={30}
          onClick={() => setClickSetting(!clickSetting)}
        />
        {clickSetting && <Setting />}
      </div>
    </div>
  );
};

export default Sidebar;
