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
			<td>(<i>boolean</i>) defines that all Gantt markup will be exported as it is, with all custom elements. <em>false</em> by default. <a href="desktop/export.md#exportingcustommarkupandstyles">Read the details</a> </td>
		</tr>
		<tr>
			<td class="webixdoc_links0"><b>callback</b></td>
			<td>(<i>function</i>) If you want to receive an url to download a generated PDF file, the callback property can be used. It receives a JSON object with the url property</td>
		</tr>
		<tr>
			<td class="webixdoc_links0"><b>additional_settings</b></td>
			<td>(<i>object</i>) an object with additional settings. The object can contain the following attributes:
			<ul>
					<li><b>format</b> - (<i>string</i>) the format of the output file: <i>'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'</i></li>
					<li><b>landscape</b> - (<i>boolean</i>) the portrait or landscape orientation of the output file. The attribute works only when the "format" attribute is specified.</li>
					<li><b>width</b> - (<i>string|number|"content"</i>) the width of the output page. The attribute is used when exporting multiple pages. </li>
					<li><b>height</b> - (<i>string|number|"content"</i>) the height of the output page. The attribute is used when exporting multiple pages.</li>
				</ul>
			</td>
		</tr>
    </tbody>
</table>

### Multi-page export

When Gantt is exported, only its leftmost part is exported to the PDF document each time. Thus, to implement multi-page export, it is necessary to export Gantt several times, shifting Gantt to the left each time.  

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

{{editor	https://snippet.dhtmlx.com/5/d8462d9e6	Export to the file of defined sizes}}

In case you want to export Gantt to the specific format ('A4', for example), note, that the file format is defined in millimeters but the size in HTML is specified in pixels. Therefore, you need to convert the shift value from millimeters to pixels. 

~~~js
const widthMM = 297;
const width = widthMM / (25.4 inch / 144 PDF PPI);
~~~

{{editor	https://snippet.dhtmlx.com/5/a4a4e62e3	Export to the file of defined format}}

<br>
**Note**, if you export the multi-page Gantt but get only one PDF file, it means that the browser blocks the pop-ups because the function opens them simultaneously. 
In this case, you need to enable the pop-ups and try exporting again.

![blocked_popup](desktop/popup_blocked.png)

### Time restrictions

{{note The export service has time restrictions.}}

If the process takes over than 20 seconds, the export will be canceled and the following error will occur:

~~~html
Error: Timeout trigger 20 seconds
~~~

If several people export Gantt at the same time, the process can take more time than usual. But that's fine because the time which is spent for export request from a specific user is counted separately.

{{note If you need to export large charts, you can use a [standalone export module](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml). The export module is provided free of charge if you've obtained Gantt under [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) or [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) license, or you can [buy the module separately](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210).}}



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
