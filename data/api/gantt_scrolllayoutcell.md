scrollLayoutCell
=============


@short: scrolls the layout view to the specified position
	

@params:
- name	string	the name of the layout view
- x	number | null	optional, the value of the horizontal scroll or 'null' (if the scroll position shouldn't be changed)
- y	number | null	optional, the value of the vertical scroll or 'null' (if the scroll position shouldn't be changed)




@example:
// scrolls layout view only horizontally
gantt.scrollLayoutCell("resourceTimeline", 50);

// scrolls layout view only vertically
gantt.scrollLayoutCell("resourceTimeline", null, 50);

// scrolls layout view both horizontally and vertically 
gantt.scrollLayoutCell("resourceTimeline", 100, 100); 

@template:	api_method
@descr:

{{editor	https://snippet.dhtmlx.com/0v4mmoxu		Public methods to get the layout cell views and scroll them}}

@relatedapi:
api/gantt_scrollto.md

