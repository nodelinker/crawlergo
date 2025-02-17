window.globalLock = 0;
window.listenerFinish = 0;
window.result = [];
waitCount = 8;
sleepTime = 1000;
rootElement = document.querySelector("body");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function syncSleep(sleepTime) {
  for (var start = new Date(); new Date() - start <= sleepTime; ) {}
}

const createLock = () => {
  let lockStatus = false;
  const release = () => {
    lockStatus = false;
  };

  const acuire = () => {
    if (lockStatus == true) return false;
    lockStatus = true;
    return true;
  };

  return {
    lockStatus: lockStatus,
    acuire: acuire,
    release: release,
  };
};

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
observer = observeDOM(rootElement, async function (m) {
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

  if (addedNodes.length > 0) {
    window.listenerFinish = 1;
  }

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
        for (var i = 0; i < waitCount; i++) {
          if (window.globalLock == 1) {
            await sleep(sleepTime);
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

        for (var i = 0; i < waitCount; i++) {
          if (window.globalLock == 1) {
            await sleep(sleepTime);
          }
        }
      }
    } catch (error) {
      continue;
    }
  }


  window.listenerFinish = 0;
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

let origSend = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function () {
  console.log("request send!");

  this.addEventListener(
    "readystatechange",
    function () {
      // if (this.responseURL.includes(urlmatch) && this.readyState === 4) {
      //    callback(this);
      // }
      console.log(arguments);
    },
    false
  );
  origSend.apply(this, arguments);
};


async function XXXInlineTrigger(){
  let nodeListHref = document.querySelectorAll("[href]");
  for (let node of nodeListHref) {
    let attrValue = node.getAttribute("href");
    if (attrValue.toLocaleLowerCase().startsWith("javascript:")) {
      try {
        eval(attrValue.substring(11));

        for (var i = 0; i < waitCount; i++) {
          if (window.globalLock == 1) {
            console.log("aaaaaaaaaaaaaaaaaaaaaaaa", i);
            await sleep(sleepTime);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}


(async function click_all_a_tag_javascript() {
  let nodeListHref = document.querySelectorAll("[href]");
  for (let node of nodeListHref) {
    let attrValue = node.getAttribute("href");
    if (attrValue.toLocaleLowerCase().startsWith("javascript:")) {
      try {
        eval(attrValue.substring(11));

        for (var i = 0; i < waitCount; i++) {
          if (window.globalLock == 1) {
            console.log("aaaaaaaaaaaaaaaaaaaaaaaa", i);
            await sleep(sleepTime);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    await sleep(sleepTime);

    // // listener dom有没有执行完
    // while (1) {
    //   if (window.listenerFinish == 1) {
    //     debugger
    //     await sleep(2000);
    //   } else {
    //     break;
    //   }
    //   console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", Date.parse(new Date()));
    // }
  }
  let nodeListSrc = document.querySelectorAll("[src]");
  for (let node of nodeListSrc) {
    let attrValue = node.getAttribute("src");
    if (attrValue.toLocaleLowerCase().startsWith("javascript:")) {
      try {
        eval(attrValue.substring(11));

        for (var i = 0; i < waitCount; i++) {
          if (window.globalLock == 1) {
            console.log("bbbbbbbbbbbbbbbbbbbbbbbbb", i);
            await sleep(sleepTime);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
})();
