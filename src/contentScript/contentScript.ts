// TODO: content script
function interceptData() {
  var s = document.createElement("script");
  s.src = chrome.runtime.getURL("interceptor.js");
  // s.onload = function () {
  //   this.remove();
  // };
  (document.head || document.documentElement).appendChild(s);
}
function checkForDOM() {
  if (document.body && document.head) {
    interceptData();
  } else {
    requestIdleCallback(checkForDOM);
  }
}
requestIdleCallback(checkForDOM);

function scrapeData() {
  const responseContainingEle = document.querySelectorAll("__interceptedData");
  console.log(responseContainingEle);

  if (responseContainingEle) {
    const response = [];

    responseContainingEle.forEach((e) => {
      response.push(JSON.parse(e.innerHTML));
    });

    console.log(response);
  } else {
    requestIdleCallback(scrapeData);
  }
}

requestIdleCallback(scrapeData, { timeout: 1000 });
