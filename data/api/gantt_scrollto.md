scrollTo
=============
@short:scrolls the Gantt container to the specified position
	
@params:
* x		number | null		optional, the value of the horizontal scroll or 'null' (if the scroll position shouldn't be changed)
* y		number | null		optional, the value of the vertical scroll or 'null' (if the scroll position shouldn't be changed)



@example:
gantt.scrollTo(30, 80); // scrolls container both horizontally and vertically 

gantt.scrollTo(30, null); // scrolls container only horizontally

gantt.scrollTo(null, 80); // scrolls container only vertically 

@template:	api_method
@descr:

@relatedapi:
api/gantt_showdate.md
api/gantt_showtask.md
api/gantt_scrolllayoutcell.md


api/gantt_getscrollstate.md
api/gantt_onganttscroll_event.md
