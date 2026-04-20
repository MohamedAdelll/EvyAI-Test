import { CommentData, DMData } from 'utils/selectors';

import { OpenRouter } from '@openrouter/sdk';
import { Message } from '@openrouter/sdk/models';

export function buildCommentMessages(
  prompt: string,
  data: CommentData
): Message[] {
  return [
    {
      role: 'system',
      content: `${prompt}\n\n${data.prompt}`
    },
    {
      role: 'user',
      content: `Post by ${data.postAuthor}:\n\n${data.postText}`
    }
  ];
}

export function buildDMMessages(prompt: string, data: DMData): Message[] {
  return [
    {
      role: 'system',
      content: `${prompt}\n\n${data.prompt}`
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
