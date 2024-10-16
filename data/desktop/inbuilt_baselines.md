Extra Elements in Timeline
================================

{{pronote This functionality is available only in the PRO edition}}


By default, dhtmlxGantt renders elements of the timeline area as layers and does it in the following order:

1. Timeline's grid
2. Links
3. Tasks

Displaying additional elements, such as a baseline or deadline marker, is usually done by creating a displayable layer and placing custom elements there
(using the absolute positioning to put custom elements next to the related task).

Baselines
----------------

In project management tools like Gantt charts, baselines are essential for comparing the planned project timeline with the actual progress. 
Gantt API provides built-in support for baseline entities, greatly simplifying the work with this important element.

![Inbuilt baselines](desktop/inbuilt_baselines.png)

### Loading Baselines with Tasks

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

{{sample 04_customization/15_baselines.html}}

### Using the lightbox

You can manage baselines via the lightbox control. Adding, editing and deleting baselines is avalable directly from the task details.

~~~js
gantt.config.lightbox.sections = [
  { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
  { name: "time", type: "duration", map_to: "auto" },
  { name: "baselines", height: 100, type: "baselines", map_to: "baselines" }, /*!*/
 ];
~~~

![Baseline lightbox](desktop/baselines_lightbox.png)

### Baseline Rendering Modes

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

Deadlines and constraints
--------------------------

In project management, tracking deadlines and understanding task constraints are vital for timely delivery. 
DHTMLX Gantt comes with built-in visualization for deadlines and constraints, enhancing the ability to manage project timelines effectively.

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

![Deadlines](desktop/deadlines.png)

{{sample 04_customization/14_deadline.html}}