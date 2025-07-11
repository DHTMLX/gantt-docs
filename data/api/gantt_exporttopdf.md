exportToPDF
=============

@short:
	exports a Gantt chart into the PDF format

@params:

* export		object		optional, an object with export settings (see the details)


@example:

gantt.exportToPDF();
 
//or
gantt.exportToPDF({
  name: "mygantt.pdf"
});

gantt.exportToPDF({
	name:"mygantt.pdf",
	header:"<h1>My company</h1>",
	footer:"<h4>Bottom line</h4>",
	locale:"en",
	start:"01-04-2013",
	end:"11-04-2013",
	skin:'terrace',
	data:{ },
	server:"https://myapp.com/myexport/gantt",
	raw:true,
	callback: function(res){
		alert(res.url);
	}
});

@template:	api_method
@descr:

{{note This method is defined in the **export** extension, so you need to activate the [export_api](desktop/extensions_list.md#exportservice) plugin. Read the details in the desktop/export.md article.

}}

{{note If you use the Gantt version older than 8.0, you need to include the **https://export.dhtmlx.com/gantt/api.js** on your page to enable the online export service, e.g.:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
}}


The api/gantt_exporttopdf.md method takes as a parameter an object with a number of properties (all of the properties are optional):

<table class="webixdoc_links">
	<tbody>
    	<tr>
			<td class="webixdoc_links0"><b>name</b></td>
			<td>(<i>string</i>) the name of the output file</td>
		</tr>
       <tr>
			<td class="webixdoc_links0"><b>skin</b></td>
			<td>(<i>'terrace', 'skyblue', 'meadow', 'broadway'</i>) the skin of the output Gantt chart</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>locale</b></td>
			<td>(<i>string</i>) sets the language that will be used in the output Gantt chart</td>
		</tr>        
        <tr>
			<td class="webixdoc_links0"><b>start</b></td>
			<td>(<i>string</i>) sets the start date of the data range that will be presented in the output Gantt chart. The date format is defined by the api/gantt_date_format_config.md config</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>end</b></td>
			<td>(<i>string</i>) sets the end date of the data range that will be presented in the output Gantt chart. The date format is defined by the api/gantt_date_format_config.md config</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>data</b></td>
			<td>(<i>object</i>) sets a custom data source that will be presented in the output Gantt chart </td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>header</b></td>
			<td>(<i>string</i>) specifies the header that will be added to the output PDF image. Note, you can use any HTML here</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>footer</b></td>
			<td>(<i>string</i>) specifies the footer that will be added to the output PDF image. Note, you can use any HTML here</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>server</b></td>
			<td>(<i>string</i>) sets the API endpoint for the request. Can be used with the local install of the export service. The default value is <strong>https://export.dhtmlx.com/gantt</strong></td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>raw</b></td>
			<td>(<i>boolean</i>) defines that all Gantt markup will be exported as it is, with all custom elements. <em>false</em> by default. 
            	<a href="desktop/export.md#exportingcustommarkupandstyles">Read the details</a> </td>
		</tr>
		<tr>
			<td class="webixdoc_links0"><b>callback</b></td>
			<td>(<i>function</i>) If you want to receive an url to download a generated PDF file, the callback property can be used. It receives a JSON object with the url property</td>
		</tr>
		<tr>
			<td class="webixdoc_links0"><b>additional_settings</b></td>
			<td>(<i>object</i>) an object with additional settings. The object can contain the following attributes:
			<ul>
				<li><b>format</b> - (<i>string</i>) the format of the output file:
                <i>"A0", "A1", "A2", "A3", "A4", "A5", "A6", "Legal", "Ledger", "Letter", "Tabloid"</i></li>
				<li><b>landscape</b> - (<i>boolean</i>) the portrait or landscape orientation of the output file. The attribute works only when the "format" attribute is specified</li>
				<li><b>width</b> - (<i>string|number|"content"</i>) the width of the output page. The attribute is used when exporting multiple pages</li>
				<li><b>height</b> - (<i>string|number|"content"</i>) the height of the output page. The attribute is used when exporting multiple pages</li>
                <li><b>merge_pages</b> - (<i>boolean</i>) enables the <a href="#multipageexport">multipage export</a> in one file; if set to <i>false</i> you will have to make export several times to get all the Gantt data</li>
                <li><b>fixed_headers</b> - (<i>boolean</i>) enables displaying of the grid and timeline headers on each page; <i>false</i> by default. Works only with
                    the enabled <b>merge_pages</b> setting</li>
                <li><b>margins</b> - (<i>object</i>) the object with the top, bottom, left and right margins.
                	<a href="desktop/export.md#marginsoftheoutputpdffile">Read the details</a></li>
                <li><b>header</b> - (<i>string</i>) specifies the header that will be added to each page of the output PDF file.
                	<a href="desktop/export.md#headerfooterforeachpage">Read the details</a></li>
                <li><b>footer</b> - (<i>string</i>) specifies the footer that will be added to each page of the output PDF file.
                	<a href="desktop/export.md#headerfooterforeachpage">Read the details</a></li>
			</ul>
			</td>
		</tr>
    </tbody>
</table>

Time restrictions
---------------------

{{note The export service has time restrictions.}}

If the process takes over than 20 seconds, the export will be canceled and the following error will occur:

~~~html
Error: Timeout trigger 20 seconds
~~~

If several people export Gantt at the same time, the process can take more time than usual. But that's fine because the time which is spent for export request from a specific user is counted separately.

{{note If you need to export large charts, you can use a [standalone export module](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml). The export module is provided free of charge if you've obtained Gantt under [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) or [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) license, or you can [buy the module separately](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210).}}


Multi-page export
-------------------

Please note that the export module doesn't have technical possibilities to do the following:

- control the cutoff position (so the tasks may be sliced in the middle between the pages)
- show scales on each page without overlaying tasks
- show the header and the footer on each page without overlaying the task rows

So to complete the above described tasks you need to apply custom solutions. Some of them are provided below.

### Exporting data automatically in one file 

For multi-page export in one file, you can either use the online export service (with [time limitations](#timerestrictions)) or 
the standalone [export module](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) (without limitations).
All you need to do is to use the **merge_pages** attribute of the **additional_settings** object:

~~~js
gantt.exportToPDF({
	additional_settings: {
    	merge_pages: true, /*!*/
        format: "A4"
    }
});
~~~

The export service suits well if a chart is not very big. If a chart is large, the data will be exported partially. 
In this case, you can [make several data exports manually](#manual_export)
or use the export module. The export module will export all data by itself and provide one file with all the pages. 

{{editor	https://snippet.dhtmlx.com/2qzecnke	Multi-page export in one file}}

The disadvantage of this method is that data export takes much more time than export of all data on one page. To spend less time on exporting Gantt data,
you can change the Zoom level and render the data in weeks, months or years, since then Gantt will take less width and you will apply export fewer times.

Check the detailed overview of the multi-page export in one PDF file in the [related blog article](https://dhtmlx.com/blog/maintenance-release-pdf-export-module-gantt-0-6-4-scheduler-0-6-5-suite-8-3-10-kanban-1-5-12/#:~:text=Multipage%20Export%20in%20One%20PDF%20File).

<h3 id="manual_export">Making several data exports manually</h3>

Since the sizes of the Gantt chart almost always exceed the standard document sizes, the chart takes more than one page to fit in.
When Gantt is exported, only its leftmost part is exported to the PDF document each time. 
Thus, to implement a multi-page export, it is necessary to export Gantt several times, shifting Gantt to the left each time.

To shift Gantt in the exported file, you need to add the following style rule to **#gantt_here** in the **header** parameter:

~~~js
const width = 1000;
const height = 1000;
const total_width = gantt.$task_bg.scrollWidth + gantt.$grid.scrollWidth;

for (let i = 0; i < total_width; i += width) {
  gantt.exportToPDF({
    header:`<style>#gantt_here{left:-${i}px;position: absolute;}</style>`,
    //raw: true,
    additional_settings:{
      width: width,
      height: height,
    }
  });
}
~~~

{{editor	https://snippet.dhtmlx.com/zbhc506m	Export to the file of defined sizes}}

In case you want to export Gantt to the specific format ('A3', for example), note, that the file format is defined in millimeters but the size in HTML is specified in pixels.
Therefore, you need to convert the shift value from millimeters to pixels. 

~~~js
const widthMM = 297;
const width = widthMM / (25.4 inch / 96 PDF PPI);
~~~

{{editor	https://snippet.dhtmlx.com/qt54zfuw	Export to the file of defined format}}

<br>
**Note**, if you export the multi-page Gantt but get only one PDF file, it means that the browser blocks the pop-ups because the function opens them simultaneously. 
In this case, you need to enable the pop-ups and try exporting again.

![blocked_popup](desktop/popup_blocked.png)


### Displaying timeline and grid headers on every page in the exported file

You can enable displaying timeline and grid headers on every page in the exported file with the help of the **fixed_headers** attribute of the **additional_settings** object.
Note that this feature works only with the **merge_pages** attribute enabled as well:

~~~js
gantt.exportToPDF({
	additional_settings: {
		merge_pages: true,  /*!*/
		fixed_headers: true,  /*!*/
		format: "A4"
	}
});
~~~

{{editor 	https://snippet.dhtmlx.com/w905ht5t		Multi-page export with timeline and grid headers on each page}}

{{editor	https://snippet.dhtmlx.com/xkmvduu5		Multi-page export with timeline and grid headers on each page for the Resource panel view}}

In case you need to make it work without the config, e.g. if you want to perform several export operations and merge the files manually, you can use the following styles:

~~~css
.grid_cell .gantt_grid_scale,
.timeline_cell .gantt_task_scale {
  position: fixed;
  top:0;
  z-index:99999;
}
~~~

@related:
desktop/export.md
desktop/how_to.md#howtoaddresourcechartorcustomstylesintheexportedpdffile

@relatedapi:
api/gantt_exporttomsproject.md
api/gantt_exporttoprimaverap6.md
api/gantt_exporttoexcel.md
api/gantt_exporttoical.md
api/gantt_exporttopng.md
api/gantt_exporttojson.md
api/gantt_importfromexcel.md
api/gantt_importfromprimaverap6.md
api/gantt_importfrommsproject.md
