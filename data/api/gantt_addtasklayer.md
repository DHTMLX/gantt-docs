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
	- **render** - (*function*)  a function that answers for rendering the layer's elements (mandatory)
	- **container** - (*HTMLElement*) a layer's container (optional)
    - **topmost** - (*boolean*) if true, the element will be displayed over the task (optional)
    - **filter** - (*function*) a function that takes a task object as a parameter. If returns 'false', the 'render' function won't be called for a task (optional)
- Beware, custom layers will be reset after the next call of <a href="api/gantt_init.md">gantt.init</a>
