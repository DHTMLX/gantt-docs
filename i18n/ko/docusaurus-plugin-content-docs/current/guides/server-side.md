---
title: "서버 측 통합" 
sidebar_label: "서버 측 통합" 
---

# 서버 측 통합

<style>
.dp_table td (
  width: 100%;
)
</style>

서버와의 연결을 권장하는 방법은 서버 측에 RESTful API를 구현하고 클라이언트에서 [](api/other/dataprocessor.md) 모듈을 사용하는 것입니다.

DataProcessor는 Gantt의 데이터 변경을 모니터링하고 지정된 형식으로 REST API에 업데이트를 전송하는 내장 모듈로, 서버 측 플랫폼과의 손쉬운 [통합](integrations/howtostart-guides.md)을 가능하게 합니다. 객체 데이터 소스를 사용할 때 DataProcessor를 구성하여 데이터 변경에 대한 콜백을 제공하도록 설정하면 데이터 바인딩에 활용할 수 있습니다.

페이지에 Gantt 차트를 만들고 데이터를 로드하는 방법을 Node.js 플랫폼의 예로 보여주는 비디오 가이드를 확인해 보실 수 있습니다.

<iframe width="704" height="400" src="https://www.youtube.com/embed/D8YzyzBfyP8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## 기법

일반적으로 REST API를 사용하여 서버 측에서 데이터를 로드하려면 다음이 필요합니다:

### 클라이언트 측

1) 데이터를 반환하는 URL을 [JSON](/guides/supported-data-formats/) 형식으로 지정하여 [](api/method/load.md) 메서드를 호출합니다.

2) 두 가지 방법 중 하나를 사용하여 DataProcessor 인스턴스를 생성합니다:

- DataProcessor를 초기화하고 dhtmlxGantt 객체에 연결:

~~~js
gantt.init("gantt_here");
gantt.load("apiUrl");

// 아래 줄의 순서를 유지합니다
const dp = new gantt.dataProcessor("apiUrl");
dp.init(gantt);
dp.setTransactionMode("REST");
dp.deleteAfterConfirmation = true;
~~~

:::note
두 번째 방법을 사용하는 것이 좋습니다.
:::

- [](api/method/createdataprocessor.md) 메서드를 호출하고 구성 옵션을 담은 객체를 매개변수로 전달합니다:

~~~js
const dp = gantt.createDataProcessor({
    url: "apiUrl",
    mode: "REST",
    deleteAfterConfirmation: true
});
~~~

다음 섹션의 자세한 정보를 확인하세요.


###  DataProcessor 생성 {#createdp}

API 메서드 [](api/method/createdataprocessor.md)로 DataProcessor를 생성할 때 매개변수를 전달하는 방법에는 여러 가지 옵션이 있습니다. 
  
1. 미리 정의된 요청 모드 중 하나를 사용합니다. 예:

~~~js
const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST",
    deleteAfterConfirmation: true
});
~~~

- **url** - 서버 측의 URL
- **mode** - 서버로 데이터를 전송하는 모드:  "GET" | "POST" | "REST" | "JSON" | "REST-JSON"
- **deleteAfterConfirmation** - 서버의 응답이 성공적일 때만 간트의 작업을 삭제하도록 할지 여부를 정의합니다. 상위 작업이 삭제가 확인된 후에 의존성 링크와 하위 작업이 삭제됩니다.

2. 사용자 정의 **router** 객체를 제공합니다:

~~~js
const dp = gantt.createDataProcessor(router);
~~~

- 여기서 **router**은 함수일 수도 있습니다:

~~~js
// entity - "task"|"link"|"resource"|"assignment"
// action - "create"|"update"|"delete"
// data - 작업 또는 링크 데이터 객체
// id – 처리 중인 객체의 id(작업 또는 링크)
const dp = gantt.createDataProcessor((entity, action, data, id) => { 
    switch(action) {
        case "create":
            return gantt.ajax.post(
                server + "/" + entity,
                data
            );
        break;
        case "update":
            return gantt.ajax.put(
                server + "/" + entity + "/" + id,
                data
            );
        break;
        case "delete":
            return gantt.ajax.del(
                server + "/" + entity + "/" + id
            );
        break;
    }
});
~~~

- 또는 아래 구조의 객체를 사용할 수 있습니다:

~~~js
const dp = gantt.createDataProcessor({
    task: {
        create: (data) => {},
        update: (data, id) => {},
        delete: (id) => {}
    },
    link: {
        create: (data) => {},
        update: (data, id) => {},
        delete: (id) => {}
    }
});
~~~

**router** 객체의 모든 함수는 Promise 또는 데이터 응답 객체를 반환해야 합니다. 이는 데이터 프로세서가 데이터베이스 id를 적용하고 데이터 프로세서의 onAfterUpdate 이벤트를 연결하는 데 필요합니다.

~~~js
const router = (entity, action, data, id) => {
    return new gantt.Promise((resolve, reject) => {
        // … 일부 로직
        return resolve({ tid: databaseId });
    });
};
~~~

따라서 로컬 스토리지나 특정 URL에 연결되지 않은 저장소(예: 생성과 삭제를 서로 다른 두 서버(URL)에서 처리하는 경우)에서도 DataProcessor를 사용해 데이터를 저장할 수 있습니다.


**관련 샘플**: [로컬 스토리지 사용 데이터 API 샘플](https://docs.dhtmlx.com/gantt/samples/08_api/22_data_processor.html)


### 요청과 응답 세부 정보 {#requestresponsedetails}

URL은 다음 규칙으로 형성됩니다:

- api/link/id
- api/task/id
- api/resource/id
- api/assignment/id

여기서 "api"는 DataProcessor 구성에서 지정한 URL입니다.

가능한 요청과 응답의 목록은 다음과 같습니다:

<table class="dp_table">
  <tr>
  <th><b>Action</b></th><th><b>HTTP Method</b></th><th><b>URL</b></th><th><b>Response</b></th>
  </tr>
  <tr>
  <td>load data</td>
  <td>GET</td>
  <td>/apiUrl</td>
  <td>[JSON format](/guides/supported-data-formats/)</td>
  </tr>
  <tr><td colspan="4" style="font-weight:bold">Tasks</td></tr>
  <tr>
  <td>add a new task</td>
  <td>POST</td>
  <td>/apiUrl/task</td>
  <td>("action":"inserted","tid":"id")</td>
  </tr>
  <tr>
  <td>update a task</td>
  <td>PUT</td>
  <td>/apiUrl/task/id</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>delete a task</td>
  <td>DELETE</td>
  <td>/apiUrl/task/id</td>
  <td>("action":"deleted")</td>
  </tr>
  <tr><td colspan="4" style="font-weight:bold">Links</td></tr>
  <tr>
  <td>add a new link</td>
  <td>POST</td>
  <td>/apiUrl/link</td>
  <td>("action":"inserted","tid":"id")</td>
  </tr>
  <tr>
  <td>update a link</td>
  <td>PUT</td>
  <td>/apiUrl/link/id</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>delete a link</td>
  <td>DELETE</td>
  <td>/apiUrl/link/id</td>
  <td>("action":"deleted")</td>
  </tr>
  <tr><td colspan="4" style="font-weight:bold">Resources</td></tr>
  <tr>
  <td>add a new resource</td>
  <td>POST</td>
  <td>/apiUrl/resource</td>
  <td>("action":"inserted","tid":"id")</td>
  </tr>
  <tr>
  <td>update a resource</td>
  <td>PUT</td>
  <td>/apiUrl/resource/id</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>delete a resource</td>
  <td>DELETE</td>
  <td>/apiUrl/resource/id</td>
  <td>("action":"deleted")</td>
  </tr>
  <tr><td colspan="4" style="font-weight:bold">Resource Assignments</td></tr>
  <tr>
  <td>add a new assignment</td>
  <td>POST</td>
  <td>/apiUrl/assignment</td>
  <td>("action":"inserted","tid":"id")</td>
  </tr>
  <tr>
  <td>update an assignment</td>
  <td>PUT</td>
  <td>/apiUrl/assignment/id</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>delete an assignment</td>
  <td>DELETE</td>
  <td>/apiUrl/assignment/id</td>
  <td>("action":"deleted")</td>
  </tr>
</table>

:::note
기본적으로 Resources와 Resource Assignments는 DataProcessor로 전송되지 않습니다. 필요하다면 이 동작을 명시적으로 활성화해야 합니다.
자세한 내용은 [여기](guides/server-side.md#resources_crud)을 참고하세요.
:::


### 요청 매개변수 {#requestparams}

생성/수정/삭제 요청에는 클라이언트 측 작업 또는 링크 객체의 모든 공개 속성이 포함됩니다:

작업(Task):

- **start_date**: 2025-04-08 00:00:00
- **duration**: 4
- **text**: Task #2.2
- **parent**: 3
- **end_date**: 2025-04-12 00:00:00

링크(Link):

- **source**: 1
- **target**: 2
- **type**: 0

참고:

- **start_date** 및 **end_date** 매개변수의 형식은 [](api/config/date_format.md) 구성에 의해 정의됩니다.
- 클라이언트 측은 작업 또는 링크 객체의 모든 공개 속성을 보냅니다. 따라서 요청에는 임의의 추가 매개변수가 포함될 수 있습니다.
- 데이터 모델을 확장하여 새로운 열/속성을 추가하더라도 백엔드로 이를 보내기 위해 추가 작업은 필요하지 않습니다.

:::note
여기서의 공개 속성은 밑줄 문자(_)이나 달러 기호($)로 시작하지 않는 속성 이름을 의미합니다. 예를 들어 **task._owner**나 **link.$state**와 같은 속성은 백엔드로 전송되지 않습니다.
:::


### REST-JSON 모드 {#restjson}

"POST", "GET", "REST" 및 "JSON" 트랜잭션 모드 외에도 Gantt DataProcessor는 "REST-JSON" 모드에서도 사용할 수 있습니다.

~~~js
gantt.load("apiUrl");

const dp = gantt.createDataProcessor({
    url: "/apiUrl",
    mode: "REST-JSON"
});
~~~

이는 요청에 사용되는 동일한 [URL](#requestresponsedetails)을 사용하지만, 작업 및 링크에 대한 [요청 매개변수](#requestparams)와 이를 서버로 전송하는 형식은 다릅니다.

REST 모드에서는 데이터가 폼으로 전송됩니다:

~~~jsx
Content-Type: application/x-www-form-urlencoded
~~~

반면 REST-JSON 모드에서는 데이터가 JSON 형식으로 전송됩니다:

~~~jsx title="Headers"
Content-type: application/json
~~~

따라서 매개변수는 JSON 객체로 전송됩니다:

요청 페이로드

- 작업(Task)

~~~jsx
{
    "start_date": "20-09-2025 00:00",
    "text": "새로운 작업",
    "duration": 1,
    "end_date": "21-09-2025 00:00",
    "parent": 0,
    "usage": [
        { "id": "1", "value": "30" },
        { "id": "2", "value": "20" }
    ]
}
~~~

- 링크(Link)

~~~jsx
{
    "source": 1,
    "target": 2,
    "type": "0"
}
~~~

이 형식은 서버 측 플랫폼에서 복잡한 레코드를 처리하는 데 더 편리합니다.


### 서버 측 {#loadserverside}

Gantt에서 작업(추가, 업데이트 또는 삭제)마다 dataProcessor는 서버로 AJAX 요청을 보내 반응합니다.

각 요청은 데이터베이스에 변경 사항을 저장하는 데 필요한 모든 데이터를 포함합니다.
REST 모드로 DataProcessor를 초기화했으므로 작업 유형마다 서로 다른 HTTP 동사를 사용합니다.

REST API를 사용하므로, 백엔드 측은 다양한 프레임워크와 프로그래밍 언어로 구현할 수 있습니다.
다음은 Gantt 백엔드 통합에 사용할 수 있는 서버 측 구현 목록입니다:

- [ASP.NET Core 2와 함께하는 dhtmlxGantt](integrations/dotnet/howtostart-dotnet-core.md)
- [PHP: Slim과 함께하는 dhtmlxGantt](integrations/php/howtostart-php-slim4.md)
- [PHP: Laravel과 함께하는 dhtmlxGantt](integrations/php/howtostart-php-laravel.md)
- [Node.js와 함께하는 dhtmlxGantt](integrations/node/howtostart-nodejs.md)
- [ASP.NET MVC와 함께하는 dhtmlxGantt](integrations/dotnet/howtostart-dotnet.md)
- [Ruby on Rails와 함께하는 dhtmlxGantt](integrations/other/howtostart-ruby.md)


### 작업 순서 저장 {#storingtheorderoftasks}

Gantt는 데이터 소스에서 오는 순서대로 작업을 표시합니다. 사용자가 [작업 재정렬을 수동으로 수행하도록 허용하는 경우](guides/reordering-tasks.md#drag-n-drop-within-the-whole-gantt-structure),
데이터 피드에서도 이 순서가 적절하게 정렬되어 반환되도록 데이터베이스에 저장해야 합니다.

클라이언트 측 구성:

~~~js
// 전체 간트 내에서 작업 재정렬
gantt.config.order_branch = true;
gantt.config.order_branch_free = true;
 
gantt.init("gantt_here");
gantt.load("/api");

const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST"
});
~~~

저장 순서는 여러 가지 방식으로 구현할 수 있으며, 그 중 하나를 예시로 보여드립니다.

- 작업 테이블에 숫자 열을 추가하고 이를 'sortorder'라고 부릅니다.
- GET 동작을 서비스할 때 이 열로 오름차순 정렬합니다.
- 새 작업이 추가될 때는 sortorder를 `MAX(sortorder) + 1`로 설정합니다.
- 클라이언트에서 순서를 변경하면, gantt는 UPDATE를 전송하며(REST 모드를 사용하지 않는 경우는 POST), 작업의 모든 속성과 프로젝트 트리 내 위치를 나타내는 값을 함께 전송합니다.

<table class="dp_table">
  <tr>
  <th><b>HTTP Method</b></th><th><b>URL</b></th><th><b>Parameters</b></th><th><b>Response</b></th>
  </tr>
  <tr>
  <td>PUT</td>
  <td>/apiUrl/task/taskId</td>
  <td><b>target=</b>adjacentTaskId</td>
  <td>("action":"updated")</td>
  </tr>
</table>

<b>target</b> 매개변수에는 현재 작업 앞뒤로 가장 가까운 작업의 id가 포함됩니다.

그 값은 두 가지 형식 중 하나일 수 있습니다:

 - *target="targetId"*  - 현재 작업은 targetId 작업보다 바로 앞에 위치해야 합니다
 - *target="next:targetId"* - 현재 작업은 targetId 작업보다 바로 뒤에 위치해야 합니다

정렬 변경의 적용은 일반적으로 여러 작업의 업데이트를 수반합니다. 아래는 이를 구현하는 의사 코드 예시입니다:

~~~js
const target = request["target"];
const currentTaskId = request["id"];
let nextTask;
let targetTaskId;

// 인접한 작업의 id를 가져와 업데이트된 작업이 앞에 와야 하는지 뒤에 와야 하는지 확인
if (target.startsWith("next:")) {
  targetTaskId = target.substr("next:".length);
  nextTask = true;
} else {
  targetTaskId = target;
  nextTask = false;
}

const currentTask = tasks.getById(currentTaskId);
const targetTask = tasks.getById(targetTaskId);

if (!targetTaskId) return;

// 업데이트될 작업은 인접 작업의 sortorder 값을 받습니다
let targetOrder = targetTask.sortorder;

// 만약 인접 작업 뒤에 와야 한다면 더 큰 sortorder를 받게 됩니다
if (nextTask) targetOrder++;

// 업데이트된 작업보다 뒤에 오는 작업들의 sortorder를 증가시킵니다
tasks.where(task => task.sortorder >= targetOrder)
    .update(task => task.sortorder++);

// 그리고 작업의 새로운 sortorder를 업데이트합니다
currentTask.sortorder = targetOrder;

tasks.save(currentTask);
~~~


특정 서버 측 플랫폼에 대해 작업 순서를 저장하는 방법의 자세한 예시는 아래에서 확인할 수 있습니다:
[plain PHP](integrations/php/howtostart-php.md#storingtheorderoftasks), [Laravel](integrations/php/howtostart-php-laravel.md#storingtheorderoftasks),
[Node.js](integrations/node/howtostart-nodejs.md#storingtheorderoftasks), [ASP.NET Web API](integrations/dotnet/howtostart-dotnet.md#storingtheorderoftasks) 및 
[Rails](integrations/other/howtostart-ruby.md#storingtheorderoftasks).


## 커스텀 요청 헤더 및 매개변수 

### 커스텀 요청 헤더 추가

백엔드로 추가 헤더를 보낼 수 있습니다. 예를 들어 요청에 권한 토큰을 추가해야 한다고 가정해 봅시다:

~~~js
gantt.init("gantt_here");
gantt.load("/api");
 
const dp = gantt.createDataProcessor({
    url: "/api",
    mode:"REST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
    }
});
~~~

현재 [](api/method/load.md)는 헤더/페이로드 매개변수를 지원하지 않으므로 GET 요청에 필요한 경우 수동으로 xhr을 보내고 [](api/method/parse.md)를 사용해 gantt에 데이터를 로드해야 합니다. 예:

~~~js
gantt.ajax.get({
    url: "/api",
    headers: {
        "Authorization": "Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
    }
}).then(xhr => {
    gantt.parse(xhr.responseText);
});
~~~


### 요청에 커스텀 매개변수 추가

요청에 추가 매개변수를 전송하는 방법은 여러 가지가 있습니다.

알다시피, gantt는 데이터 객체의 모든 속성을 백엔드로 보냅니다. 따라서 데이터 객체에 추가 속성을 직접 추가하면 백엔드로 전송됩니다:

~~~js
gantt.attachEvent("onTaskCreated", (task) => {
    task.userId = currentUser;
    return true;
});
~~~

또 다른 방법으로는 DataProcessor가 보내는 모든 요청에 대해 **payload** 속성을 사용해 커스텀 매개변수를 추가하는 것입니다:

~~~js
gantt.init("gantt_here");
gantt.load("/api");

const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST",
    payload: {
        token: "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
    }
});
~~~

요청에 커스텀 매개변수를 추가하는 또 하나의 방법은 DataProcessor의 [onBeforeUpdate](api/other/dataprocessor.md) 이벤트를 사용하는 것입니다:

~~~js
const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST",
});

dp.attachEvent("onBeforeUpdate", (id, state, data) => {
    data.projectId = "1";
    return true;
});
~~~


## 스크립트에서 데이터 저장 트리거

DataProcessor가 초기화되어 있다면 사용자가 수행한 변경이나 프로그래밍 방식의 변경은 자동으로 데이터 소스에 저장됩니다.

일반적으로 특정 작업이나 의존성을 프로그래밍 방식으로 업데이트하려면 각각 [](api/method/updatetask.md) 및 [](api/method/updatelink.md) 메서드를 사용합니다:

~~~js
gantt.parse([
    { id: 1, text: "Task 1", start_date: "2025-05-13 06:00", duration: 2 },
    { id: 2, text: "Task 2", start_date: "2025-05-19 08:00", duration: 3 }
]);

const task = gantt.getTask(1);
task.text = "Task 37"; // 작업 데이터 수정
gantt.updateTask(1); // 수정된 작업 렌더링
~~~

백엔드로 업데이트를 트리거하는 다른 메서드들:

- [addTask](api/method/addtask.md)
- [updateTask](api/method/updatetask.md)
- [deleteTask](api/method/deletetask.md)
- [addLink](api/method/addlink.md)
- [updateLink](api/method/updatelink.md)
- [deleteLink](api/method/deletelink.md)


## 커스텀 라우팅 {#customrouting}

RESTful AJAX API가 백엔드에서 필요하지 않거나 서버로 전송되는 내용을 직접 제어하고 싶다면 커스텀 라우팅을 사용할 수 있습니다.

예를 들어 Angular, React 등에서 페이지의 컴포넌트가 변경 내용을 직접 서버로 보내지 않고 데이터를 저장하는 다른 컴포넌트로 전달하는 경우가 있을 때 유용합니다.

DataProcessor에 맞춤 라우팅 옵션을 제공하려면 [**createDataProcessor()**](#createdp) 메서드를 사용합니다:

~~~js
gantt.createDataProcessor(function(entity, action, data, id) {
    const services = {
        "task": this.taskService,
        "link": this.linkService
    };
    const service = services[entity];

    switch (action) {
        case "update":
            return service.update(data);
        case "create":
            return service.insert(data);
        case "delete":
            return service.remove(id);
    }
});
~~~


**관련 샘플**: [로컬 스토리지 사용 데이터 API 샘플](https://docs.dhtmlx.com/gantt/samples/08_api/22_data_processor.html)


### AJAX를 사용한 커스텀 루트 설정

[Gantt AJAX 모듈](api/other/ajax.md)은 커스텀 루트를 설정하는 데 유용합니다. Gantt는 작업의 끝을 확인할 수 있도록 Promise 객체를 반환하는 결과를 기대하는 커스텀 라우터를 필요로 합니다.  
AJAX 모듈은 프로미스를 지원하며 커스텀 라우터 내부에서 사용하기에 적합합니다. 프로미스를 받고 해결될 때 프로미스의 내용을 처리합니다.

아래 예시에서는 새 작업이 생성됩니다. 서버 응답에 새로 생성된 작업의 id가 포함되어 있으면 Gantt가 이를 적용할 수 있습니다.

~~~js
gantt.createDataProcessor((entity, action, data, id) => {
    ...
    switch (action) {
        case "create":
            return gantt.ajax.post({
                headers: {
                    "Content-Type": "application/json"
                },
                url: `${server}/task`,
                data: JSON.stringify(data)
            });
    }
});
~~~


## 리소스 및 리소스 할당의 CRUD 작업 라우팅 {#resources_crud}

v8.0부터 수정된 리소스 할당은 지속 가능한 ID를 가진 별도 엔트리로 DataProcessor에 전송될 수 있어 백엔드 API와의 연결이 쉬워졌습니다. 리소스 객체의 변경도 DataProcessor로 전송될 수 있습니다.

참고로 이 기능은 기본적으로 비활성화되어 있습니다. 기본적으로 DataProcessor는 작업과 링크에 대한 변경만 받습니다. 이 기능을 활성화하려면 다음 설정을 사용하세요:

~~~js
gantt.config.resources = {
    dataprocessor_assignments: true,
    dataprocessor_resources: true,
};
~~~

리소스 모드가 활성화되면 REST 모드로 DataProcessor를 구성한 경우 리소스와 리소스 할당이 백엔드로 별도의 요청으로 전송됩니다.

Custom Routing 모드에서 DataProcessor를 사용하는 경우 핸들러에서 리소스 할당과 리소스의 변경을 포착할 수 있습니다:

~~~js
gantt.createDataProcessor({
    task: {
        create: (data) => {
            return createRecord({type: "task", ...data}).then((res) => {
                return { tid: res.id, ...res };
            });
        },
        update: (data, id) => {
            return updateRecord({type: "task", ...data}).then(() => ({}));
        },
        delete: (id) => {
            return deleteRecord({type: "task:", id: id}).then(() => ({}));
        }
    },
    link: {
        create: (data) => {
            ...
        },
        update: (data, id) => {
            ...
        },
        delete: (id) => {
            ...
        }
    },
    assignment: {
        create: (data) => {
            ...
        },
        update: (data, id) => {
            ...
        },
        delete: (id) => {
            ...
        }
    },
    resource: {
        create: (data) => {
            ...
        },
        update: (data, id) => {
            ...
        },
        delete: (id) => {
            ...
        }
    }
});
~~~

또는 함수 선언을 사용하는 경우:

~~~js
gantt.createDataProcessor((entity, action, data, id) => {
    switch (entity) {
        case "task":
            break;
        case "link":
            break;
        case "resource":
            break;
        case "assignment":
            break;
    }
});
~~~


## 오류 처리

서버가 작업 실패를 알리는 응답으로 "action":"error"를 반환할 수 있습니다:

~~~js
{"action":"error"}
~~~

이러한 응답은 클라이언트에서 gantt.dataProcessor를 통해 캡처할 수 있습니다:

~~~js
const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST"
});

dp.attachEvent("onAfterUpdate", (id, action, tid, response) => {
    if (action === "error") {
        // 여기서 무언가를 수행합니다
    }
});
~~~

응답 객체는 추가 속성을 임의로 포함할 수 있으며, onAfterUpdate 핸들러의 `response` 인자를 통해 접근할 수 있습니다.

:::note
이 이벤트는 JSON 응답으로 위와 같이 반환되는 관리되는 오류에 대해서만 호출됩니다.
HTTP 오류를 처리해야 하는 경우 API 이벤트를 확인해 주세요: [](api/event/onajaxerror.md)
:::

서버가 특정 작업에서 오류를 응답했지만 클라이언트의 변경 내용은 저장되었을 경우, 상태를 동기화하는 가장 좋은 방법은 클라이언트의 상태를 지우고 서버 측에서 올바른 데이터를 다시 로드하는 것입니다:

~~~js
dp.attachEvent("onAfterUpdate", (id, action, tid, response) => {
    if (action === "error") {
        gantt.clearAll();
        gantt.load("url1");
    }
});
~~~

클라이언트-서버 측을 동기화하되 서버 호출을 전혀 하지 않으려면 [silent()](api/method/silent.md) 메서드를 사용할 수 있습니다. 이 메서드는 내부 이벤트나 서버 호출을 트리거하지 않도록 코드 전체를 감쌉니다:

~~~js
gantt.silent(() => {
    gantt.deleteTask(item.id);
});

gantt.render();
~~~


## 캐스케이드 삭제

기본적으로 작업 삭제 시 해당 작업의 중첩 작업과 관련 링크의 연쇄 삭제가 발생합니다. 간트는 제거된 각 작업과 링크에 대해 삭제 요청을 보냅니다.
따라서 백엔드에서 데이터 무결성을 유지할 필요가 없으며, 간트가 이를 합리적으로 처리합니다.

반면 이 전략은 AJAX 호출을 백엔드 API로 대량으로 생성할 수 있으므로, dhtmlxGantt는 AJAX용 배치 요청을 지원하지 않으며 작업과 링크의 수는 제한되지 않습니다.

이 경우 캐스케이드 삭제를 [](api/config/cascade_delete.md) 구성으로 비활성화할 수 있습니다. 따라서 프로젝트 브랜치가 삭제될 때 최상위 항목에 대한 삭제 요청만 전송되며 백엔드가 관련 링크와 하위 작업을 삭제하도록 기대합니다.


## XSS, CSRF 및 SQL Injection 공격

Gantt가 SQL 인젝션이나 XSS, CSRF 공격과 같은 다양한 위협으로부터 애플리케이션을 방지하는 수단을 제공하지 않는다는 점에 유의하십시오. 애플리케이션의 안전성 유지 책임은 백엔드를 구현하는 개발자에게 있습니다.

구성 요소의 취약한 지점과 애플리케이션 보안을 강화하기 위한 조치를 알아보려면 [ guides/app-security.md ](guides/app-security.md) 문서를 참조하세요.