import { useState, useEffect, useRef } from "react";
import styles from "../styles/dropdown.module.css";
import deleIcon from "../assets/dropdownicon.svg";
import Image from "next/image";

const CustomDropdown = ({ options, label, handleSelect, value, setOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const dropdownRef = useRef(null); // Ref for the dropdown container

  const toggleDropdown = () => setIsOpen(!isOpen);

  const clearSelection = () => {
    setOption("");
    setIsOpen(false);
    if (
      ["Kids special", "Best Sellers", "New arrivals", "Fancy Items"].includes(
        value
      )
    ) {
      handleSelect("");
    }
  };

  const handleSelectedOption = (option) => {
    setIsOpen(false);
    handleSelect(option);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <div className={styles.selectWrapper}>
        <div className={styles.selectField} onClick={toggleDropdown}>
          {value || label}
          <span className={styles.arrowIcon}></span>
          {value && (
            <Image
              src={deleIcon}
              alt="Clear"
              onClick={(e) => {
                e.stopPropagation(); // Prevents click from bubbling up and closing the dropdown
                clearSelection();
              }}
            />
          )}
        </div>
        {isOpen && (
          <div className={styles.dropdownList}>
            {options.map((option, index) => (
              <div
                key={index}
                className={styles.dropdownItem}
                onClick={() => handleSelectedOption(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;
