---
title: "Zooming"
sidebar_label: "Zooming"
---

# Zooming

dhtmlxGantt provides a built-in module for handy managing of time scale zooming. In case you want to customize the default zooming behaviour, there is a [flexible API](guides/zoom.md) that allows you to implement the ability to change the settings of time scale dynamically.

## Built-in zooming module

The embedded [zooming module](guides/zoom.md) is declared in the `gantt.ext.zoom` extension. To enable the module, you need to call `gantt.ext.zoom.init(zoomConfig)` and pass
a `zoomConfig` object with configuration settings that contains an array of zooming levels. For example:

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
The detailed information about the zooming module and its API is given in the article [Zoom Extension](guides/zoom.md).
:::

**Related sample**: [Mouse wheel zoom](https://docs.dhtmlx.com/gantt/samples/03_scales/14_scale_zoom_by_wheelmouse.html)

### Default zoom levels

If you call `gantt.ext.zoom.init()` without the `levels` setting, the extension uses a set of ready-to-use named levels - **"hour"**, **"day"**, **"week"**, **"month"**, and **"year"**. This lets you enable zooming with a single call and switch the scale by name:

~~~js
gantt.ext.zoom.init();

gantt.ext.zoom.setLevel("week");
~~~

Provide the `levels` array when you need custom scales or labels.

## Zoom to fit

The Zoom extension can automatically pick the most detailed zoom level at which all tasks fit into the timeline width without horizontal scrolling. Call [`gantt.ext.zoom.zoomToFit()`](guides/zoom.md#methods) and, when you want to return to the previous scale, [`gantt.ext.zoom.resetZoom()`](guides/zoom.md#methods):

~~~js
gantt.ext.zoom.init();

// fit all loaded tasks into the visible timeline
gantt.ext.zoom.zoomToFit();

// restore the scale that was active before the first zoomToFit() call
gantt.ext.zoom.resetZoom();
~~~

`zoomToFit()` returns `true` when a fitting level was applied, and `false` otherwise (for example, for an empty chart).

By default `zoomToFit()` fits **all loaded tasks**. You can change what gets fitted and even redefine the selection logic via the `fit` setting of `init()`, or via the options passed to `zoomToFit()`:

~~~js
gantt.ext.zoom.init({
    levels: [ /* interactive zoom levels */ ],
    fit: {
        scope: "all", // "all" (default) fits every loaded task, "visible" - only expanded rows
        levels: [ /* optional, a set of scales used only for fitting */ ],
        handler: (context) => {
            // context: { range, viewportWidth, levels, padding, defaultLevel }
            return context.defaultLevel; // return a level name/index, or false to abort
        }
    }
});

// per-call options override the init() defaults
gantt.ext.zoom.zoomToFit({ scope: "visible" });               // fit only the expanded rows
gantt.ext.zoom.zoomToFit({ taskId: 5 });                      // fit a task and its subtree
gantt.ext.zoom.zoomToFit({ range: { start_date, end_date } });// fit an explicit date range
~~~

The full list of options is given in the [Zoom Extension](guides/zoom.md#zoom-to-fit) article.

**Related sample**: [Zoom to fit](https://docs.dhtmlx.com/gantt/samples/03_scales/13_zoom_to_fit.html)

## Custom zooming settings

In case you don't want to use the zooming module and prefer controlling scale settings manually, you can do so via corresponding configuration options.

In fact, implementing a zooming feature means defining several presets of the time scale configuration (zoom levels) and providing the user with the ability to switch between them.

You'll need the following settings to configure the time scale:

- [`gantt.config.scales`](api/config/scales.md) - allows setting any number of time scale rows
- [`gantt.config.min_column_width`](api/config/min_column_width.md), [`gantt.config.scale_height`](api/config/scale_height.md) - the scale column width and the overall height of the time scale

Let's consider the following presets:

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

The described function can configure the gantt object by one of the four predefined configs, from the "day" to "year" time scale.
Gantt will require a complete repaint in order to display the change of configuration:

~~~js
setScaleConfig("year");
gantt.init("gantt_here");
~~~

Then you can implement a UI for the user to switch the zoom level:

~~~html
<label><input type="radio" name="scale" value="day" checked/>Day scale</label>
<label><input type="radio" name="scale" value="week"/>Week scale</label>
<label><input type="radio" name="scale" value="month"/>Month scale</label>
<label><input type="radio" name="scale" value="year"/>Year scale</label>
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

**Related sample**: [Dynamic scales](https://docs.dhtmlx.com/gantt/samples/03_scales/05_dynamic_scales.html)
