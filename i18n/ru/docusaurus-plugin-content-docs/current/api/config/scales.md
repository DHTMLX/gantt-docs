---
sidebar_label: scales
title: scales config
description: "настраивает конфигурацию временной шкалы"
---

# scales

### Description

@short: Настраивает конфигурацию временной шкалы

@signature: scales: Scales

### Example

~~~jsx
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "week", step: 1, format: function (date) {
        return "Week #" + gantt.date.getWeek(date);
    }},
    {unit: "day", step: 1, format: "%D", css: function(date) {
    if(!gantt.isWorkTime({ date: date, unit: "day"})){
            return "weekend"
        }
    }}
];
~~~

### Details

Каждый элемент массива представляет отдельную шкалу. Объект может включать следующие свойства:

- **unit** - (*string*) - задаёт единицу шкалы. Возможные значения: "minute", "hour", "day" (по умолчанию), "week", "quarter", "month", "year". Также можно определить кастомные единицы. Подробнее см. [здесь](guides/configuring-time-scale.md#customtimeunits).
- **step?** - (*number*) - определяет шаг временной шкалы (ось X), по умолчанию 1.
- **format? (date): any** - (*string | Function*) - задаёт форматирование подписей шкалы. Если передана функция, она получает объект date.
    - **_date_** - (*Date*) - дата для форматирования
- **date? (date): any** - (*string | Function*) - альтернативный способ задать формат подписей шкалы, принимает строку или функцию с параметром date.
    - **_date_** - (*Date*) - дата для форматирования
- **css? (date): any** - функция, возвращающая имя CSS-класса для применения к единицам шкалы, на основе переданной даты.
    - **_date_** - (*Date*) - дата для оценки
- **sticky?** - (*boolean*) - сохраняет видимость подписи шкалы, когда ячейка шкалы шире видимой области (viewport)
