---
title: "Экспорт в iCal"
sidebar_label: "iCal"
---

# Экспорт в iCal

Библиотека dhtmlxGantt позволяет экспортировать данные из диаграммы Gantt в формат iCal. Экспорт выполняется через сервис экспорта: онлайн-сервис экспорта или [модуль экспорта](guides/export-modules.md) PDF/PNG/Excel.

Чтобы экспортировать данные из диаграммы Gantt в строку iCal, выполните следующее:

- Чтобы использовать онлайн-сервис экспорта, включите плагин <b>export_api</b> через метод [plugins](api/method/plugins.md):

~~~js
gantt.plugins({
    export_api: true
});
~~~

- Вызовите метод [exportToICal](api/method/exporttoical.md) для экспорта данных из диаграммы Gantt: 

~~~html
<input value="Export to iCal" type="button" onclick='gantt.exportToICal()'>

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~


**Связанный пример**: [Export data: MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)


**Связанный пример**: [Export data: store online](https://docs.dhtmlx.com/gantt/samples/08_api/09_export_store.html)


## Параметры метода экспорта

Метод [exportToICal()](api/method/exporttoical.md) принимает в качестве параметра объект со следующими свойствами (необязательно):

- **server** - (*string*) задаёт конечную точку API для запроса. Может использоваться с локальной установкой сервиса экспорта. Значение по умолчанию: `https://export.dhtmlx.com/gantt`;
- **name** - (*string*) позволяет задать произвольное имя и расширение файла, но экспорт будет выполнен в формате iCal.
  
~~~jsx title="Вызов метода экспорта с необязательными свойствами"
gantt.exportToICal({
    server:"https://myapp.com/myexport/gantt"
});
~~~