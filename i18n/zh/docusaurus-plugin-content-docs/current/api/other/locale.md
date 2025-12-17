---
sidebar_label: locale
title: locale config
description: "当前使用的 locale 对象，包含甘特图的区域特定标签"
---

# locale

### Description

@short: 当前使用的 locale 对象，包含甘特图的区域特定标签

@signature: locale: GanttLocale

### Example

~~~jsx
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
        new_task: "新任务",
        icon_save: "保存",
        icon_cancel: "取消",
        icon_details: "详情",
        icon_edit: "编辑",
        icon_delete: "删除",
        gantt_save_btn: "新标签",
          gantt_cancel_btn: "新标签",
          gantt_delete_btn: "新标签",
        confirm_closing: "",// 您的更改将丢失，确定吗？
        confirm_deleting: "任务将被永久删除，确定吗？",
        section_description: "描述",
        section_time: "时间周期",
        section_type: "类型",

        /* grid 列 */
        column_wbs: "WBS",
        column_text: "任务名称",
        column_start_date: "开始时间",
        column_duration: "持续时间",
        column_add: "",

        /* 链接确认 */
        link: "链接",
        confirm_link_deleting: "将被删除",
        link_start: "（开始）",
        link_end: "（结束）",

        type_task: "任务",
        type_project: "项目",
        type_milestone: "里程碑",

        minutes: "分钟",
        hours: "小时",
        days: "天",
        weeks: "周",
        months: "月",
        years: "年",

        /* 消息弹窗 */
        message_ok: "确定",
        message_cancel: "取消",

        /* 约束 */
        section_constraint: "约束",
        constraint_type: "约束类型",
        constraint_date: "约束日期",
        asap: "尽快开始",
        alap: "尽晚开始",
        snet: "不早于开始",
        snlt: "不晚于开始",
        fnet: "不早于完成",
        fnlt: "不晚于完成",
        mso: "必须开始于",
        mfo: "必须完成于",

        /* 资源控制 */
        resources_filter_placeholder: "输入以过滤",
        resources_filter_label: "隐藏空项"
    }
});

console.log(gantt.locale);
~~~

### Details

当前的 locale 设置存储在 **gantt.locale** 对象中，可以直接更新，例如:

~~~js
gantt.locale.labels.new_task = "新任务";
~~~

这相当于:

~~~js
gantt.i18n.setLocale({
    labels: {
        new_task: "新任务"
    }
});    
~~~

两种方法都支持且运行良好。但推荐使用 [gantt.i18n](api/other/i18n.md) 对象 API 的方式。

### Related Guides
- [本地化（Localization）](guides/localization.md)

