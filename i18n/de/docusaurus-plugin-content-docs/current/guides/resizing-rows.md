---
title: "Größenänderung von Zeilen im Grid"
sidebar_label: "Größenänderung von Zeilen im Grid"
---

# Größenänderung von Zeilen im Grid


Es ist möglich, die Höhe einzelner Zeilen im Grid anzupassen. 


Die dhtmlxGantt-Bibliothek bietet zwei Möglichkeiten, die Zeilenhöhe zu steuern:

- Durch Festlegen sowohl der Zeilenhöhe als auch der Taskleistenhöhe für ein bestimmtes Task-Objekt;
- Durch Ziehen des unteren Rands der Grid-Zeile.

:::note
Diese Funktion ist ab Version 7.1 verfügbar.
:::

## Festlegen der Zeilenhöhe {#settingtherowheight}


Sie können die Höhe einer bestimmten Zeile nach Bedarf anpassen.

:::note
Aktuell funktioniert die individuelle Zeilenhöhe nicht mit [static background rendering](api/config/static_background.md).
:::

![row_height](/img/row_height.png)

Dazu definieren Sie die Eigenschaften **row_height** und **bar_height** im Task-Objekt innerhalb Ihres Datensatzes neu: 

**Spezifizieren des Typs einer Aufgabe im Datensatz**
~~~js
gantt.parse({
    data: [
        { id: 11, text: "Project #1", type: "project", progress: 0.6, open: true, 
            row_height: 70, bar_height: 60 }, /*!*/
        { id: 12, text: "Task #1", start_date: "03-04-2018", duration: "5", 
            parent: "11", progress: 1, open: true },
        { id: 13, text: "Task #2", start_date: "03-04-2018", type: "project", 
            parent: "11", progress: 0.5, open: true }
    ],
    links: []
});
~~~

Alternativ können Sie diese Eigenschaften auch dynamisch festlegen:

~~~js
gantt.getTask(11).row_height = 50;
gantt.getTask(11).bar_height = 25;
// Gantt neu rendern, um die Änderungen anzuwenden
gantt.render();
~~~

Falls die Attribute **row_height** und **bar_height** fehlen oder leer sind (was der Standard ist), werden die Werte aus [gantt.config.row_height](api/config/row_height.md) und [gantt.config.bar_height](api/config/bar_height.md) verwendet.

## Größenänderung von Zeilen per Drag & Drop {#resizingrowsbydraganddrop}


![resize_row](/img/resize_row.png)

Um Benutzern zu erlauben, eine Zeile durch Ziehen ihres unteren Randes in der Größe zu verändern, aktivieren Sie die Option [gantt.config.resize_rows](api/config/resize_rows.md):

~~~js
gantt.config.resize_rows = true;
~~~


[Resizable rows in grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)


Mit der Option [gantt.config.min_task_grid_row_height](api/config/min_task_grid_row_height.md) können Sie die minimale Zeilenhöhe beim Vergrößern oder Verkleinern festlegen:

~~~js
gantt.config.min_task_grid_row_height = 45;
~~~

### Events

Es stehen vier Events zur Verfügung, um das Größenändern von Zeilen per Drag-and-Drop zu steuern:

- [onBeforeRowResize](api/event/onbeforerowresize.md) - wird ausgelöst, bevor der Benutzer beginnt, eine Zeile durch Ziehen zu vergrößern/verkleinern
- [onRowResize](api/event/onrowresize.md) - wird ausgelöst, während der Benutzer die Zeilengrenze zum Verändern der Größe zieht
- [onBeforeRowResizeEnd](api/event/onbeforerowresizeend.md) - wird unmittelbar vor dem Abschluss der Größenänderung ausgelöst
- [onAfterRowResize](api/event/onafterrowresize.md) - wird ausgelöst, nachdem die Größenänderung der Zeile abgeschlossen ist

