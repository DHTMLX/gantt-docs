---
sidebar_label: createDatastore
title: createDatastore method
description: "주어진 구성(configuration)을 기반으로 datastore를 생성합니다."
---

# createDatastore

### Description

@short: 주어진 구성(configuration)을 기반으로 datastore를 생성합니다.

@signature: createDatastore: (config: DatastoreConfig) =\> DatastoreMethods & TreeDatastoreMethods

### Parameters

- `config` - (required) *DatastoreConfig* - datastore 구성을 포함하는 객체

### Returns
- ` datastore` - (datastore & treedatastore) - 지정된 타입에 따라 datastore 또는 treedatastore 객체를 반환합니다.

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
- [Gantt chart with resource panel](https://docs.dhtmlx.com/gantt/samples/10_layout/02_resource_panel.html)
- [Resource load diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
- [Resource histogram](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)

### Details

구성 객체의 속성들:

  
- **name** - (*string*) - datastore에 대한 사용자 지정 문자열 이름입니다. 이 이름을 통해 [getDatastore](api/method/getdatastore.md)를 통해 datastore에 접근할 수 있습니다.
- **initItem? (item): any** - 선택 사항이며, datastore에 아이템이 로드될 때 사전 처리(preprocess)를 수행하는 함수입니다. datastore 아이템의 기본값을 설정할 때 유용합니다. 함수는 다음 인자를 받습니다:
    - **_item_** - (*any*) - 처리 중인 리소스 아이템입니다.
- **type?** - (*string*) - 선택 사항이며, 값으로 **"treeDatastore"**만 허용합니다. type:"treeDatastore"를 지정하면 계층적 데이터를 처리하는 datastore가 생성되며, **id**를 기본 키로 사용하고 **parent**를 통해 상위 id와 연결합니다. 다른 값은 평면 리스트 형태의 datastore를 생성합니다.
- **fetchTasks?** - (*boolean*) - 선택 사항이며, 활성화 시 특정 리소스에 할당된 모든 작업을 리소스 뷰 패널에 표시합니다. 이 기능은 리소스 다이어그램과 리소스 히스토그램 레이아웃 모두에서 작동합니다.

### Related API
- [datastore](api/other/datastore.md)
- [treeDatastore](api/other/treedatastore.md)

### Related Guides
- [간트 레이아웃](guides/layout-config.md)
- [리소스 관리](guides/resource-management.md)

