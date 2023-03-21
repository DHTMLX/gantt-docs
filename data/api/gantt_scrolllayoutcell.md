scrollLayoutCell
=============


@short: scrolls the layout view to the specified position
	

@params:
- name	string	the name of the layout view
- x	number|null	optional, value of horizontal scroll or 'null' (if the scroll position shouldn't be changed)
- y	number|null	optional, value of vertical scroll or 'null' (if the scroll position shouldn't be changed)




@example:
// scrolls layout view only horizontally
gantt.scrollLayoutCell("resourceTimeline", 50);

// scrolls layout view only vertically
gantt.scrollLayoutCell("resourceTimeline", null, 50);

// scrolls layout view both horizontally and vertically 
gantt.scrollLayoutCell("resourceTimeline", 100, 100); 

@template:	api_method
@descr:

@relatedapi:
api/gantt_scrollto.md

