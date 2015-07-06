getWorkHours
=============
@short:returns the working hours of the specified date
	

@params:
- date	Date	a date to check 

@returns: 
- hours	array	a working period of the date

@example:
gantt.config.work_time = true;
gantt.init("gantt_here");

gantt.getWorkHours(new Date(2013,03,30))// -> [8, 17] /*!*/


@relatedapi:
	api/gantt_work_time_config.md
    api/gantt_setworktime.md
@related:
	desktop/working_time.md
@template:	api_method
@descr:

