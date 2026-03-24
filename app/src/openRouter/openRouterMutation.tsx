import {
  CommentData,
  DMData
} from 'utils/selectors';

import { OpenRouter } from '@openrouter/sdk';
import { Message } from '@openrouter/sdk/models';

export function buildCommentMessages(data: CommentData): Message[] {
  return [
    {
      role: 'system',
      content: data.prompt
    },
    {
      role: 'user',
      content: `Post by ${data.postAuthor}:\n\n${data.postText}`
    }
  ];
}

export function buildDMMessages(data: DMData): Message[] {
  return [
    {
      role: 'system',
      content: data.prompt
    },
    ...data.messages.map((m) => {
      return {
        role: 'user' as const,
        content: `${m.sender}: ${m.text}`
      };
    })
  ];
}

export async function getAIResponse(messages: Message[]) {
  console.log('Sending messages to OpenRouter:', messages);
  const openRouter = new OpenRouter({
    apiKey:
      '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' // This should not be available for client side, it should be stored securely in the backend and accessed via an API route. This is just for demonstration purposes.
  });
  const completion = await openRouter.chat.send({
    chatGenerationParams: {
      model: 'openai/gpt-5.2',
      messages,
      stream: false
    }
  });
  console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content;
} // I would use tanstack query to mutate this data and cache it in production.
