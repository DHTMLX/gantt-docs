---
title: "本地化"
sidebar_label: "本地化"
---

# 本地化

本地化允许你将甘特图界面以你希望的语言呈现：英语、西班牙语、法语等。
默认情况下，dhtmlxGantt 使用 [English locale](api/other/locale.md)。

![gantt_localized](/img/gantt_localized.png)


## 激活语言环境 {#qiyongyuyanhuanjing}

要将甘特图实现为非英语语言，你需要通过 [gantt.i18n](api/other/i18n.md) 对象的 **setLocale** 方法来激活所需的语言环境。 

~~~js
gantt.i18n.setLocale("fr");    
~~~

你可以使用并更新随 dhtmlxgantt.js 文件打包的 50 多个 [预定义语言环境](#predefinedlocales) 中的任一语言环境，或定义一个自定义语言环境。

:::note
语言环境可以动态切换，但更改将仅在对甘特图进行完整重绘后生效，重绘方式为 **gantt.render()** 或 **gantt.init()** 调用。
:::

~~~js
gantt.i18n.setLocale("fr");
gantt.init("gantt_here");
~~~

**相关示例**: [Localization](https://docs.dhtmlx.com/gantt/samples/01_initialization/12_localization.html)


## 预定义语言环境 {#predefinedlocales}

:::note
在 **v10.0** 版本中，随包提供的语言环境集合得到了显著扩展，翻译也重新整理，因此所有预定义语言环境现在都带有完整的标签集。
:::

<table>
<tr><td>Language</td><td>Language code</td><td>Translation status</td></tr>
<tr><td>非洲荷兰语</td><td>af</td><td>完整</td></tr>
<tr><td>阿尔巴尼亚语</td><td>sq</td><td>完整</td></tr>
<tr><td>阿拉伯语</td><td>ar</td><td>完整</td></tr>
<tr><td>白俄罗斯语</td><td>be</td><td>完整</td></tr>
<tr><td>波斯尼亚语</td><td>bs</td><td>完整</td></tr>
<tr><td>保加利亚语</td><td>bg</td><td>完整</td></tr>
<tr><td>加泰罗尼亚语</td><td>ca</td><td>完整</td></tr>
<tr><td>中文（简体）</td><td>cn</td><td>完整</td></tr>
<tr><td>中文（香港）</td><td>zh_hk</td><td>完整</td></tr>
<tr><td>中文（台湾）</td><td>zh_tw</td><td>完整</td></tr>
<tr><td>克罗地亚语</td><td>hr</td><td>完整</td></tr>
<tr><td>捷克语</td><td>cs</td><td>完整</td></tr>
<tr><td>丹麦语</td><td>da</td><td>完整</td></tr>
<tr><td>荷兰语</td><td>nl</td><td>完整</td></tr>
<tr><td>荷兰语（比利时）</td><td>nl_be</td><td>完整</td></tr>
<tr><td>英语</td><td>en</td><td>完整</td></tr>
<tr><td>爱沙尼亚语</td><td>et</td><td>完整</td></tr>
<tr><td>芬兰语</td><td>fi</td><td>完整</td></tr>
<tr><td>法语（法国）</td><td>fr</td><td>完整</td></tr>
<tr><td>法语（加拿大）</td><td>fr_ca</td><td>完整</td></tr>
<tr><td>德语（德国）</td><td>de</td><td>完整</td></tr>
<tr><td>德语（奥地利）</td><td>de_at</td><td>完整</td></tr>
<tr><td>希腊语</td><td>el</td><td>完整</td></tr>
<tr><td>希伯来语</td><td>he</td><td>完整</td></tr>
<tr><td>匈牙利语</td><td>hu</td><td>完整</td></tr>
<tr><td>印尼语</td><td>id</td><td>完整</td></tr>
<tr><td>爱尔兰语</td><td>ga</td><td>完整</td></tr>
<tr><td>意大利语</td><td>it</td><td>完整</td></tr>
<tr><td>日语</td><td>jp</td><td>完整</td></tr>
<tr><td>韩语</td><td>kr</td><td>完整</td></tr>
<tr><td>拉脱维亚语</td><td>lv</td><td>完整</td></tr>
<tr><td>立陶宛语</td><td>lt</td><td>完整</td></tr>
<tr><td>马其顿语</td><td>mk</td><td>完整</td></tr>
<tr><td>马来语</td><td>ms</td><td>完整</td></tr>
<tr><td>挪威语（Bokmål）</td><td>nb</td><td>完整</td></tr>
<tr><td>挪威语（Nynorsk）</td><td>no</td><td>完整</td></tr>
<tr><td>波斯语</td><td>fa</td><td>完整</td></tr>
<tr><td>波兰语</td><td>pl</td><td>完整</td></tr>
<tr><td>葡萄牙语（葡萄牙）</td><td>pt</td><td>完整</td></tr>
<tr><td>葡萄牙语（巴西）</td><td>pt_br</td><td>完整</td></tr>
<tr><td>罗马尼亚语</td><td>ro</td><td>完整</td></tr>
<tr><td>俄语</td><td>ru</td><td>完整</td></tr>
<tr><td>斯洛伐克语</td><td>sk</td><td>完整</td></tr>
<tr><td>斯洛文尼亚语</td><td>si</td><td>完整</td></tr>
<tr><td>西班牙语（西班牙）</td><td>es</td><td>完整</td></tr>
<tr><td>西班牙语（墨西哥）</td><td>es_mx</td><td>完整</td></tr>
<tr><td>瑞典语</td><td>sv</td><td>完整</td></tr>
<tr><td>泰语</td><td>th</td><td>完整</td></tr>
<tr><td>土耳其语</td><td>tr</td><td>完整</td></tr>
<tr><td>乌克兰语</td><td>ua</td><td>完整</td></tr>
<tr><td>越南语</td><td>vi</td><td>完整</td></tr>
</table>

## 创建自定义语言环境

:::note
[gantt.i18n](api/other/i18n.md) 对象是在 v7.0 中添加的。在早期版本中，使用的是 [gantt.locale](api/other/locale.md) 对象。更多信息，请参阅 [迁移文章](migration.md#63---70)。
:::

创建自定义语言环境的最简单方法是从下面的示例中复制默认（英语）语言环境，然后将其中的所有字符串翻译为所需语言。

自定义语言环境可以通过两种方式应用到 Gantt 图表：

- 要么通过将语言环境对象作为参数传递给 **setLocale** 方法来覆盖当前语言环境：

~~~js
gantt.i18n.setLocale(localeObject);    
~~~

注意，如果你提供了部分语言环境对象，gantt 会将你的标签添加到当前语言环境中：

~~~js
gantt.i18n.setLocale({
    labels: {
        new_task: "New task"
    }
});    
~~~

- 或者，如果你需要在多种语言环境之间切换，请使用自定义语言代码定义语言环境，然后稍后将 gantt 切换到它：

~~~js
gantt.i18n.addLocale("lang", localeObject);    
gantt.i18n.setLocale("lang");
~~~

**注**，

- 你可以将你的自定义语言环境文件发送至 **support@dhtmlx.com** - 我们将在下一个版本中将其包含。
- 当前活动的语言环境也可在 **gantt.locale** 对象中访问
- **month_full** - 从一月开始的月份全名；
- **month_short** - 从一月开始的月份简称；
- **day_full** - 从星期日开始的一周日名称的全称；
- **day_short** - 从星期日开始的一周日名称的简称。


~~~js title="English locale definition"
gantt.i18n.setLocale({
    date: {
        month_full: ["January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"],
        month_short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", 
            "Aug", "Sep", "Oct", "Nov", "Dec"],
        day_full: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
             "Friday", "Saturday"],
        day_short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    },
    labels: {
        new_task: "New task",
        icon_save: "Save",
        icon_cancel: "Cancel",
        icon_details: "Details",
        icon_edit: "Edit",
        icon_delete: "Delete",
        confirm_deleting: "Task will be deleted permanently, are you sure?",
        section_description: "Description",
        section_time: "Time period",
        section_type: "Type",
        section_deadline: "Deadline",
        section_baselines: "Baselines",
        section_new_resources: "Resources",

        /* grid columns */
        column_wbs: "WBS",
        column_text: "Task name",
        column_start_date: "Start time",
        column_duration: "Duration",
        column_add: "",

        /* link confirmation */
        link: "Link",
        confirm_link_deleting: "will be deleted",
        link_start: " (start)",
        link_end: " (end)",

        type_task: "Task",
        type_project: "Project",
        type_milestone: "Milestone",

        minutes: "Minutes",
        hours: "Hours",
        days: "Days",
        weeks: "Weeks",
        months: "Months",
        years: "Years",

        /* message popup */
        message_ok: "OK",
        message_cancel: "Cancel",

        /* constraints */
        section_constraint: "Constraint",
        constraint_type: "Constraint type",
        constraint_date: "Constraint date",
        asap: "As Soon As Possible",
        alap: "As Late As Possible",
        snet: "Start No Earlier Than",
        snlt: "Start No Later Than",
        fnet: "Finish No Earlier Than",
        fnlt: "Finish No Later Than",
        mso: "Must Start On",
        mfo: "Must Finish On",

        /* resource control */
        resources_add_button: "Add Assignment",
        resources_filter_placeholder: "Search...",
        resources_filter_label: "hide empty",
        resources_section_placeholder: "Nothing assigned yet. Click 'Add Assignment' to assign resources.",

        /* empty state screen */
        empty_state_text_link: "Click here",
        empty_state_text_description: "to create your first task",

        /* baselines control */
        baselines_section_placeholder: "Start adding a new baseline",
        baselines_add_button: "Add Baseline",
        baselines_remove_button: "Remove",
        baselines_remove_all_button: "Remove All",

        /* deadline control */
        deadline_enable_button: "Set",
        deadline_disable_button: "Remove"
    }
});
~~~

- 如果未定义 **confirm_closing** 或 **confirm_deleting** 标签，那么相关的确认对话框将根本不显示（自动确认）； 
- **section_(name)** 标签指的是相关名称的灯箱中的部分。
- **new_task** 标签定义了新事件的默认文本。