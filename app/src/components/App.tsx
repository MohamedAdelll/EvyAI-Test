import { useEffect, useState } from 'react';

import {
  buildCommentMessages,
  buildDMMessages,
  getAIResponse
} from 'openRouter/openRouterMutation';
import { selectors } from 'utils/selectors';

import { Message } from '@openrouter/sdk/models';

import AppHeader from './Header';
import PromptComposer from './PromptComposer';
import WelcomeSection from './WelcomeSection';

interface AppState {
  activity: string | null;
  generatedText: string | null;
  isLoading: boolean;
  error: string | null;
  focusedElementIdentifier: string | null;
  bodyHTML: string | null;
  isPaymentRequired: boolean;
  tabId: number | null;
  context: Message[] | null;
}

function App() {
  const [state, setState] = useState<AppState>({
    activity: null,
    generatedText: null,
    isLoading: false,
    error: null,
    focusedElementIdentifier: null,
    bodyHTML: null,
    isPaymentRequired: false,
    tabId: null,
    context: null
  });

  const resetGeneratedText = () => {
    setState((prev) => ({
      ...prev,
      generatedText: null,
      error: null,
      isLoading: false
    }));
  };

  const handleGenerate = async () => {
    if (!state.bodyHTML || !state.focusedElementIdentifier) {
      setState((prev) => ({
        ...prev,
        error: 'Missing context. Please click on an input again.'
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
      isPaymentRequired: false
    }));

    try {
      const dom = new DOMParser().parseFromString(state.bodyHTML, 'text/html');
      const focusedElement = dom.evaluate(
        state.focusedElementIdentifier,
        dom,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue as HTMLElement | null;

      if (!focusedElement) {
        throw new Error(
          'Focused element not found. Please click on an input again.'
        );
      }

      const result = selectors.find((selector) =>
        selector.logic(focusedElement)
      );

      if (!result) {
        throw new Error(
          'Unable to identify the input type. Please click on a comment or message box.'
        );
      }

      let context: Message[] = [];

      if (result.activity === 'Reply' || result.activity === 'Comment') {
        const data = result.getRelevantData(focusedElement);
        context = buildCommentMessages(data);
      } else if (result.activity === 'Direct Message') {
        const data = result.getRelevantData(dom);
        context = buildDMMessages(data);
      }

      setState((prev) => ({ ...prev, context }));

      const response = await getAIResponse(context);
      setState((prev) => ({
        ...prev,
        generatedText: response as string,
        isLoading: false,
        error: null,
        isPaymentRequired: false
      }));
    } catch (err) {
      let errorMessage = 'An error occurred while generating the response.';
      let isPaymentError = false;
      let fallbackText = null;

      if (err instanceof Error) {
        errorMessage = err.message;
        // Check for 402 payment required status
        if (err.message.includes('requires more credits')) {
          isPaymentError = true;
          errorMessage =
            'Payment required. Please upgrade your account to generate more responses.';

          // For POC: Show fallback lorem ipsum
          fallbackText =
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
        }
      }

      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
        isPaymentRequired: isPaymentError,
        generatedText: fallbackText
      }));
      console.error('Error generating response:', err);
    }
  };

  const handleInsert = () => {
    if (!state.generatedText) {
      setState((prev) => ({
        ...prev,
        error: 'No text to insert. Generate a response first.'
      }));
      return;
    }
    window.parent.postMessage(
      {
        type: 'ENVYAI_INSERT_TEXT',
        text: state.generatedText,
        focusedElementIdentifier: state.focusedElementIdentifier,
        from: 'app',
        target: 'sidePanel',
        tabId: state.tabId
      },
      '*'
    );
  };

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      console.log('Received message in APP:', event.data);
      const { bodyHTML, focusedElementIdentifier, type } = event.data;

      if (type === 'ENVYAI_INPUT_FOCUSED') {
        const dom = new DOMParser().parseFromString(bodyHTML, 'text/html');
        const focusedElement = dom.evaluate(
          focusedElementIdentifier,
          dom,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue as HTMLElement | null;

        if (!focusedElement) {
          setState((prev) => ({
            ...prev,
            error: 'Focused element not found. Please try again.'
          }));
          console.warn('Focused element not found in the parsed DOM');
          return;
        }

        const result = selectors.find((selector) =>
          selector.logic(focusedElement)
        );

        if (!result) {
          setState((prev) => ({
            ...prev,
            error:
              'Unable to identify input type. Supported: Comments, Replies, and Direct Messages'
          }));
          console.warn('No matching selector found for the focused element');
          return;
        }

        // Store state for later use
        setState((prev) => ({
          ...prev,
          activity: result.activity,
          focusedElementIdentifier,
          bodyHTML,
          error: null,
          generatedText: null,
          tabId: event.data.tabId
        }));
      }
    }

    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, []);

  console.log('Current state:', state);

  return (
    <div className="h-dvh flex flex-col">
      <AppHeader />
      <div className="p-3 pb-0 flex flex-col grow">
        <WelcomeSection />
        <PromptComposer />
      </div>
    </div>

    // <Fragment>
    //   <div className="from-primary-background min-h-screen bg-gradient-to-b to-white p-4">
    //     <div className="mx-auto max-w-md">
    //       {/* Header */}
    //       <div className="mb-6">
    //         <h1 className="text-primary mb-2 text-2xl font-bold">EnvyAI</h1>
    //         <p className="text-typography-primary-light text-sm">
    //           AI-powered content generation for LinkedIn
    //         </p>
    //       </div>

    //       {/* Error Message */}
    //       {state.error && (
    //         <>
    //           <div
    //             className={`mb-4 rounded-lg border p-3 ${
    //               state.isPaymentRequired
    //                 ? 'border-_-yellow bg-yellow-50'
    //                 : 'border-danger bg-red-50'
    //             }`}
    //           >
    //             <p
    //               className={`text-sm font-medium ${
    //                 state.isPaymentRequired ? 'text-_-yellow' : 'text-danger'
    //               }`}
    //             >
    //               {state.isPaymentRequired ? 'Upgrade Required' : 'Error'}
    //             </p>
    //             <p
    //               className={`mt-1 text-sm ${
    //                 state.isPaymentRequired ? 'text-_-yellow' : 'text-danger'
    //               }`}
    //             >
    //               {state.error}
    //             </p>
    //           </div>
    //           <div>
    //             <p className="text-_-yellow mb-3 text-xs">
    //               Relevant data collected for POC
    //             </p>
    //             <code className="text-xs">{JSON.stringify(state.context)}</code>
    //           </div>
    //         </>
    //       )}

    //       {/* Activity Status */}
    //       {state.activity && (
    //         <div className="border-primary-border bg-accent mb-4 rounded-lg border p-3">
    //           <p className="text-primary text-xs font-medium uppercase">
    //             Current Activity
    //           </p>
    //           <p className="text-accent-foreground mt-1 text-sm font-semibold">
    //             {state.activity}
    //           </p>
    //         </div>
    //       )}

    //       {/* Generated Text Preview */}
    //       {state.generatedText && (
    //         <div className="border-card-border bg-card mb-4 rounded-lg border p-4">
    //           <p className="text-typography-primary-lighter mb-2 text-xs font-semibold uppercase">
    //             {state.isPaymentRequired
    //               ? 'Fallback Response (POC)'
    //               : 'Generated Response'}
    //           </p>
    //           {state.isPaymentRequired && (
    //             <p className="text-_-yellow mb-3 text-xs">
    //               Using lorem ipsum placeholder for demonstration
    //             </p>
    //           )}
    //           <div className="border-muted bg-primary-background text-typography-primary mb-4 rounded border p-3 text-sm leading-relaxed">
    //             {state.generatedText}
    //           </div>
    //           <div className="flex gap-2">
    //             <button
    //               onClick={handleInsert}
    //               className="bg-btn-bg-primary flex-1 rounded-lg px-4 py-2 font-medium text-white transition-opacity hover:opacity-90"
    //             >
    //               Insert to LinkedIn
    //             </button>
    //             <button
    //               onClick={resetGeneratedText}
    //               className="border-primary-border bg-accent text-primary-dark hover:bg-muted flex-1 rounded-lg border px-4 py-2 font-medium transition-colors"
    //             >
    //               Edit
    //             </button>
    //           </div>
    //         </div>
    //       )}

    //       {/* Generate Button */}
    //       {state.activity && !state.generatedText && (
    //         <button
    //           onClick={handleGenerate}
    //           disabled={state.isLoading}
    //           className="bg-primary hover:bg-primary-dark flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
    //         >
    //           {state.isLoading ? (
    //             <>
    //               <svg
    //                 className="size-4 animate-spin"
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 fill="none"
    //                 viewBox="0 0 24 24"
    //               >
    //                 <circle
    //                   className="opacity-25"
    //                   cx="12"
    //                   cy="12"
    //                   r="10"
    //                   stroke="currentColor"
    //                   strokeWidth="4"
    //                 ></circle>
    //                 <path
    //                   className="opacity-75"
    //                   fill="currentColor"
    //                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    //                 ></path>
    //               </svg>
    //               Generating...
    //             </>
    //           ) : (
    //             <>
    //               <svg
    //                 className="size-4"
    //                 fill="none"
    //                 stroke="currentColor"
    //                 viewBox="0 0 24 24"
    //               >
    //                 <path
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                   strokeWidth={2}
    //                   d="M13 10V3L4 14h7v7l9-11h-7z"
    //                 />
    //               </svg>
    //               Generate Response
    //             </>
    //           )}
    //         </button>
    //       )}

    //       {/* No Activity State */}
    //       {!state.activity && !state.generatedText && (
    //         <div className="text-typography-primary-light py-8 text-center">
    //           <svg
    //             className="mx-auto mb-3 size-12 opacity-50"
    //             fill="none"
    //             stroke="currentColor"
    //             viewBox="0 0 24 24"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth={1.5}
    //               d="M7 8h10M7 12h10m-10 4h10m5-9a2 2 0 11-4 0 2 2 0 014 0z"
    //             />
    //           </svg>
    //           <p className="text-sm">
    //             Click on a comment box or DM field to get started
    //           </p>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </Fragment>
  );
}

export default App;
