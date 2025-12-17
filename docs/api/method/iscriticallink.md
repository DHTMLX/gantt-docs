---
sidebar_label: isCriticalLink
title: isCriticalLink method
description: "checks whether the specified link is critical"
---

# isCriticalLink

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: Checks whether the specified link is critical

@signature: isCriticalLink: (link: Link) =\> boolean

### Parameters

- `link` - (required) *Link* - the link's object

### Returns
- ` value` - (boolean) - 'true' if the specified link is critical, 'false' otherwise

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

gantt.isCriticalLink(gantt.getLink(2));// ->'false' /*!*/
~~~

### Related samples
- [Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)

### Details

:::note
This method is defined in the **critical_path** extension, so you need to activate the [critical_path](guides/extensions-list.md#critical-path) plugin. Read the details in the [Critical Path](guides/critical-path.md) article. 
:::


### Related API
- [highlight_critical_path](api/config/highlight_critical_path.md)
- [isCriticalTask](api/method/iscriticaltask.md)

### Related Guides
- [Critical Path](guides/critical-path.md)

