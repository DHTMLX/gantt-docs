---
title: "Server-Side Integration"
sidebar_label: "Server-Side Integration"
---

# Server-Side Integration

dhtmlxGantt를 백엔드와 연결하는 가장 좋은 방법은 서버에 RESTful API를 설정하고 클라이언트 측에서 [dataprocessor](api/other/dataprocessor.md) 모듈을 사용하는 것입니다.

DataProcessor는 Gantt 데이터의 변경 사항을 추적하고 필요한 형식으로 REST API에 업데이트를 전송하는 내장 기능입니다. 이를 통해 [서버 사이드 플랫폼과의 통합](integrations/howtostart-guides.md)이 간편해집니다. 객체 데이터 소스를 사용할 때, DataProcessor를 설정하여 데이터 변경에 대한 콜백을 제공할 수 있으며, 이는 데이터 바인딩에 유용합니다.

Node.js를 예시로 Gantt 차트를 생성하고 데이터를 로드하는 방법을 보여주는 동영상 튜토리얼도 준비되어 있습니다.

<iframe width="704" height="400" src="https://www.youtube.com/embed/D8YzyzBfyP8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Technique {#technique}

일반적으로 REST API를 사용하여 서버에서 데이터를 로드하려면 다음과 같은 절차가 필요합니다:

### 클라이언트 사이드

1) [[load](api/method/load.md)](api/method/load.md) 메서드를 사용하여 Gantt 데이터를 로드하세요. 이때 [JSON](guides/supported-data-formats.md#json) 형식의 데이터를 반환하는 URL을 제공해야 합니다.

2) DataProcessor 인스턴스를 생성하는 방법은 두 가지가 있습니다:

- DataProcessor를 초기화하고 dhtmlxGantt 객체에 연결하기:

~~~js
gantt.init("gantt_here");
gantt.load("apiUrl");

// 아래 코드의 순서를 유지하세요
const dp = new gantt.dataProcessor("apiUrl");
dp.init(gantt);
dp.setTransactionMode("REST");
dp.deleteAfterConfirmation = true;
~~~

:::note
두 번째 방법을 사용하는 것이 권장됩니다.
:::

- 설정 옵션 객체를 전달하여 [[createDataProcessor](api/method/createdataprocessor.md)](api/method/createdataprocessor.md) 메서드를 사용하는 방법:

~~~js
const dp = gantt.createDataProcessor({
    url: "apiUrl",
    mode: "REST",
    deleteAfterConfirmation: true
});
~~~

자세한 내용은 아래 섹션에서 확인할 수 있습니다.



### DataProcessor 생성하기 {#createdp}

API 메서드 [[createDataProcessor](api/method/createdataprocessor.md)](api/method/createdataprocessor.md)를 통해 DataProcessor를 생성할 때 여러 방식으로 파라미터를 전달할 수 있습니다.

1. 미리 정의된 요청 모드 중 하나를 사용하는 방법:

~~~js
const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST",
    deleteAfterConfirmation: true
});
~~~

설명:

- **url** - 서버 측 엔드포인트
- **mode** - 서버로 데이터를 전송하는 방식:  "GET" | "POST" | "REST" | "JSON" | "REST-JSON"
- **deleteAfterConfirmation** - 서버에서 삭제가 확인된 후에만 gantt에서 작업이 제거될지 여부를 결정합니다. 부모 작업 삭제가 확정되면 종속 링크와 하위 작업도 함께 삭제됩니다.

2. 커스텀 **router** 객체를 제공하는 방법:

~~~js
const dp = gantt.createDataProcessor(router);
~~~

- **router**는 함수일 수 있습니다:

~~~js
// entity - "task"|"link"|"resource"|"assignment"
// action - "create"|"update"|"delete"
// data - 작업 또는 링크 데이터 객체
// id – 처리 중인 객체(작업 또는 링크)의 id
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

- 또는 다음과 같은 구조의 객체일 수 있습니다:

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

**router** 객체 내의 모든 함수는 Promise 또는 데이터 응답 객체를 반환해야 합니다. 이를 통해 dataProcessor가 데이터베이스 id를 적용하고 **onAfterUpdate** 이벤트를 트리거할 수 있습니다.

~~~js
const router = (entity, action, data, id) => {
    return new gantt.Promise((resolve, reject) => {
        // … 일부 로직
        return resolve({ tid: databaseId });
    });
};
~~~

이와 같은 유연성을 통해 DataProcessor를 localStorage 또는 특정 URL에 연결되지 않은 저장소, 혹은 생성 및 삭제가 서로 다른 서버에서 처리되는 경우에도 사용할 수 있습니다.


[Custom data api - using local storage](https://docs.dhtmlx.com/gantt/samples/08_api/22_data_processor.html)




### 요청 및 응답 세부 정보 {#requestresponsedetails}

URL 패턴은 다음과 같습니다:

- api/link/id
- api/task/id
- api/resource/id
- api/assignment/id

여기서 "api"는 dataProcessor 설정에 지정된 URL입니다.

다음은 가능한 요청 및 응답 목록입니다:

<table class="dp_table">
    <tr>
        <th><b>동작</b></th><th><b>HTTP 메서드</b></th><th><b>URL</b></th><th><b>응답</b></th>
    </tr>
    <tr>
        <td>데이터 로드</td>
        <td>GET</td>
        <td>/apiUrl</td>
        <td>[JSON format](guides/supported-data-formats.md#json)</td>
    </tr>
    <tr><td colspan="4" style="font-weight:bold">작업 (Tasks)</td></tr>
    <tr>
        <td>새 작업 추가</td>
        <td>POST</td>
        <td>/apiUrl/task</td>
        <td>("action":"inserted","tid":"id")</td>
    </tr>
    <tr>
        <td>작업 수정</td>
        <td>PUT</td>
        <td>/apiUrl/task/id</td>
        <td>("action":"updated")</td>
    </tr>
    <tr>
        <td>작업 삭제</td>
        <td>DELETE</td>
        <td>/apiUrl/task/id</td>
        <td>("action":"deleted")</td>
    </tr>
    <tr><td colspan="4" style="font-weight:bold">링크 (Links)</td></tr>
    <tr>
        <td>새 링크 추가</td>
        <td>POST</td>
        <td>/apiUrl/link</td>
        <td>("action":"inserted","tid":"id")</td>
    </tr>
    <tr>
        <td>링크 수정</td>
        <td>PUT</td>
        <td>/apiUrl/link/id</td>
        <td>("action":"updated")</td>
    </tr>
    <tr>
        <td>링크 삭제</td>
        <td>DELETE</td>
        <td>/apiUrl/link/id</td>
        <td>("action":"deleted")</td>
    </tr>
    <tr><td colspan="4" style="font-weight:bold">리소스 (Resources)</td></tr>
    <tr>
        <td>새 리소스 추가</td>
        <td>POST</td>
        <td>/apiUrl/resource</td>
        <td>("action":"inserted","tid":"id")</td>
    </tr>
    <tr>
        <td>리소스 수정</td>
        <td>PUT</td>
        <td>/apiUrl/resource/id</td>
        <td>("action":"updated")</td>
    </tr>
    <tr>
        <td>리소스 삭제</td>
        <td>DELETE</td>
        <td>/apiUrl/resource/id</td>
        <td>("action":"deleted")</td>
    </tr>
    <tr><td colspan="4" style="font-weight:bold">리소스 할당 (Resource Assignments)</td></tr>
    <tr>
        <td>새 할당 추가</td>
        <td>POST</td>
        <td>/apiUrl/assignment</td>
        <td>("action":"inserted","tid":"id")</td>
    </tr>
    <tr>
        <td>할당 수정</td>
        <td>PUT</td>
        <td>/apiUrl/assignment/id</td>
        <td>("action":"updated")</td>
    </tr>
    <tr>
        <td>할당 삭제</td>
        <td>DELETE</td>
        <td>/apiUrl/assignment/id</td>
        <td>("action":"deleted")</td>
    </tr>
</table>

:::note
기본적으로 리소스와 리소스 할당은 DataProcessor 요청에 포함되지 않습니다. 이를 포함하려면 명시적으로 활성화해야 합니다.
자세한 내용은 [여기](guides/server-side.md#resources_crud)에서 확인하세요.
:::



### 요청 파라미터 {#requestparams}

생성(Create), 수정(Update), 삭제(Delete) 요청에는 클라이언트 측 작업 또는 링크 객체의 모든 public 속성이 포함됩니다:

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

- **start_date** 및 **end_date**의 형식은 [[date_format](api/config/date_format.md)](api/config/date_format.md) 설정에 의해 결정됩니다.
- 클라이언트는 작업 또는 링크의 모든 public 속성을 전송하므로, 요청에 추가 파라미터가 포함될 수 있습니다.
- 데이터 모델에 새로운 컬럼이나 속성을 추가하면 gantt가 이를 자동으로 백엔드로 전송합니다.

:::note
public 속성은 이름이 언더스코어(**_**)나 달러 기호(**$**)로 시작하지 않는 속성을 의미합니다.
따라서 **task._owner**나 **link.$state**와 같은 속성은 백엔드로 전송되지 않습니다.
:::



### REST-JSON 모드 {#restjson}

"POST", "GET", "REST", "JSON" 모드 외에도 Gantt DataProcessor는 "REST-JSON" 모드를 지원합니다.

~~~js
gantt.load("apiUrl");

const dp = gantt.createDataProcessor({
    url: "/apiUrl",
    mode: "REST-JSON"
});
~~~

[요청 URL](#requestresponsedetails)은 동일하지만, 파라미터 전송 방식이 다릅니다.

REST 모드에서는 데이터가 폼 데이터로 전송됩니다:

~~~
Content-Type: application/x-www-form-urlencoded
~~~

REST-JSON 모드에서는 데이터가 JSON으로 전송됩니다:

**Headers**
~~~
Content-type: application/json
~~~

파라미터는 JSON 객체로 전송됩니다:

**요청 페이로드 예시**

- 작업(Task)

~~~
{
    "start_date": "20-09-2025 00:00",
    "text": "New task",
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

~~~js
{
    "source": 1,
    "target": 2,
    "type": "0"
}
~~~

이 형식은 서버 측에서 복잡한 레코드를 더 쉽게 처리할 수 있도록 도와줍니다.



### 서버 사이드 {#loadserverside}

Gantt에서 작업 또는 링크의 추가, 수정, 삭제와 같은 변경이 발생할 때마다 dataProcessor는 서버로 AJAX 요청을 보냅니다.

각 요청에는 데이터베이스를 갱신하는 데 필요한 모든 데이터가 포함됩니다.
dataProcessor가 REST 모드로 설정되어 있으면, 작업에 따라 서로 다른 HTTP 메서드를 사용합니다.

REST API를 사용하면 다양한 프레임워크와 언어로 서버 사이드를 구현할 수 있습니다.
Gantt 백엔드 통합을 위해 준비된 서버 사이드 구현 예시는 다음과 같습니다:

- [dhtmlxGantt와 ASP.NET Core 2](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt와 PHP: Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt와 PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt와 Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt와 ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt와 Ruby on Rails](integrations/other/howtostart-ruby.md)



## 작업 순서 저장하기 {#storingtheorderoftasks}

Gantt는 데이터 소스에서 전달받은 순서대로 작업을 표시합니다. 사용자가 [작업을 수동으로 재정렬](guides/reordering-tasks.md#draganddropacrosstheentireganttstructure)할 수 있다면,
이 순서를 데이터베이스에 저장하고, 데이터 피드가 해당 순서로 정렬된 작업을 반환하도록 해야 합니다.

클라이언트 측 설정 예시:

~~~js
// 전체 gantt에서 작업 재정렬 허용
gantt.config.order_branch = true;
gantt.config.order_branch_free = true;
 
gantt.init("gantt_here");
gantt.load("/api");

const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST"
});
~~~

작업 순서를 저장하는 방법은 여러 가지가 있지만, 다음은 한 가지 예시입니다.

- 작업 테이블에 'sortorder'와 같은 숫자 컬럼을 추가합니다.
- GET 요청을 처리할 때, 이 컬럼을 기준으로 오름차순 정렬하여 작업을 반환합니다.
- 새 작업을 추가할 때는 `MAX(sortorder) + 1` 값을 할당합니다.
- 클라이언트 측에서 순서가 변경되면, gantt는 작업의 모든 속성과 함께 프로젝트 트리 내에서 작업의 위치를 설명하는 값을 포함하여 PUT(REST 모드가 아닐 경우 POST) 요청을 보냅니다.

<table class="dp_table">
    <tr>
        <th><b>HTTP 메서드</b></th><th><b>URL</b></th><th><b>파라미터</b></th><th><b>응답</b></th>
    </tr>
    <tr>
        <td>PUT</td>
        <td>/apiUrl/task/taskId</td>
        <td><b>target=</b>adjacentTaskId</td>
        <td>("action":"updated")</td>
    </tr>
</table>

<b>target</b> 파라미터는 현재 작업 바로 앞 또는 뒤에 위치한 인접 작업의 id를 담고 있습니다.

값은 두 가지 형식이 될 수 있습니다:

 - *target="targetId*"  - 현재 작업을 targetId 작업 바로 <b>앞</b>에 배치
 - *target="next:targetId*" - 현재 작업을 targetId 작업 바로 <b>뒤</b>에 배치

순서 변경을 적용하려면 여러 작업을 업데이트해야 할 수 있습니다. 다음은 의사 코드 예시입니다:

~~~js
const target = request["target"];
const currentTaskId = request["id"];
let nextTask;
let targetTaskId;

// 업데이트된 작업이 인접 작업의 앞/뒤 어디에 배치되는지 결정
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

// 인접 작업의 sortorder를 업데이트된 작업에 할당
let targetOrder = targetTask.sortorder;

// 인접 작업 뒤에 배치할 경우 sortorder 증가
if (nextTask) targetOrder++;

// 업데이트된 작업 뒤에 오는 작업들의 sortorder 증가
tasks.where(task => task.sortorder >= targetOrder)
    .update(task => task.sortorder++);

// 작업에 새로운 sortorder 적용
currentTask.sortorder = targetOrder;

tasks.save(currentTask);
~~~

특정 서버 플랫폼에서 작업 순서 저장에 대한 자세한 예시는 [plain PHP](integrations/php/howtostart-php.md#storingtheorderoftasks), [Laravel](integrations/php/howtostart-php-laravel.md#storingtheorderoftasks),
[Node.js](integrations/node/howtostart-nodejs.md#storingtheorderoftasks), [ASP.NET Web API](integrations/dotnet/howtostart-dotnet.md#storingtheorderoftasks), [Rails](integrations/other/howtostart-ruby.md#storingtheorderoftasks)에서 확인할 수 있습니다.



## 커스텀 요청 헤더 및 파라미터 {#customrequestheadersandparameters}

### 커스텀 요청 헤더 추가하기

백엔드로 전송되는 요청에 추가 헤더를 포함할 수 있습니다. 예를 들어, 요청에 인증 토큰을 추가하고자 할 수 있습니다:

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

현재 [load](api/method/load.md)는 GET 요청에 대해 header나 payload 파라미터를 지원하지 않습니다. 만약 이를 포함해야 한다면, xhr을 수동으로 전송한 후 [parse](api/method/parse.md)를 사용해 데이터를 gantt에 로드해야 합니다. 예시는 다음과 같습니다:

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



### 요청에 커스텀 파라미터 추가하기

요청에 추가 파라미터를 포함하는 방법에는 여러 가지가 있습니다.

gantt는 데이터 객체의 모든 속성을 백엔드로 다시 전송하므로, 데이터 객체에 속성을 직접 추가하면 해당 속성이 요청에 포함됩니다:

~~~js
gantt.attachEvent("onTaskCreated", (task) => {
    task.userId = currentUser;
    return true;
});
~~~

또 다른 방법은 **payload** 속성을 사용해 데이터 프로세서가 보내는 모든 요청에 커스텀 파라미터를 추가하는 것입니다:

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

또한 DataProcessor의 [onBeforeUpdate](api/other/dataprocessor.md#onbeforeupdate) 이벤트를 이용해 요청에 커스텀 파라미터를 추가할 수도 있습니다:

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



## 스크립트에서 데이터 저장 트리거하기 {#triggeringdatasavingfromscript}

dataProcessor가 초기화되면, 사용자 또는 코드로 변경된 데이터가 자동으로 데이터 소스에 저장됩니다.

특정 작업(task)이나 의존성(link)을 코드로 업데이트하려면 [updateTask](api/method/updatetask.md) 및 [updateLink](api/method/updatelink.md) 메서드를 사용합니다:

~~~js
gantt.parse([
    { id: 1, text: "Task 1", start_date: "2025-05-13 06:00", duration: 2 },
    { id: 2, text: "Task 2", start_date: "2025-05-19 08:00", duration: 3 }
]);

const task = gantt.getTask(1);
task.text = "Task 37"; // 작업 데이터 수정
gantt.updateTask(1); // 수정된 작업을 다시 렌더링
~~~

백엔드에 업데이트를 전송하는 다른 메서드로는 다음이 있습니다:

- [addTask](api/method/addtask.md)
- [updateTask](api/method/updatetask.md)
- [deleteTask](api/method/deletetask.md)
- [addLink](api/method/addlink.md)
- [updateLink](api/method/updatelink.md)
- [deleteLink](api/method/deletelink.md)



## 커스텀 라우팅 {#customrouting}

RESTful AJAX API가 백엔드 요구사항에 맞지 않거나, 서버로 전송되는 내용을 직접 제어하고 싶을 때 커스텀 라우팅을 사용할 수 있습니다.

예를 들어, Angular나 React 같은 프레임워크에서는 컴포넌트가 변경 사항을 서버로 직접 전송하지 않고, 데이터를 저장하는 다른 컴포넌트에 전달할 수 있습니다.

DataProcessor에서 커스텀 라우팅을 설정하려면 [**createDataProcessor()**](#createdp) 메서드를 사용하세요:

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


[Custom data api - using local storage](https://docs.dhtmlx.com/gantt/samples/08_api/22_data_processor.html)




### 커스텀 라우터 설정을 위한 AJAX 사용

[Gantt AJAX 모듈](api/other/ajax.md)은 커스텀 라우트 설정 시 유용하게 사용할 수 있습니다. Gantt는 커스텀 라우터가 작업에서 Promise 객체를 반환하기를 기대하며, 이를 통해 작업이 완료되었는지 감지할 수 있습니다.  
AJAX 모듈은 Promise를 지원하므로 커스텀 라우터 내에서 사용하기 적합합니다. Gantt는 Promise가 해결되면 그 내용을 처리합니다.

아래 예제에서는 새로운 작업이 생성됩니다. 서버 응답에 새로 생성된 작업의 id가 포함되어 있으면, Gantt가 이를 적용합니다.

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



<span id="resources_crud"></span>

## 리소스 및 리소스 할당의 CRUD 액션 라우팅 {#resources_crud}

v8.0부터 리소스 할당 변경 사항을 영구 ID와 함께 별도의 항목으로 DataProcessor에 전송할 수 있어, 백엔드 API 통합이 더 간단해졌습니다. 리소스 객체 자체의 변경도 DataProcessor에 전송할 수 있습니다.

이 기능은 기본적으로 비활성화되어 있습니다. 기본 설정에서는 DataProcessor가 작업(task)과 링크(link)의 변경만 수신합니다. 리소스 처리를 활성화하려면 다음과 같이 설정하세요:

~~~js
gantt.config.resources = {
    dataprocessor_assignments: true,
    dataprocessor_resources: true,
};
~~~

리소스 모드가 활성화되고 DataProcessor가 REST 모드일 때, 리소스 및 리소스 할당이 별도의 요청으로 백엔드에 전송됩니다.

DataProcessor가 커스텀 라우팅 모드를 사용한다면, 핸들러에서 리소스 할당과 리소스 변경을 처리할 수 있습니다:

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

또는 함수 선언을 사용할 수도 있습니다:

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



## 에러 처리 {#errorhandling}

서버가 작업 실패를 보고하면, `"action":"error"`가 포함된 응답을 반환할 수 있습니다:

~~~js
{"action":"error"}
~~~

클라이언트에서는 gantt.dataProcessor를 사용해 이런 응답을 감지할 수 있습니다:

~~~js
const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST"
});

dp.attachEvent("onAfterUpdate", (id, action, tid, response) => {
    if (action === "error") {
        // 여기서 에러 처리
    }
});
~~~

응답 객체에는 onAfterUpdate 핸들러의 `response` 인자를 통해 접근 가능한 추가 속성이 포함될 수 있습니다.

:::note
이 이벤트는 위와 같이 JSON 응답으로 반환되는 관리되는 에러에만 트리거됩니다.
HTTP 에러 처리는 [onAjaxError](api/event/onajaxerror.md) API 이벤트를 참고하세요.
:::

서버에서 에러를 반환했지만 클라이언트 변경이 저장된 경우, 상태 동기화의 최선 방법은 클라이언트 상태를 초기화하고 서버에서 올바른 데이터를 다시 로드하는 것입니다:

~~~js
dp.attachEvent("onAfterUpdate", (id, action, tid, response) => {
    if (action === "error") {
        gantt.clearAll();
        gantt.load("url1");
    }
});
~~~

서버 호출 없이 클라이언트와 서버 상태를 동기화하려면 [silent()](api/method/silent.md) 메서드를 사용해 해당 작업 동안 내부 이벤트나 서버 호출을 방지할 수 있습니다:

~~~js
gantt.silent(() => {
    gantt.deleteTask(item.id);
});

gantt.render();
~~~



## 계단식 삭제(Cascade Deletion) {#cascadedeletion}

기본적으로 작업을 삭제하면 해당 하위 작업 및 관련 링크가 계단식으로 삭제됩니다. Gantt는 삭제된 각 작업과 링크에 대해 *delete* 요청을 전송합니다.  
따라서 백엔드에서 데이터 무결성을 수동으로 관리할 필요 없이, Gantt가 이를 효과적으로 처리합니다.

하지만 이 방식은 dhtmlxGantt가 배치 요청을 지원하지 않으므로, 작업 및 링크 수가 많을 경우 백엔드로 많은 AJAX 호출이 발생할 수 있습니다.

필요하다면 [cascade_delete](api/config/cascade_delete.md) 설정을 사용해 계단식 삭제를 비활성화할 수 있습니다.  
비활성화 시, 프로젝트 브랜치를 삭제하면 최상위 항목에 대해서만 delete 요청이 전송되고, 하위 링크 및 작업 삭제는 백엔드가 처리해야 합니다.



## XSS, CSRF 및 SQL 인젝션 공격 {#xsscsrfandsqlinjectionattacks}

Gantt는 SQL 인젝션, XSS, CSRF와 같은 공격에 대한 내장 보호 기능을 제공하지 않습니다.  
애플리케이션 보안은 백엔드 개발자가 책임지고 구현해야 합니다.

컴포넌트의 취약점 및 애플리케이션 보안을 강화하는 권장 조치에 대해서는 [애플리케이션 보안](guides/app-security.md) 문서를 참고하세요. 


