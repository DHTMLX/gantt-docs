timeline_placeholder
=============
@short: shows the background grid in the empty timeline


@type: boolean

@example:
gantt.config.timeline_placeholder = false;
...
gantt.init("gantt_here");


@template:	api_config
@descr:
The background grid will appear in the timeline if there are no tasks loaded into the Gantt:

![background grid](api/background_grid_in_empty_timeline.png)

or if the rows with tasks don't fill the whole timeline:

![background grid](api/background_grid_in_timeline.png)

To highlight columns and cells in the background grid, use the api/gantt_timeline_cell_class_template.md template:

~~~js
gantt.templates.timeline_cell_class = function (task, date) {
    if (!gantt.isWorkTime({ date: date, task: task })) {
        return "weekend";
    }
};
~~~

For background rows, a temporary task object will be added to the template. The object can be identified by its id:

~~~js
if(task.id === "timeline_placeholder_task"){
	...
}
~~~

@relatedapi:
api/gantt_timeline_cell_class_template.md

@relatedsample:
08_api/23_empty_gantt_with_placeholder_views.html

@changelog: added in v8.0