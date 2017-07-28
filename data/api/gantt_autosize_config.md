autosize
=============
@short:forces the Gantt chart to automatically change its size to show all tasks without scrolling
	

@type: boolean, string
@default:false
@values:"y" ( or true),"x", "xy"
@example:
gantt.config.autosize = "xy";

gantt.init("gantt_here");

@template:	api_config
@descr:
The 'autosize' config defines whether the gantt will fit data inside the sizes of container where it's initialized showing inner scrollbars,
or modify the sizes of container in order to show all data without inner scrolls:

- [a sample with sizes of gantt div defined in css ](http://docs.dhtmlx.com/gantt/snippet/6b31c4e1) - inner scrollbars are active if necessary
- [a sample with sizes of gantt div calculated by a component](http://docs.dhtmlx.com/gantt/snippet/cb6165f4) - inner scrollbars are disabled

In case gantt should fit a certain area on a page, the size of gantt container must be managed manually:

- autosizing should be disabled 
- width/height of a div should be calculated either by html layout if some ready solution for responsive layouts is used, or manually by code.

@relatedapi: 
	api/gantt_autosize_min_width_config.md