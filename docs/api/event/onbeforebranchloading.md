---
sidebar_label: onBeforeBranchLoading
title: onBeforeBranchLoading event
description: "if dynamic loading is enabled, fires after a user expands the task branch but before loading starts"
---

# onBeforeBranchLoading

### Description

@short: If dynamic loading is enabled, fires after a user expands the task branch but before loading starts

@signature: onBeforeBranchLoading: (settings: any) =\> boolean;

### Parameters

- `settings` - (required) *object* - an object which contains the task id and request URL

### Returns
- ` result` - (boolean) - returning `false` will cancel the dynamic loading and the data request won't be sent to the server

### Example

~~~jsx
gantt.attachEvent("onBeforeBranchLoading", function(settings){
    var task = gantt.getTask(settings.taskId);
    config.url += "&value=" + encodeURIComponent(task.text);
    return true;
});
~~~

### Details

This event can be used to add extra parameters to dynamic loading requests. The `settings` object contains two properties - the id of the task and the request url:

~~~js
{
   taskId: 1,
   url:"/data?parent_id=1"
}
~~~

The request url can be modified from code.

This event fires only when [Dynamic loading](guides/loading.md) is enabled.

The event is blockable, returning *false* will cancel the dynamic loading request.

### Related API
- [onAfterBranchLoading](api/event/onafterbranchloading.md)
- [branch_loading](api/config/branch_loading.md)
- [branch_loading_property](api/config/branch_loading_property.md)

### Related Guides
- [Data Loading](guides/loading.md)

