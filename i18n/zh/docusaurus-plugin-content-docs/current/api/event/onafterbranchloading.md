---
sidebar_label: onAfterBranchLoading
title: onAfterBranchLoading event
description: "如果启用动态加载，在任务分支加载到页面后触发"
---

# onAfterBranchLoading

### Description

@short: 如果启用动态加载，在任务分支加载到页面后触发

@signature: onAfterBranchLoading: (settings: any) =\> void;

### Parameters

- `settings` - (必填) *object* - 一个包含任务ID和请求URL的对象

### Example

~~~jsx
gantt.attachEvent("onAfterBranchLoading", function(settings){
    console.log(settings.url);
});
~~~

### Details

`settings` 对象包含两个属性 - 任务的 ID 和请求 URL：

~~~js
{
   taskId: 1,
   url:"/data?parent_id=1"
}
~~~

此事件仅在 [动态加载](guides/loading.md) 启用时触发。

### Related API
- [onBeforeBranchLoading](api/event/onbeforebranchloading.md)
- [branch_loading](api/config/branch_loading.md)
- [branch_loading_property](api/config/branch_loading_property.md)

### Related Guides
- [Data Loading](guides/loading.md)