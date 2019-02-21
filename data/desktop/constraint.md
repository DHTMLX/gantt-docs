Constraint Control
====================

{{pronote This functionality is available in the PRO Edition only.}}

A complex control used to set [time constraints for Gantt tasks](desktop/auto_scheduling.md#tasksconstraints).

![Constraint control](desktop/constraint_control.png)

~~~js
gantt.config.lightbox.sections = [
    { name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    { name:"constraint", type:"constraint" },  /*!*/
    { name:"time", type:"duration", map_to:"auto" }
];
~~~

{{sample 02_extensions/19_constraints_scheduling.html}}

Initialization
------------

To add the **constraint** control to the lightbox, follow the steps below:

1\. Add a section to the lightbox configuration:

~~~js
gantt.config.lightbox.sections = [
    { name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    { name:"constraint", type:"constraint" },  /*!*/
    { name:"time", type:"duration", map_to:"auto" }
];
~~~

2\. Set a label for the section:

~~~js
gantt.locale.labels.section_constraint = "Constraint";
~~~

{{sample 02_extensions/19_constraints_scheduling.html}}

Properties
------------------------

The following properties are mostly important and commonly set for the **constraint** control (see the full list [here](api/gantt_lightbox_config.md)):

- **name** - (*string*) the section name 
- **type** - (*string*) the type of the [section control](desktop/default_edit_form.md#lightboxcontrols)


@edition:pro
