---
title: "Как установить dhtmlxGantt"
sidebar_label: "Установка"
---

# Как установить dhtmlxGantt

dhtmlxGantt можно добавить в ваш проект с помощью менеджеров пакетов, таких как [NuGet](https://www.nuget.org/), [Bower](https://bower.io/) или [npm](https://www.npmjs.com/).

Кроме того, вы можете подключить необходимые JS и CSS файлы напрямую с CDN.

## npm - Оценочная и PRO версии {#npmevaluationandproversions}

**Оценочная версия Professional**

Вы можете скачать [пробный пакет Gantt](https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml) и следовать инструкциям в файле README. Обратите внимание, что пробная версия действительна только в течение 30 дней.

**Professional версия**

Доступ к приватному npm-репозиторию DHTMLX предоставляется через [Client's Area](https://dhtmlx.com/clients/) после генерации логина и пароля для npm. Подробная инструкция по установке доступна там же. Обратите внимание, что доступ к приватному npm предоставляется только при активной лицензии на проприетарную версию Gantt.

## npm - стандартная бесплатная версия {#npmstandardfreeversion}

Стандартную версию dhtmlxGantt можно установить с сайта [npmjs.com](https://www.npmjs.com/package/dhtmlx-gantt) с помощью команды:

~~~html
npm install dhtmlx-gantt
~~~

:::note
На [npmjs.com](https://www.npmjs.com/package/dhtmlx-gantt) доступна только стандартная версия Gantt
:::

## NuGet {#nuget}

Чтобы добавить dhtmlxGantt с помощью [NuGet](https://www.nuget.org/), выполните следующую команду:

~~~html
nuget install DHTMLX.Gantt
~~~

Если вы работаете в Microsoft Visual Studio, установите его через Package Manager Console командой:

~~~html
install-package DHTMLX.Gantt
~~~

## Bower {#bower}

Вы можете установить dhtmlxGantt через [Bower](https://bower.io/), выполнив команду:

~~~html
bower install gantt
~~~

## CDN {#cdn}

Для подключения dhtmlxGantt через CDN добавьте ссылки на файлы **dhtmlxgantt.js** и **dhtmlxgantt.css**:

~~~html
<link rel="stylesheet" href="http://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.css" 
    type="text/css"> 
<script src="http://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.js"></script>
~~~

Полный список CDN-ссылок для разных версий dhtmlxGantt смотрите в [отдельной статье](guides/cdn-links-list.md).

## Скачивание пакета {#downloadthepackage}

### GPL версия

Вы можете получить GPL-версию dhtmlxGantt, скачав пакет [здесь](https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml).

### PRO версия

Если у вас есть лицензия на PRO-версию, скачайте PRO-пакет из [Client Area](https://dhtmlx.com/clients/).

После загрузки распакуйте пакет в папку вашего проекта. Затем подключите файлы **dhtmlxgantt.js** и **dhtmlxgantt.css** на вашей странице, убедившись, что относительные пути указаны корректно:

~~~html
<script type="text/javascript" src="codebase/dhtmlxgantt.js"></script>  
<link rel="stylesheet" href="codebase/dhtmlxgantt.css">
~~~

## Добавление PRO-редакции в проект {#addingproeditionintoproject}

### **Установка Pro версии**

:::note
Если у вас ранее была установлена пробная версия, рекомендуется [удалить её](#uninstalltrialversion) перед установкой Pro версии.
:::

Публичные источники (CDN, NuGet, Bower и npm) предоставляют стандартную редакцию dhtmlxGantt, распространяемую по лицензии GPL.

Для Professional и Evaluation редакций вы можете использовать наш [приватный npm-репозиторий](#npmevaluationandproversions).

Если эти варианты вам не подходят, есть две альтернативы:

- добавить Pro-версию в проект вручную
- установить Pro-версию через npm из локального каталога

### Установка пакета из локальной папки (#installfromlocalfolder)

Если вы используете **npm**, Pro-пакет можно установить из локальной папки с помощью [`npm install ./local_path`](https://docs.npmjs.com/cli/install/) или [`npm link`](https://docs.npmjs.com/cli/link/). Инструкции для обоих способов приведены ниже:

### npm install

1. Скопируйте пакет Gantt в локальный каталог.
2. Перейдите в каталог вашего проекта.
3. Выполните команду `npm install ../gantt-local-package-path`.

### npm link

1. Скопируйте пакет Gantt в локальный каталог.
2. Выполните `npm link` внутри папки пакета.
3. Перейдите в каталог вашего проекта.
4. Выполните `npm link dhtmlx-gantt`.

Сравнение стандартной и PRO-версий dhtmlxGantt смотрите в соответствующей статье [Стандартная и PRO версии библиотеки](guides/editions-comparison.md).

### **Удаление пробной версии** (#uninstalltrialversion)

Перед установкой Pro-версии рекомендуется удалить пробный пакет:

~~~js
npm uninstall dhtmlx-gantt
~~~

Убедитесь, что в приложении не осталось файлов *dhtmlxgantt.js*.

На **Linux и MacOS** можно выполнить поиск с помощью:

~~~js
grep -rin "dhtmlxGantt v"
grep -rin evaluation
~~~

На **Windows** используйте следующие команды в командной строке:

~~~js
findstr /mis "dhtmlxGantt v" path_to_your_app*
findstr /mis "evaluation" path_to_your_app*
~~~

После подтверждения удаления можно переходить к установке Pro-версии, как описано выше.
