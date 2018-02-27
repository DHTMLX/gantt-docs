RTL (Right-to-left) Mode
========================

<img src="desktop/rtl_mode.png">

You can use the Gantt chart in the right-to-left mode, which is enabled via the api/gantt_rtl_config.md configuration option.
Setting it to *true* will change the direction of the time scale in the timeline and the order of rows in the grid to right-to-left.

~~~js
gantt.config.rtl = true;
~~~

Enabling the rtl mode won't affect the [gantt.config.layout](api/gantt_layout_config.md) of the gantt, so you'll need to redefine it in order to 
swap the positions of the grid and timeline. It is done in the following way:

~~~js
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
~~~

{{sample  10_layout/04_rtl.html}}

You may also want [to set the direction of text for labels used in the gantt](https://developer.mozilla.org/en-US/docs/Web/CSS/direction).