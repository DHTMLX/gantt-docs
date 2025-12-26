---
title: "dhtmlxGantt с Node.js"
sidebar_label: "Node.js"
---

# dhtmlxGantt с Node.js

В этом руководстве показано, как настроить dhtmlxGantt с Node.js и REST API на серверной стороне.
Если вы используете другую технологию, вы можете найти другие варианты интеграции по ссылкам ниже:

- [dhtmlxGantt с ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt с ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt с Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt с PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt с PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt с Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt с Ruby on Rails](integrations/other/howtostart-ruby.md)

В реализации на Node.js для взаимодействия с сервером будет использоваться REST API.
Поскольку Node.js предоставляет множество готовых инструментов, нет необходимости разрабатывать всё с нуля. Для хранения данных мы также будем использовать MySQL.

:::note
Полный исходный код можно найти [на GitHub](https://github.com/DHTMLX/gantt-howto-node).
:::

Вы также можете посмотреть видеоинструкцию по созданию диаграммы Gantt с использованием Node.js.

<iframe width="704" height="400" src="https://www.youtube.com/embed/D8YzyzBfyP8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Шаг 1. Создание проекта

Сначала создайте папку для проекта и добавьте необходимые зависимости. Мы будем использовать следующие модули:

- [Express](http://expressjs.com/) - лёгкий фреймворк для Node.js
- [body-parser](https://www.npmjs.com/package/body-parser) - инструмент для разбора тела входящих запросов

Создайте папку проекта с именем "dhx-gantt-app":

~~~js
mkdir dhx-gantt-app
cd dhx-gantt-app
~~~

### Добавление зависимостей

Далее создайте файл *package.json*, выполнив команду:

~~~js
npm init -y
~~~

После создания файла откройте его и добавьте вышеуказанные зависимости. Файл должен выглядеть примерно так:

**package.json**
~~~js
{
  "name": "dhx-gantt-app",
  "version": "1.0.2",
  "description": "",
  "main": "server.js",
  "dependencies": {
    "body-parser": "^1.19.1",
    "express": "^4.17.2"
  },
  "scripts": {
    "test": "echo "Error: no test specified" && exit 1",
    "start": "node server.js"
  },
  "keywords": [],
  "author": "",
  "license": "MIT"
}
~~~

Затем установите зависимости командой:

~~~js
npm install
~~~

### Подготовка backend

Мы настроим базовый backend на [express](https://expressjs.com/): один JavaScript-файл для сервера ("server.js"),
папку для статических файлов ("public") и одну HTML-страницу.

Структура проекта будет выглядеть так:

~~~html
dhx-gantt-app
├── node_modules
├── server.js 
├── package.json 
└── public 
    └── index.html 
~~~

Создайте файл <b>server.js</b> и добавьте следующий код:

**server.js**
~~~js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const port = 1337;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () =>{
    console.log("Server is running on port "+port+"...");
});
~~~

Этот код выполняет следующие действия:

- Отдаёт статические файлы из папки 'public'
- Запускает приложение на localhost, порт 1337

Далее создайте папку "public". В ней будет находиться главная страница приложения - *index.html*.

:::note
В эту папку также помещаются js- и css-файлы dhtmlxGantt. Однако в этом руководстве мы будем подключать Gantt через CDN, поэтому здесь будет только HTML-страница.
:::

## Шаг 2. Добавление Gantt на страницу

Создайте папку *public* и добавьте в неё файл *index.html*. Откройте *index.html* и добавьте следующий код:

**index.html**
~~~html
<!DOCTYPE html>
<head>
  <meta http-equiv="Content-type" content="text/html; charset="utf-8"">

  <script src="https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.js"></script>
  <link href="https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.css" rel="stylesheet">

  <style type="text/css">
    html, body{
      height:100%;
      padding:0px;
      margin:0px;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <div id="gantt_here" style='width:100%; height:100%;'></div>
  <script type="text/javascript">
    gantt.init("gantt_here");
  </script>
</body>
~~~

Чтобы увидеть результат, выполните из папки проекта:

~~~js
node server.js
~~~

Затем откройте http://127.0.0.1:1337 в браузере. Вы должны увидеть пустую диаграмму Gantt, как на скриншоте:

![gantt_init](/img/gantt_init.png)

## Шаг 3. Подготовка базы данных

Далее создайте базу данных. Мы создадим простую базу данных с двумя таблицами: для задач и для связей:

~~~js
CREATE TABLE `gantt_links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source` int(11) NOT NULL,
  `target` int(11) NOT NULL,
  `type` varchar(1) NOT NULL,
  PRIMARY KEY (`id`)
);
CREATE TABLE `gantt_tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `duration` int(11) NOT NULL,
  `progress` float NOT NULL,
  `parent` int(11) NOT NULL,
  PRIMARY KEY (`id`)
);
~~~

Добавьте тестовые данные:

~~~js
INSERT INTO `gantt_tasks` VALUES ('1', 'Project #1', '2017-04-01 00:00:00', 
  '5', '0.8', '0');
INSERT INTO `gantt_tasks` VALUES ('2', 'Task #1', '2017-04-06 00:00:00', 
  '4', '0.5', '1');
INSERT INTO `gantt_tasks` VALUES ('3', 'Task #2', '2017-04-05 00:00:00', 
  '6', '0.7', '1');
INSERT INTO `gantt_tasks` VALUES ('4', 'Task #3', '2017-04-07 00:00:00', 
  '2', '0', '1');
INSERT INTO `gantt_tasks` VALUES ('5', 'Task #1.1', '2017-04-05 00:00:00', 
  '5', '0.34', '2');
INSERT INTO `gantt_tasks` VALUES ('6', 'Task #1.2', '2017-04-11 13:22:17', 
  '4', '0.5', '2');
INSERT INTO `gantt_tasks` VALUES ('7', 'Task #2.1', '2017-04-07 00:00:00',
  '5', '0.2', '3');
INSERT INTO `gantt_tasks` VALUES ('8', 'Task #2.2', '2017-04-06 00:00:00', 
  '4', '0.9', '3');
~~~

Подробнее о структуре смотрите пример [здесь](guides/loading.md#standarddatabasestructure).

## Шаг 4. Загрузка данных

Теперь настроим загрузку данных.

Поскольку мы используем MySQL, установите необходимые модули для доступа к базе. В этом руководстве используются промисы для CRUD-операций, поэтому мы будем использовать [promise-mysql](https://www.npmjs.com/package/promise-mysql) для работы с MySQL через промисы и
[bluebird](https://www.npmjs.com/package/bluebird) как библиотеку промисов.

Установите их через консоль, указав совместимые версии:

~~~js
npm install bluebird@3.7.2 --save
npm install promise-mysql@5.1.0 --save
npm install date-format-lite@17.7.0 --save
~~~

Вы можете использовать и другие модули, если хотите, так как логика достаточно простая.

Клиент ожидает данные в [JSON-формате](guides/supported-data-formats.md#json). Поэтому создадим маршрут, возвращающий данные в этом формате.

Поскольку поле "start_date" является объектом даты, его нужно отправлять клиенту в правильном формате. Для этого воспользуемся [date-format-lite](https://github.com/litejs/date-format-lite).

~~~js
npm install date-format-lite --save
~~~

Теперь обновите *server.js* следующим образом:

**server.js**
~~~js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const port = 1337;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () =>{
    console.log("Server is running on port "+port+"...");
});

const Promise = require('bluebird');
require("date-format-lite");

const mysql = require('promise-mysql');
async function serverСonfig() {
    const db = await mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'gantt_howto_node'
    });
    app.get("/data", (req, res) => {
        Promise.all([
            db.query("SELECT * FROM gantt_tasks"),
            db.query("SELECT * FROM gantt_links")
        ]).then(results => {
            let tasks = results[0],
                links = results[1];

            for (let i = 0; i < tasks.length; i++) {
              tasks[i].start_date = tasks[i].start_date.format("YYYY-MM-DD hh:mm:ss");
              tasks[i].open = true;
            }

            res.send({
                data: tasks,
                collections: { links: links }
            });

        }).catch(error => {
            sendResponse(res, "error", null, error);
        });
    });

    function sendResponse(res, action, tid, error) {

        if (action == "error")
            console.log(error);

        let result = {
            action: action
        };
        if (tid !== undefined && tid !== null)
            result.tid = tid;

        res.send(result);
    }
};
serverСonfig();
~~~

Этот код выполняет следующие действия:

- Подключается к базе данных MySQL
- Определяет маршрут <b>GET /data</b>, который получает задачи и связи, форматирует start_date и отправляет данные клиенту

Свойство *open* добавлено для того, чтобы дерево задач было раскрыто по умолчанию.

Теперь на клиентской стороне вызовите этот маршрут:

**public/index.html**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/
  
gantt.init("gantt_here");

gantt.load("/data");/*!*/
~~~

Параметр [date_format](api/config/date_format.md) сообщает Gantt, как интерпретировать формат даты, приходящей с сервера.

Снова запустите приложение и откройте http://127.0.0.1:1337. Gantt теперь должен показывать тестовые данные из базы данных.

![load_data_nodejs](/img/load_data_nodejs.png)

## Шаг 5. Сохранение изменений

Наконец, настроим сохранение изменений.
Это означает отправку изменений, сделанных на клиенте, обратно на сервер.
Откройте *public/index.html* и добавьте [gantt.dataProcessor](guides/server-side.md#technique):

**public/index.html**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";
  
gantt.init("gantt_here");

gantt.load("/data");
  
const dp = new gantt.dataProcessor("/data");/*!*/
dp.init(gantt);/*!*/
dp.setTransactionMode("REST");/*!*/
~~~

Давайте подробнее рассмотрим, как это работает.

### Запросы и ответы

Каждый раз, когда пользователь добавляет, изменяет или удаляет задачу или связь, DataProcessor отправляет AJAX-запрос на соответствующий URL. Этот запрос содержит все параметры, необходимые для сохранения изменений в базе данных.

Поскольку DataProcessor работает в режиме REST, используются различные HTTP-методы в зависимости от типа операции. Список этих HTTP-методов, а также подробности о запросах и ответах можно найти в статье [Интеграция с серверной стороной](guides/server-side.md#technique).

Далее необходимо добавить соответствующие маршруты и обработчики в файл *server.js*. Они будут применять изменения, внесённые на клиенте, к базе данных. Итоговый код выглядит так:

**server.js**
~~~js
// добавление новой задачи
app.post("/data/task", (req, res) => {
    let task = getTask(req.body);

    db.query("INSERT INTO gantt_tasks(text, start_date, duration, progress, parent)"
        + " VALUES (?,?,?,?,?)",
        [task.text, task.start_date, task.duration, task.progress, task.parent])
    .then(result => {
        sendResponse(res, "inserted", result.insertId);
    })
    .catch(error => {
        sendResponse(res, "error", null, error);
    });
});

// обновление задачи
app.put("/data/task/:id", (req, res) => {
    let sid = req.params.id,
        task = getTask(req.body);

    db.query("UPDATE gantt_tasks SET text = ?, start_date = ?, "
        + "duration = ?, progress = ?, parent = ? WHERE id = ?",
        [task.text, task.start_date, task.duration, task.progress, task.parent, sid])
    .then(result => {
        sendResponse(res, "updated");
    })
    .catch(error => {
        sendResponse(res, "error", null, error);
    });
});


// удаление задачи
app.delete("/data/task/:id", (req, res) => {
    let sid = req.params.id;
    db.query("DELETE FROM gantt_tasks WHERE id = ?", [sid])
    .then(result => {
        sendResponse(res, "deleted");
    })
    .catch(error => {
        sendResponse(res, "error", null, error);
    });
});

// добавление связи
app.post("/data/link", (req, res) => {
    let link = getLink(req.body);

    db.query("INSERT INTO gantt_links(source, target, type) VALUES (?,?,?)",
        [link.source, link.target, link.type])
    .then(result => {
        sendResponse(res, "inserted", result.insertId);
    })
    .catch(error => {
        sendResponse(res, "error", null, error);
    });
});

// обновление связи
app.put("/data/link/:id", (req, res) => {
    let sid = req.params.id,
        link = getLink(req.body);

    db.query("UPDATE gantt_links SET source = ?, target = ?, type = ? WHERE id = ?",
        [link.source, link.target, link.type, sid])
    .then(result => {
        sendResponse(res, "updated");
    })
    .catch(error => {
        sendResponse(res, "error", null, error);
    });
});

// удаление связи
app.delete("/data/link/:id", (req, res) => {
    let sid = req.params.id;
    db.query("DELETE FROM gantt_links WHERE id = ?", [sid])
    .then(result => {
        sendResponse(res, "deleted");
    })
    .catch(error => {
        sendResponse(res, "error", null, error);
    });
});


function getTask(data) {
    return {
        text: data.text,
        start_date: data.start_date.date("YYYY-MM-DD"),
        duration: data.duration,
        progress: data.progress || 0,
        parent: data.parent
    };
}

function getLink(data) {
    return {
        source: data.source,
        target: data.target,
        type: data.type
    };
}
~~~

Здесь создаются два набора маршрутов: один для сущности *tasks*, другой - для *links*. URL *"/data/task"* обрабатывает запросы, связанные с задачами, а *"/data/link"* - запросы, касающиеся связей.

Типы запросов:

- POST - добавляет новый элемент в базу данных
- PUT - обновляет существующую запись
- DELETE - удаляет элемент

Ответы представляют собой JSON-объекты, указывающие тип выполненной операции или "error" в случае ошибки.

Для POST-запросов в ответ также включается ID новой записи из базы данных. Это позволяет клиенту сопоставить новый элемент с соответствующей сущностью в базе данных.

Вот и всё. Открыв http://127.0.0.1:1337, вы увидите полностью работоспособную диаграмму Gantt.

![ready_gantt_nodejs](/img/ready_gantt_nodejs.png)


## Сохранение порядка задач {#storingtheorderoftasks}

Клиентская часть Gantt поддерживает [изменение порядка задач](guides/reordering-tasks.md) с помощью drag and drop. Если используется эта функция, порядок необходимо сохранять в базе данных. Общий обзор доступен [здесь](guides/server-side.md#storingtheorderoftasks).

Добавим эту возможность в наше приложение.

### Включение изменения порядка задач на клиенте

Сначала пользователи должны иметь возможность менять порядок задач в интерфейсе. Откройте представление "Index" и обновите конфигурацию gantt:

**public/index.html**
~~~js
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

Далее нужно отразить эти изменения на сервере. Мы будем хранить порядок в колонке "sortorder". Обновлённая таблица *gantt_tasks* может выглядеть так:

~~~js
CREATE TABLE `gantt_tasks` (
  `id` int(11) NOT NULL  AUTO_INCREMENT PRIMARY KEY,
  `text` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `start_date` datetime NOT NULL,
  `duration` int(11) NOT NULL,
  `progress` float NOT NULL DEFAULT 0,
  `parent` int(11) NOT NULL,
  `sortorder` int(11) NOT NULL /*!*/
) ENGINE="InnoDB" DEFAULT CHARSET="utf8" COLLATE="utf8_unicode_ci;"
~~~

Либо можно добавить колонку в существующую таблицу:

~~~js
ALTER TABLE `gantt_tasks` ADD COLUMN `sortorder` int(11) NOT NULL;
~~~

Далее обновите файл *server.js* следующим образом:

1. Маршрут <b>GET /data</b> должен возвращать задачи, отсортированные по колонке `sortorder`:

**server.js**
~~~js
app.get("/data", (req, res) => {
    Promise.all([
        db.query("SELECT * FROM gantt_tasks ORDER BY sortorder ASC"), /*!*/
        db.query("SELECT * FROM gantt_links")
    ]).then(results => {
        let tasks = results[0],
            links = results[1];

        for (let i = 0; i < tasks.length; i++) {
            tasks[i].start_date = tasks[i].start_date.format("YYYY-MM-DD hh:mm:ss");
            tasks[i].open = true;
        }

        res.send({
            data: tasks,
            collections: { links: links }
        });

    }).catch(error => {
        sendResponse(res, "error", null, error);
    });
});
~~~


2. При добавлении новой задачи задайте начальное значение поля `sortorder`:

**server.js**
~~~js
app.post("/data/task", (req, res) => { // добавляет новую задачу в базу
    let task = getTask(req.body);

    db.query("SELECT MAX(sortorder) AS maxOrder FROM gantt_tasks")
    .then(result => { /*!*/ 
        // назначить максимальный sortorder новой задаче
        let orderIndex = (result[0].maxOrder || 0) + 1; /*!*/
        return db.query("INSERT INTO gantt_tasks(text, start_date, duration," 
          + "progress, parent, sortorder) VALUES (?,?,?,?,?,?)",
          [task.text, task.start_date, task.duration, task.progress, task.parent, 
            orderIndex]); /*!*/
    })
    .then(result => {
        sendResponse(res, "inserted", result.insertId);
    })
    .catch(error => {
        sendResponse(res, "error", null, error);
    });
});
~~~

3. Наконец, при изменении порядка задач обновляйте их порядок:

**server.js**
~~~js
// обновление задачи
app.put("/data/task/:id", (req, res) => {
  let sid = req.params.id,
    target = req.body.target,
    task = getTask(req.body);

  Promise.all([
    db.query("UPDATE gantt_tasks SET text = ?, start_date = ?," 
      + "duration = ?, progress = ?, parent = ? WHERE id = ?",
      [task.text, task.start_date, task.duration, task.progress, 
        task.parent, sid]),
    updateOrder(sid, target) /*!*/
  ])
    .then(result => {
      sendResponse(res, "updated");
    })
    .catch(error => {
      sendResponse(res, "error", null, error);
    });
});

function updateOrder(taskId, target) {
  let nextTask = false;
  let targetOrder;

  target = target || "";

  if (target.startsWith("next:")) {
    target = target.substr("next:".length);
    nextTask = true;
  }

  return db.query("SELECT * FROM gantt_tasks WHERE id = ?", [target])
    .then(result => {
      if (!result[0])
        return Promise.resolve();

      targetOrder = result[0].sortorder;
      if (nextTask)
        targetOrder++;

      return db.query("UPDATE gantt_tasks SET sortorder"+
        " = sortorder + 1 WHERE sortorder >= ?", [targetOrder])
      .then(result => {
        return db.query("UPDATE gantt_tasks SET sortorder = ? WHERE id = ?",
          [targetOrder, taskId]);
      });
    });
}
~~~

Готовый пример доступен на GitHub: [https://github.com/DHTMLX/gantt-howto-node](https://github.com/DHTMLX/gantt-howto-node).


## Безопасность приложения

Сам Gantt не предоставляет защиту от угроз, таких как SQL-инъекции, XSS или CSRF-атаки. Обеспечение безопасности приложения - задача разработчиков, отвечающих за серверную часть. Подробнее об этом читайте [в данной статье](guides/app-security.md).

## Диагностика проблем

Если вы выполнили все шаги по интеграции Gantt с Node.js, но задачи и связи не отображаются на странице, обратитесь к статье [Устранение проблем интеграции с backend](guides/troubleshooting.md). В ней вы найдёте рекомендации по поиску и устранению распространённых проблем.


## Что дальше

На данном этапе диаграмма Gantt полностью работоспособна. Полный исходный код доступен на [GitHub](https://github.com/DHTMLX/gantt-howto-node), где его можно клонировать или скачать для использования в своих проектах.

Также вы можете ознакомиться с [руководствами по различным возможностям Gantt](guides.md) или с уроками по [интеграции Gantt с другими backend-фреймворками](integrations/howtostart-guides.md).

