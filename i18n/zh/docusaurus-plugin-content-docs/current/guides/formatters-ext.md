---
title: "格式化器扩展"
sidebar_label: "格式化器扩展"
---

# 格式化器扩展

:::info
此功能仅在 PRO 版本中可用。
:::

**gantt.ext.formatters** 扩展提供了两种格式化数值的方式:

- [durationFormatter()](guides/formatters-ext.md#chixushijiangeshihuaqi)
- [linkFormatter()](guides/formatters-ext.md#lianjiegeshihuaqi)

您也可以通过现有格式化器创建[自定义格式化器](#customformatter)。

## 持续时间格式化器 {#durationformatter}

**gantt.ext.formatters.durationFormatter(config)** 方法用于创建新的 *DurationFormatter* 实例。

### **配置参数**

- <span class="submethod">**durationFormatter (config): DurationFormatter**</span> - 创建一个持续时间格式化器
    - **_config?_** - (*object*) - 可选的配置对象，包含以下选项:
        - **_enter?_** - (*string*) - 设置 **parse** 方法在输入缺少单位时的默认格式。默认值为 "day"。
        - **_store?_** - (*string*) - 定义在 gantt 中存储持续时间值的格式。这会影响 **parse** 方法的输出。默认值为 "hour"。
        - **_format?_** - (*string | Array &lt;string&gt;*) - 设置输出格式。支持的值包括 "auto"、"minute"、"hour"、"day"、"week"、"month"、"year" 或这些值的数组。"auto" 表示格式化器会根据数值大小自动选择最佳单位（较大的值使用天/月/年，较小的值使用分钟/小时）。
        - **_short?_** - (*boolean*) - 启用时间单位的简写标签。默认值为 *false*。
        - **_minutesPerHour?_** - (*number*) - 控制分钟与小时之间的换算。默认值为 60。
        - **_hoursPerDay?_** - (*number*) - 控制小时与天之间的换算。默认值为 8。
        - **_hoursPerWeek?_** - (*number*) - 控制小时与周之间的换算。默认值为 40。
        - **_daysPerMonth?_** - (*number*) - 控制天与月之间的换算。默认值为 30。
        - **_daysPerYear?_** - (*number*) - 控制天与年之间的换算。默认值为 365。
        - **_labels?_** - (*object*) - 设置不同时间单位的文本标签，用于解析和格式化:
            - **_minute?_** - (*object*) - 分钟的标签
                - **_full?_** - (*string*) - 分钟的全称标签
                - **_plural?_** - (*string*) - 分钟的复数标签
                - **_short?_** - (*string*) - 分钟的简写标签
            - **_hour?_** - (*object*) - 小时的标签
                - **_full?_** - (*string*) - 小时的全称标签
                - **_plural?_** - (*string*) - 小时的复数标签
                - **_short?_** - (*string*) - 小时的简写标签
            - **_day?_** - (*object*) - 天的标签
                - **_full?_** - (*string*) - 天的全称标签
                - **_plural?_** - (*string*) - 天的复数标签
                - **_short?_** - (*string*) - 天的简写标签
            - **_week?_** - (*object*) - 周的标签
                - **_full?_** - (*string*) - 周的全称标签
                - **_plural?_** - (*string*) - 周的复数标签
                - **_short?_** - (*string*) - 周的简写标签
            - **_month?_** - (*object*) - 月的标签
                - **_full?_** - (*string*) - 月的全称标签
                - **_plural?_** - (*string*) - 月的复数标签
                - **_short?_** - (*string*) - 月的简写标签
            - **_year?_** - (*object*) - 年的标签
                - **_full?_** - (*string*) - 年的全称标签
                - **_plural?_** - (*string*) - 年的复数标签
                - **_short?_** - (*string*) - 年的简写标签


**示例:**

使用默认设置创建一个持续时间格式化器:
~~~js
const formatter = gantt.ext.formatters.durationFormatter();
// 通过工厂方法创建格式化器实例
~~~

- **_enter_**:
~~~js
formatter.parse("1"); // 如果 enter:"day"（默认），解析为 1 天
formatter.parse("1"); // 如果 enter:"hour"，解析为 1 小时
~~~

- **_store_**:

~~~js
formatter.parse("1 day"); // 如果 store:"hour"，存储为 8
formatter.parse("1 day"); // 如果 store:"minute"，存储为 480 
~~~


- **_format_**
~~~js
gantt.ext.formatters.durationFormatter({
    format: ["hour", "minute"], /*!*/
    store:"minute"
}).format(260); // 输出 "4 hours 20 minutes"

gantt.ext.formatters.durationFormatter({
    format: "hour", /*!*/
    store:"minute"    
}).format(260);// 输出 "4.33 hours"
~~~


- **_short_**
~~~js
gantt.ext.formatters.durationFormatter({
    format: ["week", "hour", "minute"],
    store:"minute",
    short: false /*!*/    
}).format(10021); //"4 weeks 7 hours 1 minute"
 
gantt.ext.formatters.durationFormatter({
    format: ["week", "hour", "minute"],
    store:"minute",
    short: true     /*!*/
}).format(10021); //"4wk 7h 1min"
~~~


完整配置示例:
~~~js
const formatter = gantt.ext.formatters.durationFormatter({
    // 默认值
    enter: "day",
    store: "hour",
    format: "auto",
    short: false,
    minutesPerHour: 60,
    hoursPerDay: 8,
    hoursPerWeek: 40,
    daysPerMonth: 30,
    daysPerYear: 365,
    labels: {
        minute: {
            full: "minute",
            plural: "minutes",
            short: "min"
        },
        hour: {
            full: "hour",
            plural: "hours",
            short: "h"
        },
        day: {
            full: "day",
            plural: "days",
            short: "d"
        },
        week: {
            full: "week",
            plural: "weeks",
            short: "wk"
        },
        month: {
            full: "month",
            plural: "months",
            short: "mon"
        },
        year: {
            full: "year",
            plural: "years",
            short: "y"
        }
    }
});
~~~

### **API**

*DurationFormatter* 实例提供以下方法:

- <span class="submethod">**canParse (value): boolean**</span> - 检查字符串是否可以被解析为持续时间值；如果可以则返回 *true*，否则返回 *false*
    - **_value_** - (*string*) - 要检查的字符串


~~~js
const formatter = gantt.ext.formatters.durationFormatter();
console.log(formatter.canParse("1 day"));
// true

console.log(formatter.canParse("abc"));
// false
~~~

- <span class="submethod">**format (value): string**</span> - 将持续时间值转换为格式化字符串
    - **_value_** - (*number*) - 要转换的持续时间值

~~~js
const formatter = gantt.ext.formatters.durationFormatter();
console.log(formatter.format(24));
// 输出: 3 days
~~~

- <span class="submethod">**parse (value): number**</span> - 将字符串解析为持续时间值，若无法解析则返回 'null'
    - **_value_** - (*string*) - 要解析的字符串


~~~js
const formatter = gantt.ext.formatters.durationFormatter();
console.log(formatter.parse("1 day"));
// 输出: 8
~~~

关于 **durationFormatter** 的更多细节可参见 [작업 시간 계산](guides/working-time.md) 文章。

## 链接格式化器 {#linkformatter}

**gantt.ext.formatters.linkFormatter(config)** 方法用于创建新的 *LinkFormatter* 实例。它与持续时间格式化器共享部分方法和配置。

### **配置参数**

- <span class="submethod">**linkFormatter (config): LinkFormatter**</span> - 创建一个链接格式化器
    - **_config?_** - (*object*) - 可选的配置对象，包含以下选项:
        - **_durationFormatter?_** - (*DurationFormatter*) - 由 *gantt.ext.formatters.durationFormatter()* 创建的实例，影响滞后/提前值的解析与格式化方式。
        - **_labels?_** - (*object*) - 不同链接类型的标签:
            - **_finish_to_start?_** - (*string*) - 完成到开始类型链接的标签
            - **_start_to_start?_** - (*string*) - 开始到开始类型链接的标签
            - **_finish_to_finish?_** - (*string*) - 完成到完成类型链接的标签
            - **_start_to_finish?_** - (*string*) - 开始到完成类型链接的标签

**示例:**


使用默认设置创建一个链接格式化器:

~~~js
const formatter = gantt.ext.formatters.linkFormatter();
// 通过工厂方法创建格式化器实例
~~~

- **_short_**:

~~~js
gantt.ext.formatters.linkFormatter()
   .format({id:1, type:"1", source: 1, target: 2, lag: 5});
// 输出: "1SS+5 days"
 
var durationFormatter = gantt.ext.formatters.durationFormatter({
    short: true
});
gantt.ext.formatters.linkFormatter({durationFormatter: durationFormatter})
    .format({id:1, type:"2", source: 1, target: 2, lag: -1});
// 输出: "1FF-1d"
~~~


- **_labels_**:
~~~js
const formatter = gantt.ext.formatters.linkFormatter({
    // 默认值
    durationFormatter: gantt.ext.formatters.durationFormatter(),
    labels: {
        finish_to_start: "FS",
        start_to_start: "SS",
        finish_to_finish: "FF",
        start_to_finish: "SF"
    }
});
~~~


### **API**

*LinkFormatter* 实例提供以下方法:


- <span class="submethod">**canParse (value): boolean**</span> - 检查字符串是否可以被解析为链接对象；如果可以则返回 *true*，否则返回 *false*
    - **_value_** - (*string*) - 要检查的字符串

~~~js
const formatter = gantt.ext.formatters.linkFormatter();
console.log(formatter.canParse("1FS + 1 day"));
// true
 
console.log(formatter.canParse("abc"));
// false
~~~

- <span class="submethod">**format (link): string**</span> - 将链接对象转换为字符串
    - **_link_** - (*Link*) - 要转换的链接对象

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

formatter.format({id:1, type:"1", source: 1, target: 2, lag: 5});
// 输出: "1SS+5 days"
~~~

- <span class="submethod">**parse (value): object**</span> - 将字符串解析为链接对象，若解析失败则返回 'null'。注意，解析结果对象中的 *link.target* 会被设置为 "null"。
    - **_value_** - (*string*) - 要解析的字符串

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

formatter.parse("1SS+5 days");
// 输出: {id:1, type:"1", source: 1, target: null, lag: 5}
~~~

### **格式信息**

*LinkFormatter* 支持两种链接格式:

 - **$(WBS)** - 简短格式
   - **$(WBS)** - [任务 WBS 代码](api/method/getwbscode.md)

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

console.log(formatter.parse("1.1"));
// {id:1, type:"0", source: 2, target: 3, lag: 0}

console.log(formatter.format({id:2, type:"0", source: 1, target: 3, lag: 0}));
// 1.1
~~~

 - **$(WBS)$(TYPE)$(LAG)** - 完整格式
   - **$(WBS)** - [任务 WBS 代码](api/method/getwbscode.md)
   - **$(TYPE)** - [链接类型](api/config/links.md)。**支持的值:** 'FF', 'FS', 'SS', 'SF'，或者由*LinkFormatter*的**labels**配置定义。
   - **$(LAG)** - [链接时差](guides/auto-scheduling.md#shezhirenwuzhijiandezhihouhetiqianshijian)。可以为正或负，例如**+1 day**或**-1 day**。支持的格式取决于传递给*LinkFormatter*构造函数的**durationFormatter**参数。

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

console.log(formatter.parse("1.1SS + 1 day"));
// {id:1, type:"1", source: 2, target: null, lag: 1}

console.log(formatter.format({id:1, type:"1", source: 2, target: 3, lag: 1}));
// 1.1SS + 1 day
~~~

没有任何时差的"完成-开始"链接将以简短格式显示，其他类型的链接则使用完整格式。同样，如果仅向**parse**方法提供任务的 WBS 代码，格式化器会默认其为零时差的"完成-开始"类型。

关于linkFormatter方法的更多细节，请参见 [그리드에서 인라인 편집](guides/inline-editing.md) 文章。

## 自定义格式化器 {#customformatter}

Gantt 工具允许您基于内置格式化器创建自定义格式化器。您可以将这些自定义格式化器添加到内联编辑器中。在内部，Gantt 会以其预期的格式保存数据，但当用户打开内联编辑器时，会以首选格式显示该值。

自定义格式化器是包含两个函数的对象:**format()** 和 **parse()**。

**format()** 函数将数字（针对自定义持续时间格式化器）或链接（针对自定义链接格式化器）转换为期望的显示值。**parse()** 函数则把格式化后的值转换回数字或链接对象。

自定义格式化器通常如下所示:

~~~js
const customDurationFormatter = {
    format: function (duration) {
        let formattedDuration;
        // 代码：将数字转换为期望的值
        return formattedDuration;
    },
    parse: function (formattedValue) {
        let duration;
        // 代码：将期望的值转换为数字
        return duration;
    }
};

const customLinkFormatter = {
    format: function (link) {
        let formattedLink;
        // 代码：将链接对象转换为期望的值
        return formattedLink;
    },
    parse: function (formattedValue) {
        let link;
        // 代码：将期望的值转换为`link`对象
        return link
    }
};
~~~

您可以在自定义格式化器中使用现有的格式化器，并根据需要调整它们的输出。

将自定义格式化器分配给内联编辑器的方式与默认格式化器相同。例如:

~~~js
const durationEditor = { 
    type: "duration", map_to: "duration", formatter: customDurationFormatter 
};
~~~

下面是一个自定义持续时间和链接格式化器的示例:


**Related example:** [Custom duration and link formatters](https://snippet.dhtmlx.com/gcvw2a6c)


## 复数形式的自定义规则

默认的 [Duration Formatter](guides/formatters-ext.md#chixushijiangeshihuaqi) 设计用于处理英语的复数形式，通常只需添加后缀或稍作词形变化。

其他语言往往有多种复数形式，并且使用规则各不相同。为此，您可以创建一个自定义格式化器，以应用适合您语言的规则。以下示例展示了如何为日语实现这些规则:


**Related example:** [Custom duration formatter with different plural values for Japanese locale](https://snippet.dhtmlx.com/jyvsiqop)

