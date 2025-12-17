---
sidebar_label: click_drag
title: click_drag config
description: "ermöglicht erweitertes Drag-n-Drop"
---

# click_drag

### Description

@short: Ermöglicht erweitertes Drag-n-Drop

@signature: click_drag: undefined | ClickDrag

### Example

~~~jsx
gantt.config.click_drag = {
    callback: function(
        startPosition,
        endPosition,
        startDate,
        endDate,
        tasksBetween,
        rowsBetween
    ){
        var parentId = gantt.config.root_id;
        if(rowsBetween.length){
            parentId = rowsBetween[0].id;
        }

        gantt.createTask({
            text: "Neue Aufgabe",
            start_date: gantt.roundDate(startDate),
            end_date: gantt.roundDate(endDate)
        }, parentId);

    },
    singleRow: true
};
~~~

**Default value:** \{ useKey: false, ignore: ".gantt_task_line, .gantt_task_link" \}

### Details

:::note
 Diese Konfiguration ist Teil der **click_drag** Erweiterung. Stelle daher sicher, dass das [click_drag](guides/extensions-list.md#advanceddragndrop) Plugin über die [gantt.plugins](api/method/plugins.md) Methode aktiviert ist. Für weitere Details siehe den Artikel ["Erstellen/Auswählen von Aufgaben mit Drag-and-Drop"](guides/advanced-dnd.md). 
:::

Die **click_drag** Erweiterung bietet folgende Funktionen:

- Erstellen von Tasks durch Drag-and-Drop
- Setzen von Zeiten für nicht geplante Tasks mittels Drag-and-Drop
- Auswahl von Tasks via Drag-and-Drop
- Erstellen von Teilen getrennter Tasks via Drag-and-Drop (PRO-Version)

Das **gantt.config.click_drag** Objekt besitzt diese Eigenschaften:

- **className** -  (*string*) spezifiziert eine benutzerdefinierte CSS-Klasse für das ausgewählte Element
- **viewPort** - (*HTMLElement*) definiert das Element, an dem Events angehängt werden und die Selektion stattfindet
- **useRequestAnimationFrame** - (*boolean*) bestimmt, ob requestAnimationFrame beim Rendern verwendet wird
- **callback** - (*function*) - wird aufgerufen, wenn die Maustaste losgelassen wird. Erhält 6 Parameter:
    - **startPoint** - (*object*) - ein Objekt mit folgender Struktur: <br>
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, <br>
  wobei absolute die Koordinaten relativ zur oberen linken Ecke des Dokuments darstellt und relative die Koordinaten relativ zum viewPort Element
    - **endPoint** - (*object*) im gleichen Format wie startPoint
     - **startDate** - (*Date*) das Datum, das der Startposition des Drag entspricht
    - **endDate** - (*Date*) das Datum, das der Endposition des Drag entspricht
    - **tasksBetweenDates** - (*array*) Tasks, die zwischen Start- und Enddatum liegen
    - **tasksInRows** - (*array*) Tasks, die zwischen den vertikalen Start- und Endkoordinaten ausgewählt wurden
- **singleRow** - (*boolean*) wenn true, ist die Auswahl auf eine einzelne Zeile begrenzt, die der Task-Höhe entspricht
- **ignore** - (*string*) CSS-Selektor für Elemente, bei denen Drag-and-Drop deaktiviert ist
- **useKey** - (*string|boolean*) wenn gesetzt, wird Drag-and-Drop nur aktiviert, wenn die angegebene Modifikatortaste gedrückt wird. Unterstützte Tasten sind "ctrlKey", "shiftKey", "metaKey" und "altKey"

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    ignore: ".gantt_task_line, .gantt_marker_content, .gantt_task_link",
    useKey: "ctrlKey"
};
~~~

- **render** - (*function*) erzeugt ein Element, das während des Draggens angezeigt wird. Nimmt zwei Argumente entgegen:
    - **startPoint** - (*object*) mit folgender Struktur:<br>
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, <br>
  wobei absolute und relative Koordinaten wie oben beschrieben sind
    - **endPoint** - (*object*) im gleichen Format wie startPoint

Ein Beispiel für die Implementierung der **render** Funktion:

~~~js
var node;
gantt.config.click_drag = {
    callback: onDragEnd,
    singleRow: true,
    render: function(start, end){
        if(!(node && node.parentNode)){
            node = document.createElement("div");
        }
        var left = Math.min(start.relative.left, end.relative.left);

        node.style.top = (start.relative.top - gantt.config.row_height) + "px";
        node.style.left = left + "px";
        node.style.width = Math.abs(start.relative.left - end.relative.left) + "px";
        node.style.height = gantt.config.row_height + "px";
        node.style.position = "absolute";
        return node;
    }
};
~~~

### Related Guides
- ["Erstellen/Auswählen von Aufgaben mit Drag-and-Drop"](guides/advanced-dnd.md)

