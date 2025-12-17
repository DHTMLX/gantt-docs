---
sidebar_label: drag_timeline
title: drag_timeline config
description: "настраивает поведение расширения drag_timeline"
---

# drag_timeline

### Description

@short: Настраивает поведение расширения drag_timeline

@signature: drag_timeline: null | \{ ignore?: string; useKey?: string | boolean; render?: boolean; \}

### Example

~~~jsx
gantt.config.drag_timeline = {
    ignore:".gantt_task_line, .gantt_task_link",
    useKey: false,
    render: false
};
~~~

**Default value:** \{ useKey: false, ignore: ".gantt_task_line, .gantt_task_link" \}

### Related samples
- [Drag timeline](https://docs.dhtmlx.com/gantt/samples/02_extensions/27_drag_timeline.html)

### Details

:::note
 Эта опция является частью расширения **drag_timeline**, поэтому убедитесь, что плагин [drag_timeline](guides/extensions-list.md#dragtimeline) включен. 
:::

Конфигурация может быть объектом или **null**, где значение **null** отключает расширение.

~~~js
gantt.config.drag_timeline = null; // отключает расширение
~~~

Объект **drag_timeline** поддерживает следующие свойства:


- **ignore** - (*string*) - CSS-селектор для элементов, при взаимодействии с которыми прокрутка timeline не активируется

- **useKey** - (*string | boolean*) - если задано, прокрутка timeline активируется только при удерживании указанной клавиши-модификатора. Поддерживаемые клавиши: "ctrlKey", "shiftKey", "metaKey", "altKey"

- **render** - (*boolean*) - при включении timeline будет перерисовываться в начале и в конце прокрутки
