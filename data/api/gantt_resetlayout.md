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
{{note This method removes custom layers added to the timeline area via the api/gantt_addtasklayer.md and api/gantt_addlinklayer.md methods. 
Therefore, you need to redefine these ones after calling the **gantt.resetLayout** method in order for custom layers to be displayed on a page.}}

@relatedapi:

api/gantt_layout_config.md

@related:

desktop/layout_config.md
