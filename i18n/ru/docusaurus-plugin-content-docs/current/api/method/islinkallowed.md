---
sidebar_label: isLinkAllowed
title: isLinkAllowed method
description: "проверяет, является ли указанная ссылка валидной"
---

# isLinkAllowed

### Description

@short: Проверяет, является ли указанная ссылка валидной

@signature: isLinkAllowed: (linkOrFrom: string | number | LinkForValidation, from_start?: boolean, to?: string | number | null | undefined, to_start?: boolean) =\> boolean

### Parameters

- `linkOrFrom` - (required) *string | number | LinkForValidation* -         может быть либо ID исходной (предшествующей) задачи, либо объектом ссылки с такими свойствами:
- `from_start` - (optional) *boolean* - необязательно, указывает, перетаскивается ли ссылка с начала исходной (предшествующей) задачи (*true*) или с её конца (*false*). Не требуется, если первый параметр - объект
- `to` - (optional) *string | number | null | undefined* -        необязательно, ID целевой (последующей) задачи. Может быть *null* или *undefined*, если целевая задача ещё не указана. Не требуется, если первый параметр - объект
- `to_start` - (optional) *boolean* - необязательно, указывает, перетаскивается ли ссылка к началу целевой (последующей) задачи (*true*) или к её концу (*false*). Не требуется, если первый параметр - объект

### Returns
- ` value` - (boolean) - <i>true</i>, если ссылка валидна. Иначе <i>false</i>

### Example

~~~jsx
const link = {
    source:2,
    target:2,
    type:gantt.config.link.start_to_start
};
if(gantt.isLinkAllowed(link))// -> false (потому что source==target)
    gantt.addLink(link);
~~~

### Details

Объект ссылки здесь отличается от объекта [Link](guides/link-properties.md) и содержит только 3 свойства:

- **source** - (*string | number*) - ID исходной (предшествующей) задачи.
- **target** - (*string | number*) - ID целевой (последующей) задачи.
- **type** - (*string*) - тип ссылки.

Ссылка считается недействительной в следующих случаях:

1. ID исходной задачи совпадает с ID целевой задачи.
2. Тип установлен в значение, отличное от 0, 1, 2 или 3.
3. Ссылка не проходит проверку валидности.
4. Ссылка создаётся от задачи проекта к её подзадаче, так как даты задачи проекта зависят от её дочерних задач.

:::note

Этот метод вызывает событие [onLinkValidation](api/event/onlinkvalidation.md). Если это событие возвращает `false`, ссылка также считается недействительной.
 
:::

<br>

Альтернативно, метод можно вызвать так:

~~~js
gantt.isLinkAllowed(from, from_start, to, to_start )
~~~

Вот что означают аргументы:

- **from** - (*string | number | object*) - либо ID исходной (предшествующей) задачи, либо объект ссылки с этими свойствами:
- **from_start?** - (*boolean*) - необязательно, указывает, перетаскивается ли ссылка с начала исходной задачи (*true*) или с её конца (*false*). Не нужен, если первый параметр - объект
- **to?** - (*string | number | null | undefined*) - необязательно, ID целевой (последующей) задачи. Может быть *null* или *undefined*, если ещё не указан. Не нужен, если первый параметр - объект
- **to_start?** - (*boolean*) - необязательно, указывает, перетаскивается ли ссылка к началу целевой задачи (*true*) или к её концу (*false*). Не нужен, если первый параметр - объект

Например, приведённый выше пример можно переписать так:

~~~js
//var link = {
//    source:2,
//    target:2,
//    type:gantt.config.link.start_to_start
//};

if(gantt.isLinkAllowed(2, true, 2, true))// -> false (потому что source==target)
    //делать что-то
    
~~~

