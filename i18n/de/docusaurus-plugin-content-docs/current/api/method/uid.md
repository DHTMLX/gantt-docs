---
sidebar_label: uid
title: uid Methode
description: "liefert eine eindeutige ID"
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

Die erzeugte ID ist pro Seite eindeutig, aber nicht global eindeutig.
Sie können die Methode in der Seitenlogik verwenden. Sie ist nicht ausreichend als Datenbank-ID geeignet.

### Change log
- in Version 4.0 hinzugefügt