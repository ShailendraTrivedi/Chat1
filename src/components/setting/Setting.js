import React from "react";
import Sidebar from "../sidebar/Sidebar";
import { AiFillCaretDown } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };
  return (
    <div
      onClick={handleLogout}
      className="absolute top-[-3rem] left-2 w-[8rem] bg-[rgb(0,170,255)] rounded"
    >
      <ul className="relative p-2">
        <li>Logout</li>
        <AiFillCaretDown className="text-[rgb(0,170,255)] absolute bottom-[-12px] left-[-2px]" />
      </ul>
    </div>
  );
};

export default Setting;
