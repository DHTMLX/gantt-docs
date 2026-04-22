---
title: "无障碍"
sidebar_label: "无障碍"
---

# 无障碍

[无障碍](https://www.w3.org/WAI/fundamentals/accessibility-intro/) 是现代网络应用程序的重要且必要的标准。  
存在一系列不同的技术，可以让应用程序或网站更易于使用和操作。

为了让残障人士更容易访问和使用 DHTMLX Gantt，该组件包含一组无障碍功能：

- WAI-ARIA 属性
- 键盘导航
- 高对比度主题

## WAI-ARIA 属性

DHTMLXGantt 提供 WAI-ARIA 支持，这意味着在组件标记中使用特殊属性。  
这些属性是额外的，可以使组件对屏幕阅读器更易识别。

您可以在 [WAI-ARIA 官方规范](https://www.w3.org/WAI/standards-guidelines/aria/) 中找到更多信息。

在 Gantt 中，WAI-ARIA 属性默认启用；若要禁用它们，可以将 *wai_aria_attributes* 属性设为 *false*：

~~~js
gantt.config.wai_aria_attributes = true;
~~~

## 键盘导航

此技术通过相应的按键和组合键提供对应用程序所有功能的访问，而不是通过鼠标指针进行导航。

详细信息请参阅 [Keyboard Navigation](guides/keyboard-navigation.md) 文章。

## 高对比度主题 {#highcontrastthemes}

DHTMLXGantt 支持使用对比鲜明颜色的主题，使应用界面更加清晰、易于辨认。高对比度主题将有助于具有特殊或特定视觉需求的用户。

可用的对比度主题有两种变体：

- 黑色对比度皮肤

![contrast_black_skin](/img/contrast_black_skin.png)

~~~html
<link rel="stylesheet" href="../../codebase/dhtmlxgantt_contrast_black.css" 
    type="text/css" media="screen" title="no title" charset="utf-8">
~~~

[High contrast theme - Black](https://docs.dhtmlx.com/gantt/samples/06_skins/07_high_contrast_black.html)

- 白色对比度皮肤

![contrast_white_skin](/img/contrast_white_skin.png)

~~~html
<link rel="stylesheet" href="../../codebase/dhtmlxgantt_contrast_white.css" 
    type="text/css" media="screen" title="no title" charset="utf-8">
~~~

[High contrast theme - White](https://docs.dhtmlx.com/gantt/samples/06_skins/08_high_contrast_white.html)