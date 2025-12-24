---
title: "dhtmlxGantt с Vue.js"
sidebar_label: "Vue.js"
---

# dhtmlxGantt с Vue.js


Это руководство предполагает, что вы обладаете базовыми знаниями о [Vue](https://vuejs.org/) и его паттернах. Если вы только начинаете работать с Vue, рекомендуем ознакомиться с [документацией по Vue 3](https://vuejs.org/guide/introduction.html) для быстрого старта.

DHTMLX Gantt хорошо работает с Vue. Пример интеграции доступен на GitHub: [DHTMLX Gantt with Vue Demo](https://github.com/DHTMLX/vue-gantt-demo).

## Создание проекта

Перед началом убедитесь, что у вас установлен [Node.js](https://nodejs.org/en/).

Для создания проекта на Vue выполните команду:

~~~
npm create vue@latest
~~~

Эта команда установит и запустит **create-vue**, официальный инструмент для создания проектов на Vue. Подробнее см. в [Vue.js Quick Start](https://vuejs.org/guide/quick-start.html#creating-a-vue-application).

### Установка зависимостей

Далее перейдите в директорию вашего приложения. Назовём проект **gantt-vue**:

~~~
cd gantt-vue
~~~

Затем установите зависимости и запустите сервер разработки с помощью вашего пакетного менеджера:

- Для **yarn** выполните:

~~~
yarn install
yarn dev
~~~

- Для **npm** выполните:

~~~
npm install
npm run dev
~~~

Теперь ваш проект на Vue должен быть доступен по адресу [http://localhost:5173](http://localhost:5173).

![Gantt Vue app running](/img/gantt_vue_app_run.png)

## Создание Gantt

Чтобы добавить DHTMLX Gantt в проект, сначала остановите запущенное приложение, нажав **Ctrl+C** в терминале. Затем перейдите к установке пакета Gantt.

## Шаг 1. Установка пакета

PRO-версии библиотеки можно установить через **npm/yarn** из нашего приватного репозитория. Следуйте 
[этой инструкции](guides/installation.md#npmevaluationandproversions) для получения доступа.

После получения Evaluation-версии установите её одной из следующих команд:

- Через npm:

~~~
npm install @dhx/trial-gantt
~~~

- Через yarn:

~~~
yarn add @dhx/trial-gantt
~~~

Либо, так как zip-пакет библиотеки структурирован как модуль **npm**, вы можете 
[установить его из локальной папки](guides/installation.md#installfromlocalfolder).

## Шаг 2. Создание компонента

Создайте Vue-компонент для внедрения Gantt в ваше приложение. Добавьте новый файл ***Gantt.vue*** в директорию ***src/components/***.

### Импорт исходных файлов

Откройте ***Gantt.vue*** и импортируйте исходные файлы Gantt. Обратите внимание на различие в зависимости от способа установки:

- Если вы устанавливали из локальной папки, используйте:

**Gantt.vue**
~~~
import { Gantt} from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
~~~ 

- Если вы устанавливали trial-версию, используйте:

**Gantt.vue**
~~~
import { Gantt} from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

В этом руководстве используется **trial**-версия.

### Задание контейнера и добавление Gantt

Чтобы отобразить Gantt на странице, укажите элемент-контейнер. Пример:

**Gantt.vue**
~~~html
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

Чтобы контейнер Gantt занимал всю площадь body, удалите стандартные стили из ***main.css*** в ***src/assets*** и добавьте:

**src/assets/main.css**
~~~
body, #app {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
}
~~~

## Шаг 3. Добавление Gantt в приложение

Далее подключите компонент Gantt в вашем приложении. Откройте ***src/App.vue*** и замените содержимое на:

**src/App.vue**
~~~html
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

После запуска приложения вы увидите пустой Gantt:

![Gantt Vue init](/img/gantt_init.png)

## Шаг 4. Передача данных

Чтобы отобразить задачи в Gantt, передайте набор данных. Создайте файл ***data.js*** в директории ***src/*** со следующим содержимым:

**src/data.js**
~~~js
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

Передайте эти данные как props в компонент Gantt в ***App.vue***:

**App.vue**
~~~html
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

Затем используйте эти props с **gantt.parse()** в компоненте Gantt:

**Gantt.vue**
~~~html
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

После перезагрузки страницы приложения вы увидите Gantt с задачами:

![Gantt tasks](/img/gantt_tasks.png)

## Шаг 5. Сохранение данных

Для отслеживания изменений в Gantt используйте обработчик [dataProcessor](api/method/dataprocessor.md), который управляет связью с вашим backend. Такой обработчик может быть функцией или объектом router. dhtmlxGantt поддерживает Promise-ответы от обработчика, что гарантирует корректную обработку завершения действий.

Создайте **DataProcessor** с помощью **createDataProcessor()** и отслеживайте изменения следующим образом:

~~~
gantt.createDataProcessor(function(entity, action, data, id) {​
    gantt.message(`${​entity} ${​action}`);
});
~~~

Если ваш backend изменяет идентификаторы задач после создания новых записей (что часто встречается в различных системах), убедитесь, что ваш Promise возвращает объект вида **(id: databaseId)** или **(tid: databaseId)**. Это позволит Gantt обновить запись с новым ID из базы данных. Подробности см. в разделе [интеграция с сервером](guides/server-side.md).

Теперь ваша интеграция Vue и Gantt завершена. Вы можете ознакомиться с полной демонстрацией на GitHub: [https://github.com/DHTMLX/vue-gantt-demo](https://github.com/DHTMLX/vue-gantt-demo).

## XSS, CSRF и SQL-инъекции

Обратите внимание, что сам Gantt не защищает от угроз, таких как SQL-инъекции, XSS или CSRF-атаки. Ответственность за безопасность приложения лежит на backend-разработчиках.

Обратитесь к статье [Безопасность приложения](guides/app-security.md), чтобы узнать о типовых уязвимостях и способах усиления защиты вашего приложения.
