---
title: "지역화"
sidebar_label: "지역화"
---

# 지역화

지역화를 통해 Gantt 차트 인터페이스를 원하는 언어로 표시할 수 있습니다: 영어, 스페인어, 프랑스어 등.
기본적으로 dhtmlxGantt는 [영어 로케일](api/other/locale.md)을 사용합니다.

![gantt_localized](/img/gantt_localized.png)

## 로케일 활성화 {#activating-a-locale}

비영어권 언어로 Gantt 차트를 구현하려면 필요한 로케일을 [gantt.i18n](api/other/i18n.md) 객체의 **setLocale** 메서드를 통해 활성화해야 합니다.

~~~js
gantt.i18n.setLocale("fr");    
~~~

dhtmlxGantt.js 파일에 번들로 제공되는 50개가 넘는 [predefined locales](#predefinedlocales)를 사용하고 업데이트하거나, 사용자 정의 로케일을 정의할 수 있습니다.

:::note
로케일은 동적으로 전환할 수 있지만, 변경 내용은 Gantt 차트를 전체적으로 다시 그린 후에야 적용됩니다. **gantt.render()** 또는 **gantt.init()** 호출로 적용됩니다.
:::

~~~js
gantt.i18n.setLocale("fr");
gantt.init("gantt_here");
~~~

**관련 샘플**: [지역화](https://docs.dhtmlx.com/gantt/samples/01_initialization/12_localization.html)


## 미리 정의된 로케일 {#predefinedlocales}

:::note
번들에 포함된 로케일 세트가 크게 확장되었고 번역이 **v10.0**에서 재작업되었으므로, 모든 미리 정의된 로케일은 이제 전체 레이블 세트를 제공합니다.
:::

<table>
<tr><td>Language</td><td>Language code</td><td>Translation status</td></tr>
<tr><td>아프리칸스어</td><td>af</td><td>full</td></tr>
<tr><td>알바니아어</td><td>sq</td><td>full</td></tr>
<tr><td>아랍어</td><td>ar</td><td>full</td></tr>
<tr><td>벨라루스어</td><td>be</td><td>full</td></tr>
<tr><td>보스니아어</td><td>bs</td><td>full</td></tr>
<tr><td>불가리아어</td><td>bg</td><td>full</td></tr>
<tr><td>카탈루냐어</td><td>ca</td><td>full</td></tr>
<tr><td>중국어(간체)</td><td>cn</td><td>full</td></tr>
<tr><td>중국어(홍콩)</td><td>zh_hk</td><td>full</td></tr>
<tr><td>중국어(대만)</td><td>zh_tw</td><td>full</td></tr>
<tr><td>크로아티아어</td><td>hr</td><td>full</td></tr>
<tr><td>체코어</td><td>cs</td><td>full</td></tr>
<tr><td>덴마크어</td><td>da</td><td>full</td></tr>
<tr><td>네덜란드어</td><td>nl</td><td>full</td></tr>
<tr><td>네덜란드어(벨기에)</td><td>nl_be</td><td>full</td></tr>
<tr><td>영어</td><td>en</td><td>full</td></tr>
<tr><td>에스토니아어</td><td>et</td><td>full</td></tr>
<tr><td>핀란드어</td><td>fi</td><td>full</td></tr>
<tr><td>프랑스어(프랑스)</td><td>fr</td><td>full</td></tr>
<tr><td>프랑스어(캐나다)</td><td>fr_ca</td><td>full</td></tr>
<tr><td>독일어(독일)</td><td>de</td><td>full</td></tr>
<tr><td>독일어(오스트리아)</td><td>de_at</td><td>full</td></tr>
<tr><td>그리스어</td><td>el</td><td>full</td></tr>
<tr><td>히브리어</td><td>he</td><td>full</td></tr>
<tr><td>헝가리어</td><td>hu</td><td>full</td></tr>
<tr><td>인도네시아어</td><td>id</td><td>full</td></tr>
<tr><td>아일랜드어</td><td>ga</td><td>full</td></tr>
<tr><td>이탈리아어</td><td>it</td><td>full</td></tr>
<tr><td>일본어</td><td>jp</td><td>full</td></tr>
<tr><td>한국어</td><td>kr</td><td>full</td></tr>
<tr><td>라트비아어</td><td>lv</td><td>full</td></tr>
<tr><td>리투아니아어</td><td>lt</td><td>full</td></tr>
<tr><td>마케도니아어</td><td>mk</td><td>full</td></tr>
<tr><td>말레이어</td><td>ms</td><td>full</td></tr>
<tr><td>노르웨이어(Bokmål)</td><td>nb</td><td>full</td></tr>
<tr><td>노르웨이어(Nynorsk)</td><td>no</td><td>full</td></tr>
<tr><td>페르시아어</td><td>fa</td><td>full</td></tr>
<tr><td>폴란드어</td><td>pl</td><td>full</td></tr>
<tr><td>포르투갈어(포르투갈)</td><td>pt</td><td>full</td></tr>
<tr><td>포르투갈어(브라질)</td><td>pt_br</td><td>full</td></tr>
<tr><td>루마니아어</td><td>ro</td><td>full</td></tr>
<tr><td>러시아어</td><td>ru</td><td>full</td></tr>
<tr><td>슬로바키아어</td><td>sk</td><td>full</td></tr>
<tr><td>슬로베니아어</td><td>si</td><td>full</td></tr>
<tr><td>스페인어(스페인)</td><td>es</td><td>full</td></tr>
<tr><td>스페인어(멕시코)</td><td>es_mx</td><td>full</td></tr>
<tr><td>스웨덴어</td><td>sv</td><td>full</td></tr>
<tr><td>태국어</td><td>th</td><td>full</td></tr>
<tr><td>터키어</td><td>tr</td><td>full</td></tr>
<tr><td>우크라이나어</td><td>ua</td><td>full</td></tr>
<tr><td>베트남어</td><td>vi</td><td>full</td></tr>
</table>

## 커스텀 로케일 만들기

:::note
[gantt.i18n](api/other/i18n.md) 객체는 v7.0에서 추가되었습니다. 이전 버전에서는 [gantt.locale](api/other/locale.md) 객체가 사용되었습니다. 자세한 내용은 마이그레이션 문서를 참조하십시오.
:::

가장 쉽게 커스텀 로케일을 만드는 방법은 아래 샘플의 기본(영어) 로케일을 복사하고 필요한 언어로 모든 문자열을 번역하는 것입니다.

커스텀 로케일은 Gantt 차트에 두 가지 방법으로 적용할 수 있습니다:

- 현재 로케일을 오버라이드하려면 로케일 객체를 매개변수로 전달하여 **setLocale** 메서드를 통해 설정합니다:

~~~js
gantt.i18n.setLocale(localeObject);    
~~~

참고: 부분 로케일 객체를 제공하면 gantt는 현재 로케일에 레이블을 추가합니다:

~~~js
gantt.i18n.setLocale({
    labels: {
        new_task: "New task"
    }
});    
~~~

- 또는 여러 로케일 간 전환이 필요한 경우, 커스텀 언어 코드로 로케일을 정의하고 나중에 gantt를 해당 로케일로 전환합니다:

~~~js
gantt.i18n.addLocale("lang", localeObject);    
gantt.i18n.setLocale("lang");
~~~

**참고**, 

- 커스텀 로케일 파일을 **support@dhtmlx.com**으로 보내주시면 차기 릴리스에 포함되도록 하겠습니다.
- 현재 활성화된 로케일은 또한 **gantt.locale** 객체에서 확인할 수 있습니다.
- **month_full** - 1월부터 시작하는 월의 전체 이름;
- **month_short** - 1월부터 시작하는 월의 짧은 이름;
- **day_full** - 일요일부터 시작하는 주의 전체 요일 이름;
- **day_short** - 일요일부터 시작하는 주의 짧은 요일 이름.

~~~js title="영어 로케일 정의"
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

- **confirm_closing** 또는 **confirm_deleting** 레이블이 정의되지 않은 경우 관련 확인 대화 상자가 전혀 표시되지 않습니다(자동 확인).
- **section_(name)** 레이블은 관련 이름의 라이트박스 섹션을 참조합니다.
- **new_task** 레이블은 새 이벤트의 기본 텍스트를 정의합니다.