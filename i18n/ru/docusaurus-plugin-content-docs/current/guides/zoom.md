---
title: "Расширение Zoom"
sidebar_label: "Расширение Zoom"
---

# Расширение Zoom

Вы можете узнать подробности об расширении Zoom в статье [Zooming](guides/zooming.md). Настоящая статья предоставляет API-справку по объекту **zoom**:

## Уровни масштабирования

Расширение Zoom использует набор настроек масштаба и позволяет быстро переключаться между ними.

**ZoomLevel** — это объект, который содержит настройки масштаба. Он имеет следующие свойства:

- <span class="subproperty">**name**</span> - (*string*) - название уровня
- <span class="subproperty">**scale_height?**</span> - (*number*) - высота масштаба
- <span class="subproperty">**height?**</span> - (*number*) - высота масштаба
- <span class="subproperty">**min_column_width?**</span> - (*number*) - минимальная ширина столбца. У него выше приоритет, чем minColumnWidth и maxColumnWidth
- <span class="subproperty">**scales**</span> - (*Scales*) - массив шкал, между которыми можно переключаться во время зума на этом уровне

## Методы

- <span class="submethod">**init (zoomConfig): void**</span> - инициализирует расширение с переданной конфигурацией.
    - **_zoomConfig_** - (*object*) - объект конфигурации, который содержит массив *levels* зум‑уровней и ряд дополнительных свойств:
        - **_levels_** - (*ZoomLevel[]*) - обязателен, массив зум‑уровней
        - **_handler?_** - (*Function*): void - позволяет задать пользовательский обработчик прокрутки колесика мыши для управления зумом вручную
            - **_e_** - (*Event*) - объект нативного события.
        - **_startDate?_** - (*Date*) - начальное значение масштаба времени зумирования
        - **_endDate?_** - (*Date*) - конечное значение масштаба времени зумирования
        - **_activeLevelIndex?_** - (*number*) - номер уровня по умолчанию
        - **_widthStep?_** - (*number*) - шаг увеличения/уменьшения ширины масштаба при переходе к следующему/предыдущему уровню зума
        - **_minColumnWidth?_** - (*number*) - минимальная ширина столбца, позволяющая перейти к предыдущему уровню масштабирования
        - **_maxColumnWidth?_** - (*number*) - максимальная ширина столбца, позволяющая перейти к следующему уровню масштабирования
        - **_useKey?_** - (*string*) - клавиша, которая включает масштабирование при прокрутке колесика мыши: "ctrlKey" | "altKey" | "shiftKey"
        - **_trigger?_** - (*string | null | undefined*) - триггер масштабирования: "wheel" | null | undefined 
        - **_element?_** - (*HTMLElement | Function*): HTMLElement - DOM-элемент, над которым запускается зумирование, или функция, возвращающая DOM-элемент

Эти два примера настройки конфигурации **zoom**:

~~~js
var zoomConfig = {
    levels: [
      {
        name:"day",
        scale_height: 27,
        min_column_width:80,
        scales:[
            {unit: "day", step: 1, format: "%d %M"}
        ]
      },
      {
         name:"week",
         scale_height: 50,
         min_column_width:50,
         scales:[
          {unit: "week", step: 1, format: function (date) {
           var dateToStr = gantt.date.date_to_str("%d %M");
           var endDate = gantt.date.add(date, 6, "day");
           var weekNum = gantt.date.date_to_str("%W")(date);
           return "#" + weekNum + ", " + dateToStr(date) + " - " + dateToStr(endDate);
           }},
           {unit: "day", step: 1, format: "%j %D"}
         ]
       },
       {
         name:"month",
         scale_height: 50,
         min_column_width:120,
         scales:[
             {unit: "month", format: "%F, %Y"},
             {unit: "week", format: "Week #%W"}
         ]
        },
        {
         name:"quarter",
         height: 50,
         min_column_width:90,
         scales:[
          {unit: "month", step: 1, format: "%M"},
          {
           unit: "quarter", step: 1, format: function (date) {
            var dateToStr = gantt.date.date_to_str("%M");
            var endDate = gantt.date.add(gantt.date.add(date, 3, "month"), -1, "day");
            return dateToStr(date) + " - " + dateToStr(endDate);
           }
         }
          ]},
        {
          name:"year",
          scale_height: 50,
          min_column_width: 30,
          scales:[
              {unit: "year", step: 1, format: "%Y"}
        ]}
    ]
};

gantt.ext.zoom.init(zoomConfig);


// or, in a more simple way levels can be presented as scale arrays
var hourToStr = gantt.date.date_to_str("%H:%i");
var hourRangeFormat = function(step){
    return function(date){
        var intervalEnd = new Date(gantt.date.add(date, step, "hour") - 1)
        return hourToStr(date) + " - " + hourToStr(intervalEnd);
    };
};
var zoomConfig = {
    levels: [
        [
            { unit: "month", format: "%M %Y", step: 1},
        ],
        [
            { unit: "month", format: "%M %Y", step: 1},
            { unit: "day", format: "%d %M", step: 1}
        ],
        [
            { unit: "day", format: "%d %M", step: 1},
            { unit: "hour", format: hourRangeFormat(12), step: 12}
        ],
        [
            {unit: "day", format: "%d %M",step: 1},
            {unit: "hour",format: hourRangeFormat(6),step: 6}
        ],
        [
            { unit: "day", format: "%d %M", step: 1 },
            { unit: "hour", format: "%H:%i", step: 1}
        ]
    ]
}

gantt.ext.zoom.init(zoomConfig);
~~~

- <span class="submethod">**getCurrentLevel (): number**</span> - возвращает номер (индекс) текущего уровня масштабирования

~~~js
gantt.ext.zoom.getCurrentLevel();
~~~

- <span class="submethod">**setLevel (level): void**</span> - переключает на указанный уровень масштабирования.
    - **_level_** - (*number | string*) - Уровень определяется либо строкой (имя уровня из конфигурации, например, "year"), либо его номером в массиве уровней

~~~js
gantt.ext.zoom.setLevel("year");
// or 
gantt.ext.zoom.setLevel(5);
~~~

- <span class="submethod">**getLevels (): ZoomLevel[]**</span> - позволяет получить все уровни масштабирования

~~~js
gantt.ext.zoom.getLevels();
~~~

Возвращает массив уровней масштабирования (*ZoomLevel[]*) переданных в метод **init()**, который инициализирует расширение.

- <span class="submethod">**zoomIn (): void**</span> - увеличивает текущий уровень масштабирования

~~~js
gantt.ext.zoom.zoomIn();
~~~

Для той же цели можно воспользоваться:

~~~js
gantt.ext.zoom.setLevel(zoom.getCurrentLevel() - 1)
~~~

- <span class="submethod">**zoomOut (): void**</span> - уменьшает текущий уровень масштабирования

~~~js
gantt.ext.zoom.zoomOut();
~~~

Для той же цели можно воспользоваться:

~~~js
gantt.ext.zoom.setLevel(zoom.getCurrentLevel() + 1)
~~~

- <span class="submethod">**attachEvent (name, handler): string**</span> - прикрепляет обработчик события
    - **_name_** - (*string*) - имя обработчика события
    - **_handler_** - (*Function*) - функция, которая будет вызываться при срабатывании события

- <span class="submethod">**detachEvent (id): void**</span> - открепляет обработчик от события
    - **_id_** - (*string*) - идентификатор подключенного обработчика события

- <span class="submethod">**callEvent (name, params): boolean**</span> - вызывает внутреннее событие
    - **_name_** - (*string*) - имя события, без учёта регистра
    - **_params_** - (*Array&lt;any&gt;*) - необязательный массив данных, связанных с событием

- <span class="submethod">**checkEvent (name): boolean**</span> - проверяет, указан ли обработчик(-и) для события
    - **_name_** - (*string*) - имя события

Returns <i>true</i>, если для события указан обработчик(-и).

## События

- **<span class="eventname">onAfterZoom</span>** - срабатывает во время переключения уровня масштабирования.
Аргументы: 
<span class="eventarguments">
    - **_level_** - (*number | string*) - номер уровня
    - **_config_** - (*ZoomLevel*) - конфигурация уровня
</span>

~~~js
gantt.ext.zoom.attachEvent("onAfterZoom", function(level, config){ 
    document.querySelector(".gantt_radio[value='" +config.name+ "']").checked = true;
}); 
~~~