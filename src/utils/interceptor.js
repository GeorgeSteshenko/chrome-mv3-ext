// const urlToIntercept = "https://securepubads.g.doubleclick.net";
const urlToIntercept = "https://franecki.net/assets/vendor/";

(function () {
  var XHR = XMLHttpRequest.prototype;
  var send = XHR.send;
  var open = XHR.open;
  XHR.open = function (method, url) {
    this.url = url; // the request url
    return open.apply(this, arguments);
  };
  XHR.send = function () {
    this.addEventListener("load", function () {
      if (this.url.includes(`${urlToIntercept}`)) {
        var dataDOMElement = document.createElement("div");
        dataDOMElement.classList.add("__interceptedData");
        dataDOMElement.innerText = this.response;
        dataDOMElement.style.height = 0;
        dataDOMElement.style.overflow = "hidden";
        document.body.appendChild(dataDOMElement);
      }
    });
    return send.apply(this, arguments);
  };
})();
