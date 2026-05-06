---
sidebar_label: Mixin
title: Mixin-Methode
description: "fügt Eigenschaften des 'source'-Objekts in das 'target'-Objekt ein"
---

# mixin

### Description

@short: Adds properties of the 'source' object into the 'target' object

@signature: mixin: (target: CustomObject, source: CustomObject, force?: boolean) => void

### Parameters

- `target` - (erforderlich) *CustomObject* - das Zielobjekt
- `source` - (erforderlich) *CustomObject* - das Quellobjekt
- `force` -		(optional)	*boolean*	-	optional, falls true, überschreiben Eigenschaften des 'source' die passenden Eigenschaften des 'target', falls vorhanden. Falls false (Standard), Eigenschaften, die bereits im 'target' existieren, werden ausgelassen	

### Example

~~~jsx
gantt.mixin(target, source, force);
~~~

### Change log
- in Version 4.0 hinzugefügt