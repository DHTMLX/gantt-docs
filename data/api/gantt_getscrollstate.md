getScrollState
=============
@short: returns the scroll position
	

@returns:
scroll	object	the scroll position object as { x:scrollLeft, y:scrollTop } 





@example:
const sPos = gantt.getScrollState(); // {x:58,y:180}
const posX = sPos.x;
const posY = sPos.y;

@template:	api_method
@descr:

@relatedapi:
api/gantt_scrollto.md
api/gantt_onganttscroll_event.md

api/gantt_showdate.md
api/gantt_showtask.md

