---
sidebar_label: onAfterBranchLoading
title: onAfterBranchLoading event
description: "if dynamic loading is enabled, fires after the task branch was loaded to the page"
---

# onAfterBranchLoading

### Description

@short: If dynamic loading is enabled, fires after the task branch was loaded to the page

@signature: onAfterBranchLoading: (settings: any) =\> void;

### Parameters

- `settings` - (required) *object* - an object which contains the task id and request URL

### Example

~~~jsx
gantt.attachEvent("onAfterBranchLoading", function(settings){
    console.log(settings.url);
});
~~~

### Details

The `settings` object contains two properties - the id of the task and the request url:

~~~js
{
   taskId: 1,
   url:"/data?parent_id=1"
}
~~~

This event fires only when [Dynamic loading](guides/loading.md) is enabled.

### Related API
- [onBeforeBranchLoading](api/event/onbeforebranchloading.md)
- [branch_loading](api/config/branch_loading.md)
- [branch_loading_property](api/config/branch_loading_property.md)

### Related Guides
- [Data Loading](guides/loading.md)

