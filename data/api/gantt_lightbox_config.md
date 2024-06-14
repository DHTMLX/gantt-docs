lightbox
=============

@short:
	specifies the lightbox object
	

@type: LightboxSections
@example:
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea",focus:true},
    {name:"priority", height:22, map_to:"priority",type:"select",options:opts},                                                                        
    {name:"time", height:72, type:"duration", map_to:"auto"}
];

gantt.init("gantt_here");


@template:	api_config
@descr:
The lightbox object has 1 property:

- **sections** - (*array*) - specifies lightbox sections 

~~~js
// default lightbox definition   
gantt.config.lightbox.sections=[
    {name:"description", height:70, map_to:"text", type:"textarea", focus:true},
    {name:"time",        height:72, map_to:"auto", type:"duration"}
];
~~~

Objects in the **sections** array can have the following properties, depending on the [type of a section](desktop/default_edit_form.md#lightboxstructure):

####Common for all sections

- <span class=subproperty>**name**</span> - (*string*) - the section's name (according to this name, dhtmlxGantt will take the section's label from the *locale.labels* collection). 
For example, for the **time** section, dhtmlxGantt will take the label stored as **gantt.locale.labels.section_time**.
- <span class=subproperty>**map_to**</span> - (*string*) - the name of a data property that will be mapped to the section.
- <span class=subproperty>**type**</span> - (*string*) - the [type of the section control](desktop/default_edit_form.md#lightboxcontrols) (editor).
- <span class=subproperty>**height?**</span> - (*number*) - optional, the section's height. Not used with the [checkbox](desktop/checkbox.md) and [radio](desktop/radio.md) sections.
- <span class=subproperty>**focus?**</span> - (*boolean*) - optional, if set to *true*, the section will take focus on opening the lightbox




####Time and Duration controls 

- <span class=subproperty>**readonly?**</span> - (*boolean*) - optional, if you set the "true" value, the section will be read-only
- <span class=subproperty>**year_range?**</span> - (*number | number[]*) - optional, sets a range for the year selector. Can be set in 2 ways: 
    - *year_range: [2005, 2025]* - a period from 2005 till 2025 year
    - *year_range: 10*  - a period [current year - 10 years; current year + 10 years]
- <span class=subproperty>**single_date?**</span> - (*boolean*) - optional, if you set the "true" value, just the 'start Date' selector will be presented in the section.<br>
Edited tasks will be specified only by the start date and have a zero duration. Makes sense only for [milestones](desktop/task_types.md#milestone). 
- <span class=subproperty>**time_format?**</span> - (*string[]*) - optional, sets the order of date-time selectors 
- <span class=subproperty>**autofix_end?**</span> - (*boolean*) - optional, defines whether the end date will be corrected automatically if the selected start date is greater than the end date, *true* by default. The disabled mode allows validating the dates, but if you enable the mode and don't validate the dates, you can get tasks with 0 duration when the *start_date* is greater than the *end_date*.


####Select control

- <span class=submethod>**onchange? (*e*): any**</span> - optional, specifies the 'onChange' event handler function for the section's control
    - **_e_** - (*Event*) - a native event object.

####Select, Checkbox, Radio and Resources controls

- <span class=subproperty>**options?**</span> - (*object[]*) - optional, defines select options of the control.Each object in the array specifies a single option and takes the following properties:
	- **_key_** - (*number | string*) - the option's id. This attribute is compared with the task's data property to assign select options to tasks
	- **_label_** - (*string*) - the option's label
	- **_unit?_** - (*string | number*) - optional, the unit of measurement of the resource (for the Resources control)
- <span class=subproperty>**default_value?**</span> - (*any*) - optional, the default value of the section's control. Applied only if the input value is underfined. For the resources control is applied if the value of the resource is underfined.


####Parent control

- <span class=subproperty>**allow_root?**</span> - (*boolean*) - optional, if set to "true", the options list will contain an additional option that will allow users to set the root level as the parent for tasks. Used in pair with the **root_label** property 
- <span class=subproperty>**root_label?**</span> - (*string*) - optional, sets a label for the root-level parent. Used in pair with the **allow_root** property 
- <span class=submethod>**sort? (task1, task2): number**</span> - optional, sets a sorting function for the select options
    - **_task1_** - (*Task*) - an object of the first task that will be sorted
    - **_task2_** - (*Task*) - an object of the second task that will be sorted
- <span class=submethod>**filter? (id, task): boolean**</span> - optional, sets a filtering function for the select options. Takes the task id and task object as parameters
    - **_id_** - (*string | number*) - the ID of the task object
    - **_task_** - (*Task*) - the Task object
- <span class=submethod>**template? (start_date, end_date, task): string|number**</span> - optional, sets a template for select options
    - **_start_date_** - (*Date | number*) - the start date of the task object
    - **_end_date_** - (*Date | number*) - the end date of the task object
    - **_task_** - (*Task*) - the Task object


####Typeselect control

- **filter** - (*function*) - sets a filtering function for the types of tasks. Takes the type name as a parameter

  
@related:
- desktop/textarea.md
- desktop/duration.md
- desktop/time.md
- desktop/select.md
- desktop/typeselect.md
- desktop/parent.md
- desktop/template.md
- desktop/checkbox.md
- desktop/radio.md
- desktop/default_edit_form.md
- desktop/lightbox_manipulations.md
- desktop/custom_editor.md
- desktop/custom_edit_form.md
- desktop/custom_button.md

@relatedapi: api/gantt_wide_form_config.md

@changelog:

If either [gantt.config.csp](api/gantt_csp_config.md) is set to *true* or Gantt works in the Salesforce environment, the lightbox will be rendered inside the Gantt container (from v7.1.13)