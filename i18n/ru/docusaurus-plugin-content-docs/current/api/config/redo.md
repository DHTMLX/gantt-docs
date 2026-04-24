---
sidebar_label: redo
title: Конфигурация Redo
description: "Включает функциональность Redo для диаграммы Ганта"
---

# Повтор

### Description

@short: Включает функциональность Redo для диаграммы Ганта

@signature: redo: boolean

### Example

~~~jsx
gantt.config.redo = true;
~~~

**Default value:** true

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
Это опция определяется в расширении **undo**, поэтому вам нужно включить плагин [undo](guides/extensions-list.md#undo). Подробнее см. в статье [Undo/Redo Functionality](guides/undo-redo.md). 
:::

### Related API
- - [undo](api/config/undo.md)
- - [undo_actions](api/config/undo_actions.md)
- - [undo_steps](api/config/undo_steps.md)
- - [undo_types](api/config/undo_types.md)

### Related Guides
- [Функциональность Undo/Redo](guides/undo-redo.md)

### Change log
- добавлено в версии 4.0