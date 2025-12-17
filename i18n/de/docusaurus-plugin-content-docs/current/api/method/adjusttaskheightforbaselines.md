---
sidebar_label: adjustTaskHeightForBaselines
title: adjustTaskHeightForBaselines method
description: "passt die Zeilenhöhe der Aufgabe an, um Baseline-Elemente korrekt anzuzeigen"
---

# adjustTaskHeightForBaselines

### Description

@short: Passt die Zeilenhöhe der Aufgabe an, um Baseline-Elemente korrekt anzuzeigen

@signature: adjustTaskHeightForBaselines: (task: Task) =\> void

### Parameters

- `task` - (required) *Task* - das Aufgabenobjekt, dessen `row_height` aktualisiert wird

### Example

~~~jsx
const task = gantt.getTask(taskId);
gantt.adjustTaskHeightForBaselines(task);
gantt.render();
~~~

### Related samples
- [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details

Diese Methode aktualisiert die [`row_height`](guides/resizing-rows.md) der angegebenen Aufgabe, um sicherzustellen, dass Baseline-Elemente korrekt dargestellt werden.

Normalerweise ist der Aufruf dieser Methode nicht erforderlich. Sie wird hauptsächlich verwendet, wenn Sie die Anzeigeeinstellungen der [gantt.config.baselines](api/config/baselines.md) Konfiguration dynamisch ändern.

### Related API
- [baselines](api/config/baselines.md)

### Related Guides
- ["Zusätzliche Elemente in der Zeitleiste"](guides/inbuilt-baselines.md)

### Change log
- hinzugefügt in v9.0

