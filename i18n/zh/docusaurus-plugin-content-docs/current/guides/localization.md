---
title: "本地化"
sidebar_label: "本地化"
---

# 本地化

本地化允许你将甘特图的界面以你希望的语言呈现：英语、西班牙语、法语等。
默认情况下，dhtmlxGantt 使用 [English locale](api/other/locale.md)。

![gantt_localized](/img/gantt_localized.png)


## 激活语言环境

要用非英语语言实现甘特图界面，你需要通过 [gantt.i18n](api/other/i18n.md) 对象的 **setLocale** 方法来激活所需的语言环境。 

~~~js
gantt.i18n.setLocale("fr");    
~~~

你可以使用并更新随 dhtmlxgantt.js 文件捆绑的任意 [预定义语言环境](#predefinedlocales)，也可以定义自定义语言环境。

:::note
语言环境可以动态切换，但只有在对甘特图进行一次完整的重绘后才会生效，重绘可通过 **gantt.render()** 或 **gantt.init()** 调用完成。
:::

~~~js
gantt.i18n.setLocale("fr");
gantt.init("gantt_here");
~~~

**相关示例**: [Localization](https://docs.dhtmlx.com/gantt/samples/01_initialization/12_localization.html)


## 预定义语言环境 {#predefinedlocales}

<table>
<tr><td>语言</td><td>语言代码</td><td>翻译状态</td></tr>
<tr><td>阿拉伯语</td><td>ar</td><td>部分完成</td></tr>
<tr><td>白俄罗斯语</td><td>be</td><td>完整</td></tr>
<tr><td>英语</td><td>en</td><td>完整</td></tr>
<tr><td>加泰罗尼亚语</td><td>ca</td><td>部分完成</td></tr>
<tr><td>中文</td><td>cn</td><td>部分完成</td></tr>
<tr><td>克罗地亚语</td><td>hr</td><td>完整</td></tr>
<tr><td>捷克语</td><td>cs</td><td>部分完成</td></tr>
<tr><td>丹麦语</td><td>da</td><td>部分完成</td></tr>
<tr><td>荷兰语</td><td>nl</td><td>部分完成</td></tr>
<tr><td>芬兰语</td><td>fi</td><td>部分完成</td></tr>
<tr><td>法语</td><td>fr</td><td>完整</td></tr>
<tr><td>德语</td><td>de</td><td>完整</td></tr>
<tr><td>希腊语</td><td>el</td><td>部分完成</td></tr>
<tr><td>希伯来语</td><td>he</td><td>部分完成</td></tr>
<tr><td>匈牙利语</td><td>hu</td><td>部分完成</td></tr>
<tr><td>印尼语</td><td>id</td><td>部分完成</td></tr>
<tr><td>意大利语</td><td>it</td><td>部分完成</td></tr>
<tr><td>日语</td><td>jp</td><td>部分完成</td></tr>
<tr><td>韩语</td><td>kr</td><td>部分完成</td></tr>
<tr><td>挪威语</td><td>no</td><td>部分完成</td></tr>
<tr><td>挪威博克莫尔语</td><td>nb</td><td>部分完成</td></tr>
<tr><td>波斯语</td><td>fa</td><td>完整</td></tr>
<tr><td>波兰语</td><td>pl</td><td>部分完成</td></tr>
<tr><td>葡萄牙语</td><td>pt</td><td>部分完成</td></tr>
<tr><td>罗马尼亚语</td><td>ro</td><td>部分完成</td></tr>
<tr><td>俄语</td><td>ru</td><td>完整</td></tr>
<tr><td>斯洛伐克语</td><td>sk</td><td>部分完成</td></tr>
<tr><td>斯洛文尼亚语</td><td>si</td><td>部分完成</td></tr>
<tr><td>西班牙语</td><td>es</td><td>部分完成</td></tr>
<tr><td>瑞典语</td><td>sv</td><td>部分完成</td></tr>
<tr><td>土耳其语</td><td>tr</td><td>部分完成</td></tr>
<tr><td>乌克兰语</td><td>ua</td><td>部分完成</td></tr>
</table>

## 创建自定义语言环境 

:::note
在 v7.0 中引入了 [gantt.i18n](api/other/i18n.md) 对象。在早期版本中，使用的是 [gantt.locale](api/other/locale.md) 对象。更多信息，请参阅 [迁移文章](migration.md#63---70)。
:::

创建自定义语言环境最简单的方法是，从下面的示例中复制默认（英语）语言环境，并将其中的所有字符串翻译成所需语言。

自定义语言环境可以通过两种方式应用到甘特图：

- 要么通过把语言环境对象作为参数传递给 **setLocale** 方法来覆盖当前语言环境：

~~~js
gantt.i18n.setLocale(localeObject);    
~~~

注意，如果你提供的是部分语言环境对象，gantt 将把你的标签添加到当前语言环境中：

~~~js
gantt.i18n.setLocale({
    labels: {
        new_task: "New task"
    }
});    
~~~

- 要么，如果你需要在多个语言环境之间切换，请使用带自定义语言代码的语言环境，并在后续切换到该语言环境：

~~~js
gantt.i18n.addLocale("lang", localeObject);    
gantt.i18n.setLocale("lang");
~~~

**注**，

- 你可以将你的自定义语言环境文件发送至 **support@dhtmlx.com** - 这样我们会在下一个版本中包含它。
- 当前活动的语言环境也可在 **gantt.locale** 对象中取得
- **monthFull** - 从一月开始的月份全名；
- **monthShort** - 从一月开始的月份简称；
- **dayFull** - 从星期日开始的星期全称；
- **dayShort** - 从星期日开始的星期简称。


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
        gantt_save_btn: "New Label",
          gantt_cancel_btn: "New Label",
          gantt_delete_btn: "New Label",
        confirm_closing: "",// Your changes will be lost, are you sure?
        confirm_deleting: "Task will be deleted permanently, are you sure?",
        section_description: "Description",
        section_time: "Time period",
        section_type: "Type",

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
        weeks: "Week",
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
        resources_filter_placeholder: "type to filter",
        resources_filter_label: "hide empty"
    }
});
~~~

- 如果未定义 **confirm_closing** 或 **confirm_deleting** 标签，相应的确认对话框将不会显示（自动确认）；
- **section_(name)** 标签指的是与相关名称相关的 lightbox 部分。
- **new_task** 标签定义了新事件的默认文本。