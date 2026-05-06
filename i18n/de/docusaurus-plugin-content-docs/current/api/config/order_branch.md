---
sidebar_label: order_branch
title: order_branch Konfiguration
description: "Aktiviert den 'branch'-Modus, der das vertikale Neuanordnen von Aufgaben innerhalb derselben Baum-Ebene ermöglicht"
---

# order_branch

### Description

@short: Aktiviert den 'branch'-Modus, der das vertikale Neuanordnen von Aufgaben innerhalb derselben Baum-Ebene ermöglicht

@signature: order_branch: string | boolean

### Example

~~~jsx
gantt.config.order_branch = true;

gantt.init("gantt_here");
~~~

**Standardwert:** false

### Related samples
- [Branch-Ordnung](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Details

Diese Option ermöglicht das Neuanordnen von Aufgaben, während deren Position in der Baumstruktur beibehalten wird. Zum Beispiel wird eine Unteraufgabe niemals zur übergeordneten Aufgabe.

## Leistungssteigerung

Wenn Ihr Gantt viele Aufgaben enthält, kann der Standardmodus der Branch-Neuanordnung die Leistung verlangsamen.
Um dies zu beschleunigen, können Sie den **"Marker"-Modus** verwenden.

~~~js
gantt.config.order_branch = "marker";
~~~

:::note
sample [Branch ordering - highlighting mode](https://docs.dhtmlx.com/gantt/samples/07_grid/14_branch_ordering_highlight.html) 
:::

In diesem Modus wird nur der Name der Aufgabe neu angeordnet (bei gedrückter linker Maustaste) und Gantt wird neu gerendert, erst wenn eine Aufgabe an der Zielposition abgelegt wird (bei Loslassen der Taste).
Im Gegensatz zum Standardmodus führt das Ändern der Aufgabenposition nicht zur Auslösung der Ereignisse onBeforeTaskMove/onAfterTaskMove.

Um das Ablegen einer Aufgabe in einer bestimmten Position zu verhindern, verwenden Sie stattdessen das Event onBeforeRowDragMove (api/event/onbeforerowdragmove.md) — funktioniert nur im 'Marker'-Modus.

### Related API
- [order_branch_free](api/config/order_branch_free.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)
- [onBeforeRowDragMove](api/event/onbeforerowdragmove.md)

### Related Guides
- [Aufgaben neu anordnen](guides/reordering-tasks.md)