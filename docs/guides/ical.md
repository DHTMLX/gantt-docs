---
title: "Export to iCal"
sidebar_label: "iCal"
---

# Export to iCal

The dhtmlxGantt library allows you to export data from the Gantt chart to the iCal format. The export goes through an export service: the online export service or the PDF/PNG/Excel [export module](guides/export-modules.md).

To export data from the Gantt chart to an iCal string, do the following:

- To use the online export service, enable the <b>export_api</b> plugin via the [plugins](api/method/plugins.md) method:

~~~js
gantt.plugins({
    export_api: true
});
~~~

- Call the [exportToICal](api/method/exporttoical.md) method to export data from the Gantt chart: 

~~~html
<input value="Export to iCal" type="button" onclick='gantt.exportToICal()'>

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~


**Related sample**: [Export data: MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)


**Related sample**: [Export data: store online](https://docs.dhtmlx.com/gantt/samples/08_api/09_export_store.html)


## Parameters of the export method

The [exportToICal()](api/method/exporttoical.md) method takes as a parameter an object with the following properties (optional):

- **server** - (*string*) sets the API endpoint for the request. Can be used with the local install of the export service. The default value is `https://export.dhtmlx.com/gantt`;
- **name** - (*string*) allows specifying custom name and extension for the file but the file will still be exported in the iCal format.
  
~~~jsx title="Calling the export method with optional properties"
gantt.exportToICal({
    server:"https://myapp.com/myexport/gantt"
});
~~~

