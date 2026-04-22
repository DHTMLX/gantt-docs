---
sidebar_label: scales
title: scales config
description: "настраивает конфигурацию временной шкалы"
---

# scales

### Description

@short: Определяет параметры конфигурации временной шкалы

@signature: scales: Scales

### Example

~~~jsx
gantt.config.scales = [
    { unit: "month", step: 1, format: "%F, %Y" },
    {
        unit: "week",
        step: 1,
        format: (date) => `Week #${gantt.date.getWeek(date)}`
    },
    {
        unit: "day",
        step: 1,
        format: "%D",
        css: (date) => !gantt.isWorkTime({ date, unit: "day" }) ? "weekend" : ""
    }
];
~~~

### Details

Each object in the array specifies a single scale. An object can take the following attributes:

- **unit** - (*string*) - название единицы шкалы. Доступные значения: "minute", "hour", "day" (default), "week", "quarter", "month", "year".
There is also a possibility to set a custom unit. Read more on the topic [здесь](guides/configuring-time-scale.md#customtimeunits).
- **step?** - (*number*) - шаг временной шкалы (ось X), 1 by default.
- **format? (date): any** - (*string | Function*) - формат меток шкалы. Если задан как функция, ожидается объект Date в качестве параметра.
    - **_date_** - (*Date*) - дата, которая будет преобразована
- **date? (date): any** - (*string | Function*) - формат меток шкалы. Если задан как функция, ожидается объект Date в качестве параметра.
    - **_date_** - (*Date*) - дата, которая будет преобразована
- **css? (date): any** - функция, возвращающая имя CSS-класса, который будет применяться к единицам шкалы. Принимает объект date в качестве параметра.
    - **_date_** - (*Date*) - дата, которая будет проверяться
- **sticky?** - (*boolean*) - делает видимой метку шкалы, если размер ячейки шкалы превышает ширину области просмотра