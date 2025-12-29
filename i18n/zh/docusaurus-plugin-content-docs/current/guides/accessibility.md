---
title: "无障碍访问"
sidebar_label: "无障碍访问"
---

# 无障碍访问

[无障碍访问](https://www.w3.org/WAI/fundamentals/accessibility-intro/) 是现代 Web 应用程序的重要标准。
有多种技术旨在让应用或网站更易于使用并提升无障碍性。

为了提升残障用户对 DHTMLX Gantt 的访问和交互体验，该组件包含了多项无障碍功能:

- WAI-ARIA 属性
- 键盘导航
- 高对比度主题

## WAI-ARIA 属性

DHTMLXGantt 通过在组件标记中加入特殊属性来支持 WAI-ARIA。
这些额外属性有助于屏幕阅读器正确解释组件内容。

更多详情可参见 [WAI-ARIA 官方规范](https://www.w3.org/WAI/standards-guidelines/aria/)。

Gantt 默认启用 WAI-ARIA 属性。若需关闭，可将 *wai_aria_attributes* 属性设置为 *false*:

~~~js
gantt.config.wai_aria_attributes = true;
~~~

## 键盘导航

该方式确保所有应用功能均可通过按键及组合键访问，无需使用鼠标导航。

更多信息可参见 [키보드 내비게이션](guides/keyboard-navigation.md) 文章。

## 高对比度主题

DHTMLXGantt 提供了对比色强烈的主题，使界面更清晰、易于查看。
高对比度主题对有特定视觉需求的用户尤为有用。

提供两种对比度主题选项:

- 黑色对比皮肤

![contrast_black_skin](/img/contrast_black_skin.png)

~~~html
<link rel="stylesheet" href="../../codebase/dhtmlxgantt_contrast_black.css" 
    type="text/css" media="screen" title="no title" charset="utf-8">
~~~


[High contrast theme - Black](https://docs.dhtmlx.com/gantt/samples/06_skins/07_high_contrast_black.html)


- 白色对比皮肤

![contrast_white_skin](/img/contrast_white_skin.png)

~~~html
<link rel="stylesheet" href="../../codebase/dhtmlxgantt_contrast_white.css" 
    type="text/css" media="screen" title="no title" charset="utf-8">
~~~


[High contrast theme - White](https://docs.dhtmlx.com/gantt/samples/06_skins/08_high_contrast_white.html)
