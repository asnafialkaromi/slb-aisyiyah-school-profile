import React from "react";

function Toast({ type = "success", message }) {
  if (!message) return null;

  const base = "alert shadow-lg text-white";
  const colorMap = {
    success: "alert-success",
    error: "alert-error",
    warning: "alert-warning",
    info: "alert-info",
  };

  return (
    <div className="toast toast-top toast-center z-50">
      <div className={`${base} ${colorMap[type]}`}>
        <span>{message}</span>
      </div>
    </div>
  );
}

export default Toast;
