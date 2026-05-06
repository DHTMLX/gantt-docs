---
title: "Макет Gantt"
sidebar_label: "Макет Gantt"
---

# Раскладка Gantt

Начиная с версии 5.0, Gantt предоставляет возможность задать настраиваемую раскладку и разместить элементы компонента в виде внутренних видов раскладки. Это позволяет использовать дополнительные временные шкалы и гриды, чтобы создать гибкую структуру диаграммы Gantt и задать различные схемы размещения элементов.

Например, можно разместить ещё один грид справа от временной шкалы:

![gantt_two_grids](/img/gantt_two_grids.png)


**Связанный пример**: [Колонки грида справа от Gantt](https://docs.dhtmlx.com/gantt/samples/10_layout/01_rightside_columns.html)


или добавить ещё один грид и временную шкалу под дефолтными.

![gantt_resource_panel](/img/gantt_resource_panel.png)


**Связанный пример**: [Gantt-диаграмма с панелью ресурсов](https://docs.dhtmlx.com/gantt/samples/10_layout/02_resource_panel.html)


## Стандартная раскладка

Раскладка задаётся через конфигурационный параметр [gantt.config.layout](api/config/layout.md). Значения по умолчанию для раскладки выглядят следующим образом:

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        {
          // вид по умолчанию для грида
          view: "grid",
          scrollX: "scrollHor",
          scrollY: "scrollVer"
        },
        { resizer: true, width: 1 },
        {
          // вид по умолчанию для таймлайна
          view: "timeline",
          scrollX: "scrollHor",
          scrollY: "scrollVer"
        },
        {
          view: "scrollbar",
          id: "scrollVer"
        }
      ]
    },
    {
      view: "scrollbar",
      id: "scrollHor"
    }
  ]
}
~~~

Раскладка Gantt состоит из ячеек, занятых видами. Основные и вспомогательные элементы Gantt представлены **видs**, которые являются:

- **грид** - определяет часть грида диаграммы Gantt. Основной грид, предопределённый для отображения задач, имеет *id:"grid"*;
- **таймлайн** - определяет часть таймлайна диаграммы Gantt. Основной таймлайн, предопределённый для отображения задач, имеет *id:"timeline"*;
- **resizer** - определяет линию изменения размера. Чтобы включить резайзер, необходимо установить свойство **resizer** в *true*. **Доступно только в PRO-версии**;
- **scrollbar** - определяет полосы прокрутки, используемые в диаграмме Gantt. Виды **грид** и **таймлайн** можно привязать к конкретным полосам прокрутки. Подробности ниже.
- **resourceGrid** - заранее настроенный грид для панели ресурсов. **Доступно только в PRO-версии**. Узнать подробнее [здесь](guides/resource-management.md).
- **resourceTimeline** - заранее настроенная временная шкала для панели ресурсов. **Доступно только в PRO-версии**. Узнать подробнее [здесь](guides/resource-management.md).

Конфигурация вида задаётся в виде объекта с соответствующими свойствами. 
Вы можете [установить собственные параметры конфигурации](#configs-and-templates-of-views) для видов **grid** и **timeline**. 
Значения по умолчанию берутся из глобального объекта [gantt.config](guides/common-configuration.md#ganttconfigobject).

:::note
Обратите внимание, что конфигурацию раскладки следует задавать до инициализации Gantt. Если вы вносите изменения в раскладку, нужно обновить её с помощью [resetLayout](api/method/resetlayout.md).
:::

## Полосы прокрутки

Полосы прокрутки раскладки задаются через представление **"scrollbar"**. Можно указать как горизонтальную, так и вертикальную полосу прокрутки. 

Чтобы использовать полосу прокрутки в раскладке, необходимо привязать её к соответствующему виду с помощью свойств **scrollX** или **scrollY** через id нужной полосы прокрутки.

### Полоса прокрутки для вида

Можно привязать несколько видов к одной и той же полосе прокрутки. Чтобы привязать вид к полосе прокрутки:

- задайте полосу прокрутки с необходимым направлением прокрутки и назначьте ей идентификатор
- используйте id полосы прокрутки в качестве значения свойства **scrollX/scrollY** внутри объекта конфигурации вида

Если определить полосу прокрутки внутри массива `cols`, будет создана вертикальная полоса прокрутки, если определить её внутри массива `rows`, будет горизонтальная полоса прокрутки.
Либо можно явно задать режим прокрутки с помощью параметра **scroll**:

~~~js
{ view: "scrollbar", id: "scroller", scroll: "x" } // горизонтальная
~~~
или:
~~~js
{ view: "scrollbar", id: "scroller", scroll: "y" } // вертикальная
~~~

Давайте привяжем пользовательские виды грида и таймлайна к вертикальной прокрутке:

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        { view: "grid", scrollY: "scrollVer" },
        { resizer: true, width: 1 },
        { view: "timeline", scrollY: "scrollVer" },
        { view: "scrollbar", id: "scrollVer" }
      ]
    }
  ]
}
~~~

Когда вы прокручиваете вертикальную полосу, и грид, и таймлайн прокручиваются синхронно.
В стандартной раскладке грид и таймлайн привязаны к обеим полосам прокрутки — горизонтальной и вертикальной.

Также можно задать отдельную горизонтальную полосу прокрутки для вида Grid. Подробности в соответствующем разделе [здесь](guides/specifying-columns.md#horizontal-scrollbar).

### Полосы прокрутки для вида

В приведённом выше подразделе мы рассмотрели, как добавить одну конкретную полосу прокрутки к необходимому виду. Для этого достаточно сделать простую конфигурацию раскладки, например:

~~~js
{ cols: [ { rows: [ {}, {} ] }, { rows: [ {}, {} ] } ] }
~~~

или

~~~js
{ rows: [ { cols: [ {}, {} ] }, { cols: [ {}, {} ] } ] }
~~~

Если вам нужно привязать вид к обоим вертикальным и горизонтальным полосам прокрутки, создайте сложную конфигурацию раскладки, когда массивы `cols` и `rows` вложены несколько раз, например:

~~~js
{ cols: [
  {
    rows: [
      {
        cols: [ {}, {} ]
      }, 
      {
        cols: [ {}, {} ]
      }
    ]
  },
  {
    rows: [
      {
        cols: [ {}, {} ]
      }, 
      {
        cols: [
          {
            rows: [ {}, {} ]
          }, 
          {	
            rows: [ {}, {} ]
          }
        ]
      }
    ]
  }
]}
~~~

Следуйте приведённым ниже примерам:

- [Gantt. Раскладка видов с собственными полосами прокрутки](https://snippet.dhtmlx.com/cv9w37tu)
- [Gantt. Універсальная конфигурация раскладки](https://snippet.dhtmlx.com/uqejdyqc)

## Настройка раскладки

Вы можете изменить конфигурацию раскладки по умолчанию и задать нужную схему размещения элементов диаграммы Gantt на странице, используя дополнительные виды раскладки.

Например, можно создать дополнительные виды грида и таймлайна, которые сформируют нижнюю панель ресурсов для основной диаграммы Gantt. Этапы реализации такого гибкого макета:

- создать многострочную раскладку
- добавить в первую строку раскладки дефолтный грид и таймлайн
- добавить в следующую строку дополнительный грид и таймлайн и привязать их к кастомному источнику данных
- вставить резайзер между этими строками
- добавить полосу прокрутки в последнюю строку и привязать её к обеим шкалам: дефолтной и ресурсной

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      // дефолтная раскладка
      cols: [
        { view: "grid", config: mainGridConfig, scrollY: "scrollVer" },
        { resizer: true, width: 1 },
        { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
        { view: "scrollbar", id: "scrollVer" }
      ]
    },
    { resizer: true, width: 1 },
    {
      // кастомная раскладка
      cols: [
        { view: "grid", id: "resourceGrid", bind: "resource",
          config: resourceGridConfig, scrollY: "resourceVScroll"
        },
        { resizer: true, width: 1 },
        { view: "timeline", id: "resourceTimeline", scrollX: "scrollHor",
          bind: "resource", bindLinks: null, layers: resourceLayers,
          scrollY: "resourceVScroll"
        },
        { view: "scrollbar", id: "resourceVScroll" }
      ]
    },
    { view: "scrollbar", id: "scrollHor" }
  ]
};
~~~

В приведённом выше примере добавлен дополнительный вид грида. Он содержит список ресурсов и их загрузку. Также добавлен ещё один вид таймлайна, который отображает распределение рабочих часов за месяц и указывает нормальные и сверхурочные часы.

### Свойства пользовательского грида и таймлайна

У пользовательских грида и таймлайна есть дополнительные свойства:

#### Для видов грида и таймлайна

- **bind** - (*string*) задаёт id хранилища данных, из которого берутся данные ("resource" в примере);

#### Для вида таймлайна

- **bindLinks** - (*string*) указывает источник связей. *null*, если связанных ссылок нет;
- **layers** - (*array*) конфигурационная опция, определяемая как набор функций **addLayer()**, которые описывают способ стилизации данных.

### Добавление хранилища данных для пользовательских видов

Чтобы заполнять пользовательские виды соответствующими данными, нужно добавить отдельное хранилище данных. Чтобы создать новое хранилище, используйте метод [createDatastore](api/method/createdatastore.md) и укажите конфигурацию хранилища данных:

~~~js
const resourcesStore = gantt.createDatastore({
  name: "resource",
  initItem: (item) => {
    item.id = item.key || gantt.uid();
    return item;
  }
});
~~~

В приведённом выше примере добавлено хранилище данных с именем "resource".

Чтобы загрузить данные в пользовательские виды из хранилища данных, используйте метод [parse](api/method/parse.md):

~~~js
resourcesStore.parse([ // resources
  { key: '0', label: "N/A" },
  { key: '1', label: "John" },
  { key: '2', label: "Mike" },
  { key: '3', label: "Anna" }
]);
~~~

Чтобы вернуть конфигурационный объект необходимого хранилища данных, используйте метод [getDatastore](api/method/getdatastore.md):

~~~js
const tasksStore = gantt.getDatastore("task");
~~~

Метод принимает имя хранилища данных в качестве параметра.

:::note
Если вы используете встроенные представления ресурсов, Gantt может автоматически создать для них соответствующее хранилище данных. [Подробнее](guides/resource-management.md#working-with-resource-view-panel).
:::

### Отключение/включение резайзеров динамически {#enable_disable_resizers}

В некоторых случаях может быть нужно динамически отключать резайзеры между ячейками диаграммы Gantt. Самое простое решение — скрыть их через CSS.

Для этого понадобится правило типа следующего:

~~~css
.no_resizers .gantt_resizer {
  display: none;
}
~~~

Затем можно скрыть резайзеры, добавив контейнеру диаграммы класс:

~~~js
gantt.$container.classList.add("no_resizers");
~~~

Чтобы снова показать резайзеры, просто удалите класс:

~~~js
gantt.$container.classList.remove("no_resizers");
~~~

## HTML как внутренний вид

Вы также можете использовать произвольный HTML в качестве внутренних видов раскладки Gantt. Например:

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        { view: "grid", scrollX: "scrollHor", scrollY: "scrollVer" },
        { html: "<div class='custom-content'>custom content</div>",
          css: "custom-content", width: 50
        },
        { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
        { html: "<div class='custom-content'>custom content</div>",
          css: "custom-content", width: 50
        },
        { view: "scrollbar", id: "scrollVer" }
      ]
    },
    { view: "scrollbar", scroll: "x", id: "scrollHor" }
  ]
}
~~~


## Обязательные виды и настройки

Публичный API объекта gantt содержит методы, полученные из конкретных видов раскладки, например [getTaskPosition](api/method/gettaskposition.md), [getTaskNode](api/method/gettasknode.md), [getScrollState](api/method/getscrollstate.md). 

Чтобы эти методы работали ожидаемо, раскладка должна содержать дефолтный грид, таймлайн, полосы прокрутки, и Gantt должен уметь их находить. Это достигается присвоением конкретных id дефолтным видам:

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        { view: "grid", id: "grid", scrollX: "scrollHor",
          scrollY: "scrollVer"
        },
        { view: "timeline", id: "timeline", scrollX: "scrollHor",
          scrollY: "scrollVer"
        },
        { view: "scrollbar", id: "scrollVer" }
      ]
    },
    { view: "scrollbar", id: "scrollHor" }
  ]
};
~~~

Необходимые виды и их ids:

- view: "grid", id: "grid"
- view: "timeline", id: "timeline"
- view: "scrollbar", id: "scrollHor"
- view: "scrollbar", id: "scrollVer"

Обратите внимание, что если id не указан, Gantt может использовать имя вида в качестве.default id или автоматически сгенерировать уникальный id.
Так, для дефолтного грида и таймлайна параметр "id" можно опустить:

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        { view: "grid", scrollX: "scrollHor", scrollY: "scrollVer" },
        { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
        { view: "scrollbar", id: "scrollVer" }
      ]
    },
    { view: "scrollbar", id: "scrollHor" }
  ]
};
~~~

Раскладка может содержать любое дополнительное количество видов.

## Конфигурации и шаблоны видов

Виды Grid и Timeline повторно используют шаблоны и конфигурации из глобальных [gantt.config/gantt.templates](guides/common-configuration.md). Однако эти настройки можно переопределять для конкретных видов на уровне раскладки.

Например: 

~~~js
const secondGridColumns = {
  columns: [
    { name: "status", label: "Status", width: 60, align: "center", 
      template: (task) => {
        const progress = task.progress || 0;
        return Math.floor(progress * 100) + "";
      }
    },
    { name: "impact", width: 80, label: "Impact",
      template: (task) => {
        return (task.duration * 1000).toLocaleString("en-US", {
          style: 'currency', currency: 'USD'
        });
      }
    }
  ]
};

gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        { view: "grid", id: "grid", width: 320, scrollY: "scrollVer" },
        { resizer: true, width: 1 },
        { view: "timeline", id: "timeline", scrollX: "scrollHor",
          scrollY: "scrollVer"
        },
        { resizer: true, width: 1 },
        { view: "grid", width: 120, bind: "task", scrollY: "scrollVer",
          config: secondGridColumns /*!*/
        },
        { view: "scrollbar", scroll: "y", id: "scrollVer" }
      ]
    },
    { view: "scrollbar", id: "scrollHor", height: 20 }
  ]
};
~~~


Виды могут наследовать конфигурации и шаблоны от родительской раскладки:

~~~js
const resourceConfig = {  /*!*/
  scale_height: 30      /*!*/
};                        /*!*/

gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        { view: "grid", group: "grids", scrollY: "scrollVer" },
        { resizer: true, width: 1 },
        { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
        { view: "scrollbar", id: "scrollVer", group: "vertical" }
      ],
      gravity: 2
    },
    { resizer: true, width: 1 },
    {
      config: resourceConfig,   /*!*/
      cols: [
        { view: "resourceGrid", group: "grids", width: 435,
          scrollY: "resourceVScroll"
        },
        { resizer: true, width: 1 },
        { view: "resourceTimeline", scrollX: "scrollHor",
          scrollY: "resourceVScroll"
        },
        { view: "scrollbar", id: "resourceVScroll", group: "vertical" }
      ],
      gravity: 1
    },
    { view: "scrollbar", id: "scrollHor" }
  ]
};
~~~

См. статью [Resource Management](guides/resource-management.md).


## Группы видимости

Иногда требуется синхронизировать видимость элементов в раскладке. Например, если в соседних ячейках есть горизонтальные полосы прокрутки, можно захотеть, чтобы они отображались или скрывались одновременно.

![scrollable_grid](/img/scrollable_grid.png)


**Связанный пример**: [Горизонтальная прокрутка внутри Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/10_scrollable_grid.html)


Рассмотрим ещё один пример. У вас есть несколько гридов в разных строках таймлайна, и вы хотите, чтобы они имели одинаковую ширину. Если один из гридов изменит размер, другой должен принять его размер.

![grid_group_width](/img/grid_group_width.png)


**Связанный пример**: [Диаграмма загрузки ресурсов](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)


Обе эти проблемы можно решить с помощью свойства **group** у вида. Свойство принимает произвольное строковое значение; виды с одинаковым значением группы будут синхронизированы. 

- Для полос прокрутки это означает, что их видимость будет синхронизирована. Если хотя бы одна полоса группы видима, то видимы будут все полосы группы. 

- Для остальных ячеек это означает, что у них будет одинаковая ширина/высота, в зависимости от раскладки.

Синхронизация видимости полос прокрутки:

~~~js
gantt.config.layout = {
  css: "gantt_container",
  cols: [
    {
      width: 400,
      minWidth: 200,
      maxWidth: 600,
      rows: [
        { view: "grid", scrollX: "gridScroll", scrollable: true,
          scrollY: "scrollVer"
        },
        { view: "scrollbar", id: "gridScroll", group: "horizontal" }    /*!*/
      ]
    },
    { resizer: true, width: 1 },
    {
      rows: [
        { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
        { view: "scrollbar", id: "scrollHor", group: "horizontal" }      /*!*/
      ]
    },
    { view: "scrollbar", id: "scrollVer" }
  ]
};
~~~

Синхронизация ширины гридов:

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        { view: "grid", group: "grids", scrollY: "scrollVer" },
        { resizer: true, width: 1 },
        { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
        { view: "scrollbar", id: "scrollVer", group: "vertical" }    /*!*/
      ],
      gravity: 2
    },
    { resizer: true, width: 1 },
    {
      config: resourceConfig,
      cols: [
        { view: "resourceGrid", group: "grids", width: 435,
          scrollY: "resourceVScroll"
        },
        { resizer: true, width: 1 },
        { view: "resourceTimeline", scrollX: "scrollHor",
          scrollY: "resourceVScroll"
        },
        { view: "scrollbar", id: "resourceVScroll", group: "vertical" }   /*!*/
      ],
      gravity: 1
    },
    { view: "scrollbar", id: "scrollHor" }
  ]
};
~~~

## Размеры частей раскладки Gantt

Вы можете регулировать относительные размеры ячеек раскладки Gantt с помощью свойства **gravity**, установленного в конфигурации каждой ячейки. Этот параметр определяет размер ячеек относительно друг друга. 

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        // конфигурация столбцов
      ],
      gravity: 2     /*!*/
    },
    { resizer: true, width: 1 },
    {
      config: resourceConfig,
      cols: [
        // конфигурация столбцов
      ],
      gravity: 1       /*!*/
    },
    { view: "scrollbar", id: "scrollHor" }
  ]
};
~~~

В приведённом выше примере размеры диаграммы Gantt и диаграммы ресурсов образуют соотношение 2:1. Это значит, что диаграмме Gantt достанется 66%, а диаграмме ресурсов — 33%. При использовании соотношения 1:1 для обеих диаграмм будет по 50% каждая.

### Мин/макс ширины/высоты ячеек

Свойства **minWidth/maxWidth** можно использовать для ограничения ширины части раскладки в случае операций изменения размера. Обратите внимание, что эти настройки применимы только к ячейкам внутри массива **cols**. Также можно применить свойства **minHeight/maxHeight** к ячейкам в массиве **rows** для задания минимальной/максимальной высоты ячеек раскладки.

Ниже приведён пример, показывающий, как можно добавить свойства **minWidth/maxWidth** в конфигурацию столбцов:

~~~js
gantt.config.grid_elastic_columns = true;

gantt.config.layout = {
  css: "gantt_container",
  cols: [
    {
      width: 400,
      minWidth: 200, /*!*/
      maxWidth: 600, /*!*/
      rows: [
        { view: "grid", scrollable: true, scrollX: "scrollHor1",
          scrollY: "scrollVer"
        },
        { view: "scrollbar", id: "scrollHor1", scroll: 'x', group: 'hor' }
      ]
    },
    { resizer: true, width: 1 },
    {
      rows: [
        { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
        { view: "scrollbar", id: "scrollHor", scroll: 'x', group: 'hor' }
      ]
    },
    {
      view: "scrollbar", id: "scrollVer"
    }
  ]
};
~~~

## Сокрытие родительских видов раскладки

Если вам нужно скрыть вид раскладки, когда все его дочерние элементы невидимы, укажите в настройке соответствующей ячейки раскладки параметр **hide_empty:true**. Например: 

~~~js
gantt.config.layout = {
  css: "gantt_container",
  cols: [
    {
      hide_empty: true, /*!*/
      rows: [
        { view: "grid" }
      ]
    },
    { resizer: true },
    {
      hide_empty: true, /*!*/
      rows: [
        { view: "timeline" }
      ]
    }
  ]
};
~~~

**Связанный пример**: [Скрытие видов grid/timeline](https://snippet.dhtmlx.com/5/157c0db66)

## Переключение между видами

Если вам нужно переключаться между различными видами раскладки, смотрите разделы [Как переключать сетку/диаграмму](guides/how-to.md#how-to-toggle-gridchart) и [Как переключать представление ресурсов](guides/how-to.md#how-to-toggle-the-resource-view) для получения более подробной информации.

## Замораживание столбцов в виде грида

Вы можете инициализировать диаграмму Gantt так, чтобы один или несколько столбцов были зафиксированы. Чтобы реализовать это, следуйте инструкциям в разделе [Как зафиксировать/прикрепить столбцы в гриде](guides/how-to.md#how-to-freezefix-columns-in-the-grid).