---
sidebar_label: csp
title: csp config
description: "控制日期格式化方法在内部的实现方式"
---

# csp

### Description

@short: 控制日期格式化方法在内部的实现方式

@signature: csp: boolean | string

### Example

~~~jsx
gantt.config.csp = true;
...
gantt.init("gantt_here");
~~~

**Default value:** "auto"

### Details

某些运行时环境，比如 Salesforce Lightning，可能会阻止 dhtmlxGantt 的代码正常运行。这通常是由于应用中设置的 Content Security Policy (CSP) 所致。CSP 可能会将 Gantt 内部的高性能日期格式化方法视为安全风险。

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

