rtl
=============

@short:
	switches gantt to the right-to-left mode

@type: boolean
@default: false

@example:
gantt.config.rtl = true;
gantt.config.layout = {
	css: "gantt_container",
	rows: [
		{
			cols: [
				{view: "scrollbar", id: "scrollVer"},
				{view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
				{resizer: true, width: 1},
				{view: "grid", scrollX: "scrollHor", scrollY: "scrollVer"}
			]
		},
		{view: "scrollbar", id: "scrollHor", height: 20}
	]
};
gantt.init("gantt_here");

@template:	api_config
@descr:
Setting the config option to **true** will change the direction of the time scale in the timeline and the order of rows in the grid to right-to-left.

It doesn't affect the api/gantt_layout_config.md of the gantt, so you'll need to redefine the layout in order to swap the positions of the grid and timeline.

You may also want [to set the direction of text for labels used in the gantt](https://developer.mozilla.org/en-US/docs/Web/CSS/direction).

@relatedsample:
	10_layout/04_rtl.html
    
@related:
desktop/rtl_mode.md