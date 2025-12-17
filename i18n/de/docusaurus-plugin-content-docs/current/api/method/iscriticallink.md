---
sidebar_label: isCriticalLink
title: isCriticalLink method
description: "Bestimmt, ob ein gegebener Link kritisch ist"
---

# isCriticalLink
:::info
 Dieses Feature ist exklusiv in der PRO Edition verfügbar. 
:::
### Description

@short: Bestimmt, ob ein gegebener Link kritisch ist

@signature: isCriticalLink: (link: Link) =\> boolean

### Parameters

- `link` - (required) *Link* - das Link-Objekt, das überprüft werden soll

### Returns
- ` value` - (boolean) - gibt 'true' zurück, wenn der Link kritisch ist, sonst 'false'

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
 Diese Methode ist Teil der **critical_path** Erweiterung, daher stellen Sie sicher, dass das [critical_path](guides/extensions-list.md#criticalpath) Plugin aktiviert ist. Weitere Informationen finden Sie im Artikel ["Kritischer Pfad"](guides/critical-path.md). 
:::


![iscritical_path](/img/iscritical_path.png)

### Related API
- [highlight_critical_path](api/config/highlight_critical_path.md)
- [isCriticalTask](api/method/iscriticaltask.md)

### Related Guides
- ["Kritischer Pfad"](guides/critical-path.md)

