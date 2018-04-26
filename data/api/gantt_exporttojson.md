exportToJSON
=============


@todo:
	check and improve

@short:
	exports the structure and data of a Gantt chart into a JSON object

@params:

- config 	object		an object with Gantt configuration


@example:
gantt.exportToJSON({
	name:"gantt.json",
    data: {
		"data": [
			{ "id": 11, "text": "Project #1", ... },
			{ "id": 12, "text": "Task #1", ... }
         ],
         "links": [
			{ "id": "1", "source": "1", ... },
			{ "id": "2", "source": "2", ... }
         ]
    },
    config: {},
    columns: [{},{}],
	worktime: {
		"hours": [],
		"dates": {}
	},
	version: "5.1.2",
	upload: null 
});


@template:	api_method
@descr:
The **config** object contains a set of configuraion options:

- name - the name of the exported json file
- data - the gantt data object
- config - the [gantt config object](api/refs/gantt_props.md)
- columns - the [gantt columns](api/gantt_columns_config.md) array
- worktime - the [worktime](desktop/working_time.md) object 
- version - the version of gantt
- upload - ?


@relatedapi:
api/gantt_exporttoexcel.md
api/gantt_exporttoical.md
api/gantt_exporttopdf.md
api/gantt_exporttopng.md
api/gantt_exporttomsproject.md
api/gantt_importfrommsproject.md
