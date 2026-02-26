"use client";

import { createContext, useContext, useState } from "react";

export const CanvasContext = createContext(null);

export const CanvasProvider = ({ children }) => {
  const [canvasEditor, setCanvasEditor] = useState(null);
  const [activeTool, setActiveTool] = useState(null);

  return (
    <CanvasContext.Provider
      value={{
        canvasEditor,
        setCanvasEditor,
        activeTool,
        setActiveTool,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error("useCanvas must be used inside CanvasProvider");
  }
  return context;
};