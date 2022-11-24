onMouseMove
=============

@short:fires when the mouse is moved over the gantt container



@params:
- id		string,number		the id of the task that the mouse is moved over
- e			Event				a native event object



@example:
gantt.attachEvent("onMouseMove", function (id, e){
    //any custom logic here
});


@template:	api_event
@descr:

This event is an alias of the native [mousemove](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event) event handler attached to the **gantt.$root** element.

When the event target is a node of a task element, the related task id will be passed into the first argument.
Otherwise, the first argument will be null.


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
{{editor    https://snippet.dhtmlx.com/5/cd04d742c		Getting date-time under the mouse cursor}}

@relatedapi: api/gantt_utils_other.md