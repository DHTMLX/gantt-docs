---
title: "Export/Import für Excel, Export nach iCal"
sidebar_label: "Export/Import für Excel, Export nach iCal"
---

# Export/Import für Excel, Export nach iCal

Die dhtmlxGantt-Bibliothek ermöglicht das Exportieren von Daten aus dem Gantt-Diagramm in die Formate Excel und iCal. Sie können auch Daten aus einer Excel-Datei in den Gantt importieren.

:::note
Der Dienst ist kostenlos, aber die erzeugte Excel-/iCal-Datei enthält unter der GPL-Lizenz das Wasserzeichen der Bibliothek. Falls Sie eine Lizenz erwerben, wird das Exportergebnis während des gültigen Supportzeitraums (12 Monate für alle PRO-Lizenzen) wasserzeichenfrei verfügbar.
:::

Es gibt mehrere Export-Dienste. Sie können sie lokal auf Ihrem Computer installieren und das Gantt-Diagramm lokal nach Excel oder iCal exportieren. Beachten Sie, dass Export-Dienste nicht im Gantt-Paket enthalten sind. Lesen Sie den [entsprechenden Artikel](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml), um die Nutzungsbedingungen jedes Dienstes zu erfahren.

## Einschränkungen des Online-Exportdienstes

:::note
Der Exportdienst unterliegt Zeit- und Größenbeschränkungen.
:::

### Zeitlimits

Wenn der Prozess länger als 20 Sekunden dauert, wird der Export abgebrochen und folgender Fehler tritt auf:

~~~html
Error: Timeout trigger 20 seconds
~~~

Wenn mehrere Personen gleichzeitig Gantt exportieren, kann der Prozess länger dauern als üblich. Das ist jedoch unproblematisch, da die Zeit, die für die Exportanfrage eines bestimmten Benutzers aufgewendet wird, separat gezählt wird.

### Beschränkungen der Anfragesgröße

Es gibt einen gemeinsamen API-Endpunkt `https://export.dhtmlx.com/gantt`, der für alle Exportmethoden (*exportToPDF*, *exportToPNG*, *exportToMSProject*, etc.) dient. **Maximale Anfragesgröße ist 10 MB**.

Es gibt auch einen separaten API-Endpunkt `https://export.dhtmlx.com/gantt/project`, der speziell für die [MSProject](guides/export-msproject.md) und [Primavera P6](guides/export-primavera.md) Export-/Import-Dienste (*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6* nur) vorgesehen ist. **Maximale Anfragesgröße: 40 MB**.

## Verwendung von Export-Modulen

:::note
Wenn Sie große Diagramme exportieren müssen, können Sie ein [Standalone-Exportmodul](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) verwenden. 
Das Exportmodul wird kostenlos bereitgestellt, wenn Sie Gantt unter [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) oder [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) Lizenz erhalten haben, oder Sie können das Modul separat [kaufen](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210).
:::

[Read more on the usage of the export module for PDF](guides/pdf-export-module.md). Dieses Exportmodul kann Daten nach PDF-, PNG-, Excel- und iCal-Dateien exportieren.

## Export nach Excel

Um Daten aus dem Gantt-Diagramm in ein Excel-Dokument zu exportieren, führen Sie Folgendes aus:

- Um die Export-/Import-Funktionalität zu verwenden, aktivieren Sie das <b>export_api</b>-Plugin über die [plugins](api/method/plugins.md) Methode:
~~~js
gantt.plugins({
    export_api: true
});
~~~

Dadurch können Sie entweder den Online-Exportdienst verwenden oder ein lokales Exportmodul verwenden.

:::note
Wenn Sie eine Gantt-Version älter als 8.0 verwenden, müssen Sie `https://export.dhtmlx.com/gantt/api.js` in Ihre Seite einbinden, um die Exportfunktionalität zu aktivieren, z.B.:
~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- Rufen Sie die [exportToExcel](api/method/exporttoexcel.md) Methode auf, um Daten aus dem Gantt-Diagramm zu exportieren: 

~~~html
<input value="Export to Excel" type="button" onclick='gantt.exportToExcel()'>

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~


**Related sample**: [Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)


**Related sample**: [Export data: store online](https://docs.dhtmlx.com/gantt/samples/08_api/09_export_store.html)
  
  

#### Parameter der exportToExcel-Methode

Die **exportToExcel()**-Methode nimmt als Parameter ein Objekt mit mehreren Eigenschaften (alle Eigenschaften optional):

- **name** - (*string*) legt den Namen der Ausgabedatei mit der Erweiterung '.xlsx' fest
- **columns** - (*array*) ermöglicht die Konfiguration der Spalten des Output-Excel-Blatts. Die Eigenschaften der Spaltenobjekte sind:
    - **'id'** - (*string,number*) eine Eigenschaft des Events, die der Spalte zugeordnet wird
    - **'header'** - (*string*) der Spaltenkopf
    - **'width'** - (*number*) die Spaltenbreite in Pixeln
    - **'type'** - (*string*) der Spaltentyp
- **server** - (*string*) setzt den API-Endpunkt für die Anfrage. Kann mit der lokalen Installation des Exportdienstes verwendet werden. Der Standardwert ist `https://export.dhtmlx.com/gantt`
- **callback** - (*function*) Falls Sie eine URL zum Herunterladen einer generierten XLSX-Datei erhalten möchten, kann die callback-Eigenschaft verwendet werden. Sie erhält ein JSON-Objekt mit der Eigenschaft url
- **visual** - (*boolean*) fügt dem exportierten Excel-Dokument die Timeline-Grafik hinzu. Standardwert: false
- **cellColors** - (*boolean*) wenn auf *true* gesetzt, erhalten die Zellen des exportierten Dokuments die Farben, die durch die timeline_cell_class-Vorlage definiert sind; die Eigenschaften *color* und *background-color* werden exportiert
- **data** - (*object*) legt eine benutzerdefinierte Datenquelle fest, die im output Gantt-Diagramm dargestellt wird
- **date_format** - (*string*) legt fest, in welchem Format das Datum im exportierten Excel-Dokument angezeigt wird. Eine vollständige Liste der verfügbaren Formatcodes finden Sie [hier](api/method/exporttoexcel.md).        

~~~jsx title="Aufruf der Export-Methode mit optionalen Eigenschaften"
gantt.exportToExcel({
    name: "document.xlsx", 
    columns:[
        { id: "text",  header: "Title", width: 150 },
        { id: "start_date",  header: "Start date", width: 250, type: "date" }
    ],
    server: "https://myapp.com/myexport/gantt",
    callback: (res) => {
        alert(res.url);
    },
    visual: true,
    cellColors: true,
    data: { },
    date_format: "dddd d, mmmm yyyy"
});
~~~

#### Standard-Datum-Parameter

Das Export-Modul geht davon aus, dass die Spalten start_date und end_date den Typ Date und die Spalte duration den Typ number haben. 

Im Falle der Anwendung von [benutzerdefinierten Vorlagen](guides/specifying-columns.md#datamappingandtemplates) ist es notwendig, entweder einen Wert des erwarteten Typs zurückzugeben oder einen anderen Wert in der **name**-Eigenschaft der Spaltenkonfiguration festzulegen. Zum Beispiel:

~~~jsx {7,10-12}
gantt.config.columns = [
    ...
    { name: "start_date", align: "center", width: 100, resize: true, 
        editor: start_dateEditor },
    { name: "end_date", align: "center", width: 100, resize: true, 
        editor: end_dateEditor },
    { name: "duration_formatted", 
        align: "center", width: 40, resize: true, 
        editor: durationEditor, 
        template: (task) => { 
            return formatter.format(task.duration_formatted); 
        }
    },
    ...
];
~~~

Andernfalls werden die Gantt-Daten nicht exportiert. [Check the related example](https://snippet.dhtmlx.com/q1lhyvt3).

### Festlegung einer benutzerdefinierten Datenquelle zum Export

Um das Gantt-Diagramm mit einem benutzerdefinierten Datensatz zu exportieren (d. h. nicht mit den Daten, die im anfänglichen Gantt-Diagramm dargestellt werden), verwenden Sie die **data**-Eigenschaft im Parameter der [exportToExcel](api/method/exporttoexcel.md)-Methode:

~~~js
gantt.exportToExcel({   
    name: "document.xlsx", 
    data: [
        { id: 1, text: "Project #1", start_date: "01-04-2026", duration: 18},
        { id: 2, text: "Task #1", start_date: "02-04-2026", duration: 8, parent: 1},
        { id: 3, text: "Task #2", start_date: "11-04-2026", duration: 8, parent: 1}
    ]      
});
~~~

:::note
Beachten Sie, dass Sie keinen URL-Wert für den Parameter **data** angeben können, sondern nur ein Datensatz-Objekt.
:::

### Farben der Aufgaben zum Export hinzufügen

Sie können die Farben der Aufgaben in die exportierte Excel-Datei des Gantt-Diagramms aufnehmen, indem Sie den Wert der Eigenschaft **visual** auf *"base-colors"* setzen:

~~~js
gantt.exportToExcel({
    visual: "base-colors", 
    cellColors: true
})
~~~

**Related sample**: [Export colors of tasks](https://snippet.dhtmlx.com/t2znjrfj)

## Import aus Excel {#importfromexcel}

Da es keine automatische Abbildung beliebiger Spalten des Excel-Dokuments auf das Gantt-Datenmodell gibt, wandelt der Exportdienst ein Dokument in ein Array von Zeilen um, das als JSON zurückgegeben wird. Die Umwandlung des resultierenden Dokuments in die Gantt-Daten liegt in der Verantwortung der Endentwickler.

Um eine Excel-Datei zu konvertieren, müssen Sie die folgende Anfrage an den Exportdienst senden:

- Request URL - `https://export.dhtmlx.com/gantt`
- Request Method - **POST**
- Content-Type - **multipart/form-data**

Die Request-Parameter lauten:

- **file** - eine Excel-Datei
- **type** - "excel-parse"
- **data** - (*optional*) JSON-String mit Einstellungen

Zum Beispiel:

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="excel-parse">
    <button type="submit">Get</button>
</form>
~~~

Alternativ können Sie auch die [Client-seitige API](api/method/importfromexcel.md) verwenden:

~~~js
gantt.importFromExcel({
    server: "https://export.dhtmlx.com/gantt",
    data: file,
    callback: (project) => {
        console.log(project)
    }
});
~~~


**Related sample**: [Import Excel file](https://docs.dhtmlx.com/gantt/samples/08_api/21_load_from_excel.html)


Wobei *file* eine Instanz von [File](https://developer.mozilla.org/en-US/docs/Web/API/File) ist, die eine Excel-Datei (xlsx) enthalten sollte.

:::note
**gantt.importFromExcel** erfordert HTML5 File API-Unterstützung.
:::


### Response

Die Antwort enthält ein JSON mit einem Array von Objekten:

~~~js
[
   { "Name": "Task Name", "Start": "2026-04-11 10:00", "Duration": 8 },
   ...
]
~~~

wobei:

- Werte der ersten Zeile als Eigenschaftsnamen der importierten Objekte verwendet werden
- Jede Zeile als eigenständiges Objekt serialisiert wird
- Datumswerte im Format "%Y-%m-%d %H:%i" serialisiert werden


### Import-Einstellungen

- Der Importdienst erwartet, dass die erste Zeile des importierten Blatts eine Kopfzeile mit Spaltennamen ist.
- Standardmäßig gibt der Dienst das erste Blatt des Dokuments zurück. Um ein anderes Blatt zurückzugeben, verwenden Sie den **sheet**-Parameter (nullbasiert)

~~~js
gantt.importFromExcel({
    server: "https://export.dhtmlx.com/gantt",
    data: file,
    sheet: 2, // dritte Blatte
    callback: (rows) => {}
});
~~~


## Export nach iCal

Um Daten aus dem Gantt-Diagramm in eine iCal-Zeichenfolge zu exportieren, führen Sie Folgendes aus:

- Um den Online-Exportdienst zu verwenden, aktivieren Sie das <b>export_api</b>-Plugin über die [plugins](api/method/plugins.md) Methode:

~~~js
gantt.plugins({
    export_api: true
});
~~~

- Rufen Sie die [exportToICal](api/method/exporttoical.md) Methode auf, um Daten aus dem Gantt-Diagramm zu exportieren: 

~~~html
<input value="Export to iCal" type="button" onclick='gantt.exportToICal()'>

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~


**Related sample**: [Export data: MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)


**Related sample**: [Export data: store online](https://docs.dhtmlx.com/gantt/samples/08_api/09_export_store.html)


#### Parameter der Export-Methode

Die [exportToICal()](api/method/exporttoical.md) Methode nimmt als Parameter ein Objekt mit den folgenden Eigenschaften (optional):

- **server** - (*string*) setzt den API-Endpunkt für die Anfrage. Kann mit der lokalen Installation des Exportdienstes verwendet werden. Der Standardwert ist `https://export.dhtmlx.com/gantt`;
- **name** - (*string*) ermöglicht die Angabe eines benutzerdefinierten Namens und einer Erweiterung für die Datei, aber die Datei wird weiterhin im iCal-Format exportiert.
  
~~~jsx title="Aufruf der Export-Methode mit optionalen Eigenschaften"
gantt.exportToICal({
    server:"https://myapp.com/myexport/gantt"
});
~~~