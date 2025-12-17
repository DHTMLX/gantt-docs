---
sidebar_label: order_branch
title: order_branch config
description: "включает режим 'branch' для вертикального переставления задач на одном уровне дерева"
---

# order_branch

### Description

@short: Включает режим 'branch' для вертикального переставления задач на одном уровне дерева

@signature: order_branch: string | boolean

### Example

~~~jsx
gantt.config.order_branch = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Branch ordering](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Details

Этот параметр позволяет изменять порядок задач, сохраняя их на текущем уровне дерева. Например, подзадача останется подзадачей и не станет родительской задачей.

## Повышение производительности

При работе с большим количеством задач стандартный способ перестановки веток может замедлять работу.
Для улучшения производительности можно переключиться в режим **"marker"**.

~~~js
gantt.config.order_branch = "marker";
~~~

:::note
sample [Branch ordering - highlighting mode](https://docs.dhtmlx.com/gantt/samples/07_grid/14_branch_ordering_highlight.html) 
:::

В этом режиме при удерживании левой кнопки мыши перемещается только имя задачи, а обновление Gantt chart происходит только после того, как задача будет отпущена на новом месте.
В отличие от стандартного режима, перемещение задач таким способом не вызывает события onBeforeTaskMove и onAfterTaskMove.

Если нужно запретить сброс задачи в определённых позициях, используйте событие [onBeforeRowDragMove](api/event/onbeforerowdragmove.md) (работает только в режиме "marker").

### Related API
- [order_branch_free](api/config/order_branch_free.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)
- [onBeforeRowDragMove](api/event/onbeforerowdragmove.md)

### Related Guides
- [Изменение порядка задач](guides/reordering-tasks.md)

