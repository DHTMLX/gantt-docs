---
title: "Экспорт/Импорт в Excel, экспорт в iCal"
sidebar_label: "Экспорт/Импорт в Excel, экспорт в iCal"
---

# Экспорт/Импорт в Excel, экспорт в iCal


Библиотека dhtmlxGantt поддерживает экспорт данных из диаграммы Gantt в форматы Excel и iCal. Также доступен импорт данных в диаграмму Gantt из файла Excel.

:::note
Сервис экспорта предоставляется бесплатно, однако экспортируемые файлы Excel/iCal будут содержать водяной знак библиотеки при использовании лицензии GPL. 
При покупке лицензии экспортируемые файлы не будут содержать водяных знаков в течение активного периода поддержки (12 месяцев для всех PRO-лицензий).
:::

Существует несколько сервисов экспорта, которые вы можете установить на свой компьютер для локального экспорта диаграмм Gantt в Excel или iCal.
Обратите внимание, что эти сервисы экспорта не входят в комплект поставки пакета Gantt.
Подробнее ознакомиться с условиями использования можно в [связанной статье](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml).

## Ограничения онлайн-сервиса экспорта


:::note
Сервис экспорта имеет ограничения по времени обработки и размеру запроса.
:::

### Ограничения по времени

Если процесс экспорта занимает более 20 секунд, он будет остановлен, и вы увидите следующую ошибку:

~~~html
Error: Timeout trigger 20 seconds
~~~

Если несколько пользователей экспортируют диаграммы Gantt одновременно, процесс может занять больше времени обычного. Однако время, затраченное на каждый экспортный запрос пользователя, учитывается отдельно.

### Ограничения по размеру запроса

Основная конечная точка API **https://export.dhtmlx.com/gantt** обрабатывает все методы экспорта (*exportToPDF*, *exportToPNG*, *exportToMSProject* и др.). Максимальный размер запроса - **10 МБ**.

Также есть отдельная конечная точка API **https://export.dhtmlx.com/gantt/project** для сервисов экспорта/импорта [MSProject](guides/export-msproject.md) и 
[Primavera P6](guides/export-primavera.md) 
(*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6*). Для этой конечной точки максимальный размер запроса - **40 МБ**.

## Использование модулей экспорта


:::note
Для экспорта больших диаграмм рекомендуется использовать [отдельный модуль экспорта](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml). 
Этот модуль бесплатен, если у вас есть лицензия [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) или [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing). В противном случае его можно приобрести отдельно [здесь](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210).
:::

Более подробную информацию о работе с модулем экспорта в PDF можно найти в этом руководстве: [Модуль экспорта в PDF](guides/pdf-export-module.md). Модуль поддерживает экспорт в PDF, PNG, Excel и iCal.

## Экспорт в Excel


Чтобы экспортировать данные из диаграммы Gantt в файл Excel, выполните следующие шаги:

- Включите плагин <b>export_api</b> с помощью метода [plugins](api/method/plugins.md):
~~~js
gantt.plugins({
      export_api: true
});
~~~

:::note
Для версий Gantt ниже 8.0 добавьте скрипт **https://export.dhtmlx.com/gantt/api.js** на страницу для активации онлайн-сервиса экспорта, например:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- Используйте метод [exportToExcel](api/method/exporttoexcel.md) для экспорта данных диаграммы Gantt: 

~~~html
<input value="Export to Excel" type="button" onclick='gantt.exportToExcel()'>/*!*/

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~


[Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)


[Export data: store online](https://docs.dhtmlx.com/gantt/samples/08_api/09_export_store.html)
  
  

#### Параметры метода экспорта

Метод **exportToExcel()** принимает необязательный объект с несколькими свойствами:

- **name** - (*string*) задаёт имя экспортируемого файла, включая расширение '.xlsx'
- **columns** - (*array*) настраивает колонки в листе Excel. Каждый объект колонки может содержать:
    - **'id'** - (*string,number*) свойство события, отображаемое в колонке
    - **'header'** - (*string*) текст заголовка колонки
    - **'width'** - (*number*) ширина колонки в пикселях
    - **'type'** - (*string*) тип данных колонки
- **server** - (*string*) указывает конечную точку API для запроса экспорта. Полезно при наличии локального сервиса экспорта. По умолчанию **https://export.dhtmlx.com/gantt**
- **callback** - (*function*) функция обратного вызова, получающая JSON-объект со свойством *url* для загрузки сгенерированного XLSX-файла
- **visual** - (*boolean*) включает экспорт диаграммы во временной шкале в файл Excel. По умолчанию *false*
- **cellColors** - (*boolean*) если *true*, ячейки в экспортируемом файле будут иметь цвета, определённые шаблоном [timeline_cell_class](api/template/timeline_cell_class.md), экспортируя стили *color* и *background-color*
- **data** - (*object*) позволяет указать собственный источник данных для экспорта вместо текущих данных диаграммы Gantt
- **date_format** - (*string*) определяет формат даты, используемый в экспортируемом файле Excel. Полный список поддерживаемых форматов смотрите [здесь](api/method/exporttoexcel.md).        

**Пример вызова метода экспорта с дополнительными свойствами**
~~~js
gantt.exportToExcel({
    name:"document.xlsx", 
    columns:[
        { id:"text",  header:"Title", width:150 },
        { id:"start_date",  header:"Start date", width:250, type:"date" }
    ],
    server:"https://myapp.com/myexport/gantt",
    callback: function(res){
        alert(res.url);
    },
    visual:true,
    cellColors:true,
    data:{},
    date_format: "dddd d, mmmm yyyy"
});
~~~

#### Параметры даты по умолчанию

Модуль экспорта ожидает, что колонки **start_date** и **end_date** будут типа *Date*, а колонка **duration** - типа *number*. 

При использовании [кастомных шаблонов](guides/specifying-columns.md#datamappingandtemplates) убедитесь, что возвращаемое значение соответствует ожидаемому типу, либо укажите другое имя свойства в поле **name** конфигурации колонки. Например:

~~~js

gantt.config.columns = [
    ...
    {name: "start_date", align: "center", width: 100, resize: true, 
        editor: start_dateEditor},
    {name: "end_date", align: "center", width: 100, resize: true, 
        editor: end_dateEditor},
    {name: "duration_formatted", /*!*/
        align: "center", width: 40, resize: true, 
        editor: durationEditor, 
        template: function(task){ /*!*/
            return formatter.format(task.duration_formatted); /*!*/
        }
    },
    ...
];
~~~

Если этого не сделать, данные Gantt не будут экспортированы корректно. [Пример здесь](https://snippet.dhtmlx.com/q1lhyvt3).

### Экспорт с использованием собственного источника данных

Чтобы экспортировать диаграмму Gantt на основе собственного набора данных (отличного от текущих данных в гриде), используйте свойство **data** в объекте параметров метода 
[exportToExcel](api/method/exporttoexcel.md):

~~~js
gantt.exportToExcel({   
    name:"document.xlsx", 
    data:[
        {id:1, text:"Project #1", start_date:"01-04-2020", duration:18},
        {id:2, text:"Task #1", start_date:"02-04-2020",duration:8, parent:1},
        {id:3, text:"Task #2", start_date:"11-04-2020",duration:8, parent:1}
    ]      
});
~~~

:::note
Обратите внимание, что параметр **data** должен быть объектом данных, а не строкой-URL.
:::

### Экспорт цветов задач

Чтобы добавить цвета задач в экспортируемый файл Excel, установите свойство **visual** в значение *"base-colors"*:

~~~js
gantt.exportToExcel({
    visual: "base-colors", /*!*/
    cellColors: true
})
~~~


**Related example:** [Export colors of tasks](https://snippet.dhtmlx.com/t2znjrfj)


## Импорт из Excel


Поскольку автоматическое сопоставление произвольных колонок Excel с моделью данных Gantt не поддерживается, сервис экспорта преобразует документ Excel в массив строк, возвращаемый в формате JSON. 
Преобразование этих данных в формат Gantt остаётся на стороне разработчика.

Для преобразования файла Excel отправьте запрос на сервис экспорта со следующими параметрами:

- URL запроса - **https://export.dhtmlx.com/gantt**
- Метод запроса - **POST**
- Content-Type - **multipart/form-data**

Параметры запроса:

- **file** - файл Excel для загрузки
- **type** - значение "excel-parse"
- **data** - (*необязательно*) строка JSON с дополнительными настройками

Пример формы:

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="excel-parse">
    <button type="submit">Get</button>
</form>
~~~

Либо можно использовать [клиентский API](api/method/importfromexcel.md):

~~~js
gantt.importFromExcel({
    server:"https://export.dhtmlx.com/gantt",
    data: file,
    callback: function(project){
        console.log(project)
    }
});
~~~


[Import Excel file](https://docs.dhtmlx.com/gantt/samples/08_api/21_load_from_excel.html)


Здесь *file* - объект [File](https://developer.mozilla.org/en-US/docs/Web/API/File), представляющий Excel (xlsx) файл.

:::note
**gantt.importFromExcel** требует поддержки HTML5 File API.
:::


### Ответ

Ответ будет представлять собой JSON-массив объектов:

~~~js
[
   { "Name": "Task Name", "Start": "2018-08-11 10:00", "Duration": 8 },
   ...
]
~~~

Подробности:

- Значения первой строки используются как имена свойств импортируемых объектов.
- Каждая последующая строка преобразуется в отдельный объект.
- Даты форматируются как "%Y-%m-%d %H:%i". 


### Настройки импорта

- Сервис импорта ожидает, что первая строка будет заголовком с именами колонок.
- По умолчанию обрабатывается первый лист в файле Excel. Чтобы указать другой лист, используйте параметр **sheet** (нумерация с нуля):

~~~js
gantt.importFromExcel({
    server:"https://export.dhtmlx.com/gantt",
    data: file,
    sheet:2, // обработка третьего листа
    callback: function (rows) {}
});
~~~


## Экспорт в iCal


Чтобы экспортировать данные диаграммы Gantt в строку iCal, выполните следующие шаги:

- Включите плагин <b>export_api</b> с помощью метода [plugins](api/method/plugins.md):
~~~js
gantt.plugins({
      export_api: true
});
~~~

- Вызовите метод [exportToICal](api/method/exporttoical.md) для экспорта данных:

~~~html
<input value="Export to iCal" type="button" onclick='gantt.exportToICal()'>/*!*/

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~


[Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)


[Export data: store online](https://docs.dhtmlx.com/gantt/samples/08_api/09_export_store.html)


#### Параметры метода экспорта

Метод [exportToICal()](api/method/exporttoical.md) принимает необязательный объект со следующими свойствами:

- **server** - (*string*) указывает конечную точку API для запроса. Полезно для локальных установок сервиса экспорта. По умолчанию **https://export.dhtmlx.com/gantt**.
- **name** - (*string*) позволяет задать собственное имя файла и расширение, однако формат файла остаётся iCal.
  
**Пример вызова метода экспорта с дополнительными свойствами**
~~~js
gantt.exportToICal({
    server:"https://myapp.com/myexport/gantt"
});
~~~

