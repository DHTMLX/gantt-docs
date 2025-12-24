---
title: "Aufgaben aufteilen"
sidebar_label: "Aufgaben aufteilen"
---

# Aufgaben aufteilen


:::info
Dieses Feature ist nur in der PRO-Edition verfügbar.
:::

Wenn Sie eine große Aufgabe haben, die nicht durchgehend ist und unterbrochen sowie wieder aufgenommen werden kann, können Sie sie in mehrere Teile aufteilen. Es gibt keine Begrenzung, wie viele Teile Sie erstellen können.

Auf Datenebene werden solche Aufgaben als Sammelaufgabe (Projekt) mit Unteraufgaben dargestellt, wobei jede Unteraufgabe einem eigenen Segment der Hauptaufgabe entspricht.

![Sammelaufgabe](/img/split_task_inside.png)

Diese können in einer einzigen Zeile angezeigt werden, sodass sie wie eine Aufgabe erscheinen:

![Geteilte Aufgabe](/img/split_task.png)

Um ein Projekt als geteilte Aufgabe darzustellen, setzen Sie die **render**-Eigenschaft auf *split*:

~~~js
{id: 1, text: "Task #2", start_date: "03-04-2018 00:00", type: "project", 
    render:"split", parent: 0},  /*!*/
{id: 2, text: "Task #2.1", start_date: "03-04-2018 00:00", duration: 1, 
    parent: 1},
{id: 3, text: "Task #2.2", start_date: "05-04-2018 00:00", duration: 2, 
    parent: 1},
{id: 4, text: "Task #2.3", start_date: "08-04-2018 00:00", duration: 1, 
    parent: 1}
~~~

Hier wird "Task#2" aufgeteilt und als die Aufgaben "Task#2.1", "Task#2.2" und "Task#2.3" angezeigt, die alle vollständig interaktiv bleiben.


[Split task](https://docs.dhtmlx.com/gantt/samples/04_customization/11_split_task.html)


Um zur üblichen Baumansicht einer geteilten Aufgabe zurückzukehren, in der sie als Projekt mit Unteraufgaben erscheint, ändern Sie einfach die **task.render**-Eigenschaft und rendern das Gantt-Diagramm neu:

~~~js
// Aufgabe im 'split'-Modus neu zeichnen
task.render = "split";
gantt.render();

// Aufgabe im regulären (Baum-)Modus neu zeichnen
task.render = "";
gantt.render();
~~~

Sie können zum Beispiel ein Steuerelement, das mit der **task.render**-Eigenschaft verknüpft ist, in das Lightbox-Formular einfügen, um dynamisch zwischen geteilten und hierarchischen Ansichten umzuschalten. Ein Beispiel finden Sie unten.


### Dynamisches Umschalten des Split-Modus

Die Lightbox kann so konfiguriert werden, dass Sie den Split-Modus für eine Aufgabe ein- oder ausschalten können. Fügen Sie dazu der Lightbox einen neuen Abschnitt mit einer Checkbox hinzu, indem Sie die Einstellungen für Aufgaben des Typs Projekt anpassen - [**gantt.config.lightbox.project_sections**](guides/task-types.md#specificlightboxpertasktype) - und geben Sie eine Bezeichnung für den neuen Abschnitt an:

~~~js
gantt.locale.labels.section_split = "Anzeige";
gantt.config.lightbox.project_sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "split", type:"checkbox", map_to: "render", options:[
        {key:"split", label:"Aufgabe aufteilen"}
    ]},
    {name: "time", type: "duration", readonly: true, map_to: "auto"}
];
~~~

Dies erzeugt die folgende Oberfläche:

![Split-Aufgaben-Checkbox](/img/split_task_checkbox.png)

Wenn das Kontrollkästchen nicht aktiviert ist, wird die geteilte Aufgabe als Projekt mit Unteraufgaben angezeigt.


[Split task](https://docs.dhtmlx.com/gantt/samples/04_customization/11_split_task.html)


## Erkennen, ob eine Aufgabe geteilt ist

Um festzustellen, ob eine Aufgabe geteilt ist, verwenden Sie die Methode [isSplitTask](api/method/issplittask.md). Sie nimmt ein Aufgabenobjekt entgegen und gibt true zurück, wenn die Aufgabe geteilt ist.

~~~js
var task = gantt.getTask(1);
if(gantt.isSplitTask(task)){
  ...
}
~~~

## Geteilte Aufgaben ein- und ausklappen

Wenn Sie eine geteilte Aufgabe direkt aus der Tabelle ein- oder ausklappen möchten, gibt es dafür eine Konfigurationsoption. Die Option heißt [open_split_tasks](api/config/open_split_tasks.md) und akzeptiert einen Boolean-Wert, um dieses Verhalten zu aktivieren oder zu deaktivieren.

~~~js
gantt.config.open_split_tasks = true;
~~~

![Geteilte Aufgabe ausklappen](/img/expand_split_task.png)

## Geteilte Aufgaben filtern

Um zu filtern, welche Unteraufgaben einer geteilten Aufgabe im Gantt-Diagramm angezeigt werden, verwenden Sie das Ereignis [onBeforeSplitTaskDisplay](api/event/onbeforesplittaskdisplay.md). Rückgabewerte:

- *true* um eine Unteraufgabe anzuzeigen
- *false* um eine Unteraufgabe auszublenden

~~~js
gantt.attachEvent("onBeforeSplitTaskDisplay", function (id, task, parent) {
    if (task.duration < 3) {
        return false;
    }
    return true;
});
~~~

## Styling


Geteilte Aufgaben sind Unteraufgaben eines übergeordneten Elements, und der hellgrüne Balken dahinter stellt den Balken des übergeordneten Elements mit zusätzlichem Styling dar.

Wenn geteilte Aufgaben eingeklappt und in einer einzigen Zeile angezeigt werden, bleibt der hellgrüne Balken des übergeordneten Elements erhalten, allerdings mit angepasster Deckkraft und z-Index-Werten.

![](/img/split_task_style.png)


[Expand and collapse split tasks](https://docs.dhtmlx.com/gantt/samples/04_customization/21_open_split_task.html)


Sie können die Farbe des Balkens des übergeordneten Elements wie jeden anderen Balken in der [Zeitleiste](guides/css-overview.md#stylingtimeline) anpassen oder ihn komplett mit CSS ausblenden:

~~~css
.gantt_task_line.gantt_split_parent {
    display: none;
}
~~~


Wenn es nur eine geteilte Aufgabe gibt, wird das Sammelobjekt (type=""project")" unsichtbar, da es vollständig von der geteilten Aufgabe überdeckt wird. Gibt es keine geteilten Unteraufgaben, verwendet das Sammelobjekt ein Standarddatum und eine Standarddauer.

### Einzelne geteilte Aufgaben stylen

Ab Version 8.0 enthalten geteilte Aufgaben die Eigenschaft *task.$rendered_at* in Template-Funktionen, die die ID der Zeile enthält, in der die geteilte Aufgabe gerendert wird. Damit können Sie bestimmte geteilte Aufgaben basierend auf ihrer Anzeigereihe mit der [task_class](api/template/task_class.md) Vorlage stylen:

~~~js
gantt.templates.task_class = function(start, end, task) {
    if(task.$rendered_at) {
        if(gantt.calculateTaskLevel(gantt.getTask(task.$rendered_at)) === 1) {
            return "phase-level-split-task";
        }
    }
    return "";
};
~~~

