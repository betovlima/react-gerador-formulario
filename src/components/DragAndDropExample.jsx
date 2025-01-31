import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrag, useDrop } from "react-dnd";

const DraggableItem = ({ name, index, options }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ITEM",
    item: { name, index, options },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      {name}
      <div>
        {options.map((option, optionIndex) => (
          <label key={optionIndex}>
            <input
              type="radio"
              name={`question-${index}`}
              value={option}
            />{" "}
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

const DropZone = ({ items, setItems }) => {
  const [, drop] = useDrop(() => ({
    accept: "ITEM",
    drop: (item, monitor) => {
      setItems((prevItems) => [...prevItems, item]);
    },
  }));

  return (
    <div
      ref={drop}
      style={{
        border: "1px dashed #ccc",
        minHeight: "200px",
        padding: "10px",
      }}
    >
      {items.map((item, index) => (
        <div key={index}>
          {item.name}
          <div>
            {item.options.map((option, optionIndex) => (
              <label key={optionIndex}>
                <input
                  type="radio"
                  name={`dropped-question-${index}`}
                  value={option}
                />{" "}
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}
      Arraste os itens aqui
    </div>
  );
};

const DragAndDropExample = () => {
  const [draggableItems, setDraggableItems] = useState([
    { name: "Item com Sim/Não", options: ["Sim", "Não"] },
    {
      name: "Item com Sim/Não/Não se aplica",
      options: ["Sim", "Não", "Não se aplica"],
    },
  ]);
  const [droppedItems, setDroppedItems] = useState([]);

  const removeFromList = (index) => {
    setDraggableItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.splice(index, 1);
      return newItems;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, padding: "10px" }}>
          <h2>Elementos Arrastáveis</h2>
          {draggableItems.map((item, index) => (
            <DraggableItem
              key={index}
              name={item.name}
              index={index}
              options={item.options}
            />
          ))}
        </div>
        <div style={{ flex: 1, padding: "10px" }}>
          <h2>Zona de Soltura</h2>
          <DropZone items={droppedItems} setItems={setDroppedItems} />
        </div>
      </div>
    </DndProvider>
  );
};

export default DragAndDropExample;