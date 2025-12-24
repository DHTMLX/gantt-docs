---
title: "Mehrere Diagramme auf einer Seite"
sidebar_label: "Mehrere Diagramme auf einer Seite"
---

# Mehrere Diagramme auf einer Seite


:::info
Diese Funktion ist in der Gantt PRO-Version enthalten, verfügbar mit der Commercial-Lizenz (seit dem 6. Oktober 2021), Enterprise- und Ultimate-Lizenzen.
:::

Grundsätzlich fungiert dhtmlxGantt als statisches Objekt, und seine Standardinstanz ist immer auf der Seite vorhanden. Sie können jederzeit über das globale **gantt**-Objekt darauf zugreifen. Falls erforderlich, können Sie jedoch auch eine neue gantt-Instanz erstellen.

## Gantt-Instanz konfigurieren

Um eine neue dhtmlxGantt-Instanz zu erstellen, verwenden Sie die Methode **Gantt.getGanttInstance()**:

~~~js
// Beachten Sie, dass "Gantt" mit einem Großbuchstaben beginnt
const ganttChart = Gantt.getGanttInstance();
~~~

Diese Methode kann ein Konfigurationsobjekt als Argument akzeptieren:

~~~js
const gantt = Gantt.getGanttInstance({
    plugins:{
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
        start_date: new Date(2020, 0, 1),
        end_date: new Date(2021, 0, 1),
    },
    calendars: [
        {
            id:"global",
            worktime: {
                hours: ["8:00-17:00"],
                days: [ 0, 1, 1, 1, 1, 0 ,0],
                customWeeks: {
                    lastMonthOfYear: {
                        from: new Date(2020, 11, 1),// 1. Dezember 2020
                        to: new Date(2021, 0, 1),// 1. Januar 00:00, 2021,
                        hours: ["9:00-13:00"],
                        days: [ 0, 1, 1, 1, 1, 1, 0]
                    },
                    firstMonthOfNextYear:{
                        from: new Date(2021, 0, 1),// 1. Januar 2021
                        to: new Date(2021, 1, 1),// 1. Februar 00:00, 2021,
                        hours: ["14:00-16:00"],
                        days: [ 1, 1, 1, 1, 1, 0, 1]
                    }
                }
            }
        }
    ],
    data: {
        tasks: [
            { id: 11, text: "Project #1", type: "project", "open": true, "parent": 0 },
            { id: 1, start_date: "05-04-2020", text: "1", duration: 1, parent: "11", 
            type: "task" },
            { id: 2, start_date: "05-04-2020", text: "2", duration: 3, parent: "11", 
            type: "task" },
            { id: 3, start_date: "05-04-2020", text: "3", duration: 3, parent: "11", 
            type: "task" },
            { id: 4, start_date: "05-04-2020", text: "4", duration: 3, parent: "11", 
            type: "task" },
            { id: 5, start_date: "05-04-2020", text: "5", duration: 1, parent: "11", 
            type: "task" }
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

Dadurch wird ein Gantt-Diagramm mit den angegebenen Optionen initialisiert.

Das Konfigurationsobjekt unterstützt die folgenden Eigenschaften:

- **container** - (*string|HTMLElement*) Der HTML-Container (oder dessen ID), in dem das Gantt-Diagramm gerendert wird. Wenn nicht angegeben, wird das Gantt ohne Container initialisiert.
- **config** - (*object*) Konfigurationseinstellungen für das Gantt-Diagramm
- **calendars** - (*array*) Ein Array von Arbeitszeitkalendern, die in das gantt geladen werden. Kalender sollten im von der Methode [gantt.addCalendar](api/method/addcalendar.md) unterstützten Format vorliegen.
- **templates** - (*object*) Ein Objekt, das Templates enthält
- **events** - (*object*) Ein Objekt mit Ereignishandlern. 


Wenn Sie Ereignishandler für eine neue Gantt-Instanz angeben, verwenden Sie folgendes Format:

~~~js
const gantt = Gantt.getGanttInstance({
     events: {
          onTaskCreated: function(task){
               task.owner = null;
               return true;
          },
          onTaskClick: function(id){
               alert(gantt.getTask(id).text);
               return true;
          }
     }
})
~~~

- **data** - (*object|string*) Zu ladende Daten oder eine URL, von der Daten abgerufen werden
- **plugins** - (*object*) Zu aktivierende Plugins
- **locale** - (*string|object*) Ein zweistelliger Sprachcode oder ein Locale-Objekt zur Aktivierung

**Hinweis:** Wenn **Gantt.getGanttInstance()** ohne Argumente aufgerufen wird, wird das gantt-Objekt mit den Standardeinstellungen zurückgegeben. In diesem Fall müssen Sie Ihre neue Instanz wie gewohnt konfigurieren, initialisieren und Daten laden.

Hier ein einfaches Beispiel, das zwei vertikal gestapelte Gantt-Diagramme zeigt:

~~~js
window.addEventListener("DOMContentLoaded", function(){
    var gantt1 = Gantt.getGanttInstance();
    gantt1.init("gantt_here");
    gantt1.parse(tasksA);

    var gantt2 = Gantt.getGanttInstance();
    gantt2.init("gantt_here_2");
    gantt2.parse(tasksB);
});

<body>
<div id="gantt_here" style="width:100%; height: 50%;"></div>
<div id="gantt_here_2" style="width:100%; height: 50%;"></div>
</body>
~~~

## Integration mit dhtmlxLayout


Eine effektive Möglichkeit, mehrere Gantt-Diagramme auf einer Seite zu organisieren, ist die Verwendung von [dhtmlxLayout](https://docs.dhtmlx.com/layout__index.html). Es bietet ein übersichtliches Layout-Framework und handhabt Interaktionen mit anderen Seitenelementen sowie Größenänderungen korrekt.

:::note
Beachten Sie, dass dhtmlxLayout ein separates Produkt ist, das nicht in der dhtmlxGantt-Bibliothek enthalten ist. Für die Nutzung von dhtmlxLayout in Ihrem Projekt ist ein separater Lizenzerwerb erforderlich.
Bitte sehen Sie sich die [Lizenzierungsoptionen](https://dhtmlx.com/docs/products/dhtmlxLayout/#editions-licenses) an.
:::

**Um eine dhtmlxGantt-Instanz an eine Layoutzelle anzuhängen**, verwenden Sie die Methode **attachGantt()**.

**Hinweis:** Das Anhängen von dhtmlxGantt an eine Zelle initialisiert es automatisch. Stellen Sie daher sicher, dass Sie die gantt-Instanz vor dem Anhängen an das Layout konfigurieren.

~~~js
function init() {
    var dhxLayout = new dhtmlXLayoutObject(document.body, "2U");

    gantt1 = Gantt.getGanttInstance();
    gantt1.config.min_column_width = 50;
    gantt1.config.scale_height = 90;
    dhxLayout.cells("a").attachGantt(null, null, gantt1); /*!*/
    gantt1.parse(tasksA);
        
    gantt2 = Gantt.getGanttInstance();
    gantt2.config.date_grid = "%Y-%m-%d %H:%i";
    gantt2.config.xml_date = "%Y-%m-%d %H:%i:%s";
    dhxLayout.cells("b").attachGantt(null, null, gantt2);/*!*/
    gantt2.parse(tasksB);
}
~~~

## Destruktor für Gantt- und DataProcessor-Instanzen


Ab Version 5.1 stellt das dhtmlxGantt-Objekt eine [destructor](api/method/destructor.md) bereit, um nicht mehr benötigte gantt-Instanzen zu bereinigen.

So verwenden Sie den Destruktor für eine gantt-Instanz:

~~~js
var gantt = Gantt.getGanttInstance();
gantt.destructor();
~~~

Dieser Destruktor führt Folgendes aus:

- Löscht die in die gantt-Instanz geladenen Daten
- Zerstört den dataProcessor, falls angehängt
- Trennt das gantt vom DOM
- Entfernt alle über die Methode [gantt.event()](api/method/event.md) hinzugefügten DOM-Ereignisse

Beachten Sie, dass der Destruktor keine von [gantt.createDatastore()](api/method/createdatastore.md) erstellten Datenspeicher entfernt. Diese müssen manuell zerstört werden, wie folgt:

~~~js
// Einen Datenspeicher erstellen
var resourcesStore = gantt.createDatastore({
    name:"resource",
    initItem: function(item){
        item.id = item.key || gantt.uid();
        return item;
    }
});

// Den Datenspeicher später zerstören
resourcesStore.destructor();
~~~

### Destruktor mit Angular verwenden

Hier ein Beispiel, wie eine gantt-Instanz beim Einsatz mit Angular entsorgt wird:

~~~js
@Component({selector: 'app-gantt', template: `...`})
class MyGanttComponent implements OnDestroy {
  ngOnInit() {
     this.$gantt = Gantt.getGanttInstance();

     // konfigurieren und initialisieren
  }
  
  ngOnDestroy() {
     this.$gantt.destructor();
     this.$gantt = null;
  }
}
~~~

### Den dataProcessor trennen

Das Aufrufen des Destruktors eines dataProcessor bereinigt die Instanz und trennt sie vom gantt. Zum Beispiel:

~~~js
var gantt = Gantt.getGanttInstance();
var dp = new gantt.dataProcessor("url");
dp.init(gantt);

// Zerstört den dataProcessor und trennt ihn vom gantt
dp.destructor();
~~~

:::note
Wenn Sie ein Paket verwenden, das mehrere gantt-Instanzen nicht unterstützt (GPL- oder Commercial-Editionen), macht das Aufrufen des gantt-Destruktors das gantt unbenutzbar, bis die Seite neu geladen wird.
:::

