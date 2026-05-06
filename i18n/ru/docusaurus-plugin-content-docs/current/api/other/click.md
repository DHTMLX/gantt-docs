---
sidebar_label: $click
title: Конфигурация $click
description: "переопределяет поведение клика по умолчанию для кнопок диаграммы Ганта"
---

# $click

### Описание

@short: Переопределяет поведение клика по умолчанию для кнопок диаграммы Ганта

@signature: $click: any

### Пример

~~~jsx
gantt.config.quickinfo_icons=["icon_delete","icon_edit","advanced_details_button"]; 
gantt.locale.labels["advanced_details_button"] = "Advanced Info";
gantt.init("gantt_here");

gantt.$click.advanced_details_button=function(e, id, trg){
    gantt.message("These are advanced details"); 
    return false; //blocks the default behavior
};
~~~

### Details

:::note
Поведение кнопки будет переопределено как для lightbox, так и для quick info popup.
:::

Объект $click диаграммы Ганта по умолчанию:

~~~js
{
    buttons: {
        delete: function (id){...},
        edit: function (id){...},
    }
}
~~~