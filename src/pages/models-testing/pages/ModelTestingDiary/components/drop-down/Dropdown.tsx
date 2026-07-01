import React, { useState, useRef, useEffect } from "react";
import "./Dropdown.css";

interface DropdownProps {
    title: string
    selected: string | number
    setSelected: (newValue: string | number) => void
    options: (string | number)[]
}

const Dropdown: React.FC<DropdownProps> = ({title, selected, setSelected, options}) => {
  const [isOpen, setIsOpen] = useState(false);
//   const [selected, setSelected] = useState("Tất cả");
  const dropdownRef = useRef<HTMLDivElement>(null);

//   const options = ["Tất cả", "Nhắc nhở", "Sự cố", "Khuyến nghị"];

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: string | number) => {
    setSelected(option);
    setIsOpen(false);
  };

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <label className="dropdown-label">{title}</label>
      <div className="dropdown-selected" onClick={toggleDropdown}>
        <span className="dropdown-text">{selected}</span>
        <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>▲</span>
      </div>

      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((opt) => (
            <li
              key={opt}
              className={`dropdown-item ${opt === selected ? "active" : ""}`}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
