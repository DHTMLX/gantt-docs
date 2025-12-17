---
sidebar_label: isCriticalLink
title: isCriticalLink method
description: "определяет, является ли заданная связь критической"
---

# isCriticalLink
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Определяет, является ли заданная связь критической

@signature: isCriticalLink: (link: Link) =\> boolean

### Parameters

- `link` - (required) *Link* - объект связи для проверки

### Returns
- ` value` - (boolean) - возвращает 'true', если связь критическая, иначе 'false'

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
Этот метод является частью расширения **critical_path**, поэтому убедитесь, что плагин [critical_path](guides/extensions-list.md#criticalpath) включен. Более подробная информация доступна в статье [Критический путь](guides/critical-path.md). 
:::


![iscritical_path](/img/iscritical_path.png)

### Related API
- [highlight_critical_path](api/config/highlight_critical_path.md)
- [isCriticalTask](api/method/iscriticaltask.md)

### Related Guides
- [Критический путь](guides/critical-path.md)

