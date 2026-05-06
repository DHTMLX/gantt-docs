---
title: "dhtmlxGantt с Vue.js"
sidebar_label: "Vue.js"
---

# dhtmlxGantt с Vue.js

Вам следует быть знакомыми с базовыми концепциями и паттернами [Vue](https://vuejs.org/) для использования этой документации. Если нет, пожалуйста, обратитесь к [документации Vue 3](https://vuejs.org/guide/introduction.html) для вступительного руководства.

DHTMLX Gantt совместим с Vue. Вы можете проверить соответствующий пример на GitHub: [DHTMLX Gantt with Vue Demo](https://github.com/DHTMLX/vue-gantt-demo).

## Создание проекта

Перед тем как начать создание нового проекта, установите [Node.js](https://nodejs.org/en/).

Чтобы создать проект на Vue, выполните следующую команду:

~~~
npm create vue@latest
~~~

Эта команда установит и запустит **create-vue**, официальный инструмент заготовки проектов Vue. Подробности смотрите в [Vue.js Quick Start](https://vuejs.org/guide/quick-start.html#creating-a-vue-application).

### Установка зависимостей

Далее перейдите в директорию приложения. Назовём наш проект **gantt-vue** и запустим:

~~~
cd gantt-vue
~~~

После этого нужно установить зависимости и запустить dev-сервер. Для этого используйте менеджер пакетов:

- если вы используете **yarn**, выполните следующие команды:

~~~
yarn install
yarn dev
~~~

- если вы используете **npm**, выполните следующие команды:

~~~
npm install
npm run dev
~~~

Теперь ваш проект Vue должен работать по адресу **http://localhost:5173**.

![Gantt Vue app running](/img/gantt_vue_app_run.png)

## Создание Gantt

Теперь нам нужно получить код DHTMLX Gantt. Во-первых, остановите приложение, нажав **Ctrl+C** в командной строке. Затем можно приступить к установке пакета Gantt.

## Шаг 1. Установка пакета

Профессиональные версии библиотеки доступны для установки через **npm/yarn** из нашего приватного репозитория, пожалуйста, следуйте [этой инструкции](guides/installation.md#npmevaluationandproversions), чтобы получить доступ к нему.

После того как вы получите Evaluation-версию Gantt, её можно установить следующими командами:

- для npm:

~~~
npm install @dhx/trial-gantt
~~~

- для yarn:

~~~
yarn add @dhx/trial-gantt
~~~

Альтернативно, поскольку zip-пакет библиотеки структурирован как модуль **npm**, вы можете [установить его из локальной папки](guides/installation.md#installfromlocalfolder).

## Шаг 2. Создание компонента

Теперь следует создать Vue-компонент, чтобы добавить Gantt в приложение. Создайте новый файл в каталоге ***src/components/*** и назовите его ***Gantt.vue***.

### Импорт исходников

Откройте вновь созданный файл ***Gantt.vue*** и импортируйте исходники Gantt. Обратите внимание:

- если вы установили пакет Gantt из локальной папки, ваши пути импорта будут выглядеть так:

~~~js title="Gantt.vue"
import { Gantt} from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
~~~ 

- если вы выбрали установку пробной версии, пути импорта должны быть такими:

~~~js title="Gantt.vue"
import { Gantt} from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

В этом руководстве мы будем использовать **trial**-версию Gantt.

### Установка контейнера и добавление Gantt

Чтобы отобразить Gantt на странице, необходимо задать контейнер для рендера компонента внутри. Смотрите код ниже:

~~~js title="Gantt.vue"
<script>
import { Gantt } from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";

export default {
  mounted() {
    let gantt = Gantt.getGanttInstance();
    gantt.init(this.$refs.cont);

    this.gantt = gantt;
  },
  unmounted() {
    this.gantt.destructor();
    this.$refs.cont.innerHTML = "";
  },
};
</script>

<template>
  <div ref="cont" style="width: 100%; height: 100%"></div>
</template>
~~~ 

Чтобы контейнер Gantt занимал всё пространство body, нужно удалить стандартные стили из файла ***src/assets/main.css*** и добавить следующий:

~~~js title="src/assets/main.css"
body, #app {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
}
~~~

## Шаг 3. Добавление Gantt в приложение

Теперь пришло время добавить компонент в наше приложение. Откройте ***src/App.vue*** и используйте компонент Gantt вместо обычного содержимого, вставив следующий код:

~~~js title="Gantt.vue"
<script>
import Gantt from "./components/Gantt.vue";

export default {
  components: { Gantt }
};
</script>

<template>
  <Gantt/>
</template>
~~~ 

После этого, когда запустите приложение, вы должны увидеть пустой Gantt на странице:

![Gantt Vue init](/img/gantt_init.png)

## Шаг 4. Предоставление данных

Чтобы добавить данные в Gantt, необходимо предоставить набор данных. Создайте файл ***data.js*** в каталоге ***src/*** и добавьте в него данные:

~~~js title="src/data.js"
export function getData() {
  const tasks = {
    data: [
      {
        id: "10",
        text: "Project #1",
        start_date: "01-04-2025",
        duration: 3,
        order: 10,
        progress: 0.4,
        open: true,
      },
      {
        id: "1",
        text: "Task #1",
        start_date: "01-04-2025",
        duration: 1,
        order: 10,
        progress: 0.6,
        parent: "10",
      },
      {
        id: "2",
        text: "Task #2",
        start_date: "02-04-2025",
        duration: 2,
        order: 20,
        progress: 0.6,
        parent: "10",
      },
    ],
    links: [{ id: 1, source: 1, target: 2, type: "0" }],
  };
  return tasks;
}
~~~

Мы должны [передавать props (наши данные)](https://vuejs.org/guide/components/props.html) в компонент Gantt в файле ***App.vue***:

~~~html title="Gantt.vue"
<script>
import Gantt from "./components/Gantt.vue";
import { getData } from "./data";

export default {
  components: { Gantt },
  data() {
    return {
      tasks: getData(),
    };
  },
};
</script>

<template>
  <Gantt :tasks="tasks" />
</template>
~~~ 

И используйте пропсы в методе **gantt.parse()** внутри компонента Gantt:

~~~html title="Gantt.vue"
<script>
import { Gantt } from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";

export default {
  props: ["tasks"],

  mounted() {
    let gantt = Gantt.getGanttInstance();
    gantt.init(this.$refs.cont);
    gantt.parse(this.tasks);

    this.gantt = gantt;
  },
  unmounted() {
    this.gantt.destructor();
    this.$refs.cont.innerHTML = "";
  },
};
</script>

<template>
  <div ref="cont" style="width: 100%; height: 100%"></div>
</template>
~~~ 

Теперь, если открыть заново страницу приложения, вы должны увидеть Gantt с задачами:

![Gantt tasks](/img/gantt_tasks.png)

## Шаг 5. Сохранение данных

Чтобы зафиксировать изменения, внесённые в Gantt, вы можете использовать обработчик [dataProcessor](api/method/dataprocessor.md), который позволяет "общаться" с серверной частью бэкенда. Обработчик может быть объявлен либо как функция, либо как объект-роутер. 
dhtmlxGantt принимает ответ Promise от обработчика, поэтому ваш Gantt корректно обрабатывает завершение действия. 

Вы можете создать **DataProcessor** с помощью API-метода **createDataProcessor()** и зафиксировать изменения следующим образом:

~~~
gantt.createDataProcessor(function(entity, action, data, id) {​
    gantt.message(`${​entity} ${​action}`);
});
~~~

Если ваш сервис изменяет id задачи после создания новой записи (что обычно и происходит), убедитесь, что ваш 
Promise возвращает объект с **(id: databaseId)** или **(tid: databaseId)** в качестве результата, чтобы Gantt мог 
применить новый идентификатор базы данных к записи. Узнайте [более подробную информацию о стороне сервера](guides/server-side.md).

Итак, Vue Gantt готов, добро пожаловать на [полную демонстрацию на GitHub](https://github.com/DHTMLX/vue-gantt-demo).

## XSS, CSRF и SQL Injection атаки

Обратите внимание, что Gantt не предоставляет средств защиты от различных угроз, таких как SQL-инъекции или 
XSS и CSRF атаки. Важно, чтобы ответственность за безопасность приложения лежала на разработчиках, реализующих бэкенд.

Ознакомьтесь со статьей [Application Security](guides/app-security.md), чтобы узнать наиболее уязвимые точки компонента и
меры, которые можно предпринять для повышения безопасности вашего приложения.