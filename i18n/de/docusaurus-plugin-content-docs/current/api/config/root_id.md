---
sidebar_label: root_id
title: root_id-Konfiguration
description: "legt die ID des virtuellen Wurzelelements fest"
---

# root_id

### Description

@short: Legt die ID des virtuellen Wurzelelements fest

@signature: root_id: string | number

### Example

~~~jsx
gantt.config.root_id = "root"; /*!*/

var tasks =  {
    data:[
      {id:1, text:"Project #2", start_date:"01-04-2013", duration:18, parent:"root"}, /*!*/
      {id:2, text:"Task #1",     start_date:"02-04-2013", duration:8,  parent:1},
      {id:3, text:"Task #2",    start_date:"11-04-2013", duration:8,  parent:1}
    ],
    links:[]
};

gantt.init("gantt_here");

gantt.parse(tasks);
~~~


**Default value:** "0"

### Details

**root_id** refers to the virtual root node of the task tree.
If the value of the *parent* property of a task is set to the value of the **root_id** config, such task will be displayed at the top level of the gantt tree.

- Die [parent](guides/loading.md#dataproperties) Eigenschaft eines Tasks sollte die ID des Elternteils im Aufgabenbaum enthalten.
- Tasks, deren parent-Wert die ID eines bestehenden Tasks enthält, erscheinen als Unteraufgaben der referenzierten Elemente.
- Tasks, deren parent-Wert dem Wert der **root_id**-Konfiguration entspricht oder undefiniert ist, befinden sich auf der oberen Ebene des Aufgabenbaums.
- Tasks, deren parent eine [nicht existente Task-ID](api/method/istaskexists.md) enthält und nicht strikt gleich dem **root_id** ist, werden nicht im Aufgabenbaum angezeigt.