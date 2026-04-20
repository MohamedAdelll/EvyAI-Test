import { useState } from 'react';

import Caution from 'assets/UI/caution.svg?react';
import Compose from 'assets/UI/compose.svg?react';
import Copy2 from 'assets/UI/copy2.svg?react';
import Regenerate from 'assets/UI/regenerate.svg?react';
import Star from 'assets/UI/star.svg?react';
import { useAppLogicContext } from 'contexts/AppLogicContext';
import PromptContextProvider from 'contexts/PromptContext';

import PromptComposer from './PromptComposer';
import WelcomeSection from './WelcomeSection';
import WriterActions from './WriterActions';
import WriterNavigation from './WriterNavigation';
import WriterStats from './WriterStats';
import WriterText from './WriterText';

export default function PromptWorkspace() {
  const { state } = useAppLogicContext();
  const [currPage, setPage] = useState(1);

  return (
    <div className="flex grow flex-col p-3 pb-0">
      <PromptContextProvider>
        {state.generatedText.length === 0 ? (
          <WelcomeSection />
        ) : (
          <div className="bg-primary-background mb-4 flex grow flex-col rounded-xl p-4">
            <WriterNavigation
              currentPage={currPage}
              totalPages={state.generatedText.length}
              onPrevious={() => {
                if (currPage === 1) return;
                setPage((prev) => prev - 1);
              }}
              onNext={() => {
                if (currPage === state.generatedText.length) return;
                setPage((prev) => prev + 1);
              }}
            />
            <WriterText text={state.generatedText[currPage - 1]} />
            <WriterStats text={state.generatedText[currPage - 1]} />
            <WriterActions
              currPage={currPage}
              icons={[Regenerate, Compose, Star, Caution, Copy2]}
            />
          </div>
        )}
        <PromptComposer />
      </PromptContextProvider>
    </div>
  );
}
