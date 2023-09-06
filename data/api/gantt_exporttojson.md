exportToJSON
=============

@short:
	exports the structure and data of a Gantt chart into a JSON object

@params:

* config 	object		optional, an object with Gantt configuration


@example:
gantt.exportToJSON({
	name:"gantt.json"
});


@template:	api_method
@descr:

{{note This method is defined in the **export** extension, so you need to activate the [export_api](desktop/extensions_list.md#exportservice) plugin.
}}

{{note If you use the Gantt version older than 8.0, you need to include the **https://export.dhtmlx.com/gantt/api.js** on your page to enable the online export service, e.g.:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
}}

The **config** object can contain following options:

- name - the name of the exported json file
- data - (array) list of tasks to be exported. The whole gantt will be exported if not specified


@relatedapi:
api/gantt_exporttomsproject.md
api/gantt_exporttoprimaverap6.md
api/gantt_exporttoexcel.md
api/gantt_exporttoical.md
api/gantt_exporttopdf.md
api/gantt_exporttopng.md
api/gantt_importfromexcel.md
api/gantt_importfromprimaverap6.md
api/gantt_importfrommsproject.md
