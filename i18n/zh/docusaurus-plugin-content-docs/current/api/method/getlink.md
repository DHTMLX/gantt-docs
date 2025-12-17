---
sidebar_label: getLink
title: getLink method
description: "使用给定的 id 获取依赖关系 link 对象"
---

# getLink

### Description

@short: 使用给定的 id 获取依赖关系 link 对象

@signature: getLink: (id: string | number) =\> Link

### Parameters

- `id` - (required) *string | number* -    链接的 id

### Returns
- `link` - (Link) - 该链接对象

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

如需了解如何获取与特定任务相关的所有链接，请参考 [获取 Link 对象/ID](guides/link-object-operations.md) 文章。
