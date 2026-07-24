---
title: "缩放"
sidebar_label: "缩放"
---

# 缩放

dhtmlxGantt 提供一个内置模块，用于便捷地管理时间刻度的缩放。如果你想自定义默认的缩放行为，可以使用 [灵活的 API](guides/zoom.md)，它允许你实现以动态方式更改时间刻度设置的能力。

## 内置缩放模块 {#neizhisuofangmokuai}

内嵌的 [zooming module](guides/zoom.md) 在 `gantt.ext.zoom` 扩展中声明。要启用该模块，你需要调用 `gantt.ext.zoom.init(zoomConfig)`，并传入一个包含缩放级别数组的 `zoomConfig` 对象。举例：

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
有关缩放模块及其 API 的详细信息，请参见文章 [Zoom Extension](guides/zoom.md)。
:::

**相关示例**： [Mouse wheel zoom](https://docs.dhtmlx.com/gantt/samples/03_scales/14_scale_zoom_by_wheelmouse.html)

### 默认缩放级别 {#default-zoom-levels}

如果在没有设置 `levels` 的情况下调用 `gantt.ext.zoom.init()`，扩展将使用一组可直接使用的命名级别 - **"hour"**、**"day"**、**"week"**、**"month"**、以及 **"year"**。这使你可以通过一次调用启用缩放，并按名称切换刻度：

~~~js
gantt.ext.zoom.init();

gantt.ext.zoom.setLevel("week");
~~~

在需要自定义刻度或标签时，请提供 `levels` 数组。

## 缩放以适应 {#zoom-to-fit}

Zoom 扩展可以自动选择最详细的缩放级别，使所有任务都能在时间线宽度内显示，没有水平滚动。请调用 [`gantt.ext.zoom.zoomToFit()`](guides/zoom.md#methods)，若要返回到之前的缩放，请调用 [`gantt.ext.zoom.resetZoom()`](guides/zoom.md#methods)：

~~~js
gantt.ext.zoom.init();

// 将所有已加载的任务适配到可见的时间线
gantt.ext.zoom.zoomToFit();

// 还原到首次 zoomToFit() 调用之前处于活动状态的刻度
gantt.ext.zoom.resetZoom();
~~~

`zoomToFit()` 在应用了合适的缩放级别时返回 `true`，否则返回 `false`（例如空图表）。

默认情况下 `zoomToFit()` 适配 **所有已加载的任务**。你可以通过 `init()` 的 `fit` 设置，或通过传给 `zoomToFit()` 的选项，来改变被适配的对象，甚至重新定义选择逻辑：

~~~js
gantt.ext.zoom.init({
    levels: [ /* interactive zoom levels */ ],
    fit: {
        scope: "all", // "all" (default) 适配每个已加载的任务，"visible" - 仅展开的行
        levels: [ /* optional, a set of scales used only for fitting */ ],
        handler: (context) => {
            // context: { range, viewportWidth, levels, padding, defaultLevel }
            return context.defaultLevel; // 返回一个级别名称/索引，或 false 以中止
        }
    }
});

// 每次调用的选项覆盖 init() 的默认值
gantt.ext.zoom.zoomToFit({ scope: "visible" });               // 仅适配展开的行
gantt.ext.zoom.zoomToFit({ taskId: 5 });                      // 适配一个任务及其子树
gantt.ext.zoom.zoomToFit({ range: { start_date, end_date } });// 适配一个明确的日期范围
~~~

完整的选项列表请参见 [Zoom Extension](guides/zoom.md#zoom-to-fit) 文章。

**相关示例**： [Zoom to fit](https://docs.dhtmlx.com/gantt/samples/03_scales/13_zoom_to_fit.html)

## 自定义缩放设置

如果你不想使用缩放模块、而更倾向于手动控制刻度设置，则可通过相应的配置选项来实现。

事实上，实现缩放功能意味着定义时间刻度配置的若干预设（缩放级别），并为用户提供在它们之间切换的能力。

要配置时间刻度，需要以下设置：

- [`gantt.config.scales`](api/config/scales.md) - 允许设置任意数量的时间刻度行
- [`gantt.config.min_column_width`](api/config/min_column_width.md), [`gantt.config.scale_height`](api/config/scale_height.md) - 时间刻度列宽和时间刻度的总体高度

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

所述函数可以通过从 "day" 到 "year" 时间刻度的四个预定义配置之一来配置 gantt 对象。
Gantt 将需要一次完整的重绘才能显示配置的更改：

~~~js
setScaleConfig("year");
gantt.init("gantt_here");
~~~

然后你可以实现一个 UI，让用户切换缩放级别：

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

**相关示例**： [Dynamic scales](https://docs.dhtmlx.com/gantt/samples/03_scales/05_dynamic_scales.html)