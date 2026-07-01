import React from "react";
import "./PopupLoading.css";

interface PopupLoadingProps {
  message?: string;
}

const PopupLoading: React.FC<PopupLoadingProps> = ({ message }) => {
  return (
    <div className="loadingPopup__backdrop">
      <div className="loadingPopup__box">
        <div className="loadingPopup__spinner" />
        <p className="loadingPopup__text">{message || "Đang xử lý..."}</p>
      </div>
    </div>
  );
};

export default PopupLoading;
