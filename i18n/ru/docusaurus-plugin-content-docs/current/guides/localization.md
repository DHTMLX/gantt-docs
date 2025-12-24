---
title: "Локализация"
sidebar_label: "Локализация"
---

# Локализация


Локализация позволяет отображать интерфейс диаграммы Gantt на предпочитаемом языке, например, английском, испанском, французском и других. По умолчанию dhtmlxGantt использует [английскую локаль](api/other/locale.md).

![gantt_localized](/img/gantt_localized.png)

## Активация локали


Чтобы использовать диаграмму Gantt на языке, отличном от английского, просто активируйте нужную локаль с помощью метода **setLocale** объекта [gantt.i18n](api/other/i18n.md).

~~~js
gantt.i18n.setLocale("fr");    
~~~

Вы можете использовать любую из [предустановленных локалей](#predefinedlocales), которые входят в файл dhtmlxgantt.js, либо создать свою собственную локаль.

:::note
Локаль можно менять на лету, однако изменения вступят в силу только после полной перерисовки диаграммы Gantt с помощью **gantt.render()** или **gantt.init()**.
:::

~~~js
    gantt.i18n.setLocale("fr");
    gantt.init("gantt_here");
~~~


[Localization](https://docs.dhtmlx.com/gantt/samples/01_initialization/12_localization.html)


## Предустановленные локали


<table >
<tr><td>Язык</td><td>Код языка</td><td>Статус перевода</td></tr>
<tr><td>Арабский</td><td>ar</td><td>частичный</td></tr>
<tr><td>Белорусский</td><td>be</td><td>полный</td></tr>
<tr><td>Английский</td><td>en</td><td>полный</td></tr>
<tr><td>Каталанский</td><td>ca</td><td>частичный</td></tr>
<tr><td>Китайский</td><td>cn</td><td>частичный</td></tr>
<tr><td>Хорватский</td><td>hr</td><td>полный</td></tr>
<tr><td>Чешский</td><td>cs</td><td>частичный</td></tr>
<tr><td>Датский</td><td>da</td><td>частичный</td></tr>
<tr><td>Голландский</td><td>nl</td><td>частичный</td></tr>
<tr><td>Финский</td><td>fi</td><td>частичный</td></tr>
<tr><td>Французский</td><td>fr</td><td>полный</td></tr>
<tr><td>Немецкий</td><td>de</td><td>полный</td></tr>
<tr><td>Греческий</td><td>el</td><td>частичный</td></tr>
<tr><td>Иврит</td><td>he</td><td>частичный</td></tr>
<tr><td>Венгерский</td><td>hu</td><td>частичный</td></tr>
<tr><td>Индонезийский</td><td>id</td><td>частичный</td></tr>
<tr><td>Итальянский</td><td>it</td><td>частичный</td></tr>
<tr><td>Японский</td><td>jp</td><td>частичный</td></tr>
<tr><td>Корейский</td><td>kr</td><td>частичный</td></tr>
<tr><td>Норвежский</td><td>no</td><td>частичный</td></tr>
<tr><td>Норвежский (букмол)</td><td>nb</td><td>частичный</td></tr>
<tr><td>Персидский</td><td>fa</td><td>полный</td></tr>
<tr><td>Польский</td><td>pl</td><td>частичный</td></tr>
<tr><td>Португальский</td><td>pt</td><td>частичный</td></tr>
<tr><td>Румынский</td><td>ro</td><td>частичный</td></tr>
<tr><td>Русский</td><td>ru</td><td>полный</td></tr>
<tr><td>Словацкий</td><td>sk</td><td>частичный</td></tr>
<tr><td>Словенский</td><td>si</td><td>частичный</td></tr>
<tr><td>Испанский</td><td>es</td><td>частичный</td></tr>
<tr><td>Шведский</td><td>sv</td><td>частичный</td></tr>
<tr><td>Турецкий</td><td>tr</td><td>частичный</td></tr>
<tr><td>Украинский</td><td>ua</td><td>частичный</td></tr>
</table>

## Создание собственной локали 


:::note
Объект [gantt.i18n](api/other/i18n.md) был добавлен в версии v7.0. В более ранних версиях использовался объект [gantt.locale](api/other/locale.md). Подробнее см. в [статье по миграции](migration.md#63---70).
:::

Самый простой способ создать свою локаль - скопировать английскую локаль из примера ниже и перевести все строки на нужный вам язык.

Вы можете применить свою локаль к диаграмме Gantt двумя способами:

- Переопределить текущую локаль, передав свой объект локали в метод **setLocale**:

~~~js
gantt.i18n.setLocale(localeObject);    
~~~

Если вы передадите частичный объект локали, gantt объединит ваши метки с текущей локалью:

~~~js
gantt.i18n.setLocale({
    labels: {
        new_task: "New task"
    }
});    
~~~

- Или, если вы хотите переключаться между несколькими локалями, определите новую локаль с пользовательским языковым кодом и переключайтесь на неё позже:

~~~js
gantt.i18n.addLocale("lang", localeObject);    
gantt.i18n.setLocale("lang");
~~~

**Обратите внимание**: 

- Вы можете отправить свой файл локализации на **support@dhtmlx.com** для включения в будущие релизы.
- Активная локаль доступна через объект **gantt.locale**.
- **monthFull** содержит полные названия месяцев начиная с января;
- **monthShort** содержит сокращённые названия месяцев начиная с января;
- **dayFull** содержит полные названия дней недели начиная с воскресенья;
- **dayShort** содержит сокращённые названия дней недели начиная с воскресенья.

**English locale definition**
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

- Если метки **confirm_closing** или **confirm_deleting** отсутствуют, соответствующие диалоговые окна подтверждения отображаться не будут (автоматически подтверждаются).
- Метки **section_(name)** соответствуют секциям lightbox с такими же именами.
- Метка **new_task** задаёт текст по умолчанию для новых задач.

