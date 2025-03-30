// context/SelectionContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type SelectionContextType = {
  selected: any;
  setSelected: (product: any) => void;
};

const SelectionContext = createContext<SelectionContextType | undefined>(
  undefined,
);

export const SelectionProvider = ({ children }: { children: ReactNode }) => {
  const [selected, setSelected] = useState<any>(null);

  return (
    <SelectionContext.Provider value={{ selected, setSelected }}>
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (context === undefined) {
    throw new Error("useSelection must be used within a SelectionProvider");
  }
  return context;
};
