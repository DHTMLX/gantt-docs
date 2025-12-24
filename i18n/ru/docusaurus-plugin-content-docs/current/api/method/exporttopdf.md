---
sidebar_label: exportToPDF
title: exportToPDF method
description: "экспортирует диаграмму Ганта в PDF-файл"
---

# exportToPDF

### Description

@short: Экспортирует диаграмму Ганта в PDF-файл

@signature: exportToPDF: (_export_?: any) =\> void

### Parameters

- `export` - (optional) *object* - необязательный параметр, содержит настройки экспорта (см. детали ниже)

### Example

~~~jsx
gantt.exportToPDF();
 
//или
gantt.exportToPDF({
  name: "mygantt.pdf"
});

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
~~~

### Details

:::note
 Этот метод является частью расширения **export**, поэтому убедитесь, что активирован плагин [export_api](guides/extensions-list.md#exportservice). Более подробную информацию можно найти в статье [Экспорт в PDF и PNG](guides/export.md).
:::

:::note
 Для версий Gantt старше 8.0 необходимо подключить **https://export.dhtmlx.com/gantt/api.js** на вашей странице, чтобы включить онлайн-сервис экспорта, например:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::


Метод [exportToPDF](api/method/exporttopdf.md) принимает объект с различными необязательными свойствами:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) имя файла для экспортируемого PDF</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>skin</b></td>
  <td>(<i>'terrace', 'skyblue', 'meadow', 'broadway'</i>) тема, применяемая к экспортируемой диаграмме Ганта</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>locale</b></td>
  <td>(<i>string</i>) язык, используемый в экспортируемой диаграмме Ганта</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>start</b></td>
  <td>(<i>string</i>) определяет дату начала диапазона данных, отображаемых в экспортируемой диаграмме. Формат даты соответствует настройкам [date_format](api/config/date_format.md)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>end</b></td>
  <td>(<i>string</i>) определяет дату окончания диапазона данных, отображаемых в экспортируемой диаграмме. Формат даты соответствует настройкам [date_format](api/config/date_format.md)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>data</b></td>
  <td>(<i>object</i>) позволяет указать собственный источник данных для экспортируемой диаграммы</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) HTML-содержимое, которое будет добавлено в шапку экспортируемого PDF</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) HTML-содержимое, которое будет добавлено в подвал экспортируемого PDF</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) URL API-эндпойнта, обрабатывающего запрос на экспорт. Может использоваться для локального сервиса экспорта. По умолчанию <strong>https://export.dhtmlx.com/gantt</strong></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>raw</b></td>
  <td>(<i>boolean</i>) если true, экспортирует разметку Ганта точно как есть, включая кастомные элементы. По умолчанию <em>false</em>. [Подробнее](guides/export.md#exportingcustommarkupandstyles) </td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>callback</b></td>
  <td>(<i>function</i>) функция, которая получает JSON-объект с полем url для скачивания сгенерированного PDF-файла</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) дополнительные настройки, которые могут включать:<ul><li><b>format</b> - (<i>string</i>) формат выходного файла: <i>'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'</i></li><li><b>landscape</b> - (<i>boolean</i>) устанавливает альбомную или книжную ориентацию; работает только если указан "format"</li><li><b>width</b> - (<i>string|number|"content"</i>) ширина страницы, используется при экспорте нескольких страниц</li><li><b>height</b> - (<i>string|number|"content"</i>) высота страницы, используется при экспорте нескольких страниц</li><li><b>merge_pages</b> - (<i>boolean</i>) объединяет многостраничный экспорт в один файл; если false, требуется несколько экспортов для полного охвата данных</li><li><b>fixed_headers</b> - (<i>boolean</i>) отображает заголовки grid и timeline на каждой странице; по умолчанию false и требует включения <b>merge_pages</b></li></ul></td>
  </tr>
  </tbody>
</table>

## Ограничения по времени


:::note
 Сервис экспорта применяет ограничения по времени. 
:::

Если экспорт занимает больше 20 секунд, процесс будет отменён и вы увидите ошибку:

~~~html
Error: Timeout trigger 20 seconds
~~~

Если много пользователей экспортируют диаграммы Ганта одновременно, процесс может занять больше времени, чем обычно. Однако время экспорта для каждого пользователя отслеживается отдельно.

:::note
 Для экспорта больших диаграмм рассмотрите возможность использования [standalone export module](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml). Этот модуль бесплатен при наличии лицензии [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) или [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), либо может быть приобретён отдельно [здесь](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210). 
:::


## Многостраничный экспорт


Имейте в виду, что модуль экспорта не может:

- контролировать разрывы страниц, поэтому задачи могут быть разделены между страницами
- отображать шкалы на каждой странице без наложения задач
- показывать заголовки и подвал на каждой странице без наложения строк задач

Для решения этих задач нужны кастомные решения. Ниже приведены некоторые примеры.

## Автоматический экспорт данных в один файл

Для экспорта нескольких страниц в один файл можно использовать онлайн-сервис экспорта (с учетом [временных ограничений](#timerestrictions)) или standalone [export module](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) (без ограничений).
Просто установите опцию **merge_pages** в **additional_settings**:

~~~js
gantt.exportToPDF({
    additional_settings: {
        merge_pages: true, /*!*/
        format: "A4"
    }
});
~~~

Онлайн-сервис экспорта хорошо подходит для небольших диаграмм. Для больших диаграмм данные могут экспортироваться частями. В этом случае вы можете [выполнить несколько ручных экспортов](#manual_export) или использовать export module, который обрабатывает все данные и создаёт единый файл со всеми страницами.

:::note
Sample: [Многостраничный экспорт в один файл](https://snippet.dhtmlx.com/2qzecnke) 
:::

Обратите внимание, что многостраничный экспорт занимает больше времени, чем экспорт всех данных на одной странице. Чтобы ускорить процесс, рассмотрите изменение масштаба на недели, месяцы или годы, что уменьшит ширину диаграммы Ганта и время экспорта.

Для более подробной информации смотрите [соответствующую статью в блоге](https://dhtmlx.com/blog/maintenance-release-pdf-export-module-gantt-0-6-4-scheduler-0-6-5-suite-8-3-10-kanban-1-5-12/#:~:text=Multipage%20Export%20in%20One%20PDF%20File).

### Выполнение нескольких экспортов вручную {#manual_export}

Поскольку диаграммы Ганта обычно превышают стандартный размер страницы, экспорт будет захватывать только левую часть каждый раз.
Чтобы экспортировать все данные, нужно сделать несколько экспортов, сдвигая диаграмму влево каждый раз.

Чтобы сдвинуть диаграмму Ганта в экспортируемом файле, добавьте это правило стиля к **#gantt_here** через параметр **header**:

~~~js
const width = 1000;
const height = 1000;
const total_width = gantt.$task_bg.scrollWidth + gantt.$grid.scrollWidth;

for (let i = 0; i < total_width; i += width) {
  gantt.exportToPDF({
    header:`<style>#gantt_here{left:-${i}px;position: absolute;}</style>`,
    //raw: true,
    additional_settings:{
      width: width,
      height: height,
    }
  });
}
~~~

:::note
Sample: [Экспорт в файл с указанным размером ](https://snippet.dhtmlx.com/zbhc506m) 
:::

Если экспортируете в конкретный формат, например 'A3', имейте в виду, что формат файла использует миллиметры, а размеры HTML - в пикселях.
Вам нужно будет преобразовать миллиметры в пиксели для значения сдвига:

~~~js
const widthMM = 297;
const width = widthMM / (25.4 inch / 96 PDF PPI);
~~~

:::note
Sample: [Экспорт в файл указанного формата](https://snippet.dhtmlx.com/qt54zfuw) 
:::

<br>
**Примечание:** Если при многостраничном экспорте получается только один PDF-файл, возможно, ваш браузер блокирует всплывающие окна, так как несколько экспортов одновременно открывают попапы.
Разрешите всплывающие окна и попробуйте экспортировать снова.

![blocked_popup](/img/popup_blocked.png)


## Отображение заголовков timeline и grid на каждой странице

Чтобы показывать заголовки timeline и grid на каждой странице экспортируемого файла, включите опцию **fixed_headers** в **additional_settings**.
Это работает только если также включена опция **merge_pages**:

~~~js
gantt.exportToPDF({
    additional_settings: {
        merge_pages: true,  /*!*/
        fixed_headers: true,  /*!*/
        format: "A4"
    }
});
~~~

:::note
Sample: [Многостраничный экспорт с заголовками на каждой странице](https://snippet.dhtmlx.com/w905ht5t) 
:::

:::note
Sample: [Многостраничный экспорт с заголовками на каждой странице для Resource panel view](https://snippet.dhtmlx.com/xkmvduu5) 
:::

Если хотите добиться этого без конфигурации, например при экспорте нескольких файлов и их последующем объединении вручную, используйте этот CSS:

~~~css
.grid_cell .gantt_grid_scale,
.timeline_cell .gantt_task_scale {
  position: fixed;
  top:0;
  z-index:99999;
}
~~~

### Related API
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- [Экспорт в PDF и PNG](guides/export.md)
- [Решения](guides/how-to.md#howtoaddresourcechartorcustomstylesintheexportedpdffile)

