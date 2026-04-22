---
title: "작업 속성"
sidebar_label: "작업 속성"
---

# 작업 속성

이 페이지에는 작업 객체에 포함될 수 있는 모든 속성의 전체 목록이 있습니다.

링크 객체의 전체 속성 목록은 [Link Properties](guides/link-properties.md) 문서에 나와 있습니다.


## 필수 속성

다음 속성은 항상 클라이언트에서 정의됩니다. Gantt는 데이터 로딩 시 작업 객체에 이 속성들이 지정되기를 기대하지만, 지정되지 않으면 Gantt가 이를 자동으로 추가합니다.
로드된 작업에서 이 속성 중 하나를 제거하면 Gantt는 오류를 발생시키기 시작합니다.

<table>
  <tbody>
  <tr>
  <th>이름</th><th>형식</th><th>설명</th>
  </tr>
  <tr>
  <td><b class="subproperty">id</b></td>
  <td><i>string | number</i></td>
  <td>작업 ID로, 설정되지 않으면 자동으로 생성됩니다</td>
  </tr>
  <tr>
  <td><b class="subproperty">start_date</b></td>
  <td><i>Date</i></td>
  <td>작업이 시작될 예정인 날짜입니다. [데이터 로딩](guides/loading.md#loadingtaskdates) 지정하지 않으면 <b>end_date</b> 및 <b>duration</b> 속성을 기반으로 계산됩니다. <b>unscheduled: true</b>를 설정하면 이 속성은 선택적이 됩니다.</td>
  </tr>
  <tr>
  <td><b class="subproperty">end_date</b></td>
  <td><i>Date</i></td>
  <td>작업이 완료될 예정인 날짜입니다. [데이터 로딩](guides/loading.md#loadingtaskdates) 지정하지 않으면 <b>start_date</b> 및 <b>duration</b> 속성을 기반으로 계산됩니다. <b>unscheduled: true</b>를 설정하면 이 속성은 선택적이 됩니다.</td>
  </tr>
  <tr>
  <td><b class="subproperty">duration</b></td>
  <td><i>number</i></td>
  <td>작업의 지속 시간입니다. [데이터 로딩](guides/loading.md#loadingtaskdates) 지정하지 않으면 <b>start_date</b> 및 <b>end_date</b> 속성을 기반으로 계산됩니다.</td>
  </tr>
  </tbody>
</table>


## 선택적 속성

다음 속성은 정의될 수도 있고 정의되지 않을 수도 있습니다. Gantt의 기본 로직과 템플릿은 이 속성이 정의될 경우 이를 사용합니다.

<table>
  <tbody>
  <tr>
  <th>이름</th><th>형식</th><th>설명</th>
  </tr>
  <tr>
  <td><b class="subproperty">auto_scheduling</b></td>
  <td><i>boolean</i></td>
  <td>작업의 자동 스케줄링을 수행할지 여부를 정의합니다(<i>true</i>이거나 명시되지 않음) 또는 수행하지 않음(<i>false</i>)</td>
  </tr>
  <tr>
  <td><b class="subproperty">bar_height</b></td>
  <td><i>number</i></td>
  <td>타임라인 영역에서 작업의 DOM 요소 높이를 설정합니다</td>
  </tr>
  <tr>
  <td><b class="subproperty">baselines</b></td>
  <td><i>Baseline[]</i></td>
  <td>기준선 배열</td>
  </tr>
  <tr>
  <td><b class="subproperty">calendar_id</b></td>
  <td><i>number | string</i></td>
  <td>작업에 할당될 커스텀 캘린더의 ID를 설정합니다. 이 속성의 이름은 [calendar_property](api/config/calendar_property.md) 옵션의 값에 따라 달라집니다</td>
  </tr>
  <tr>
  <td><b class="subproperty">color</b></td>
  <td><i>string</i></td>
  <td>타임라인 영역에서 작업의 색상을 설정합니다(예: 작업의 <b>gantt_task_line</b> 요소의 <b>background-color</b>를 설정).</td>
  </tr>
  <tr>
  <td><b class="subproperty">constraint_date</b></td>
  <td><i>Date</i></td>
  <td>작업 제약의 날짜입니다. 시간 제약이 있는 자동 일정이 활성화되면 작업 객체에 추가됩니다. <b>auto_scheduling_compatibility</b>가 활성화되면 이 속성은 사용되지 않습니다.</td>
  </tr>
  <tr>
  <td><b class="subproperty">constraint_type</b></td>
  <td><i>string</i></td>
  <td>[작업 제약의 유형 ("asap", "alap", "snet", "snlt", "fnet", "fnlt", "mso", "mfo")](guides/auto-scheduling.md#timeconstraintsfortasks). 시간 제약이 있는 자동 일정이 활성화되면 이 속성이 작업 객체에 추가됩니다. <b>auto_scheduling_compatibility</b>가 활성화되면 이 속성은 사용되지 않습니다.</td>
  </tr>
  <tr>
  <td><b class="subproperty">deadline</b></td>
  <td><i>Date</i></td>
  <td>작업의 마감 날짜를 지정합니다. 이 속성이 설정되면 타임라인에 시각적 표시가 표시됩니다.</td>
  </tr>
  <tr>
  <td><b class="subproperty">editable</b></td>
  <td><i>boolean</i></td>
  <td>작업이 읽기 전용 Gantt 차트에서 편집 가능한지 여부를 정의합니다. 속성의 이름은 [editable_property](api/config/editable_property.md) 옵션 값에 따라 달라집니다</td>
  </tr>
  <tr>
  <td><b class="subproperty">group_id</b></td>
  <td><i>string | number</i></td>
  <td>그룹의 ID. 그룹화를 위한 속성([relation_property](guides/grouping.md#groupingtasks) in the groupBy() 메서드)이 객체로 지정된 경우, 이 값은 특정 기준으로 그룹화된 작업에 추가됩니다.</td>
  </tr>
  <tr>
  <td><b class="subproperty">hide_bar</b></td>
  <td><i>boolean</i></td>
  <td>타임라인 영역에서 작업(type:"task") 또는 마일스톤(type:"milestone")이 숨겨져야 하는지 여부를 정의합니다</td>
  </tr>
  <tr>
  <td><b class="subproperty">key</b></td>
  <td><i>string | number</i></td>
  <td>그룹의 키. groupBy() 메서드에서 그룹화를 위한 속성이 배열로 지정된 경우, 이 값은 특정 기준으로 그룹화된 작업에 추가됩니다. 또한 그룹 이름으로 된 작업에도 추가됩니다(예: 우선순위로 그룹화한 경우 "High", "Normal", "Low" 같은 이름의 작업에 추가됩니다. 예제 확인).</td>
  </tr>
  <tr>
  <td><b class="subproperty">label</b></td>
  <td><i>string</i></td>
  <td>그룹의 라벨. 그룹의 이름으로 된 작업에 이 속성이 추가됩니다(예: 우선순위로 그룹화한 경우 "High", "Normal", "Low" 이름의 작업에 추가됩니다. 예제 확인).</td>
  </tr>
  <tr>
  <td><b class="subproperty">open</b></td>
  <td><i>boolean</i></td>
  <td>작업 분기가 초기 로드 시 열려 있는지 여부를 지정합니다(자식 작업을 보여주기 위함). Gantt 초기화 후 분기를 닫거나 열려면 관련 메서드: [close()](api/method/close.md) 및 [open()](api/method/open.md)을 사용하십시오.</td>
  </tr>
  <tr>
  <td><b class="subproperty">parent</b></td>
  <td><i>number | string</i></td>
  <td>부모 작업의 ID입니다. 지정된 부모가 존재하지 않으면 Gantt에 렌더링되지 않습니다. 루트 작업의 ID는 구성의 [root_id](api/config/root_id.md)로 지정됩니다.</td>
  </tr>
  <tr>
  <td><b class="subproperty">progress</b></td>
  <td><i>number</i></td>
  <td>작업의 진행률(0에서 1까지)</td>
  </tr>
  <tr>
  <td><b class="subproperty">progressColor</b></td>
  <td><i>string</i></td>
  <td>타임라인 영역에서 작업 진행률의 색상(예: 작업 진행률의 <b>gantt_task_progress</b> 요소의 배경색 설정)</td>
  </tr>
  <tr>
  <td><b class="subproperty">readonly</b></td>
  <td><i>boolean</i></td>
  <td>작업이 현재 [읽기 전용](guides/readonly-mode.md#readonlymodefortheentiregantt)인지 여부를 정의합니다. 속성의 이름은 [readonly_property](api/config/readonly_property.md) 옵션 값에 따라 달라집니다</td>
  </tr>
  <tr>
  <td><b class="subproperty">render</b></td>
  <td><i>string</i></td>
  <td>작업의 하위 작업이 표시되는 방식을 정의합니다. 값: <i>"split" | ""</i>. 예를 들어 ["split"](guides/split-tasks.md)로 설정하면 하위 작업이 한 행에 표시됩니다. 또한 <b>open_split_tasks</b> 속성을 활성화하면 작업이 접혀 있을 때만 하위 작업이 한 행에 렌더링됩니다.</td>
  </tr>
  <tr>
  <td><b class="subproperty">resource</b></td>
  <td><i>Array &lt;string&gt;</i></td>
  <td>작업에 할당된 자원들의 배열입니다. MS Project/Primavera에서 데이터를 가져올 때 작업 객체에 추가됩니다</td>
  </tr>
  <tr>
  <td><b class="subproperty">rollup</b></td>
  <td><i>boolean</i></td>
  <td>작업(type:"task") 또는 마일스톤(type:"milestone")이 상위 프로젝트에 표시되어야 하는지 여부를 정의합니다.</td>
  </tr>
  <tr>
  <td><b class="subproperty">row_height</b></td>
  <td><i>number</i></td>
  <td>작업 행의 높이를 설정합니다</td>
  </tr>
  <tr>
  <td><b class="subproperty">target</b></td>
  <td><i>string</i></td>
  <td>대상 작업의 ID입니다. 이 속성은 <b>$drop_target</b> 속성과 동일한 값을 표시합니다. Data Processor가 활성화된 경우에만 작업 객체에 이 속성이 추가되며 작업이 업데이트되고 서버로 데이터가 전송된 후에 나타납니다.</td>
  </tr>
  <tr>
  <td><b class="subproperty">text</b></td>
  <td><i>any</i></td>
  <td>작업의 이름입니다. 필요에 따라 이 속성에 다른 이름을 사용할 수 있습니다. 이 속성은 Gantt의 다양한 기본 구성에서 사용됩니다.</td>
  </tr>
  <tr>
  <td><b class="subproperty">textColor</b></td>
  <td><i>string</i></td>
  <td>타임라인 영역에서 작업 텍스트의 색상(예: <b>gantt_task_line</b> 요소의 색상 설정)</td>
  </tr>
  <tr>
  <td><b class="subproperty">type</b></td>
  <td><i>string</i></td>
  <td>작업 유형. 사용 가능한 값은 <b>types</b> 객체에 저장되어 있습니다: <ul> <li>["task"](guides/task-types.md#regular-tasks) - 일반 작업(<i>기본값</i>).</li> <li>["project"](guides/task-types.md#project-tasks) - 가장 이른 자식이 시작될 때 시작하고 가장 늦은 자식이 끝날 때 끝나는 작업. 이 경우 <b>start_date</b>, <b>end_date</b>, <b>duration</b> 속성은 무시됩니다.</li> <li>["milestone"](guides/task-types.md#milestones) - 프로젝트의 중요한 날짜를 표시하기 위해 사용되는 제로 지속 시간 작업. 이 경우 <b>duration</b>, <b>progress</b>, <b>end_date</b> 속성은 무시됩니다. </li> </ul></td>
  </tr>
  <tr>
  <td><b class="subproperty">unscheduled</b></td>
  <td><i>boolean</i></td>
  <td>작업이 [unscheduled](guides/unscheduled-tasks.md)여야 하는지 정의합니다. 기본적으로 unscheduled 작업은 타임라인 영역에 표시되지 않고, 시작일과 종료일 대신 격자에 빈 값이 표시됩니다.</td>
  </tr>
  </tbody>
</table>


## 동적 속성

동적 속성은 클라이언트에서 생성되며 작업이나 링크의 현재 상태를 나타냅니다. 이 속성들은 데이터베이스에 저장하지 않아야 하며, JSON/XML에 이 속성들이 명시되어 있으면 Gantt는 이를 무시합니다.


<table>
  <tbody>
  <tr>
  <th>이름</th><th>형식</th><th>설명</th>
  </tr>
  <tr>
  <td><b class="subproperty">[resource_property]</b></td>
  <td><i>string | Array &lt;any&gt;</i></td>
  <td>[resource_property](api/config/resource_property.md) 속성은 다른 이름일 수 있습니다. 이 속성은 <i>resourceGrid/Timeline/Histogram/Calendar</i>에 연결된 자원 ID를 저장합니다.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$auto_end_date</b></td>
  <td><i>Date</i></td>
  <td>하위 작업에서 파생된 프로젝트 작업의 계산된 종료 날짜. <i>auto_scheduling</i>이 비활성화되면 추가 및 갱신됩니다.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$auto_start_date</b></td>
  <td><i>Date</i></td>
  <td>하위 작업에서 파생된 프로젝트 작업의 계산된 시작 날짜. <i>auto_scheduling</i>이 비활성화되면 추가 및 갱신됩니다.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$calculate_duration</b></td>
  <td><i>boolean</i></td>
  <td>내부 계산에 사용되는 시스템 속성입니다.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$custom_data</b></td>
  <td><i>object</i></td>
  <td>[importFromMSProject()](api/method/importfrommsproject.md) 및 [importFromPrimaveraP6()](api/method/importfromprimaverap6.md) 메서드에서 정의된 작업의 사용자 정의 속성을 포함하는 객체</td>
  </tr>
  <tr>
  <td><b class="subproperty">$dataprocessor_class</b></td>
  <td><i>string</i></td>
  <td>작업이 업데이트되었는지 여부를 정의하는 시스템 속성입니다. Data Processor가 활성화될 때 작업 객체에 추가됩니다. 속성 값이 <i>"updated"</i>인 경우 작업의 텍스트가 그리드에서 굵게 표시되지만 CSS를 통해 자체 스타일을 정의할 수 있습니다.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$drop_target</b></td>
  <td><i>string</i></td>
  <td>대상 작업의 ID. 수직으로 작업을 끌어다 놓을 때 작업 객체에 임시로 추가되는 속성입니다.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$effective_calendar</b></td>
  <td><i>string</i></td>
  <td>작업에 할당된 캘린더(또는 자원 캘린더)의 ID. 내부 계산에 사용되는 시스템 속성입니다.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$expanded_branch</b></td>
  <td><i>boolean</i></td>
  <td>작업이 부모가 확장되었는지 여부에 따라 보이는지 여부를 나타내는 시스템 속성입니다. 하나 이상의 부모가 접혀 있으면 작업은 보이지 않습니다. 예외는 분리가 된 작업들뿐입니다.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$has_child</b></td>
  <td><i>boolean</i></td>
  <td>[branch_loading](api/config/branch_loading.md) 속성이 활성화된 경우 서버에 첫 수준 하위 작업 로드를 요청해야 하는지 여부를 정의합니다. 속성 이름은 [branch_loading_property](api/config/branch_loading_property.md) 옵션 값에 따라 달라집니다.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$index</b></td>
  <td><i>number</i></td>
  <td>작업의 글로벌 수직 위치입니다. 아래나 위의 작업들이 열려 있으면 변경됩니다. 작업의 부모가 접혀 있으면 이 값이 실제 위치를 반영하지 않습니다.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$level</b></td>
  <td><i>number</i></td>
  <td>작업 계층 구조에서의 레벨(제로 기반 번호 매김)</td>
  </tr>
  <tr>
  <td><b class="subproperty">$local_index</b></td>
  <td><i>number</i></td>
  <td>브랜치 내의 작업의 수직 위치(부모 아래). 전역적으로 열려 있거나 닫혀 있어도 실제 위치에 바인딩되진 않으며, 부모가 접혀 있어도 실제 위치를 반영하지 않습니다.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$new</b></td>
  <td><i>boolean</i></td>
  <td>[createTask](api/method/createtask.md) 메서드나 "+" 버튼으로 새 작업이 생성될 때 추가됩니다. 라이트박스를 열 때 작업 객체에 추가되며 저장 후 제거됩니다.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$no_end</b></td>
  <td><i>boolean</i></td>
  <td><b>필수</b>, 작업 객체에 추가되는 시스템 속성입니다. <b>end_date</b> 속성을 계산할 수 없을 때(true인 경우 시작 날짜를 계산할 수 없고 시작 날짜가 하위 작업의 끝 날짜에 의존하거나 시작 날짜가 첫 작업의 시작일에 의존하는 경우) 이 경우, 더 이상 end_date를 이동하거나 크기 조정할 수 없습니다. <b>end_date</b> 속성은 하위 작업의 end_date에 의존합니다(하위 작업이 없을 수도 있습니다). <b>start_date</b> 속성은 고정되어 변경되지 않습니다. 이와 같은 작업에 대해 자동 스케줄링은 작동하지 않습니다. 만약 <b>$no_start</b> 속성이 활성화되면 작업은 하위 작업의 날짜나 첫 작업의 날짜에 완전히 의존합니다.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$no_start</b></td>
  <td><i>boolean</i></td>
  <td><b>필수</b>, 작업 객체에 추가되는 시스템 속성입니다. <i>True</i>인 경우 <b>start_date</b> 속성을 계산할 수 없을 때(종료 날짜가 로드되었지만 지속 시간이나 시작 날짜가 없을 때) 시작 날짜가 계산되지 않으며, 하위 작업의 시작 날짜(또는 첫 작업의 시작 날짜)이나 첫 작업의 시작 날짜에 의존합니다. <b>end_date</b> 속성은 고정되어 바뀌지 않습니다. 자동 스케줄링은 이와 같은 작업에 대해 작동하지 않습니다. 만약 <b>$no_end</b> 속성이 활성화되면 작업은 하위 작업의 날짜나 첫 작업의 날짜에 완전히 의존합니다.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$open</b></td>
  <td><i>boolean</i></td>
  <td>작업이 현재 열려 있는지 여부를 나타내는 시스템 속성(<i>true</i>). 속성 값을 변경하고 Gantt를 다시 그리면 작업이 열리거나 닫힙니다. 상태를 변경하려면 [open](api/method/open.md) 또는 [close](api/method/close.md) 메서드를 적용할 수도 있습니다.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$raw</b></td>
  <td><i>object</i></td>
  <td>MS Project(guides/export-msproject.md) / Primavera(guides/export-primavera.md)에서 내보내기 모듈(export module)로 가져온 원래 이름의 속성들로 구성된 객체입니다. 이 속성은 파일이 JSON 형식으로 변환되는 동안에 나타나지만 Gantt가 기대하는 이름과 형식으로 변환되기 전의 시점에 나타납니다.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$rendered_at</b></td>
  <td><i>string | number</i></td>
  <td>[rollup item](guides/milestones.md#rolluptasksandmilestones) / [split](guides/split-tasks.md) 작업이 렌더링된 행의 ID입니다. 페이지에 렌더링될 때만 롤업/스플릿 작업의 객체에 표시되는 임시 속성입니다.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$rendered_parent</b></td>
  <td><i>number | string</i></td>
  <td>작업이 렌더링된 상위의 ID입니다(실제 상위의 ID가 아님). 내부 계산 및 작업 그룹화에 사용됩니다.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$rendered_type</b></td>
  <td><i>string</i></td>
  <td>렌더링된 작업의 유형(임시 속성).</td>
  </tr>
  <tr>
  <td><b class="subproperty">$resourceAssignments</b></td>
  <td><i>Array &lt;any&gt;</i></td>
  <td>작업에 할당된 자원의 ID 배열(임시 속성). 그러나 실제 데이터는 자원 할당 저장소에 저장됩니다.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$rollup</b></td>
  <td><i>Array &lt;string | number&gt;</i></td>
  <td>현재 작업에 나타난 작업 및 마일스톤의 ID 배열</td>
  </tr>
  <tr>
  <td><b class="subproperty">$source</b></td>
  <td><i>Array &lt;string | number&gt;</i></td>
  <td><b>필수</b>, 작업에서 나오는 모든 링크의 ID 배열</td>
  </tr>
  <tr>
  <td><b class="subproperty">$split_subtask</b></td>
  <td><i>boolean</i></td>
  <td>작업이 분할 작업의 하위 작업인 경우에 나타납니다(다른 하위 작업과 한 행으로 배열).</td>
  </tr>
  <tr>
  <td><b class="subproperty">$target</b></td>
  <td><i>Array &lt;string | number&gt;</i></td>
  <td><b>필수</b>, 작업으로 들어오는 링크의 ID 배열</td>
  </tr>
  <tr>
  <td><b class="subproperty">$transparent</b></td>
  <td><i>boolean</i></td>
  <td>수직으로 작업을 드래그할 때 작업 객체에 임시로 추가되는 속성입니다. 이 속성으로 인해 수직 드래그 중 그리드가 약간 투명해 보일 수 있습니다.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$virtual</b></td>
  <td><i>boolean</i></td>
  <td>특정 기준으로 그룹화된 작업에 추가되는 속성입니다. 그룹화가 재설정되면 <b>$virtual: true</b>인 작업은 제거됩니다.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$wbs</b></td>
  <td><i>string</i></td>
  <td>작업의 WBS 코드(임시 속성). getWBSCode 메서드를 적용한 후 작업 객체에 추가됩니다. 코드 값이 변경되면(상위 또는 위치가 바뀌면) 업데이트된 값을 얻으려면 다시 getWBSCode 메서드를 호출해야 합니다.</td>
  </tr>
  </tbody>
</table>

## 예제

~~~js
const data = {
  tasks: [
    { id: 1, text: "Project #1", start_date: "01-04-2025", duration: 18 },
    { id: 2, text: "Task #1", start_date: "02-04-2025", duration: 8, parent: 1 },
    { id: 3, text: "Task #2", start_date: "11-04-2025", duration: 8, parent: 1 }
  ],
  links: []
};
~~~