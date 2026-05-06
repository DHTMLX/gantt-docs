---
sidebar_label: onBeforeBranchLoading
title: onBeforeBranchLoading Event
description: "Wenn dynamisches Laden aktiviert ist, wird ausgelöst, nachdem ein Benutzer den Task-Zweig erweitert hat, aber bevor das Laden beginnt"
---

# onBeforeBranchLoading

### Description

@short: Wenn dynamisches Laden aktiviert ist, wird ausgelöst, nachdem der Benutzer den Task-Zweig erweitert hat, aber bevor das Laden beginnt

@signature: onBeforeBranchLoading: (settings: any) =\> boolean;

### Parameters

- `settings` - (required) *object* - ein Objekt, das die Task-ID und die Request-URL enthält

### Returns
- ` result` - (boolean) - Die Rückgabe von `false` verhindert das dynamische Laden und die Datenanfrage wird nicht an den Server gesendet

### Example

~~~jsx
gantt.attachEvent("onBeforeBranchLoading", function(settings){
    var task = gantt.getTask(settings.taskId);
    config.url += "&value=" + encodeURIComponent(task.text);
    return true;
});
~~~

### Details

Dieses Ereignis kann verwendet werden, um zusätzliche Parameter an dynamische Ladeanfragen anzuhängen. Das `settings`-Objekt enthält zwei Eigenschaften - die ID der Aufgabe und die URL der Anfrage:

~~~js
{
   taskId: 1,
   url:"/data?parent_id=1"
}
~~~

Die URL der Anfrage kann im Code geändert werden.

Dieses Ereignis wird nur ausgelöst, wenn [Dynamic loading](guides/loading.md) aktiviert ist.

Dieses Ereignis ist blockierbar; gibt man *false* zurück, wird die dynamische Ladeanfrage abgebrochen.

### Related API
- [onAfterBranchLoading](api/event/onafterbranchloading.md)
- [branch_loading](api/config/branch_loading.md)
- [branch_loading_property](api/config/branch_loading_property.md)

### Related Guides
- [Data Loading](guides/loading.md)