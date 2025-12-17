---
sidebar_label: getLink
title: getLink method
description: "получает объект зависимости (link) по заданному id"
---

# getLink

### Description

@short: Получает объект зависимости (link) по заданному id

@signature: getLink: (id: string | number) =\> Link

### Parameters

- `id` - (required) *string | number* -    id ссылки

### Returns
- `link` - (Link) - объект ссылки

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

Чтобы узнать, как получить все ссылки, связанные с конкретной задачей, обратитесь к статье [Получение объекта/ID связи](guides/link-object-operations.md#gettingthelinksrelatedtoacertaintask).
