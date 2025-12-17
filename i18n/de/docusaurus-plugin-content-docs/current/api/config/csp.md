---
sidebar_label: csp
title: csp config
description: "steuert, wie Datumformatierungsmethoden intern implementiert werden"
---

# csp

### Description

@short: Steuert, wie Datumformatierungsmethoden intern implementiert werden

@signature: csp: boolean | string

### Example

~~~jsx
gantt.config.csp = true;
...
gantt.init("gantt_here");
~~~

**Default value:** "auto"

### Details

Einige Laufzeitumgebungen, wie Salesforce Lightning, können verhindern, dass der dhtmlxGantt-Code ordnungsgemäß ausgeführt wird. Dies geschieht meist aufgrund der Content Security Policy (CSP), die in der App gesetzt ist. Die CSP kann die internen Hochleistungs-Datumformatierungsmethoden von Gantt als Sicherheitsrisiko ansehen.

Die **csp**-Einstellung hilft, diese Blockierungen zu vermeiden, indem sie Ihnen ermöglicht, zu wählen, wie der Datumformatierungscode implementiert wird.

Es gibt drei Möglichkeiten, mit den Methoden **gantt.date.date_to_str** und **gantt.date.str_to_date** umzugehen:

- Standardmäßig ist die Einstellung auf *auto* gesetzt.

~~~js
gantt.config.csp = "auto";
~~~

In diesem Modus versucht Gantt, den schnellstmöglichen Datumformatierungscode zu verwenden. Wenn die App diesen Code blockiert, wechselt es zu einer kompatiblen Version.

- Sie können Gantt zwingen, immer den kompatiblen Code zu verwenden, indem Sie die Einstellung auf *true* setzen.

~~~js
gantt.config.csp = true;
~~~

Dies stellt sicher, dass der Code ohne Probleme ausgeführt wird, kann aber die Performance etwas verringern.

- Oder Sie setzen die Einstellung auf *false*, um immer den Hochleistungscode zu verwenden.

~~~js
gantt.config.csp = false;
~~~

Beachten Sie, dass dhtmlxGantt nicht richtig funktioniert, wenn die App diesen Hochleistungscode blockiert.

### Change log
- Hinzugefügt in v7.0
- Wenn auf *true* gesetzt, wird das [lightbox](api/config/lightbox.md) ab Version v7.1.13 innerhalb des Gantt-Containers gerendert

