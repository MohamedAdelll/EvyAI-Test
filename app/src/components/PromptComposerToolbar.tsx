import America from 'assets/UI/america.svg?react';
import GPT from 'assets/UI/gpt.svg?react';
import Microphone from 'assets/UI/microphone.svg?react';
import Sidebar from 'assets/UI/sidebar.svg?react';
import Upload from 'assets/UI/upload.svg?react';
import { useAppLogicContext } from 'contexts/AppLogicContext';
import { usePromptContext } from 'contexts/PromptContext';

import ActionButton from './ActionButton';
import IconActionButton from './IconActionButton';

const iconActions = [
  {
    title: 'Upload an attachment',
    Icon: Upload
  },
  {
    title: 'Language',
    Icon: America
  },
  {
    title: 'Use AI',
    Icon: GPT,
    iconProps: { className: 'text-black' }
  },
  {
    title: 'Open Sidebar',
    Icon: Sidebar
  }
];

export default function PromptComposerToolbar() {
  const { handleGenerate, state } = useAppLogicContext();
  const { prompt, resetPrompt } = usePromptContext();
  return (
    <div className="bg-primary-background flex items-center justify-between rounded-b-lg rounded-t-none px-4 py-3">
      <div className="flex items-center gap-2">
        {iconActions.map(({ title, Icon, iconProps }) => (
          <IconActionButton
            key={title}
            wrapperProps={{ title }}
            Icon={Icon}
            iconProps={iconProps}
          />
        ))}
      </div>
      <div className="flex gap-2">
        <ActionButton
          props={{
            disabled: prompt.length === 0 && state.activity === null,
            onClick: async () => {
              await handleGenerate(prompt);
              resetPrompt();
            }
          }}
        >
          Generate
        </ActionButton>
        <IconActionButton
          wrapperProps={{
            title: 'Mic',
            className: 'border-2 border-btn-border-primary px-1.5'
          }}
          Icon={Microphone}
        />
      </div>
    </div>
  );
}
