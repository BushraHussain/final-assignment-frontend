import React, { useState, createContext } from "react";

// Create Context Object
export const IdContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const IdContextProvider = props => { // for title 

  const [title, setTitle] = useState([]);

  return (
    <IdContext.Provider value={[title, setTitle]}>
      {props.children}
    </IdContext.Provider>
  );
};
