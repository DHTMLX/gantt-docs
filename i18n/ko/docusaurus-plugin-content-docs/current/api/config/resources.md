---
sidebar_label: resources
title: resources config
description: "리소스 스토어에 대한 추가 설정을 정의합니다."
---

# resources

### Description

@short: 리소스 스토어에 대한 추가 설정을 정의합니다.

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
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

**resources** 설정은 여러 옵션을 포함하는 객체입니다:

- **dataprocessor_assignments** - (*boolean*) - 리소스 할당 변경 사항을 고유 ID가 유지되는 별도의 항목으로 DataProcessor에 전송할지 여부를 결정합니다.
- **dataprocessor_resources** - (*boolean*) - 리소스 객체 변경 사항을 고유 ID가 유지되는 별도의 항목으로 DataProcessor에 전송할지 여부를 제어합니다.
- **editable_resource_diagram** - (*boolean*) - 리소스 다이어그램 내에서 리소스 할당을 직접 편집할 수 있는지 여부를 제어합니다.
- **resource_store** - (*object*) - 기본 리소스 데이터스토어를 설정하며, 다음 속성을 포함합니다:
    - **_type?_** - (*string*) - 선택 사항이며, 고정 값 **"treeDataStore"**만 허용합니다. 이 값으로 설정하면 데이터스토어가 **id**를 기본 키로, **parent**를 상위 id 참조로 하는 계층적 데이터를 지원합니다. 다른 값은 평면 리스트 데이터스토어를 생성합니다.
    - **_initItem?_** - (*Function*): any - 선택 사항으로, 데이터스토어에 로드되는 항목을 사전 처리할 수 있어 기본값 설정에 유용합니다. 함수는 다음을 인수로 받습니다:
        - **_item_** - (*any*) - 처리 중인 리소스 항목
    - **_fetchTasks?_** - (*boolean*) - 선택 사항으로, 리소스 뷰 패널에서 해당 리소스에 할당된 모든 작업을 표시할 수 있게 합니다. 리소스 다이어그램과 리소스 히스토그램 레이아웃 모두에서 작동합니다.
- **lightbox_resources? (resourceArray): any** - 선택 사항으로, 모든 리소스를 받아 라이트박스의 리소스 컨트롤에 표시할 리소스 배열을 반환하는 함수입니다. 기본적으로 하위 리소스가 없는 리소스만 포함됩니다.
    - **_resourceArray_** - (*any*) - 리소스 객체의 배열

### Related Guides
- [리소스 관리](guides/resource-management.md)

### Change log
- v8.0에 추가됨
