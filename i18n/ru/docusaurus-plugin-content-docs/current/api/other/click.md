---
sidebar_label: $click
title: $click config
description: "изменяет действия по умолчанию при клике на кнопки в диаграмме Ганта"
---

# $click

### Description

@short: Изменяет действия по умолчанию при клике на кнопки в диаграмме Ганта

@signature: $click: any

### Example

~~~jsx
gantt.config.quickinfo_icons=["icon_delete","icon_edit","advanced_details_button"]; 
gantt.locale.labels["advanced_details_button"] = "Advanced Info";
gantt.init("gantt_here");

gantt.$click.advanced_details_button=function(e, id, trg){
    gantt.message("These are advanced details"); 
    return false; // предотвращает стандартное поведение
};
~~~

### Details

:::note
 Поведение кнопки будет обновлено как для lightbox, так и для всплывающей подсказки quick info. 
:::

Объект $click в стандартной диаграмме Ганта выглядит так:

~~~js
{
    buttons: {
        delete: function (id){...},
        edit: function (id){...},
    }
}
~~~
