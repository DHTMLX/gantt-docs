---
title: "Расширение Formatters"
sidebar_label: "Расширение Formatters"
---

# Расширение Formatters


:::info
Эта функция доступна только в редакции PRO.
:::

Расширение **gantt.ext.formatters** предоставляет два способа форматирования значений:

- [durationFormatter()](guides/formatters-ext.md#durationformatter)
- [linkFormatter()](guides/formatters-ext.md#linkformatter)

Вы также можете создать [пользовательский форматтер](#customformatter), используя существующие в качестве основы.

## Форматтер длительности {#durationformatter}


Метод **gantt.ext.formatters.durationFormatter(config)** создает новый экземпляр *DurationFormatter*.

### **Конфигурация**

- <span class="submethod">**durationFormatter (config): DurationFormatter**</span> - создает форматтер длительности
    - **_config?_** - (*object*) - необязательный объект конфигурации с такими опциями:
        - **_enter?_** - (*string*) - устанавливает формат по умолчанию, используемый методом **parse**, если во входном значении отсутствуют единицы измерения. По умолчанию "day".
        - **_store?_** - (*string*) - определяет формат хранения значений длительности в Gantt. Это влияет на результат метода **parse**. По умолчанию "hour".
        - **_format?_** - (*string | Array &lt;string&gt;*) - задает формат вывода. Поддерживаются значения: "auto", "minute", "hour", "day", "week", "month", "year" или массив из этих значений. "auto" означает, что форматтер сам выбирает подходящую единицу в зависимости от размера значения (для больших значений - дни/месяцы/годы, для меньших - минуты/часы).
        - **_short?_** - (*boolean*) - включает короткие обозначения (аббревиатуры) для единиц времени. По умолчанию *false*.
        - **_minutesPerHour?_** - (*number*) - задает соотношение минут в часе. По умолчанию 60.
        - **_hoursPerDay?_** - (*number*) - задает соотношение часов в дне. По умолчанию 8.
        - **_hoursPerWeek?_** - (*number*) - задает соотношение часов в неделе. По умолчанию 40.
        - **_daysPerMonth?_** - (*number*) - задает соотношение дней в месяце. По умолчанию 30.
        - **_daysPerYear?_** - (*number*) - задает соотношение дней в году. По умолчанию 365.
        - **_labels?_** - (*object*) - задает текстовые подписи для разных единиц времени, используемые при разборе и форматировании:
            - **_minute?_** - (*object*) - подписи для минут
                - **_full?_** - (*string*) - полное название для минут
                - **_plural?_** - (*string*) - множественное число для минут
                - **_short?_** - (*string*) - короткое название для минут
            - **_hour?_** - (*object*) - подписи для часов
                - **_full?_** - (*string*) - полное название для часов
                - **_plural?_** - (*string*) - множественное число для часов
                - **_short?_** - (*string*) - короткое название для часов
            - **_day?_** - (*object*) - подписи для дней
                - **_full?_** - (*string*) - полное название для дней
                - **_plural?_** - (*string*) - множественное число для дней
                - **_short?_** - (*string*) - короткое название для дней
            - **_week?_** - (*object*) - подписи для недель
                - **_full?_** - (*string*) - полное название для недель
                - **_plural?_** - (*string*) - множественное число для недель
                - **_short?_** - (*string*) - короткое название для недель
            - **_month?_** - (*object*) - подписи для месяцев
                - **_full?_** - (*string*) - полное название для месяцев
                - **_plural?_** - (*string*) - множественное число для месяцев
                - **_short?_** - (*string*) - короткое название для месяцев
            - **_year?_** - (*object*) - подписи для лет
                - **_full?_** - (*string*) - полное название для лет
                - **_plural?_** - (*string*) - множественное число для лет
                - **_short?_** - (*string*) - короткое название для лет


**Примеры:**

Создание форматтера длительности с настройками по умолчанию:
~~~js
const formatter = gantt.ext.formatters.durationFormatter();
// экземпляр форматтера создается с помощью фабричного метода
~~~

- **_enter_**:
~~~js
formatter.parse("1"); // интерпретируется как 1 день, если enter:"day" (по умолчанию)
formatter.parse("1"); // интерпретируется как 1 час, если enter:"hour"
~~~

- **_store_**:

~~~js
formatter.parse("1 day"); // сохраняется как 8, если store:"hour"
formatter.parse("1 day"); // сохраняется как 480, если store:"minute" 
~~~


- **_format_**
~~~js
gantt.ext.formatters.durationFormatter({
    format: ["hour", "minute"], /*!*/
    store:"minute"
}).format(260); // результат: "4 hours 20 minutes"

gantt.ext.formatters.durationFormatter({
    format: "hour", /*!*/
    store:"minute"    
}).format(260);// результат: "4.33 hours"
~~~


- **_short_**
~~~js
gantt.ext.formatters.durationFormatter({
    format: ["week", "hour", "minute"],
    store:"minute",
    short: false /*!*/    
}).format(10021); //"4 weeks 7 hours 1 minute"
 
gantt.ext.formatters.durationFormatter({
    format: ["week", "hour", "minute"],
    store:"minute",
    short: true     /*!*/
}).format(10021); //"4wk 7h 1min"
~~~


Пример с полной конфигурацией:
~~~js
const formatter = gantt.ext.formatters.durationFormatter({
    // значения по умолчанию
    enter: "day",
    store: "hour",
    format: "auto",
    short: false,
    minutesPerHour: 60,
    hoursPerDay: 8,
    hoursPerWeek: 40,
    daysPerMonth: 30,
    daysPerYear: 365,
    labels: {
        minute: {
            full: "minute",
            plural: "minutes",
            short: "min"
        },
        hour: {
            full: "hour",
            plural: "hours",
            short: "h"
        },
        day: {
            full: "day",
            plural: "days",
            short: "d"
        },
        week: {
            full: "week",
            plural: "weeks",
            short: "wk"
        },
        month: {
            full: "month",
            plural: "months",
            short: "mon"
        },
        year: {
            full: "year",
            plural: "years",
            short: "y"
        }
    }
});
~~~

### **API**

Экземпляр *DurationFormatter* предоставляет следующие методы:

- <span class="submethod">**canParse (value): boolean**</span> - проверяет, может ли строка быть преобразована в значение длительности; возвращает *true*, если да, иначе *false*
    - **_value_** - (*string*) - строка для проверки


~~~js
const formatter = gantt.ext.formatters.durationFormatter();
console.log(formatter.canParse("1 day"));
// true

console.log(formatter.canParse("abc"));
// false
~~~

- <span class="submethod">**format (value): string**</span> - преобразует значение длительности в форматированную строку
    - **_value_** - (*number*) - значение длительности для преобразования

~~~js
const formatter = gantt.ext.formatters.durationFormatter();
console.log(formatter.format(24));
// результат: 3 days
~~~

- <span class="submethod">**parse (value): number**</span> - преобразует строку в значение длительности или возвращает 'null', если преобразование невозможно
    - **_value_** - (*string*) - строка для разбора


~~~js
const formatter = gantt.ext.formatters.durationFormatter();
console.log(formatter.parse("1 day"));
// результат: 8
~~~

Подробнее о **durationFormatter** можно узнать в статье [Расчёт рабочего времени](guides/working-time.md#taskdurationindecimalformat).

## Форматтер связей {#linkformatter}


Метод **gantt.ext.formatters.linkFormatter(config)** создает новый экземпляр *LinkFormatter*. Он имеет схожие методы и параметры конфигурации с форматтером длительности.

### **Конфигурация**

- <span class="submethod">**linkFormatter (config): LinkFormatter**</span> - создает форматтер связей
    - **_config?_** - (*object*) - необязательный объект конфигурации с такими опциями:
        - **_durationFormatter?_** - (*DurationFormatter*) - экземпляр, созданный с помощью *gantt.ext.formatters.durationFormatter()*, который влияет на разбор и форматирование значений лагов/опережения.
        - **_labels?_** - (*object*) - подписи для различных типов связей:
            - **_finish_to_start?_** - (*string*) - подпись для связей "Finish to Start"
            - **_start_to_start?_** - (*string*) - подпись для связей "Start to Start"
            - **_finish_to_finish?_** - (*string*) - подпись для связей "Finish to Finish"
            - **_start_to_finish?_** - (*string*) - подпись для связей "Start to Finish"

**Примеры:**


Создание форматтера связей с настройками по умолчанию:

~~~js
const formatter = gantt.ext.formatters.linkFormatter();
// экземпляр форматтера создается с помощью фабричного метода
~~~

- **_short_**:

~~~js
gantt.ext.formatters.linkFormatter()
   .format({id:1, type:"1", source: 1, target: 2, lag: 5});
// результат: "1SS+5 days"
 
var durationFormatter = gantt.ext.formatters.durationFormatter({
    short: true
});
gantt.ext.formatters.linkFormatter({durationFormatter: durationFormatter})
    .format({id:1, type:"2", source: 1, target: 2, lag: -1});
// результат: "1FF-1d"
~~~


- **_labels_**:
~~~js
const formatter = gantt.ext.formatters.linkFormatter({
    // значения по умолчанию
    durationFormatter: gantt.ext.formatters.durationFormatter(),
    labels: {
        finish_to_start: "FS",
        start_to_start: "SS",
        finish_to_finish: "FF",
        start_to_finish: "SF"
    }
});
~~~


### **API**

Экземпляр *LinkFormatter* предоставляет следующие методы:


- <span class="submethod">**canParse (value): boolean**</span> - проверяет, может ли строка быть преобразована в объект связи; возвращает *true*, если да, иначе *false*
    - **_value_** - (*string*) - строка для проверки

~~~js
const formatter = gantt.ext.formatters.linkFormatter();
console.log(formatter.canParse("1FS + 1 day"));
// true
 
console.log(formatter.canParse("abc"));
// false
~~~

- <span class="submethod">**format (link): string**</span> - преобразует объект связи в строку
    - **_link_** - (*Link*) - объект связи для преобразования

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

formatter.format({id:1, type:"1", source: 1, target: 2, lag: 5});
// результат: "1SS+5 days"
~~~

- <span class="submethod">**parse (value): object**</span> - преобразует строку в объект связи или возвращает 'null', если разбор невозможен. Обратите внимание, что *link.target* в разобранном объекте будет установлен в "null".
    - **_value_** - (*string*) - строка для разбора

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

formatter.parse("1SS+5 days");
// результат: {id:1, type:"1", source: 1, target: null, lag: 5}
~~~

### **Информация о форматах**

*LinkFormatter* работает с двумя форматами ссылок:

 - **$(WBS)** - короткий формат
   - **$(WBS)** - [код WBS задачи](api/method/getwbscode.md)

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

console.log(formatter.parse("1.1"));
// {id:1, type:"0", source: 2, target: 3, lag: 0}

console.log(formatter.format({id:2, type:"0", source: 1, target: 3, lag: 0}));
// 1.1
~~~

 - **$(WBS)$(TYPE)$(LAG)** - полный формат
   - **$(WBS)** - [код WBS задачи](api/method/getwbscode.md)
   - **$(TYPE)** - [тип связи](api/config/links.md). **Поддерживаемые значения:** 'FF', 'FS', 'SS', 'SF', либо как определено в конфигурации **labels** для *LinkFormatter*.
   - **$(LAG)** - [лаг связи](guides/auto-scheduling.md#settinglagandleadtimesbetweentasks). Может быть положительным или отрицательным, например, **+1 day** или **-1 day**. Поддерживаемый формат зависит от параметра **durationFormatter**, переданного в конструктор *LinkFormatter*.

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

console.log(formatter.parse("1.1SS + 1 day"));
// {id:1, type:"1", source: 2, target: null, lag: 1}

console.log(formatter.format({id:1, type:"1", source: 2, target: 3, lag: 1}));
// 1.1SS + 1 day
~~~

Связи типа Finish-To-Start без лага или опережения будут отображаться в коротком формате, остальные связи - в полном формате. Аналогично, если в метод **parse** передан только код WBS задачи, форматтер предполагает тип Finish-to-Start с нулевым лагом.

Более подробно о методе linkFormatter можно узнать в статье [Редактирование 'на месте' в гриде](guides/inline-editing.md#linkformatter).


## Пользовательский форматтер {#customformatter}


В Gantt можно создавать пользовательские форматтеры на основе встроенных. Эти пользовательские форматтеры можно подключать к редактору inline. Внутри грид Gantt хранит данные в своем ожидаемом формате, но при открытии редактора пользователю отображается значение в нужном формате.

Пользовательский форматтер - это объект с двумя функциями: **format()** и **parse()**.

Функция **format()** преобразует число (для пользовательского форматтера длительности) или ссылку (для пользовательского форматтера ссылок) в нужное отображаемое значение. Функция **parse()** преобразует отформатированное значение обратно в число или объект ссылки.

Пример пользовательских форматтеров:

~~~js
const customDurationFormatter = {
    format: function (duration) {
        let formattedDuration;
        // код преобразования числа в нужное значение
        return formattedDuration;
    },
    parse: function (formattedValue) {
        let duration;
        // код преобразования значения в число
        return duration;
    }
};

const customLinkFormatter = {
    format: function (link) {
        let formattedLink;
        // код преобразования объекта ссылки в нужное значение
        return formattedLink;
    },
    parse: function (formattedValue) {
        let link;
        // код преобразования значения в объект `link`
        return link
    }
};
~~~

Можно использовать существующие форматтеры внутри пользовательских и при необходимости изменять их вывод.

Пользовательские форматтеры назначаются редакторам так же, как и стандартные. Например:

~~~js
const durationEditor = { 
    type: "duration", map_to: "duration", formatter: customDurationFormatter 
};
~~~

Ниже приведён пример с пользовательскими форматтерами для длительности и ссылок:


**Related example:** [Custom duration and link formatters](https://snippet.dhtmlx.com/gcvw2a6c)


## Пользовательские правила для форм множественного числа {#customrulesforpluralforms}

Стандартный [Duration Formatter](guides/formatters-ext.md#durationformatter) предназначен для работы с английскими формами множественного числа, где обычно достаточно добавить суффикс или немного изменить существительное.

В других языках часто есть несколько форм множественного числа и разные правила их использования. Для этого можно создать пользовательский форматтер, реализующий нужные правила для вашего языка. Пример ниже показывает, как реализовать такие правила для японского языка:


**Related example:** [Custom duration formatter with different plural values for Japanese locale](https://snippet.dhtmlx.com/jyvsiqop)

