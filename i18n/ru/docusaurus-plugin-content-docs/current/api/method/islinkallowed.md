---
sidebar_label: isLinkAllowed
title: метод isLinkAllowed
description: "проверяет, является ли указанная ссылка корректной"
---

# isLinkAllowed

### Description

@short: Проверяет, является ли указанная ссылка корректной

@signature: isLinkAllowed: (linkOrFrom: string | number | LinkForValidation, from_start?: boolean, to?: string | number | null | undefined, to_start?: boolean) => boolean

### Parameters

- `linkOrFrom` - (required) *string | number | LinkForValidation* - либо ID исходной (предшествующей) задачи, либо объект ссылки со следующими свойствами:
- `from_start` -	(optional) *boolean* 	-	необязательно, указывает, перетаскивается ли ссылка с начала исходной (предшествующей) задачи (*true*) или с её конца (*false*). Не требуется, если первый параметр задан как объект
- `to`	 - (optional) *string | number | null | undefined* 	-	необязательный, идентификатор целевой (последующей) задачи. Может иметь значения *null* или *undefined*, если целевая задача ещё не задана. Не требуется, если первый параметр задан как объект
- `to_start` -	(optional) *boolean* 	-	необязательно, указывает, перетаскивается ли ссылка к началу целевой (последующей) задачи (*true*) или от её конца (*false*). Не требуется, если первый параметр задан как объект

### Returns
- ` value` - (boolean) - <i>true</i>, если ссылка корректна. В противном случае <i>false</i>

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

Объект ссылки отличается от объекта [Link](guides/link-properties.md) и имеет только 3 свойства:

- **source** - (*string | number*) - идентификатор исходной (предшествующей) задачи.
- **target** - (*string | number*) - идентификатор целевой (последующей) задачи.
- **type** - (*string*) - тип связи.

Случаи, когда ссылка считается некорректной:

1. ID исходной задачи равен ID целевой задачи.
2. Если значение типа установлено в значение, отличное от 0, 1, 2 или 3.
3. Если ссылка не прошла проверку валидности.
4. Если ссылка создаётся из задачи проекта в её подзадачу. Даты задачи проекта зависят от дат дочерних задач.

:::note
Метод вызывает событие [onLinkValidation](api/event/onlinkvalidation.md). Следовательно, если событие onLinkValidation возвращает `false`, ссылка также будет считаться некорректной.
 
:::

Примечание, существует второй способ вызова метода:

~~~js
gantt.isLinkAllowed(from, from_start, to, to_start )
~~~

Вот описание типов аргументов:

- **from** - (*string | number | object*) - либо ID исходной (предшествующей) задачи, либо объект ссылки со следующими свойствами:
- **from_start?** - (*boolean*) - необязательный, задаёт, перетаскивается ли ссылка с начала исходной (предшествующей) задачи (*true*) или с её конца (*false*). Не требуется, если первый параметр задан как объект
- **to?** - (*string | number | null | undefined*) - необязательный, идентификатор целевой (последующей) задачи. Может иметь значения *null* или *undefined*, если целевая задача ещё не задана. Не требуется, если первый параметр задан как объект
- **to_start?** - (*boolean*) - необязательный, задаёт, перетаскивается ли ссылка к началу целевой (последующей) задачи (*true*) или от её конца (*false*). Не требуется, если первый параметр задан как объект

Например, приведённый выше код следует изменить так:

~~~js
//var link = {
//    source:2,
//    target:2,
//    type:gantt.config.link.start_to_start
//};

if(gantt.isLinkAllowed(2, true, 2, true))// -> false (потому что source==target)
    //do something
    
~~~