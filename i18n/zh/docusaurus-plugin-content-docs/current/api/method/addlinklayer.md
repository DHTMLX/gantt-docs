---
sidebar_label: addLinkLayer
title: addLinkLayer method
description: "在时间轴区域显示带有自定义元素的额外链接层"
---

# addLinkLayer
:::info
此功能仅在PRO版中可用。 
:::
### Description

@short: 在时间轴区域显示带有自定义元素的额外链接层

@signature: addLinkLayer: (func: AdditionalLinkLayer['LinkLayerRender'] | AdditionalLinkLayer['LinkLayerConfig']) =\> string

### Parameters

- `func` - (required) *LinkLayerRender | LinkLayerConfig* -        一个渲染函数或配置对象

### Returns
- ` layerId` - (string) - 表示将显示的层的DOM元素

### Example

~~~jsx
gantt.attachEvent("onGanttReady", function () {
    const link_types = ["FS", "SS", "FF", "SF"]
    gantt.addLinkLayer(function (link) {
        const node = gantt.getLinkNode(link.id);
        if (node){
            const el = document.createElement('div');
            el.className = 'link_layer';
            el.style.left = (node.childNodes[2].offsetLeft + 20) + 'px'
            el.style.top = (node.childNodes[2].offsetTop - 6) + 'px'
            el.innerHTML = link_types[link.type];
            return el;
        }
        return false;
    });
});
~~~

### Details

参数可以是以下类型之一:

- **linkLayerRender (link, timeline, config, viewport): HTMLElement|boolean|void** - 一个接收link对象并返回要在层中显示的DOM元素的函数。
    - **_link_** - (*Link*) - 链接对象
    - **_timeline?_** - (*any*) - 可选，时间轴视图
    - **_config?_** - (*GanttConfigOptions*) - 可选，甘特图配置对象
    - **_viewport?_** - (*LayerViewport*) - 可选，视口对象


- **linkLayerConfig** - (*object*) - 额外链接层的配置对象，包含以下属性:
    - **_id?_** - (*string | number*) - 可选，层ID
    - **_renderer_** - (*object*) - 必需，负责渲染层元素的对象
        - **_render_** - (*LinkLayerRender*) - 返回要渲染的HTML元素的函数
        - **_update?_** - (*Function*): void - 可选，用于更新已渲染HTML元素的函数
            - **_link_** - (*Link*) - 链接对象
            - **_node_** - (*HTMLElement*) - 渲染节点的容器
            - **_timeline?_** - (*any*) - 可选，时间轴视图
            - **_config?_** - (*GanttConfigOptions*) - 可选，甘特图配置对象
            - **_viewport?_** - (*LayerViewport*) - 可选，视口对象
        - **_onrender?_** - (*Function*): void - 可选，渲染完成后调用，适用于渲染原生组件（例如使用 `ReactDOM.render`）
            - **_link_** - (*Link*) - 链接对象
            - **_node_** - (*HTMLElement*) - 渲染节点的容器
            - **_view?_** - (*any*) - 可选，添加层的布局单元（默认:timeline）
        - **_getRectangle?_** - (*Function*): \{ left: number, top: number, height: number, width: number \} | void - 可选，返回视口矩形坐标
            - **_link_** - (*Link*) - 链接对象
            - **_view?_** - (*any*) - 可选，添加层的布局单元（默认:timeline）
            - **_config?_** - (*GanttConfigOptions*) - 可选，甘特图配置对象
            - **_gantt?_** - (*GanttStatic*) - 可选，甘特图实例
        - **_getVisibleRange_** - (*Function*): \{start: number, end: number\} | undefined | void - 可选，返回可见范围对象
            - **_gantt?_** - (*GanttStatic*) - 可选，甘特图实例
            - **_view?_** - (*any*) - 可选，添加层的布局单元（默认:timeline）
            - **_config?_** - (*GanttConfigOptions*) - 可选，甘特图配置对象
            - **_datastore?_** - (*any*) - 可选，链接数据存储对象
            - **_viewport?_** - (*LayerViewport*) - 可选，视口对象
    - **_container?_** - (*HTMLElement*) - 可选，层的容器元素
    - **_topmost?_** - (*boolean*) - 可选，若为true，层元素将显示在链接之上
    - **_filter?_** - (*Function*): boolean - 可选，接收链接对象并返回false以跳过该链接的渲染的函数
        - **_link_** - (*Link*) - 链接对象


- 请注意，自定义层在再次调用 [gantt.init](api/method/init.md) 后会被清除  
- 同时，调用 [gantt.resetLayout()](api/method/resetlayout.md) 会重置自定义层。若要保持其可见，需在调用 [resetLayout](api/method/resetlayout.md) 后重新应用 **gantt.addLinkLayer**。

:::note
Sample: [Gantt. 带有链接类型的额外层](https://snippet.dhtmlx.com/6mmt1nvw) 
:::

### Related API
- [removeLinkLayer](api/method/removelinklayer.md)
- [addTaskLayer](api/method/addtasklayer.md)

