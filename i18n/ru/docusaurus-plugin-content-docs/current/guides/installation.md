---
title: "Как установить dhtmlxGantt"
sidebar_label: "Установка"
---

# Как установить dhtmlxGantt 

Вы можете использовать менеджер пакетов [npm](https://www.npmjs.com/) для установки пакета dhtmlxGantt в ваш проект.

Также возможно подключить необходимые файлы JS/CSS через CDN.

:::tip Используете фронтенд-фреймворк?
Если вы разрабатываете на React, Angular или Vue, используйте соответствующий пакет-обёртку и его руководство по установке вместо основной библиотеки:

- [Установка React Gantt](integrations/react/installation.md)
- [Установка Angular Gantt](integrations/angular/installation.md)
- [Установка Vue Gantt](integrations/vue/installation.md)

Остальная часть этого руководства посвящена основной JavaScript-библиотеке.
:::

## npm - версии Evaluation и PRO {#npmevaluationandproversions}

Сборки Evaluation и Professional публикуются в приватном npm-реестре DHTMLX под областью видимости `@dhx`. Сначала настройте область видимости `@dhx` на этот реестр:

~~~bash
npm config set @dhx:registry=https://npm.dhtmlx.com
~~~

**Профессиональная оценочная версия**

Сборка Evaluation полностью функциональна, но отображает водяной знак, указывающий на то, что она работает в оценочном режиме. Установите её через npm:

~~~bash
npm install @dhx/trial-gantt
~~~

Вы также можете [начать официальную оценочную версию](https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml) на сайте. Официальная пробная версия предоставляет бесплатную техническую поддержку на 30-дневный оценочный период и включает загружаемые офлайн-примеры.

**Профессиональная версия**

Сборка Professional предназначена для промышленной эксплуатации и требует активной коммерческой лицензии. После получения лицензии сгенерируйте свои учётные данные npm в [Личном кабинете](https://dhtmlx.com/clients/) и авторизуйтесь в реестре:

~~~bash
npm login --registry=https://npm.dhtmlx.com --scope=@dhx
~~~

Затем установите пакет:

~~~bash
npm install @dhx/gantt
~~~

Доступ к приватному npm сохраняется только пока активна ваша проприетарная лицензия на Gantt. Чтобы продолжать использовать платные пакеты `@dhx` после окончания подписки, [сохраните их резервную копию заранее](guides/using-packages-after-subscription-expires.md).

## Переход с пробного пакета на коммерческий

Большинство проектов начинаются с оценочного пакета и переходят на коммерческий после оформления лицензии. Оба пакета имеют одинаковый API, поэтому переход в основном механический:

1. [Настройте приватный реестр и авторизуйтесь](#npmevaluationandproversions) с вашими коммерческими учётными данными.
2. В `package.json` замените зависимость `@dhx/trial-gantt` на `@dhx/gantt` (сохранив нужную версию).
3. Обновите каждое упоминание `@dhx/trial-gantt` в вашем коде на `@dhx/gantt` — включая импорт стилей, если ваш проект импортирует CSS отдельно.
4. Выполните `npm install` и пересоберите проект.

Проверьте проект на наличие оставшихся упоминаний `@dhx/trial-gantt` — импорт CSS проще всего упустить из виду. См. [Удаление пробной версии](#uninstall-trial-version), чтобы убедиться, что не осталось файлов оценочной версии. Как только водяной знак исчезнет и интерфейс будет вести себя идентично, переход завершён.

## npm - Community edition

Вы можете установить бесплатную Community edition dhtmlxGantt из [npmjs.com](https://www.npmjs.com/package/dhtmlx-gantt), выполнив следующую команду:

~~~html
npm install dhtmlx-gantt
~~~

:::note
С версии v10 открытый пакет `dhtmlx-gantt` является **Community edition** под **MIT лицензией**. Ранние версии пакета (v9.x и ниже) являются устаревшим выпуском **GPL**; GPL v2 по-прежнему применяется к этим версиям.
:::

## CDN

Чтобы подключить файлы JS/CSS через CDN, следует задать прямые ссылки на файлы **dhtmlxgantt.js** и **dhtmlxgantt.css**:

~~~html
<link rel="stylesheet" href="https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.css" 
    type="text/css"> 
<script src="https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.js"></script>
~~~

Полный список ссылок для CDN, зависящий от версии dhtmlxGantt, можно найти в [отдельной статье](guides/cdn-links-list.md).

:::note
Для версий v10 и выше CDN предоставляет **Community edition** под MIT лицензией.
:::

## Загрузка пакета

### Community edition

[Скачайте бесплатный пакет dhtmlxGantt Community edition с GitHub](https://github.com/DHTMLX/gantt).

### Устаревшие версии GPL

Бесплатное издание до версии v10 распространялось по лицензии **GPL**. Эти версии (v9.x и ранее) остаются доступны, и GPL v2 по-прежнему применяется к ним; они находятся в отдельной ветке [основного репозитория GitHub](https://github.com/DHTMLX/gantt), но больше не поддерживаются активно.

### PRO версия

Если у вас есть PRO-версия компонента, перейдите в [Личный кабинет](https://dhtmlx.com/clients/) и скачайте PRO-пакет оттуда.

Независимо от версии, распакуйте загруженный пакет в папку вашего проекта. 
Затем подключите файлы **dhtmlxgantt.js** и **dhtmlxgantt.css** на страницу. Убедитесь, что указаны корректные относительные пути к этим файлам:

~~~html
<script type="text/javascript" src="codebase/dhtmlxgantt.js"></script>  
<link rel="stylesheet" href="codebase/dhtmlxgantt.css">
~~~

## Добавление PRO-версии в проект {#adding-pro-edition-into-project}

### **Установить Pro-версию**

:::note
Перед установкой Pro-версии Gantt вы должны [удалить пробную версию пакета](#uninstall-trial-version) (если она установлена)
:::

Сборки Professional и Evaluation устанавливаются из описанного выше [приватного npm-реестра](#npmevaluationandproversions). Если это недоступно, есть два других способа добавить Pro-версию:

- вы можете добавить Pro-версию в ваш проект вручную
- вы можете установить Pro-версию в ваш проект через npm из локального каталога

### Установка пакета из локальной папки {#installfromlocalfolder}

Если используется **npm**, вы можете установить Pro-пакет из локальной папки с помощью [`npm install ./local_path`](https://docs.npmjs.com/cli/install/) или [`npm link`](https://docs.npmjs.com/cli/link/).
Существует пошаговая инструкция для обоих вариантов:

#### npm install

1. Скопируйте пакет Gantt в локальную директорию.
2. Перейдите в каталог вашего проекта. 
3. Выполните `npm install ../gantt-local-package-path`.

#### npm link

1. Скопируйте пакет Gantt в локальную директорию.
2. Выполните `npm link` в папке с пакетом.
3. Перейдите в каталог вашего проекта.
4. Выполните `npm link dhtmlx-gantt`.

Чтобы увидеть разницу между Community и PRO версиями библиотеки dhtmlxGantt, смотрите соответствующую статью [Community vs PRO Library Versions](guides/editions-comparison.md).

### **Удаление пробной версии** {#uninstall-trial-version}

Правильный способ установки Pro-версии — удалить пакет пробной версии:

~~~js
npm uninstall @dhx/trial-gantt
~~~

Затем обязательно убедитесь, что файл *dhtmlxgantt.js* нигде не встречается в ваших приложениях.

**Для Linux и macOS** вы можете использовать следующие команды в терминале:

~~~js
grep -rin "dhtmlxGantt v"
grep -rin evaluation
~~~

**Для Windows** вы можете использовать следующие команды в командной строке:

~~~js
findstr /mis "dhtmlxGantt v" path_to_your_app*
findstr /mis "evaluation" path_to_your_app*
~~~

После этого можно установить Pro-версию диаграммы Ганта, как описано выше.
