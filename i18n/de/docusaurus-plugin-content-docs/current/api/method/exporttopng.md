---
sidebar_label: exportToPNG
title: exportToPNG method
description: "exportiert ein Gantt-Diagramm als PNG-Bild"
---

# exportToPNG

### Description

@short: Exportiert ein Gantt-Diagramm als PNG-Bild

@signature: exportToPNG: (_export_?: any) =\> void

### Parameters
- `export` - (optional) *object* - optionale Objekt mit Exportoptionen (siehe Details unten)


### Example

~~~jsx
gantt.exportToPNG();

//oder
gantt.exportToPNG({
  name: "mygantt.png"
});

//oder
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
~~~

### Details

:::note
 Diese Methode ist Teil der **export** Erweiterung, stellen Sie also sicher, dass das [export_api](guides/extensions-list.md#exportservice) Plugin aktiviert ist. Weitere Informationen finden Sie im Artikel [Export to PDF and PNG](guides/export.md).

 
:::

:::note
 Für Gantt-Versionen älter als 8.0 müssen Sie das Skript **https://export.dhtmlx.com/gantt/api.js** in Ihre Seite einbinden, um den Online-Exportdienst zu nutzen, zum Beispiel:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

Die Methode [exportToPNG](api/method/exporttopng.md) akzeptiert ein Objekt als Parameter mit mehreren optionalen Eigenschaften:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) Dateiname für das exportierte PNG</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>skin</b></td>
  <td>(<i>'terrace', 'skyblue', 'meadow', 'broadway'</i>) visuelles Theme für das exportierte Gantt-Diagramm</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>locale</b></td>
  <td>(<i>string</i>) Spracheinstellung für das exportierte Gantt-Diagramm</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>start</b></td>
  <td>(<i>string</i>) Startdatum des angezeigten Datenbereichs im exportierten Diagramm. Das Datumsformat folgt den Einstellungen in [date_format](api/config/date_format.md)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>end</b></td>
  <td>(<i>string</i>) Enddatum des angezeigten Datenbereichs im exportierten Diagramm. Das Datumsformat folgt den Einstellungen in [date_format](api/config/date_format.md)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>data</b></td>
  <td>(<i>object</i>) liefert eine benutzerdefinierte Datenquelle, die im exportierten Diagramm verwendet wird</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) HTML-Inhalt, der als Header im exportierten PNG hinzugefügt wird</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) HTML-Inhalt, der als Footer im exportierten PNG hinzugefügt wird</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) URL des API-Endpunkts für Exportanfragen. Nützlich, wenn Sie einen lokalen Exportservice betreiben. Standard ist <strong>https://export.dhtmlx.com/gantt</strong></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>raw</b></td>
  <td>(<i>boolean</i>) wenn true, wird das Gantt-Markup exakt wie vorhanden exportiert, inklusive benutzerdefinierter Elemente. Standard ist <em>false</em>. [Mehr Details](guides/export.md#exportingcustommarkupandstyles)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>callback</b></td>
  <td>(<i>function</i>) Callback-Funktion, die ein JSON-Objekt mit einer URL zum Herunterladen des generierten PNG erhält</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) zusätzliche Einstellungen, darunter:
  <ul><li><b>width</b> - (<i>number|string</i>) Breite der Ausgabeseite</li><li><b>height</b> - (<i>number|string</i>) Höhe der Ausgabeseite</li>Beachten Sie, dass <b>width</b> und <b>height</b> ignoriert werden, wenn <b>slice_archive</b> gesetzt ist.<li><b>slice_archive</b> - (<i>boolean|object</i>) ermöglicht das Exportieren großer Diagramme in Teilen und das Verpacken in ein Archiv. Wenn ein Objekt, akzeptiert es Optionen für <b>width</b> und <b>height</b>. Standardgröße der Teile ist 1000×1000, wenn auf true gesetzt.</li><li><b>slice_check</b> - (<i>boolean</i>) fügt eine HTML-Seite im Archiv hinzu, um die korrekte Exportierung aller Teile zu überprüfen.</li></ul></td>
  </tr>
  </tbody>
</table>

## Export großer Gantt-Diagramme in Teilen

Die maximale Exportgröße beträgt 10000×10000 Pixel.

Sie können die Breite und Höhe mit den Eigenschaften **width** und **height** in **additional_settings** anpassen, aber wenn deren Produkt 100000000 (10000×10000) überschreitet, wird das exportierte PNG beschnitten.

Um größere Diagramme zu handhaben, können Sie das Diagramm in Abschnitten exportieren und diese in einem Archiv bündeln, indem Sie die Option **slice_archive** unter **additional_settings** verwenden:

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

**Beispiel:** [Export in PNG-Bilder](https://snippet.dhtmlx.com/2mprehlx)

Sie können die Teilgrößen angeben, indem Sie **slice_archive** als Objekt mit *width* und *height* setzen:

~~~js
slice_archive: {width: 2000, height: 2000}
~~~

Oder einfach auf *true* setzen, um die Standardgröße von 1000×1000 zu verwenden:

~~~js
slice_archive: true
~~~

## Zeitbeschränkungen

:::note
 Der Exportdienst hat eine Zeitbegrenzung für die Verarbeitung. 
:::

Wenn der Export länger als 20 Sekunden dauert, wird er abgebrochen und Sie sehen diese Fehlermeldung:

~~~html
Error: Timeout trigger 20 seconds
~~~

Gleichzeitige Exporte von mehreren Nutzern können die Verarbeitungszeit erhöhen, aber die Exportzeit jedes Nutzers wird separat verfolgt.

:::note
 Für den Export großer Diagramme empfehlen wir die Nutzung des [Standalone Export-Moduls](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml). Dieses Modul ist kostenlos mit [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) oder [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) Lizenzen oder kann separat [hier](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210) erworben werden. 
:::

### Related API
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- [Export to PDF and PNG](guides/export.md)

