import React, { useState } from "react";

const CheckBox = ({ index, clickedIndexes }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckBoxClick = () => {
    setIsChecked(!isChecked);
    if (isChecked === true) {
      if (clickedIndexes.includes(index)) {
        clickedIndexes.splice(clickedIndexes.indexOf(index), 1);
      }
    } else {
      if (!clickedIndexes.includes(index)) {
        clickedIndexes.push(index);
      }
    }

    // console.log("Clicked Indexes:", clickedIndexes);
  };

  return (
    <div
      className={`${
        isChecked ? "bg-[#ffffff60]" : " bg-[#00000060]"
      } absolute top-0 left-0 w-full h-full `}
    >
      <div
        onClick={handleCheckBoxClick}
        className="relative flex items-center m-3 hover:cursor-pointer"
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
