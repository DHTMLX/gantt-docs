---
sidebar_label: exportToExcel
title: exportToExcel method
description: "exportiert Daten aus dem Gantt-Diagramm in eine Excel-Datei"
---

# exportToExcel

### Description

@short: Exportiert Daten aus dem Gantt-Diagramm in eine Excel-Datei

@signature: exportToExcel: (_export_?: any) =\> void

### Parameters
- `export` - (optional) *object* - optionale Einstellungen für den Export (siehe Details)

### Example

~~~jsx
gantt.exportToExcel({
    name:"document.xlsx", 
    columns:[
        { id:"text",  header:"Titel", width:150 },
        { id:"start_date",  header:"Startdatum", width:250, type:"date" }
    ],
    server:"https://myapp.com/myexport/gantt",
    callback: function(res){
        alert(res.url);
    },
    visual:true,
    cellColors:true,
    date_format: "dddd d, mmmm yyyy"
});
~~~

### Details

:::note
 Diese Methode ist Teil der **export** Erweiterung, daher stellen Sie sicher, dass das [export_api](guides/extensions-list.md#exportservice) Plugin aktiviert ist.
Weitere Details finden Sie im Artikel [Export/Import for Excel, Export to iCal](guides/excel.md).

 
:::

:::note
 Für Gantt-Versionen vor 8.0 binden Sie das Script **https://export.dhtmlx.com/gantt/api.js** auf Ihrer Seite ein, um den Online-Exportdienst zu aktivieren, z.B.:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

Die Methode **exportToExcel()** akzeptiert ein Objekt mit mehreren optionalen Eigenschaften:

- **name** - (*string*) legt den Dateinamen der Ausgabedatei fest, inklusive der Endung '.xlsx' 
- **columns** - (*array*) definiert die Spalten für das generierte Excel-Blatt. Jedes Spaltenobjekt kann enthalten:
    - **'id'** - (*string,number*) die Eigenschaft des Events, die der Spalte zugeordnet wird
    - **'header'** - (*string*) der Spaltenkopftext
    - **'width'** - (*number*) die Spaltenbreite in Pixeln
    - **'type'** - (*string*) der Datentyp der Spalte
- **server** - (*string*) die URL des API-Endpunkts für die Exportanfrage. Nützlich bei Verwendung eines lokal installierten Exportdienstes. Standard ist **https://export.dhtmlx.com/gantt**
- **callback** - (*function*) eine Funktion, die die URL der generierten XLSX-Datei erhält. Der Callback erhält ein JSON-Objekt mit der Eigenschaft url
- **visual** - (*boolean*) fügt das Zeitachsen-Diagramm in die exportierte Excel-Datei ein; Standard ist *false*. Details siehe [wie man Aufgabenfarben hinzufügt](guides/excel.md)
- **cellColors** - (*boolean*) wenn true, erhalten Zellen in der exportierten Datei Farben entsprechend der [timeline_cell_class](api/template/timeline_cell_class.md) Vorlage, es werden *color* und *background-color* Eigenschaften exportiert
- **data** - (*object*) spezifiziert eine benutzerdefinierte Datenquelle, die im ausgegebenen Gantt-Diagramm angezeigt werden soll
- **date_format** - (*string*) definiert das Datumsformat, das im exportierten Excel-Dokument verwendet wird. Folgende Formatcodes werden unterstützt:
```css
<style>
    table.my_table {
        width: 70%;
        padding: 0 20px;
      
    }
    table.my_table tr td {
        text-align: left;
        vertical-align: middle;
        width: 35%;
        border-bottom: 1px solid grey;
    }
    table.my_table td.version_info {
        text-align: left;
        font-weight: bold;
    }
</style>
```
<table class="my_table">
<tr><td class="version_info">Formatcode</td><td class="version_info">Ausgabe</td></tr>

<tr><td>d</td><td>9</td></tr>
<tr><td>dd</td><td>09</td></tr>
<tr><td>ddd</td><td>Mo</td></tr>
<tr><td>dddd</td><td>Montag</td></tr>
<tr><td>mm</td><td>01</td></tr>
<tr><td>mmm</td><td>Jan</td></tr>
<tr><td>mmmm</td><td>Januar</td></tr>
<tr><td>mmmmm</td><td>J</td></tr>
<tr><td>yy</td><td>12</td></tr>
<tr><td>yyyy</td><td>2021</td></tr>
<tr><td>mm/dd/yyyy</td><td>01/09/2021</td></tr>
<tr><td>m/d/y</td><td>1/9/21</td></tr>
<tr><td>ddd, mmm d</td><td>Mo, Jan 9</td></tr>
<tr><td>mm/dd/yyyy h:mm AM/PM</td><td>01/09/2021 6:20 PM</td></tr>
<tr><td>dd/mm/yyyy hh:mm:ss</td><td>09/01/2012 16:20:00</td></tr>
</table>

#### Standard-Datumsparameter

Das Export-Modul erwartet, dass die Spalten **start_date** und **end_date** vom Typ *Date* sind und die Spalte **duration** vom Typ *number*. 

Wenn Sie [benutzerdefinierte Templates](guides/specifying-columns.md#datamappingandtemplates) verwenden, sollten Sie entweder Werte des erwarteten Typs zurückgeben oder eine andere Eigenschaft im **name**-Feld der Spaltenkonfiguration angeben. Zum Beispiel:

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

Andernfalls werden die Gantt-Daten nicht korrekt exportiert. [Siehe das zugehörige Beispiel](https://snippet.dhtmlx.com/q1lhyvt3).

### Related API
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- [Export/Import for Excel, Export to iCal](guides/excel.md)

