--- 
title: "刻度设置的动态更改"
sidebar_label: "刻度设置的动态更改"
---

# 刻度设置的动态更改

在运行时动态更改刻度可以使甘特图更加灵活，能够满足用户的需求。

例如，某位经理有一个为期一年的项目。为了全面了解项目，最好让他以月为单位查看项目的进度。但要了解某个具体任务的细节时，按周或按日来排程会更合适。

应该选择哪一个单位呢？全部都用！并为用户提供自行选择要应用哪一个的可能。

## 配置设置

要在动态地更改刻度的设置（例如 step、sub-scale）在 dhtmlxGantt 初始化后，请使用以下方法：

1. 为相关配置选项设置新的值。

 *例如，要将刻度的 unit 从 "month" 改为 "day"，请使用 [scales](api/config/scales.md) 属性中的 **unit** 属性*。
2. 如有需要，重新定义相关模板。

 *例如，要在刻度中 [highlight weekends in the scale](guides/highlighting-time-slots.md)，请使用 [scale_cell_class](api/template/scale_cell_class.md) 模板*。
2. 使用 [render](api/method/render.md) 方法重新绘制甘特图。

**刻度配置的动态更改**
~~~js
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
];

gantt.init("gantt_here");


gantt.config.scales = [                            /*!*/
    {unit: "day", step: 1, format: "%d %M, %D"} /*!*/
];                                                /*!*/
gantt.templates.scale_cell_class = function(date){/*!*/
    if(date.getDay()==0||date.getDay()==6){/*!*/
        return "weekend";/*!*/
    }/*!*/
};/*!*/
gantt.render(); /*!*/
~~~