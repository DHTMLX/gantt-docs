---
title: "clickDrag Erweiterung"
sidebar_label: "clickDrag Erweiterung"
---

# clickDrag Erweiterung


Weitere Informationen zur clickDrag-Erweiterung finden Sie im Artikel [Creating/Selecting Tasks with DnD](guides/advanced-dnd.md).

## Konfigurationsobjekt


Um die erweiterte Drag-and-Drop-Funktionalität zu aktivieren, setzen Sie die Konfigurationsoption [click_drag](api/config/click_drag.md) und fügen Sie die gewünschten Eigenschaften aus der untenstehenden Liste in das Objekt ein:

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    singleRow: true
};
~~~

- <span class="subproperty">**className?**</span> -  (*string*) - wendet eine benutzerdefinierte CSS-Klasse auf das ausgewählte Element an
- <span class="subproperty">**viewPort?**</span> - (*HTMLElement*) - das Element, an das das Ereignis gebunden wird und in dem die Auswahl erfolgt
- <span class="subproperty">**useRequestAnimationFrame?**</span> - (*boolean*) - legt fest, ob requestAnimationFrame während des Renderings verwendet wird
- <span class="submethod">**callback? (startPoint, endPoint, startDate, endDate, tasksBetweenDates, tasksInRows): any**</span> - eine Funktion, die ausgelöst wird, wenn die Maustaste losgelassen wird. Sie erhält 6 Parameter:
    - **_startPoint?_** - (*object*) - enthält die folgenden Eigenschaften:
        - **_absolute_** - (*object*) - Koordinaten relativ zur oberen linken Ecke des Dokuments
            - **_left_** - (*number*) - horizontale Position
            - **_top_** - (*number*) - vertikale Position
        - **_relative_** - (*object*) - Koordinaten relativ zur oberen linken Ecke des viewPort-Elements
            - **_left_** - (*number*) - horizontale Position
            - **_top_** - (*number*) - vertikale Position
    - **_endPoint?_** - (*object*) - strukturiert wie startPoint, stellt das Ende des Ziehvorgangs dar
        - **_absolute_** - (*object*) - Koordinaten relativ zur oberen linken Ecke des Dokuments
            - **_left_** - (*number*) - horizontale Position
            - **_top_** - (*number*) - vertikale Position
        - **_relative_** - (*object*) - Koordinaten relativ zum viewPort-Element
            - **_left_** - (*number*) - horizontale Position
            - **_top_** - (*number*) - vertikale Position
    - **_startDate?_** - (*Date*) - das Datum, das dem startPoint entspricht
    - **_endDate?_** - (*Date*) - das Datum, das dem endPoint entspricht
    - **_tasksBetweenDates?_** - (*Array&lt;Task&gt;*) - Aufgaben, die zwischen dem Start- und Enddatum liegen
    - **_tasksInRows?_** - (*Array&lt;Task&gt;*) - Aufgaben, die vertikal zwischen den Start- und Endkoordinaten ausgewählt wurden
- <span class="subproperty">**singleRow?**</span> - (*boolean*) - wenn true, ist die Auswahl auf eine einzelne Zeile mit der Höhe einer Aufgabe beschränkt
- <span class="subproperty">**ignore?**</span> - (*string*) - CSS-Selektor für Elemente, bei denen Drag-and-Drop nicht aktiviert werden soll
- <span class="subproperty">**useKey?**</span> - (*string | boolean*) - Drag-and-Drop wird nur aktiviert, wenn die angegebene Modifikatortaste gedrückt gehalten wird. Unterstützte Tasten: "ctrlKey", "shiftKey", "metaKey", "altKey"
- <span class="submethod">**render? (startPoint, endPoint): any**</span> - eine Funktion, die das während des Ziehvorgangs angezeigte Element zurückgibt. Sie akzeptiert zwei Parameter:
    - **_startPoint?_** - (*object*) - enthält:
        - **_absolute_** - (*object*) - Koordinaten relativ zur oberen linken Ecke des Dokuments
            - **_left_** - (*number*) - horizontale Position
            - **_top_** - (*number*) - vertikale Position
        - **_relative_** - (*object*) - Koordinaten relativ zum viewPort-Element
            - **_left_** - (*number*) - horizontale Position
            - **_top_** - (*number*) - vertikale Position
    - **_endPoint?_** - (*object*) - strukturiert wie startPoint, stellt die aktuelle Position des Ziehvorgangs dar
        - **_absolute_** - (*object*) - Koordinaten relativ zum Dokument
            - **_left_** - (*number*) - horizontale Position
            - **_top_** - (*number*) - vertikale Position
        - **_relative_** - (*object*) - Koordinaten relativ zum viewPort-Element
            - **_left_** - (*number*) - horizontale Position
            - **_top_** - (*number*) - vertikale Position


## Ereignisse


Die folgenden Ereignisse können an das als viewPort verwendete Element gebunden werden (standardmäßig gantt.$task_data, der Bereich der Zeitleiste, der die Aufgabenbalken enthält):

- **onBeforeDrag** - wird direkt nach dem Drücken der Maustaste ausgelöst, bevor das Ziehen beginnt
- **onDrag** - wird wiederholt während des Ziehens ausgelöst, bevor die Maustaste losgelassen wird
- **onBeforeDragEnd** - wird ausgelöst, nachdem die Maustaste losgelassen wurde, aber bevor das Ziehelement entfernt und die Aufgaben unter der Auswahl identifiziert werden
- **onDragEnd** - wird ausgelöst, nachdem das Ziehelement entfernt und die Aufgaben innerhalb der Auswahl gefunden wurden, aber bevor die callback-Funktion (sofern angegeben) aufgerufen wird

