---
title: "동적 로딩(수요에 따라)"
sidebar_label: "동적 로딩(수요에 따라)"
---

# 동적 로딩(수요에 따라)

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다
:::

기본적으로 dhtmlxGantt는 데이터를 한 번에 모두 로드합니다. 작업 수가 많아지면 문제가 될 수 있습니다.

이러한 상황에서 동적 로딩 모드를 사용하여 분기(하위 프로젝트)별로, 사용자가 열 때마다 단계별로 데이터를 로드할 수 있습니다. 

## 작동 원리

동적 로딩이 [활성화되면](#enablingdynamicloading), [gantt.load("url")](api/method/load.md) 호출은 지정된 URL로 GET 요청을 보내며, 응답에는 최상위 작업만 포함되고 중첩 분기는 닫힌 상태로 표시될 것으로 예상됩니다.

사용자가 확장 아이콘을 클릭하면, gantt는 자동으로 [load](api/method/load.md) 메서드를 호출하고 클릭된 작업의 id를 서버로 보냅니다:

~~~js
gantt.load("url?parent_id="123"");
~~~

그리고 응답에는 확장된 항목의 하위 작업이 포함될 것으로 예상됩니다.

:::note
요청 URL을 수정하거나 여기에 일부 추가 매개변수를 추가하려면 [onBeforeBranchLoading](api/event/onbeforebranchloading.md) 이벤트를 사용할 수 있습니다.
:::

## 동적 로딩 활성화 {#enablingdynamicloading}

Gantt 차트에서 동적 로딩을 활성화하려면 클라이언트 측과 서버 측 모두를 다루어야 합니다.

- 클라이언트 측(브랜치 로딩 옵션 사용):

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

**관련 샘플**: [요청 시 하위 작업 로딩(브랜치 로딩)](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)

일반적으로 클라이언트 측은 표시된 데이터 항목의 자식에 대한 정보를 가지고 있지 않습니다(이러한 자식은 서버 측에서 로드되지 않았습니다).

이 정보를 전달하려면 작업의 자식 수를 나타내는 특별한 데이터 속성 '$has_child'를 사용할 수 있습니다( [branch_loading_property](api/config/branch_loading_property.md)로 변경 가능). 

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

**관련 샘플**: [요청 시 하위 작업 로딩(브랜치 로딩)](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)


## 데이터 형식 for 동적 로딩

동적 로딩에 대한 데이터 형식은 다음과 같습니다:

~~~js
{
    "tasks":[
    {
        "id":13,
        "start_date":"2020-04-02 00:00:00",
        "duration":10,
        "text":"작업 #1",
        "progress":0.2,
        "parent":12,
        "open":0,
        "$has_child":0
    },
    {
        "id":14,
        "start_date":"2020-04-04 00:00:00",
        "duration":4,
        "text":"작업 #2",
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

보시다시피 일반 데이터 로딩에 사용되는 JSON과 동일합니다. 비교하려면 [지원되는 데이터 형식](guides/supported-data-formats.md) 문서를 확인하세요.

주요 차이점은 **$has_child** 속성으로, 작업이 확장 가능한지 여부를 나타냅니다.

- 만약 *$has_child* 속성이 특정되고 ['truthy'](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) 값(0이 아닌 숫자, true, 비어 있지 않은 문자열 등)을 포함하면, 항목은 확장/축소 토글로 표시됩니다. 토글을 확장하면 서버로 Ajax 요청이 전송됩니다.
- 만약 *$has_child*가 지정되지 않았거나 ['falsy'](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) 값을 포함하면(0, false, NaN, undefined, 빈 문자열, null), 항목은 토글 없이 표시되어 자식 항목이 없는 작업으로 표시됩니다.

만약 요청에 *parent_id* 매개변수가 있으면 응답은 지정된 ID의 작업의 자식을 포함해야 합니다. *parent_id*가 지정되지 않으면 요청은 루트 수준의 작업을 포함해야 합니다:

<table class="dp_table">
  <tr>
  <th><b>동작</b></th><th><b>HTTP 메서드</b></th><th><b>URL</b></th><th><b>응답</b></th>
  </tr>
  <tr>
  <td>루트 수준 로드</td>
  <td>GET</td>
  <td>/loadUrl</td>
  <td>동적 로딩 형식</td>
  </tr>
  <tr>
  <td>작업의 자식 로드</td>
  <td>GET</td>
  <td>/loadUrl?parent_id=id</td>
  <td>동적 로딩 형식</td>
  </tr>

</table>

### 작업을 동적으로 로드하기

스크롤을 맨 끝으로 내린 후에도 새 작업을 로드할 수 있도록 작업의 동적 로딩을 구현할 수 있습니다. 자세한 내용은 [작업을 동적으로 로드하는 방법](guides/how-to.md#how-to-load-tasks-dynamically) 문서를 참고하세요.

### 관련 API

- [branch_loading](api/config/branch_loading.md)
- [branch_loading_property](api/config/branch_loading_property.md)
- [onBeforeBranchLoading](api/event/onbeforebranchloading.md)
- [onAfterBranchLoading](api/event/onafterbranchloading.md)