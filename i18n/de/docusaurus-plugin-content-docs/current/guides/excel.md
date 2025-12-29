---
title: "Export/Import für Excel, Export nach iCal"
sidebar_label: "Export/Import für Excel, Export nach iCal"
---

# Export/Import für Excel, Export nach iCal

Die dhtmlxGantt-Bibliothek unterstützt das Exportieren von Daten aus dem Gantt-Diagramm in Excel- und iCal-Formate. Außerdem können Daten aus einer Excel-Datei in das Gantt-Diagramm importiert werden.

:::note
Der Export-Service ist kostenlos nutzbar, allerdings enthalten die resultierenden Excel/iCal-Dateien ein Wasserzeichen der Bibliothek unter der GPL-Lizenz.
Wenn Sie eine Lizenz erwerben, sind exportierte Dateien während des aktiven Support-Zeitraums (12 Monate für alle PRO-Lizenzen) wasserzeichenfrei.
:::

Es gibt verschiedene Export-Services, die Sie auf Ihrem Computer installieren können, um Gantt-Diagramme lokal nach Excel oder iCal zu exportieren.
Beachten Sie, dass diese Export-Services nicht im Gantt-Paket enthalten sind.
Weitere Details finden Sie im [zugehörigen Artikel](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml), um die Nutzungsbedingungen zu verstehen.

## Beschränkungen des Online-Export-Services

:::note
Der Export-Service hat Einschränkungen hinsichtlich der Verarbeitungszeit und der Anfragegröße.
:::

### Zeitlimits

Wenn der Exportvorgang länger als 20 Sekunden dauert, wird er abgebrochen und Sie sehen diesen Fehler:

~~~html
Error: Timeout trigger 20 seconds
~~~

Wenn mehrere Benutzer gleichzeitig Gantt-Diagramme exportieren, kann der Vorgang länger als gewöhnlich dauern. Die für jede Benutzeranfrage aufgewendete Zeit wird jedoch separat gezählt.

### Begrenzung der Anfragegröße

Der Haupt-API-Endpunkt **https://export.dhtmlx.com/gantt** verarbeitet alle Exportmethoden (*exportToPDF*, *exportToPNG*, *exportToMSProject*, usw.). Die maximale Anfragegröße beträgt hier **10 MB**.

Es gibt außerdem einen dedizierten API-Endpunkt **https://export.dhtmlx.com/gantt/project** für die [MSProject](guides/export-msproject.md)- und
[Primavera P6](guides/export-primavera.md)-
Export-/Import-Services (*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6*). Dieser Endpunkt unterstützt eine maximale Anfragegröße von **40 MB**.

## Verwendung von Export-Modulen

:::note
Für den Export großer Diagramme empfiehlt sich ein [eigenständiges Export-Modul](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml).
Dieses Modul ist kostenlos, wenn Sie eine [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing)-, [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing)- oder [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing)-Lizenz besitzen. Andernfalls kann es [hier](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210) separat erworben werden.
:::

Weitere Informationen zur Verwendung des Export-Moduls für den PDF-Export finden Sie in diesem Leitfaden: [PDF-Export-Modul](guides/pdf-export-module.md). Dieses Modul unterstützt den Export in die Formate PDF, PNG, Excel und iCal.

## Export nach Excel

Um Daten aus dem Gantt-Diagramm in eine Excel-Datei zu exportieren, gehen Sie wie folgt vor:

- Aktivieren Sie das <b>export_api</b>-Plugin mit der Methode [plugins](api/method/plugins.md):
~~~js
gantt.plugins({
      export_api: true
});
~~~

:::note
Für Gantt-Versionen älter als 8.0 binden Sie das **https://export.dhtmlx.com/gantt/api.js**-Skript auf Ihrer Seite ein, um den Online-Export-Service zu aktivieren, zum Beispiel:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- Verwenden Sie die Methode [exportToExcel](api/method/exporttoexcel.md), um die Gantt-Diagramm-Daten zu exportieren:

~~~html
<input value="Export to Excel" type="button" onclick='gantt.exportToExcel()'>/*!*/

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~


[Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)


[Export data: store online](https://docs.dhtmlx.com/gantt/samples/08_api/09_export_store.html)
  
  

#### Parameter der Export-Methode

Die **exportToExcel()**-Methode akzeptiert ein optionales Objekt mit mehreren Eigenschaften:

- **name** - (*string*) legt den Dateinamen der exportierten Datei fest, einschließlich der Endung '.xlsx'.
- **columns** - (*array*) konfiguriert die Spalten im Excel-Blatt. Jedes Spaltenobjekt kann enthalten:
    - **'id'** - (*string,number*) die Ereigniseigenschaft, die der Spalte zugeordnet ist
    - **'header'** - (*string*) der Spaltenüberschrift-Text
    - **'width'** - (*number*) Spaltenbreite in Pixel
    - **'type'** - (*string*) der Spaltendatentyp
- **server** - (*string*) gibt den API-Endpunkt für die Exportanfrage an. Nützlich, wenn Sie einen lokalen Export-Service installiert haben. Standardmäßig **https://export.dhtmlx.com/gantt**
- **callback** - (*function*) eine Callback-Funktion, die ein JSON-Objekt mit einer *url*-Eigenschaft zum Herunterladen der generierten XLSX-Datei erhält
- **visual** - (*boolean*) fügt das Zeitstrahl-Diagramm in die exportierte Excel-Datei ein. Standardwert: *false*
- **cellColors** - (*boolean*) wenn *true*, erhalten Zellen in der exportierten Datei die Farben, die durch das [timeline_cell_class](api/template/timeline_cell_class.md)-Template definiert sind. Dabei werden *color*- und *background-color*-Stile exportiert.
- **data** - (*object*) ermöglicht das Exportieren einer benutzerdefinierten Datenquelle anstelle der aktuellen Gantt-Diagramm-Daten
- **date_format** - (*string*) definiert das Datumsformat, das in der exportierten Excel-Datei verwendet wird. Die vollständige Liste unterstützter Formate finden Sie [hier](api/method/exporttoexcel.md).

**Beispielaufruf der Export-Methode mit optionalen Eigenschaften**
~~~js
gantt.exportToExcel({
    name:"document.xlsx", 
    columns:[
        { id:"text",  header:"Title", width:150 },
        { id:"start_date",  header:"Start date", width:250, type:"date" }
    ],
    server:"https://myapp.com/myexport/gantt",
    callback: function(res){
        alert(res.url);
    },
    visual:true,
    cellColors:true,
    data:{},
    date_format: "dddd d, mmmm yyyy"
});
~~~

#### Standard-Datumsparameter

Das Export-Modul erwartet, dass die Spalten **start_date** und **end_date** vom Typ *Date* sind, und die Spalte **duration** eine *number* ist.

Wenn Sie [benutzerdefinierte Templates](guides/specifying-columns.md#datamappingandtemplates) verwenden, stellen Sie sicher, dass der zurückgegebene Wert dem erwarteten Typ entspricht, oder geben Sie einen anderen Eigenschaftsnamen im Feld **name** der Spaltenkonfiguration an. Zum Beispiel:

~~~js

gantt.config.columns = [
    ...
    {name: "start_date", align: "center", width: 100, resize: true, 
        editor: start_dateEditor},
    {name: "end_date", align: "center", width: 100, resize: true, 
        editor: end_dateEditor},
    {name: "duration_formatted", /*!*/
        align: "center", width: 40, resize: true, 
        editor: durationEditor, 
        template: function(task){ /*!*/
            return formatter.format(task.duration_formatted); /*!*/
        }
    },
    ...
];
~~~

Andernfalls werden die Gantt-Daten nicht korrekt exportiert. [Hier finden Sie ein entsprechendes Beispiel](https://snippet.dhtmlx.com/q1lhyvt3).

### Eine benutzerdefinierte Datenquelle für den Export festlegen

Um ein Gantt-Diagramm auf Basis eines benutzerdefinierten Datensatzes (anders als die aktuellen Diagrammdaten) zu exportieren, verwenden Sie die **data**-Eigenschaft im Parameterobjekt der Methode
[exportToExcel](api/method/exporttoexcel.md):

~~~js
gantt.exportToExcel({   
    name:"document.xlsx", 
    data:[
        {id:1, text:"Project #1", start_date:"01-04-2020", duration:18},
        {id:2, text:"Task #1", start_date:"02-04-2020",duration:8, parent:1},
        {id:3, text:"Task #2", start_date:"11-04-2020",duration:8, parent:1}
    ]      
});
~~~

:::note
Beachten Sie, dass der **data**-Parameter ein Datenobjekt und keine URL-Zeichenkette sein muss.
:::

### Farben der Aufgaben zum Export hinzufügen

Um die Farben der Aufgaben in die exportierte Excel-Datei aufzunehmen, setzen Sie die **visual**-Eigenschaft auf *"base-colors"*:

~~~js
gantt.exportToExcel({
    visual: "base-colors", /*!*/
    cellColors: true
})
~~~

**Related example:** [Export colors of tasks](https://snippet.dhtmlx.com/t2znjrfj)

## Import aus Excel

Da die automatische Zuordnung beliebiger Excel-Spalten zum Gantt-Datenmodell nicht unterstützt wird, wandelt der Export-Service das Excel-Dokument in ein Array von Zeilen um, das als JSON zurückgegeben wird.
Die Umwandlung dieser Daten ins Gantt-Format obliegt den Entwicklern.

Um eine Excel-Datei zu konvertieren, senden Sie eine Anfrage an den Export-Service mit folgenden Angaben:

- Request-URL - **https://export.dhtmlx.com/gantt**
- Request-Methode - **POST**
- Content-Type - **multipart/form-data**

Request-Parameter:

- **file** - die hochzuladende Excel-Datei
- **type** - auf "excel-parse" setzen
- **data** - (*optional*) JSON-String mit zusätzlichen Einstellungen

Beispielformular:

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="excel-parse">
    <button type="submit">Get</button>
</form>
~~~

Alternativ können Sie die [Client-seitige API](api/method/importfromexcel.md) verwenden:

~~~js
gantt.importFromExcel({
    server:"https://export.dhtmlx.com/gantt",
    data: file,
    callback: function(project){
        console.log(project)
    }
});
~~~


[Import Excel file](https://docs.dhtmlx.com/gantt/samples/08_api/21_load_from_excel.html)


Hierbei ist *file* ein [File](https://developer.mozilla.org/en-US/docs/Web/API/File)-Objekt, das eine Excel-(xlsx)-Datei repräsentiert.

:::note
**gantt.importFromExcel** benötigt Unterstützung für die HTML5 File API.
:::


### Antwort

Die Antwort ist ein JSON-Array von Objekten:

~~~js
[
   { "Name": "Task Name", "Start": "2018-08-11 10:00", "Duration": 8 },
   ...
]
~~~

Details:

- Die Werte der ersten Zeile werden als Eigenschaftsnamen für die importierten Objekte verwendet.
- Jede weitere Zeile wird in ein separates Objekt umgewandelt.
- Datumsangaben sind im Format "%Y-%m-%d %H:%i" formatiert.


### Importeinstellungen

- Der Import-Service erwartet, dass die erste Zeile eine Kopfzeile mit Spaltennamen ist.
- Standardmäßig wird das erste Blatt der Excel-Datei verarbeitet. Um ein anderes Blatt zu spezifizieren, verwenden Sie den **sheet**-Parameter (nullbasiert):

~~~js
gantt.importFromExcel({
    server:"https://export.dhtmlx.com/gantt",
    data: file,
    sheet:2, // verarbeitet das dritte Blatt
    callback: function (rows) {}
});
~~~


## Export nach iCal

Um Gantt-Diagrammdaten als iCal-String zu exportieren, gehen Sie wie folgt vor:

- Aktivieren Sie das <b>export_api</b>-Plugin mit der Methode [plugins](api/method/plugins.md):
~~~js
gantt.plugins({
      export_api: true
});
~~~

- Verwenden Sie die Methode [exportToICal](api/method/exporttoical.md), um Daten zu exportieren:

~~~html
<input value="Export to iCal" type="button" onclick='gantt.exportToICal()'>/*!*/

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~


[Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)


[Export data: store online](https://docs.dhtmlx.com/gantt/samples/08_api/09_export_store.html)


#### Parameter der Export-Methode

Die [exportToICal()](api/method/exporttoical.md)-Methode akzeptiert ein optionales Objekt mit folgenden Eigenschaften:

- **server** - (*string*) gibt den API-Endpunkt für die Anfrage an. Nützlich für lokale Export-Service-Installationen. Standardmäßig **https://export.dhtmlx.com/gantt**.
- **name** - (*string*) ermöglicht das Festlegen eines benutzerdefinierten Dateinamens und einer Erweiterung, das Dateiformat bleibt jedoch iCal.
  
**Beispielaufruf der Export-Methode mit optionalen Eigenschaften**
~~~js
gantt.exportToICal({
    server:"https://myapp.com/myexport/gantt"
});
~~~

