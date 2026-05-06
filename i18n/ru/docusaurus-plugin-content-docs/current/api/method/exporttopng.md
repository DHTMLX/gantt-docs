---
sidebar_label: exportToPNG
title: exportToPNG метод
description: "экспортирует диаграмму Ганта в формат PNG"
---

# exportToPNG

### Description

@short: Экспортирует диаграмму Ганта в формат PNG

@signature: exportToPNG: (_export_?: any) =\> void

### Parameters

- `export`	- object - optional, объект с настройками экспорта (см. детали)

### Example

~~~jsx
gantt.exportToPNG();

//or
gantt.exportToPNG({
  name: "mygantt.png"
});

//or
gantt.exportToPNG({
    name: "mygantt.png",
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
Этот метод определён в расширении **export**, поэтому нужно активировать плагин [export_api](guides/extensions-list.md#export-service). Подробности смотрите в статье [](guides/export.md) .
:::

:::note
Если вы используете версию Gantt ниже 8.0, необходимо включить на странице файл `https://export.dhtmlx.com/gantt/api.js` для включения онлайн-сервиса экспорта, например:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

Метод [](api/method/exporttopng.md) принимает в качестве параметра объект с рядом свойств (все свойства необязательны):

<table class="webixdoc_links">
	<tbody>
  	<tr>
			<td class="webixdoc_links0"><b>name</b></td>
			<td>(<i>string</i>) имя выходного файла</td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>skin</b></td>
			<td>(<i>'terrace', 'skyblue', 'meadow', 'broadway'</i>) скин выходной диаграммы Gantt</td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>locale</b></td>
			<td>(<i>string</i>) задаёт язык, который будет использоваться в выходной диаграмме Gantt</td>
		</tr> 
  <tr>
			<td class="webixdoc_links0"><b>start</b></td>
			<td>(<i>string</i>) устанавливает начальную дату диапазона данных, который будет представлен в выходной диаграмме Gantt. Формат даты определяется конфигурацией [](api/config/date_format.md)</td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>end</b></td>
			<td>(<i>string</i>) устанавливает конечную дату диапазона данных, который будет представлен в выходной диаграмме Gantt. Формат даты определяется конфигурацией [](api/config/date_format.md)</td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>data</b></td>
			<td>(<i>object</i>) устанавливает пользовательский источник данных, который будет представлен в выходной диаграмме Gantt </td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>header</b></td>
			<td>(<i>string</i>) задаёт заголовок, который будет добавлен к выходному изображению PDF. Обратите внимание, здесь можно использовать любой HTML</td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>footer</b></td>
			<td>(<i>string</i>) задаёт подвал, который будет добавлен к выходному изображению PDF. Обратите внимание, здесь можно использовать любой HTML</td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>server</b></td>
			<td>(<i>string</i>) задаёт API-эндпойнт для запроса. Может использоваться с локальной установкой сервиса экспорта. Значение по умолчанию <strong>https://export.dhtmlx.com/gantt</strong></td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>raw</b></td>
			<td>(<i>boolean</i>) определяет, что вся разметка Gantt будет экспортирована как есть, со всеми пользовательскими элементами. <em>false</em> по умолчанию. [Подробнее](guides/export.md#exportingcustommarkupandstyles) </td>
		</tr>
		<tr>
			<td class="webixdoc_links0"><b>callback</b></td>
			<td>(<i>function</i>) Если нужно получить URL для загрузки сгенерированного PNG-файла, можно использовать свойство callback. Оно получает JSON-объект с полем url</td>
		</tr>
		<tr>
			<td class="webixdoc_links0"><b>additional_settings</b></td>
			<td>(<i>object</i>) объект с дополнительными настройками. Объект может содержать следующие атрибуты:
			<ul><li><b>width</b> - (<i>number|string</i>) ширина выходной страницы</li><li><b>height</b> - (<i>number|string</i>) высота выходной страницы</li>Параметры <b>width</b> и <b>height</b> будут проигнорированы, если указан <b>slice_archive</b>.<li><b>slice_archive</b> - (<i>boolean|object</i>) позволяет сохранять большую диаграмму по частям и получать их в архиве. Как объект, атрибут принимает опции <b>width</b> и <b>height</b>. Если размер куска не задан (то есть <i>slice_archive: true</i>), значения по умолчанию равны 1000×1000. </li><li><b>slice_check</b> - (<i>boolean</i>) добавляет HTML-страницу в архив. Страница позволяет проверить, что все куски экспортированы корректно.</li></ul></td>
		</tr>
  </tbody>
</table>

## Экспорт большого Gantt по частям

Максимальные размеры экспортируемого файла — 10000х10000. 

Вы можете увеличить одно из значений и уменьшить другое соответствующим образом через атрибуты **width**/**height** в свойстве **additional_settings**. Но если произведение значений width и height больше 100000000 (10000х10000), выходное PNG-изображение будет обрезано. 

Есть возможность экспортировать диаграмму Ганта по частям и получить их в архиве, используя атрибут slice_archive свойства additional_settings метода:

~~~js
gantt.exportToPNG({
    server: "https://export.dhtmlx.com/beta/gantt",
    additional_settings: {
        //width: 2000,
        //height: 2000,
        slice_archive: { width: 2000, height: 2000 },
        slice_check: true,
    }
});
~~~

**Связанный пример:** [Export into PNG images](https://snippet.dhtmlx.com/2mprehlx)

Вы можете определить размеры выходных PNG-изображений либо через объект с опциями width/height:

~~~js
slice_archive: { width: 2000, height: 2000 }
~~~

или можно установить атрибут в значение true. В этом случае экспортируемые части диаграммы Ганта будут иметь размер по умолчанию: 1000×1000.

~~~js
slice_archive: true
~~~

## Ограничения по времени

:::note
Сервис экспорта имеет ограничения по времени. 
:::

Если процесс займет более 20 секунд, экспорт будет отменён и возникнет следующая ошибка:

~~~html
Error: Timeout trigger 20 seconds
~~~

Если несколько пользователей одновременно экспортируют Gantt, процесс может занять больше обычного времени. Но это нормально, поскольку время, затраченное на экспорт запроса конкретного пользователя, считается отдельно.

:::note
Если вам нужно экспортировать крупные диаграммы, можно воспользоваться [отдельным модулем экспорта](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml). Модуль экспорта предоставляется бесплатно, если у вас есть лицензия на Gantt по [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) или [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), или можно [приобрести модуль отдельно](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210). 
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

- [Export to PDF and PNG](guides/export.md)