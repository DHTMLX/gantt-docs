lightbox
=============

@short:
	specifies the lightbox object
	

@type: object
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

- **sections** - (*array*) specifies lightbox sections 

~~~js
//default lightbox definition   
gantt.config.lightbox.sections=[
    {name:"description", height:70, map_to:"text", type:"textarea", focus:true},
    {name:"time",        height:72, map_to:"auto", type:"duration"}
];
~~~

Each object in the **sections** array can have the following properties:

- **name** - (*string*) the section's name (according to this name, dhtmlxGantt will take the section's label from the *locale.labels* collection). 
For example, for the **time** section, dhtmlxGantt will take the label stored as **gantt.locale.labels.section_time**
- **height** - (*number*) the section's height
- **map_to** - (*string*) the name of a data property that will be mapped to the section
- **type** - (*string*) the [type of the section control](desktop/default_edit_form.md#lightboxcontrols) (editor)
- **time_format** - (*string*) sets the order of date-time selectors in the "duration" or "time" section
- **focus** - (*boolean*) if set to *true*, the section will take the focus on opening the lightbox
- **default_value** - (*any*) the default value of the section's control
- **onchange** - (*function*) specifies the 'onChange' event handler function for the section's control (*for the [select](desktop/select.md) control only*)
- **options** - (*array of objects*) defines select options of the control (*used for the **select**, **checkbox**  and **radio** controls*).<br> 
Each object in the array specifies a single option and takes the following properties:
	- **key** - (*string*) the option's id. This attribute is compared with the task's data property to assign select options to tasks
	- **label** - (*string*) the option's label
- **readonly** - (*boolean*) if you set the "true" value, the section will be read-only (*for the [time](desktop/time.md) and [duration](desktop/duration.md) controls only*)
- **year_range**  -(*array,number*) sets a range for the year selector. Can be set in 2 ways: 
    - *year_range: [2005, 2025]* - a period from 2005 till 2025 year
    - *year_range: 10*  - a period [current year - 10 years; current year + 10 years]
- **single_date** - (*boolean*) if you set the "true" value, just the 'start Date' selector will be presented in the section (for the [time](desktop/time.md) and [duration](desktop/duration.md) controls only).<br>
Edited tasks will be specified only by the start date and have a zero duration. Makes sense only for [milestones](desktop/task_types.md#milestone). 
- **allow_root** - (*boolean*) if set to "true", the options list will contain an additional option that will allow users to set the root level as the parent for tasks. Used in pair with the 
*root_label* property (*for the [parent](desktop/parent.md) control only*)
- **root_label** - (*string*) sets a label for the root-level parent. Used in pair with the *allow_root* property (*for the [parent](desktop/parent.md) control only*)
- **filter** - (*function*) sets a filtering function for the select options (*for the [parent](desktop/parent.md) control only*)
- **sort** - (*function*) sets a sorting function for the select options (*for the [parent](desktop/parent.md) control only*)
- **template** - (*function*) sets a template for select options (*for the [parent](desktop/parent.md) control only*)
	
  

