---
sidebar_label: autosize
title: autosize config
description: "forces the Gantt chart to automatically change its size to show all tasks without scrolling"
---

# autosize

### Description

@short: Forces the Gantt chart to automatically change its size to show all tasks without scrolling

@signature: autosize: boolean | string

### Example

~~~jsx
gantt.config.autosize = "xy";

gantt.init("gantt_here");
~~~

**Default value:** false

### Details

The 'autosize' config defines whether the gantt will fit data inside the sizes of container where it's initialized showing inner scrollbars,
or modify the sizes of container in order to show all data without inner scrolls:

- [a sample with sizes of gantt div defined in css ](https://snippet.dhtmlx.com/5/b4d4d1b80) - inner scrollbars are active if necessary
- [a sample with sizes of gantt div calculated by a component](https://snippet.dhtmlx.com/5/c278b3859) - inner scrollbars are disabled

In case gantt should fit a certain area on a page, the size of gantt container must be managed manually:

- autosizing should be disabled 
- width/height of a div should be calculated either by html layout if some ready solution for responsive layouts is used, or manually by code.

## Scrolling to hidden elements 

In the default mode, Gantt is scrolled automatically when you use the [showTask](api/method/showtask.md) or [showDate](api/method/showdate.md) method.
But, when **autosize** is enabled, Gantt increases the size of its container to show itself on the page instead of showing the hidden element.

There is no any universal way to escape the problem because the page can also include other elements except for Gantt, and some of the elements also need to be scrolled. Therefore, this problem should be solved depending on the page/application configuration.

In a *simple* configuration, Gantt may be located before or after some elements in your application. And it can work correctly if you scroll the page.

In a *complex* configuration, the Gantt container can be placed into other containers which can also be placed in some other containers. 
In this case, you need to manually scroll only the elements you need. 

One of the ways to make the page to be scrolled to the necessary element is use the **element.scrollIntoView** method:

~~~js
var attr = gantt.config.task_attribute;
var timelineElement = document.querySelector(".gantt_task_line["+attr+"='"+id+"']");
if(timelineElement)
    timelineElement.scrollIntoView({block:"center"});
~~~

where id is the task ID you need to show.

Another way is to modify the [showTask](api/method/showtask.md) or [showDate](api/method/showdate.md) method of Gantt:

~~~js
var showTask = gantt.showTask;

gantt.showTask = function(id){
  showTask.apply(this, [id]);
  var attr = gantt.config.task_attribute;
  var timelineElement = document.querySelector(".gantt_task_line["+attr+"='"+id+"']");
  if(timelineElement)
    timelineElement.scrollIntoView({block:"center"});
};
~~~

or create a custom function to show the task:

~~~js
function showTask(id){
  gantt.showTask(id);
  var attr = gantt.config.task_attribute;
  var timelineElement = document.querySelector(".gantt_task_line["+attr+"='"+id+"']");
    if(timelineElement)
      timelineElement.scrollIntoView({block:"center"});
}
~~~

:::note
sample: [Scrolling to the specified element](https://snippet.dhtmlx.com/or73u6a5)
:::

### Related API
- [autosize_min_width](api/config/autosize_min_width.md)

