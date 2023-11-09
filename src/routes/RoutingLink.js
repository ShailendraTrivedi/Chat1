import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ChatApplication from "../pages/ChatApplication";
import Auth from "../pages/Auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config";
import Setting from "../components/setting/Setting";
import Profile from "../components/profile/Profile";

const RoutingLink = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/chat" element={<ChatApplication />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default RoutingLink;
