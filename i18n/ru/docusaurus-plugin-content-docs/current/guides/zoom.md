---
title: "Расширение Zoom"
sidebar_label: "Расширение Zoom"
---

# Расширение Zoom

Вы можете ознакомиться с подробностями об расширении Zoom в статье [Zooming](guides/zooming.md). В текущей статье приведена API-справка по объекту `zoom`:

## Уровни масштабирования

Расширение Zoom использует набор настроек масштаба и позволяет быстро переключаться между ними.

`ZoomLevel` — это объект, который содержит настройки масштаба. Он имеет следующие свойства:

- <span class="subproperty">**name**</span> - (*string*) - имя уровня
- <span class="subproperty">**scale_height?**</span> - (*number*) - высота шкалы
- <span class="subproperty">**height?**</span> - (*number*) - высота шкалы
- <span class="subproperty">**min_column_width?**</span> - (*number*) - минимальная ширина столбца. Он имеет больший приоритет, чем minColumnWidth и maxColumnWidth
- <span class="subproperty">**scales**</span> - (*Scales*) - массив шкал, между которыми можно переключаться во время зума вверх/вниз на этом уровне


## Методы {#methods}

- <span class="submethod">**init(zoomConfig): void**</span> - инициализирует расширение с заданной конфигурацией.
    - **_zoomConfig?_** - (*object*) - объект конфигурации, который содержит массив *levels* зум-уровней и ряд дополнительных свойств:
        - **_levels?_** - (*ZoomLevel[]*) - массив зум-уровней. Необязателен — если пропущен, используется набор [default named levels](guides/zooming.md#default-zoom-levels) ("hour", "day", "week", "month", "year")
        - **_handler?_** - (*Function*): void - позволяет задать пользовательский обработчик колёсика мыши для ручного управления зумированием
            - **_e_** - (*Event*) - нативный объект события.
        - **_startDate?_** - (*Date*) - начальное значение масштабирования временной шкалы
        - **_endDate?_** - (*Date*) - конечное значение масштабирования временной шкалы
        - **_activeLevelIndex?_** - (*number*) - номер дефолтного активного уровня
        - **_widthStep?_** - (*number*) - шаг увеличения/уменьшения ширины шкалы при переходе к следующему/предыдущему уровню масштабирования
        - **_minColumnWidth?_** - (*number*) - минимальная ширина столбца, позволяющая перейти на предыдущий уровень масштабирования
        - **_maxColumnWidth?_** - (*number*) - максимальная ширина столбца, позволяющая перейти на следующий уровень масштабирования
        - **_useKey?_** - (*string*) - клавиша, которая включает зумирование прокручиванием колёсика мыши:"ctrlKey" | "altKey" | "shiftKey"
        - **_trigger?_** - (*string | null | undefined*) - триггер зумирования: "wheel" | null | undefined 
        - **_element?_** - (*HTMLElement | Function*): HTMLElement - DOM-элемент, над которым активируется зумирование, или функция, возвращающая DOM-элемент
        - **_fit?_** - (*object*) - настройки по умолчанию для [zoom-to-fit](#zoom-to-fit). Вместе с опциями `zoomToFit`, перечисленными ниже, она принимает *levels* (посвящённый набор шкал, используемых только для подгонки) и *handler* (функция, переопределяющая выбор уровня)

Это два примера настройки конфигурации `zoom`:

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


// or, in a more simple way levels can be presented as scale arrays
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

- <span class="submethod">**getCurrentLevel(): number**</span> - возвращает номер (индекс) текущего уровня масштабирования

~~~js
gantt.ext.zoom.getCurrentLevel();
~~~ 

- <span class="submethod">**setLevel(level): void**</span> - переключает на указанный уровень масштабирования.
    - **_level_** - (*number | string*) - Уровень задаётся либо строковым значением (имя уровня из конфигурации, например "year"), либо его номером в массиве уровней

~~~js
gantt.ext.zoom.setLevel("year");
// или 
gantt.ext.zoom.setLevel(5);
~~~ 

- <span class="submethod">**getLevels(): ZoomLevel[]**</span> - позволяет получить все уровни масштабирования

~~~js
gantt.ext.zoom.getLevels();
~~~ 

Возвращает массив уровней масштабирования (*ZoomLevel[]*), переданных в `init()`, которые инициализируют расширение.

- <span class="submethod">**zoomIn(): void**</span> - увеличивает текущий уровень масштабирования

~~~js
gantt.ext.zoom.zoomIn();
~~~ 

Для той же цели можно также использовать:

~~~js
gantt.ext.zoom.setLevel(gantt.ext.zoom.getCurrentLevel() - 1);
~~~ 

- <span class="submethod">**zoomOut(): void**</span> - уменьшает текущий уровень масштабирования

~~~js
gantt.ext.zoom.zoomOut();
~~~ 

Для той же цели можно также использовать:

~~~js
gantt.ext.zoom.setLevel(gantt.ext.zoom.getCurrentLevel() + 1);
~~~ 

- <span class="submethod">**zoomToFit(options?): boolean**</span> - подбирает наиболее детальный уровень зума, на котором целевые задачи помещаются в ширину временной шкалы без горизонтальной прокрутки, и применяет его. См. [Подгонка под диапазон](#zoom-to-fit) для списка опций. Метод идемпотентен и возвращает true, если применён уровень подгонки, false в противном случае.

~~~js
gantt.ext.zoom.zoomToFit();
// или подгонять только текущие видимые (развернутые) строки
gantt.ext.zoom.zoomToFit({ scope: "visible" });
~~~ 

- <span class="submethod">**resetZoom(): boolean**</span> - восстанавливает уровень зума и временную шкалу, которые были активны до первого вызова `zoomToFit()`. Возвращает <i>true</i>, если сохранённый масштаб был восстановлен, <i>false</i> — если восстанавливать нечего.

~~~js
gantt.ext.zoom.resetZoom();
~~~

- <span class="submethod">**attachEvent(name, handler): string**</span> - прикрепляет обработчик события
    - **_name_** - (*string*) - имя обработчика события
    - **_handler_** - (*Function*) - функция, которая будет вызываться при срабатывании события

- <span class="submethod">**detachEvent(id): void**</span> - отсоединяет обработчик от события
    - **_id_** - (*string*) - идентификатор прикрепленного обработчика события

- <span class="submethod">**callEvent(name, params): boolean**</span> - вызывает внутреннее событие
    - **_name_** - (*string*) - имя события, регистронезависимо
    - **_params_** - (*Array&lt;any&gt;*) - необязательный набор данных, связанных с этим событием
    - Возвращает <i>true</i>, если для события указан обработчик.

- <span class="submethod">**checkEvent(name): boolean**</span> - проверяет, имеется ли обработчик(и) для данного события
    - **_name_** - (*string*) - имя события

Возвращает <i>true</i>, если для события указан обработчик.

## Подгонка под диапазон {#zoom-to-fit}

[`zoomToFit(options)`](#methods) и настройка `fit` в [`init()`](#methods) принимают следующие опции:

- <span class="subproperty">**scope?**</span> - (*"all" | "visible"*) - какие задачи подгонять: *"all"* (по умолчанию) подгоняет каждую загруженную задачу, включая задачи под свёрнутыми ветвями; *"visible"* подгоняет только текущие развёрнутые строки
- <span class="subproperty">**taskId?**</span> - (*string | number*) - подгоняет одну задачу вместе с её поддеревом
- <span class="subproperty">**range?**</span> - (*object*) - подгоняет явный диапазон дат со свойствами *start_date* и *end_date* (*Date*)
- <span class="subproperty">**rangeMode?**</span> - (*"auto" | "preserve" | "target"*) - перезаписывать ли отображаемые `start_date`/`end_date` на подогнанный диапазон. *"target"* всегда устанавливает подогнанный диапазон, *"preserve"* сохраняет текущие границы, *"auto"* (по умолчанию) сохраняет явные границы, если они заданы, и устанавливает подогнанный диапазон в противном случае
- <span class="subproperty">**padding?**</span> - (*number*) - количество дополнительных столбцов, добавляемых перед первым и после последнего подобранного диапазона дат. По умолчанию: *1*
- <span class="subproperty">**minLevel?**</span> - (*string | number*) - наиболее детальный уровень масштабирования, который допускается выбрать у `zoomToFit`
- <span class="subproperty">**maxLevel?**</span> - (*string | number*) - наиболее грубый уровень масштабирования, который допускается выбрать у `zoomToFit`

Если задать через свойство `fit` в `init()`, конфигурация дополнительно принимает:

- <span class="subproperty">**levels?**</span> - (*ZoomLevel[]*) - специальный набор уровней масштаба, учитываемый только для `zoomToFit`. Если опущен, используются интерактивные уровни зума
- <span class="subproperty">**handler?**</span> - (*Function*): string | number | boolean | void - переопределяет выбор уровня. Он получает объект контекста и должен вернуть имя/индекс уровня, чтобы применить его, вернуть `false` чтобы прервать подбор, или вернуть ничего, чтобы сохранить вычисленный уровень
    - **_context_** - (*object*) - объект `{ range, viewportWidth, levels, padding, defaultLevel }`, где *defaultLevel* — индекс уровня, выбранный встроенным алгоритмом

Опции, переданные напрямую в `zoomToFit()`, переопределяют значения по умолчанию, заданные в `init({ fit })`.

~~~js
gantt.ext.zoom.init({
    fit: {
        scope: "all",
        // специализированный набор шкал, используемых только для подгонки
        levels: [
            { name: "weeks", scale_height: 50, scales: [{ unit: "week", step: 1, format: "Week #%W" }] },
            { name: "months", scale_height: 50, scales: [{ unit: "month", step: 1, format: "%F, %Y" }] }
        ],
        handler: (context) => {
            // вернуть имя/индекс уровня, false для отмены, или ничего чтобы оставить уровень по умолчанию
            return context.defaultLevel;
        }
    }
});

gantt.ext.zoom.zoomToFit();
~~~

**Связанный пример**: [Подгонка под диапазон](https://docs.dhtmlx.com/gantt/samples/03_scales/13_zoom_to_fit.html)

## События

- <span class="eventname">onAfterZoom</span> -  срабатывает во время переключения уровня масштабирования.
Аргументы:
<span class="eventarguments">
    - **_level_** - (*number | string*) - номер уровня
    - **_config_** - (*ZoomLevel*) - конфигурация уровня
</span>

~~~js
gantt.ext.zoom.attachEvent("onAfterZoom", (level, config) => {
    document.querySelector(`.gantt_radio[value='${config.name}']`).checked = true;
});
~~~