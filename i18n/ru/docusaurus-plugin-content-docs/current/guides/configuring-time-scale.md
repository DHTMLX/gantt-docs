---
title: "Настройка шкалы"
sidebar_label: "Настройка шкалы"
---

# Настройка шкалы

![gantt_dates](/img/gantt_dates.png)

Вы можете настраивать шкалы с помощью свойства [scales](api/config/scales.md). Можно определить несколько шкал, добавив объекты шкалы в массив **scales** в конфиге:

~~~js
// одиночная шкала по дням
gantt.config.scales = [
    {unit: "day", step: 1, format: "%j, %D"}
];

// несколько шкал одновременно
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "week", step: 1, format: weekScaleTemplate},
    {unit: "day", step:1, format: "%D", css:daysStyle }
];
~~~

Вы можете настроить следующие параметры временной шкалы (ось X):

1. [Единица измерения](#timeunits)
2. [Диапазон](#range)
3. [Шаг](#timestep)
4. [Высота](#height)
5. [Формат](#dateformat)
6. [Стиль](#styling)

Также есть возможность добавить [пользовательскую шкалу](#customtimeunits).

## Единицы времени {#timeunits}

![month_day_scale_units](/img/month_day_scale_units.png)

Чтобы задать единицу измерения для шкалы, используйте свойство **unit** в объекте шкалы:

Доступные значения: "minute", "hour", "day" (по умолчанию), "week", "quarter", "month" и "year".

~~~js
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "day", step: 1, format: "%j, %D"}
];

gantt.init("gantt_here");
~~~


[Month view](https://docs.dhtmlx.com/gantt/samples/03_scales/02_month_days.html)


## Диапазон {#range}

![day_scale_unit](/img/day_scale_unit.png)

### Настройки диапазона по умолчанию

Когда диапазон дат не задан явно, Gantt берет даты из загруженных задач и добавляет небольшие отступы до первой и после последней задачи на шкале. Эти отступы зависят от настроек временной шкалы. 
В зависимости от значения [scale_offset_minimal](api/config/scale_offset_minimal.md), отступ будет равен либо единице времени, определённой атрибутом **unit** в опции [scales](api/config/scales.md), либо наименьшей единице временной шкалы.

Вы можете получить текущий отображаемый диапазон дат программно с помощью метода [getState](api/method/getstate.md).

~~~js
var state = gantt.getState();

console.log(state.min_date);
// -> Mon Jan 01 2018 00:00:00

console.log(state.max_date);
// -> Tue Jan 01 2019 00:00:00
~~~

Диапазон шкалы пересчитывается во время [отрисовки gantt](api/method/render.md). Если пользователь переместит задачу за пределы видимого временного диапазона, строка задачи останется видимой, но элемент-блок не отобразится до полной перерисовки диаграммы.

Чтобы шкала автоматически подстраивалась, включите опцию [fit_tasks](api/config/fit_tasks.md).

~~~js
gantt.config.fit_tasks = true; 
gantt.init("gantt_here");
~~~


[Auto resize scale](https://docs.dhtmlx.com/gantt/samples/03_scales/08_scale_autoconfig.html)


### Явное задание диапазона дат {#explicit_date_range}

Вы также можете явно задать диапазон дат с помощью опций [start_date](api/config/start_date.md) и [end_date](api/config/end_date.md):

~~~js
gantt.config.start_date = new Date(2018, 02, 31);
gantt.config.end_date = new Date(2018, 03, 09);
 
gantt.init("gantt_here");
~~~

Эти даты также можно задать напрямую при [инициализации gantt](api/method/init.md):

~~~js
gantt.init("gantt_here", new Date(2018, 02, 31), new Date(2018, 03, 09));
~~~


[Define displayed date range](https://docs.dhtmlx.com/gantt/samples/01_initialization/08_explicit_time_range.html)


Задачи, выходящие за пределы определенного интервала, не будут отображаться в диаграмме Gantt, если только они не [отмечены как незапланированные](guides/unscheduled-tasks.md).


[Show Unscheduled Tasks](https://docs.dhtmlx.com/gantt/samples/01_initialization/19_tasks_without_dates.html)


#### Примечание {#note}

Если заданы оба параметра **start_date** и **end_date**, и вы добавите задачу вне этого диапазона, задача не будет видна на диаграмме. 
Чтобы отображать такие задачи, включите опцию [show_tasks_outside_timescale](api/config/show_tasks_outside_timescale.md).

~~~js
gantt.config.start_date = new Date(2019, 02, 31);
gantt.config.end_date = new Date(2019, 03, 09);
gantt.config.show_tasks_outside_timescale = true;

gantt.init("gantt_here");
~~~

Если вы не используете эту опцию, вы можете динамически расширять диапазон дат:

~~~js
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
 var taskStart = task.start_date;
 var taskEnd = task.end_date;
 var scaleStart = gantt.config.start_date;
 var scaleEnd = gantt.config.end_date;

 // если задача вне диапазона
 if(scaleStart > taskEnd || scaleEnd < taskStart ){
  // обновить диапазон шкалы
  gantt.config.end_date = new Date(Math.max(taskEnd.valueOf(), scaleEnd.valueOf()));
  gantt.config.start_date = new Date(Math.min(taskStart.valueOf(), scaleStart.valueOf()));
  gantt.render();
 }    
 return true;
});
~~~

Либо можно добавить в lightbox валидацию, запрещающую сохранение задач вне диапазона:

~~~js
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
     var taskStart = task.start_date;
     var taskEnd = task.end_date;
     var scaleStart = gantt.config.start_date;
     var scaleEnd = gantt.config.end_date;

    // проверка, что задача вне диапазона
    if(scaleStart > taskEnd || scaleEnd < taskStart ){
        gantt.message({
            type: "warning", 
            text: "Warning! The task is outside the date range!",
            expire: 5000
        });
        return false;
    } 
    return true;
});
~~~

### Динамическое изменение отображаемого диапазона {#dynamic_scale}

Существует несколько способов обновлять отображаемый диапазон дат "на лету":

- Управляйте временным диапазоном через параметры **start_date** и **end_date**, обновляя их динамически на основе загруженных задач.  
Это можно реализовать путем [пересчета диапазона шкалы](api/method/getsubtaskdates.md) и обновления **start_date** и **end_date** перед каждой отрисовкой gantt:

~~~js
gantt.attachEvent("onBeforeGanttRender", function(){
   var range = gantt.getSubtaskDates();
   var scaleUnit = gantt.getState().scale_unit;
   if(range.start_date && range.end_date){
     gantt.config.start_date = gantt.calculateEndDate(range.start_date, -4, scaleUnit);
     gantt.config.end_date = gantt.calculateEndDate(range.end_date, 5, scaleUnit);
   }
});

gantt.init("gantt_here");
~~~

- Чтобы заставить шкалу перерисовываться каждый раз, когда задача выходит за пределы текущего интервала шкалы, установите свойство [fit_tasks](api/config/fit_tasks.md) в *true*:

~~~js
gantt.config.fit_tasks = true; 
gantt.init("gantt_here");
~~~

Если заданы оба параметра **start_date** и **end_date**, для корректной работы опции **fit_tasks** используйте один из описанных выше методов.

- Также можно обновлять шкалу динамически при перетаскивании задачи, добавив обработчик в событие [onTaskDrag](api/event/ontaskdrag.md):

~~~js
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
 var state = gantt.getState();
 var minDate = state.min_date,
       maxDate = state.max_date;
  
 var scaleStep = gantt.date.add(new Date(), state.scale_step, state.scale_unit) - new Date();
  
 var showDate,
  repaint = false;
  if(mode == "resize" || mode == "move"){
    if(Math.abs(task.start_date - minDate) < scaleStep){
      showDate = task.start_date;
      repaint = true;
      
    } else if(Math.abs(task.end_date - maxDate) < scaleStep){
      showDate = task.end_date;
      repaint = true;
    }
    
    if(repaint){
      gantt.render();
      gantt.showDate(showDate);
    }
  }
});
~~~


**Related example:** [Re-rendering Scale during Task Dragging](https://snippet.dhtmlx.com/o2bgk6uf)


### Отображение задач вне явного диапазона дат {#tasksoutsidetimescale}

Вы можете отображать задачи, выходящие за [заданный диапазон дат](guides/configuring-time-scale.md#explicit_date_range) в диаграмме Gantt.

![tasks_outside_timescale](/img/tasks_outside_timescale.png) 

Для этого установите опцию [show_tasks_outside_timescale](api/config/show_tasks_outside_timescale.md) в *true*:

~~~js
var data = {
  "tasks": [
    {"id":1, "text":"Project #1", "start_date": "01-09-2018", "end_date": "02-09-2018"},
    {"id":2, "text":"Project #2", "start_date": "01-09-2021", "end_date": "02-09-2021"},
    {"id":3, "text":"Task #1", "start_date": "03-02-2020", "end_date": "05-02-2020"},
    ],
    "links":[]
};

gantt.config.show_tasks_outside_timescale = true;

gantt.init("gantt_here", new Date(2020, 1, 1), new Date(2020, 2, 1));
~~~


[Tasks outside timescale](https://docs.dhtmlx.com/gantt/samples/01_initialization/20_tasks_outside_timescale.html)


В результате задачи с идентификаторами "1" и "2" будут отображаться как пустые строки в области временной шкалы, показывая свои имена и даты начала в гриде.

## Шаг времени {#timestep}

![scale_step](/img/scale_step.png)

Чтобы задать размер шага временной шкалы, используйте свойство **step** в объекте конфигурации шкалы:

~~~js
var monthScaleTemplate = function (date) {
    var dateToStr = gantt.date.date_to_str("%M");
    var endDate = gantt.date.add(date, 2, "month");
    return dateToStr(date) + " - " + dateToStr(endDate);
};

gantt.config.scales = [
    {unit: "year", step: 1, format: "%Y"},
    {unit: "month", step: 3, format: monthScaleTemplate},
    {unit: "month", step: 1, format: "%M"}
];

gantt.init("gantt_here");
~~~


[Step config for the Quarter scale](https://docs.dhtmlx.com/gantt/samples/03_scales/03_full_year.html)


## Высота {#height}

![scale_height](/img/scale_height.png)

Чтобы настроить высоту шкалы, используйте свойство [scale_height](api/config/scale_height.md):

~~~js
gantt.config.scale_height = 54; /*!*/

gantt.init("gantt_here");
~~~


[Day hours](https://docs.dhtmlx.com/gantt/samples/03_scales/04_days.html)


Если используется несколько шкал, заданная высота будет разделена между ними равномерно. Например, если **scale_height** равен 60 пикселям и есть 3 шкалы, каждая получит по 20 пикселей высоты.

## Формат даты {#dateformat}

:::note
См. статью [Спецификация формата даты](guides/date-format.md) для ознакомления с доступными символами формата
:::

Вы можете задать формат даты для шкалы с помощью свойства **format** в каждом объекте шкалы. Это может быть строка:

~~~js
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "week", step: 1, format: weekScaleTemplate},
    {unit: "day", step: 1, format: "%D", css: daysStyle }
];

gantt.init("gantt_here");
~~~


[Multiple scales](https://docs.dhtmlx.com/gantt/samples/03_scales/01_multiple_scales.html)


![multiple_scales](/img/multiple_scales.png)

Или функция, принимающая объект даты и возвращающая отформатированную строку:

~~~js
gantt.config.scales = [
  { unit: "day", step: 1, format: function(date){
    return "<strong>Day " + dayNumber(date) + "</strong>

" + dateFormat(date);
  }}
]
~~~


[Custom scales](https://docs.dhtmlx.com/gantt/samples/03_scales/06_custom_scales.html)


![scale_template](/img/scale_template.png)

## Стилизация {#styling}

![css_styling](/img/css_styling.png)

Для стилизации ячеек временной шкалы используйте атрибут **css** в объекте шкалы.

~~~js
function getWeekOfMonthNumber(date){
    let adjustedDate = date.getDate() + date.getDay();
    let prefixes = ['0', '1', '2', '3', '4', '5'];
    return (parseInt(prefixes[0 | adjustedDate / 7]) + 1);
} 

gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "week", step: 1, format: function(date){
       return "Week #" + getWeekOfMonthNumber(date);
    }},
    {unit: "day", step: 1, format: "%j %D", css: function(date) { /*!*/
         if(!gantt.isWorkTime(date)){ 
             return "week-end"; 
         } 
    }} 
];
~~~


**Related example:** [Styling of cells of the time scale](https://snippet.dhtmlx.com/tadcjjk4)


Если свойство **css** не задано в настройках шкал, вы можете использовать шаблон [scale_cell_class](api/template/scale_cell_class.md) для применения CSS-классов к первой временной шкале в массиве **scales**.

~~~js
function getWeekOfMonthNumber(date){
    let adjustedDate = date.getDate() + date.getDay();
    let prefixes = ['0', '1', '2', '3', '4', '5'];
    return (parseInt(prefixes[0 | adjustedDate / 7]) + 1);
} 

gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "week", step: 1, format: function(date){
       return "Week #" + getWeekOfMonthNumber(date);
    }},
    {unit: "day", step: 1, format: "%j %D"}
];

gantt.templates.scale_cell_class = function(date) {
         if(!gantt.isWorkTime(date)){
             return "week-end";
         }
};
~~~


**Related example:** [Styling of the first time scale](https://snippet.dhtmlx.com/vovv2wde)


Чтобы применить шаблон [scale_cell_class](api/template/scale_cell_class.md) ко всем шкалам, установите опцию [inherit_scale_class](api/config/inherit_scale_class.md) в *true*.

~~~js
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "week", step: 1, format: function(date){
       return "Week #" + getWeekOfMonthNumber(date);
    }},
    {unit: "day", step: 1, format: "%j %D"}
];

gantt.templates.scale_cell_class = function(date) {
         if(!gantt.isWorkTime(date)){
             return "week-end";
         }
};
gantt.config.inherit_scale_class = true; /*!*/
~~~


**Related example:** [Styling of all scales](https://snippet.dhtmlx.com/v6p55wdz)


При работе с [расчетом рабочего времени](guides/working-time.md) рекомендуется использовать [isWorkTime](api/method/isworktime.md) вместо жестких значений:

~~~js
gantt.config.work_time = true;

gantt.templates.scale_cell_class = function(date){
   if(!gantt.isWorkTime(date)){
      return "weekend";
   }
};
~~~

Больше информации о кастомизации стиля области временной шкалы смотрите в статье [Выделение временных слотов](guides/highlighting-time-slots.md).

## Пользовательские единицы времени {#customtimeunits}

dhtmlxGantt позволяет создавать собственные единицы времени и задавать шаблоны подписей в настройках шкалы.

Чтобы определить пользовательскую единицу, реализуйте две функции для объекта [Date](api/other/date.md):

~~~js
Date gantt.date.<unit>_start(Date date);
Date gantt.date.add_<unit>(Date date, Integer increment);
~~~

- Первая функция возвращает начало единицы времени для заданной даты (например, для month_start, 14 фев - это 1 фев).  
- Вторая функция добавляет к дате заданное количество единиц времени (например, вычитание 2 дней).

:::note
Обычно инкременты положительные, так как ячейки шкалы создаются слева направо. Однако первая ячейка создается справа налево, поэтому Gantt использует отрицательное значение инкремента в этом случае.
:::

### Пример 1

Вот как определить единицу "fiscal_year", предполагая, что финансовый год заканчивается 31 января. Новый юнит можно задать следующим образом:

~~~js
var firstMonth = 1,
    firstDay = 1;

gantt.date.fiscal_year_start = function(date){       /*!*/
   var next = new Date(date);
   if(next.getMonth() < firstMonth || 
      (next.getMonth() === firstMonth && next.getDate() < firstDay)){
      next = gantt.date.add(next, -1, "year"); 
   }
  
  next = gantt.date.year_start(next);
  next.setMonth(firstMonth);
  next.setDate(firstDay);
 
  return next;
}; 

gantt.date.add_fiscal_year = function(date, inc){    /*!*/
   return gantt.date.add(date, inc, "year");
};
~~~

Теперь это можно использовать в коде так:

~~~js
var dateToStr = gantt.date.date_to_str("%Y");
function fiscalYearLabel(date){
    return dateToStr(gantt.date.fiscal_year_start(date));
};

gantt.config.scales = [
  {unit:"year", step:1, format:"Calendar year %Y"},
  {unit:"fiscal_year", step:1, format:fiscalYearLabel},
  {unit:"month", step: 1, format: "%M %Y"},
  {unit:"day", step: 1, format:"%d %M"}
];
~~~

### Пример 2

Можно разделить каждую ячейку "day" на три ячейки "hour" с метками 00, 08 и 16. Логика выглядит так:

~~~js
gantt.date.hour_custom_start = function (date) {
    return date;
};

gantt.date.add_hour_custom = function (date, inc) { // inc зависит от "step"
    const nextDate = new Date(date);
    if (nextDate.getHours() % 8 != 0) { // значение часа не 0, 8 или 16 /*!*/
        const diff = Math.abs(8 - nextDate.getHours()); /*!*/
        return gantt.date.add(nextDate, diff * inc, "hour"); /*!*/
    } /*!*/
    return gantt.date.add(date, 8 * inc, "hour"); /*!*/
};

gantt.config.scales = [
    { unit: "day", step: 1, date: "%d %F" },
    { unit: "hour_custom", step: 1, date: "%H" },
];

gantt.config.date_grid = "%Y-%m-%d %H:%i"
~~~


**Related example:** [Custom hours on the scale](https://snippet.dhtmlx.com/59qgh9vr)


![custom_scale](/img/custom_scale.png)

Чтобы понять, как Gantt определяет первую ячейку "hour", предположим, что самая ранняя задача начинается в 07:00. Поскольку 7 не кратно восьми, Gantt применяет следующее правило:

~~~js
if (nextDate.getHours() % 8 != 0) {
    const diff = Math.abs(8 - nextDate.getHours());  // 8 - 7 = 1
    return gantt.date.add(nextDate, diff * inc, "hour"); // 7 - 1 = 6
} 
~~~

- Gantt вычисляет разницу во времени между 8:00 и 7:00: 

*diff = 08:00 - 07:00 = 1 час*

- Затем умножает эту разницу на инкремент: 

 *diff * inc = 1 час * (-1) = -1 час* 

 Здесь *inc* - отрицательное значение шага времени (*-1*).

- В итоге это значение прибавляется к времени самой ранней задачи: 

 *07:00 + (- 1 час) = 06:00*  


Значение первой ячейки становится **06**.

Для второй ячейки "hour" применяется та же логика, но с положительным инкрементом:

- *diff = 08:00 - 06:00 = 2 часа*

- *diff * inc = 2 часа * 1 = 2 часа*

- *06:00 + 2 часа = 08:00*  


Вторая ячейка показывает **08**.

Поскольку 8 кратно восьми, следующая ячейка рассчитывается просто как *08:00 + 8 часов = **16:00***, и этот шаблон повторяется для следующих ячеек.

:::note
Такой подход работает, потому что [диапазон дат не задан явно](#explicit_date_range).
:::

Больше примеров смотрите в статье [Решения: добавление пользовательской шкалы](guides/how-to.md#howtoaddacustomscale).

## Пользовательские временные интервалы {#customtimespans}

В этом разделе приведены примеры настройки временной шкалы для отображения или скрытия нерабочих периодов времени. Также приведён пример скрытия ячеек с нерабочими часами в начале шкалы даже при активном режиме **skip_off_time**.

Пример пользовательской шкалы для стандартных рабочих часов с 08:00 до 12:00 и с 13:00 до 17:00:

~~~js
gantt.date.day_custom_start = function (date) {
    return date;
};

gantt.date.add_day_custom = function (date, inc) { /*!*/
    const nextDate = new Date(date); /*!*/
    if (nextDate.getHours() < 8) { /*!*/ // Условие 1
        const diff = 8 - nextDate.getHours(); /*!*/
        return gantt.date.add(nextDate, diff * inc, "hour"); /*!*/
    } /*!*/
    if (nextDate.getHours() == 8) { /*!*/ // Условие 2
        return gantt.date.add(nextDate, 9 * inc, "hour"); /*!*/
    } /*!*/
    if (nextDate.getHours() == 17) { /*!*/ // Условие 3
        return gantt.date.add(nextDate, 15 * inc, "hour"); /*!*/
    } /*!*/

    return gantt.date.add(date, 8 * inc, "hour"); /*!*/
};

gantt.config.scales = [
    { unit: "day_custom", step: 1, date: "%d %H:00" },
];

// gantt.config.skip_off_time = true;
gantt.config.work_time = true;
gantt.config.correct_work_time = true;
gantt.plugins({
    auto_scheduling: true,
});
gantt.setWorkTime({ hours: ["8:00-12:00", "13:00-17:00"] }); /*!*/

gantt.config.duration_unit = "minute";
gantt.config.duration_step = 1;
gantt.config.time_step = 1;
gantt.config.round_dnd_dates = false;
~~~


**Related example:** [Custom time spans](https://snippet.dhtmlx.com/9s4u81c3)


Предположим, что самая ранняя задача начинается в 08:00 1 апреля 2025 года. Посмотрим, как Gantt добавляет смещения до этой задачи в зависимости от настройки [gantt.config.skip_off_time](api/config/skip_off_time.md).

Начнем с конфигурации, скрывающей нерабочие часы:

~~~js
gantt.config.skip_off_time = true;
~~~

В этом случае, чтобы создать первую ячейку "hour", Gantt будет вычитать часы из времени самой ранней задачи, пока не достигнет рабочего времени предыдущего дня.

- Сначала вычитается 9 часов из 08:00 1 апреля 2025 года (Условие 2): 


*08:00 - 9 часов = 23:00*


- Поскольку 23:00 - нерабочее время и не соответствует ни одному условию, Gantt вычитает ещё 8 часов:


*23:00 - 8 часов = 15:00*
- Полученное время, 15:00 31 марта 2025 года, попадает в рабочие часы.

Итак, первая ячейка показывает **31 15:00**.

![](/img/with_skip_off_time.png)

Чтобы понять расчет остальных ячеек, отключите **gantt.config.skip_off_time**:

~~~js
gantt.config.skip_off_time = false;
~~~

Как отмечено, первая ячейка остаётся **31 15:00**, но теперь до самой ранней задачи появляется больше пустых ячеек, так как нерабочие часы отображаются.

Для этих ячеек применяется следующая логика:

- 15:00 31 марта 2025 года - рабочее время без особых условий, поэтому вторая ячейка рассчитывается прибавлением 8 часов:


*15:00 + 8 часов = 23:00* 
- 23:00 31 марта 2025 года - нерабочее время и не попадает ни под одно условие, поэтому третья ячейка:


*23:00 + 8 часов = 7:00*
- 7:00 1 апреля 2025 года - нерабочее время и меньше 8:00 (Условие 3). Следующая ячейка рассчитывается так:


    - *diff = 08:00 - 07:00 = 1 час*
    - *diff * inc = 1 час * 1 = 1 час*
    - *07:00 + 1 час = **08:00***


08:00 1 апреля 2025 года совпадает с временем начала самой ранней задачи.

![](/img/without_skip_off_time.png)

:::note
Остальные ячейки создаются аналогично.
:::


Когда **skip_off_time** отключен, Gantt может добавить более одной пустой ячейки перед самой ранней задачей. Чтобы обеспечить появление только одной ячейки независимо от этой настройки, можно использовать следующую логику:

~~~js
gantt.date.add_day_custom = function (date, inc) {
    // Когда work_time включён и задачи загружены,
    // вычисляем дату первой ячейки.
    // Начиная с минимальной даты, двигаемся назад,
    // находим ближайшую дату в пределах рабочего времени,
    // затем вычитаем 1 час из неё
    if (inc < 0 && gantt.getTaskByTime().length) {
        return gantt.calculateEndDate({ 
            start_date: date, duration: -1, unit: gantt.config._duration_unit 
        })
    }

    // начало рабочего времени (рабочий день);
    // вычисляем, когда рабочий день заканчивается
    if (date.getHours() == 8) {
        return gantt.calculateEndDate(date, 8);
    }
    // конец рабочего времени (рабочий день);
    // вычисляем, когда начинается следующий рабочий день
    if (date.getHours() == 17) {
        return gantt.date.add(date, 15 * inc, "hour");
    }

    // если задачи загружены, вычисляем рабочие даты для второй ячейки шкалы
    // если задач нет, вычисляем даты для всех ячеек шкалы
    date = gantt.date.add(date, 1 * inc, "day");
    gantt.date.day_start(date);
    date = gantt.getClosestWorkTime({ date, dir: "future" })
    return date
};

gantt.config.scales = [
    { unit: "day_custom", step: 1, date: "%d %H:%i" },
];
gantt.config.work_time = true;

gantt.config.skip_off_time = false; /*!*/
~~~


**Related example:** [Equal offset for custom scales](https://snippet.dhtmlx.com/wmj92ys5)


Так выглядит шкала, когда нерабочие часы скрыты:

![custom_first_scale_cell](/img/custom_first_scale_cell.png)

А вот так - когда нерабочие часы отображаются (**gantt.config.skip_off_time** отключен):

![first_scale_cell_without_skip_off_time](/img/disable_skip_off_time.png)

## Бесконечная прокрутка {#infinitescroll}

Подробные примеры реализации бесконечной прокрутки в таймлайне доступны в [соответствующей](guides/how-to.md#howtohaveaninfinitescrollinthetimeline) статье.

## Липкие метки {#stickylabels}

Начиная с версии 9.0, подписи временной шкалы по умолчанию являются липкими. Это означает, что когда ячейка намного шире своей подписи, подпись остаётся видимой при прокрутке таймлайна, "прилипая" к области просмотра, пока естественным образом не исчезнет из видимости. Это помогает сохранять подписи шкалы видимыми, особенно при масштабировании.

Если вы предпочитаете прежнее поведение, когда подписи центрируются в ячейках и не остаются видимыми при прокрутке, вы можете отключить липкие подписи, установив свойство `sticky` шкалы в `false`:

~~~js
gantt.config.scales = [
  {unit: "year", step: 1, format: "%Y", sticky: false},
  {unit: "month", step: 1, format: "%F", sticky: false},
  {unit: "day", step: 1, format: "%j", sticky: false}
];
gantt.init("gantt_here");
~~~

Или, чтобы явно включить липкие подписи для определённой шкалы независимо от ширины ячейки, установите `sticky: true`. Это обеспечит их "прилипание" даже если подпись уже шире ячейки:

~~~js
gantt.config.scales = [
  {unit: "year", step: 1, format: "%Y", sticky: true},
  {unit: "month", step: 1, format: "%F", sticky: true},
  {unit: "day", step: 1, format: "%j", sticky: true}
];
gantt.init("gantt_here");
~~~

