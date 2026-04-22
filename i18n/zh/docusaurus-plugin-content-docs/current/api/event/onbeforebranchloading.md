---
sidebar_label: onBeforeBranchLoading
title: onBeforeBranchLoading event
description: "如果启用动态加载，在用户展开任务分支但加载开始之前触发"
---

# onBeforeBranchLoading

### Description

@short: 如果启用动态加载，在用户展开任务分支后但加载开始之前触发

@signature: onBeforeBranchLoading: (settings: any) => boolean;

### Parameters

- `settings` - (required) *object* - 一个包含任务ID和请求URL的对象

### Returns
- ` result` - (boolean) - 返回 `false` 将取消动态加载，数据请求将不会发送到服务器

### Example

~~~jsx
gantt.attachEvent("onBeforeBranchLoading", function(settings){
    var task = gantt.getTask(settings.taskId);
    config.url += "&value=" + encodeURIComponent(task.text);
    return true;
});
~~~

### Details

此事件可用于向动态加载请求添加额外参数。`settings` 对象包含两个属性——任务的 id 和请求 url:

~~~js
{
   taskId: 1,
   url:"/data?parent_id=1"
}
~~~

可以在代码中修改请求 url。

此事件仅在启用 [动态加载](guides/loading.md) 时触发。

此事件是可拦截的，返回 *false* 将取消动态加载请求。

### Related API
- [onAfterBranchLoading](api/event/onafterbranchloading.md)
- [branch_loading](api/config/branch_loading.md)
- [branch_loading_property](api/config/branch_loading_property.md)

### Related Guides
- [数据加载](guides/loading.md)