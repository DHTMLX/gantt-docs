---
title: "Экспорт в PDF и PNG"
sidebar_label: "Экспорт в PDF и PNG"
---

# Экспорт в PDF и PNG


dhtmlxGantt предоставляет онлайн-сервис экспорта, позволяющий сохранить вашу диаграмму Gantt в файл [PDF](guides/export.md#exporttopdf) или 
[PNG](guides/export.md#exporttopng).

:::note
Этот сервис предоставляется бесплатно, однако экспортируемые PDF/PNG-файлы будут содержать водяной знак библиотеки согласно лицензии GPL. 
Если вы приобретаете лицензию, экспорт будет выполняться без водяных знаков в течение периода активной поддержки (12 месяцев для всех PRO-лицензий).
:::

Существует несколько сервисов экспорта, которые вы можете установить на свой компьютер для локального экспорта диаграмм Gantt в PDF или PNG.
Обратите внимание, что сервисы экспорта не входят в сам пакет Gantt - ознакомьтесь с [соответствующей статьёй](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) для получения информации об условиях использования каждого сервиса.

## Ограничения онлайн-сервиса экспорта {#onlineexportservicerestrictions}


:::note
Сервис экспорта имеет ограничения по времени обработки и размеру запроса.
:::

### Ограничения по времени

Если процесс экспорта занимает больше 20 секунд, он будет остановлен, и вы увидите следующую ошибку:

~~~html
Error: Timeout trigger 20 seconds
~~~

Когда несколько пользователей экспортируют диаграммы Gantt одновременно, процесс может занять больше времени, однако время отсчитывается отдельно для каждого запроса пользователя.

### Ограничения по размеру запроса

Общий API-эндпоинт **https://export.dhtmlx.com/gantt** обрабатывает все методы экспорта (*exportToPDF*, *exportToPNG*, *exportToMSProject* и др.). Максимальный размер запроса здесь - **10 МБ**.

Также существует отдельный API-эндпоинт **https://export.dhtmlx.com/gantt/project** для сервисов экспорта/импорта [MSProject](guides/export-msproject.md) и 
[Primavera P6](guides/export-primavera.md) 
(*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6*). Этот эндпоинт поддерживает запросы до **40 МБ**.

## Использование модулей экспорта {#usingexportmodules}


:::note
Для экспорта больших диаграмм вы можете использовать [отдельный модуль экспорта](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml). 
Этот модуль предоставляется бесплатно при наличии [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) или [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) лицензии, либо вы можете [приобрести его отдельно](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210).
:::

[Подробнее об использовании модуля экспорта в PDF](guides/pdf-export-module.md).

## Экспорт в PDF {#exporttopdf}


Чтобы экспортировать диаграмму Gantt в PDF, выполните следующие шаги:

- Включите плагин <b>export_api</b> с помощью метода [plugins](api/method/plugins.md):

~~~js
gantt.plugins({
      export_api: true
});
~~~

:::note
Если вы используете версию Gantt ниже 8.0, подключите **https://export.dhtmlx.com/gantt/api.js** на вашей странице для включения онлайн-сервиса экспорта, например:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- Затем вызовите метод [exportToPDF](guides/export.md#parametersoftheexportmethods) для экспорта диаграммы:

~~~html
<input value="Export to PDF" type="button" onclick='gantt.exportToPDF()'>/*!*/

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~


[Export data from Gantt](https://docs.dhtmlx.com/gantt/samples/08_api/06_export.html)


## Экспорт в PNG {#exporttopng}


Чтобы экспортировать диаграмму Gantt в PNG-изображение, выполните следующие шаги:

- Включите плагин <b>export_api</b> с помощью метода [plugins](api/method/plugins.md):

~~~js
gantt.plugins({
      export_api: true
});
~~~

:::note
Если вы используете версию Gantt ниже 8.0, подключите **https://export.dhtmlx.com/gantt/api.js** на вашей странице для включения онлайн-сервиса экспорта, например:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- Затем вызовите метод [exportToPNG](guides/export.md#parametersoftheexportmethods) для экспорта диаграммы:

~~~html
<input value="Export to PNG" type="button" onclick='gantt.exportToPNG()'>/*!*/

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~


[Export data from Gantt](https://docs.dhtmlx.com/gantt/samples/08_api/06_export.html)


## Параметры методов экспорта {#parametersoftheexportmethods}


Методы [exportToPDF](api/method/exporttopdf.md) и [exportToPNG](api/method/exporttopng.md) принимают объект с различными необязательными свойствами:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) задаёт имя выходного файла</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>skin</b></td>
  <td>(<i>string</i>) устанавливает [скин](guides/skins.md) для экспортируемой диаграммы Gantt</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>locale</b></td>
  <td>(<i>string</i>) определяет язык, используемый в экспортируемой диаграмме Gantt</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>start</b></td>
  <td>(<i>string</i>) начальная дата диапазона данных для экспорта. Формат даты соответствует конфигурации [date_format](api/config/date_format.md)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>end</b></td>
  <td>(<i>string</i>) конечная дата диапазона данных для экспорта. Формат даты соответствует конфигурации [date_format](api/config/date_format.md)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>data</b></td>
  <td>(<i>object</i>) предоставляет пользовательский источник данных, который будет отображён в экспортируемой диаграмме Gantt</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) добавляет заголовок к экспортируемому PDF-изображению. Можно использовать любой HTML-контент</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) добавляет подвал к экспортируемому PDF-изображению. Можно использовать любой HTML-контент</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) задаёт API-эндпоинт для запроса экспорта. Полезно при использовании локального сервиса экспорта. По умолчанию <strong>https://export.dhtmlx.com/gantt</strong></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>raw</b></td>
  <td>(<i>boolean</i>) экспортирует всю разметку Gantt как есть, включая пользовательские элементы. По умолчанию <em>false</em>. [Подробнее ниже](guides/export.md#exportingcustommarkupandstyles)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>callback</b></td>
  <td>(<i>function</i>) получает JSON-объект с URL для загрузки сгенерированного PDF/PNG-файла</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) дополнительные настройки для метода <b>exportToPDF()</b>, включая: <ul> <li><b>format</b> - (<i>string</i>) формат выходного файла: <i>'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'</i></li> <li><b>landscape</b> - (<i>boolean</i>) ориентация выходного файла; применяется только если задан "format"</li> <li><b>width</b> - (<i>string | number | "content"</i>) ширина страницы для многостраничного экспорта</li> <li><b>height</b> - (<i>string | number | "content"</i>) высота страницы для многостраничного экспорта</li> <li><b>merge_pages</b> - (<i>boolean</i>) включает экспорт нескольких страниц в один файл; если <i>false</i>, потребуется несколько экспортов для всех данных Gantt</li> <li><b>fixed_headers</b> - (<i>boolean</i>) отображает заголовки грида и шкалы времени на каждой странице; по умолчанию <i>false</i>. Работает только при включённом <b>merge_pages</b></li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) дополнительные настройки для метода <b>exportToPNG()</b>, включая: <ul> <li><b>width</b> - (<i>number|string</i>) ширина выходного изображения</li> <li><b>height</b> - (<i>number|string</i>) высота выходного изображения</li> Эти параметры игнорируются, если задан <b>slice_archive</b>. <li><b>slice_archive</b> - (<i>boolean|object</i>) позволяет экспортировать большие диаграммы по частям, сохраняемым в архив. Если объект, можно указать <b>width</b> и <b>height</b>. По умолчанию 1000×1000 при значении <i>true</i>.</li> <li><b>slice_check</b> - (<i>boolean</i>) добавляет HTML-страницу в архив для проверки корректности экспорта всех частей.</li> </ul></td>
  </tr>
  </tbody>
</table>


**Пример вызова методов экспорта с дополнительными параметрами**
~~~js
gantt.exportToPDF({
    name:"mygantt.pdf",
    header:"<h1>My company</h1>",
    footer:"<h4>Bottom line</h4>",
    locale:"en",
    start:"01-04-2013",
    end:"11-04-2013",
    skin:'terrace',
    data:{ },
    server:"https://myapp.com/myexport/gantt",
    raw:true,
    callback: function(res){
        alert(res.url);
    }
});

gantt.exportToPNG({
    name:"mygantt.png",
    header:"<h1>My company</h1>",
    footer:"<h4>Bottom line</h4>",
    locale:"en",
    start:"01-04-2013",
    end:"11-04-2013",
    skin:'terrace',
    data:{ },
    server:"https://myapp.com/myexport/gantt",
    raw:true,
    callback: function(res){
        alert(res.url);
    }
});
~~~

## Имя выходного файла

Чтобы задать пользовательское имя для экспортируемого файла, используйте свойство **name** в параметрах методов [exportToPDF/exportToPNG](guides/export.md#parametersoftheexportmethods):

~~~js
gantt.exportToPDF({
    name:"my_beautiful_gantt.pdf"/*!*/
});
~~~

## Язык выходного файла

По умолчанию экспортируемая диаграмма Gantt использует тот же язык, что и на странице.

Чтобы экспортировать на другом языке, укажите свойство **locale** в параметрах методов [exportToPDF/exportToPNG](guides/export.md#parametersoftheexportmethods):

~~~js
gantt.exportToPDF({
    name:"mygantt.pdf",
    locale:"de" /*!*/
});
~~~


## Данные для экспорта {#datatoexport}


Есть два способа указать, какие задачи попадут в экспортируемый PDF или PNG:

1. [Задать диапазон дат для экспортируемых данных.](#daterange)
2. [Указать собственный источник данных для экспорта.](#customdata)

<a id="daterange"></a>

### Задание диапазона дат для экспорта задач

Чтобы задать диапазон задач для экспорта, используйте свойства **start** и **end** в параметрах методов [exportToPDF/exportToPNG](guides/export.md#parametersoftheexportmethods):

~~~js
gantt.exportToPDF({
    name:"mygantt.pdf",
    start:"01-04-2013",/*!*/
    end:"11-04-2013"/*!*/
});
~~~

:::note
Имейте в виду, что формат даты определяется конфигурацией [date_format](api/config/date_format.md).
:::

<a id="customdata"></a>

### Задание пользовательского источника данных для экспорта

Если вы хотите экспортировать диаграмму Gantt с другим набором данных, отличным от отображаемого на странице, используйте свойство **data** в параметрах методов 
[exportToPDF/exportToPNG](guides/export.md#parametersoftheexportmethods):

~~~js
gantt.exportToPDF({
    data:{/*!*/
        data:[
            {id:1, text:"Project #1", start_date:"01-04-2013", duration:18},
            {id:2, text:"Task #1", start_date:"02-04-2013",duration:8, parent:1},
            {id:3, text:"Task #2", start_date:"11-04-2013",duration:8, parent:1}
        ],
        links:[
            {id:1, source:1, target:2, type:"1"},
            {id:2, source:2, target:3, type:"0"},
            {id:3, source:3, target:4, type:"0"},
            {id:4, source:2, target:5, type:"2"}
        ]
    }
});
~~~

:::note
Обратите внимание, что параметр **data** должен быть объектом с данными; нельзя указывать URL в качестве значения.
:::

## Скин экспортируемой диаграммы Gantt {#skinoftheoutputganttchart}

По умолчанию экспортируемая диаграмма Gantt сохраняет тот же скин, что и на странице.

Чтобы применить другой скин к экспортируемому PNG или PDF-файлу, используйте свойство **skin** в параметрах методов [exportToPDF/exportToPNG](guides/export.md#parametersoftheexportmethods):

~~~js
gantt.exportToPDF({
    name:"mygantt.pdf",
    skin:"material"/*!*/ 
});
~~~

[Смотрите полный список доступных скинов Gantt](guides/skins.md).


## Заголовок/подвал выходного файла {#headerfooteroftheoutputfile}

Вы можете добавить заголовок или подвал в экспортируемый PNG или PDF файл, используя свойства **header** и **footer** в параметрах методов [exportToPDF/exportToPNG](guides/export.md#parametersoftheexportmethods):

:::note
В эти параметры можно включать любой HTML. При добавлении изображений убедитесь, что используете глобальные пути для атрибута "src".
:::

~~~js
gantt.exportToPDF({
    name:"mygantt.pdf",
    header:"<h1>My company</h1>",/*!*/
    footer:"<h4>Bottom line</h4>"/*!*/
});
~~~

## Пользовательский стиль для выходного файла {#customstylefortheoutputfile}

Чтобы настроить стиль экспортируемой диаграммы Gantt, вы можете добавить таблицу стилей с вашими CSS-классами двумя способами:

- Подключив внешнюю таблицу стилей:

~~~js
gantt.exportToPDF({
    name:"calendar.pdf",
    header:'<link rel="stylesheet" href="http://mysite.com/custom.css">' /*!*/
});
~~~

- Или встроив стили напрямую с помощью тега 'style':

~~~js
gantt.exportToPDF({
    name:"calendar.pdf",
    header:'<style>... custom css classes here ...</style>' /*!*/
});
~~~

Обратите внимание, что этот способ работает с HTTP-ссылками, доступными глобально. Если ваши CSS-файлы размещены во внутренней сети или локально, вы можете встроить стили напрямую следующим образом:

~~~js
gantt.exportToPDF({
    header:"<style>.tier1{background: red; color:white;}</style>"
});
~~~

:::note
Дополнительные примеры смотрите в статье [How to add resource chart or custom styles in the exported PDF file](guides/how-to.md#howtoaddresourcechartorcustomstylesintheexportedpdffile).
:::

### Сбор всех стилей для функции экспорта

Иногда стили разбросаны по нескольким файлам, которые недоступны публично, и неудобно подключать их по отдельности. Вы можете собрать все стили, используемые на странице, и включить их в header для экспорта.

Все стили доступны в объекте **document.styleSheets**. Если стили находятся на одном домене, вы можете собрать их CSS-правила и вставить в **header**. Пример:

~~~js
const styles = []
for (el in document.styleSheets) {
    try {
        const rules = (document.styleSheets[el]).cssRules;
        for (rule in rules) {
            styles.push(rules[rule].cssText)
        }
    }
    catch (e) { }
}

gantt.exportToPDF({
    raw: true,
    header: "<style>" + styles.join(" ") + "</style>"
});
~~~ 


**Related example:** [Export Gantt with custom icons to PDF](https://snippet.dhtmlx.com/osbscj62)


**Related example:** [Export Gantt with resource load diagram to PDF with no need to specify styles](https://snippet.dhtmlx.com/duf5ijuv)


## Экспорт пользовательской разметки и стилей {#exportingcustommarkupandstyles}

По умолчанию диаграмма Gantt экспортируется на основе заданной конфигурации и загруженных данных, однако [пользовательские элементы](guides/baselines.md) и некоторые шаблоны не включаются.

Чтобы экспортировать всю разметку Gantt так, как она отображается, включая все пользовательские элементы, установите свойство **raw:true** в параметрах методов [exportToPDF/exportToPNG](guides/export.md#parametersoftheexportmethods).

~~~js
gantt.exportToPDF({
    raw:true
});
~~~

Имейте в виду, что пользовательским элементам могут понадобиться [пользовательские стили](guides/export.md#customstylefortheoutputfile) для корректного отображения.

Также при использовании этого режима увеличивается размер API-запроса. Крупные диаграммы могут превысить лимит в 10 МБ онлайн-сервиса экспорта и не экспортироваться. В таких случаях потребуется установить [экспортный сервис](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) локально и скорректировать допустимый размер запроса.


См. [системные требования](guides/export-requirements.md) для локальной настройки сервисов экспорта.

## Экспорт HTML-элементов {#exportinghtmlelements}

При экспорте диаграммы Gantt в PNG или PDF учтите, что экспорт HTML-элементов имеет ограничения по соображениям безопасности.

Некоторые HTML-элементы, такие как `<canvas>`, `<svg>`, `<script>`, а также изображения с Base64-данными в атрибуте *src*, запрещены. Однако есть безопасные способы экспорта изображений в SVG и Base64:

- Используйте элемент `<img>` с атрибутом *src*, указывающим на URL SVG-изображения (работает для экспорта PNG и JPG, но не Base64), например:

~~~html
<img src="https://www.svgrepo.com/download/530597/hat.svg">
~~~

- Используйте CSS-стили, такие как *background* или *background-image* со значением `url`, указывающим на URL изображения или Base64-данные (работает для экспорта PNG, JPG и SVG):

~~~css
.red {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH1ggDCwMADQ4NnwAAAFVJREFUGJWNkMEJADEIBEcbSDkXUnfSgnBVeZ8LSAjiwjyEQXSFEIcHGP9oAi+H0Bymgx9MhxbFdZE2a0s9kTZdw01ZhhYkABSwgmf1Z6r1SNyfFf4BZ+ZUExcNUQUAAAAASUVORK5CYII=") 100%/contain no-repeat;
    display: inline-block;
    width: 32px;
    height: 32px;
}
~~~


**Related example:** [Exporting safe and insecure HTML elements to PDF](https://snippet.dhtmlx.com/hj6w4dk3?text="gantt")


Если у вас есть модуль экспорта и требуется экспортировать HTML-элементы, которые не поддерживаются онлайн-сервером экспорта, вы можете обратиться в поддержку за инструкциями по модификации вашего модуля для снятия этих ограничений. Имейте в виду, что это может сделать ваш сервер уязвимым для XSS-атак.

