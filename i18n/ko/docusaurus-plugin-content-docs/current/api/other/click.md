---
sidebar_label: $click
title: $click config
description: "간트 차트의 버튼에 대한 기본 클릭 동작을 재정의합니다"
---

# $click

### Description

@short: 간트 차트의 버튼에 대한 기본 클릭 동작을 재정의합니다

@signature: $click: any

### Example

~~~jsx
gantt.config.quickinfo_icons=["icon_delete","icon_edit","advanced_details_button"]; 
gantt.locale.labels["advanced_details_button"] = "Advanced Info";
gantt.init("gantt_here");

gantt.$click.advanced_details_button=function(e, id, trg){
    gantt.message("These are advanced details"); 
    return false; //기본 동작을 차단합니다
};
~~~

### Details

:::note
버튼의 동작은 라이트박스와 퀵 인포 팝업 모두에 대해 재정의됩니다.
:::

The $click object of the default Gantt chart is:

~~~js
{
    buttons: {
        delete: function (id){...},
        edit: function (id){...},
    }
}
~~~