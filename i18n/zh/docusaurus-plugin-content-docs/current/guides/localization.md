---
title: "本地化（Localization）"
sidebar_label: "本地化（Localization）"
---

# 本地化（Localization）


本地化功能允许您将 Gantt 图界面显示为您偏好的语言，如英语、西班牙语、法语等。默认情况下，dhtmlxGantt 使用 [English locale](api/other/locale.md)。

![gantt_localized](/img/gantt_localized.png)

## 启用语言环境


若需将 Gantt 图切换为英语以外的其他语言，只需通过 [gantt.i18n](api/other/i18n.md) 对象的 **setLocale** 方法激活所需的语言环境。

~~~js
gantt.i18n.setLocale("fr");    
~~~

您可以使用 dhtmlxgantt.js 文件中包含的任何[预定义语言环境](#predefinedlocales)，也可以创建自定义语言环境。

:::note
语言环境可以动态切换，但只有在 Gantt 图完全重绘（通过 **gantt.render()** 或 **gantt.init()**）后，更新才会生效。
:::

~~~js
    gantt.i18n.setLocale("fr");
    gantt.init("gantt_here");
~~~


[Localization](https://docs.dhtmlx.com/gantt/samples/01_initialization/12_localization.html)


## 预定义语言环境


<table>
<tr><td>语言</td><td>语言代码</td><td>翻译状态</td></tr>
<tr><td>阿拉伯语</td><td>ar</td><td>部分</td></tr>
<tr><td>白俄罗斯语</td><td>be</td><td>完整</td></tr>
<tr><td>英语</td><td>en</td><td>完整</td></tr>
<tr><td>加泰罗尼亚语</td><td>ca</td><td>部分</td></tr>
<tr><td>中文</td><td>cn</td><td>部分</td></tr>
<tr><td>克罗地亚语</td><td>hr</td><td>完整</td></tr>
<tr><td>捷克语</td><td>cs</td><td>部分</td></tr>
<tr><td>丹麦语</td><td>da</td><td>部分</td></tr>
<tr><td>荷兰语</td><td>nl</td><td>部分</td></tr>
<tr><td>芬兰语</td><td>fi</td><td>部分</td></tr>
<tr><td>法语</td><td>fr</td><td>完整</td></tr>
<tr><td>德语</td><td>de</td><td>完整</td></tr>
<tr><td>希腊语</td><td>el</td><td>部分</td></tr>
<tr><td>希伯来语</td><td>he</td><td>部分</td></tr>
<tr><td>匈牙利语</td><td>hu</td><td>部分</td></tr>
<tr><td>印度尼西亚语</td><td>id</td><td>部分</td></tr>
<tr><td>意大利语</td><td>it</td><td>部分</td></tr>
<tr><td>日语</td><td>jp</td><td>部分</td></tr>
<tr><td>韩语</td><td>kr</td><td>部分</td></tr>
<tr><td>挪威语</td><td>no</td><td>部分</td></tr>
<tr><td>挪威书面语</td><td>nb</td><td>部分</td></tr>
<tr><td>波斯语</td><td>fa</td><td>完整</td></tr>
<tr><td>波兰语</td><td>pl</td><td>部分</td></tr>
<tr><td>葡萄牙语</td><td>pt</td><td>部分</td></tr>
<tr><td>罗马尼亚语</td><td>ro</td><td>部分</td></tr>
<tr><td>俄语</td><td>ru</td><td>完整</td></tr>
<tr><td>斯洛伐克语</td><td>sk</td><td>部分</td></tr>
<tr><td>斯洛文尼亚语</td><td>si</td><td>部分</td></tr>
<tr><td>西班牙语</td><td>es</td><td>部分</td></tr>
<tr><td>瑞典语</td><td>sv</td><td>部分</td></tr>
<tr><td>土耳其语</td><td>tr</td><td>部分</td></tr>
<tr><td>乌克兰语</td><td>ua</td><td>部分</td></tr>
</table>

## 创建自定义语言环境 


:::note
[gantt.i18n](api/other/i18n.md) 对象从 v7.0 版本引入。早期版本使用 [gantt.locale](api/other/locale.md) 对象。详情请参阅 [迁移指南](migration.md#63---70)。
:::

创建自定义语言环境最简单的方法是复制以下示例中的默认英语语言环境，然后将所有字符串翻译成所需语言。

您可以通过以下两种方式将自定义语言环境应用到 Gantt 图:

- 通过 **setLocale** 方法传递自定义语言对象，覆盖当前语言环境:

~~~js
gantt.i18n.setLocale(localeObject);    
~~~

如果只提供了部分语言对象，gantt 会将您的标签与现有语言环境合并:

~~~js
gantt.i18n.setLocale({
    labels: {
        new_task: "New task"
    }
});    
~~~

- 或者，如果需要在多个语言环境之间切换，可以使用自定义语言代码定义新语言环境，稍后再切换:

~~~js
gantt.i18n.addLocale("lang", localeObject);    
gantt.i18n.setLocale("lang");
~~~

**注意**: 

- 您可以将自定义语言文件发送到 **support@dhtmlx.com**，以便将其纳入未来版本。
- 当前激活的语言环境可通过 **gantt.locale** 对象访问。
- **monthFull** 包含从一月开始的完整月份名称；
- **monthShort** 包含从一月开始的月份缩写；
- **dayFull** 包含从星期天开始的完整星期名称；
- **dayShort** 包含从星期天开始的星期缩写。

(English locale definition)
~~~js
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

- 如果缺少 **confirm_closing** 或 **confirm_deleting** 标签，相应的确认对话框将不会显示（自动确认）。
- **section_(name)** 标签与 lightbox 中名称相同的分区对应。
- **new_task** 标签设置新任务的默认文本。

