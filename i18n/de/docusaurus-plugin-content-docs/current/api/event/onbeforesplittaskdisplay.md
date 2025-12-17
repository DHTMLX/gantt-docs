---
sidebar_label: onBeforeSplitTaskDisplay
title: onBeforeSplitTaskDisplay event
description: "Wird ausgelöst, kurz bevor ein Segment einer geteilten Aufgabe im Gantt-Chart angezeigt wird"
---

# onBeforeSplitTaskDisplay

### Description

@short: Wird ausgelöst, kurz bevor ein Segment einer geteilten Aufgabe im Gantt-Chart angezeigt wird

@signature: onBeforeSplitTaskDisplay: (id: number | string, task: Task, parent: any) =\> boolean;

### Parameters

- `id` - (required) *number | string* - die Kennung der Teilaufgabe
- `task` - (required) *Task* - das Teilaufgaben-Objekt
- `parent` - (required) *object* - das übergeordnete Aufgaben-Objekt

### Returns
- ` result` - (boolean) - gibt an, ob die Teilaufgabe der geteilten Aufgabe auf der Seite angezeigt werden soll (<b>true</b>) oder ausgeblendet wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeSplitTaskDisplay", function (id, task, parent) {
    if (task.duration < 3) {
        return false;
    }
    return true;
});
~~~

### Details

![split tasks](/img/split_tasks.png)

Beim Rendern einer geteilten Aufgabe wird zuerst das Event [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md) für die übergeordnete Aufgabe (die mit *render:"split"*) ausgelöst. Direkt danach feuert "onBeforeSplitTaskDisplay" für jede ihrer Teilaufgaben. Wenn "onBeforeSplitTaskDisplay" *false* zurückgibt, wird diese bestimmte Teilaufgabe nicht angezeigt.

:::note
Sample [Filter split tasks ](https://snippet.dhtmlx.com/3q1yd7iz) 
:::

### Related Guides
- [Split Tasks](guides/split-tasks.md)

### Change log
- hinzugefügt in v8.0

