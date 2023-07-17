
// select and copy content

function init() {
  
  // define parent element
  const parentElement = document.querySelector("body");
  
  // select elements

  // set border when mouserover
  parentElement.addEventListener("mouseover", (event) => {
    const targetElement = event.target;
    // text
    if (targetElement.tagName === "P") { 
      targetElement.style.border = "2px solid red";
      targetElement.style.cursor = "crosshair";
    }
    // image
    else if(targetElement.tagName === "IMG"){
      targetElement.style.border = "2px solid yellow";
      targetElement.style.cursor = "crosshair";
    }
    // link
    else if (targetElement.tagName === "A"){
      targetElement.style.border = "2px solid blue";
      targetElement.style.cursor = "crosshair";
    }
  });
  
  // remove border when mouseout
  parentElement.addEventListener("mouseout", (event) => {
    const targetElement = event.target;

    if (targetElement.tagName === "P") { 
      targetElement.style.border = "none";
    }else if(targetElement.tagName === "IMG"){
      targetElement.style.border = "none"
    }else if (targetElement.tagName === "A"){
      targetElement.style.border = "none"
    }
  });

  // single click to copy content
  parentElement.addEventListener("click", (event) => {
    const targetElement = event.target;

    if (targetElement.tagName === "P") {
      chrome.storage.sync.set({'content': targetElement.innerText}, function() {
        console.log(targetElement.innerText);
    });
    } else if (targetElement.tagName === "IMG") {
      chrome.storage.sync.set({'content': targetElement.src}, function() {
        console.log(targetElement.src);
    });
    } else if (targetElement.tagName === "A") {
      chrome.storage.sync.set({'content': targetElement.href}, function() {
        console.log(targetElement.href);
    });
    } 
    
    // send message to background.js
    chrome.runtime.sendMessage({ action: 'getCurrentTabUrl' });

    // double click to paste content
    document.addEventListener('dblclick', handleDoubleClick);

  });
}



// paste content and generate source qrcode

function handleDoubleClick(event) {
  // highlight output element
  const targetElement2 = event.target;
  targetElement2.style.backgroundColor = 'lightgrey';

  // Create div
  const containerDiv = document.createElement('div');
  containerDiv.style.position = 'relative';
  containerDiv.style.border = '2px dashed #CCCCCC';
  containerDiv.style.padding = '10px';

  // Create button
  const button = document.createElement('button');
  button.innerText = 'Show Qrcode';
  button.style.position = 'absolute';
  button.style.bottom = '0';
  button.style.right = '0';
  button.style.margin = '5px';

  // // Create image
  // const image = document.createElement('img');
  // image.src = 'https://img.onl/evzvGS';
  // image.style.display = 'none';

  // Create Qrcode div
  const qrcodeDiv = document.createElement('div');
  qrcodeDiv.id = 'qrcode';
  qrcodeDiv.style.transform = 'scale(0.5)';
  qrcodeDiv.style.display = 'none';

  // listen to tab's url (message from bg.js)
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'sendSourceUrl') {
      const url = message.url;
      console.log('Current tab URL:', url);

      // avoid duplicated qrcode
      qrcodeDiv.innerHTML = '';
      jQuery('#qrcode').qrcode(url);
    }
  });
  

  // create text element and paste the content 
  chrome.storage.sync.get(['content'], (result) => {
    const output = result.content;
  
    const outputEle = document.createElement('span');
    outputEle.innerText = output;
    outputEle.style.display = 'block';

    // Append the button and image to the container div
    containerDiv.appendChild(outputEle);
    containerDiv.appendChild(button);
    containerDiv.appendChild(qrcodeDiv);
    

    // Button click event handler
    button.addEventListener('click', () => {
      if (qrcodeDiv.style.display === 'none') {
        qrcodeDiv.style.display = 'block';
        button.innerText = 'Hide Resource';
      } else {
        qrcodeDiv.style.display = 'none';
        button.innerText = 'Show Resource';
      }
    });
  });

  // Replace the target element with the container div
  const parentElement = targetElement2.parentElement;
  parentElement.replaceChild(containerDiv, targetElement2);
  


}

init();

