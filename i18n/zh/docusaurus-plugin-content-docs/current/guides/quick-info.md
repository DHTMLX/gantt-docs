---
title: "快速信息（触控支持）"
sidebar_label: "快速信息（触控支持）"
---

# 快速信息（触控支持）


本库自带 **Quick Info** 扩展，当用户在屏幕上点击任务时，会弹出一个显示任务详情的弹窗。

![quick_info](/img/quick_info.png)


[QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)


要开始使用该扩展，只需通过 [gantt.plugins](api/method/plugins.md) 方法激活 ["Quick Info"](guides/extensions-list.md#kuaisuxinxi) 插件。

~~~js
gantt.plugins({
    quick_info: true
});
~~~

如果你想关闭 **quick_info** 扩展，将 [show_quick_info](api/config/show_quick_info.md) 属性设置为 *false*:

~~~js
gantt.config.show_quick_info = false;
gantt.init("gantt_here");
~~~

## API 概览


Quick Info 扩展提供了一组 API，可用于调整设置、控制行为或自定义弹窗外观。


你可以使用 [gantt.ext.quickInfo 对象的 API](guides/quick-info.md#quickinfoduixiang) 或下方列出的 dhtmlxGantt 公共 API:

**方法**

- [showQuickInfo](api/method/showquickinfo.md) - 为指定任务打开弹出任务表单
- [hideQuickInfo](api/method/hidequickinfo.md) - 关闭弹出任务表单（如果已打开）

**事件**

- [onQuickInfo](api/event/onquickinfo.md) - 弹出编辑表单出现时触发
- [onAfterQuickInfo](api/event/onafterquickinfo.md) - 弹出编辑表单关闭后触发

**属性**

- [quick_info_detached](api/config/quick_info_detached.md) - 控制任务表单是在所选任务旁边还是在屏幕左右侧显示
- [quickinfo_buttons](api/config/quickinfo_buttons.md) - 包含弹出任务详情表单内按钮的集合

**模板**

- [quick_info_class](api/template/quick_info_class.md) - 定义应用于弹出编辑表单的 CSS 类
- [quick_info_content](api/template/quick_info_content.md) - 定义弹出编辑表单内的内容
- [quick_info_date](api/template/quick_info_date.md) - 定义弹出编辑表单内显示的日期
- [quick_info_title](api/template/quick_info_title.md) - 定义弹出编辑表单的标题

## QuickInfo 对象 {#quickinfoobject}

默认情况下，**Quick Info** 扩展会在选中任务上方自动显示弹窗。

从 v7.0 开始，Quick Info 功能增强，提供了 [gantt.ext.quickInfo](guides/quickinfo-ext.md) 对象，可手动控制弹窗的显示。

**gantt.ext.quickInfo** 对象提供以下方法:

- **show()** - 为指定任务打开 quick info 弹窗。参数如下:
    - **id** - (*string|number*) 任务/链接/资源的 id
- **show()** - 在指定坐标处打开 quick info 弹窗。参数如下:
    - **top** - (*number*) X 坐标
    - **left** - (*number*) Y 坐标
- **hide()** - 关闭 quick info 弹窗。可选参数:
    - **[ force ]** - (*boolean*) 当 [gantt.config.quick_info_detached](api/config/quick_info_detached.md) 为 *false* 时，决定弹窗是否立即关闭。传入 *true* 则立即移除弹窗，否则会有淡出动画。
- **setContainer()** - 设置 quick info 显示的容器。
    - **container** - (*string|HTMLElement*) QuickInfo 的容器。如果未指定，将放在以下第一个找到的节点内:**gantt.$task, gantt.$grid, gantt.$layout**
- **getNode()** - 返回 quick info 弹窗的 HTMLElement，如果未初始化则返回 *null*
- **setContent(config)** - (*object*) 填充 quick info 的内容。配置对象结构如下:
    - **taskId** - (*string|number*) 可选，将操作按钮与特定任务关联
    - **header** - 可选，弹窗头部，可包含:
        - **title** - (*string*) 可选，弹窗标题
        - **date** - (*string*) 可选，弹窗日期
    - **content** - (*string*) 可选，弹窗内容
    - **buttons** - (*string[]*) 可选，弹窗内包含的按钮


如果未提供 header 或 buttons，相应部分将被隐藏。

####**显示 Quick Info**

可通过 **gantt.ext.quickInfo.show()** 方法，为指定任务、链接、资源面板或屏幕自定义位置显示弹窗:

~~~js
// 为指定任务显示弹窗
var task = gantt.getTask(10);
gantt.ext.quickInfo.show(task.id);

// 在指定坐标处显示弹窗
gantt.ext.quickInfo.show(100, 200);
~~~

以下示例展示如何为资源显示弹窗:

~~~js
const quickInfo = gantt.ext.quickInfo;
gantt.attachEvent("onGanttReady", function(){
    quickInfo.setContainer(document.body);
})

gantt.attachEvent("onEmptyClick", function (e) {
  const domHelpers = gantt.utils.dom;
  const resourceElement = domHelpers.closest(e.target, "[data-resource-id]");
  if(resourceElement){
    const resourceId = resourceElement.getAttribute("data-resource-id");
    const resource = gantt.$resourcesStore.getItem(resourceId);
    const position = resourceElement.getBoundingClientRect();
    quickInfo.show(position.right, position.top);

    const assignedTasks = gantt.getResourceAssignments(resourceId).map(function(assign){
        return gantt.getTask(assign.task_id).text;
    });

    quickInfo.setContent({
        header: {
        title: resource.text,
        date: ""
    },
        content: "Assigned tasks: " + assignedTasks.join(", "),
        buttons: []
    });
  }
});
~~~

以下为为指定链接显示弹窗的示例:

~~~js
const quickInfo = gantt.ext.quickInfo;
gantt.attachEvent("onLinkClick", function(id,e){
    //可在此自定义逻辑
    const link = gantt.getLink(id);
    const linksFormatter = gantt.ext.formatters.linkFormatter();

    const domHelpers = gantt.utils.dom;
    const position = domHelpers.getRelativeEventPosition(e, gantt.$task_data);

    const sourceTask = gantt.getTask(link.source);
    const targetTask = gantt.getTask(link.target);
    quickInfo.show(position.x, position.y);

    let linkDescr = "";

    if (link.type === gantt.config.links.start_to_start){
        linkDescr = "Start to start";
    } else if (link.type === gantt.config.links.start_to_finish){
        linkDescr = "Start to finish";
    } else if (link.type === gantt.config.links.finish_to_finish){
        linkDescr = "Finish to Finish";
    } else {
        linkDescr = "Finish to start";
    }

    quickInfo.setContent({
        header: {
            title: `${linkDescr} link`,
            date: ""
        },
        content: `Source: ${sourceTask.text}


                    Target: ${targetTask.text}`,
        buttons: []
    });
});
~~~

####**隐藏 Quick Info**

要关闭弹窗，请使用 **gantt.ext.quickInfo.hide()** 方法。其行为取决于 **gantt.config.quick_info_detached** 设置，有以下两种情况:

- 无参数调用时，弹窗会在短暂动画后关闭

~~~js
gantt.config.quick_info_detached = false;
gantt.init("gantt_here");

// 动画关闭弹窗
gantt.ext.quickInfo.hide();
~~~

- 若要立即关闭弹窗，传入 *true* 作为参数:

~~~js
gantt.config.quick_info_detached = false;
gantt.init("gantt_here");

// 立即关闭弹窗
gantt.ext.quickInfo.hide(true);
~~~

注意:如果 **gantt.config.quick_info_detached** 为 *true*，弹窗始终会立即关闭。

####**自定义 QuickInfo**

默认情况下，quick info 弹窗包含标题、日期、内容和按钮，外观如下:

![quick_default](/img/quick_default.png)

如果需要自定义弹窗外观或自行构建，可以通过 **gantt.ext.quickInfo.setContent()** 定义 HTML 内容:

~~~js
gantt.locale.labels.custom_button = "My button"
gantt.ext.quickInfo.setContent({
    header:{
        title: "My custom header",
        date: "18th of February, 2020"
    },
    content: "some content here",
    buttons: ["custom_button"]
})
~~~

这样会生成如下 quick info 弹窗:

![quick_custom](/img/quick_custom.png)


####**添加自定义按钮及行为**

通过 [$click](api/other/click.md) 对象，可以为弹窗内的按钮添加自定义操作:

~~~js
gantt.config.quickinfo_buttons="[""icon_delete","icon_edit","advanced_details_button"];
gantt.locale.labels["advanced_details_button"] = "Advanced Info";
gantt.init("gantt_here");
 
gantt.$click.buttons.advanced_details_button="function(id){"
    gantt.message("These are advanced details");
    return false; //阻止默认行为
};
~~~

####**为 QuickInfo 设置容器** 

使用 **gantt.ext.quickInfo.setContainer()** 可将 quick info 弹窗显示在自定义容器内:

~~~js
const quickInfo = gantt.ext.quickInfo;
quickInfo.setContainer(document.body); /*!*/
gantt.ext.quickInfo.show(1300,100);
gantt.locale.labels.custom_button = "My button"
gantt.ext.quickInfo.setContent({
    header:{
        title: "My custom header",
        date: "18th of February, 2020"
    },
    content: "some content here",
    buttons: ["custom_button"]
});
~~~

此时，带有自定义内容的弹窗会显示在 **document.body** 内部，而非 Gantt 容器中:

![quick_container](/img/quick_container.png)

