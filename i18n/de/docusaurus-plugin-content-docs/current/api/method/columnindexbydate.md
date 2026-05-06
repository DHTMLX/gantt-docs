---
sidebar_label: columnIndexByDate
title: columnIndexByDate Methode
description: "Gibt den Index der Spalte anhand des Datums zurück"
---

# columnIndexByDate

### Description

@short: Gibt den Index der Spalte anhand des Datums zurück

@signature: columnIndexByDate: (date: Date) =\> number

### Parameters

- `date` - (erforderlich) *Date* - ein Datumsobjekt

### Returns
- ` index` - (number) - der Index der Spalte

### Example

~~~jsx
gantt.columnIndexByDate(new Date(2017, 03, 11)); // ->10
~~~