---
title: "Экспорт и импорт для Excel"
sidebar_label: "Excel"
---

# Экспорт и импорт для Excel

Библиотека dhtmlxGantt позволяет экспортировать данные из диаграммы Gantt в формат Excel. Вы также можете импортировать данные в Gantt из Excel-файла. Чтобы экспортировать данные в формат iCal, см. [Экспорт в iCal](guides/ical.md).

:::note
Онлайн-сервис экспорта бесплатный. Условия лицензии см. в разделе [Лицензия и водяной знак](guides/export-common.md#license-and-watermark).
:::

Существует несколько сервисов экспорта. Их можно установить на вашем компьютере и локально экспортировать диаграмму Gantt в Excel. Обратите внимание, что сервисы экспорта не входят в пакет Gantt; 
прочитайте [соответствующую статью](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml), чтобы узнать условия использования каждого из них.

## Ограничения онлайн-сервиса экспорта

:::note
У онлайн-сервиса экспорта есть ограничения по времени и размеру запроса. См. [Ограничения онлайн-сервиса экспорта](guides/export-common.md#service-limits).
:::

## Использование модулей экспорта

Чтобы экспортировать большие диаграммы, экспортировать без ограничений онлайн-сервиса экспорта или хранить данные в своей сети, установите [модуль экспорта](guides/export-modules.md) на собственный сервер. Подробнее об использовании [модуля экспорта для PDF, PNG, Excel и iCal](guides/pdf-export-module.md).

## Экспорт в Excel

Чтобы экспортировать данные из диаграммы Gantt в документ Excel, выполните следующее:

- Чтобы использовать функциональность экспорта/импорта, включите плагин <b>export_api</b> через метод [plugins](api/method/plugins.md):
~~~js
gantt.plugins({
    export_api: true
});
~~~

Это позволяет использовать либо онлайн-сервис экспорта, либо локальный модуль экспорта.

:::note
Если вы используете версию Gantt старше 8.0, вам нужно подключить `https://export.dhtmlx.com/gantt/api.js` на вашей странице, чтобы включить функциональность экспорта, например:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- Вызовите метод [exportToExcel](api/method/exporttoexcel.md) для экспорта данных из диаграммы Gantt: 

~~~html
<input value="Export to Excel" type="button" onclick='gantt.exportToExcel()'>

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~


**Связанный пример**: [Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)


**Связанный пример**: [Export data: store online](https://docs.dhtmlx.com/gantt/samples/08_api/09_export_store.html)
  
  

#### Параметры метода экспорта

Метод **exportToExcel()** принимает в качестве параметра объект с несколькими свойствами (все свойства являются необязательными):

- **name** - (*string*) задаёт имя выходного файла с расширением '.xlsx' 
- **columns** - (*array*) позволяет настраивать столбцы выходной таблицы Excel. Свойства объектов столбцов:
    - **'id'** - (*string,number*) свойство события, которое будет сопоставлено столбцу
    - **'header'** - (*string*) заголовок столбца
    - **'width'** - (*number*) ширина столбца в пикселях
    - **'type'** - (*string*) тип столбца
- **server** - (*string*) задаёт конечную точку API для запроса. Может использоваться с локальной установкой сервиса экспорта. Значение по умолчанию: `https://export.dhtmlx.com/gantt`
- **raw** - (*boolean*) определяет способ экспорта данных Gantt. По умолчанию *false*. Подробнее см. в разделе [Экспорт отфильтрованных задач и скрытых столбцов](#exporting-filtered-tasks-and-hidden-columns)
- **callback** - (*function*) если вы хотите получить URL для загрузки сгенерированного файла XLSX, можно использовать свойство callback. Оно получает JSON-объект с полем url
- **visual** - (*boolean*) добавляет на экспортируемый документ Excel шкалу времени. По умолчанию false
- **cellColors** - (*boolean*) если установить в *true*, ячейки экспортируемого документа будут иметь цвета, определённые шаблоном [timeline_cell_class](api/template/timeline_cell_class.md), экспортируются свойства *color* и *background-color*
- **data** - (*object*) задаёт произвольный источник данных, который будет представлен в экспортируемой диаграмме Gantt
- **date_format** - (*string*) задаёт формат отображения даты в экспортируемом документе Excel. Полный список доступных кодов формата можно посмотреть [здесь](api/method/exporttoexcel.md).        

~~~jsx title="Вызов метода экспорта с необязательными свойствами"
gantt.exportToExcel({
    name: "document.xlsx", 
    columns:[
        { id: "text",  header: "Title", width: 150 },
        { id: "start_date",  header: "Start date", width: 250, type: "date" }
    ],
    server: "https://myapp.com/myexport/gantt",
    callback: (res) => {
        alert(res.url);
    },
    visual: true,
    cellColors: true,
    data: { },
    date_format: "dddd d, mmmm yyyy"
});
~~~

#### Значения даты по умолчанию

Модуль экспорта ожидает, что столбцы **start_date** и **end_date** будут иметь тип *Date*, а столбец **duration** — тип *number*. 

В случае применения [пользовательских шаблонов](guides/specifying-columns.md#datamappingandtemplates), необходимо либо вернуть значение нужного типа, либо определить другое значение в свойстве **name** конфигурации столбца. Например:

~~~jsx {7,10-12}
gantt.config.columns = [
    ...
    { name: "start_date", align: "center", width: 100, resize: true, 
        editor: start_dateEditor },
    { name: "end_date", align: "center", width: 100, resize: true, 
        editor: end_dateEditor },
    { name: "duration_formatted", 
        align: "center", width: 40, resize: true, 
        editor: durationEditor, 
        template: (task) => { 
            return formatter.format(task.duration_formatted); 
        }
    },
    ...
];
~~~

Иначе данные Gantt не будут экспортированы. [Посмотрите соответствующий пример](https://snippet.dhtmlx.com/q1lhyvt3).

### Установка пользовательского источника данных для экспорта

Чтобы экспортировать диаграмму Gantt с набором пользовательских данных (то есть не теми данными, что отображаются в исходной диаграмме Gantt), используйте свойство **data** в параметре метода [exportToExcel](api/method/exporttoexcel.md):

~~~js
gantt.exportToExcel({   
    name: "document.xlsx", 
    data: [
        { id: 1, text: "Project #1", start_date: "01-04-2026", duration: 18},
        { id: 2, text: "Task #1", start_date: "02-04-2026", duration: 8, parent: 1},
        { id: 3, text: "Task #2", start_date: "11-04-2026", duration: 8, parent: 1}
    ]      
});
~~~

:::note
Обратите внимание, что нельзя указать в качестве значения параметра **data** какой-либо URL, допускается только объект данных.
:::

### Добавление цветов задач в экспорт {#adding-colors-of-tasks-to-export}

Вы можете добавить цвета задач в экспортируемый файл Excel диаграммы Gantt, установив значение свойства **visual** в *"base-colors"*:

~~~js
gantt.exportToExcel({
    visual: "base-colors", 
    cellColors: true
})
~~~

**Связанный пример**: [Export colors of tasks](https://snippet.dhtmlx.com/t2znjrfj)

### Экспорт отфильтрованных задач и скрытых столбцов {#exporting-filtered-tasks-and-hidden-columns}

По умолчанию метод [`exportToExcel()`](api/method/exporttoexcel.md) экспортирует все задачи и столбцы диаграммы Gantt независимо от фильтрации, применённой через событие [`onBeforeTaskDisplay`](api/event/onbeforetaskdisplay.md), и от столбцов, [скрытых](guides/specifying-columns.md#visibility) настройкой `hide:true`.

Чтобы в экспорт не попадали задачи, отфильтрованные через `onBeforeTaskDisplay`, установите для свойства **raw** значение *true*:

~~~js
gantt.attachEvent("onBeforeTaskDisplay", function(id, task){
    // hide tasks that don't match the search value
    return task.text.toLowerCase().indexOf(filterValue.toLowerCase()) > -1;
});

gantt.exportToExcel({
    raw: true
});
~~~

**Связанный пример**: [Gantt. Export filtered data to PDF, Excel, and MSProject files](https://snippet.dhtmlx.com/twfy116w)

Аналогично, чтобы исключить столбцы, скрытые настройкой `hide:true`, установите для свойства **raw** значение *true*:

~~~js
gantt.config.columns = [
    { name: "text", tree: true, width: 150, resize: true },
    { name: "start_date", align: "center", width: 120, resize: true },
    // hidden columns are excluded from the export when raw: true
    { name: "end_date", align: "center", label: "End Time", hide: true, width: 120, resize: true },
    { name: "duration", align: "center", width: 70, hide: true, resize: true }
];

gantt.exportToExcel({
    raw: true
});
~~~

**Связанный пример**: [Gantt. Export to Excel. Hide grid columns with the raw mode](https://snippet.dhtmlx.com/b7y0ps8m)

## Импорт из Excel {#importfromexcel}

Поскольку автоматическое сопоставление произвольных столбцов Excel-документа с моделью данных Gantt невозможно, сервис экспорта преобразует документ в массив строк, который возвращается в JSON. 
Преобразование полученного документа в данные Gantt — задача конечного разработчика.

Чтобы преобразовать Excel-файл, необходимо отправить следующий запрос в сервис экспорта:

- Request URL - `https://export.dhtmlx.com/gantt`
- Request Method - **POST**
- Content-Type - **multipart/form-data**

Параметры запроса:

- **file** - Excel-файл
- **type** - "excel-parse"
- **data** - (*optional*) JSON-строка с настройками

Например:

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
    server: "https://export.dhtmlx.com/gantt",
    data: file,
    callback: (project) => {
        console.log(project)
    }
});
~~~


**Связанный пример**: [Импорт Excel файла](https://docs.dhtmlx.com/gantt/samples/08_api/21_load_from_excel.html)


Где *file* — экземпляр [File](https://developer.mozilla.org/en-US/docs/Web/API/File), который должен содержать Excel (xlsx) файл.

:::note
**gantt.importFromExcel** требует поддержки HTML5 File API.
:::


### Ответ

Ответ будет содержать JSON-массива объектов:

~~~js
[
   { "Name": "Task Name", "Start": "2026-04-11 10:00", "Duration": 8 },
   ...
]
~~~

где:

- Значения первой строки используются как имена свойств импортируемых объектов.
- Каждая строка сериализуется как отдельный объект.
- Даты сериализуются в формате "%Y-%m-%d %H:%i". 


### Настройки импорта

- Сервис импорта ожидает, что первая строка импортируемого листа будет заголовочной строкой, содержащей имена столбцов.
- По умолчанию сервис возвращает первый лист документа. Чтобы вернуть другой лист, используйте параметр **sheet** (нумерация с нуля)

~~~js
gantt.importFromExcel({
    server: "https://export.dhtmlx.com/gantt",
    data: file,
    sheet: 2, // выводя третий лист
    callback: (rows) => {}
});
~~~


## Экспорт в iCal {#export-to-ical}

Экспорт в iCal описан в статье [Экспорт в iCal](guides/ical.md).