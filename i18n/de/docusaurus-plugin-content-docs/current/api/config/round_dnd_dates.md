---
sidebar_label: round_dnd_dates
title: round_dnd_dates Konfiguration
description: "Aktiviert das Abrunden der Start- und Enddaten der Aufgabe auf die nächstgelegenen Skalenmarken"
---

# round_dnd_dates

### Description

@short: Runden der Start- und Enddaten der Aufgabe auf die nächstgelegenen Skalenmarken

@signature: round_dnd_dates: boolean

### Example

~~~jsx
gantt.config.round_dnd_dates = false;
gantt.init("gantt_here");
~~~

**Standardwert:** true

### Details

Wenn Sie die Eigenschaft deaktivieren, rundet Gantt die Start- und Enddaten der verschobenen Aufgabe auf die nächstgelegene Stunde, nicht auf die nächstgelegenen Skalenmarken. In diesem Fall können Sie die [time_step](api/config/time_step.md) Eigenschaft verwenden, um den Schritt beim Ziehen einer Aufgabe zu konfigurieren. Siehe das Beispiel:

:::note
sample: [Gantt. Drag'n'drop von Aufgaben mit dem minimalen Schritt](https://snippet.dhtmlx.com/bd7ir3w7)
:::