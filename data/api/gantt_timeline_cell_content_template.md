timeline_cell_content
=============

@short: specifies custom HTML content in the timeline cells
	

@params:
- task		Task		the task's object
- date		Date		the date of a cell

@returns:
- text		string		an HTML string

@example:
gantt.templates.timeline_cell_content = function (task, date) {
    if (gantt.getTaskType(task) === "task"){
        const cost = calculateSlotCost(task, date);
        return `<div class='cost'>${demoValue}</div>`;
    }
    return "";
};

@relatedapi:
	api/gantt_addtasklayer.md
@relatedsample:
	04_customization/24_timeline_cells_custom_content.html
@related:
	desktop/timeline_templates.md
	desktop/baselines.md
@template:	api_template

@descr:
{{note You should use this template instead of the [addTaskLayer()](desktop/baselines.md) method in cases when you need to show custom content in cells of the timeline. It will be easier to implement and faster in performance.}}

Note, that the custom content will be displayed *below* the task bars, meaning the task bars will have higher z-index and the content of cells won't be visible when the task bar is located on top of it.
If you need the content to be visible over the bar, you can add 'z-index' to the custom element:

~~~html
<style>
    .cost{
        position:absolute;
        z-index: 5;
        pointer-events: none; 
    }
</style>
~~~



@changelog: added in v8.0

