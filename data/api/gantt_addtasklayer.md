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


@related:
desktop/baselines.md
desktop/how_to.md#howtoverticallyreordertasksinthetimeline (read how to vertically reorder tasks in the timeline)


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
	- **id?** - (*string | number*) - the layer ID
	- **renderer** - (*function|object*) - a function that answers for rendering the layer's elements (mandatory)
	- **container?** - (*HTMLElement*) - a layer's container (optional)
    - **topmost?** - (*boolean*) - if true, the element will be displayed over the task (optional)
    - **filter?** - (*function*) - a function that takes a task object as a parameter. If returns 'false', the 'renderer' function won't be called for a task (optional)
- Beware, custom layers will be reset after the next call of <a href="api/gantt_init.md">gantt.init</a>
- Calling the [gantt.resetLayout()](api/gantt_resetlayout.md) method will also reset custom layers. In order for custom layers to be displayed on a page, you need to redefine the **gantt.addTaskLayer**  method after calling api/gantt_resetlayout.md.

##Smart rendering for custom layers

[Smart rendering](desktop/performance.md#smartrendering) tries to display only those HTML elements that are currently visible to the user and not hidden under horizontal and vertical scroll bars.

However, in the case of [custom layers](desktop/baselines.md), Gantt doesn't know where custom elements are located, since it's completely up to the implementation of the custom rendering function.

As a solution, smart rendering assumes that a custom element is located in the same row where its related task is. Custom elements are added to the page markup when rows of their related tasks are rendered on the screen. In this mode Gantt doesn't take the position of horizontal scrollbar into consideration, a custom element will be rendered in the markup but won't be visible on the page because of the horizontal scroll.

Most of the time it's good enough, but if you have many layers, you may want to optimize the rendering a bit further by providing Gantt with information on position of custom elements.


To do that, you need to use the *object* parameter of the *addTaskLayer()* method, and provide the **renderer**  object with the following methods:

- **render** - a rendering function
- **getRectangle** - a function that returns an object with the coordinates of custom elements

~~~js
gantt.addTaskLayer({
    renderer: {
        render: function(task, timeline, viewport){
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
2\. dhtmlxGantt calls the **getRectangle** function for each task/link to get the exact coordinates of a custom element. <br>
3\. If the **getRectangle** function returns null value, the **render** function won't be called and the custom element won't be displayed.<br>
4\. If the **getRectangle** function returns an object with the coordinates of a task/link and the received coordinates fall in the current viewport, then the **render** function will be called to display a task/link.<br>

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

The **renderer** object of the *addTaskLayer()* method provides a possibility to update the node markup of a custom element and display the visible content in the current viewport via the **update** method:

~~~js
gantt.addTaskLayer({
    renderer: {
        render: function(task, timeline, viewport){
            ...
            return  HTMLElement
        },
        update: function(task, node, timeline, viewport){
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

- **update** - allows updating an inner html of a custom element, i.e. hiding cells that are not visible and displaying the visible ones

The **update** method is called after the [onGanttScroll](api/gantt_onganttscroll_event.md) event is fired. It provides a task node (created by the **render** method initially) and a current viewport.

### Rendering visible tasks rows

Since v7.1.8 the **renderer** object of the *addTaskLayer()* method allows getting a visible range of tasks rows with the **getVisibleRange** function: 

~~~js
gantt.addTaskLayer({
    renderer: {
        render: function(task, timeline, viewport){
            ...
            return  HTMLElement
        },
        getVisibleRange: function(){
        	...
            return { 
  				start: indexStart,
  				end: indexEnd
			}
        }
	}
});     
~~~

- **getVisibleRange** - a function that returns an object with the start and end indexes of visible tasks rows. 
If a task is out of the specified range, an additional layer is not rendered for it. 

If the **getVisibleRange** function returns *false* instead of an object, Gantt supposes that all the range of tasks is used and an additional layer will be rendered even if a task is not visible on the screen.

### Element render callback

The **renderer** object of the *addTaskLayer()* method provides the **onrender** callback:

~~~js
gantt.addTaskLayer({
    renderer: {
        render: function(task, timeline, viewport){
            ...
            return  HTMLElement
        },
        onrender: function(item, node, view){
            console.log("render", item, node)
        }
    }
});
~~~

The **onrender** function is called whenever the data item of the layer is rendered to DOM. The arguments give you access to the data item that has been rendered, the result DOM element and the view object which called the render (grid or timeline). 

The callback can be used either to modify DOM elements after they are rendered to DOM, or to initialize the 3rd party widgets inside the rendered elements.