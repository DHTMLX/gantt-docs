utils
=============

@short:
	various helper modules

@type:
object

@example:

var tooltips = gantt.ext.tooltips;
tooltips.tooltipFor({
	selector: ".gantt_scale_cell",
	html: function (event, node) {
		var domHelper = gantt.utils.dom;
		var pos = domHelper.getRelativeEventPosition(event, gantt.$task_scale);
		return gantt.templates.task_date(gantt.dateFromPos(pos.x));
}
});

@template:	api_config


@descr:

Currently the module contains only the helper for DOM operations available at **gantt.utils.dom**


~~~js
var domHelpers = gantt.utils.dom;
~~~

Which have following methods:

- <span class=submethod>**getNodePosition (node): object**</span> - returns position of the element on the screen in the format of `{x:number, y:number,width:number, height:number}` object
  - **_node_** - (*HTMLElement*) - DOM element that will be checked

- <span class=submethod>**getRelativeEventPosition (e, node): object**</span> - returns mouse coordinates relatively to the DOM element in the format of `{x:number, y:number}` object
  - **_e_** - (*Event*) - event that occured
  - **_node_** - (*HTMLElement*) - DOM element that will be checked


~~~js
gantt.message({
	expire: -1,
	text: "<span id='pointer-date'></span>"
});

var formatDate = gantt.date.date_to_str("%Y-%m-%d %H:%i");
gantt.attachEvent("onMouseMove", function (id, e){
	var helper = gantt.utils.dom;
	if(helper.isChildOf(e.target, gantt.$task_data)){
      	var textContainer = document.querySelector("#pointer-date");
		var pos = helper.getRelativeEventPosition(e, gantt.$task_data);
		var pointerDate = gantt.dateFromPos(pos.x);
		textContainer.innerText = formatDate(pointerDate);
    }
});
~~~

- <span class=submethod>**isChildOf (child, parent): boolean**</span> - returns `true` if the node provided as the first argument is DOM child of the node provided as the second argument
  - **_child_** - (*HTMLElement*) - child node that will be checked
  - **_parent_** - (*HTMLElement*) - parent node that will be checked

- <span class=submethod>**hasClass (node, className): boolean**</span> - returns `true` if the class list of the provided `node` contains a specified css class 
  - **_node_** - (*HTMLElement*) - DOM element that will be checked
  - **_className_** - (*string*) - class name that will be checked

- <span class=submethod>**closest (node, cssSelector): HTMLElement**</span>> - returns the first node that matches the provided css selector, starting from the `node` attribute, up to its DOM parents' branch.
  - **_node_** - (*HTMLElement*) - DOM element will be checked
  - **_cssSelector_** - (*string*) - a class name for the target node

~~~js
gantt.attachEvent("onEmptyClick", function (e) {
  var domHelpers = gantt.utils.dom;
  if(!domHelpers.closest(e.target, "[" + gantt.config.link_attribute + "]")){
    gantt.message("not a link");
  }else{
    gantt.message("link!"); 
  }
});
~~~


@relatedsample
	- 02_extensions/22_tooltip_api.html