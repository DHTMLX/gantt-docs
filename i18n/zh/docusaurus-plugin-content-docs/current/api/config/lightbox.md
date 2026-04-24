---
sidebar_label: lightbox
title: lightbox 配置
description: "指定 lightbox 对象"
---

# lightbox

### Description

@short: 指定 lightbox 对象

@signature: lightbox: LightboxSections

### Example

~~~jsx
gantt.config.lightbox.sections = [
    { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
    { name: "priority", height: 22, map_to: "priority", type: "select", options: opts },
    { name: "time", height: 72, type: "duration", map_to: "auto" }
];

gantt.init("gantt_here");
~~~

### Details

lightbox 对象只有 1 个属性：

- **sections** - (*array*) - 指定 lightbox 的 sections

~~~js
// 默认的 lightbox 定义   
gantt.config.lightbox.sections=[
    {name:"description", height:70, map_to:"text", type:"textarea", focus:true},
    {name:"time",        height:72, map_to:"auto", type:"duration"}
];
~~~

在 **sections** 数组中的对象可以根据 [type of a section](guides/default-edit-form.md#lightbox-structure) 的不同具有以下属性：

#### Common for all sections

- **name** - (*string*) - 本部分的名称。dhtmlxGantt 将根据此名称从 *locale.labels* 集合中获取该部分的标签。举例来说，对于 **time** 部分，dhtmlxGantt 将获取存储在 **gantt.locale.labels.section_time** 的标签。若该部分指定了 **label** 属性，则该部分的标签将取自该属性，而非 locale。<br>**name** 属性也可用于通过 [](api/method/getlightboxsection.md) 方法获取控件对象。
- **map_to** - (*string*) - 将映射到该部分的数据属性的名称。
- **type** - (*string*) - [该部分控件的类型](guides/default-edit-form.md#lightboxcontrols)（编辑器）。
- **label** - (*string*) - 该部分的标签。
- **height?** - (*number*) - 可选，部分的高度。与 [checkbox](guides/checkbox.md) 和 [radio](guides/radio.md) 部分不使用。
- **focus?** - (*boolean*) - 可选，如果设为 *true*，打开 lightbox 时该部分将获得焦点
- **formatter?** - (*DurationFormatter | LinkFormatter*) - 可选，为该部分定义格式化器

#### Time and Duration controls

- **readonly?** - (*boolean*) - 可选，若设为 *true*，该部分将只读
- **year_range?** - (*number | number[]*) - 可选，为年份选择器设置一个范围。可以有两种设置方式：
    - *year_range: [2005, 2025]* - 从 2005 年到 2025 年的区间
    - *year_range: 10*  - [当前年份 - 10 年; 当前年份 + 10 年] 的区间
- **single_date?** - (*boolean*) - 可选，如果设为 *true*，在该部分仅显示“开始日期”选择器。编辑后的任务将仅以开始日期表示，持续时间为 0。仅对 [milestones](guides/task-types.md#milestones) 有意义。
- **time_format?** - (*string[]*) - 可选，设置日期时间选择器的顺序
- **autofix_end?** - (*boolean*) - 可选，若所选开始日期大于结束日期，是否自动修正结束日期，默认为 *true*。禁用模式仅进行日期验证，但若开启此模式而不验证日期，可能会产生开始日期大于结束日期时持续时间为 0 的任务。

#### Select control

- **onchange? (*e*): any** - 可选，指定该部分控件的 'onChange' 事件处理函数
    - **_e_** - (*Event*) - 本地原生事件对象。

#### Select, Checkbox, Radio and Resources controls

- **options?** - (*object[]*) - 可选，定义控件的下拉选项。数组中的每个对象表示一个选项，并包含以下属性：
    - **_key_** - (*number | string*) - 该选项的 ID。此属性会与任务的数据属性进行比较，以将选项分配给任务
    - **_label_** - (*string*) - 选项标签
    - **_unit?_** - (*string | number*) - 可选，资源的计量单位（针对 Resources 控制）
- **default_value?** - (*any*) - 可选，该部分控件的默认值。仅在输入值未定义时应用。对于 Resources 控件，当资源的值未定义时亦适用。

#### Resource Assignments control

- **config** - (*object*) lightbox 中的资源网格配置，用以显示所需列
- **templates** - (*object*) 资源网格在 lightbox 中的模板
- **resource_default_assignment** - (*object*) 默认分配的配置对象（将通过 "Add Assignment" 按钮添加）
    - **start_date** - (*Date | string | null*) 分配计划开始的日期
    - **end_date** - (*Date | string | null*) 分配计划完成的日期
    - **value** - (*number | string*) 分配给任务的资源数量
    - **duration** - (*number | null*) 分配的持续时间
    - **mode** - (*string*) 资源分配时间的计算模式： "default" | "fixedDates" | "fixedDuration"

#### Parent control

- **allow_root?** - (*boolean*) - 可选，如果设为 "true"，选项列表将包含一个附加选项，允许用户将根级别设为任务的父级。与 **root_label** 属性配对使用
- **root_label?** - (*string*) - 可选，为根级父对象设置标签。与 **allow_root** 属性配对使用
- **sort? (task1, task2): number** - 可选，为下拉选项设置排序函数
    - **_task1_** - (*Task*) - 将被排序的第一个任务对象
    - **_task2_** - (*Task*) - 将被排序的第二个任务对象
- **filter? (id, task): boolean** - 可选，为下拉选项设置过滤函数。参数为任务的 id 和任务对象
    - **_id_** - (*string | number*) - 任务对象的 ID
    - **_task_** - (*Task*) - 任务对象
- **template? (start_date, end_date, task): string|number** - 可选，为下拉选项设置模板
    - **_start_date_** - (*Date | number*) - 任务对象的开始日期
    - **_end_date_** - (*Date | number*) - 任务对象的结束日期
    - **_task_** - (*Task*) - 任务对象

#### Typeselect control

- **filter** - (*function*) - 为任务类型设置过滤函数。参数为类型名称

### Related API
- [wide_form](api/config/wide_form.md)

### Related Guides
- [Textarea Control](guides/textarea.md)
- [Duration Control](guides/duration.md)
- [Time Control](guides/time.md)
- [Select Control](guides/select.md)
- [Typeselect Control](guides/typeselect.md)
- [Parent Control](guides/parent.md)
- [Template Control](guides/template.md)
- [Checkbox Control](guides/checkbox.md)
- [Radio Button Control](guides/radio.md)
- [Configuring Lightbox Elements](guides/default-edit-form.md)
- [Working with Lightbox Elements](guides/lightbox-manipulations.md)
- [Creating Custom Element](guides/custom-editor.md)
- [Custom Lightbox](guides/custom-edit-form.md)
- [Changing Buttons in the Lightbox](guides/custom-button.md)

### Change log
- 当 [gantt.config.csp](api/config/csp.md) 设置为 *true* 或 Gantt 在 Salesforce 环境中运行时，从版本 7.1.13 起，lightbox 会渲染在 Gantt 容器内。

