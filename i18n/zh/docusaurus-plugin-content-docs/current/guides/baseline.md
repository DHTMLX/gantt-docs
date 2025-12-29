---
title: "基线控件"
sidebar_label: "基线控件"
---

# 基线控件

:::info
此功能仅包含在 PRO 版本中。
:::

这是一组选择器，用于通过定义任务的开始日期和持续天数来设置[基线](guides/inbuilt-baselines.md)。

~~~js
gantt.config.lightbox.sections = [
    { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
    { name: "time", type: "duration", map_to: "auto" },
    { name: "baselines", height: 100, type: "baselines", map_to: "baselines" }, /*!*/
];
~~~


[Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)


## 初始化

要在 lightbox 中包含 **baselines** 控件，请按照以下步骤操作:

1) 向 lightbox 配置中添加一个 section:

~~~js
gantt.config.lightbox.sections = [
    { name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    { name:"baselines", type:"baselines" },  /*!*/
    { name:"time", type:"duration", map_to:"auto" }
];
~~~
  
2) 为该 section 定义一个标签:

~~~js
gantt.locale.labels.section_baselines = "Baselines";
~~~

## 属性

以下是 **baselines** 控件常用的主要属性（完整列表请参见[这里](api/config/lightbox.md)）:

- **name** - (*string*) section 的标识符
- **height** - (*number*) section 的高度
- **map_to** - (*string*) 应设置为 "baselines"
- **formatter** - (object) [durationFormatter](guides/working-time.md#shijinzhigeshiderenwugongqi) 对象的实例
- **type** - (*string*) [section 控件](guides/default-edit-form.md#lightboxcontrols)的类型
- **focus** - (*boolean*) 如果为 true，则在打开 lightbox 时该 section 获得焦点
- **readonly** - (*boolean*) 如果为 true，该 section 为只读
- **year_range** - (*array,number*) 定义年份选择器的范围。可以通过两种方式设置: 
    - *year_range: [2005, 2025]* - 从 2005 到 2025 
    - *year_range: 10*  - 从（当前年份 - 10）到（当前年份 + 10）
- **single_date** - (*boolean*) 如果为 true，仅显示*开始日期*选择器。以这种方式编辑的任务持续时间为零，主要用于[里程碑](guides/task-types.md#lichengbei)
- **time_format** - (*string*) 设置日期时间选择器的顺序

## 本地化

你可以自定义 **baselines** 控件这些部分的标签:

- **gantt.locale.labels.baselines_section_placeholder** - 未添加基线时显示的文本
- **gantt.locale.labels.baselines_remove_button** - 删除基线按钮的标签（默认值:"Remove"）
- **gantt.locale.labels.baselines_add_button** - 添加新基线按钮的标签（默认值:"Add Baseline"）
- **gantt.locale.labels.baselines_remove_all_button** - 删除所有基线按钮的标签（默认值:"Remove All"）

