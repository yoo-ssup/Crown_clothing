import { createContext, useState, useEffect } from "react";

import { onAuthStateChangedListener, createUserDocumentFromAuth, signOutUser } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); //Actual Storage
  const value = { currentUser, setCurrentUser };

  useEffect(()=>{   //Call for the actual storage
    const unsubscribe = onAuthStateChangedListener((user)=>{
      if(user){
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user); 
    });
  
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};