---
title: "Fullscreen 扩展"
sidebar_label: "Fullscreen 扩展"
---

# Fullscreen 扩展

关于 Fullscreen 扩展的更多信息，请参阅 [전체 화면 모드](guides/fullscreen-mode.md) 文章。

 *fullscreen* 对象包含以下 API:

## 方法

- <span class="submethod">**expand (): void**</span> - 将 gantt 切换为全屏模式

~~~js
gantt.ext.fullscreen.expand();
~~~

- <span class="submethod">**collapse (): void**</span> - 退出全屏模式，并将 gantt 恢复为正常大小

~~~js
gantt.ext.fullscreen.collapse();
~~~

- <span class="submethod">**toggle (): void**</span> - 如果 gantt 当前处于全屏，则触发 **collapse()** 方法；如果不是，则触发 **expand()** 方法

~~~js
gantt.ext.fullscreen.toggle();
~~~

- <span class="submethod">**getFullscreenElement (): HTMLElement**</span> - 返回在调用 **expand()** 方法时将显示为全屏的 DOM 元素

~~~js
gantt.ext.fullscreen.getFullscreenElement();
~~~

默认情况下，**getFullscreenElement()** 方法返回包含 Gantt 图表的 HTML 容器。
