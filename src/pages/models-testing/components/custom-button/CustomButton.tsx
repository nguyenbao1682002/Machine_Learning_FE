import React from "react";
import "./CustomButton.css";

interface CustomButtonProps {
    title: string
    isActive: boolean
    onClick: () => void
}

const CustomButton: React.FC<CustomButtonProps> = ({title, isActive, onClick}) => {
    return (
        <button
        className={`custom-btn ${isActive ? "active" : ""}`}
        onClick={onClick}
        >
        {title}
        </button>
    )
}

export default CustomButton;