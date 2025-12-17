---
sidebar_label: exportToPDF
title: exportToPDF method
description: "exportiert ein Gantt-Diagramm in eine PDF-Datei"
---

# exportToPDF

### Description

@short: Exportiert ein Gantt-Diagramm in eine PDF-Datei

@signature: exportToPDF: (_export_?: any) =\> void

### Parameters
- `export` - (optional) *object* - optionale Einstellungen für den Export (siehe Details unten)

### Example

~~~jsx
gantt.exportToPDF();
 
//oder
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
~~~

### Details

:::note
 Diese Methode ist Teil der **export**-Erweiterung, daher stellen Sie sicher, dass das Plugin [export_api](guides/extensions-list.md#exportservice) aktiviert ist. Weitere Informationen finden Sie im Artikel [Export to PDF and PNG](guides/export.md).

 
:::

:::note
 Für Gantt-Versionen vor 8.0 müssen Sie **https://export.dhtmlx.com/gantt/api.js** in Ihre Seite einbinden, um den Online-Exportservice zu aktivieren, zum Beispiel:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::


Die Methode [exportToPDF](api/method/exporttopdf.md) akzeptiert ein Objekt als Parameter mit verschiedenen optionalen Eigenschaften:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) der Dateiname für die exportierte PDF</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>skin</b></td>
  <td>(<i>'terrace', 'skyblue', 'meadow', 'broadway'</i>) das Theme, das auf das exportierte Gantt-Diagramm angewendet wird</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>locale</b></td>
  <td>(<i>string</i>) legt die Sprache fest, die im exportierten Gantt-Diagramm verwendet wird</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>start</b></td>
  <td>(<i>string</i>) definiert das Startdatum für den angezeigten Datenbereich im exportierten Diagramm. Das Datumsformat folgt den Einstellungen in [date_format](api/config/date_format.md)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>end</b></td>
  <td>(<i>string</i>) definiert das Enddatum für den angezeigten Datenbereich im exportierten Diagramm. Das Datumsformat folgt den Einstellungen in [date_format](api/config/date_format.md)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>data</b></td>
  <td>(<i>object</i>) ermöglicht die Angabe einer benutzerdefinierten Datenquelle für das exportierte Diagramm</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) HTML-Inhalt, der als Kopfzeile in der exportierten PDF eingefügt wird</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) HTML-Inhalt, der als Fußzeile in der exportierten PDF eingefügt wird</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) URL des API-Endpunkts, der die Exportanfrage verarbeitet. Kann für einen lokalen Exportservice verwendet werden. Standard ist <strong>https://export.dhtmlx.com/gantt</strong></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>raw</b></td>
  <td>(<i>boolean</i>) wenn true, wird das Gantt-Markup exakt so exportiert, inklusive benutzerdefinierter Elemente. Standard ist <em>false</em>.[Mehr Details](guides/export.md#exportingcustommarkupandstyles)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>callback</b></td>
  <td>(<i>function</i>) Funktion, die ein JSON-Objekt mit einer url-Eigenschaft erhält, um die generierte PDF-Datei herunterzuladen</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) zusätzliche Einstellungen, die Folgendes umfassen können:
  <ul><li><b>format</b> - (<i>string</i>) Ausgabe-Dateiformat: <i>'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'</i></li><li><b>landscape</b> - (<i>boolean</i>) legt Hoch- oder Querformat fest; funktioniert nur, wenn "format" angegeben ist</li><li><b>width</b> - (<i>string|number|"content"</i>) Seitenbreite, verwendet beim Export mehrerer Seiten</li><li><b>height</b> - (<i>string|number|"content"</i>) Seitenhöhe, verwendet beim Export mehrerer Seiten</li><li><b>merge_pages</b> - (<i>boolean</i>) ermöglicht den Export mehrerer Seiten in eine einzelne Datei; wenn false, sind mehrere Exporte nötig, um alle Daten abzudecken</li><li><b>fixed_headers</b> - (<i>boolean</i>) zeigt Grid- und Timeline-Kopfzeilen auf jeder Seite; Standard ist false und erfordert aktiviertes <b>merge_pages</b></li></ul></td>
  </tr>
  </tbody>
</table>

Zeitliche Beschränkungen
---------------------

:::note
 Der Exportservice erzwingt Zeitlimits. 
:::

Wenn der Export länger als 20 Sekunden dauert, wird der Vorgang abgebrochen und folgender Fehler erscheint:

~~~html
Error: Timeout trigger 20 seconds
~~~

Wenn viele Benutzer gleichzeitig Gantt-Diagramme exportieren, kann der Prozess länger dauern als gewöhnlich. Die Exportzeit wird jedoch für jeden Benutzer separat erfasst.

:::note
 Für den Export großer Diagramme empfiehlt sich die Verwendung des [Standalone-Exportmoduls](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml). Dieses Modul ist kostenlos mit einer [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) oder [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing)-Lizenz oder kann separat [hier](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210) erworben werden. 
:::


Mehrseitiger Export
-------------------

Beachten Sie, dass das Exportmodul nicht in der Lage ist:

- Seitenumbrüche zu kontrollieren, sodass Aufgaben über Seiten verteilt werden können
- Skalen auf jeder Seite anzuzeigen, ohne dass sich Aufgaben überlappen
- Kopf- und Fußzeilen auf jeder Seite anzuzeigen, ohne dass sich Aufgabenreihen überlappen

Für diese Fälle sind benutzerdefinierte Lösungen erforderlich. Einige Beispiele finden Sie unten.

## Automatischer Export der Daten in eine Datei 

Für den Export mehrerer Seiten in eine einzige Datei können Sie den Online-Exportservice (mit [Zeitlimits](#timerestrictions)) oder das standalone [Exportmodul](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) (ohne Limits) verwenden.
Setzen Sie einfach die Option **merge_pages** innerhalb von **additional_settings**:

~~~js
gantt.exportToPDF({
    additional_settings: {
        merge_pages: true, /*!*/
        format: "A4"
    }
});
~~~

Der Online-Exportservice arbeitet gut bei kleineren Diagrammen. Bei großen Diagrammen kann es vorkommen, dass die Daten in Teilen exportiert werden. In diesem Fall können Sie [mehrere manuelle Exporte durchführen](#manual_export) oder das Exportmodul verwenden, das alle Daten verarbeitet und eine einzelne Datei mit allen Seiten erzeugt.

:::note
Sample: [Mehrseitiger Export in einer Datei ](https://snippet.dhtmlx.com/2qzecnke) 
:::

Beachten Sie, dass der mehrseitige Export länger dauert als der Export aller Daten auf einer Seite. Um den Vorgang zu beschleunigen, können Sie die Zoomstufe auf Wochen, Monate oder Jahre einstellen, was die Breite des Gantt-Diagramms und somit die Exportzeit reduziert.

Weitere Details finden Sie im [zugehörigen Blogartikel](https://dhtmlx.com/blog/maintenance-release-pdf-export-module-gantt-0-6-4-scheduler-0-6-5-suite-8-3-10-kanban-1-5-12/#:~:text=Multipage%20Export%20in%20One%20PDF%20File).

### Mehrfache Exporte manuell durchführen {#manual_export}

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
    additional_settings:{
      width: width,
      height: height,
    }
  });
}
~~~

:::note
Sample: [Export in Datei mit spezifizierter Größe](https://snippet.dhtmlx.com/zbhc506m) 
:::

Wenn Sie in ein bestimmtes Format wie 'A3' exportieren, beachten Sie, dass das Dateiformat in Millimetern angegeben ist, während HTML-Größen in Pixeln gemessen werden.
Sie müssen Millimeter in Pixel umrechnen für den Verschiebungswert:

~~~js
const widthMM = 297;
const width = widthMM / (25.4 inch / 96 PDF PPI);
~~~

:::note
Sample: [Export in Datei mit spezifiziertem Format ](https://snippet.dhtmlx.com/qt54zfuw) 
:::

<br>
**Hinweis:** Wenn beim mehrseitigen Export nur eine PDF-Datei erzeugt wird, blockiert Ihr Browser möglicherweise Pop-ups, da mehrere Exporte gleichzeitig Pop-ups öffnen.
Aktivieren Sie Pop-ups und versuchen Sie den Export erneut.

![blocked_popup](/img/popup_blocked.png)


## Anzeige von Timeline- und Grid-Kopfzeilen auf jeder Seite

Um Timeline- und Grid-Kopfzeilen auf jeder Seite der exportierten Datei anzuzeigen, aktivieren Sie die Option **fixed_headers** innerhalb von **additional_settings**.
Dies funktioniert nur, wenn **merge_pages** ebenfalls aktiviert ist:

~~~js
gantt.exportToPDF({
    additional_settings: {
        merge_pages: true,  /*!*/
        fixed_headers: true,  /*!*/
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
- [How-tos](guides/how-to.md#howtoaddresourcechartorcustomstylesintheexportedpdffile)

