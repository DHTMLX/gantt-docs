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

Note that the usage of the *static_background* parameter will disable highlighting of separate days and rows.

@relatedsample:
	08_api/10_performance_tweaks.html
@related:
	desktop/performance.md
