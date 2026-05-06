---
sidebar_label: autosize
title: Autosize-Konfiguration
description: "Erzwingt, dass das Gantt-Diagramm seine Größe automatisch ändert, um alle Aufgaben ohne Scrollen anzuzeigen"
---

# autosize

### Description

@short: Erzwingt, dass das Gantt-Diagramm automatisch seine Größe ändert, um alle Aufgaben ohne Scrollen anzuzeigen

@signature: autosize: boolean | string

### Example

~~~jsx
gantt.config.autosize = "xy";

gantt.init("gantt_here");
~~~

**Standardwert:** false

### Details

Die `autosize`-Konfiguration definiert, ob das Gantt die Daten innerhalb der Größe des Containers, in dem es initialisiert wird, einpasst und innere Scrollleisten anzeigt, oder die Größe des Containers verändert, um alle Daten ohne innere Scrolls anzuzeigen:

- [ein Beispiel mit Größen des Gantt-Div, definiert in CSS](https://snippet.dhtmlx.com/2m48u5oz) - innere Scrollleisten sind bei Bedarf aktiv
- [ein Beispiel, bei dem die Größen des Gantt-Div von einer Komponente berechnet werden](https://snippet.dhtmlx.com/syzmiqwt) - innere Scrollleisten sind deaktiviert

Falls Gantt in einem bestimmten Bereich der Seite platziert werden soll, muss die Größe des Gantt-Containers manuell verwaltet werden:

- automatische Größenanpassung sollte deaktiviert sein
- Breite/Höhe eines div sollten entweder durch HTML-Layout berechnet werden, wenn eine fertige Lösung für responsive Layouts verwendet wird, oder manuell durch Code

## Scrolling to hidden elements

Im Standardmodus wird Gantt automatisch gescrollt, wenn Sie die Methode [`showTask()`](api/method/showtask.md) oder [`showDate()`](api/method/showdate.md) verwenden.
Wenn jedoch `autosize` aktiviert ist, erhöht Gantt die Größe seines Containers, um sich auf der Seite anzuzeigen, statt das versteckte Element zu zeigen.

Es gibt keine universelle Lösung für dieses Problem, da die Seite neben Gantt auch andere Elemente enthalten kann, und einige dieser Elemente ebenfalls gescrollt werden müssen. Daher sollte dieses Problem entsprechend der Seiten-/Anwendungs-Konfiguration gelöst werden.

In einer *einfachen* Konfiguration kann sich Gantt vor oder nach einigen Elementen in Ihrer Anwendung befinden. Und es kann ordnungsgemäß funktionieren, wenn Sie die Seite scrollen.

In einer *komplexen* Konfiguration kann der Gantt-Container in andere Container eingefügt werden, die wiederum in weitere Container eingefügt werden können. In diesem Fall müssen Sie nur die Elemente manuell scrollen, die Sie benötigen.

Einer der Wege, die Seite zu dem benötigten Element scrollen zu lassen, ist die Verwendung der Methode `element.scrollIntoView()`:

~~~js
const taskAttribute = gantt.config.task_attribute;
const timelineElement = document.querySelector(`.gantt_task_line[${taskAttribute}='${id}']`);

timelineElement?.scrollIntoView({ block: "center" });
~~~

wobei id die Task-ID ist, die Sie anzeigen möchten.

Eine weitere Möglichkeit besteht darin, die Methode [`showTask()`](api/method/showtask.md) oder [`showDate()`](api/method/showdate.md) von Gantt zu modifizieren:

~~~js
const defaultShowTask = gantt.showTask;

gantt.showTask = function(id) {
    defaultShowTask.apply(this, [id]);
    const taskAttribute = gantt.config.task_attribute;
    const timelineElement = document.querySelector(`.gantt_task_line[${taskAttribute}='${id}']`);

    timelineElement?.scrollIntoView({ block: "center" });
};
~~~

oder eine benutzerdefinierte Funktion zum Anzeigen der Aufgabe erstellen:

~~~js
const showTask = (id) => {
    gantt.showTask(id);
    const taskAttribute = gantt.config.task_attribute;
    const timelineElement = document.querySelector(`.gantt_task_line[${taskAttribute}='${id}']`);

    timelineElement?.scrollIntoView({ block: "center" });
};
~~~

:::note
Beispiel: [Scrolling to the specified element](https://snippet.dhtmlx.com/or73u6a5)
:::

### Related API
- [autosize_min_width](api/config/autosize_min_width.md)