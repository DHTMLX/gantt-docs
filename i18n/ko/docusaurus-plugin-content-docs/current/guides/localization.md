---
title: "로컬라이제이션"
sidebar_label: "로컬라이제이션"
---

로컬라이제이션
================

로컬라이제이션을 사용하면 Gantt 차트 인터페이스를 영어, 스페인어, 프랑스어 등 원하는 언어로 표시할 수 있습니다. 기본적으로 dhtmlxGantt는 [영어 로케일](api/other/locale.md)을 사용합니다.

![gantt_localized](/img/gantt_localized.png)

로케일 활성화하기
---------------------------------------------

영어 이외의 언어로 Gantt 차트를 사용하려면, [gantt.i18n](api/other/i18n.md) 객체의 **setLocale** 메서드를 사용하여 원하는 로케일을 활성화하면 됩니다.

~~~js
gantt.i18n.setLocale("fr");    
~~~

dhtmlxgantt.js 파일에 포함된 [미리 정의된 로케일](#predefinedlocales) 중 하나를 사용할 수도 있고, 직접 커스텀 로케일을 만들 수도 있습니다.

:::note
로케일은 실시간으로 변경할 수 있지만, 변경 사항은 **gantt.render()** 또는 **gantt.init()**을 사용하여 Gantt 차트를 완전히 다시 그린 후에만 적용됩니다.
:::

~~~js
    gantt.i18n.setLocale("fr");
    gantt.init("gantt_here");
~~~


[Localization](https://docs.dhtmlx.com/gantt/samples/01_initialization/12_localization.html)


미리 정의된 로케일
-------------------

<table>
<tr><td>언어</td><td>언어 코드</td><td>번역 상태</td></tr>
<tr><td>아랍어</td><td>ar</td><td>부분</td></tr>
<tr><td>벨라루스어</td><td>be</td><td>전체</td></tr>
<tr><td>영어</td><td>en</td><td>전체</td></tr>
<tr><td>카탈루냐어</td><td>ca</td><td>부분</td></tr>
<tr><td>중국어</td><td>cn</td><td>부분</td></tr>
<tr><td>크로아티아어</td><td>hr</td><td>전체</td></tr>
<tr><td>체코어</td><td>cs</td><td>부분</td></tr>
<tr><td>덴마크어</td><td>da</td><td>부분</td></tr>
<tr><td>네덜란드어</td><td>nl</td><td>부분</td></tr>
<tr><td>핀란드어</td><td>fi</td><td>부분</td></tr>
<tr><td>프랑스어</td><td>fr</td><td>전체</td></tr>
<tr><td>독일어</td><td>de</td><td>전체</td></tr>
<tr><td>그리스어</td><td>el</td><td>부분</td></tr>
<tr><td>히브리어</td><td>he</td><td>부분</td></tr>
<tr><td>헝가리어</td><td>hu</td><td>부분</td></tr>
<tr><td>인도네시아어</td><td>id</td><td>부분</td></tr>
<tr><td>이탈리아어</td><td>it</td><td>부분</td></tr>
<tr><td>일본어</td><td>jp</td><td>부분</td></tr>
<tr><td>한국어</td><td>kr</td><td>부분</td></tr>
<tr><td>노르웨이어</td><td>no</td><td>부분</td></tr>
<tr><td>노르웨이어 보크몰</td><td>nb</td><td>부분</td></tr>
<tr><td>페르시아어</td><td>fa</td><td>전체</td></tr>
<tr><td>폴란드어</td><td>pl</td><td>부분</td></tr>
<tr><td>포르투갈어</td><td>pt</td><td>부분</td></tr>
<tr><td>루마니아어</td><td>ro</td><td>부분</td></tr>
<tr><td>러시아어</td><td>ru</td><td>전체</td></tr>
<tr><td>슬로바키아어</td><td>sk</td><td>부분</td></tr>
<tr><td>슬로베니아어</td><td>si</td><td>부분</td></tr>
<tr><td>스페인어</td><td>es</td><td>부분</td></tr>
<tr><td>스웨덴어</td><td>sv</td><td>부분</td></tr>
<tr><td>터키어</td><td>tr</td><td>부분</td></tr>
<tr><td>우크라이나어</td><td>ua</td><td>부분</td></tr>
</table>

커스텀 로케일 만들기 
-------------------------------

:::note
[gantt.i18n](api/other/i18n.md) 객체는 v7.0에서 도입되었습니다. 이전 버전에서는 [gantt.locale](api/other/locale.md) 객체를 사용했습니다. 자세한 내용은 [Migration article](migration.md#63---70)을 참고하세요.
:::

커스텀 로케일을 만드는 가장 간단한 방법은 아래 예시에서 기본 영어 로케일을 복사한 후, 모든 문자열을 원하는 언어로 번역하는 것입니다.

커스텀 로케일을 Gantt 차트에 적용하는 방법은 두 가지가 있습니다:

- **setLocale** 메서드에 커스텀 로케일 객체를 전달하여 현재 로케일을 덮어쓰기:

~~~js
gantt.i18n.setLocale(localeObject);    
~~~

부분적인 로케일 객체를 제공하면, gantt가 해당 레이블을 기존 로케일에 병합합니다:

~~~js
gantt.i18n.setLocale({
    labels: {
        new_task: "New task"
    }
});    
~~~

- 여러 개의 로케일을 전환해서 사용하려면, 커스텀 언어 코드를 가진 새 로케일을 정의하고 나중에 전환할 수 있습니다:

~~~js
gantt.i18n.addLocale("lang", localeObject);    
gantt.i18n.setLocale("lang");
~~~

**참고사항**

- 커스텀 로케일 파일을 **support@dhtmlx.com**으로 보내면, 향후 릴리즈에 포함될 수 있습니다.
- 현재 활성화된 로케일은 **gantt.locale** 객체를 통해 접근할 수 있습니다.
- **monthFull**은 1월부터 시작하는 전체 월 이름을 포함합니다.
- **monthShort**는 1월부터 시작하는 월의 약어를 포함합니다.
- **dayFull**은 일요일부터 시작하는 전체 요일 이름을 포함합니다.
- **dayShort**는 일요일부터 시작하는 요일의 약어를 포함합니다.

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

- **confirm_closing** 또는 **confirm_deleting** 레이블이 없으면, 해당 확인 대화상자가 나타나지 않습니다(자동 확인).
- **section_(name)** 레이블은 동일한 이름을 가진 라이트박스 섹션에 대응합니다.
- **new_task** 레이블은 새 작업의 기본 텍스트를 설정합니다.

