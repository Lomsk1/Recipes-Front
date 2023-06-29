"use client";
import { ReactEventHandler } from "react";

function AddButton({
  name,
  addFunction,
}: {
  name: string;
  addFunction: ReactEventHandler;
}) {
  return (
    <div className="add_button">
      <button onClick={addFunction}>{name}</button>
    </div>
  );
}

export default AddButton;
