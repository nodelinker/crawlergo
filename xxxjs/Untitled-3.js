// hook dom2 级事件监听
window.add_even_listener_count_sec_auto = {};
// record event func , hook addEventListener
let old_event_handle = Element.prototype.addEventListener;
Element.prototype.addEventListener = function(event_name, event_func, useCapture) {
    let name = "<" + this.tagName + "> " + this.id + this.name + this.getAttribute("class") + "|" + event_name;
    // console.log(name)
    // 对每个事件设定最大的添加次数，防止无限触发，最大次数为5
    if (!window.add_even_listener_count_sec_auto.hasOwnProperty(name)) {
        window.add_even_listener_count_sec_auto[name] = 1;
    } else if (window.add_even_listener_count_sec_auto[name] == 5) {
        return ;
    } else {
            window.add_even_listener_count_sec_auto[name] += 1;
    }
    if (this.hasAttribute("sec_auto_dom2_event_flag")) {
        let sec_auto_dom2_event_flag = this.getAttribute("sec_auto_dom2_event_flag");
        this.setAttribute("sec_auto_dom2_event_flag", sec_auto_dom2_event_flag + "|" + event_name);
    } else {
        this.setAttribute("sec_auto_dom2_event_flag", event_name);
    }
    old_event_handle.apply(this, arguments);
};

function dom0_listener_hook(that, event_name) {
    let name = "<" + that.tagName + "> " + that.id + that.name + that.getAttribute("class") + "|" + event_name;
    // console.log(name);
    // 对每个事件设定最大的添加次数，防止无限触发，最大次数为5
    if (!window.add_even_listener_count_sec_auto.hasOwnProperty(name)) {
        window.add_even_listener_count_sec_auto[name] = 1;
    } else if (window.add_even_listener_count_sec_auto[name] == 5) {
        return ;
    } else {
            window.add_even_listener_count_sec_auto[name] += 1;
    }
    if (that.hasAttribute("sec_auto_dom2_event_flag")) {
        let sec_auto_dom2_event_flag = that.getAttribute("sec_auto_dom2_event_flag");
        that.setAttribute("sec_auto_dom2_event_flag", sec_auto_dom2_event_flag + "|" + event_name);
    } else {
        that.setAttribute("sec_auto_dom2_event_flag", event_name);
    }
}

// hook dom0 级事件监听
Object.defineProperties(HTMLElement.prototype, {
    onclick: {set: function(newValue){onclick = newValue;dom0_listener_hook(this, "click");}},
    onchange: {set: function(newValue){onchange = newValue;dom0_listener_hook(this, "change");}},
    onblur: {set: function(newValue){onblur = newValue;dom0_listener_hook(this, "blur");}},
    ondblclick: {set: function(newValue){ondblclick = newValue;dom0_listener_hook(this, "dbclick");}},
    onfocus: {set: function(newValue){onfocus = newValue;dom0_listener_hook(this, "focus");}},
    onkeydown: {set: function(newValue){onkeydown = newValue;dom0_listener_hook(this, "keydown");}},
    onkeypress: {set: function(newValue){onkeypress = newValue;dom0_listener_hook(this, "keypress");}},
    onkeyup: {set: function(newValue){onkeyup = newValue;dom0_listener_hook(this, "keyup");}},
    onload: {set: function(newValue){onload = newValue;dom0_listener_hook(this, "load");}},
    onmousedown: {set: function(newValue){onmousedown = newValue;dom0_listener_hook(this, "mousedown");}},
    onmousemove: {set: function(newValue){onmousemove = newValue;dom0_listener_hook(this, "mousemove");}},
    onmouseout: {set: function(newValue){onmouseout = newValue;dom0_listener_hook(this, "mouseout");}},
    onmouseover: {set: function(newValue){onmouseover = newValue;dom0_listener_hook(this, "mouseover");}},
    onmouseup: {set: function(newValue){onmouseup = newValue;dom0_listener_hook(this, "mouseup");}},
    onreset: {set: function(newValue){onreset = newValue;dom0_listener_hook(this, "reset");}},
    onresize: {set: function(newValue){onresize = newValue;dom0_listener_hook(this, "resize");}},
    onselect: {set: function(newValue){onselect = newValue;dom0_listener_hook(this, "select");}},
    onsubmit: {set: function(newValue){onsubmit = newValue;dom0_listener_hook(this, "submit");}},
    onunload: {set: function(newValue){onunload = newValue;dom0_listener_hook(this, "unload");}},
    onabort: {set: function(newValue){onabort = newValue;dom0_listener_hook(this, "abort");}},
    onerror: {set: function(newValue){onerror = newValue;dom0_listener_hook(this, "error");}},
})

(async function trigger_all_dom2_custom_event() {

	function transmit_child(node, event, loop) {
		let _loop = loop + 1
		if (_loop > 4) {
			return;
		}
		if (node.nodeType === 1) {
			if (node.hasChildNodes) {
				let index = parseInt(Math.random()*node.children.length,10);
				try {
					node.children[index].dispatchEvent(event);
				} catch(e) {}
				let max = node.children.length>5?5:node.children.length;
				for (let count=0;count<max;count++) {
					let index = parseInt(Math.random()*node.children.length,10);
					transmit_child(node.children[index], event, _loop);
				}
			}
		}
	}
	let nodes = document.querySelectorAll("[sec_auto_dom2_event_flag]");
	if (nodes.length > 200) {
		nodes = nodes.slice(0, 200);
	}
	for (let node of nodes) {
		let loop = 0;
		await window.sleep(1000);
		let event_name_list = node.getAttribute("sec_auto_dom2_event_flag").split("|");
		let event_name_set = new Set(event_name_list);
		event_name_list = [...event_name_set];
		for (let event_name of event_name_list) {
			let evt = document.createEvent('CustomEvent');
			evt.initCustomEvent(event_name, true, true, null);
			
			if (event_name == "click" || event_name == "focus" || event_name == "mouseover" || event_name == "select") {
				transmit_child(node, evt, loop);
			}
			if ( (node.className && node.className.includes("close")) || (node.id && node.id.includes("close"))) {
				continue;
			}
			
			try {
				node.dispatchEvent(evt);
			} catch(e) {}
		}
	}
})()