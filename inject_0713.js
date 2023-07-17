
// // insert text
// function init() {
//     const text = "這是插入的文字。";
//     const div = document.createElement("div");

//     div.textContent = text;
//     // div.style.backgroundColor = "red";
    
//     div.addEventListener("mouseover", () => {
//         div.style.border = "2px solid red";
//     });

//     div.addEventListener("mouseout", () => {
//         div.style.border = "none";
//     });
//     document.body.appendChild(div);
// }

// init()



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

  // copy content
  parentElement.addEventListener("click", (event) => {
    const targetElement = event.target;

    if (targetElement.tagName === "P") {
      chrome.storage.sync.set({data: targetElement.innerText}, ()=>{})
      // myData = targetElement.innerText;
    } else if (targetElement.tagName === "IMG") {
      chrome.storage.sync.set({data: targetElement.src}, ()=>{})
    } else if (targetElement.tagName === "A") {
      chrome.storage.sync.set({data: targetElement.innerText}, ()=>{})
    } else {
      chrome.storage.sync.set({data: targetElement.innerText}, ()=>{})
    }
 
    document.addEventListener('dblclick', handleDoubleClick);
    // if (targetElement.tagName === "P") {
    //   // copyContent = targetElement.innerText;
    //   chrome.storage.local.set({ 'myData': targetElement.innerText });
    // } else if (targetElement.tagName === "IMG") {
    //   chrome.storage.local.set({ 'myData': targetElement.src });
    // } else if (targetElement.tagName === "A") {
    //   chrome.storage.local.set({ 'myData': targetElement.innerText });
    // } else {
    //   chrome.storage.local.set({ 'myData': targetElement.innerText });
    // }

    // document.addEventListener('dblclick', handleDoubleClick);

});


}
// function handleDoubleClick(event) {
//   const targetElement = event.target;
//   targetElement.style.backgroundColor = 'red';

//   // 创建一个临时的 textarea 元素，并将其添加到文档中
//   const textarea = document.createElement('textarea');
//   document.body.appendChild(textarea);

//   // 将 textarea 的值设置为剪贴板中的文本
//   textarea.value = targetElement.innerText;

//   // 将焦点聚焦在 textarea 上并执行复制操作
//   textarea.focus();
//   textarea.select();
//   document.execCommand('copy');

//   // 移除临时的 textarea 元素
//   document.body.removeChild(textarea);
// }

function handleDoubleClick(event) {
  const targetElement = event.target;
  targetElement.style.backgroundColor = 'red';

  chrome.storage.local.get(['data'], (result) => {
    const output = result.data;
    // 在这里使用数据
    targetElement.placeholder = "hi";
    targetElement.value = output;
    targetElement.innerText= "jo";
  });
}

// function handleDoubleClick(event) {
//   const targetElement = event.target;
//   targetElement.style.backgroundColor = 'red';

//   output = navigator.clipboard.readText()
//     .then((clipboardText) => {
//       targetElement.innerText = "output";
//       targetElement.placeholder = clipboardText;
//       targetElement.value = clipboardText;
//     })
//     .catch((error) => {
//       console.error("无法从剪贴板中读取内容", error);
//     });
// }



init();

