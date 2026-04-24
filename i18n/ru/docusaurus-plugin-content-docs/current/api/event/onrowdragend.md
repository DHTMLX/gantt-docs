---
sidebar_label: onRowDragEnd
title: Событие onRowDragEnd
description: "срабатывает после того, как пользователь отпускает вертикально упорядоченную строку в сетке"
---

# onRowDragEnd

### Описание

@short: Срабатывает после того, как пользователь отпускает вертикально упорядоченную строку в сетке

@signature: onRowDragEnd: (id: string | number, target: string | number) => void;

### Параметры

- `id` - (required) *string | number* - идентификатор задачи, которую пользователь перетащил вертикально в сетке
- `target` - (required) *string | number* - идентификатор задачи, которую занимает место перетаскиваемой строки

### Пример

~~~jsx
gantt.attachEvent("onRowDragEnd", function(id, target) {
    // любая ваша логика здесь
});
~~~

### Связанные образцы
- [Branch ordering](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Подробности

:::note
Событие срабатывает, когда задача перемещается указателем мыши в левой панели сетки, при включенной настройке [order_branch](api/config/order_branch.md). Если переупорядование ветвей отключено, событие никогда не будет вызвано.
:::

Параметр **target** будет содержать идентификатор ближайшей задачи, которая идет перед текущей задачей или сразу после нее.

Его значение может быть представлено в одной из двух форм:

- target=targetId — текущая задача должна располагаться непосредственно перед задачей с идентификатором targetId
- target=next:targetId — текущая задача должна располагаться непосредственно после задачи с идентификатором targetId (происходит, если вы заменяете последнюю задачу на графике)

Пример получения идентификатора цели в формате *next:targetId*:

~~~js
gantt.attachEvent("onRowDragEnd", function(id, target) {
      if(typeof(target) === "string"){
        targetTaskId  = target.substr("next:".length);
        nextTask = true;
      } else {
        targetTaskId  = target;
        nextTask = false;
      }
});
~~~

### Связанные API
- [onBeforeRowDragEnd](api/event/onbeforerowdragend.md)
- [onRowDragStart](api/event/onrowdragstart.md)
- [order_branch](api/config/order_branch.md)

### Связанные руководства
- [Reordering Tasks](guides/reordering-tasks.md)