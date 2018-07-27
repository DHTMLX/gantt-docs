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
// default lightbox definition   
gantt.config.lightbox.sections=[
    {name:"description", height:70, map_to:"text", type:"textarea", focus:true},
    {name:"time",        height:72, map_to:"auto", type:"duration"}
];
~~~

Objects in the **sections** array can have the following properties, depending on the type of sections:

####Common for all sections

- **name** - (*string*) the section's name (according to this name, dhtmlxGantt will take the section's label from the *locale.labels* collection). 
For example, for the **time** section, dhtmlxGantt will take the label stored as **gantt.locale.labels.section_time**.
- **map_to** - (*string*) the name of a data property that will be mapped to the section.
- **type** - (*string*) the [type of the section control](desktop/default_edit_form.md#lightboxcontrols) (editor).
- **height** - (*number*) the section's height. Not used with the [checkbox](desktop/checkbox.md) and [radio](desktop/radio.md) sections.
- **focus** - (*boolean*) if set to *true*, the section will take focus on opening the lightbox


####Time and Duration controls 

- **readonly** - (*boolean*) if you set the "true" value, the section will be read-only 
- **year_range**  -(*array,number*) sets a range for the year selector. Can be set in 2 ways: 
    - *year_range: [2005, 2025]* - a period from 2005 till 2025 year
    - *year_range: 10*  - a period [current year - 10 years; current year + 10 years]
- **single_date** - (*boolean*) if you set the "true" value, just the 'start Date' selector will be presented in the section.<br>
Edited tasks will be specified only by the start date and have a zero duration. Makes sense only for [milestones](desktop/task_types.md#milestone). 
- **time_format** - (*string*) sets the order of date-time selectors 

####Select control

- **onchange** - (*function*) specifies the 'onChange' event handler function for the section's control 

####Select, Checkbox and Radio controls

- **options** - (*array of objects*) defines select options of the control.Each object in the array specifies a single option and takes the following properties:
	- **key** - (*string*) the option's id. This attribute is compared with the task's data property to assign select options to tasks
	- **label** - (*string*) the option's label
- **default_value** - (*any*) the default value of the section's control. Applied only if the input value is underfined

####Parent control

- **allow_root** - (*boolean*) if set to "true", the options list will contain an additional option that will allow users to set the root level as the parent for tasks. Used in pair with the **root_label** property 
- **root_label** - (*string*) sets a label for the root-level parent. Used in pair with the **allow_root** property 
- **sort** - (*function*) sets a sorting function for the select options 
- **filter** - (*function*) sets a filtering function for the select options. Takes the task id and task object as parameters
- **template** - (*function*) sets a template for select options
	

####Typeselect control

- **filter** - (*function*) sets a filtering function for the types of tasks. Takes the type name as a parameter

  
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


