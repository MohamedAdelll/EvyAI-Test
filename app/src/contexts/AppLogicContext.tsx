import { createContext, useContext } from 'react';

import { useAppLogic } from '../hooks/useAppLogic';

const AppLogicContext = createContext<ReturnType<typeof useAppLogic> | null>(
  null
);

export const useAppLogicContext = () => {
  const context = useContext(AppLogicContext);
  if (!context) {
    throw new Error(
      'useAppLogicContext must be used within an AppLogicProvider'
    );
  }
  return context;
};

export default function AppLogicProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const appLogic = useAppLogic();
  return (
    <AppLogicContext.Provider value={appLogic}>
      {children}
    </AppLogicContext.Provider>
  );
}
