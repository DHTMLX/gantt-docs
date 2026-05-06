---
sidebar_label: exportToPNG
title: exportToPNG method
description: "exportiert ein Gantt-Diagramm im PNG-Format"
---

# exportToPNG

### Beschreibung

@short: Exportiert ein Gantt-Diagramm im PNG-Format

@signature: exportToPNG: (_export_?: any) => void

### Parameter

- `export` - Objekt - optional, ein Objekt mit Export-Einstellungen (siehe Details)

### Beispiel

~~~jsx
gantt.exportToPNG();

//oder
gantt.exportToPNG({
  name: "mygantt.png"
});

//oder
gantt.exportToPNG({
    name: "mygantt.png",
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
Diese Methode ist in der **Export-Erweiterung** definiert, daher müssen Sie das [export_api](guides/extensions-list.md#export-service) Plugin aktivieren. Lesen Sie die Details im [](guides/export.md) Artikel.
:::

:::note
Wenn Sie die Gantt-Version älter als 8.0 verwenden, müssen Sie die Datei `https://export.dhtmlx.com/gantt/api.js` auf Ihrer Seite einbinden, um den Online-Export-Service zu aktivieren, z.B.:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~

:::

Die [](api/method/exporttopng.md) Methode nimmt als Parameter ein Objekt mit einer Reihe von Eigenschaften (alle Eigenschaften sind optional):

<table class="webixdoc_links">
	<tbody>
  	<tr>
			<td class="webixdoc_links0"><b>name</b></td>
			<td>(<i>string</i>) der Name der Ausgabedatei</td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>skin</b></td>
			<td>(<i>'terrace', 'skyblue', 'meadow', 'broadway'</i>) das Skin des Ausgabe-Gantt-Diagramms</td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>locale</b></td>
			<td>(<i>string</i>) legt die Sprache fest, die im Ausgabe-Gantt-Diagramm verwendet wird</td>
		</tr> 
  <tr>
			<td class="webixdoc_links0"><b>start</b></td>
			<td>(<i>string</i>) legt das Startdatum des Datenbereichs fest, der im Ausgabe-Gantt-Diagramm dargestellt wird. Das Datumsformat wird durch die [](api/config/date_format.md) config festgelegt</td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>end</b></td>
			<td>(<i>string</i>) legt das Enddatum des Datenbereichs fest, der im Ausgabe-Gantt-Diagramm dargestellt wird. Das Datumsformat wird durch die [](api/config/date_format.md) config festgelegt</td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>data</b></td>
			<td>(<i>object</i>) legt eine benutzerdefinierte Datenquelle fest, die im Ausgabe-Gantt-Diagramm präsentiert wird </td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>header</b></td>
			<td>(<i>string</i>) legt den Header fest, der dem Ausgabe-PDF-Bild hinzugefügt wird. Hinweis: Hier können Sie beliebiges HTML verwenden</td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>footer</b></td>
			<td>(<i>string</i>) legt den Footer fest, der dem Ausgabe-PDF-Bild hinzugefügt wird. Hinweis: Hier können Sie beliebiges HTML verwenden</td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>server</b></td>
			<td>(<i>string</i>) legt den API-Endpunkt für die Anfrage fest. Kann mit der lokalen Installation des Export-Services verwendet werden. Der Standardwert ist <strong>https://export.dhtmlx.com/gantt</strong></td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>raw</b></td>
			<td>(<i>boolean</i>) definiert, dass sämtliches Gantt-Markup unverändert exportiert wird, einschließlich aller benutzerdefinierten Elemente. <em>false</em> standardmäßig. [Lesen Sie die Details](guides/export.md#exportingcustommarkupandstyles) </td>
		</tr>
		<tr>
			<td class="webixdoc_links0"><b>callback</b></td>
			<td>(<i>function</i>) Wenn Sie eine URL zum Herunterladen einer generierten PNG-Datei erhalten möchten, kann die Callback-Eigenschaft verwendet werden. Sie erhält ein JSON-Objekt mit der Eigenschaft url</td>
		</tr>
		<tr>
			<td class="webixdoc_links0"><b>additional_settings</b></td>
			<td>(<i>object</i>) Ein Objekt mit zusätzlichen Einstellungen. Das Objekt kann folgende Attribute enthalten:
			<ul><li><b>width</b> - (<i>number|string</i>) die Breite der Ausgabeseite</li><li><b>height</b> - (<i>number|string</i>) die Höhe der Ausgabeseite</li>Die <b>width</b> und <b>height</b> Parameter werden ignoriert, wenn <b>slice_archive</b> angegeben ist.<li><b>slice_archive</b> - (<i>boolean|object</i>) ermöglicht das Speichern großer Diagramme in Teilen und deren Bezug im Archiv. Als Objekt nimmt das Attribut die Optionen <b>width</b> und <b>height</b> entgegen. Falls die Stückgröße nicht definiert ist (d.h. <i>slice_archive: true</i>), gelten die Standardgrößen 1000×1000. </li><li><b>slice_check</b> - (<i>boolean</i>) fügt dem Archiv eine HTML-Seite hinzu. Die Seite ermöglicht es zu prüfen, dass alle Teile korrekt exportiert wurden.</li></ul></td>
		</tr>
  </tbody>
</table>

## Exportieren großer Gantt-Diagramme in Teilen

Die maximalen Größen der exportierten Datei betragen 10000×10000.

Sie können eine der Größen erhöhen und die andere entsprechend verringern, indem Sie die Attribute width/height der Eigenschaft additional_settings verwenden. Falls das Produkt aus width und height größer als 100000000 (10000×10000) ist, wird das exportierte PNG-Bild zugeschnitten.

Es besteht die Möglichkeit, das Gantt-Diagramm in Teilen zu exportieren und diese im Archiv abzurufen, indem Sie das Attribut **slice_archive** der Eigenschaft **additional_settings** verwenden:

~~~js
gantt.exportToPNG({
    server: "https://export.dhtmlx.com/beta/gantt",
    additional_settings: {
        //width: 2000,
        //height: 2000,
        slice_archive: { width: 2000, height: 2000 },
        slice_check: true,
    }
});
~~~

**Verwandtes Beispiel:** [Export in PNG-Bilder](https://snippet.dhtmlx.com/2mprehlx)

Sie können die Größen der output PNG-Bilder entweder definieren, indem Sie das Attribut als Objekt mit den Optionen **width** und **height** festlegen:

~~~js
slice_archive: { width: 2000, height: 2000 }
~~~

Oder Sie setzen das Attribut auf true. In diesem Fall erhalten die exportierten Stücke des Gantt Standardgrößen: 1000×1000.

~~~js
slice_archive: true
~~~

## Zeitbeschränkungen

:::note
Der Export-Service unterliegt Zeitbeschränkungen.
:::

Wenn der Prozess länger als 20 Sekunden dauert, wird der Export abgebrochen und der folgende Fehler tritt auf:

~~~html
Error: Timeout trigger 20 seconds
~~~

Wenn mehrere Benutzer Gantt gleichzeitig exportieren, kann der Vorgang länger dauern als üblich. Das ist jedoch unproblematisch, da die Zeit, die für eine Export-Anfrage eines bestimmten Benutzers aufgewendet wird, separat gezählt wird.

:::note
Wenn Sie große Diagramme exportieren müssen, können Sie ein eigenständiges Export-Modul verwenden (Standalone Export-Modul). Das Export-Modul wird kostenfrei bereitgestellt, wenn Sie Gantt unter einer der Lizenzen [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) oder [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) erhalten haben, oder Sie können das Modul separat erwerben ([buy the module separately](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210)).
:::

### Verwandte API

- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Verwandte Guides

- [Export nach PDF und PNG](guides/export.md)