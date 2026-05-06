---
title: "Расчёт рабочего времени"
sidebar_label: "Расчёт рабочего времени"
---

# Расчет рабочего времени

По умолчанию dhtmlxGantt вычисляет длительность задач в календарном времени. Предполагается, что итоговая длительность задач может включать выходные и праздники.

:::note
См. статью [Отображение даты окончания задачи и включительные даты окончания](guides/loading.md#taskenddatedisplayampinclusiveenddates), чтобы узнать формат даты окончания задачи.
:::

## Включение расчета рабочего времени

Чтобы обеспечить вычисление длительности задач во времени рабочего времени, используйте опцию [work_time](api/config/work_time.md):

**Включение режима, при котором длительность задач рассчитывается во временном интервале рабочего времени**
~~~js
gantt.config.work_time = true;     // исключает нерабочее время из вычислений /*!*/
gantt.config.skip_off_time = true; /*!*/   // скрывает нерабочее время на диаграмме
 
gantt.init("gantt_here");
~~~

Обратите внимание, что конфигурационная опция [skip_off_time](api/config/skip_off_time.md) доступна только в PRO-версии.

[Длительность включает только рабочие дни](https://docs.dhtmlx.com/gantt/samples/09_worktime/02_working_days.html)

:::note
В зависимости от значения [duration_unit](api/config/duration_unit.md) dhtmlxGantt вычисляет длительность задач в разных единицах времени (например, при duration_unit = "hour" длительность считается в рабочих часах).
:::

![calculating_different_time](/img/calculating_different_time.png)

## Длительность задачи в десятичном формате {#taskdurationindecimalformat}

:::info
Эта функциональность доступна только в PRO-издании.
:::

Начиная с версии v6.3 dhtmlxGantt позволяет задавать длительности задач в десятичном формате ("2.5 days", 

"0.5 hours", "3.75 hours") через модуль [Duration Formatter](guides/formatters-ext.md).

Важно помнить, что внутри Gantt длительность задач всегда хранится как целые значения. 

В то же время предоставляемый модуль позволяет преобразовывать длительность задач из введённого пользователем формата в формат, который хранится в Gantt (например, вместо введённого "1.5 hours" Gantt сохранит количество минут — `90`). Кроме того, сохранённые значения можно конвертировать в читаемый формат (из `12` hours в "0.5 days").

![decimal_duration](/img/decimal_duration.png)

:::note
Длительность задач может быть представлена как доля часа, дня или любой другой единицы, поддерживаемой конфигурацией [duration_unit](api/config/duration_unit.md), за исключением минут.
:::

### Реализация десятичного формата

Чтобы обеспечить отображение длительности задач в десятичном формате, следуйте нижеприведённой логике:

- установите [duration_unit](api/config/duration_unit.md) в minute
 
~~~js
gantt.config.work_time = true;
gantt.config.duration_unit = "minute"; /*!*/
~~~

Обратите внимание, что длительности задач следует хранить в меньшей единице, чем единицы значений, отображаемых в десятичном формате. Проще говоря:

- если вы хотите, чтобы пользователь мог задавать длительности как дробь часа (например, "0.5 hours"), вам нужно установить [duration_unit](api/config/duration_unit.md) в minute

- если вы хотите, чтобы пользователь мог задавать длительности как дробь дня, вам нужно установить [duration_unit](api/config/duration_unit.md) в hour. В этом случае пользователи смогут ввести длительность задачи как "0.5 day", но "0.5 hour" будет округлена до 1 часа, поскольку длительность будет храниться в целочисленных часах.

:::note
По умолчанию даты задач привязаны к шкале времени. Если у вас шкала времени в днях, возможно, стоит отключить её, чтобы можно было перетаскивать задачу на другие часы внутри дня.

Чтобы включить это перетаскивание, необходимо отключить [round_dnd_dates](api/config/round_dnd_dates.md) и задать подходящее значение [time_step](api/config/time_step.md).
:::

Например:

~~~js
// глобальный шаг времени 15 минут, требует использования "minute" как единиц длительности
gantt.config.time_step = 15;
gantt.config.round_dnd_dates = false;
~~~

или 

~~~js
// глобальный шаг времени равен одному часу,
// такое значение может использоваться при установке duration_unit в "hour"
gantt.config.time_step = 60;
gantt.config.round_dnd_dates = false;
~~~

- создайте объект *formatter* для форматирования длительности задач:

~~~js
// форматирование длительности
const formatter = gantt.ext.formatters.durationFormatter({
    enter: "day", 
    store: "minute", // duration_unit
    format: "day",
    hoursPerDay: 8,
    hoursPerWeek: 40,
    daysPerMonth: 30
});
~~~

- добавьте объект *formatter* в колонку "Duration", определив функцию шаблона, которая будет возвращать *отформатированную длительность задачи*, через атрибут **template** в параметрах колонок:

~~~js
gantt.config.columns = [
    { name: "text", tree: true, width: 170, resize: true, editor: textEditor },
    { name: "start_date", align: "center", resize: true, editor: dateEditor },
    { name: "duration", label: "Duration", resize: true, align: "center",
        template: task => formatter.format(task.duration), width: 100 },
    { name: "add", width: 44 }
];
~~~

- добавьте объект *formatter* в секцию lightbox, указав свойство **formatter** для элемента управления **time**:

~~~js
gantt.config.lightbox.sections = [
    { name: "description", map_to: "text", type: "textarea", height: 70, focus: true },
    { name: "time", map_to: "auto", type: "duration", formatter: formatter }
];
~~~

- если включено inline-редактирование в Grid, также необходимо добавить объект *formatter* в объект durationEditor через атрибут **formatter**:

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
Если у вас уже есть Gantt с длительностями задач, сохранёнными в минутах, часах или любой другой единице, вы также можете использовать модуль [Duration Formatter] для отображения длительностей в десятичном формате.
:::

## Глобальные настройки

### Установка рабочего времени

По умолчанию рабочее время следующее:

- Рабочие дни: понедельник - пятница.
- Рабочие часы: 8:00 - 12:00, 13:00 - 17:00.

Чтобы изменить стандартное рабочее время, используйте метод [setWorkTime](api/method/setworktime.md):

~~~js title="Установка собственного рабочего времени"
// изменяет рабочее время рабочих дней
gantt.setWorkTime({ hours: ["9:00-18:00"] });

// делает каждую пятницу выходным днем
gantt.setWorkTime({ day: 5, hours: false });

// изменяет рабочее время для пятниц и суббот
gantt.setWorkTime({ day: 5, hours: ["8:00-12:00"] });
gantt.setWorkTime({ day: 6, hours: ["8:00-12:00"] });

// делает конкретную дату рабочим днем 
gantt.setWorkTime({ date: new Date(2025, 2, 31) });

// делает конкретную дату выходным днем
gantt.setWorkTime({ date: new Date(2025, 0, 1), hours: false });
~~~

**Связанный пример**: [Custom working days and time](https://docs.dhtmlx.com/gantt/samples/09_worktime/04_custom_workday_duration.html)

### Установка рабочих часов для ночной смены

Настройки рабочего времени для атрибута **hours** объекта конфигурации метода [setWorkTime](api/method/setworktime.md) должны задаваться от меньшего интервала к большему, то есть в возрастающем порядке. В случае, если настройки времени заданы по убыванию, часть из них будет проигнорирована. В примере ниже промежутки времени после `18:00` будут проигнорированы:

~~~js
// ниже приведенные настройки неверны 
gantt.setWorkTime({ day: 5, hours: ["16:00-18:00", "14:00-15:00", "08:00-10:00"] });
gantt.setWorkTime({ day: 5, hours: ["16:00-18:00", "00:00-04:00", "05:00-06:00"] });
~~~

Если вам нужно задать настройки рабочего времени для ночной смены, задавайте их следующим образом:

- в течение 24 часов для первого дня
- в течение 24 часов для следующего дня

Например:

~~~js
gantt.setWorkTime({ day: 5, hours: ["16:00-18:00"] });
gantt.setWorkTime({ day: 6, hours: ["00:00-04:00", "05:00-06:00"] });
~~~

### Настройка правил рабочего времени

Существует возможность настраивать разные правила рабочего времени для разных периодов времени с использованием атрибута **customWeeks** метода [setWorkTime](api/method/setworktime.md). Например, можно изменить стандартное рабочее время на зимние месяцы:

~~~js
//изменение рабочего времени для зимних месяцев
gantt.setWorkTime({
    customWeeks: {
        winter: {
            from: new Date(2025, 11, 1), // 1 декабря 2025 года
            to: new Date(2026, 2, 1), // 1 марта 2026 года 00:00
            hours: ["9:00-13:00", "14:00-16:00"],
            days: [1, 1, 1, 1, 0, 0, 0]
        }
    }
});
~~~

Чтобы задать рабочее время не только по часам, но и с учётом минут (например, "8:15-12:45"), установите конфигурацию [duration_unit](api/config/duration_unit.md) в *"minute"*.

~~~js title="Установка собственного рабочего времени вплоть до минут"
gantt.config.duration_unit = "minute";

// устанавливает рабочее время вплоть до минут
gantt.setWorkTime({ hours: ["8:15-12:45"] });
~~~

:::note
Формат рабочего времени, который применялся до версии 7.0, продолжит работать как и раньше:

~~~js
gantt.setWorkTime({ hours: [9, 18] });
~~~
:::

### Перезапись правила рабочего времени

Обратите внимание, что при каждом следующем вызове метода для той же даты предыдущее правило рабочего времени будет перезаписано. Поэтому, если необходимо снять какое-либо правило, вызывайте метод [setWorkTime](api/method/setworktime.md) с другой конфигурацией:

~~~js
gantt.setWorkTime({ hours: ["8:00-12:00"] });
gantt.setWorkTime({ hours: ["13:00-17:00"] });
// результат вышеуказанных команд будет работать как рабочее время 13:00-17:00
// и не будет смешивать оба правила
~~~

### Установка пользовательских рабочих дней/выходных дней

Обратите внимание, что невозможно применить настройки рабочего времени, которые не включают рабочие дни/часы. Например, так:

~~~js
gantt.setWorkTime({ day: 0, hours: [] });
gantt.setWorkTime({ day: 1, hours: [] });
gantt.setWorkTime({ day: 2, hours: [] });
gantt.setWorkTime({ day: 3, hours: [] });
gantt.setWorkTime({ day: 4, hours: [] });
gantt.setWorkTime({ day: 5, hours: [] });
gantt.setWorkTime({ day: 6, hours: [] });
~~~

В результате Gantt проигнорирует применение метода к одному из рабочих дней, но рабочие часы останутся.

Если вы попытаетесь рассчитать ближайшее рабочее время или длительность от какой-либо даты, не будет ни такой даты, ни длительности. Это означает, что настройка такого календаря не имеет смысла. Даже если вы установите определённые даты с рабочими часами, работа будет некорректной, потому что Gantt может рассчитывать даты только в пределах диапазона дат, включающего рабочие дни/часы. Попытка расчёта дат за пределами диапазона приведёт к отсутствию даты и к различным ошибкам.

Если вы хотите создать календарь, в котором некоторые месяцы или даже годы будут состоять только из нерабочих дней, используйте настройку *customWeeks* метода **setWorkTime()**. Чтобы задать рабочие дни/часы в необходимом диапазоне, необходимо:

- разделить диапазон на периоды без рабочих часов
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

**Связанный пример** [Using `customWeeks` to make all days in the calendar days-off](https://snippet.dhtmlx.com/i0o74zg7)

### Установка календаря выходных

Чтобы скрыть выходной времени, используйте подход, описанный в статье - [Скрытие единиц времени на шкале](guides/custom-scale.md).
:::note
Чтобы скрыть выходной период, используйте приведённую в статье технику - [Скрытие единиц времени в масштабе](guides/custom-scale.md).
:::

## Несколько календарей рабочего времени {#multipleworktimecalendars}

Помимо глобальных настроек рабочего времени, Gantt позволяет создавать несколько календарей рабочего времени. Вы можете назначать их отдельным задачам или группам задач.

### Создание календаря рабочего времени

Новый экземпляр календаря можно создать с помощью метода [createCalendar](api/method/createcalendar.md).

Этот метод предполагает два возможных варианта:

- при вызове без параметров создаётся календарь полного времени: 24 рабочих часа в день, 7 дней в неделю 

~~~js
const calendar = gantt.createCalendar();
~~~

- если у вас уже есть готовый календарь и вы хотите использовать его для создания нового с другими опциями, вы можете передать ваш календарь в качестве параметра методу [createCalendar](api/method/createcalendar.md)

~~~js
const newCalendar = gantt.createCalendar(calendar);
~~~

Объект календаря изначально отсоединён от Gantt и не будет влиять, пока вы не добавите его в Gantt.

### Добавление календаря в Gantt

После создания календаря его нужно добавить в Gantt с помощью метода [addCalendar](api/method/addcalendar.md). Снова существуют два варианта:

- добавить существующую конфигурацию календаря 

~~~js
const calendarId = gantt.addCalendar(calendar);
~~~

- задать новую конфигурацию календаря, которая включает id календаря и объект **worktime** с рабочими днями и часами:

~~~js
const calendarId = gantt.addCalendar({
    id: "custom", // optional
    worktime: {
        hours: ["8:00-17:00"],
        days: [1, 1, 1, 1, 1, 1, 1]
    }
});
~~~

:::note
Вы также можете использовать эту опцию для создания календаря.
:::

### Установка разных рабочих часов для разных временны́х периодов {#rules_for_periods}

Начиная с v7.1, появилась возможность устанавливать разные правила рабочего времени для разных периодов внутри одного календаря. Например, можно применить отдельное расписание для зимних месяцев при добавлении календаря в Gantt. Для этого нужно использовать свойство **customWeeks** метода [addCalendar](api/method/addcalendar.md):

~~~js
const calendarId = gantt.addCalendar({
    id: "global", // optional
    worktime: {
        hours: ["8:00-17:00"],
        days: [1, 1, 1, 1, 1, 1, 1],
        customWeeks: {
            winter: {
                from: new Date(2025, 11, 1), // December 1st, 2025
                to: new Date(2026, 2, 1), // March 1st, 00:00, 2026
                hours: ["9:00-13:00", "14:00-16:00"],
                days: [1, 1, 1, 1, 0, 0, 0]
            }
        }
    }
});
~~~

**Связанный пример**: [Different worktimes for different time periods](https://docs.dhtmlx.com/gantt/samples/09_worktime/12_calendar_ranges.html)

### Изменение рабочих часов

Вы можете изменить рабочее время для отдельных дней нужного календаря через метод [setWorkTime()](api/method/setworktime.md):

~~~js
const calendar = gantt.getCalendar("custom");
calendar.setWorkTime({ day: 6, hours: ["8:00-12:00"] });
calendar.setWorkTime({ date: new Date(2025, 0, 1), hours: ["8:00-12:00"] });
~~~

### Получение календарей

Вы можете получить объекты календарей работы и работать с ними позднее. Есть несколько доступных вариантов, которые описаны ниже.

#### Получение глобального календаря Gantt

Чтобы получить объект глобального календаря Gantt с помощью метода [getCalendar](api/method/getcalendar.md):

~~~js
const calendar = gantt.getCalendar(id);
~~~

Объект *calendar* является экземпляром интерфейса [calendar](api/other/calendar.md).

Глобальный экземпляр календаря (глобальные настройки) доступен по заранее заданному id **"global"**:

~~~js
const globalSettings = gantt.getCalendar("global");
~~~

Этот календарь используется методами рабочих часов guidances/working-time.md#global-settings) по умолчанию, если другой календарь не указан. Он назначается задачам по умолчанию.

#### Получение текущего календаря задачи

Чтобы получить объект рабочего календаря, назначенного конкретной задаче, примените метод [getTaskCalendar](api/method/gettaskcalendar.md). Вам нужно передать объект задачи этому методу:

~~~js
const task = gantt.getTask(taskId);
const calendar = gantt.getTaskCalendar(task);

if (calendar.isWorkTime(date)) {
    alert("TaskWorkTime");
}
~~~

**Связанный пример**: [Task level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/06_task_calendars.html)

Если рабочее время выключено в конфигурации gantt, метод вернёт календарь 24/7.

### Использование глобальных методов для доступа к календарям

Методы [work time](guides/working-time.md#global-settings) объекта Gantt можно использовать для вычисления длительности времени конкретной задачи без обращения к её календарю вручную.

В этом случае методы принимают объект-аргумент, где соответствующий объект "task" передаётся как одна из свойств.

- [**gantt.isWorkTime**](api/method/isworktime.md)

~~~js
if (gantt.isWorkTime({ date: date, task: task })) {
    alert(`Work time of a task: ${task.text}`);
}
~~~

Что эквивалентно:

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

### Получение всех календарей Gantt

Чтобы получить все календарь, добавленные в Gantt (как глобальный, так и те, что назначены отдельным задачам), используйте метод [getCalendars](api/method/getcalendars.md):

~~~js
const calendars = gantt.getCalendars();
~~~

Метод возвращает массив объектов интерфейса [Calendar](api/other/calendar.md).

### Удаление календарей

Если календарь больше не нужен, его можно легко удалить с помощью метода [deleteCalendar](api/method/deletecalendar.md). Нужно передать идентификатор календаря в этот метод:

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

## Назначение календаря задаче {#assigningcalendartotask}

Чтобы назначить задаче рабочий календарь, необходимо указать id календаря и объект **worktime** с рабочими днями и часами:

~~~js
gantt.addCalendar({
    id: "custom", // optional
    worktime: {
        hours: ["8:00-17:00"],
        days: [1, 1, 1, 1, 1, 1, 1]
    }
});
~~~

и затем задать id календаря как значение атрибута **"calendar_id"** в объекте задачи:

~~~js
{
    id: 2, text: "Task #1", start_date: "02-04-2025", duration: 8,
    calendar_id: "custom" /*!*/
}
~~~

Вы можете изменить имя свойства задачи, отвечающее за привязку календаря к задаче, через конфигурационный параметр [calendar_property](api/config/calendar_property.md):

~~~js
gantt.config.calendar_property = "property_name";
~~~

**Связанный пример**: [Task level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/06_task_calendars.html)

## Назначение календаря ресурсу {#assigningcalendartoresource}

:::info
Эта функциональность доступна только в PRO-версии.
:::

Также возможно назначить конкретный рабочий календарь задачам, требующим определённых ресурсов (людей, приборов и т. д.).

Например, можно задать индивидуальные календари для задач, в зависимости от пользователя, к которому прикреплена задача. Порядок действий будет следующим:

- определить свойство объекта задачи, которое будет хранить id ресурса через конфигурационный атрибут [resource_property]. В примере ниже свойство с именем **user** будет хранить id пользователей:

~~~js
gantt.config.resource_property = "user";
~~~

- использовать настройку [resource_calendars](api/config/resource_calendars.md), чтобы добавить нужный календарь для каждого пользователя и сгруппировать календари в один объект.

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

Объект содержит набор пар *ключ:значение*, где ключ — это id ресурса, а значение соответствует
id календарей, возвращаемых методом [addCalendar](api/method/addcalendar.md).

- укажите атрибут **user** в конфигурационных объектах задач.
В качестве значения этого атрибута используйте ключ необходимого календаря из объекта, определённого в конфигурации **resource_calendars**:

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
Обратите внимание: если у задачи есть как собственный календарь, так и календарь ресурса, собственный календарь имеет более высокий приоритет и переопределяет настройки календаря ресурса.
:::

### Объединение нескольких календарей {#mergingcalendars}

Начиная с v7.0, появилась возможность объединять несколько календарей в один. 


Например, вы хотите задать двух или более ресурсов с разными рабочими календарями для одной задачи. Часы первого — с 9:00 до 15:00, часы другого — с 12:00 до 17:00. В результате их объединения вы получите один календарь с рабочими часами с 12:00 до 15:00.

Установка конфигурации [dynamic_resource_calendars](api/config/dynamic_resource_calendars.md) в true автоматически активирует эту возможность:

~~~js
gantt.config.dynamic_resource_calendars = true;
~~~

**Связанный пример**: [Merge work Calendars of different resources](https://docs.dhtmlx.com/gantt/samples/09_worktime/10_merge_calendars.html)

Но можно также объединять календари вручную с помощью метода [mergeCalendars](api/method/mergecalendars.md):

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

Узнайте логику объединения рабочих часов в статье [mergeCalendars()](api/method/mergecalendars.md).

## Назначение календаря проекту

:::info
Эта функциональность доступна только в PRO-версии.
:::

Существует возможность задать календарь работы не только для конкретной задачи или ресурса, но и для проекта, чтобы задачи могли наследовать календарь, к которому привязан их родительский проект.

Логика наследования календаря задачей следующая:

- если пользователь назначает календарь для подпроекта с задачами, все его задачи будут использовать этот календарь;
- если у задачи будет назначен личный календарь, она будет использовать свой календарь, а не календарь родительского проекта.

Чтобы включить эту функциональность, необходимо установить конфигурационный параметр [inherit_calendar](api/config/inherit_calendar.md) в *true*. По умолчанию этот параметр отключён.

~~~js
gantt.config.inherit_calendar = true;
~~~

- Если *true*, задачи без назначенного календаря будут использовать календарь, назначенный их суммарному родителю (который в свою очередь может получить календарь от своего родителя).
- Если *false*, задачи без календаря будут использовать глобальный календарь.

По умолчанию в примере задачи наследуют календари от своих родительских проектов. Если у задачи другой календарь, будет использоваться этот календарь. Таким образом, "Task #2.2" и "Task #3" используют календари "Full week", отличающиеся от родительских проектов:

![Working calendar for project](/img/working_calendar_project.png)

**Связанный пример**: [Project level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/08_project_calendars.html)

## Динамическое изменение календаря

Начиная с v7.0, Gantt отслеживает изменение календаря задачи и автоматически пересчитывает время задач.

Однако вы можете вручную обновлять график выполнения задачи при изменении календаря. Например, календарь можно изменить через lightbox:

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

Или можно определить перерасчёт всех задач по требованию:

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

**Связанный пример**: [Toggle working time settings and move the task to the working date](https://snippet.dhtmlx.com/6cvo9dy9)

**Связанный пример**: [Toggle working time settings and recalculate the task's end dates](https://snippet.dhtmlx.com/wb8vc82p)

## Визуализация баров задач в дни/недели на основе рабочего времени

Начиная с версии 9.1 Gantt позволяет указать настройку `projection` в конфигурации объекта задачи. С помощью этого свойства можно задать положение и размер полос задач на шкалах Day и Week в зависимости от **рабочего времени**, а не от интервала 00:00-24:00.

Подробное описание возможностей проектирования шкал можно найти в соответствующем руководстве: [в связанном руководстве](guides/configuring-time-scale.md#workhourawaretaskbarsrenderingindayweekscales).