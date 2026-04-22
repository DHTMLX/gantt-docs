---
sidebar_label: lightbox
title: lightbox config
description: "lightbox 객체를 지정합니다."
---

# lightbox

### Description

@short: 라이트박스 객체를 지정합니다

@signature: lightbox: LightboxSections

### Example

~~~jsx
gantt.config.lightbox.sections = [
    { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
    { name: "priority", height: 22, map_to: "priority", type: "select", options: opts },
    { name: "time", height: 72, type: "duration", map_to: "auto" }
];

gantt.init("gantt_here");
~~~

### Details

The lightbox object has 1 property:

- **sections** - (*array*) - 라이트박스 섹션을 지정합니다

~~~js
// default lightbox definition
gantt.config.lightbox.sections = [
    { name: "description", height: 70, map_to: "text", type: "textarea", focus: true },
    { name: "time", height: 72, map_to: "auto", type: "duration" }
];
~~~

Objects in the **sections** array can have the following properties, depending on the [type of a section](guides/default-edit-form.md#lightbox-structure):

#### Common for all sections

- **name** - (*string*) - 섹션의 이름. dhtmlxGantt는 이 이름에 따라 *locale.labels* 컬렉션에서 섹션의 라벨을 가져옵니다. 예를 들어 **time** 섹션의 경우, dhtmlxGantt 은 **gantt.locale.labels.section_time** 로 저장된 라벨을 사용합니다. 섹션에 **label** 속성이 지정되어 있다면, 로케일에서 가져오는 대신 해당 속성의 라벨이 사용됩니다. <br>또한 **name** 속성은 컨트롤 객체를 얻기 위한 방법으로도 사용될 수 있습니다 via the [](api/method/getlightboxsection.md) 메서드에 사용됩니다.
- **map_to** - (*string*) - 섹션에 매핑될 데이터 속성의 이름
- **type** - (*string*) - [섹션 컨트롤의 유형](guides/default-edit-form.md#lightboxcontrols) (에디터)
- **label** - (*string*) - 섹션의 라벨
- **height?** - (*number*) - 선택적, 섹션의 높이. [checkbox](guides/checkbox.md) 및 [radio](guides/radio.md) 섹션과 함께 사용되지 않습니다
- **focus?** - (*boolean*) - 선택적, true로 설정되면 라이트박스를 열 때 해당 섹션에 포커스가 설정됩니다
- **formatter?** - (*DurationFormatter | LinkFormatter*) - 선택적, 섹션용 포매터

#### Time and Duration controls

- **readonly?** - (*boolean*) - 선택적, "true" 값을 설정하면 섹션이 읽기 전용이 됩니다
- **year_range?** - (*number | number[]*) - 선택적, 연도 선택기의 범위를 설정합니다. 두 가지 방법으로 설정할 수 있습니다:
    - *year_range: [2005, 2025]* - 2005년부터 2025년까지의 기간
    - *year_range: 10*  - [현재 연도 - 10년; 현재 연도 + 10년] 기간
- **single_date?** - (*boolean*) - 선택적, "true" 로 설정되면 시작 날짜 선택자만 섹션에 표시됩니다. Edited tasks will be specified only by the start date and have a zero duration. Makes sense only for [milestones](guides/task-types.md#milestones).
- **time_format?** - (*string[]*) - 선택적, 날짜-시간 선택기의 순서를 설정합니다
- **autofix_end?** - (*boolean*) - 선택적, 시작 날짜가 끝 날짜보다 큰 경우 끝 날짜가 자동으로 보정될지 여부를 정의합니다: 기본값은 *true*. 비활성 모드는 날짜를 검증할 수 있지만 모드를 활성화하고 날짜를 검증하지 않으면 시작 날짜가 끝 날짜보다 큰 작업의 경우 지속 시간이 0인 작업이 생길 수 있습니다.

#### Select control

- **onchange? (*e*): any** - 선택적, 섹션 컨트롤의 'onChange' 이벤트 핸들러 함수를 지정합니다
    - **_e_** - (*Event*) - 네이티브 이벤트 객체

#### Select, Checkbox, Radio and Resources controls

- **options?** - (*object[]*) - 선택적, 컨트롤의 선택 옵션을 정의합니다. 배열의 각 객체는 단일 옵션을 나타내며 다음 속성을 가집니다:
    - **_key_** - (*number | string*) - 옵션의 ID. 이 속성은 작업 데이터 속성과 비교되어 작업에 옵션을 할당합니다
    - **_label_** - (*string*) - 옵션의 라벨
    - **_unit?_** - (*string | number*) - 선택적, 자원의 측정 단위(Resources 컨트롤용) 
- **default_value?** - (*any*) - 선택적, 섹션 컨트롤의 기본 값. 입력 값이 undefined인 경우에만 적용됩니다. Resources 컨트롤의 경우 자원의 값이 undefined인 경우에 적용됩니다.

#### Resource Assignments control

- **config** - (*object*) 라이트박스에 표시할 필요한 열을 가진 리소스 그리드 구성
- **templates** - (*object*) 라이트박스의 리소스 그리드 템플릿
- **resource_default_assignment** - (*object*) 기본 할당의 구성 객체(“Add Assignment” 버튼으로 추가될 항목)
    - **start_date** - (*Date | string | null*) 할당이 시작되도록 예약된 날짜
    - **end_date** - (*Date | string | null*) 할당이 완료될 예정인 날짜
    - **value** - (*number | string*) 작업에 할당된 자원의 양
    - **duration** - (*number | null*) 할당의 기간
    - **mode** - (*string*) 자원 할당 시간의 계산 모드: "default" | "fixedDates" | "fixedDuration"

#### Parent control

- **allow_root?** - (*boolean*) - 선택적, true로 설정되면 옵션 목록에 루트 수준을 부모로 설정할 수 있는 추가 옵션이 포함됩니다. **root_label** 속성과 함께 사용됩니다
- **root_label?** - (*string*) - 선택적, 루트 수준 부모에 대한 라벨을 설정합니다. **allow_root** 속성과 함께 사용됩니다
- **sort? (task1, task2): number** - 선택적, 선택 옵션에 대한 정렬 함수를 설정합니다
    - **_task1_** - (*Task*) - 정렬될 첫 번째 Task 객체
    - **_task2_** - (*Task*) - 정렬될 두 번째 Task 객체
- **filter? (id, task): boolean** - 선택적, 선택 옵션에 대한 필터링 함수를 설정합니다. task의 id와 객체를 매개변수로 받습니다
    - **_id_** - (*string | number*) - Task 객체의 ID
    - **_task_** - (*Task*) - Task 객체
- **template? (start_date, end_date, task): string|number** - 선택적, 선택 옵션에 대한 템플릿을 설정합니다
    - **_start_date_** - (*Date | number*) - Task 객체의 시작 날짜
    - **_end_date_** - (*Date | number*) - Task 객체의 종료 날짜
    - **_task_** - (*Task*) - Task 객체

#### Typeselect control

- **filter** - (*function*) - 작업 유형에 대한 필터링 함수를 설정합니다. 유형 이름을 매개변수로 받습니다

### Related API
- [wide_form](api/config/wide_form.md)

### Related Guides
- [Textarea Control](guides/textarea.md)
- [Duration Control](guides/duration.md)
- [Time Control](guides/time.md)
- [Select Control](guides/select.md)
- [Typeselect Control](guides/typeselect.md)
- [Parent Control](guides/parent.md)
- [Template Control](guides/template.md)
- [Checkbox Control](guides/checkbox.md)
- [Radio Button Control](guides/radio.md)
- [Configuring Lightbox Elements](guides/default-edit-form.md)
- [Working with Lightbox Elements](guides/lightbox-manipulations.md)
- [Creating Custom Element](guides/custom-editor.md)
- [Custom Lightbox](guides/custom-edit-form.md)
- [Changing Buttons in the Lightbox](guides/custom-button.md)

### Change log
- If either [gantt.config.csp](api/config/csp.md) is set to *true* or Gantt works in the Salesforce environment, the lightbox will be rendered inside the Gantt container (from v7.1.13)