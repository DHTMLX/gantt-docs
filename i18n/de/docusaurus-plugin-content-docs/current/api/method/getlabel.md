---
sidebar_label: getLabel
title: getLabel-Methode
description: "Gibt das Label eines Select-Steuerelements im Lightbox zurück"
---

# getLabel

### Description

@short: Holt das Label eines Select-Steuerelements im Lightbox

@signature: getLabel: (property: string, key: string | number) =\> string

### Parameters

- `property` - (erforderlich) *string* - der Name einer Daten-Eigenschaft, der das Steuerelement zugeordnet ist
- `key` - (erforderlich) *string | number* - die ID der Option. Dieser Parameter wird mit der Daten-Eigenschaft der Aufgabe verglichen, um die Option des Select-Felds der Aufgabe zuzuordnen

### Returns
- ` label` - (string) - das Label eines Select-Steuerelements im Lightbox

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
Die Methode wird ausschließlich auf die 'select'-Kontrollen im Lightbox angewendet, um das Label einer bestimmten Option zu erhalten.
:::