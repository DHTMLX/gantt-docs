---
title: "시간 제어" 
sidebar_label: "시간 제어" 
---

# 시간 제어

작업의 시작 날짜와 종료 날짜를 지정하여 작업 기간을 설정하기 위한 두 선택자 쌍입니다.

![time_control](/img/time_control.png)

~~~js
gantt.config.lightbox.sections="["
    {name:"description", height:70, map_to:"text", type:"textarea", focus:true},
    {name:"time",        height:72, map_to:"auto", type:"time"} /*!*/
];
~~~

[시간 제어](https://docs.dhtmlx.com/gantt/samples/05_lightbox/07_time.html)

## 초기화

라이트박스에 **time** 컨트롤을 추가하려면 아래 단계를 따라 주세요:

1) 라이트박스 구성에 섹션을 추가합니다:

~~~js
gantt.config.lightbox.sections="["
    {name:"description", height:70, map_to:"text", type:"textarea",focus:true},
    {name:"period",      height:72, map_to:"auto", type:"time"}, /*!*/
];
~~~

2) 섹션의 레이블을 설정합니다:

~~~js
gantt.locale.labels.section_period = "기간";
~~~

## 속성

다음 속성은 주로 중요하고 'time' 컨트롤에 대해 일반적으로 설정됩니다(전체 목록은 [여기](api/config/lightbox.md)를 참조하십시오):

- **name** - (*string*) 섹션 이름 
- **height** - (*number*) 섹션 높이
- **map_to** - (*string,object*) "auto" 또는 객체로, 섹션에 매핑될 데이터 속성(-들)을 정의합니다
- **type** - (*string*) [섹션 컨트롤](guides/default-edit-form.md#lightboxcontrols) 타입
- **focus** - (*boolean*) *true*로 설정되면 섹션이 라이트박스를 열 때 포커스를 가집니다
- **readonly** - (*boolean*) "true" 값을 설정하면 섹션은 읽기 전용이 됩니다
- **year_range** - (*array,number*) 연도 선택기의 범위를 설정합니다. 범위는 두 가지 방식으로 설정될 수 있습니다: 
    - *year_range: [2005, 2025]* - 2005년부터 2025년까지의 기간
    - *year_range: 10*  - 현재 연도 기준으로 -10년 ~ +10년의 기간
- **single_date** - (*boolean*) "true" 값을 설정하면 시작 날짜 선택자만 섹션에 표시됩니다.  
수정된 작업은 시작 날짜로만 지정되며 지속 기간은 0입니다. [milestones](guides/task-types.md#milestones)에만 해당됩니다.
- **time_format** - (*string*) 날짜-시간 선택자의 순서를 설정합니다
- **autofix_end** - (*boolean*) 시작 날짜가 끝 날짜보다 큰 경우 종료 날짜를 자동으로 보정할지 여부를 정의합니다. 기본값은 *true*입니다. 비활성 모드에서는 날짜를 검증할 수 있지만 모드를 활성화하고 날짜를 검증하지 않으면 시작 날짜가 끝 날짜보다 큰 경우 지속 기간이 0인 작업이 생길 수 있습니다.
 
## 날짜-시간 선택자 구성

"duration" 또는 "time" 섹션의 선택자를 구성하려면 [time_format](api/config/lightbox.md) 속성을 사용하십시오(참조: [Date Format Specification](guides/date-format.md)):

**'시간 구간' 섹션에 시간 선택자를 추가하기**
~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"time",type:"time", map_to:"auto", time_format:["%d","%m","%Y","%H:%i"]}/*!*/
];
~~~

참고: [time_format](api/config/lightbox.md) 배열의 허용 가능한 구성 항목은:

- *"%d"* - 일 선택자
- *"%m"* - 월 선택자
- *"%Y"* - 연도 선택자
- *"%H:%i"* - 시간 선택자(포맷은 [time_picker](api/template/time_picker.md) 템플릿으로 설정됩니다)

배열에서 이 구성 항목의 순서와 개수만 변경할 수 있으며, 데이터 표현 형식은 변경할 수 없습니다.

 예를 들어 형식을 다음과 같이 변경할 수 있습니다:

~~~js
// 시간 우선
time_format:["%H:%i", "%m", "%d", "%Y"] 
// 월이 먼저 오는 경우
time_format:["%m","%d", "%Y", "%H:%i"]
// 연도 선택자를 제거
time_format:["%H:%i", "%m", "%d"]
// 잘못된 예
time_format:["%H:%i", "%M", "%d", "%Y"] // "%m"이 "%M"으로 변경되었습니다
~~~

## 사용자 정의 시작/종료 날짜-시간 속성으로 매핑 {#mapping}

### 기본 매핑

일반적으로 시간 및 지속 시간 컨트롤은 필수 데이터 속성인 'start_date', 'end_date'에 매핑되며 **map_to** 속성을 "auto" 값으로 설정합니다 (**map_to:"auto"**).

### 사용자 정의 매핑

컨트롤을 'start_date', 'end_date' 대신 사용자 정의 날짜 속성에 매핑하려면 **map_to** 속성의 객체 표기를 사용합니다:

~~~js
gantt.config.lightbox.sections = [
    {name: "description", height: 72, type: "textarea", map_to:"text", focus: true},
    {name: "time",           height: 72, type: "duration", map_to:"auto"},
    {name: "deadline",    height: 72, type: "time", /*!*/
     map_to:{start_date:"planned_start",end_date:"planned_end"}} /*!*/
];
~~~

[Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)

객체로서 **map_to**에는 3개의 속성이 있습니다:

1. **start_date**- 입력에서 설정된 시작 날짜를 저장할 데이터 속성의 이름
2. **end_date** - 선택적, 입력에서 설정된 종료 날짜를 저장할 데이터 속성의 이름 
3. **duration** - 선택적, 입력으로 정의된 지속 기간을 저장할 데이터 속성의 이름

:::note
일부 속성이 지정되지 않으면 컨트롤은 관련 필수 날짜 속성의 값을 사용합니다.
:::

## 섹션 가시성 전환

섹션의 가시성을 제어하려면 lightbox 구성을 할 때 **type:"time_optional"** 및 **button: true**를 지정할 수 있습니다:

~~~js
gantt.config.lightbox.sections = [
  {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
  {name: "time", map_to: "auto", button: true, type: "time_optional"} /*!*/
];
~~~

그리고 두 상태의 버튼에 대한 레이블을 설정합니다:

~~~js
gantt.locale.labels.time_enable_button = '일정 잡기';
gantt.locale.labels.time_disable_button = '일정 해제';
~~~

섹션의 가시성을 전환하는 토글 버튼은 섹션 근처에 표시됩니다. 섹션이 보이면, 모든 동작은 **type:"time"**이 지정된 것과 동일하게 작동합니다.

![](/img/time_optional.png)

버튼을 끄면 섹션은 보이지 않지만 아무 일도 일어나지 않습니다. "저장" 버튼을 클릭하면 해당 섹션의 **map_to** 속성으로 매핑된 작업 속성의 값이 `null`로 바뀝니다.

~~~js
gantt.getTask(1);

// 반환 값
{
    id: '1', text: 'Task #1', unscheduled: true, 
    duration: 0, parent: '10',
    end_date: null, start_date: null,
    ...
}
~~~

이 기능은 작업을 미배정 상태로 만들 필요가 있을 때 유용합니다. 관련 샘플을 확인하십시오:

**관련 샘플** [미배정 작업](https://snippet.dhtmlx.com/5/81f51a96d)