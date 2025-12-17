---
sidebar_label: onEmptyClick
title: onEmptyClick event
description: "fires when the user clicks on an empty space in the Gantt chart (not on tasks)"
---

# onEmptyClick

### Description

@short: Fires when the user clicks on an empty space in the Gantt chart (not on tasks)

@signature: onEmptyClick: (e: Event) =\> void;

### Parameters

- `e` - (required) *Event* - a native event object

### Example

~~~jsx
gantt.attachEvent("onEmptyClick", function (e){
    //any custom logic here
});
~~~

### Details

The **onEmptyClick** event also fires when the user clicks on a link. You can  prevent this feature of the event. To do this, you need to check whether the `e.target` element or the closest one to it contains the **link_attribute** property, as in:

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
