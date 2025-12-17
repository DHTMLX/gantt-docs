---
sidebar_label: lightbox
title: lightbox config
description: "指定 lightbox 对象"
---

# lightbox

### Description

@short: 指定 lightbox 对象

@signature: lightbox: LightboxSections

### Example

~~~jsx
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea",focus:true},
    {name:"priority", height:22, map_to:"priority",type:"select",options:opts},                                                                        
    {name:"time", height:72, type:"duration", map_to:"auto"}
];

gantt.init("gantt_here");
~~~

### Details

lightbox 对象包含一个主要属性:

- **sections** - (*数组*) - 定义 lightbox 内的各个部分

~~~js
// 默认的 lightbox 定义   
gantt.config.lightbox.sections=[
    {name:"description", height:70, map_to:"text", type:"textarea", focus:true},
    {name:"time",        height:72, map_to:"auto", type:"duration"}
];
~~~

**sections** 数组中的每个对象根据[section 类型](guides/default-edit-form.md)可以拥有不同的属性:

## #所有部分的通用属性

- **name** - (*字符串*) - 部分的标识符（dhtmlxGantt 用它从 *locale.labels* 集合中获取标签）。例如，**time** 部分会使用 **gantt.locale.labels.section_time** 中的标签。
- **map_to** - (*字符串*) - 该部分绑定的数据属性名。
- **type** - (*字符串*) - 该部分使用的[控件类型](guides/default-edit-form.md#lightboxcontrols)。
- **height?** - (*数字*) - 可选，设置该部分的高度。该属性不适用于[checkbox](guides/checkbox.md)和[radio](guides/radio.md)部分。
- **focus?** - (*布尔*) - 可选，若为 true，lightbox 打开时该部分会自动获得焦点。
- **formatter?** - (*DurationFormatter | LinkFormatter*) - 可选，为该部分指定格式化器。

## #时间与持续时间控件 

- **readonly?** - (*布尔*) - 可选，若为 true，该部分将变为只读。
- **year_range?** - (*数字 | 数组*) - 可选，定义年份选择器的范围。可用两种方式指定:
    - *year_range: [2005, 2025]* - 选择从 2005 年到 2025 年的年份。
    - *year_range: 10* - 选择当前年份前后各 10 年的范围。
- **single_date?** - (*布尔*) - 可选，若为 true，只显示"开始日期"选择器。编辑的任务将只有开始日期且持续时间为零。此设置主要用于[milestones](guides/task-types.md#milestones)。
- **time_format?** - (*字符串数组*) - 可选，定义日期时间选择器的顺序。
- **autofix_end?** - (*布尔*) - 可选，当开始日期晚于结束日期时是否自动调整结束日期。默认开启。关闭后允许手动验证，但若无验证，任务可能出现持续时间为零的情况。

## #Select 控件

- **onchange? (*e*): any** - 可选，为该部分控件设置 'onChange' 事件处理函数。
    - **_e_** - (*事件对象*) - 原生事件对象。

## #Select、Checkbox、Radio 和 Resources 控件

- **options?** - (*对象数组*) - 可选，控件的选项列表。数组中的每个对象包含以下属性:
    - **_key_** - (*数字 | 字符串*) - 选项标识符，用于匹配任务的数据属性。
    - **_label_** - (*字符串*) - 选项显示的标签。
    - **_unit?_** - (*字符串 | 数字*) - 可选，资源控件中使用的单位。
- **default_value?** - (*任意类型*) - 可选，当输入值未定义时使用的默认值。对于资源控件，如果资源值未定义则使用此默认值。

## #Parent 控件

- **allow_root?** - (*布尔*) - 可选，若为 true，添加一个额外选项用于选择根级作为父任务。此属性与 **root_label** 配合使用。
- **root_label?** - (*字符串*) - 可选，定义根级父任务选项的标签。与 **allow_root** 一起使用。
- **sort? (task1, task2): number** - 可选，为下拉选项提供排序函数。
    - **_task1_** - (*任务对象*) - 第一个任务对象。
    - **_task2_** - (*任务对象*) - 第二个任务对象。
- **filter? (id, task): boolean** - 可选，为下拉选项提供过滤函数，接收任务 id 和任务对象。
    - **_id_** - (*字符串 | 数字*) - 任务 ID。
    - **_task_** - (*任务对象*) - 任务对象。
- **template? (start_date, end_date, task): string|number** - 可选，为下拉选项定义模板。
    - **_start_date_** - (*日期 | 数字*) - 任务开始日期。
    - **_end_date_** - (*日期 | 数字*) - 任务结束日期。
    - **_task_** - (*任务对象*) - 任务对象。

## #Typeselect 控件

- **filter** - (*函数*) - 为任务类型设置过滤函数，接收类型名称作为参数。

### Related API
- [wide_form](api/config/wide_form.md)

### Related Guides
- - [Textarea 控件](guides/textarea.md)
- - [持续时间控件](guides/duration.md)
- - [时间控件](guides/time.md)
- - [Select 控件](guides/select.md)
- - [Typeselect 控件](guides/typeselect.md)
- - [父任务控件](guides/parent.md)
- - [模板控件](guides/template.md)
- - [复选框控件](guides/checkbox.md)
- - [单选按钮控件](guides/radio.md)
- - [配置 Lightbox 元素](guides/default-edit-form.md)
- - [使用 Lightbox 元素](guides/lightbox-manipulations.md)
- - [创建自定义元素](guides/custom-editor.md)
- - [自定义 Lightbox](guides/custom-edit-form.md)
- - [在 Lightbox 中更改按钮](guides/custom-button.md)

### Change log
- 当 [gantt.config.csp](api/config/csp.md) 设置为 *true* 或 Gantt 在 Salesforce 环境中运行时，从版本 7.1.13 起，lightbox 会渲染在 Gantt 容器内。

