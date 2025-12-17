---
sidebar_label: link_class
title: link_class template
description: "定义分配给链接的CSS类"
---

# link_class

### Description

@short: 定义分配给链接的CSS类

@signature: link_class: (link: Link) =\> string | void;

### Parameters

- `link` - (required) *Link* - 链接对象

### Returns
- ` text` - (string | void) - 该项目对应的CSS类

### Example

~~~jsx
gantt.templates.link_class = function(link){
    return "";
};
~~~

### Related Guides
- [依赖关系链接的模板](guides/dependency-templates.md)
