---
sidebar_label: drag_mode
title: drag_mode config
description: "speichert die Typen der verfügbaren Drag-and-Drop-Modi"
---

# drag_mode

### Description

@short: Speichert die Typen der verfügbaren Drag-and-Drop-Modi

@signature: drag_mode: \{ resize?: string; progress?: string; move?: string; ignore?: string; \}

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
    const modes = gantt.config.drag_mode;
    switch (mode){
        case modes.move:
        
        break;
        case modes.resize:
        
        break;
        case modes.progress:
        
        break;
    
    }
    //...
});
~~~

**Standardwert:**\{
	"resize":"resize",
	"progress":"progress",
	"move":"move",
	"ignore":"ignore"
\}

### Details

Sie sollten die bestehenden Namen der Drag-and-Drop-Modi nicht ändern. Andernfalls funktioniert diese Funktionalität möglicherweise nicht mehr. Sie können jedoch neue Eigenschaften hinzufügen, wenn Sie benutzerdefiniertes Verhalten implementieren möchten.
Wenn Sie einen bestimmten Drag-Modus deaktivieren möchten, ist es besser, die [drag_move](api/config/drag_move.md), [drag_resize](api/config/drag_resize.md), [drag_progress](api/config/drag_progress.md) Konfigurationen zu verwenden.

- **resize** - (*string*) - der Modus, in dem der Benutzer den Balken einer Aufgabe zieht, um deren Dauer zu ändern.
- **progress** - (*string*) - der Modus, in dem der Benutzer den Fortschrittsknopf eines Aufgabenbalkens zieht.
- **move** - (*string*) - der Modus, in dem der Benutzer den Balken einer Aufgabe zieht, um ihn zu ersetzen.
- **ignore** - (*string*) - der Service-Modus, der die Drag-and-Drop-Aktion einschränkt.