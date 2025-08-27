exportToMSProject
=============

@short:
	exports data from the Gantt chart to MS Project

@params:
* export		object		optional, an object with export settings (see the details)


@example:
gantt.exportToMSProject({
    name:'custom.xml'
});



@template:	api_method
@descr:

{{note This method is defined in the **export** extension, so you need to activate the [export_api](desktop/extensions_list.md#exportservice) plugin. Read the details in the desktop/export_msproject.md#exporttomsproject article.
}}

{{note If you use the Gantt version older than 8.0, you need to include the **https://export.dhtmlx.com/gantt/api.js** on your page to enable the online export service, e.g.:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
}}


The **exportToMSProject()** method takes as a parameter an object with a number of properties (all of the properties are optional):

- **name** - (*string*) the name of the obtained file ('gantt.xml' by default).
- **auto_scheduling** - (*boolean*) indicates the scheduling mode for tasks in the exported project. **true** will mark tasks as auto scheduled, **false** will mark tasks as manually scheduled (the default state).
- **skip_circular_links** - (*boolean*) indicates whether the circular links will be removed or not (true - will be removed (the default mode), false - will not be removed).
- **project** - (*object*) allows setting custom properties to the exported project entity.
- **tasks** - (*object*) allows setting custom properties to the exported task items.
- **data** - (*object*) allows setting a custom data source that will be presented in the output Gantt chart. It is expected that the **start_date** and **end_date** properties will be specified in the format which includes both the date and time (*%d-%m-%Y %H:%i*).
- **callback** - (*function*) if you want to receive an url to download a generated XML, the *callback* property can be used. It receives a JSON object with the *url* property.
- **resources** - (*array*) allows exporting the list of resources into an MS Project file. If the resource calendars are used, you need to specify -1 for a task in the *CalendarUID* property during the export (in the **tasks** object). 
Then the task will use the resource calendar.
- **server** - (*string*) the API endpoint for the request. Can be used with the local install of the export service. The default value is **https://export.dhtmlx.com/gantt**.

Check the detailed descriptions of the export settings in the [related section](desktop/export_msproject.md#exportsettings). 

@related:
desktop/export_msproject.md#exporttomsproject

@relatedapi:
api/gantt_exporttoprimaverap6.md
api/gantt_exporttoexcel.md
api/gantt_exporttoical.md
api/gantt_exporttopdf.md
api/gantt_exporttopng.md
api/gantt_exporttojson.md
api/gantt_importfromexcel.md
api/gantt_importfromprimaverap6.md
api/gantt_importfrommsproject.md

