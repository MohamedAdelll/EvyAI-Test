import { useState } from 'react';

export function usePrompt() {
  const [_prompt, setPrompt] = useState('');

  function updatePrompt(newPrompt: string) {
    setPrompt((prev) => {
      if (prev.length === 0) return newPrompt;
      return `${prev} ${newPrompt}`;
    });
  }

  return {
    prompt: _prompt,
    updatePrompt,
    resetPrompt: () => setPrompt(''),
    setPrompt
  };
}
