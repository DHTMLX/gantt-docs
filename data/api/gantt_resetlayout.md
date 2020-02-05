resetLayout
=============

@short:rebuilds the Gantt layout using the current value of the layout config

@params:





@example:

gantt.init("gantt_here");

gantt.config.layout = {
	css: "gantt_container",
	rows: [
		{
			cols: [
				{view: "grid", scrollX: "scrollHor", scrollY: "scrollVer"},
				{resizer: true, width: 1},
				{view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
				{view: "scrollbar", id: "scrollVer"}
			]
		},
		{view: "scrollbar", id: "scrollHor", height: 20}
	]
};

gantt.resetLayout();


@template:	api_method
@descr:

@relatedapi:

api/gantt_layout_config.md

@related:

desktop/layout_config.md
