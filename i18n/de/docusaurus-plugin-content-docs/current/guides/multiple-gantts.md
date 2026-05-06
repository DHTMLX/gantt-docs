--- 
title: "Mehrere Gantt-Diagramme auf einer Seite"
sidebar_label: "Mehrere Gantt-Diagramme auf einer Seite"
---

# Mehrere Gantt-Diagramme auf einer Seite

:::info
Diese Funktionalität steht in der Gantt PRO-Version unter kommerziellen Lizenzen (seit dem 6. Oktober 2021) sowie in den Lizenzen Enterprise und Ultimate zur Verfügung.
::: 

Grundsätzlich ist DHTMLX Gantt ein statisches Objekt, und die Standardinstanz existiert kontinuierlich auf der Seite. Sie können jederzeit über das globale Objekt `gantt` darauf zugreifen. Sie können bei Bedarf jedoch auch ein neues Gantt-Objekt erstellen.

## Konfiguration der Gantt-Instanz

Um eine neue Instanz von DHTMLX Gantt zu erstellen, verwenden Sie die Methode `Gantt.getGanttInstance()`:

~~~js
// Achtung, "Gantt" im Befehl beginnt mit Großbuchstabe
const ganttChart = Gantt.getGanttInstance();
~~~

Die Methode kann ein Konfigurationsobjekt als Parameter entgegennehmen:

~~~js
const ganttInstance = Gantt.getGanttInstance({
    plugins: {
        auto_scheduling: true,
    },
    container: "gantt_here",
    config: {
        work_time: true,
        duration_unit: "minute",
        auto_scheduling_compatibility: true,
        auto_scheduling: true,
        auto_scheduling_strict: true,
        auto_scheduling_initial: true,
        start_date: new Date(2027, 0, 1),
        end_date: new Date(2028, 0, 1),
    },
    calendars: [
        {
            id: "global",
            worktime: {
                hours: ["8:00-17:00"],
                days: [0, 1, 1, 1, 1, 0, 0],
                customWeeks: {
                    lastMonthOfYear: {
                        from: new Date(2027, 11, 1),
                        to: new Date(2028, 0, 1),
                        hours: ["9:00-13:00"],
                        days: [0, 1, 1, 1, 1, 1, 0]
                    },
                    firstMonthOfNextYear: {
                        from: new Date(2028, 0, 1),
                        to: new Date(2028, 1, 1),
                        hours: ["14:00-16:00"],
                        days: [1, 1, 1, 1, 1, 0, 1]
                    }
                }
            }
        }
    ],
    data: {
        tasks: [
            { id: 11, text: "Project #1", type: "project", "open": true, "parent": 0 },
            { id: 1, text: "1", start_date: "2027-04-05", duration: 1, parent: "11" },
            { id: 2, text: "2", start_date: "2027-04-05", duration: 3, parent: "11" },
            { id: 3, text: "3", start_date: "2027-04-05", duration: 3, parent: "11" },
            { id: 4, text: "4", start_date: "2027-04-05", duration: 3, parent: "11" },
            { id: 5, text: "5", start_date: "2027-04-05", duration: 1, parent: "11" }
        ],
        links: [
            { source: "1", target: "2", type: "0", id: 1 },
            { source: "1", target: "3", type: "0", id: 2 },
            { source: "1", target: "4", type: "0", id: 3 },
            { source: "2", target: "4", type: "0", id: 4 },
            { source: "3", target: "4", type: "0", id: 5 },
            { source: "4", target: "5", type: "0", id: 6 }
        ]
    }
});
~~~ 

Als Ergebnis erhalten Sie ein initialisiertes Gantt-Diagramm mit den angegebenen Einstellungen.

Das Konfigurationsobjekt kann die folgenden Eigenschaften enthalten:

- `container` - (*string|HTMLElement*) ein HTML-Container oder dessen ID, in dem das Gantt-Diagramm angezeigt wird. Falls nicht angegeben, wird Gantt ohne Container initialisiert.
- `config` - (*object*) ein Objekt mit Gantt-Diagramm-Konfigurationseinstellungen
- `calendars` - (*array*) ein Array von Arbeitszeitkalendern, die in die gantt-Instanz geladen werden sollen. Kalender müssen im Format angegeben werden, das von der [`gantt.addCalendar()`](api/method/addcalendar.md) Methode unterstützt wird
- `templates` - (*object*) ein Objekt mit Vorlagen
- `events` - (*object*) ein Objekt mit Ereignis-Handlern

Sie müssen das folgende Format verwenden, während Sie Ereignis-Handler für eine neue Gantt-Instanz angeben:

~~~js
const ganttInstance = Gantt.getGanttInstance({
    events: {
        onTaskCreated: (task) => {
            task.owner = null;
            return true;
        },
        onTaskClick: (taskId) => {
            alert(ganttInstance.getTask(taskId).text);
            return true;
        }
    }
});
~~~

- `data` - (*object|string*) ein Objekt mit Daten zum Laden oder die URL, von der Daten geladen werden sollen
- `plugins` - (*object*) Erweiterungen, die aktiviert werden müssen
- `locale` - (*string|object*) ein zweibuchstabiger Sprachcode oder ein Objekt der Locale, die aktiviert werden muss

Beachten Sie, dass der Aufruf der Methode `Gantt.getGanttInstance()` ohne Parameter ein Gantt-Objekt mit den Standardkonfigurationseinstellungen zurückgibt. Daher müssen Sie Ihre neue Instanz wie gewohnt konfigurieren, initialisieren und mit Daten befüllen.

Nehmen wir ein einfaches Beispiel: zwei Gantt-Diagramme, eines unter dem anderen:

~~~js
window.addEventListener("DOMContentLoaded", () => {
    const firstGantt = Gantt.getGanttInstance();
    firstGantt.init("gantt_here");
    firstGantt.parse(tasksA);

    const secondGantt = Gantt.getGanttInstance();
    secondGantt.init("gantt_here_2");
    secondGantt.parse(tasksB);
});
~~~

~~~html
<body>
    <div id="gantt_here" style="width: 100%; height: 50%;"></div>
    <div id="gantt_here_2" style="width: 100%; height: 50%;"></div>
</body>
~~~

## Integration mit DHTMLX Layout

Eine gute Möglichkeit, mehrere Gantt-Diagramme auf der Seite zu platzieren, ist die Verwendung von [DHTMLX Layout](https://docs.dhtmlx.com/suite/layout/). Es bietet nicht nur einen bequemen Layout-Rahmen, sondern sorgt auch für eine korrekte Interaktion mit anderen Elementen auf der Seite und reagiert auf Größenänderungen der Seite.

:::note
Beachten Sie, dass DHTMLX Layout ein eigenständiges Produkt ist und nicht Teil der DHTMLX Gantt-Bibliothek. Wenn Sie DHTMLX Layout in Ihrer Anwendung verwenden möchten, sollten Sie die Lizenz erwerben.
Bitte [prüfen Sie die Lizenzoptionen](https://dhtmlx.com/docs/products/licenses.shtml).
:::

Eine DHTMLX Gantt-Instanz kann in eine Layout-Zelle platziert werden, indem in der Zelle ein Container definiert und Gantt darin initialisiert wird.

~~~js
new dhx.Layout("layout_container", {
    rows: [
        {
            id: "top",
            height: "50%",
            html: '<div id="gantt_here" style="width: 100%; height: 100%;"></div>'
        },
        {
            id: "bottom",
            height: "50%",
            html: '<div id="gantt_here_2" style="width: 100%; height: 100%;"></div>'
        }
    ]
});

const firstGantt = Gantt.getGanttInstance();
firstGantt.init("gantt_here");
firstGantt.parse(tasksA);

const secondGantt = Gantt.getGanttInstance();
secondGantt.init("gantt_here_2");
secondGantt.parse(tasksB);
~~~

## Destruktor von Gantt- und DataProcessor-Instanzen {#destructorofganttanddataprocessorinstances}

Ab Version 5.1 verfügt das DHTMLX Gantt-Objekt über eine [`destructor()`](api/method/destructor.md) Methode, mit der unnötige Gantt-Instanzen entsorgt werden können.

Die `destructor()`-Methode einer Gantt-Instanz kann wie folgt verwendet werden:

~~~js
const ganttInstance = Gantt.getGanttInstance();
ganttInstance.destructor();
~~~

Der Destruktor führt folgende Aufgaben aus:

- löscht die in eine Gantt-Instanz geladenen Daten
- zerstört den Data Processor, falls dieser an das Gantt-Objekt angehängt ist
- trennt das Gantt-Diagramm vom DOM
- trennt alle DOM-Ereignisse, die über die [`gantt.event()`](api/method/event.md) Methode angehängt wurden

Beachten Sie, dass der Destruktor die von der [`gantt.createDatastore()`](api/method/createdatastore.md) Methode erstellten Datenspeicher nicht zerstört. Sie müssen sie manuell zerstören, so:

~~~js
// Erstellung eines Datenspeichers
const ganttInstance = Gantt.getGanttInstance();
const resourcesStore = ganttInstance.createDatastore({
    name: "resource",
    initItem: (item) => {
        item.id = item.key || ganttInstance.uid();
        return item;
    }
});

// Zerstörung des Datenspeichers später
resourcesStore.destructor();
~~~

### Verwendung des Destruktors mit Angular

Hier ist ein Beispiel, wie der Destruktor verwendet wird, um eine Gantt-Instanz im Angular-Framework zu entsorgen:

~~~ts
@Component({ template: '...' })
class MyGanttComponent implements OnInit, OnDestroy {
    private ganttInstance;

    ngOnInit() {
        this.ganttInstance = Gantt.getGanttInstance();

        // konfigurieren und initialisieren
    }

    ngOnDestroy() {
        if (this.ganttInstance) {
            this.ganttInstance.destructor();
        }
    }
}
~~~

### Abtrennung des DataProcessor

Durch Aufruf des Destruktors eines DataProcessors wird die DataProcessor-Instanz gelöscht und vom Gantt getrennt. Zum Beispiel:

~~~js
const ganttInstance = Gantt.getGanttInstance();
const dataProcessor = ganttInstance.createDataProcessor({
    url: "url",
    mode: "REST"
});

// löscht den DataProcessor und trennt ihn vom Gantt
dataProcessor.destructor();
~~~

:::note
Wenn Sie ein Paket verwenden, das das Erstellen mehrerer Instanzen des gantt-Objekts nicht zulässt (GPL- oder kommerzielle Editionen), macht der Aufruf des gantt-Destruktors das gantt-Objekt unzugänglich, bis die Seite neu geladen wird.
:::