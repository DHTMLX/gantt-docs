--- 
title: "clickDrag-Erweiterung"
sidebar_label: "clickDrag-Erweiterung"
---

# clickDrag-Erweiterung

Lesen Sie Details zur clickDrag-Erweiterung im Artikel [Creating/Selecting Tasks with DnD](guides/advanced-dnd.md).

## Konfigurationsobjekt

Um fortgeschrittenes Drag-and-Drop zu aktivieren, geben Sie die Konfigurationsoption [click_drag](api/config/click_drag.md) an und setzen die erforderlichen Eigenschaften aus der untenstehenden Liste innerhalb seines Objekts:

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    singleRow: true
};
~~~

- <span class="subproperty">**className?**</span> -  (*string*) - legt eine benutzerdefinierte CSS-Klasse für ein ausgewähltes Element fest
- <span class="subproperty">**viewPort?**</span> - (*HTMLElement*) - das Element, an das ein Ereignis angehängt wird und das als ViewPort verwendet wird
- <span class="subproperty">**useRequestAnimationFrame?**</span> - (*boolean*) - definiert, ob während des Renderings requestAnimationFrame verwendet wird
- <span class="submethod">**callback? (startPoint, endPoint, startDate, endDate, tasksBetweenDates, tasksInRows): any**</span> - eine Funktion, die aufgerufen wird, wenn die Maustaste losgelassen wird. Nimmt 6 Parameter entgegen:
    - **_startPoint?_** - (*object*) - ein Objekt mit den folgenden Attributen:
        - **_absolute_** - (*object*) - die Koordinaten der linken oberen Ecke des Dokuments
            - **_left_** - (*number*) - die linke Koordinate
            - **_top_** - (*number*) - die obere Koordinate
        - **_relative_** - (*object*) - die Koordinaten des linken oberen Elements, das als ViewPort verwendet wird 
            - **_left_** - (*number*) - die linke Koordinate
            - **_top_** - (*number*) - die obere Koordinate
    - **_endPoint?_** - (*object*) - ein Objekt mit den Attributen:
        - **_absolute_** - (*object*) - die Koordinaten der linken oberen Ecke des Dokuments
            - **_left_** - (*number*) - die linke Koordinate
            - **_top_** - (*number*) - die obere Koordinate
        - **_relative_** - (*object*) - die Koordinaten des linken oberen Elements, das als ViewPort verwendet wird 
            - **_left_** - (*number*) - die linke Koordinate
            - **_top_** - (*number*) - die obere Koordinate
    - **_startDate?_** - (*Date*) - das Datum, das dem Startpunkt entspricht
    - **_endDate?_** - (*Date*) - das Datum, das dem Endpunkt entspricht
    - **_tasksBetweenDates?_** - (*Array&lt;Task&gt;*) - ein Array von Tasks zwischen dem Start- und Enddatum
    - **_tasksInRows?_** - (*Array&lt;Task&gt;*) - ein Array von Tasks, die vertikal zwischen Start- und Endkoordinaten ausgewählt sind
- <span class="subproperty">**singleRow?**</span> - (*boolean*) - true, um die Auswahl nur in einer Zeile zu ermöglichen, die der Höhe einer Aufgabe entspricht
- <span class="subproperty">**ignore?**</span> - (*string*) - CSS-Selektor. Drag-n-drop wird für Elemente, die dem Selektor entsprechen, nicht aktiviert
- <span class="subproperty">**useKey?**</span> - (*string | boolean*) - falls die Eigenschaft angegeben ist, wird Drag-n-drop nur aktiviert, wenn die angegebene Modifikatortaste gedrückt wird. Unterstützte Werte: "ctrlKey", "shiftKey", "metaKey", "altKey"
- <span class="submethod">**render? (startPoint, endPoint): any**</span> - eine Funktion, die ein während des Dragens gerendertes Element erzeugt. Nimmt zwei Parameter entgegen:
    - **_startPoint?_** - (*object*) - ein Objekt mit den Attributen:
        - **_absolute_** - (*object*) - die Koordinaten der linken oberen Ecke des Dokuments
            - **_left_** - (*number*) - die linke Koordinate
            - **_top_** - (*number*) - die obere Koordinate
        - **_relative_** - (*object*) - die Koordinaten des linken oberen Elements, das als ViewPort verwendet wird 
            - **_left_** - (*number*) - die linke Koordinate
            - **_top_** - (*number*) - die obere Koordinate
    - **_endPoint?_** - (*object*) - ein Objekt mit den Attributen:
        - **_absolute_** - (*object*) - die Koordinaten der linken oberen Ecke des Dokuments
            - **_left_** - (*number*) - die linke Koordinate
            - **_top_** - (*number*) - die obere Koordinate
        - **_relative_** - (*object*) - die Koordinaten des linken oberen Elements, das als ViewPort verwendet wird 
            - **_left_** - (*number*) - die linke Koordinate
            - **_top_** - (*number*) - die obere Koordinate


## Ereignisse

Sie können die folgenden Ereignisse an das Element anhängen, das als ViewPort übergeben wird (standardmäßig gantt.$task_data – ein Teil der Timeline mit Aufgabenbalken):

- **onBeforeDrag** - löst aus, nachdem die Maustaste gedrückt wurde, bevor das Ziehen beginnt
- **onDrag** - löst aus, jedes Mal nachdem das Ziehen gestartet wurde, aber bevor die Maustaste losgelassen wird
- **onBeforeDragEnd** - löst aus, nachdem die Maustaste losgelassen wurde, aber bevor das gerenderte Element gelöscht wird und die Aufgaben unter der Auswahl gesucht werden
- **onDragEnd** - löst aus, nachdem das gerenderte Element entfernt und Aufgaben unter der Auswahl gefunden wurden, aber bevor der Callback aufgerufen wird (falls angegeben)