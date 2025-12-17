---
title: "Time Control"
sidebar_label: "Time Control"
---

Time Control
=================

이 컨트롤은 작업의 시작일과 종료일을 지정하여 작업의 기간을 설정할 수 있는 두 개의 선택기를 제공합니다.

![time_control](/img/time_control.png)

~~~js
gantt.config.lightbox.sections="["
    {name:"description", height:70, map_to:"text", type:"textarea", focus:true},
    {name:"time",        height:72, map_to:"auto", type:"time"} /*!*/
];
~~~


[Time control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/07_time.html)


초기화
---------------------------

**time** 컨트롤을 라이트박스에 포함하려면 다음과 같이 하세요:

1) 라이트박스 설정에 섹션을 추가합니다:

~~~js
gantt.config.lightbox.sections="["
    {name:"description", height:70, map_to:"text", type:"textarea",focus:true},
    {name:"period",      height:72, map_to:"auto", type:"time"}, /*!*/
];
~~~

2) 해당 섹션의 레이블을 지정합니다:

~~~js
gantt.locale.labels.section_period = "Time period";
~~~


속성
-------------------------

'time' 컨트롤에서 자주 사용되는 주요 속성은 다음과 같습니다 (전체 목록은 [여기](api/config/lightbox.md)에서 확인할 수 있습니다):

- **name** - (*string*) 섹션의 이름
- **height** - (*number*) 섹션의 높이
- **map_to** - (*string,object*) "auto" 또는 섹션과 연결된 데이터 속성을 지정하는 객체
- **type** - (*string*) [section control](guides/default-edit-form.md#lightboxcontrols)의 타입
- **focus** - (*boolean*) *true*로 설정하면 라이트박스가 열릴 때 해당 섹션에 포커스가 이동함
- **readonly** - (*boolean*) *true*로 설정하면 섹션이 읽기 전용이 됨
- **year_range** - (*array,number*) 연도 선택기의 범위를 지정. 두 가지 방법으로 정의 가능:
    - *year_range: [2005, 2025]* - 2005년부터 2025년까지
    - *year_range: 10*  - (현재 연도 - 10)부터 (현재 연도 + 10)까지
- **single_date** - (*boolean*) *true*로 설정하면 *start Date* 선택기만 표시됨. 편집된 작업은 시작일만 있고 기간은 0이 되며, [milestones](guides/task-types.md#milestones)에 유용함
- **time_format** - (*string*) 날짜-시간 선택기의 순서를 제어
- **autofix_end** - (*boolean*) 시작일이 종료일을 초과할 때 종료일을 자동으로 조정할지 결정. 기본값은 *true*임. 비활성화하면 날짜 유효성 검사가 가능하지만, 활성화 상태에서 유효성 검사가 없으면 *start_date*가 *end_date*보다 늦을 경우 작업 기간이 0이 될 수 있음.

날짜-시간 선택기 구성
-------------------------------------------------

"duration" 또는 "time" 섹션의 선택기를 사용자 정의하려면 [time_format](api/config/lightbox.md) 속성을 사용하세요 ([날짜 형식 지정](guides/date-format.md) 참고):

**Adding the time selector to the 'Time period' section**
~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"time",type:"time", map_to:"auto", time_format:["%d","%m","%Y","%H:%i"]}/*!*/
];
~~~

[time_format](api/config/lightbox.md) 배열에 허용되는 멤버는 다음과 같습니다:

- *"%d"* - 일(day) 선택기
- *"%m"* - 월(month) 선택기
- *"%Y"* - 연(year) 선택기
- *"%H:%i"* - 시간 선택기 ([time_picker](api/template/time_picker.md) 템플릿에 따라 포맷됨)

이 배열 내의 멤버는 순서를 변경하거나 생략할 수 있지만, 포맷 자체를 변경할 수는 없습니다.

 예를 들어:

~~~js
// 시간이 먼저
time_format:["%H:%i", "%m", "%d", "%Y"] 
// 월이 먼저
time_format:["%m","%d", "%Y", "%H:%i"]
// 연 선택기 없이
time_format:["%H:%i", "%m", "%d"]
// 잘못된 예시
time_format:["%H:%i", "%M", "%d", "%Y"] // "%m" 대신 "%M" 사용
~~~


커스텀 시작/종료 날짜-시간 속성에 매핑
-------------------------------------------------

### 기본 매핑

기본적으로 time 및 duration 컨트롤은 **map_to**를 "auto" (**map_to:"auto"**)로 설정하여 필수 'start_date'와 'end_date' 속성에 매핑됩니다.

### 커스텀 매핑

컨트롤을 'start_date'와 'end_date' 대신 커스텀 날짜 속성에 연결하려면 **map_to**에 객체를 사용하세요:

~~~js
gantt.config.lightbox.sections = [
    {name: "description", height: 72, type: "textarea", map_to:"text", focus: true},
    {name: "time",           height: 72, type: "duration", map_to:"auto"},
    {name: "deadline",    height: 72, type: "time", /*!*/
     map_to:{start_date:"planned_start",end_date:"planned_end"}} /*!*/
];
~~~


[Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)


**map_to**의 객체 형태는 다음을 지원합니다:

1. **start_date** - 입력값에서 시작일을 저장하는 데이터 속성
2. **end_date** - (옵션) 입력값에서 종료일을 저장하는 데이터 속성 
3. **duration** - (옵션) 입력값에서 기간을 저장하는 데이터 속성 

:::note
속성이 생략되면 해당 컨트롤은 필수 날짜 속성을 사용합니다.
:::



섹션 표시 전환
--------------------------

**type:"time_optional"**과 **button: true**를 라이트박스 섹션 설정에 지정하여 time 섹션의 표시 여부를 제어할 수 있습니다:

~~~js
gantt.config.lightbox.sections = [
  {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
  {name: "time", map_to: "auto", button: true, type: "time_optional"} /*!*/
];
~~~

또한 토글 버튼 상태의 레이블을 정의하세요:

~~~js
gantt.locale.labels.time_enable_button = 'Schedule';
gantt.locale.labels.time_disable_button = 'Unschedule';
~~~

섹션 옆에 토글 버튼이 표시되어, 사용자가 해당 섹션을 표시하거나 숨길 수 있습니다. 표시 상태에서는 **type:"time"**과 동일하게 동작합니다.

![](/img/time_optional.png)

버튼이 비활성화되면 섹션이 숨겨지지만 즉시 변경 사항은 없습니다. "Save"를 클릭하면 time 컨트롤과 **map_to**로 연결된 작업 속성이 `null`로 설정됩니다.

~~~js
gantt.getTask(1);

// 반환값
{
    id: '1', text: 'Task #1', unscheduled: true, 
    duration: 0, parent: '10',
    end_date: null, start_date: null,
    ...
}
~~~

이 기능은 작업을 미예약(unscheduled) 상태로 표시할 때 유용합니다. 관련 예시는 다음을 참고하세요:


**Related example:** [Unscheduled tasks](https://snippet.dhtmlx.com/5/81f51a96d)


