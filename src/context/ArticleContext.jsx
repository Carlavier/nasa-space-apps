import React, { useState } from 'react';
import { AppContext } from './AppContext';

export const AppProvider = ({ children }) => {
  const [currentArticleId, setCurrentArticleId] = useState('');

  return (
    <AppContext.Provider value={{ currentArticleId, setCurrentArticleId }}>
      {children}
    </AppContext.Provider>
  );
};
