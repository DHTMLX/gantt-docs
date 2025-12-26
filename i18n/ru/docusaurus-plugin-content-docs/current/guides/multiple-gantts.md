---
title: "Несколько диаграмм Gantt на одной странице"
sidebar_label: "Несколько диаграмм Gantt на одной странице"
---

# Несколько диаграмм Gantt на одной странице

:::info
Эта функция включена в Gantt PRO версии, доступной с лицензиями Commercial (начиная с 6 октября 2021), Enterprise и Ultimate
:::

По своей сути, dhtmlxGantt работает как статический объект, и его экземпляр по умолчанию всегда присутствует на странице. Вы можете получить к нему доступ в любое время через глобальный объект **gantt**. Однако при необходимости вы также можете создать новый экземпляр gantt.

## Конфигурация экземпляра Gantt {#ganttinstanceconfiguration}

Для создания нового экземпляра dhtmlxGantt используйте метод **Gantt.getGanttInstance()**:

~~~js
// обратите внимание, что "Gantt" начинается с заглавной буквы
const ganttChart = Gantt.getGanttInstance();
~~~

Этот метод может принимать объект конфигурации в качестве аргумента:

~~~js
const gantt = Gantt.getGanttInstance({
    plugins:{
        auto_scheduling: true,
    },
    container: "gantt_here",
    config: {
        work_time: true,
        duration_unit: "minute",
        auto_scheduling_compatibility: true,
        auto_scheduling: true,
        auto_scheduling_strict: true,
        auto_scheduling_initial: true,
        start_date: new Date(2020, 0, 1),
        end_date: new Date(2021, 0, 1),
    },
    calendars: [
        {
            id:"global",
            worktime: {
                hours: ["8:00-17:00"],
                days: [ 0, 1, 1, 1, 1, 0 ,0],
                customWeeks: {
                    lastMonthOfYear: {
                        from: new Date(2020, 11, 1),// 1 декабря 2020
                        to: new Date(2021, 0, 1),// 1 января 00:00, 2021,
                        hours: ["9:00-13:00"],
                        days: [ 0, 1, 1, 1, 1, 1, 0]
                    },
                    firstMonthOfNextYear:{
                        from: new Date(2021, 0, 1),// 1 января 2021
                        to: new Date(2021, 1, 1),// 1 февраля 00:00, 2021,
                        hours: ["14:00-16:00"],
                        days: [ 1, 1, 1, 1, 1, 0, 1]
                    }
                }
            }
        }
    ],
    data: {
        tasks: [
            { id: 11, text: "Project #1", type: "project", "open": true, "parent": 0 },
            { id: 1, start_date: "05-04-2020", text: "1", duration: 1, parent: "11", 
            type: "task" },
            { id: 2, start_date: "05-04-2020", text: "2", duration: 3, parent: "11", 
            type: "task" },
            { id: 3, start_date: "05-04-2020", text: "3", duration: 3, parent: "11", 
            type: "task" },
            { id: 4, start_date: "05-04-2020", text: "4", duration: 3, parent: "11", 
            type: "task" },
            { id: 5, start_date: "05-04-2020", text: "5", duration: 1, parent: "11", 
            type: "task" }
        ], 
        links: [
            { source: "1", target: "2", type: "0", id: 1 },
            { source: "1", target: "3", type: "0", id: 2 },
            { source: "1", target: "4", type: "0", id: 3 },
            { source: "2", target: "4", type: "0", id: 4 },
            { source: "3", target: "4", type: "0", id: 5 },
            { source: "4", target: "5", type: "0", id: 6 }
        ]
    }
});
~~~

Это создаст диаграмму Gantt, инициализированную с заданными параметрами.

Объект config поддерживает следующие свойства:

- **container** - (*string|HTMLElement*) HTML-контейнер (или его id), в котором будет отрисована диаграмма Gantt. Если не указано, Gantt инициализируется без контейнера.
- **config** - (*object*) параметры конфигурации диаграммы Gantt
- **calendars** - (*array*) массив рабочих календарей для загрузки в gantt. Календарь должен быть в формате, поддерживаемом методом [gantt.addCalendar](api/method/addcalendar.md).
- **templates** - (*object*) объект, содержащий шаблоны
- **events** - (*object*) объект с обработчиками событий. 


При указании обработчиков событий для нового экземпляра Gantt используйте следующий формат:

~~~js
const gantt = Gantt.getGanttInstance({
     events: {
          onTaskCreated: function(task){
               task.owner = null;
               return true;
          },
          onTaskClick: function(id){
               alert(gantt.getTask(id).text);
               return true;
          }
     }
})
~~~

- **data** - (*object|string*) данные для загрузки или URL для получения данных
- **plugins** - (*object*) плагины для активации
- **locale** - (*string|object*) двухбуквенный код языка или объект локали для активации

**Обратите внимание**, что вызов **Gantt.getGanttInstance()** без аргументов возвращает объект gantt с настройками по умолчанию. В этом случае вам потребуется настроить, инициализировать и загрузить данные в новый экземпляр как обычно.

Простой пример с двумя диаграммами Gantt, размещёнными вертикально:

~~~js
window.addEventListener("DOMContentLoaded", function(){
    var gantt1 = Gantt.getGanttInstance();
    gantt1.init("gantt_here");
    gantt1.parse(tasksA);

    var gantt2 = Gantt.getGanttInstance();
    gantt2.init("gantt_here_2");
    gantt2.parse(tasksB);
});

<body>
<div id="gantt_here" style="width:100%; height: 50%;"></div>
<div id="gantt_here_2" style="width:100%; height: 50%;"></div>
</body>
~~~

## Интеграция с dhtmlxLayout {#integrationwithdhtmlxlayout}

Один из эффективных способов организации нескольких диаграмм Gantt на странице - использование [dhtmlxLayout](https://docs.dhtmlx.com/layout__index.html). Он предоставляет удобный фреймворк для компоновки и корректно обрабатывает взаимодействие с другими элементами страницы и события изменения размеров.

:::note
Обратите внимание, что dhtmlxLayout - это отдельный продукт, не входящий в библиотеку dhtmlxGantt. Для использования dhtmlxLayout в вашем проекте требуется отдельная покупка лицензии.
Пожалуйста, [ознакомьтесь с вариантами лицензирования](https://dhtmlx.com/docs/products/dhtmlxLayout/#editions-licenses).
:::

**Чтобы прикрепить экземпляр dhtmlxGantt к ячейке layout**, используйте метод **attachGantt()**.

**Примечание:** при прикреплении dhtmlxGantt к ячейке он автоматически инициализируется. Поэтому убедитесь, что вы настроили экземпляр gantt до его прикрепления к layout.

~~~js
function init() {
    var dhxLayout = new dhtmlXLayoutObject(document.body, "2U");

    gantt1 = Gantt.getGanttInstance();
    gantt1.config.min_column_width = 50;
    gantt1.config.scale_height = 90;
    dhxLayout.cells("a").attachGantt(null, null, gantt1); /*!*/
    gantt1.parse(tasksA);
        
    gantt2 = Gantt.getGanttInstance();
    gantt2.config.date_grid = "%Y-%m-%d %H:%i";
    gantt2.config.xml_date = "%Y-%m-%d %H:%i:%s";
    dhxLayout.cells("b").attachGantt(null, null, gantt2); /*!*/
    gantt2.parse(tasksB);
}
~~~

## Деструктор экземпляров Gantt и DataProcessor {#destructorofganttanddataprocessorinstances}

Начиная с версии 5.1, объект dhtmlxGantt предоставляет [destructor](api/method/destructor.md) для очистки ненужных экземпляров gantt.

Пример использования деструктора для экземпляра gantt:

~~~js
var gantt = Gantt.getGanttInstance();
gantt.destructor();
~~~

Этот деструктор выполняет следующие действия:

- очищает данные, загруженные в экземпляр gantt
- уничтожает dataProcessor, если он был прикреплён
- отсоединяет gantt от DOM
- удаляет все DOM-события, добавленные через метод [gantt.event()](api/method/event.md)

Имейте в виду, что деструктор не удаляет хранилища данных, созданные методом [gantt.createDatastore()](api/method/createdatastore.md). Их необходимо уничтожать вручную, например так:

~~~js
// создание хранилища данных
var resourcesStore = gantt.createDatastore({
    name:"resource",
    initItem: function(item){
        item.id = item.key || gantt.uid();
        return item;
    }
});

// уничтожение хранилища данных позже
resourcesStore.destructor();
~~~

### Использование деструктора с Angular

Пример удаления экземпляра gantt при использовании Angular:

~~~js
@Component({selector: 'app-gantt', template: `...`})
class MyGanttComponent implements OnDestroy {
  ngOnInit() {
     this.$gantt = Gantt.getGanttInstance();

     // настройка и инициализация
  }
  
  ngOnDestroy() {
     this.$gantt.destructor();
     this.$gantt = null;
  }
}
~~~

### Отсоединение dataProcessor

Вызов деструктора у dataProcessor очищает экземпляр и отсоединяет его от gantt. Например:

~~~js
var gantt = Gantt.getGanttInstance();
var dp = new gantt.dataProcessor("url");
dp.init(gantt);

// уничтожение dataProcessor и отсоединение от gantt
dp.destructor();
~~~

:::note
Если вы используете пакет, не поддерживающий несколько экземпляров gantt (GPL или Commercial издания), вызов деструктора gantt сделает gantt недоступным до перезагрузки страницы.
:::

