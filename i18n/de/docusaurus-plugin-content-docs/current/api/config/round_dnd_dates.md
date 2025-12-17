---
sidebar_label: round_dnd_dates
title: round_dnd_dates config
description: "ermöglicht das Runden der Start- und Enddaten einer Aufgabe auf die nächstgelegenen Skalierungsmarkierungen"
---

# round_dnd_dates

### Description

@short: Ermöglicht das Runden der Start- und Enddaten einer Aufgabe auf die nächstgelegenen Skalierungsmarkierungen

@signature: round_dnd_dates: boolean

### Example

~~~jsx
gantt.config.round_dnd_dates = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

Wenn diese Eigenschaft deaktiviert ist, rundet Gantt die Start- und Enddaten der verschobenen Aufgabe auf die nächste Stunde anstatt auf die nächstgelegenen Skalierungsmarkierungen. In diesem Modus kann die Eigenschaft [time_step](api/config/time_step.md) verwendet werden, um die Schrittgröße für das Ziehen von Aufgaben festzulegen. Hier ein Beispiel:

:::note
Sample: [Gantt. Drag'n'drop von Aufgaben mit dem minimalen Schritt](https://snippet.dhtmlx.com/bd7ir3w7) 
:::

