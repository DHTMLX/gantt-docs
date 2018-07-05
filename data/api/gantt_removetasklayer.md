removeTaskLayer
=============

@short:removes the specified layer related to a task
@edition: pro


@params:
- layerId		string		a DOM element that will be displayed in the layer


@example:
var layer_id = gantt.addTaskLayer(function draw_deadline(task) {
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
//...
gantt.removeTaskLayer(layer_id);/*!*/
gantt.render();

@related:desktop/baselines.md
@relatedapi:
  api/gantt_addtasklayer.md

	
@template:	api_method
@descr:
{{pronote This functionality is available in the PRO edition only.}}