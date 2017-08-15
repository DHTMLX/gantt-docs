calculateEndDate
=============

@short:calculates the end date of a task 

@params:
- config	object		the configuration object of a time span

@returns:
- end_date	Date	the date when a task is scheduled to be completed

	
@example:
gantt.config.work_time = true;
gantt.init("gantt_here");
 
gantt.calculateEndDate({start_date:date, duration:duration/*, task:task*/});
// or
gantt.calculateEndDate(task);
// or
gantt.calculateEndDate(start_date, duration);
// or
gantt.calculateEndDate(new Date(2013,02,15),48,"hour");  //-> Fri Mar 22 2013 17:00:00


@template:	api_method
@descr:
{{note
If the api/gantt_work_time_config.md option is enabled, the method considers duration as working time. 
}}

- The method will use the [global work time calendar](desktop/working_time.md#getcalendars) if no task is specified. <br>
- Besides, the method can be called directly for a [calendar object](api/gantt_calendar_other.md) of a separate task.


##Configuration object properties

The configuration object can contain the following properties:

- **start_date** - (*Date*) the date when a task is scheduled to begin
- **duration** - (*number*)	the duration of a task
* **unit** - (*string*)	optional, the time unit of the duration
* **task** - (*object*)	optional, the object of the task the duration of which should be calculated


@relatedapi:
	api/gantt_calculateduration.md
    api/gantt_calculatetasklevel.md