---
sidebar_label: order_branch
title: order_branch конфигурация
description: "активирует режим 'branch', который позволяет вертикально переупорядочивать задачи на одном уровне дерева"
---

# order_branch

### Description

@short: Активирует режим 'branch', который позволяет вертикально переупорядочивать задачи на одном уровне дерева

@signature: order_branch: string | boolean

### Example

~~~jsx
gantt.config.order_branch = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Упорядочивание по ветвям](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Details

Эта опция позволяет переупорядочивать задачи, сохраняя их положение на уровне дерева. Например, подзадача никогда не станет родительской задачей.

## Повышение производительности

Если в Gantt-диаграмме много задач, режим переупорядочивания ветвей по умолчанию может замедлять производительность.
Чтобы ускорить его, можно использовать режим **"marker"**.

~~~js
gantt.config.order_branch = "marker";
~~~

:::note
пример [Порядок ветвей - режим подсветки](https://docs.dhtmlx.com/gantt/samples/07_grid/14_branch_ordering_highlight.html) 
:::

В этом режиме переупорядочиваются только имя задачи (при удерживании левой кнопки мыши) и Gantt перерисовывается только тогда, когда задача отпускается в целевую позицию (при отпускании кнопки).
В отличие от режима по умолчанию, изменение позиции задачи не вызывает срабатывание событий onBeforeTaskMove/onAfterTaskMove.

Чтобы запретить сброс задачи на конкретную позицию, используйте событие [onBeforeRowDragMove](api/event/onbeforerowdragmove.md) вместо этого (работает только в режиме "marker").

### Related API
- [order_branch_free](api/config/order_branch_free.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)
- [onBeforeRowDragMove](api/event/onbeforerowdragmove.md)

### Related Guides
- [Переупорядочение задач](guides/reordering-tasks.md)