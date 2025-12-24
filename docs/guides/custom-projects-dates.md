---
title: "Manually Scheduled Summary Tasks"
sidebar_label: "Manually Scheduled Summary Tasks"
---

# Manually Scheduled Summary Tasks


There is a possibility to schedule [projects](guides/task-types.md) (summary tasks) manually. 
This feature serves to increase flexibility and accuracy in managing projects with Gantt charts. 
 
By default, summary tasks automatically calculate their dates based on the earliest start and latest end dates of their subtasks. 
You can also set fixed start and end dates for summary tasks independently of their subtasks. As a result, the Gantt chart will display both the fixed duration 
and the duration derived from subtasks.


[Manually Scheduled Projects](https://docs.dhtmlx.com/gantt/samples/04_customization/25_project_dates.html)


To activate this feature for a summary task, set the [auto_scheduling](api/config/auto_scheduling.md) property to *false*. 

The fixed dates are stored in **task.start_date** and 
**task.end_date**, while the computed dates from subtasks are available in **task.$auto_start_date** and **task.$auto_end_date**.

~~~js
gantt.parse({
  data: [
    {
      id: 1,
      text: "Project Phase 1",
      type: "project",
      start_date: "2025-05-01 00:00:00",
      duration: 15,
      auto_scheduling: false /* ! */
    },
    // ...
  ],
});
~~~

Both the fixed duration of the summary task and the actual duration calculated from its subtasks are displayed in the Gantt chart. 

If the subtask date range falls outside the assigned dates of the summary task, the summary task will be highlighted to indicate a
scheduling conflict. This visual cue helps end-users quickly identify and address discrepancies in the project timeline.

![Hightlighting out-of-range summary task](/img/custom_project_dates.png)

