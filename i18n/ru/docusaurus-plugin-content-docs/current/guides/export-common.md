---
title: "Экспорт и импорт данных"
sidebar_label: "Экспорт и импорт данных"
---

# Экспорт и импорт данных

dhtmlxGantt может экспортировать диаграмму в файлы PDF, PNG, Excel, iCal, MS Project, Primavera P6 и JSON, а также импортировать данные из файлов Excel, MS Project и Primavera P6. Любой экспорт и импорт файлов выполняется через сервис экспорта: либо через онлайн-сервис экспорта, размещённый DHTMLX, либо через [модуль экспорта](guides/export-modules.md), который вы устанавливаете на собственный сервер.

В этой документации:

- **сервис экспорта** — программное обеспечение, которое преобразует данные Gantt в файл или файл в данные Gantt;
- **онлайн-сервис экспорта** — экземпляр сервиса экспорта, который DHTMLX запускает по адресу `https://export.dhtmlx.com`;
- **модуль экспорта** — сервис экспорта, который вы устанавливаете и запускаете самостоятельно.

## Что можно экспортировать и импортировать

| Формат | Экспорт | Импорт | Методы | Модуль экспорта | Руководство |
|---|---|---|---|---|---|
| PDF | Да | - | [exportToPDF()](api/method/exporttopdf.md) | Модуль PDF/PNG/Excel | [PDF и PNG](guides/export.md) |
| PNG | Да | - | [exportToPNG()](api/method/exporttopng.md) | Модуль PDF/PNG/Excel | [PDF и PNG](guides/export.md) |
| Excel | Да | Да | [exportToExcel()](api/method/exporttoexcel.md), [importFromExcel()](api/method/importfromexcel.md) | Модуль PDF/PNG/Excel | [Excel](guides/excel.md) |
| iCal | Да | - | [exportToICal()](api/method/exporttoical.md) | Модуль PDF/PNG/Excel | [iCal](guides/ical.md) |
| MS Project | Да | Да | [exportToMSProject()](api/method/exporttomsproject.md), [importFromMSProject()](api/method/importfrommsproject.md) | Модуль MS Project/P6 | [MS Project](guides/export-msproject.md) |
| Primavera P6 | Да | Да | [exportToPrimaveraP6()](api/method/exporttoprimaverap6.md), [importFromPrimaveraP6()](api/method/importfromprimaverap6.md) | Модуль MS Project/P6 | [Primavera P6](guides/export-primavera.md) |
| Файл JSON | Да | - | [exportToJSON()](api/method/exporttojson.md) | Модуль PDF/PNG/Excel | - |
| JSON или XML на странице | Да | - | [serialize()](api/method/serialize.md) | не нужен, выполняется в браузере | [JSON и XML](guides/serialization.md) |

Чтобы экспортировать и импортировать данные на стороне сервера, см. [Экспорт и импорт данных на Node.js](guides/export-nodejs.md).

## Как работает экспорт

1. Вы включаете плагин `export_api` с помощью метода [plugins](api/method/plugins.md) и вызываете метод экспорта или импорта, например, `gantt.exportToPDF()`.
2. Метод отправляет данные Gantt в сервис экспорта в POST-запросе.
3. Сервис экспорта создаёт файл или считывает импортируемый файл.
4. Браузер получает файл. При импорте функция `callback` метода получает данные. При экспорте функция `callback` может получить вместо этого URL созданного файла.

По умолчанию все методы отправляют запросы в онлайн-сервис экспорта по адресу `https://export.dhtmlx.com/gantt`. Чтобы отправлять их в другой сервис экспорта, например, в собственный модуль экспорта, задайте параметр `server` метода:

~~~js
gantt.exportToPDF({
    server: "https://myapp.com/myexport/gantt"
});
~~~

## Онлайн-сервис экспорта или собственная установка

- **Водяной знак.** Онлайн-сервис экспорта бесплатный, но файлы PDF и PNG, которые он создаёт, содержат водяной знак, если у вас нет действующей лицензии. См. [Лицензия и водяной знак](#license-and-watermark).
- **Ограничения.** У онлайн-сервиса экспорта есть ограничения по времени и размеру запроса. См. [Ограничения онлайн-сервиса экспорта](#service-limits). У установленного вами модуля экспорта ограничения такие, какие вы настроите.
- **Расположение данных.** Онлайн-сервис экспорта обрабатывает ваши данные на серверах DHTMLX. С модулями экспорта вы можете хранить данные в своей сети. См. [Как два модуля работают вместе](guides/export-modules.md#service-topology).
- **Настройка.** Онлайн-сервису экспорта настройка не нужна. Модулю экспорта нужен сервер: Node.js или Docker для модуля PDF/PNG/Excel, .NET для модуля MS Project/P6. См. [Модули экспорта](guides/export-modules.md).

## Ограничения онлайн-сервиса экспорта {#service-limits}

:::note
У онлайн-сервиса экспорта есть ограничения по времени и размеру запроса.
:::

### Ограничения по времени

Если процесс занимает более 20 секунд, экспорт будет прерван и произойдёт следующая ошибка:

~~~html
Error: Timeout trigger 20 seconds
~~~

Если несколько пользователей одновременно экспортируют Gantt, процесс может занимать больше времени, чем обычно. Но это нормально, поскольку время, затраченное на запрос экспорта от конкретного пользователя, считается отдельно.

### Ограничения размера запроса

Существует общий эндпойнт API `https://export.dhtmlx.com/gantt`, который обслуживает все методы экспорта (*exportToPDF*, *exportToPNG*, *exportToMSProject* и т. п.). **Максимальный размер запроса — 10 МБ**.

Есть также отдельный эндпойнт API `https://export.dhtmlx.com/gantt/project`, специфичный для сервисов экспорта/импорта MS Project и Primavera P6 (только для *exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6*). **Максимальный размер запроса: 40 МБ**. Как его использовать, см. в руководствах по [MS Project](guides/export-msproject.md#limits-on-request-size-and-import-of-large-files) и [Primavera P6](guides/export-primavera.md#limits-on-request-size-and-import-of-large-files).

## Лицензия и водяной знак {#license-and-watermark}

:::note
Онлайн-сервис экспорта бесплатный, но выходные файлы PDF и PNG будут содержать водяной знак библиотеки.
Чтобы экспортировать без водяного знака, вам нужна действующая лицензия — результат экспорта будет доступен без водяного знака
в течение действительного периода поддержки (12 месяцев для всех PRO-лицензий).
:::

Модули экспорта не входят в пакет Gantt. Модуль экспорта предоставляется бесплатно, если вы получили Gantt по лицензии [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) или [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), или вы можете [купить модуль отдельно](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210). Прочитайте [соответствующую статью](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml), чтобы узнать условия использования каждого из них.