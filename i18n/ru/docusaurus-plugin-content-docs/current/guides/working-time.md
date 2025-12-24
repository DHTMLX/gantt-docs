---
title: "Расчёт рабочего времени"
sidebar_label: "Расчёт рабочего времени"
---

# Расчёт рабочего времени


По умолчанию dhtmlxGantt вычисляет длительность задач по календарному времени, то есть выходные и праздничные дни включаются в общее время.

:::note
Подробнее о форматировании конечных дат задач смотрите в статье [Task end date display & Inclusive end dates](guides/loading.md#taskenddatedisplayampinclusiveenddates).
:::


## Включение расчёта рабочего времени {#enablingworktimecalculation}

Чтобы рассчитывать длительность задач только по рабочим часам, включите опцию, описанную в [work_time](api/config/work_time.md):

**Включение расчёта рабочего времени для длительности задач**
~~~js
gantt.config.work_time = true;     // исключает нерабочее время из расчёта длительности /*!*/
gantt.config.skip_off_time = true; /*!*/   // скрывает нерабочее время на диаграмме

gantt.init("gantt_here");
~~~

Обратите внимание, что опция [skip_off_time](api/config/skip_off_time.md) доступна только в PRO-версии.


[Duration includes only working days](https://docs.dhtmlx.com/gantt/samples/09_worktime/02_working_days.html)


:::note
В зависимости от настройки [duration_unit](api/config/duration_unit.md), dhtmlxGantt вычисляет длительность задач в различных единицах (например, если
duration_unit = "hour", длительность считается в рабочих часах).
:::

![calculating_different_time](/img/calculating_different_time.png)


## Длительность задачи в десятичном формате {#taskdurationindecimalformat}

:::info
Эта функция доступна только в PRO-версии.
:::

Начиная с версии 6.3, dhtmlxGantt поддерживает указание длительности задач в десятичном формате ("2.5 days", 

"0.5 hours", "3.75 hours") с помощью модуля [Duration Formatter](guides/formatters-ext.md).

Важно отметить, что внутри Gantt хранит длительность задач как целые значения.

Модуль форматирования помогает преобразовывать введённую пользователем десятичную длительность во внутренний формат, используемый Gantt (например, "1.5 hours", введённые пользователем, сохраняются как `90` минут). Также он преобразует сохранённые значения обратно в читаемый формат (например, преобразует `12` часов в "0.5 days").

![decimal_duration](/img/decimal_duration.png)

:::note
Длительность задач может быть выражена как дробная часть часа, дня или другой единицы, поддерживаемой [duration_unit](api/config/duration_unit.md), кроме минут.
:::


### Реализация десятичного формата

Чтобы отображать длительность задач в десятичном формате, выполните следующие шаги:

- Установите [duration_unit](api/config/duration_unit.md) в "minute"

~~~js
gantt.config.work_time = true;
gantt.config.duration_unit = "minute"; /*!*/
~~~

Имейте в виду, что единица хранения длительности должна быть меньше, чем отображаемая в десятичном формате. Проще говоря:


    - Чтобы разрешить пользователям указывать длительность как дробную часть часа (например, "0.5 hours"), установите [duration_unit](api/config/duration_unit.md) в "minute" 


    - Чтобы разрешить дробные дни, установите [duration_unit](api/config/duration_unit.md) в "hour". В этом случае пользователи могут вводить длительность как "0.5 day", но "0.5 hour" округлится до 1 часа, так как длительность хранится целыми часами.

:::note
По умолчанию даты задач привязываются к шкале времени. Если ваша шкала в днях, вы можете отключить это, чтобы перетаскивать задачи на разные часы в течение дня. 

Для этого отключите [round_dnd_dates](api/config/round_dnd_dates.md) и установите подходящее значение для [time_step](api/config/time_step.md).
:::
Например:

~~~js
// глобальный шаг времени - 15 минут, требуется "minute" как единица длительности
gantt.config.time_step = 15;
gantt.config.round_dnd_dates = false;
~~~

или

~~~js
// глобальный шаг времени - 1 час,
// подходит при единице длительности "hour"
gantt.config.time_step = 60;
gantt.config.round_dnd_dates = false;
~~~

- Создайте объект *formatter* для обработки форматирования длительности:

~~~js
// настройка форматтера длительности
const formatter = gantt.ext.formatters.durationFormatter({
    enter: "day", 
    store: "minute", // duration_unit
    format: "day",
    hoursPerDay: 8,
    hoursPerWeek: 40,
    daysPerMonth: 30
});
~~~

- Добавьте *formatter* в колонку "Duration", определив функцию-шаблон, возвращающую отформатированную длительность:

~~~js
gantt.config.columns = [
    { name: "text", tree: true, width: 170, resize: true, editor: textEditor },
    { name: "start_date", align: "center", resize: true, editor: dateEditor },
    { name: "duration", label: "Duration", resize: true, align: "center",
        template: task => formatter.format(task.duration), width: 100 },
    { name: "add", width: 44 }
];
~~~

- Добавьте *formatter* в lightbox, присвоив его свойству **formatter** контрола **time**:

~~~js
gantt.config.lightbox.sections = [
    { name: "description", map_to: "text", type: "textarea", height: 70, focus: true },
    { name: "time", map_to: "auto", type: "duration", formatter: formatter }
];
~~~

- Если в гриде включено редактирование по месту, также добавьте *formatter* в объект durationEditor через свойство **formatter**:

~~~js
const durationEditor = {
    type: "duration",
    map_to: "duration",
    formatter: formatter, /*!*/
    min: 0,
    max: 1000
};

gantt.config.columns = [
    { name: "text", tree: true, width: 170, resize: true },
    { name: "start_date", align: "center", resize: true },
    { name: "duration", label: "Duration", resize: true, align: "center", 
        template: (task) => formatter.format(task.duration),
        editor: durationEditor, width: 100 },
    { name: "add", width: 44 }
];
~~~

:::note
Если ваш Gantt уже хранит длительность задач в минутах, часах или другой единице, вы можете использовать модуль [Duration Formatter](guides/formatters-ext.md) для отображения длительности в десятичном формате.
:::


## Глобальные настройки {#globalsettings}

### Настройка рабочего времени {#setworktime}

По умолчанию рабочее время установлено как:

- Рабочие дни: понедельник - пятница.
- Рабочие часы: 8:00 - 12:00, 13:00 - 17:00.

Чтобы настроить рабочее время, используйте метод [setWorkTime](api/method/setworktime.md):

**Настройка рабочего времени**

~~~js
// изменение рабочих часов в рабочие дни
gantt.setWorkTime({ hours: ["9:00-18:00"] });

// все пятницы сделать выходными
gantt.setWorkTime({ day: 5, hours: false });

// задать рабочие часы для пятницы и субботы
gantt.setWorkTime({ day: 5, hours: ["8:00-12:00"] });
gantt.setWorkTime({ day: 6, hours: ["8:00-12:00"] });

// установить определённую дату как рабочий день
gantt.setWorkTime({ date: new Date(2025, 2, 31) });

// установить определённую дату как выходной
gantt.setWorkTime({ date: new Date(2025, 0, 1), hours: false });
~~~


[Custom working days and time](https://docs.dhtmlx.com/gantt/samples/09_worktime/04_custom_workday_duration.html)


### Настройка рабочих часов для ночных смен

При указании атрибута **hours** в методе [setWorkTime](api/method/setworktime.md) интервалы времени должны быть перечислены в порядке возрастания. Если порядок нарушен, некоторые интервалы могут быть проигнорированы. Например, интервалы после `18:00` будут проигнорированы в следующих некорректных настройках:

~~~js
// пример неправильного порядка
gantt.setWorkTime({ day: 5, hours: ["16:00-18:00", "14:00-15:00", "08:00-10:00"] });
gantt.setWorkTime({ day: 5, hours: ["16:00-18:00", "00:00-04:00", "05:00-06:00"] });
~~~

Чтобы задать рабочие часы, охватывающие ночные смены, разбейте интервалы на два дня:

- в пределах 24 часов для первого дня
- в пределах 24 часов для следующего дня

Например:

~~~js
gantt.setWorkTime({ day: 5, hours: ["16:00-18:00"] });
gantt.setWorkTime({ day: 6, hours: ["00:00-04:00", "05:00-06:00"] });
~~~


### Настройка правил рабочего времени

Вы можете определить различные правила рабочего времени для разных периодов, используя атрибут **customWeeks** метода [setWorkTime](api/method/setworktime.md). Например, для изменения рабочих часов в зимние месяцы:

~~~js
// изменение рабочих часов для зимних месяцев
gantt.setWorkTime({
    customWeeks: {
        winter: {
            from: new Date(2025, 11, 1), // 1 декабря 2025
            to: new Date(2026, 2, 1), // 1 марта 2026
            hours: ["9:00-13:00", "14:00-16:00"],
            days: [1, 1, 1, 1, 0, 0, 0]
        }
    }
});
~~~

Чтобы задать рабочие часы с точностью до минут (например, "8:15-12:45"), а не только целых часов, установите [duration_unit](api/config/duration_unit.md) в *"minute"*.

**Настройка рабочего времени с точностью до минут**
~~~js
gantt.config.duration_unit = "minute";

// установка рабочих часов с точностью до минут
gantt.setWorkTime({ hours: ["8:15-12:45"] });
~~~

:::note
Формат рабочего времени, использовавшийся до версии 7.0, по-прежнему поддерживается:

~~~js
gantt.setWorkTime({ hours: [9, 18] });
~~~
:::


### Перезапись правила рабочего времени

Каждый вызов метода для одной и той же даты перезаписывает предыдущее правило рабочего времени. Поэтому, чтобы отменить правило, вызовите [setWorkTime](api/method/setworktime.md) с другой конфигурацией:

~~~js
gantt.setWorkTime({ hours: ["8:00-12:00"] });
gantt.setWorkTime({ hours: ["13:00-17:00"] });
// итоговое рабочее время будет 13:00-17:00,
// а не комбинация обоих интервалов
~~~

### Настройка пользовательских рабочих и нерабочих дней

Имейте в виду, что нельзя задать рабочее время таким образом, чтобы исключить все рабочие дни или часы. Например, следующий код работать не будет:

~~~js
gantt.setWorkTime({ day: 0, hours: [] });
gantt.setWorkTime({ day: 1, hours: [] });
gantt.setWorkTime({ day: 2, hours: [] });
gantt.setWorkTime({ day: 3, hours: [] });
gantt.setWorkTime({ day: 4, hours: [] });
gantt.setWorkTime({ day: 5, hours: [] });
gantt.setWorkTime({ day: 6, hours: [] });
~~~

В этом случае Gantt проигнорирует вызов метода хотя бы для одного рабочего дня, и этот день всё равно останется рабочим.

Если вы попытаетесь вычислить ближайшее рабочее время или длительность из заданной даты, не удастся найти ни одной подходящей даты или длительности. Это значит, что такая настройка календаря фактически не работает. Даже если вы зададите рабочие часы для отдельных дат, поведение будет некорректным, так как Gantt может вычислять даты только в диапазонах, включающих рабочие дни и часы. Вычисления вне этих диапазонов будут завершаться ошибкой или выдавать некорректный результат.

Если вы хотите создать календарь, в котором некоторые месяцы или даже годы полностью состоят из нерабочих дней, используйте опцию *customWeeks* в методе **setWorkTime()**. Чтобы определить рабочие дни и часы в нужном диапазоне, необходимо:

- разбить диапазон на периоды без рабочих часов
- задать рабочие часы для нужных дат

~~~js
gantt.setWorkTime({ date: new Date(2025, 3, 10), hours: ["8:00-12:00"] })
gantt.setWorkTime({ date: new Date(2025, 3, 11), hours: ["13:00-17:00"] })

gantt.setWorkTime({
    customWeeks: {
        period1: {
            from: new Date(2025, 3, 1),
            to: new Date(2025, 3, 10),
            hours: false,
        },

        period2: {
            from: new Date(2025, 3, 12),
            to: new Date(2025, 5, 1),
            hours: false,
        },

    }
});
~~~


**Related example:** [Using `customWeeks` to make all days in the calendar days-off](https://snippet.dhtmlx.com/i0o74zg7)


### Сброс рабочего времени {#unsetworktime}

Вы можете удалить настройку рабочего времени с помощью метода [unsetWorkTime](api/method/unsetworktime.md):

~~~js
// изменяет рабочее время рабочих дней с ["8:00-17:00"] на ["8:00-12:00"]
gantt.setWorkTime({ hours: ["8:00-12:00"] });
// удаляет настройку рабочего времени
gantt.unsetWorkTime({ hours: ["8:00-12:00"] });
~~~


### Проверка рабочего времени {#checkworktime}

Чтобы узнать, попадает ли определённая дата в рабочее время, используйте метод [isWorkTime](api/method/isworktime.md):

~~~js
// отмечает 1 января 2025 года как нерабочий день
gantt.setWorkTime({ date: new Date(2025, 0, 1), hours: false });
gantt.isWorkTime(new Date(2025, 0, 1)); // -> false  /*!*/

// отмечает 15 марта 2025 года как рабочий день с 8:00 до 17:00
gantt.setWorkTime({ date: new Date(2025, 2, 15), hours: ["8:00-17:00"] });
gantt.isWorkTime(new Date(2025, 2, 15, 10, 0), "hour"); // -> true  /*!*/
gantt.isWorkTime(new Date(2025, 2, 15, 8, 0), "hour"); // -> false  /*!*/
~~~


[Correct task position on drag](https://docs.dhtmlx.com/gantt/samples/09_worktime/05_adjust_to_worktime.html)


### Получение рабочего времени {#getworktime}

Чтобы получить рабочие часы для определённой даты, используйте метод [getWorkHours](api/method/getworkhours.md):

~~~js
gantt.getWorkHours(new Date(2025, 3, 30)); // -> ["8:00-17:00"]
~~~

Чтобы найти ближайший рабочий день к заданной дате, используйте метод [getClosestWorkTime](api/method/getclosestworktime.md):

~~~js
gantt.getClosestWorkTime(new Date(2025, 3, 30));
~~~


### Повторяющееся рабочее время {#repeat_worktime}

Иногда необходимо задать рабочее время, которое повторяется только в определённые дни (например, последний пятничный день месяца - короткий день, либо 25 декабря - выходной) на всём протяжении проекта.

В настоящее время dhtmlxGantt не предоставляет встроенных настроек для такого типа повторяющегося рабочего времени. Поддерживаются только:

- задание рабочего времени по дню недели (понедельник, вторник и т.д.)
- задание рабочего времени для конкретных дат (например, 4 июня 2025)
- переопределение правил рабочего времени для диапазонов дат (например, с 1 июня по 1 сентября 2025)

Таким образом, если у вас есть исключения из правил рабочего времени, вам нужно вручную определить подходящие даты и применить настройки рабочего времени к каждой дате отдельно.

Например, если ваш проект рассчитан на 5 лет и вы хотите, чтобы 1 января был выходным, а последний пятничный день каждого месяца - коротким, можно явно указать выходные 1 января следующим образом:

~~~js
gantt.setWorkTime({ hours: false, date: new Date(2025, 0, 1) });
gantt.setWorkTime({ hours: false, date: new Date(2026, 0, 1) });
gantt.setWorkTime({ hours: false, date: new Date(2027, 0, 1) });
gantt.setWorkTime({ hours: false, date: new Date(2028, 0, 1) });
gantt.setWorkTime({ hours: false, date: new Date(2029, 0, 1) });
~~~

Вот пример, как отметить последний пятничный день каждого месяца как короткий день на протяжении всего проекта:

~~~js
const lastFridayOfMonth = (date) => {
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    if (lastDay.getDay() < 5) {
        lastDay.setDate(lastDay.getDate() - 7);
    }

    lastDay.setDate(lastDay.getDate() - (lastDay.getDay() - 5));

    return lastDay;
};

const projectStart = new Date(2025, 5, 1);
const projectEnd = new Date(2026, 5, 1);
let currentDate = new Date(projectStart);

while (currentDate <= projectEnd) {
    const lastFriday = lastFridayOfMonth(currentDate);
    gantt.setWorkTime({ hours: ["8:00-12:00", "13:00-15:00"], date: lastFriday });
    currentDate = gantt.date.add(currentDate, 1, "month");
}
~~~


### Подсветка нерабочего времени {#color_dayoff_times}

Чтобы выделить нерабочее время на диаграмме, используйте шаблон [timeline_cell_class](api/template/timeline_cell_class.md):

~~~js
gantt.templates.timeline_cell_class = (task, date) => 
    !gantt.isWorkTime({ task, date }) ? "week_end" : "";
~~~


[Custom working days and time](https://docs.dhtmlx.com/gantt/samples/09_worktime/04_custom_workday_duration.html)


Подробнее смотрите в статье [Выделение временных слотов](guides/highlighting-time-slots.md).

:::note
Если вы хотите скрыть нерабочее время, ознакомьтесь с методом, описанным в [Скрытие временных единиц на шкале](guides/custom-scale.md).
:::

## Несколько календарей рабочего времени {#multipleworktimecalendars}

Помимо глобальных настроек рабочего времени, Gantt поддерживает создание нескольких календарей рабочего времени. Их можно назначать отдельным задачам или группам задач.

### Создание рабочего календаря {#createcalendar}

Вы можете создать новый экземпляр календаря с помощью метода [createCalendar](api/method/createcalendar.md).

Есть два способа использования этого метода:

- Вызов без параметров создаёт календарь с круглосуточным рабочим временем, 7 дней в неделю:

~~~js
const calendar = gantt.createCalendar();
~~~

- Если вы хотите создать новый календарь на основе существующего, но с другими параметрами, передайте существующий календарь как параметр в метод [createCalendar](api/method/createcalendar.md):

~~~js
const newCalendar = gantt.createCalendar(calendar);
~~~

Изначально объект календаря не связан с Gantt и не будет влиять на поведение, пока вы не добавите его в Gantt.

### Добавление рабочего календаря в Gantt {#addcalendar}

После создания календаря его необходимо добавить в Gantt с помощью метода [addCalendar](api/method/addcalendar.md). Есть два варианта:

- Добавить существующую конфигурацию календаря:

~~~js
const calendarId = gantt.addCalendar(calendar);
~~~

- Или задать новую конфигурацию календаря, включая id календаря и объект **worktime** с рабочими днями и часами:

~~~js
const calendarId = gantt.addCalendar({
    id: "custom", // необязательно
    worktime: {
        hours: ["8:00-17:00"],
        days: [1, 1, 1, 1, 1, 1, 1]
    }
});
~~~

:::note
Этот вариант также можно использовать для создания календаря.
:::

### Настройка разных рабочих часов для разных периодов {#rules_for_periods}

Начиная с версии 7.1, можно задавать разные правила рабочего времени для различных периодов внутри одного календаря. Например, вы можете применить отдельное расписание для зимних месяцев при добавлении календаря в Gantt. Для этого используйте свойство **customWeeks** метода [addCalendar](api/method/addcalendar.md):

~~~js
const calendarId = gantt.addCalendar({
    id: "global", // необязательно
    worktime: {
        hours: ["8:00-17:00"],
        days: [1, 1, 1, 1, 1, 1, 1],
        customWeeks: {
            winter: {
                from: new Date(2025, 11, 1), // 1 декабря 2025
                to: new Date(2026, 2, 1), // 1 марта 00:00 2026
                hours: ["9:00-13:00", "14:00-16:00"],
                days: [1, 1, 1, 1, 0, 0, 0]
            }
        }
    }
});
~~~


[Different worktimes for different time periods](https://docs.dhtmlx.com/gantt/samples/09_worktime/12_calendar_ranges.html)


### Изменение рабочих часов {#change_worktime}

Вы можете обновить рабочие часы для определённых дней в календаре с помощью метода [setWorkTime()](api/method/setworktime.md):

~~~js
const calendar = gantt.getCalendar("custom");
calendar.setWorkTime({ day: 6, hours: ["8:00-12:00"] });
calendar.setWorkTime({ date: new Date(2025, 0, 1), hours: ["8:00-12:00"] });
~~~

### Получение календарей {#multipleworktimecalendars}

Существует несколько способов получить объекты рабочих календарей для дальнейшего использования.

#### Получение глобального календаря Gantt {#getglobalcalendar}

Чтобы получить глобальный объект календаря Gantt, используйте метод [getCalendar](api/method/getcalendar.md):

~~~js
const calendar = gantt.getCalendar(id);
~~~

Объект *calendar* является экземпляром интерфейса [calendar](api/other/calendar.md).

Доступ к календарю по умолчанию (глобальные настройки) осуществляется с помощью предопределённого id **"global"**:

~~~js
const globalSettings = gantt.getCalendar("global");
~~~

Этот календарь используется [методами рабочего времени](guides/working-time.md#globalsettings), если не указан другой календарь. По умолчанию он назначается задачам.

#### Получение текущего календаря задачи {#gettaskcalendar}

Чтобы получить календарь рабочего времени, назначенный конкретной задаче, используйте метод [getTaskCalendar](api/method/gettaskcalendar.md), передав объект задачи:

~~~js
const task = gantt.getTask(taskId);
const calendar = gantt.getTaskCalendar(task);

if (calendar.isWorkTime(date)) {
    alert("TaskWorkTime");
}
~~~


[Task level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/06_task_calendars.html)


Если рабочее время отключено в настройках Gantt, этот метод возвращает календарь с рабочим временем 24/7.

### Использование глобальных методов для работы с календарями {#globalmethodsforcalendars}

[Методы рабочего времени](guides/working-time.md#globalsettings) объекта Gantt позволяют вычислять длительность задачи без необходимости вручную обращаться к её календарю.

Эти методы принимают объект с включённым свойством "task".

- [**gantt.isWorkTime**](api/method/isworktime.md)

~~~js
if (gantt.isWorkTime({ date: date, task: task })) {
    alert(`Work time of a task: ${task.text}`);
}
~~~

Это эквивалентно:

~~~js
const calendar = gantt.getTaskCalendar(task);

if (calendar.isWorkTime({ date: date })) {
    alert(`Work time of a task: ${task.text}`);
}
~~~

- [**gantt.calculateEndDate**](api/method/calculateenddate.md)

~~~js
const endDate = gantt.calculateEndDate({  
    start_date: date, duration: duration, task: task  
});
// или
const endDate = gantt.calculateEndDate(task);
~~~

- [**gantt.calculateDuration**](api/method/calculateduration.md)

~~~js
const duration = gantt.calculateDuration({  
    start_date: start, end_date: end, task: task  
});
// или
const duration = gantt.calculateDuration(task);
~~~

- [**gantt.getClosestWorkTime**](api/method/getclosestworktime.md)

~~~js
const closestTime = gantt.getClosestWorkTime({ date: date, task: task });
~~~

### Получение всех календарей Gantt {#getallcalendars}

Чтобы получить все календари, добавленные в Gantt (включая глобальный и назначенные задачам), используйте метод [getCalendars](api/method/getcalendars.md):

~~~js
const calendars = gantt.getCalendars();
~~~

Этот метод возвращает массив объектов интерфейса [Calendar](api/other/calendar.md).

### Удаление календарей {#deletecalendar}

Если календарь больше не нужен, его можно удалить с помощью метода [deleteCalendar](api/method/deletecalendar.md), передав его id:

~~~js
// добавление календаря
gantt.addCalendar({
    id: "custom",
    worktime: {
        hours: ["8:00-17:00"],
        days: [1, 1, 1, 1, 1, 1, 1]
    }
});

// удаление календаря
gantt.deleteCalendar("custom");
~~~

## Назначение календаря задаче {#assigningcalendartoresource}

Чтобы назначить рабочий календарь задаче, сначала добавьте календарь с помощью id и объекта **worktime**, в котором задаются рабочие дни и часы:

~~~js
gantt.addCalendar({
    id: "custom", // необязательно
    worktime: {
        hours: ["8:00-17:00"],
        days: [1, 1, 1, 1, 1, 1, 1]
    }
});
~~~

Затем укажите id этого календаря в атрибуте **"calendar_id"** объекта задачи:

~~~js
{
    id: 2, text: "Task #1", start_date: "02-04-2025", duration: 8,
    calendar_id: "custom" /*!*/
}
~~~

Вы можете изменить имя свойства задачи, используемого для привязки календаря, с помощью опции конфигурации [calendar_property](api/config/calendar_property.md):

~~~js
gantt.config.calendar_property = "property_name";
~~~


[Task level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/06_task_calendars.html)


## Назначение календаря ресурсу {#assigningcalendartoresource}

:::info
Эта функциональность доступна только в PRO-версии.
:::

Также возможно назначить отдельный рабочий календарь задачам, которым требуются определённые ресурсы, такие как сотрудники или оборудование.

Например, вы можете установить индивидуальные календари задачам в зависимости от назначенного пользователя. Процесс включает следующие шаги:

- Определите свойство задачи, в котором будет храниться id ресурса, с помощью атрибута конфигурации [resource_property](api/config/resource_property.md). В приведённом ниже примере свойство **user** будет содержать id пользователей:

~~~js
gantt.config.resource_property = "user";
~~~

- Используйте опцию конфигурации [resource_calendars](api/config/resource_calendars.md) для добавления календарей для каждого пользователя, сгруппировав их в одном объекте:

~~~js
gantt.config.resource_calendars = {
    1 : gantt.addCalendar({
        worktime: {
            days: [0, 1, 1, 1, 1, 1, 0]
        }
    }),
    2 : gantt.addCalendar({
        worktime: {
            days: [1, 0, 0, 0, 0, 0, 1]
        }
    }),
    3 : gantt.addCalendar({
        worktime: {
            days: [0, 1, 1, 1, 0, 1, 1]
        }
    })
};
~~~

Этот объект сопоставляет id ресурсов в качестве ключей с id календарей, возвращаемыми методом [addCalendar](api/method/addcalendar.md) в качестве значений.

- Укажите атрибут **user** в объектах конфигурации задач. Значение должно соответствовать ключу нужного календаря в настройке **resource_calendars**:

~~~js
{ id: 1, user: 1, text: "Project #2", start_date: "01-04-2025", duration: 5 },
{ id: 2, user: 0, text: "Task #1", start_date: "02-04-2025", duration: 2 },
{ id: 3, user: 2, text: "Task #2", start_date: "11-04-2025", duration: 4 },
{ id: 4, user: 3, text: "Task #3", start_date: "13-04-2025", duration: 3 },
{ id: 5, user: 0, text: "Task #1.1", start_date: "02-04-2025", duration: 7 },
{ id: 6, user: 1, text: "Task #1.2", start_date: "03-04-2025", duration: 7 }
~~~


[Resource level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/07_resource_calendars.html)


:::note
Если у задачи назначены как пользовательский, так и ресурсный календарь, приоритет имеет пользовательский календарь и его настройки перекрывают настройки ресурсного календаря.
:::

### Объединение нескольких календарей {#mergingcalendars}

Начиная с версии 7.0, появилась возможность объединять несколько календарей в один.


Например, если у задачи назначено два ресурса с разными рабочими календарями - один работает с 9:00 до 15:00, другой с 12:00 до 17:00 - объединение этих календарей даст общий рабочий интервал с 12:00 до 15:00.

Включение опции конфигурации [dynamic_resource_calendars](api/config/dynamic_resource_calendars.md) в *true* активирует эту функцию автоматически:

~~~js
gantt.config.dynamic_resource_calendars = true;
~~~


[Merge work Calendars of different resources](https://docs.dhtmlx.com/gantt/samples/09_worktime/10_merge_calendars.html)


Также вы можете объединять календари вручную с помощью метода [mergeCalendars](api/method/mergecalendars.md):

~~~js
const johnCalendarId = gantt.addCalendar({
    worktime: {
        hours: ["0:00-24:00"],
        days: [0, 1, 1, 1, 1, 1, 0]
    }
});

const mikeCalendarId = gantt.addCalendar({
    worktime: {
        hours: ["8:00-12:00", "13:00-17:00"],
        days: [0, 1, 1, 1, 1, 1, 0]
    }
});

const joinedCalendar = gantt.mergeCalendars(
    gantt.getCalendar(mikeCalendarId),
    gantt.getCalendar(johnCalendarId)
);
~~~

Подробнее о том, как объединяются рабочие часы, смотрите в статье [mergeCalendars()](api/method/mergecalendars.md).

## Назначение календаря проекту {#assigningcalendartoproject}

:::info
Эта функциональность доступна только в PRO-версии.
:::

Вы можете назначить рабочий календарь не только отдельным задачам или ресурсам, но и проектам, чтобы задачи наследовали календарь, назначенный их родительскому проекту.

Логика наследования работает следующим образом:

- Когда календарь назначен подпроекту с задачами, все его задачи наследуют этот календарь.
- Если у задачи назначен собственный календарь, используется именно он, а не календарь родительского проекта.

Чтобы включить эту возможность, установите опцию конфигурации [inherit_calendar](api/config/inherit_calendar.md) в *true*. По умолчанию опция отключена.

~~~js
gantt.config.inherit_calendar = true;
~~~

- Если *true*, задачи без назначенного календаря будут использовать календарь их родительского проекта (который также может наследовать календарь от своего родителя).
- Если *false*, такие задачи будут использовать глобальный календарь.

В приведённом ниже примере задачи по умолчанию наследуют календари от родительских проектов. Задачи с собственными календарями используют именно их. Например, "Task #2.2" и "Task #3" используют календарь "Full week", в отличие от своих проектов-родителей:

![Рабочий календарь для проекта](/img/working_calendar_project.png)


[Project level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/08_project_calendars.html)


## Динамическое изменение календаря {#changingcalendardynamically}

Начиная с версии 7.0, Gantt автоматически отслеживает изменения календаря задачи и обновляет время выполнения задачи соответствующим образом.

При необходимости вы можете вручную скорректировать расписание задачи при изменении её календаря. Например, изменение календаря можно обработать через lightbox:

~~~js
const updateTaskTiming = (task) => {
    task.start_date = gantt.getClosestWorkTime({
        dir: "future",
        date: task.start_date,
        unit: gantt.config.duration_unit,
        task: task
    });
    task.end_date = gantt.calculateEndDate(task);
};

gantt.attachEvent("onLightboxSave", (id, task, is_new) => {
    updateTaskTiming(task);
    return true;
});
~~~

Кроме того, вы можете инициировать пересчёт всех задач при необходимости:

~~~js
gantt.batchUpdate(() => {
    gantt.eachTask((task) => {
        task.start_date = gantt.getClosestWorkTime({
            dir: "future",
            date: task.start_date,
            unit: gantt.config.duration_unit,
            task: task
        });
        task.end_date = gantt.calculateEndDate(task);
        gantt.updateTask(task.id);
    });
});
~~~

**Related example:** [Переключение настроек рабочего времени и перенос задачи на рабочую дату](https://snippet.dhtmlx.com/6cvo9dy9)

**Related example:** [Переключение настроек рабочего времени и пересчёт дат окончания задач](https://snippet.dhtmlx.com/wb8vc82p)

