calendar_property
=============

@todo:
	check 


@short:
	changes the name of the property that affects binding of a calendar to a task/group of tasks

@type: string
@example:
gantt.config.calendar_property = "property_name";

@template:	api_config
@descr:
added in version 4.2

The default value of the option is "calendar_id".

~~~js
{
	"id":2, 
    "calendar_id":"custom", 
    "text":"Task #1", 
    "start_date":"02-04-2013", 
    "duration":"8", 
    "parent":"1", 
    "progress":0.5, 
    "open": true
}
~~~