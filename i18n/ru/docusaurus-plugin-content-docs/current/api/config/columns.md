---
sidebar_label: columns
title: columns config
description: "настраивает columns в таблице"
---

# columns

### Description

@short: Настраивает columns в таблице

@signature: columns: GridColumn[]

### Example

~~~jsx
// определение columns по умолчанию
gantt.config.columns = [
    { name: "text",       label: "Название задачи",  width: "*", tree: true },
    { name: "start_date", label: "Время начала", align: "center" },
    { name: "duration",   label: "Длительность",   align: "center" },
    { name: "add",        label: "",           width: 44 }
];

gantt.init("gantt_here");
~~~

### Related samples
- [Progress lightbox](https://docs.dhtmlx.com/gantt/samples/05_lightbox/02_progress_lightbox.html)

### Details

Каждый элемент массива определяет один столбец. Объект может содержать следующие свойства:

- **align?** - (*string*) - задаёт горизонтальное выравнивание заголовка столбца. Возможные значения: *'left'*, *'center'*, или *'right'*;
- **hide?** - (*boolean*) - переключает видимость столбца (PRO);
- **label?** - (*string | number | any*) - задаёт заголовок столбца;
- **max_width?** - (*number*) - ограничивает максимальную ширину столбца при изменении размера;
- **min_width?** - (*number*) - задаёт минимальную ширину столбца при изменении размера;
- **name?** - (*string | number*) - идентифицирует столбец. Использование 'add' создаёт столбец с кнопкой '+';
- **resize?** - (*boolean*) - разрешает изменение размера столбца перетаскиванием границы (PRO);
- **sort? (task1, task2): number** - (*boolean | string | Function*) - настраивает поведение сортировки при клике по заголовку столбца. Значение *false* отключает сортировку. Можно указать имя свойства задачи в виде строки для сортировки или передать пользовательскую функцию сортировки.
    - **_task1_** - (*Task*) - первый объект задачи для сортировки.
    - **_task2_** - (*Task*) - второй объект задачи для сортировки.
- **template? (task): any** - задаёт шаблон для данных столбца.
    - **_task_** - (*Task*) - объект задачи.
- **tree?** - (*boolean*) - помечает столбец для отображения древовидной структуры;
- **width?** - (*number | string*) - задаёт ширину столбца;
- **onrender? (task, node): any** - необязательный коллбэк для кастомизации рендеринга ячейки. Получает объект задачи и DOM-элемент ячейки, может возвращать компонент фреймворка. Подробнее [здесь](guides/specifying-columns.md#modifyingcellsafterrendering);
    - **_task_** - (*Task*) - объект задачи.
    - **_node_** - (*HTMLElement*) - HTML-элемент ячейки грида.
- **editor?** - (*object*) - конфигурация inline-редактора.
    - **_type_** - (*string*) - тип редактора.
    - **_map_to_** - (*string*) - свойство задачи, которое редактирует редактор.
    - **_min?_** - (*Date | number*) - минимальное значение для редакторов даты и длительности.
    - **_max?_** - (*Date | number*) - максимальное значение для редакторов даты и длительности.
    - **_options?_** - (*Array &lt;any&gt;*) - массив опций для select-редакторов.
    - **_formatter?_** - (*DurationFormatter | LinkFormatter*) - форматтер для редакторов даты и предшественников.

<br>

Общая ширина columns в grid зависит как от свойства **width** каждого столбца, так и от [grid_width](api/config/grid_width.md). Если эти значения не совпадают, Gantt подстроит одно из них.

- При инициализации gantt через [gantt.init()](api/method/init.md) приоритет имеет ширина столбца **width**. <br>
:::note
Sample: [Приоритет ширины столбца над шириной grid при инициализации](https://snippet.dhtmlx.com/itnvg6z9) 
:::
- При рендеринге gantt через [gantt.render()](api/method/render.md) приоритет имеет [grid_width](api/config/grid_width.md). <br>
:::note
Sample: [Приоритет ширины grid над шириной столбца при рендеринге](https://snippet.dhtmlx.com/4nb67z61) 
:::
- При инициализации через [gantt.init()](api/method/init.md), если ширина столбца отсутствует или установлена в **'*'**, приоритет имеет [grid_width](api/config/grid_width.md). <br>
:::note
Sample: [Приоритет ширины grid при отсутствии или значении '*' у ширины столбца при инициализации](https://snippet.dhtmlx.com/qej8w5ix) 
:::

<br>

Свойство **template** - это функция, которая принимает элемент данных и возвращает содержимое для отображения. Это позволяет гибко настраивать содержимое столбца.

~~~js
gantt.config.columns = [
    { name: "text",        label: "Название задачи",  tree: true, width: "*" },
    { name: "start_date",  label: "Время начала", align: "center" },
    { name: "staff",       label: "Ответственный(е)", template: (obj) => {
        return `${obj.holder} (${obj.progress})`;
    } }
];

gantt.init("gantt_here");
~~~

### Related Guides
- [Указание колонок](guides/specifying-columns.md)
- [Решения](guides/how-to.md#howtoaddacustomcolumninthegrid) (подробности о добавлении кастомного столбца в grid)
- [Решения](guides/how-to.md#howtoaddacustomaddbutton) (инструкция по добавлению кастомной кнопки add(+))

### Change log
- свойство **onrender** было добавлено в версии v7.1

