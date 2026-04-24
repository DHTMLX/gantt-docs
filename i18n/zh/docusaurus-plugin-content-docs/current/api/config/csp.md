---
sidebar_label: csp
title: CSP 配置
description: "定义日期格式化方法的内部实现代码"
---

# csp

### Description

@short: 定义日期格式化方法的内部实现代码

@signature: csp: boolean | string

### Example

~~~jsx
gantt.config.csp = true;
...
gantt.init("gantt_here");
~~~

**Default value:** "auto"

### Details

某些应用的运行时环境（例如 Salesforce Lightning）常常会阻止执行 dhtmlxGantt 代码。  
其主要原因是在应用中指定了内容安全策略（Content Security Policy，CSP）。  
CSP 可能将 Gantt 内部用于日期格式化方法的高性能执行解读为不安全。

**csp** 设置帮助避免这些阻止，通过允许您选择日期格式化代码的实现方式。

处理 **gantt.date.date_to_str** 和 **gantt.date.str_to_date** 方法有三种方式:

- 默认情况下，设置为 *auto*。

~~~js
gantt.config.csp = "auto";
~~~

在此模式下，Gantt 会尝试使用最快的日期格式化代码。如果应用阻止了这段代码，它会切换到兼容版本。

- 您可以将其设置为 *true*，强制 Gantt 始终使用兼容代码。

~~~js
gantt.config.csp = true;
~~~

这确保代码可以无问题运行，但可能会稍微降低性能。

- 或者，您可以将其设置为 *false*，始终使用高性能代码。

~~~js
gantt.config.csp = false;
~~~

请注意，如果应用阻止了这段高性能代码，dhtmlxGantt 将无法正常工作。

### Change log
- 在 v7.0 中新增
- 设置为 *true* 时，[lightbox](api/config/lightbox.md) 会渲染在 Gantt 容器内（从 v7.1.13 开始）

