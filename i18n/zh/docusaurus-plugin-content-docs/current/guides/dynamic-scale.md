---
title: "动态更改刻度设置"
sidebar_label: "动态更改刻度设置"
---

# 动态更改刻度设置

动态调整刻度可以让 Gantt 图更具适应性，从而满足不同用户的需求。

例如，负责一年期项目的经理可能更喜欢按月份查看计划，以获得整体概览。然而，当聚焦于某项具体任务时，切换到按周或按天的刻度则能提供更详细的信息。

为什么只选择一种方式？最好是提供所有选项，让用户自行选择最适合他们的刻度视图。

## 配置设置

要在 dhtmlxGantt 初始化后动态更新刻度设置，请按照以下步骤操作:

1. 为相关配置选项赋予新值。

 *例如，要将刻度单位从 "month" 切换为 "day"，请更新 [scales](api/config/scales.md) 配置中的 **unit** 属性*。
2. 如有需要，更新相关模板。

 *例如，要[高亮显示刻度中的周末](guides/highlighting-time-slots.md)，请修改 [scale_cell_class](api/template/scale_cell_class.md) 模板*。
3. 使用 [render](api/method/render.md) 方法重绘 Gantt 图。

动态更改刻度配置
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

