import React from "react";
import { Link } from "react-router-dom";

function FloatingButton() {
  const userConfirmation = () => {
    return alert("Are you sure you want to leave this page?");
  };
  return (
    <div>
      <Link
        to="/add"
        className="floating-button"
        onClick={() => userConfirmation()}
      >
        +
      </Link>
    </div>
  );
}

export default FloatingButton;
