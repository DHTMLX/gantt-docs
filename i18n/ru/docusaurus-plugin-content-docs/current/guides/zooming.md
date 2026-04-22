---
title: "Масштабирование"
sidebar_label: "Масштабирование"
---

# Масштабирование

dhtmlxGantt предоставляет встроенный модуль для удобного управления зумированием шкалы времени. Если вы хотите настроить поведение зумирования по умолчанию, существует [гибкий API](guides/zoom.md), который позволяет реализовать возможность динамического изменения настроек шкалы времени.

## Встроенный модуль зумирования

Встроенный [модуль зумирования](guides/zoom.md) объявлен в расширении `gantt.ext.zoom`. Чтобы включить модуль, вызовите `gantt.ext.zoom.init(zoomConfig)` и передайте объект `zoomConfig` с настройками конфигурации, который содержит массив уровней зумирования. Например:

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
Подробная информация о модуле зумирования и его API приводится в статье [Zoom Extension](guides/zoom.md).
:::

**Связанный пример**: [Зумирование колесом мыши](https://docs.dhtmlx.com/gantt/samples/03_scales/14_scale_zoom_by_wheelmouse.html)

## Пользовательские настройки зумирования

Если вы не хотите использовать модуль зумирования и предпочитаете управлять настройками масштаба вручную, вы можете сделать это через соответствующие параметры конфигурации.

Фактически реализация функции зумирования означает определение нескольких предустановок конфигурации шкалы времени (уровни зумирования) и предоставление пользователю возможности переключаться между ними.

Вам понадобятся следующие настройки для конфигурации шкалы времени:

- [`gantt.config.scales`](api/config/scales.md) - позволяет задать любое количество строк шкалы времени
- [`gantt.config.min_column_width`](api/config/min_column_width.md), [`gantt.config.scale_height`](api/config/scale_height.md) - ширину столбца шкалы и общую высоту шкалы времени

Рассмотрим следующие пресеты:

~~~js
/* глобальный gantt */
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

Описанная функция может сконфигурировать объект Gantt одним из четырех предопределенных конфигураций, от дневной до годовой шкалы времени.
Gantt потребует полной перерисовки, чтобы отобразить изменение конфигурации:

~~~js
setScaleConfig("year");
gantt.init("gantt_here");
~~~ 

Затем можно реализовать пользовательский интерфейс для переключения уровня зумирования:

~~~html
<label><input type="radio" name="scale" value="day" checked/>Дневной масштаб</label>
<label><input type="radio" name="scale" value="week"/>Масштаб недели</label>
<label><input type="radio" name="scale" value="month"/>Масштаб месяца</label>
<label><input type="radio" name="scale" value="year"/>Масштаб года</label>
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

**Связанный пример**: [Динамические масштабы](https://docs.dhtmlx.com/gantt/samples/03_scales/05_dynamic_scales.html)