---
sidebar_label: resources
title: resources config
description: "리소스 스토어에 대한 추가 설정을 정의합니다."
---

# resources

### Description

@short: 리소스 저장소에 대한 추가 구성을 정의합니다

@signature: resources: boolean | \{ dataprocessor_assignments?: boolean; dataprocessor_resources?: boolean; editable_resource_diagram?: boolean; resource_store?: \{ type?: string; initItem?: ((item: any) =\> any); fetchTasks?: boolean; \}; lightbox_resources?(resourceArray: any): any; \}

### Example

~~~jsx
gantt.config.resources = {
    dataprocessor_assignments: true,
    dataprocessor_resources: true,
    editable_resource_diagram: true,
    resource_store: {
        type: "treeDataStore",
        fetchTasks: true,
        initItem: function(item) {
            item.parent = item.parent || gantt.config.root_id;
            item[gantt.config.resource_property] = item.parent;
            item.open = true;
            return item;
        }
    },
    lightbox_resources: function selectResourceControlOptions(resources){
        const lightboxOptions = [];
        resources.forEach(function(res) {
            if (!gantt.$resourcesStore.hasChild(res.id)) {
                const copy = gantt.copy(res);
                copy.key = res.id;
                copy.label = res.text;
                lightboxOptions.push(copy);
            }
        });
        return lightboxOptions;
    }
};
~~~

### Related samples
- [특정 날짜에 리소스 값을 할당](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

The **resources** property presents an object with a set of attributes:

- **dataprocessor_assignments** - (*boolean*) - 수정된 리소스 할당을 지속 가능한 ID를 가진 별도 항목으로 DataProcessor에 보낼 수 있는지 정의합니다
- **dataprocessor_resources** - (*boolean*) - 수정된 리소스 객체를 지속 가능한 ID를 가진 별도 항목으로 DataProcessor에 보낼 수 있는지 정의합니다
- **editable_resource_diagram** - (*boolean*) - 리소스 다이어그램에서 리소스 할당을 편집 가능하게 할지 정의합니다
- **resource_store** - (*object*) - 기본 리소스 데이터스토어를 생성합니다. 이 객체에는 다음 속성이 포함됩니다:
    - **_type?_** - (*string*) - 선택적이며 하나의 고정 값 **"treeDatastore"**만 허용합니다. type:"treeDatastore"가 지정되면 데이터스토어는 계층 데이터를 지원하고, **id** 속성을 기본 키로 사용하며 **parent**를 부모 id에 대한 연결로 사용합니다. 다른 값은 평면 목록 데이터스토어를 생성합니다.
    - **_initItem?_** - (*Function*): any - 선택적이며, 데이터스토어에 로드된 아이템을 전처리합니다. 데이터스토어 아이템의 기본 값을 설정하기에 적합한 위치입니다. 함수는 다음 매개변수를 받습니다:
        - **_item_** - (*any*) - 리소스 아이템
    - **_fetchTasks?_** - (*boolean*) - 선택적이며, 특정 리소스에 할당된 모든 작업을 리소스 보기 패널에 표시하도록 활성화합니다. 이 기능은 리소스 다이어그램 및 리소스 히스토그램 레이아웃 타입 모두에서 작동합니다.
- **lightbox_resources? (resourceArray): any** - 선택적이며, 모든 리소스를 인수로 받아 lightbox의 리소스 컨트롤에서 사용할 수 있어야 하는 리소스 배열을 반환하는 함수입니다. 기본적으로 컨트롤은 하위 리소스가 없는 리소스로 채워집니다.
    - **_resourceArray_** - (*any*) - 리소스 배열

### Related Guides
- [자원 관리](guides/resource-management.md)

### Change log
- v8.0에 추가됨