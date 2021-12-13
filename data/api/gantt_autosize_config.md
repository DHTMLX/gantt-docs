autosize
=============
@short:forces the Gantt chart to automatically change its size to show all tasks without scrolling
	

@type: boolean, string
@default:false
@values:"y" ( or true),"x", "xy"
@example:
gantt.config.autosize = "xy";

gantt.init("gantt_here");

@template:	api_config
@descr:
The 'autosize' config defines whether the gantt will fit data inside the sizes of container where it's initialized showing inner scrollbars,
or modify the sizes of container in order to show all data without inner scrolls:

- [a sample with sizes of gantt div defined in css ](https://snippet.dhtmlx.com/5/b4d4d1b80) - inner scrollbars are active if necessary
- [a sample with sizes of gantt div calculated by a component](https://snippet.dhtmlx.com/5/c278b3859) - inner scrollbars are disabled

In case gantt should fit a certain area on a page, the size of gantt container must be managed manually:

- autosizing should be disabled 
- width/height of a div should be calculated either by html layout if some ready solution for responsive layouts is used, or manually by code.

### Scrolling to hidden elements 

In the default mode, Gantt is scrolled automatically when you use the [showTask](api/gantt_showtask.md) or [showDate](api/gantt_showdate.md) method.
But if **autosize** is enabled, Gantt increases the size of its container to show itself on the page instead of showing the hidden element.

In a simple configuration, Gantt may be located before or after some elements in your application. And it will work correctly if you scroll the page.

In a complex configuration, the Gantt container may be placed into other containers which can also be placed in some other containers. 
In this case, Gantt will scroll each parent container and the page, and this may not work as you expect. For example, Gantt will scroll some containers you don't want to scroll.

So, this problem should be solved depending on the page/application configuration.

The easiest way is to use the **element.scrollIntoView** method:

~~~js
var attr = gantt.config.task_attribute;
var timelineElement = document.querySelector(".gantt_task_line["+attr+"='"+id+"']");
if(timelineElement)
    timelineElement.scrollIntoView({block:"center"});
~~~

Where id is the task ID you need to show.

Another way is to modify the [showTask](api/gantt_showtask.md) or [showDate](api/gantt_showdate.md) method of Gantt:

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

{{editor	https://snippet.dhtmlx.com/5/71a70c1d0	Scrolling to the specified element}}

@relatedapi: 
	api/gantt_autosize_min_width_config.md