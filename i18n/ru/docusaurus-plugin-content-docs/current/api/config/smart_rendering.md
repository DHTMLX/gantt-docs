---
sidebar_label: smart_rendering
title: smart_rendering config
description: "активирует режим smart rendering для отображения задач и связей в gantt"
---

# smart_rendering

### Description

@short: Активирует режим smart rendering для отображения задач и связей в gantt

@signature: smart_rendering: boolean

### Example

~~~jsx
gantt.config.smart_rendering = true;
...
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

Начиная с версии 6.2, smart rendering включён по умолчанию, так как теперь он является частью основного файла *dhtmlxgantt.js*. Это означает, что нет необходимости отдельно подключать файл *dhtmlxgantt_smart_rendering.js* для активации smart rendering.

:::note
 Подключение старого файла *dhtmlxgantt_smart_rendering.js* перезапишет улучшения обновлённой встроенной функции **smart_rendering**. 
:::

### Related Guides
- [Производительность: Способы улучшения](guides/performance.md#smartrendering)
