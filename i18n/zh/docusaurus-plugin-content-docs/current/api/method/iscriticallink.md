---
sidebar_label: isCriticalLink
title: isCriticalLink method
description: "判断给定的链接是否为关键路径链接"
---

# isCriticalLink
:::info
 此功能仅包含在 PRO 版本中。 
:::
### Description

@short: 判断给定的链接是否为关键路径链接

@signature: isCriticalLink: (link: Link) =\> boolean

### Parameters

- `link` - (required) *Link* - 要检查的链接对象

### Returns
- ` value` - (boolean) - 如果链接是关键路径，返回 'true'，否则返回 'false'

### Example

~~~jsx
const tasks = {
    data:[
      {id:1, text:"Project #1", start_date:"01-04-2023", duration:18, type:"project"},
      {id:2, text:"Task #1", start_date:"02-04-2023", duration:8, parent:1},
      {id:3, text:"Task #2", start_date:"13-04-2023", duration:8, parent:1}
    ],
    links:[
        {id:1, source:1, target:2, type:"1"},
        {id:2, source:2, target:3, type:"0"}
    ]
};

gantt.config.highlight_critical_path = true; /*!*/
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.isCriticalLink(gantt.getLink(2)); // -> 'false' /*!*/
~~~

### Related samples
- [Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)

### Details

:::note
 此方法属于 **critical_path** 扩展的一部分，请确保启用了 [critical_path](guides/extensions-list.md) 插件。更多信息请参见 [关键路径](guides/critical-path.md) 文章。 
:::


![iscritical_path](/img/iscritical_path.png)

### Related API
- [highlight_critical_path](api/config/highlight_critical_path.md)
- [isCriticalTask](api/method/iscriticaltask.md)

### Related Guides
- [关键路径](guides/critical-path.md)

