---
sidebar_label: createDataProcessor
title: createDataProcessor method
description: "새로운 dataProcessor 인스턴스를 생성하고 gantt 차트에 연결합니다"
---

# createDataProcessor

### Description

@short: 새로운 dataProcessor 인스턴스를 생성하고 gantt 차트에 연결합니다

@signature: createDataProcessor: (config: DataProcessorConfig | RouterFunction | RouterConfig) =\> any

### Parameters

- `config` - (required) *DataProcessorConfig | RouterFunction | RouterConfig* -         dataProcessor의 구성 객체

### Returns
- ` dataProcessor` - (object) - 생성된 dataProcessor 인스턴스

### Example

~~~jsx
var dp = gantt.createDataProcessor({
   url: "/api",
   mode: "REST",
   deleteAfterConfirmation: true
});
~~~

### Related samples
- [Custom data api - using local storage](https://docs.dhtmlx.com/gantt/samples/08_api/22_data_processor.html)

### Details

이 메서드는 다음 중 하나의 매개변수 유형을 받습니다:

- **DataProcessorConfig** - (*object*) - 사전 설정된 데이터 전송 모드 중 하나를 정의하는 객체
    - **_url_** - (*string*) - 서버 URL
    - **_mode?_** - (*string*) - 선택 사항, 데이터 전송 방식을 지정: "JSON" | "REST-JSON" | "JSON" | "POST" | "GET"
    - **_deleteAfterConfirmation?_** - (*boolean*) - 선택 사항, 서버가 삭제를 확인한 후에만 gantt에서 작업을 제거할지 여부. 종속 링크와 하위 작업은 부모 작업 삭제가 확인되면 삭제됩니다.


~~~js
var dp = gantt.createDataProcessor({
   url: "/api",
   mode: "REST",
   deleteAfterConfirmation: true
});
~~~


- **RouterFunction (entity, action, data, id): Promise | object | void** - gantt 차트의 변경 사항을 처리하는 라우터 함수
    - **_entity_** - (*string*) - 관련 엔티티 이름, 예: "task", "link", "resource", "assignment"
    - **_action_** - (*string*) - 작업 유형: "create", "update", "delete"
    - **_data_** - (*Task | Link | ResourceAssignment | CustomObject*) - 처리 중인 객체
    - **_id_** - (*string | number*) - 처리 중인 객체의 id


~~~js
// entity - "task"|"link"|"resource"|"assignment"
// action - "create"|"update"|"delete"
// data - task 또는 link 데이터 객체
// id – 처리된 객체(task 또는 link)의 id
var dp = gantt.createDataProcessor(function(entity, action, data, id) { 
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


- **RouterConfig** - (*object*) - 다양한 엔티티에 대한 라우터를 설정하는 객체
    - **_task?_** - (*RouterForEntity*) - task용 라우터
    - **_link?_** - (*RouterForEntity*) - link용 라우터
    - **_resource?_** - (*RouterForEntity*) - resource용 라우터
    - **_assignment?_** - (*RouterForEntity*) - assignment용 라우터


**RouterForEntity** 객체는 다음 메서드를 포함합니다:

- **create (data): Promise** - 항목 추가를 처리하는 함수
    - **_data_** - (*Task | Link | ResourceAssignment | CustomObject*) - 추가할 항목
- **update (data, id): Promise** - 항목 수정을 처리하는 함수
    - **_data_** - (*Task | Link | ResourceAssignment | CustomObject*) - 수정할 항목
    - **_id_** - (*string | number*) - 항목의 id
- **delete (id): Promise** - 항목 삭제를 처리하는 함수
    - **_id_** - (*string | number*) - 항목의 id


~~~js
var dp = gantt.createDataProcessor({ 
   task: {
      create: function(data) {},
      update: function(data, id) {},
      delete: function(id) {}
   },
   link: {
      create: function(data) {},
      update: function(data, id) {},
      delete: function(id) {}
   }
});
~~~

모든 라우터 함수는 Promise 또는 데이터 응답 객체를 반환해야 합니다. 이를 통해 dataProcessor는 데이터베이스 id를 업데이트하고 **onAfterUpdate** 이벤트를 트리거할 수 있습니다.

~~~js
router = function(entity, action, data, id) {
    return new gantt.Promise(function(resolve, reject) {
        // … 로직
        return resolve({tid: databaseId});
     });
}
~~~

이 방법은 DataProcessor를 사용해 특정 URL에 연결되지 않은 localStorage나 기타 저장소에 데이터를 저장하거나, 생성과 삭제를 서로 다른 서버가 처리할 때 유용합니다.


## 리소스 및 리소스 할당 저장하기

기본적으로 DataProcessor는 리소스와 리소스 할당 업데이트를 처리하지 않습니다. 
이 기능은 [별도의 구성](guides/server-side.md#resources_crud)으로 활성화할 수 있습니다.

### Related Guides
- [Server-Side Integration](guides/server-side.md)

### Change log
- **deleteAfterConfirmation** 옵션이 v8.0에 추가됨
