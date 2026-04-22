---
sidebar_label: createDatastore
title: createDatastore method
description: "제공된 구성에 따라 데이터스토어를 생성합니다"
---

# createDatastore

### Description

@short: 제공된 구성에 따라 데이터스토어를 생성합니다

@signature: createDatastore: (config: DatastoreConfig) => DatastoreMethods & TreeDatastoreMethods

### Parameters

- `config` - (required) *DatastoreConfig* - 데이터스토어의 구성 객체

### Returns
- `datastore` - (datastore & treedatastore) - 타입에 따라 datastore 또는 treedatastore 객체를 반환합니다

### Example

~~~jsx
var resourcesStore = gantt.createDatastore({
    name:"resource",
    initItem: function(item){
        item.id = item.key || gantt.uid();
        return item;
    }
});
~~~

### Related samples
- [리소스 패널이 있는 간트 차트](https://docs.dhtmlx.com/gantt/samples/10_layout/02_resource_panel.html)
- [리소스 부하 다이어그램](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
- [리소스 히스토그램](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)

### Details

구성 객체 속성:

- **name** - (*string*) - 데이터스토어의 임의 문자열 이름. 해당 이름으로 [getDatastore](api/method/getdatastore.md)을 통해 데이터스토어에 접근할 수 있습니다.
- **initItem? (item): any** - 선택적이며, 데이터스토어에 로드된 항목을 전처리합니다. 데이터스토어 항목의 기본 값을 설정하기에 좋은 위치입니다. 함수는 다음 매개변수를 받습니다:
    - **_item_** - (*any*) - 리소스 항목.
- **type?** - (*string*) - 선택적이며 오직 하나의 고정 값 **"treeDatastore"**만 허용합니다. type:"treeDatastore"가 지정되면 데이터스토어는 계층형 데이터를 지원하며, **id** 속성을 기본 키로, **parent**를 부모 id에 대한 링크로 사용합니다. 다른 값은 평면 목록 데이터스토어를 생성합니다.
- **fetchTasks?** - (*boolean*) - 선택적이며, 특정 리소스에 할당된 모든 작업을 리소스 뷰 패널에서 표시하도록 활성화합니다. 이 기능은 자원 다이어그램 및 자원 히스토그램 레이아웃 타입에서 모두 작동합니다.

### Related API
- [datastore](api/other/datastore.md)
- [treeDatastore](api/other/treedatastore.md)

### Related Guides
- [간트 레이아웃](guides/layout-config.md)
- [리소스 관리](guides/resource-management.md)