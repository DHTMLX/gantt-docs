---
sidebar_label: getLabel
title: getLabel method
description: "rufen Sie das Label eines Select-Controls innerhalb der Lightbox ab"
---

# getLabel

### Description

@short: Rufen Sie das Label eines Select-Controls innerhalb der Lightbox ab

@signature: getLabel: (property: string, key: string | number) =\> string

### Parameters

- `property` - (required) *string* - der Name der Daten-Eigenschaft, auf die sich das Control bezieht
- `key` - (required) *string | number* -     die Kennung der Option. Dieser Wert wird mit der Daten-Eigenschaft der Aufgabe abgeglichen, um <br/> die Option des Selects mit der Aufgabe zu verknüpfen

### Returns
- ` label` - (string) - das mit einem Select-Control in der Lightbox verknüpfte Label

### Example

~~~jsx
gantt.config.lightbox.sections=[
    {name:"custom", type:"select", map_to:"unit_id", options:[
        {key:1, label:"James Smith"}, 
        {key:2, label:"John Williams"}]}
];

const holder2 = gantt.getLabel("unit_id", 2);// ->"John Williams"
~~~

### Details

:::note

Diese Methode funktioniert ausschließlich mit 'select'-Controls in der Lightbox, um das Label für eine gegebene Option abzurufen.
 
:::

<br>
