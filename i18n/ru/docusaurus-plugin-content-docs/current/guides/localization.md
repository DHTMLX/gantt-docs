---
title: "Локализация"
sidebar_label: "Локализация"
---

# Локализация

Локализация позволяет отображать интерфейс диаграммы Gantt на языке, который вам нравится: английский, испанский, французский и т. д.
По умолчанию dhtmlxGantt использует [английскую локаль](api/other/locale.md).

![gantt_localized](/img/gantt_localized.png)


## Активирование локали

Чтобы реализовать интерфейс диаграммы Gantt на языке, отличном от английского, необходимо активировать соответствующую локаль с помощью метода **setLocale** объекта [gantt.i18n](api/other/i18n.md). 

~~~js
gantt.i18n.setLocale("fr");    
~~~

Вы можете использовать и обновлять любую из [предопределённых локалей](#predefinedlocales), которые поставляются вместе с файлом dhtmlxGantt.js, или определить собственную локаль.

:::note
Локаль можно переключать динамически, но изменения будут применяться только после полного перерисовывания диаграммы Gantt либо вызовом **gantt.render()** либо **gantt.init()**.
:::

~~~js
gantt.i18n.setLocale("fr");
gantt.init("gantt_here");
~~~

**Связанный пример**: [Локализация](https://docs.dhtmlx.com/gantt/samples/01_initialization/12_localization.html)


## Предопределённые локали {#predefinedlocales}

<table>
<tr><td>Язык</td><td>Код языка</td><td>Статус перевода</td></tr>
<tr><td>Арабский</td><td>ar</td><td>частичный</td></tr>
<tr><td>Белорусский</td><td>be</td><td>полный</td></tr>
<tr><td>Английский</td><td>en</td><td>полный</td></tr>
<tr><td>Каталонский</td><td>ca</td><td>частичный</td></tr>
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
<tr><td>Норвежский Бокмаль</td><td>nb</td><td>частичный</td></tr>
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
Объект [gantt.i18n](api/other/i18n.md) был добавлен в v7.0. В ранних версиях использовался объект [gantt.locale](api/other/locale.md). Для более подробной информации смотрите статью миграции Migration article (migration.md#63---70).
:::

Самый простой способ создать собственную локаль — сделать копию локали по умолчанию (английской) из примера ниже и перевести все строки из неё на требуемый язык.

Собственную локаль можно применить к диаграмме Gantt двумя способами:

- либо переопределить текущую локаль, передав объект локали в качестве параметра к методу **setLocale**:

~~~js
gantt.i18n.setLocale(localeObject);    
~~~

Примечание: если вы укажете частичный объект локали, gantt добавит ваши метки в текущую локаль:

~~~js
gantt.i18n.setLocale({
    labels: {
        new_task: "New task"
    }
});    
~~~

- или, если вам нужно переключаться между несколькими локалями, определите локаль с пользовательским языковым кодом и переключите gantt на неё позже:

~~~js
gantt.i18n.addLocale("lang", localeObject);    
gantt.i18n.setLocale("lang");
~~~

**Примечание**, 

- Вы можете отправить файл вашей пользовательской локали на адрес **support@dhtmlx.com** - чтобы мы включили его в следующий выпуск.
- Текущая активная локаль также доступна в объекте **gantt.locale**
- **monthFull** - полные названия месяцев, начиная с января;
- **monthShort** - короткие названия месяцев, начиная с января;
- **dayFull** - полные названия дней недели, начиная с воскресенья;
- **dayShort** - короткие названия дней недели, начиная с воскресенья.


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

- Если метка **confirm_closing** или **confirm_deleting** не определена - соответствующее диалоговое окно подтверждения не будет отображаться вовсе (авто-подтверждение); 
- Метка **section_(name)** относится к разделу lightbox соответствующего имени.
- Метка **new_task** определяет текст по умолчанию для нового события.