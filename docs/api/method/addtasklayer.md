---
sidebar_label: addTaskLayer
title: addTaskLayer method
description: "displays an additional layer with custom elements for a task in the timeline area"
---

# addTaskLayer

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: Displays an additional layer with custom elements for a task in the timeline area

@signature: addTaskLayer: (func: AdditionalTaskLayer['TaskLayerRender'] | AdditionalTaskLayer['TaskLayerConfig']) =\> string

### Parameters

- `func` - (required) *TaskLayerRender | TaskLayerConfig* -        a render function or a config object

### Returns
- ` layerId` - (string) - a DOM element that will be displayed in the layer

### Example

~~~jsx
gantt.init("gantt_here");

gantt.addTaskLayer((task) => {
  if (task.deadline) {
    const el = document.createElement("div");
    el.className = "deadline";

    const sizes = gantt.getTaskPosition(task, task.deadline);
    el.style.left = `${sizes.left}px`;
    el.style.top = `${sizes.top}px`;

    el.setAttribute("title", gantt.templates.task_date(task.deadline));
    return el;
  }
  return false;
});
~~~

### Details

The argument can have these types:


- **taskLayerRender (task, timeline, config, viewport): HTMLElement|boolean|void** - a function takes a task's object as a parameter and must return a DOM element that will be displayed in the layer.
    - **_task_** - (*Task*) - the task object
    - **_timeline?_** - (*any*) - the timeline view
    - **_config?_** - (*GanttConfigOptions*) - the Gantt configuration object
    - **_viewport?_** - (*LayerViewport*) - the viewport object

- **taskLayerConfig** - (*object*) - the configuration object for the additional task layer. Has the following properties:
    - **_id?_** - (*string | number*) - optional, the layer ID
    - **_renderer_** - (*object*) - mandatory, a function that answers for rendering the layer's elements
        - **_render_** - (*TaskLayerRender*) - the function that returns HTML element that should be rendered
        - **_update?_** - (*Function*): void - optional, a function where you can update the rendered HTML elements
            - **_task_** - (*Task*) - the task object
            - **_node_** - (*HTMLElement*) - the container of the rendered node
            - **_timeline?_** - (*any*) - the timeline view
            - **_config?_** - (*GanttConfigOptions*) - the Gantt configuration object
            - **_viewport?_** - (*LayerViewport*) - the viewport object
        - **_onrender?_** - (*Function*): void - optional, this function is called after rendering is complete. You can use it to render native components (for example, using the `ReactDOM.render` method)
            - **_task_** - (*Task*) - the task object
            - **_node_** - (*HTMLElement*) - the container of the rendered node
            - **_view?_** - (*any*) - the layout cell where the layer is added (timeline, by default)
        - **_getRectangle?_** - (*Function*): \{ left: number, top: number, height: number, width: number \} | void - optional, a function that returns the coordinates of the viewport rectangle
            - **_task_** - (*Task*) - the task object
            - **_view?_** - (*any*) - the layout cell where the layer is added (timeline, by default)
            - **_config?_** - (*GanttConfigOptions*) - the Gantt configuration object
            - **_gantt?_** - (*GanttStatic*) - the Gantt object
        - **_getVisibleRange_** - (*Function*): \{start: number, end: number\} | undefined | void - a function that returns the object with of the visible range
            - **_gantt?_** - (*GanttStatic*) - the Gantt object
            - **_view?_** - (*any*) - the layout cell where the layer is added (timeline, by default)
            - **_config?_** - (*GanttConfigOptions*) - the Gantt configuration object
            - **_datastore?_** - (*any*) - the task datastore object
            - **_viewport?_** - (*LayerViewport*) - the viewport object
    - **_container?_** - (*HTMLElement*) - optional, a layer's container
    - **_topmost?_** - (*boolean*) - optional, if true, the element will be displayed over the task
    - **_filter?_** - (*Function*): boolean - optional, a function that takes a task object as a parameter. If returns 'false', the 'renderer' function won't be called for a task
        - **_task_** - (*Task*) - the task object

  
The layer viewport has these properties:

- **viewport** -  (*object*) - the layer viewport object
    - **_x_** - (*number*) - the left rectangle position
    - **_x_end_** - (*number*) - the right rectangle position
    - **_y_** - (*number*) - the top rectangle position
    - **_y_end_** - (*number*) - the bottom rectangle position
    - **_width_** - (*number*) - the rectangle width
    - **_height_** - (*number*) - the rectangle height


- Beware, custom layers will be reset after the next call of gantt.init
- Calling the [gantt.resetLayout()](api/method/resetlayout.md) method will also reset custom layers. In order for custom layers to be displayed on a page, you need to redefine the **gantt.addTaskLayer**  method after calling [](api/method/resetlayout.md).

## Smart rendering for custom layers

[Smart rendering](guides/performance.md#smart-rendering) tries to display only those HTML elements that are currently visible to the user and not hidden under horizontal and vertical scroll bars.

However, in the case of [custom layers](guides/baselines.md), Gantt doesn't know where custom elements are located, since it's completely up to the implementation of the custom rendering function.

As a solution, smart rendering assumes that a custom element is located in the same row where its related task is. Custom elements are added to the page markup when rows of their related tasks are rendered on the screen. In this mode Gantt doesn't take the position of horizontal scrollbar into consideration, a custom element will be rendered in the markup but won't be visible on the page because of the horizontal scroll.

Most of the time it's good enough, but if you have many layers, you may want to optimize the rendering a bit further by providing Gantt with information on position of custom elements.


To do that, you need to use the *object* parameter of the *addTaskLayer()* method, and provide the **renderer** object with the following methods:

- **render** - a rendering function
- **getRectangle** - a function that returns an object with the coordinates of custom elements

~~~js
gantt.addTaskLayer({
  renderer: {
    render: (task, timeline, viewport) => {
      // ...
      return /* HTMLElement */;
    },
    getRectangle: (task, view) => {
      // ...
      return { left, top, height, width };
    }
  }
});
~~~

The logic of rendering custom elements is the following:

1\. When the position of horizontal scroll is changed, the smart render gets new coordinates of the area visible on the screen at the moment. 
2\. dhtmlxGantt calls the **getRectangle** function for each task/link to get the exact coordinates of a custom element. 
3\. If the **getRectangle** function returns null value, the **render** function won't be called and the custom element won't be displayed.
4\. If the **getRectangle** function returns an object with the coordinates of a task/link and the received coordinates fall in the current viewport, then the **render** function will be called to display a task/link.

~~~js
gantt.addTaskLayer({
  renderer: {
    render: (task) => {
      if (task.planned_start && task.planned_end) {
        const sizes = gantt.getTaskPosition(
          task,
          task.planned_start,
          task.planned_end
        );
        const el = document.createElement('div');
        el.className = 'baseline';
        el.style.left = sizes.left + 'px';
        el.style.width = sizes.width + 'px';
        el.style.top = (sizes.top + gantt.config.task_height + 13) + 'px';
        return el;
      }
      return false;
    },
    // define getRectangle in order to hook layer with the smart rendering
    getRectangle: (task, view) =>
      gantt.getTaskPosition(
        task,
        task.planned_start,
        task.planned_end
      )
  }
});
~~~

### Rendering visible parts of custom elements

The **renderer** object of the *addTaskLayer()* method provides a possibility to update the node markup of a custom element and display the visible content in the current viewport via the **update** method:

~~~js
gantt.addTaskLayer({
  renderer: {
    render: (task, timeline, viewport) => {
      // ...
      return /* HTMLElement */;
    },
    update: (task, node, timeline, viewport) => {
      // ...
      // put the currently visible part of the element into node inner html
    },
    getRectangle: (task, view) => {
      // ...
      return { left, top, height, width };
    }
  }
});
~~~

- **update** - allows updating an inner html of a custom element, i.e. hiding cells that are not visible and displaying the visible ones

The **update** method is called after the [onGanttScroll](api/event/onganttscroll.md) event is fired. It provides a task node (created by the **render** method initially) and a current viewport.

## Rendering visible tasks rows

Since v7.1.8 the **renderer** object of the *addTaskLayer()* method allows getting a visible range of tasks rows with the **getVisibleRange** function: 

~~~js
gantt.addTaskLayer({
  renderer: {
    render: (task, timeline, viewport) => {
      // ...
      return /* HTMLElement */;
    },
    getVisibleRange: () => {
      // ...
      return {
        start: indexStart,
        end: indexEnd
      };
    }
  }
});     
~~~

- **getVisibleRange** - a function that returns an object with the start and end indexes of visible tasks rows. 
If a task is out of the specified range, an additional layer is not rendered for it. 

If the **getVisibleRange** function returns *false* instead of an object, Gantt supposes that all the range of tasks is used and an additional layer will be rendered even if a task is not visible on the screen.

## Element render callback

The **renderer** object of the *addTaskLayer()* method provides the **onrender** callback:

~~~js
gantt.addTaskLayer({
  renderer: {
    render: (task, timeline, viewport) => {
      // ...
      return /* HTMLElement */;
    },
    onrender: (item, node, view) => {
      console.log("render", item, node);
    }
  }
});
~~~

The **onrender** function is called whenever the data item of the layer is rendered to DOM. The arguments give you access to the data item that has been rendered, the result DOM element and the view object which called the render (grid or timeline). 

The callback can be used either to modify DOM elements after they are rendered to DOM, or to initialize the 3rd party widgets inside the rendered elements.

### Related API
- [](api/method/gettaskposition.md)
- [](api/method/removetasklayer.md)
- [](api/config/layer_attribute.md)

### Related Guides
- [Custom Elements in Timeline Area](guides/baselines.md)
- [How-tos (read how to vertically reorder tasks in the timeline)](guides/how-to.md#how-to-vertically-reorder-tasks-in-the-timeline)

