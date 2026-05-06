--- 
title: "Настройка шкалы"
sidebar_label: "Настройка шкалы"
---

# Настройка шкалы

![gantt_dates](/img/gantt_dates.png)

Конфигурацию шкал задают через свойство [scales](api/config/scales.md). Можно задать любое количество шкал, добавив объекты шкал в массив конфигурации **scales**:

~~~js
// единичная шкала на один день
gantt.config.scales = [
	{ unit: "day", step: 1, format: "%j, %D" }
];

// несколько шкал одновременно
gantt.config.scales = [
	{ unit: "month", step: 1, format: "%F, %Y" },
	{ unit: "week", step: 1, format: weekScaleTemplate },
	{ unit: "day", step: 1, format: "%D", css: daysStyle }
];
~~~

Можно настроить следующие аспекты шкалы времени (ось X):

1. [Единица](#timeunits)
2. [Диапазон](#range)
3. [Шаг](#timestep)
4. [Высота](#height)
5. [Формат](#dateformat)
6. [Стиль](#styling)

Также можно добавить [пользовательскую шкалу](#customtimeunits).

## Единицы времени {#timeunits}

![month_day_scale_units](/img/month_day_scale_units.png)

Чтобы задать единицу шкалы, используйте свойство **unit** в соответствующем объекте шкалы:

Возможные значения: "minute", "hour", "day" (по умолчанию), "week", "quarter", "month", "year".

~~~js
gantt.config.scales = [
	{ unit: "month", step: 1, format: "%F, %Y" },
	{ unit: "day", step: 1, format: "%j, %D" }
];

gantt.init("gantt_here");
~~~

[Обзор по месяцам](https://docs.dhtmlx.com/gantt/samples/03_scales/02_month_days.html)

## Диапазон {#range}

![day_scale_unit](/img/day_scale_unit.png)

### Настройки диапазона по умолчанию

Если явно не указать диапазон дат, Gantt использует даты загруженных задач и добавляет смещения до первой и после последней задачи на шкале. Смещение определяется настройками временной шкалы.
В зависимости от значения [scale_offset_minimal](api/config/scale_offset_minimal.md) оно будет либо единицей времени, заданной через атрибут [scales](api/config/scales.md) в поле **unit**, либо наименьшей из единиц шкалы времени.

Вы можете получить отображаемый диапазон дат программно, используя метод [getState](api/method/getstate.md).

~~~js
const state = gantt.getState();

console.log(state.min_date);
// -> Mon Jan 01 2025 00:00:00

console.log(state.max_date);
// -> Tue Jan 01 2026 00:00:00
~~~
Диапазон шкалы пересчитывается при отрисовке [gantt](api/method/render.md). Если пользователь перемещает задачу за пределы отображаемого диапазона времени, строка задачи будет видна как элемент ряда, но сам элемент бара не будет виден до полной перерисовки.

Чтобы автоматически подстроить шкалу, используйте конфигурацию [fit_tasks](api/config/fit_tasks.md).

~~~js
gantt.config.fit_tasks = true; 
gantt.init("gantt_here");
~~~

[Автоматическая настройка шкалы](https://docs.dhtmlx.com/gantt/samples/03_scales/08_scale_autoconfig.html)

### Установка диапазона дат явно {#explicit_date_range}

Альтернативно диапазон дат можно задать явно, используя конфигурационные параметры [start_date](api/config/start_date.md) и [end_date](api/config/end_date.md):

~~~js
gantt.config.start_date = new Date(2025, 02, 31);
gantt.config.end_date = new Date(2025, 03, 09);

gantt.init("gantt_here");
~~~

Они могут также быть указаны в вызове инициализации [gantt initialization](api/method/init.md):

~~~js
gantt.init("gantt_here", new Date(2025, 02, 31), new Date(2025, 03, 09));
~~~

[Определение отображаемого диапазона дат](https://docs.dhtmlx.com/gantt/samples/01_initialization/08_explicit_time_range.html)

Задачи, которые не помещаются в указанный интервал, не будут отображаться на диаграмме Ганта, если только они не [помечены как несогласованные](guides/unscheduled-tasks.md).

[Показ несогласованных задач](https://docs.dhtmlx.com/gantt/samples/01_initialization/19_tasks_without_dates.html)

#### Примечание {#note}

Если указаны и **start_date**, и **end_date**, и вы создадите задачу за пределами диапазона, задача исчезнет с диаграммы.
[Чтобы отображать задачу](guides/configuring-time-scale.md#tasksoutsidetimescale) в диаграмме используйте конфигурацию [show_tasks_outside_timescale](api/config/show_tasks_outside_timescale.md).

~~~js
gantt.config.start_date = new Date(2025, 02, 31);
gantt.config.end_date = new Date(2025, 03, 09);
gantt.config.show_tasks_outside_timescale = true;

gantt.init("gantt_here");
~~~

Если вы не используете эту конфигурацию, можно расширить диапазон:

~~~js
gantt.attachEvent("onLightboxSave", (id, task, is_new) => {
	const { start_date: taskStart, end_date: taskEnd } = task;
	const { start_date: scaleStart, end_date: scaleEnd } = gantt.config;

	// если задача выходит за пределы текущего диапазона времен
	if (scaleStart > taskEnd || scaleEnd < taskStart) {
		// обновить диапазон времен шкалы
		gantt.config.end_date = new Date(
			Math.max(taskEnd.valueOf(), scaleEnd.valueOf())
		);

		gantt.config.start_date = new Date(
			Math.min(taskStart.valueOf(), scaleStart.valueOf())
		);

		gantt.render();
	}

	return true;
});
~~~

Или добавьте валидацию в контроле светлого окна (lightbox):

~~~js
gantt.attachEvent("onLightboxSave", (id, task, is_new) => {
	const { start_date: taskStart, end_date: taskEnd } = task;
	const { start_date: scaleStart, end_date: scaleEnd } = gantt.config;

	// Проверить, выходит ли задача за диапазон
	if (scaleStart > taskEnd || scaleEnd < taskStart) {
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

### Динамическая настройка отображаемого диапазона {#dynamic_scale}

Существует несколько способов динамического изменения отображаемого диапазона "на лету":

- можно управлять диапазоном времени с помощью конфигураций **start_date / end_date**, но динамически подгонять их под загруженные задачи.

Это можно сделать, перерасчитывая диапазон шкалы через обновление конфигураций **start_date / end_date** каждый раз при перерисовке Gantt:

~~~js
gantt.attachEvent("onBeforeGanttRender", () => {
	const range = gantt.getSubtaskDates();
	const scaleUnit = gantt.getState().scale_unit;

	if (range.start_date && range.end_date) {
		gantt.config.start_date = gantt.calculateEndDate(
			range.start_date, -4, scaleUnit
		);

		gantt.config.end_date = gantt.calculateEndDate(
			range.end_date, 5, scaleUnit
		);
	}
});

gantt.init("gantt_here");
~~~

- чтобы «принудительно» перерисовать шкалу каждый раз, когда задача не помещается в существующий диапазон шкалы, установите свойство [fit_tasks](api/config/fit_tasks.md) в значение *true*:

~~~js
gantt.config.fit_tasks = true; 
gantt.init("gantt_here");
~~~

В случае, когда оба параметра **start_date** и **end_date** заданы, необходимо [использовать один из описанных выше вариантов](#note) для корректной работы свойства **fit_tasks**.

- также можно автоматически изменять шкалу во время перетаскивания задачи, задавая необходимую логику внутри обработчика события [onTaskDrag](api/event/ontaskdrag.md):

~~~js
gantt.attachEvent("onTaskDrag", (id, mode, task, original) => {
	const state = gantt.getState();
	const minDate = state.min_date;
	const maxDate = state.max_date;

	const scaleStep = gantt.date.add(
		new Date(), state.scale_step, state.scale_unit
	) - new Date();

	let showDate;
	let repaint = false;

	if (mode == "resize" || mode == "move") {
		if (Math.abs(task.start_date - minDate) < scaleStep) {
			showDate = task.start_date;
			repaint = true;
		} else if (Math.abs(task.end_date - maxDate) < scaleStep) {
			showDate = task.end_date;
			repaint = true;
		}

		if (repaint) {
			gantt.render();
			gantt.showDate(showDate);
		}
	}
});
~~~

**Связанная пример** [Re-rendering Scale during Task Dragging]

### Отображение задач за пределами явного диапазона дат {#tasksoutsidetimescale}

Можно показывать задачи, которые не помещаются в [указанный диапазон дат](guides/configuring-time-scale.md#explicit_date_range) на диаграмме Ганта.

![tasks_outside_timescale](/img/tasks_outside_timescale.png) 

Для этого нужно задать конфигурационный параметр [show_tasks_outside_timescale](api/config/show_tasks_outside_timescale.md) в значение *true*:

~~~js
const data = {
	tasks: [
		{ id: 1, text: "Project #1", start_date: "01-09-2024", end_date: "02-09-2024" },
		{ id: 2, text: "Project #2", start_date: "01-09-2026", end_date: "02-09-2026" },
		{ id: 3, text: "Task #1", start_date: "03-02-2025", end_date: "05-02-2025" }
	],
	links: []
};

gantt.config.show_tasks_outside_timescale = true;

gantt.init("gantt_here", new Date(2025, 1, 1), new Date(2025, 1, 7));
~~~

[Задачи за пределами шкалы времени](https://docs.dhtmlx.com/gantt/samples/01_initialization/20_tasks_outside_timescale.html)

В результате задачи с идентификаторами "1" и "2" будут отображаться на странице как пустые строки в области временной шкалы и с указанными именами и датами начала в гриде.

## Шкала времени: шаг {#timestep}

![scale_step](/img/scale_step.png)

Чтобы задать шаг шкалы времени, используйте свойство **step** в соответствующем объекте шкалы:

~~~js
const monthScaleTemplate = (date) => {
	const dateToStr = gantt.date.date_to_str("%M");
	const endDate = gantt.date.add(date, 2, "month");

	return `${dateToStr(date)} - ${dateToStr(endDate)}`;
};

gantt.config.scales = [
	{ unit: "year", step: 1, format: "%Y" },
	{ unit: "month", step: 3, format: monthScaleTemplate },
	{ unit: "month", step: 1, format: "%M" }
];

gantt.init("gantt_here");
~~~

[Конфигурация шага для шкалы Quarter](https://docs.dhtmlx.com/gantt/samples/03_scales/03_full_year.html)

## Высота

![scale_height](/img/scale_height.png)

Чтобы задать высоту шкалы, используйте свойство [scale_height](api/config/scale_height.md):

~~~js
gantt.config.scale_height = 54; /*!*/

gantt.init("gantt_here");
~~~

[Дни часов](https://docs.dhtmlx.com/gantt/samples/03_scales/04_days.html)

Если у вас несколько шкал, они будут делить указанную высоту поровну. Например, если **scale_height** равна 60 пикселей и у вас 3 шкалы, каждая шкала будет иметь высоту 60 / 3 = 20 пикселей.

## Формат даты {#dateformat}

:::note
См. статью [Date Format Specification](guides/date-format.md), чтобы узнать доступные символы формата
:::

Чтобы задать формат шкалы, используйте свойство **format** в соответствующем объекте шкалы. Формат даты можно задать как строку:

~~~js
gantt.config.scales = [
	{ unit: "month", step: 1, format: "%F, %Y" },
	{ unit: "week", step: 1, format: weekScaleTemplate },
	{ unit: "day", step: 1, format: "%D", css: daysStyle }
];

gantt.init("gantt_here");
~~~

[Multiple scales](https://docs.dhtmlx.com/gantt/samples/03_scales/01_multiple_scales.html)

![multiple_scales](/img/multiple_scales.png)

Либо как функция, принимающая объект date в качестве параметра:

~~~js
gantt.config.scales = [
	{ unit: "day", step: 1, format: (date) => {
		return `<strong>Day ${dayNumber(date)}</strong><br/>${dateFormat(date)}`;
	}}
];
~~~

[Custom scales](https://docs.dhtmlx.com/gantt/samples/03_scales/06_custom_scales.html)

![scale_template](/img/scale_template.png)

## Стилизация {#styling}

![css_styling](/img/css_styling.png)

Чтобы задать стиль ячеек временной шкалы, используйте атрибут **css** в соответствующем объекте шкалы.

~~~js
function getWeekOfMonthNumber(date) {
	let adjustedDate = date.getDate() + date.getDay();
	let prefixes = ['0', '1', '2', '3', '4', '5'];
	return (parseInt(prefixes[0 | adjustedDate / 7]) + 1);
}

gantt.config.scales = [
	{ unit: "month", step: 1, format: "%F, %Y" },
	{ unit: "week", step: 1, format: (date) => { 
		return "Week #" + getWeekOfMonthNumber(date); 
	}},
	{ unit: "day", step: 1, format: "%j %D", css: (date) => { 
		if (!gantt.isWorkTime(date)) { 
			return "week-end"; 
		}
	}}
];
~~~

**Связанный пример** [Styling of cells of the time scale](https://snippet.dhtmlx.com/tadcjjk4)

Если свойство **css** не указано в конфигурации шкал, можно определить шаблон [scale_cell_class](api/template/scale_cell_class.md) для применения CSS-класса к первой шкале массива конфигурации **scales**.

~~~js
gantt.config.scales = [
	{ unit: "day", step: 1, format: "%d" },
	{ unit: "day", step: 1, format: "%D" },
	{ unit: "hour", step: 1, format: "%H" }
];

gantt.templates.scale_cell_class = date => gantt.isWorkTime(date) ? "" : "week_end";
~~~

**Связанный пример** [Styling of the first time scale](https://snippet.dhtmlx.com/vovv2wde)

Чтобы применить шаблон [scale_cell_class](api/template/scale_cell_class.md) ко всем шкалам временной шкалы, установите свойство [inherit_scale_class](api/config/inherit_scale_class.md) в значение *true*.

~~~js
gantt.config.inherit_scale_class = true; /*!*/
~~~

**Связанный пример** [Styling of all scales](https://snippet.dhtmlx.com/v6p55wdz)

Обратите внимание, что при использовании вычислений рабочее время [working time](guides/working-time.md) можно использовать [isWorkTime](api/method/isworktime.md) вместо жестко заданных значений:

~~~js
gantt.config.work_time = true;
gantt.templates.scale_cell_class = date => gantt.isWorkTime(date) ? "" : "week_end";
~~~

Подробнее о применении пользовательского стиля к области временной шкалы читайте в статье [Highlighting Time Slots](guides/highlighting-time-slots.md).

## Пользовательские временные единицы {#customtimeunits}

dhtmlxGantt позволяет определить пользовательские временные единицы и задать шаблон для меток в конфигурации шкалы.

Чтобы определить пользовательскую единицу, нужно определить 2 функции в объекте [Date](api/other/date.md): 

~~~js
Date gantt.date.<unit>_start(Date date);
Date gantt.date.add_<unit>(Date date, Integer increment);
~~~

- Первая функция должна возвращать начальную единицу времени для любой заданной даты (например, month_start для 14 февраля → 1 февраля).
- Вторая функция увеличивает дату на заданное число единиц продолжительности (например, 'date minus 2 days').

:::note
Обычно приращение имеет положительное значение, потому что ячейки шкалы создаются слева направо. Но создание первой ячейки реализовано справа налево, поэтому Gantt использует отрицательное значение приращения.
:::

### Пример 1

Давайте создадим единицу "fiscal_year" и предположим, что финансовый год заканчивается 31 января. Так можно задать новую единицу:

~~~js
const firstMonth = 1;
const firstDay = 1;

gantt.date.fiscal_year_start = date => {  
	let next = new Date(date);

	if (next.getMonth() < firstMonth || 
		(next.getMonth() === firstMonth && next.getDate() < firstDay)) {
		next = gantt.date.add(next, -1, "year");
	}

	next = gantt.date.year_start(next);
	next.setMonth(firstMonth);
	next.setDate(firstDay);

	return next;
};

gantt.date.add_fiscal_year = (date, inc) => gantt.date.add(date, inc, "year");
~~~

И затем использовать его в коде как:

~~~js
const dateToStr = gantt.date.date_to_str("%Y");

const fiscalYearLabel = date => dateToStr(gantt.date.fiscal_year_start(date));

gantt.config.scales = [
    { unit: "year", step: 1, format: "Calendar year %Y" },
    { unit: "fiscal_year", step: 1, format: fiscalYearLabel },
    { unit: "month", step: 1, format: "%M %Y" },
    { unit: "day", step: 1, format: "%d %M" }
];
~~~

### Пример 2

Вы можете разделить каждую ячейку "дня" на три ячейки "часов" с метками 00, 08, 16. Логика будет выглядеть так:

~~~js
gantt.date.hour_custom_start = date => date;

gantt.date.add_hour_custom = (date, inc) => { // inc зависит от "step"
    const nextDate = new Date(date);

    if (nextDate.getHours() % 8 !== 0) { // значение часа не равно 0, 8 или 16
        const diff = Math.abs(8 - nextDate.getHours());
        return gantt.date.add(nextDate, diff * inc, "hour");
    }

    return gantt.date.add(date, 8 * inc, "hour");
};

gantt.config.scales = [
    { unit: "day", step: 1, date: "%d %F" },
    { unit: "hour_custom", step: 1, date: "%H" }
];

gantt.config.date_grid = "%Y-%m-%d %H:%i";
~~~

**Связанный пример** [Custom hours on the scale](https://snippet.dhtmlx.com/zp13jovi)

![custom_scale](/img/custom_scale.png)

Рассмотрим, как Gantt создаёт первую ячейку "hour". Как видно из примера, самая ранняя задача начинается в 07:00. Но 7 не кратно восьми, поэтому Gantt следует правилу:

~~~js
if (nextDate.getHours() % 8 != 0) {
	const diff = Math.abs(8 - nextDate.getHours());  // 8 - 7 = 1
	return gantt.date.add(nextDate, diff * inc, "hour"); // 7 - 1 = 6
} 
~~~

- Gantt рассчитывает временной интервал между 08:00 и 07:00: 

*diff = 08:00 - 07:00 = 1 час*

- Затем Gantt находит произведение временного интервала и приращения: 

 *diff * inc = 1 час * (-1) = -1 час*

В качестве значения параметра *inc* Gantt использует отрицательное значение шага времени (*-1*).

- Наконец, Gantt добавляет полученное значение к времени самой ранней задачи: 

 *07:00 + (- 1 час) = 06:00*

Значение первой ячейки равно **06**.

Чтобы создать вторую ячейку "hour", Gantt следует той же логике, но использует положительное приращение

- *diff = 08:00 - 06:00 = 2 часа*

- *diff * inc = 2 hour * 1 = 2 hours*

- *06:00 + 2 hours = 08:00*

Значение второй ячейки равно **08**

На этом этапе видно, что 8 кратно восьми, поэтому значение следующей ячейки вычисляется как *08:00 + 8 часов = 16:00*, и так далее для остальных ячеек.

:::note
Эта логика работает, потому что мы не задаём [явный диапазон дат](#explicit_date_range).
:::

Для большего числа примеров смотрите статью How to add a custom scale -> Как добавить пользовательскую шкалу.

## Пользовательские временные диапазоны

В этой части приведены примеры того, как настраивать временную шкалу так, чтобы она отображала или скрывала несвоевременные диапазоны. Кроме того, приведён пример того, как скрыть ячейки с нерабочими часами с начала шкалы даже если включён режим skip_off_time.

Ниже пример для наиболее распространённого случая: рабочие часы с 08:00 до 12:00 и с 13:00 до 17:00.

~~~js
gantt.plugins({
	auto_scheduling: true,
});

gantt.config.work_time = true;
gantt.config.correct_work_time = true;
gantt.config.duration_unit = "minute";
gantt.config.duration_step = 1;
gantt.config.time_step = 1;
gantt.config.round_dnd_dates = false;

gantt.setWorkTime({ hours: ["8:00-12:00", "13:00-17:00"] }); /*!*/

gantt.date.day_custom_start = date => date; /*!*/

gantt.date.add_day_custom = (date, inc) => { /*!*/
	const nextDate = new Date(date); /*!*/

	if (nextDate.getHours() < 8) { /*!*/ // Утверждение 1
		const diff = 8 - nextDate.getHours(); /*!*/
		return gantt.date.add(nextDate, diff * inc, "hour"); /*!*/
	} /*!*/

	if (nextDate.getHours() === 8) { /*!*/ // Утверждение 2
		return gantt.date.add(nextDate, 9 * inc, "hour"); /*!*/
	} /*!*/
	
	if (nextDate.getHours() === 17) { /*!*/ // Утверждение 3
		return gantt.date.add(nextDate, 15 * inc, "hour"); /*!*/
	} /*!*/

	return gantt.date.add(date, 8 * inc, "hour"); /*!*/
}; /*!*/

gantt.config.scales = [
	{ unit: "day_custom", step: 1, date: "%d %H:00" },
];
~~~  

**Связанный пример** [Custom time spans](https://snippet.dhtmlx.com/qs411w7z)

Предположим, что самая ранняя задача начнётся в 08:00 1 апреля 2025 года, и рассмотрим, как Gantt будет добавлять смещения до этой задачи в зависимости от значения [gantt.config.skip_off_time](api/config/skip_off_time.md).

Начнём с конфигурации, которая скрывает нерабочие часы на шкале времени:

~~~js
gantt.config.skip_off_time = true;
~~~

В таком случае, чтобы создать первую ячейку "hour", Gantt будет уменьшать часы ранней задачи, пока время не достигнет рабочих часов предыдущего дня.

- Сначала Gantt вычтет 9 часов из 08:00 1 апреля 2025 года (Утверждение 2):


*08:00 - 9 часов = 23:00*

- Поскольку 23:00 — нерабочее время и не удовлетворяет ни одному из условий, Gantt снова уменьшит время, вычитая 8 часов:


*23:00 - 8 часов = 15:00*
- Полученное время - 15:00 31 марта 2025 года - считается рабочим временем.

Следовательно, значение первого элемента равно **31 15:00** и будет отображено в первой ячейке.

![with_skip_off_time](/img/with_skip_off_time.png)

Чтобы понять, как Gantt рассчитывает все остальные ячейки, давайте отключим **gantt.config.skip_off_time**:

~~~js
gantt.config.skip_off_time = false;
~~~

Как мы видели выше, первая ячейка шкалы времени будет иметь значение **31 15:00**. Но теперь количество пустых ячеек перед самой ранней задачей увеличится, потому что ячейки с нерабочими часами также будут отображаться на шкале.

Чтобы рассчитать значения этих ячеек, применяется следующая логика:

- 15:00 31 марта 2025 года — рабочее время, которое не удовлетворяет ни одному из условий. Таким образом, чтобы рассчитать значение второй ячейки, Gantt увеличит время на 8 часов:


*15:00 + 8 часов = 23:00* 
- 23:00 31 марта 2025 года — нерабочее время, которое тоже не удовлетворяет условиям. Значение третьей ячейки вычисляется аналогично:


*23:00 + 8 часов = 7:00*
- 7:00 1 апреля 2025 года — нерабочее время, которое меньше 8:00 (Утверждение 3). Значение следующей ячейки будет рассчитано так:

    - *diff = 08:00 - 07:00 = 1 час*
    - *diff * inc = 1 час * 1 = 1 час*
    - *07:00 + 1 час = 08:00*

08:00 1 апреля 2025 года — дата нашей самой ранней задачи.

![without_skip_off_time](/img/without_skip_off_time.png)

:::note
Все остальные ячейки создаются аналогичным образом.
:::

Как видно, если отключить свойство **skip_off_time**, Gantt может определить больше одной пустой ячейки перед задачей с минимальной датой. Если вы хотите, чтобы Gantt создавал только одну ячейку независимо от того, включено ли свойство, можно применить следующую логику:

~~~js
gantt.date.add_day_custom = (date, inc) => {
	// При включенном working_time и загруженных задачах,
	// вычислить дату для первой ячейки.
	// Идти слева направо начиная с минимальной даты,
	// найти ближайшую дату в рамках рабочих часов
	// и вычесть 1 час из этой даты 
	if (inc < 0 && gantt.getTaskByTime().length) {
		return gantt.calculateEndDate({ 
			start_date: date, duration: -1, unit: gantt.config._duration_unit 
		});
	}

	// начало рабочих часов (рабочий день);
	// вычислить, когда заканчивается рабочий день
	if (date.getHours() === 8) {
		return gantt.calculateEndDate(date, 8);
	}

	// конец рабочих часов (рабочий день);
	// вычислить, когда начинается следующий рабочий день
	if (date.getHours() === 17) {
		return gantt.date.add(date, 15 * inc, "hour");
	}

	// если задачи загружены, рассчитать рабочие даты для второй ячейки шкалы
	// если задач нет, рассчитать даты для всех ячеек шкалы
	date = gantt.date.add(date, 1 * inc, "day");
	gantt.date.day_start(date);
	date = gantt.getClosestWorkTime({ date, dir: "future" });

	return date;
};

gantt.config.scales = [
	{ unit: "day_custom", step: 1, date: "%d %H:%i" },
];

gantt.config.work_time = true;
gantt.config.skip_off_time = false; /*!*/
~~~

**Связанный пример** [Equal offset for custom scales](https://snippet.dhtmlx.com/g8fhwlp4)

Так шкала выглядит в режиме, когда нерабочие часы скрыты:

![custom_first_scale_cell](/img/custom_first_scale_cell.png)

А вот как она выглядит, когда они отображаются (отключено **gantt.config.skip_off_time**):

![first_scale_cell_without_skip_off_time](/img/disable_skip_off_time.png)

## Бесконечная прокрутка

Детальные примеры реализации бесконечной прокрутки во временной шкале можно найти в статье [Как сделать бесконечную прокрутку во временной шкале] -> Решения.

## Фиксированная ширина столбца

По умолчанию таймлайны имеют гибкую ширину. Они либо растягиваются, чтобы заполнить ширину контейнера, либо уменьшаются до значения, заданного в 
[min_column_width](api/config/min_column_width.md), пока не появится горизонтальная прокрутка.

Вы можете зафиксировать ширину нижнего элемента шкалы, установив свойство `column_width` в объекте шкалы:

~~~js
gantt.config.scales = [
	{ unit: "year", step: 1, format: "%Y" },
	{ unit: "month", step: 1, format: "%F" },
	{ unit: "day", step: 1, format: "%j", column_width: 60 } /*!*/
];

gantt.init("gantt_here");
~~~

[Fixed column width for the Time Scale](https://snippet.dhtmlx.com/gpq46mvq)

С этой настройкой каждая ячейка нижней шкалы ("day" в приведённом примере) будет ровно 60 пикселей в ширину, независимо от числа отрисованных столбцов:

- Если столбцов слишком мало, чтобы заполнить контейнер, пустое место останется справа.
- Если столбцов слишком много, появится горизонтальная прокрутка.

:::note
Обратите внимание, что `column_width` применяется только к нижнему элементу шкалы в `gantt.config.scales`; установка его на более высоких уровнях не влияет.
:::

Также учтите, что когда установлен `column_width`, к нижней шкале применяется не `min_column_width`.

## Отображение задач с учётом рабочего времени на шкалах Day/Week {#workhourawaretaskbarsrenderingindayweekscales}

Вы можете позиционировать и задавать размер бара задач согласно **рабочему времени** на краях ячейки шкалы, используя концепцию *проекции шкалы*.
Это позволяет задаче, охватывающей полный рабочий день (например, `09:00-17:00`), заполнить всю ячейку дня, что повышает читаемость плотных временных диаграмм.

![Scale projection](/img/scale_projection.png)

Чтобы задать режим проекции, используйте свойство `projection` в нижнем по отношению к шкале объекте:

~~~js
gantt.config.scales = [
	{unit: "month", step: 1, format:"%M %Y"},
	{unit: "week", step: 1, format: function (date) {
		const dateToStr = gantt.date.date_to_str("%d %M");
		const endDate = gantt.date.add(date, 7 - date.getDay(), "day");
		return dateToStr(date) + " - " + dateToStr(endDate);
	}},
    // применение режима проекции к дневной шкале 
	{unit: "day", step: 1, format: "%d", projection: {source: "fixedHours"}} /*!*/
];
~~~

[Связанный пример](https://docs.dhtmlx.com/gantt/samples/03_scales/15_scale_projection_modes.html)

Доступны три режима проекции:

- **режим по умолчанию**

В режиме по умолчанию, если проекция не задана, шкала использует абсолютное время (00:00-24:00) для позиционирования.

- **режим фиксированных часов**

В этом режиме для всех задач на временной шкале применяются фиксированные рабочие часы. По умолчанию часы берутся из глобального календаря работы.

~~~js
gantt.config.scales = [
	{
    	unit: "day", 
        step: 1, 
        format: "%d", 
        projection: {source: "fixedHours"} /*!*/
    }
];
~~~

Часы проекции можно задать явно:

~~~js
gantt.config.scales = [
	{
    	unit: "day", 
        step: 1,
        format: "%d", 
    	projection: {source: "fixedHours", hours: ["09:00-18:00"] } /*!*/
    }
];
~~~

- **режим календаря задач**

Этот режим предполагает использование календаря задач для расчета рабочих часов на каждой ячейке.  
Если у ячейки нет рабочих часов, шкала возвращается к абсолютному позиционированию для этой ячейки.

~~~js
gantt.config.scales = [
	{
    	unit: "day", 
        step: 1,
        format: "%d", 
    	projection: {source: "taskCalendar" } /*!*/
    }
];
~~~

### Детали

Обратите внимание, что режимы проекции предназначены для дневной и недельной шкал. Для других единиц проекция игнорируется и используется абсолютное позиционирование.

Перетаскивание поддерживает проекцию, но если применяется автопланирование (autoscheduling), логика планирования задачи по-прежнему зависит от таких настроек, как [correct_work_time](api/config/correct_work_time.md) и рабочих календарей, применённых к задачам.