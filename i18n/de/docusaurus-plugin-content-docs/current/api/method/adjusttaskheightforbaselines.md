---
sidebar_label: adjustTaskHeightForBaselines
title: adjustTaskHeightForBaselines Methode
description: "passt die Zeilenhöhe der Aufgabe an, um Baseline-Elemente korrekt darzustellen"
---

# adjustTaskHeightForBaselines

### Description

@short: Passt die Zeilenhöhe der Aufgabe an, um Baseline-Elemente korrekt anzuzeigen

@signature: adjustTaskHeightForBaselines: (task: Task) =\> void

### Parameters

- `task` - (erforderlich) *Task* - das Task-Objekt, dessen `row_height` angepasst wird

### Example

~~~jsx
const task = gantt.getTask(taskId);
gantt.adjustTaskHeightForBaselines(task);
gantt.render();
~~~

### Related samples
- [Baselines anzeigen](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details

Diese Methode modifiziert den [`row_height`](guides/resizing-rows.md) Wert des übergebenen Task-Objekts, um eine korrekte Anzeige der Baseline-Elemente sicherzustellen. 

In der Regel besteht kein Bedarf, diese Methode direkt aufzurufen. Sie ist nur dann erforderlich, wenn Sie die Anzeigeeinstellungen der [gantt.config.baselines](api/config/baselines.md) Konfiguration dynamisch ändern.

### Related API
- [baselines](api/config/baselines.md)

### Related Guides
- [Zusätzliche Elemente in der Timeline](guides/inbuilt-baselines.md)

### Change log
- Hinzugefügt in v9.0