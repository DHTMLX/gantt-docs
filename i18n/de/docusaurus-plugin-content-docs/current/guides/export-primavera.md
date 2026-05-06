---
title: "Export und Import aus Primavera P6"
sidebar_label: "Export und Import aus Primavera P6"
---

# Export und Import aus Primavera P6

Die dhtmlxGantt-Bibliothek ermöglicht das Exportieren von Daten aus dem Gantt-Diagramm nach Primavera P6. Sie können außerdem Daten aus Primavera P6 in Gantt importieren.

:::note
Der Dienst ist kostenlos, aber die Ausgabedatei enthält unter der GPL-Lizenz das Wasserzeichen der Bibliothek. Falls Sie eine Lizenz erwerben, steht das Exportergebnis während des gültigen Supportzeitraums (12 Monate für alle PRO-Lizenzen) ohne Wasserzeichen zur Verfügung.
:::

Es gibt mehrere Exportdienste. Sie können sie lokal auf Ihrem Computer installieren und das Gantt-Diagramm lokal nach Primavera P6 exportieren. Beachten Sie, dass Exportdienste nicht im Gantt-Paket enthalten sind; lesen Sie den [entsprechenden Artikel], um die Nutzungsbedingungen jedes einzelnen Dienstes zu erfahren.

## Einschränkungen des Online-Exportdienstes

:::note
Der Exportdienst hat Zeit- und Größenbeschränkungen für Anfragen.
:::

### Zeitlimits

Falls der Prozess länger als 20 Sekunden dauert, wird der Export abgebrochen und folgender Fehler tritt auf:

~~~html
Error: Timeout trigger 20 seconds
~~~

Wenn mehrere Personen gleichzeitig Gantt exportieren, kann der Prozess länger dauern als üblich. Das ist jedoch unproblematisch, da die für einen bestimmten Benutzer aufgewendete Exportanforderung separat gezählt wird.

### Begrenzung der Anfragengröße

Es gibt einen gemeinsamen API-Endpunkt `https://export.dhtmlx.com/gantt`, der alle Exportmethoden bedient (*exportToPDF*, *exportToPNG*, *exportToMSProject*, etc.). **Maximale Anfragengröße ist 10 MB**.

Es gibt zudem einen separaten API-Endpunkt `https://export.dhtmlx.com/gantt/project`, der speziell für die [MSProject](guides/export-msproject.md) und 
[Primavera P6](#limits-on-request-size-and-import-of-large-files) 
Export/Import-Dienste (*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6* nur). **Maximale Anfragengröße: 40 MB**.

## Verwendung von Export-Modulen

:::note
Wenn Sie große Diagramme exportieren müssen, können Sie ein [Standalone-Exportmodul](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) verwenden. 
Das Exportmodul ist kostenlos, wenn Sie Gantt unter einer der Lizenzen [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) oder [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) erworben haben, oder Sie können das Modul auch [separat kaufen](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210).
:::

[Weitere Informationen zur Nutzung des Exportmoduls für MS Project lesen](guides/msp-export-module.md). Dieses Exportmodul bietet Export/Import-Funktionalität für MS Project und 
Primavera P6.

## Export nach Primavera P6 {#exporttoprimaverap6}

Die Gantt-Komponente ermöglicht das Exportieren von Verknüpfungen, Aufgaben und Ressourcen nach Primavera P6.

Um Daten aus dem Gantt-Diagramm nach Primavera P6 zu exportieren, führen Sie Folgendes aus:

- Um die Export/Import-Funktionalität zu verwenden, aktivieren Sie das <b>export_api</b>-Plugin über die [Plugins](api/method/plugins.md)-Methode:

~~~js
gantt.plugins({
    export_api: true
});
~~~

Dadurch können Sie entweder den Online-Exportdienst oder ein lokales Exportmodul verwenden.

:::note
Wenn Sie eine Gantt-Version älter als 8.0 verwenden, müssen Sie `https://export.dhtmlx.com/gantt/api.js` auf Ihrer Seite einbinden, um die Exportfunktionalität zu aktivieren, z.B.:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- Rufen Sie die Methode [exportToPrimaveraP6()](api/method/exporttoprimaverap6.md) auf, um Daten aus dem Gantt-Diagramm zu exportieren.

~~~js
gantt.exportToPrimaveraP6();
~~~

Die Methode sendet eine Anfrage an den Remote-Service, der entweder eine XML-Projekt-Datei ausgibt oder eine URL zum Herunterladen einer generierten Datei zurückgibt.

**Zugehöriges Beispiel**: [Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)

Beachten Sie, dass beim Export von Daten nach Primavera Sie für die Eigenschaft **Summary** des Projekts true zurückgeben müssen, damit diese Funktion korrekt funktioniert:

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

**Zugehöriges Beispiel**: [Custom properties for WBS tasks (PrimaveraP6's Summary tasks)](https://snippet.dhtmlx.com/r90hjlvo?tag="gantt")

### Exporteinstellungen

Die Methode **exportToPrimaveraP6()** nimmt als Parameter ein Objekt mit mehreren Eigenschaften (alle Eigenschaften sind optional):

- **name** - (string) der Name der erhaltenen Datei ('gantt.xml' standardmäßig).

~~~js
gantt.exportToPrimaveraP6({
    name:'custom.xml'
});
~~~

- **auto_scheduling** - (boolean) gibt den Planungsmodus für Aufgaben im exportierten Projekt an. **true** markiert Aufgaben als auto geplant, **false** markiert Aufgaben als manuell geplant (Standardzustand).

~~~js
gantt.exportToPrimaveraP6({
    auto_scheduling: false
});
~~~

- **skip_circular_links** - (boolean) gibt an, ob zirkuläre Verknüpfungen entfernt werden sollen (true – werden entfernt (Standardmodus), false – werden nicht entfernt).

~~~js
gantt.exportToPrimaveraP6({
    skip_circular_links: false
});
~~~

- **project** - (object) ermöglicht das Festlegen benutzerdefinierter Eigenschaften des exportierten Projekt-Objekts

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

Die Eigenschaften dieses Objekts entsprechen den entsprechenden Eigenschaften der [Project entity](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)). Die Liste der unterstützten Eigenschaften finden Sie [hier](guides/properties.md). Die Eigenschaften können feste Werte oder Funktionen enthalten, die beim Aufruf des Exports ausgeführt werden.

- **tasks** - (object) ermöglicht das Festlegen benutzerdefinierter Eigenschaften für die exportierten Task-Einträge

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

Die Eigenschaften dieses Objekts entsprechen den entsprechenden Eigenschaften der [Task entity](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)), hier finden Sie eine Liste der unterstützten [Eigenschaften](guides/properties.md#tasks-properties). Die Eigenschaften können feste Werte oder Funktionen enthalten, die für jeden Datensatz beim Export aufgerufen werden.

- **data** - (object) ermöglicht das Festlegen einer benutzerdefinierten Datenquelle, die in der Output-Gantt-Diagramm angezeigt wird.

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

gantt.exportToPrimaveraP6({
    data: customData
});
~~~

**Zugehöriges Beispiel**: [Gantt. Export benutzerdefinierter Daten](https://snippet.dhtmlx.com/10ytgdxs)

- **callback** - (function) Wenn Sie eine URL zum Herunterladen einer generierten XML-Datei erhalten möchten, kann die *callback*-Eigenschaft verwendet werden. Sie erhält ein JSON-Objekt mit der Eigenschaft *url*:

~~~js
gantt.exportToPrimaveraP6({
    callback: function(res){
        alert(res.url);
    }
});
~~~
 
- **resources** - (array) ermöglicht das Exportieren der Liste von Ressourcen in eine Primavera P6-Datei

~~~js
gantt.exportToPrimaveraP6({
    resources: [
        { "id": "1", "name": "John", "type": "work" },
        { "id": "2", "name": "Mike", "type": "work" },
        { "id": "3", "name": "Anna", "type": "work" }
    ]
});
~~~

Mögliche Ressourcentypen sind "work", "cost", "material". Zuweisungen von Ressourcen werden über die Eigenschaft **ResourceAssignments** der Aufgaben-Konfiguration festgelegt:

~~~js {23-25}
var users = [// resources
    { key: '0', label: "N/A" },
    { key: '1', label: "John" },
    { key: '2', label: "Mike" },
    { key: '3', label: "Anna" }
];

gantt.exportToPrimaveraP6({
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

Die **ResourceAssignments**-Eigenschaft ist als Funktion definiert, die das Task-Objekt als Parameter entgegennimmt und entweder einen String/Number-Wert oder ein Array von Strings/Numbers zurückgibt:

~~~js
tasks: {
    ResourceAssignments: function(task){
        return [task.user, task.office];
    }
}
~~~

**Zugehöriges Beispiel**: [Export Gantt mit Ressourcen nach Primavera P6](https://snippet.dhtmlx.com/6bfbwp8g)

Es ist möglich, den Parameter *units* für ResourceAssignments durch Zurückgabe des folgenden Objekts in der **ResourceAssignments**-Eigenschaft festzulegen:

~~~js
{
    resource_id: "id",
    units: "units value"
}
~~~

- **resource calendars**

Standardmäßig hat jede Aufgabe einen Kalender. Wenn die Ressourcenkalender verwendet werden, müssen Sie -1 für eine Aufgabe in der 
*CalendarUID*-Eigenschaft während des Exports angeben (im Objekt [tasks](#export-settings)) . Dann verwendet die Aufgabe den Ressourcen-Kalender.

Beim Export von [Resource Calendars](api/config/resource_calendars.md) ist es möglich, den Ressourcen-Kalender in einem Objekt des Arrays [resources](#export-settings) anzugeben: 

~~~js
gantt.exportToPrimaveraP6({
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


- **server** - (string) der API-Endpunkt für die Anforderung. Kann mit der lokalen Installation des Exportdienstes verwendet werden. Der Standardwert ist `https://export.dhtmlx.com/gantt`.

~~~js
gantt.exportToPrimaveraP6({
    server: "https://myapp.com/myexport/gantt"
});
~~~

## Import aus Primavera P6

Um eine XML- oder XER-Datei zu konvertieren, senden Sie die folgende Anfrage an den Exportdienst:

 - Request URL - `https://export.dhtmlx.com/gantt`
 - Request Method - **POST**
 - Content-Type - **multipart/form-data**

Die Request-Parameter sind:

 - **file** - eine XER- oder XML-Datei von Primavera P6
 - **type** - "primaveraP6-parse"
 - **data** - (*optional*) ein JSON-String mit Einstellungen

Zum Beispiel:

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="primaveraP6-parse">
    <button type="submit">Get</button>
</form>
~~~

Alternativ können Sie die [client-side API](api/method/importfromprimaverap6.md) verwenden, wie hier:

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


**Zugehöriges Beispiel**: [Import Primavera P6-Datei](https://docs.dhtmlx.com/gantt/samples/08_api/18_load_from_primaverap6.html)


Wobei *file* eine Instanz von [File](https://developer.mozilla.org/en-US/docs/Web/API/File) ist und entweder eine XML- oder XER-Project-Datei enthalten sollte.

:::note
**gantt.importFromPrimaveraP6** erfordert Unterstützung der HTML5 File API.
:::

### Response

Die Antwort enthält JSON mit folgender Struktur:

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
Dates werden im Format "%Y-%m-%d %H:%i" als Strings angegeben. 
- **config** - (*object*) ein Gantt [Configuration](api/overview/properties-overview.md)-Objekt mit aus der Projektdatei stammenden Einstellungen.
- **resources** - (*array*) ein Array von Objekten (jeweils mit den Eigenschaften: 
(*id: string, name: string, type: string, calendar: string*)), das die Liste der Ressourcen aus der Projektdatei repräsentiert.
- **worktime** - (*object*) ein Objekt, das die Arbeitszeit-Einstellungen aus dem Projektkalender enthält. Es kann die folgenden Attribute enthalten:
   - **id** - (*string | number*) optional, die Kalender-ID
   - **hours** - (*array*) ein Array mit globalen Arbeitszeiten, setzt die Start- und Endzeiten der Aufgabe
    - **dates** - (*array*) ein Array von Daten, das Folgendes enthalten kann:
        - 7 Tage der Woche (von 0 - Sonntag bis 6 - Samstag), wobei 1/true für einen Arbeitstag steht und 0/false für einen Nicht-Arbeitstag
        - andere Datensätze sind Daten 
- **calendars** - (*array*) ein Array mit Kalenderkonfigurationsobjekten zur Erstellung eines neuen Kalenders. 
    - **calendarConfig** - (*object*) ein Kalender-Konfigurationsobjekt, das folgende Attribute enthalten kann:
      - **id** - (*string | number*) optional, die Kalender-ID
      - **name** - (*string*) der Kalendername
      - **hours** - (*array*) ein Array mit globalen Arbeitszeiten, setzt die Start- und Endzeiten der Aufgabe
      - **dates** - (*array*) ein Array von Daten, das Folgendes enthalten kann:
            - 7 Tage der Woche (von 0 - Sonntag bis 6 - Samstag), wobei 1/true für einen Arbeitstag steht und 0/false - ein Nicht-Arbeitstag
            - andere Datensätze sind Daten

### Import-Einstellungen

#### Festlegung der Dauer-Einheit

Um eine erwartete Dauer-Einheit festzulegen, kann der **durationUnit**-String ("minute", "hour", "day", "week", "month", "year") auch an den Server gesendet werden.

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

#### Abrufen von Eigenschaften des Projekts

Um Felder des Projekts abzurufen, kann die Eingabe **projectProperties** mit einem Array der benötigten Felder an den Server gesendet werden.
Sie extrahiert beliebige Eigenschaften der [Project entity](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)) in die **config**-Eigenschaft der Ausgabe. Hier ist die Liste der unterstützten [Eigenschaften](guides/properties.md#project-properties).

 - **projectProperties** - gibt ein Array von Projekt-Eigenschaften an, die in die Antwort aufgenommen werden sollen.

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

#### Abrufen von Aufgaben-Eigenschaften

Um Felder der Aufgaben abzurufen, kann die Eingabe **taskProperties** mit einem Array der benötigten Felder an den Server gesendet werden.
Sie extrahiert beliebige Eigenschaften der [Task entities](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)). Hier ist die Liste der unterstützten [Eigenschaften](guides/properties.md#tasks-properties):

 - **taskProperties** - geben Sie ein Array zusätzlicher Aufgaben-Eigenschaften an, die importiert werden sollen.

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

#### Abholen von Aufgabentypen

Die folgende Logik ermöglicht das Erhalten des Aufgabentyps: Aufgaben des Typs Project haben die Eigenschaft Summary: "1" und Aufgaben des Typs Milestone haben die Eigenschaft Milestone: "1". Wir müssen die Daten mit diesen Eigenschaften importieren und dann den Aufgabentyp basierend auf diesen Eigenschaften setzen.

Der Aufruf der Import-Funktion sieht wie folgt aus:

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

Anschließend können Sie die Typen der Aufgaben anhand der erhaltenen Eigenschaften wie folgt konvertieren:

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

**Zugehöriges Beispiel**: [Gantt. Import Primavera P6-Dateien. Aufgabentyp aus Eigenschaften abrufen](https://snippet.dhtmlx.com/y95rsxor)

#### Hinzufügen und Anpassen von Kalendern

Beachten Sie, dass Kalender beim Import nicht automatisch hinzugefügt werden. Sie müssen sie mit der Methode [addCalendar()](api/method/addcalendar.md) hinzufügen. 
Danach sollten Sie die Kalendereinstellungen über die Methode [setWorkTime()](api/method/setworktime.md) festlegen. Zum Beispiel:

~~~js
gantt.importFromPrimaveraP6({
    data: file,
    taskProperties: ["Notes", "Name"],
    callback: function (project) {
        if (project) {
            // Einstellungen zum Hinzufügen von Kalendern
            project.calendars.forEach(function (calendar) {
                let addedCalendar;
                // Arbeitszeiteinstellungen für den globalen Kalender hinzufügen
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

**Zugehöriges Beispiel**: [Gantt. Kalendereinstellungen für Export/Import in MSProject und Primavera P6](https://snippet.dhtmlx.com/668xqts7)

#### Ressourcenkalender

Wenn es Ressourcenkalender gibt, müssen Sie diese über die Eigenschaft [gantt.config.resource_calendars](api/config/resource_calendars.md) festlegen:

~~~js
gantt.importFromPrimaveraP6({
    data: file,
    taskProperties: ["Notes", "Name"],
    callback: function (project) {
        if (project) {
            // Kalendereinstellungen
            project.calendars.forEach(function (calendar) {
                // Kalender hinzufügen und Arbeitszeiteinstellungen setzen
            })

            // Einstellungen für Ressourcenkalender
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

**Zugehöriges Beispiel**: [Gantt. Ressourcenkalender-Einstellungen für Export/Import in MSProject und Primavera P6](https://snippet.dhtmlx.com/10czv54b)

#### Ressourcen und Ressourcen-Zuweisungen

Wenn es Ressourcen in der Datei gibt, gelangen sie beim Import in das Array **resources**. Der Parameter *calendar* des 
Eigenschaftsobjekts **resources** gibt den Ressourcen-Kalender an:

~~~js
{
    resources: [
        { id: 6, name: "John", type: "work", calendar: "8" },
        // weitere Ressourcen
    ]
}
~~~

Falls es Ressourcen-Zuweisungen gibt, werden sie im Array **assignments** importiert, wobei das Zuweisungsobjekt die Parameter *resource_id: string* und *value: number* enthält. Zum Beispiel:

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
        // weitere Zuweisungen
    ],
    resources: [
        { id: 6, text: "John", unit: "hours/day" },
        { id: 7, text: "Mike", unit: "hours/day" },
        // weitere Ressourcen
    ]
}
~~~

## Grenzen bei der Anfragengröße und Import großer Dateien

Es gibt zwei API-Endpunkte für die Primavera P6 Export/Import-Dienste:

- `https://export.dhtmlx.com/gantt` - der Standard-Endpunkt, der alle Exportmethoden bedient (*exportToPDF*, *exportToPNG*, *exportToPrimaveraP6*, etc.). **Maximale Anfragengröße 10 MB**.
- `https://export.dhtmlx.com/gantt/project` - der Endpunkt, der speziell für die [MSProject](guides/export-msproject.md) und 
[Primavera P6](guides/export-primavera.md) 
Export/Import-Dienste (*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6* nur). **Maximale Anfragengröße: 40 MB**.

Der Endpunkt kann durch die Eigenschaft **server** des Export-Konfigurationsobjekts festgelegt werden:

~~~js
gantt.importFromPrimaveraP6({
    server: "https://export.dhtmlx.com/gantt",
    data: file,
    callback: function(project){
       // some logic
    }
}); 
~~~

Wenn kein Endpunkt angegeben wird, gilt standardmäßig `https://export.dhtmlx.com/gantt`. Der folgende Aufruf entspricht dem oben Gezeigten:

~~~js
gantt.importFromPrimaveraP6({
    data: file,
    callback: function(project){
       // some logic
    }
});
~~~

Um große Projekte zu exportieren oder zu importieren, die die 4 MB-Grenze überschreiten, kann der zweite Endpunkt verwendet werden:

~~~js
gantt.importFromPrimaveraP6({
    server: "https://export.dhtmlx.com/gantt/project",
    data: file,
    callback: function(project){
       // some logic
    }
}); 
~~~

Dieser Endpunkt ermöglicht das Senden von Anfragen bis zu 40 MB und unterstützt Primavera P6 Exporte und Importe. Er kann ausschließlich für Primavera P6-Exporte verwendet werden. 

Andere Methoden, zum Beispiel `gantt.exportToPDF({server:"https://export.dhtmlx.com/gantt/project"})`, sollten dagegen einen Serverfehler zurückgeben.