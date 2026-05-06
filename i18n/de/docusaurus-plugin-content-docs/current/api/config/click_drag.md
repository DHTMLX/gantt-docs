---
sidebar_label: click_drag
title: click_drag config
description: "Aktiviert fortgeschrittenes Drag-and-Drop"
---

# click_drag

### Description

@short: Aktiviert fortgeschrittenes Drag-and-Drop

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
            text: "New task",
            start_date: gantt.roundDate(startDate),
            end_date: gantt.roundDate(endDate)
        }, parentId);

    },
    singleRow: true
};
~~~

**Standardwert:** \{ useKey: false, ignore: ".gantt_task_line, .gantt_task_link" \}

### Details

:::note
Diese Konfiguration ist in der **click_drag**-Erweiterung definiert, daher müssen Sie das [click_drag](guides/extensions-list.md#advanced-drag-n-drop) Plugin aktivieren, wie unter der [gantt.plugins](api/method/plugins.md) Methode beschrieben. Details finden Sie im Artikel [Erstellen/Auswählen von Tasks mit Drag-and-Drop](guides/advanced-dnd.md). 
:::

Die **click_drag**-Erweiterung ermöglicht:

- Tasks per Drag-and-Drop erstellen
- Zeitfenster für ungeplante Tasks per Drag-and-Drop festlegen
- Tasks per Drag-and-Drop auswählen
- Teile von geteilten Tasks per Drag-and-Drop erstellen (PRO-Version)

Das Objekt **gantt.config.click_drag** enthält folgende Eigenschaften:

- **className** - (*string*) setzt eine benutzerdefinierte CSS-Klasse für ein ausgewähltes Element
- **viewPort** - (*HTMLElement*) das Element, an das ein Ereignis angehängt wird und das zur Auswahl verwendet wird
- **useRequestAnimationFrame** - (*boolean*) definiert, ob während des Renderings requestAnimationFrame verwendet wird
- **callback** - (*function*) - eine Funktion, die aufgerufen wird, wenn die Maustaste losgelassen wird. Nimmt 6 Parameter entgegen:
    - **startPoint** - (*object*) - ein Objekt des Typs: 
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, 
  wobei absolute die Koordinaten der linken oberen Ecke des Dokuments sind, und relative die Koordinaten des linken oberen Elements, das als ViewPort verwendet wird 
    - **endPoint** - (*object*) - ein Objekt des Typs: 
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, 
  wobei absolute die Koordinaten der linken oberen Ecke des Dokuments sind, und relative die Koordinaten des linken oberen Elements, das als ViewPort verwendet wird 
     - **startDate** - (*Date*) das Datum, das dem Startpunkt entspricht
    - **endDate** - (*Date*) das Datum, das dem Endpunkt entspricht
    - **tasksBetweenDates** - (*array*) ein Array von Tasks zwischen Start- und Enddatumspunkten
    - **tasksInRows** - (*array*) ein Array von Tasks, die vertikal zwischen dem Start- und Endkoordinaten ausgewählt wurden
- **singleRow** - (*boolean*) true, um die Auswahl nur in einer Zeile zu ermöglichen, die der Höhe einer Aufgabe entspricht
- **ignore** - (*string*) CSS-Selektor. Drag-n-Drop wird für die Elemente, die dem Selektor entsprechen, nicht aktiviert
- **useKey** - (*string|boolean*) Falls die Eigenschaft gesetzt ist, wird Drag-n-Drop nur aktiviert, wenn die angegebene Modifikatortaste gedrückt wird. Unterstützte Werte: "ctrlKey", "shiftKey", "metaKey", "altKey"

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    ignore: ".gantt_task_line, .gantt_marker_content, .gantt_task_link",
    useKey: "ctrlKey"
};
~~~

- **render** - (*function*) eine Funktion, die ein während des Ziehens gerendertes Element erzeugt. Sie nimmt zwei Parameter entgegen:
    - **startPoint** - (*object*) - ein Objekt des Typs:
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, 
  wobei absolute die Koordinaten der linken oberen Ecke des Dokuments sind, und relative die Koordinaten des linken oberen Elements, das als ViewPort verwendet wird 
    - **endPoint** - (*object*) - ein Objekt des Typs:
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, 
  wobei absolute die Koordinaten der linken oberen Ecke des Dokuments sind, und relative die Koordinaten des linken oberen Elements, das als ViewPort verwendet wird

Hier ein Beispiel zur Nutzung der **render**-Funktion:

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
- [Erstellen/Auswählen von Aufgaben mit Drag-and-Drop](guides/advanced-dnd.md)