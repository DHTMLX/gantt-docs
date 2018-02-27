resource_property
=============

@edition: pro

@short:
	specifies a property of the task object which stores a resource id assiciated with resourceGrid/resourceTimeline

@type: string
@default: "owner_id"

@descr:
Specifies a property of the task object which stores a resource id assiciated with resourceGrid/resourceTimeline. Can be changed a the runtime.


@example:
gantt.config.resource_store = "users";
gantt.config.resource_property = "user_id";

gantt.config.layout = {
	css: "gantt_container",
	rows: [
		{
			cols: [
				{view: "grid", group:"grids", scrollY: "scrollVer"},
				{resizer: true, width: 1},
				{view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
				{view: "scrollbar", id: "scrollVer", group:"vertical"}
			],
			gravity:2
		},
		{resizer: true, width: 1},
		{
			config: resourceConfig,
			cols: [
				{view: "resourceGrid", group:"grids", scrollY: "resourceVScroll" },
				{resizer: true, width: 1},
				{view: "resourceTimeline", scrollX: "scrollHor", scrollY: "resourceVScroll"},
				{view: "scrollbar", id: "resourceVScroll", group:"vertical"}
			],
			gravity:1
		},
		{view: "scrollbar", id: "scrollHor"}
	]
};

var resourcesStore = gantt.createDatastore({
	name: gantt.config.resource_store
});

gantt.init("gantt_here");
gantt.parse({data: [
    {id: 1, text: "Project #2", start_date: "01-04-2018", duration: 18, progress: 0.4, open: true},
    {id: 2, text: "Task #1", start_date: "02-04-2018", user_id:1, duration: 8, progress: 0.6, parent: 1},
    {id: 3, text: "Task #2", start_date: "11-04-2018", user_id:2, duration: 8, progress: 0.6, parent: 1}
  ],
  links: [
      {id: 1, source: 1, target: 2, type: "1"},
      {id: 2, source: 2, target: 3, type: "0"}
  ]
});

resourcesStore.parse([
	{id: 1, text: "John"},
	{id: 2, text: "Mike"},
	{id: 3, text: "Anna"},
	{id: 4, text: "Bill"}
]);

@template:	api_config

@related: desktop/resource_management.md

@relatedapi:
api/gantt_resource_store_config.md

@relatedsample:
11_resources\04_resource_usage_diagram.html
11_resources\05_resource_usage_templates.html

