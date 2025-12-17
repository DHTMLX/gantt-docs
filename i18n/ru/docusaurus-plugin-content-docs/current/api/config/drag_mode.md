---
sidebar_label: drag_mode
title: drag_mode config
description: "содержит различные типы режимов drag-and-drop, доступных в системе"
---

# drag_mode

### Description

@short: Содержит различные типы режимов drag-and-drop, доступных в системе

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

Важно не изменять существующие названия режимов drag_mode, так как это приведёт к нарушению связанной функциональности. Однако вы можете добавить новые свойства, если хотите поддержать кастомное поведение.
Если необходимо отключить конкретный режим drag, лучше использовать настройки [drag_move](api/config/drag_move.md), [drag_resize](api/config/drag_resize.md) или [drag_progress](api/config/drag_progress.md).

- **resize** - (*string*) - этот режим позволяет пользователю перетаскивать task bar для изменения его длительности.
- **progress** - (*string*) - этот режим даёт возможность перетаскивать progress handle на task bar.
- **move** - (*string*) - этот режим позволяет перетаскивать task bar для его перемещения.
- **ignore** - (*string*) - специальный режим, который отключает действия drag-and-drop.

