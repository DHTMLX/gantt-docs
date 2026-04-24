---
title: "基线控制"
sidebar_label: "基线控制"
---

# 基线控制

:::info
此功能仅在 PRO Edition 版本中可用。
:::

一组选择器，用于通过指定任务的开始日期和天数来设置任务的基线。

~~~js
gantt.config.lightbox.sections = [
    { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
    { name: "time", type: "duration", map_to: "auto" },
    { name: "baselines", height: 100, type: "baselines", map_to: "baselines" }, /*!*/
];
~~~

[显示基线](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)


## 初始化

要将 **baselines** 控件添加到 lightbox，请按照下列步骤操作：

1) 在 lightbox 配置中添加一个部分：

~~~js
gantt.config.lightbox.sections = [
    { name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    { name:"baselines", type:"baselines" },  /*!*/
    { name:"time", type:"duration", map_to:"auto" }
];
~~~
  
2) 为该部分设置标签：

~~~js
gantt.locale.labels.section_baselines = "基线";
~~~


## 属性

以下属性对 **baselines** 控件来说非常重要，且常被设置（完整列表请参阅 [这里](api/config/lightbox.md)）：

- **name** - (*string*) 部分名称
- **height** - (*number*) 部分高度
- **map_to** - (*string*) 将其设为 "baselines"
- **formatter** - (object) [durationFormatter](guides/working-time.md#taskdurationindecimalformat) 对象的一个实例
- **type** - (*string*) [section control](guides/default-edit-form.md#lightboxcontrols) 的类型
- **focus** - (*boolean*) 如果设定为 *true*，打开 lightbox 时该部分将获得焦点
- **readonly** - (*boolean*) 如果将值设为 *true*，该部分将为只读
- **year_range** - (*array,number*) 为年份选择器设置一个范围。该范围可通过两种方式设置： 
    - *year_range: [2005, 2025]* - 从 2005 年到 2025 年
    - *year_range: 10*  - [当前年份 - 10 年; 当前年份 + 10 年]
- **single_date** - (*boolean*) 如果将值设为 *true*，该部分将仅显示 *start Date* 选择器。编辑的任务将仅以开始日期来指定，持续时间为零。这仅对 [milestones](guides/task-types.md#milestones) 有意义
- **time_format** - (*string*) 设置日期时间选择器的顺序

## 本地化

您可以对以下元素的标签进行本地化，属于 **baselines** 控件：

- **gantt.locale.labels.baselines_section_placeholder** - 尚未添加任何基线时显示的文本
- **gantt.locale.labels.baselines_remove_button** - 删除基线按钮的文本（默认为 “Remove”）
- **gantt.locale.labels.baselines_add_button** - 新增基线按钮的文本（默认为 “Add Baseline”）
- **gantt.locale.labels.baselines_remove_all_button** - 删除所有基线按钮的文本（默认为 “Remove All”）