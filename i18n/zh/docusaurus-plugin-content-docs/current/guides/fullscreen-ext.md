---
title: "全屏扩展"
sidebar_label: "全屏扩展"
---

# 全屏扩展

在 [全屏模式](guides/fullscreen-mode.md#fullscreen-api) 文章中阅读关于全屏扩展的详细信息。

名为 *fullscreen* 的对象具备以下 API：

## 方法

- <span class="submethod">**expand (): void**</span> - 将甘特图扩展至全屏模式

~~~js
gantt.ext.fullscreen.expand();
~~~  

- <span class="submethod">**collapse (): void**</span> - 将甘特图从全屏模式折叠回普通模式

~~~js
gantt.ext.fullscreen.collapse();
~~~  

- <span class="submethod">**toggle (): void**</span> - 当甘特图已展开至全屏时调用 **collapse()** 方法，否则调用 **expand()** 方法

~~~js
gantt.ext.fullscreen.toggle();
~~~  

- <span class="submethod">**getFullscreenElement (): HTMLElement**</span> - 返回将通过 **expand()** 方法展开到全屏的 DOM 元素

~~~js
gantt.ext.fullscreen.getFullscreenElement();
~~~  

默认情况下，**getFullscreenElement()** 方法返回 Gantt 图的 HTML 容器。