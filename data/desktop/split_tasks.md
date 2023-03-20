Split Tasks 
=================

{{pronote This functionality is available in the PRO edition only.}}

In case you have a large task which is not continuous and can be interrupted, you can divide it into several parts. There can be as many parts, as it's required.

At the data level, such tasks can be represented as a summary task (project) with subtasks, where each subtask defines an isolated part of the main task.

![Summary task](desktop/split_task_inside.png)

Which you can display in one row, as a single task:

![Split task](desktop/split_task.png)

To display a project as a split task, you need to set its **render** property to *split*:

~~~js
{id: 1, text: "Task #2", start_date: "03-04-2018 00:00", type: "project", 
	render:"split", parent: 0},  /*!*/
{id: 2, text: "Task #2.1", start_date: "03-04-2018 00:00", duration: 1, 
	parent: 1},
{id: 3, text: "Task #2.2", start_date: "05-04-2018 00:00", duration: 2, 
	parent: 1},
{id: 4, text: "Task #2.3", start_date: "08-04-2018 00:00", duration: 1, 
	parent: 1}
~~~

The task "Task#2" is split and rendered as a set of tasks: "Task#2.1", "Task#2.2" and "Task#2.3", which are fully interactive.

{{sample  04_customization/11_split_task.html}}

To show a split task in its typical tree mode, i.e. as a project with subtasks, you just need to change the value of the **task.render** property and re-render gantt:

~~~js
// repaint task in the 'split' mode
task.render = "split";
gantt.render();

// repaint task in the regular (tree) mode
task.render = "";
gantt.render();
~~~

For instance, it is possible to add a control mapped to the **task.render** property into the lightbox to dynamically switch between the split and hierarchical views. Check an example in the section below.


### Switching split mode dynamically

You can configure the lightbox so that it allows switching the split mode for the task on and off. For this you can add a new section with a checkbox into the lightbox by changing configuration settings 
for project types of tasks - [**gantt.config.lightbox.project_sections**](desktop/task_types.md#specificlightboxpertasktype) and add a label for the new section:

~~~js
gantt.locale.labels.section_split = "Display";
gantt.config.lightbox.project_sections = [
	{name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
	{name: "split", type:"checkbox", map_to: "render", options:[
		{key:"split", label:"Split Task"}
	]},
	{name: "time", type: "duration", readonly: true, map_to: "auto"}
];
~~~

The result will look like this:

![Split task checkbox](desktop/split_task_checkbox.png)

When the checkbox will be unchecked, a split task will be rendered as a project with subtasks.


{{sample  04_customization/11_split_task.html}}

## Checking if task is split

You can check whether a task is split with the help of the api/gantt_issplittask.md method. It takes the task object as an argument and returns true, if the task is split.

~~~js
var task = gantt.getTask(1);
if(gantt.isSplitTask(task)){
  ...
}
~~~

## Expanding/collapsing split tasks

In case you want to expand/collapse a split task right from the grid interface, there is a special configuration option that will help you. It is called api/gantt_open_split_tasks_config.md and it takes 
a boolean value to make a split task expandable and otherwise.

~~~js
gantt.config.open_split_tasks = true;
~~~

![Expanding split task](desktop/expand_split_task.png)

## Filtering split tasks

To filter the subtasks of the split task rendered on the Gantt chart, apply the api/gantt_onbeforesplittaskdisplay_event.md event and return:

- *true*, for a subtask you want to display
- *false*, for a subtask you want not to display

~~~js
gantt.attachEvent("onBeforeSplitTaskDisplay", function (id, task, parent) {
    if (task.duration < 3) {
        return false;
    }
    return true;
});
~~~

Styling
-------------------

Split tasks are defined as subtasks of a parent item, and the light green bar in the background is a bar of that parent item, with additional styles applied.

When split tasks are collapsed and displayed in a single row, the light green bar of their parent item is still rendered at the same position, but with the modified opacity and z-index values.

![](desktop/split_task_style.png)

{{sample	04_customization/21_open_split_task.html}}

You can change the color of the bar of the parent item in the same way as you can style all bars in the [timeline](desktop/css_overview.md#stylingtimeline) or completely hide it via css:

~~~css
.gantt_task_line.gantt_split_parent {
	display: none;
}
~~~

<br>
When you have only one split task, the summary item (type=“project”) becomes invisible because it is completely covered by the split task. If there are no split-subtasks, the summary item has a default date and duration.

### Styling separate split tasks

From v8.0, split tasks come into template functions with the *task.$rendered_at* property which contains the id of a row the split task is rendered at. Thus, to style specific split tasks based on the row they are displayed at, you may use the api/gantt_task_class_template.md template:

~~~js
gantt.templates.task_class = function(start, end, task) {
    if(task.$rendered_at) {
        if(gantt.calculateTaskLevel(gantt.getTask(task.$rendered_at)) === 1) {
            return "phase-level-split-task";
        }
    }
    return "";
};
~~~

@edition:pro
