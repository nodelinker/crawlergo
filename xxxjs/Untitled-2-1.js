function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(function init_observer_sec_auto_b() {
  window.dom_listener_func_sec_auto = function (e) {
    let node = e.target;

    try {
      let nodeListSrc = node.querySelectorAll("[src]");
      for (let each of nodeListSrc) {
        if (each.src) {
          console.log(each.src);
          let attrValue = each.getAttribute("src");
          if (attrValue.toLocaleLowerCase().startsWith("javascript:")) {
            eval(attrValue.substring(11));
          } else {
            window.addLink(each.href, "DOM");
          }
        }
      }

      let nodeListHref = node.querySelectorAll("[href]");
      for (let each of nodeListHref) {
        if (each.href) {
          let attrValue = each.getAttribute("href");
          if (attrValue.toLocaleLowerCase().startsWith("javascript:")) {
            eval(attrValue.substring(11));
          } else {
            window.addLink(each.href, "DOM");
          }
        }
      }
    } catch (error) {}
  };
  document.addEventListener(
    "DOMNodeInserted",
    window.dom_listener_func_sec_auto,
    true
  );
  document.addEventListener(
    "DOMSubtreeModified",
    window.dom_listener_func_sec_auto,
    true
  );
  document.addEventListener(
    "DOMNodeInsertedIntoDocument",
    window.dom_listener_func_sec_auto,
    true
  );
  document.addEventListener(
    "DOMAttrModified",
    window.dom_listener_func_sec_auto,
    true
  );
})();

(async function click_all_a_tag_javascript() {
  let nodeListHref = document.querySelectorAll("[href]");
  for (let node of nodeListHref) {
    let attrValue = node.getAttribute("href");
    if (attrValue.toLocaleLowerCase().startsWith("javascript:")) {
      await sleep(5000);
      try {
        eval(attrValue.substring(11));
      } catch {}
    }
  }
  let nodeListSrc = document.querySelectorAll("[src]");
  for (let node of nodeListSrc) {
    let attrValue = node.getAttribute("src");
    if (attrValue.toLocaleLowerCase().startsWith("javascript:")) {
      await sleep(5000);
      try {
        eval(attrValue.substring(11));
      } catch {}
    }
  }
})();
