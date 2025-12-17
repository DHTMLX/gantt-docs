---
title: "스케일 설정하기"
sidebar_label: "스케일 설정하기"
---

스케일 설정하기
===========================================

![gantt_dates](/img/gantt_dates.png)

스케일은 [scales](api/config/scales.md) 속성을 통해 설정할 수 있습니다. **scales** 배열에 스케일 객체를 추가하여 여러 개의 스케일을 정의할 수 있습니다:

~~~js
// 단일 일(day) 스케일
gantt.config.scales = [
    {unit: "day", step: 1, format: "%j, %D"}
];

// 여러 개의 스케일을 동시에 설정
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "week", step: 1, format: weekScaleTemplate},
    {unit: "day", step:1, format: "%D", css:daysStyle }
];
~~~

시간 스케일(X축)의 다음과 같은 속성들을 조정할 수 있습니다:

1. [Unit](#timeunits)
2. [Range](#range)
3. [Step](#timestep)
4. [Height](#height)
5. [Format](#dateformat)
6. [Style](#styling)

또한 [사용자 정의 스케일](#customtimeunits)을 추가하는 것도 가능합니다.


## 시간 단위 {#timeunits}
----------------------------------------

![month_day_scale_units](/img/month_day_scale_units.png)

스케일의 단위를 정의하려면 스케일 객체에서 **unit** 속성을 사용하세요.

사용 가능한 값은 "minute", "hour", "day"(기본값), "week", "quarter", "month", "year"입니다.

~~~js
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "day", step: 1, format: "%j, %D"}
];

gantt.init("gantt_here");
~~~


[Month view](https://docs.dhtmlx.com/gantt/samples/03_scales/02_month_days.html)



## 범위 {#range}
--------------------------------------

![day_scale_unit](/img/day_scale_unit.png)

### 기본 범위 설정

날짜 범위가 명시적으로 지정되지 않은 경우, Gantt는 로드된 작업의 날짜를 기준으로 스케일의 첫 번째 작업 이전과 마지막 작업 이후에 오프셋을 추가하여 범위를 결정합니다. 이 오프셋은 시간 스케일 설정에 따라 달라집니다.  
[scale_offset_minimal](api/config/scale_offset_minimal.md) 값에 따라, 오프셋은 [scales](api/config/scales.md) 옵션의 **unit** 속성에 정의된 시간 단위이거나, 시간 스케일에서 가장 작은 단위가 됩니다.

현재 표시되고 있는 날짜 범위는 [getState](api/method/getstate.md) 메서드를 사용하여 프로그래밍적으로 가져올 수 있습니다.

~~~js
var state = gantt.getState();

console.log(state.min_date);
// -> Mon Jan 01 2018 00:00:00

console.log(state.max_date);
// -> Tue Jan 01 2019 00:00:00
~~~

스케일 범위는 [gantt 렌더링](api/method/render.md) 시 재계산됩니다. 사용자가 작업을 현재 보이는 시간 범위 밖으로 이동시키면, 작업 행은 계속 표시되지만 바 요소는 전체 차트가 다시 그려질 때까지 나타나지 않습니다.

스케일이 자동으로 조정되도록 하려면 [fit_tasks](api/config/fit_tasks.md) 옵션을 활성화하세요.

~~~js
gantt.config.fit_tasks = true; 
gantt.init("gantt_here");
~~~


[Auto resize scale](https://docs.dhtmlx.com/gantt/samples/03_scales/08_scale_autoconfig.html)


### 날짜 범위 명시적으로 설정하기 {#explicit_date_range}

또는 [start_date](api/config/start_date.md) 및 [end_date](api/config/end_date.md) 옵션을 사용하여 날짜 범위를 명시적으로 지정할 수 있습니다:

~~~js
gantt.config.start_date = new Date(2018, 02, 31);
gantt.config.end_date = new Date(2018, 03, 09);
 
gantt.init("gantt_here");
~~~

이 날짜들은 [gantt 초기화](api/method/init.md) 시 직접 지정할 수도 있습니다:

~~~js
gantt.init("gantt_here", new Date(2018, 02, 31), new Date(2018, 03, 09));
~~~


[Define displayed date range](https://docs.dhtmlx.com/gantt/samples/01_initialization/08_explicit_time_range.html)


정의된 간격을 벗어난 작업들은 [미예약 작업으로 표시](guides/unscheduled-tasks.md)되지 않는 한 Gantt 차트에 나타나지 않습니다.


[Show Unscheduled Tasks](https://docs.dhtmlx.com/gantt/samples/01_initialization/19_tasks_without_dates.html)


#### 참고 {#note}

**start_date**와 **end_date**가 모두 설정되어 있고, 이 범위를 벗어난 작업을 추가하면 해당 작업은 차트에 표시되지 않습니다.  
이러한 작업을 표시하려면 [show_tasks_outside_timescale](api/config/show_tasks_outside_timescale.md) 옵션을 활성화하세요.

~~~js
gantt.config.start_date = new Date(2019, 02, 31);
gantt.config.end_date = new Date(2019, 03, 09);
gantt.config.show_tasks_outside_timescale = true;

gantt.init("gantt_here");
~~~

이 옵션을 사용하지 않는 경우, 날짜 범위를 동적으로 확장할 수 있습니다:

~~~js
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
 var taskStart = task.start_date;
 var taskEnd = task.end_date;
 var scaleStart = gantt.config.start_date;
 var scaleEnd = gantt.config.end_date;

 // 작업이 범위를 벗어난 경우
 if(scaleStart > taskEnd || scaleEnd < taskStart ){
  // 타임스케일 범위 업데이트
  gantt.config.end_date = new Date(Math.max(taskEnd.valueOf(), scaleEnd.valueOf()));
  gantt.config.start_date = new Date(Math.min(taskStart.valueOf(), scaleStart.valueOf()));
  gantt.render();
 }    
 return true;
});
~~~

또는 라이트박스에서 작업이 범위를 벗어나 저장되지 않도록 검증을 추가할 수 있습니다:

~~~js
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
     var taskStart = task.start_date;
     var taskEnd = task.end_date;
     var scaleStart = gantt.config.start_date;
     var scaleEnd = gantt.config.end_date;

    // 작업이 범위를 벗어났는지 확인
    if(scaleStart > taskEnd || scaleEnd < taskStart ){
        gantt.message({
            type: "warning", 
            text: "Warning! The task is outside the date range!",
            expire: 5000
        });
        return false;
    } 
    return true;
});
~~~

### 표시 범위 동적으로 변경하기 {#dynamic_scale}

표시되는 날짜 범위를 실시간으로 업데이트하는 방법에는 몇 가지가 있습니다:

- **start_date** 및 **end_date** 설정을 사용하여 시간 범위를 제어하고, 로드된 작업을 기준으로 동적으로 업데이트합니다.  
이 작업은 [스케일 범위 재계산](api/method/getsubtaskdates.md) 후 gantt가 렌더링되기 전에 **start_date**와 **end_date**를 업데이트하여 수행할 수 있습니다:

~~~js
gantt.attachEvent("onBeforeGanttRender", function(){
   var range = gantt.getSubtaskDates();
   var scaleUnit = gantt.getState().scale_unit;
   if(range.start_date && range.end_date){
     gantt.config.start_date = gantt.calculateEndDate(range.start_date, -4, scaleUnit);
     gantt.config.end_date = gantt.calculateEndDate(range.end_date, 5, scaleUnit);
   }
});

gantt.init("gantt_here");
~~~

- 작업이 현재 스케일 구간을 벗어날 때마다 스케일이 다시 렌더링되도록 하려면 [fit_tasks](api/config/fit_tasks.md) 속성을 *true*로 설정하세요:

~~~js
gantt.config.fit_tasks = true; 
gantt.init("gantt_here");
~~~

**start_date**와 **end_date**가 모두 설정된 경우, **fit_tasks** 옵션이 제대로 작동하려면 위에서 설명한 방법 중 하나를 반드시 사용해야 합니다.

- [onTaskDrag](api/event/ontaskdrag.md) 이벤트 핸들러 내에서 논리를 추가하여 작업을 드래그하는 동안 스케일을 동적으로 업데이트할 수도 있습니다:

~~~js
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
 var state = gantt.getState();
 var minDate = state.min_date,
       maxDate = state.max_date;
  
 var scaleStep = gantt.date.add(new Date(), state.scale_step, state.scale_unit) - new Date();
  
 var showDate,
  repaint = false;
  if(mode == "resize" || mode == "move"){
    if(Math.abs(task.start_date - minDate) < scaleStep){
      showDate = task.start_date;
      repaint = true;
      
    } else if(Math.abs(task.end_date - maxDate) < scaleStep){
      showDate = task.end_date;
      repaint = true;
    }
    
    if(repaint){
      gantt.render();
      gantt.showDate(showDate);
    }
  }
});
~~~


**Related example:** [Re-rendering Scale during Task Dragging](https://snippet.dhtmlx.com/o2bgk6uf)


### 명시적 날짜 범위를 벗어난 작업 표시 {#tasksoutsidetimescale}

[지정된 날짜 범위](guides/configuring-time-scale.md#explicit_date_range)를 벗어나는 작업도 Gantt 차트에서 표시할 수 있습니다.

![tasks_outside_timescale](/img/tasks_outside_timescale.png) 

이를 위해 [show_tasks_outside_timescale](api/config/show_tasks_outside_timescale.md) 옵션을 *true*로 설정하세요:

~~~js
var data = {
  "tasks": [
    {"id":1, "text":"Project #1", "start_date": "01-09-2018", "end_date": "02-09-2018"},
    {"id":2, "text":"Project #2", "start_date": "01-09-2021", "end_date": "02-09-2021"},
    {"id":3, "text":"Task #1", "start_date": "03-02-2020", "end_date": "05-02-2020"},
    ],
    "links":[]
};

gantt.config.show_tasks_outside_timescale = true;

gantt.init("gantt_here", new Date(2020, 1, 1), new Date(2020, 2, 1));
~~~


[Tasks outside timescale](https://docs.dhtmlx.com/gantt/samples/01_initialization/20_tasks_outside_timescale.html)


이렇게 하면, ID가 "1"과 "2"인 작업이 타임라인 영역에 빈 행으로 나타나며, 그리드에 이름과 시작일이 표시됩니다.

## Time step {#timestep}
--------------------------------------

![scale_step](/img/scale_step.png)

시간 스케일의 스텝 크기를 정의하려면 스케일 구성 객체의 **step** 속성을 사용하세요:

~~~js
var monthScaleTemplate = function (date) {
    var dateToStr = gantt.date.date_to_str("%M");
    var endDate = gantt.date.add(date, 2, "month");
    return dateToStr(date) + " - " + dateToStr(endDate);
};

gantt.config.scales = [
    {unit: "year", step: 1, format: "%Y"},
    {unit: "month", step: 3, format: monthScaleTemplate},
    {unit: "month", step: 1, format: "%M"}
];

gantt.init("gantt_here");
~~~


[Step config for the Quarter scale](https://docs.dhtmlx.com/gantt/samples/03_scales/03_full_year.html)


## Height {#height}
--------------------------------------

![scale_height](/img/scale_height.png)

스케일의 높이를 조정하려면 [scale_height](api/config/scale_height.md) 속성을 사용하세요:

~~~js
gantt.config.scale_height = 54; /*!*/

gantt.init("gantt_here");
~~~


[Day hours](https://docs.dhtmlx.com/gantt/samples/03_scales/04_days.html)


여러 개의 스케일이 사용되는 경우, 지정한 높이는 각 스케일에 균등하게 분배됩니다. 예를 들어 **scale_height**가 60 픽셀이고, 3개의 스케일이 있다면 각각 20 픽셀의 높이를 가지게 됩니다.

## Date format {#dateformat}
----------------------

:::note
사용 가능한 포맷 문자에 대해 알아보려면 [날짜 형식 지정](guides/date-format.md) 문서를 참고하세요
:::

각 스케일 객체의 **format** 속성을 사용해 날짜 포맷을 설정할 수 있습니다. 이 속성은 문자열일 수도 있고:

~~~js
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "week", step: 1, format: weekScaleTemplate},
    {unit: "day", step: 1, format: "%D", css: daysStyle }
];

gantt.init("gantt_here");
~~~


[Multiple scales](https://docs.dhtmlx.com/gantt/samples/03_scales/01_multiple_scales.html)


![multiple_scales](/img/multiple_scales.png)

또는 날짜 객체를 받아 포맷 문자열을 반환하는 함수일 수도 있습니다:

~~~js
gantt.config.scales = [
  { unit: "day", step: 1, format: function(date){
    return "<strong>Day " + dayNumber(date) + "</strong>

" + dateFormat(date);
  }}
]
~~~


[Custom scales](https://docs.dhtmlx.com/gantt/samples/03_scales/06_custom_scales.html)


![scale_template](/img/scale_template.png)

## Styling {#styling}
------------------------------------

![css_styling](/img/css_styling.png)

시간 스케일 셀을 스타일링하려면 스케일 객체의 **css** 속성을 사용하세요.

~~~js
function getWeekOfMonthNumber(date){
    let adjustedDate = date.getDate() + date.getDay();
    let prefixes = ['0', '1', '2', '3', '4', '5'];
    return (parseInt(prefixes[0 | adjustedDate / 7]) + 1);
} 

gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "week", step: 1, format: function(date){
       return "Week #" + getWeekOfMonthNumber(date);
    }},
    {unit: "day", step: 1, format: "%j %D", css: function(date) { /*!*/
         if(!gantt.isWorkTime(date)){ 
             return "week-end"; 
         } 
    }} 
];
~~~


**Related example:** [Styling of cells of the time scale](https://snippet.dhtmlx.com/tadcjjk4)


**css** 속성이 스케일 설정에 지정되지 않은 경우, [scale_cell_class](api/template/scale_cell_class.md) 템플릿을 사용해 **scales** 배열의 첫 번째 시간 스케일에 CSS 클래스를 적용할 수 있습니다.

~~~js
function getWeekOfMonthNumber(date){
    let adjustedDate = date.getDate() + date.getDay();
    let prefixes = ['0', '1', '2', '3', '4', '5'];
    return (parseInt(prefixes[0 | adjustedDate / 7]) + 1);
} 

gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "week", step: 1, format: function(date){
       return "Week #" + getWeekOfMonthNumber(date);
    }},
    {unit: "day", step: 1, format: "%j %D"}
];

gantt.templates.scale_cell_class = function(date) {
         if(!gantt.isWorkTime(date)){
             return "week-end";
         }
};
~~~


**Related example:** [Styling of the first time scale](https://snippet.dhtmlx.com/vovv2wde)


[scale_cell_class](api/template/scale_cell_class.md) 템플릿을 모든 스케일에 적용하려면 [inherit_scale_class](api/config/inherit_scale_class.md) 옵션을 *true*로 설정하세요.

~~~js
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "week", step: 1, format: function(date){
       return "Week #" + getWeekOfMonthNumber(date);
    }},
    {unit: "day", step: 1, format: "%j %D"}
];

gantt.templates.scale_cell_class = function(date) {
         if(!gantt.isWorkTime(date)){
             return "week-end";
         }
};
gantt.config.inherit_scale_class = true; /*!*/
~~~


**Related example:** [Styling of all scales](https://snippet.dhtmlx.com/v6p55wdz)


[근무 시간 계산](guides/working-time.md)과 함께 사용할 때는 하드코딩된 값 대신 [isWorkTime](api/method/isworktime.md)을 사용하는 것이 좋습니다:

~~~js
gantt.config.work_time = true;

gantt.templates.scale_cell_class = function(date){
   if(!gantt.isWorkTime(date)){
      return "weekend";
   }
};
~~~

타임라인 영역의 스타일을 더 맞춤화하는 방법은 [타임 슬롯 하이라이트하기](guides/highlighting-time-slots.md) 문서를 참고하세요.

## Custom time units {#customtimeunits}
-------------------------

dhtmlxGantt에서는 사용자 정의 시간 단위를 생성하고, 스케일 구성에서 라벨 템플릿을 설정할 수 있습니다.

사용자 정의 단위를 정의하려면 [Date 객체](api/other/date.md)에 두 개의 함수를 구현하세요:

~~~js
Date gantt.date.<unit>_start(Date date);
Date gantt.date.add_<unit>(Date date, Integer increment);
~~~

- 첫 번째 함수는 주어진 날짜에 대해 시간 단위의 시작 날짜를 반환합니다(예: month_start의 경우 2월 14일 → 2월 1일).  
- 두 번째 함수는 날짜에 지정한 수만큼 단위를 더합니다(예: 2일 빼기 등).

:::note
일반적으로 증분 값은 양수입니다. 스케일 셀은 왼쪽에서 오른쪽으로 생성되기 때문입니다. 하지만 첫 번째 셀은 오른쪽에서 왼쪽으로 생성되므로, Gantt는 이 경우 음수 증분 값을 사용합니다.
:::

### 예시 1

다음은 회계 연도가 1월 31일에 종료된다고 가정할 때 "fiscal_year" 단위를 정의하는 방법입니다. 새로운 단위를 지정하는 방법은 다음과 같습니다:

~~~js
var firstMonth = 1,
    firstDay = 1;

gantt.date.fiscal_year_start = function(date){       /*!*/
   var next = new Date(date);
   if(next.getMonth() < firstMonth || 
      (next.getMonth() === firstMonth && next.getDate() < firstDay)){
      next = gantt.date.add(next, -1, "year"); 
   }
  
  next = gantt.date.year_start(next);
  next.setMonth(firstMonth);
  next.setDate(firstDay);
 
  return next;
}; 

gantt.date.add_fiscal_year = function(date, inc){    /*!*/
   return gantt.date.add(date, inc, "year");
};
~~~

이제 코드는 다음과 같이 사용할 수 있습니다:

~~~js
var dateToStr = gantt.date.date_to_str("%Y");
function fiscalYearLabel(date){
    return dateToStr(gantt.date.fiscal_year_start(date));
};

gantt.config.scales = [
  {unit:"year", step:1, format:"Calendar year %Y"},
  {unit:"fiscal_year", step:1, format:fiscalYearLabel},
  {unit:"month", step: 1, format: "%M %Y"},
  {unit:"day", step: 1, format:"%d %M"}
];
~~~

### 예시 2

각 "day" 셀을 00, 08, 16으로 표시된 세 개의 "hour" 셀로 분할할 수 있습니다. 로직은 다음과 같습니다:

~~~js
gantt.date.hour_custom_start = function (date) {
    return date;
};

gantt.date.add_hour_custom = function (date, inc) { // inc depends on the "step" 
    const nextDate = new Date(date);
    if (nextDate.getHours() % 8 != 0) { // the hour value is not 0, 8 or 16 /*!*/
        const diff = Math.abs(8 - nextDate.getHours()); /*!*/
        return gantt.date.add(nextDate, diff * inc, "hour"); /*!*/
    } /*!*/
    return gantt.date.add(date, 8 * inc, "hour"); /*!*/
};

gantt.config.scales = [
    { unit: "day", step: 1, date: "%d %F" },
    { unit: "hour_custom", step: 1, date: "%H" },
];

gantt.config.date_grid = "%Y-%m-%d %H:%i"
~~~


**Related example:** [Custom hours on the scale](https://snippet.dhtmlx.com/59qgh9vr)


![custom_scale](/img/custom_scale.png)

Gantt가 첫 번째 "hour" 셀을 어떻게 결정하는지 이해하려면, 가장 이른 작업이 07:00에 시작된다고 가정해 봅니다. 7은 8의 배수가 아니므로, Gantt는 다음 규칙을 적용합니다:

~~~js
if (nextDate.getHours() % 8 != 0) {
    const diff = Math.abs(8 - nextDate.getHours());  // 8 - 7 = 1
    return gantt.date.add(nextDate, diff * inc, "hour"); // 7 - 1 = 6
} 
~~~

- Gantt는 8:00과 7:00 사이의 시간 차이를 계산합니다: 

*diff = 08:00 - 07:00 = 1 hour*

- 그런 다음 이 차이를 증가 값과 곱합니다: 

 *diff * inc = 1 hour * (-1) = -1 hour* 

 여기서 *inc*는 시간 단계의 음수 값(*-1*)입니다.

- 마지막으로, 이 값을 가장 이른 작업 시간에 더합니다: 

 *07:00 + (- 1 hour) = 06:00*  


첫 번째 셀의 값은 **06**이 됩니다.

두 번째 "hour" 셀에는 양의 증가 값이 적용되어 동일한 논리가 적용됩니다:

- *diff = 08:00 - 06:00 = 2 hours*

- *diff * inc = 2 hour * 1 = 2 hours*

- *06:00 + 2 hours = 08:00*  


두 번째 셀에는 **08**이 표시됩니다.

8은 8의 배수이므로, 다음 셀은 단순히 *08:00 + 8 hours = **16:00***으로 계산되며, 이후 셀도 이 패턴이 반복됩니다.

:::note
이 접근 방식은 [date range isn’t specified explicitly](#explicit_date_range)일 때 동작합니다.
:::

더 많은 예시는 [How to add a custom scale](guides/how-to.md#howtoaddacustomscale) 문서를 참고하세요.

## 커스텀 시간 범위 {#customtimespans}
----------------------

이 섹션에서는 근무하지 않는 시간대를 표시하거나 숨기도록 시간 스케일을 커스터마이즈하는 예시를 제공합니다. 또한 **skip_off_time** 모드가 활성화되어 있을 때 스케일 시작 부분에 근무 외 시간 셀을 숨기는 예시도 포함되어 있습니다.

다음은 08:00~12:00, 13:00~17:00의 일반적인 근무 시간대에 맞춘 커스텀 스케일 예시입니다:

~~~js
gantt.date.day_custom_start = function (date) {
    return date;
};

gantt.date.add_day_custom = function (date, inc) { /*!*/
    const nextDate = new Date(date); /*!*/
    if (nextDate.getHours() < 8) { /*!*/ // Statement 1
        const diff = 8 - nextDate.getHours(); /*!*/
        return gantt.date.add(nextDate, diff * inc, "hour"); /*!*/
    } /*!*/
    if (nextDate.getHours() == 8) { /*!*/ // Statement 2
        return gantt.date.add(nextDate, 9 * inc, "hour"); /*!*/
    } /*!*/
    if (nextDate.getHours() == 17) { /*!*/ // Statement 3
        return gantt.date.add(nextDate, 15 * inc, "hour"); /*!*/
    } /*!*/

    return gantt.date.add(date, 8 * inc, "hour"); /*!*/
};

gantt.config.scales = [
    { unit: "day_custom", step: 1, date: "%d %H:00" },
];

// gantt.config.skip_off_time = true;
gantt.config.work_time = true;
gantt.config.correct_work_time = true;
gantt.plugins({
    auto_scheduling: true,
});
gantt.setWorkTime({ hours: ["8:00-12:00", "13:00-17:00"] }); /*!*/

gantt.config.duration_unit = "minute";
gantt.config.duration_step = 1;
gantt.config.time_step = 1;
gantt.config.round_dnd_dates = false;
~~~


**Related example:** [Custom time spans](https://snippet.dhtmlx.com/9s4u81c3)


가장 이른 작업이 2025년 4월 1일 08:00에 시작된다고 가정해 봅니다. [gantt.config.skip_off_time](api/config/skip_off_time.md) 설정에 따라 Gantt가 이 작업 이전에 오프셋을 어떻게 추가하는지 살펴보겠습니다.

근무 외 시간을 숨기는 설정부터 시작합니다:

~~~js
gantt.config.skip_off_time = true;
~~~

이 경우, 첫 번째 "hour" 셀을 만들기 위해 Gantt는 가장 이른 작업 시간에서 이전 근무 시간에 도달할 때까지 시간을 빼게 됩니다.

- 먼저, 2025년 4월 1일 08:00에서 9시간을 뺍니다(Statement 2): 


*08:00 - 9 hours = 23:00*


- 23:00은 근무 외 시간이며 어떤 조건도 만족하지 않으므로, Gantt는 8시간을 더 뺍니다:


*23:00 - 8 hours = 15:00*
- 결과적으로 2025년 3월 31일 15:00이 근무 시간에 해당합니다.

따라서 첫 번째 셀에는 **31 15:00**이 표시됩니다.

![](/img/with_skip_off_time.png)

다른 셀의 계산 방법을 이해하려면 **gantt.config.skip_off_time**을 비활성화해 보세요:

~~~js
gantt.config.skip_off_time = false;
~~~

이 경우에도 첫 번째 셀은 **31 15:00**으로 동일하지만, 근무 외 시간이 표시되어 가장 이른 작업 전에도 더 많은 빈 셀이 나타납니다.

이 셀들에 대해서는 다음 로직이 적용됩니다:

- 2025년 3월 31일 15:00은 근무 시간이므로, 두 번째 셀은 8시간을 더해 계산합니다:


*15:00 + 8 hours = 23:00* 
- 2025년 3월 31일 23:00은 근무 외 시간이므로, 세 번째 셀은:


*23:00 + 8 hours = 7:00*
- 2025년 4월 1일 7:00은 근무 외 시간이면서 8:00 미만(Statement 3)이므로, 다음과 같이 계산합니다:


    - *diff = 08:00 - 07:00 = 1 hour*
    - *diff * inc = 1 hour * 1 = 1 hour*
    - *07:00 + 1 hour = **08:00***



2025년 4월 1일 08:00은 가장 이른 작업의 시작 시간과 일치합니다.

![](/img/without_skip_off_time.png)

:::note
다른 셀도 유사하게 생성됩니다.
:::




**skip_off_time**이 비활성화된 경우, Gantt는 가장 이른 작업 전에도 여러 개의 빈 셀을 추가할 수 있습니다. 이 설정과 상관없이 항상 하나의 셀만 나타나도록 하려면 다음과 같은 로직을 사용할 수 있습니다:

~~~js
gantt.date.add_day_custom = function (date, inc) {
    // work_time이 활성화되고 작업이 로드된 경우,
    // 첫 번째 셀 날짜를 계산합니다.
    // 최소 날짜부터 시작하여 뒤로 이동하면서,
    // 가장 가까운 근무 시간 내 날짜를 찾은 후
    // 그 날짜에서 1시간을 뺍니다
    if (inc < 0 && gantt.getTaskByTime().length) {
        return gantt.calculateEndDate({ 
            start_date: date, duration: -1, unit: gantt.config._duration_unit 
        })
    }

    // 근무 시간(근무일)의 시작;
    // 근무일이 끝나는 시점 계산
    if (date.getHours() == 8) {
        return gantt.calculateEndDate(date, 8);
    }
    // 근무 시간(근무일)의 끝;
    // 다음 근무일이 시작되는 시점 계산
    if (date.getHours() == 17) {
        return gantt.date.add(date, 15 * inc, "hour");
    }

    // 작업이 로드된 경우, 두 번째 스케일 셀의 근무 날짜를 계산
    // 작업이 없는 경우, 모든 스케일 셀의 날짜를 계산
    date = gantt.date.add(date, 1 * inc, "day");
    gantt.date.day_start(date);
    date = gantt.getClosestWorkTime({ date, dir: "future" })
    return date
};

gantt.config.scales = [
    { unit: "day_custom", step: 1, date: "%d %H:%i" },
];
gantt.config.work_time = true;

gantt.config.skip_off_time = false; /*!*/
~~~


**Related example:** [Equal offset for custom scales](https://snippet.dhtmlx.com/wmj92ys5)


근무 외 시간이 숨겨진 경우 스케일은 다음과 같이 표시됩니다:

![custom_first_scale_cell](/img/custom_first_scale_cell.png)

근무 외 시간이 표시되는 경우(**gantt.config.skip_off_time** 비활성화):

![first_scale_cell_without_skip_off_time](/img/disable_skip_off_time.png)

## 무한 스크롤 {#infinitescroll}

타임라인에서 무한 스크롤을 구현하는 자세한 예시는 [관련](guides/how-to.md#howtohaveaninfinitescrollinthetimeline) 문서에서 확인할 수 있습니다.

## 고정 라벨(Sticky labels) {#stickylabels}

버전 9.0부터 시간 스케일 라벨은 기본적으로 고정(sticky)됩니다. 즉, 셀의 너비가 라벨보다 훨씬 넓을 때도 타임라인을 스크롤하는 동안 라벨이 뷰포트에 고정되어 자연스럽게 사라질 때까지 계속 표시됩니다. 이 기능은 확대/축소 시에도 스케일 라벨이 항상 잘 보이도록 도와줍니다.

라벨이 셀 중앙에 위치하고 스크롤 시 고정되지 않던 이전 동작이 더 필요하다면, 스케일의 `sticky` 속성을 `false`로 설정하면 됩니다:

~~~js
gantt.config.scales = [
  {unit: "year", step: 1, format: "%Y", sticky: false},
  {unit: "month", step: 1, format: "%F", sticky: false},
  {unit: "day", step: 1, format: "%j", sticky: false}
];
gantt.init("gantt_here");
~~~

반대로, 셀 너비와 상관없이 특정 스케일에 대해 라벨 고정이 항상 적용되게 하려면 `sticky: true`로 설정하면 됩니다. 이 경우 라벨이 셀보다 좁아도 항상 고정됩니다:

~~~js
gantt.config.scales = [
  {unit: "year", step: 1, format: "%Y", sticky: true},
  {unit: "month", step: 1, format: "%F", sticky: true},
  {unit: "day", step: 1, format: "%j", sticky: true}
];
gantt.init("gantt_here");
~~~

