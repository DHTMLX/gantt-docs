---
title: "Configuring Lightbox Elements"
sidebar_label: "Configuring Lightbox Elements"
---

Configuring Lightbox Elements 
================================

Lightbox is an edit form used to change the task's details. 

 The default lightbox is presented in the image below.

![lightbox](/img/lightbox.png)

Lightboxes may differ depending on the type and peculiarities of tasks they are used for. Configuration settings for each type of a task are stored in the [lightbox](api/config/lightbox.md) object. They are:

- **gantt.config.lightbox.sections** - for regular tasks.
- **gantt.config.lightbox.project_sections** - for project tasks.
- **gantt.config.lightbox.milestone_sections** - for milestones. 

It is also possible to [add a custom type](guides/task-types.md#creating-a-custom-type) and define necessary structure of the lightbox for it.
More information is given in the article [Task Types](guides/task-types.md#specificlightboxpertasktype).

The overall type structure looks like this:

- <span class="subproperty">**sections?**</span> - (*LightboxSection[]*) - optional, the lightbox sections array for regular tasks
- <span class="subproperty">**project_sections?**</span> - (*LightboxSection[]*) - optional, the lightbox sections array for project tasks
- <span class="subproperty">**milestone_sections?**</span> - (*LightboxSection[]*) - optional, the lightbox sections array for milestones
- <span class="subproperty">**[lightboxType: string]**</span> - (*LightboxSection[] | undefined*) - the lightbox sections array for the custom type


:::note
From v7.1.13, if either [gantt.config.csp](api/config/csp.md) is set to *true* or Gantt works in the Salesforce environment, the lightbox will be rendered inside the Gantt container.
:::

Lightbox structure
------------------------

### Sections

The structure of the lightbox is specified by the **sections** property of the lightbox object:

~~~js
//default lightbox definition   
gantt.config.lightbox.sections=[
	{ name: "description", height: 70, map_to: "text", type: "textarea", focus: true },
    { name: "time", height: 72, map_to: "auto", type: "duration" }
];
~~~

Each item in the **sections** array is an object that specifies an individual section in the lightbox (available section properties).


### Sections controls {#lightboxcontrols}

Each section of the lightbox is based on some control. The following types of controls are available for use in the lightbox:

- [Textarea](guides/textarea.md) - a multiline text field
- [Time](guides/time.md) - a pair of selectors for setting the task duration by specifying the task's start and end dates
- [Duration](guides/duration.md) - a set of selectors for setting the task duration by specifying the task's start date and the number of days
- [Select](guides/select.md) - a simple select box
- [Typeselect](guides/typeselect.md) - a select box for changing the type of a task
- [Parent](guides/parent.md) - a select box for changing the parent of a task
- [Template](guides/template.md) - a container with some HTML content inside
- [Checkbox](guides/checkbox.md) - a checkbox for switching an option or several values on/off 
- [Radio button](guides/radio.md) - a radio button for selecting only one option from a given set of options 
- [Resources](guides/resources.md) - a complex control for assigning several resources to a task
- [Resource Assignments](guides/resource-assignments.md) - an extended control for assigning resources to a task
- [Constraint](guides/constraint.md) - a complex control for setting constraints for a task
- [Baselines](guides/baseline.md) - a complex control for setting baselines for a task

~~~js
const opts = [
    { key: 1, label: 'High' },
    { key: 2, label: 'Normal' },
    { key: 3, label: 'Low' }
];

gantt.config.lightbox.sections = [
	{ name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
    { name: "priority", height: 22, map_to: "priority", type: "select", options: opts},
    { name: "time", height: 72, map_to: "auto", type: "duration"}
];
~~~

