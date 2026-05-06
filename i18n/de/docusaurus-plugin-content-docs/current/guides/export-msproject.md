---
title: "Export und Import aus MS Project"
sidebar_label: "Export und Import aus MS Project"
---

# Export und Import aus MS Project

Die dhtmlxGantt-Bibliothek ermöglicht es, Daten aus dem Gantt-Diagramm nach MS Project zu exportieren. Sie können außerdem Daten aus MS Project in den Gantt importieren.

:::note
Der Dienst ist kostenlos, aber die Ausgabedatei enthält das Wasserzeichen der Bibliothek unter der GPL-Lizenz. 
Wenn Sie eine Lizenz erwerben, ist das Export-Ergebnis während der gültigen Supportdauer (12 Monate für alle PRO-Lizenzen) watermarkfrei verfügbar.
:::

Es gibt mehrere Exportdienste. Sie können sie auf Ihrem Computer installieren und das Gantt-Diagramm lokal nach MS Project exportieren.
Beachten Sie, dass Exportdienste nicht im Gantt-Paket enthalten sind; lesen Sie den [entsprechenden Artikel](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml), um die Nutzungsbedingungen jedes Dienstes zu erfahren.

## Einschränkungen des Online-Exportdienstes

:::note
Der Exportdienst hat Zeit- und Größenbeschränkungen der Anfragen.
:::

### Zeitbegrenzungen

Wenn der Prozess länger als 20 Sekunden dauert, wird der Export abgebrochen und folgender Fehler erscheint:

~~~html
Error: Timeout trigger 20 seconds
~~~

Wenn mehrere Personen gleichzeitig Gantt exportieren, kann der Prozess länger dauern als üblich. Das ist jedoch in Ordnung, da die für eine Exportanfrage eines bestimmten Benutzers aufgewendete Zeit separat gezählt wird.

### Beschränkungen der Anfragegröße

Es gibt einen gemeinsamen API-Endpunkt `https://export.dhtmlx.com/gantt`, der alle Exportmethoden bedient (*exportToPDF*, *exportToPNG*, *exportToMSProject*, etc.). Die maximale Anfragesgröße beträgt **10 MB**.

Es gibt auch einen separaten API-Endpunkt `https://export.dhtmlx.com/gantt/project`, der speziell für die [MSProject](#limits-on-request-size-and-import-of-large-files) und 
[Primavera P6](guides/export-primavera.md) Export-/Import-Services (*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6* nur). **Maximale Anfragesgröße: 40 MB**.

## Verwendung von Exportmodulen

:::note
Wenn Sie große Diagramme exportieren müssen, können Sie ein [Standalone-Exportmodul](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) verwenden. 
Das Exportmodul ist kostenlos, wenn Sie Gantt unter einer Lizenz [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) oder [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) erworben haben, oder Sie können das Modul separat [kaufen](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210).
:::

[Read more on the usage of the export module for MS Project](guides/msp-export-module.md). 


## Export nach MS Project

Die Gantt-Komponente ermöglicht das Exportieren von Verknüpfungen, Aufgaben und Ressourcen nach MS Project.

Um Daten vom Gantt-Diagramm nach MS Project zu exportieren, führen Sie Folgendes aus:

- Um die Export-/Import-Funktionalität zu verwenden, aktivieren Sie das <b>export_api</b>-Plugin über die [plugins](api/method/plugins.md) Methode:

~~~js
gantt.plugins({
    export_api: true
});
~~~

Dadurch können Sie entweder den Online-Exportdienst oder ein lokales Exportmodul verwenden.

:::note
Wenn Sie eine Gantt-Version verwenden, die älter als 8.0 ist, müssen Sie `https://export.dhtmlx.com/gantt/api.js` in Ihre Seite einbinden, um die Export-Funktionalität zu aktivieren, z. B.:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- Rufen Sie die [exportToMSProject](api/method/exporttomsproject.md) Methode auf, um Daten aus dem Gantt-Diagramm zu exportieren.

~~~js
gantt.exportToMSProject();
~~~

Die Methode sendet eine Anfrage an den Remote-Dienst, der entweder eine XML-Project-Datei erzeugt oder eine URL zum Download einer generierten Datei zurückgibt.



**Zugehöriges Beispiel**: [Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)


### Export-Einstellungen

Die **exportToMSProject()**-Methode nimmt als Parameter ein Objekt mit mehreren Eigenschaften (alle Eigenschaften sind optional):

- **name** - (string) der Name der erhaltenen Datei ('gantt.xml' standardmäßig).

~~~js
gantt.exportToMSProject({
    name:'custom.xml'
});
~~~

- **auto_scheduling** - (boolean) gibt den Planungsmodus der Aufgaben im exportierten Projekt an. **true** kennzeichnet Aufgaben als automatisch geplant, **false** als manuell geplant (der Standardzustand).

~~~js
gantt.exportToMSProject({
    auto_scheduling: false
});
~~~

- **skip_circular_links** - (boolean) gibt an, ob zirkuläre Verknüpfungen entfernt werden sollen oder nicht (true - werden entfernt (Standardmodus), false - werden nicht entfernt).

~~~js
gantt.exportToMSProject({
    skip_circular_links: false
});
~~~

- **project** - (object) ermöglicht das Festlegen benutzerdefinierter Eigenschaften für die exportierte Project-Entität

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

Die Eigenschaften dieses Objekts entsprechen den entsprechenden Eigenschaften der [Project entity](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)).
Die Liste der unterstützten Eigenschaften finden Sie [hier](guides/tags.md). Die Eigenschaften können entweder feste Werte oder Funktionen enthalten, die beim Aufruf des Exports ausgeführt werden.

- **tasks** - (object) ermöglicht das Festlegen benutzerdefinierter Eigenschaften für die exportierten Aufgaben
 
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

Die Eigenschaften dieses Objekts entsprechen den entsprechenden Eigenschaften der [Task entity](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)), 
hier ist eine Liste der unterstützten [Eigenschaften](guides/tags.md#tasks-properties).
Die Eigenschaften können entweder feste Werte oder Funktionen enthalten, die für jede Aufgabe im Datensatz beim Export aufgerufen werden.

- **data** - (object) ermöglicht das Festlegen einer benutzerdefinierten Datenquelle, die im output Gantt-Diagramm dargestellt wird

:::note
Es wird erwartet, dass die Eigenschaften **start_date** und **end_date** im Format angegeben werden, das Datum und Uhrzeit enthält (*%d-%m-%Y %H:%i*).
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

**Zugehöriges Beispiel**: [Gantt. Export benutzerdefinierter Daten](https://snippet.dhtmlx.com/10ytgdxs)

- **callback** - (function) Wenn Sie eine URL zum Herunterladen einer generierten XML-Datei erhalten möchten, kann die *callback*-Eigenschaft verwendet werden. Sie erhält ein JSON-Objekt mit der *url*-Eigenschaft:

~~~js
gantt.exportToMSProject({
    callback: function(res){
        alert(res.url);
    }
});
~~~
 
- **resources** - (array) ermöglicht das Exportieren der Liste von Ressourcen in eine MS Project-Datei

~~~js
gantt.exportToMSProject({
    resources: [
        { "id": "1", "name": "John", "type": "work" },
        { "id": "2", "name": "Mike", "type": "work" },
        { "id": "3", "name": "Anna", "type": "work" }
    ]
});
~~~

Mögliche Ressourcentypen sind "work", "cost", "material". Ressourcen-Zuweisungen werden mit der **ResourceAssignments**-Eigenschaft der Aufgaben-Konfiguration festgelegt:

~~~js {23-25}
var users = [// resources
    { key:'0', label: "N/A" },
    { key:'1', label: "John" },
    { key:'2', label: "Mike" },
    { key:'3', label: "Anna" }
];

gantt.exportToMSProject({
  resources: users
     .filter(function(u){
        if(u.key === '0')//skip the default option 
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
     ResourceAssignments: function(task){  
        return task.user;                   
     }                                       
  }
});
~~~

Die **ResourceAssignments**-Eigenschaft wird als Funktion festgelegt, die das Aufgaben-Objekt als Parameter entgegennimmt und entweder einen String/Number-Wert oder ein Array aus String/Number-Werten zurückgibt:

~~~js
tasks: {
    ResourceAssignments: function(task){
        return [task.user, task.office];
    }
}
~~~

Es ist möglich, den *units*-Parameter für Ressourcen-Zuweisungen festzulegen, indem das folgende Objekt in der **ResourceAssignments**-Eigenschaft zurückgegeben wird:

~~~js
{
    resource_id: "id",
    units: "units value"
}
~~~

- **resource calendars**

Standardmäßig hat jede Aufgabe einen Kalender zugeordnet. Wenn Ressourcen-Kalender verwendet werden, muss -1 für eine Aufgabe in der 
KalenderUID-Eigenschaft während des Exports angegeben werden (im [tasks]-Objekt). Dann verwendet die Aufgabe den Ressourcen-Kalender.

Beim Exportieren von [Resource calendars](api/config/resource_calendars.md) ist es möglich, den Ressourcen-Kalender in einem Objekt des [resources]-Arrays anzugeben: 

~~~js
gantt.exportToMSProject({
  resources: [
    {
      id: "10",
      name: "John",
      type: "work",
      calendar: gantt.config.resource_calendars[10]
    }
  ]
});    
~~~

- **server** - (string) der API-Endpunkt für die Anfrage. Kann mit der lokalen Installation des Exportdienstes verwendet werden. Der Standardwert ist `https://export.dhtmlx.com/gantt`.

~~~js
gantt.exportToMSProject({
    server: "https://myapp.com/myexport/gantt"
});
~~~

## Import aus MS Project

Um eine XML- oder MPP-MS-Project-Datei zu konvertieren, müssen Sie die folgende Anfrage an den Exportdienst senden:

 - Request URL - `https://export.dhtmlx.com/gantt`
 - Request Method - **POST**
 - Content-Type - **multipart/form-data**

Die Request-Parameter lauten:

 - **file** - eine MPP- oder XML-MS-Project-Datei
 - **type** - "msproject-parse"
 - **data** - (*optional*) ein JSON-String mit Einstellungen

Zum Beispiel:

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

Oder verwenden Sie alternativ die [client-side API](api/method/importfrommsproject.md), wie hier:

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


**Zugehöriges Beispiel**: [Import MS Project file](https://docs.dhtmlx.com/gantt/samples/08_api/18_load_from_mpp.html)


Wobei *file* eine Instanz von [File](https://developer.mozilla.org/en-US/docs/Web/API/File) ist, die entweder eine XML- oder eine MPP-Project-Datei enthalten sollte.

:::note
**gantt.importFromMSProject** erfordert HTML5 File API-Unterstützung.
:::


### Antwort

Die Antwort enthält eine JSON-Struktur wie folgt:

~~~js
{
   data: {},
   config: {},
   resources: [],
   worktime: {},
   calendars: []
}
~~~

 
- **data** - (*object*) ein Gantt [data object](guides/supported-data-formats.md). Jede Aufgabe besitzt folgende Eigenschaften: *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource*. 
Dates werden als Strings im Format "%Y-%m-%d %H:%i" dargestellt. 
- **config** - (*object*) ein Gantt [Configuration](api/overview/properties-overview.md) Objekt mit Einstellungen, die aus der Projektdatei abgerufen wurden.
- **resources** - (*array*) ein Array von Objekten (jedes mit folgenden Eigenschaften: (*id: string, name: string, type: string, calendar: string*) 
die die Ressourcenliste aus der Projektdatei repräsentieren.
- **worktime** - (*object*) ein Objekt mit den Arbeitseinstellungen aus dem Projektkalender. Es kann folgende Attribute enthalten:
    - **id** - (*string | number*) optional, die Kalender-ID
    - **hours** - (*array*) ein Array mit globalen Arbeitszeiten, setzt An- und Endstunden der Aufgabe
    - **dates** - (*array*) ein Array von Daten, die Folgendes enthalten können:
        - 7 Wochentage (von 0 - Sonntag bis 6 - Samstag), wobei 1/wahr für einen Arbeitstag und 0/ falsch für einen Nicht-Arbeitstag steht
        - andere Einträge sind Daten 
- **calendars** - (*array*) ein Array, das Kalender-Konfigurationsobjekte zum Erstellen eines neuen Kalenders enthält. 
    - **calendarConfig** - (*object*) ein Kalender-Konfigurationsobjekt, das folgende Attribute enthalten kann:
        - **id** - (*string | number*) optional, die Kalender-ID
        - **name** - (*string*) der Kalendername
        - **hours** - (*array*) ein Array mit globalen Arbeitszeiten, setzt An- und Endstunden der Aufgabe
        - **dates** - (*array*) ein Array von Daten, das Folgendes enthalten kann:
            - 7 Tage der Woche (von 0 - Sonntag bis 6 - Samstag), wobei 1/wahr für einen Arbeitstag steht und 0/falsch für einen Nicht-Arbeitstag
            - andere Einträge sind Daten
  
### Import-Einstellungen

#### Festlegen der Dauer-Einheit

Um eine erwartete Dauer-Einheit festzulegen, kann der String der Dauer-Einheit **durationUnit** ("minute", "hour", "day", "week", "month", "year") auch an den Server gesendet werden.

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

#### Abfragen von Projektdaten

Um Felder des Projekts zu erhalten, kann der Input **projectProperties** mit einem Array der benötigten Felder an den Server gesendet werden.
Es extrahiert beliebige Eigenschaften der [Project entity](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12))
in die **config**-Eigenschaft der Ausgabe.
Hier ist die Liste der unterstützten [Eigenschaften](guides/tags.md#project-properties).

 - **projectProperties** - gibt ein Array von Projekt-Eigenschaften an, die in die Antwort aufgenommen werden sollen.

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

#### Abfragen von Aufgaben-Eigenschaften

Um Feldwerte der Aufgaben abzurufen, kann der Input **taskProperties** mit einem Array der benötigten Felder an den Server gesendet werden.
Es extrahiert beliebige Eigenschaften der [Task entities](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)). Hier ist die Liste der unterstützten [Eigenschaften](guides/tags.md#tasks-properties):

 - **taskProperties** - geben Sie ein Array zusätzlicher Eigenschaften der Aufgaben an, die importiert werden sollen.


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

#### Abfragen von Aufgabentypen

Die folgende Logik erlaubt es, den Aufgabentyp zu erhalten: Aufgaben des Typs Project besitzen die Eigenschaft Summary: "1" und Aufgaben des Typs Milestone besitzen die Eigenschaft Milestone: "1". Wir müssen die Daten mit diesen Eigenschaften importieren und anschließend den Aufgabentyp anhand dieser Eigenschaften festlegen.

Der Aufruf der Import-Funktion sieht wie folgt aus:

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

Anschließend können Sie die Typen der Aufgaben basierend auf den empfangenen Eigenschaften wie folgt konvertieren:

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

**Zugehöriges Beispiel**: [Gantt. Import MSP files. Get task type from properties](https://snippet.dhtmlx.com/sjka4br8)

#### Hinzufügen und Anpassen von Kalendern

Beachten Sie, dass Kalender während des Imports nicht automatisch hinzugefügt werden. Sie müssen sie über die Methode [addCalendar()](api/method/addcalendar.md) hinzufügen. 
Danach sollten Sie Kalendereinstellungen über die Methode [setWorkTime()](api/method/setworktime.md) festlegen. Zum Beispiel:

~~~js
gantt.importFromMSProject({
    data: file,
    taskProperties: ["Notes", "Name"],
    callback: function (project) {
        if (project) {
            // Einstellungen zum Hinzufügen von Kalendern
            project.calendars.forEach(function (calendar) {
                let addedCalendar;
                // Arbeitszeiteinstellungen für den Global-Kalender hinzufügen
                if (calendar.id == project.config.global_calendar_id) {
                    addedCalendar = gantt.getCalendar("global");
                }
                else {
                    // Gantt fügt keinen Kalender hinzu
                    // wenn der `hours`-Parameter ein leeres Array ist
                    let calendarHours = calendar.hours;
                    if (!calendarHours.length) {
                        calendarHours = undefined
                    }
                    gantt.addCalendar({
                        id: calendar.id,
                        hours: calendarHours,
                        name: calendar.name
                    });

                    addedCalendar = gantt.getCalendar(calendar.id);
                }
                const worktimeDates = calendar.dates;
                for (let element in worktimeDates) {
                    const date = new Date(+element)
                    if (element < 10) {
                        addedCalendar.setWorkTime({ 
                            day: element, 
                            hours: worktimeDates[element] 
                        })
                    }
                    else {
                        addedCalendar.setWorkTime({ 
                            date: date, 
                            hours: worktimeDates[element] 
                        })
                    }
                }
            })
        }
    }
});
~~~

**Zugehöriges Beispiel**: [Gantt. Calendars settings for export/import in MSProject and Primavera6](https://snippet.dhtmlx.com/668xqts7)

#### Ressourcenkalender

Falls es Ressourcen-Kalender gibt, müssen Sie diese über die Eigenschaft [gantt.config.resource_calendars](api/config/resource_calendars.md) festlegen:

~~~js
gantt.importFromMSProject({
    data: file,
    taskProperties: ["Notes", "Name"],
    callback: function (project) {
        if (project) {
            // Kalendereinstellungen
            project.calendars.forEach(function (calendar) {
                // Das Hinzufügen der Kalender und Arbeitszeiteinstellungen
            })

            // Einstellungen für Ressourcen-Kalender
            gantt.config.resource_calendars = {}

            project.resources.forEach(function (resource) {
                if (resource.calendar) {
                    gantt.config.resource_calendars[resource.id] = resource.calendar;
                }
            })
        }
    }
});
~~~

**Zugehöriges Beispiel**: [Gantt. Resource calendars settings for export/import in MSProject and Primavera6](https://snippet.dhtmlx.com/10czv54b)

#### Ressourcen und Ressourcen-Zuweisungen

Wenn es Ressourcen in der Datei gibt, kommen sie im Array **resources** während des Imports vor. Der Parameter *calendar* des 
Eigenschaftsblocks **resources** gibt den Ressourcen-Kalender an:

~~~js
{
    resources: [
        { id: 6, name: "John", type: "work", calendar: "8" },
        // weitere Ressourcen
    ]
}
~~~

Wenn es Ressourcen-Zuweisungen gibt, werden diese im Array **assignments** importiert, wobei das Zuweisungsobjekt die Parameter *resource_id: string* und *value: number* enthält. Beispielsweise:

~~~js
{
    tasks: [
        {
            id: 5,
            text: "Interior office",
            type: "task",
            start_date: "03-04-2024 00:00",
            duration: 7,
            parent: "2",
            priority: 1
        },
        // weitere Aufgaben
    ],
    links: [],
    assignments: [
        { id: 1, task_id: 5, resource_id: 6, value: 3},
        // weitere Zuordnungen
    ],
    resources: [
        {id: 6, text: "John", unit: "hours/day" },
        {id: 7, text: "Mike", unit: "hours/day" },
        // weitere Ressourcen
    ]
}
~~~

## Grenzen der Anfragesgröße und Import von großen Dateien

Es gibt zwei API-Endpunkte für die MSProject-Export-/Import-Dienste:

- `https://export.dhtmlx.com/gantt` - der Standard-Endpunkt, der alle Exportmethoden bedient (*exportToPDF*, *exportToPNG*, *exportToMSProject*, etc.). **Maximale Anfragesgröße: 10 MB**.
- `https://export.dhtmlx.com/gantt/project` - der Endpunkt, der speziell für die [MSProject](guides/export-msproject.md) und 
[Primavera P6](guides/export-primavera.md) 
Export-/Import-Dienste bestimmt ist (*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6*). **Maximale Anfragesgröße: 40 MB**.

Der Endpunkt kann durch die Eigenschaft **server** des Export-Konfigurationsobjekts festgelegt werden:

~~~js
gantt.importFromMSProject({
    server: "https://export.dhtmlx.com/gantt",
    data: file,
    callback: function(project){
       // einige Logik
    }
}); 
~~~

Wenn kein Endpunkt angegeben ist, wird standardmäßig `https://export.dhtmlx.com/gantt` verwendet. Der folgende Aufruf entspricht dem obenstehenden:

~~~js
gantt.importFromMSProject({
    data: file,
    callback: function(project){
       // einige Logik
    }
});
~~~

Um große Projekte zu exportieren oder zu importieren, die die 4 MB-Grenze überschreiten, kann der zweite Endpunkt verwendet werden:

~~~js
gantt.importFromMSProject({
    server: "https://export.dhtmlx.com/gantt/project",
    data: file,
    callback: function(project){
       // einige Logik
    }
}); 
~~~

Er ermöglicht das Senden von Anfragen bis zu 40 MB Größe und unterstützt MS Project Exporte und Importe. Er kann nur für MS Project Exporte verwendet werden. 

Andere Methoden, z. B. `gantt.exportToPDF({server:"https://export.dhtmlx.com/gantt/project"})`, sollten einen Serverfehler zurückgeben.

## dhtmlxGantt vs MS Project Zeitberechnung

Es gibt grundlegende Unterschiede darin, wie Datumsberechnungen in dhtmlxGantt und MS Project funktionieren; in einigen Fällen führen diese Unterschiede zu unterschiedlichen Ergebnissen. 

Die Unterschiede variieren auch je nach Kombination der im Gantt verwendeten Konfigurationen. Sie können jedoch die Gantt-Einstellungen ändern, die die Berechnungsergebnisse beeinflussen können:

1. Zunächst gibt es Unterschiede bei der Dauerumrechnung zwischen dhtmlxGantt und [MS Project](https://blog.epmainc.com/start-and-end-date-do-not-align-task-duration/).

Sie können dies umgehen, indem Sie *HoursPerDay* und *MinutesPerDay* festlegen, wenn Sie den Gantt nach MS Project exportieren:

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

**Zugehöriges Beispiel**: [Export to MSProject without the "work_time" settings](https://snippet.dhtmlx.com/92fje5jq)

2. Zweitens kann Ihr Projekt die [work_time](guides/working-time.md)-Einstellung deaktiviert haben:

~~~js
gantt.config.work_time = false;
~~~

Beachten Sie, dass selbst wenn die Arbeitszeitberechnungen deaktiviert sind, der Gantt dennoch die Standardkalendereinstellungen in der Konfiguration enthält (8 Stunden pro Tag, Arbeitswoche Mo-Fr). Und unser Export-Client sendet immer den Standardkalender nach MS Project, selbst wenn die Arbeitszeit im Gantt deaktiviert ist. Daher berechnet MS Project Aufgaben-Dauern unterschiedlich.

Als Workaround können Sie den Standardkalender leeren, so dass selbst wenn er an MS Project gesendet wird, die Dauern der Aufgaben auf dieselbe Weise wie im Gantt berechnet werden:

~~~js
gantt.setWorkTime({day:0, hours:[0,24]});
gantt.setWorkTime({day:1, hours:[0,24]});
gantt.setWorkTime({day:2, hours:[0,24]});
gantt.setWorkTime({day:3, hours:[0,24]});
gantt.setWorkTime({day:4, hours:[0,24]});
gantt.setWorkTime({day:5, hours:[0,24]});
gantt.setWorkTime({day:6, hours:[0,24]});
~~~

3. Außerdem können Unterschiede zwischen Datumsangaben von Zusammenfassungs-Einträgen auftreten, wenn Sie [gantt.config.duration_unit](api/config/duration_unit.md) auf "day" gesetzt haben:

~~~js
gantt.config.duration_unit = "day";
~~~

In diesem Fall rundet der Gantt die Dauern auf die Gesamtanzahl von Tagen, MS Project tut dies jedoch nicht und zeigt Teil-Dauern an. Zum Beispiel hat das obere Projekt im Gantt eine Dauer von 439, während MS Project 438,58 anzeigt.

Der einzige Workaround besteht darin, die [duration_unit](api/config/duration_unit.md) auf Stunden umzuschalten:

~~~js
gantt.config.duration_unit = "hour";
~~~

**Zuletzt**: [Export to MSProject without the "work_time" settings](https://snippet.dhtmlx.com/92fje5jq)