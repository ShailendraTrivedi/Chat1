import React from "react";
import RoutingLink from "./routes/RoutingLink";
import { auth } from "./firebase.config";
import IconBackgroundAnimation from "./IconBackgroundAnimation";

const App = () => {
  return (
    <div className="relative min-h-screen ">
      <RoutingLink />
      <div className="-z-20">
        <IconBackgroundAnimation />
      </div>
    </div>
  );
};

export default App;
