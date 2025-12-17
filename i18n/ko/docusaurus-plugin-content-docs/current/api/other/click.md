---
sidebar_label: $click
title: $click config
description: "간트 차트의 버튼 기본 클릭 동작을 변경합니다."
---

# $click

### Description

@short: 간트 차트의 버튼 기본 클릭 동작을 변경합니다.

@signature: $click: any

### Example

~~~jsx
gantt.config.quickinfo_icons=["icon_delete","icon_edit","advanced_details_button"]; 
gantt.locale.labels["advanced_details_button"] = "Advanced Info";
gantt.init("gantt_here");

gantt.$click.advanced_details_button=function(e, id, trg){
    gantt.message("These are advanced details"); 
    return false; //기본 동작을 방지합니다.
};
~~~

### Details

:::note
버튼의 동작은 라이트박스와 퀵인포 팝업 모두에 적용됩니다. 
:::

표준 간트 차트에서 $click 객체는 다음과 같습니다:

~~~js
{
    buttons: {
        delete: function (id){...},
        edit: function (id){...},
    }
}
~~~
