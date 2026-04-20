import { usePromptContext } from 'contexts/PromptContext';

import PromptTemplateCard from './PromptTemplateCard';

const promptTemplates = [
  'Create a personalized Linkedin message to reconnect with a past client.',
  'Write a follow-up message after a sales demo to keep the conversation going.',
  'Generate a creative brief for a new marketing campaign based on the following details...'
];

export default function WelcomeSection() {
  const { setPrompt } = usePromptContext();
  return (
    <main className="mb-1 flex grow flex-col items-center justify-center overflow-auto lg:mb-6">
      <div>
        <h4 className="text-3xl font-black lg:text-4xl">Welcome!</h4>
        <p className="mb-4 text-xs font-medium lg:mb-6 lg:text-base">
          How can we help you engage today?
        </p>
        <div className="flex flex-col gap-2 lg:gap-3">
          {promptTemplates.map((template) => (
            <PromptTemplateCard
              key={template}
              onClick={() => {
                console.log('Selected template:', template);
                setPrompt(template);
              }}
            >
              {template}
            </PromptTemplateCard>
          ))}
        </div>
      </div>
    </main>
  );
}
