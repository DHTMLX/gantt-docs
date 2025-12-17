---
sidebar_label: onAfterBranchLoading
title: onAfterBranchLoading event
description: "当启用动态加载时，此事件在任务分支加载完成后立即触发。"
---

# onAfterBranchLoading

### Description

@short: 当启用动态加载时，此事件在任务分支加载完成后立即触发。

@signature: onAfterBranchLoading: (settings: any) =\> void;

### Parameters

- `settings` - (required) *object* - 一个包含任务ID和请求URL的对象。

### Example

~~~jsx
gantt.attachEvent("onAfterBranchLoading", function(settings){
    console.log(settings.url);
});
~~~

### Details

`settings` 对象包含两个属性:任务的ID和用于请求的URL:

~~~js
{
   taskId: 1,
   url:"/data?parent_id=1"
}
~~~

此事件仅在启用[动态加载](guides/loading.md)时触发。

### Related API
- [onBeforeBranchLoading](api/event/onbeforebranchloading.md)
- [branch_loading](api/config/branch_loading.md)
- [branch_loading_property](api/config/branch_loading_property.md)

### Related Guides
- [数据加载](guides/loading.md)

