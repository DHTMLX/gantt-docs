---
sidebar_label: getLinks
title: getLinks method
description: "returns all links presented in the Gantt chart"
---

# getLinks

### Description

@short: 返回在甘特图中显示的所有链接

@signature: getLinks: () =\> Array \<Link\>

### Returns
- `links` - (Array \<Link\>) - 链接对象的数组

### Example

~~~jsx
const links = gantt.getLinks();
~~~

### Details

有关如何获取与特定任务相关的所有链接的信息，请参阅 [Getting the Link Object/Id](guides/link-object-operations.md#getting-the-links-related-to-a-certain-task) 和 [getLink](api/method/getlink.md) 文章。