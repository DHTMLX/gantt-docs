---
sidebar_label: onContextMenu
title: onContextMenu event
description: "在甘特图中用户单击鼠标右键时触发（请参见详情）"
---

# onContextMenu

### Description

@short: 在甘特图内点击鼠标右键时触发（请参见详情）

@signature: onContextMenu: (taskId: string | number, linkId: string | number, e: Event) =\> void;

### Parameters

- `taskId` - (required) *string | number* - 任务 ID
- `linkId` - (required) *string | number* - 链接 ID
- `e` - (required) *Event* - 原生事件对象

### Example

~~~jsx
gantt.attachEvent("onContextMenu", function (taskId, linkId, event) {
    const element = event.target;
    console.log("你点击了 ", element)
    return true;
});
~~~

### Related samples
- [用于控制任务的上下文菜单](https://docs.dhtmlx.com/gantt/samples/04_customization/10_context_menu.html)

### Details

在甘特图中的右击会打开默认的浏览器上下文菜单，前提是没有其他条件。 
在以下示例中，对任务的点击将显示 [DHTMLX context menu](https://docs.dhtmlx.com/menu__index.html) 并隐藏默认的浏览器上下文菜单。

~~~js
//需要 DHTMLX menu 组件
gantt.attachEvent("onContextMenu", function (taskId, linkId, event) {
    const x = event.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;
    const y = event.clientY+document.body.scrollTop+document.documentElement.scrollTop;

    if (taskId) {
        menu.showContextMenu(x, y);
        return false;
    }

    return true;
});
~~~

不要忘记在页面中包含 [DHTMLX Menu 或 DHTMLX Suite 的文件](https://docs.dhtmlx.com/menu__how_to_start.html)。否则，示例将无法工作。


如果需要在纯 JavaScript 中添加自定义上下文菜单，请查看 [另一个示例](https://snippet.dhtmlx.com/xuvxhjbc) 。