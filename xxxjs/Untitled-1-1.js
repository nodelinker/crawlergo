

(function addTabInitScript () {

	window.sleep = function(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}
	
	// 打乱数组的方法
	window.randArr = function (arr) {
		for (var i = 0; i < arr.length; i++) {
			var iRand = parseInt(arr.length * Math.random());
			var temp = arr[i];
			arr[i] = arr[iRand];
			arr[iRand] = temp;
		}
		return arr;
	}
})();

(function init_observer_sec_auto_b() {
	window.dom_listener_func_sec_auto = async function (e) {
		let node = e.target;
		let nodeListSrc = node.querySelectorAll("[src]");
		for (let each of nodeListSrc) {
			if (each.src) {
				
				let attrValue = each.getAttribute("src");
				if (attrValue.toLocaleLowerCase().startsWith("javascript:")) {
					try {
                        await window.sleep(1000);
						eval(attrValue.substring(11));
					}
					catch {}
				}else{
                    console.log(each.src);
					window.addLink(each.src, "DOM");
				}
			}
		}
		
		let nodeListHref = node.querySelectorAll("[href]");
		nodeListHref = window.randArr(nodeListHref);
		for (let each of nodeListHref) {
			if (each.href) {
				
				let attrValue = each.getAttribute("href");
				if (attrValue.toLocaleLowerCase().startsWith("javascript:")) {
					try {
                        await window.sleep(1000);
						eval(attrValue.substring(11));
					}
					catch {}
				}else{
                    console.log(each.href);
					window.addLink(each.href, "DOM");
				}
			}
		}
	};
	document.addEventListener('DOMNodeInserted', window.dom_listener_func_sec_auto, true);
	document.addEventListener('DOMSubtreeModified', window.dom_listener_func_sec_auto, true);
	document.addEventListener('DOMNodeInsertedIntoDocument', window.dom_listener_func_sec_auto, true);
	document.addEventListener('DOMAttrModified', window.dom_listener_func_sec_auto, true);
})();

(async function trigger_all_inline_event(){
	let eventNames = ["onabort", "onblur", "onchange", "onclick", "ondblclick", "onerror", "onfocus", "onkeydown", "onkeypress", "onkeyup", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onreset", "onresize", "onselect", "onsubmit", "onunload"];
	for (let eventName of eventNames) {
		let event = eventName.replace("on", "");
		let nodeList = document.querySelectorAll("[" + eventName + "]");
		if (nodeList.length > 100) {
			nodeList = nodeList.slice(0, 100);
		}
		nodeList = window.randArr(nodeList);
		for (let node of nodeList) {
			await window.sleep(1000);
			let evt = document.createEvent('CustomEvent');
			evt.initCustomEvent(event, false, true, null);
			try {
				node.dispatchEvent(evt);
			}
			catch {}
		}
	}
})()