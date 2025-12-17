---
sidebar_label: onLinkValidation
title: onLinkValidation event
description: "срабатывает, когда пользователь добавляет новую ссылку, и dhtmlxGantt проверяет, является ли ссылка валидной"
---

# onLinkValidation

### Description

@short: Срабатывает, когда пользователь добавляет новую ссылку, и dhtmlxGantt проверяет, является ли ссылка валидной

@signature: onLinkValidation: (link: Link) =\> boolean;

### Parameters

- `link` - (required) *Link* - объект ссылки

### Returns
- ` result` - (boolean) - указывает, будет ли выполнено действие по умолчанию для события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onLinkValidation", function(link){
    //любая ваша логика здесь
});
~~~

### Details

:::note
 Событие вызывается внутри метода [isLinkAllowed](api/method/islinkallowed.md). 
:::

Это событие происходит, когда пользователь создаёт новую ссылку между задачами с помощью drag-and-drop мышью.

Если обработчик события возвращает `false`, круглый контроллер целевой задачи станет красным, и ссылка не будет создана. Возврат `true` выделит круглый контроллер оранжевым цветом и позволит создать ссылку.

### Related API
- [isLinkAllowed](api/method/islinkallowed.md)

