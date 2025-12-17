---
title: "Макет Gantt"
sidebar_label: "Макет Gantt"
---

Макет Gantt
==============================

Начиная с версии 5.0, Gantt поддерживает настраиваемый макет, который позволяет размещать элементы компонента как внутренние представления внутри макета. Эта функция позволяет добавлять дополнительные временные шкалы и гриды, создавая гибкую структуру диаграммы Gantt с различными способами организации её частей.

Например, вы можете добавить дополнительный грид справа от временной шкалы:

![gantt_two_grids](/img/gantt_two_grids.png)


[Grid columns rightside of gantt](https://docs.dhtmlx.com/gantt/samples/10_layout/01_rightside_columns.html)


Или разместить ещё один грид и временную шкалу под основными.

![gantt_resource_panel](/img/gantt_resource_panel.png)


[Gantt chart with resource panel](https://docs.dhtmlx.com/gantt/samples/10_layout/02_resource_panel.html)


## Макет по умолчанию {#defaultlayout}
------------------

Макет управляется через настройку [gantt.config.layout](api/config/layout.md). Вот конфигурация макета по умолчанию:

~~~js
gantt.config.layout = {
    css: "gantt_container",
      rows:[
           {
           cols: [
             {
              // основное представление грида    
              view: "grid",  
              scrollX:"scrollHor", 
              scrollY:"scrollVer"
             },
             { resizer: true, width: 1 },
             {
              // основное представление временной шкалы
              view: "timeline", 
              scrollX:"scrollHor", 
              scrollY:"scrollVer"
            },
             {
              view: "scrollbar", 
              id:"scrollVer"
               }
        ]},
            {
            view: "scrollbar", 
            id:"scrollHor"
        }
      ]
}
~~~

Макет Gantt состоит из ячеек, заполненных представлениями. Эти представления отображают основные и вспомогательные элементы Gantt, такие как:

- **grid** - грид диаграммы Gantt. Основной грид для отображения задач имеет *id:"grid"*;
- **timeline** - временная шкала диаграммы Gantt. Основная временная шкала для задач имеет *id:"timeline"*;
- **resizer** - линия-разделитель. Для активации установите свойство **resizer** в *true*. **Доступно только в PRO-редакции**;
- **scrollbar** - скроллбары, используемые в диаграмме Gantt. Представления грида и временной шкалы могут быть связаны с определёнными скроллбарами (подробнее ниже).
- **resourceGrid** - преднастроенный грид для панели ресурсов. **Доступно только в PRO-редакции**. Подробнее [здесь](guides/resource-management.md).
- **resourceTimeline** - преднастроенная временная шкала для панели ресурсов. **Доступно только в PRO-редакции**. Подробнее [здесь](guides/resource-management.md).

Каждое представление настраивается через объект с соответствующими свойствами.
Вы можете [настроить параметры](#configsandtemplatesofviews) для представлений **grid** и **timeline**.
По умолчанию параметры берутся из глобального объекта [gantt.config](guides/common-configuration.md#ganttconfigobject).

:::note
Учтите, что конфигурацию макета необходимо задавать до инициализации Gantt. Если вы изменяете макет после, обновите его с помощью [resetLayout](api/method/resetlayout.md).
:::

## Скроллбар {#scrollbar}
-----------

Скроллбары в макете определяются представлением **"scrollbar"**. Можно использовать как горизонтальные, так и вертикальные скроллбары.

Чтобы добавить скроллбар, свяжите его с нужным представлением, указав в свойствах **scrollX** или **scrollY** id скроллбара.

### Привязка скроллбара к представлению

Несколько представлений могут использовать один и тот же скроллбар. Для связывания представления со скроллбаром:

- определите скроллбар с нужным направлением прокрутки и задайте ему ID
- укажите этот ID в свойстве **scrollX** или **scrollY** нужного представления

Размещение скроллбара внутри массива `cols` создаёт вертикальный скроллбар, а внутри массива `rows` - горизонтальный. Также можно явно указать направление прокрутки с помощью свойства **scroll**:

~~~js
{ view: "scrollbar", id:"scroller", scroll: "x"    } // горизонтальный
~~~
или:
~~~js
{ view: "scrollbar", id:"scroller", scroll: "y"    } // вертикальный
~~~

Вот пример привязки пользовательских представлений грида и временной шкалы к вертикальному скроллбару:

~~~js
gantt.config.layout = {
    css: "gantt_container",
      rows:[
           {
           cols: [
             {             
              view: "grid", 
              scrollY:"scrollVer"
             },
             { resizer: true, width: 1 },
             {
              view: "timeline", 
              scrollY:"scrollVer"
            },
             {
              view: "scrollbar", 
              id:"scrollVer"
               }
        ]}
      ]
}
~~~

Прокрутка вертикального скроллбара будет перемещать одновременно грид и временную шкалу.
В стандартном макете представления грида и временной шкалы связаны как с горизонтальным, так и с вертикальным скроллбарами.

Также можно задать отдельный горизонтальный скроллбар только для грида. [Подробнее](guides/specifying-columns.md#horizontalscrollbar) в соответствующем разделе.

### Скроллбары для представления

Ранее мы рассмотрели, как добавить один скроллбар к представлению с помощью простой конфигурации макета, например:

~~~js
{cols: [ {rows: [{}, {}]}, {rows: [{}, {}]}]}
~~~

или

~~~js
{rows: [ {cols: [{}, {}]}, {cols: [{}, {}]}]}
~~~

Если вы хотите связать представление и с вертикальным, и с горизонтальным скроллбаром, потребуется более сложный макет с несколькими уровнями вложенности `cols` и `rows`, например:

~~~js
{cols: [ 
    {
        rows: [
            {
                cols: [{}, {}]
            }, 
            {
                cols: [{}, {}]
            }
        ]
    }, 
    {
        rows: [
            {
                cols: [{}, {}]
            }, 
            {
                cols: [
                    {
                        rows: [{}, {}]
                    }, 
                    {    
                        rows: [{}, {}]
                    }
                ]
            }
        ]
    }
]}
~~~

Посмотрите эти примеры:

- [Gantt. Layout views with own scrollbars](https://snippet.dhtmlx.com/cv9w37tu)
- [Gantt. Universal Layout configuration](https://snippet.dhtmlx.com/uqejdyqc)

## Настройка макета {#layoutcustomization}
-------------------

Вы можете изменить макет по умолчанию и задать схему, которая соответствует вашим требованиям, добавляя дополнительные представления в диаграмму Gantt.

Например, чтобы создать панель ресурсов под основной диаграммой Gantt с дополнительными представлениями грида и временной шкалы, выполните следующие шаги:

- создайте макет с несколькими строками
- разместите основной грид и временную шкалу в первой строке
- добавьте дополнительный грид и временную шкалу во вторую строку, связав их с пользовательским источником данных
- вставьте разделитель между строками
- добавьте скроллбар для последней строки и свяжите его с обеими временными шкалами (основной и ресурсной)

Пример конфигурации:

~~~js
gantt.config.layout = {
    css: "gantt_container",
    rows:[
        {
          // макет по умолчанию
          cols: [
            {view: "grid",
                config: mainGridConfig, scrollY:"scrollVer"},
            {resizer: true, width: 1},
            {view: "timeline", 
                scrollX:"scrollHor", scrollY:"scrollVer"},
            {view: "scrollbar", id:"scrollVer"}
          ]
        },
        {resizer: true, width: 1},
        {
          // пользовательский макет
          cols: [
            {view: "grid", id: "resourceGrid", bind:"resource", 
                config:resourceGridConfig, scrollY:"resourceVScroll"},
            {resizer: true, width: 1},
            {view:"timeline", id:"resourceTimeline", scrollX:"scrollHor", 
                bind:"resource", bindLinks: null, layers: resourceLayers, 
                scrollY:"resourceVScroll"},
            {view: "scrollbar", id:"resourceVScroll"}
          ]
        },
        {view: "scrollbar", id:"scrollHor"}
    ]
};
~~~

В этом примере дополнительный грид отображает ресурсы и их загрузку, а дополнительная временная шкала показывает распределение рабочих часов по месяцам с выделением стандартных и сверхурочных часов.

### Свойства пользовательских grid и timeline

Пользовательские представления grid и timeline содержат дополнительные свойства:

#### Для grid и timeline

- **bind** - (*string*) указывает ID источника данных, из которого брать данные (например, "resource" в примере)

#### Для timeline

- **bindLinks** - (*string*) указывает источник связей; установите *null*, если связанных связей нет
- **layers** - (*array*) набор функций **addLayer()**, определяющих стиль отображения данных

### Добавление хранилища данных для пользовательских представлений

Чтобы заполнить пользовательские представления нужными данными, необходимо добавить отдельное хранилище данных. Создание нового хранилища выполняется с помощью метода 
[createDatastore](api/method/createdatastore.md), где вы указываете конфигурацию хранилища данных:

~~~js
var resourcesStore = gantt.createDatastore({
    name:"resource",
    initItem: function(item){
        item.id = item.key || gantt.uid();
        return item;
    }
});
~~~

В этом примере создаётся хранилище данных с именем "resource".

Для загрузки данных из хранилища в пользовательские представления используется метод [parse](api/method/parse.md):

~~~js
resourcesStore.parse([// resources
    {key:'0', label: "N/A"},
    {key:'1', label: "John"},
    {key:'2', label: "Mike"},
    {key:'3', label: "Anna"}
]);
~~~

Чтобы получить объект конфигурации определённого хранилища данных, используйте метод [getDatastore](api/method/getdatastore.md):

~~~js
var tasksStore = gantt.getDatastore("task");
~~~

Этот метод принимает имя хранилища данных в качестве параметра.

:::note
При использовании встроенных представлений ресурсов Gantt может создавать хранилище данных автоматически. [Подробнее здесь](guides/resource-management.md#workingwithresourceviewpanel).
:::

### Динамическое отключение/включение разделителей {#enable_disable_resizers}

Иногда требуется динамически отключать разделители между ячейками Gantt. Самый простой способ сделать это - скрыть их с помощью CSS.

Вы можете использовать такое CSS-правило:

~~~css
.no_resizers .gantt_resizer{
    display:none;
}
~~~

Далее добавьте этот класс к контейнеру Gantt, чтобы скрыть разделители:

~~~js
gantt.$container.classList.add("no_resizers");
~~~

Чтобы вернуть разделители, просто удалите класс:

~~~js
gantt.$container.classList.remove("no_resizers");
~~~

## HTML как внутреннее представление {#htmlasinnerview}
------------------------

Пользовательский HTML также может использоваться в качестве внутренних представлений внутри макета Gantt. Пример:

~~~js
gantt.config.layout = {
 css: "gantt_container",
  rows: [
      {
         cols: [
        {view: "grid",scrollX: "scrollHor", scrollY: "scrollVer"},
        { html:"<div class='custom-content'>custom content</div>", 
            css:"custom-content", width:50},
        {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
        { html:"<div class='custom-content'>custom content</div>", 
            css:"custom-content", width:50},
        {view: "scrollbar", id: "scrollVer"}
         ]
    },
    {view: "scrollbar", scroll: "x", id: "scrollHor"}
 ]
}
~~~


## Обязательные представления и настройки {#requiredviewsandsettings}
-------------------

Публичный API объекта gantt включает методы, связанные с определёнными представлениями макета, такими как [getTaskPosition](api/method/gettaskposition.md), [getTaskNode](api/method/gettasknode.md) и [getScrollState](api/method/getscrollstate.md).

Для корректной работы этих методов макет должен включать стандартные грид, временную шкалу, полосы прокрутки, и Gantt должен иметь возможность их найти. Это достигается назначением определённых id стандартным представлениям:

~~~js
gantt.config.layout = {
 css: "gantt_container",
  rows: [
  {
   cols: [
    {view: "grid", id: "grid", scrollX: "scrollHor", scrollY: "scrollVer"},
    {view: "timeline", id: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
    {view: "scrollbar", id: "scrollVer"}
   ]
  },
  {view: "scrollbar", id: "scrollHor"}
 ]
};
~~~

Обязательные представления и их id:

- view: "grid", id: "grid"
- view: "timeline", id: "timeline"
- view: "scrollbar", id: "scrollHor"
- view: "scrollbar", id: "scrollVer"

Если id не задан, Gantt либо использует имя представления в качестве id по умолчанию, либо сгенерирует уникальный автоматически. Поэтому для стандартных грид и timeline параметр "id" можно не указывать:

~~~js
gantt.config.layout = {
 css: "gantt_container",
  rows: [
  {
   cols: [
    {view: "grid", scrollX: "scrollHor", scrollY: "scrollVer"},
    {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
    {view: "scrollbar", id: "scrollVer"}
   ]
  },
  {view: "scrollbar", id: "scrollHor"}
 ]
};
~~~

Вы можете добавить любое количество дополнительных представлений в макет.

## Конфигурация и шаблоны представлений {#configsandtemplatesofviews}
-------------------

Грид и Timeline используют шаблоны и конфигурацию из глобальных [gantt.config/gantt.templates](guides/common-configuration.md). Однако их можно переопределить для конкретных представлений на уровне макета.

Например: 

~~~js
var secondGridColumns = {
  columns: [
    {
        name: "status", label: "Status", width: 60, align: "center", 
        template: function (task) {
            var progress = task.progress || 0;
            return Math.floor(progress * 100) + "";
        }
    },
    {
        name: "impact", width: 80, label: "Impact", template: function (task) {
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
        {view: "grid", id: "grid", width: 320, scrollY: "scrollVer"},
        {resizer: true, width: 1},
        {view: "timeline", id: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
        {resizer: true, width: 1},
        {view: "grid", width: 120, bind:"task", 
            scrollY:"scrollVer", config:secondGridColumns},   /*!*/
        {view: "scrollbar", scroll: "y", id: "scrollVer"}
      ]
    },
    {view: "scrollbar", id: "scrollHor", height: 20}
  ]
};
~~~


Представления также могут наследовать конфигурацию и шаблоны от родительского макета:

~~~js
var resourceConfig = {    /*!*/
    scale_height: 30      /*!*/
};                          /*!*/

gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        {view: "grid", group:"grids", scrollY: "scrollVer"},
        {resizer: true, width: 1},
        {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
        {view: "scrollbar", id: "scrollVer", group:"vertical"}
      ],
      gravity:2
    },
    {resizer: true, width: 1},
    {
      config: resourceConfig,   /*!*/
      cols: [
        {view: "resourceGrid", group:"grids", width: 435, scrollY: "resourceVScroll" },
        {resizer: true, width: 1},
        {view: "resourceTimeline", scrollX: "scrollHor", scrollY: "resourceVScroll"},
        {view: "scrollbar", id: "resourceVScroll", group:"vertical"}
      ],
      gravity:1
    },
    {view: "scrollbar", id: "scrollHor"}
  ]
};
~~~

Более подробную информацию смотрите в статье [Resource Management](guides/resource-management.md).


## Группы видимости {#visibilitygroups}
-----------------

Иногда бывает полезно синхронизировать видимость определённых элементов макета. Например, если есть горизонтальные полосы прокрутки в соседних ячейках, возможно, вы захотите, чтобы обе отображались или скрывались одновременно.

![scrollable_grid](/img/scrollable_grid.png)


[Horizontal scroll inside Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/10_scrollable_grid.html)


Другой пример - несколько гридов в разных строках временной шкалы, которые должны иметь одинаковую ширину. Когда один грид изменяет размер, другие также должны подстраиваться.

![grid_group_width](/img/grid_group_width.png)


[Resource load diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)


Обе эти задачи решаются с помощью свойства **group** в представлении. Это свойство принимает любую строку, и представления с одинаковым значением group будут синхронизированы.

- Для полос прокрутки это означает, что их видимость связана: если одна из полос в группе видима, видимыми будут все.
- Для других ячеек это обеспечивает одинаковую ширину или высоту в зависимости от макета.

Пример синхронизации видимости полос прокрутки:

~~~js
gantt.config.layout = {
  css: "gantt_container",
  cols: [
    {
       width:400,
       minWidth: 200,
       maxWidth: 600,
       rows:[
         {view: "grid", scrollX: "gridScroll", scrollable: true, scrollY: "scrollVer"},
         {view: "scrollbar", id: "gridScroll", group:"horizontal"}    /*!*/
        ]
    },
    {resizer: true, width: 1},
    {
      rows:[
        {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
        {view: "scrollbar", id: "scrollHor", group:"horizontal"}      /*!*/
      ]
    },
    {view: "scrollbar", id: "scrollVer"}
  ]
};
~~~

Пример синхронизации ширины гридов:

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        {view: "grid", group:"grids", scrollY: "scrollVer"},
        {resizer: true, width: 1},
        {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
        {view: "scrollbar", id: "scrollVer", group:"vertical"}    /*!*/
      ],
      gravity:2
    },
    {resizer: true, width: 1},
    {
      config: resourceConfig,
      cols: [
        {view: "resourceGrid", group:"grids", width: 435, scrollY: "resourceVScroll" },
        {resizer: true, width: 1},
        {view: "resourceTimeline", scrollX: "scrollHor", scrollY: "resourceVScroll"},
        {view: "scrollbar", id: "resourceVScroll", group:"vertical"}   /*!*/
      ],
      gravity:1
    },
    {view: "scrollbar", id: "scrollHor"}
  ]
};
~~~

## Размеры частей макета Gantt {#sizingofganttlayoutparts}
------------------------------

Относительные размеры ячеек макета Gantt можно управлять с помощью свойства **gravity** в конфигурации каждой ячейки. Это значение определяет пропорцию размеров между ячейками.

~~~js
gantt.config.layout = {
      css: "gantt_container",
      rows: [
        {
              cols: [
                // columns config
            ],
              gravity:2     /*!*/
        },
        { resizer: true, width: 1 },
        {
            config: resourceConfig,
              cols: [
                // columns config
              ],
              gravity:1       /*!*/
        },
    {view: "scrollbar", id: "scrollHor"}
      ]
};
~~~

В этом примере Gantt и диаграмма ресурсов делят пространство в пропорции 2:1. То есть, Gantt занимает примерно 66%, а диаграмма ресурсов - около 33%. Использование пропорции 1:1 разделит пространство поровну.

### Минимальная/максимальная ширина/высота ячейки

Чтобы ограничить размер частей макета при изменении размера, используйте свойства **minWidth/maxWidth** для ячеек внутри массива **cols**. Аналогично, **minHeight/maxHeight** можно задать для ячеек в массиве **rows** для ограничения высоты.

Пример использования **minWidth/maxWidth** в конфигурации колонок:

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
        {
          view: "grid", scrollable: true, scrollX: "scrollHor1", scrollY: "scrollVer"
        },
        {
          view: "scrollbar", id: "scrollHor1", scroll: 'x', group: 'hor'
        },
      ]
    },
    { resizer: true, width: 1 },
    {
      rows: [
        {
          view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"
        },
        {
          view: "scrollbar", id: "scrollHor", scroll: 'x', group: 'hor'
        },
      ]
    },
    {
      view: "scrollbar", id: "scrollVer"
    }
  ]
}
~~~


## Скрытие родительских представлений макета {#hidingparentlayoutviews}
-----------------------

Если нужно скрыть представление макета при скрытии всех его дочерних представлений, задайте **hide_empty:true** в конфигурации этой ячейки макета, например:

~~~js
gantt.config.layout = {
    css: "gantt_container",
    cols: [
          {
            hide_empty: true, /*!*/
            rows:[
                  {view: "grid"}
            ]
          },
          {resizer: true},
          {
            hide_empty: true, /*!*/
            rows:[
                  {view: "timeline"}
            ]
          }
    ]
};
~~~


**Related example:** [Скрытие grid/timeline представлений](https://snippet.dhtmlx.com/5/157c0db66)


## Переключение между представлениями {#switchingbetweenviews}
-------------------------

Для переключения между разными представлениями макета смотрите разделы [Решения: Переключение grid/диаграммы](guides/how-to.md#howtotogglegridchart) и [Решения: Переключение представления ресурсов](guides/how-to.md#howtotoggletheresourceview).

## Заморозка колонок в grid-представлении {#freezingcolumnsinthegridview}
-----------------------------------

Можно инициализировать Gantt с одной или несколькими замороженными колонками. Инструкции по этому вопросу смотрите в разделе [Решения: Как заморозить/зафиксировать колонки в grid](guides/how-to.md#howtofreezefixcolumnsinthegrid).

