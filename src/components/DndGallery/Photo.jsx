import React, { forwardRef, useState } from "react";
import CheckBox from "../CheckBox/CheckBox";

export const Photo = forwardRef(
  ({ url, index, faded, style, ...props }, ref) => {
    // console.log('props.clickedIndexes:', props.clickedIndexes);
    // console.log('index:', index);
    const [isOverlay, setIsOverlay] = useState(false);

    // Check if the clickedIndexes array includes the current index
    const isClicked = props?.selectedIndexes?.includes(index);

    const handleMouseEnter = () => {
      setIsOverlay(true);
    };

    const handleMouseLeave = () => {
      setIsOverlay(false);
    };

    const inlineStyles = {
      position: "relative",
      opacity: faded ? "0.2" : "1",
      transformOrigin: "0 0",
      height: index === 0 ? 410 : 200,
      gridRowStart: index === 0 ? "span 2" : null,
      gridColumnStart: index === 0 ? "span 2" : null,
      backgroundImage: `url("${url}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "grey",
      borderWidth: "2px",
      borderRadius: "8px",
      ...style,
    };

    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={ref}
        style={inlineStyles}
        {...props}
        // className={`sm:${index === 0 ? "h-[410px]": "h-[200px]"}`}
      >
        {isOverlay || isClicked ? (
          <div>
            <CheckBox {...props} index={index} />
          </div>
        ) : null}
      </div>
    );
  }
);
