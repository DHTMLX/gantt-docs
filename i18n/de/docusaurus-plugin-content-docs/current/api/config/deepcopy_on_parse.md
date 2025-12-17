---
sidebar_label: deepcopy_on_parse
title: deepcopy_on_parse config
description: "Steuert, ob gantt eine Deep Copy der Datenobjekte erstellt, die der Methode gantt.parse() übergeben werden"
---

# deepcopy_on_parse

### Description

@short: Steuert, ob gantt eine Deep Copy der Datenobjekte erstellt, die der Methode gantt.parse() übergeben werden

@signature: deepcopy_on_parse: boolean

### Example

~~~jsx
gantt.config.deepcopy_on_parse = true;
~~~

**Default value:** false

### Details

- Wenn auf *true* gesetzt, erstellt gantt eine Deep Copy der Datenobjekte, die an die Methode [gantt.parse](api/method/parse.md) übergeben werden. Das bedeutet, dass die internen gantt-Datenobjekte von den ursprünglichen getrennt sind, sodass Änderungen innerhalb von gantt die Quelldaten nicht beeinflussen.
- Wenn auf *false* gesetzt (Standardwert), verwendet gantt dieselben Datenobjekte, die in der Methode [gantt.parse](api/method/parse.md) übergeben wurden (eine flache Kopie). In diesem Fall bleiben die Objekte verknüpft, und Änderungen innerhalb von gantt wirken sich auf die Originaldaten aus.

### Change log
- hinzugefügt in v7.1

