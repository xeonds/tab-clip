browser.commands.onCommand.addListener((command) => {
  if (command === "copy-markdown") {
    console.log("copy-markdown command received");
    copyCurrentTabInfo();
  }
});

function copyCurrentTabInfo() {
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    let tab = tabs[0];
    let title = tab.title;
    let url = tab.url;
    let markdown = `[${title}](${url})`;

    console.log(`Copying: ${markdown}`);
    copyToClipboard(markdown);

    // Send a message to the content script to show the toast
    browser.tabs.sendMessage(tab.id, { action: "showToast", message: "Copied to clipboard!" });
  });
}

function copyToClipboard(text) {
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

