import React, { useState } from "react";

const CheckBox = ({ index, clickedIndexes, setClickedIndexes }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckBoxClick = (index) => {
    setIsChecked(!isChecked);

    if (isChecked) {
      if (clickedIndexes.includes(index)) {
        setClickedIndexes(clickedIndexes.filter((item) => item !== index));
      }
    } else {
      if (!clickedIndexes.includes(index)) {
        setClickedIndexes([...clickedIndexes, index]);
      }
    }
  };

  return (
    <div
      className={`${
        isChecked
          ? "rounded-md transition-colors duration-400 ease-in-out transform bg-[#ffffff88]"
          : "  rounded-md transition-colors duration-400 ease-in-out transform hover:bg-[#00000060]"
      } absolute top-0 left-0 w-full h-full `}
    >
      <div
        onClick={() => handleCheckBoxClick(index)}
        className="relative flex items-center m-5 hover:cursor-pointer"
      >
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => {}}
          className={`rounded-sm h-5 w-5 hover:cursor-pointer ${
            isChecked
              ? "bg-blue-600 text-white"
              : "bg-white border border-[#00000040]"
          }`}
        />
      </div>
    </div>
  );
};

export default CheckBox;
