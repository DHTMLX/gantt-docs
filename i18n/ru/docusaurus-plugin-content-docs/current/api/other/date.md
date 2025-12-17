---
sidebar_label: date
title: date config
description: "набор утилит для форматирования date"
---

# date

### Description

@short: Набор утилит для форматирования date

@signature: date: DateHelpers


### Details

Объект **date** предоставляет множество методов для работы с date:

<ul>
  <li>
  <b>add (date, number, unit): Date</b> - изменяет переданный date, добавляя или вычитая указанное количество единиц времени
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) date, который нужно изменить </li>
  <li><b><i>number</i></b> - (<i>number</i>) сколько единиц добавить (положительное число) или вычесть (отрицательное) </li>
  <li><b><i>unit</i></b> - (<i>string</i>) единица времени: 'minute', 'hour', 'day', 'week', 'month', 'year'. </li>
~~~js
//добавляет 1 год к указанному date: 29 июня 2019 -> 29 июня 2020
var newDate = gantt.date.add(new Date(2019, 05, 29), 1, 'year');
~~~
  </ul>
  </li>
  <li>
  <b>add_quarter (date, number): Date</b> - добавляет или вычитает указанное количество кварталов (по 3 месяца) к date
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) date для корректировки </li>
  <li><b><i>number</i></b> - (<i>number</i>) количество кварталов для добавления (положительное) или вычитания (отрицательное) </li> 
~~~js
//добавляет 1 квартал (3 месяца) к указанному date:
//29 июня 2019 -> 29 сентября 2019
var newDate = gantt.date.add_quarter(new Date(2019, 05, 29), 1);
~~~
  </ul>
  </li>
  <li>
  <b>convert_to_utc (date): Date</b> - преобразует локальное время в UTC
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) date для конвертации </li>
~~~js
//29 июня 2019 14:00 (локальное время) -> 29 июня 2019 12:00 (UTC)
var time = gantt.date.convert_to_utc(new Date(2019, 05, 29, 14, 00));
~~~
  </ul>
  </li>
  <li>
  <b>copy (date): Date</b> - создает копию объекта Date
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) date для копирования </li>
~~~js
var copy = gantt.date.copy(new Date(2019, 05, 29));// -> 29 июня 2019
~~~
  </ul>
  </li>
  <li>
  <b>date_part (date): Date</b> - сбрасывает время date до полуночи (00:00:00)
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) date для корректировки </li>
~~~js
//29 июня 2019 14:30:10 -> 29 июня 2019 00:00:00
var date = gantt.date.date_part(new Date(2019, 05, 29, 14, 30, 10));
~~~
  </ul>
  </li>
  <li>
  <b>date_to_str (format, utc): Function</b> - создает функцию, которая преобразует Date в форматированную строку
  <ul>
  <li><b><i>format</i></b> - (<i>string</i>) желаемый формат date (см. [Спецификация формата даты](guides/date-format.md)) </li>
  <li><b><i>utc?</i></b> - (<i>boolean</i>) нужно ли конвертировать локальное время в UTC </li>
~~~js
var formatFunc = gantt.date.date_to_str("%d/%m/%Y");
var date = formatFunc(new Date(2019, 05, 29)); // -> "29/06/2019"
~~~
  </ul>
  </li>
  <li>
  <b>day_start (date): Date</b> - устанавливает время date в полночь, то же что и <b>date_part</b>. Используется в Day view для определения отображаемой даты, может быть переопределен
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) date для корректировки </li>
~~~js
//29 июня 2019 14:30:10 -> 29 июня 2019 00:00:00
var date = gantt.date.day_start(new Date(2019, 05, 29, 14, 30, 10));
~~~
  </ul>
  </li>
  <li>
  <b>getISOWeek (date): number</b> - возвращает номер недели по ISO-8601 для date, недели начинаются с понедельника
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) date для вычисления </li>
~~~js
var week = gantt.date.getISOWeek(new Date(2019, 05, 29));// ->26
~~~
  </ul>
  </li>
  <li>
  <b>getUTCISOWeek (date): number</b> - возвращает номер недели для date после конвертации локального времени в UTC
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) date для вычисления </li>
~~~js
var week = gantt.date.getUTCISOWeek(new Date(2019, 05, 29));// ->26
~~~
  </ul>
  </li>
  <li>
  <b>getWeek (date): number</b> - возвращает номер недели для date, недели могут начинаться с понедельника или воскресенья в зависимости от настройки в [start_on_monday](api/config/start_on_monday.md)
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) date для вычисления </li>
~~~js
// недели начинаются с воскресенья
gantt.config.start_on_monday = false;

var isoWeek = gantt.date.getISOWeek(new Date(2019, 2, 25)); // ->12
var week = gantt.date.getWeek(new Date(2019, 2, 25)); // ->13
~~~
  </ul>
  </li>
  <li>
  <b>month_start (date): Date</b> - возвращает Date, установленный на первый день месяца переданного date, время сброшено к полуночи
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) date для корректировки </li>
~~~js
//29 июня 2019 14:30 -> 01 июня 2019 00:00
var firstDay = gantt.date.month_start(new Date(2019, 05, 29, 14, 30));
~~~
  </ul>
  </li>
  <li>
  <b>parseDate (date, format): Date</b> - преобразует строку с указанным форматом в Date
  <ul>
  <li><b><i>date</i></b> - (<i>string</i>) строка с date </li>
  <li><b><i>format</i></b> - (<i>string</i>) формат строки с date (см. [Спецификация формата даты](guides/date-format.md)) </li>
~~~js
var date = gantt.date.parseDate("29/06/2019","%d/%m/%Y");//-> 29 июня 2019 00:00:00
~~~
  </ul>
  </li>
  <li>
  <b>str_to_date (format, utc): Function</b> - создает функцию, которая преобразует строки заданного формата в Date объекты
  <ul>
  <li><b><i>format</i></b> - (<i>string</i>) ожидаемый формат date (см. [Спецификация формата даты](guides/date-format.md)) </li>
  <li><b><i>utc?</i></b> - (<i>boolean</i>) нужно ли конвертировать локальное время в UTC </li>
~~~js
var formatFunc = gantt.date.str_to_date("%d/%m/%Y");
var date = formatFunc("29/06/2019"); // -> 29 июня 2019 00:00:00
~~~
  </ul>
  </li>
  <li>
  <b>time_part (date): number</b> - возвращает часть времени Date в секундах, прошедших с полуночи
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) date для вычисления </li>
~~~js
var time = gantt.date.time_part(new Date(2019, 05, 29, 14, 30, 10));
~~~
  </ul>
  </li>
  <li>
  <b>to_fixed (num): string</b> - форматирует числа меньше 10 с ведущим нулём, числа 10 и больше возвращает как есть в виде строки
  <ul>
  <li><b><i>num</i></b> - (<i>number</i>) число для форматирования </li>
~~~js
var num1 = gantt.date.to_fixed(2);// ->"02"
var num2 = gantt.date.to_fixed(10);// ->10
~~~
  </ul>
  </li>
  <li>
  <b>minute_start (date): Date</b> - возвращает date с обнулёнными секундами, сохраняя год, месяц, день, час и минуту
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) date для корректировки </li>
~~~js
//29 июня 2019 14:30:10 -> 29 июня 2019 14:30:00
var date = gantt.date.minute_start(new Date(2019, 05, 29, 14, 30, 10));
~~~
  </ul>
  </li>
  <li>
  <b>hour_start (date): Date</b> - возвращает date с обнулёнными минутами и секундами, сохраняя год, месяц, день и час
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) date для корректировки </li>
~~~js
//29 июня 2019 14:30:10 -> 29 июня 2019 14:00:00
var date = gantt.date.hour_start(new Date(2019, 05, 29, 14, 30, 10));
~~~
  </ul>
  </li>
  <li>
  <b>week_start (date): Date</b> - возвращает первый день недели для переданного date с временем, установленным в полночь
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) date для корректировки </li>
~~~js
//29 июня 2019 14:30 -> 24 июня 2019 00:00
var weekStart = gantt.date.week_start(new Date(2019, 05, 29, 14, 30));
~~~
  </ul>
  </li>
  <li>
  <b>quarter_start (date): Date</b> - возвращает первый месяц квартала для date с временем, сброшенным к полуночи
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) date для корректировки </li>
~~~js
//29 июня 2019 14:30:10 -> 01 апреля 2019 00:00:00
var date = gantt.date.quarter_start(new Date(2019, 05, 29, 14, 30, 10));
~~~
  </ul>
  </li>
  <li>
  <b>year_start (date): Date</b> - возвращает первый день года для переданного date с временем, установленным в полночь
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) date для корректировки </li>
~~~js
//29 июня 2019 14:30 -> 01 января 2019 00:00
var yearStart = gantt.date.year_start(new Date(2019, 05, 29, 14, 30));
~~~
  </ul>
  </li>
</ul>

