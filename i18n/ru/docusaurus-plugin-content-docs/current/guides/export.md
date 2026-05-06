---
title: "Экспорт в PDF и PNG"
sidebar_label: "Экспорт в PDF и PNG"
---

# Экспорт в PDF и PNG

dhtmlxGantt предоставляет онлайн-сервис экспорта, позволяющий экспортировать диаграмму Ганта в форматы [PDF](guides/export.md#export-to-pdf) или [PNG](guides/export.md#export-to-png).

:::note
Сервис бесплатный, но итоговый файл PDF/PNG будет содержать водяной знак библиотеки в рамках лицензии GPL. 
Если вы приобретете лицензию, результат экспорта будет доступен без водяного знака в течение действующего срока поддержки (12 месяцев для всех PRO лицензий).
:::

Существует несколько сервисов экспорта. Вы можете установить их на свой компьютер и экспортировать диаграмму Ганта в PDF или PNG локально.
Обратите внимание, что сервисы экспорта не включены в пакет Gantt, 
прочитайте [соответствующую статью](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml), чтобы узнать условия использования каждого из них.

## Ограничения онлайн-сервиса экспорта

:::note
Сервис экспорта имеет ограничения по времени и объему запроса.
:::

### Ограничения по времени

Если процесс занимает более 20 секунд, экспорт будет отменен и возникнет следующая ошибка:

~~~html
Error: Timeout trigger 20 seconds
~~~

Если несколько пользователей экспортируют Gantt одновременно, процесс может занять больше обычного времени. Но это нормально, потому что время, затраченное на экспортный запрос от конкретного пользователя, учитывается отдельно.

### Ограничения по размеру запроса

Существует общий API-эндпоинт `https://export.dhtmlx.com/gantt`, который обслуживает все методы экспорта (*exportToPDF*, *exportToPNG*, *exportToMSProject* и т. д.). **Максимальный размер запроса — 10 МБ**.

Также существует отдельный API-эндпоинт `https://export.dhtmlx.com/gantt/project`, предназначенный специально для сервисов экспорта/импорта MSProject и 
[Primavera P6](guides/export-primavera.md) 
(только для (*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6*)). **Макс. размер запроса: 40 МБ**.

## Использование модулей экспорта

:::note
Если вам нужно экспортировать большие диаграммы, вы можете воспользоваться отдельным standalone-модулем экспорта. 
Модуль экспорта предоставляется бесплатно, если вы получили Gantt по лицензии [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) или [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), или же вы можете приобрести сам модуль отдельно ([купить модуль отдельно](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210)).
:::

[Подробнее об использовании модуля экспорта для PDF](guides/pdf-export-module.md).

## Экспорт в PDF

Чтобы экспортировать диаграмму Gantt в PDF-документ, выполните следующие шаги:

- Чтобы использовать функциональность экспорта/импорта, включите плагин <b>export_api</b> через метод [plugins](api/method/plugins.md):

~~~js
gantt.plugins({
    export_api: true
});
~~~

Он позволяет использовать либо онлайн-сервис экспорта, либо локальный модуль экспорта.

:::note
Если версия Gantt ниже 8.0, нужно подключить на страницу `https://export.dhtmlx.com/gantt/api.js`, чтобы включить функциональность экспорта, например:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- Вызовите метод [exportToPDF](api/method/exporttopdf.md) для экспорта диаграммы Gantt:

~~~html
<input value="Export to PDF" type="button" onclick='gantt.exportToPDF()'>

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~


**Связанный пример**: [Export data from Gantt](https://docs.dhtmlx.com/gantt/samples/08_api/06_export.html)


## Экспорт в PNG

Чтобы экспортировать диаграмму Gantt в PNG-изображение, выполните следующие шаги:

- Чтобы использовать онлайн-сервис экспорта, включите плагин <b>export_api</b> через метод [plugins](api/method/plugins.md):

~~~js
gantt.plugins({
    export_api: true
});
~~~

:::note
Если версия Gantt ниже 8.0, нужно подключить на страницу файл `https://export.dhtmlx.com/gantt/api.js`, чтобы включить онлайн-сервис экспорта, например:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- Вызовите метод [exportToPNG](api/method/exporttopng.md) для экспорта диаграммы Gantt:

~~~html
<input value="Export to PNG" type="button" onclick='gantt.exportToPNG()'>

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~


**Связанный пример**: [Export data from Gantt](https://docs.dhtmlx.com/gantt/samples/08_api/06_export.html)


## Параметры методов экспорта

Методы [exportToPDF](api/method/exporttopdf.md) и [exportToPNG](api/method/exporttopng.md) принимают в качестве параметра один и тот же объект с набором свойств (все свойства являются необязательными):

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) имя выходного файла</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>skin</b></td>
  <td>(<i>string</i>) [скин](guides/skins.md) выходной диаграммы Gantt</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>locale</b></td>
  <td>(<i>string</i>) задаёт язык, который будет использоваться в выходной диаграмме Gantt</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>start</b></td>
  <td>(<i>string</i>) задаёт начальную дату диапазона данных, которые будут представлены в выходной диаграмме Gantt. Формат даты задаётся конфигурацией [date_format](api/config/date_format.md)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>end</b></td>
  <td>(<i>string</i>) задаёт конечную дату диапазона данных, которые будут представлены в выходной диаграмме Gantt. Формат даты задаётся конфигурацией [date_format](api/config/date_format.md)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>data</b></td>
  <td>(<i>object</i>) задаёт произвольный источник данных, который будет представлен в выходной диаграмме Gantt</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) задаёт заголовок, который будет добавлен к выходному изображению PDF. Обратите внимание, здесь можно использовать любой HTML</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) задаёт нижний колонтитул, который будет добавлен к выходному изображению PDF. Обратите внимание, здесь можно использовать любой HTML</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) задаёт конечную точку API для запроса. Может использоваться с локальной установкой сервиса экспорта. Значение по умолчанию — <strong>https://export.dhtmlx.com/gantt</strong></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>raw</b></td>
  <td>(<i>boolean</i>) определяет, что весь разметочный код Gantt будет экспортирован как есть, со всеми пользовательскими элементами. Значение по умолчанию — <em>false</em>. <a href="#exportingcustommarkupandstyles">Подробнее ниже</a></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>callback</b></td>
  <td>(<i>function</i>) Если нужно получить URL для скачивания сгенерированного файла PDF/PNG, можно использовать свойство callback. Оно получает JSON-объект с полем url</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) объект с дополнительными настройками для метода <b>exportToPDF()</b>. Объект может содержать следующие атрибуты: <ul> <li><b>format</b> - (<i>string</i>) формат выходного файла: <i>"A0", "A1", "A2", "A3", "A4", "A5", "A6", "Legal", "Ledger", "Letter", "Tabloid"</i></li> <li><b>landscape</b> - (<i>boolean</i>) портретная или альбомная ориентация выходного файла. Атрибут работает только если указан атрибут \"format\".</li> <li><b>width</b> - (<i>string | number | "content"</i>) ширина выходной страницы. Атрибут используется при экспорте нескольких страниц. </li> <li><b>height</b> - (<i>string | number | "content"</i>) высота выходной страницы. Атрибут используется при экспорте нескольких страниц.</li> <li><b>merge_pages</b> - (<i>boolean</i>) включает [многостраничный экспорт](api/method/exporttopdf.md#multi-page-export) в одном файле; если установить <i>false</i>, придётся экспортировать данные несколько раз, чтобы получить все данные Gantt</li> <li><b>fixed_headers</b> - (<i>boolean</i>) включает отображение заголовков грида и временной шкалы на каждой странице; по умолчанию <i>false</i>. Работает только с включённой настройкой <b>merge_pages</b></li> <li><b>margins</b> - (<i>object</i>) объект с верхними, нижними, левыми и правыми полями для выходного файла PDF. <a href="#margins-of-the-output-pdf-file">Подробнее ниже</a></li> <li><b>header</b> - (<i>string</i>) задаёт заголовок, который будет добавлен на каждой странице выходного файла PDF. <a href="#headerfooter-of-the-output-file">Подробнее ниже</a></li> <li><b>footer</b> - (<i>string</i>) задаёт нижний колонтитул, который будет добавлен на каждой странице выходного файла PDF. <a href="#headerfooter-of-the-output-file">Подробнее ниже</a></li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) объект с дополнительными настройками для метода <b>exportToPNG()</b>. Объект может содержать следующие атрибуты: <ul> <li><b>width</b> - (<i>number|string</i>) ширина выходной страницы</li> <li><b>height</b> - (<i>number|string</i>) высота выходной страницы</li> Атрибуты <b>width</b> и <b>height</b> будут проигнорированы, если указан <b>slice_archive</b>. <li><b>slice_archive</b> - (<i>boolean|object</i>) позволяет сохранять большую диаграмму по частям и получать их в архиве. В виде объекта атрибут принимает параметры <b>width</b> и <b>height</b>. Если размер куска не определён (то есть <i>slice_archive: true</i>), используются значения по умолчанию 1000×1000. </li> <li><b>slice_check</b> - (<i>boolean</i>) добавляет HTML-страницу в архив. Эта страница позволяет проверить, что все части экспортированы корректно.</li> </ul></td>
  </tr>
  </tbody>
</table>


~~~js title="Calling export methods with optional properties"
gantt.exportToPDF({
    name: "mygantt.pdf",
    header: "<h1>My company</h1>",
    footer: "<h4>Bottom line</h4>",
    locale: "en",
    start: "01-04-2026",
    end: "11-04-2026",
    skin: "terrace",
    data: {},
    server: "https://myapp.com/myexport/gantt",
    raw: true,
    callback: (res) => {
        alert(res.url);
    }
});

gantt.exportToPNG({
    name: "mygantt.png",
    header: "<h1>My company</h1>",
    footer: "<h4>Bottom line</h4>",
    locale: "en",
    start: "01-04-2026",
    end: "11-04-2026",
    skin: "terrace",
    data: {},
    server: "https://myapp.com/myexport/gantt",
    raw: true,
    callback: (res) => {
        alert(res.url);
    }
});
~~~

## Название выходного файла

Чтобы задать пользовательское имя выходного файла, используйте свойство **name** в параметре методов [exportToPDF/exportToPNG](guides/export.md#parameters-of-the-export-methods):

~~~js
gantt.exportToPDF({
    name: "my_beautiful_gantt.pdf"
});
~~~

## Язык выходного файла

По умолчанию диаграмма Gantt будет экспортироваться на том же языке, что и на странице.

Чтобы задать пользовательский язык выходного файла, используйте свойство **locale** в параметре методов [exportToPDF/exportToPNG](guides/export.md#parameters-of-the-export-methods):

~~~js
gantt.exportToPDF({
    name: "mygantt.pdf",
    locale: "de"
});
~~~

## Данные для экспорта

Чтобы задать задачи, которые должны быть представлены в выходном PDF или PNG файле, используйте один из следующих способов:

1. <a href="#daterange">Укажите диапазон дат выходных данных.</a>
2. <a href="#customdata">Укажите произвольный источник данных для экспорта.</a>

<a id="daterange"></a>

### Указание диапазона дат выходных задач

Чтобы задать диапазон задач, которые будут представлены в выходном документе, используйте свойства **start** и **end** в параметре методов [exportToPDF/exportToPNG](guides/export.md#parameters-of-the-export-methods):

~~~js
gantt.exportToPDF({
    name: "mygantt.pdf",
    start: "01-04-2026",
    end: "11-04-2026"
});
~~~

:::note
Обратите внимание, формат даты определяется конфигурацией [date_format](api/config/date_format.md).
:::

### Установка произвольного источника данных для экспорта {#customdata}

Чтобы экспортировать диаграмму Gantt с произвольным набором данных (то есть не тем, который представлен в исходной диаграмме), используйте свойство **data** в параметре методов 
[exportToPDF/exportToPNG](guides/export.md#parameters-of-the-export-methods):

~~~js {2}
gantt.exportToPDF({
    data: {
        tasks: [
            { id: 1, text: "Project #1", start_date: "01-04-2026", duration: 18 },
            { id: 2, text: "Task #1", start_date: "02-04-2026", duration: 8, parent: 1 },
            { id: 3, text: "Task #2", start_date: "11-04-2026", duration: 8, parent: 1 }
        ],
        links: [
            { id: 1, source: 1, target: 2, type: "1" },
            { id: 2, source: 2, target: 3, type: "0" },
            { id: 3, source: 3, target: 4, type: "0" },
            { id: 4, source: 2, target: 5, type: "2" }
        ]
    }
});
~~~

:::note
Обратите внимание, что в качестве значения параметра **data** нельзя указать URL, используется только объект данных.
:::

## Скин выходной диаграммы Gantt

По умолчанию диаграмма Gantt будет экспортирована с тем же скином, что и на странице.

Чтобы задать другой скин для выходного PNG или PDF, используйте свойство **skin** в параметре методов [exportToPDF/exportToPNG](guides/export.md#parameters-of-the-export-methods):

~~~js
gantt.exportToPDF({
    name: "mygantt.pdf",
    skin: "material"
});
~~~

[Посмотреть полный список доступных скинов Gantt](guides/skins.md).


## Заголовок/нижний колонтитул выходного файла

Чтобы добавить заголовок/нижний колонтитул к выходному PNG или PDF файлу, используйте свойства **header**/**footer** в параметрах методов [exportToPDF/exportToPNG](guides/export.md#parameters-of-the-export-methods):

:::note
Заметьте, вы можете использовать любой HTML при указании параметров. При использовании изображений помните, что нужно задавать глобальные пути в качестве значения атрибута "src".
:::

~~~js
gantt.exportToPDF({
    name: "mygantt.pdf",
    header: "<h1>My company</h1>",
    footer: "<h4>Bottom line</h4>"
});
~~~

### Заголовок/нижний колонтитул для каждой страницы выходного PDF {#headerfooterforeachpage}

Чтобы добавить заголовок/нижний колонтитул для каждой страницы выходного PDF, используйте свойства **header**/**footer** в объекте **additional_settings** метода `exportToPDF`.

Вы можете задать номер текущей страницы с помощью элемента с `class="pageNumber"` и общее количество страниц с помощью элемента с `class="totalPages"` в свойствах **header**/**footer**:

~~~js
gantt.exportToPDF({
    additional_settings: {
        format: "A4",
        // правильные поля необходимы для корректного рендирования заголовков/нижних колонтитулов
        margins: {
            top: 10,
            bottom: 10,
            left: 0.1,
            right: 1
        },
        header: "Each page header",
        footer: 'Page: <span class="pageNumber"></span>/<span class="totalPages"></span>'
    }
});
~~~

Обратите внимание, что эти настройки работают только при указанных полях (margins) и если есть достаточно места для корректного отображения заголовков/нижних колонтитулов. В противном случае заголовки/нижние колонтитулы будут выведены за пределы графика. Рекомендуется установить минимальные поля в 10 мм для простой текстовой строки.

## Отступы выходного PDF файла

Чтобы добавить отступы к выходному PDF файлу, используйте свойство **margins** в объекте **additional_settings** метода 
[exportToPDF](guides/export.md#parameters-of-the-export-methods). Свойство **margins** работает как для одностраничного, так и для
[multipage export](api/method/exporttopdf.md#multi-page-export).

Значения настроек полей задаются числами:

~~~js
gantt.exportToPDF({
    additional_settings: {
        margins: {
            top: 5,
            bottom: 10,
            left: 2,
            right: 2
        },
    },
});
~~~

Если какое-либо из настроек полей не указано, оно будет проигнорировано.

Значения по умолчанию задаются в миллиметрах, но можно указать и дюймы, добавив свойство <b>unit: "inch"</b>:

~~~js {8}
gantt.exportToPDF({
    additional_settings: {
        margins: {
            top: 5,
            bottom: 10,
            left: 2,
            right: 2,
            unit: "inch"
        },
    },
});
~~~

## Пользовательский стиль выходного файла {#customstylefortheoutputfile}

Чтобы применить собственный стиль к диаграмме, подключите таблицу стилей с вашими кастомными CSS-классами:

- через ссылку (link):

~~~js
gantt.exportToPDF({
    name: "calendar.pdf",
    header: '<link rel="stylesheet" href="http://mysite.com/custom.css">'
});
~~~

- или через тег 'style':

~~~js
gantt.exportToPDF({
    name: "calendar.pdf",
    header: '<style>... custom css classes here ...</style>'
});
~~~


Замечание: вышеупомянутый способ работает для глобального HTTP-ссылки. Если у вас CSS-классы указаны в локальной/интранет-среде, можно встроить все стили как в примере ниже:

~~~js
gantt.exportToPDF({
    header: "<style>.tier1{background: red; color:white;}</style>"
});
~~~

:::note
Для большего числа примеров смотрите статью [Решения по добавлению ресурcного графика или пользовательских стилей в экспортированный PDF-файл](guides/how-to.md#how-to-add-resource-chart-or-custom-styles-in-the-exported-pdf-file).
:::

### Сбор всех стилей для функции экспорта

Иногда стили прописаны в разных файлах, недоступных для публичного доступа, и неудобно подключать стили по отдельности. Есть способ собрать все стили вместе для экспорта.

Все стили хранятся в объекте `document.styleSheets` на HTML-странице. Если используется элемент `<style>` или `<link>`, подключённый с того же сайта, можно собрать все стили и затем указать их в заголовке. Ниже приведён пример:

~~~js
const styles = [];

for (const styleSheet of document.styleSheets) {
    try {
        const rules = styleSheet.cssRules;

        for (const rule of rules) {
            styles.push(rule.cssText);
        }
    } catch (error) {
        // Игнорировать таблицы стилей, которые невозможно прочитать
    }
}

gantt.exportToPDF({
    raw: true,
    header: "<style>" + styles.join(" ") + "</style>"
});
~~~

**Связанный пример**: [Export Gantt with custom icons to PDF](https://snippet.dhtmlx.com/osbscj62)


**Связанный пример**: [Export Gantt with resource load diagram to PDF with no need to specify styles](https://snippet.dhtmlx.com/duf5ijuv)

## Экспорт пользовательских разметки и стилей {#exportingcustommarkupandstyles}

По умолчанию диаграмма Gantt экспортируется на основе заданной конфигурации и загруженных данных, в то время как [пользовательские элементы](guides/baselines.md) и некоторые шаблоны не экспортируются.
Чтобы экспортировать всю разметку Gantt как есть, со всеми пользовательскими элементами, можно установить свойство **raw: true** в параметре методов [exportToPDF/exportToPNG](guides/export.md#parameters-of-the-export-methods).

~~~js
gantt.exportToPDF({
    raw: true
});
~~~

Обратите внимание, что пользовательские элементы потребуют указания [пользовательских стилей](guides/export.md#customstylefortheoutputfile) для корректного отображения.

Учтите, что использование этого режима увеличивает размер API-запроса. Большие диаграммы могут превысить лимит онлайн-экспорта в 10 МБ и экспортаmay not be possible таким образом.
В таком случае вам потребуется локально иметь [сервис экспорта](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) и увеличить размер запроса.

Проверьте [системные требования](guides/export-requirements.md) для локальной установки сервисов экспорта.

## Экспорт HTML-элементов

При экспорте диаграммы Gantt в форматы PNG и PDF следует учитывать, что экспорт HTML-элементов ограничен по причине возможной небезопасности.

Существуют HTML-элементы, экспорт которых не полностью разрешён, такие как `<canvas>`, `<svg>`, `<script>` и изображения с атрибутом *src*, содержащие изображение в формате Base64. Однако существуют безопасные способы экспорта изображений в форматах SVG и Base64:

- можно использовать элемент `<img>` с атрибутом *src*, содержащим URL изображения в формате SVG (подходит для PNG и JPG форматов, не работает с Base64), например:

~~~html
<img src="https://www.svgrepo.com/download/530597/hat.svg">
~~~

- можно использовать элементы style, такие как *background* или *background-image* и задавать значение `url` со ссылкой на изображение или изображение в формате Base64 (подходит для PNG/JPG/SVG форматов)

~~~css
.red {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH1ggDCwMADQ4NnwAAAFVJREFUGJWNkMEJADEIBEcbSDkXUnfSgnBVeZ8LSAjiwjyEQXSFEIcHGP9oAi+H0Bymgx9MhxbFdZE2a0s9kTZdw01ZhhYkABSwgmf1Z6r1SNyfFf4BZ+ZUExcNUQUAAAAASUVORK5CYII=") 100%/contain no-repeat;
    display: inline-block;
    width: 32px;
    height: 32px;
}
~~~

**Связанный пример**: [Exporting safe and insecure HTML elements to PDF](https://snippet.dhtmlx.com/hj6w4dk3?text="gantt")

Если у вас есть модуль экспорта и вам нужно экспортировать HTML-элементы, которые не поддерживаются нашим онлайн-сервером экспорта, вы можете подать запрос в службу поддержки за инструкциями по внесению изменений в ваш модуль, чтобы снять ограничения. Однако следует учитывать, что ваш сервер станет подвержен XSS-атакам.