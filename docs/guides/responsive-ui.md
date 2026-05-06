---
title: "Making Gantt Responsive"
sidebar_label: "Making Gantt Responsive"
---

# Making Gantt Responsive

Working with Gantt on smartphones can be uncomfortable due to their small screens that don't allow displaying all the data at once. However, Gantt can be configured to adapt its layout to different screen sizes, making it usable on both desktop and mobile devices.

If you specify Gantt sizes in percent values (for example, `width: 100%; height: 100%`), it will adjust to the available container size. However, by default, each grid column has a minimum width defined by the [`min_column_width`](api/config/min_column_width.md) and [`min_grid_column_width`](api/config/min_grid_column_width.md) parameters. If the container becomes smaller than the total minimum column width, the grid stops shrinking. This may give the impression that Gantt is not responsive. The following sections describe the ways to address this and make Gantt truly responsive.

### Adjusting minimum column width

One approach is to decrease the values of [`min_column_width`](api/config/min_column_width.md) and [`min_grid_column_width`](api/config/min_grid_column_width.md). This allows Gantt to shrink further as the container gets smaller, providing a responsive-like behavior:

~~~jsx
gantt.config.min_column_width = 30;
gantt.config.min_grid_column_width = 30;
~~~

**Related sample** [Gantt. Responsive container](https://snippet.dhtmlx.com/kjibqqbb)

### Adjusting the layout for small screens

Another approach is to switch the Gantt layout based on the available width. When there is enough space, the full layout with both the grid and the timeline is displayed. On narrow screens, either the grid or the timeline is shown instead to make better use of the limited space.

This can be implemented using the [`onGanttRender`](api/event/onganttrender.md) event. The event handler checks the width of the Gantt container, the current [layout](api/config/layout.md) configuration and updates Gantt layout accordingly.

**Related sample** [Gantt. Responsive layout: dynamically hide/show the grid depending on the screen width](https://snippet.dhtmlx.com/w4nwk5wf)