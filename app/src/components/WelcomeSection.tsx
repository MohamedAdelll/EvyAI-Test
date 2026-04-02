import Flag from 'assets/UI/flag.svg?react';
import Persona from 'assets/UI/persona.svg?react';
import Terminal from 'assets/UI/terminal.svg?react';
import Tone from 'assets/UI/tone.svg?react';

import InputContextCard from './InputContextCard';
import PromptTemplateCard from './PromptTemplateCard';

const inputContexts = [
  {
    title: 'Goal',
    Icon: Flag
  },
  {
    title: 'Tone',
    Icon: Tone
  },
  {
    title: 'Persona',
    Icon: Persona
  },
  {
    title: 'Select Style',
    Icon: Terminal
  }
];

const promptTemplates = [
  'Create a personalized Linkedin message to reconnect with a past client.',
  'Write a follow-up message after a sales demo to keep the conversation going.',
  'Generate a creative brief for a new marketing campaign based on the following details...'
];

export default function WelcomeSection() {
  return (
    <>
      <article className="grid grid-cols-2 gap-1 mb-4">
        {inputContexts.map(({ title, Icon }) => (
          <InputContextCard key={title} Icon={Icon} children={title} />
        ))}
      </article>
      <main className="grow flex flex-col items-center justify-center mb-1 lg:mb-6 overflow-auto">
        <div>
          <h4 className="text-3xl lg:text-4xl font-black">Welcome!</h4>
          <p className="text-xs lg:text-base font-medium mb-4 lg:mb-6">
            How can we help you engage today?
          </p>
          <div className="flex flex-col gap-2 lg:gap-3">
            {promptTemplates.map((template) => (
              <PromptTemplateCard key={template}>{template}</PromptTemplateCard>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
