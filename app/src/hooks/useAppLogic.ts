import { useEffect, useState } from 'react';

import {
  buildCommentMessages,
  buildDMMessages,
  getAIResponse
} from 'openRouter/openRouterMutation';
import { toast } from 'sonner';
import { selectors } from 'utils/selectors';

import { Message } from '@openrouter/sdk/models';

interface AppState {
  activity: string | null;
  generatedText: string[];
  isLoading: boolean;
  error: string | null;
  focusedElementIdentifier: string | null;
  bodyHTML: string | null;
  isPaymentRequired: boolean;
  tabId: number | null;
  context: Message[] | null;
}
// In a real case scenario, I wouldn't depend on a single hook and will split it into multiple hooks and contexts for better separation of concerns and maintainability. For the sake of this POC, I kept everything in one hook to simplify the structure and focus on the core logic.
export function useAppLogic() {
  const [state, setState] = useState<AppState>({
    activity: null,
    generatedText: [],
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
      generatedText: [],
      error: null,
      isLoading: false
    }));
  };

  const handleGenerate = async (prompt: string) => {
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
        console.warn('Focused element not found in the parsed DOM');
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
        context = buildCommentMessages(prompt, data);
      } else if (result.activity === 'Direct Message') {
        const data = result.getRelevantData(dom);
        context = buildDMMessages(prompt, data);
      }

      setState((prev) => ({ ...prev, context }));

      const response = await getAIResponse(context);
      setState((prev) => ({
        ...prev,
        generatedText: [...prev.generatedText, response],
        isLoading: false,
        error: null,
        isPaymentRequired: false
      }));
    } catch (err) {
      let errorMessage = 'An error occurred while generating the response.';
      let isPaymentError = false;
      let fallbackText = '';

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
        generatedText: [...prev.generatedText, fallbackText]
      }));
    }
  };

  const handleInsert = (text: string) => {
    if (!text) {
      setState((prev) => ({
        ...prev,
        error: 'No text to insert. Generate a response first.'
      }));
      return;
    }
    window.parent.postMessage(
      {
        type: 'ENVYAI_INSERT_TEXT',
        text,
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
            activity: null,
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

        toast.info(
          `Focused on a ${result.activity} input. You can generate a response now!`
        );

        setState((prev) => ({
          ...prev,
          activity: result.activity,
          focusedElementIdentifier,
          bodyHTML,
          error: null,
          generatedText: [],
          tabId: event.data.tabId
        }));
      }
    }

    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, []);

  return {
    state,
    handleGenerate,
    handleInsert,
    resetGeneratedText
  };
}
