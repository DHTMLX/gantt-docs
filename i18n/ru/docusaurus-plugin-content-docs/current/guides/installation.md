---
title: "Как установить dhtmlxGantt"
sidebar_label: "Установка"
---

# Как установить dhtmlxGantt 

Вы можете использовать [npm](https://www.npmjs.com/), [NuGet](https://www.nuget.org/) или [Bower](https://bower.io/) как менеджеры пакетов для установки пакета dhtmlxGantt в ваш проект.

Также возможно подключить необходимые файлы JS/CSS через CDN.

## npm - версии Evaluation и PRO {#npmevaluationandproversions}

**Профессиональная оценочная версия**

Скачайте [пробный пакет Gantt](https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml) и следуйте шагам, указанным в файле README. 
Обратите внимание, что пробная версия Gantt доступна только 30 дней.

**Профессиональная версия**

Вы можете получить доступ к приватному npm DHTMLX напрямую в [Личном кабинете](https://dhtmlx.com/clients/) путем создания логина и пароля для npm. Подробная инструкция по установке доступна там же. Обратите внимание, что доступ к приватному npm доступен только пока активна ваша проприетарная лицензия на Gantt.

## npm - Community edition

Вы можете установить бесплатную Community edition dhtmlxGantt из [npmjs.com], выполнив следующую команду:

~~~html
npm install dhtmlx-gantt
~~~

:::note
С версии v10 открытый пакет `dhtmlx-gantt` является **Community edition** под **MIT лицензией**. Ранние версии пакета (v9.x и ниже) являются устаревшим выпуском **GPL**; GPL v2 по-прежнему применяется к этим версиям.
:::

## NuGet

Чтобы установить dhtmlxGantt через [NuGet](https://www.nuget.org/), выполните следующую командную строку:

~~~html
nuget install DHTMLX.Gantt
~~~

Если вы используете Microsoft Visual Studio, выполните следующую команду из консоли менеджера пакетов:

~~~html
install-package DHTMLX.Gantt
~~~

## Bower

Чтобы установить dhtmlxGantt через [Bower](https://bower.io/), выполните следующую командную строку:

~~~html
bower install gantt
~~~

## CDN

Чтобы подключить файлы JS/CSS через CDN, следует задать прямые ссылки на файлы **dhtmlxgantt.js** и **dhtmlxgantt.css**:

~~~html
<link rel="stylesheet" href="http://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.css" 
    type="text/css"> 
<script src="http://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.js"></script>
~~~

Полный список ссылок для CDN, зависящий от версии dhtmlxGantt, можно найти в отдельной статье (guides/cdn-links-list.md).

:::note
Для версий v10 и выше CDN предоставляет **Community edition** под MIT лицензией.
:::

## Загрузка пакета

### Community edition

[Скачайте пакет бесплатной dhtmlxGantt Community edition](https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml).

### Устаревшие версии GPL

Бесплатное издание до версии v10 распространялось по лицензии **GPL**. Эти версии (v9.x и ранее) доступны по-прежнему, и GPL v2 применяется к ним; они находятся в отдельной ветке основного репозитория [main GitHub repository](https://github.com/DHTMLX/gantt), но активно не поддерживаются.

### PRO версия

Если у вас есть PRO-версия компонента, перейдите в [Личный кабинет](https://dhtmlx.com/clients/) и скачайте PRO-пакет оттуда.

Независимо от версии, распакуйте загруженный пакет в папку вашего проекта. 
Затем подключите файлы **dhtmlxgantt.js** и **dhtmlxgantt.css** на страницу. Убедитесь, что указаны корректные относительные пути к этим файлам:

~~~html
<script type="text/javascript" src="codebase/dhtmlxgantt.js"></script>  
<link rel="stylesheet" href="codebase/dhtmlxgantt.css">
~~~

## Добавление PRO-версии в проект

### **Установить Pro-версию**

:::note
Перед установкой Pro версии Gantt вы должны [удалить пробную версию пакетa](#uninstall-trial-version) (если она установлена)
:::

Для версий v10 и выше общедоступный пакет npm и CDN предоставляют бесплатную **Community edition** компонента, распространяемую под **MIT лицензией**. NuGet и Bower остаются на устаревшем GPL выпуске (v9.x) на данный момент. GPL v2 применяется только к этим предыдущим версиям.

Мы также предоставляем наш приватный npm-реестр, откуда можно устанавливать Professional и Evaluation версии компонента.

Если по какой-то причине описанные выше методы недоступны, есть два варианта выхода:

- вы можете добавить Pro-версию в ваш проект вручную
- вы можете установить Pro-версию в ваш проект через npm из локального каталога

### Установка пакета из локальной папки {#installfromlocalfolder}

Если используется **npm**, вы можете установить Pro-пакет из локальной папки с помощью  [`npm install ./local_path`](https://docs.npmjs.com/cli/install/) или [`npm link`](https://docs.npmjs.com/cli/link/).
Существует пошаговая инструкция для обоих вариантов:

### npm install

1. Скопируйте пакет Gantt в локальную директорию.
2. Перейдите в каталог вашего проекта. 
3. Выполните `npm install ../gantt-local-package-path`.

### npm link

1. Скопируйте пакет Gantt в локальную директорию.
2. Выполните `npm link` в папке с пакетом.
3. Перейдите в каталог вашего проекта.
4. Выполните `npm link dhtmlx-gantt`.

Чтобы увидеть разницу между Community и PRO версиями библиотеки dhtmlxGantt, смотрите соответствующую статью [Community vs PRO Library Versions](guides/editions-comparison.md).

### **Удаление пробной версии**

Правильный способ установки Pro-версии — удалить пакет пробной версии:

~~~js
npm uninstall dhtmlx-gantt
~~~

Затем обязательно убедитесь, что файл *dhtmlxgantt.js* нигде не встречается в ваших приложениях.

**Для Linux и MacOS**, вы можете использовать следующие команды в терминале:

~~~js
grep -rin "dhtmlxGantt v"
grep -rin evaluation
~~~

**Для Windows**, вы можете использовать следующие команды в командной строке:

~~~js
findstr /mis "dhtmlxGantt v" path_to_your_app*
findstr /mis "evaluation" path_to_your_app*
~~~

После этого можно установить Pro-версию диаграммы Ганта, как описано выше.