--- 
title: "覆盖层扩展"
sidebar_label: "覆盖层扩展"
---

# 覆盖层扩展

:::info
此功能仅在 PRO 版中可用。
:::

覆盖层扩展包含一组 API 方法，用于简化对覆盖层的操作。有关 Overlay 扩展的详细信息，请阅读文章 [时间线区域中的自定义元素](guides/baselines.md#extra-overlay-for-the-chart)。

## 方法

以下方法通过 **gantt.ext.overlay** 对象提供：

### addOverlay

- <span class="submethod">**addOverlay (render, id): string | number**</span> - 在甘特图中添加一个新的覆盖层并返回其 id
    - **_render_** - (*Function*): HTMLElement - 渲染函数。将带有自定义内容的容器作为参数传入
        - **_container_** - (*HTMLElement*) - 覆盖层容器
    - **_id?_** - (*number | string*) - 可选，覆盖层的 ID


~~~js
var overlay = gantt.ext.overlay.addOverlay(function(container){}); 
~~~

### deleteOverlay

- <span class="submethod">**deleteOverlay (id): boolean**</span> - 根据其 id 移除一个覆盖层
    - **_id_** - (*number | string*) - 覆盖层的 ID

~~~js
gantt.ext.overlay.deleteOverlay(id);
~~~

### getOverlaysIds 

- <span class="submethod">**getOverlaysIds (): Array&lt;string&gt;**</span> - 返回一个包含已添加到图表中的覆盖层 ID 的数组

~~~js
var ids = gantt.ext.overlay.getOverlaysIds();
~~~

### refreshOverlay

- <span class="submethod">**refreshOverlay (id): void**</span> - 重新绘制指定的覆盖层。
    - **_id_** - (*number | string*) - 覆盖层的 ID

~~~js
gantt.ext.overlay.refreshOverlay(id);
~~~

### showOverlay

- <span class="submethod">**showOverlay (id): void**</span> - 按其 ID 显示覆盖层。
    - **_id_** - (*number | string*) - 覆盖层的 ID

~~~js
gantt.ext.overlay.showOverlay(id);
~~~

### hideOverlay

- <span class="submethod">**hideOverlay (id): void**</span> - 按其 ID 隐藏覆盖层
    - **_id_** - (*number | string*) - 覆盖层的 ID

~~~js
gantt.ext.overlay.hideOverlay(id);
~~~

### isOverlayVisible

- <span class="submethod">**isOverlayVisible (id): boolean**</span> - 检查指定覆盖层的可见性。如果覆盖层可见，则返回 *true*。
    - **_id_** - (*number | string*) - 覆盖层的 ID

~~~js
var isVisible = gantt.ext.overlay.isOverlayVisible(id);
~~~