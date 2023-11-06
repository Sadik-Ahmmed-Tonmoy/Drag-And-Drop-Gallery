import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import { useState } from "react";
import CheckBox from "../CheckBox/CheckBox";

export function SortableItem({id, item, index, selectedIndexes}) {
    const [isOverlay, setIsOverlay] = useState(false);
    const handleMouseEnter = () => {
        setIsOverlay(true);
      };
    
      const handleMouseLeave = () => {
        setIsOverlay(false);
      };
    
      // Check if the clickedIndexes array includes the current index
      // const isClicked = clickedIndexes.includes(index);
      // const isClicked = selectedIndexes?.includes(index)

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="h-full" ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <img src={item} alt=""/>
            
            {isOverlay
            //  || isClicked
              ? (
        <div>
          {/* <CheckBox index={index} clickedIndexes={clickedIndexes} /> */}
        </div>
      ) : null}
        </div>
    )
}