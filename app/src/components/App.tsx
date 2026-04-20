import { Toaster } from 'sonner';

import AppHeader from './Header';
import InputContextGrid from './InputContextGrid';
import PromptWorkspace from './PromptWorkspace';

function App() {
  return (
    <div className="flex h-dvh flex-col">
      <AppHeader />
      <InputContextGrid />
      <PromptWorkspace />
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
