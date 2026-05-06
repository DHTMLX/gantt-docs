---
title: "Настройка скинов"
sidebar_label: "Настройка скинов"
---

# Настройка скинов

Начиная с версии 9.0, скины Gantt используют CSS-переменные, которые можно использовать для настройки и стилизации.

[Изменить скин динамически](https://docs.dhtmlx.com/gantt/samples/06_skins/06_dynamic_skin.html)

Ключевые CSS-переменные:

~~~css
:root {
    --dhx-gantt-theme: terrace;
    --dhx-gantt-font-family: Inter, Helvetica, Arial, sans-serif;
    --dhx-gantt-font-size: 14px;


    --dhx-gantt-base-colors-white: #FFFFFF;
    --dhx-gantt-base-colors-select: #EFF3FF;
    --dhx-gantt-base-colors-hover-color: #e0e0e0;
    --dhx-gantt-base-colors-border-light: #F0F0F0;
    --dhx-gantt-base-colors-border: #DFE0E1;

    --dhx-gantt-base-colors-icons: #A1A4A6;
    --dhx-gantt-base-colors-disabled: #E9E9E9;
    --dhx-gantt-base-colors-select: #E0E5F3;
    --dhx-gantt-base-colors-text-light: #555D63;
    --dhx-gantt-base-colors-text-base: #23272A;
    --dhx-gantt-base-colors-text-on-fill: rgba(255, 255, 255, 0.90);
    --dhx-gantt-base-colors-background: #FFFFFF;
    --dhx-gantt-base-colors-background-alt: #F2F2F2;

    --dhx-gantt-base-colors-primary: #537CFA;
    --dhx-gantt-base-colors-warning: #FAB936;
    --dhx-gantt-base-colors-error: #E3334E;
    --dhx-gantt-base-colors-success: #1BC297;

    --dhx-gantt-container-background: var(--dhx-gantt-base-colors-background);
    --dhx-gantt-container-color: var(--dhx-gantt-base-colors-text-base);
    --dhx-gantt-offtime-background: var(--dhx-gantt-base-colors-background-alt);

    --dhx-gantt-scale-background: var(--dhx-gantt-container-background);
    --dhx-gantt-scale-border-vertical: 1px solid var(--dhx-gantt-base-colors-border-light);
    --dhx-gantt-scale-border-horizontal: 1px solid var(--dhx-gantt-base-colors-border);

    --dhx-gantt-scale-color: var(--dhx-gantt-base-colors-text-light);

    --dhx-gantt-grid-body-background: transparent;
    --dhx-gantt-grid-scale-background: var(--dhx-gantt-scale-background);
    --dhx-gantt-grid-scale-color: var(--dhx-gantt-scale-color);
    --dhx-gantt-grid-scale-border-vertical: var(--dhx-gantt-scale-border-vertical);
    --dhx-gantt-timeline-scale-background: var(--dhx-gantt-scale-background);
    --dhx-gantt-timeline-scale-color: var(--dhx-gantt-scale-color);
    --dhx-gantt-timeline-scale-border-vertical:  var(--dhx-gantt-scale-border-vertical);

    /* tasks */


    --dhx-gantt-task-blue: linear-gradient(180deg, #527CFF 0%, #9751FC 100%);
    --dhx-gantt-task-green: linear-gradient(180deg, #12D979 0%, #1ECDEB 100%);
    --dhx-gantt-task-violet: linear-gradient(180deg, #D071EF 0%, #EE71D5 100%);
    --dhx-gantt-task-yellow: linear-gradient(180deg, #FFB725 0%, #FFBB25 31.25%, #FAEA27 100%);

    --dhx-gantt-task-background: var(--dhx-gantt-task-blue);
    --dhx-gantt-task-border: none;
    --dhx-gantt-task-color: var(--dhx-gantt-base-colors-text-on-fill);
    --dhx-gantt-project-color: var(--dhx-gantt-task-color);
    --dhx-gantt-task-line-text: var(--dhx-gantt-container-color);

    --dhx-gantt-task-row-border: 1px solid var(--dhx-gantt-base-colors-border);
    --dhx-gantt-task-row-background: var(--dhx-gantt-container-background);
    --dhx-gantt-task-row-background--odd: var(--dhx-gantt-container-background);

    --dhx-gantt-project-background: var(--dhx-gantt-task-green);
    --dhx-gantt-milestone-background: var(--dhx-gantt-task-violet);

    --dhx-gantt-task-marker-color: var(--dhx-gantt-task-background);

    --dhx-gantt-popup-background: var(--dhx-gantt-container-background);
    --dhx-gantt-popup-color: var(--dhx-gantt-container-color);

    --dhx-gantt-tooltip-background: var(--dhx-gantt-base-colors-text-base);
    --dhx-gantt-tooltip-color: var(--dhx-gantt-container-background);

    --dhx-gantt-link-background: var(--dhx-gantt-base-colors-icons);
    --dhx-gantt-link-background-hover: var(--dhx-gantt-base-colors-icons-hover);
    --dhx-gantt-link-critical-background: var(--dhx-gantt-base-colors-error);

}
~~~


Все переменные можно найти в файле **codebase/sources/less/src/themes/variables.less** пакета.

## Как настроить скины

Самый простой способ настроить внешний вид Gantt — переопределить соответствующие CSS-переменные в вашем стилевом файле. Ниже приведён пример:

~~~html
<style>
:root {
 /* шкалы */
  --dhx-gantt-scale-background: #8E8E8E;
  --dhx-gantt-base-colors-border-light: #C5C5C5;
  --dhx-gantt-base-colors-border: #DFE0E1;
  --dhx-gantt-scale-color: #FFF;
  --dhx-gantt-base-colors-icons: #00000099;
  
  /* задачи */
  --dhx-gantt-task-background: #3db9d3;
  --dhx-gantt-task-color: #FFFFFF;
  --dhx-gantt-project-background: #6AA84F;
  --dhx-gantt-project-color: #FFFFFF;

  /* связи */
  --dhx-gantt-link-background: #ffa011;
  --dhx-gantt-link-background-hover: #ffa011;

}
</style>
~~~

[Изменить скин динамически](https://docs.dhtmlx.com/gantt/samples/06_skins/06_dynamic_skin.html)

Определяя переменные таким образом, вы можете переопределить стили по умолчанию, гарантируя применение ваших собственных стилей к Gantt.

:::note
Для правильного наследования значений по всей теме определяйте переменные в элементе :root.
:::

Важно определить эти стили именно в элементе **:root**, чтобы обеспечить корректное наследование и применение по всему компоненту. Такой подход гарантирует, что когда переменная, используемая другими переменными, будет переопределена, она корректно влияет на связанные стили по компоненту.

Например, переменная `--dhx-gantt-scale-color` наследуется от основной переменной цвета текста `--dhx-gantt-container-color`.

- Если вы переопределите `--dhx-gantt-container-color` на уровне **:root**, вы гарантируете, что `--dhx-gantt-scale-color` отразит это изменение.

~~~html
<style>
:root {
    /* --dhx-gantt-scale-color и другие
  переменные, наследующие `--dhx-gantt-container-color`
  будут затронуты
  */
  --dhx-gantt-container-color: #222;

}
</style>
~~~

- Если переопределить `--dhx-gantt-container-color` на более низком уровне в дереве DOM, например внутри **.gantt_container**, это не повлияет на переменную `--dhx-gantt-scale-color`.

~~~html
<style>
.gantt_container {
    /* только элементы, которые напрямую
  используют --dhx-gantt-container-color, будут затронуты
  */
  --dhx-gantt-container-color: #222;
}
</style>
~~~

## Как использовать исходники

dhtmlxGantt поставляется с файлами стилей в следующих формах:

- **codebase/dhtmlxgantt.css** - готовый сжатый CSS-файл для скинов, готов к продакшену;
- **codebase/sources/dhtmlxgantt.css** - готовые читаемые CSS-файлы;
- **codebase/sources/less/** - исходники файлов less для скинов Gantt.

Последние можно использовать для глубокой настройки существующих скинов или для создания нового скина.

## Как начать

Вы можете инициализировать **codebase/sources/less** как пакет NPM. 
Исходники будут содержать два типа файлов: 

- стилевые файлы; 
- файлы с декларациями микро-переменных, которые можно использовать для точной настройки вида Gantt или для создания нового скина.

## Как собрать скины

В **codebase/sources/less/** выполните:

~~~ 
> npm install
~~~

После завершения установки вы можете пересобрать CSS-файлы с помощью следующих команд:

~~~ 
> npm run build
~~~

Или 

~~~ 
> npm run watch
~~~

Скрипт пересоберёт CSS-файлы из исходников и поместит их в папку *codebase* пакета gantt, заменив существующие версии.

## Структура

Структура папки **less** для версии 9.0 (возможно изменение в будущих версиях) приведена ниже:

### Изображения

- **./src/imgs** - svg-иконки, используемые всеми скинами
- **./src/iconfont** - иконки, встроенные в веб-шрифт

### Определения скинов

Набор переменных по умолчанию определяется в скине `terrace`, другие скины переопределяют соответствующие переменные и добавляют стили.

- **./src/themes**
  - *./src/themes/variables.less* - общие переменные, используемые всеми скинами, для скина `terrace`
  - *./src/themes/contrast_black* - переменные контрастного черного скина
  - *./src/themes/contrast_white* - переменные контрастного белого скина
  - *./src/themes/material* - переменные material-скина
  - *./src/themes/dark* - переменные темного скина
  - *./src/themes/flat* - переменные плоского скина

### Точки входа для сборки скинов

- theme.less
- package.json


## Создание пользовательского скина

Чтобы создать новый скин, можно скопировать и переименовать один из существующих скинов из папки **sources/less/src/themes**. Следуйте шагам ниже:

1) Скопируйте и переименуйте один из существующих файлов из папки **sources/less/src/themes**, например:

~~~
-> копировать:
codebase/sources/less/src/themes/material.less

-> переименовать в:
codebase/sources/less/src/themes/custom.less
~~~

2) Подключите новый файл в **sources/less/src/themes/index.less**, вот так:

~~~
@import "./custom";
~~~

И добавьте содержимое, как в:

~~~css
:root[data-gantt-theme='custom'] {
    --dhx-gantt-theme: custom;
    --dhx-gantt-font-family: Roboto, Helvetica, Arial, sans-serif;

    --dhx-gantt-base-colors-primary: #0288D1;

}
~~~

Заметьте, что переменные скина должны быть определены под элементом `:root`, используя селектор `data-gantt-there`.

Новый тем должен включать переменную **--dhx-gantt-theme** с именем темы.

3) Пересоберите скины командой:

~~~
npm run build
~~~

:::note
Обратите внимание, что Gantt может применить некоторые предварительно заданные настройки к календарю в зависимости от применённого скина.
При создании нового скина путём копирования существующего возможно потребуется вручную применить соответствующие настройки к Gantt.
:::


## Настройки стилизации в JS

Обратите внимание, что не все аспекты стилизации Gantt контролируются из CSS; некоторые параметры задаются в конфигурации JavaScript, например следующие свойства:

- [link_line_width](api/config/link_line_width.md)
- [link_radius](api/config/link_radius.md)
- [link_arrow_size](api/config/link_arrow_size.md)
- [scale_height](api/config/scale_height.md)
- [row_height](api/config/row_height.md)