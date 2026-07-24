---
title: "Локализация"
sidebar_label: "Локализация"
---

# Локализация

Локализация позволяет представлять интерфейс диаграммы Гantt в нужном вам языке: английском, испанском, французском и т. д. По умолчанию dhtmlxGantt использует [английскую локаль](api/other/locale.md).

![gantt_localized](/img/gantt_localized.png)

## Активация локали {#activating-a-locale}

Чтобы реализовать диаграмму Гantt на языке, отличном от английского, вам нужно активировать нужную локаль через метод **setLocale** объекта [gantt.i18n](api/other/i18n.md).

~~~js
gantt.i18n.setLocale("fr");    
~~~

Вы можете использовать и обновлять любую из более чем 50 [предопределённых локалей](#predefinedlocales), которые идут в комплекте с файлом dhtmlxgantt.js, или определить собственную локаль.

:::note
Локаль можно переключать динамически, но изменения будут применены только после полного перерисовки диаграммы Гantt, либо вызовом **gantt.render()**, либо **gantt.init()**.
:::

~~~js
gantt.i18n.setLocale("fr");
gantt.init("gantt_here");
~~~

**Связанный пример**: [Localization](https://docs.dhtmlx.com/gantt/samples/01_initialization/12_localization.html)

## Предопределённые локали {#predefinedlocales}

:::note
Набор локалей, входящих в дистрибутив, был значительным образом расширен и переводы переработаны в версии **v10.0**, поэтому все предопределённые локали теперь поставляются с полным набором ярлыков.
:::

<table>
<tr><td>Язык</td><td>Код языка</td><td>Статус перевода</td></tr>
<tr><td>африкаанс</td><td>af</td><td>полный</td></tr>
<tr><td>албанский</td><td>sq</td><td>полный</td></tr>
<tr><td>арабский</td><td>ar</td><td>полный</td></tr>
<tr><td>белорусский</td><td>be</td><td>полный</td></tr>
<tr><td>боснийский</td><td>bs</td><td>полный</td></tr>
<tr><td>болгарский</td><td>bg</td><td>полный</td></tr>
<tr><td>каталанский</td><td>ca</td><td>полный</td></tr>
<tr><td>китайский (упрощённый)</td><td>cn</td><td>полный</td></tr>
<tr><td>китайский (Гонконг)</td><td>zh_hk</td><td>полный</td></tr>
<tr><td>китайский (Тайвань)</td><td>zh_tw</td><td>полный</td></tr>
<tr><td>хорватский</td><td>hr</td><td>полный</td></tr>
<tr><td>чешский</td><td>cs</td><td>полный</td></tr>
<tr><td>датский</td><td>da</td><td>полный</td></tr>
<tr><td>голландский</td><td>nl</td><td>полный</td></tr>
<tr><td>голландский (Бельгия)</td><td>nl_be</td><td>полный</td></tr>
<tr><td>английский</td><td>en</td><td>полный</td></tr>
<tr><td>эстонский</td><td>et</td><td>полный</td></tr>
<tr><td>финский</td><td>fi</td><td>полный</td></tr>
<tr><td>французский (Франция)</td><td>fr</td><td>полный</td></tr>
<tr><td>французский (Канада)</td><td>fr_ca</td><td>полный</td></tr>
<tr><td>немецкий (Германия)</td><td>de</td><td>полный</td></tr>
<tr><td>немецкий (Австрия)</td><td>de_at</td><td>полный</td></tr>
<tr><td>греческий</td><td>el</td><td>полный</td></tr>
<tr><td>иврит</td><td>he</td><td>полный</td></tr>
<tr><td>венгерский</td><td>hu</td><td>полный</td></tr>
<tr><td>индонезийский</td><td>id</td><td>полный</td></tr>
<tr><td>ирландский</td><td>ga</td><td>полный</td></tr>
<tr><td>итальянский</td><td>it</td><td>полный</td></tr>
<tr><td>японский</td><td>jp</td><td>полный</td></tr>
<tr><td>корейский</td><td>kr</td><td>полный</td></tr>
<tr><td>латышский</td><td>lv</td><td>полный</td></tr>
<tr><td>литовский</td><td>lt</td><td>полный</td></tr>
<tr><td>македонский</td><td>mk</td><td>полный</td></tr>
<tr><td>малайский</td><td>ms</td><td>полный</td></tr>
<tr><td>норвежский (Бокмол)</td><td>nb</td><td>полный</td></tr>
<tr><td>норвежский (Нynorsk)</td><td>no</td><td>полный</td></tr>
<tr><td>персидский</td><td>fa</td><td>полный</td></tr>
<tr><td>польский</td><td>pl</td><td>полный</td></tr>
<tr><td>португальский (Португалия)</td><td>pt</td><td>полный</td></tr>
<tr><td>португальский (Бразилия)</td><td>pt_br</td><td>полный</td></tr>
<tr><td>румынский</td><td>ro</td><td>полный</td></tr>
<tr><td>русский</td><td>ru</td><td>полный</td></tr>
<tr><td>словацкий</td><td>sk</td><td>полный</td></tr>
<tr><td>словенский</td><td>si</td><td>полный</td></tr>
<tr><td>испанский (Испания)</td><td>es</td><td>полный</td></tr>
<tr><td>испанский (Мексика)</td><td>es_mx</td><td>полный</td></tr>
<tr><td>шведский</td><td>sv</td><td>полный</td></tr>
<tr><td>тайский</td><td>th</td><td>полный</td></tr>
<tr><td>турецкий</td><td>tr</td><td>полный</td></tr>
<tr><td>украинский</td><td>ua</td><td>полный</td></tr>
<tr><td>вьетнамский</td><td>vi</td><td>полный</td></tr>
</table>

## Создание собственной локали

:::note
Объект [gantt.i18n](api/other/i18n.md) добавлен в v7.0. В предыдущих версиях использовался объект [gantt.locale](api/other/locale.md). Для получения дополнительной информации смотрите статью миграции (migration.md#63---70).
:::

Самый простой способ создать собственную локаль — сделать копию локали по умолчанию (английской) из образца ниже и перевести все строки из неё на нужный язык.

Пользовательская локаль может применяться к диаграмме Гantt двумя способами:

- либо переопределить текущую локаль, передав объект локали в качестве параметра методу **setLocale**:

~~~js
gantt.i18n.setLocale(localeObject);    
~~~

Примечание: если вы передаёте частичный объект локали, gantt добавит ваши ярлыки в текущую локаль:

~~~js
gantt.i18n.setLocale({
    labels: {
        new_task: "Новая задача"
    }
});    
~~~

- или, если вам нужно переключаться между несколькими локалями, определить локаль с пользовательским языковым кодом и затем переключить диаграмму Гantt на неё позже:

~~~js
gantt.i18n.addLocale("lang", localeObject);    
gantt.i18n.setLocale("lang");
~~~

**Примечание**, 

- Вы можете отправить ваш файл пользовательской локали на **support@dhtmlx.com** — и мы включим его в следующий релиз.
- Текущая активная локаль также доступна в объекте **gantt.locale**
- **month_full** — полные названия месяцев, начиная с января;
- **month_short** — краткие названия месяцев, начиная с января;
- **day_full** — полные названия дней недели, начиная с воскресенья;
- **day_short** — краткие названия дней недели, начиная с воскресенья.

~~~js title="Определение английской локали"
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

- Если метка **confirm_closing** или **confirm_deleting** не определена — соответствующий диалог подтверждения вообще не будет отображаться (авто-подтверждение);
- Метка **section_(name)** относится к разделу lightbox соответствующего имени.
- Метка **new_task** задаёт текст по умолчанию для нового события.