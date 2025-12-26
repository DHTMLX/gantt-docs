---
title: "Task Properties"
sidebar_label: "Task Properties"
---

# Task Properties 

이 페이지에서는 task 객체에 포함될 수 있는 모든 속성의 전체 목록을 제공합니다.

link 객체의 전체 속성 목록은 [Link Properties](guides/link-properties.md) 문서를 참조하세요.



## 필수 속성

이 속성들은 항상 클라이언트 측에 정의되어 있습니다. Gantt는 데이터를 로드할 때 이 속성들이 task 객체에 존재하기를 기대합니다. 만약 누락된 경우, Gantt가 자동으로 추가합니다. 로드된 task에서 이러한 속성 중 하나라도 제거하면 오류가 발생합니다.

<table>
    <tbody>
        <tr>
            <th>이름</th><th>타입</th><th>설명</th>
        </tr>
        <tr>
            <td><b class="subproperty">id</b></td>
            <td><i>string | number</i></td>
            <td>task의 id입니다. 제공되지 않은 경우 자동 생성됩니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">start_date</b></td>
            <td><i>Date</i></td>
            <td>task의 예정 시작일입니다. [생략되면 end_date와 duration 속성을 기반으로 Gantt가 계산합니다.](guides/loading.md#loadingtaskdates) 이 속성은 <b>unscheduled: true</b>가 설정된 경우 선택 사항이 됩니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">end_date</b></td>
            <td><i>Date</i></td>
            <td>task의 예정 완료일입니다. [생략되면 start_date와 duration 속성을 기반으로 Gantt가 계산합니다.](guides/loading.md#loadingtaskdates) 이 속성은 <b>unscheduled: true</b>가 설정된 경우 선택 사항이 됩니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">duration</b></td>
            <td><i>number</i></td>
            <td>task의 기간입니다. [생략되면 start_date와 end_date 속성을 기반으로 Gantt가 계산합니다.](guides/loading.md#loadingtaskdates)</td>
        </tr>
    </tbody>
</table>



## 선택 속성

이 속성들은 존재할 수도 있고, 없을 수도 있습니다. Gantt의 기본 로직과 템플릿은 이 속성들이 있을 때 이를 활용합니다.

<table>
    <tbody>
        <tr>
            <th>이름</th><th>타입</th><th>설명</th>
        </tr>
        <tr>
            <td><b class="subproperty">auto_scheduling</b></td>
            <td><i>boolean</i></td>
            <td>Gantt가 해당 task에 대해 자동 일정을 수행할지(<i>true</i> 또는 미지정) 여부를 결정합니다. <i>false</i>이면 자동 일정이 적용되지 않습니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">bar_height</b></td>
            <td><i>number</i></td>
            <td>타임라인에서 task의 DOM 요소 높이를 지정합니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">baselines</b></td>
            <td><i>Baseline[]</i></td>
            <td>baseline을 포함하는 배열입니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">calendar_id</b></td>
            <td><i>number | string</i></td>
            <td>task에 커스텀 캘린더의 id를 할당합니다. 속성명은 [calendar_property](https://docs.dhtmlx.com/gantt/api/config/calendar_property) 옵션에 따라 달라집니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">color</b></td>
            <td><i>string</i></td>
            <td>타임라인에서 task의 색상을 지정합니다(<b>gantt_task_line</b> 요소의 <b>background-color</b>에 적용).</td>
        </tr>
        <tr>
            <td><b class="subproperty">constraint_date</b></td>
            <td><i>Date</i></td>
            <td>[시간 제약이 있는 자동 일정](https://docs.dhtmlx.com/gantt/desktop__auto_scheduling.html)이 활성화된 경우 추가되는 task의 제약 날짜입니다. [auto_scheduling_compatibility](https://docs.dhtmlx.com/gantt/api/config/auto_scheduling_compatibility)가 활성화된 경우 사용되지 않습니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">constraint_type</b></td>
            <td><i>string</i></td>
            <td>[task 제약 유형("asap", "alap", "snet", "snlt", "fnet", "fnlt", "mso", "mfo")를 지정합니다.](https://docs.dhtmlx.com/gantt/desktop__auto_scheduling.html#timeconstraintsfortasks) [시간 제약이 있는 자동 일정](https://docs.dhtmlx.com/gantt/desktop__auto_scheduling.html)이 활성화된 경우 추가됩니다. [auto_scheduling_compatibility](https://docs.dhtmlx.com/gantt/api/config/auto_scheduling_compatibility)가 활성화된 경우 사용되지 않습니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">deadline</b></td>
            <td><i>Date</i></td>
            <td>task의 마감일을 지정합니다. 설정 시 타임라인에 [시각적 표시](guides/inbuilt-baselines.md#deadlinesandconstraints)가 나타납니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">editable</b></td>
            <td><i>boolean</i></td>
            <td>읽기 전용 Gantt 차트에서 task가 [편집](guides/readonly-mode.md#readonlymodefortheentiregantt) 가능한지 결정합니다. 속성명은 [editable_property](https://docs.dhtmlx.com/gantt/api/config/editable_property) 옵션에 따라 달라집니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">group_id</b></td>
            <td><i>string | number</i></td>
            <td>task가 속한 그룹의 id입니다. [relation_property](guides/grouping.md#groupingtasks)가 groupBy() 메서드에 지정된 경우 추가됩니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">hide_bar</b></td>
            <td><i>boolean</i></td>
            <td>task(type:"task") 또는 milestone(type:"milestone")이 [타임라인에서 숨겨져야 하는지](guides/milestones.md#hidingtasksandmilestones) 결정합니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">key</b></td>
            <td><i>string | number</i></td>
            <td>task가 [relation_property](guides/grouping.md#groupingtasks)의 배열 속성으로 그룹화될 때 추가되는 그룹 키입니다. 또한 그룹 이름(예: 우선순위별 "High", "Normal", "Low" 등)으로 task에 추가됩니다. [예시 보기](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_tasks_grouping_save_tree_structure.html).</td>
        </tr>
        <tr>
            <td><b class="subproperty">label</b></td>
            <td><i>string</i></td>
            <td>그룹의 라벨로, 우선순위별로 그룹화 시 "High", "Normal", "Low" 등 그룹 이름이 task에 추가됩니다. [예시 보기](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_tasks_grouping_save_tree_structure.html).</td>
        </tr>
        <tr>
            <td><b class="subproperty">open</b></td>
            <td><i>boolean</i></td>
            <td>task 브랜치가 초기화 시 하위 task를 표시하도록 열려 있는지 나타냅니다. 초기화 후 브랜치를 토글하려면 [close()](api/method/close.md) 및 [open()](api/method/open.md) 메서드를 사용하세요.</td>
        </tr>
        <tr>
            <td><b class="subproperty">parent</b></td>
            <td><i>number | string</i></td>
            <td>상위 task의 id입니다. 존재하지 않는 상위 task를 가진 task는 렌더링되지 않습니다. 루트 task id는 [root_id](api/config/root_id.md) 설정을 통해 지정됩니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">progress</b></td>
            <td><i>number</i></td>
            <td>task의 진행률 값(0과 1 사이)</td>
        </tr>
        <tr>
            <td><b class="subproperty">progressColor</b></td>
            <td><i>string</i></td>
            <td>타임라인에서 task의 진행률 바 색상을 지정합니다(<b>gantt_task_progress</b> 요소의 <b>background-color</b>에 적용).</td>
        </tr>
        <tr>
            <td><b class="subproperty">readonly</b></td>
            <td><i>boolean</i></td>
            <td>task가 [읽기 전용](guides/readonly-mode.md#readonlymodeforspecifictaskslinks)이어야 하는지 나타냅니다. 속성명은 [readonly_property](api/config/readonly_property.md) 옵션에 따라 달라집니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">render</b></td>
            <td><i>string</i></td>
            <td>하위 task가 어떻게 표시될지 제어합니다. 값: <i>"split" | ""</i>. ["split"](guides/split-tasks.md)으로 설정하면 하위 task가 한 행에 표시됩니다. [open_split_tasks](api/config/open_split_tasks.md) 속성이 활성화된 경우, task가 접혀 있을 때만 하위 task가 한 행에 렌더링됩니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">resource</b></td>
            <td><i>Array &lt;string&gt;</i></td>
            <td>task에 할당된 리소스의 배열입니다. MS Project 또는 Primavera에서 데이터 가져오기 시 추가됩니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">rollup</b></td>
            <td><i>boolean</i></td>
            <td>task(type:"task") 또는 milestone(type:"milestone")이 [상위 프로젝트에 표시되어야 하는지](guides/milestones.md#rolluptasksandmilestones) 나타냅니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">row_height</b></td>
            <td><i>number</i></td>
            <td>task 행의 높이를 지정합니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">target</b></td>
            <td><i>string</i></td>
            <td>대상 task id입니다. 이 속성은 <b>$drop_target</b> 속성과 일치합니다. Data Processor가 활성화되어 있고, task 업데이트 및 서버 통신 후에만 task 객체에 추가됩니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">text</b></td>
            <td><i>any</i></td>
            <td>task의 이름입니다. 필요에 따라 다른 속성명을 사용할 수 있습니다. 이 속성은 Gantt의 기본 설정에서 사용됩니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">textColor</b></td>
            <td><i>string</i></td>
            <td>타임라인에서 task 텍스트의 색상을 지정합니다(<b>gantt_task_line</b> 요소의 <b>color</b>에 적용).</td>
        </tr>
        <tr>
            <td><b class="subproperty">type</b></td>
            <td><i>string</i></td>
            <td>task 유형입니다. 사용 가능한 값은 [types](api/config/types.md) 객체에 정의되어 있습니다: <ul> <li>["task"](guides/task-types.md#regulartasks) - 일반 task (<i>기본값</i>).</li> <li>["project"](guides/task-types.md#projecttasks) - 가장 빠른 하위 task로 시작하고 가장 늦은 하위 task로 끝나는 task. <i>이 유형에서는 <b>start_date</b>, <b>end_date</b>, <b>duration</b> 속성이 무시됩니다.</i> </li> <li>["milestone"](guides/task-types.md#milestones) - 중요한 프로젝트 날짜를 나타내는 기간 0의 task. <i>이 유형에서는 <b>duration</b>, <b>progress</b>, <b>end_date</b> 속성이 무시됩니다.</i></li> </ul></td>
        </tr>
        <tr>
            <td><b class="subproperty">unscheduled</b></td>
            <td><i>boolean</i></td>
            <td>task가 [일정이 없는(unscheduled)](guides/unscheduled-tasks.md) 상태인지 나타냅니다. 기본적으로 일정이 없는 task는 타임라인에 표시되지 않고, 그리드의 시작일과 종료일 칸에 빈 값이 나타납니다.</td>
        </tr>
    </tbody>
</table>



## 동적 속성

동적 속성은 task 또는 link의 현재 상태를 나타내기 위해 클라이언트 측에서 생성됩니다. 이 속성들은 데이터베이스에 저장하기 위한 것이 아니며, Gantt는 JSON 또는 XML에 포함되어 있어도 무시합니다.

<table>
    <tbody>
        <tr>
            <th>이름</th><th>타입</th><th>설명</th>
        </tr>
        <tr>
            <td><b class="subproperty">[resource_property]</b></td>
            <td><i>string | Array &lt;any&gt;</i></td>
            <td>[이 속성은 임의의 이름을 가질 수 있습니다](api/config/resource_property.md). <i>resourceGrid/Timeline/Histogram/Calendar</i>와 연결된 리소스 id를 저장합니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">$auto_end_date</b></td>
            <td><i>Date</i></td>
            <td>하위 task를 기반으로 계산된 프로젝트 task의 종료일입니다. "auto_scheduling"이 꺼져 있을 때 추가/업데이트됩니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">$auto_start_date</b></td>
            <td><i>Date</i></td>
            <td>하위 task를 기반으로 계산된 프로젝트 task의 시작일입니다. "auto_scheduling"이 꺼져 있을 때 추가/업데이트됩니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">$calculate_duration</b></td>
            <td><i>boolean</i></td>
            <td>계산에 내부적으로 사용되는 시스템 속성입니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">$custom_data</b></td>
            <td><i>object</i></td>
            <td>[importFromMSProject()](api/method/importfrommsproject.md) 및 [importFromPrimaveraP6()](api/method/importfromprimaverap6.md) 가져오기 시 정의된 커스텀 task 속성을 포함합니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">$dataprocessor_class</b></td>
            <td><i>string</i></td>
            <td>task가 업데이트되었는지 나타내는 시스템 속성입니다. Data Processor가 활성화되면 추가됩니다. <i>"updated"</i>로 설정된 경우, 그리드에서 task의 텍스트가 굵게 표시됩니다(커스텀 CSS 적용 가능).</td>
        </tr>
        <tr>
            <td><b class="subproperty">$drop_target</b></td>
            <td><i>string</i></td>
            <td>수직 드래그 중 대상 task의 id입니다. task를 드래그하는 동안 임시로 추가됩니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">$effective_calendar</b></td>
            <td><i>string</i></td>
            <td>task에 할당된 캘린더(또는 리소스 캘린더)의 id입니다. 내부 계산에 사용됩니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">$expanded_branch</b></td>
            <td><i>boolean</i></td>
            <td>상위 브랜치가 펼쳐진 경우 task가 표시되는지 나타냅니다. 상위 중 하나라도 접혀 있으면 task는 숨겨집니다(분할 task의 하위 task는 예외).</td>
        </tr>
        <tr>
            <td><b class="subproperty">$has_child</b></td>
            <td><i>boolean</i></td>
            <td>Gantt가 서버에서 1단계 하위 task를 로드해야 하는지 나타냅니다. [branch_loading](api/config/branch_loading.md)이 활성화된 경우 사용됩니다. 속성명은 [branch_loading_property](api/config/branch_loading_property.md) 옵션에 따라 달라집니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">$index</b></td>
            <td><i>number</i></td>
            <td>task의 전체 세로 위치입니다. 위/아래 task가 열리거나 닫힐 때 값이 업데이트됩니다. 상위가 접혀 있으면 실제 위치를 반영하지 않습니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">$level</b></td>
            <td><i>number</i></td>
            <td>계층 구조에서 task의 깊이 레벨(0부터 시작)</td>
        </tr>
        <tr>
            <td><b class="subproperty">$local_index</b></td>
            <td><i>number</i></td>
            <td>상위 브랜치 내에서 task의 세로 위치입니다. 전체 열림/닫힘 변경 시 업데이트되지 않습니다. 상위가 접혀 있으면 실제 위치를 반영하지 않습니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">$new</b></td>
            <td><i>boolean</i></td>
            <td>[createTask()](api/method/createtask.md) 또는 "+" 버튼을 통해 새 task가 생성될 때 추가됩니다. lightbox가 열려 있는 동안 존재하며, 저장 후 제거됩니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">$no_end</b></td>
            <td><i>boolean</i></td>
            <td><b>필수</b> 시스템 속성으로, <b>end_date</b>를 계산할 수 없을 때 추가됩니다(start_date는 있으나 duration, end_date 없음). 이 경우 task는 이동/크기 조정이 불가합니다. <b>end_date</b>는 하위 task의 종료일에 따라 달라지고, <b>start_date</b>는 고정됩니다. 자동 일정이 비활성화됩니다. <b>$no_start</b>도 설정된 경우, task는 하위 task 또는 첫 task의 날짜에 완전히 의존합니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">$no_start</b></td>
            <td><i>boolean</i></td>
            <td><b>필수</b> 시스템 속성으로, <b>start_date</b>를 계산할 수 없을 때 추가됩니다(end_date는 있으나 duration, start_date 없음). <b>start_date</b>는 하위 task 또는 첫 task의 시작일에 따라 달라집니다. <b>end_date</b>는 하위 task/첫 task의 시작일이 이를 초과하지 않는 한 고정됩니다. 자동 일정이 비활성화됩니다. <b>$no_end</b>도 설정된 경우, task는 하위 task 또는 첫 task의 날짜에 완전히 의존합니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">$open</b></td>
            <td><i>boolean</i></td>
            <td>task가 현재 열려 있는지(<i>true</i>)를 반영하는 시스템 속성입니다. 이 값을 변경하고 Gantt를 다시 그리면 task가 열리거나 닫힙니다. 또는 [open()](api/method/open.md) 또는 [close()](api/method/close.md)를 사용할 수 있습니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">$raw</b></td>
            <td><i>object</i></td>
            <td>[MS Project](guides/export-msproject.md) 또는 [Primavera](guides/export-primavera.md)에서 내보내기 처리 중 가져온 원본 task 속성명을 포함합니다. Gantt가 기대하는 형식으로 변환되기 전의 값입니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">$rendered_at</b></td>
            <td><i>string | number</i></td>
            <td>[rollup 항목](https://docs.dhtmlx.com/gantt/desktop__milestones.html#rolluptasksandmilestones) 또는 [분할(split)](https://docs.dhtmlx.com/gantt/desktop__split_tasks.html) task가 렌더링되는 행 id입니다. rollup/split task가 표시되는 동안에만 임시로 존재합니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">$rendered_parent</b></td>
            <td><i>number | string</i></td>
            <td>task가 렌더링되는 상위의 id(실제 상위가 아님)입니다. 내부적으로 및 task 그룹화 시 사용됩니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">$rendered_type</b></td>
            <td><i>string</i></td>
            <td>렌더링된 task의 유형을 나타내는 임시 속성입니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">$resourceAssignments</b></td>
            <td><i>Array &lt;any&gt;</i></td>
            <td>task에 임시로 할당된 리소스 id 배열입니다. 가장 정확한 데이터는 리소스 할당 저장소에 저장됩니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">$rollup</b></td>
            <td><i>Array &lt;string | number&gt;</i></td>
            <td>[이 task에 표시되는](guides/milestones.md#rolluptasksandmilestones) task 및 milestone의 id 배열입니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">$source</b></td>
            <td><i>Array &lt;string | number&gt;</i></td>
            <td><b>필수</b>-[이 task에서 시작하는 모든 링크의 id 배열](guides/link-object-operations.md#gettingthelinksrelatedtoacertaintask)</td>
        </tr>
        <tr>
            <td><b class="subproperty">$split_subtask</b></td>
            <td><i>boolean</i></td>
            <td>task가 분할 task의 하위 task(다른 하위 task와 한 행에 표시됨)인 경우 존재합니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">$target</b></td>
            <td><i>Array &lt;string | number&gt;</i></td>
            <td><b>필수</b>-[이 task를 가리키는 링크의 id 배열](guides/link-object-operations.md#gettingthelinksrelatedtoacertaintask)</td>
        </tr>
        <tr>
            <td><b class="subproperty">$transparent</b></td>
            <td><i>boolean</i></td>
            <td>수직 드래그 중 임시로 추가되어, 그리드에서 task가 약간 투명하게 보이게 합니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">$virtual</b></td>
            <td><i>boolean</i></td>
            <td>특정 기준으로 그룹화된 task에 추가됩니다. <b>$virtual: true</b>가 설정된 task는 그룹화가 해제되면 제거됩니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">$wbs</b></td>
            <td><i>string</i></td>
            <td>task의 WBS 코드(임시). [getWBSCode()](api/method/getwbscode.md) 호출 후 추가됩니다. 상위 또는 위치 변경으로 코드가 변경된 경우, [getWBSCode()](api/method/getwbscode.md)를 다시 호출하여 업데이트하세요.</td>
        </tr>
    </tbody>
</table>

## 예시

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

