import { createContext, useContext } from 'react';

import { usePrompt } from 'hooks/usePrompt';

const PromptContext = createContext<ReturnType<typeof usePrompt> | null>(null);

export default function PromptContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const promptState = usePrompt();
  return (
    <PromptContext.Provider value={promptState}>
      {children}
    </PromptContext.Provider>
  );
}

export function usePromptContext() {
  const context = useContext(PromptContext);
  if (!context) {
    throw new Error(
      'usePromptContext must be used within a PromptContextProvider'
    );
  }
  return context;
}
