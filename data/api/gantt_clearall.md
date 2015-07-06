clearAll
=============
@short:removes all tasks from the Gantt chart
	


@example:
//reloads data in the Gantt chart
gantt.load("url1")

gantt.clearAll(); /*!*/
gantt.load("url2");/*!*/

@relatedapi:
	api/gantt_onclear_event.md
@related:
	desktop/crud_task.md

@template:	api_method
@descr:

Note, the method invokes the api/gantt_onclear_event.md event.
