---
sidebar_label: redo
title: Метод redo
description: "повторно применяет отменённые изменения к диаграмме Ганта"
---

# redo

### Описание

@short: Повторно применяет отменённые изменения к диаграмме Ганта

@signature: redo: () =\> void

### Пример

~~~jsx
gantt.redo();
~~~

### Связанные примеры
- [Изменения Undo/Redo в Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Детали

:::note
Этот метод определяется в расширении **undo**, поэтому необходимо включить плагин [undo](guides/extensions-list.md#undo). Подробности читайте в статье [Undo/Redo Functionality](guides/undo-redo.md).
:::

### Связанные API
- [undo](api/method/undo.md)
- [getRedoStack](api/method/getredostack.md)
- [clearRedoStack](api/method/clearredostack.md)
- [onBeforeRedo](api/event/onbeforeredo.md)
- [onAfterRedo](api/event/onafterredo.md)

### Связанные руководства
- [Undo/Redo Functionality](guides/undo-redo.md)

### Журнал изменений
- добавлено в версии 4.0