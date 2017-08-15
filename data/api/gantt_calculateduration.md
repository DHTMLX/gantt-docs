calculateDuration
=============

@short:
    calculates the duration of a task 

@params:
- config	object		the <a href="api/gantt_calculateduration.md#configurationobjectproperties">configuration object</a> of a time span

@returns:
- duration		number		the duration of a task in units specified by the <a href="api/gantt_duration_unit_config.md">duration_unit</a> option


@example:
gantt.config.work_time = true;
gantt.init("gantt_here");

// calculate worktime duration between specified dates 
// (for specific task, if multiple working calendars used)
gantt.calculateDuration({start_date: start, end_date: end/*,task: task*/});

// or 
gantt.calculateDuration(task);

// or 
gantt.calculateDuration(new Date(2013,02,15), new Date(2013,02,25)); //->6

@template:	api_method
@descr:
{{note
If the api/gantt_work_time_config.md option is enabled, the method calculates the task's duration in working time. 
}}


- The method will use the [global work time calendar](desktop/working_time.md#getcalendars) if no task is specified. <br>
- Besides, the method can be called directly for a [calendar object](api/gantt_calendar_other.md) of a separate task.

##Configuration object properties

The configuration object can contain the following properties:

- **start_date** - (*Date*) the date when a task is scheduled to begin
- **end_date** - (*Date*) the date when a task is scheduled to be completed
* **task** - (*object*)	optional, the object of the task the duration of which should be calculated


@related:
- desktop/working_time.md


@relatedapi:
api/gantt_calculateenddate.md
api/gantt_calculatetasklevel.md