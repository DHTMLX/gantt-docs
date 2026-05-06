---
title: "Расширение Formatters"
sidebar_label: "Расширение Formatters"
---

# Расширение форматтеров

:::note
Эта функциональность доступна только в версии PRO.
:::

Расширение **gantt.ext.formatters** предоставляет два метода форматирования:

- [durationFormatter()](guides/formatters-ext.md#durationformatter)
- [linkFormatter()](guides/formatters-ext.md#linkformatter)

Вы также можете указать [пользовательский форматтер](#customformatter), основанный на существующих.

## Форматтер продолжительности {#durationformatter}

Метод **gantt.ext.formatters.durationFormatter(config)** возвращает новый экземпляр *DurationFormatter*.

### **Конфигурация**

- <span class="submethod">**durationFormatter (config): DurationFormatter**</span> - создаёт Форматтер продолжительности
    - **_config?_** - (*object*) - необязательный, объект конфигурации, который может включать следующие атрибуты:
        - **_enter?_** - (*string*) - задаёт формат по умолчанию для метода **parse**, который используется, когда входное значение поступает без единиц измерения. Значение по умолчанию: "day".
        - **_store?_** - (*string*) - задаёт формат для сохранения значений продолжительности в gantt. Эта настройка влияет на выходное значение метода **parse**. Значение по умолчанию: "hour".
        - **_format?_** - (*string | Array &lt;string&gt;*) - задаёт формат выходного значения. Поддерживаемые значения: "auto", "minute", "hour", "day", "week", "month", "year", или массив, содержащий любой из этих значений. Значение "auto" означает, что форматтер попытается выбрать подходящую единицу в зависимости от переданного значения (то есть крупные значения будут форматироваться как дни/месяцы/годы, меньшие — как минуты/часы).
        - **_short?_** - (*boolean*) - устанавливает короткие метки (аббревиатуры) для единиц времени. Значение по умолчанию: *false*
        - **_minutesPerHour?_** - (*number*) - определяет, как значения продолжительности будут преобразовываться из минут в часы и наоборот. *Значение по умолчанию: 60*
        - **_hoursPerDay?_** - (*number*) - определяет, как значения продолжительности будут преобразовываться из часов в дни и наоборот. *Значение по умолчанию: 8*
        - **_hoursPerWeek?_** - (*number*) - определяет, как значения продолжительности будут преобразовываться из часов в недели и обратно. *Значение по умолчанию: 40*
        - **_daysPerMonth?_** - (*number*) - определяет, как значения продолжительности будут преобразовываться из дней в месяцы и обратно. *Значение по умолчанию: 30*
        - **_daysPerYear?_** - (*number*) - определяет, как значения продолжительности будут преобразовываться из дней в годы и обратно. *Значение по умолчанию: 365*
        - **_labels?_** - (*object*) - определяет текстовые метки для разных единиц времени. Эти метки используются как для разобранных, так и для форматированных значений.
            - **_minute?_** - (*object*) - конфигурация для минут
                - **_full?_** - (*string*) - полная текстовая метка для минут
                - **_plural?_** - (*string*) - форма во множественном числе для минут
                - **_short?_** - (*string*) - короткая текстовая метка для минут
            - **_hour?_** - (*object*) - конфигурация для часов
                - **_full?_** - (*string*) - полная текстовая метка для часов
                - **_plural?_** - (*string*) - форма во множественном числе для часов
                - **_short?_** - (*string*) - короткая текстовая метка для часов
            - **_day?_** - (*object*) - конфигурация для дней
                - **_full?_** - (*string*) - полная текстовая метка для дней
                - **_plural?_** - (*string*) - форма во множественном числе для дней
                - **_short?_** - (*string*) - короткая текстовая метка для дней
            - **_week?_** - (*object*) - конфигурация для недель
                - **_full?_** - (*string*) - полная текстовая метка для недель
                - **_plural?_** - (*string*) - форма во множественном числе для недель
                - **_short?_** - (*string*) - короткая текстовая метка для недель
            - **_month?_** - (*object*) - конфигурация для месяцев
                - **_full?_** - (*string*) - полная текстовая метка для месяцев
                - **_plural?_** - (*string*) - форма во множественном числе для месяцев
                - **_short?_** - (*string*) - короткая текстовая метка для месяцев
            - **_year?_** - (*object*) - конфигурация для лет
                - **_full?_** - (*string*) - полная текстовая метка для лет
                - **_plural?_** - (*string*) - форма во множественном числе для лет
                - **_short?_** - (*string*) - короткая текстовая метка для лет


**Примеры:**

Инициализация Форматтера продолжительности с настройками по умолчанию:
~~~js
const formatter = gantt.ext.formatters.durationFormatter();
// экземпляр объекта форматтера создаётся фабричным методом
~~~

- **_enter_**:
~~~js
formatter.parse("1"); // entered value: 1 day - если enter:"day" (default)
formatter.parse("1"); // entered value: 1 hour - если enter:"hour"
~~~

- **_store_**:

~~~js
formatter.parse("1 day"); // stored value: 8 - если store:"hour"
formatter.parse("1 day"); // stored value: 480 - store:"minute" 
~~~


- **_format_**
~~~js
gantt.ext.formatters.durationFormatter({
    format: ["hour", "minute"], /*!*/
    store:"minute"
}).format(260); // 4 hours 20 minutes

gantt.ext.formatters.durationFormatter({
    format: "hour", /*!*/
    store:"minute"    
}).format(260);// 4.33 hours
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


Пример полной конфигурации:
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

Созданный экземпляр *DurationFormatter* предоставляет следующие методы:

- <span class="submethod">**canParse (value): boolean**</span> - возвращает *true*, если переданная строка может быть разобрана в значение продолжительности, в противном случае возвращает *false*
    - **_value_** - (*string*) - строка, которая будет проверяться


~~~js
const formatter = gantt.ext.formatters.durationFormatter();
console.log(formatter.canParse("1 day"));
// true

console.log(formatter.canParse("abc"));
// false
~~~

- <span class="submethod">**format (value): string**</span> - преобразует указанное значение продолжительности в строку продолжительности
    - **_value_** - (*number*) - величина продолжительности, которая будет преобразована

~~~js
const formatter = gantt.ext.formatters.durationFormatter();
console.log(formatter.format(24));
// 3 days
~~~

- <span class="submethod">**parse (value): number**</span> - парсит указанную строку в значение продолжительности. Если значение нельзя разобрать, вернётся 'null'
    - **_value_** - (*string*) - строка, которая будет преобразована


~~~js
const formatter = gantt.ext.formatters.durationFormatter();
console.log(formatter.parse("1 day"));
// 8
~~~

Подробнее о методе **durationFormatter** можно узнать в статье [Расчёт рабочего времени](guides/working-time.md#taskdurationindecimalformat).

## Link Formatter {#linkformatter}

Метод **gantt.ext.formatters.linkFormatter(config)** возвращает новый экземпляр *LinkFormatter*. Он повторно использует некоторые методы и конфигурацию Форматтера продолжительности

### **Конфигурация**

- <span class="submethod">**linkFormatter (config): LinkFormatter**</span> - создать Link Formatter
    - **_config?_** - (*object*) - необязательный, объект конфигурации, который может включать следующие атрибуты:
        - **_durationFormatter?_** - (*DurationFormatter*) - экземпляр *DurationFormatter*, созданный функцией *gantt.ext.formatters.durationFormatter()*. Он влияет на то, как парсятся и форматируются значения задержки/опережения ссылок:
        - **_labels?_** - (*object*) - локальные метки для разных типов связей
            - **_finish_to_start?_** - (*string*) - метки для связей Finish to Start
            - **_start_to_start?_** - (*string*) - метки для связей Start to Start
            - **_finish_to_finish?_** - (*string*) - метки для связей Finish to Finish
            - **_start_to_finish?_** - (*string*) - метки для связей Start to Finish

**Примеры:**

Инициализация Link Formatter со значениями по умолчанию:

~~~js
const formatter = gantt.ext.formatters.linkFormatter();
// экземпляр объекта форматтера создаётся фабричным методом
~~~

- **_short_**:

~~~js
gantt.ext.formatters.linkFormatter()
   .format({id:1, type:"1", source: 1, target: 2, lag: 5});
//"1SS+5 days"
 
var durationFormatter = gantt.ext.formatters.durationFormatter({
    short: true
});
gantt.ext.formatters.linkFormatter({durationFormatter: durationFormatter})
    .format({id:1, type:"2", source: 1, target: 2, lag: -1});
//"1FF-1d"
~~~


- **_labels_**:
~~~js
const formatter = gantt.ext.formatters.linkFormatter({
    //значения по умолчанию
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

Созданный экземпляр *LinkFormatter* предоставляет следующие методы:


- <span class="submethod">**canParse (value): boolean**</span> - возвращает *true*, если переданная строка может быть разобрана в объект link, в противном случае возвращает *false*
    - **_value_** - (*string*) - строка, которая будет проверяться

~~~js
const formatter = gantt.ext.formatters.linkFormatter();
console.log(formatter.canParse("1FS + 1 day"));
// true
 
console.log(formatter.canParse("abc"));
// false
~~~

- <span class="submethod">**format (link): string**</span> - преобразует указанное значение ссылки в строку
    - **_value_** - (*Link*) - объект ссылки, который будет преобразован

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

formatter.format({id:1, type:"1", source: 1, target: 2, lag: 5});
//"1SS+5 days"
~~~


- <span class="submethod">**parse (value): object**</span> - парсит указанную строку в объект ссылки. Если значение нельзя разобрать, вернётся 'null'. Обратите внимание, что *link.target* заданной ссылки будет иметь значение 'null'
    - **_value_** - (*string*) - строка, которая будет преобразована

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

formatter.parse("1SS+5 days");
// {id:1, type:"1", source: 1, target: null, lag: 5}
~~~


### **Форматирование информации**

*LinkFormatter* поддерживает два формата ссылок:

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
   - **$(TYPE)** - [тип связи](api/config/links.md). Поддерживаемые значения: 'FF', 'FS', 'SS', 'SF', или как определено в конфигурации **labels** *LinkFormatter*.
   - **$(LAG)** - [задержка связи](guides/auto-scheduling.md#settinglagandleadtimesbetweentasks). Это значение может быть как положительным, так и отрицательным - **+1 day**, **-1 day**. Поддерживаемый формат определяется параметром **durationFormatter**, переданным в конструктор *LinkFormatter*.

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

console.log(formatter.parse("1.1SS + 1 day"));
// {id:1, type:"1", source: 2, target: null, lag: 1}

console.log(formatter.format({id:1, type:"1", source: 2, target: 3, lag: 1}));
// 1.1SS + 1 day
~~~

Связи Finish-To-Start без лаг/опережения будут форматироваться с использованием краткого формата, тогда как остальные связи — с использованием полного формата.
Аналогично, если в метод **parse** передаётся только код WBS задачи, форматтер будет считать тип Finish-to-Start и нулевое время задержки.

Подробнее о методе linkFormatter можно узнать в статье [Inline Editing in Grid](guides/inline-editing.md#linkformatter).

## Пользовательский форматтер {#customformatter}

Функциональность Gantt позволяет создать пользовательский форматтер на базе существующих форматтеров Gantt. Вы можете добавить пользовательский форматтер в встроенный редактор. Под капотом Gantt будет хранить данные в формате, который ожидается системой, в то время как при открытии встроенного редактора будет показываться значение, требуемое пользователем.

Пользовательский форматтер — это объект с двумя функциями: **format()** и **parse()**.

Функция **format()** преобразует либо число (пользовательный форматтер продолжительности) либо ссылку (пользовательный форматтер ссылки) в нужное значение. Функция **parse()** преобразует форматированное значение либо в число (пользовательный форматтер продолжительности) либо в ссылку (пользовательный форматтер ссылки).

Так выглядят пользовательские форматтеры:

~~~js
const customDurationFormatter = {
    format: function (duration) {
        let formattedDuration;
        // код для преобразования из числа в нужное значение
        return formattedDuration;
    },
    parse: function (formattedValue) {
        let duration;
        // код для преобразования из нужного значения в число
        return duration;
    }
};

const customLinkFormatter = {
    format: function (link) {
        let formattedLink;
        // код для преобразования из объекта ссылки в нужное значение
        return formattedLink;
    },
    parse: function (formattedValue) {
        let link;
        // код для преобразования из нужного значения в объект `link`
        return link
    }
};
~~~


Вы можете использовать существующие форматтеры в пользовательских форматтерах и изменять возвращаемые ими значения.

Пользовательские форматтеры задаются для встроенных редакторов так же, как и обычные форматтеры. Например:

~~~js
const durationEditor = { 
    type: "duration", map_to: "duration", formatter: customDurationFormatter 
};
~~~


Вот пример пользовательских длительных и ссылочных форматтеров:

Связанный пример [Custom duration and link formatters](https://snippet.dhtmlx.com/gcvw2a6c)

## Пользовательские правила для форм множественного числа

Конфигурация стандартного [Duration Formatter](guides/formatters-ext.md#durationformatter) позволяет использовать только одну форму множественного числа существительного, поскольку в английском языке форма множественного числа образуется добавлением суффикса или изменением самого существительного.

В других языках слово может иметь несколько вариантов формы во множественном числе. Кроме того, могут существовать разные правила использования разных форм множественного числа. Вы можете использовать пользовательский форматтер и задать правила для вашего языка. Ниже приведён пример того, как применить необходимые правила в пользовательском форматтере для японского языка:

Связанный образец [Custom duration formatter with different plural values for Japanese locale]