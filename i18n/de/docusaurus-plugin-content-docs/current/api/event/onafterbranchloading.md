---
sidebar_label: onAfterBranchLoading
title: onAfterBranchLoading event
description: "Wenn dynamisches Laden aktiviert ist, wird das Ereignis ausgelöst, nachdem der Aufgaben-Zweig auf die Seite geladen wurde"
---

# onAfterBranchLoading

### Description

@short: Wenn dynamisches Laden aktiviert ist, wird nach dem Laden des Aufgaben-Zweigs auf der Seite ausgelöst

@signature: onAfterBranchLoading: (settings: any) => void;

### Parameter

- `settings` - (erforderlich) *Objekt* - ein Objekt, das die Aufgaben-ID und die Anforderungs-URL enthält

### Example

~~~jsx
gantt.attachEvent("onAfterBranchLoading", function(settings){
    console.log(settings.url);
});
~~~

### Details

Das `settings`-Objekt enthält zwei Eigenschaften – die ID der Aufgabe und die Anforderungs-URL:

~~~js
{
   taskId: 1,
   url:"/data?parent_id=1"
}
~~~

Dieses Ereignis wird nur ausgelöst, wenn [Dynamisches Laden](guides/loading.md) aktiviert ist.

### Related API
- [onBeforeBranchLoading](api/event/onbeforebranchloading.md)
- [branch_loading](api/config/branch_loading.md)
- [branch_loading_property](api/config/branch_loading_property.md)

### Related Guides
- ["Datenladen"](guides/loading.md)

