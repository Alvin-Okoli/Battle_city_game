import { createContext, useState, useContext } from "react";

// Create the context
export const ScoreContext = createContext();

// Provider component that wraps your app
export const AuthProvider = ({ children }) => {
  const [score, setScore] = useState(0);

  const value = {
    score,
    setScore,
  };

  return (
    <ScoreContext.Provider value={value}>
      {children}
    </ScoreContext.Provider>
  );
};
