import React, { useState, createContext } from "react";

// Create Context Object
export const TokenContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const TokenContextProvider = props => {

  const [tokenId, setTokenID] = useState([
      {
        id: null,
        title:null,
        description:null,
        image:null,
        price: null,
       
      }
  ]);

  return (
    <TokenContext.Provider value={[tokenId, setTokenID]}>
      {props.children}
    </TokenContext.Provider>
  );
};
