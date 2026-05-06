---
title: "지역화"
sidebar_label: "지역화"
---

# 지역화

지역화 기능을 통해 Gantt 차트의 인터페이스를 원하는 언어로 표시할 수 있습니다: 영어, 스페인어, 프랑스어 등. 기본적으로 dhtmlxGantt는 [영어 로케일](api/other/locale.md)을 사용합니다.

![gantt_localized](/img/gantt_localized.png)

## 로케일 활성화

비영어권 언어로 Gantt 차트를 구현하려면 [gantt.i18n](api/other/i18n.md) 객체의 **setLocale** 메서드를 통해 필요한 로케일을 활성화해야 합니다.

~~~js
gantt.i18n.setLocale("fr");    
~~~

dhtmlxgantt.js 파일에 번들로 제공되는 [predefined locales](#predefinedlocales)를 사용하고 업데이트하거나, 사용자 정의 로케일을 정의할 수 있습니다.

:::note
로케일은 동적으로 전환할 수 있지만, 변경 내용은 Gantt 차트를 완전히 다시 그린 후에만 적용됩니다. 이때 **gantt.render()** 또는 **gantt.init()** 호출이 필요합니다.
:::

~~~js
gantt.i18n.setLocale("fr");
gantt.init("gantt_here");
~~~

**관련 샘플**: [로컬라이제이션](https://docs.dhtmlx.com/gantt/samples/01_initialization/12_localization.html)

## 미리 정의된 로케일 {#predefinedlocales}

<table>
<tr><td>Language</td><td>Language code</td><td>Translation status</td></tr>
<tr><td>아랍어</td><td>ar</td><td>partial</td></tr>
<tr><td>벨로루시어</td><td>be</td><td>full</td></tr>
<tr><td>영어</td><td>en</td><td>full</td></tr>
<tr><td>카탈로니아어</td><td>ca</td><td>partial</td></tr>
<tr><td>중국어</td><td>cn</td><td>partial</td></tr>
<tr><td>크로아티아어</td><td>hr</td><td>full</td></tr>
<tr><td>체코어</td><td>cs</td><td>partial</td></tr>
<tr><td>덴마크어</td><td>da</td><td>partial</td></tr>
<tr><td>네덜란드어</td><td>nl</td><td>partial</td></tr>
<tr><td>핀란드어</td><td>fi</td><td>partial</td></tr>
<tr><td>프랑스어</td><td>fr</td><td>full</td></tr>
<tr><td>독일어</td><td>de</td><td>full</td></tr>
<tr><td>그리스어</td><td>el</td><td>partial</td></tr>
<tr><td>히브리어</td><td>he</td><td>partial</td></tr>
<tr><td>헝가리어</td><td>hu</td><td>partial</td></tr>
<tr><td>인도네시아어</td><td>id</td><td>partial</td></tr>
<tr><td>이탈리아어</td><td>it</td><td>partial</td></tr>
<tr><td>일본어</td><td>jp</td><td>partial</td></tr>
<tr><td>한국어</td><td>kr</td><td>partial</td></tr>
<tr><td>노르웨이어</td><td>no</td><td>partial</td></tr>
<tr><td>노르웨이어 보크말</td><td>nb</td><td>partial</td></tr>
<tr><td>페르시아어</td><td>fa</td><td>full</td></tr>
<tr><td>폴란드어</td><td>pl</td><td>partial</td></tr>
<tr><td>포르투갈어</td><td>pt</td><td>partial</td></tr>
<tr><td>루마니아어</td><td>ro</td><td>partial</td></tr>
<tr><td>러시아어</td><td>ru</td><td>full</td></tr>
<tr><td>슬로바키아어</td><td>sk</td><td>partial</td></tr>
<tr><td>슬로베니아어</td><td>si</td><td>partial</td></tr>
<tr><td>스페인어</td><td>es</td><td>partial</td></tr>
<tr><td>스웨덴어</td><td>sv</td><td>partial</td></tr>
<tr><td>터키어</td><td>tr</td><td>partial</td></tr>
<tr><td>우크라이나어</td><td>ua</td><td>partial</td></tr>
</table>

## 사용자 정의 로케일 만들기

:::note
[gantt.i18n](api/other/i18n.md) 객체는 v7.0에 추가되었습니다. 이전 버전에서는 [gantt.locale](api/other/locale.md) 객체를 사용했습니다. 자세한 내용은 마이그레이션 문서(migration.md#63---70)를 참조하십시오.
:::

가장 쉬운 방법은 아래 샘플의 기본(영어) 로케일을 복사하고 필요한 언어로 모든 문자열을 번역하는 것입니다.

사용자 정의 로케일은 Gantt 차트에 두 가지 방법으로 적용할 수 있습니다:

- 현재 로케일을 재정의하려면 로케일 객체를 매개변수로 전달하여 **setLocale** 메서드를 사용합니다:

~~~js
gantt.i18n.setLocale(localeObject);    
~~~

참고, 부분 로케일 객체를 제공하면 gantt가 현재 로케일에 레이블을 추가합니다:

~~~js
gantt.i18n.setLocale({
    labels: {
        new_task: "New task"
    }
});    
~~~

- 또는 여러 로케일 간 전환이 필요하면, 사용자 정의 언어 코드로 로케일을 정의하고 나중에 gantt를 그 로케일로 전환합니다:

~~~js
gantt.i18n.addLocale("lang", localeObject);    
gantt.i18n.setLocale("lang");
~~~

**참고**

- 고객님의 사용자 정의 로케일 파일을 **support@dhtmlx.com**로 보내주시면 다음 릴리스에 포함하겠습니다.
- 현재 활성화된 로케일은 또한 **gantt.locale** 객체에서 확인할 수 있습니다.
- **monthFull** - 1월부터 시작하는 월의 전체 이름;
- **monthShort** - 1월부터 시작하는 월의 축약 이름;
- **dayFull** - 일요일부터 시작하는 주 요일의 전체 이름;
- **dayShort** - 일요일부터 시작하는 주 요일의 축약 이름.

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

- 만약 **confirm_closing** 또는 **confirm_deleting** 레이블이 정의되지 않으면 관련 확인 대화 상자는 표시되지 않습니다(자동 확인).
- **section_(name)** 레이블은 관련 이름의 라이트박스 섹션을 가리킵니다.
- **new_task** 레이블은 새 이벤트의 기본 텍스트를 정의합니다.