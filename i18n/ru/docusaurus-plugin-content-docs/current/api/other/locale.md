---
sidebar_label: locale
title: locale config
description: "объект locale, используемый в данный момент, содержащий регионально-специфичные подписи для Gantt chart"
---

# locale

### Description

@short: Объект locale, используемый в данный момент, содержащий регионально-специфичные подписи для Gantt chart

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
        new_task: "Новая задача",
        icon_save: "Сохранить",
        icon_cancel: "Отмена",
        icon_details: "Детали",
        icon_edit: "Редактировать",
        icon_delete: "Удалить",
        gantt_save_btn: "Новая метка",
          gantt_cancel_btn: "Новая метка",
          gantt_delete_btn: "Новая метка",
        confirm_closing: "",// Ваши изменения будут потеряны, вы уверены?
        confirm_deleting: "Задача будет удалена навсегда, вы уверены?",
        section_description: "Описание",
        section_time: "Период времени",
        section_type: "Тип",

        /* grid columns */
        column_wbs: "WBS",
        column_text: "Название задачи",
        column_start_date: "Время начала",
        column_duration: "Длительность",
        column_add: "",

        /* link confirmation */
        link: "Связь",
        confirm_link_deleting: "будет удалена",
        link_start: " (начало)",
        link_end: " (конец)",

        type_task: "Задача",
        type_project: "Проект",
        type_milestone: "Веха",

        minutes: "Минуты",
        hours: "Часы",
        days: "Дни",
        weeks: "Неделя",
        months: "Месяцы",
        years: "Годы",

        /* message popup */
        message_ok: "OK",
        message_cancel: "Отмена",

        /* constraints */
        section_constraint: "Ограничение",
        constraint_type: "Тип ограничения",
        constraint_date: "Дата ограничения",
        asap: "Как можно скорее",
        alap: "Как можно позже",
        snet: "Начать не раньше",
        snlt: "Начать не позже",
        fnet: "Закончить не раньше",
        fnlt: "Закончить не позже",
        mso: "Должен начаться",
        mfo: "Должен закончиться",

        /* resource control */
        resources_filter_placeholder: "введите для фильтра",
        resources_filter_label: "скрыть пустые"
    }
});

console.log(gantt.locale);
~~~

### Details

Текущие настройки locale хранятся в объекте **gantt.locale** и могут быть обновлены напрямую, например:

~~~js
gantt.locale.labels.new_task = "Новая задача";
~~~

Это эквивалентно:

~~~js
gantt.i18n.setLocale({
    labels: {
        new_task: "Новая задача"
    }
});    
~~~

Оба метода поддерживаются и работают корректно. Однако рекомендуется использовать API объекта [gantt.i18n](api/other/i18n.md).

### Related Guides
- [Локализация](guides/localization.md)

