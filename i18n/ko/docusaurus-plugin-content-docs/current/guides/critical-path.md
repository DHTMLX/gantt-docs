---
title: "임계 경로" 
sidebar_label: "임계 경로" 
--- 

# 임계 경로

:::info  
이 기능은 PRO 에디션에서만 사용할 수 있습니다.  
:::  

임계 경로는 지연될 수 없는 작업들의 순서입니다. 그렇지 않으면 전체 프로젝트가 지연됩니다.  

임계 경로는 또한 프로젝트가 소요할 수 있는 최단 시간을 결정합니다.  

작업이 임계로 간주되려면 여유 시간이 0일이어야 하며, 어떤 지연이라도 프로젝트 완료 날짜에 직접 영향을 미칩니다. 임계 경로 계산 로직의 작동 방식에 대한 자세한 설명은 [임계 경로 로직](#critical-path-logic) 섹션에 나와 있습니다.  

여유 시간은 다른 작업이나 프로젝트의 완료 날짜에 영향을 주지 않고 작업이 지나갈 수 있는 시간입니다.  

<div style="text-align:center;">![critical_path](/img/critical_path.png)</div>  

:::note  
확장 기능을 사용하려면 [gantt.plugins](api/method/plugins.md) 메서드를 사용해 활성화합니다.  
:::  

Gantt 차트에 임계 경로를 표시하려면 [highlight_critical_path](api/config/highlight_critical_path.md) 속성을 'true'로 설정합니다:  

(Gantt 차트에서 임계 경로를 표시하기)  
~~~js  
<!DOCTYPE html>
<html>
<head>
   <script src="codebase/dhtmlxgantt.js"></script>   
   <link href="codebase/dhtmlxgantt.css" rel="stylesheet">   
</head>
<body>
    gantt.plugins({ /*!*/
        critical_path: true /*!*/
    }); /*!*/
    gantt.config.highlight_critical_path = true;
    //your code will be here
</body>
</html>
~~~

[임계 경로](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)

참고로 속성이 활성화되면 dhtmlxGantt가 작업의 상태를 자동으로 확인하고 임계 경로를 업데이트합니다.  
임계 작업과 링크에는 각각 추가로 *'critical_task'* 와 *'critical_link'* CSS 클래스가 적용됩니다.  

작업이 수정될 때마다 dhtmlxGantt는 임계 경로를 재계산하기 위해 데이터를 전체적으로 다시 그림니다. 때때로 성능 문제가 발생할 수 있습니다. 이러한 경우, 컴포넌트는 특정 작업이나 링크를 확인하고 임계 경로를 표시하기 위한 성능 친화적 전략을 구현할 수 있도록 공용 메서드를 제공합니다.  


## 임계 경로 로직

다음과 같은 경우에 Gantt는 작업을 임계로 간주합니다:

1. 차트 전체에서 가장 마지막 날짜를 갖는 작업입니다.

![critical_tasks](/img/critical_tasks.png)

2. 해당 작업이 임계 작업에 연결되어 있고, 두 작업 간의 lag가 0일 때.

그 lag는 **gantt.config.duration_unit** 매개변수의 값에 따라 달라집니다. **duration_unit**이 *'일'*로 설정되고 작업 간 지속 시간이 여러 시간이 걸리는 경우, Gantt는 다음 규칙에 따라 지속 시간을 반올림합니다:

- 지속 시간이 12시간 이상인 경우 내림 처리
- 지속 시간이 12시간 미만인 경우 올림 처리

링크 객체에 lag 매개변수가 포함되어 있으면 작업 간 지속 시간을 변경할 수 있습니다. 예를 들어 *lag*가 1로 설정되면 작업 간 지속 시간이 1일일 때 해당 작업이 임계가 됩니다.  
다음은 **link.lag** 값이 다른 몇 가지 예입니다:

- link.lag가 0인 경우

~~~js
const tasks = {
    "data": [
        ...
    ],
    "links": [
        ...
        { "id": 3, "source": 3, "target": 4, "lag": 0, "type": "0" },
        
    ]
}
~~~

![lag0](/img/lag0.png)

- link.lag가 1인 경우

~~~js
const tasks = {
    "data": [
        ...
    ],
    "links": [
        ...
        { "id": 3, "source": 3, "target": 4, "lag": 1, "type": "0" }, 
        
    ]
}
~~~

![lag1](/img/lag1.png)

- link.lag가 -1인 경우

~~~js
const tasks = {
    "data": [
        ...
    ],
    "links": [
        ...
        { "id": 3, "source": 3, "target": 4, "lag": -1, "type": "0" },
        
    ]
}
~~~

![lag_1](/img/lag_1.png)

3. **gantt.config.project_end** 매개변수가 지정되어 있고 작업 날짜가 **gantt.config.project_end** 날짜보다 큰 경우.

안타깝게도 임계 경로를 정의하는 내장 로직을 변경하는 방법은 없습니다. 그러나 [임계 경로 동작 사용자 정의](#customizing-the-critical-path-behaviour)를 사용할 수 있습니다.  


## 작업이 임계인지 확인

일부 작업이 임계인지 확인하려면 [isCriticalTask](api/method/iscriticaltask.md) 메서드를 사용합니다:

~~~js
gantt.config.highlight_critical_path = true; /*!*/
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.isCriticalTask(gantt.getTask("task3"));// ->'true' /*!*/
~~~


[임계 경로](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)


## 링크가 임계인지 확인

링크가 임계인지 확인하려면 (두 임계 작업을 연결하는지) [isCriticalLink](api/method/iscriticallink.md) 메서드를 사용합니다:

~~~js
gantt.isCriticalLink(gantt.getLink("link1"));
~~~


[임계 경로](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)


## 자유 여유 시간 및 전체 여유 시간 {#gettingfreeandtotalslack}

**자유 여유 시간** - 연결된 다음 작업에 영향을 주지 않고 작업의 지속 시간을 늘리거나 타임라인에서 위치를 옮길 수 있는 시간의 기간.

자유 여유 시간은 'task' 타입과 'milestone' 타입의 작업에 대해 계산될 수 있습니다.

작업의 자유 여유 시간을 얻으려면 [getFreeSlack](api/method/getfreeslack.md) 메서드를 사용합니다. 이 메서드는 작업 객체를 매개변수로 받습니다:

~~~js
var task = gantt.getTask(7);
gantt.getFreeSlack(task);
~~~


[슬랙 시간 표시](https://docs.dhtmlx.com/gantt/samples/08_api/17_show_task_slack.html)


**전체 여유 시간** - 전체 프로젝트의 종료 시간에 영향을 주지 않고 작업의 지속 시간을 늘리거나 타임라인에서 위치를 옮길 수 있는 시간의 기간.

전체 여유 시간은 프로젝트를 포함한 모든 유형의 작업에 대해 계산될 수 있습니다.

작업의 전체 여유 시간을 얻으려면 [getTotalSlack](api/method/gettotalslack.md) 메서드를 사용합니다. 이 메서드는 작업 객체를 매개변수로 받습니다:

~~~js
var task = gantt.getTask(7);
gantt.getTotalSlack(task);
~~~


[슬랙 시간 표시](https://docs.dhtmlx.com/gantt/samples/08_api/17_show_task_slack.html)


![Slack](/img/show_slack.png)


## 임계 경로 동작 사용자 정의

기본적으로 Gantt는 임계 경로에 기본 동작을 적용합니다. 예를 들어 강조 표시의 기본 스타일이나 데이터 업데이트마다 임계 경로를 재계산하는 방식 등이 해당됩니다.

임계 경로의 가시성을 조정하려면 다음과 같은 방법을 사용합니다:

~~~js
var isEnabled = false
function updateCriticalPath(){
    isEnabled = !isEnabled;
    
    gantt.config.highlight_critical_path = isEnabled;
    
    gantt.render();
}
~~~


태스크 수가 많아 임계 경로를 재계산하는 것이 성능에 영향을 줄 수 있을 때 유용합니다.  


임계 경로를 수동으로 재계산하고 관련 스타일링을 적용하려면 아래와 같은 방법을 사용합니다:

~~~js
gantt.templates.task_class = function(start, end, task){
    if(gantt.isCriticalTask(task))
        return "critical_task";
      return "";
};

gantt.templates.link_class = function(link){
    if(gantt.isCriticalLink(link))
        return "critical_link";
      return "";
};

var data = {
    tasks: [
        { id: 1, text: "Office itinerancy", open:true, type:"project" },
        { id: 2, text: "Office facing", start_date: "21-07-2020", 
            duration: "20", parent: "1" },
        { id: 3, text: "Furniture installation", start_date: "21-07-2020", 
            duration: "5", parent: "1" },
        { id: 4, text: "The employee relocation", start_date: "28-07-2020", 
            duration: "15", parent: "1" },
        { id: 5, text: "Interior office", start_date: "28-07-2020", 
            duration: "15", parent: "1" }
    ],
    links: [
        { id: "1", source: "2", target: "3", type: "0" },
        { id: "2", source: "3", target: "4", type: "0" },
        { id: "3", source: "4", target: "5", type: "0" }
    ]
};
gantt.init("gantt_here");

gantt.parse(data);
~~~


다음과 같이 수동으로 강조 표시도 가능합니다:

- [task_class 템플릿에서 "gantt_critical_task"를 반환하면 해당 작업은 임계 작업으로 강조 표시됩니다.]  
- [link_class 템플릿에서 "gantt_critical_link"를 반환하면 해당 링크는 임계 링크로 강조 표시됩니다.]

**관련 샘플:** [Custom critical path per project](https://snippet.dhtmlx.com/jd4dyc5p)


## 작업 간 지연(lag) 및 선행 시간 설정

작업 간 임계 경로의 지연(lag) 및 선행 시간을 설정하는 것이 가능합니다. 자세한 내용은 [여기](guides/auto-scheduling.md#settinglagandleadtimesbetweentasks)를 참조하십시오.  


## 완료된 작업의 스케줄링

기본적으로 임계 경로 알고리즘이 완료된 작업(진행 값이 1인 작업)과 미완료 작업을 처리하는 방식에는 차이가 없습니다.

원하면 이 동작을 바꾸기 위해 [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md) 설정을 활성화할 수 있습니다:

~~~js
gantt.config.auto_scheduling_use_progress = true;
 
gantt.init("gantt_here");
~~~

구성 요소가 활성화되면 완료된 작업은 임계 경로와 자동 스케줄링에서 제외됩니다.

자세한 내용은 [API 페이지](api/config/auto_scheduling_use_progress.md)를 참조하십시오.