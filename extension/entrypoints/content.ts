import throttle from "lodash.throttle";

export default defineContentScript({
  matches: ["*://*.linkedin.com/*"],
  runAt: "document_start",
  allFrames: false,
  main() {
    window.addEventListener("focusin", throttledFocusin);

    browser.runtime.onMessage.addListener((message) => {
      console.log("Content script received message:", message);
      if (message.type === "ENVYAI_INSERT_TEXT") {
        const editor = getElementByXPath(message.focusedElementIdentifier);
        insertTextToEditor(editor, message.text);
      }
    }); // I would use web ext bridge for better message handling and type safety.
  },
});

let focusedInputElement = null as EventTarget | null;
function focusinHandler(e: FocusEvent) {
  focusedInputElement = e.target as HTMLElement;
  if ((e.target as HTMLElement).shadowRoot) {
    focusedInputElement = (e.target as HTMLElement).shadowRoot?.querySelector(
      "[contenteditable]"
    ) as EventTarget;
  }
  if (!isInputLikeElement(focusedInputElement)) {
    focusedInputElement = null;
    console.log("Focused element is not input-like, ignoring.");
    return;
  }

  browser.runtime.sendMessage({
    type: "ENVYAI_INPUT_FOCUSED",
    bodyHTML: getRawBodyHTML(),
    url: window.location.href,
    focusedElementIdentifier: getElementXPath(focusedInputElement),
    target: "sidePanel",
  });
}

const throttledFocusin = throttle(focusinHandler, 100, {
  trailing: true,
});

function getElementXPath(element: EventTarget | null): string {
  if (!(element instanceof HTMLElement) || !element) {
    return "";
  }
  if (element.id) {
    return `//*[@id="${element.id}"]`;
  }

  const parts: string[] = [];

  while (
    element instanceof HTMLElement &&
    element &&
    element.nodeType === Node.ELEMENT_NODE
  ) {
    let index = 1;
    let sibling = element.previousElementSibling;

    while (sibling) {
      if (sibling.tagName === element.tagName) {
        index++;
      }
      sibling = sibling.previousElementSibling;
    }

    const tagName = element.tagName.toLowerCase();
    const part = index > 1 ? `${tagName}[${index}]` : tagName;

    parts.unshift(part);
    element = element.parentElement as HTMLElement;
  }

  return "/" + parts.join("/");
}

export function getElementByXPath(
  xpath: string,
  root: Document | HTMLElement = document
): HTMLElement | null {
  const result = document.evaluate(
    xpath,
    root,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  );

  return result.singleNodeValue as HTMLElement | null;
}

function getRawBodyHTML() {
  const element = document.querySelector<HTMLBodyElement>("body");
  const cloned = element?.cloneNode(true) as HTMLElement;
  cloned
    ?.querySelectorAll('script, style, link[rel="stylesheet"]')
    .forEach((el) => el.remove());
  return cloned?.innerHTML;
}

function isInputLikeElement(element: EventTarget | null): boolean {
  const inputLikeTags = ["INPUT", "TEXTAREA", "SELECT"];
  if (!(element instanceof HTMLElement)) return false;
  if (inputLikeTags.includes(element.tagName)) return true;

  if (
    element.isContentEditable ||
    element.shadowRoot?.querySelector("[contenteditable]")
  )
    return true;

  return false;
}

function insertTextToEditor(editor: HTMLElement | null, text: string) {
  if (!editor) return;

  editor.focus();

  document.execCommand("insertText", false, text);
}
