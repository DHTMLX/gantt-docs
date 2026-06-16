---
title: "구 버전에서의 마이그레이션"
sidebar_label: "구 버전에서의 마이그레이션"
---

# 구 버전에서의 마이그레이션

## 9.1 -> 10.0

### GPL 에디션에서 Community (MIT) 에디션으로의 마이그레이션 {#gpl-to-mit}

버전 10부터 DHTMLX Gantt의 무료 에디션은 MIT 라이선스 하에 배포되는 **Community 에디션**입니다. 이는 동일한 `dhtmlx-gantt` 패키지의 이전 무료 배포인 **GPL** 배포를 대체합니다. GPL v2는 여전히 이전의 무료 버전(v9.x 및 그 이전)에 적용되며, [주요 GitHub 저장소](https://github.com/DHTMLX/gantt)의 전용 브랜치에서 계속 사용할 수 있지만 더 이상 적극적으로 유지되지는 않습니다.

GPL 에디션에서 Community 에디션으로 기존 프로젝트를 이동하려면:

- **패키지 버전을 확인하세요.** `dhtmlx-gantt` v10 이상은 Community(MIT) 에디션이고, v9.x 이하는 GPL 에디션입니다.
- **라이선스 고지를 업데이트하세요** 프로젝트에서 Gantt 라이선스에 참조가 있다면 — 이제 무료 에디션은 GPL이 아니라 MIT입니다.
- **런타임 시 라이선스 값을 확인하세요** - [`gantt.license`](api/other/license.md) 는 Community 에디션에서 `"mit"`를 반환합니다(이전의 무료 에디션은 `"gpl"`을 반환했습니다).
- **내보내기 동작을 테스트하세요.** 온라인 내보내기 서비스는 무료 내보내기에 워터마크를 추가합니다; 이는 변경 없이 유지되며 GPL 라이선스와 더 이상 연결되어 있지 않습니다(내보내기 서비스는 별도 제품입니다).
- **기능 차이점을 검토하세요.** Community 에디션은 예전 GPL 에디션의 엄격한 부분집합이 아닙니다. 프로젝트(요약 작업), 마일스톤, 커스텀 작업 유형, 페이지당 다중 Gantt 인스턴스 지원 등의 기능이 **추가되지만**, 실행 취소/다시 실행, 마커, 다중 선택, 미배치 작업, 새 작업 자리 표시 행, 작업 시간 캘린더, WBS 코드는 **제거**되었습니다. 전체 기능 비교는 [Community vs PRO Library Versions](guides/editions-comparison.md) 를 참조하세요.

### 프레임워크 래퍼의 XSS 보호

버전 10.0부터 [React Gantt](integrations/react.md), [Vue Gantt](integrations/vue.md), [Angular Gantt](integrations/angular.md) 래퍼는 기본적으로 사용자 제공 템플릿 함수에서 반환된 문자열 값을 원시 HTML로 삽입하지 않고 먼저 정제합니다. 이를 통해 템플릿을 통해 렌더링된 데이터로 인한 XSS 취약점을 방지합니다.

다음에 적용됩니다:

- `templates` 프롭을 통해 전달된 함수
- `config.columns[].template` 함수
- `config.scales[].format` 함수들

기본값(`htmlTemplatePolicy="basic-sanitize"`)은 반환된 HTML을 화이트리스트 방식으로 정제합니다: 일반 형식(``<b>``, ``<span>``, ``<div>``, ...), `class`, 제한된 인라인 스타일 세트, `data-*` 속성, 그리고 안전한 `src`를 가진 `<img>`가 보존되며, `<script>`, 인라인 이벤트 핸들러, 위험한 URL은 제거됩니다. 간단한 마크업을 반환하는 템플릿은 작동을 계속합니다; 안전하지 않은 구성 요소만 제거됩니다.

#### 이전의 Raw-HTML 동작 복원

`htmlTemplatePolicy` 프롭을 `"unsafe-html"`로 설정하여 템플릿 문자열을 처리 없이 예전과 같이 정확히 렌더링하려면 아래와 같이 설정합니다:

~~~jsx
<ReactGantt htmlTemplatePolicy="unsafe-html" /* ... */ />
~~~

~~~vue
<VueGantt htmlTemplatePolicy="unsafe-html" /* ... */ />
~~~

~~~html
<dhx-gantt htmlTemplatePolicy="unsafe-html" /* ... */></dhx-gantt>
~~~

#### 템플릿별 Raw HTML

개별 템플릿을 `allowRawHTML`로 감싸서 해당 템플릿에 대해서만 정화를 우회합니다 — 로그를 직접 처리하려면 내보낸 `escapeHTML` 도우미를 사용하세요:

~~~jsx
import { allowRawHTML, escapeHTML } from "@dhx/react-gantt";
// 또는 "@dhx/vue-gantt" / "@dhx/angular-gantt"

<ReactGantt
    templates={{
        task_text: allowRawHTML((start, end, task) => `<b>${escapeHTML(task.text)}</b>`)
    }}
/>
~~~

#### 커스텀 화 sanitizers 또는 텍스트 렌더링

`htmlTemplatePolicy={{ mode: "sanitize", sanitize }}` 와 같이 DOMPurify 같은 커 sanitizer를 연결하거나, 템플릿 문자열을 일반 텍스트로 렌더링하려면 `"escape"`를 사용하세요. 자세한 내용은 [App security](guides/app-security.md#framework-wrapper-xss-protection) 를 참조하세요.

### Auto-scheduling 엔진 업데이트 {#auto-scheduling-v2}

v10.0은 재작업된 자동 스케줄링 엔진을 제공합니다. 상당수의 오랜 버그를 수정했으며, 주로 슬랙 계산 및 [move_projects](api/config/auto_scheduling.md#move_projects)가 활성화된 상태에서 프로젝트(요약 작업)의 스케줄링과 관련된 문제를 해결합니다.

공개 API와 보이는 동작은 동일하게 유지되지만, 이전에 잘못 작동하던 케이스에 한해 영향이 있을 수 있습니다. 기존 코드에 영향을 미칠 수 있는 변경 사항은 아래에 나와 있습니다.

새 엔진은 기본적으로 사용됩니다. 전환 과정에서 이전 엔진으로 되돌려야 하는 경우 아래의 옵트아웃 플래그를 사용하세요:

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    _engine: "v1",          // 이전 스케줄링 엔진
    _analysis_engine: "v1"  // 이전 슬랙/크리티컬 경로 계산
};
~~~

이 플래그들은 이행 과정의 임시 구성으로, v10.1에서 제거될 예정이므로 그 전에 이행 계획을 마련하세요.

#### 동작 변화

| 영역 | 이전 (v9.x) | v10.0 이후 | 적용 방법 |
|---|---|---|---|
| 반복적인 `gantt.autoSchedule()` 호출 | 여러 달력을 혼합하는 프로젝트에서 작업이 앞당겨질 수 있음 | 변경되지 않은 데이터에 대해 자동 스케줄링을 다시 실행해도 날짜가 동일하게 유지 | 조치 필요 없음 |
| 슬랙 및 크리티컬 경로 값 | `move_projects` / `gap_behavior` 변경 시 변화 가능 | 데이터에 의존하고 스케줄링 모드 옵션에 의존하지 않게 됨 | 조치 필요 없음 |
| 작업이 계산에서 제외된 경우의 `getTotalSlack()` / `getFreeSlack()` (종속성 루프, 완료된 작업) | `undefined`를 반환할 수 있음 | `0`을 반환 | `undefined`와 `0`을 다르게 처리하는 코드를 업데이트 |
| `getSlack(task1, task2)` | 직접 연결된 작업에 대해서만 정확 | 연결된 작업들 간에 더 정확한 값, 연결되지 않은 쌍은 변경 없음 | `getTotalSlack` / `getFreeSlack`를 선호 |
| constraint- 및 preference-driven 이동에 대한 `onBeforeTaskAutoSchedule` / `onAfterTaskAutoSchedule` 인수 | `link` 및 원본 작업 인수가 설정될 수 있음 | 이러한 인수는 해당 이동에 대해 `null`인 경우가 있음 | `link` 인수가 항상 설정되었다고 가정한 리스너에서 null 체크 추가 |
| Start-to-Finish 링크에서 `gap_behavior: "preserve"` | 후임 작업이 가능한 한 빨리 스케줄링됨(마치 `"compress"`인 것처럼) | `gap_behavior` 옵션이 적용됩니다 | No action needed - this is the corrected behavior |
| `move_projects: true`로 프로젝트를 이동 | 하위의 제약 조건이 있어도 전체 프로젝트가 제자리에 남아 있을 수 있음 | 전체 프로젝트가 함께 이동합니다; 제약 조건이 충돌하는 하위 항목은 `onAutoScheduleConflict`를 통해 보고됩니다 | 충돌을 표면화하려면 선택적으로 `onAutoScheduleConflict`를 수신 |
 
#### 새로운 이벤트 및 설정

- [onAutoScheduleConflict](api/event/onautoscheduleconflict.md) - 스케줄링 중 발견된 각 충돌에 대해 발생합니다.
- [onAutoScheduleNoConverge](api/event/onautoschedulenoconverge.md) - 스케줄링이 안정적인 결과에 수렴하지 못할 때 발생합니다.
- [strict_calendar](api/config/auto_scheduling.md#strict_calendar) - 기본값은 `false`인 옵트인 옵션으로, 작업이 고유의 비작업 시간에 착지하는 경우를 보고합니다.

#### 알려진 한계점

- 제약 날짜(예: 반드시 완료해야 함은 must-finish-on, 시작은 늦추지 않음은 start-no-later-than)가 커스텀 캘린더의 비작업 시간에 걸리면, 작업에는 제약에 맞는 날짜가 저장되지만 시작 시점에 더해진 `end_date`가 제약 날짜와 정확히 일치하지 않을 수 있습니다. 이 불일치에 대응하려면 onAutoScheduleConflict 이벤트가 작동합니다. 제약을 정확하게 존중하려면 제약 날짜를 포함하는 작업 시간대를 가진 캘린더를 사용하세요.
- 데이터 파싱 직후 코드에서 프로젝트(요약 작업)에 제약 유형을 설정하면 파싱 과정에서 덮어쓰여질 수 있습니다. 로드된 데이터나 라이트박스/인라인 편집기를 통해 이러한 제약을 설정하세요.

### Date helper 변경사항 {#date-helpers}

#### 간격 시작 도우미는 이제 순수 함수(pure)입니다

[`gantt.date`](api/other/date.md) 의 간격 시작 도우미 - `day_start`, `week_start`, `month_start`, `quarter_start`, `year_start`, `hour_start`, `minute_start`, 그리고 `date_part` 는 이제 새 `Date` 를 반환하며 전달된 날짜를 더 이상 직접 수정하지 않습니다.

반환 값은 동일하므로, in-place 변형에 의존하고 반환 값을 무시하던 코드만 업데이트하면 됩니다:

~~~js
// v10.0 이전 - day_start가 `date`를 변형하는 것에 의존
gantt.date.day_start(date);

// v10.0 이후 - 반환된 날짜를 사용
date = gantt.date.day_start(date);
~~~

#### 단일 날짜 파서와 더 이상 사용되지 않는 `csp` 설정

Gantt는 더 이상 `new Function` 기반의 "빠른" 날짜 파서를 제공하지 않습니다. 이제 CSP-안전 파서가 유일한 구현이며, [csp](api/config/csp.md) 설정은 날짜 형식 지정에 더 이상 영향을 주지 않습니다.

해당 옵션은 유지되며 여전히 라이트박스에서 보안 환경 힌트로 읽히므로 기존 구성은 작동합니다. 마이그레이션은 필요하지 않으며, 날짜 형식 지정만을 위해 `gantt.config.csp`를 설정했다면 이를 제거해도 됩니다.

### TypeScript: `SerializedTask` 가 이제 엄격하게 직렬화됩니다 {#serialized-task-types}

`SerializedTask`와 `SerializedLink` 타입은 이제 **오직 JSON 형식만**을 설명합니다:

- 날짜 필드(`start_date`, `end_date`, `constraint_date`, `deadline`, …)는 타입이 `string`입니다. 9.x에서는 `Date | string`이었습니다.
- `SerializedTask.id`는 이제 선택적(Optional)입니다.

응용 프로그램 데이터를 타입으로 지정했는데 — 예를 들어 `SerializedTask[]`로 선언하고 실제로는 `Date` 객체를 채운 경우 — 컴파일러가 이제 *"Type 'Date' is not assignable to type 'string'"* 같은 오류를 보고합니다.

데이터가 실제로 보유한 형식과 일치하는 타입을 선택하세요:

- **`Task` / `Link`** - 런타임 객체로 `Date` 날짜와 `$` 접두사 필드를 가지며(예: `gantt.getTask()`가 반환하는 것)
- **`SerializedTask` / `SerializedLink`** - 날짜가 `string`인 JSON(서버 교환, 저장된 JSON)
- **`TaskInput`** - Gantt에 제공하는 데이터; 날짜는 `Date` 이거나 `string`일 수 있으며 모든 필드(특히 `id`)가 선택적입니다. 일반적으로 애플리케이션 소유 상태에 적합한 타입입니다.

~~~ts
// v10 이전 - SerializedTask는 Date를 허용했으므로 컴파일 됨
const tasks: SerializedTask[] = [
    { id: 1, text: "Task #1", start_date: new Date(2026, 3, 1), duration: 5 }
];

 // v10 이후 - Date 날짜를 사용하는 Task( Date 날짜) 또는 날짜 형식이 바뀔 수 있을 때는 TaskInput 사용
const tasks: TaskInput[] = [
    { id: 1, text: "Task #1", start_date: new Date(2026, 3, 1), duration: 5 }
];
~~~

`TaskInput`은 표준 입력 타입이며, 이전에 더 이상 사용되지 않는 `NewTask` 별칭을 교체합니다(역호환을 위해 여전히 내보냄). 전체 그림은 [Data Model](guides/data-model.md#taskinput) 를 참조하세요.

## 9.0 -> 9.1

v9.1은 끊김 변경사항을 도입하지 않지만, 몇 가지 구성 옵션이 **deprecated**되었고 
[새로운 통합 형식으로의 마이그레이션](#autoscheduling)이 권장됩니다.
또한 [이전에 deprecated로 표시되었던 **subscales** 구성 옵션](#subscales)도 삭제되었습니다.

### 통합 자동 스케줄링 구성 {#autoscheduling}

이전에는 [](guides/auto-scheduling.md) 동작을 제어하던 여러 속성이 **deprecated**되었고, 이제는 통합 [](api/config/auto_scheduling.md) 구성 객체를 사용하는 것이 권장됩니다.

~~~js
// v9.1 이전
gantt.config.auto_scheduling = true;
gantt.config.auto_scheduling_compatibility = true;
gantt.config.auto_scheduling_strict = true;
gantt.config.auto_scheduling_initial = false;

// v9.1 이후
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: false,
    gap_behavior: "compress",
    schedule_on_parse: false
};
~~~

더 이상 사용되지 않는 속성들은 하위 호환성을 위해 계속 작동하지만, 새로운 객체 형식으로의 전환이 권장됩니다.

다음 옵션들은 deprecated되었습니다:

- [auto_scheduling_initial](api/config/auto_scheduling_initial.md)
- [auto_scheduling_compatibility](api/config/auto_scheduling_compatibility.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md)
- [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md)
- [auto_scheduling_strict](api/config/auto_scheduling_strict.md)
- [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md)

**통합 객체로의 deprecated 구성의 매핑**

- `gantt.config.auto_scheduling_initial` -> `schedule_on_parse`
- `gantt.config.auto_scheduling_descendant_links` -> `descendant_links`
- `gantt.config.auto_scheduling_move_projects` -> `move_projects`
- `gantt.config.auto_scheduling_project_constraint` -> `project_constraint`
- `gantt.config.auto_scheduling_use_progress` -> `use_progress`
- `gantt.config.auto_scheduling_compatibility = true` -> `apply_constraints: false`
- `gantt.config.auto_scheduling_compatibility = false` -> `apply_constraints: true`
- `gantt.config.auto_scheduling_strict = true` -> `gap_behavior: "compress"`
- `gantt.config.auto_scheduling_strict = false` -> `gap_behavior: "preserve"`

### 더 이상 사용되지 않는 **subscales** 구성 옵션은 삭제되었습니다 {#subscales}

참고로 **subscales** 구성 옵션은 [v6.2에서 deprecated로 표시되었음](#timescalesettings)이었으며 v9.1에서 삭제되었습니다.

## 8.0 -> 9.0

v9.0 업데이트는 몇 가지Breaking Changes(호환성 깨지는 변경사항)를 도입합니다.

### 스킨이 CSS 변수로 전환

CSS 스킨(테마)은 완전히 재구성되었고 이제 CSS 변수를 사용합니다. 컴포넌트의 HTML 구조와 CSS 클래스 이름은 대체로 유지되었지만, 이전 버전의 Gantt에 대해 작성된 CSS 스타일은 v9.0에서 의도한 대로 작동하지 않을 수 있습니다.

예를 들어, 우선순위에 따라 작업의 색상을 지정하던 아래 스타일은:

~~~html
<style>
    /* 공통: 경계/진행 색상 재정의용 스타일 */
    .gantt_task_line{
        border-color: rgba(0, 0, 0, 0.25);
    }
    .gantt_task_line .gantt_task_progress {
        background-color: rgba(0, 0, 0, 0.25);
    }

    /* 높음 우선순위 */
    .gantt_task_line.high {
        background-color: #03A9F4;
    }
    .gantt_task_line.high .gantt_task_content {
        color: #fff;
    }

    /* 중간 우선순위 */
    .gantt_task_line.medium {
        background-color: #f57730;
    }
    .gantt_task_line.medium .gantt_task_content {
        color: #fff;
    }

    /* 낮음 우선순위 */
    .gantt_task_line.low {
        background-color: #e157de;
    }
    .gantt_task_line.low .gantt_task_content {
        color: #fff;
    }
</style>
~~~

v9.0부터는 동일한 효과를 아래 스타일로 얻을 수 있습니다:

~~~html
<style>
    /* 높음 */
    .gantt_task_line.high {
        --dhx-gantt-task-background: #d96c49;
        --dhx-gantt-task-color: #fff;
    }

    /* 중간 */
    .gantt_task_line.medium {
        --dhx-gantt-task-background: #f57730;
        --dhx-gantt-task-color: #fff;
    }

    /* 낮음 */
    .gantt_task_line.low {
        --dhx-gantt-task-background: #fff;
        --dhx-gantt-task-color: #fff;
    }
</style>
~~~

[guides/custom-skins.md](guides/custom-skins.md) 페이지에서 사용 가능한 변수들을 확인하십시오.

:::note
Migration으로 인해 필요한 디자인을 얻기 위해 기존 CSS를 업데이트해야 할 수 있습니다.
:::

### 단일 CSS 파일

모든 테마가 이제 단일 **dhtmlxgantt.css** 파일에 포함됩니다.

특정 스킨을 활성화하려면 `gantt.skin` 속성을 사용하십시오:

~~~js
gantt.skin = "material";
~~~

또는 [](api/method/setskin.md) 메서드를 사용할 수도 있습니다:

~~~js
gantt.setSkin("material");
~~~

:::note
참고로 `gantt.setSkin()`은 Gantt를 다시 렌더링합니다.
:::

다음과 같이 Terrace(테라스) 이외의 스킨을 사용하는 경우, 아래의 마이그레이션 단계를 따라야 합니다:

1) 스킨의 CSS 파일을 `dhtmlxgantt.css` 파일로 교체합니다:

~~~html
<!-- OLD -->
<link rel="stylesheet" href="./codebase/dhtmlxgantt_material.css" type="text/css">
<!-- NEW -->
<link rel="stylesheet" href="./codebase/dhtmlxgantt.css" type="text/css">
~~~

2) 자바스크립트에서 필요한 스킨을 활성화합니다:

~~~js
gantt.setSkin("material");
gantt.init("gantt_here");
~~~

### 기준선, 마감일 및 제약 조건에 대한 내장 지원

이전에는 기본선 추가가 `gantt.addTaskLayer` API를 사용한 수동 코딩이 필요했습니다. Gantt 9.0부터는 기준선 엔터티를 마감일 및 작업 제약 조건과 함께 내장 지원합니다. 

기본 설정을 끄고 기준선과 마감일을 수동으로 렌더링하려면, 해당 구성 옵션을 사용하십시오: [](api/config/baselines.md) 및 [](api/config/deadlines.md):

~~~js
// 내장 기준선 기능 비활성화
gantt.config.baselines = false;

// 내장 마감일 기능 비활성화
gantt.config.deadlines = false;
~~~

작업 제약 조건의 기본 표시도 확장된 [](api/config/auto_scheduling.md) 구성으로 비활성화할 수 있습니다:

~~~js
gantt.config.auto_scheduling = {
  enabled: true, 
  show_constraints: false /*!*/
};
~~~

이 설정은 자동 스케줄링 기능은 활성화된 상태로 두면서 기본 표시의 작업 제약 조건만 비활성화합니다.

### 타임라인의 고정 레이블

v9.0부터 시간 축 라벨은 기본적으로 고정(sticky)되어 있습니다. 이는 스크롤 시 라벨이 화면에 계속 보이며 뷰포트를 따라가다가 자연스럽게 화면 밖으로 사라질 때까지 남아 있음을 의미합니다. 이전 버전에서는 라벨이 셀 안에 가운데에 배치되어 스크롤 중에도 고정되지 않았습니다.

오래된 동작으로 되돌려 고정 라벨을 비활성화하려면, [스케일](guides/configuring-time-scale.md) 객체의 `sticky` 속성을 false로 설정하십시오:

~~~js
gantt.config.scales = [
  {unit: "year", step: 1, format: "%Y", sticky: false},
  {unit: "month", step: 1, format: "%F", sticky: false},
  {unit: "day", step:1, format: "%j", sticky: false}
];
~~~

### Promise 구현

**Bluebird** 라이브러리는 Gantt 번들에서 제외되었습니다. [](api/method/promise.md)는 이제 네이티브 Promise 구현을 사용합니다.

### Lightbox 크기 조정

v9.0부터 [](api/method/resizelightbox.md) 메서드는 더 이상 사용되지 않으며 Gantt 코드에서 제거되었습니다. 이제 라이트박스 크기 조정이 자동으로 작동하기 때문입니다. 구성에 **resizeLightbox()** 메서드가 있다면 오류를 피하기 위해 제거해야 합니다.

## 7.1 -> 8.0

### 리소스 할당

이전 버전의 DHTMLX Gantt에서는 리소스 할당의 변경 사항이 작업 객체의 속성으로 백엔드로 전송되었기 때문에 백엔드 API와의 연동이 더 어렵게 느껴지는 경우가 있었습니다.

DHTMLX Gantt v8.0부터는 리소스 및 리소스 할당의 변경 사항을 dataProcessor를 통해 라우팅할 수 있습니다. [리소스 및 리소스 할당의 CRUD 라우팅](guides/server-side.md#resources_crud) 섹션을 확인하십시오.

### Export 서비스

v8.0부터 가져오기/내보내기 기능이 gantt 라이브러리에 포함되었습니다. 예를 들어 온라인 내보내기 서비스를 활성화하기 위해 페이지에 이미 아래 파일들을 포함했다면:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~

그렇다면 파일을 제거하고 **export_api** 확장을 **gantt.plugins** 메서드를 사용해 활성화해야 합니다:

~~~js
gantt.plugins({
    export_api: true
});
~~~

### 더 이상 사용되지 않는 클래스 이름

v8.0부터 더 이상 사용되지 않는 클래스 이름들이 제거되고 새로운 이름으로 대체되었습니다:

- ".dhtmlx-info" -> **".gantt-info"**
- ".dhtmlx-error" -> **".gantt-info"**
- ".dhtmlx_popup_title" -> **".gantt_popup_title"**
- ".dhtmlx_popup_text" -> **".gantt_popup_text"**
- ".dhtmlx_popup_controls" -> **".gantt_popup_controls"**
- ".dhtmlx_ok_button" -> **".gantt_ok_button"**
- ".dhtmlx_click_me_button" -> **".gantt_click_me_button"**
- ".dhtmlx_popup_button" -> **".gantt_popup_button"**
- ".dhtmlx_modal_box" -> **".gantt_modal_box"**
- ".dhtmlx-" + config.type -> **".gantt-" + config.type**
- ".dhtmlx_" + btn.label.toLowerCase() + "_button" -> **".gantt_" + btn.label.toLowerCase() + "_button"**

## 7.0 -> 7.1

버전 7.1은 코드 수정이 필요할 만큼의 Breaking Changes를 도입하지 않습니다.

작은 시각적 변화가 있으며, 필요하다면 코드로 이전 상태로 되돌릴 수 있습니다. 또한 리소스 패널을 사용하는 대형 프로젝트는 새로운 리소스 할당 로직으로 인해 성능 저하가 발생할 수 있는데, 필요하지 않은 로직을 비활성화하여 이를 완화할 수 있습니다.

### 마일스톤

마일스톤 요소의 크기가 이전 버전과 다르게 렌더링되도록 변경되었습니다. 이전 버전과 동일하게 보이길 원한다면, 마일스톤 요소의 높이를 `bar_height` 속성으로 조정할 수 있습니다:

~~~js
{
    id:23, text:"Mediate milestone", start_date:"13-04-2018", 
    type:"milestone", parent:"15", bar_height: 35
}
~~~

### 리소스 할당

버전 7.1은 리소스 할당에 복잡한 로직을 추가합니다. 리소스 할당의 날짜를 지정하고 DataStore를 통해 리소스 할당을 다루는 방식이 도입됩니다. 이는 기존 코드에 영향을 주지 않더라도 리소스 계산의 성능(퍼포먼스)에 영향을 줄 수 있습니다.

특정 날짜에 리소스를 할당할 필요가 없다면, 성능 향상을 위해 새로운 기능을 비활성화할 수 있습니다:

~~~js
gantt.config.process_resource_assignments = false;
~~~

### 태스크 객체의 새로운 선택적 속성

태스크 객체의 다음 속성들은 이제 가antt에서 처리되며 태스크의 표시를 좌우합니다:

- "task.row_height"
- "task.bar_height"
- "task.hide_bar"
- "task.rollup"
  
동일한 이름의 커스텀 속성이 있다면 충돌을 피하기 위해 이름을 바꾸는 것이 좋습니다.

### 데이터 구문 분석의 깊은 복사

Gantt는 v6.3.2(whats-new.md#632)에서 v7.1까지 데이터 구문 분석 시 객체를 깊은 복사(deep copy)했습니다.

v7.1부터 이 기능은 기본적으로 비활성화됩니다. 예전 동작으로 되돌리려면 [gantt.config.deepcopy_on_parse](api/config/deepcopy_on_parse.md)을 true로 설정하십시오:

~~~js
gantt.config.deepcopy_on_parse = true;
~~~

### Deprecatd config

**gantt.config.task_height** 속성은 v7.1부터 deprecated되었습니다. 속성이 계속 작동하긴 하지만, 새로 권장되는 옵션인 [gantt.config.bar_height](api/config/bar_height.md)으로 사용하는 것이 좋습니다:

~~~js
gantt.config.bar_height = 50;
~~~


## 6.3 -> 7.0

### Extensions and locale files

가장 최신 업데이트인 v7.0은 Gantt 패키지 구조에 두 가지 주요 변화를 도입합니다:

1) 확장(ext) 파일들은 이제 모두 *dhtmlxgantt.js* 파일에 번들로 묶여 있습니다. 따라서 dhtmlxGantt이 제공하는 추가 확장을 활성화하려면 API 호출을 사용해야 합니다.

- 페이지에 빌트인 패키지의 확장 파일을 이미 포함한 경우, 예를 들면:

~~~js
<script src="../codebase/dhtmlxgantt.js"></script>
<script src="../codebase/ext/dhtmlxgantt_auto_scheduling.js"></script>
~~~

또는

~~~js
import "dhtmlx-gantt";
import "dhtmlx-gantt/ext/dhtmlxgantt_auto_scheduling";
~~~

그런 경우 확장 파일을 제거하고 `gantt.plugins` 메서드를 사용해 확장을 활성화해야 합니다:

~~~js
gantt.plugins({
   auto_scheduling: true
});
~~~

전체 확장 목록은 [여기](guides/extensions-list.md)를 확인하십시오.

- 확장 파일의 수정 버전을 사용하거나 커스텀 확장을 개발했다면, 페이지에 파일로 포함시키면 작동합니다. 

- 또한 **dhtmlxgantt_smart_rendering.js** 및 **dhtmlxgantt_csp.js** 확장은 완전히 제거되었으며 수동으로 활성화할 필요가 없습니다.


2) 모든 로케일(locale)은 이제 *dhtmlxgantt.js* 파일에 포함됩니다. 이를 활성화하려면 API 호출을 사용하십시오.

- 페이지에 로케일을 포함했다면 페이지에서 제거하고 필요한 로케일을 `gantt.i18n.setLocale`으로 활성화해야 합니다:

~~~js
gantt.i18n.setLocale("de");
~~~

- 사용자 정의 로케일 파일을 사용하는 경우에는 기존처럼 로드하면 됩니다.

### 작업 시간의 기본 설정이 변경

버전 7.0 이전에는 기본 근무 시간이 8:00에서 17:00까지로 1일 9시간이었습니다.

7.0 이후로는 근무 시간이 8:00-12:00, 13:00-17:00로 바뀌어 하루 8시간이 됩니다.

이전 설정으로 되돌리고 싶다면 수동으로 설정해야 합니다:

~~~js
gantt.setWorkTime({hours: [8, 17]});
~~~

### 콘텐츠 보안 정책

**ext/dhtmlxgantt_csp.js** 확장은 더 이상 필요하지 않으며 제거되었고 기본으로 활성화된 [csp 구성](api/config/csp.md)으로 대체됩니다; 확장은 gantt에서 제거되어야 합니다.

또한, dhtmlxGantt 라이브러리에 **csp** 속성이 추가되어 HTML5 도큐먼트 타입을 지원하는 모든 브라우저에서 Gantt의 모든 요소에 사용할 수 있는 유효한 HTML5 속성이 부여됩니다.

따라서 기존의 속성을 새 속성으로 업데이트하는 것을 권장합니다:

- "task_id" -> ["data-task-id"](api/config/task_attribute.md)
- "link_id" -> ["data-link-id"](api/config/link_attribute.md)
- "resource_id" -> ["data-resource-id"](api/config/resource_attribute.md)
- "column_index" -> ["data-column-index"](api/config/grid_resizer_column_attribute.md)

다만, markup에 예전 속성이 남아 있어도 작동은 계속됩니다.

### 그리드 셀 Styling

이전에는 그리드 셀의 정렬이 `display:inline-block`으로 구현되었습니다. 7.0부터는 대신 `display:flex`가 사용되며 셀은 플렉스 컨테이너 안에 배치됩니다.

이 변경은 사용자에게 보이는 UI에 영향을 주지 않으며(모양은 100% 동일) 마이그레이션 문제를 일으키지 않아야 합니다. 다만 이 업데이트로 인해 그리드 셀 스타일링에 일부 회귀 문제가 발생할 수 있습니다.

### "xml_date" 구성 및 템플릿, 그리고 "xml_format" 템플릿이 제거됨

이전 버전(v6.2)에서 Deprecated로 표시되었던 구성 및 템플릿은 v7.0에서 제거되었고, 새로운 것들로 대체되었습니다:

- gantt.config.xml_date →  [gantt.config.date_format](api/config/date_format.md)
- gantt.templates.xml_date → [gantt.templates.parse_date](api/template/parse_date.md)
- gantt.templates.xml_format → [gantt.templates.format_date](api/template/format_date.md)

이미 코드에서 예전 이름들을 정의하고 있었다면 계속 작동합니다. 그렇지 않으면 API의 새로운 버전을 사용하십시오.

## 6.2 -> 6.3

### 다중 선택(multi-task) 및 Ext

v6.3부터 ext/dhtmlxgantt_multiselect.js 확장은 자동으로 여러 작업을 가로로 드래그하여 선택되도록 허용합니다. 이 기능을 비활성화하려면 [drag_multiple](api/config/drag_multiple.md) 속성을 사용하고 false로 설정하십시오(기본값은 활성화).

~~~js
gantt.config.drag_multiple = false;
~~~

### Material 스킨에 Google Roboto 폰트 더 이상 포함되지 않음

v6.3까지 Google의 Roboto 폰트는 Material 스킨에 import로 포함되어 있었습니다. v6.3부터 이 임포트가 제거되었으므로 Roboto 폰트를 수동으로 추가해야 합니다:

~~~html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family="Open+Sans|Roboto:regular,medium,thin,bold"">
~~~

### Require.JS와의 사용

이전에는 RequireJS 기반 앱에 dhtmlxGantt 라이브러리의 서로 다른 파일 이름을 자유롭게 사용할 수 있었습니다:

~~~js
requirejs.config({
  paths: {
    "gantt": "../../codebase/dhtmlxgantt",
    "tooltip": "../../codebase/ext/dhtmlxgantt_tooltip",
    "marker": "../../codebase/ext/dhtmlxgantt_marker",
    "locale_de": "../../codebase/locale/locale_de",
  },
  shim: {
    "tooltip": ["gantt"],
    "marker": ["gantt"],
    "locale_de": ["gantt"],
  }
});
requirejs(["gantt", "tooltip", "marker", "locale_de"],
function (dhx) {
  var gantt = dhx.gantt;
 ...
});
~~~

6.3 버전부터 모듈 이름은 dhtmlxGantt 라이브러리의 폴더 구조에 따라 고정되어야 합니다:

~~~js
requirejs.config({
  paths: {
    "dhtmlxgantt": "../../codebase/dhtmlxgantt",
    "ext/dhtmlxgantt_tooltip": "../../codebase/ext/dhtmlxgantt_tooltip",
    "ext/dhtmlxgantt_critical_path": "../../codebase/ext/dhtmlxgantt_critical_path",
    "locale/locale_de": "../../codebase/locale/locale_de",
  },
  shim: {
    "ext/dhtmlxgantt_tooltip": ["dhtmlxgantt"],
    "ext/dhtmlxgantt_critical_path": ["dhtmlxgantt"],
    "locale/locale_de": ["dhtmlxgantt"],
  }
});
 
requirejs(["dhtmlxgantt", "ext/dhtmlxgantt_tooltip", "ext/dhtmlxgantt_critical_path", 
            "locale/locale_de"], 
function (dhx) {
  var gantt = dhx.gantt;
...
});
~~~

패키지 내부의 파일에 대한 모듈 이름은 반드시 *codebase 폴더 내 상대 경로*와 *파일 이름*으로 지정되어야 합니다. 예를 들면:

- 기본 라이브러리: `"dhtmlxgantt": "./vendor/dhtmlxgantt/dhtmlxgantt"`

- 확장(ext):

  - `"ext/dhtmlxgantt_critical_path": "./vendor/dhtmlxgantt/ext/dhtmlxgantt_critical_path"`
  - `"ext/dhtmlxgantt_tooltip": "./vendor/dhtmlxgantt/ext/dhtmlxgantt_tooltip"`

- 로케일:

  - `"locale/locale_de": "./vendor/dhtmlxgantt/locale/locale_de"`
  - `"locale/locale_be": "./vendor/dhtmlxgantt/locale/locale_be"`

### Inline Editors {#inline_editors}

버전 6.3 이전에는 날짜(date) 인라인 편집기의 최소/최대 값이 타임라인의 보여지는 날짜에 의해 제한되었습니다. 6.3부터 기본 최소/최대 값에 대한 제한이 없어졌습니다.

이전 동작을 복원하려면 동적의 최소/최대 값을 지정할 수 있습니다:

~~~js
const dateEditor = {type: "date", map_to: "start_date", 
  min: function(taskId){
    return gantt.getState().min_date
  },
  max: function( taskId ){
    return gantt.getState().max_date
  }
};
~~~

## 6.1 -> 6.2

6.2로의 업데이트는 일반적으로 6.1과 호환되며 코드 변경이 필요하지 않아야 합니다. 다만 컴포넌트의 일부 동작은 변경되었고(API는 더 이상 사용되거나 deprecated된 것들도 있음), 일부 API는 더 이상 사용되지 않습니다.

### 스마트 렌더링 및 정적 배경

스마트 렌더링 기능은 컴포넌트에 내장되었으며 이제 메인 타임라인 영역과 리소스 패널 모두에서 작동합니다. 이제 모든 타임라인은 현재 보이는 행과 셀만 렌더링합니다.

스마트 렌더링은 구성에서 `smart_rendering`으로 비활성화할 수 있으며, 이렇게 하면 Gantt가 v6.1의 기본 동작으로 돌아갑니다:

~~~js
gantt.config.smart_rendering = false;
~~~

또한 **dhtmlxgantt_smart_rendering** 확장은 더 이상 필요하지 않으며 gantt에서 제거되어야 합니다. 확장은 호환성 문제의 경우 패키지에 남아 있을 수 있습니다. 페이지에 확장이 추가되어 있으면 gantt는 v6.1의 스마트 렌더링 모드로 되돌아갑니다.

또한 **static_background** 구성의 동작도 업데이트되었습니다. v6.2부터 이 구성은 PNG 배경 이미지와 CSS 클래스가 템플릿 함수로 연결된 모든 셀을 렌더링합니다.

v6.1의 동작으로 되돌리려면 **static_background_cells** 구성을 사용하십시오:

~~~js
gantt.config.static_background_cells = false;
~~~

### 시간 축 설정(timescalesettings)

시간 축 구성은 단순화되었습니다. 각 축에 대해 개별 스케일 설정을 나열하는 대신 이제 하나의 구성 옵션 [](api/config/scales.md)으로 여러 스케일 객체를 담아 설정합니다.

따라서 다음의 API 중 일부는 deprecated되었습니다:

- gantt.config.scale_unit
- gantt.config.step
- gantt.config.date_scale
- gantt.templates.date_scale
- gantt.config.subscales

다음 코드가 예시입니다:

~~~js
gantt.config.scale_unit = "day"; 
gantt.config.step = 1; 
gantt.config.date_scale = "%d %M"; 
gantt.templates.date_scale = null; 
gantt.config.subscales = [];
~~~

현재는 이렇게 보입니다:

~~~js
gantt.config.scales = [ { unit:"day", step: 1, format: "%d %M"} ];
~~~

#### task_cell_class 템플릿의 이름이 바뀜

셀의 CSS 클래스를 정의하는 템플릿의 이름이 아래와 같이 바뀌었습니다:

- gantt.templates.task_cell_class → [gantt.templates.timeline_cell_class](api/template/timeline_cell_class.md)

이름이 바뀐 템플릿의 사용 예시는 아래와 같습니다:

~~~js
<style>
.weekend{ background: #f4f7f4 !important;}
</style>
 
gantt.templates.timeline_cell_class = function(task,date){
    if(date.getDay()==0||date.getDay()==6){
        return "weekend";
    }
};
~~~

### "xml_date" 구성 및 템플릿, 그리고 "xml_format" 템플릿의 이름이 바뀜

이전에 사용하던 API를 바꾸는 매핑은 아래의 방식으로 대체됩니다:

- gantt.config.xml_date →  [gantt.config.date_format](api/config/date_format.md)
- gantt.templates.xml_date → [gantt.templates.parse_date](api/template/parse_date.md)
- gantt.templates.xml_format → [gantt.templates.format_date](api/template/format_date.md)

v6.2 이후 기본값은 정의되지 않았습니다. 따라서 값이 설정되어 있지 않은 경우 작동하지 않을 수 있습니다.

다만, 기존 코드에서 이 API들을 다시 정의했다면 기존처럼 작동합니다. 예를 들면:

~~~js
// 정상 작동
gantt.templates.xml_date = function(datestring){
    return new Date(datestring);
};
~~~

### 사용되지 않는 API 제거

gantt.config.api_date 구성과 gantt.templates.api_date 템플릿은 API에서 제거되었습니다. 코드에서 사용 중이었다면 다시 선언해야 합니다.

~~~js
gantt.config.api_date = "%d-%m-%Y %H:%i";
gantt.templates.api_date = gantt.date.date_to_str(gantt.config.api_date);
~~~

## 6.0 -> 6.1

### 시간 제약 및 자동 스케줄링

**dhtmlxgantt_auto_scheduling.js** 확장은 작업 제약 시간의 기능을 추가합니다. 이 기능은 자동 스케줄링의 기본 동작을 변경하기 때문에, 이전 동작으로 되돌릴 수 있는 호환 모드가 필요합니다. 호환 모드로 들어가려면 다음 구성을 사용합니다:

~~~js
gantt.config.auto_scheduling_compatibility = true;
~~~

### 도구 팁 표시 영역

6.1 이전에는 도구 팁(tooltips)이 타임라인 영역 안에서만 표시되었습니다. 6.1 릴리스 이후 도구 팁의 표시가 제한 없이 움직임을 따라가며 마우스 포인터의 이동을 따라가게 됩니다.

필요하다면 Gantt 초기화 전에 아래 코드를 사용하여 이전 동작을 복원할 수 있습니다:

~~~js
gantt.attachEvent("onGanttReady", function(){
    var tooltips = gantt.ext.tooltips;
     tooltips.tooltip.setViewport(gantt.$task_data);
});

gantt.init("gantt_here");
gantt.parse(demo_tasks);
~~~

## 5.2 -> 6.0

버전 6.0에서는 getSlack() 메서드가 deprecated되었습니다. 대신 두 가지 메서드가 추가되었습니다:

- [getfreeslack.md](api/method/getfreeslack.md) - 작업의 여유 여유 Slack 반환
- [gettotalslack.md](api/method/gettotalslack.md) - 작업의 총 Slack 반환

6.0에서 더 이상 작동하지 않는 메서드들은 v4.x에서 중단되었습니다. *dhtmlx* 객체 정의는 *dhtmlxgantt.js*에서 제거되었습니다.

아래 표는 deprecated 메서드의 예시 목록입니다:

<table class="my_table">

<tr><td class="version_info">Up to version 4.x</td><td class="version_info">From version 4.0</td></tr>

<tr><td>dhtmlx.alert</td><td>gantt.alert</td></tr>
<tr><td>dhtmlx.confirm</td><td>gantt.confirm</td></tr>
<tr><td>dhtmlx.modalbox</td><td>gantt.modalbox</td></tr>
<tr><td>dhtmlx.uid</td><td>gantt.uid</td></tr>
<tr><td>dhtmlx.copy</td><td>gantt.copy</td></tr>
<tr><td>dhtmlx.mixin</td><td>gantt.mixin</td></tr>
<tr><td>dhtmlx.defined</td><td>gantt.defined</td></tr>
<tr><td>dhtmlx.bind</td><td>gantt.bind</td></tr>
<tr><td>dhtmlx.assert</td><td>gantt.assert</td></tr>
<tr><td>window.dataProcessor</td><td>gantt.dataProcessor</td></tr>
</table>


## 3.x -> 4.0

Version 4.0은 공개 API에 몇 가지 변경사항을 도입합니다. 즉:

- 레거시 모듈과 dhtmlxSuite 모듈과 교차하는 모듈은 더 이상 dhtmlxGantt 라이브러리에 의해 정의되지 않습니다.
- 일반적으로 사용되던 모듈들(예: dhtmlxMessage, dataProcessor, Ajax)은 window.gantt 네임스페이스로 이동되었고 dhtmlxGantt의 공개 API의 일부가 되었습니다.

v4.x에는 구 API로의 폴백이 포함되어 있어 v3.3 이하용으로 작성된 코드는 계속 작동합니다. 다만 경우에 따라 변경이 필요합니다.
일반적으로 전역 선언 중에서 window.gantt 및 window.Gantt(기업 버전만 해당)를 제외한 모든 선언은 deprecated되며 5.0 버전에서 제거될 예정입니다.

### Deprecated API

여전히 사용 중인 메서드가 있다면 업데이트가 필요합니다. v4.x에서는 계속 작동하지만 호출 시 콘솔 경고가 발생합니다(최종 사용자는 볼 수 없음).

개요:

- dhtmlxMessage 모듈은 window.dhtmlx에서 window.gantt로 이동했습니다. Message Boxes에 대한 자세한 내용은 [여기](guides/message-boxes.md)를 참조하십시오
- dhtmlxDataProcessor 생성자는 window.dataProcessor에서 window.gantt.dataProcessor로 이동했습니다
- dhtmlx.copy, dhtmlx.uid, dhtmlx.mixin 같은 유틸리티 메서드가 window.gantt 객체로 이동했습니다

이 메서드를 사용하더라도 v4.0 업데이트 후 애플리케이션은 추가 코드 변경 없이 계속 작동합니다. 향후에는 더 새 API 버전으로의 업데이트를 권장합니다.

Deprecated 메서드의 전체 목록은 아래와 같습니다:

<table class="my_table">

<tr><td class="version_info">Up to version 3.3</td><td class="version_info">From version 4.0</td></tr>

<tr><td>dhtmlx.alert</td><td>gantt.alert</td></tr>
<tr><td>dhtmlx.confirm</td><td>gantt.confirm</td></tr>
<tr><td>dhtmlx.modalbox</td><td>gantt.modalbox</td></tr>
<tr><td>dhtmlx.uid</td><td>gantt.uid</td></tr>
<tr><td>dhtmlx.copy</td><td>gantt.copy</td></tr>
<tr><td>dhtmlx.mixin</td><td>gantt.mixin</td></tr>
<tr><td>dhtmlx.defined</td><td>gantt.defined</td></tr>
<tr><td>dhtmlx.bind</td><td>gantt.bind</td></tr>
<tr><td>dhtmlx.assert</td><td>gantt.assert</td></tr>
<tr><td>window.dataProcessor</td><td>gantt.dataProcessor</td></tr>
</table>


## 2.0 -> 3.0

1) CSS 충돌 방지를 위해 dhtmlxScheduler와 함께 사용되던 클래스명이 일부 변경되었습니다(모두 Lightbox 관련). Lightbox의 스타일이 커스텀된 경우 적절한 CSS 클래스로의 이름 변경이 필요합니다.

두 가지 renamed 패턴이 있습니다:

- Replace <b>'.dhx_gantt_'</b> → <b>'.gantt_'</b> (.dhx_gantt_duration → .gantt_duration)
- Replace <b>'.dhx_'</b> 접두사 → <b>'.gantt_'</b> (.dhx_custom_button → .gantt_custom_button)

*CSS 클래스를 마이그레이션하는 데 어려움이 있다면, renamed classes의 전체 목록은 [여기](guides/migrating-renamedcss.md)를 참조하십시오)*.

2) 기본 설정의 변경

~~~js
gantt.config.buttons_left = [
        "dhx_save_btn",
        "dhx_cancel_btn"
];
gantt.config.buttons_right = [
        "dhx_delete_btn"
],

-->

gantt.config.buttons_left = [
        "gantt_save_btn",
        "gantt_cancel_btn"
];
gantt.config.buttons_right = [
        "gantt_delete_btn"
];
~~~

이전 구성("dhx_save_btn", "dhx_cancel_btn", "gantt_delete_btn")도 여전히 작동합니다. 변경으로 인해 기존 동작이 깨지진 않습니다.

3) 컴mercial 또는 Enterprise 버전에서만 사용할 수 있는 기능들

- 주 단위, 월간 뷰에서의 요일 숨김 기능
- 프로젝트, 마일스톤 및 기타 커스텀 타입

## 1.0 -> 2.0

1) 다양한 객체들(**GanttProjectInfo**, **GanttTaskInfo**, **GanttChart**, **GanttProject**, **GanttTask**)이 단일 정적 객체 - **gantt**로 대체되었습니다.

- 이 gannT 객체에는 여러 메서드와 2개의 주요 속성: [config](api/overview/properties-overview.md) 및 [templates](api/overview/templates-overview.md)가 포함됩니다.
- [gantt.config](api/overview/properties-overview.md) - 날짜, 스케일, 제어 등 구성 옵션
- [gantt.templates](api/overview/templates-overview.md) - Gantt 차트에서 날짜 및 레이블 형식화 템플릿

2) dhtmlxGantt는 [](api/method/init.md) 메서드를 통해 초기화됩니다

  <code> var gantt = new GanttChart()</code> → <code>gantt.init("gantt_div")</code>.

3) GanttProject 및 GanttTask 대신, 데이터는 아래 정의된 일반 객체 배열로 저장됩니다: [필수 속성과 커스텀 속성을 포함하는 평범한 객체 배열]

~~~js
{
    data:[
        {id:1, text:"Project #2", start_date:"01-04-2013", duration:18,
    progress:0.4, open: true},
        {id:2, text:"Task #1",    start_date:"02-04-2013", duration:8,
    progress:0.6, parent:1},
        {id:3, text:"Task #2",    start_date:"11-04-2013", duration:8,
    progress:0.6, parent:1}
    ],
    links:[
        { id:1, source:1, target:2, type:"1"},
        { id:2, source:2, target:3, type:"0"},
        { id:3, source:3, target:4, type:"0"},
        { id:4, source:2, target:5, type:"2"},
  ]
}
~~~

4) [XML 형식](guides/supported-data-formats.md#xmldhtmlxgantt20)이 변경되었지만, [구 XML 형식](guides/supported-data-formats.md#xmldhtmlxganttlt20)은 여전히 로드될 수 있습니다.

~~~js
gantt.load("tasks.xml","oldxml");
~~~

관련 예시: [Loading data in Gantt 1.6 format](https://docs.dhtmlx.com/gantt/samples/01_initialization/09_backward_compatibility.html)

5) 디자인-타임 객체들:

- **<i>GanttProjectInfo</i>** 객체의 메서드는 다음으로 대체되었습니다:
  - addTask  -> [gantt.addTask()](api/method/addtask.md)
  - deleteTask  ->  [gantt.deleteTask()](api/method/deletetask.md)
  - getTaskById  -> [gantt.getTask()](api/method/gettask.md)
- **<i>GanttTaskInfo</i>** 객체의 메서드는 다음으로 대체되었습니다:
  - addChildTask -> [gantt.addTask()](api/method/addtask.md) (task 객체의 "parent" 속성이 해당 태스크의 부모를 설정)

6) 런타임 객체들:

dhtmlxGantt 2.0은 프로젝트와 태스크 객체에 대해 다른 타입을 사용하지 않습니다. 대신 어떤 태스크 객체도 1개의 부모 객체와 다수의 자식 태스크를 가질 수 있습니다.

- **<i>GanttProject</i>** 
  - getDuration(), getId(), getName(), getPercentCompleted(), getStartDate() 등 대신 gantt.getTask(projectTaskId).(name_of_property)로 속성에 접근합니다.
- **<i>GanttTask</i>** 
  - getDuration(), getId(), getName(), getParentTaskId(), getPercentCompleted(), getPredecessorTaskId(), setDuration(, ) 등의 속성에 접근하려면 gantt.getTask(taskId).(name_of_property)를 사용합니다.
  
부모/자식 객체를 얻는 메서드 목록:

- [](api/method/gettask.md)
- [](api/method/haschild.md)
- [](api/method/getchildren.md)

:::note
부모 태스크의 id는 `gantt.getTask(task_id).parent`로 접근 가능합니다. 루트 엘리먼트는 'parent' 속성을 갖지 않습니다.
:::