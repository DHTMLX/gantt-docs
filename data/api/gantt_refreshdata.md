refreshData
=============
@short:refreshes data in the Gantt chart
	

@example:
gantt.refreshData();

@template:	api_method
@descr:
The method is intended not to reload but to re-draw data in the Gantt chart. See the example:

{{editor	https://snippet.dhtmlx.com/ces4sfdh	Gantt. Re-draw data}}

If you need to load data from the server, use either the [parse()](api/gantt_parse.md) or [load()](api/gantt_load.md) method.

{{editor	https://snippet.dhtmlx.com/h9ob1hxr	Gantt. Load data from different data objects}}

@relatedapi:
	api/gantt_refreshlink.md
    api/gantt_refreshtask.md
@relatedsample:
	07_grid/03_filtering.html
@related:
	desktop/crud_task.md