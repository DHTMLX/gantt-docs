---
sidebar_label: getLink
title: getLink method
description: "возвращает объект зависимости связи по указанному id"
---

# getLink

### Description

@short: Возвращает объект зависимости связи по указанному id

@signature: getLink: (id: string | number) =\> Link

### Parameters

- `id` - (required) *string | number* - идентификатор связи

### Returns
- `link` - (Link) - объект связи

### Example

~~~jsx
gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:1
});
gantt.getLink(1);// -> {id:1, source:1, target:2, type:1}
~~~

### Details

Для получения информации о том, как получить все связи, связанные с конкретной задачей, см. статью [Получение объекта связи/идентификатора](guides/link-object-operations.md#getting-the-links-related-to-a-certain-task).