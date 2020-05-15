render
=============

@short:renders the whole Gantt chart
	




@example:
gantt.config.scale_unit = "month"; 
gantt.init("gantt_here");

gantt.config.scale_unit = "day"; 
gantt.render();

@relatedsample:
	03_scales/05_dynamic_scales.html
@related:
	desktop/dynamic_scale.md
@template:	api_method
@descr:
You can use the api/gantt_batchupdate.md method to update multiple tasks/links at once with a single re-rendering instead of making multiple updates with multiple re-renderings.

