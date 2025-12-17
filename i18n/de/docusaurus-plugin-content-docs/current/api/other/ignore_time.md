---
sidebar_label: ignore_time
title: ignore_time config
description: "blendet eine Zeiteinheit in der Zeitskala aus"
---

# ignore_time

### Description

@short: Blendet eine Zeiteinheit in der Zeitskala aus

@signature: ignore_time: GanttCallback

### Example

~~~jsx
// 0 steht für Sonntag, 6 für Samstag
gantt.ignore_time = function(date){
   if(date.getDay() == 0 || date.getDay() == 6)
      return true;
};
~~~

### Details

Die **ignore_time**-Methode funktioniert, indem sie das Datum einer Zelle als Parameter erhält. Wenn Sie eine bestimmte Zeiteinheit ausblenden möchten, geben Sie für dieses Datum einfach *true* zurück.

### Related Guides
- ["Ausblenden von Zeiteinheiten in der Skala"](guides/custom-scale.md)
