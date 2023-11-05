import React, { forwardRef, useState } from "react";
import CheckBox from "../CheckBox/CheckBox";

export const Photo = forwardRef(
  ({ url, index, faded, style, ...props }, ref) => {
    const selectedIndexes = props?.clickedIndexes;
    console.log(props.clickedIndexes);
    const [isOverlay, setIsOverlay] = useState(false);
    // Check if the clickedIndexes array includes the current index
    const isClicked = selectedIndexes.includes(index);
    console.log(isClicked);
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
      border: "1px solid black",
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
      >
        {(isOverlay || isClicked) ? (
          <div>
            <CheckBox {...props} index={index} />
          </div>
        ) : null}
      </div>
    );
  }
);
