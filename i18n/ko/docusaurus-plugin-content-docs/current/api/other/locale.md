---
sidebar_label: locale
title: locale config
description: "현재 사용 중인 locale 객체로, 간트 차트에 지역별 맞춤 레이블을 포함합니다."
---

# locale

### Description

@short: 현재 사용 중인 locale 객체로, 간트 차트에 지역별 맞춤 레이블을 포함합니다.

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

console.log(gantt.locale);
~~~

### Details

현재 locale 설정은 **gantt.locale** 객체에 저장되며, 직접 업데이트할 수 있습니다. 예를 들어:

~~~js
gantt.locale.labels.new_task = "New task";
~~~

이는 다음과 동일합니다:

~~~js
gantt.i18n.setLocale({
    labels: {
        new_task: "New task"
    }
});    
~~~

두 방법 모두 지원되며 정상 작동합니다. 하지만 [gantt.i18n](api/other/i18n.md) 객체 API를 사용하는 방법이 권장됩니다.

### Related Guides
- [로컬라이제이션](guides/localization.md)

