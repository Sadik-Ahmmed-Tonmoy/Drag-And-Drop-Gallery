import React from "react";
import "./ImageGallery.scss";
import { DndContext, closestCenter, PointerSensor, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { SortableItem } from "../SortableItem/SortableItem";

 

const ImageGallery = () => {
  

  const [droppedImages, setDroppedImages] = useState([]);
  let clickedIndexes =[]
  console.log(clickedIndexes);

 

  //   handle add image start
  const handleAddImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;

    input.addEventListener("change", (e) => {
      const selectedFiles = Array.from(e.target.files);

      const newImages = [];

      selectedFiles.forEach((file) => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();

          reader.onload = (event) => {
            const imageUrl = event.target.result;
            newImages.push(imageUrl);

            if (newImages.length === selectedFiles.length) {
              setDroppedImages([...droppedImages, ...newImages]);
            }
          };

          reader.readAsDataURL(file);
        }
      });
    });

    input.click();
  };
  //   handle add image end

  //   handle drag over start
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  //   handle drag over end

  //   handle drag drop item start
  const handleDropItem = (e, index) => {
    e.preventDefault();
    const files = e.dataTransfer.files;

    const newImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onload = (event) => {
          const imageUrl = event.target.result;
          newImages.push(imageUrl);
          if (i === files.length - 1) {
            setDroppedImages([...droppedImages, ...newImages]);
          }
        };

        reader.readAsDataURL(file);
      }
    }

    const draggingIndex = e.dataTransfer.getData("text");
    if (draggingIndex !== "" && index === droppedImages.length) {
      const updatedImages = [...droppedImages];
      const draggingImage = updatedImages[draggingIndex];
      updatedImages.splice(draggingIndex, 1);
      updatedImages.splice(index, 0, draggingImage);
      setDroppedImages(updatedImages);
    }
  };
  //   handle drag drop item end


    //   handle delete start
    const handleDelete = () => {
      const updatedImages = droppedImages.filter((image, index) => !clickedIndexes.includes(index));
      setDroppedImages(updatedImages);
    };
    
    //   handle delete end

    // enable onclick for drag drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )
  return (
    <div className="container mx-auto rounded-lg shadow-md border m-2">
      <div className="flex items-center justify-between border-b-2 py-5 px-10">
        <div>
          <h1 className="text-2xl font-bold"> Files Selected</h1>
        </div>
        <div>
          <button className="text-red-500 font-semibold" onClick={handleDelete}>Delete Files</button>
        </div>
      </div>
      <div className="p-10">
        <DndContext
        sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div>
            <SortableContext
              items={droppedImages}
              strategy={rectSortingStrategy}
            >
              <div className="gallery grid grid-cols-4 gap-1">
                {droppedImages.map((item, index) => (
                  <div className="box" key={index}>
                    <SortableItem id={item} item={item} index={index} clickedIndexes={clickedIndexes}/>
                  </div>
                ))}
                {/* add image box */}
                <div
                  className="box w-56  rounded-md border"
                  onDragOver={(e) => handleDragOver(e)}
                  onDrop={(e) => handleDropItem(e, droppedImages.length)}
                >
                  <div className="icon-and-functionality">
                    <span className="icon">Icon</span>
                    <button onClick={handleAddImage}>Do Something</button>
                  </div>
                </div>
              </div>
            </SortableContext>
          </div>
        </DndContext>
      </div>
    </div>
  );

  function handleDragEnd(event) {
    // console.log("Drag end called");
    const { active, over } = event;
    // console.log("ACTIVE: " + active.id);
    // console.log("OVER :" + over.id);

    if (active.id !== over.id) {
      setDroppedImages((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);
        // console.log(arrayMove(items, activeIndex, overIndex));
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  }
};

export default ImageGallery;
