---
sidebar_label: keys
title: keys config
description: "definiert die Hotkeys für das Gantt-Diagramm"
---

# keys

### Description

@short: Definiert die Hotkeys für das Gantt-Diagramm

@signature: keys: GanttHotkeys

### Example

~~~jsx
gantt.keys.edit_save = 32;
gantt.init("gantt_here");
~~~

### Details

Das **keys** Objekt enthält die folgenden Eigenschaften:

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <tr>
  <th>
  Property
  </th>
  <th>
  Beschreibung
  </th>
  <th>
  Standardwert
  </th>
  <th>
  Anwendbare Views
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>edit_save</td>
  <td>gibt den numerischen Code einer Tastaturtaste an, die verwendet wird, um den Bearbeitungsvorgang zu bestätigen (als Alternative zum Klicken des 'Save'-Buttons im Lightbox)</td>
  <td>13 (die 'Enter'-Taste)</td>
  <td>alle Views</td>
  </tr>
  <tr>
  <td>edit_cancel</td>
  <td>gibt den numerischen Code einer Tastaturtaste an, die verwendet wird, um den Bearbeitungsvorgang abzubrechen (als Alternative zum Klicken des 'Cancel'-Buttons im Lightbox)</td>
  <td>27 (die 'Escape'-Taste)</td>
  <td>alle Views</td>
  </tr>
  </tbody>
</table>

:::note

Beachten Sie, dass alle **keys**-Eigenschaften den Datentyp 'number' verwenden.
 
:::
