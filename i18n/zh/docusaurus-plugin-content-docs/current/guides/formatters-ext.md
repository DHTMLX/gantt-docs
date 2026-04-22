--- 
title: "格式化器扩展"
sidebar_label: "格式化器扩展"
---

# 格式化器扩展

:::note
此功能仅在 PRO 版中可用。
:::

Gantt 的 **gantt.ext.formatters** 扩展提供两种格式化方法：

- [durationFormatter()](guides/formatters-ext.md#durationformatter)
- [linkFormatter()](guides/formatters-ext.md#linkformatter)

你也可以基于现有的格式化器指定一个 [自定义格式化器](#customformatter)。

## 时长格式化器 {#durationformatter}

**gantt.ext.formatters.durationFormatter(config)** 方法返回一个新的 *DurationFormatter* 实例。

### **配置**

- <span class="submethod">**durationFormatter (config): DurationFormatter**</span> - 创建一个时长格式化器
    - **_config?_** - (*object*) - 可选的配置对象，可以包含以下属性：
        - **_enter?_** - (*string*) - 指定用于 **parse** 方法的默认格式，当输入值进入时没有单位。默认值： "day"。
        - **_store?_** - (*string*) - 指定在甘特图中存储时长值的格式。此属性会影响 **parse** 方法的输出值。默认值： "hour"。
        - **_format?_** - (*string | Array &lt;string&gt;*) - 指定输出值的格式。支持的值： "auto"、"minute"、"hour"、"day"、"week"、"month"、"year"，以及包含其中任意值的数组。"auto" 表示格式化器将根据提供的数值自动选择合适的单位（例如，较大的数值将格式化为天/月/年，较小的数值将格式化为分钟/小时）。
        - **_short?_** - (*boolean*) - 设置时间单位的短标签（缩写）。默认值：*false*
        - **_minutesPerHour?_** - (*number*) - 定义分钟到小时以及小时到分钟的转换比率。默认值：60
        - **_hoursPerDay?_** - (*number*) - 定义小时到天以及天到小时的转换。默认值：8
        - **_hoursPerWeek?_** - (*number*) - 定义小时到周以及周到小时的转换。默认值：40
        - **_daysPerMonth?_** - (*number*) - 定义天到月以及月到天的转换。默认值：30
        - **_daysPerYear?_** - (*number*) - 定义天到年以及年到天的转换。默认值：365
        - **_labels?_** - (*object*) - 定义不同时间单位的文本标签。这些标签将用于解析值和格式化后的值。
            - **_minute?_** - (*object*) - 分钟的配置
                - **_full?_** - (*string*) - 分钟的完整文本标签
                - **_plural?_** - (*string*) - 分钟的复数文本标签
                - **_short?_** - (*string*) - 分钟的短文本标签
            - **_hour?_** - (*object*) - 小时的配置
                - **_full?_** - (*string*) - 小时的完整文本标签
                - **_plural?_** - (*string*) - 小时的复数文本标签
                - **_short?_** - (*string*) - 小时的短文本标签
            - **_day?_** - (*object*) - 天的配置
                - **_full?_** - (*string*) - 天的完整文本标签
                - **_plural?_** - (*string*) - 天的复数文本标签
                - **_short?_** - (*string*) - 天的短文本标签
            - **_week?_** - (*object*) - 周的配置
                - **_full?_** - (*string*) - 周的完整文本标签
                - **_plural?_** - (*string*) - 周的复数文本标签
                - **_short?_** - (*string*) - 周的短文本标签
            - **_month?_** - (*object*) - 月的配置
                - **_full?_** - (*string*) - 月的完整文本标签
                - **_plural?_** - (*string*) - 月的复数文本标签
                - **_short?_** - (*string*) - 月的短文本标签
            - **_year?_** - (*object*) - 年的配置
                - **_full?_** - (*string*) - 年的完整文本标签
                - **_plural?_** - (*string*) - 年的复数文本标签
                - **_short?_** - (*string*) - 年的短文本标签


**示例：**

使用默认设置初始化时长格式化器：
~~~js
const formatter = gantt.ext.formatters.durationFormatter();
// 通过工厂方法创建了一个格式化器对象的实例
~~~

- **_enter_**：
~~~js
formatter.parse("1"); // 如果 enter:"day"（默认），解析为 1 天
formatter.parse("1"); // 如果 enter:"hour"，解析为 1 小时
~~~

- **_store_**：

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

创建的 *DurationFormatter* 实例提供以下方法：

- <span class="submethod">**canParse (value): boolean**</span> - 如果提供的字符串可以解析为持续时间值则返回 true，否则返回 false
    - **_value_** - (*string*) - 将要检查的字符串


~~~js
const formatter = gantt.ext.formatters.durationFormatter();
console.log(formatter.canParse("1 day"));
// true

console.log(formatter.canParse("abc"));
// false
~~~

- <span class="submethod">**format (value): string**</span> - 将提供的持续时间值转换为持续时间字符串
    - **_value_** - (*number*) - 将要转换的持续时间值

~~~js
const formatter = gantt.ext.formatters.durationFormatter();
console.log(formatter.format(24));
// 3 days
~~~

- <span class="submethod">**parse (value): number**</span> - 将提供的字符串解析为持续时间值。如果无法解析，将返回 'null'。**注意** 给定链接的 *link.target* 将具有 "null" 值
    - **_value_** - (*string*) - 将要转换的字符串


~~~js
const formatter = gantt.ext.formatters.durationFormatter();
console.log(formatter.parse("1 day"));
// 8
~~~

有关 **durationFormatter** 方法的详细信息，请参阅 [Work Time Calculation](guides/working-time.md#taskdurationindecimalformat) 文章。

## 链接格式化器 {#linkformatter}

**gantt.ext.formatters.linkFormatter(config)** 方法返回一个新的 *LinkFormatter* 实例。它复用了部分方法以及 Duration Formatter 的配置。

### **配置**

- <span class="submethod">**linkFormatter (config): LinkFormatter**</span> - 创建一个链接格式化器
    - **_config?_** - (*object*) - 可选的配置对象，可以包含以下属性：
        - **_durationFormatter?_** - (*DurationFormatter*) - 通过 *gantt.ext.formatters.durationFormatter()* 创建的 *DurationFormatter* 实例。它会影响链接的滞后/前导值如何被解析和格式化：
        - **_labels?_** - (*object*) - 不同类型链接的区域本地化标签
            - **_finish_to_start?_** - (*string*) - Finish to Start 链接的标签
            - **_start_to_start?_** - (*string*) - Start to Start 链接的标签
            - **_finish_to_finish?_** - (*string*) - Finish to Finish 链接的标签
            - **_start_to_finish?_** - (*string*) - Start to Finish 链接的标签

**示例：**

使用默认设置初始化 Link Formatter：

~~~js
const formatter = gantt.ext.formatters.linkFormatter();
// 通过工厂方法创建格式化器实例
~~~

- **_short_**：

~~~js
gantt.ext.formatters.linkFormatter()
   .format({id:1, type:"1", source: 1, target: 2, lag: 5});
//"1SS+5 days"
 
var durationFormatter = gantt.ext.formatters.durationFormatter({
    short: true
});
gantt.ext.formatters.linkFormatter({durationFormatter: durationFormatter})
    .format({id:1, type:"2", source: 1, target: 2, lag: -1});
//"1FF-1d"
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

创建的 *LinkFormatter* 实例提供以下方法：

- <span class="submethod">**canParse (value): boolean**</span> - 如果提供的字符串可以解析为链接对象则返回 true，否则返回 false
    - **_value_** - (*string*) - 将要检查的字符串

~~~js
const formatter = gantt.ext.formatters.linkFormatter();
console.log(formatter.canParse("1FS + 1 day"));
// true
 
console.log(formatter.canParse("abc"));
// false
~~~

- <span class="submethod">**format (link): string**</span> - 将提供的链接值转换为字符串
    - **_value_** - (*Link*) - 将要转换的链接对象

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

formatter.format({id:1, type:"1", source: 1, target: 2, lag: 5});
//"1SS+5 days"
~~~ 

- <span class="submethod">**parse (value): object**</span> - 将提供的字符串解析为链接对象。如果无法解析，将返回 'null'。**注意** 给定链接的 *link.target* 将具有 "null" 值
    - **_value_** - (*string*) - 将要转换的字符串

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

formatter.parse("1SS+5 days");
// {id:1, type:"1", source: 1, target: null, lag: 5}
~~~

### **Format info**

*LinkFormatter* 支持两种链接格式：

 - **$(WBS)** - 短格式
   - **$(WBS)** - [task WBS code](api/method/getwbscode.md)

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

console.log(formatter.parse("1.1"));
// {id:1, type:"0", source: 2, target: 3, lag: 0}

console.log(formatter.format({id:2, type:"0", source: 1, target: 3, lag: 0}));
// 1.1
~~~

 - **$(WBS)$(TYPE)$(LAG)** - 完整格式
   - **$(WBS)** - [task WBS code](api/method/getwbscode.md)
   - **$(TYPE)** - [link type](api/config/links.md). **支持的取值：** 'FF', 'FS', 'SS', 'SF', 或由 *LinkFormatter* 的 **labels** 配置定义。
   - **$(LAG)** - [link lag](guides/auto-scheduling.md#settinglagandleadtimesbetweentasks). 它的取值可以是正数或负数 - **+1 day**, **-1 day**。受支持的格式由构造 *LinkFormatter* 构造方法时提供的 **durationFormatter** 参数决定。

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

console.log(formatter.parse("1.1SS + 1 day"));
// {id:1, type:"1", source: 2, target: null, lag: 1}

console.log(formatter.format({id:1, type:"1", source: 2, target: 3, lag: 1}));
// 1.1SS + 1 day
~~~

结对 Finish-To-Start 链接若没有滞后/前导，将使用短格式进行格式化；而其他链接将使用完整格式进行格式化。同样地，如果在 **parse** 方法中只提供了任务的 WBS 代码，格式化器将假定 Finish-to-Start 类型并且滞后时间为零。

有关 linkFormatter 方法的详细信息，请参阅 [Inline Editing in Grid](guides/inline-editing.md#linkformatter) 文章。

## 自定义格式化器 {#customformatter}

Gantt 功能允许在现有 Gantt 格式化器的基础上创建自定义格式化器。你可以将自定义格式化器添加到内联编辑器。在底层，Gantt 会按照它期望的格式存储数据；而当用户打开内联编辑器时，它会显示用户所需的值。

自定义格式化器是一个包含两个函数的对象：**format()** 和 **parse()**。

**format()** 函数将数字（自定义时长格式化器）或链接（自定义链接格式化器）转换为所需的值。**parse()** 函数将格式化后的值转换回数字（自定义时长格式化器）或链接（自定义链接格式化器）。

以下是自定义格式化器的示例：

~~~js
const customDurationFormatter = {
    format: function (duration) {
        let formattedDuration;
        // 代码用于将数字转换为所需值
        return formattedDuration;
    },
    parse: function (formattedValue) {
        let duration;
        // 代码用于将所需值转换为数字
        return duration;
    }
};

const customLinkFormatter = {
    format: function (link) {
        let formattedLink;
        // 代码用于将链接对象转换为所需值
        return formattedLink;
    },
    parse: function (formattedValue) {
        let link;
        // 代码用于将所需值转换为 `link` 对象
        return link
    }
};
~~~ 

你可以在自定义格式化器中使用现有的格式化器并修改它们返回的值。

自定义格式化器为内联编辑器的指定方式与常规格式化器相同。例如：

~~~js
const durationEditor = { 
    type: "duration", map_to: "duration", formatter: customDurationFormatter 
};
~~~

以下是自定义时长和链接格式化器的示例：

相关示例 [Custom duration and link formatters](https://snippet.dhtmlx.com/gcvw2a6c)

## 自定义复数形式规则 

默认 [Duration Formatter](guides/formatters-ext.md#durationformatter) 的配置允许仅使用一个复数形式来表示名词的复数形式，因为英语中的复数形式通常通过添加后缀或改变名词本身来实现。

在其他语言中，一个词可能有多种复数形式。此外，不同语言对不同复数形式的使用可能有不同规则。你可以使用自定义格式化器为你的语言指定规则。下面的示例展示了如何在日语语言环境中为自定义格式化器应用必要的规则：

相关示例 [Custom duration formatter with different plural values for Japanese locale](https://snippet.dhtmlx.com/jyvsiqop)