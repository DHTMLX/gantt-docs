onGanttScroll
=============

@short:
	fires when the Gantt chart is scrolled to a particular point

@params:
- left		number		the position of horizontal scroll
- top		number		the position of vertical scroll


@example:

gantt.attachEvent("onGanttScroll", function (left, top){
    // any custom logic here
});


@template:	api_event
@descr:

@relatedapi:
api/gantt_scrollto.md
api/gantt_getscrollstate.md

api/gantt_showtask.md
api/gantt_showdate.md


