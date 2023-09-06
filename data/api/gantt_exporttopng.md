exportToPNG
=============

@short:
	exports a Gantt chart into the PNG format

@params:

* export		object		optional, an object with export settings (see the details)


@example:
gantt.exportToPNG();

//or
gantt.exportToPNG({
  name: "mygantt.png"
});

//or
gantt.exportToPNG({
    name:"mygantt.png",
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

The api/gantt_exporttopng.md method takes as a parameter an object with a number of properties (all of the properties are optional):

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
			<td>(<i>function</i>) If you want to receive an url to download a generated PNG file, the callback property can be used. It receives a JSON object with the url property</td>
		</tr>
		<tr>
			<td class="webixdoc_links0"><b>additional_settings</b></td>
			<td>(<i>object</i>) an object with additional settings. The object can contain the following attributes:
			<ul>
					<li><b>width</b> - (<i>number|string</i>) the width of the output page</li>
					<li><b>height</b> - (<i>number|string</i>) the height of the output page</li>
					The <b>width</b> and <b>height</b> parameters will be ignored if <b>slice_archive</b> is specified.
					<li><b>slice_archive</b> - (<i>boolean|object</i>) allows saving large chart by pieces and obtaining them in the archive. As an object, the attribute takes the <b>width</b> and <b>height</b> options. 
					If the piece size is not defined (i.e. <i>slice_archive: true</i>), the default sizes are 1000×1000.  </li>
					<li><b>slice_check</b> - (<i>boolean</i>) adds an HTML page to the archive. The page lets you check that all pieces are exported correctly.</li>
				</ul>
			</td>
		</tr>
    </tbody>
</table>

### Exporting large Gantt by pieces

The maximal sizes of the exported file are 10000х10000. 

You can increase one of the sizes, and decrease another one correspondingly via the **width**/**height** attributes of the **additional_settings** property. But if the product of the values of the width and height is greater than 100000000 (10000х10000), the output PNG image will be cropped off. 

There is the ability to export the gantt by pieces and obtain them in the archive by using the **slice_archive** attribute of the **additional_settings** property of the method:

~~~js
gantt.exportToPNG({
    server: "https://export.dhtmlx.com/beta/gantt",
    additional_settings:{
    	//width: 2000,
    	//height: 2000,
      	slice_archive: {width: 2000, height: 2000},
      	slice_check: true,
    }
});
~~~

**Related sample:** [Export into PNG images](https://snippet.dhtmlx.com/5/fc4ac8769)

You can either define the sizes of the output PNG images via setting the attribute as an object with the *width* and *height* options:

~~~js
slice_archive: {width: 2000, height: 2000}
~~~

or you can set the attribute to *true*. In this case, the exported pieces of the gantt will have default sizes: 1000×1000.

~~~js
slice_archive: true
~~~

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


@relatedapi:
api/gantt_exporttomsproject.md
api/gantt_exporttoprimaverap6.md
api/gantt_exporttoexcel.md
api/gantt_exporttoical.md
api/gantt_exporttopdf.md
api/gantt_exporttojson.md
api/gantt_importfromexcel.md
api/gantt_importfromprimaverap6.md
api/gantt_importfrommsproject.md
