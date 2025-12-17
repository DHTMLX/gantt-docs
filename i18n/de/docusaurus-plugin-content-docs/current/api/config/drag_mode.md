---
sidebar_label: drag_mode
title: drag_mode config
description: "enthält die verschiedenen verfügbaren drag-and-drop Modi"
---

# drag_mode

### Description

@short: Enthält die verschiedenen verfügbaren drag-and-drop Modi

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

**Default value:** \{
  "resize":"resize",
  "progress":"progress",
  "move":"move",
  "ignore":"ignore"
\}

### Details

Es ist wichtig, die bestehenden Namen der drag modes nicht zu ändern, da dies die zugehörige Funktionalität beeinträchtigen würde. Sie können jedoch neue Eigenschaften hinzufügen, wenn Sie benutzerdefiniertes Verhalten unterstützen möchten.
Wenn Sie einen bestimmten drag mode deaktivieren möchten, ist es besser, die Einstellungen [drag_move](api/config/drag_move.md), [drag_resize](api/config/drag_resize.md) oder [drag_progress](api/config/drag_progress.md) zu verwenden.

- **resize** - (*string*) - dieser Modus erlaubt es dem Benutzer, eine Task-Leiste zu ziehen, um deren Dauer anzupassen.
- **progress** - (*string*) - dieser Modus ermöglicht es dem Benutzer, den Fortschrittsgriff an einer Task-Leiste zu ziehen.
- **move** - (*string*) - dieser Modus erlaubt das Ziehen einer Task-Leiste, um sie neu zu positionieren.
- **ignore** - (*string*) - ein spezieller Modus, der drag-and-drop Aktionen deaktiviert.

