// IconBackgroundAnimation.js (React Component)

import React, { useEffect } from "react";
import "./IconBackgroundAnimation.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const IconBackgroundAnimation = () => {
  useEffect(() => {
    const iconClasses = [
      "fa-comment",
      "fa-comments",
      "fa-comment-alt",
      "fa-comment-dots",
      "fa-comment-slash",
      "fa-comment-medical",
      "fa-comment-dots",
      "fa-comment-dollar",
      "fa-commenting",
    ];

    const rowCount = 100;

    const backgroundSection = document.getElementById("background-section");

    for (let i = 0; i < rowCount; i++) {
      const newRow = document.createElement("div");
      newRow.classList.add("row");

      for (let j = 0; j < 10; j++) {
        for (let iconClass of iconClasses) {
          const newIcon = document.createElement("i");
          newIcon.className = `fa ${iconClass}`;
          newIcon.setAttribute("aria-hidden", "true");
          newRow.appendChild(newIcon);
        }
      }

      backgroundSection.appendChild(newRow);
    }
  }, []);

  return (
    <section id="background-section" className="sm:max-h-screen ">
      {/* Rows and icons will be added dynamically */}
    </section>
  );
};

export default IconBackgroundAnimation;
