---
sidebar_label: exportToExcel
title: exportToExcel method
description: "exportiert Daten aus dem Gantt-Diagramm in ein Excel-Dokument"
---

# exportToExcel

### Description

@short: Exportiert Daten aus dem Gantt-Diagramm in ein Excel-Dokument

@signature: exportToExcel: (_export_?: any) =\> void

### Parameters

- `export` - object - optional, ein Objekt mit Export-Einstellungen (siehe Details)

### Example

~~~jsx
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

### Details

:::note
Diese Methode ist in der **export**-Erweiterung definiert, daher müssen Sie das [export_api](guides/extensions-list.md#export-service) Plugin aktivieren.
Lesen Sie die Details im [](guides/excel.md) Artikel.
:::

:::note
Falls Sie eine Gantt-Version verwenden, die älter als 8.0 ist, müssen Sie die `https://export.dhtmlx.com/gantt/api.js` in Ihre Seite einbinden, um den Online-Export-Service zu aktivieren, z.B.:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~

:::

Die **exportToExcel()**-Methode nimmt als Parameter ein Objekt mit mehreren Eigenschaften (alle Eigenschaften sind optional):

- **name** - (*string*) legt den Namen der Ausgabedatei mit der Erweiterung '.xlsx' fest
- **columns** - (*array*) ermöglicht die Konfiguration der Spalten des ausgabe Excel-Blatts. Die Eigenschaften der Spaltenobjekte sind:
    - **'id'** - (*string,number*) eine Eigenschaft des Ereignisses, die der Spalte zugeordnet wird
    - **'header'** - (*string*) der Spaltenheader
    - **'width'** - (*number*) die Spaltenbreite in Pixeln
    - **'type'** - (*string*) der Spaltentyp
- **server** - (*string*) legt den API-Endpunkt für die Anfrage fest. Kann mit der lokalen Installation des Export-Services verwendet werden. Standardwert ist `https://export.dhtmlx.com/gantt`
- **callback** - (*function*) Wenn Sie eine URL zum Herunterladen einer generierten XLSX-Datei erhalten möchten, kann die callback-Eigenschaft verwendet werden. Sie erhält ein JSON-Objekt mit der Eigenschaft url
- **visual** - (*boolean*) fügt dem exportierten Excel-Dokument das Timeline-Diagramm hinzu; standardmäßig *false*. Lesen Sie [wie man Task-Farben zur exportierten Datei hinzufügt](guides/excel.md#adding-colors-of-tasks-to-export) zum exportierten Dokument
- **cellColors** - (*boolean*) wenn auf *true* gesetzt, erhalten die Zellen des exportierten Dokuments die Farben, die durch die Vorlage [](api/template/timeline_cell_class.md) festgelegt sind; die Eigenschaften *color* und *background-color* werden exportiert
- **data** - (*object*) legt eine benutzerdefinierte Datenquelle fest, die im exportierten Gantt-Diagramm dargestellt wird
- **date_format** - (*string*) legt das Datumsformat fest, in dem das Datum im exportierten Excel-Dokument angezeigt wird. Folgende Formatcodes können verwendet werden:

~~~css
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
~~~

Format codeOutput:

<table class="my_table">
<tr><td class="version_info">Format code</td><td class="version_info">Output</td></tr>
<tr><td>d</td><td>9</td></tr>
<tr><td>dd</td><td>09</td></tr>
<tr><td>ddd</td><td>Mon</td></tr>
<tr><td>dddd</td><td>Monday</td></tr>
<tr><td>mm</td><td>01</td></tr>
<tr><td>mmm</td><td>Jan</td></tr>
<tr><td>mmmm</td><td>January</td></tr>
<tr><td>mmmmm</td><td>J</td></tr>
<tr><td>yy</td><td>12</td></tr>
<tr><td>yyyy</td><td>2021</td></tr>
<tr><td>mm/dd/yyyy</td><td>01/09/2021</td></tr>
<tr><td>m/d/y</td><td>1/9/21</td></tr>
<tr><td>ddd, mmm d</td><td>Mon, Jan 9</td></tr>
<tr><td>mm/dd/yyyy h:mm AM/PM</td><td>01/09/2021 6:20 PM</td></tr>
<tr><td>dd/mm/yyyy hh:mm:ss</td><td>09/01/2012 16:20:00</td></tr>
</table>


#### Default date parameters

- Das Export-Modul erwartet, dass die Spalten **start_date** und **end_date** den Typ *Date* haben und die Spalte **duration** den Typ *number* hat. 

Im Falle der Anwendung [custom templates](guides/specifying-columns.md#datamappingandtemplates) ist es notwendig, entweder einen Wert des erwarteten Typs zurückzugeben oder einen anderen Wert in der **name**-Eigenschaft der Spaltenkonfiguration zu definieren. Zum Beispiel:

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


Andernfalls werden die Gantt-Daten nicht exportiert. [Siehe das zugehörige Beispiel](https://snippet.dhtmlx.com/q1lhyvt3).

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