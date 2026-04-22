--- 
title: "dhtmlxGantt с Node.js" 
sidebar_label: "Node.js" 
---

# dhtmlxGantt с Node.js

Настоящий учебник предназначен для создания Gantt с Node.js и REST API на серверной стороне.  
Если вы используете другую технологию, ознакомьтесь с перечнем доступных вариантов интеграции ниже:

- [dhtmlxGantt с ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt с ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt с Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt с PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt с PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt с Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt с Ruby on Rails](integrations/other/howtostart-ruby.md)

Наша реализация Gantt с Node.js будет основана на REST API, которое будет использоваться для взаимодействия с сервером.  
Node.js предлагает набор готовых решений, поэтому нам не придется писать всё с нуля. Также мы будем использовать MySQL в качестве хранилища данных.

:::note
Полный исходный код — [на GitHub](https://github.com/DHTMLX/gantt-howto-node).
:::

Вы можете ознакомиться с видео-руководством, которое показывает, как создать диаграмму Gantt с помощью Node.js.

<iframe width="704" height="400" src="https://www.youtube.com/embed/D8YzyzBfyP8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Шаг 1. Создание проекта

Для начала создадим папку проекта, а затем добавим необходимые зависимости. Будут использоваться следующие модули:

- [Express](https://expressjs.com/) — небольшой фреймворк для Node.js
- [body-parser](https://www.npmjs.com/package/body-parser) — инструмент парсинга для Node.js

Итак, давайте создадим папку проекта и назовём её "dhx-gantt-app":

~~~js
mkdir dhx-gantt-app
cd dhx-gantt-app
~~~

### Добавление зависимостей

Теперь создадим файл *package.json*. Мы зададим зависимости внутри него следующей командой:

~~~js
npm init -y
~~~

После готовности файла откройте его и добавьте перечисленные выше зависимости. Результат будет выглядеть примерно так:

~~~js title="package.json"
{
  "name": "dhx-gantt-app",
  "version": "1.0.3",
  "description": "",
  "main": "server.js",
  "dependencies": {
    "body-parser": "^2.2.1",
    "express": "^5.2.1"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "keywords": [],
  "author": "",
  "license": "MIT"
}
~~~

Наконец, нужно установить добавленные зависимости с помощью следующей команды:

~~~js
npm install
~~~

### Подготовка бэкенда

Мы выполним базовую настройку [express](https://expressjs.com/): у нас будет один js-файл для нашего бэкенда (назовём его "server.js"),
папка для статических файлов (названа "public") и одна HTML-страница.

Структура всего проекта будет выглядеть так:

~~~html
dhx-gantt-app
├── node_modules
├── server.js 
├── package.json 
└── public 
    └── index.html 
~~~

Создайте новый файл с именем <b>server.js</b> и добавьте в него следующий код:

~~~js title="server.js"
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

Что мы сделали в этом коде:

- определили, что статические файлы будут обслуживаться из папки 'public'
- привязали приложение к порту 1337 на локальном хосте

На следующем шаге мы создадим папку "public". Эта папка будет содержать главную страницу нашего приложения — *index.html*.

:::note
Эта папка — тоже правильное место для размещения файлов js/css dhtmlxGantt. Однако в этом руководстве мы будем загружать gantt через CDN, поэтому там будет только HTML-страница.
:::

## Шаг 2. Добавление Gantt на страницу

Давайте создадим папку *public* и добавим файл *index.html* в неё. Затем откройте файл *index.html* и заполните его следующим содержимым:

~~~html title="index.html"
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

Посмотрите, что у нас получилось на данный момент. Вернитесь в папку проекта и выполните следующую команду в командной строке:

~~~js
node server.js
~~~

Затем откройте http://127.0.0.1:1337 в браузере. Вы должны увидеть страницу с пустой диаграммой Gantt, как на изображении здесь:

![gantt_init](/img/gantt_init.png)

## Шаг 3. Подготовка базы данных

Следующий шаг — создать базу данных. Мы сделаем простую базу данных с двумя таблицами для задач и связей:

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

и добавьте несколько тестовых данных:
~~~js
INSERT INTO `gantt_tasks` VALUES ('1', 'Project #1', '2026-04-01 00:00:00', 
  '5', '0.8', '0');
INSERT INTO `gantt_tasks` VALUES ('2', 'Task #1', '2026-04-06 00:00:00', 
  '4', '0.5', '1');
INSERT INTO `gantt_tasks` VALUES ('3', 'Task #2', '2026-04-05 00:00:00', 
  '6', '0.7', '1');
INSERT INTO `gantt_tasks` VALUES ('4', 'Task #3', '2026-04-07 00:00:00', 
  '2', '0', '1');
INSERT INTO `gantt_tasks` VALUES ('5', 'Task #1.1', '2026-04-05 00:00:00', 
  '5', '0.34', '2');
INSERT INTO `gantt_tasks` VALUES ('6', 'Task #1.2', '2026-04-11 13:22:17', 
  '4', '0.5', '2');
INSERT INTO `gantt_tasks` VALUES ('7', 'Task #2.1', '2026-04-07 00:00:00',
  '5', '0.2', '3');
INSERT INTO `gantt_tasks` VALUES ('8', 'Task #2.2', '2026-04-06 00:00:00', 
  '4', '0.9', '3');
~~~

Проверьте подробный пример [здесь](guides/loading.md#databasestructure).

## Шаг 4. Загрузка данных

Теперь нам нужно реализовать загрузку данных.

Поскольку мы используем MySQL, нам нужно установить необходимые модули, которые можно использовать для доступа к ним. В этом руководстве операции CRUD будут реализованы с использованием обещаний (promises).  
Поэтому мы будем использовать [promise-mysql](https://www.npmjs.com/package/promise-mysql) — пакет Node.js для работы с MySQL с использованием промисов, и
помощник обещаний [bluebird](https://www.npmjs.com/package/bluebird).

Чтобы их установить, можно воспользоваться консолью. Необходимые версии компонентов указаны, поскольку более новые версии могут быть несовместимы друг с другом или не иметь старых функций:

~~~js
npm install bluebird@3.7.2 --save
npm install promise-mysql@5.1.0 --save
npm install date-format-lite@17.7.0 --save
~~~

Вы можете выбрать любые другие подходящие модули. Код довольно прост, и вы можете реализовать ту же логику с другим набором инструментов.

Клиентская сторона ожидает данные в формате [JSON](guides/supported-data-formats.md). И поэтому мы создадим маршрут, возвращающий данные именно в таком формате.

Как вы, возможно, упомянули, в данных присутствует свойство "start_date", которое хранится как объект даты. Следовательно, его следует передавать клиенту в нужном формате. Для этого мы будем использовать ещё один модуль - [date-format-lite](https://github.com/litejs/date-format-lite).

~~~js
npm install date-format-lite --save
~~~

Теперь откройте файл *server.js* и обновите его код следующим образом:

~~~js title="server.js"
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
            }

            res.send({
                data: tasks,
                collections: { links }
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

Что мы сделали в этом коде:

- открыт доступ к MySql-подключению к нашей базе данных
- определено, что по запросу <b>GET /data</b> будут считываться данные из таблиц gantt_tasks и gantt_links и форматироваться так, чтобы их можно было разобрать на клиенте

Теперь мы можем вызвать этот маршрут с клиента:

~~~js title="public/index.html"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/
gantt.config.open_tree_initially = true;
  
gantt.init("gantt_here");

gantt.load("/data");/*!*/
~~~

Заметим, что конфигурация [date_format](api/config/date_format.md) задаёт формат дат (<b>start_date</b> задачи), приходящих с сервера. Конфигурация [gantt.config.open_tree_initially](api/config/open_tree_initially.md) установлена в значение `true`, чтобы дерево задач было развернуто изначально.

Давайте запустим приложение, открыв http://127.0.0.1:1337. Диаграмма Gantt загрузится с тестовыми данными, которые мы ранее добавили в базу данных.

![load_data_nodejs](/img/load_data_nodejs.png)

## Шаг 5. Сохранение изменений

Последнее, что нам нужно реализовать — сохранение данных.  
Для этого нам нужен код, который будет отправлять обновления, происходящие на клиенте, обратно на сервер.  
Перейдите в *public/index.html* и добавьте [gantt.createDataProcessor](guides/server-side.md#technique) на страницу:

~~~js title="public/index.html"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";
  
gantt.init("gantt_here");

gantt.load("/data");
  
const dp = gantt.createDataProcessor({ /*!*/
  url: '/data', /*!*/
  mode: 'REST', /*!*/
}); /*!*/
~~~

Разберём подробнее, какую роль он играет.

### Запросы и ответы

При каждом действии пользователя: добавлении, изменении или удалении новой задачи или связи, DataProcessor будет реагировать, отправляя AJAX-запрос на соответствующий URL. Запрос будет содержать все параметры, необходимые для сохранения изменений в базе данных.

Поскольку DataProcessor инициализирован в режиме REST, он будет использовать различные HTTP-методы для каждого типа операции.  
Список HTTP-методов вместе с деталями запросов и ответов приведён в статье [Серверная интеграция](guides/server-side.md#technique).

Итак, что нам нужно сделать сейчас — добавить нужные маршруты и обработчики в файл *server.js*, чтобы изменения, внесённые на клиенте, попадали в базу данных. Получившийся код будет довольно объемным:

~~~js title="server.js"
// add a new task
app.post("/data/task", (req, res) => {
    let task = getTask(req.body);
    const { text, start_date, duration, progress, parent } = task;

    db.query("INSERT INTO gantt_tasks(text, start_date, duration, progress, parent)"
        + " VALUES (?,?,?,?,?)",
        [text, start_date, duration, progress, parent])
    .then(result => {
        sendResponse(res, "inserted", result.insertId);
    })
    .catch(error => {
        sendResponse(res, "error", null, error);
    });
});

// update a task
app.put("/data/task/:id", (req, res) => {
    let sid = req.params.id,
        task = getTask(req.body);
    const { text, start_date, duration, progress, parent } = task;

    db.query("UPDATE gantt_tasks SET text = ?, start_date = ?, "
        + "duration = ?, progress = ?, parent = ? WHERE id = ?",
        [text, start_date, duration, progress, parent, sid])
    .then(result => {
        sendResponse(res, "updated");
    })
    .catch(error => {
        sendResponse(res, "error", null, error);
    });
});


// delete a task
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

// add a link
app.post("/data/link", (req, res) => {
    let link = getLink(req.body);
    const { source, target, type } = link;

    db.query("INSERT INTO gantt_links(source, target, type) VALUES (?,?,?)",
        [source, target, type])
    .then(result => {
        sendResponse(res, "inserted", result.insertId);
    })
    .catch(error => {
        sendResponse(res, "error", null, error);
    });
});

// update a link
app.put("/data/link/:id", (req, res) => {
    let sid = req.params.id,
        link = getLink(req.body);
    const { source, target, type, sid } = link;

    db.query("UPDATE gantt_links SET source = ?, target = ?, type = ? WHERE id = ?",
        [source, target, type, sid])
    .then(result => {
        sendResponse(res, "updated");
    })
    .catch(error => {
        sendResponse(res, "error", null, error);
    });
});

// delete a link
app.delete("/data/link/:id", (req, res) => {
    let sid = req.params.id;
    db.query("DELETE FROM gantt_links WHERE id = ?", [sid])
    .then(result => {
        sendResponse(res, "deleted");
    })
    .catch(error => {
        sendResponse(res, "error", null, error);
    });
})


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

Мы создали два набора маршрутов: один для сущности *tasks* и другой для сущности *links*.  
Соответственно, URL "/data/task" будет обрабатывать запросы, связанные с операциями над задачами, а URL "/data/link" будет использоваться для обработки запросов с данными для операций со связями.

Типы запросов довольно простые:

- POST — вставка новой записи в базу данных
- PUT — обновление существующей записи
- DELETE — удаление записи

Ответ будет представлять собой JSON-объект с типом выполненной операции или "error" в случае ошибки.

Ответ на POST-запрос также будет содержать идентификатор новой записи в базе данных. Он будет применяться на клиентской стороне, чтобы сопоставлять новый элемент с сущностью в базе данных.

На этом всё. Откройте http://127.0.0.1:1337, и вы увидите полностью функционирующий график Gantt.

![ready_gantt_nodejs](/img/ready_gantt_nodejs.png)

## Сохранение порядка задач {#storingtheorderoftasks}

Клиентская диаграмма Gantt позволяет [перетаскивать задачи в нужном порядке](guides/reordering-tasks.md). Поэтому, если вы используете эту функцию, вам нужно будет сохранять порядок в базе данных.  
Вы можете [проверить общую запись здесь](guides/server-side.md#storingtheorderoftasks).

Давайте добавим эту функцию в наше приложение.

### Включение повторной сортировки задач на клиенте

Во-первых, нужно разрешить пользователям менять порядок задач в пользовательском интерфейсе. Откройте представление "Index" и обновите конфигурацию gantt:

~~~js title="public/index.html"
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

Теперь отразим эти изменения на бэкенде. Мы будем сохранять порядок в столбце с именем "sortorder",
объявление таблицы *gantt_tasks* может выглядеть следующим образом:

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

Или добавьте столбец к уже существующей таблице:

~~~js
ALTER TABLE `gantt_tasks` ADD COLUMN `sortorder` int(11) NOT NULL;
~~~

После этого нужно обновить файл *server.js*:

1 . <b>GET /data</b> должен возвращать задачи в отсортированном порядке по столбцу `sortorder`:

~~~js title="server.js"
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
            collections: { links }
        });

    }).catch(error => {
        sendResponse(res, "error", null, error);
    });
});
~~~

2 . Новые задачи должны получать начальное значение `sortorder`:

~~~js title="server.js"
app.post("/data/task", (req, res) => { // adds new task to database
    let task = getTask(req.body);

    db.query("SELECT MAX(sortorder) AS maxOrder FROM gantt_tasks")
    .then(result => { /*!*/ 
        // assign max sort order to new task
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

3 . Наконец, когда пользователь переставляет задачи, порядок задач должен быть [обновлён](guides/server-side.md#storingtheorderoftasks):

~~~js title="server.js"
// update task
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

Вы можете проверить [готовый демо](https://github.com/DHTMLX/gantt-howto-node) на GitHub.

## Безопасность приложения

Gantt не предоставляет средств защиты от различных угроз, таких как SQL-инъекции, XSS и CSRF-атаки. Важно, чтобы ответственность за обеспечение безопасности приложения лежала на разработчиках, реализующих бэкенд. Подробности — в соответствующей статье.

## Устойчивость к проблемам

Если вы выполнили вышеописанные шаги по интеграции Gantt с Node.js, но Gantt не рендерит задачи и связи на странице, посмотрите статью [Troubleshooting Backend Integration Issues](guides/troubleshooting.md). Она описывает способы выявления причин проблем.

## Что дальше

Теперь у вас полностью функционирующая диаграмма Gantt. Полный код можно посмотреть на [GitHub](https://github.com/DHTMLX/gantt-howto-node), клонировать или скачать его и использовать в своих проектах.

Вы также можете ознакомиться с [руководствами по многочисленным функциям Gantt](guides.md) или с руководствами по [интеграции Gantt с другими бекенд-фреймворками](integrations/howtostart-guides.md).