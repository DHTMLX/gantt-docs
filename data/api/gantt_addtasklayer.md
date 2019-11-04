addTaskLayer
=============

@short:displays an additional layer with custom elements for a task in the timeline area
@edition: pro

@params:
- func		function,object		a render function or a config object 

@returns:
- layerId		string		a DOM element that will be displayed in the layer


@example:
gantt.init("gantt_here");
gantt.addTaskLayer(function draw_deadline(task) {
	if (task.deadline) {
		var el = document.createElement('div');
		el.className = 'deadline';
		var sizes = gantt.getTaskPosition(task, task.deadline);

		el.style.left = sizes.left + 'px';
		el.style.top = sizes.top + 'px';

		el.setAttribute('title', gantt.templates.task_date(task.deadline));
		return el;
	}
	return false;
});


@related:desktop/baselines.md
@relatedapi:api/gantt_gettaskposition.md
  api/gantt_removetasklayer.md
  api/gantt_layer_attribute_config.md
@relatedsample:
	04_customization/14_deadline.html
    04_customization/15_baselines.html
	
@template:	api_method
@descr:
{{pronote This functionality is available in the PRO edition only.}}

- The argument function takes a task's object as a parameter and must return a DOM element that will be displayed in the layer.
- The argument can also be an object. In this case, it can have the following properties:
	- **renderer** - (*function|object*)  a function that answers for rendering the layer's elements (mandatory)
	- **container** - (*HTMLElement*) a layer's container (optional)
    - **topmost** - (*boolean*) if true, the element will be displayed over the task (optional)
    - **filter** - (*function*) a function that takes a task object as a parameter. If returns 'false', the 'renderer' function won't be called for a task (optional)
- Beware, custom layers will be reset after the next call of <a href="api/gantt_init.md">gantt.init</a>


##Smart rendering for custom layers

**By default**, dhtmlxGantt renders custom elements in the mode of the **vertical "Smart Rendering"**. In this mode the whole row of the specified task are  rendered at the moment it is visible in the viewport.

**To increase the overall performance** of the custom elements you can enable the **horizontal "Smart Rendering"** of custom layers. <br> To do that, you need to pass two parameters in the config of the **renderer** object of the *addTaskLayer()* method:

- **render** - a rendering function
- **getRectangle** - a function that returns an object with the coordinates of custom elements

~~~js
gantt.addTaskLayer({
    renderer: {
        render: function (task, timeline, viewport) {
            ...
            return  HTMLElement
        },
        getRectangle: function(task, view){
            ....
            return {left, top, height, width};
        }
    }
});
~~~

The logic of rendering custom elements is the following:

1\. When the  position of horizontal scroll is changed, the smart render gets new coordinates of the area visible on the screen at the moment. <br>
2\. The dhtmlxGantt calls the **getRectangle** function for each task/link to get the exact coordinates of a custom element. <br>
3\. If the **getRectangle** function returns null value, the **render** function won't be called and the custom element won't be displayed.<br>
4\. If the function returns an object with the coordinates of a task/link and the received coordinates fall in the current viewport, then the **render** function will be called to display a task/link.<br>

~~~js
gantt.addTaskLayer({
    renderer: {
      render: function draw_planned(task) {
        if (task.planned_start && task.planned_end) {
          var sizes = gantt.getTaskPosition(task,task.planned_start,task.planned_end);
          var el = document.createElement('div');
          el.className = 'baseline';
          el.style.left = sizes.left + 'px';
          el.style.width = sizes.width + 'px';
          el.style.top = sizes.top + gantt.config.task_height + 13 + 'px';
          return el;
        }
        return false;
      },
      // define getRectangle in order to hook layer with the smart rendering
      getRectangle: function(task, view){
        return gantt.getTaskPosition(task, task.planned_start, task.planned_end);
      }
    }
});
~~~

###Rendering visible parts of custom elements

The **renderer** object of the *AddTaskLayer()* method provides a possibility to update the node markup of a custom element and display the visible content in the current viewport via the **update** method:

~~~js
gantt.addTaskLayer({
    renderer: {
        render: function (task, timeline, viewport) {
            ...
            return  HTMLElement
        },
        update: function (task, node, timeline, viewport) {
            ...
            // put the currently visible part of the element into node inner html
        },
        getRectangle: function(task, view){
            ....
            return {left, top, height, width};
        }
    }
});
~~~

- **update** - calls after the [onGanttScroll](api/gantt_onganttscroll_event.md) event is fired. It provides a task node (created by the render method initially) and a current viewport. 

The method allows to update an inner html of a custom element, i.e. to hide cells that are not visible and display the visible ones.