import { createContext } from "react";

export const AppContext = createContext({
  currentArticleId: '',
  setCurrentArticleId: (id) => {},
});