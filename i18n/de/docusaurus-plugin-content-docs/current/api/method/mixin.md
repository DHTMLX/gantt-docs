---
sidebar_label: mixin
title: mixin method
description: "fügt Eigenschaften vom 'source'-Objekt in das 'target'-Objekt ein"
---

# mixin

### Description

@short: Fügt Eigenschaften vom 'source'-Objekt in das 'target'-Objekt ein

@signature: mixin: (target: CustomObject, source: CustomObject, force?: boolean) =\> void

### Parameters

- `target` - (required) *CustomObject* - das Objekt, das neue Eigenschaften erhalten soll
- `source` - (required) *CustomObject* - das Objekt, das die hinzuzufügenden Eigenschaften bereitstellt
- `force` - (optional) *boolean* - optional, wenn true, werden Eigenschaften aus 'source' diejenigen im 'target' mit gleichem Schlüssel ersetzen. Standard ist false, sodass bestehende Eigenschaften im 'target' unverändert bleiben

### Example

~~~jsx
gantt.mixin(target, source, force);
~~~

### Change log
- hinzugefügt in Version 4.0
