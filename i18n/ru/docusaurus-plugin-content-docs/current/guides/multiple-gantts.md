---
title: "Несколько диаграмм Gantt на одной странице"
sidebar_label: "Несколько диаграмм Gantt на одной странице"
---

# Несколько диаграмм Gantt на одной странице

:::info
Эта функциональность доступна в версиях Gantt PRO под коммерческой лицензией (с 6 октября 2021 года), а также в лицензиях Enterprise и Ultimate
:::

По сути, DHTMLX Gantt представляет собой статический объект, и его экземпляр по умолчанию постоянно существует на странице. Вы можете получить к нему доступ через глобальный объект `gantt` в любое время. Но при необходимости можно также создать новый объект Gantt.

## Конфигурация экземпляра Gantt

Чтобы создать новый экземпляр DHTMLX Gantt, используйте метод `Gantt.getGanttInstance()`:

~~~js
// beware, "Gantt" in the command goes with the capital letter
const ganttChart = Gantt.getGanttInstance();
~~~

Метод может принимать в качестве параметра объект конфигурации:

~~~js
const ganttInstance = Gantt.getGanttInstance({
    plugins: {
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
        start_date: new Date(2027, 0, 1),
        end_date: new Date(2028, 0, 1),
    },
    calendars: [
        {
            id: "global",
            worktime: {
                hours: ["8:00-17:00"],
                days: [0, 1, 1, 1, 1, 0, 0],
                customWeeks: {
                    lastMonthOfYear: {
                        from: new Date(2027, 11, 1),
                        to: new Date(2028, 0, 1),
                        hours: ["9:00-13:00"],
                        days: [0, 1, 1, 1, 1, 1, 0]
                    },
                    firstMonthOfNextYear: {
                        from: new Date(2028, 0, 1),
                        to: new Date(2028, 1, 1),
                        hours: ["14:00-16:00"],
                        days: [1, 1, 1, 1, 1, 0, 1]
                    }
                }
            }
        }
    ],
    data: {
        tasks: [
            { id: 11, text: "Project #1", type: "project", "open": true, "parent": 0 },
            { id: 1, text: "1", start_date: "2027-04-05", duration: 1, parent: "11" },
            { id: 2, text: "2", start_date: "2027-04-05", duration: 3, parent: "11" },
            { id: 3, text: "3", start_date: "2027-04-05", duration: 3, parent: "11" },
            { id: 4, text: "4", start_date: "2027-04-05", duration: 3, parent: "11" },
            { id: 5, text: "5", start_date: "2027-04-05", duration: 1, parent: "11" }
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

В итоге получится инициализированная диаграмма Gantt с указанными настройками.

Объект конфигурации может содержать следующие поля:

- `container` - (*string|HTMLElement*) HTML-контейнер или его ID, в котором будет отображаться диаграмма Gantt. Если не указан, Gantt будет инициализирован без контейнера.
- `config` - (*object*) объект с настройками конфигурации диаграммы Gantt
- `calendars` - (*array*) массив календарей рабочего времени, которые будут загружены в экземпляр Gantt. Календари должны задаваться в формате, поддерживаемом методом [`gantt.addCalendar()`](api/method/addcalendar.md)
- `templates` - (*object*) объект с шаблонами
- `events` - (*object*) объект обработчиков событий

Необходимо использовать следующий формат при указании обработчиков событий для нового экземпляра Gantt:

~~~js
const ganttInstance = Gantt.getGanttInstance({
    events: {
        onTaskCreated: (task) => {
            task.owner = null;
            return true;
        },
        onTaskClick: (taskId) => {
            alert(ganttInstance.getTask(taskId).text);
            return true;
        }
    }
});
~~~

- `data` - (*object|string*) объект с данными для загрузки или URL для загрузки данных
- `plugins` - (*object*) расширения, которые нужно активировать
- `locale` - (*string|object*) двухбуквенный код языка или объект локали, которую нужно активировать

Обратите внимание, что вызов метода `Gantt.getGanttInstance()` без параметров вернёт объект Gantt с настройками конфигурации по умолчанию. Поэтому вам нужно будет сконфигурировать ваш новый экземпляр, инициализировать его и заполнить данными, как обычно.

Рассмотрим простой пример: две диаграммы Gantt, одна под другой:

~~~js
window.addEventListener("DOMContentLoaded", () => {
    const firstGantt = Gantt.getGanttInstance();
    firstGantt.init("gantt_here");
    firstGantt.parse(tasksA);

    const secondGantt = Gantt.getGanttInstance();
    secondGantt.init("gantt_here_2");
    secondGantt.parse(tasksB);
});
~~~

~~~html
<body>
    <div id="gantt_here" style="width: 100%; height: 50%;"></div>
    <div id="gantt_here_2" style="width: 100%; height: 50%;"></div>
</body>
~~~

## Интеграция с DHTMLX Layout

Хороший способ разместить несколько диаграмм Gantt на странице — использовать [DHTMLX Layout](https://docs.dhtmlx.com/suite/layout/).
Он не только предоставляет удобную рамку макета, но и обеспечивает корректное взаимодействие с другими элементами на странице и адаптацию к изменениям размера страницы.

:::note
Обратите внимание, что DHTMLX Layout — отдельный продукт и не является частью библиотеки DHTMLX Gantt. Если вы хотите использовать DHTMLX Layout в своем приложении, следует приобрести лицензию.
Пожалуйста [проверьте варианты лицензирования](https://dhtmlx.com/docs/products/licenses.shtml).
:::

Объект DHTMLX Gantt можно поместить в элемент макета, определив контейнер в ячейке и инициализировав Gantt внутри него.

~~~js
new dhx.Layout("layout_container", {
    rows: [
        {
            id: "top",
            height: "50%",
            html: '<div id="gantt_here" style="width: 100%; height: 100%;"></div>'
        },
        {
            id: "bottom",
            height: "50%",
            html: '<div id="gantt_here_2" style="width: 100%; height: 100%;"></div>'
        }
    ]
});

const firstGantt = Gantt.getGanttInstance();
firstGantt.init("gantt_here");
firstGantt.parse(tasksA);

const secondGantt = Gantt.getGanttInstance();
secondGantt.init("gantt_here_2");
secondGantt.parse(tasksB);
~~~

## Уничтожение экземпляров Gantt и DataProcessor {#destructorofganttanddataprocessorinstances}

Начиная с версии 5.1 объект DHTMLX Gantt имеет метод [`destructor()`](api/method/destructor.md), который можно использовать для уничтожения лишних экземпляров Gantt.

Метод `destructor()` экземпляра gantt может использоваться следующим образом:

~~~js
const ganttInstance = Gantt.getGanttInstance();
ganttInstance.destructor();
~~~

Деструктор выполнит следующие задачи:

- очистить данные, загруженные в экземпляр gantt
- уничтожить обработчик данных, если он присоединён к Gantt
- отсоединить gantt от DOM
- отсоединить все DOM-события, привязанные через метод [`gantt.event()`](api/method/event.md)

Обратите внимание, что деструктор не уничтожает хранилища данных, созданные методом [`gantt.createDatastore()`](api/method/createdatastore.md). Их нужно удалять вручную, вот так:

~~~js
// создание хранилища данных
const ganttInstance = Gantt.getGanttInstance();
const resourcesStore = ganttInstance.createDatastore({
    name: "resource",
    initItem: (item) => {
        item.id = item.key || ganttInstance.uid();
        return item;
    }
});

// удаление хранилища позже
resourcesStore.destructor();
~~~

### Использование деструктора с Angular

Вот пример использования деструктора для уничтожения экземпляра gantt при работе с фреймворком Angular:

~~~ts
@Component({ template: '...' })
class MyGanttComponent implements OnInit, OnDestroy {
    private ganttInstance;

    ngOnInit() {
        this.ganttInstance = Gantt.getGanttInstance();

        // настройка и инициализация
    }

    ngOnDestroy() {
        if (this.ganttInstance) {
            this.ganttInstance.destructor();
        }
    }
}
~~~

### Отсоединение dataProcessor

Вызов деструктора обработчика данных очистит экземпляр обработчика данных и отсоединит его от Gantt. Например:

~~~js
const ganttInstance = Gantt.getGanttInstance();
const dataProcessor = ganttInstance.createDataProcessor({
    url: "url",
    mode: "REST"
});

// уничтожает data processor и отсоединяет его от gantt
dataProcessor.destructor();
~~~

:::note
Если вы используете пакет, который не позволяет создавать несколько экземпляров объекта gantt (GPL или Commercial редакции), вызов деструктора gantt сделает gantt недоступным до перезагрузки страницы.
:::