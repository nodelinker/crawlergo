(async function click_all_a_tag_javascript() {
  waitCount = 8;
  window.result = [];
  window.globalLock = 0;
  sleepTime = 1000;
  rootElement = document.querySelector("body");

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  var MutationObserver =
    window.MutationObserver || window.WebKitMutationObserver;
  var observeDOM = (function () {
    return function (obj, callback) {
      if (!obj || obj.nodeType !== 1) return;

      if (MutationObserver) {
        // define a new observer
        var mutationObserver = new MutationObserver(callback);

        // have the observer observe foo for changes in children
        mutationObserver.observe(obj, { childList: true, subtree: true });
        return mutationObserver;
      }

      // browser support fallback
      else if (window.addEventListener) {
        obj.addEventListener("DOMNodeInserted", callback, false);
        obj.addEventListener("DOMNodeRemoved", callback, false);
      }
    };
  })();

  // Observe a specific DOM element:
  observer = observeDOM(rootElement, async function (m) {
    var addedNodes = [],
      removedNodes = [];

    m.forEach(
      (record) =>
        record.addedNodes.length & addedNodes.push(...record.addedNodes)
    );
    m.forEach(
      (record) =>
        record.removedNodes.length & removedNodes.push(...record.removedNodes)
    );

    for (var i = 0; i < addedNodes.length; i++) {
      try {
        var _ = addedNodes[i];

        let nodeListHref = _.querySelectorAll("[href]");
        for (let node1 of nodeListHref) {
          window.result.push(node1);
          console.log(
            "----------------------->",
            window.result,
            window.result.length
          );
        }

        let nodeListSrc = _.querySelectorAll("[src]");
        for (let node2 of nodeListSrc) {
          window.result.push(node2);
          console.log(
            "+++++++++++++++++++++>",
            window.result,
            window.result.length
          );
        }
      } catch (error) {
        continue;
      }
    }
  });

  var origOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function () {
    console.log(Date.parse(new Date()), "request started!");
    window.globalLock = 1;

    // debugger
    console.log(arguments);
    this.addEventListener("load", function () {
      console.log("request completed!");
      // console.log(this.readyState);
      // console.log(this.responseText); //whatever the response was
      window.globalLock = 0;
    });
    this.addEventListener("abort", function () {
      console.log("request abord!");
      // console.log(this.readyState);
      // console.log(this.responseText); //whatever the response was
      window.globalLock = 0;
    });

    origOpen.apply(this, arguments);
  };

  let eventNames = [
    "onabort",
    "onblur",
    "onchange",
    "onclick",
    "ondblclick",
    "onerror",
    "onfocus",
    "onkeydown",
    "onkeypress",
    "onkeyup",
    "onload",
    "onmousedown",
    "onmousemove",
    "onmouseout",
    "onmouseover",
    "onmouseup",
    "onreset",
    "onresize",
    "onselect",
    "onsubmit",
    "onunload",
  ];
  for (let eventName of eventNames) {
    let event = eventName.replace("on", "");
    let nodeList = document.querySelectorAll("[" + eventName + "]");
    if (nodeList.length > 100) {
      nodeList = nodeList.slice(0, 100);
    }
    for (let node of nodeList) {
      let evt = document.createEvent("CustomEvent");
      evt.initCustomEvent(event, false, true, null);
      try {
        node.dispatchEvent(evt);
        await sleep(1000);
      } catch {}
    }
  }

  while (true){

    var tmp = window.result.pop();

    console.log("xxxxxxxxxxxxxxxxxxxxxxx", window.result.length, window.result);
    try {
      let attrValue = tmp.getAttribute("href");
      if (attrValue.toLocaleLowerCase().startsWith("javascript:")) {
        // await sleep(1000);
        eval(attrValue.substring(11));
      }
      for (var i = 0; i < waitCount; i++) {
        if (window.globalLock == 1) {
          await sleep(sleepTime);
        }
      }
    } catch (error) {}

    try {
      let attrValue = node2.getAttribute("src");
      if (attrValue.toLocaleLowerCase().startsWith("javascript:")) {
        // await sleep(1000);
        eval(attrValue.substring(11));
      }

      for (var i = 0; i < waitCount; i++) {
        if (window.globalLock == 1) {
          await sleep(sleepTime);
        }
      }
    } catch (error) {}


    if (window.result.length == 0){
      break;
    }
  }

  observer.disconnect();
})();
