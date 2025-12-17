---
sidebar_label: utils
title: utils config
description: "various helper modules"
---

# utils

### Description

@short: Various helper modules

@signature: utils: \{ dom: DomHelpers \}

### Example

~~~jsx
var tooltips = gantt.ext.tooltips;
tooltips.tooltipFor({
    selector: ".gantt_scale_cell",
    html: function (event, node) {
        const domHelper = gantt.utils.dom;
        const pos = domHelper.getRelativeEventPosition(event, gantt.$task_scale);
        return gantt.templates.task_date(gantt.dateFromPos(pos.x));
}
});
~~~

### Details

Currently the module contains only the helper for DOM operations available at **gantt.utils.dom**


~~~js
var domHelpers = gantt.utils.dom;
~~~

Which have following methods:

- **getNodePosition (node): object** - returns position of the element on the screen in the format of `{x:number, y:number,width:number, height:number}` object
  - **_node_** - (*HTMLElement*) - DOM element that will be checked

- **getRelativeEventPosition (e, node): object** - returns mouse coordinates relatively to the DOM element in the format of `{x:number, y:number}` object
  - **_e_** - (*Event*) - event that occured
  - **_node_** - (*HTMLElement*) - DOM element that will be checked


~~~js
gantt.message({
    expire: -1,
    text: ""
});

const formatDate = gantt.date.date_to_str("%Y-%m-%d %H:%i");
gantt.attachEvent("onMouseMove", function (id, e){
    const helper = gantt.utils.dom;
    if(helper.isChildOf(e.target, gantt.$task_data)){
        const textContainer = document.querySelector("#pointer-date");
        const pos = helper.getRelativeEventPosition(e, gantt.$task_data);
        const pointerDate = gantt.dateFromPos(pos.x);
        textContainer.innerText = formatDate(pointerDate);
    }
});
~~~

- **isChildOf (child, parent): boolean** - returns `true` if the node provided as the first argument is DOM child of the node provided as the second argument
  - **_child_** - (*HTMLElement*) - child node that will be checked
  - **_parent_** - (*HTMLElement*) - parent node that will be checked

- **hasClass (node, className): boolean** - returns `true` if the class list of the provided `node` contains a specified css class 
  - **_node_** - (*HTMLElement*) - DOM element that will be checked
  - **_className_** - (*string*) - class name that will be checked

- **closest (node, cssSelector): HTMLElement**> - returns the first node that matches the provided css selector, starting from the `node` attribute, up to its DOM parents' branch.
  - **_node_** - (*HTMLElement*) - DOM element will be checked
  - **_cssSelector_** - (*string*) - a class name for the target node

~~~js
gantt.attachEvent("onEmptyClick", function (e) {
  const domHelpers = gantt.utils.dom;
  if(!domHelpers.closest(e.target, `[${gantt.config.link_attribute}]`)){
    gantt.message("not a link");
  }else{
    gantt.message("link!"); 
  }
});
~~~


### Related samples
- [Custom Tooltips](https://docs.dhtmlx.com/gantt/samples/02_extensions/22_tooltip_api.html)
