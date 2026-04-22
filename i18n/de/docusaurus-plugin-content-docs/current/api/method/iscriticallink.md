---
sidebar_label: isCriticalLink
title: isCriticalLink method
description: "prüft, ob der angegebene Link kritisch ist"
---

# isCriticalLink

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

### Description

@short: Prüft, ob der angegebene Link kritisch ist

@signature: isCriticalLink: (link: Link) =\> boolean

### Parameters

- `link` - (erforderlich) *Link* - das Objekt des Links

### Returns
- `value` - (boolean) - 'true', falls der angegebene Link kritisch ist, ansonsten 'false'

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
- [Kritischer Pfad](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)

### Details

:::note
Diese Methode ist in der **critical_path**-Erweiterung definiert, daher müssen Sie das [critical_path](guides/extensions-list.md#critical-path) Plugin aktivieren. Lesen Sie die Details im Artikel [Kritischer Pfad](guides/critical-path.md).
:::

### Related API
- [highlight_critical_path](api/config/highlight_critical_path.md)
- [isCriticalTask](api/method/iscriticaltask.md)

### Related Guides
- [Kritischer Pfad](guides/critical-path.md)