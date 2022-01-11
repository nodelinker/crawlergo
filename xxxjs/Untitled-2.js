listElm = document.querySelector("body");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function syncSleep(sleepTime) {
	for(var start = new Date; new Date - start <= sleepTime;) {}
}

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
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
observer = observeDOM(listElm, async function (m) {
  var addedNodes = [],
    removedNodes = [];

  m.forEach(
    (record) => record.addedNodes.length & addedNodes.push(...record.addedNodes)
  );
  m.forEach(
    (record) =>
      record.removedNodes.length & removedNodes.push(...record.removedNodes)
  );
  // console.clear();
  // console.log("Added:", addedNodes, "Removed:", removedNodes);

  for (var i = 0; i < addedNodes.length; i++) {
    try {
      var _ = addedNodes[i];

      console.log(_);

      let nodeListHref = _.querySelectorAll("[href]");
      for (let node1 of nodeListHref) {
        let attrValue = node1.getAttribute("href");
        if (attrValue.toLocaleLowerCase().startsWith("javascript:")) {
          // await sleep(1000);
          eval(attrValue.substring(11));
        }
        for (var i = 0;i < 10; i++){
          if (window.globalLock  == 1){
            await sleep(1000);
          }
        }
      }
      let nodeListSrc = _.querySelectorAll("[src]");
      for (let node2 of nodeListSrc) {
        let attrValue = node2.getAttribute("src");
        if (attrValue.toLocaleLowerCase().startsWith("javascript:")) {
          // await sleep(1000);
          eval(attrValue.substring(11));
        }

        for (var i = 0;i < 10; i++){
          if (window.globalLock  == 1){
            await sleep(1000);
          }
        }
      }
    } catch (error) {
      console.log(error);
      continue;
    }
  }
});

var origOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function () {

  console.log("request started!");
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
  });

  // this.addEventListener("timeout", function () {
  //   console.log("request completed!");
  //   console.log(this.readyState);
  //   console.log(this.responseText); //whatever the response was
  // });
  origOpen.apply(this, arguments);
};


let origSend = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function() {
  
  console.log("request send!");

   this.addEventListener('readystatechange', function() {
      // if (this.responseURL.includes(urlmatch) && this.readyState === 4) {
      //    callback(this);
      // }
      console.log(arguments);
   }, false);
   origSend.apply(this, arguments);
};


(async function click_all_a_tag_javascript() {
  let nodeListHref = document.querySelectorAll("[href]");
  for (let node of nodeListHref) {
    let attrValue = node.getAttribute("href");
    if (attrValue.toLocaleLowerCase().startsWith("javascript:")) {
      try {
        eval(attrValue.substring(11));

      } catch {}
    }

    for (var i = 0;i < 10; i++){
      console.log("aaaaaaaaaaaaaaaaaaaaaaaa", i);
      if (window.globalLock  == 1){
        await sleep(1000);
      }
    }
  }
  let nodeListSrc = document.querySelectorAll("[src]");
  for (let node of nodeListSrc) {
    let attrValue = node.getAttribute("src");
    if (attrValue.toLocaleLowerCase().startsWith("javascript:")) {
      try {
        eval(attrValue.substring(11));
        await sleep(1000);
      } catch {}
    }

    for (var i = 0;i < 10; i++){
      console.log("bbbbbbbbbbbbbbbbbbbbbbbbb", i);
      if (window.globalLock  == 1){
        await sleep(1000);
      }
    }
    
  }
})();


(async function trigger_all_inline_event(){
	let eventNames = ["onabort", "onblur", "onchange", "onclick", "ondblclick", "onerror", "onfocus", "onkeydown", "onkeypress", "onkeyup", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onreset", "onresize", "onselect", "onsubmit", "onunload"];
	for (let eventName of eventNames) {
		let event = eventName.replace("on", "");
		let nodeList = document.querySelectorAll("[" + eventName + "]");
		if (nodeList.length > 100) {
			nodeList = nodeList.slice(0, 100);
		}
		for (let node of nodeList) {
			await sleep(1000);
			let evt = document.createEvent('CustomEvent');
			evt.initCustomEvent(event, false, true, null);
			try {
				node.dispatchEvent(evt);
			}
			catch {}

      for (var i = 0;i < 10; i++){
        console.log("bbbbbbbbbbbbbbbbbbbbbbbbb", i);
        if (window.globalLock  == 1){
          await sleep(1000);
        }
      }
		}
	}
})()