Extra Elements in Timeline
================================

{{pronote This functionality is available only in the PRO edition}}


By default, dhtmlxGantt renders elements of the timeline area as layers and does it in the following order:

1. Timeline's grid
2. Links
3. Tasks
4. Additional elements

Gantt includes such built-in elements as baselines, deadlines and time constraints. Instead of the default extra elements, 
you can also [create custom ones as additional layers](desktop/baselines.md). 

Baselines
----------------

In project management tools like Gantt charts, baselines are essential for comparing the planned project timeline with the actual progress. 
Gantt API provides built-in support for baseline entities, greatly simplifying the work with this important element.

![Inbuilt baselines](desktop/inbuilt_baselines.png)

{{sample 04_customization/15_baselines.html}}

### Customizing baselines

In case, the default baselines functionality doesn't suit your project requirements, you can disable it using the api/gantt_baselines_config.md configuration option.

~~~js
gantt.config.baselines = false;
~~~

After that you can customize the display of baselines in one of the following ways:

1\. Using the **gantt.config.baselines** configuration object

The **baselines** configuration option also allows customizing the rendering of baselines in the Gantt chart when set as an object. 
The object configuration contains the following properties:

- **datastore** (*string*) - the name of the datastore used for storing baseline entries. For related functionality, see the `getDatastore` method.
- **render_mode** (*boolean | string*) - determines how baselines are displayed:
	- `false` - baselines are not shown.
	- `"taskRow"` - baselines are displayed in the same row as the task bar.
	- `"separateRow"` - baselines are shown in a separate subrow, expanding the task row height.
	- `"individualRow"` - each baseline is displayed in its own subrow beneath the task.
- **dataprocessor_baselines** (*boolean*) - specifies whether baseline updates trigger the DataProcessor as individual entries.
- **row_height** (*number*) - defines the height of the subrow for baselines, applicable only when `render_mode` is set to `"separateRow"` or `"individualRow"`.
- **bar_height** (*number*) - sets the height of the baseline bar.

For example:

~~~js
gantt.config.baselines = {
  datastore: "baselines",
  render_mode: false,
  dataprocessor_baselines: false,
  row_height: 16,
  bar_height: 8
};
gantt.init("gantt_here");
~~~

If you dynamically modify the display settings of the **gantt.config.baselines** config, you should use the api/gantt_adjusttaskheightforbaselines.md method
for proper display of baseline elements.

~~~js
const task = gantt.getTask(taskId);
gantt.adjustTaskHeightForBaselines(task); /*!*/
gantt.render();
~~~

2\. [Creating a custom baseline element](desktop/baselines.md) for adding into the timeline.

### Loading baselines with tasks

Baselines can be loaded directly alongside tasks, streamlining data management and display. Check the example below:

~~~js
gantt.parse({
  tasks: [
    {
      id: 2,
      start_date: "2025-04-04 00:00:00",
      duration: 2,
      text: "Task #1",
      progress: 0.5,
      parent: 0,
      open: true,
      end_date: "2025-04-06 00:00:00",
    },
    // Additional tasks...
  ],
  links: [],
  baselines: [ /*!*/
    { /*!*/
      id: 2, /*!*/
      task_id: 2, /*!*/
      start_date: "2025-04-03 00:00:00", /*!*/
      duration: 2, /*!*/
      end_date: "2025-04-05 00:00:00", /*!*/
    }, /*!*/
    // Additional baselines... /*!*/
  ], /*!*/
});
~~~

Once baselines are loaded, Gantt will automatically display them in the timeline without any additional configuration.

### Getting task baselines

You can get the baselines of a particular task using the api/gantt_gettaskbaselines.md method. 

~~~js
gantt.getTaskBaselines(5);
~~~

The method will return an array of baselines objects of the specified task from the datastore.

~~~js
[
    {
        task_id: 5,
        id: 1, 
        duration: 2, 
        start_date: "03-04-2019 00:00", 
        end_date: "05-04-2019 00:00"
    },
    {
        task_id: 5,
        id: 2, 
        duration: 1, 
        start_date: "06-04-2019 00:00", 
        end_date: "07-04-2019 00:00"
    }
]
~~~

### Baselines in the lightbox

You can manage baselines via the lightbox control. Adding, editing and deleting baselines is available directly from the task details.

~~~js
gantt.config.lightbox.sections = [
  { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
  { name: "time", type: "duration", map_to: "auto" },
  { name: "baselines", height: 100, type: "baselines", map_to: "baselines" }, /*!*/
 ];
~~~

![Baseline lightbox](desktop/baselines_lightbox.png)

### Baseline rendering modes

Gantt offers three modes for displaying baselines. You can choose the rendering mode that suits best for your needs
by setting the **gantt.config.baselines.render_mode** configuration option to the corresponding value. There are three modes available:

- Same row as task ("taskRow")

Baselines are displayed directly on the same row as the task bars:

~~~js
gantt.config.baselines.render_mode = "taskRow";
~~~

![Task row mode](desktop/baselines_task_row.png)

- Separate subrow below task ("separateRow")

All baselines are rendered on a single subrow below each task:

~~~js
gantt.config.baselines.render_mode = "separateRow";
~~~

![Subrow mode](desktop/baselines_subrow.png)

- Individual subrows for each baseline ("individualRow")

Each baseline is displayed on its subrow for maximum clarity:

~~~js
gantt.config.baselines.render_mode = "individualRow";
~~~

![Individual row mode](desktop/baselines_individual_row.png)

### Setting baseline text

To specify a text that should be displayed inside the baseline element, use the api/gantt_baseline_text_template.md template:

~~~js
gantt.templates.baseline_text = function(task, baseline, index) {
    return "Baseline #" + (index + 1);
};
~~~

Deadlines and constraints
--------------------------

In project management, tracking deadlines and understanding task constraints are vital for timely delivery. 
DHTMLX Gantt comes with built-in visualization for deadlines and constraints, enhancing the ability to manage project timelines effectively.

![Deadlines](desktop/deadlines.png)

{{sample 04_customization/14_deadline.html}}

### Deadlines visualization

Gantt supports a numeric **task.deadline** field. When specified, it displays a visual indicator on the chart, thereby simplifying the tracking of task deadlines.

~~~js
gantt.parse({
  data: [
    {
      id: 1,
      text: "Task with Deadline",
      start_date: "2025-04-04",
      duration: 5,
      deadline: new Date(2025, 3, 10), // April 10, 2025 /*!*/
    },
    // Additional tasks...
  ],
});
~~~

### Customizing deadlines

In case, the default deadlines functionality doesn't suit your project requirements, you can disable it using the api/gantt_deadlines_config.md configuration option.

~~~js
gantt.config.deadlines = false;
~~~

After that you can customize the display of deadlines by [creating a custom deadline element](desktop/baselines.md) for adding into the timeline.

The **gantt.config.deadlines** config enables or disables the display of deadline elements for tasks. If enabled, Gantt will check the **task.deadline** property, 
and if it contains a valid date, the deadline element will be displayed in the timeline.

### Task constraints

Starting from v9.0, when [auto scheduling](desktop/auto_scheduling.md) is enabled and works in Constraint mode (api/gantt_auto_scheduling_compatibility_config.md is set to *false*), Gantt will automatically display constraint dates in the chart.

~~~js
gantt.parse({
  data: [
    { 
      id: 1, 
      text: "Task #1", 
      start_date: "2025-04-04", 
      duration: 4, 
      constraint_date: "2025-04-04", 
      constraint_type: "snet", 
      parent: 0
    },
    // Additional tasks
  ]
})
~~~

The display of constraints can be controlled using the `display_constraints` option in the api/gantt_auto_scheduling_config.md config. By default, constraints are shown, but you can disable them by setting `display_constraints` to `false`:

~~~js
gantt.config.auto_scheduling = {
  enabled: true,
  display_constraints: false
};
~~~

{{sample 02_extensions/19_constraints_scheduling.html}}


