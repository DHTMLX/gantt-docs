exportToJSON
=============

@short:
	exports the structure and data of a Gantt chart into a JSON object

@params:

- config 	object		an object with Gantt configuration


@example:
gantt.exportToJSON({
	name:"gantt.json"
});


@template:	api_method
@descr:
The **config** object can contain following options:

- name - the name of the exported json file
- data - (array) list of tasks to be exported. The whole gantt will be exported if not specified


@relatedapi:
api/gantt_exporttoexcel.md
api/gantt_exporttoical.md
api/gantt_exporttopdf.md
api/gantt_exporttopng.md
api/gantt_exporttomsproject.md
api/gantt_importfrommsproject.md
