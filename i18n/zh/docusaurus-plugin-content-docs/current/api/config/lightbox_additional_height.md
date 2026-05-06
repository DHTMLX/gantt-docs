---
sidebar_label: lightbox_additional_height
title: lightbox_additional_height 配置
description: "增加 lightbox 的高度"
---

# lightbox_additional_height

:::warning
該屬性已棄用
:::

### Description

@short: 增加 lightbox 的高度

@signature: lightbox_additional_height: number

### Example

~~~jsx
gantt.config.lightbox_additional_height = 90;
~~~

**Default value:** 75

### Details

The **lightbox_additional_height** 由 2 个数值相加得到：lightbox 的 header 高度和 lighbox 的 footer 高度。

### Change log
- 自 v9.0 起已弃用