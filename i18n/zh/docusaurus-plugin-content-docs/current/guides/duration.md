---
title: "持续时间控件"
sidebar_label: "持续时间控件"
---

持续时间控件
======================

本节介绍了一组选择器，用于通过指定任务的开始日期和持续天数来设置任务的持续时间。

![duration_control](/img/duration_control.png)

~~~js
gantt.config.lightbox.sections="["
    {name:"description", height:70, map_to:"text", type:"textarea", focus:true},
    {name:"time",        height:72, map_to:"auto", type:"duration"} /*!*/
];
~~~


[Basic initialization](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)


初始化
---------------------------

默认情况下，lightbox 包含一个 **duration** 控件。如需添加更多控件，请按照以下步骤操作:

1) 向 lightbox 配置中添加一个新分区:

~~~js
gantt.config.lightbox.sections="["
    {name:"description", height:70, map_to:"text", type:"textarea",focus:true},
    {name:"time2",       height:72, map_to:"auto", type:"duration"}, /*!*/
    {name:"time",        height:72, map_to:"auto", type:"duration"}
];
~~~
  
2) 为新分区定义标签:

~~~js
gantt.locale.labels.section_time2 = "实际持续时间";
~~~


属性
------------------------

以下是 **time** 控件常用的主要属性（完整列表见 [这里](api/config/lightbox.md)）:

- **name** - (*string*) 分区的标识符
- **height** - (*number*) 分区的高度
- **map_to** - (*string,object*) 可为 "auto" 或指定映射到分区的数据属性对象
- **formatter** - (object) [durationFormatter](guides/working-time.md#shijinzhigeshiderenwugongqi) 的实例
- **type** - (*string*) [分区控件](guides/default-edit-form.md#lightboxcontrols)的类型
- **focus** - (*boolean*) 若设为 *true*，lightbox 打开时该分区获得焦点
- **readonly** - (*boolean*) 若设为 *true*，该分区为只读
- **year_range** - (*array,number*) 定义年份选择器的范围，可以是:
    - *year_range: [2005, 2025]* - 从 2005 到 2025
    - *year_range: 10*  - 从当前年份减 10 到当前年份加 10
- **single_date** - (*boolean*) 设为 *true* 时，仅显示 *开始日期* 选择器。编辑的任务仅由开始日期定义，持续时间为零。主要用于 [里程碑](guides/task-types.md#lichengbei)
- **time_format** - (*string*) 决定日期时间选择器的显示顺序

  

配置日期时间选择器
---------------------------------------

可以通过 [time_format](api/config/lightbox.md) 属性自定义"时间区间"分区中的选择器（参见 [날짜 형식 지정](guides/date-format.md)）:

**Adding the time selector to the 'Time period' section**
~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"time",type:"duration",map_to:"auto",time_format:["%d","%m","%Y","%H:%i"]}/*!*/
];
~~~

[time_format](api/config/lightbox.md) 数组中允许的元素包括:

- *"%d"* - 天选择器 
- *"%m"* - 月选择器
- *"%Y"* - 年选择器
- *"%H:%i"* - 时间选择器（格式由 [time_picker](api/template/time_picker.md) 模板控制） 

你可以在数组中调整这些元素的顺序或省略某些元素，但数据格式本身不能更改。

 例如，以下是一些变体:

~~~js
// 时间在前
time_format:["%H:%i", "%m", "%d", "%Y"] 
// 月份在前
time_format:["%m","%d", "%Y", "%H:%i"]
// 省略年份选择器
time_format:["%H:%i", "%m", "%d"]
// 错误用法
time_format:["%H:%i", "%M", "%d", "%Y"] // "%m" 被 "%M" 替换
~~~

映射到自定义开始/结束日期时间属性
-------------------------------------------------

### 默认映射

通常，time 和 duration 控件通过将 **map_to** 设置为 "auto"（**map_to:"auto"**）来关联到所需的 'start_date' 和 'end_date' 属性。

### 自定义映射

如需将控件关联到自定义日期属性而非 'start_date' 和 'end_date'，可为 **map_to** 属性使用对象:

~~~js
gantt.config.lightbox.sections = [
    {name: "description", height: 72, type: "textarea", map_to:"text", focus: true},
    {name: "time",           height: 72, type: "duration", map_to:"auto"},
    {name: "baseline",    height: 72, type: "duration", /*!*/
     map_to:{start_date:"planned_start",end_date:"planned_end"}} /*!*/
];
~~~


[Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)


**map_to** 对象支持以下属性: 

1. **start_date** - 输入的开始日期存储的数据属性
2. **end_date** - 可选，输入的结束日期存储的数据属性
3. **duration** - 可选，由输入定义的持续时间存储的数据属性

:::note
如果省略某个属性，控件将默认关联到相应的必填日期属性。
:::


切换分区可见性
--------------------------

你可以通过在 lightbox 分区配置中设置 **type:"duration_optional"** 和 **button: true** 来切换持续时间分区的可见性:

~~~js
gantt.config.lightbox.sections = [
  {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
  {name: "time", map_to: "auto", button: true, type: "duration_optional"} /*!*/
];
~~~

同时，为切换按钮的两种状态定义标签:

~~~js
gantt.locale.labels.time_enable_button = '计划';
gantt.locale.labels.time_disable_button = '取消计划';
~~~

分区旁会出现一个切换按钮，允许你切换其可见性。当可见时，该分区的行为与 **type:"duration"** 分区一致。

![](/img/duration_optional.png)

如果关闭按钮，分区会消失但不会立即生效。保存后，通过 **map_to** 映射到持续时间控件的任务属性将被设置为 `null`。

~~~js
gantt.getTask(1);

// 示例返回值
{
    id: '1', text: 'Task #1', unscheduled: true, 
    duration: 0, parent: '10',
    end_date: null, start_date: null,
    ...
}
~~~

此功能适用于将任务标记为未计划，或直接通过 UI 管理无基线的任务。请参见相关示例:


**Related example:** [Unscheduled tasks](https://snippet.dhtmlx.com/5/81f51a96d)


**Related example:** [Baselines](https://snippet.dhtmlx.com/6qvjoa7i)

