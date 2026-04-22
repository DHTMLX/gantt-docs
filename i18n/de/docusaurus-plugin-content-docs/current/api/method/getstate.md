---
sidebar_label: getState
title: getState Methode
description: "liefert den aktuellen Zustand des Gantt-Diagramms"
---

# getState

### Description

@short: Ermittelt den aktuellen Zustand des Gantt-Diagramms

@signature: getState: () =\> GanttUIState

### Returns
- ` obj` - (GanttUIState) - das Zustandsobjekt

### Example

~~~jsx
const opened_task = gantt.getState().lightbox;
~~~

### Details
- **autoscroll** - (*boolean*) - zeigt, ob das Gantt-Diagramm auto-scrollt (*true*). Wird nur hinzugefügt, wenn die [*click_drag*](guides/extensions-list.md#advanced-drag-n-drop) Erweiterung aktiviert ist  
- **batch_update** - (*boolean*) - der Aktualisierungsmodus. *true*, wenn die Methode innerhalb der [*batchUpdate*](api/method/batchupdate.md) Methode aufgerufen wird.  
- **drag_from_start** - (*boolean | null*) - der Größenänderungsmodus einer Aufgabe. *true* bedeutet, dass die Aufgabe vom Start aus angepasst wird, *false* bedeutet, dass sie vom Ende aus angepasst wird. Wenn die Aufgabe nicht angepasst wird, ist der Wert *null*.  
- **drag_id** - (*string | null | undefined*) - die ID der Aufgabe, die der Benutzer momentan im Gantt-Diagramm zieht. *undefined* oder *null*, falls keine Aufgaben gezogen werden.  
- **drag_mode** - (*string | null | undefined*) - der Drag-Modus. Hat diese Werte: 'move','resize','progress', 'ignore' wenn eine Aufgabe gezogen wird. Andernfalls hat er *null* oder *undefined* Wert.  
- **fullscreen** - (*boolean*) - das Flag für den Vollbildmodus. *true*, wenn das Gantt-Diagramm im Vollbildmodus ist, *false* ansonsten.  
- **lightbox** - (*string | null | undefined*) - die ID einer Aufgabe, die derzeit im Lightbox geöffnet ist. *undefined* oder *null*, wenn keine Aufgaben im Lightbox geöffnet sind.  
- **link_from_start** - (*boolean | null*) - der neue Link-Erstellungsstatus; gibt *true* zurück, wenn der Link vom Start der Vorgänger-Aufgabe erstellt wird.  
- **link_landing_area** - (*boolean*) - der neue Link-Erstellungsstatus; gibt *true* zurück, wenn sich der Mauszeiger auf das Link-Zieh-Element (Bubble) richtet.  
- **link_source_id** - (*string | number | null*) - der neue Link-Erstellungsstatus. Die ID der Quellaufgabe (Vorgänger).  
- **link_target_id** - (*string | number | null*) - der neue Link-Erstellungsstatus. Die ID der Zielaufgabe (Nachfolger).  
- **link_to_start** - (*boolean*) - der neue Link-Erstellungsstatus; gibt *true* zurück, wenn der Link am Anfang der Nachfolger-Aufgabe erstellt wird.  
- **min_date** - (*Date*) - das Datum, ab dem Aufgaben im Diagramm angezeigt werden  
- **max_date** - (*Date*) - das Datum, bis zu dem Aufgaben im Diagramm angezeigt werden  
- **scale_unit** - (*string*) - die Einheit des Hintergrundrasters der Timeline  
- **scale_step** - (*number*) - der Schritt des Hintergrundrasters der Timeline  
- **selected_task** - (*string | null | undefined*) - die ID der aktuell ausgewählten Aufgabe. *undefined* oder *null*, falls im Gantt-Diagramm keine Aufgaben ausgewählt sind.

:::note
Hinweis: Das Verhalten des Gantt-Diagramms kann nicht durch Änderungen an diesem Objekt verändert werden.
:::