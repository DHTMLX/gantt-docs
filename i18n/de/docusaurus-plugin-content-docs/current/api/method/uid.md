---
sidebar_label: uid
title: uid method
description: "gibt eine eindeutige ID zurück"
---

# uid

### Description

@short: Gibt eine eindeutige ID zurück

@signature: uid: () =\> number

### Returns
- ` id` - (number) - eine eindeutige ID

### Example

~~~jsx
var id = gantt.uid();
~~~

### Details

Die generierte ID ist innerhalb der aktuellen Sitzung der Seite eindeutig. 
Sie eignet sich für die Verwendung in der Logik auf der Seite, sollte jedoch nicht als Datenbank-Identifikator verwendet werden.

### Change log
- hinzugefügt in Version 4.0
