console.log("Hello from the side panel!");

browser.runtime.onMessage.addListener((message, sender) => {
  if (message.target === "sidePanel") {
    console.log("Received message in side panel:", message);
    const iframe = document.querySelector("iframe");
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        {
          ...message,
          from: message.target,
          target: "app",
          tabId: sender.tab?.id,
        },
        "*"
      ); // Can cause security vulnerabilities, consider specifying the target origin
    }
  }
});

window.addEventListener("message", (event) => {
  if (
    event.data &&
    event.data.from === "app" &&
    event.data.target === "sidePanel"
  ) {
    console.log(
      "Received message from app in side panel:",
      event.data.tabId,
      event.data
    );
    browser.tabs.sendMessage(event.data.tabId, event.data);
  }
});
