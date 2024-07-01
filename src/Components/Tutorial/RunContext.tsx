import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RunContextType {
  run: boolean;
  setRun: React.Dispatch<React.SetStateAction<boolean>>;
}

const RunContext = createContext<RunContextType | undefined>(undefined);

interface RunProviderProps {
  children: ReactNode;
}

export const RunProvider: React.FC<RunProviderProps> = ({ children }) => {
  const [run, setRun] = useState<boolean>(false);

  return (
    <RunContext.Provider value={{ run, setRun }}>
      {children}
    </RunContext.Provider>
  );
};

export const useRun = () => {
  const context = useContext(RunContext);
  if (context === undefined) {
    throw new Error('useRun must be used within a RunProvider');
  }
  return context;
};

export {};