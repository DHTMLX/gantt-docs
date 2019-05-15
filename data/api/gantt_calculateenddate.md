calculateEndDate
=============

@short:calculates the end date of a task 

@params:
- config	object		the <a href="#configurationobjectproperties">configuration object</a> of a time span

@returns:
- end_date	Date	the date when a task is scheduled to be completed

	
@example:
gantt.config.work_time = true;
gantt.init("gantt_here");
 
// calculate the end date using global worktime settings
gantt.calculateEndDate({start_date: new Date(2013,02,15), duration: 48});
// or
gantt.calculateEndDate(new Date(2013,02,15), 48);

// calculate end date for a specific task calendar
gantt.calculateEndDate({start_date: new Date(2013,02,15), duration: 48, task:task});
// or, a short form:
// will use calendar currently assigned to a task, task.start_date and task.duration
gantt.calculateEndDate(task);



@template:	api_method
@descr:
{{note
If the api/gantt_work_time_config.md option is enabled, the method considers duration as working time. 
}}

- The method will use the [global work time calendar](desktop/working_time.md#getcalendars) if no task is specified. <br>
- Besides, the method can be called directly for a [calendar object](api/gantt_calendar_other.md).


##Configuration object properties

The configuration object can contain the following properties:

- **start_date** - (*Date*) the date when a task is scheduled to begin
- **duration** - (*number*)	the duration of a task
* **unit** - (*string*)	optional, the time unit of the duration: "minute", "hour", "day", "week", "month", "year"
* **task** - (*object*)	optional, the object of the task the duration of which should be calculated


@relatedapi:
	api/gantt_calculateduration.md
    api/gantt_calculatetasklevel.md