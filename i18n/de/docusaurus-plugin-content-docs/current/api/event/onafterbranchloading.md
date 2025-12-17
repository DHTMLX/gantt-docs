---
sidebar_label: onAfterBranchLoading
title: onAfterBranchLoading event
description: "Wenn das dynamische Laden aktiviert ist, wird dieses Event unmittelbar ausgelöst, nachdem ein Task-Branch auf der Seite vollständig geladen wurde."
---

# onAfterBranchLoading

### Description

@short: Wenn das dynamische Laden aktiviert ist, wird dieses Event unmittelbar ausgelöst, nachdem ein Task-Branch auf der Seite vollständig geladen wurde.

@signature: onAfterBranchLoading: (settings: any) =\> void;

### Parameters

- `settings` - (required) *object* - Ein Objekt, das die Task-ID und die Request-URL enthält.

### Example

~~~jsx
gantt.attachEvent("onAfterBranchLoading", function(settings){
    console.log(settings.url);
});
~~~

### Details

Das `settings`-Objekt beinhaltet zwei Eigenschaften: die ID des Tasks und die für die Anfrage verwendete URL:

~~~js
{
   taskId: 1,
   url:"/data?parent_id=1"
}
~~~

Dieses Event tritt nur auf, wenn [Dynamic loading](guides/loading.md) aktiviert ist.

### Related API
- [onBeforeBranchLoading](api/event/onbeforebranchloading.md)
- [branch_loading](api/config/branch_loading.md)
- [branch_loading_property](api/config/branch_loading_property.md)

### Related Guides
- ["Datenladen"](guides/loading.md)

