---
title: "라이트박스 요소 구성"
sidebar_label: "라이트박스 요소 구성"
---

# 라이트박스 요소 구성

라이트박스는 작업 세부 정보를 변경하기 위한 편집 양식입니다.

아래 이미지에 기본 라이트박스가 표시됩니다.

![lightbox](/img/lightbox.png)

라이트박스 구성은 작업 유형에 따라 다를 수 있습니다. 각 유형별 설정은 [lightbox](api/config/lightbox.md) 객체에 저장됩니다:

- **gantt.config.lightbox.sections** - 일반 작업용.
- **gantt.config.lightbox.project_sections** - 프로젝트 작업용.
- **gantt.config.lightbox.milestone_sections** - 마일스톤용.

또한 [add a custom type](guides/task-types.md#creating-a-custom-type)을 추가하고 해당 유형에 대한 라이트박스 구성을 정의할 수도 있습니다.
자세한 내용은 [Task Types](guides/task-types.md#specificlightboxpertasktype)를 참조하세요.

전체 유형 구조는 아래와 같이 보입니다:

- <span class="subproperty">**sections?**</span> - (*LightboxSection[]*) - 선택적, 일반 작업용 라이트박스 섹션 배열
- <span class="subproperty">**project_sections?**</span> - (*LightboxSection[]*) - 선택적, 프로젝트 작업용 라이트박스 섹션 배열
- <span class="subproperty">**milestone_sections?**</span> - (*LightboxSection[]*) - 선택적, 마일스톤용 라이트박스 섹션 배열
- <span class="subproperty">**[lightboxType: string]**</span> - (*LightboxSection[] | undefined*) - 사용자 정의 유형의 라이트박스 섹션 배열

:::note
버전 7.1.13부터, [gantt.config.csp](api/config/csp.md)가 *true*로 설정되거나 Gantt가 Salesforce 환경에서 동작하는 경우, 라이트박스가 Gantt 컨테이너 내부에 렌더링됩니다.
:::

## 라이트박스 구조

### 섹션

라이트박스의 구조는 라이트박스 객체의 **sections** 속성으로 지정됩니다:

~~~js
// 기본 라이트박스 정의
gantt.config.lightbox.sections = [
    { name: 'description', height: 70, map_to: 'text', type: 'textarea', focus: true },
    { name: 'time', height: 72, map_to: 'auto', type: 'duration' }
];
~~~

**sections** 배열의 각 항목은 라이트박스의 단일 섹션을 정의하는 객체입니다.
사용 가능한 섹션 속성은 [lightbox config](api/config/lightbox.md)를 참조하세요.


### 섹션 컨트롤 {#lightboxcontrols}

라이트박스의 각 섹션은 특정 컨트롤을 기반으로 합니다. 라이트박스에서 사용할 수 있는 컨트롤 유형은 다음과 같습니다:

- [Textarea](guides/textarea.md) - 다중 행 텍스트 필드
- [Time](guides/time.md) - 작업의 시작일과 종료일을 지정하여 작업 기간을 설정하는 두 개의 선택 상자
- [Duration](guides/duration.md) - 작업의 시작 날짜와 일 수를 지정하여 작업 기간을 설정하는 선택 요소들의 묶음
- [Select](guides/select.md) - 간단한 선택 상자
- [Typeselect](guides/typeselect.md) - 작업 유형을 변경하기 위한 선택 상자
- [Parent](guides/parent.md) - 작업의 상위 작업을 변경하기 위한 선택 상자
- [Template](guides/template.md) - 내부에 일부 HTML 콘텐츠를 포함하는 컨테이너
- [Checkbox](guides/checkbox.md) - 옵션 하나 이상을 켜거나 끄는 체크박스
- [Radio button](guides/radio.md) - 주어진 옵션 세트에서 하나만 선택하는 라디오 버튼
- [Resources](guides/resources.md) - 작업에 여러 리소스를 할당하기 위한 복합 컨트롤
- [Resource Assignments](guides/resource-assignments.md) - 작업에 리소스를 할당하기 위한 확장 컨트롤
- [Constraint](guides/constraint.md) - 작업의 제약 조건을 설정하기 위한 복합 컨트롤
- [Baselines](guides/baseline.md) - 작업에 대한 기준선을 설정하기 위한 복합 컨트롤

~~~js
const opts = [
    { key: 1, label: 'High' },
    { key: 2, label: 'Normal' },
    { key: 3, label: 'Low' }
];

gantt.config.lightbox.sections = [
    { name: 'description', height: 38, map_to: 'text', type: 'textarea', focus: true },
    { name: 'priority', height: 22, map_to: 'priority', type: 'select', options: opts },
    { name: 'time', height: 72, map_to: 'auto', type: 'duration' }
];
~~~