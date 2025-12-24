---
title: "dhtmlxGantt와 Node.js 연동하기"
sidebar_label: "Node.js"
---

# dhtmlxGantt와 Node.js 연동하기


이 튜토리얼에서는 dhtmlxGantt를 Node.js와 서버 측 REST API와 함께 설정하는 방법을 안내합니다.  
다른 기술 스택을 사용하고 있다면, 아래의 다른 통합 옵션을 참고할 수 있습니다:

- [dhtmlxGantt와 ASP.NET Core 사용하기](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt와 ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt와 Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt와 PHP: Laravel 연동](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt와 PHP:Slim 연동하기](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt와 Salesforce LWC 연동하기](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt와 Ruby on Rails 연동하기](integrations/other/howtostart-ruby.md)

Node.js 구현에서는 서버와의 통신을 위해 REST API를 사용할 예정입니다.  
Node.js에서는 이미 준비된 다양한 도구를 제공하므로, 모든 것을 처음부터 만들 필요는 없습니다. 데이터 저장소로는 MySQL을 사용할 것입니다.

:::note
전체 소스 코드는 [GitHub](https://github.com/DHTMLX/gantt-howto-node)에서 확인할 수 있습니다.
:::

또한, Node.js를 사용하여 Gantt 차트를 만드는 방법을 보여주는 영상 가이드도 참고할 수 있습니다.

<iframe width="704" height="400" src="https://www.youtube.com/embed/D8YzyzBfyP8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 1단계. 프로젝트 생성


먼저, 프로젝트 폴더를 만들고 필요한 의존성을 추가합니다. 아래 모듈을 사용할 예정입니다:

- [Express](http://expressjs.com/) - 경량 Node.js 프레임워크
- [body-parser](https://www.npmjs.com/package/body-parser) - 요청 본문 파싱 도구

"dhx-gantt-app"이라는 프로젝트 폴더를 생성합니다:

~~~js
mkdir dhx-gantt-app
cd dhx-gantt-app
~~~

### 의존성 추가

다음으로, 아래 명령어로 *package.json* 파일을 생성하세요:

~~~js
npm init -y
~~~

파일이 생성되면 열어서 위에서 언급한 의존성을 추가하세요. 다음과 같이 보일 것입니다:

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

이제 다음 명령어로 의존성을 설치하세요:

~~~js
npm install
~~~

### 백엔드 준비

[express](https://expressjs.com/) 기반의 기본 백엔드를 구성합니다: 서버용 단일 자바스크립트 파일("server.js"), 정적 파일을 위한 폴더("public"), 그리고 단일 HTML 페이지가 필요합니다.

프로젝트 구조는 다음과 같습니다:

~~~html
dhx-gantt-app
├── node_modules
├── server.js 
├── package.json 
└── public 
    └── index.html 
~~~

<b>server.js</b> 파일을 생성하고 아래 코드를 추가하세요:

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

이 코드는 다음을 수행합니다:

- 'public' 폴더에서 정적 파일을 제공합니다.
- 앱을 localhost 1337번 포트에서 실행합니다.

다음으로 "public" 폴더를 만듭니다. 이 폴더에는 앱의 메인 페이지인 *index.html*이 들어갑니다.

:::note
이 폴더는 dhtmlxGantt의 js 및 css 파일을 넣는 위치이기도 합니다. 하지만 이 튜토리얼에서는 CDN에서 gantt를 불러오기 때문에 HTML 페이지만 이곳에 위치합니다.
:::

## 2단계. 페이지에 Gantt 추가하기


*public* 폴더를 생성하고 그 안에 *index.html* 파일을 추가하세요. *index.html*을 열고 아래 내용을 입력합니다:

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

프로젝트 폴더에서 아래 명령어를 실행하여 동작을 확인하세요:

~~~js
node server.js
~~~

그리고 브라우저에서 http://127.0.0.1:1337 을 엽니다. 아래와 같이 빈 Gantt 차트가 나타납니다:

![gantt_init](/img/gantt_init.png)

## 3단계. 데이터베이스 준비


이제 데이터베이스를 설정합니다.  
작업(tasks)용 테이블과 링크(links)용 테이블, 두 개의 테이블로 간단한 데이터베이스를 만듭니다:

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

샘플 데이터를 추가합니다:

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

자세한 내용은 [여기](guides/loading.md#standarddatabasestructure) 예제를 참고하세요.

## 4단계. 데이터 불러오기


이제 데이터 로딩을 설정할 차례입니다.

MySQL을 사용하므로, 접근을 위해 필요한 모듈을 설치합니다.  
이 튜토리얼에서는 CRUD 작업에 promise를 사용하므로, [promise-mysql](https://www.npmjs.com/package/promise-mysql)과  
promise 라이브러리로 [bluebird](https://www.npmjs.com/package/bluebird)를 사용합니다.

서로 호환되는 버전으로 아래와 같이 설치하세요:

~~~js
npm install bluebird@3.7.2 --save
npm install promise-mysql@5.1.0 --save
npm install date-format-lite@17.7.0 --save
~~~

원한다면 다른 모듈을 사용해도 괜찮습니다. 로직은 비교적 단순합니다.

클라이언트는 [JSON 포맷](guides/supported-data-formats.md#json)으로 데이터를 기대합니다.  
따라서 이 포맷으로 데이터를 반환하는 라우트를 생성합니다.

"start_date" 필드는 날짜 객체이므로, 클라이언트에 올바른 포맷으로 전송해야 합니다. 이를 위해 [date-format-lite](https://github.com/litejs/date-format-lite)를 사용합니다.

~~~js
npm install date-format-lite --save
~~~

이제 *server.js* 파일을 아래와 같이 업데이트합니다:

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

이 코드는 다음을 수행합니다:

- MySQL 데이터베이스에 연결합니다.
- <b>GET /data</b> 라우트를 정의하여 tasks와 links를 가져오고, start_date를 올바른 포맷으로 변환한 후 클라이언트에 데이터를 전송합니다.

*open* 속성은 작업 트리가 기본적으로 펼쳐지도록 하기 위해 추가되었습니다.

이제 클라이언트 측에서 이 라우트를 호출합니다:

**public/index.html**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/
  
gantt.init("gantt_here");

gantt.load("/data");/*!*/
~~~

[date_format](api/config/date_format.md) 설정은 서버에서 오는 날짜 포맷을 gantt가 해석할 수 있게 합니다.

앱을 다시 실행한 후 http://127.0.0.1:1337 을 열면, gantt가 데이터베이스의 테스트 데이터를 표시합니다.

![load_data_nodejs](/img/load_data_nodejs.png)

## 5단계. 변경사항 저장하기


마지막으로, 변경사항 저장을 설정합니다.  
즉, 클라이언트에서 발생한 변경을 서버로 전송합니다.  
*public/index.html*을 열고 [gantt.dataProcessor](guides/server-side.md#technique)를 추가하세요:

**public/index.html**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";
  
gantt.init("gantt_here");

gantt.load("/data");
  
const dp = new gantt.dataProcessor("/data");/*!*/
dp.init(gantt);/*!*/
dp.setTransactionMode("REST");/*!*/
~~~

이 동작 방식에 대해 좀 더 자세히 살펴보겠습니다.

### 요청 및 응답

사용자가 작업(task)이나 링크(link)를 추가, 수정 또는 삭제할 때마다 DataProcessor는 적절한 URL로 AJAX 요청을 보냅니다. 이 요청에는 데이터베이스에 변경사항을 저장하는 데 필요한 모든 파라미터가 포함되어 있습니다.

DataProcessor가 REST 모드로 실행되기 때문에, 작업 유형에 따라 다양한 HTTP 메서드를 사용합니다. 이러한 HTTP 메서드와 요청 및 응답에 대한 자세한 내용은 [Server-Side Integration](guides/server-side.md#technique) 문서에서 확인할 수 있습니다.

다음으로, *server.js* 파일에 필요한 라우트와 핸들러를 추가해야 합니다. 이 핸들러들은 클라이언트 측에서 발생한 변경사항을 데이터베이스에 반영합니다. 결과 코드는 다음과 같습니다:

**server.js**
~~~js
// add a new task
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

// update a task
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

    db.query("INSERT INTO gantt_links(source, target, type) VALUES (?,?,?)",
        [link.source, link.target, link.type])
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

    db.query("UPDATE gantt_links SET source = ?, target = ?, type = ? WHERE id = ?",
        [link.source, link.target, link.type, sid])
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

여기서는 두 가지 엔터티, 즉 *tasks*와 *links*에 대한 라우트가 각각 생성되어 있습니다. *"/data/task"* URL은 작업 관련 요청을 처리하고, *"/data/link"*는 링크 관련 요청을 처리합니다.

요청 타입은 다음과 같습니다:

- POST - 새로운 항목을 데이터베이스에 추가
- PUT - 기존 레코드를 수정
- DELETE - 항목 삭제

응답은 수행된 작업의 종류나 문제가 발생한 경우 "error"를 나타내는 JSON 객체입니다.

POST 요청의 경우, 응답에는 새 레코드의 데이터베이스 ID도 포함됩니다. 이를 통해 클라이언트는 새 항목을 데이터베이스 엔터티와 매핑할 수 있습니다.

이제 http://127.0.0.1:1337 에 접속하면 완전히 동작하는 간트 차트를 확인할 수 있습니다.

![ready_gantt_nodejs](/img/ready_gantt_nodejs.png)


## 작업 순서 저장하기 {#storingtheorderoftasks}

클라이언트 측 간트는 [작업 순서 변경](guides/reordering-tasks.md)을 드래그 앤 드롭을 통해 지원합니다. 이 기능을 사용할 경우, 변경된 순서를 데이터베이스에 저장해야 합니다. [여기](guides/server-side.md#storingtheorderoftasks)에서 개요를 확인할 수 있습니다.

이제 이 기능을 앱에 추가해보겠습니다.

### 클라이언트에서 작업 순서 변경 활성화

먼저, 사용자가 UI에서 작업 순서를 변경할 수 있어야 합니다. "Index" 뷰를 열고 간트 설정을 업데이트하세요:

**public/index.html**
~~~js
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

다음으로, 이러한 변경사항을 백엔드에 반영해야 합니다. 순서는 "sortorder"라는 컬럼에 저장됩니다. 업데이트된 *gantt_tasks* 테이블의 예시는 다음과 같습니다:

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

또는 기존 테이블에 컬럼을 추가할 수도 있습니다:

~~~js
ALTER TABLE `gantt_tasks` ADD COLUMN `sortorder` int(11) NOT NULL;
~~~

그리고 *server.js* 파일을 다음과 같이 수정합니다:

1. <b>GET /data</b> 라우트는 `sortorder` 컬럼 순서대로 작업을 반환해야 합니다:

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


2. 새 작업을 추가할 때 `sortorder`의 초기값을 할당합니다:

**server.js**
~~~js
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

3. 마지막으로, 작업 순서가 변경될 때 순서를 업데이트합니다:

**server.js**
~~~js
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

완성된 데모는 GitHub에서 확인할 수 있습니다: [https://github.com/DHTMLX/gantt-howto-node](https://github.com/DHTMLX/gantt-howto-node).


## 애플리케이션 보안


Gantt 자체는 SQL 인젝션, XSS, CSRF 공격과 같은 위협에 대한 보호 기능을 제공하지 않습니다. 애플리케이션 보안은 백엔드를 관리하는 개발자의 책임입니다. 자세한 내용은 [이 문서](guides/app-security.md)를 참고하세요.

## 문제 해결


Gantt와 Node.js를 연동하는 모든 단계를 따라 했음에도 작업과 링크가 페이지에 표시되지 않는 경우, [백엔드 통합 문제 해결](guides/troubleshooting.md) 문서를 참고하세요. 일반적인 문제의 원인과 해결 방법을 안내합니다.


## 다음 단계


이제 간트 차트가 완전히 동작합니다. 전체 코드는 [GitHub](https://github.com/DHTMLX/gantt-howto-node)에서 확인하거나 프로젝트에 사용할 수 있도록 복제하거나 다운로드할 수 있습니다.

또한 [다양한 간트 기능 가이드](guides.md)나 [다른 백엔드 프레임워크와 Gantt 연동 튜토리얼](integrations/howtostart-guides.md)도 살펴볼 수 있습니다.

