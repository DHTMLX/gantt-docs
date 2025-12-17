---
sidebar_label: onContextMenu
title: onContextMenu event
description: "当用户在甘特图内右键点击时触发（详见说明）"
---

# onContextMenu

### Description

@short: 当用户在甘特图内右键点击时触发（详见说明）

@signature: onContextMenu: (taskId: string | number, linkId: string | number, e: Event) =\> void;

### Parameters

- `taskId` - (required) *string | number* - 任务ID
- `linkId` - (required) *string | number* - 链接ID
- `e` - (required) *Event* - 原生事件对象

### Example

~~~jsx
gantt.attachEvent("onContextMenu", function (taskId, linkId, event) {
      var element = event.target;
    console.log("你点击了 ", element)
    return true;
});
~~~

### Related samples
- [Context menu to control tasks](https://docs.dhtmlx.com/gantt/samples/04_customization/10_context_menu.html)

### Details

通常情况下，在甘特图内右键点击会打开浏览器默认的右键菜单，除非满足其他条件。 
下面的示例中，右键点击任务时会显示一个[DHTMLX context menu](https://docs.dhtmlx.com/menu__index.html)，从而阻止浏览器默认菜单的弹出。

~~~js
//需要 DHTMLX menu 组件
gantt.attachEvent("onContextMenu", function (taskId, linkId, event) {
    const x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    const y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;

    if (taskId) {
        menu.showContextMenu(x, y);
        return false;
    }

    return true;
});
~~~

请确保在页面中引入了[DHTMLX Menu 文件或 DHTMLX Suite](https://docs.dhtmlx.com/menu__how_to_start.html)，因为示例依赖于它们。 
<br>

如果想用纯JavaScript实现自定义右键菜单，可以参考[此示例](https://snippet.dhtmlx.com/xuvxhjbc)。
