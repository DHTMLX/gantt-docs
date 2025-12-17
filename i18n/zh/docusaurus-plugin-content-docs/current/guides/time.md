---
title: "时间控件"
sidebar_label: "时间控件"
---

时间控件
=================

该控件通过两个选择器设置任务的持续时间，可定义任务的开始和结束日期。

![time_control](/img/time_control.png)

~~~js
gantt.config.lightbox.sections="["
    {name:"description", height:70, map_to:"text", type:"textarea", focus:true},
    {name:"time",        height:72, map_to:"auto", type:"time"} /*!*/
];
~~~


[Time control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/07_time.html)


初始化
---------------------------

要在 lightbox 中包含 **time** 控件，请按如下操作:

1) 在 lightbox 配置中添加一个 section:

~~~js
gantt.config.lightbox.sections="["
    {name:"description", height:70, map_to:"text", type:"textarea",focus:true},
    {name:"period",      height:72, map_to:"auto", type:"time"}, /*!*/
];
~~~

2) 为该 section 分配一个标签:

~~~js
gantt.locale.labels.section_period = "Time period";
~~~


属性
-------------------------

以下是与 'time' 控件常用的一些关键属性（完整列表见 [这里](api/config/lightbox.md)）:

- **name** - (*string*) section 的名称 
- **height** - (*number*) section 的高度
- **map_to** - (*string,object*) 可以为 "auto" 或对象，指定与 section 关联的数据属性
- **type** - (*string*) [section 控件](guides/default-edit-form.md#lightboxcontrols) 的类型
- **focus** - (*boolean*) 若设置为 *true*，lightbox 打开时该 section 会获得焦点
- **readonly** - (*boolean*) 若设置为 *true*，该 section 变为只读
- **year_range** - (*array,number*) 指定年份选择器的范围。可通过两种方式定义: 
    - *year_range: [2005, 2025]* - 从 2005 到 2025
    - *year_range: 10*  - 从（当前年份 - 10）到（当前年份 + 10）
- **single_date** - (*boolean*) 若设置为 *true*，只显示 *start Date* 选择器。编辑的任务仅有开始日期且持续时间为零，适用于 [里程碑](guides/task-types.md#lichengbei)
- **time_format** - (*string*) 控制日期时间选择器的顺序
- **autofix_end** - (*boolean*) 当开始日期超过结束日期时，是否自动调整结束日期。默认值为 *true*。禁用后可进行日期校验，但如果启用且未校验，若 *start_date* 晚于 *end_date*，任务可能会变为零持续时间。
 
配置日期时间选择器 
-------------------------------------------------

要自定义 "duration" 或 "time" section 中的选择器，请使用 [time_format](api/config/lightbox.md) 属性（详见 [날짜 형식 지정](guides/date-format.md)）:

**向 'Time period' section 添加时间选择器**
~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"time",type:"time", map_to:"auto", time_format:["%d","%m","%Y","%H:%i"]}/*!*/
];
~~~

[time_format](api/config/lightbox.md) 数组允许的成员包括:

- *"%d"* - 天选择器 
- *"%m"* - 月选择器
- *"%Y"* - 年选择器
- *"%H:%i"* - 时间选择器（格式根据 [time_picker](api/template/time_picker.md) 模板）

你可以在数组中重新排列或省略这些成员，但不能更改格式本身。

 例如:

~~~js
// 时间优先
time_format:["%H:%i", "%m", "%d", "%Y"] 
// 月份优先
time_format:["%m","%d", "%Y", "%H:%i"]
// 无年份选择器
time_format:["%H:%i", "%m", "%d"]
// 错误示例
time_format:["%H:%i", "%M", "%d", "%Y"] // "%m" 被 "%M" 替换
~~~


映射到自定义开始/结束日期时间属性
-------------------------------------------------

### 默认映射

默认情况下，time 和 duration 控件通过将 **map_to** 设为 "auto"（**map_to:"auto"**），映射到必需的 'start_date' 和 'end_date' 属性。

### 自定义映射

要将控件连接到自定义日期属性（而非 'start_date' 和 'end_date'），请为 **map_to** 使用对象:

~~~js
gantt.config.lightbox.sections = [
    {name: "description", height: 72, type: "textarea", map_to:"text", focus: true},
    {name: "time",           height: 72, type: "duration", map_to:"auto"},
    {name: "deadline",    height: 72, type: "time", /*!*/
     map_to:{start_date:"planned_start",end_date:"planned_end"}} /*!*/
];
~~~


[Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)


**map_to** 的对象形式支持:

1. **start_date** - 输入的开始日期存储的数据属性
2. **end_date** - （可选）输入的结束日期存储的数据属性 
3. **duration** - （可选）输入的持续时间存储的数据属性 

:::note
如果某个属性被省略，控件将使用对应的必需日期属性。
:::


切换 section 可见性
--------------------------

你可以通过在 lightbox section 配置中设置 **type:"time_optional"** 并加上 **button: true** 来控制 time section 的可见性:

~~~js
gantt.config.lightbox.sections = [
  {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
  {name: "time", map_to: "auto", button: true, type: "time_optional"} /*!*/
];
~~~

同时，为切换按钮的不同状态定义标签:

~~~js
gantt.locale.labels.time_enable_button = 'Schedule';
gantt.locale.labels.time_disable_button = 'Unschedule';
~~~

section 旁边会出现一个切换按钮，可用来显示或隐藏该 section。当可见时，其行为与 **type:"time"** 相同。

![](/img/time_optional.png)

如果按钮被切换关闭，section 会隐藏，但不会立即发生变化。点击 "Save" 后，通过 **map_to** 与 time 控件关联的任务属性会被设为 `null`。

~~~js
gantt.getTask(1);

// 返回值
{
    id: '1', text: 'Task #1', unscheduled: true, 
    duration: 0, parent: '10',
    end_date: null, start_date: null,
    ...
}
~~~

此功能可用于标记任务为未计划状态。参见相关示例:


**Related example:** [Unscheduled tasks](https://snippet.dhtmlx.com/5/81f51a96d)

