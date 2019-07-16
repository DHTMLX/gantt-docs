static_background
=============

@short: generates a background image for the timeline area instead of rendering actual columns' and rows' lines
	
@edition: pro
@type: boolean
@default: false
@example:
gantt.config.static_background = true;

gantt.init("gantt_here");

@template:	api_config
@descr:
{{pronote This functionality is available in the PRO edition only.}}

Since v6.2 this config renders PNG background AND any cells that have CSS class attached to them via the api/gantt_timeline_cell_class_template.md template function.

If you need to revert to v6.1 behavior (that is to render just the background image), use the api/gantt_static_background_cells_config.md config:

~~~js
gantt.config.static_background_cells = false;
~~~

@relatedsample:
	08_api/10_performance_tweaks.html
@related:
	desktop/performance.md
@relatedapi:
api/gantt_static_background_cells_config.md