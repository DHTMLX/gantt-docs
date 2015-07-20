onGanttScroll
=============

@short:
	fires when the Gantt chart is scrolled to a particular point

@params:
- point		array		an array with x and corrdinates of the point


@example:

gantt.attachEvent("onGanttScroll", function ([scroll.x, scroll.y]){
    // any custom logic here
});


@template:	api_event
@descr:

