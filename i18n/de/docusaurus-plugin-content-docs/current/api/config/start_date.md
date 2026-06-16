---
sidebar_label: start_date
title: start_date Konfiguration
description: "Legt den Startwert der Zeitachse fest"
---

# start_date

### Description

@short: Legt den Startwert der Zeitachse fest

@signature: start_date: Date | undefined

### Example

~~~jsx
gantt.config.start_date = new Date(2027, 8, 10);
gantt.config.end_date = new Date(2027, 8, 20);

gantt.init("gantt_here");
~~~

### Details

:::note
Um die `start_date`-Option anzuwenden, müssen Sie sie zusammen mit [end_date](api/config/end_date.md) verwenden.
:::

- Wenn beide Optionen [start_date](api/config/start_date.md) und [end_date](api/config/end_date.md) angegeben sind und Sie eine Aufgabe außerhalb des angegebenen Bereichs erstellen, verschwindet diese Aufgabe aus dem Diagramm.
- Optionale Parameter von [`init()`](api/method/init.md) können als Anfangswerte von [start_date](api/config/start_date.md) und [end_date](api/config/end_date.md) verwendet werden.
- [start_date](api/config/start_date.md) und [end_date](api/config/end_date.md) überschreiben [fit_tasks](api/config/fit_tasks.md). Wenn Sie diese Einstellungen zusammen verwenden möchten, müssen Sie [die Zeitskala aus dem Code heraus verwalten](guides/configuring-time-scale.md#range).

In diesem Fall können wir den Bereich erweitern:

~~~js
gantt.attachEvent("onLightboxSave", (taskId, task, isNew) => {
    const taskStartDate = task.start_date;
    const taskEndDate = task.end_date;
    const scaleStartDate = gantt.config.start_date;
    const scaleEndDate = gantt.config.end_date;

    if (scaleStartDate > taskEndDate || scaleEndDate < taskStartDate) {
        gantt.message({ type: "warning", text: "Warning! The task is outside the date range!", expire: 5000 });

        return false;
    }

    return true;
});
~~~

### Related API
- [end_date](api/config/end_date.md)
- [fit_tasks](api/config/fit_tasks.md)
- [init](api/method/init.md)
- [show_tasks_outside_timescale](api/config/show_tasks_outside_timescale.md)

### Related Guides
- [Skala einrichten](guides/configuring-time-scale.md)