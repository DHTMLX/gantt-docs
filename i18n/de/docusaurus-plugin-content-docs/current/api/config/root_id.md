---
sidebar_label: root_id
title: root_id config
description: "setzt die ID des virtuellen Root-Elements"
---

# root_id

### Description

@short: Setzt die ID des virtuellen Root-Elements

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

**root_id** definiert den virtuellen Root-Knoten innerhalb des Aufgabenbaums.
Wenn die *parent*-Eigenschaft einer Aufgabe mit dem Wert von **root_id** übereinstimmt, wird diese Aufgabe auf der obersten Ebene des Gantt-Baums angezeigt.

- Die [parent](guides/loading.md#dataproperties)-Eigenschaft einer Aufgabe sollte die ID der übergeordneten Aufgabe im Aufgabenbaum angeben.
- Aufgaben mit einem parent-Wert, der einer [existierenden Aufgabe](api/method/istaskexists.md) entspricht, werden als Unteraufgaben unter dieser Aufgabe angezeigt.
- Aufgaben, deren parent-Wert gleich *gantt.config.root_id* (Standard ist numerisch 0) ist oder undefiniert bleibt, erscheinen auf der obersten Ebene des Aufgabenbaums.
- Aufgaben mit einem parent-Wert, der sich auf eine [nicht existierende Aufgaben-ID](api/method/istaskexists.md) bezieht und nicht [streng gleich](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality) zu **root_id** ist, werden im Aufgabenbaum nicht angezeigt.

