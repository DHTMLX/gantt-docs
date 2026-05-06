---
title: "Раскраска задач"
sidebar_label: "Раскраска задач"
---

# Раскраска задач

Раскраска задач позволяет выделить конкретные задачи, чтобы привлечь внимание пользователей.

![coloring_tasks](/img/coloring_tasks.png)

Чтобы задать пользовательский стиль для задач, можно воспользоваться одним из следующих подходов:

1. [Чтобы переопределить шаблон задач по умолчанию](guides/colouring-tasks.md#redefiningthetaskstemplate)
2. [Чтобы задать значения стилей в свойствах объекта задачи](guides/colouring-tasks.md#specifyingstyleinthepropertiesofataskobject)
3. [Чтобы генерировать стили из данных](guides/colouring-tasks.md#loadingcolorswithdata)

## Переопределение шаблона задачи {#redefiningthetaskstemplate}

Чтобы задать пользовательский стиль для задачи через шаблон, используйте шаблон [task_class](api/template/task_class.md). Например, чтобы раскрашивать задачи в зависимости от их приоритета, используйте следующий код:

**Раскраска задач в зависимости от их приоритета**
~~~css
<style>

    /* high */
    .gantt_task_line.high {
        --dhx-gantt-task-background: #d96c49;
        --dhx-gantt-task-color: #fff;
    }

    /* medium */
    .gantt_task_line.medium {
        --dhx-gantt-task-background: #f57730;
        --dhx-gantt-task-color: #fff;
    }

    /* low */
    .gantt_task_line.low {
        --dhx-gantt-task-background: #fff;
        --dhx-gantt-task-color: #fff;
    }

</style>
~~~

~~~js
gantt.templates.task_class = (start, end, task) => {
    switch (task.priority) {
        case "1":
            return "high";
        case "2":
            return "medium";
        case "3":
            return "low";
        default:
            return "";
    }
};
~~~

**Связанный пример**: [Task styles](https://docs.dhtmlx.com/gantt/samples/04_customization/04_task_styles.html)

:::note
Чтобы стилизовать другие аспекты задач, используйте шаблоны из статьи [Templates of the Timeline Area](guides/timeline-templates.md).
:::

Похожий подход можно применить и к ссылкам. Подробнее об этом можно узнать [здесь](guides/colouring-lines.md#redefiningthelinkstemplate).

## Задание стиля в свойствах объекта задачи {#specifyingstyleinthepropertiesofataskobject}

Чтобы задать пользовательский стиль для задачи, можно добавить 3 дополнительных свойства к объекту данных (или только часть из них):

- **color** - цвет фона панели задачи
- **textColor** - цвет текста внутри панели задачи (не влияет на задачи типа "milestone")
- **progressColor** - цвет индикатора выполнения (по умолчанию просто делает его немного темнее цвета задачи с использованием следующего стиля `background-color: rgb(54, 54, 54); opacity: 0.2`)

![task_color_properties](/img/task_color_properties.png)

:::note
Примечание: это специальные свойства.
По умолчанию Gantt проверяет, присутствуют ли они у задачи, и если есть, применяет соответствующие значения к панели и тексту задачи. В противном случае применяются предопределённые цвета.
:::

**Установка цвета задачи в объекте задачи**
~~~js
const data = {
    tasks: [
        { id: 1, text: "Project #1", start_date: "01-04-2013", duration: 18, color: "red" },
        { id: 2, text: "Task #1", start_date: "02-04-2013", duration: 8, color: "blue", parent: 1 },
        { id: 3, text: "Task #2", start_date: "11-04-2013", duration: 8, color: "blue", parent: 1 }
    ]
};

gantt.init("gantt_here");
gantt.parse(data);

gantt.getTask(1).color = "red";
~~~

**Связанный пример**: [Specify inline colors for Tasks and Links](https://docs.dhtmlx.com/gantt/samples/04_customization/16_inline_task_colors.html)

:::note
Добавление пользовательского цвета через свойство **color** сопровождается добавлением встроенного стиля, который имеет наивысший приоритет среди остальных стилей. В результате критический путь может не быть подсвечен, и любой пользовательский стиль, добавленный вами для изменения фона или цвета задачи, не будет применяться.
:::

Чтобы придать задачам вид критических, используйте следующий код:

~~~css
.gantt_critical_task {
    --dhx-gantt-task-background: #e63030 !important;
}
~~~

**Связанный пример**: [Coloring critical tasks and links](https://snippet.dhtmlx.com/xipdml7a)

Если у задачи задан хотя бы один из свойств, задача получает дополнительный класс **"gantt_task_inline_color"**.

Вы можете использовать этот класс, чтобы переопределить некоторые другие стили для задачи (используйте селектор класса *.gantt_task_line.gantt_task_inline_color*):

~~~css
.gantt_task_line.gantt_task_inline_color .gantt_task_progress {
    background-color: rgb(54, 54, 54);
    opacity: 0.2;
}
~~~

Свойства могут иметь любое допустимое значение цвета CSS, например, все следующие обозначения допустимы:

~~~js
task.color = "#FF0000";
task.color = "red";
task.color = "rgb(255,0,0)";
~~~

Похожий подход можно применить и к ссылкам. Подробнее об этом можно узнать [здесь](guides/colouring-lines.md#specifyingcolorinthepropertiesofthelinkobject).

## Загрузка цветов из данных {#loadingcolorswithdata}

Если цвета являются частью ваших данных, поступающих с сервера, например, когда цвет задачи связан с этапом или ресурсом, назначенным задаче, который не может быть прописан прямо на странице, может быть разумным решением генерировать стили из ваших данных вручную.

Допустим, у вас есть следующая коллекция пользователей, которых можно назначать задачам. Стиль задач должен определяться свойствами записей пользователей:

~~~js
[
    { "key": 1, "label": "John", "backgroundColor": "#03A9F4", "textColor": "#FFF" },
    { "key": 2, "label": "Mike", "backgroundColor": "#f57730", "textColor": "#FFF" },
    { "key": 3, "label": "Anna", "backgroundColor": "#e157de", "textColor": "#FFF" },
    { "key": 4, "label": "Bill", "backgroundColor": "#78909C", "textColor": "#FFF" },
    { "key": 7, "label": "Floe", "backgroundColor": "#8D6E63", "textColor": "#FFF" }
]
~~~

В этом случае пользователи и их цвета создаются и управляются разными частями приложения, и Gantt обычно не знает идентификаторов пользователей и их цветов заранее.

Вот что можно сделать в таком случае:

- Определите именованный serverList для этой коллекции

~~~js
gantt.serverList("people");
~~~

- Загрузите опции на страницу, либо используя [формат данных Gantt](guides/supported-data-formats.md#jsonwithcollections) либо вручную через настраиваемый XHR

- После загрузки опций можно генерировать CSS-правила из данных:

~~~js
gantt.attachEvent("onLoadEnd", () => {
    // используйте произвольный идентификатор для элемента стиля
    const styleElementId = "dynamicGanttStyles";

    // на случай повторной загрузки опций с цветами -
    // повторно используйте ранее созданный элемент стиля

    let styleElement = document.getElementById(styleElementId);
    if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = styleElementId;
        document.head.appendChild(styleElement);
    }
    const cssRules = [];
    const peopleOptions = gantt.serverList("people");

    // сгенерируйте CSS-правила для каждого варианта и запишите CSS в элемент стиля

    peopleOptions.forEach((personOption) => {
        if (personOption.backgroundColor && personOption.textColor) {
            cssRules.push(
                `.gantt_task_line.gantt_resource_${personOption.key}{` +
                `--dhx-gantt-task-background: ${personOption.backgroundColor}; ` +
                `--dhx-gantt-task-color: ${personOption.textColor}; ` +
                `}`
            );
        }
    });
    styleElement.innerHTML = cssRules.join("");
});
~~~

Если вы получаете ресурсы из [resource datastore](api/config/resource_store.md), вам нужно использовать `personOption.id` вместо `personOption.key` в качестве идентификатора ресурса.

- После этого вы сможете назначать связанные классы, сгенерированные вами из шаблонов задач:

~~~js
gantt.templates.task_class = (start, end, task) => {
    const taskCssClasses = [];

    if (task.owner_id) {
        taskCssClasses.push(`gantt_resource_${task.owner_id}`);
    }

    return taskCssClasses.join(" ");
};
~~~

**Связанный пример**: [Assigning owners to tasks](https://docs.dhtmlx.com/gantt/samples/11_resources/01_assigning_resources.html)