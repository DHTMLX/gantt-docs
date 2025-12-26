---
title: "Export und Import aus MS Project"
sidebar_label: "Export und Import aus MS Project"
---

# Export und Import aus MS Project

Die dhtmlxGantt-Bibliothek unterstützt sowohl den Export von Daten aus dem Gantt-Diagramm nach MS Project als auch den Import von Daten aus MS Project in das Gantt-Diagramm.

:::note
Der Exportdienst ist kostenlos nutzbar, allerdings enthält die resultierende Datei unter der GPL-Lizenz ein Wasserzeichen der Bibliothek.
Wenn Sie eine Lizenz erwerben, sind Exporte während des aktiven Supportzeitraums (12 Monate für alle PRO-Lizenzen) wasserzeichenfrei.
:::

Es stehen mehrere Exportdienste zur Verfügung, die lokal auf Ihrem Computer installiert werden können, um Gantt-Diagramme nach MS Project zu exportieren.
Beachten Sie, dass diese Exportdienste nicht im Gantt-Paket enthalten sind.
Weitere Informationen zu den Nutzungsbedingungen der einzelnen Dienste finden Sie im [zugehörigen Artikel](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml).

## Einschränkungen des Online-Exportdienstes

:::note
Der Exportdienst hat Begrenzungen bezüglich der Verarbeitungszeit und der Anfragegröße.
:::

### Zeitlimits

Wenn der Exportprozess länger als 20 Sekunden dauert, wird er abgebrochen und Sie sehen folgenden Fehler:

~~~html
Error: Timeout trigger 20 seconds
~~~

Wenn mehrere Nutzer gleichzeitig Gantt-Diagramme exportieren, kann die Verarbeitung insgesamt länger dauern. Die für jede einzelne Exportanfrage eines Nutzers gezählte Zeit wird jedoch separat verfolgt.

### Begrenzungen der Anfragegröße

Der allgemeine API-Endpunkt **https://export.dhtmlx.com/gantt** verarbeitet alle Exporttypen (*exportToPDF*, *exportToPNG*, *exportToMSProject*, usw.) mit einer maximalen Anfragegröße von **10 MB**.

Es gibt auch einen speziellen API-Endpunkt **https://export.dhtmlx.com/gantt/project** speziell für [MSProject](#limitsonrequestsizeandimportoflargefiles) und
[Primavera P6](guides/export-primavera.md) Export-/Importdienste (*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6*). Dieser Endpunkt erlaubt eine größere Anfragegröße von bis zu **40 MB**.

## Verwendung von Exportmodulen

:::note
Für den Export großer Diagramme empfiehlt sich die Nutzung eines [eigenständigen Exportmoduls](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml).
Dieses Modul ist kostenlos, wenn Sie eine [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) oder [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) Lizenz besitzen, oder kann separat [hier](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210) erworben werden.
:::

[Mehr über die Verwendung des Exportmoduls für MS Project erfahren](guides/msp-export-module.md).

## Export nach MS Project

Die Gantt-Komponente kann Verknüpfungen, Aufgaben und Ressourcen nach MS Project exportieren.

Um Daten aus dem Gantt-Diagramm nach MS Project zu exportieren, gehen Sie wie folgt vor:

- Aktivieren Sie das <b>export_api</b>-Plugin über die [plugins](api/method/plugins.md) Methode, um den Online-Exportdienst zu nutzen:

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

- Verwenden Sie die [exportToMSProject](api/method/exporttomsproject.md) Methode, um Ihre Gantt-Diagrammdaten zu exportieren.

~~~js
gantt.exportToMSProject();
~~~

Diese Methode sendet eine Anfrage an den entfernten Dienst, der entweder eine XML-Projektdatei generiert oder eine URL zum Herunterladen der Datei bereitstellt.


[Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)


### Antwort

Die Antwort enthält ein JSON-Objekt mit folgender Struktur:

~~~js
{
   data: {},
   config: {},
   resources: [],
   worktimes: []
}
~~~

- **data** - ein Gantt-[Datenobjekt](guides/supported-data-formats.md#json). Jede Aufgabe enthält Eigenschaften wie *id*, *open*, *parent*, *progress*, *start_date*, *text* und *resource*. Datumsangaben sind als Strings im Format "%Y-%m-%d %H:%i" formatiert.
- **config** - ein Gantt-[Konfigurationsobjekt](api/overview/properties-overview.md) mit Einstellungen, die aus der Projektdatei extrahiert wurden.
- **resources** - ein Array von Ressourcenobjekten, jeweils mit den Eigenschaften (*id: string, name:string, type:string*), entsprechend den Ressourcen aus der Projektdatei.
- **worktimes** - ein Array von Objekten zur Erstellung neuer Kalender. Jedes Kalenderobjekt kann enthalten:
    - **id** - (optional) Kalenderkennung
    - **hours** - (Array) globale Arbeitszeiten, die Start- und Endzeiten der Aufgaben definieren
    - **dates** - (Array), das enthalten kann:
        - Sieben Wochentage (0 = Sonntag bis 6 = Samstag), wobei 1/true einen Arbeitstag und 0/false einen freien Tag bedeutet
        - Bestimmte Daten

### Exporteinstellungen

Die **exportToMSProject()**-Methode akzeptiert ein optionales Objekt mit verschiedenen Eigenschaften:

- **name** - (string) Dateiname für die exportierte Datei (Standard: 'gantt.xml').

~~~js
gantt.exportToMSProject({
    name:'custom.xml'
});
~~~

- **auto_scheduling** - (boolean) legt den Planungsmodus für exportierte Aufgaben fest. **true** markiert Aufgaben als automatisch geplant, **false** als manuell geplant (Standard).

~~~js
gantt.exportToMSProject({
    auto_scheduling: false
});
~~~

- **skip_circular_links** - (boolean) bestimmt, ob zirkuläre Verknüpfungen entfernt werden (Standard ist true).

~~~js
gantt.exportToMSProject({
    skip_circular_links: false
});
~~~

- **project** - (object) ermöglicht das Zuweisen benutzerdefinierter Eigenschaften an die exportierte Projekteigenschaft.

~~~js
gantt.exportToMSProject({
    project: {
        'Author': 'I am!',
        'MinutesPerDay': function () {
            return gantt.config.hours_per_day * 60;
        }
    }
});
~~~

Die Eigenschaften entsprechen denen der [Project entity](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12))."
Unterstützte Eigenschaften sind [hier](guides/tags.md) aufgelistet. Werte können fest oder Funktionen sein, die während des Exports ausgeführt werden.

- **tasks** - (object) ermöglicht das Setzen benutzerdefinierter Eigenschaften für exportierte Aufgaben.

~~~js
gantt.exportToMSProject({
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

Diese Eigenschaften entsprechen denen der [Task entity](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)), unterstützte Eigenschaften sind [hier](guides/tags.md#tasksproperties) aufgelistet.
Werte können fest oder Funktionen sein, die für jede Aufgabe beim Export aufgerufen werden.

- **data** - (object) ermöglicht das Angeben einer eigenen Datenquelle für das exportierte Gantt-Diagramm.

:::note
Die **start_date** und **end_date** sollten im Format mit Datum und Uhrzeit (*%d-%m-%Y %H:%i*) angegeben werden.
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

gantt.exportToMSProject({
    data: customData
});
~~~

**Related example:** [Gantt. Export custom data](https://snippet.dhtmlx.com/10ytgdxs)
))

- **callback** - (function) um die URL zum Herunterladen der generierten XML-Datei zu erhalten. Der Callback erhält ein JSON-Objekt mit einer *url*-Eigenschaft:

~~~js
gantt.exportToMSProject({
    callback: function(res){
        alert(res.url);
    }
});
~~~
 
- **resources** - (array) um eine Liste von Ressourcen in die MS Project-Datei einzufügen.

~~~js
gantt.exportToMSProject({
  resources: [
    {"id":"1","name":"John","type":"work"},
    {"id":"2","name":"Mike","type":"work"},
    {"id":"3","name":"Anna","type":"work"}
  ]
});
~~~

Ressourcentypen können "work", "cost" oder "material" sein. Ressourcen-Zuweisungen werden mit der **ResourceAssignments**-Eigenschaft in der Aufgaben-Konfiguration angegeben:

~~~js
var users = [// resources
  {key:'0', label: "N/A"},
  {key:'1', label: "John"},
  {key:'2', label: "Mike"},
  {key:'3', label: "Anna"}
];

gantt.exportToMSProject({
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

Die **ResourceAssignments**-Eigenschaft ist eine Funktion, die das Aufgabenobjekt erhält und entweder einen String/eine Zahl oder ein Array von Strings/Zahlen zurückgibt:

~~~js
tasks: {
    ResourceAssignments: function(task){
        return [task.user, task.office];
    }
}
~~~

- **server** - (string) gibt den API-Endpunkt für die Exportanfrage an. Dies kann verwendet werden, wenn ein lokaler Exportdienst läuft. Standard ist **https://export.dhtmlx.com/gantt**.

~~~js
gantt.exportToMSProject({
   server:"https://myapp.com/myexport/gantt"
});
~~~

## Import aus MS Project

Um eine XML- oder MPP-MS Project-Datei zu konvertieren, senden Sie eine Anfrage an den Exportdienst mit folgenden Angaben:

 - Anfrage-URL: **https://export.dhtmlx.com/gantt**
 - Anfragemethode: **POST**
 - Content-Type: **multipart/form-data**

Anfrageparameter:

 - **file** - die MPP- oder XML-MS Project-Datei
 - **type** - "msproject-parse"
 - **data** - (*optional*) JSON-String mit Einstellungen

Beispiel-Formular:

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="msproject-parse">
    <button type="submit">Get</button>
</form>
~~~

Alternativ können Sie die [Client-seitige API](api/method/importfrommsproject.md) wie hier verwenden:

~~~js
gantt.importFromMSProject({
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

Hier sollte *file* eine Instanz von [File](https://developer.mozilla.org/en-US/docs/Web/API/File) sein, die eine XML- oder MPP-Projektdatei enthält.

:::note
**gantt.importFromMSProject** benötigt Unterstützung für die HTML5 File API.
:::

### Antwort

Die Antwort enthält ein JSON-Objekt mit folgender Struktur:

~~~js
{
   data: {},
   config: {},
   resources: [],
   worktime: {}
}
~~~

- **data** - ein Gantt-[Datenobjekt](guides/supported-data-formats.md#json). Jede Aufgabe enthält die Eigenschaften: *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource*. Datumsangaben sind als Strings im Muster "%Y-%m-%d %H:%i" formatiert.
- **config** - ein Gantt-[Konfigurationsobjekt](api/overview/properties-overview.md) mit Einstellungen aus der Projektdatei.
- **resources** - ein Array von Objekten, jeweils mit (*id:string, name:string, type:string*), entsprechend den in der Projektdatei aufgeführten Ressourcen.
- **worktime** - ein Objekt mit den Arbeitszeiteinstellungen aus dem Projektkalender.

### Importeinstellungen

#### Festlegen der Dauereinheit

Um die erwartete Dauereinheit anzugeben, kann der **durationUnit**-String ("minute", "hour", "day", "week", "month", "year") in die an den Server gesendeten Daten aufgenommen werden.

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="msproject-parse">
    <input type="hidden" name="data" 
        value="{ "durationUnit": "hour" }" />
    <button type="submit">Get</button>
</form>
~~~

oder

~~~js
gantt.importFromMSProject({
    data: file,
    durationUnit: "hour",
    callback: function(project){}
});
~~~

#### Projekt-Eigenschaften abrufen

Um Projektfelder zu extrahieren, kann das **projectProperties**-Feld ein Array der gewünschten Felder enthalten, das an den Server gesendet wird. Dies zieht beliebige Eigenschaften der [Project-Entität](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12))" in die **config**-Eigenschaft der Antwort. Unterstützte [Eigenschaften](guides/tags.md#projectproperties) sind verfügbar.

- **projectProperties** - definiert ein Array von Projekteigenschaften, die in die Antwort aufgenommen werden sollen.

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="msproject-parse">
    <input type="hidden" name="data" 
        value="{ "projectProperties": ["Author", "Title"] }" />
    <button type="submit">Get</button>
</form>
~~~

oder

~~~js
gantt.importFromMSProject({
    data: file,
    durationUnit: "hour",
    projectProperties: ["Author", "Title"],
    callback: function(project){
        var config = project.config;
        alert(config.$custom_properties.Author);
    }
});
~~~

#### Aufgaben-Eigenschaften abrufen

Um Aufgabenfelder abzurufen, kann das **taskProperties**-Feld ein Array der gewünschten Felder enthalten, das an den Server gesendet wird. Dies extrahiert beliebige Eigenschaften der [Task-Entitäten](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12))." Unterstützte [Eigenschaften](guides/tags.md#tasksproperties) sind aufgelistet.

- **taskProperties** - gibt ein Array zusätzlicher Aufgabeneigenschaften an, die importiert werden sollen.

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="msproject-parse">
    <input type="hidden" name="data" 
        value="{ "taskProperties": ["Contact", "Priority"] }" />
    <button type="submit">Get</button>
</form>
~~~

oder

~~~js
gantt.importFromMSProject({
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

#### Aufgabentypen abrufen

Mit dieser Methode kann der Aufgabentyp identifiziert werden: Aufgaben mit der Markierung **Project** haben die Eigenschaft `Summary: "1"`, und Aufgaben mit der Markierung **Milestone** haben die Eigenschaft `Milestone: "1"`. Durch das Importieren dieser Eigenschaften kann der Aufgabentyp entsprechend gesetzt werden.

Der Import-Aufruf sieht wie folgt aus:

~~~js
gantt.importFromMSProject({
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

Anschließend können die Aufgabentypen anhand dieser Eigenschaften wie folgt angepasst werden:

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

**Related example:** [Gantt. Import MSP files. Get task type from properties](https://snippet.dhtmlx.com/sjka4br8)

## Begrenzungen der Anfragegröße und Import großer Dateien

Es gibt zwei API-Endpunkte für MSProject Export/Import-Services:

- **https://export.dhtmlx.com/gantt** - der Standardendpunkt, der alle Exportmethoden verarbeitet (*exportToPDF*, *exportToPNG*, *exportToMSProject*, usw.). **Maximale Anfragegröße ist 10 MB**.
- **https://export.dhtmlx.com/gantt/project** - ein Endpunkt speziell für [MSProject](guides/export-msproject.md) und [Primavera P6](guides/export-primavera.md) Export/Import-Services (*exportToMSProject*, *importFromMSProject*, *exportToPrimaveraP6*, *importFromPrimaveraP6*). **Maximale Anfragegröße: 40 MB**.

Der Endpunkt kann über die **server**-Eigenschaft im Export-Konfigurationsobjekt festgelegt werden:

~~~js
gantt.importFromMSProject({
    server:"https://export.dhtmlx.com/gantt",
    data: file,
    callback: function(project){
       // some logic
    }
}); 
~~~

Wenn kein Endpunkt angegeben wird, wird standardmäßig <b>*https://export.dhtmlx.com/gantt*</b> verwendet. Der folgende Aufruf ist gleichwertig:

~~~js
gantt.importFromMSProject({
    data: file,
    callback: function(project){
       // some logic
    }
});
~~~

Für den Export oder Import großer Projekte, die das 4-MB-Limit überschreiten, verwenden Sie den zweiten Endpunkt:

~~~js
gantt.importFromMSProject({
    server:"https://export.dhtmlx.com/gantt/project",
    data: file,
    callback: function(project){
       // some logic
    }
}); 
~~~

Dieser Endpunkt unterstützt Anfragen bis zu 40 MB und ist für MS Project Exporte und Importe vorgesehen. Er kann nur für MS Project Exporte verwendet werden.

Andere Methoden wie *gantt.exportToPDF((server:"https://export.dhtmlx.com/gantt/project"))* führen zu einem Serverfehler.

## dhtmlxGantt vs MS Project Zeitberechnung

Es gibt wesentliche Unterschiede darin, wie dhtmlxGantt und MS Project Datumsberechnungen durchführen, was zu unterschiedlichen Ergebnissen führen kann.

Diese Unterschiede hängen von der Kombination der verwendeten Gantt-Konfigurationen ab. Einige Einstellungen in Gantt beeinflussen die Berechnungsergebnisse:

1. Die Umrechnung der Dauer unterscheidet sich zwischen dhtmlxGantt und [MS Project](https://blog.epmainc.com/start-and-end-date-do-not-align-task-duration/).

Dies kann durch Angabe von *HoursPerDay* und *MinutesPerDay* während des Exports zu MS Project gelöst werden:

~~~js
gantt.exportToMSProject({
    project: {
        HoursPerDay: function () {
            return 24;
        },
        MinutesPerDay: function () {
            return 24 * 60;
        }
    }
});
~~~

**Related example:** [Export to MSProject without the "work_time" settings](https://snippet.dhtmlx.com/92fje5jq)

2. Das Projekt hat möglicherweise die [work_time](guides/working-time.md)-Einstellung deaktiviert:

~~~js
gantt.config.work_time = false;
~~~

Beachten Sie, dass Gantt auch bei deaktivierten Arbeitszeitberechnungen weiterhin die Standardkalendereinstellungen (8 Stunden pro Tag, Montag bis Freitag Arbeitswoche) verwendet. Der Export-Client sendet diesen Standardkalender immer an MS Project, wodurch MS Project die Aufgabendauern anders berechnet.

Eine Lösung besteht darin, den Standardkalender zu leeren, sodass die Aufgabendauern in Gantt und MS Project gleich berechnet werden:

~~~js
gantt.setWorkTime({day:0, hours:[0,24]});
gantt.setWorkTime({day:1, hours:[0,24]});
gantt.setWorkTime({day:2, hours:[0,24]});
gantt.setWorkTime({day:3, hours:[0,24]});
gantt.setWorkTime({day:4, hours:[0,24]});
gantt.setWorkTime({day:5, hours:[0,24]});
gantt.setWorkTime({day:6, hours:[0,24]});
~~~

3. Es können Unterschiede bei den Datumsangaben von Sammelvorgängen auftreten, wenn [gantt.config.duration_unit](api/config/duration_unit.md) auf "day" gesetzt ist:

~~~js
gantt.config.duration_unit = "day";
~~~

In dieser Konfiguration rundet Gantt Dauern auf ganze Tage, während MS Project Bruchteil-Dauern anzeigt. Zum Beispiel kann eine Projektdauer in Gantt 439 Tage betragen, in MS Project jedoch 438,58.

Die Lösung besteht darin, die [duration_unit](api/config/duration_unit.md) auf Stunden umzustellen:

~~~js
gantt.config.duration_unit = "hour";
~~~

**Related example:** [Export to MSProject without the "work_time" settings](https://snippet.dhtmlx.com/92fje5jq)

