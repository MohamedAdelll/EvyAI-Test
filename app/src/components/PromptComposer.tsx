import ArrowUp from 'assets/UI/arrow-up.svg?react';
import Copy from 'assets/UI/copy.svg?react';
import Pin from 'assets/UI/pin.svg?react';
import Trash from 'assets/UI/trash.svg?react';
import { usePromptContext } from 'contexts/PromptContext';
import { toast } from 'sonner';

import PromptComposerToolbar from './PromptComposerToolbar';

const maxLength = 10_000;
export default function PromptComposer() {
  const { prompt, setPrompt, resetPrompt } = usePromptContext();
  function copyToClipboard() {
    navigator.clipboard.writeText(prompt);
    toast.success('Copied!');
  }
  return (
    <div className="border-primary-border hover:border-primary-border-hover/10 focus-within:border-primary-border-hover/50 hover:focus-within:border-primary-border sticky bottom-0 mb-2 flex w-full flex-col rounded-lg border">
      <textarea
        className="resize-none rounded-lg px-3 py-2 text-xs focus:outline-none"
        placeholder="Enter a prompt or select a template here"
        maxLength={maxLength}
        name="prompt"
        id="prompt"
        value={prompt}
        rows={8}
        onChange={(e) => setPrompt(e.target.value)}
      ></textarea>
      {prompt.length > 0 && (
        <div className="mb-2 flex items-center px-3">
          <div className="text-typography-stale text-xs lg:text-sm">
            <span className="font-semibold tabular-nums">
              {prompt.length}/{maxLength}
            </span>
            <span> Characters</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="hover:bg-btn-bg-primary/10 cursor-pointer rounded-lg p-1 lg:[&_img:not([class*='size-'])]:size-5 [&_svg:not([class*='size-'])]:size-3 md:[&_svg:not([class*='size-'])]:size-4 lg:[&_svg:not([class*='size-'])]:size-5">
              <ArrowUp className="text-btn-bg-primary" />
            </div>
            <div className="hover:bg-btn-bg-primary/10 cursor-pointer rounded-lg p-1 lg:[&_img:not([class*='size-'])]:size-5 [&_svg:not([class*='size-'])]:size-3 md:[&_svg:not([class*='size-'])]:size-4 lg:[&_svg:not([class*='size-'])]:size-5">
              <Pin className="text-btn-bg-primary" />
            </div>
            <div
              className="hover:bg-btn-bg-primary/10 cursor-pointer rounded-lg p-1 lg:[&_img:not([class*='size-'])]:size-5 [&_svg:not([class*='size-'])]:size-3 md:[&_svg:not([class*='size-'])]:size-4 lg:[&_svg:not([class*='size-'])]:size-5"
              onClick={copyToClipboard}
            >
              <Copy className="text-btn-bg-primary" />
            </div>
            <div
              className="hover:bg-btn-bg-primary/10 cursor-pointer rounded-lg p-1 lg:[&_img:not([class*='size-'])]:size-5 [&_svg:not([class*='size-'])]:size-3 md:[&_svg:not([class*='size-'])]:size-4 lg:[&_svg:not([class*='size-'])]:size-5"
              onClick={() => resetPrompt()}
            >
              <Trash className="text-btn-bg-primary" />
            </div>
          </div>
        </div>
      )}
      <PromptComposerToolbar />
    </div>
  );
}
