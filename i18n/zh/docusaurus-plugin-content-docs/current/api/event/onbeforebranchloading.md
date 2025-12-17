---
sidebar_label: onBeforeBranchLoading
title: onBeforeBranchLoading event
description: "当启用动态加载时，该事件在用户展开任务分支后且加载过程开始前触发。"
---

# onBeforeBranchLoading

### Description

@short: 当启用动态加载时，该事件在用户展开任务分支后且加载过程开始前触发。

@signature: onBeforeBranchLoading: (settings: any) =\> boolean;

### Parameters

- `settings` - (required) *object* - 包含任务ID和请求URL

### Returns
- ` result` - (boolean) - 返回 `false` 会停止动态加载并阻止请求发送到服务器

### Example

~~~jsx
gantt.attachEvent("onBeforeBranchLoading", function(settings){
    var task = gantt.getTask(settings.taskId);
    config.url += "&value=" + encodeURIComponent(task.text);
    return true;
});
~~~

### Details

该事件适用于向动态加载请求中添加额外参数。`settings` 对象包含两个属性:任务ID和请求URL:

~~~js
{
   taskId: 1,
   url:"/data?parent_id=1"
}
~~~

你可以在代码中直接修改请求URL。

该事件仅在启用[动态加载](guides/loading.md)时触发。

此事件可以被阻止；返回 *false* 会取消动态加载请求。

### Related API
- [onAfterBranchLoading](api/event/onafterbranchloading.md)
- [branch_loading](api/config/branch_loading.md)
- [branch_loading_property](api/config/branch_loading_property.md)

### Related Guides
- [数据加载](guides/loading.md)

