---
title: "Масштабирование"
sidebar_label: "Масштабирование"
---

# Масштабирование

dhtmlxGantt предоставляет встроенный модуль для удобного управления масштабированием временной шкалы. Если вы хотите настроить поведение по умолчанию, существует [гибкий API](guides/zoom.md), который позволяет реализовать возможность динамически изменять настройки временной шкалы.

## Встроенный модуль зумирования {#built-in-zooming-module}

Встроенный [модуль зумирования](guides/zoom.md) объявлен в расширении `gantt.ext.zoom`. Чтобы включить модуль, нужно вызвать `gantt.ext.zoom.init(zoomConfig)` и передать
объект `zoomConfig` с конфигурационными настройками, который содержит массив уровней зумирования. Например:

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
Подробная информация о модуле зумирования и его API приведена в статье [Zoom Extension](guides/zoom.md).
:::

**Связанный пример**: [Зумирование колесиком мыши](https://docs.dhtmlx.com/gantt/samples/03_scales/14_scale_zoom_by_wheelmouse.html)

### Уровни зумирования по умолчанию {#default-zoom-levels}

Если вызвать `gantt.ext.zoom.init()` без настройки `levels`, расширение использует набор готовых именованных уровней — **"hour"**, **"day"**, **"week"**, **"month"**, и **"year"**. Это позволяет включить зумирование одним вызовом и переключать масштаб по имени:

~~~js
gantt.ext.zoom.init();

gantt.ext.zoom.setLevel("week");
~~~



Укажите массив `levels` тогда, когда нужны настраиваемые шкалы или подписи.

## Подгонка под видимую область

Расширение Zoom может автоматически выбрать наиболее детальный уровень зумирования, на котором все задачи вмещаются в ширину временной шкалы без горизонтальной прокрутки. Вызовите [`gantt.ext.zoom.zoomToFit()`](guides/zoom.md#methods) и, когда захотите вернуться к предыдущему масштабу, [`gantt.ext.zoom.resetZoom()`](guides/zoom.md#methods):

~~~js
gantt.ext.zoom.init();

// подгоняем все загруженные задачи под видимую временную шкалу
gantt.ext.zoom.zoomToFit();

// восстанавливаем масштаб, активный перед первым вызовом zoomToFit()
gantt.ext.zoom.resetZoom();
~~~



`zoomToFit()` возвращает `true`, когда был применён подходящий уровень, и `false` в противном случае (например, для пустой диаграммы).

По умолчанию `zoomToFit()` подгоняет **все загруженные задачи**. Вы можете изменить подгоняемое и даже переопределить логику отбора через настройку `fit` в `init()`, или через параметры, переданные в `zoomToFit()`:

~~~js
gantt.ext.zoom.init({
    levels: [ /* интерактивные уровни зума */ ],
    fit: {
        scope: "all", // "all" (по умолчанию) подгоняет каждую загруженную задачу, "visible" - только развернутые строки
        levels: [ /* необязательно, набор шкал, используемых только для подгонки */ ],
        handler: (context) => {
            // context: { range, viewportWidth, levels, padding, defaultLevel }
            return context.defaultLevel; // вернуть имя/индекс уровня, или false для прерывания
        }
    }
});

// параметры вызова per-call переопределяют значения по умолчанию init()
gantt.ext.zoom.zoomToFit({ scope: "visible" });               // подгонять только развернутые строки
gantt.ext.zoom.zoomToFit({ taskId: 5 });                      // подогнать задачу и её дерево
gantt.ext.zoom.zoomToFit({ range: { start_date, end_date } });// подогнать явный диапазон дат
~~~

Полный список настроек приведён в статье [Zoom Extension](guides/zoom.md#zoom-to-fit).

**Связанный пример**: [Зумирование до подгонки](https://docs.dhtmlx.com/gantt/samples/03_scales/13_zoom_to_fit.html)

## Настройки пользовательского зумирования

Если вы не хотите использовать модуль зумирования и предпочитаете вручную управлять настройками шкалы, можно сделать это через соответствующие параметры конфигурации.

Фактически реализация функции зумирования означает создание нескольких предустановок конфигурации временной шкалы (уровни зума) и предоставление пользователю возможности переключаться между ними.

Вам понадобятся следующие настройки для конфигурации временной шкалы:

- [`gantt.config.scales`](api/config/scales.md) - позволяет задать любое количество строк временной шкалы
- [`gantt.config.min_column_width`](api/config/min_column_width.md), [`gantt.config.scale_height`](api/config/scale_height.md) - ширина столбца шкалы и общая высота временной шкалы

Рассмотрим следующие предустановки:

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

Описанная функция может конфигурировать объект Gantt одной из четырех готовых конфигураций, от временной шкалы «day» до «year».
Gantt потребует полной перерисовки, чтобы отобразить изменение конфигурации:

~~~js
setScaleConfig("year");
gantt.init("gantt_here");
~~~

Затем можно реализовать пользовательский интерфейс для переключения уровня зума:

~~~html
<label><input type="radio" name="scale" value="day" checked/>Дневная шкала</label>
<label><input type="radio" name="scale" value="week"/>Недельная шкала</label>
<label><input type="radio" name="scale" value="month"/>Месячная шкала</label>
<label><input type="radio" name="scale" value="year"/>Годовая шкала</label>
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

**Связанный пример**: [Динамические шкалы](https://docs.dhtmlx.com/gantt/samples/03_scales/05_dynamic_scales.html)