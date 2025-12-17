---
sidebar_label: onBeforeBranchLoading
title: onBeforeBranchLoading event
description: "Wenn das dynamische Laden aktiviert ist, wird dieses Event direkt ausgelöst, nachdem ein Benutzer einen Task-Branch erweitert hat, jedoch bevor der Ladeprozess beginnt."
---

# onBeforeBranchLoading

### Description

@short: Wenn das dynamische Laden aktiviert ist, wird dieses Event direkt ausgelöst, nachdem ein Benutzer einen Task-Branch erweitert hat, jedoch bevor der Ladeprozess beginnt.

@signature: onBeforeBranchLoading: (settings: any) =\> boolean;

### Parameters

- `settings` - (required) *object* - enthält die Task-ID und die Anfrage-URL

### Returns
- ` result` - (boolean) - die Rückgabe von `false` stoppt das dynamische Laden und verhindert, dass die Anfrage an den Server gesendet wird

### Example

~~~jsx
gantt.attachEvent("onBeforeBranchLoading", function(settings){
    var task = gantt.getTask(settings.taskId);
    config.url += "&value=" + encodeURIComponent(task.text);
    return true;
});
~~~

### Details

Dieses Event ist nützlich, um zusätzliche Parameter zu dynamischen Ladeanfragen hinzuzufügen. Das `settings`-Objekt enthält zwei Eigenschaften: die Task-ID und die Anfrage-URL:

~~~js
{
   taskId: 1,
   url:"/data?parent_id=1"
}
~~~

Sie können die Anfrage-URL direkt im Code modifizieren.

Dieses Event wird nur ausgelöst, wenn [Dynamic loading](guides/loading.md) aktiviert ist.

Es ist möglich, dieses Event zu blockieren; die Rückgabe von *false* bricht die dynamische Ladeanfrage ab.

### Related API
- [onAfterBranchLoading](api/event/onafterbranchloading.md)
- [branch_loading](api/config/branch_loading.md)
- [branch_loading_property](api/config/branch_loading_property.md)

### Related Guides
- ["Datenladen"](guides/loading.md)

