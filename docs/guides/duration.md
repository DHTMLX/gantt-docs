---
title: "Duration Control"
sidebar_label: "Duration Control"
---

# Duration Control

A set of selectors for setting the task duration by specifying the start date of a task and the number of days.

![duration_control](/img/duration_control.png)

~~~js
gantt.config.lightbox.sections="["
    {name:"description", height:70, map_to:"text", type:"textarea", focus:true},
    {name:"time",        height:72, map_to:"auto", type:"duration"} /*!*/
];
~~~


[Basic initialization](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)


## Initialization

One **duration** control is added to the lightbox by default. To add another one, follow the steps below:

1) Add a section to the lightbox configuration:

~~~js
gantt.config.lightbox.sections="["
    {name:"description", height:70, map_to:"text", type:"textarea",focus:true},
    {name:"time2",       height:72, map_to:"auto", type:"duration"}, /*!*/
    {name:"time",        height:72, map_to:"auto", type:"duration"}
];
~~~
  
2) Set a label for the section:

~~~js
gantt.locale.labels.section_time2 = "Actual duration";
~~~


## Properties

The following properties are mostly important and commonly set for the **time** control (see the full list [here](api/config/lightbox.md)):

- **name** - (*string*) the section name 
- **height** - (*number*) the section height
- **map_to** - (*string,object*) "auto" or object, defines the data property(-ies) that will be mapped to the section
- **formatter** - (object) an instance of the [durationFormatter](guides/working-time.md#taskdurationindecimalformat) object
- **type** - (*string*) the type of the [section control](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) if set to *true*, the section will take focus on opening the lightbox
- **readonly** - (*boolean*) if you set the "true" value, the section will be read-only
- **year_range** - (*array,number*) sets a range for the year selector. The range can be set in 2 ways: 
    - *year_range: [2005, 2025]* - a period from 2005 till 2025 year
    - *year_range: 10*  - a period [current year - 10 years; current year + 10 years]
- **single_date** - (*boolean*) if you set the "true" value, just the *start Date* selector will be presented in the section. 
Edited tasks will be specified only by the start date and have a zero duration. Makes sense only for [milestones](guides/task-types.md#milestones)
- **time_format** - (*string*) sets the order of date-time selectors

  

## Configuring date-time selectors 

To configure the selectors in the "Time period" section, use the [time_format](api/config/lightbox.md) property (see [Date Format Specification](guides/date-format.md)):

**Adding the time selector to the 'Time period' section**
~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"time",type:"duration",map_to:"auto",time_format:["%d","%m","%Y","%H:%i"]}/*!*/
];
~~~

Note, the allowable members of the [time_format](api/config/lightbox.md) array are:

- *"%d"* - the day selector 
- *"%m"* - the month selector
- *"%Y"* - the year selector
- *"%H:%i"* - the time selector (the format is set with the [time_picker](api/template/time_picker.md) template) 

You can change just the order and the number of these members in the array but not the data presentation format.

 For example, you can change the format as in:

~~~js
// time goes first
time_format:["%H:%i", "%m", "%d", "%Y"] 
// month goes first
time_format:["%m","%d", "%Y", "%H:%i"]
// the year selector is removed
time_format:["%H:%i", "%m", "%d"]
// incorrect
time_format:["%H:%i", "%M", "%d", "%Y"] //"%m" was changed to "%M"
~~~

## Mapping to custom start/end date-time properties

### Default mapping

Generally, the time and duration controls are mapped to the mandatory 'start_date', 'end_date' data properties by setting the **map_to** property to the "auto" value (**map_to:"auto"**).

### Custom mapping

To map controls to some custom date properties (instead of 'start_date', 'end_date'), use the object notation of the **map_to** property:

~~~js
gantt.config.lightbox.sections = [
    {name: "description", height: 72, type: "textarea", map_to:"text", focus: true},
    {name: "time",           height: 72, type: "duration", map_to:"auto"},
    {name: "baseline",    height: 72, type: "duration", /*!*/
     map_to:{start_date:"planned_start",end_date:"planned_end"}} /*!*/
];
~~~


[Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)


As an object, **map_to** has 3 properties: 

1. **start_date**- the name of a data property that will store the start date set in the input
2. **end_date** - optional, the name of a data property that will store the end date set in the input 
3. **duration** - optional, the name of a data property that will store the duration defined by the input 

:::note
If some property is not specified, the control takes the value of the related mandatory date property.
:::


## Switching section visibility

It is possible to manipulate the visibility of the duration section if you specify **type:"duration_optional"** and **button: true** while configuring the section for the lightbox:

~~~js
gantt.config.lightbox.sections = [
  {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
  {name: "time", map_to: "auto", button: true, type: "duration_optional"} /*!*/
];
~~~

and set labels for two states of the button:

~~~js
gantt.locale.labels.time_enable_button = 'Schedule';
gantt.locale.labels.time_disable_button = 'Unschedule';
~~~

The toggle button allowing you to switch the visibility of the section will appear near the section. If the section is visible, everything works as if **type:"duration"** is specified.

![duration_optional](/img/duration_optional.png)

If you toggle the button off, the section will become invisible but nothing will happen. After you click the "Save" button, the values of the task properties which are mapped to the duration control via the **map_to** property of the section will become `null`.

~~~js
gantt.getTask(1);

// return value
{
    id: '1', text: 'Task #1', unscheduled: true, 
    duration: 0, parent: '10',
    end_date: null, start_date: null,
    ...
}
~~~

This functionality can be helpful if you need to make the task unscheduled or to define the tasks for which baselines shouldn't be shown on the page right from UI. Check the related samples:

**Related sample** [Unscheduled tasks](https://snippet.dhtmlx.com/5/81f51a96d)

**Related sample** [Baselines](https://snippet.dhtmlx.com/6qvjoa7i)

