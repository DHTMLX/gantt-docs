---
title: "Модули экспорта"
sidebar_label: "Модули экспорта"
---

# Модули экспорта

Модуль экспорта — это сервис экспорта, который вы устанавливаете на собственный сервер вместо использования онлайн-сервиса экспорта по адресу `https://export.dhtmlx.com`. Чтобы отправлять запросы экспорта и импорта в ваш модуль, задайте в параметре `server` методов экспорта и импорта адрес модуля:

~~~js
gantt.exportToPDF({
    server: "https://myapp.com/myexport/gantt"
});
~~~

Используйте модуль экспорта, когда нужно экспортировать большие диаграммы, экспортировать без ограничений онлайн-сервиса экспорта или хранить данные проекта в собственной сети. Список форматов и методов см. в статье [Экспорт и импорт данных](guides/export-common.md).

## Два модуля

| Модуль | Технология | Форматы | Требования | Установка | История версий |
|---|---|---|---|---|---|
| Модуль PDF/PNG/Excel | Node.js, также доступен как образ Docker | PDF, PNG, Excel (экспорт и импорт), iCal, JSON | [Системные требования](guides/export-requirements.md#pdfpngexcel-service) | [Модуль экспорта для PDF, PNG, Excel и iCal](guides/pdf-export-module.md) | [Что нового](guides/pdf-export-module-whatsnew.md) |
| Модуль MS Project/P6 | .NET (C#) | MS Project и Primavera P6 (экспорт и импорт) | [Системные требования](guides/export-requirements.md#import-and-export-from-ms-project-and-primavera-p6) | [Модуль экспорта для MS Project и Primavera P6](guides/msp-export-module.md) | [Что нового](guides/msp-export-module-whatsnew.md) |

Оба модуля можно скачать в [Клиентской зоне](https://dhtmlx.com/clients/) на вкладке Загрузки.

## Как два модуля работают вместе {#service-topology}

Каждый модуль обрабатывает только свои форматы:

- Модуль PDF/PNG/Excel создаёт файлы PDF, PNG, Excel, iCal и JSON и импортирует файлы Excel. Он не может преобразовывать файлы MS Project и Primavera P6. Получив запрос MS Project или Primavera P6, он пересылает его в сервис MS Project.
- Модуль MS Project/P6 обрабатывает только запросы MS Project и Primavera P6. Другие запросы, например, `gantt.exportToPDF({server: "msp-module-url"})`, не работают.

| Методы | Что делает модуль PDF/PNG/Excel с запросом |
|---|---|
| `exportToPDF()`, `exportToPNG()`, `exportToExcel()`, `importFromExcel()`, `exportToICal()`, `exportToJSON()` | Обрабатывает его сам |
| `exportToMSProject()`, `importFromMSProject()`, `exportToPrimaveraP6()`, `importFromPrimaveraP6()` | Пересылает его по адресу из переменной окружения `MSP_SERVICE_ENDPOINT`. Адрес по умолчанию — онлайн-сервис `https://export.dhtmlx.com/msproject` |

:::warning
По умолчанию модуль PDF/PNG/Excel на вашем сервере отправляет все данные MS Project и Primavera P6 в онлайн-сервис экспорта по адресу `https://export.dhtmlx.com/msproject`. Чтобы хранить эти данные в своей сети, установите модуль MS Project/P6 и задайте в `MSP_SERVICE_ENDPOINT` его адрес.
:::

Запросы MS Project и Primavera P6 можно также отправлять в модуль MS Project/P6 напрямую: задайте в параметре `server` методов `exportToMSProject()`, `importFromMSProject()`, `exportToPrimaveraP6()` и `importFromPrimaveraP6()` его адрес.

## Как хранить все данные внутри вашей сети

1. Задайте в параметре `server` каждого используемого метода экспорта и импорта адрес вашего модуля. Метод без `server` отправляет данные в онлайн-сервис экспорта.
2. Если запросы MS Project или Primavera P6 проходят через модуль PDF/PNG/Excel, задайте в его переменной окружения `MSP_SERVICE_ENDPOINT` корневой адрес вашего модуля MS Project/P6, например:

   ~~~
   MSP_SERVICE_ENDPOINT=http://localhost:5128
   ~~~

3. Если экспорт не должен обращаться к хостам за пределами вашей сети, ограничьте внешние ресурсы, которые модуль PDF/PNG/Excel может загружать при отрисовке диаграммы. Для этого служат переменные окружения `EXPORT_ALLOWED_RESOURCE_HOSTS` и `EXPORT_BLOCK_EXTERNAL_RESOURCES`. Они описаны в файле README модуля.

## Лицензия и загрузка

Модули экспорта не входят в пакет Gantt. Модуль экспорта предоставляется бесплатно, если вы получили Gantt по лицензии [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) или [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), или вы можете [купить модуль отдельно](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210). Прочитайте [соответствующую статью](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml), чтобы узнать условия использования каждого из них.

После получения лицензии скачайте модули в Клиентской зоне на вкладке Загрузки.