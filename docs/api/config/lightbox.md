---
sidebar_label: lightbox
title: lightbox config
description: "specifies the lightbox object"
---

# lightbox

### Description

@short: Specifies the lightbox object

@signature: lightbox: LightboxSections

### Example

~~~jsx
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea",focus:true},
    {name:"priority", height:22, map_to:"priority",type:"select",options:opts},
    {name:"time", height:72, type:"duration", map_to:"auto"}
];

gantt.init("gantt_here");
~~~

### Details

The lightbox object has 1 property:

- **sections** - (*array*) - specifies lightbox sections 

~~~js
// default lightbox definition   
gantt.config.lightbox.sections=[
    {name:"description", height:70, map_to:"text", type:"textarea", focus:true},
    {name:"time",        height:72, map_to:"auto", type:"duration"}
];
~~~

Objects in the **sections** array can have the following properties, depending on the [type of a section](guides/default-edit-form.md#lightbox-structure):

#### Common for all sections

- **name** - (*string*) - the section's name. dhtmlxGantt will take the section's label from the *locale.labels* collection according to this name. For example, for the **time** section, dhtmlxGantt will take the label stored as **gantt.locale.labels.section_time**. If the section has the **label** property specified, the section's label will be taken from it instead of the locale. <br>The **name** property can also be used for getting the control's object via the [](api/method/getlightboxsection.md) method.
- **map_to** - (*string*) - the name of a data property that will be mapped to the section.
- **type** - (*string*) - the [type of the section control](guides/default-edit-form.md#lightboxcontrols) (editor).
- **label** - (*string*) - the section's label.
- **height?** - (*number*) - optional, the section's height. Not used with the [checkbox](guides/checkbox.md) and [radio](guides/radio.md) sections.
- **focus?** - (*boolean*) - optional, if set to *true*, the section will take focus on opening the lightbox
- **formatter?** - (*DurationFormatter | LinkFormatter*) - optional, a formatter for the section


#### Time and Duration controls 

- **readonly?** - (*boolean*) - optional, if you set the "true" value, the section will be read-only
- **year_range?** - (*number | number[]*) - optional, sets a range for the year selector. Can be set in 2 ways: 
    - *year_range: [2005, 2025]* - a period from 2005 till 2025 year
    - *year_range: 10*  - a period [current year - 10 years; current year + 10 years]
- **single_date?** - (*boolean*) - optional, if you set the "true" value, just the 'start Date' selector will be presented in the section.
Edited tasks will be specified only by the start date and have a zero duration. Makes sense only for [milestones](guides/task-types.md#milestones). 
- **time_format?** - (*string[]*) - optional, sets the order of date-time selectors 
- **autofix_end?** - (*boolean*) - optional, defines whether the end date will be corrected automatically if the selected start date is greater than the end date, *true* by default. The disabled mode allows validating the dates, but if you enable the mode and don't validate the dates, you can get tasks with 0 duration when the *start_date* is greater than the *end_date*.


#### Select control

- **onchange? (*e*): any** - optional, specifies the 'onChange' event handler function for the section's control
    - **_e_** - (*Event*) - a native event object.

#### Select, Checkbox, Radio and Resources controls

- **options?** - (*object[]*) - optional, defines select options of the control.Each object in the array specifies a single option and takes the following properties:
    - **_key_** - (*number | string*) - the option's id. This attribute is compared with the task's data property to assign select options to tasks
    - **_label_** - (*string*) - the option's label
    - **_unit?_** - (*string | number*) - optional, the unit of measurement of the resource (for the Resources control)
- **default_value?** - (*any*) - optional, the default value of the section's control. Applied only if the input value is underfined. For the resources control is applied if the value of the resource is underfined.

#### Resource Assignments control

- **config** - (*object*) the resource grid config in the lightbox to display required columns
- **templates** - (*object*) templates for the resource grid in the lightbox
- **resource_default_assignment** - (*object*) the configuration object of the default assignment (that will be added by the "Add Assignment" button)
	- **start_date** - (*Date | string | null*) the date the assignment is scheduled to start
	- **end_date** - (*Date | string | null*) the date the assignment is scheduled to be completed
	- **value** - (*number | string*) the quantity of the resource assigned to a task
	- **duration** - (*number | null*) the duration of the assignment
	- **mode** - (*string*) the calculation mode of the time of the resource assignment: "default" | "fixedDates" | "fixedDuration"

#### Parent control

- **allow_root?** - (*boolean*) - optional, if set to "true", the options list will contain an additional option that will allow users to set the root level as the parent for tasks. Used in pair with the **root_label** property 
- **root_label?** - (*string*) - optional, sets a label for the root-level parent. Used in pair with the **allow_root** property 
- **sort? (task1, task2): number** - optional, sets a sorting function for the select options
    - **_task1_** - (*Task*) - an object of the first task that will be sorted
    - **_task2_** - (*Task*) - an object of the second task that will be sorted
- **filter? (id, task): boolean** - optional, sets a filtering function for the select options. Takes the task id and task object as parameters
    - **_id_** - (*string | number*) - the ID of the task object
    - **_task_** - (*Task*) - the Task object
- **template? (start_date, end_date, task): string|number** - optional, sets a template for select options
    - **_start_date_** - (*Date | number*) - the start date of the task object
    - **_end_date_** - (*Date | number*) - the end date of the task object
    - **_task_** - (*Task*) - the Task object


#### Typeselect control

- **filter** - (*function*) - sets a filtering function for the types of tasks. Takes the type name as a parameter

### Related API
- [wide_form](api/config/wide_form.md)

### Related Guides
- [Textarea Control](guides/textarea.md)
- [Duration Control](guides/duration.md)
- [Time Control](guides/time.md)
- [Select Control](guides/select.md)
- [Typeselect Control](guides/typeselect.md)
- [Parent Control](guides/parent.md)
- [Template Control](guides/template.md)
- [Checkbox Control](guides/checkbox.md)
- [Radio Button Control](guides/radio.md)
- [Configuring Lightbox Elements](guides/default-edit-form.md)
- [Working with Lightbox Elements](guides/lightbox-manipulations.md)
- [Creating Custom Element](guides/custom-editor.md)
- [Custom Lightbox](guides/custom-edit-form.md)
- [Changing Buttons in the Lightbox](guides/custom-button.md)

### Change log
- If either [gantt.config.csp](api/config/csp.md) is set to *true* or Gantt works in the Salesforce environment, the lightbox will be rendered inside the Gantt container (from v7.1.13)


