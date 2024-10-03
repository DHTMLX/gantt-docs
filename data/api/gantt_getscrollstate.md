getScrollState
=============
@short: returns the scroll position
	

@returns:
ScrollState	ScrollState	the scroll position object 





@example:
const sPos = gantt.getScrollState(); // {x:58,y:180}
const posX = sPos.x;
const posY = sPos.y;

@template:	api_method
@descr:
The method returns an object with the following properties:

- **y** - the number of pixels by which the position is scrolled vertically
- **x** - the number of pixels by which the position is scrolled horizontally
- **inner_width** - the width of the visible timeline area
- **inner_height** - the height of the visible timeline area
- **width** - the scroll width of the timeline area
- **height** - the scroll height of the timeline area

@relatedapi:
api/gantt_scrollto.md
api/gantt_onganttscroll_event.md

api/gantt_showdate.md
api/gantt_showtask.md

