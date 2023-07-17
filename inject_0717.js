function init() {
  // define parent element
  const parentElement = document.querySelector("body");
  
  // select elements
  parentElement.addEventListener("mouseover", (event) => {
    const targetElement = event.target;
    // select text
    if (targetElement.tagName === "P") { 
      targetElement.style.border = "2px solid red";
      targetElement.style.cursor = "crosshair";
    }
    // select image
    else if(targetElement.tagName === "IMG"){
      targetElement.style.border = "2px solid yellow";
      targetElement.style.cursor = "crosshair";
    }
    // select link
    else if (targetElement.tagName === "A"){
      targetElement.style.border = "2px solid blue";
      targetElement.style.cursor = "crosshair";
    }
  });
  
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
    
    // double click to paste content
    document.addEventListener('dblclick', handleDoubleClick);

  });
}


function handleDoubleClick(event) {
  // highlight output element
  const targetElement2 = event.target;
  targetElement2.style.backgroundColor = 'lightgrey';

  // Create div
  const containerDiv = document.createElement('div');
  containerDiv.style.position = 'relative';

  // Create button
  const button = document.createElement('button');
  button.innerText = 'Show Qrcode';
  button.style.marginBottom = '10px';

  // Create image
  const image = document.createElement('img');
  image.src = 'https://img.onl/evzvGS';
  image.style.display = 'none';

  // create text element and paste the content 
  chrome.storage.sync.get(['content'], (result) => {
    const output = result.content;
  
    const outputEle = document.createElement('span');
    outputEle.innerText = output;
    outputEle.style.display = 'none';

    // Append the button and image to the container div

    containerDiv.appendChild(button);
    containerDiv.appendChild(image);
    containerDiv.appendChild(outputEle);

    // Button click event handler
    button.addEventListener('click', () => {
      if (image.style.display === 'none') {
        image.style.display = 'block';
        outputEle.style.display = 'block';
        button.innerText = 'Hide Image';
      } else {
        image.style.display = 'none';
        outputEle.style.display = 'none';
        button.innerText = 'Show Image';
      }
    });
  });
  
  // Replace the target element with the container div
  const parentElement = targetElement2.parentElement;
  parentElement.replaceChild(containerDiv, targetElement2);
  


  // // paste the content to output element
  // chrome.storage.sync.get(['content'], (result) => {
  //   const output = result.content;
    
  //   targetElement2.placeholder = output;
  //   targetElement2.value = output;
  //   targetElement2.innerText= output;
  // });
}

init();

