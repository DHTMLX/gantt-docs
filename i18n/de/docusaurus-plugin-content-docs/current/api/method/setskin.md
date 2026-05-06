---
sidebar_label: setSkin
title: setSkin-Methode
description: "setzt den aktiven Skin fest"
---

# setSkin

### Description

@short: Legt das aktive Skin fest

@signature: setSkin: (skin: string) =\> void

### Parameters

- `skin` - (required) *string* - der Name des Skins. Die zulässigen Werte sind: "terrace", "dark", "material", "contrast-white", "contrast-black", "meadow", "skyblue", "broadway"

### Example

~~~jsx
gantt.setSkin("dark");
~~~

### Related samples
- [Dark skin](https://docs.dhtmlx.com/gantt/samples/06_skins/10_dark.html)

### Details

Wenn die Methode nach der Initialisierung von gantt aufgerufen wird, löst sie die render-Methode aus. 

Wenn sie vor der Initialisierung aufgerufen wird, hat die Methode denselben Effekt wie die Zuweisung der Eigenschaft `gantt.skin`:

~~~js
gantt.skin = "dark";
~~~

### Related Guides
- [Skins](guides/skins.md)

### Change log
- hinzugefügt in v9.0