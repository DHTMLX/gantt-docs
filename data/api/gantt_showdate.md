showDate
=============
@short:scrolls the chart area to makes the specified date visible
	

@params:
- date	Date	the date to show in the chart




@example:
gantt.showDate(new Date()); //shows the current date

@template:	api_method
@descr:
In the default mode, Gantt scrolls itself when you use the [showDate](api/gantt_showdate.md) method.
But if the **autosize** mode is enabled, Gantt increases the size of its container and starts to scroll the page instead of showing the specified date. 
Read the [Scrolling to hidden elements](api/gantt_autosize_config.md) article to know how to solve this problem.

@relatedapi:
api/gantt_showtask.md
api/gantt_scrollto.md

api/gantt_getscrollstate.md
api/gantt_onganttscroll_event.md