drag_multiple
=============

@short: enables the possibility to drag several selected tasks at once
	

@type: boolean
@example:
gantt.config.drag_multiple = false;
gantt.init("gantt_here");

@default: true

@template:	api_config
@descr: 
If you select multiple tasks but start moving a task that is not selected - only the unselected task will be moved.

You can also enable drag and drop of projects by setting the api/gantt_drag_project_config.md config to *true*.

~~~js
gantt.config.drag_project = true;
~~~

@related: desktop/multiselection.md#multitaskselectionanddragndrop
@relatedsample: 02_extensions/09_multiselection.html
@relatedapi: api/gantt_drag_project_config.md