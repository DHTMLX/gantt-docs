---
title: "Critical Path"
sidebar_label: "Critical Path"
---

# Critical Path


:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다
:::

크리티컬 패스는 전체 프로젝트를 지연시키지 않고는 미룰 수 없는 일련의 작업들을 의미합니다.


또한, 프로젝트를 완수하는 데 필요한 최소 기간을 정의합니다.



작업의 여유 시간이 0일 때, 즉 해당 작업이 지연되면 프로젝트의 종료일이 직접적으로 영향을 받는 경우, 해당 작업은 크리티컬로 간주됩니다. 크리티컬 패스가 어떻게 계산되는지에 대한 자세한 내용은 [Critical path logic](#criticalpathlogic) 섹션에서 확인하실 수 있습니다.


여유 시간(slack time)이란, 작업이 다음 작업이나 전체 프로젝트 마감일에 영향을 주지 않고 지연될 수 있는 시간을 의미합니다.


<div style="text-align:center;">![critical_path](/img/critical_path.png)</div>

:::note
이 확장 기능을 사용하려면 [gantt.plugins](api/method/plugins.md) 메서드를 통해 활성화하세요.
:::

간트 차트에서 크리티컬 패스를 표시하려면 [highlight_critical_path](api/config/highlight_critical_path.md) 속성을 'true'로 설정하세요:

**간트 차트에서 크리티컬 패스 표시 활성화**
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


[Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)



이 속성이 활성화되면, dhtmlxGantt는 작업 상태를 자동으로 모니터링하고 크리티컬 패스를 업데이트합니다.
크리티컬 작업과 링크에는 각각 *'critical_task'* 및 *'critical_link'*라는 추가 CSS 클래스가 지정됩니다.

작업이 업데이트될 때마다, dhtmlxGantt는 데이터를 완전히 다시 그려 크리티컬 패스를 재계산합니다.
이 과정은 성능에 영향을 줄 수 있습니다. 이를 해결하기 위해, 특정 작업이나 링크만 확인할 수 있는 공개 메서드가 제공되어 크리티컬 패스 표시 시 더 나은 성능을 보장할 수 있습니다.


## Critical path logic


간트는 다음 조건에서 작업을 크리티컬로 표시합니다:

1. 해당 작업이 전체 차트에서 가장 마지막 종료일을 가진 경우.

![](/img/critical_tasks.png)

2. 해당 작업이 지연(lag)이 0인 크리티컬 작업과 연결된 경우.

지연(lag)은 **gantt.config.duration_unit** 설정에 따라 달라집니다. **duration_unit**이 *'day'*로 설정되어 있고 작업 기간이 여러 시간에 걸쳐 있을 경우, 간트는 기간을 다음과 같이 반올림합니다:

- 기간이 12시간 이상이면 내림(round down)
- 12시간 미만이면 올림(round up)

링크 객체에 lag 파라미터가 포함되어 있으면 작업 간의 기간이 변경됩니다. 예를 들어, *lag*가 1이면 두 작업 간의 기간이 1일 때 해당 작업이 크리티컬이 됩니다.
    
아래는 **link.lag** 값이 다른 예시입니다:

- link.lag이 0일 때

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

![](/img/lag0.png)

- link.lag이 1일 때

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

![](/img/lag1.png)

- link.lag이 -1일 때

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

![](/img/lag_1.png)

3. **gantt.config.project_end** 파라미터가 설정되어 있고, 작업 날짜가 이를 초과할 때.

현재 내장된 크리티컬 패스 로직은 변경할 수 없습니다.
하지만 [크리티컬 패스 동작을 커스터마이징](#customizingthecriticalpathbehaviour)할 수 있습니다.

## Checking if a task is critical 

작업이 크리티컬인지 확인하려면 [isCriticalTask](api/method/iscriticaltask.md) 메서드를 사용하세요:

~~~js
gantt.config.highlight_critical_path = true; /*!*/
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.isCriticalTask(gantt.getTask("task3"));// ->'true' /*!*/
~~~


[Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)


## Checking if a link is critical 


링크가 두 크리티컬 작업을 연결하는지 확인하려면 [isCriticalLink](api/method/iscriticallink.md) 메서드를 사용하세요:

~~~js
gantt.isCriticalLink(gantt.getLink("link1"));
~~~


[Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)



## Getting free and total slack


**Free slack(자유 여유 시간)**은 작업이나 마일스톤이 다음 연결된 작업을 지연시키지 않고 연장되거나 이동될 수 있는 시간입니다.

자유 여유 시간은 'task' 및 'milestone' 타입에 적용됩니다.

작업의 자유 여유 시간을 가져오려면, [getFreeSlack](api/method/getfreeslack.md) 메서드에 작업 객체를 전달하세요:

~~~js
var task = gantt.getTask(7);
gantt.getFreeSlack(task);
~~~


[Show Slack time](https://docs.dhtmlx.com/gantt/samples/08_api/17_show_task_slack.html)


**Total slack(총 여유 시간)**은 작업이 프로젝트 전체 완료 일자에 영향을 주지 않고 지연될 수 있는 시간입니다.

총 여유 시간은 프로젝트를 포함한 모든 작업 유형에 대해 계산할 수 있습니다.

작업의 총 여유 시간을 얻으려면 [getTotalSlack](api/method/gettotalslack.md) 메서드에 작업 객체를 사용하세요:

~~~js
var task = gantt.getTask(7);
gantt.getTotalSlack(task);
~~~


[Show Slack time](https://docs.dhtmlx.com/gantt/samples/08_api/17_show_task_slack.html)


![Slack](/img/show_slack.png)

## Customizing the critical path behaviour

기본적으로 gantt는 크리티컬 패스에 대해 기본 하이라이트 스타일을 적용하고, 데이터가 변경될 때마다 경로를 다시 계산합니다.

크리티컬 패스의 표시 여부를 제어하려면 다음과 같은 방법을 사용할 수 있습니다:

~~~js
var isEnabled = false
function updateCriticalPath(){
    isEnabled = !isEnabled;
    
    gantt.config.highlight_critical_path = isEnabled;
    
    gantt.render();
}
~~~

많은 작업을 관리할 때 크리티컬 패스를 자주 재계산하면 성능에 영향을 줄 수 있으므로, 이 방법이 유용합니다.


크리티컬 패스를 수동으로 재계산하고 스타일을 업데이트하려면 다음과 같이 하세요:

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




작업과 링크를 수동으로 하이라이트 할 수도 있습니다:

- [task_class](api/template/task_class.md) 템플릿에서 "gantt_critical_task"를 반환하면 해당 작업이 크리티컬로 표시됩니다.
- [link_class](api/template/link_class.md) 템플릿에서 "gantt_critical_link"를 반환하면 해당 링크가 크리티컬로 표시됩니다.

**관련 예제:** [Custom critical path per project](https://snippet.dhtmlx.com/jd4dyc5p)

## Setting lag and lead times between tasks


크리티컬 패스 작업 간의 지연(lag) 및 리드(lead) 시간을 설정할 수 있습니다. 자세한 내용은 [여기](guides/auto-scheduling.md#settinglagandleadtimesbetweentasks)에서 확인하세요.

## Scheduling completed tasks


기본적으로 크리티컬 패스 알고리즘은 완료된 작업(progress 값이 1인 작업)도 미완료 작업과 동일하게 처리합니다.

이 동작을 변경하려면 [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md) 설정을 활성화할 수 있습니다:

~~~js
gantt.config.auto_scheduling_use_progress = true;
 
gantt.init("gantt_here");
~~~

이 옵션을 활성화하면, 완료된 작업은 크리티컬 패스 및 자동 스케줄링에서 제외됩니다.

자세한 정보는 [API 페이지](api/config/auto_scheduling_use_progress.md)에서 확인할 수 있습니다.


