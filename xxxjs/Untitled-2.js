listElm = document.querySelector("body");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
  console.clear();
  console.log("Added:", addedNodes, "Removed:", removedNodes);

  for (var i = 0; i < addedNodes.length; i++) {
    try {
      var _ = addedNodes[i];

      console.log(_);

      let nodeListHref = _.querySelectorAll("[href]");
      for (let node1 of nodeListHref) {
        let attrValue = node1.getAttribute("href");
        if (attrValue.toLocaleLowerCase().startsWith("javascript:")) {
          await sleep(1000);
          eval(attrValue.substring(11));
        }
      }
      let nodeListSrc = _.querySelectorAll("[src]");
      for (let node2 of nodeListSrc) {
        let attrValue = node2.getAttribute("src");
        if (attrValue.toLocaleLowerCase().startsWith("javascript:")) {
          await sleep(1000);
          eval(attrValue.substring(11));
        }
      }
    } catch (error) {
      console.log(error);
      continue;
    }
  }
});


(async function click_all_a_tag_javascript(){
	let nodeListHref = document.querySelectorAll("[href]");
	for (let node of nodeListHref) {
		let attrValue = node.getAttribute("href");
		if (attrValue.toLocaleLowerCase().startsWith("javascript:")) {
			await sleep(5000);
			try {
				eval(attrValue.substring(11));
			}
			catch {}
		}
	}
	let nodeListSrc = document.querySelectorAll("[src]");
	for (let node of nodeListSrc) {
		let attrValue = node.getAttribute("src");
		if (attrValue.toLocaleLowerCase().startsWith("javascript:")) {
			await sleep(5000);
			try {
				eval(attrValue.substring(11));
			}
			catch {}
		}
	}

})()
