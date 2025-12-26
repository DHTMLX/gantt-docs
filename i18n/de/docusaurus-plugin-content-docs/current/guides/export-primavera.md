---
title: "Export und Import aus Primavera P6"
sidebar_label: "Export und Import aus Primavera P6"
---

# Export und Import aus Primavera P6

Die dhtmlxGantt-Bibliothek unterstützt das Exportieren von Daten aus dem Gantt-Diagramm nach Primavera P6 sowie das Importieren von Daten aus Primavera P6 in das Gantt-Diagramm.

:::note
Dieser Service ist kostenlos nutzbar, allerdings enthält die exportierte Datei ein Wasserzeichen der Bibliothek unter der GPL-Lizenz.
Der Erwerb einer Lizenz entfernt das Wasserzeichen während des gültigen Supportzeitraums (12 Monate für alle PRO-Lizenzen).
:::

Mehrere Exportdienste stehen zur lokalen Installation auf Ihrem Computer zur Verfügung, sodass Sie das Gantt-Diagramm direkt nach Primavera P6 exportieren können.
Beachten Sie, dass Exportdienste nicht im Gantt-Paket enthalten sind.
Detaillierte Informationen zu den Nutzungsbedingungen finden Sie im [entsprechenden Artikel](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml).

## Einschränkungen des Online-Exportdienstes

:::note
Der Exportdienst hat Einschränkungen hinsichtlich der Verarbeitungszeit und der Anfragegröße.
:::

### Zeitlimits

Wenn der Exportvorgang länger als 20 Sekunden dauert, wird er abgebrochen und die folgende Fehlermeldung erscheint:

~~~html
Error: Timeout trigger 20 seconds
~~~

Wenn mehrere Benutzer gleichzeitig Gantt-Diagramme exportieren, kann die Verarbeitung länger dauern als üblich. Die für jede Exportanfrage eines Benutzers aufgewendete Zeit wird jedoch separat gezählt - dies ist erwartetes Verhalten.

### Begrenzungen der Anfragegröße

Ein gemeinsamer API-Endpunkt **https://export.dhtmlx.com/gantt** verarbeitet alle Exportmethoden (*exportToPDF*, *exportToPNG*, *exportToMSProject* usw.) mit einer **maximalen Anfragegröße von 10 MB**.

Es gibt außerdem einen dedizierten API-Endpunkt **https://export.dhtmlx.com/gantt/project** für die [MSProject](guides/export-msproject.md) und
[Primavera P6](#limitsonrequestsizeandimportoflargefiles)
Export-/Importdienste (*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6*). Dieser Endpunkt unterstützt eine **maximale Anfragegröße von 40 MB**.

## Verwendung von Exportmodulen

:::note
Für den Export großer Diagramme steht ein [eigenständiges Exportmodul](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) zur Verfügung.
Dieses Modul ist kostenlos, wenn Sie eine [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing)-, [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing)- oder [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing)-Lizenz besitzen, oder kann separat über [diesen Link](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210) erworben werden.
:::

Weitere Informationen zur Nutzung des Exportmoduls mit MS Project finden Sie in [dieser Anleitung](guides/msp-export-module.md). Das Modul unterstützt Export/Import sowohl für MS Project als auch für Primavera P6.

## Export nach Primavera P6 {#exporttoprimaverap6}

Die Gantt-Komponente kann Verknüpfungen, Aufgaben und Ressourcen nach Primavera P6 exportieren.

Um Daten aus dem Gantt-Diagramm nach Primavera P6 zu exportieren, gehen Sie wie folgt vor:

- Aktivieren Sie das <b>export_api</b>-Plugin wie in der Dokumentation zu [plugins](api/method/plugins.md) beschrieben:

~~~js
gantt.plugins({
      export_api: true
});
~~~

:::note
Für Gantt-Versionen vor 8.0 müssen Sie **https://export.dhtmlx.com/gantt/api.js** auf Ihrer Seite einbinden, um den Online-Exportdienst zu aktivieren, zum Beispiel:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- Verwenden Sie die Methode [exportToPrimaveraP6()](api/method/exporttoprimaverap6.md), um Daten aus dem Gantt-Diagramm zu exportieren:

~~~js
gantt.exportToPrimaveraP6();
~~~

Diese Methode sendet eine Anfrage an den entfernten Dienst, der entweder eine XML-Projektdatei generiert und zurückgibt oder eine URL zum Herunterladen der Datei bereitstellt.


[Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)


Beim Export nach Primavera ist es wichtig, dass die **Summary**-Eigenschaft für Projektaufgaben *true* zurückgibt, um eine korrekte Funktion zu gewährleisten:

~~~js
gantt.exportToPrimaveraP6({
  tasks: {
    Summary: function (task) {
      return !!gantt.hasChild(task.id);
    },
    CustomProperty: function (task) {
      return task.custom_property;
    },
    SlateId: function (task) {
      return task.id + "";
    },
  }
});
~~~

**Related example:** [Custom properties for WBS tasks (PrimaveraP6's Summary tasks)](https://snippet.dhtmlx.com/r90hjlvo?tag="gantt")

### Antwort

Die Antwort des Exportdienstes ist ein JSON-Objekt mit folgender Struktur:

~~~js
{
    data: {},
    config: {},
    resources: [],
    worktime: {}
}
~~~

- **data** - ein Gantt-[Datenobjekt](guides/supported-data-formats.md#json), das Aufgaben mit Eigenschaften wie *id*, *open*, *parent*, *progress*, *start_date*, *text* und *resource* enthält. Datumsangaben sind als Strings im Format "%Y-%m-%d %H:%i" formatiert.
- **config** - ein Gantt-[Konfigurationsobjekt](api/overview/properties-overview.md) mit Einstellungen, die aus der Projektdatei extrahiert wurden.
- **resources** - ein Array von Ressourcenobjekten, jeweils mit (*id: string, name:string, type:string*), das die Ressourcen aus der Projektdatei repräsentiert.
- **worktime** - ein Objekt, das die Arbeitszeiteinstellungen aus dem Projektkalender enthält.

### Exporteinstellungen

Die Methode **exportToPrimaveraP6()** akzeptiert ein Objekt mit mehreren optionalen Eigenschaften:

- **name** - (string) gibt den Dateinamen für die exportierte Datei an (Standard: 'gantt.xml').

~~~js
gantt.exportToPrimaveraP6({
    name:'custom.xml'
});
~~~

- **auto_scheduling** - (boolean) legt den Planungsmodus für Aufgaben im exportierten Projekt fest. Bei **true** werden Aufgaben automatisch geplant, bei **false** manuell (Standard).

~~~js
gantt.exportToPrimaveraP6({
    auto_scheduling: false
});
~~~

- **skip_circular_links** - (boolean) bestimmt, ob zirkuläre Verknüpfungen entfernt werden sollen. **true** (Standard) entfernt sie, **false** behält sie bei.

~~~js
gantt.exportToPrimaveraP6({
    skip_circular_links: false
});
~~~

- **project** - (object) ermöglicht das Zuweisen benutzerdefinierter Eigenschaften an die exportierte Projekteigenschaft.

~~~js
gantt.exportToPrimaveraP6({
    project: {
        'Author': 'I am!',
        'MinutesPerDay': function () {
            return gantt.config.hours_per_day * 60;
        }
    }
});
~~~

Diese Eigenschaften entsprechen denen der [Project entity](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12))." Eine Liste unterstützter Eigenschaften finden Sie [hier](guides/properties.md). Werte können fest oder Funktionen sein, die während des Exports ausgeführt werden.

- **tasks** - (object) ermöglicht das Definieren benutzerdefinierter Eigenschaften für die exportierten Aufgaben.

~~~js
gantt.exportToPrimaveraP6({
   tasks: {
        'StartVariance': function (task) {
           if (task.startVariance)
               return task.startVariance;
           else
               return 0;
        },
        'PercentWorkComplete': function (task) {
           return (task.progress + 0.1);
        },
        'Custom': function (task) {
           return 'Custom value';
        },
        'Custom 2': 'My Custom value'
    }
});
~~~

Diese Eigenschaften beziehen sich auf die [Task entity](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12));" eine Liste unterstützter [Eigenschaften](guides/properties.md#tasksproperties) ist verfügbar. Werte können fest oder Funktionen sein, die für jede Aufgabe während des Exports aufgerufen werden.

- **data** - (object) ermöglicht das Bereitstellen einer benutzerdefinierten Datenquelle für das exportierte Gantt-Diagramm.

:::note
Es wird erwartet, dass **start_date** und **end_date** sowohl Datum als auch Uhrzeit enthalten (*%d-%m-%Y %H:%i*).
:::

~~~js
const customData = {
    "data": [
        { "id": "10", "text": "Project #5", "start_date": "01-04-2025 00:00", 
            "duration": 3, "order": 10, "progress": 0.4, "open": true, 
            "end_date": "04-04-2025 00:00", "parent": 0 
        },
        { "id": "1", "text": "Task #67", "start_date": "02-04-2025 00:00", 
            "duration": 2, "order": 10, "progress": 0.6, "parent": "10", 
            "end_date": "04-04-2025 00:00" 
        },
        { "id": "2", "text": "Task #89", "start_date": "01-04-2025 00:00", 
            "duration": 2, "order": 20, "progress": 0.6, "parent": "10", 
            "end_date": "03-04-2025 00:00" 
        },
    ],
    "links": [
        { "id": 1, "source": 1, "target": 2, "type": "1" },
    ]
}

gantt.exportToPrimaveraP6({
    data: customData
});
~~~

**Related example:** [Gantt. Export custom data](https://snippet.dhtmlx.com/10ytgdxs)
))

- **callback** - (function) kann verwendet werden, um eine Download-URL für die generierte XML-Datei zu erhalten. Der Callback erhält ein JSON-Objekt mit einer *url*-Eigenschaft:

~~~js
gantt.exportToPrimaveraP6({
    callback: function(res){
        alert(res.url);
    }
});
~~~
 
- **resources** - (array) ermöglicht das Exportieren einer Ressourcenliste in die Primavera P6-Datei.

~~~js
gantt.exportToPrimaveraP6({
    resources: [
        {"id":"1","name":"John","type":"work"},
        {"id":"2","name":"Mike","type":"work"},
        {"id":"3","name":"Anna","type":"work"}
    ]
});
~~~

Ressourcentypen können "work", "cost" oder "material" sein. Ressourcen-Zuweisungen werden über die Eigenschaft **ResourceAssignments** in der Aufgaben-Konfiguration angegeben:

~~~js
var users = [// resources
    {key:'0', label: "N/A"},
    {key:'1', label: "John"},
    {key:'2', label: "Mike"},
    {key:'3', label: "Anna"}
];

gantt.exportToPrimaveraP6({
    resources: users
        .filter(function(u){
            if(u.key === '0')//Standardoption überspringen 
                return false;
            return true;
        })
        .map(function(u){
            return {
                id: u.key,
                name: u.label,
                type: "work"
               };
          }),
    tasks: {
        ResourceAssignments: function(task){  /*!*/
            return task.user;                   /*!*/
        }                                       /*!*/
    }
});
~~~

Die Eigenschaft **ResourceAssignments** kann eine Funktion sein, die ein Aufgabenobjekt erhält und entweder einen String/eine Zahl oder ein Array von Strings/Zahlen zurückgibt:

~~~js
tasks: {
    ResourceAssignments: function(task){
        return [task.user, task.office];
    }
}
~~~

**Related example:** [Export Gantt with resources to Primavera P6](https://snippet.dhtmlx.com/6bfbwp8g)

- **server** - (string) gibt den API-Endpunkt für die Exportanfrage an. Dies kann verwendet werden, wenn Sie einen lokalen Exportdienst installiert haben. Standard ist **https://export.dhtmlx.com/gantt**.

~~~js
gantt.exportToPrimaveraP6({
    server:"https://myapp.com/myexport/gantt"
});
~~~


## Import aus Primavera P6

Um eine XML- oder XER-Datei zu konvertieren, senden Sie eine POST-Anfrage an den Exportdienst mit folgenden Angaben:

 - Request-URL: **https://export.dhtmlx.com/gantt**
 - Methode: **POST**
 - Content-Type: **multipart/form-data**

Die Anfrageparameter umfassen:

 - **file** - eine XER- oder XML-Primavera P6-Datei
 - **type** - auf "primaveraP6-parse" setzen
 - **data** - (*optional*) ein JSON-String mit Importeinstellungen

Beispiel:

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="primaveraP6-parse">
    <button type="submit">Get</button>
</form>
~~~

Alternativ kann die [Client-seitige API](api/method/importfromprimaverap6.md) wie folgt verwendet werden:

~~~js
gantt.importFromPrimaveraP6({
    data: file,
    taskProperties: ["Notes", "Name"],
    callback: function (project) {
        if (project) {
            gantt.clearAll();
            if (project.config.duration_unit) {
                gantt.config.duration_unit = project.config.duration_unit;
            }                    
            gantt.parse(project.data);
        }
     }
});
~~~


[Import Primavera P6 file](https://docs.dhtmlx.com/gantt/samples/08_api/18_load_from_primaverap6.html)


Hier sollte *file* ein [File](https://developer.mozilla.org/en-US/docs/Web/API/File)-Objekt sein, das eine XML- oder XER-Projektdatei enthält.

:::note
**gantt.importFromPrimaveraP6** erfordert Unterstützung für die HTML5 File API.
:::

### Antwort

Die Antwort gibt ein JSON-Objekt mit folgender Struktur zurück:

~~~js
{
    data: {},
    config: {},
    resources: [],
    worktime: {}
}
~~~

- **data** - ein Gantt-[Datenobjekt](guides/supported-data-formats.md#json). Jede Aufgabe enthält Eigenschaften wie *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource*. Datumsangaben sind im Format "%Y-%m-%d %H:%i".
- **config** - ein Gantt-[Konfigurationsobjekt](api/overview/properties-overview.md) mit Einstellungen, die aus der Projektdatei extrahiert wurden.
- **resources** - ein Array von Ressourcenobjekten (jeweils mit *id*, *name* und *type*), die die Ressourcen aus der Projektdatei darstellen.
- **worktime** - ein Objekt mit Arbeitseinstellungen aus dem Projektkalender.


### Importeinstellungen

#### Festlegen der Dauereinheit

Sie können die erwartete Dauereinheit festlegen, indem Sie einen **durationUnit**-String ("minute", "hour", "day", "week", "month", "year") an den Server senden.

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="primaveraP6-parse">
    <input type="hidden" name="data" 
        value="{ "durationUnit": "hour" }" />
    <button type="submit">Get</button>
</form>
~~~

oder

~~~js
gantt.importFromPrimaveraP6({
    data: file,
    durationUnit: "hour",
    callback: function(project){}
});
~~~

#### Abrufen von Projekteigenschaften

Um bestimmte Projektfelder abzurufen, senden Sie den **projectProperties**-Parameter mit einem Array der gewünschten Felder an den Server. Dadurch werden Eigenschaften aus [der Project-Entität](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12))" in die **config**-Eigenschaft der Antwort extrahiert. Unterstützte [Eigenschaften](guides/properties.md#projectproperties) sind aufgelistet.

 - **projectProperties** - ein Array, das angibt, welche Projekteigenschaften in der Antwort enthalten sein sollen.

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="primaveraP6-parse">
    <input type="hidden" name="data" 
        value="{ "projectProperties": ["Author", "Title"] }" />
    <button type="submit">Get</button>
</form>
~~~

oder

~~~js
gantt.importFromPrimaveraP6({
    data: file,
    durationUnit: "hour",
    projectProperties: ["Author", "Title"],
    callback: function(project){
        var config = project.config;
        alert(config.$custom_properties.Author);
    }
});
~~~

#### Abrufen von Aufgabeneigenschaften

Um bestimmte Aufgabenfelder zu importieren, senden Sie den **taskProperties**-Parameter mit einem Array der gewünschten Felder an den Server. Dadurch werden Eigenschaften aus den [Task-Entitäten](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12))" extrahiert. Unterstützte [Eigenschaften](guides/properties.md#tasksproperties) sind verfügbar.

 - **taskProperties** - ein Array, das zusätzliche aufzunehmende Aufgabeneigenschaften angibt.

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="primaveraP6-parse">
    <input type="hidden" name="data" 
        value="{ "taskProperties": ["Contact", "Priority"] }" />
    <button type="submit">Get</button>
</form>
~~~
oder
~~~js
gantt.importFromPrimaveraP6({
    data: file,
    durationUnit: "hour",
    taskProperties: ["Contact", "Priority"],
    callback: function(project){
        var config = project.config;
        alert(config.$custom_properties.Author);
        gantt.parse(project.data);
    }
});
gantt.attachEvent("onTaskLoading", function(task) {
    if (task.$custom_data) {
        task.contact = task.$custom_data["Contact"];
        task.priority = task.$custom_data["priority"];
        delete task.$custom_data;
    }
    return true;
});
~~~


#### Ermitteln von Aufgabentypen

So ermitteln Sie den Aufgabentyp: Aufgaben mit dem Label **Project** haben die Eigenschaft `Summary: "1"`, während Aufgaben mit dem Label **Milestone** die Eigenschaft `Milestone: "1"` besitzen. Beim Importieren der Daten helfen diese Eigenschaften, den Aufgabentyp zu bestimmen.

Die Importfunktion wird wie folgt aufgerufen:

~~~js
gantt.importFromPrimaveraP6({
    data: file,
    taskProperties: [
        "Summary", 
        "Milestone",
    ],
    callback: function (project) {
        if (project) {
            console.log(project)
            gantt.clearAll();
            if (project.config.duration_unit) {
                gantt.config.duration_unit = project.config.duration_unit;
            }
            console.log('import: ', project.data);
            gantt.parse(project.data);
        }
    }
});
~~~

Nach dem Import können Sie die Aufgabentypen anhand dieser Eigenschaften wie folgt festlegen:

~~~js
gantt.attachEvent("onTaskLoading", function (task) {
    if (task.$custom_data) {
        if (task.$custom_data.Summary == "1") {
            task.type = "project";
        }
        if (task.$custom_data.Milestone == "1") {
            task.type = "milestone";
        }
        // delete task.$custom_data;
    }
    return true;
});
~~~

**Related example:** [Gantt. Import Primavera P6 files. Get task type from properties](https://snippet.dhtmlx.com/y95rsxor)
))

## Begrenzungen der Anfragengröße und Import großer Dateien

Für die Export-/Importdienste von Primavera P6 stehen zwei API-Endpunkte zur Verfügung:

- **https://export.dhtmlx.com/gantt** - der Standardendpunkt, der für alle Exportmethoden verwendet wird (*exportToPDF*, *exportToPNG*, *exportToPrimaveraP6*, usw.). Er hat eine **maximale Anfragengröße von 10 MB**.
- **https://export.dhtmlx.com/gantt/project** - ein dedizierter Endpunkt für [MSProject](guides/export-msproject.md) und [Primavera P6](guides/export-primavera.md) Export-/Importdienste (*exportToMSProject*, *importFromMSProject*, *exportToPrimaveraP6*, *importFromPrimaveraP6*). Dieser Endpunkt unterstützt **Anfragen bis zu 40 MB**.

Sie können den Endpunkt über die **server**-Eigenschaft im Export-Konfigurationsobjekt angeben:

~~~js
gantt.importFromPrimaveraP6({
    server:"https://export.dhtmlx.com/gantt",
    data: file,
    callback: function(project){
       // some logic
    }
}); 
~~~

Wenn kein Endpunkt angegeben wird, wird standardmäßig <b>https://export.dhtmlx.com/gantt</b> verwendet. Der folgende Aufruf verhält sich genauso wie oben:

~~~js
gantt.importFromPrimaveraP6({
    data: file,
    callback: function(project){
       // some logic
    }
});
~~~

Um große Projekte zu verarbeiten, die das 4MB-Limit überschreiten, können Sie den zweiten Endpunkt verwenden:

~~~js
gantt.importFromPrimaveraP6({
    server:"https://export.dhtmlx.com/gantt/project",
    data: file,
    callback: function(project){
       // some logic
    }
}); 
~~~

Dieser Endpunkt akzeptiert Anfragen bis zu 40MB und unterstützt sowohl den Export als auch den Import für Primavera P6. Er ist speziell für Exporte und Importe von Primavera P6 vorgesehen.

Beachten Sie, dass andere Methoden wie *gantt.exportToPDF((server:"https://export.dhtmlx.com/gantt/project"))* zu einem Serverfehler führen.

