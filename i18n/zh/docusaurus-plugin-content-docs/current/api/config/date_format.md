---
sidebar_label: date_format
title: date_format 配置
description: "用于从数据集解析数据并将日期发送回服务器时所使用的日期格式"
---

# date_format

### Description

@short: 设置用于从数据集解析数据并将日期发送回服务器的日期格式

@signature: date_format: string

### Example

~~~jsx
gantt.config.date_format = "%Y-%m-%d %H:%i";
...
gantt.init("gantt_here");
gantt.load("/data/tasks");
~~~

**默认值:** "%d-%m-%Y %H:%i"

### Details

此配置选项用于创建 [parse_date](api/template/parse_date.md) 和 [format_date](api/template/format_date.md) 模板函数。 
要使用自定义格式，你可以调整此配置值，或者直接重写 **parse_date** 和 **format_date** 模板。

## Loading dates in ISO format

自 v9.1.3 版本起，Gantt 会自动检测并解析 ISO 8601 日期字符串。date_format 配置对 ISO 字符串来说不是必需的——它们会被直接识别并解析。

当输入中检测到 ISO 日期时，在传递给 [DataProcessor](api/method/dataprocessor.md) 时，它们会自动被序列化回 ISO 字符串。仅日期的字符串（例如，"2026-01-06"）会被序列化回日期字符串，并保持原始格式。

date_format 配置仍然适用于非 ISO 日期字符串。

:::tip Gantt v9.1.2 及更早版本
在 v9.1.3 之前的版本中，ISO 日期不会自动检测。如果你使用的是较旧的版本，则需要覆盖 `parse_date` 和 `format_date` 模板以处理 ISO 字符串：

~~~js
gantt.templates.parse_date = (date) => new Date(date);
gantt.templates.format_date = (date) => date.toISOString();
~~~

:::

有关更多细节，请参阅 [ISO 格式加载日期](guides/loading.md#loading-dates-in-iso-format)。

## 动态更改日期格式

如果你需要动态修改日期格式，需要按以下方式修改 [`parse_date`](api/template/parse_date.md) 模板：

~~~js
const config = gantt.config;
const parseDate = gantt.date.str_to_date(config.date_format, config.server_utc);

gantt.templates.parse_date = (date) => parseDate(date);
~~~

### Related API
- [parse_date](api/template/parse_date.md)
- [format_date](api/template/format_date.md)

### Related Guides
- [日期格式规范](guides/date-format.md)