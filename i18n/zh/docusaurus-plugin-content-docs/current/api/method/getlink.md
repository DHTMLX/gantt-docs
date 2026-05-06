---
sidebar_label: getLink
title: getLink 方法
description: "根据指定 ID 返回依赖链接对象"
---

# getLink

### Description

@short: 根据指定 ID 返回依赖链接对象

@signature: getLink: (id: string | number) =\> Link

### Parameters

- `id` - (required) *string | number* - 链接 ID

### Returns
- `link` - (Link) - 链接对象

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

有关如何获取与特定任务相关的所有链接的信息，请参阅 [Getting the Link Object/Id](guides/link-object-operations.md#getting-the-links-related-to-a-certain-task) 文章。