---
title: "Расширение Zoom"
sidebar_label: "Расширение Zoom"
---

Расширение Zoom
===============

Более подробную информацию о расширении Zoom можно найти в статье [Масштабирование](guides/zooming.md). Этот документ посвящён описанию API для объекта **zoom**:

## Уровни масштабирования

Расширение Zoom работает с набором настроек масштаба, что позволяет быстро переключаться между ними.

**ZoomLevel** - это объект, представляющий настройки масштаба, со следующими свойствами:

- <span class="subproperty">**name**</span> - (*string*) - имя, присвоенное уровню
- <span class="subproperty">**scale_height?**</span> - (*number*) - высота шкалы
- <span class="subproperty">**height?**</span> - (*number*) - высота шкалы
- <span class="subproperty">**min_column_width?**</span> - (*number*) - минимальная ширина колонки; имеет приоритет над minColumnWidth и maxColumnWidth
- <span class="subproperty">**scales**</span> - (*Scales*) - массив шкал, между которыми можно переключаться при увеличении или уменьшении масштаба

## Методы

- <span class="submethod">**init (zoomConfig): void**</span> - инициализирует расширение с использованием переданной конфигурации.
    - **_zoomConfig_** - (*object*) - объект конфигурации, включающий массив *levels* с определением уровней масштабирования, а также ряд необязательных свойств:
        - **_levels_** - (*ZoomLevel[]*) - обязательно, массив, определяющий уровни масштабирования
        - **_handler?_** - (*Function*): void - позволяет определить пользовательский обработчик колесика мыши для ручного управления зумом
            - **_e_** - (*Event*) - нативный объект события
        - **_startDate?_** - (*Date*) - начальная точка для масштабирования временной шкалы
        - **_endDate?_** - (*Date*) - конечная точка для масштабирования временной шкалы
        - **_activeLevelIndex?_** - (*number*) - индекс уровня масштабирования, который будет активен по умолчанию
        - **_widthStep?_** - (*number*) - шаг увеличения/уменьшения ширины шкалы при переключении уровней зума
        - **_minColumnWidth?_** - (*number*) - минимальная ширина колонки, позволяющая перейти к предыдущему уровню зума
        - **_maxColumnWidth?_** - (*number*) - максимальная ширина колонки, позволяющая перейти к следующему уровню зума
        - **_useKey?_** - (*string*) - указывает, какая клавиша разрешает масштабирование с помощью прокрутки мыши: "ctrlKey" | "altKey" | "shiftKey"
        - **_trigger?_** - (*string | null | undefined*) - определяет триггер масштабирования: "wheel" | null | undefined 
        - **_element?_** - (*HTMLElement | Function*): HTMLElement - DOM-элемент, инициирующий масштабирование, либо функция, возвращающая такой элемент

Ниже приведены два примера конфигурации расширения **zoom**:

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


// альтернативно, уровни можно определить как массивы шкал
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

- <span class="submethod">**getCurrentLevel (): number**</span> - возвращает индекс текущего уровня масштабирования

~~~js
gantt.ext.zoom.getCurrentLevel();
~~~

- <span class="submethod">**setLevel (level): void**</span> - изменяет уровень масштабирования на указанный.
    - **_level_** - (*number | string*) - может быть либо именем уровня (например, "year"), либо его индексом в массиве levels

~~~js
gantt.ext.zoom.setLevel("year");
// или 
gantt.ext.zoom.setLevel(5);
~~~

- <span class="submethod">**getLevels (): ZoomLevel[]**</span> - возвращает все определённые уровни масштабирования

~~~js
gantt.ext.zoom.getLevels();
~~~

Метод возвращает массив уровней масштабирования (*ZoomLevels[]*), который был передан в метод **init()**.

- <span class="submethod">**zoomIn (): void**</span> - переходит на более высокий уровень масштабирования

~~~js
gantt.ext.zoom.zoomIn();
~~~

Также можно добиться того же с помощью:

~~~js
gantt.ext.zoom.setLevel(zoom.getCurrentLevel() - 1)
~~~

- <span class="submethod">**zoomOut (): void**</span> - переходит на более низкий уровень масштабирования

~~~js
gantt.ext.zoom.zoomOut();
~~~

Либо можно использовать:

~~~js
gantt.ext.zoom.setLevel(zoom.getCurrentLevel() + 1)
~~~

- <span class="submethod">**attachEvent (name, handler): string**</span> - добавляет обработчик события
    - **_name_** - (*string*) - имя события, на которое нужно подписаться
    - **_handler_** - (*Function*) - функция, которая будет вызвана при возникновении события

- <span class="submethod">**detachEvent (id): void**</span> - удаляет ранее добавленный обработчик события
    - **_id_** - (*string*) - идентификатор обработчика события для удаления

- <span class="submethod">**callEvent (name, params): boolean**</span> - инициирует внутреннее событие
    - **_name_** - (*string*) - имя события, не зависит от регистра
    - **_params_** - (*Array&lt;any&gt;*) - необязательный массив данных, связанных с событием

- <span class="submethod">**checkEvent (name): boolean**</span> - проверяет, есть ли зарегистрированные обработчики для указанного события
    - **_name_** - (*string*) - имя события

Возвращает <i>true</i>, если для события зарегистрирован хотя бы один обработчик.

## События

- **<span class="eventname">onAfterZoom</span>** - возникает при изменении уровня масштабирования.
Событие предоставляет следующие аргументы:
<span class="eventarguments">
    - **_level_** - (*number | string*) - индекс или имя уровня масштабирования
    - **_config_** - (*ZoomLevel*) - объект конфигурации для уровня масштабирования
</span>

~~~js
gantt.ext.zoom.attachEvent("onAfterZoom", function(level, config){ 
    document.querySelector(".gantt_radio[value='" +config.name+ "']").checked = true;
}); 
~~~
