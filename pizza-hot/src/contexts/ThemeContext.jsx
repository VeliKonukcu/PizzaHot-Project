import { createContext, useReducer } from "react";
import themeReducer from "../reducers/themeReducer";

export const ThemeContext = createContext({});

export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, {
    theme: "primary",
    mode: "light",
  });

  function setTheme(theme) {
    dispatch({ type: "SET_THEME", payload: theme });
  }

  const setMode = (mode) => {
    dispatch({ type: "SET_MODE", payload: mode });
  };

  return (
    <ThemeContext.Provider value={{ ...state, setTheme, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
