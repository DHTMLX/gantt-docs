Export to Excel and iCal
===========================================

Starting from version 3.2, the library allows you to export data from the Gantt chart in  the Excel and iCal formats. 


Export to Excel
-------------------

To export data from the Gantt chart to an Excel document, do the following:

<ol>
	<li>Include the <b>"http://export.dhtmlx.com/gantt/api.js"</b> file on the page to enable the online export service:
~~~html
<script src="codebase/dhtmlxgantt.js"></script>
<script src="http://export.dhtmlx.com/gantt/api.js"></script>  /*!*/
<link rel="stylesheet" href="codebase/dhtmlxgantt.css" type="text/css">
~~~
</li>
	<li>Call the <b>exportToExcel</b> method to export data from the Gantt chart: 
~~~html
<input value="Export to Excel" type="button" onclick='gantt.exportToExcel()'>/*!*/

<script>
	gantt.init("gantt_here");
	gantt.parse(demo_tasks);
</script>
~~~

</li>
</ol>
{{sample
	08_api/08_export_other.html
}}

{{sample
	08_api/09_export_store.html
}}      
        

####Parameters of the export method

The **exportToExcel()** method takes as a parameter the object with 2 possible properties (all of the properties are optional):

<table class="webixdoc_links">
	<tbody>
    	<tr>
			<td class="webixdoc_links0"><b>name</b></td>
			<td>(<i>string</i>) sets the name of the output file with the extension '.xlsx' </td>
		</tr>
       <tr>
			<td class="webixdoc_links0"><b>columns</b></td>
			<td>(<i>array</i>) allows to configure columns of the output Excel sheet
            	<ul>
                	<li><b>'id'</b> - (string|number) a property of the event that will be mapped to the column </li>
                    <li><b>'header'</b> - (string) the column header</li>
                    <li><b>'width'</b> - (number) the column width in pixels</li>
                    <li><b>'type'</b> - (string) the column type</li>
                </ul>
            </td>
		</tr>
    </tbody>
</table>

{{snippet
Calling the export method with optional properties
}}
~~~js
gantt.exportToExcel({
	name:"document.xlsx", 
    columns:[
		{ id:"text",  header:"Title", width:150 },
        { id:"start_date",  header:"Start date", width:250, type:"date" }
    ]
});
~~~



Export to iCal
-------------------

To export data from the Gantt chart  to an iCal string, do the following:

<ol>
	<li>Include the <b>"http://export.dhtmlx.com/gantt/api.js"</b> file on the page to enable the online export service:
~~~html
<script src="codebase/dhtmlxgantt.js"></script>
<script src="http://export.dhtmlx.com/gantt/api.js"></script>  /*!*/
<link rel="stylesheet" href="codebase/dhtmlxgantt.css" type="text/css">
~~~
</li>
	<li>Call the <b>exportToIcal</b> method to export data from the Gantt chart: 
~~~html
<input value="Export to iCal" type="button" onclick='gantt.exportToICal()'>/*!*/

<script>
	gantt.init("gantt_here");
	gantt.parse(demo_tasks);
</script>
~~~

</li>
</ol>
{{sample
	08_api/08_export_other.html
}}

{{sample
	08_api/09_export_store.html
}}