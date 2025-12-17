---
title: "동적 로딩 (온디맨드)"
sidebar_label: "동적 로딩 (온디맨드)"
---

동적 로딩 (온디맨드)
=========================================

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다
:::

기본적으로 dhtmlxGantt는 모든 데이터를 한 번에 로드합니다. 이는 많은 수의 작업을 다루는 경우에는 부담이 될 수 있습니다.

이런 경우에는 동적 로딩 모드를 사용하여 데이터를 브랜치(하위 프로젝트)별로, 단계별로 사용자가 확장할 때마다 로드할 수 있습니다.

작동 방식
----------------

동적 로딩이 [활성화](#enablingdynamicloading)되면, [gantt.load("url")](api/method/load.md) 호출은 지정된 URL로 GET 요청을 보내며, 응답에는 최상위 작업만 포함되어 있고 모든 하위 브랜치는 처음에는 닫혀 있어야 합니다.

사용자가 확장 아이콘을 클릭하면, gantt는 자동으로 [load](api/method/load.md) 메서드를 호출하며, 클릭된 작업의 id를 서버로 전송합니다:

~~~js
gantt.load("url?parent_id="123"");
~~~

서버는 확장된 항목의 하위 작업 목록을 응답으로 보내야 합니다.

:::note
[onBeforeBranchLoading](api/event/onbeforebranchloading.md) 이벤트를 사용하여 요청 URL을 수정하거나 추가 파라미터를 전달할 수 있습니다.
:::

## 동적 로딩 활성화하기 {#enablingdynamicloading}

<span id="enabledynload">Gantt 차트에서 동적 로딩을 활성화하려면</span>, 클라이언트와 서버 모두에서 설정이 필요합니다.

- 클라이언트 측 ([branch_loading](api/config/branch_loading.md) 옵션 사용):

~~~js
gantt.config.xml_date = "%Y-%m-%d %H:%i:%s";
gantt.config.branch_loading = true;

gantt.init("gantt_here");

gantt.load("/dynamic_loading");
~~~

- 서버 측:

~~~php
<?php

include ('config.php');

$gantt = new JSONGanttConnector($res, $dbtype);

$parent_id = isset($_GET["parent_id"]) ? $_GET["parent_id"] : 0;

$gantt->mix("open", 0);
$gantt->mix("deep", 1);

$gantt->render_links("gantt_links", "id", "source,target,type");
$gantt->render_table(
    "gantt_tasks",
    "id",
    "start_date,duration,text,progress,parent",
    "", 
    "parent"
);
~~~
    

[Loading subtasks on demand (branch loading)](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)






일반적으로 클라이언트 측에서는 표시된 데이터 항목의 자식 정보를 가지고 있지 않습니다. 이는 자식 항목이 처음에는 서버에서 로드되지 않기 때문입니다.

이 정보를 제공하기 위해, 특별한 데이터 속성 '$has_child'([branch_loading_property](api/config/branch_loading_property.md)에서 커스터마이즈 가능)를 사용하여 작업의 자식 요소 개수를 표시할 수 있습니다.

~~~php
function check_children($row){
 global $gantt;
 $task_id = $row->get_value('id');
 $sql = "SELECT COUNT(id) AS has_children FROM gantt_tasks WHERE parent='{$task_id}'";
 $children = $gantt->sql->query($sql);
    
 $child = $gantt->sql->get_next($children);
 $children_qty = $child['has_children'];

 $row->set_userdata('$has_child',$children_qty);
}
$gantt->event->attach("beforeRender","check_children");
~~~


[Loading subtasks on demand (branch loading)](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)



동적 로딩을 위한 데이터 포맷
-----------------------

동적 로딩을 위한 데이터 포맷은 다음과 같습니다:

~~~js
{
    "tasks":[
    {
        "id":13,
        "start_date":"2020-04-02 00:00:00",
        "duration":10,
        "text":"Task #1",
        "progress":0.2,
        "parent":12,
        "open":0,
        "$has_child":0
    },
    {
        "id":14,
        "start_date":"2020-04-04 00:00:00",
        "duration":4,
        "text":"Task #2",
        "progress":0.9,
        "parent":12,
        "open":0,
        "$has_child":4
    }],

    "links":[
        {"id":1,"source":1,"target":2,"type":"0"},
        {"id":2,"source":1,"target":3,"type":"0"},
        {"id":3,"source":1,"target":4,"type":"0"}
    ]

}
~~~

이 포맷은 일반 데이터 로딩에 사용되는 JSON 포맷과 동일합니다. 비교를 위해 [지원되는 데이터 형식](guides/supported-data-formats.md) 문서를 참고하세요.

주요 차이점은 **$has_child** 속성입니다. 이 속성은 해당 작업이 'leaf'(확장 토글이 없는 항목)인지, 확장 가능한 노드인지 결정합니다:

- *$has_child* 속성이 존재하고 ['truthy'](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) 값(0이 아닌 숫자, true, 비어있지 않은 문자열 등)을 가지면, 해당 항목에 확장/축소 토글이 표시됩니다. 확장 시 서버로 Ajax 요청이 전송됩니다.
- *$has_child* 속성이 없거나 ['falsy'](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) 값(0, false, NaN, undefined, 빈 문자열, null 등)이면, 토글 없이 표시되어 자식 작업이 없음을 나타냅니다.

요청에 *parent_id* 파라미터가 포함되어 있으면, 응답에는 해당 id를 가진 작업의 자식들이 포함되어야 합니다. *parent_id*가 없으면, 응답에는 루트 레벨 작업들이 포함되어야 합니다:

<table class="dp_table">
    <tr>
        <th><b>동작</b></th><th><b>HTTP 메서드</b></th><th><b>URL</b></th><th><b>응답</b></th>
    </tr>
    <tr>
        <td>루트 레벨 로드</td>
        <td>GET</td>
        <td>/loadUrl</td>
        <td>[동적 로딩 데이터 포맷](#dynamicloadingformatofdata)</td>
    </tr>
    <tr>
        <td>작업의 자식 로드</td>
        <td>GET</td>
        <td>/loadUrl?parent_id=id</td>
        <td>[동적 로딩 데이터 포맷](#dynamicloadingformatofdata)</td>
    </tr>

</table>

## 작업을 동적으로 로드하기

작업의 동적 로딩은 마지막으로 표시된 작업까지 스크롤할 때마다 새로운 작업을 불러오는 방식으로도 구현할 수 있습니다. 자세한 내용은 [How to load tasks dynamically](guides/how-to.md#howtoloadtasksdynamically) 문서를 참고하세요.

