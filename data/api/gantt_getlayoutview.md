getLayoutView
=============


@short: returns the object of the layout view by its name
	

@params:
- name	string	the name of the layout view

@returns:
- view	object	the object of the layout view


@example:
gantt.getLayoutView("resourceTimeline").posFromDate(new Date(2025, 05, 08));
// returns 210

gantt.getLayoutView("resourceTimeline").dateFromPos(210);
// returns 08 June, 2025

@template:	api_method
@descr:

The method allows applying some methods to the returned object of the layout view. The methods are:

- api/gantt_datefrompos.md - gets the date of the specified horizontal position in the view
- api/gantt_posfromdate.md - gets the relative horizontal position of the specified date in the view
- api/gantt_getscale.md - returns the configuration of the time scale of the view

To scroll the view to the specified position, apply the api/gantt_scrolllayoutcell.md method.

@related:
desktop/layout_config.md

