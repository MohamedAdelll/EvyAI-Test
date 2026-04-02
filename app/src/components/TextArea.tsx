import America from 'assets/UI/america.svg?react';
import GPT from 'assets/UI/gpt.svg?react';
import Microphone from 'assets/UI/microphone.svg?react';
import Sidebar from 'assets/UI/sidebar.svg?react';
import Upload from 'assets/UI/upload.svg?react';

import Button from './Button';
import IconWrapper from './IconWrapper';

export default function TextArea() {
  return (
    <div className="border-primary-border hover:border-primary-border-hover/50 focus-within:border-primary-border-hover/50 hover:focus-within:border-primary-border sticky bottom-0 flex w-full flex-col rounded-lg border mb-2">
      <textarea
        className="resize-none rounded-lg px-3 py-2 text-xs focus:outline-none"
        placeholder="Enter a prompt or select a template here"
        maxLength={10000}
        name="prompt"
        id="prompt"
      ></textarea>
      <div className="bg-primary-background flex items-center justify-between rounded-b-lg rounded-t-none px-4 py-3">
        <div className="flex items-center gap-2">
          <IconWrapper
            wrapperProps={{ title: 'Upload an attachment' }}
            Icon={Upload}
          />
          <IconWrapper wrapperProps={{ title: 'Language' }} Icon={America} />
          <IconWrapper
            Icon={GPT}
            wrapperProps={{ title: 'Use AI' }}
            iconProps={{ className: 'text-black' }}
          />
          <IconWrapper
            wrapperProps={{ title: 'Open Sidebar' }}
            Icon={Sidebar}
          />
        </div>
        <div className="flex gap-2">
          <Button props={{ disabled: false }}>Generate</Button>
          <IconWrapper
            wrapperProps={{
              title: 'Mic',
              className: 'border-2 border-btn-border-primary px-1.5'
            }}
            Icon={Microphone}
          />
        </div>
      </div>
    </div>
  );
}
