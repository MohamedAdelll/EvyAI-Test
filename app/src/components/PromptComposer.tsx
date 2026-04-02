import PromptComposerToolbar from './PromptComposerToolbar';

export default function PromptComposer() {
  return (
    <div className="border-primary-border hover:border-primary-border-hover/50 focus-within:border-primary-border-hover/50 hover:focus-within:border-primary-border sticky bottom-0 flex w-full flex-col rounded-lg border mb-2">
      <textarea
        className="resize-none rounded-lg px-3 py-2 text-xs focus:outline-none"
        placeholder="Enter a prompt or select a template here"
        maxLength={10000}
        name="prompt"
        id="prompt"
      ></textarea>
      <PromptComposerToolbar />
    </div>
  );
}
