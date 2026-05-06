---
sidebar_label: deepcopy_on_parse
title: deepcopy_on_parse Konfiguration
description: "definiert, ob gantt eine tiefe Kopie der Datenobjekte durchführt, die in die gantt.parse() Methode übergeben wurden"
---

# deepcopy_on_parse

### Description

@short: Definiert, ob gantt eine tiefe Kopie der Datenobjekte durchführt, die in die gantt.parse() Methode übergeben wurden

@signature: deepcopy_on_parse: boolean

### Example

~~~jsx
gantt.config.deepcopy_on_parse = true;
~~~

**Standardwert:** false

### Details

- Wenn die Eigenschaft auf *true* gesetzt ist, versucht gantt, eine tiefe Kopie der in die [gantt.parse](api/method/parse.md) Methode übergebenen Datenobjekte zu erstellen. Dadurch werden die inneren Datenobjekte von den Quell-Datenobjekten getrennt, und Änderungen am gantt wirken sich nicht auf das ursprüngliche Datenobjekt aus.
- Wenn die Eigenschaft auf *false* (Standard) gesetzt ist, wird gantt die in der [gantt.parse](api/method/parse.md) Methode übergebenen Datenobjekte (eine flache Kopie) wiederverwenden. Die Objekte bleiben verbunden und Änderungen am gantt werden auf das ursprüngliche Datenobjekt angewendet.

### Change log
- Hinzugefügt in v7.1