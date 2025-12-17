---
sidebar_label: setSkin
title: setSkin method
description: "ändert das aktive Skin"
---

# setSkin

### Description

@short: Ändert das aktive Skin

@signature: setSkin: (skin: string) =\> void

### Parameters

- `skin` - (required) *string* - der Name des Skins. Verfügbare Optionen sind: "terrace", "dark", "material", "contrast-white", "contrast-black", "meadow", "skyblue", "broadway"

### Example

~~~jsx
gantt.setSkin("dark");
~~~

### Related samples
- [Dark skin](https://docs.dhtmlx.com/gantt/samples/06_skins/10_dark.html)

### Details

Das Aufrufen dieser Methode nach der Initialisierung des gantt bewirkt, dass die [render](api/method/render.md)-Methode ausgeführt wird.

Wenn sie vor der Initialisierung verwendet wird, funktioniert sie genauso wie das direkte Setzen der `gantt.skin`-Eigenschaft:

~~~js
gantt.skin = "dark";
~~~

### Related Guides
- ["Skins"](guides/skins.md)

### Change log
- hinzugefügt in v9.0

