---
sidebar_label: onLinkValidation
title: onLinkValidation событие
description: "Срабатывает, когда пользователь добавляет новую связь, и dhtmlxGantt проверяет корректность связи"
---

# onLinkValidation

### Description

@short: Срабатывает, когда пользователь добавляет новую связь, и dhtmlxGantt проверяет корректность связи

@signature: onLinkValidation: (link: Link) => boolean;

### Parameters

- `link` - (required) *Link* - сам объект связи

### Returns
- `result` - (boolean) - определяет, будет ли выполнено действие по умолчанию у события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onLinkValidation", function(link){
    // любая ваша логика здесь
});
~~~

### Details

:::note
The event fires in the [isLinkAllowed](api/method/islinkallowed.md) method. 
:::

Событие срабатывает, когда пользователь создает новую связь между задачами путём перетаскивания мышью.

Если обработчик события возвращает `false`, целевой задачей будет окрашен красным цветом круглый маркер, и связь не будет добавлена. Возвращение `true` подсветит круглый маркер оранжевым цветом и позволит создать связь.

### Related API
- [isLinkAllowed](api/method/islinkallowed.md)