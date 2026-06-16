---
title: "Zoom 扩展"
sidebar_label: "Zoom 扩展"
---

# Zoom 扩展

你可以在 [Zooming](guides/zooming.md) 文章中阅读关于 Zoom 扩展的详细信息。本文提供 `zoom` 对象的 API 参考：

## 缩放级别

Zoom 扩展使用一组缩放设置，并允许在它们之间快速切换。

`ZoomLevel` 是一个包含缩放设置的对象。它具有以下属性：

- <span class="subproperty">**name**</span> - (*string*) - 该级别的名称
- <span class="subproperty">**scale_height?**</span> - (*number*) - 该缩放的高度
- <span class="subproperty">**height?**</span> - (*number*) - 该缩放的高度
- <span class="subproperty">**min_column_width?**</span> - (*number*) - 列的最小宽度。它的优先级高于 minColumnWidth 和 maxColumnWidth
- <span class="subproperty">**scales**</span> - (*Scales*) - 在此级别放大/缩小时要切换的缩放数组


## 方法

- <span class="submethod">**init(zoomConfig): void**</span> - 使用提供的配置初始化扩展。
    - **_zoomConfig?_** - (*object*) - 包含 *levels* 缩放级别数组及若干附加属性的配置对象：
        - **_levels?_** - (*ZoomLevel[]*) - 一个缩放级别的数组。可选——省略时，将使用一组 [默认命名级别](guides/zooming.md#default-zoom-levels)（"hour"、"day"、"week"、"month"、"year"）
        - **_handler?_** - (*Function*): void - 允许指定一个自定义的鼠标滚轮处理程序，以手动进行缩放
            - **_e_** - (*Event*) - 原生事件对象。
        - **_startDate?_** - (*Date*) - 时间刻度缩放的起始值
        - **_endDate?_** - (*Date*) - 时间刻度缩放的结束值
        - **_activeLevelIndex?_** - (*number*) - 默认活动级别的编号
        - **_widthStep?_** - (*number*) - 切换到下一个/上一个缩放级别时，缩放宽度的增量
        - **_minColumnWidth?_** - (*number*) - 允许切换到前一个缩放级别的列的最小宽度
        - **_maxColumnWidth?_** - (*number*) - 允许切换到下一个缩放级别的列的最大宽度
        - **_useKey?_** - (*string*) - 通过滚动鼠标滚轮启用缩放的按键："ctrlKey" | "altKey" | "shiftKey"
        - **_trigger?_** - (*string | null | undefined*) - 缩放的触发方式： "wheel" | null | undefined 
        - **_element?_** - (*HTMLElement | Function*): HTMLElement - 触发缩放的 DOM 元素，或返回 DOM 元素的函数
        - **_fit?_** - (*object*) - 默认的 [放大以适合视图](#zoom-to-fit) 设置。与下文列出的 `zoomToFit` 选项一起，它接受 *levels*（仅用于拟合的专用缩放集合）和 *handler*（覆盖级别选择的函数）

以下是设置 `zoom` 配置的两个示例：

~~~js
const zoomConfig = {
    levels: [
        {
            name: "day",
            scale_height: 27,
            min_column_width: 80,
            scales: [{ unit: "day", step: 1, format: "%d %M" }]
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
                        const dateToStr = gantt.date.date_to_str("%d %M");
                        const endDate = gantt.date.add(date, 6, "day");
                        const weekNumber = gantt.date.date_to_str("%W")(date);

                        return `#${weekNumber}, ${dateToStr(date)} - ${dateToStr(endDate)}`;
                    }
                },
                { unit: "day", step: 1, format: "%j %D" }
            ]
        },
        {
            name: "month",
            scale_height: 50,
            min_column_width: 120,
            scales: [{ unit: "month", format: "%F, %Y" }, { unit: "week", format: "Week #%W" }]
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
                        const dateToStr = gantt.date.date_to_str("%M");
                        const endDate = gantt.date.add(gantt.date.add(date, 3, "month"), -1, "day");

                        return `${dateToStr(date)} - ${dateToStr(endDate)}`;
                    }
                }
            ]
        },
        {
            name: "year",
            scale_height: 50,
            min_column_width: 30,
            scales: [{ unit: "year", step: 1, format: "%Y" }]
        }
    ]
};

gantt.ext.zoom.init(zoomConfig);


// 或者，用更简单的方式，levels 可以表现为缩放数组
const hourToStr = gantt.date.date_to_str("%H:%i");
const hourRangeFormat = (step) => {
    return (date) => {
        const intervalEnd = new Date(gantt.date.add(date, step, "hour") - 1);

        return `${hourToStr(date)} - ${hourToStr(intervalEnd)}`;
    };
};
const simpleZoomConfig = {
    levels: [
        [
            { unit: "month", format: "%M %Y", step: 1 }
        ],
        [
            { unit: "month", format: "%M %Y", step: 1 },
            { unit: "day", format: "%d %M", step: 1 }
        ],
        [
            { unit: "day", format: "%d %M", step: 1 },
            { unit: "hour", format: hourRangeFormat(12), step: 12 }
        ],
        [
            { unit: "day", format: "%d %M", step: 1 },
            { unit: "hour", format: hourRangeFormat(6), step: 6 }
        ],
        [
            { unit: "day", format: "%d %M", step: 1 },
            { unit: "hour", format: "%H:%i", step: 1 }
        ]
    ]
};

gantt.ext.zoom.init(simpleZoomConfig);
~~~

- <span class="submethod">**getCurrentLevel(): number**</span> - 返回当前缩放级别的编号（索引）

~~~js
gantt.ext.zoom.getCurrentLevel();
~~~

- <span class="submethod">**setLevel(level): void**</span> - 切换到指定的缩放级别。
    - **_level_** - (*number | string*) - 该级别可以通过字符串（配置中的级别名称，例如 "year"）或数组中的编号来定义

~~~js
gantt.ext.zoom.setLevel("year");
// 或 
gantt.ext.zoom.setLevel(5);
~~~

- <span class="submethod">**getLevels(): ZoomLevel[]**</span> - 允许获取所有缩放级别

~~~js
gantt.ext.zoom.getLevels();
~~~

返回传递给 `init()` 的缩放级别数组（*ZoomLevel[]*），用于初始化扩展。

- <span class="submethod">**zoomIn(): void**</span> - 增加当前缩放级别

~~~js
gantt.ext.zoom.zoomIn();
~~~

同样的目的也可以使用：

~~~js
gantt.ext.zoom.setLevel(gantt.ext.zoom.getCurrentLevel() - 1);
~~~

- <span class="submethod">**zoomOut(): void**</span> - 降低当前缩放级别

~~~js
gantt.ext.zoom.zoomOut();
~~~

同样的目的也可以使用：

~~~js
gantt.ext.zoom.setLevel(gantt.ext.zoom.getCurrentLevel() + 1);
~~~

- <span class="submethod">**zoomToFit(options?): boolean**</span> - 选择目标任务在时间轴宽度内尽量详细的缩放级别并应用它。有关选项的列表，请参阅 [缩放以适应](#zoom-to-fit)。该方法幂等，若应用了拟合级别则返回 true，否则返回 false。

~~~js
gantt.ext.zoom.zoomToFit();
// 或仅拟合当前可见的（展开的）行
gantt.ext.zoom.zoomToFit({ scope: "visible" });
~~~

- <span class="submethod">**resetZoom(): boolean**</span> - 恢复在首次 `zoomToFit()` 调用之前处于活动状态的缩放级别和时间刻度。若有已保存的缩放被恢复则返回 true，否则返回 false。

~~~js
gantt.ext.zoom.resetZoom();
~~~

- <span class="submethod">**attachEvent(name, handler): string**</span> - 绑定事件处理程序
    - **_name_** - (*string*) - 事件处理程序的名称
    - **_handler_** - (*Function*) - 当事件触发时将被调用的函数

- <span class="submethod">**detachEvent(id): void**</span> - 从事件中分离处理程序
    - **_id_** - (*string*) - 已绑定事件处理程序的 ID

- <span class="submethod">**callEvent(name, params): boolean**</span> - 调用内部事件
    - **_name_** - (*string*) - 事件的名称，大小写不敏感
    - **_params_** - (*Array&lt;any&gt;*) - 可选，事件相关数据的数组

- <span class="submethod">**checkEvent(name): boolean**</span> - 检查事件是否为其指定了某些处理程序
    - **_name_** - (*string*) - 事件的名称

返回 <i>true</i>，如果为该事件指定了某些处理程序。

## 放大以适应

[`zoomToFit(options)`](#methods) 和 [`init()`](#methods) 的 `fit` 设置接受以下选项：

- <span class="subproperty">**scope?**</span> - (*"all" | "visible"*) - 要拟合的任务范围：*"all"*（默认）拟合所有已加载的任务，包括处于折叠分支下的任务；*"visible"* 仅拟合当前展开的行
- <span class="subproperty">**taskId?**</span> - (*string | number*) - 拟合单个任务及其子树
- <span class="subproperty">**range?**</span> - (*object*) - 拟合具有 *start_date* 与 *end_date*（Date）的明确日期范围
- <span class="subproperty">**rangeMode?**</span> - (*"auto" | "preserve" | "target"*) - 是否将显示的 `start_date`/`end_date` 覆盖为拟合范围。*"target"* 始终设置拟合范围，*"preserve"* 保留当前边界，*"auto"*（默认）在设置了显式边界时保持它们，否则设置拟合范围
- <span class="subproperty">**padding?**</span> - (*number*) - 在第一个拟合日期之前和最后一个拟合日期之后添加的额外列数。默认值：1
- <span class="subproperty">**minLevel?**</span> - (*string | number*) - 允许 `zoomToFit` 选择的最详细缩放级别
- <span class="subproperty">**maxLevel?**</span> - (*string | number*) - 允许 `zoomToFit` 选择的最粗略缩放级别

当通过 `init()` 的 `fit` 属性设置时，配置还接受：

- <span class="subproperty">**levels?**</span> - (*ZoomLevel[]*) - 仅供 `zoomToFit` 考虑的专用缩放级别集合。省略时，使用交互式缩放级别
- <span class="subproperty">**handler?**</span> - (*Function*): string | number | boolean | void - 覆盖级别选择。它接收一个 *context* 对象，应返回要应用的级别名称/索引，返回 false 以中止拟合，或不返回任何内容以保留计算出的级别
    - **_context_** - (*object*) - 一个对象 `{ range, viewportWidth, levels, padding, defaultLevel }`，其中 *defaultLevel* 是内置算法选择的级别索引

直接传递给 `zoomToFit()` 的选项会覆盖通过 `init({ fit })` 设置的默认值。

~~~js
gantt.ext.zoom.init({
    fit: {
        scope: "all",
        // 仅用于拟合的一组专用缩放
        levels: [
            { name: "weeks", scale_height: 50, scales: [{ unit: "week", step: 1, format: "Week #%W" }] },
            { name: "months", scale_height: 50, scales: [{ unit: "month", step: 1, format: "%F, %Y" }] }
        ],
        handler: (context) => {
            // 返回一个级别名称/索引，false 表示中止，或不返回以保留默认
            return context.defaultLevel;
        }
    }
});

gantt.ext.zoom.zoomToFit();
~~~

**相关示例**： [Zoom to fit](https://docs.dhtmlx.com/gantt/samples/03_scales/13_zoom_to_fit.html)

## 事件

- **<span class="eventname">onAfterZoom</span>** - 在切换缩放级别时触发。
参数为：
<span class="eventarguments">
    - **_level_** - (*number | string*) - 该级别的编号
    - **_config_** - (*ZoomLevel*) - 该级别的配置
</span>

~~~js
gantt.ext.zoom.attachEvent("onAfterZoom", (level, config) => {
    document.querySelector(`.gantt_radio[value='${config.name}']`).checked = true;
});
~~~