import React, { useState, createContext } from "react";

// Create Context Object
export const TitleContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const TitleContextProvider = props => {

  const [NftID, setNftID] = useState(``);

  return (
    <TitleContext.Provider value={[NftID, setNftID]}>
      {props.children}
    </TitleContext.Provider>
  );
};
