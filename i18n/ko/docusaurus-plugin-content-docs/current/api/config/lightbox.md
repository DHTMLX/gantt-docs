---
sidebar_label: lightbox
title: lightbox config
description: "lightbox 객체를 지정합니다."
---

# lightbox

### Description

@short: Lightbox 객체를 지정합니다.

@signature: lightbox: LightboxSections

### Example

~~~jsx
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea",focus:true},
    {name:"priority", height:22, map_to:"priority",type:"select",options:opts},                                                                        
    {name:"time", height:72, type:"duration", map_to:"auto"}
];

gantt.init("gantt_here");
~~~

### Details

lightbox 객체는 한 가지 주요 속성을 포함합니다:

- **sections** - (*배열*) - lightbox 내의 섹션들을 정의합니다.

~~~js
// 기본 lightbox 정의   
gantt.config.lightbox.sections=[
    {name:"description", height:70, map_to:"text", type:"textarea", focus:true},
    {name:"time",        height:72, map_to:"auto", type:"duration"}
];
~~~

**sections** 배열 내의 각 객체는 [섹션 타입](guides/default-edit-form.md#lightboxstructure)에 따라 다양한 속성을 가질 수 있습니다:

## 모든 섹션에 공통

- **name** - (*문자열*) - 섹션의 식별자입니다 (dhtmlxGantt가 *locale.labels* 컬렉션에서 라벨을 가져오는 데 사용). 예를 들어, **time** 섹션은 **gantt.locale.labels.section_time**에서 라벨을 사용합니다.
- **map_to** - (*문자열*) - 섹션이 연결되는 데이터 속성 이름입니다.
- **type** - (*문자열*) - 섹션에서 사용되는 [컨트롤의 타입](guides/default-edit-form.md#lightboxcontrols)입니다.
- **height?** - (*숫자*) - 선택 사항이며 섹션의 높이를 설정합니다. 이 속성은 [체크박스](guides/checkbox.md) 및 [라디오](guides/radio.md) 섹션에는 적용되지 않습니다.
- **focus?** - (*불리언*) - 선택 사항이며 true일 경우 lightbox가 열릴 때 해당 섹션에 포커스가 설정됩니다.
- **formatter?** - (*DurationFormatter | LinkFormatter*) - 선택 사항이며, 섹션에 사용할 포맷터를 지정합니다.

## 시간 및 기간 컨트롤

- **readonly?** - (*불리언*) - 선택 사항이며 true로 설정하면 섹션이 읽기 전용이 됩니다.
- **year_range?** - (*숫자 | 숫자 배열*) - 선택 사항이며 연도 선택기의 범위를 정의합니다. 두 가지 방식으로 지정할 수 있습니다:
    - *year_range: [2005, 2025]* - 2005년부터 2025년까지 선택 가능.
    - *year_range: 10* - 현재 연도를 기준으로 10년 전부터 10년 후까지 선택 가능.
- **single_date?** - (*불리언*) - 선택 사항이며 true일 경우 '시작 날짜' 선택기만 표시됩니다. 수정된 작업은 시작 날짜만 가지며 기간은 0입니다. 주로 [마일스톤](guides/task-types.md#milestones)에 유용합니다.
- **time_format?** - (*문자열 배열*) - 선택 사항이며 날짜-시간 선택기의 순서를 정의합니다.
- **autofix_end?** - (*불리언*) - 선택 사항이며 시작 날짜가 종료 날짜 이후로 설정되었을 때 종료 날짜를 자동으로 조정할지 여부를 제어합니다. 기본적으로 활성화되어 있습니다. 비활성화하면 수동 검증이 가능하지만 검증하지 않으면 시작 날짜가 종료 날짜보다 늦을 경우 작업 기간이 0이 될 수 있습니다.

## 선택 컨트롤

- **onchange? (*e*): any** - 선택 사항이며 섹션 컨트롤에 대한 'onChange' 이벤트 핸들러를 설정합니다.
    - **_e_** - (*Event*) - 네이티브 이벤트 객체입니다.

## 선택, 체크박스, 라디오 및 리소스 컨트롤

- **options?** - (*객체 배열*) - 선택 사항이며 컨트롤의 옵션 목록입니다. 배열 내 각 객체는 다음 속성을 가집니다:
    - **_key_** - (*숫자 | 문자열*) - 옵션의 식별자이며 작업의 데이터 속성과 매칭됩니다.
    - **_label_** - (*문자열*) - 옵션의 표시 라벨입니다.
    - **_unit?_** - (*문자열 | 숫자*) - 선택 사항이며 리소스 컨트롤에서 사용되는 단위입니다.
- **default_value?** - (*임의 타입*) - 선택 사항이며 입력 값이 정의되지 않았을 때 사용할 기본값입니다. 리소스 컨트롤에서는 리소스 값이 정의되지 않았을 때 적용됩니다.

## 부모 컨트롤

- **allow_root?** - (*불리언*) - 선택 사항이며 true일 경우 루트 레벨을 부모 작업으로 선택할 수 있는 추가 옵션이 추가됩니다. 이 속성은 **root_label**과 함께 사용됩니다.
- **root_label?** - (*문자열*) - 선택 사항이며 루트 레벨 부모 옵션의 라벨을 정의합니다. **allow_root**와 함께 사용됩니다.
- **sort? (task1, task2): number** - 선택 사항이며 선택 옵션을 정렬하는 함수입니다.
    - **_task1_** - (*Task*) - 비교할 첫 번째 작업 객체입니다.
    - **_task2_** - (*Task*) - 비교할 두 번째 작업 객체입니다.
- **filter? (id, task): boolean** - 선택 사항이며 선택 옵션을 필터링하는 함수로, 작업 ID와 작업 객체를 인자로 받습니다.
    - **_id_** - (*문자열 | 숫자*) - 작업의 ID입니다.
    - **_task_** - (*Task*) - 작업 객체입니다.
- **template? (start_date, end_date, task): string|number** - 선택 사항이며 선택 옵션의 템플릿을 정의합니다.
    - **_start_date_** - (*Date | 숫자*) - 작업의 시작 날짜입니다.
    - **_end_date_** - (*Date | 숫자*) - 작업의 종료 날짜입니다.
    - **_task_** - (*Task*) - 작업 객체입니다.

## 타입선택 컨트롤

- **filter** - (*함수*) - 작업 타입에 대한 필터 함수로, 타입 이름을 매개변수로 받습니다.

### Related API
- [wide_form](api/config/wide_form.md)

### Related Guides
- - [Textarea 컨트롤](guides/textarea.md)
- - [Duration Control](guides/duration.md)
- - [Time Control](guides/time.md)
- - [Select Control](guides/select.md)
- - [Typeselect 컨트롤](guides/typeselect.md)
- - [Parent Control](guides/parent.md)
- - [템플릿 컨트롤](guides/template.md)
- - [Checkbox Control](guides/checkbox.md)
- - [라디오 버튼 컨트롤](guides/radio.md)
- - [Lightbox 요소 구성하기](guides/default-edit-form.md)
- - [Lightbox 요소 작업하기](guides/lightbox-manipulations.md)
- - [커스텀 엘리먼트 생성하기](guides/custom-editor.md)
- - [Custom Lightbox](guides/custom-edit-form.md)
- - [라이트박스의 버튼 변경하기](guides/custom-button.md)

### Change log
- [gantt.config.csp](api/config/csp.md)가 *true*로 설정되었거나 Gantt가 Salesforce 환경에서 실행되는 경우, 버전 7.1.13부터 lightbox는 Gantt 컨테이너 내부에 렌더링됩니다.

