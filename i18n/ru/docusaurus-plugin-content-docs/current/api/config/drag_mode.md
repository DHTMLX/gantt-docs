---
sidebar_label: drag_mode
title: конфигурация drag_mode
description: "хранит типы доступных режимов перетаскивания"
---

# drag_mode

### Description

@short: Хранит типы доступных режимов перетаскивания

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

**Значение по умолчанию:**\{
	"resize":"resize",
	"progress":"progress",
	"move":"move",
	"ignore":"ignore"
\}

### Details

Не следует менять существующие имена режимов перетаскивания. В противном случае соответствующая функциональность перестанет работать. Но вы можете добавлять новые свойства, если хотите реализовать пользовательское поведение.
Если вы хотите отключить конкретный режим перетаскивания, лучше использовать конфигурации [drag_move](api/config/drag_move.md), [drag_resize](api/config/drag_resize.md), [drag_progress](api/config/drag_progress.md).

- **resize** - (*string*) - режим, при котором пользователь перетаскивает полосу задачи, чтобы изменить ее продолжительность.
- **progress** - (*string*) - режим, при котором пользователь перетаскивает ползунок прогресса полосы задачи.
- **move** - (*string*) - режим, при котором пользователь перетаскивает полосу задачи, чтобы переместить её.
- **ignore** - (*string*) - режим игнорирования, который ограничивает выполнение действия перетаскивания.