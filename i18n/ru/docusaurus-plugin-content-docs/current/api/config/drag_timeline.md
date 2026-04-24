---
sidebar_label: drag_timeline
title: drag_timeline конфигурация
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
This option is defined in the **drag_timeline** extension, so you need to activate the [drag_timeline](guides/extensions-list.md#drag-timeline) plugin. 
:::

The config value can be either an object or the **null** value, the **null** value disables the extension.

~~~js
gantt.config.drag_timeline = null; // disables the extension
~~~

The **drag_timeline** object includes the following properties:


- **ignore** - (*string*) - CSS-селектор. Прокрутка таймлайна не будет активирована для элементов, которые соответствуют селектору

- **useKey** - (*string | boolean*) - если свойство указано, прокрутка таймлайна будет активирована только при нажатии указанного модификаторного ключа. Поддерживаемые значения: "ctrlKey", "shiftKey", "metaKey", "altKey"

- **render** - (*boolean*) - если свойство включено, прокрутка таймлайна будет повторно отрисована, когда прокрутка начата и когда она завершится