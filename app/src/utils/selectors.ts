export const selectors = [
  {
    postSelector:
      'section.feed-detail-update__container, [role=listitem][componentkey*=FeedType_MAIN_FEED_RELEVANCE]',
    postAuthorSelector:
      'a[componentkey*=auto-component] [aria-label] p, .update-components-actor__title span[aria-hidden]',
    commentBoxSelector:
      'div[class*=comments-comment-box--reply], div[componentkey*="commentBox"]:has([data-type="mention"])',
    postTextSelector:
      '[data-testid="expandable-text-box"], .update-components-text',
    commentSectionSelector: '[componentkey*=commentsSectionContainer]',
    logic(el: HTMLElement): boolean {
      return !!el.closest(this.commentBoxSelector);
    },
    getRelevantData(el: HTMLElement): CommentData {
      const post = el.closest(this.postSelector);
      const postText =
        post?.querySelector(this.postTextSelector)?.textContent?.trim() || '';
      const postAuthor =
        post?.querySelector(this.postAuthorSelector)?.textContent?.trim() ||
        'unknown';
      console.log('Extracted post text for reply:', { postText, postAuthor });
      return {
        postText,
        postAuthor,
        prompt: 'Create a reply to this comment on Linkedin'
      };
    },
    activity: 'Reply' as const
  },
  {
    postSelector:
      'section.feed-detail-update__container, [role=listitem][componentkey*=FeedType_MAIN_FEED_RELEVANCE]',
    postAuthorSelector:
      'a[componentkey*=auto-component] [aria-label] p, .update-components-actor__title span[aria-hidden]',
    postTextSelector:
      '[data-testid="expandable-text-box"], .update-components-text',
    commentBoxSelector:
      'div[class*="comments-comment-box--cr"]:not([class*="comments-comment-box--reply"]), div[componentkey*=commentBox]:not(:has([data-type="mention"]))',
    logic(el: HTMLElement): boolean {
      return !!el.closest(this.commentBoxSelector);
    },
    getRelevantData(el: HTMLElement): CommentData {
      const post = el.closest(this.postSelector);
      const postText =
        post?.querySelector(this.postTextSelector)?.textContent?.trim() || '';
      const postAuthor =
        post?.querySelector(this.postAuthorSelector)?.textContent?.trim() ||
        'unknown';
      console.log('Extracted post text:', { postText, postAuthor });
      return {
        postText,
        postAuthor,
        prompt: 'Create a comment on this post on Linkedin'
      };
    },
    activity: 'Comment' as const
  },
  {
    directMessageSelector: '.msg-form__contenteditable',
    msgThreadSelector: '.msg-thread, ul.msg-s-message-list-content',
    messagesSelector: '.msg-s-message-list__event',
    messageTextSelector: '.msg-s-event-listitem__body',
    messageSenderNameSelector: '.msg-s-message-group__profile-link',
    logic(el: HTMLElement): boolean {
      console.log('Checking DM selector for element', el);
      return !!el.closest(this.directMessageSelector);
    },
    activity: 'Direct Message' as const,
    getRelevantData(document: Document): DMData {
      const msgThread = document.querySelector(this.msgThreadSelector);
      if (!msgThread) throw new Error('Message thread not found');
      const messages = [
        ...msgThread.querySelectorAll(this.messagesSelector)
      ].map((msg) => {
        const text =
          msg.querySelector(this.messageTextSelector)?.textContent || '';
        const sender =
          msg
            .querySelector(this.messageSenderNameSelector)
            ?.textContent?.trim() || 'unknown';
        return { text, sender };
      });
      console.log('Extracted messages:', messages);
      return {
        messages,
        prompt:
          'Create a response to the most recent message in this thread on Linkedin'
      };
    }
  }
];

export interface DMData {
  messages: {
    text: string;
    sender: string;
  }[];
  prompt: string;
}

export interface CommentData {
  postText: string;
  postAuthor: string;
  prompt: string;
}
