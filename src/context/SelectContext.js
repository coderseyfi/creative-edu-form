import React, { createContext, useState } from "react";

const SelectContext = createContext();

const SelectProvider = ({ children }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const updateValue = (value) => {
    setSelectedValue(value);
  };

  return (
    <SelectContext.Provider value={{ selectedValue, updateValue }}>
      {children}
    </SelectContext.Provider>
  );
};

export { SelectProvider, SelectContext };
