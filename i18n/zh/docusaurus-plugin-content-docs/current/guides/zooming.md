--- 
title: "缩放"
sidebar_label: "缩放"
---

# 缩放

dhtmlxGantt 提供一个内置模块，方便管理时间刻度的缩放。如果你想自定义默认的缩放行为，可以使用 [灵活的 API](guides/zoom.md)，它允许你实现动态更改时间刻度设置的能力。

## 内置缩放模块

嵌入的 [zooming module](guides/zoom.md) 在 `gantt.ext.zoom` 扩展中声明。要启用此模块，你需要调用 `gantt.ext.zoom.init(zoomConfig)`，并传入一个包含缩放层级数组的配置对象 `zoomConfig`。例如：

~~~js
const zoomConfig = {
    levels: [
        {
            name: "day",
            scale_height: 27,
            min_column_width: 80,
            scales: [
                { unit: "day", step: 1, format: "%d %M" }
            ]
        },
        {
            name: "week",
            scale_height: 50,
            min_column_width: 50,
            scales: [
                {
                    unit: "week",
                    step: 1,
                    format: (date) => {
                        const formatDate = gantt.date.date_to_str("%d %M");
                        const endDate = gantt.date.add(date, 6, "day");
                        const weekNumber = gantt.date.date_to_str("%W")(date);
                        return `#${weekNumber}, ${formatDate(date)} - ${formatDate(endDate)}`;
                    }
                },
                { unit: "day", step: 1, format: "%j %D" }
            ]
        },
        {
            name: "month",
            scale_height: 50,
            min_column_width: 120,
            scales: [
                { unit: "month", format: "%F, %Y" },
                { unit: "week", format: "Week #%W" }
            ]
        },
        {
            name: "quarter",
            height: 50,
            min_column_width: 90,
            scales: [
                { unit: "month", step: 1, format: "%M" },
                {
                    unit: "quarter",
                    step: 1,
                    format: (date) => {
                        const formatDate = gantt.date.date_to_str("%M");
                        const endDate = gantt.date.add(gantt.date.add(date, 3, "month"), -1, "day");
                        return `${formatDate(date)} - ${formatDate(endDate)}`;
                    }
                }
            ]
        },
        {
            name: "year",
            scale_height: 50,
            min_column_width: 30,
            scales: [
                { unit: "year", step: 1, format: "%Y" }
            ]
        }
    ]
};

gantt.ext.zoom.init(zoomConfig);
~~~

:::note
关于缩放模块及其 API 的详细信息，请参阅文章 [Zoom Extension](guides/zoom.md)。
:::

**相关示例**: [鼠标滚轮缩放](https://docs.dhtmlx.com/gantt/samples/03_scales/14_scale_zoom_by_wheelmouse.html)

## 自定义缩放设置

如果你不想使用缩放模块、而更愿意手动控制刻度设置，可以通过相应的配置选项实现。

事实上，实现缩放功能意味着定义若干时间刻度配置的预设（缩放级别），并为用户提供在它们之间切换的能力。

你将需要以下设置来配置时间刻度：

- [`gantt.config.scales`](api/config/scales.md) - 允许设置任意数量的时间刻度行
- [`gantt.config.min_column_width`](api/config/min_column_width.md), [`gantt.config.scale_height`](api/config/scale_height.md) - 刻度列宽和时间刻度的整体高度

让我们考虑以下预设：

~~~js
/* global gantt */
const setScaleConfig = (level) => {
    switch (level) {
        case "day":
            gantt.config.scales = [
                { unit: "day", step: 1, format: "%d %M" }
            ];
            gantt.config.scale_height = 27;
            break;
        case "week": {
            const formatWeekScale = (date) => {
                const formatDate = gantt.date.date_to_str("%d %M");
                const endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
                return `${formatDate(date)} - ${formatDate(endDate)}`;
            };

            gantt.config.scales = [
                { unit: "week", step: 1, format: formatWeekScale },
                { unit: "day", step: 1, format: "%D" }
            ];
            gantt.config.scale_height = 50;
            break;
        }
        case "month":
            gantt.config.scales = [
                { unit: "month", step: 1, format: "%F, %Y" },
                { unit: "day", step: 1, format: "%j, %D" }
            ];
            gantt.config.scale_height = 50;
            break;
        case "year":
            gantt.config.scales = [
                { unit: "year", step: 1, format: "%Y" },
                { unit: "month", step: 1, format: "%M" }
            ];
            gantt.config.scale_height = 90;
            break;
    }
};
~~~

上述函数可以通过四个预定义配置中的一个来配置 gantt 对象，从 "day" 到 "year" 时间刻度。Gantt 将需要重新绘制以显示配置的更改：

~~~js
setScaleConfig("year");
gantt.init("gantt_here");
~~~

然后你可以实现一个 UI 让用户切换缩放级别：

~~~html
<label><input type="radio" name="scale" value="day" checked/>日刻度</label>
<label><input type="radio" name="scale" value="week"/>周刻度</label>
<label><input type="radio" name="scale" value="month"/>月刻度</label>
<label><input type="radio" name="scale" value="year"/>年刻度</label>
~~~

~~~js
const scaleInputs = document.querySelectorAll("input[name='scale']");

scaleInputs.forEach((input) => {
    input.onclick = (event) => {
        const selectedScale = event.target.value;
        setScaleConfig(selectedScale);
        gantt.render();
    };
});
~~~

**相关示例**: [动态刻度](https://docs.dhtmlx.com/gantt/samples/03_scales/05_dynamic_scales.html)