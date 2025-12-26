---
title: "Overlay 扩展"
sidebar_label: "Overlay 扩展"
---

# Overlay 扩展

:::info
该功能仅在 PRO 版本中可用。
:::

**overlay** 扩展提供了一组 API 方法，用于简化叠加层的操作。欲了解更多详细信息，请参阅文章 [타임라인 영역의 커스텀 요소](guides/baselines.md)

## 方法

以下方法可通过 **gantt.ext.overlay** 对象访问:

### addOverlay

- <span class="submethod">**addOverlay (render, id): string | number**</span> - 向 Gantt 图表中插入一个新的叠加层，并返回其 id
    - **_render_** - (*Function*): HTMLElement - 负责渲染的函数。它接收一个带有自定义内容的容器作为参数
        - **_container_** - (*HTMLElement*) - 叠加层的容器
    - **_id?_** - (*number | string*) - 可选，指定叠加层的 ID

~~~js
var overlay = gantt.ext.overlay.addOverlay(function(container){});
~~~

### deleteOverlay

- <span class="submethod">**deleteOverlay (id): boolean**</span> - 通过 id 删除叠加层
    - **_id_** - (*number | string*) - 叠加层的 ID

~~~js
gantt.ext.overlay.deleteOverlay(id);
~~~

### getOverlaysIds 

- <span class="submethod">**getOverlaysIds (): Array&lt;string&gt;**</span> - 获取已添加到图表中的所有叠加层 id 的数组

~~~js
var ids = gantt.ext.overlay.getOverlaysIds();
~~~

### refreshOverlay

- <span class="submethod">**refreshOverlay (id): void**</span> - 重新绘制指定的叠加层
    - **_id_** - (*number | string*) - 叠加层的 ID

~~~js
gantt.ext.overlay.refreshOverlay(id);
~~~

### showOverlay

- <span class="submethod">**showOverlay (id): void**</span> - 通过 id 显示叠加层
    - **_id_** - (*number | string*) - 叠加层的 ID

~~~js
gantt.ext.overlay.showOverlay(id);
~~~

### hideOverlay

- <span class="submethod">**hideOverlay (id): void**</span> - 通过 id 隐藏叠加层
    - **_id_** - (*number | string*) - 叠加层的 ID

~~~js
gantt.ext.overlay.hideOverlay(id);
~~~

### isOverlayVisible

- <span class="submethod">**isOverlayVisible (id): boolean**</span> - 判断指定的叠加层是否可见。如果可见则返回 *true*
    - **_id_** - (*number | string*) - 叠加层的 ID

~~~js
var isVisible = gantt.ext.overlay.isOverlayVisible(id);
~~~
