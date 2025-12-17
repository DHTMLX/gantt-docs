---
sidebar_label: exportToPNG
title: exportToPNG method
description: "экспортирует диаграмму Ганта в виде PNG изображения"
---

# exportToPNG

### Description

@short: Экспортирует диаграмму Ганта в виде PNG изображения

@signature: exportToPNG: (_export_?: any) =\> void

### Parameters

- `export` - (optional) *object* - необязательный, объект с параметрами экспорта (подробнее см. ниже)

### Example

~~~jsx
gantt.exportToPNG();

//или
gantt.exportToPNG({
  name: "mygantt.png"
});

//или
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

### Details

:::note
 Этот метод является частью расширения **export**, поэтому убедитесь, что плагин [export_api](guides/extensions-list.md#exportservice) включён. Дополнительную информацию можно найти в статье [Экспорт в PDF и PNG](guides/export.md).

 
:::

:::note
 Для версий Gantt старше 8.0 необходимо подключить скрипт **https://export.dhtmlx.com/gantt/api.js** на вашей странице для использования онлайн-сервиса экспорта, например:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

Метод [exportToPNG](api/method/exporttopng.md) принимает объект с несколькими необязательными свойствами:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) имя файла для экспортируемого PNG</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>skin</b></td>
  <td>(<i>'terrace', 'skyblue', 'meadow', 'broadway'</i>) визуальная тема для экспортируемой диаграммы Ганта</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>locale</b></td>
  <td>(<i>string</i>) языковая локализация для экспортируемой диаграммы Ганта</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>start</b></td>
  <td>(<i>string</i>) дата начала диапазона данных, отображаемого в экспортируемой диаграмме. Формат даты соответствует настройкам [date_format](api/config/date_format.md)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>end</b></td>
  <td>(<i>string</i>) дата окончания диапазона данных, отображаемого в экспортируемой диаграмме. Формат даты соответствует настройкам [date_format](api/config/date_format.md)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>data</b></td>
  <td>(<i>object</i>) предоставляет кастомный источник данных для использования в экспортируемой диаграмме</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) HTML содержимое, добавляемое в шапку экспортируемого PNG</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) HTML содержимое, добавляемое в подвал экспортируемого PNG</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) URL API эндпоинта для запросов экспорта. Полезно, если у вас есть локальный сервис экспорта. По умолчанию <strong>https://export.dhtmlx.com/gantt</strong></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>raw</b></td>
  <td>(<i>boolean</i>) если true, экспортирует разметку Gantt точно как есть, включая кастомные элементы. По умолчанию <em>false</em>. [Подробнее](guides/export.md#exportingcustommarkupandstyles)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>callback</b></td>
  <td>(<i>function</i>) функция обратного вызова, получающая JSON объект с URL для загрузки сгенерированного PNG</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) дополнительные настройки, включая:
  <ul><li><b>width</b> - (<i>number|string</i>) ширина выходной страницы</li><li><b>height</b> - (<i>number|string</i>) высота выходной страницы</li> Обратите внимание, что <b>width</b> и <b>height</b> игнорируются, если установлен <b>slice_archive</b>.<li><b>slice_archive</b> - (<i>boolean|object</i>) включает экспорт больших диаграмм по частям с упаковкой в архив. Если объект, принимает параметры <b>width</b> и <b>height</b>. Размер части по умолчанию 1000×1000 при значении true.</li><li><b>slice_check</b> - (<i>boolean</i>) добавляет HTML страницу в архив для проверки корректности экспорта всех частей.</li></ul></td>
  </tr>
  </tbody>
</table>

## Экспорт больших диаграмм Ганта по частям

Максимальный размер экспорта - 10000×10000 пикселей.

Вы можете задать ширину и высоту с помощью свойств **width** и **height** в **additional_settings**, но если произведение этих значений превысит 100000000 (10000×10000), экспортируемое PNG будет обрезано.

Для работы с большими диаграммами можно экспортировать их по частям и упаковывать в архив с помощью опции **slice_archive** в **additional_settings**:

~~~js
gantt.exportToPNG({
    server: "https://export.dhtmlx.com/beta/gantt",
    additional_settings:{
        //width: 2000,
        //height: 2000,
          slice_archive: {width: 2000, height: 2000},
          slice_check: true,
    }
});
~~~

**Пример:** [Экспорт в PNG изображения](https://snippet.dhtmlx.com/2mprehlx)

Вы можете задать размеры частей, указав **slice_archive** как объект с параметрами *width* и *height*:

~~~js
slice_archive: {width: 2000, height: 2000}
~~~

Или просто установить в *true* для использования размера части по умолчанию 1000×1000:

~~~js
slice_archive: true
~~~

## Ограничения по времени

:::note
 Сервис экспорта имеет ограничение по времени обработки. 
:::

Если экспорт занимает более 20 секунд, он будет отменён, и вы увидите ошибку:

~~~html
Error: Timeout trigger 20 seconds
~~~

Одновременный экспорт от нескольких пользователей может увеличить время обработки, но время экспорта для каждого пользователя отслеживается отдельно.

:::note
 Для экспорта больших диаграмм рассмотрите использование [standalone export module](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml). Этот модуль бесплатен при наличии лицензий [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) или [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), либо может быть приобретён отдельно [здесь](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210). 
:::

### Related API
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- [Экспорт в PDF и PNG](guides/export.md)

