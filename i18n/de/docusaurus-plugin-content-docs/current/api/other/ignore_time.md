---
sidebar_label: ignore_time
title: ignore_time-Konfiguration
description: "Blendet eine Zeiteinheit in der Zeitachse aus"
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

Die **ignore_time**-Methode ist eine Funktion, die das Datum der Zelle als Parameter entgegennimmt. Um eine Einheit auszublenden, geben Sie dafür *true* zurück.

### Related Guides
- [Ausblenden von Zeiteinheiten in der Skala](guides/custom-scale.md)
