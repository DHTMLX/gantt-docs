---
sidebar_label: exportToPDF
title: exportToPDF method
description: "Экспортирует диаграмму Ганта в формат PDF"
---

# exportToPDF

### Description

@short: Экспортирует диаграмму Ганта в формат PDF

@signature: exportToPDF: (_export_?: any) => void

### Parameters

- `export`	- object - optional, объект с настройками экспорта (подробности см. далее)

### Example

~~~jsx
gantt.exportToPDF();
 
//или
gantt.exportToPDF({
  name: "mygantt.pdf"
});

gantt.exportToPDF({
    name: "mygantt.pdf",
    header: "<h1>My company</h1>",
    footer: "<h4>Bottom line</h4>",
    locale: "en",
    start: "01-04-2026",
    end: "11-04-2026",
    skin: "terrace",
    data: { },
    server: "https://myapp.com/myexport/gantt",
    raw: true,
    callback: (res) => {
        alert(res.url);
    }
});
~~~

### Details

:::note
Этот метод определён в расширении **export**, поэтому необходимо активировать плагин [export_api](guides/extensions-list.md#export-service). Подробности читайте в статье [](guides/export.md).
:::

:::note
note Если вы используете версию Gantt старше 8.0, вам нужно подключить на странице `https://export.dhtmlx.com/gantt/api.js` для включения онлайн-сервиса экспорта, например:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::


Метод [](api/method/exporttopdf.md) принимает в качестве параметра объект с набором свойств (все свойства являются необязательными):

 <table class="webixdoc_links">
	<tbody>
  	<tr>
			<td class="webixdoc_links0"><b>name</b></td>
			<td>(<i>string</i>) имя выходного файла</td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>skin</b></td>
			<td>(<i>'terrace', 'skyblue', 'meadow', 'broadway'</i>) скин выходной диаграммы Ганта</td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>locale</b></td>
			<td>(<i>string</i>) задаёт язык, который будет использоваться в выходном Gantt-чарте</td>
		</tr> 
  <tr>
			<td class="webixdoc_links0"><b>start</b></td>
			<td>(<i>string</i>) устанавливает начальную дату диапазона данных, которые будут представлены в выходном Gantt-чарте. Формат даты определяется конфигурацией date_format</td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>end</b></td>
			<td>(<i>string</i>) устанавливает конечную дату диапазона данных, которые будут представлены в выходном Gantt-чарте. Формат даты определяется конфигурацией date_format</td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>data</b></td>
			<td>(<i>object</i>) устанавливает настраиваемый источник данных, который будет представлен в выходном Gantt-чарте </td>
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
			<td>(<i>string</i>) устанавливает конечную точку API-запроса. Может использоваться с локальной установкой сервиса экспорта. Значение по умолчанию: <strong>https://export.dhtmlx.com/gantt</strong></td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>raw</b></td>
			<td>(<i>boolean</i>) определяет, что вся разметка Gantt будет экспортироваться как есть, со всеми пользовательскими элементами. <em>false</em> по умолчанию. 
  	[Читайте детали](guides/export.md#exportingcustommarkupandstyles)</td>
		</tr>
		<tr>
			<td class="webixdoc_links0"><b>callback</b></td>
			<td>(<i>function</i>) Если хотите получить URL для загрузки сгенерированного PDF-файла, можно использовать свойство callback. Оно принимает JSON-объект с полем url</td>
		</tr>
		<tr>
			<td class="webixdoc_links0"><b>additional_settings</b></td>
			<td>(<i>object</i>) объект с дополнительными настройками. В объект могут входить следующие атрибуты:<ul><li><b>format</b> - (<i>string</i>) формат выходного файла:<i>"A0", "A1", "A2", "A3", "A4", "A5", "A6", "Legal", "Ledger", "Letter", "Tabloid"</i></li><li><b>landscape</b> - (<i>boolean</i>) ориентация портрет/альбом выходного файла. Атрибут действует только если указан атрибут "format"</li><li><b>width</b> - (<i>string|number|"content"</i>) ширина выходной страницы. Атрибут используется при экспорте нескольких страниц</li><li><b>height</b> - (<i>string|number|"content"</i>) высота выходной страницы. Атрибут используется при экспорте нескольких страниц</li><li><b>merge_pages</b> - (<i>boolean</i>) включает мультистраничный экспорт в одном файле; если установить <i>false</i>, придётся сделать экспорт несколько раз, чтобы получить все данные диаграммы</li><li><b>fixed_headers</b> - (<i>boolean</i>) включает отображение заголовков сетки и временной шкалы на каждой странице; <i>false</i> по умолчанию. Работает только с включённой настройкой <b>merge_pages</b></li><li><b>margins</b> - (<i>object</i>) объект с верхними, нижними, левыми и правыми полями выходного PDF-файла. [Подробнее](guides/export.md#margins-of-the-output-pdf-file)</li><li><b>header</b> - (<i>string</i>) задаёт заголовок, который будет добавлен на каждую страницу выходного PDF-файла. [Подробнее](guides/export.md#headerfooter-of-the-output-file)</li><li><b>footer</b> - (<i>string</i>) задаёт нижний колонтитул на каждой странице выходного PDF-файла. [Подробнее](guides/export.md#headerfooter-of-the-output-file)</li></ul></td>
		</tr>
  </tbody>
</table>

### Time restrictions

:::note
Сервис экспорта имеет ограничения по времени.
:::

Если процесс занимает более 20 секунд, экспорт будет отменён и возникнет следующая ошибка:

~~~html
Error: Timeout trigger 20 seconds
~~~

Если несколько пользователей экспортируют Gantt одновременно, процесс может занять больше времени, чем обычно. Но это нормально, потому что время, затраченное на экспорт запроса конкретного пользователя, учитывается отдельно.

:::note
Если вам нужно экспортировать крупные диаграммы, вы можете использовать [standalone export module](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml). Экспорт-модуль предоставляется бесплатно, если вы получили Gantt по лицензии [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) или [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), или вы можете [купить модуль отдельно](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210).
:::


### Multi-page export

Обратите внимание, что у экспортного модуля нет технической возможности выполнить следующее:

- контролировать положение обрезки (задачи могут быть разрезаны посередине между страницами)
- отображать шкалы на каждой странице без наложения задач
- отображать заголовок и нижний колонтитул на каждой странице без наложения строк задач

Поэтому для выполнения вышеописанных задач необходимо применить кастомные решения. Ниже приведены некоторые из них.

#### Экспорт данных автоматически в одном файле 

Для мультистраничного экспорта в одном файле можно либо использовать онлайн-сервис экспорта (с учетом ограничений по времени) или 
 stand-alone экспорт-модуль (без ограничений). Все, что нужно — это использовать атрибут **merge_pages** в объекте **additional_settings**:

~~~js
gantt.exportToPDF({
    additional_settings: {
        merge_pages: true, 
        format: "A4"
    }
});
~~~

Сервис экспорта подходит для чарта не очень большого размера. Если диаграмма большая, данные будут экспортированы частично. 
В таком случае можно [сделать несколько экспорта данных вручную](#making-several-data-exports-manually)
или воспользоваться экспорт-модулем. Экспорт-модуль экспортирует все данные сам по себе и предоставляет один файл со всеми страницами. 

**Связанный пример**: [Multi-page export in one file ](https://snippet.dhtmlx.com/2qzecnke)


Недостаток этого метода состоит в том, что экспорт данных требует значительно больше времени, чем экспорт всех данных на одной странице. Чтобы сократить время экспорта Gantt-данных,
вы можете изменить уровень масштабирования (Zoom) и рендерить данные по неделям, месяцам или годам, тогда Gantt будет занимать меньше ширины и вам понадобится произвести экспорт меньше раз.

Посмотрите подробный обзор мультистраничного экспорта в одном PDF-файле в связной блог-посте: https://dhtmlx.com/blog/maintenance-release-pdf-export-module-gantt-0-6-4-scheduler-0-6-5-suite-8-3-10-kanban-1-5-12/#:~:text=Multipage%20Export%20in%20One%20PDF%20File.

#### Making several data exports manually

Так как размеры диаграммы Ганта почти всегда превышают стандартные размеры документа, диаграмма занимает более одной страницы, чтобы поместиться.
При экспорте Gantt экспортируется только левая часть диаграммы в каждый файл PDF. Поэтому для реализации мультистраничного экспорта необходимо экспортировать Gantt несколько раз, каждый раз смещая диаграмму влево.

Чтобы сместить Gantt в экспортированном файле, добавьте следующее правило стиля в **#gantt_here** в параметре **header**:

~~~js
const width = 1000;
const height = 1000;
const total_width = gantt.$task_bg.scrollWidth + gantt.$grid.scrollWidth;

for (let i = 0; i < total_width; i += width) {
    gantt.exportToPDF({
        header:`<style>#gantt_here{left:-${i}px;position: absolute;}</style>`,
        //raw: true,
        additional_settings: {
            width: width,
            height: height,
        }
    });
}
~~~

**Связанный пример**: [Export to the file of defined sizes ](https://snippet.dhtmlx.com/zbhc506m)

Если вам нужно экспортировать Gantt в конкретный формат (например, 'A3'), учтите, что формат файла определяется в миллиметрах, но размер в HTML задаётся в пикселях. Следовательно, нужно преобразовать значение смещения из миллиметров в пиксели. 

~~~js
const widthMM = 297;
const width = widthMM / (25.4 inch / 96 PDF PPI);
~~~

**Связанный пример**: [Export to the file of defined format ](https://snippet.dhtmlx.com/qt54zfuw )

**Примечание**, если вы экспортируете мультистраничный Gantt, но получаете только один PDF-файл, это значит, что браузер блокирует всплывающие окна, потому что функция открывает их одновременно. В таком случае включите всплывающие окна и повторите экспорт.

![blocked_popup](/img/popup_blocked.png)


#### Displaying timeline and grid headers on every page in the exported file

Вы можете включить отображение временной шкалы и заголовков сетки на каждой странице экспортируемого файла с помощью атрибута **fixed_headers** в объекте **additional_settings**. Обратите внимание, эта функция работает только при включённом атрибуте **merge_pages** as well:

~~~js
gantt.exportToPDF({
    additional_settings: {
        merge_pages: true, 
        fixed_headers: true,  
        format: "A4"
    }
});
~~~


**Связанный пример**: [Multi-page export with timeline and grid headers on each page](https://snippet.dhtmlx.com/w905ht5t)

**Связанный пример**: [Multi-page export with timeline and grid headers on each page for the Resource panel view](https://snippet.dhtmlx.com/xkmvduu5)


В случае необходимости работы без конфигурации, например, если нужно выполнить несколько операций экспорта и затем объединить файлы вручную, можно применить следующие стили:

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

- [Export to PDF and PNG](guides/export.md)
- [How-tos: How to add resource chart or custom styles in the exported PDF file](guides/how-to.md#how-to-add-resource-chart-or-custom-styles-in-the-exported-pdf-file)