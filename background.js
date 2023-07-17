// // listen to message from inject.js
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === 'getCurrentTabUrl') {
//       // get current tab's url
//       chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         const currentTab = tabs[0];
//         const url = currentTab.url;
  
//         // send url to inject.js
//         chrome.tabs.sendMessage(currentTab.id, { action: 'sendCurrentTabUrl', url });
//         console.log(url);
//       });
//     }
//   });

// listen to message from inject.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getCurrentTabUrl') {
      // get current tab's url
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        const url = currentTab.url;
  
        // send url to inject.js
        chrome.tabs.sendMessage(sender.tab.id, { action: 'sendSourceUrl', url });
        console.log(url);
      });
    }
  });
  