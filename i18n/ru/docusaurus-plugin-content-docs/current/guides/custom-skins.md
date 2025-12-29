---
title: "Кастомизация скинов"
sidebar_label: "Кастомизация скинов"
---

# Кастомизация скинов

Начиная с версии 9.0, Gantt использует CSS-переменные для скинов, что позволяет легко настраивать и стилизовать компонент.


[Change skin dynamically](https://docs.dhtmlx.com/gantt/samples/06_skins/06_dynamic_skin.html)


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

Все эти переменные находятся в файле **codebase/sources/less/src/themes/variables.less** внутри пакета.

## Как кастомизировать скины

Самый простой способ изменить внешний вид Gantt - переопределить CSS-переменные в вашем стилевом файле. Например:

~~~html
<style>
:root {
 /* scales */
  --dhx-gantt-scale-background: #8E8E8E;
  --dhx-gantt-base-colors-border-light: #C5C5C5;
  --dhx-gantt-base-colors-border: #DFE0E1;
  --dhx-gantt-scale-color: #FFF;
  --dhx-gantt-base-colors-icons: #00000099;
  
  /* tasks */
  --dhx-gantt-task-background: #3db9d3;
  --dhx-gantt-task-color: #FFFFFF;
  --dhx-gantt-project-background: #6AA84F;
  --dhx-gantt-project-color: #FFFFFF;

  /* links */
  --dhx-gantt-link-background: #ffa011;
  --dhx-gantt-link-background-hover: #ffa011;

}
</style>
~~~


[Change skin dynamically](https://docs.dhtmlx.com/gantt/samples/06_skins/06_dynamic_skin.html)


При таком определении переменных стандартные стили заменяются вашими, и Gantt будет использовать ваш внешний вид.

:::note
Для корректного наследования значений по всей теме определяйте переменные на элементе :root.
:::

Определяя стили на уровне **:root**, вы обеспечиваете правильное наследование переменных по всему компоненту. Таким образом, если изменить переменную, от которой зависят другие, все связанные стили также обновятся.

Например, переменная `--dhx-gantt-scale-color` наследует значение от основной текстовой переменной `--dhx-gantt-container-color`.

- Если вы переопределите `--dhx-gantt-container-color` на уровне **:root**, `--dhx-gantt-scale-color` также изменится.

~~~html
<style>
:root {
    /* --dhx-gantt-scale-color и другие
  переменные, наследующие `--dhx-gantt-container-color`,
  будут затронуты
  */
  --dhx-gantt-container-color: #222;

}
</style>
~~~

- Но если переопределить `--dhx-gantt-container-color` глубже в DOM, например внутри **.gantt_container**, это не повлияет на `--dhx-gantt-scale-color`.

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

## Использование исходных файлов

dhtmlxGantt включает файлы стилей в различных форматах:

- **codebase/dhtmlxgantt.css** - сжатый CSS-файл для скинов, готовый для продакшена;
- **codebase/sources/dhtmlxgantt.css** - читаемый prebuilt CSS-файл;
- **codebase/sources/less/** - исходные less-файлы для скинов Gantt.

Less-файлы удобны, если вы хотите глубоко кастомизировать существующие скины или создать новый с нуля.

## С чего начать

Вы можете использовать **codebase/sources/less** как NPM-пакет. Он содержит два типа файлов:

- таблицы стилей;
- файлы с микро-объявлениями переменных для тонкой настройки вида Gantt или создания нового скина.

## Сборка скинов

Внутри **codebase/sources/less/** выполните:

~~~
> npm install
~~~

После завершения установки вы можете пересобрать CSS-файлы командой:

~~~
> npm run build
~~~

Или для автоматической пересборки при изменениях:

~~~
> npm run watch
~~~

Эти скрипты скомпилируют CSS-файлы из исходников и поместят их в папку *codebase* пакета Gantt, перезаписав существующие файлы.

## Структура

Структура папки **less** в версии 9.0 (может измениться в будущих версиях):

### Изображения

- **./src/imgs** - svg-иконки, используемые всеми скинами
- **./src/iconfont** - иконки, встроенные в web-шрифт

### Определения скинов

Стандартные переменные заданы в скине `terrace`, остальные скины переопределяют эти переменные и добавляют стили.

- **./src/themes**
  - *./src/themes/variables.less* - общие переменные для всех скинов, включая `terrace`
  - *./src/themes/contrast_black* - переменные для контрастного черного скина
  - *./src/themes/contrast_white* - переменные для контрастного белого скина
  - *./src/themes/material* - переменные скина material
  - *./src/themes/dark* - переменные темного скина
  - *./src/themes/flat* - переменные flat-скина

### Точки входа для сборки скинов

- theme.less
- package.json

## Создание собственного скина

Чтобы создать новый скин, скопируйте и переименуйте один из существующих скинов из **sources/less/src/themes**. Следуйте этим шагам:

1) Скопируйте и переименуйте существующий файл, например:

~~~
-> copy:
codebase/sources/less/src/themes/material.less

-> rename to:
codebase/sources/less/src/themes/custom.less
~~~

2) Импортируйте ваш новый файл в **sources/less/src/themes/index.less** следующим образом:

~~~
@import "./custom";
~~~

Затем добавьте следующее содержимое:

~~~css
:root[data-gantt-theme='custom'] {
    --dhx-gantt-theme: custom;
    --dhx-gantt-font-family: Roboto, Helvetica, Arial, sans-serif;

    --dhx-gantt-base-colors-primary: #0288D1;

}
~~~

Обратите внимание, что переменные скина должны быть определены внутри `:root` с селектором атрибута `data-gantt-theme`.

Каждая новая тема обязательно должна содержать переменную **--dhx-gantt-theme** с названием темы.

3) Пересоберите скины командой:

~~~
npm run build
~~~


:::note
Помните, что Gantt может применять некоторые предустановленные конфигурации к календарю в зависимости от используемого скина. Если вы создаете новый скин на основе существующего, возможно, потребуется вручную скорректировать эти настройки в Gantt.
:::

## Настройки стилей через JS

Некоторые аспекты стилей Gantt настраиваются через JavaScript-конфигурацию, а не через CSS. Примеры:

- [link_line_width](api/config/link_line_width.md)
- [link_radius](api/config/link_radius.md)
- [link_arrow_size](api/config/link_arrow_size.md)
- [scale_height](api/config/scale_height.md)
- [row_height](api/config/row_height.md)

