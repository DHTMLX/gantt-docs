---
sidebar_label: createDataProcessor
title: createDataProcessor 메서드
description: "새로운 dataProcessor 인스턴스를 생성하여 gantt에 연결합니다"
---

# createDataProcessor

### Description

@short: 새로운 dataProcessor 인스턴스를 생성하고 gantt에 연결합니다

@signature: createDataProcessor: (config: DataProcessorConfig | RouterFunction | RouterConfig) =\> any

### Parameters

- `config` - (필수) *DataProcessorConfig | RouterFunction | RouterConfig* -         dataProcessor 구성 객체

### Returns
- ` dataProcessor` - (object) - 생성된 dataProcessor 인스턴스

### 예제

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

- **DataProcessorConfig** - (*object*) - 데이터를 전송하는 미리 정의된 모드 중 하나를 지정하는 객체
    - **_url_** - (*string*) - 서버 측의 URL
    - **_mode?_** - (*string*) - 선택적이며, 서버로 데이터를 전송하는 모드: "JSON" | "REST-JSON" | "JSON" | "POST" | "GET"
    - **_deleteAfterConfirmation?_** - (*boolean*) - 선택적이며, 서버의 응답이 성공적으로 도착한 후에만 gantt에서 작업이 삭제되어야 하는지 정의합니다. 의존성 링크와 서브태스크는 상위 작업의 삭제가 확인된 후에 삭제됩니다.


~~~js
var dp = gantt.createDataProcessor({
   url: "/api",
   mode: "REST",
   deleteAfterConfirmation: true
});
~~~


- **RouterFunction (entity, action, data, id): Promise | object | void** - 변경 사항을 Gantt에서 처리하는 라우터 함수
    - **_entity_** - (*string*) - 관련 엔터티의 이름. 가능 값: "task"|"link"|"resource"|"assignment"
    - **_action_** - (*string*) - 관련 동작의 이름. 가능한 값:  "create"|"update"|"delete"
    - **_data_** - (*Task | Link | ResourceAssignment | CustomObject*) - 처리된 객체
    - **_id_** - (*string | number*) - 처리된 객체의 ID


~~~js
// 엔터티 - "task"|"link"|"resource"|"assignment"
// 동작 - "create"|"update"|"delete"
// data - task나 link 데이터가 담긴 객체
// id – 처리된 객체의 ID
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


- **RouterConfig** - (*object*) - 다양한 엔티티에 대한 라우터 구성을 정의
    - **_task?_** - (*RouterForEntity*) - 태스크에 대한 라우터 객체
    - **_link?_** - (*RouterForEntity*) - 링크에 대한 라우터 객체
    - **_resource?_** - (*RouterForEntity*) - 리소스에 대한 라우터 객체
    - **_assignment?_** - (*RouterForEntity*) - 할당에 대한 라우터 객체


RouterForEntity 객체는 다음과 같은 속성을 가집니다:

- **create (data): Promise** - 아이템 추가를 처리하는 함수
    - **_data_** - (*Task | Link | ResourceAssignment | CustomObject*) - 처리된 아이템
- **update (data, id): Promise** - 아이템 업데이트를 처리하는 함수
    - **_data_** - (*Task | Link | ResourceAssignment | CustomObject*) - 처리된 아이템
    - **_id_** - (*string | number*) - 처리된 아이템의 ID
- **delete (id): Promise** - 아이템 삭제를 처리하는 함수
    - **_id_** - (*string | number*) - 처리된 아이템의 ID


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

라우터 객체의 모든 함수는 Promise 또는 데이터 응답 객체를 반환해야 합니다. 이는 dataProcessor가 데이터베이스 ID를 적용하고 데이터 프로세서의 **onAfterUpdate** 이벤트를 연결하기 위해 필요합니다.

~~~js
router = function(entity, action, data, id) {
    return new gantt.Promise(function(resolve, reject) {
        // … 일부 로직
        return resolve({tid: databaseId});
     });
}
~~~

따라서 LocalStorage에 데이터를 저장하거나 특정 URL에 묶이지 않은 기타 저장소에 저장하거나 객체의 생성/삭제를 담당하는 두 개의 서로 다른 서버(URL)가 있는 경우에도 DataProcessor를 사용할 수 있습니다.


## 리소스 및 리소스 할당 저장

기본적으로 DataProcessor는 리소스 및 리소스 할당의 업데이트를 수신하지 않습니다. 다만 이 기능은 [별도 구성](guides/server-side.md#resources_crud)을 통해 활성화할 수 있습니다.

### 관련 가이드
- [서버 사이드 통합](guides/server-side.md)

### 변경 로그
- v8.0에서 **deleteAfterConfirmation** 매개변수가 추가되었습니다