---
title: "快速信息（触控支持）"
sidebar_label: "快速信息（触控支持）"
---

# 快速信息（触控支持）

该库包含 **Quick Info** 扩展，允许在用户在屏幕上触摸任务时显示包含任务详情的弹出窗口。

![quick_info](/img/quick_info.png)


[QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)


要开始使用该扩展，请通过 [「Quick Info」](guides/extensions-list.md#quick-info) 插件，使用 [gantt.plugins](api/method/plugins.md) 方法启用。

~~~js
gantt.plugins({
    quick_info: true
});
~~~

要禁用 **quick_info** 扩展，请将 [show_quick_info](api/config/show_quick_info.md) 属性设置为 *false*：

~~~js
gantt.config.show_quick_info = false;
gantt.init("gantt_here");
~~~

## API 概览

The Quick Info 扩展提供一组 API，允许您操作 Quick Info 的设置、控制其行为或修改弹出窗口的外观。


您可以使用 [gantt.ext.quickInfo 对象 API](guides/quick-info.md #quickinfoobject) 或下面列出的 dhtmlxGantt 公共 API：

**方法**

- [showQuickInfo](api/method/showquickinfo.md) - 显示指定任务的弹出任务表单
- [hideQuickInfo](api/method/hidequickinfo.md) - 隐藏弹出任务表单（如果当前处于活动状态）

**事件**

- [onQuickInfo](api/event/onquickinfo.md) - 当弹出编辑表单出现时触发
- [onAfterQuickInfo](api/event/onafterquickinfo.md) - 当弹出编辑表单关闭后触发

**属性**

- [quick_info_detached](api/config/quick_info_detached.md) - 定义任务表单是从屏幕左/右侧弹出还是在选定任务附近显示
- [quickinfo_buttons](api/config/quickinfo_buttons.md) - 存储出现在弹出任务详情表单中的按钮集合

**模版**

- [quick_info_class](api/template/quick_info_class.md) - 指定将应用于弹出编辑表单的 CSS 类
- [quick_info_content](api/template/quick_info_content.md) - 指定弹出编辑表单的内容
- [quick_info_date](api/template/quick_info_date.md) - 指定弹出编辑表单的日期
- [quick_info_title](api/template/quick_info_title.md) - 指定弹出编辑表单的标题

## QuickInfo 对象 {#quickinfoobject}

**Quick Info** 扩展的默认行为意味着弹出窗口会在选定的任务上方自动出现。

从 v7.0 开始，Quick Info 的功能得到扩展；新增了 [gantt.ext.quickInfo](guides/quickinfo-ext.md) 对象，该对象提供手动控制弹出窗口的方法。

通过 **gantt.ext.quickInfo** 对象可用的方法包括：

- **show()** - 为指定任务显示快速信息弹出窗口。它接收一个参数：
    - **id** - (*string|number*) 任务/链接/资源的 id
- **show()**  - 在特定坐标显示快速信息弹出窗口。参数为：
    - **top** - (*number*) X 坐标
    - **left** - (*number*) Y 坐标
- **hide()** - 隐藏快速信息弹出窗口。该方法可以接收一个可选参数：
    - **[ force ]** - (*boolean*) 定义当 [gantt.config.quick_info_detached](api/config/quick_info_detached.md) 设置为 *false* 时，快速信息是否应立即消失。将 *true* 作为 **hide** 方法的参数将立即移除弹出窗口，否则将在短时间动画后消失
- **setContainer()** - 设置快速信息将显示的容器。 
    - **container** - (*string|HTMLElement*) QuickInfo 容器。如果未指定自定义容器，QuickInfo 将放置在找到的节点中的第一个：**gantt.$task, gantt.$grid, gantt.$layout**
- **getNode()** - 返回快速信息弹出窗口的 HTMLElement。如果未初始化快速信息，返回 *null*
- **setContent(config)** - (*object*) 将内容放入快速信息中。它接收一个快速信息的配置对象作为参数。


*配置对象* 具有以下结构：
    - **taskId** - (*string|number*) 可选，要将快速信息中的操作按钮连接到的任务的 id
    - **header** - 可选，弹出编辑表单的头部，可能包含：
        - **title** - (*string*) 可选，弹出编辑表单的标题
        - **date** - (*string*) 可选，弹出编辑表单的日期
    - **content** - (*string*) 可选，弹出编辑表单的内容
    - **buttons** - (*string[]*) 可选，要放置在弹出编辑表单中的按钮


如果未指定 header 也未指定 buttons，相关区域的快速信息弹出将被隐藏。

#### **显示 Quick Info**

您可以通过 **gantt.ext.quickInfo.show()** 方法，为指定任务、链接、资源面板显示弹出窗口，或在屏幕上定义弹出显示的其他位置：

~~~js
// 为指定任务显示弹窗
var task = gantt.getTask(10);
gantt.ext.quickInfo.show(task.id);

// 在指定坐标处显示弹窗
gantt.ext.quickInfo.show(100, 200);
~~~

下面是为资源显示弹出窗口的示例：

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

下面是为指定链接显示弹出窗口的示例：

~~~js
const quickInfo = gantt.ext.quickInfo;
gantt.attachEvent("onLinkClick", function(id,e){
    //在此处执行任意自定义逻辑
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

#### **隐藏 Quick Info**

要隐藏弹出编辑表单，请使用 **gantt.ext.quickInfo.hide()** 方法。该方法取决于 **gantt.config.quick_info_detached** 配置，并假设两种可能的选项：

- 在不带参数的情况下，弹出编辑表单将在短暂动画后从屏幕上隐藏

~~~js
gantt.config.quick_info_detached = false;
gantt.init("gantt_here");

// 动画关闭弹窗
gantt.ext.quickInfo.hide();
~~~

- 如果您想要立即隐藏快速信息，请将 *true* 作为参数传给 **hide** 方法：

~~~js
gantt.config.quick_info_detached = false;
gantt.init("gantt_here");

// 立即关闭弹窗
gantt.ext.quickInfo.hide(true);
~~~

请注意，如果 **gantt.config.quick_info_detached** 配置被设置为 *true*，该方法将始终立即隐藏弹出窗口。

#### **创建自定义 QuickInfo**

默认情况下，快速信息弹出包含标题、日期、内容、按钮，看起来如下：

![quick_default](/img/quick_default.png)

如果您想更改弹出编辑表单的外观或创建自定义表单，可以通过 **gantt.ext.quickInfo.setContent()** 方法定义所需的 HTML 内容：

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

结果页面上将出现以下带自定义内容的快速信息弹出：

![quick_custom](/img/quick_custom.png)


#### **添加带自定义行为的自定义按钮**

[$click](api/other/click.md) 对象允许您为放置在弹出编辑表单中的自定义按钮添加自定义行为：

~~~js
gantt.config.quickinfo_buttons="[""icon_delete","icon_edit","advanced_details_button"];
gantt.locale.labels["advanced_details_button"] = "Advanced Info";
gantt.init("gantt_here");
 
gantt.$click.buttons.advanced_details_button="function(id){"
    gantt.message("These are advanced details");
    return false; //阻止默认行为
};
~~~

#### **为 QuickInfo 设置容器** 

您可以使用 **gantt.ext.quickInfo.setContainer()** 方法使快速信息弹出显示在自定义容器中：

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

现在，带有自定义内容的弹出窗口将被渲染在 **document.body** 中，位于 Gantt 的容器之外：

![quick_container](/img/quick_container.png)