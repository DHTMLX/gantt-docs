--- 
title: "Zeilenhöhe im Grid anpassen"
sidebar_label: "Zeilenhöhe im Grid anpassen"
---

# Zeilenhöhe im Grid anpassen

Es besteht die Möglichkeit, die Höhe der einzelnen Zeilen im Grid zu ändern. 

Die dhtmlxGantt-Bibliothek bietet zwei Möglichkeiten, die Zeilenhöhe zu verwalten:

- Durch Festlegen sowohl der Zeilenhöhe als auch der Höhe des Aufgabenbalkens des jeweiligen Aufgabenobjekts;
- Durch Ziehen des unteren Randes der Grid-Zeile.

:::note
Die Funktionalität ist in v7.1 und höher verfügbar.
:::

## Festlegen der Zeilenhöhe

Sie können die Höhe einer bestimmten Zeile nach Bedarf anpassen.

:::note
Die individuelle Zeilenhöhe ist derzeit nicht kompatibel mit der [statischen Hintergrunddarstellung](api/config/static_background.md).
:::

![row_height](/img/row_height.png)

Dazu müssen Sie die Eigenschaften **row_height** und **bar_height** des Aufgabenobjekts im Datensatz neu definieren: 

**Angabe des Typs einer Aufgabe im Datensatz**
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

oder Sie können es dynamisch implementieren:

~~~js
gantt.getTask(11).row_height = 50;
gantt.getTask(11).bar_height = 25;
// erneutes Rendern von Gantt, um die Änderungen anzuwenden
gantt.render();
~~~

Falls die Attribute **row_height** und **bar_height** des Aufgabenobjekts nicht angegeben oder leer sind (Standardzustand), werden die Werte von [gantt.config.row_height](api/config/row_height.md) und [gantt.config.bar_height](api/config/bar_height.md) verwendet.

## Zeilen per Drag-and-Drop ändern

![resize_row](/img/resize_row.png)

Um dem Benutzer die Möglichkeit zu geben, eine Zeile im Grid durch Ziehen des unteren Randes der Zeile anzupassen, setzen Sie die Option [gantt.config.resize_rows](api/config/resize_rows.md) auf *true*:

~~~js
gantt.config.resize_rows = true;
~~~

[Anpassbare Zeilen im Grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)

Die Option [gantt.config.min_task_grid_row_height](api/config/min_task_grid_row_height.md) ermöglicht es, die minimale Zeilenhöhe zu definieren, die während des Größenänderungsprozesses einer Aufgabe festgelegt werden kann:

~~~js
gantt.config.min_task_grid_row_height = 45;
~~~

### Ereignisse

Es gibt 4 Ereignisse, die Sie verwenden können, um das Verhalten beim Ändern der Zeilenhöhe per Drag-and-Drop zu steuern:

- [onBeforeRowResize](api/event/onbeforerowresize.md) - wird ausgelöst, bevor der Benutzer beginnt, die Zeilenhöhe per Drag-and-Drop zu ändern
- [onRowResize](api/event/onrowresize.md) - wird ausgelöst, wenn der Benutzer den Rand der Zeile zum Ändern der Zeilenhöhe zieht
- [onBeforeRowResizeEnd](api/event/onbeforerowresizeend.md) - wird ausgelöst, bevor das Ändern der Zeilenhöhe abgeschlossen ist
- [onAfterRowResize](api/event/onafterrowresize.md) - wird ausgelöst, nachdem das Ändern der Zeilenhöhe abgeschlossen ist