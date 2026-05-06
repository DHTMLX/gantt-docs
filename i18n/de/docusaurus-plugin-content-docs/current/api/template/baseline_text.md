---
sidebar_label: baseline_text
title: baseline_text Vorlage
description: "bestimmt den Text, der innerhalb des Baseline-Elements angezeigt wird"
---

# baseline_text
:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::
### Description

@short: Definiert den Text, der innerhalb des baseline-Elements angezeigt wird

@signature: baseline_text: (task: Task, baseline: Baseline, index: number) =\> string | number | void;

### Parameters

- `task` - (erforderlich) *Task* - das Task-Objekt, das mit dem Baseline verknüpft ist
- `baseline` - (erforderlich) *Baseline* - das Baseline-Objekt
- `index` - (erforderlich) *number* - der Index der Baseline im baselines-Array der Aufgabe

### Returns
- ` text` - (string | number | void) - Der HTML-Inhalt, der als innerHTML des baseline-Elements gesetzt wird. Standardmäßig wird ein leerer String zurückgegeben.

### Example

~~~jsx
gantt.templates.baseline_text = function(task, baseline, index) {
    return "Baseline #" + (index + 1);
};
~~~

### Related samples
- [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Related API
- [baselines](api/config/baselines.md)

### Related Guides
- ["Zusätzliche Elemente in der Zeitleiste"](guides/inbuilt-baselines.md)

### Change log
- hinzugefügt in v9.0

