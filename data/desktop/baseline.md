Baselines Control
====================

{{pronote This functionality is available in the PRO Edition only.}}

A set of selectors for setting the [baselines](desktop/inbuilt_baselines.md) for a task by specifying the start date of a task and the number of days.

~~~js
gantt.config.lightbox.sections = [
	{ name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
	{ name: "time", type: "duration", map_to: "auto" },
	{ name: "baselines", height: 100, type: "baselines", map_to: "baselines" }, /*!*/
];
~~~

{{sample
	04_customization/15_baselines.html
}}


Initialization
---------------------------

To add the **baselines** control to the lightbox, follow the steps below:

1) Add a section to the lightbox configuration:

~~~js
gantt.config.lightbox.sections = [
    { name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    { name:"baselines", type:"baselines" },  /*!*/
    { name:"time", type:"duration", map_to:"auto" }
];
~~~
	
2) Set a label for the section:

~~~js
gantt.locale.labels.section_baselines = "Baselines";
~~~

Properties
------------------------

The following properties are mostly important and commonly set for the **baselines** control (see the full list [here](api/gantt_lightbox_config.md)):

- **name** - (*string*) the section name 
- **height** - (*number*) the section height
- **map_to** - (*string*) set it to "baselines"
- **formatter** - (object) an instance of the [durationFormatter](desktop/working_time.md#taskdurationindecimalformat) object
- **type** - (*string*) the type of the [section control](desktop/default_edit_form.md#lightboxcontrols)
- **focus** - (*boolean*) if set to *true*, the section will take focus on opening the lightbox
- **readonly** - (*boolean*) if you set the "true" value, the section will be read-only
- **year_range** - (*array,number*) sets a range for the year selector. The range can be set in 2 ways: 
	- *year_range: [2005, 2025]* - a period from 2005 till 2025 
    - *year_range: 10*  - a period [current year - 10 years; current year + 10 years]
- **single_date** - (*boolean*) if you set the "true" value, just the *start Date* selector will be presented in the section. 
Edited tasks will be specified only by the start date and have a zero duration. Makes sense only for [milestones](desktop/task_types.md#milestones)
- **time_format** - (*string*) sets the order of date-time selectors

Localization
-----------------

You can localize the labels of the following elements of the **baselines** control:

- **gantt.locale.labels.baselines_section_placeholder** - the text displayed when there are no baselines added
- **gantt.locale.labels.baselines_remove_button** - the text of the button to remove a baseline (*"Remove"* by default)
- **gantt.locale.labels.baselines_add_button** - the text of the button to add a new baseline (*"Add Baseline"* by default)
- **gantt.locale.labels.baselines_remove_all_button** - the text of the button to remove all the baselines (*"Remove All"* by default)


@edition:pro