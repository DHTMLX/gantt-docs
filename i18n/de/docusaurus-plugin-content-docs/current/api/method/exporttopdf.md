---
sidebar_label: exportToPDF
title: exportToPDF-Methode
description: "exportiert ein Gantt-Diagramm im PDF-Format"
---

# exportToPDF

### Description

@short: Exportiert ein Gantt-Diagramm ins PDF-Format

@signature: exportToPDF: (_export_?: any) => void

### Parameters

- `export`	- Objekt - optional, ein Objekt mit Export-Einstellungen (siehe Details)

### Example

~~~jsx
gantt.exportToPDF();
 
//oder
gantt.exportToPDF({
  name: "mygantt.pdf"
});

gantt.exportToPDF({
    name: "mygantt.pdf",
    header: "<h1>My company</h1>",
    footer: "<h4>Bottom line</h4>",
    locale: "en",
    start: "01-04-2026",
    end: "11-04-2026",
    skin: "terrace",
    data: { },
    server: "https://myapp.com/myexport/gantt",
    raw: true,
    callback: (res) => {
        alert(res.url);
    }
});
~~~

### Details

:::note
Dieses Verfahren ist im **export**-Erweiterung definiert, daher müssen Sie das [export_api](guides/extensions-list.md#export-service) Plugin aktivieren. Lesen Sie die Details im [](guides/export.md) Artikel.
:::

:::note
Wenn Sie die Gantt-Version älter als 8.0 verwenden, müssen Sie auf Ihrer Seite das `https://export.dhtmlx.com/gantt/api.js`-Skript einbinden, um den Online-Exportdienst zu aktivieren, z. B.:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

The [](api/method/exporttopdf.md) method takes as a parameter an object with a number of properties (all of the properties are optional):

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
			<td>(<i>string</i>) sets the start date of the data range that will be presented in the output Gantt chart. The date format is defined by the [](api/config/date_format.md) config</td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>end</b></td>
			<td>(<i>string</i>) sets the end date of the data range that will be presented in the output Gantt chart. The date format is defined by the [](api/config/date_format.md) config</td>
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
  	[Read the details](guides/export.md#exportingcustommarkupandstyles)</td>
		</tr>
		<tr>
			<td class="webixdoc_links0"><b>callback</b></td>
			<td>(<i>function</i>) If you want to receive an url to download a generated PDF file, the callback property can be used. It receives a JSON object with the url property</td>
		</tr>
		<tr>
			<td class="webixdoc_links0"><b>additional_settings</b></td>
			<td>(<i>object</i>) an object with additional settings. The object can contain the following attributes:<ul><li><b>format</b> - (<i>string</i>) the format of the output file:<i>"A0", "A1", "A2", "A3", "A4", "A5", "A6", "Legal", "Ledger", "Letter", "Tabloid"</i></li><li><b>landscape</b> - (<i>boolean</i>) the portrait or landscape orientation of the output file. The attribute works only when the "format" attribute is specified</li><li><b>width</b> - (<i>string|number|"content"</i>) the width of the output page. The attribute is used when exporting multiple pages</li><li><b>height</b> - (<i>string|number|"content"</i>) the height of the output page. The attribute is used when exporting multiple pages</li><li><b>merge_pages</b> - (<i>boolean</i>) enables the <a href="#multi-page-export">multipage export</a> in one file; if set to <i>false</i> you will have to make export several times to get all the Gantt data</li><li><b>fixed_headers</b> - (<i>boolean</i>) enables displaying of the grid and timeline headers on each page; <i>false</i> by default. Works only with the enabled <b>merge_pages</b> setting</li><li><b>margins</b> - (<i>object</i>) the object with the top, bottom, left and right margins for the output PDF file. [Read the details](guides/export.md#margins-of-the-output-pdf-file)</li><li><b>header</b> - (<i>string</i>) specifies the header that will be added to each page of the output PDF file. [Read the details](guides/export.md#headerfooter-of-the-output-file)</li><li><b>footer</b> - (<i>string</i>) specifies the footer that will be added to each page of the output PDF file. [Read the details](guides/export.md#headerfooter-of-the-output-file)</li></ul></td>
		</tr>
  </tbody>
</table>

### Time restrictions

:::note
Der Exportdienst unterliegt Zeitbeschränkungen. 
:::

Wenn der Prozess länger als 20 Sekunden dauert, wird der Export abgebrochen und der folgende Fehler tritt auf:

~~~html
Error: Timeout trigger 20 seconds
~~~

Wenn mehrere Personen gleichzeitig Gantt exportieren, kann der Prozess mehr Zeit in Anspruch nehmen als üblich. Aber das ist in Ordnung, da die Zeit, die für die Exportanfrage eines bestimmten Benutzers aufgewendet wird, separat gezählt wird.

:::note
Wenn Sie große Diagramme exportieren müssen, können Sie ein eigenständiges Exportmodul verwenden. Das Exportmodul wird kostenlos bereitgestellt, falls Sie Gantt unter einer [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) oder [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) Lizenz erhalten haben, oder Sie können das Modul separat [kaufen](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210).
:::

### Multi-page export

Bitte beachten Sie, dass das Exportmodul nicht die technischen Möglichkeiten besitzt, Folgendes zu tun:

- die Abtrenntposition zu kontrollieren (damit Aufgaben möglicherweise mitten zwischen den Seiten geschnitten werden)
- Skalen auf jeder Seite anzuzeigen, ohne dass Aufgaben überlagert werden
- Kopf- und Fußzeile auf jeder Seite anzuzeigen, ohne die Aufgabenzeilen zu überlagern

Um die oben beschriebenen Aufgaben zu erfüllen, müssen Sie benutzerdefinierte Lösungen anwenden. Einige davon finden Sie unten.

#### Exportieren von Daten automatisch in einer Datei

Für den Multi-Page-Export in einer Datei können Sie entweder den Online-Exportdienst (mit Zeitbeschränkungen) verwenden oder das eigenständige Exportmodul (ohne Beschränkungen). Alles, was Sie tun müssen, ist das Attribut **merge_pages** des Objekts **additional_settings** zu verwenden:

~~~js
gantt.exportToPDF({
    additional_settings: {
        merge_pages: true, 
        format: "A4"
    }
});
~~~

Der Exportdienst eignet sich gut, wenn ein Diagramm nicht sehr groß ist. Ist es groß, werden die Daten teilweise exportiert. In diesem Fall können Sie [mehrere Datenausgaben manuell durchführen](#making-several-data-exports-manually) oder das Exportmodul verwenden. Das Exportmodul exportiert alle Daten von selbst und liefert eine einzige Datei mit allen Seiten.

**Related sample**: [Multi-page export in one file ](https://snippet.dhtmlx.com/2qzecnke)


Der Nachteil dieser Methode besteht darin, dass der Datenaustausch deutlich mehr Zeit in Anspruch nimmt als der Export aller Daten auf einer Seite. Um weniger Zeit für den Export der Gantt-Daten zu verwenden,
können Sie den Zoom-Level ändern und die Daten in Wochen, Monaten oder Jahren rendern, since dann Gantt weniger Breite einnimmt und Sie den Export weniger oft durchführen müssen.

Check the detailed overview of the multi-page export in one PDF file in the [related blog article](https://dhtmlx.com/blog/maintenance-release-pdf-export-module-gantt-0-6-4-scheduler-0-6-5-suite-8-3-10-kanban-1-5-12/#:~:text=Multipage%20Export%20in%20One%20PDF%20File).

#### Making several data exports manually

Da Gantt-Diagramme meist größer als Standard-Seitengrößen sind, erfasst der Export jedes Mal nur den linken Teil.
Um alle Daten zu exportieren, sind mehrere Exporte nötig, wobei das Diagramm jeweils nach links verschoben wird.

Um das Gantt-Diagramm in der exportierten Datei zu verschieben, fügen Sie diese Stilregel zu **#gantt_here** über den Parameter **header** hinzu:

~~~js
const width = 1000;
const height = 1000;
const total_width = gantt.$task_bg.scrollWidth + gantt.$grid.scrollWidth;

for (let i = 0; i < total_width; i += width) {
    gantt.exportToPDF({
        header:`<style>#gantt_here{left:-${i}px;position: absolute;}</style>`,
        //raw: true,
        additional_settings: {
            width: width,
            height: height,
        }
    });
}
~~~

**Related sample**: [Export to the file of defined sizes ](https://snippet.dhtmlx.com/zbhc506m)

In case you want to export Gantt to the specific format ('A3', for example), note, that the file format is defined in millimeters but the size in HTML is specified in pixels.
Therefore, you need to convert the shift value from millimeters to pixels. 

~~~js
const widthMM = 297;
const width = widthMM / (25.4 inch / 96 PDF PPI);
~~~

**Related sample**: [Export to the file of defined format ](https://snippet.dhtmlx.com/qt54zfuw )


**Hinweis:** Wenn beim mehrseitigen Export nur eine PDF-Datei erzeugt wird, blockiert Ihr Browser möglicherweise Pop-ups, da mehrere Exporte gleichzeitig Pop-ups öffnen.
Aktivieren Sie Pop-ups und versuchen Sie den Export erneut.

![blocked_popup](/img/popup_blocked.png)


#### Displaying timeline and grid headers on every page in the exported file

Um Timeline- und Grid-Kopfzeilen auf jeder Seite der exportierten Datei anzuzeigen, aktivieren Sie die Option **fixed_headers** innerhalb von **additional_settings**.
Dies funktioniert nur, wenn **merge_pages** ebenfalls aktiviert ist:

~~~js
gantt.exportToPDF({
    additional_settings: {
        merge_pages: true, 
        fixed_headers: true,  
        format: "A4"
    }
});
~~~

:::note
Sample: [Mehrseitiger Export mit Kopfzeilen auf jeder Seite](https://snippet.dhtmlx.com/w905ht5t) 
:::

:::note
Sample: [Mehrseitiger Export mit Kopfzeilen auf jeder Seite für Resource-Panel-Ansicht](https://snippet.dhtmlx.com/xkmvduu5) 
:::

Wenn Sie dies ohne Konfiguration möchten, beispielsweise beim Export mehrerer Dateien und manuellem Zusammenführen, verwenden Sie dieses CSS:

~~~css
.grid_cell .gantt_grid_scale,
.timeline_cell .gantt_task_scale {
    position: fixed;
    top:0;
    z-index:99999;
}
~~~


### Related API

- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides

- [Export to PDF and PNG](guides/export.md)
- [How-tos: How to add resource chart or custom styles in the exported PDF file](guides/how-to.md#how-to-add-resource-chart-or-custom-styles-in-the-exported-pdf-file)