import React, { useState, createContext } from "react";

// Create Context Object
export const NFTContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const NFTContextProvider = props => {

  const [count, setCount] = useState([]);

  return (
    <NFTContext.Provider value={[count, setCount]}>
      {props.children}
    </NFTContext.Provider>
  );
};
