import React, { useMemo, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { Grid } from "./Grid";
import { Photo } from "./Photo";
import { SortablePhoto } from "./SortablePhoto";
import { TiImage } from "react-icons/ti";

const DndGallery = () => {
  const [items, setItems] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [clickedIndexes, setClickedIndexes] = useState([]);
  const selectedIndexes = useMemo(() => clickedIndexes, [clickedIndexes]);
  const [isChecked, setIsChecked] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

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
              setItems([...items, ...newImages]);
            }
          };

          reader.readAsDataURL(file);
        }
      });
    });

    input.click();
    setClickedIndexes([]);
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
            setItems([...items, ...newImages]);
          }
        };

        reader.readAsDataURL(file);
      }
    }

    const draggingIndex = e.dataTransfer.getData("text");
    if (draggingIndex !== "" && index === items.length) {
      const updatedImages = [...items];
      const draggingImage = updatedImages[draggingIndex];
      updatedImages.splice(draggingIndex, 1);
      updatedImages.splice(index, 0, draggingImage);
      setItems(updatedImages);
    }
  };
  //   handle drag drop item end

  //   handle delete start
  const handleDelete = () => {
    const updatedImages = items.filter(
      (image, index) => !clickedIndexes.includes(index)
    );
    setItems(updatedImages);
    setClickedIndexes([]);
  };
  //   handle delete end

  return (
    <div className="container mx-auto rounded-lg shadow-md bg-white">
      <div className="flex items-center justify-between border-b-2 py-5 px-10">
        <div>
          {selectedIndexes?.length > 0 ? (
            <span className="flex items-center gap-5">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => {
                  setIsChecked(!isChecked);
                }}
                className={`rounded-sm h-5 w-5 hover:cursor-pointer ${
                  isChecked
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-[#00000040]"
                }`}
              />
              <h1 className="text-2xl font-bold">
                <span>{selectedIndexes?.length}</span> Files Selected
              </h1>{" "}
            </span>
          ) : (
            <h1 className="text-2xl font-bold">Gallery</h1>
          )}
        </div>
        <div>
          <button disabled={!isChecked} className={`${isChecked ? "text-red-500 font-semibold" : "font-medium text-slate-700 cursor-not-allowed"}`} onClick={handleDelete}>
            Delete Files
          </button>
        </div>
      </div>
      <div className="sm:p-10">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext items={items} strategy={rectSortingStrategy}>
            <Grid columns={5}>
              {items.map((url, index) => (
                <SortablePhoto
                  key={url}
                  url={url}
                  index={index}
                  clickedIndexes={clickedIndexes}
                  setClickedIndexes={setClickedIndexes}
                  selectedIndexes={selectedIndexes}
                />
              ))}
              {/* add image box */}
              <div
                className="box rounded-md border-2 border-dashed h-[200px] hover:cursor-pointer flex justify-center items-center"
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => handleDropItem(e, items.length)}
                onClick={handleAddImage}
              >
                <div>
                  <TiImage size={25} className="mx-auto mb-4" />
                  <p className="font-medium">Add Images</p>
                </div>
              </div>
            </Grid>
          </SortableContext>

          <DragOverlay adjustScale={true}>
            {activeId ? (
              <Photo url={activeId} index={items.indexOf(activeId)} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
  }
};

export default DndGallery;
