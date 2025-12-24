---
title: "링크 속성"
sidebar_label: "링크 속성"
---

# 링크 속성  


이 페이지에서는 링크 객체가 가질 수 있는 모든 속성에 대해 설명합니다.

작업 객체의 속성에 대한 전체 개요는 [Task Properties](guides/task-properties.md) 문서를 참고하세요.

## 필수 속성  


<table>
    <tbody>
        <tr>
            <th>이름</th><th>타입</th><th>설명</th>
        </tr>
        <tr>
            <td><b class="subproperty">id</b></td>
            <td><i>string | number</i></td>
            <td>링크의 고유 식별자입니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">source</b></td>
            <td><i>string | number</i></td>
            <td>의존성이 시작되는 작업의 id입니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">target</b></td>
            <td><i>string | number</i></td>
            <td>의존성이 끝나는 작업의 id입니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">type</b></td>
            <td><i>string</i></td>
            <td>의존성의 유형입니다. 사용 가능한 옵션은 [links](api/config/links.md) 객체에서 정의되어 있습니다. 기본적으로 가능한 값은 다음과 같습니다: <ul> <li><b>"0"</b> - 'finish_to_start'</li> <li><b>"1"</b> - 'start_to_start'</li> <li><b>"2"</b> - 'finish_to_finish'</li> <li><b>"3"</b> - 'start_to_finish'</li> </ul></td>
        </tr>
    </tbody>
</table>

기본값('0','1','2') 대신 다른 값을 의존성 유형으로 사용하고 싶다면, [links](api/config/links.md) 객체의 관련 속성을 수정하여 커스터마이즈할 수 있습니다. 예시:

~~~js
gantt.config.links.start_to_start = "start2start";
~~~

이 변경은 의존성 유형이 저장되는 방식에만 영향을 주며, 표시 방식에는 영향을 주지 않습니다.

## 선택적 속성  


<table>
    <tbody>
        <tr>
            <th>이름</th><th>타입</th><th>설명</th>
        </tr>
        <tr>
            <td><b class="subproperty">lag</b></td>
            <td><i>number</i></td>
            <td>[작업 간의 지연 시간(lag time)](guides/auto-scheduling.md#settinglagandleadtimesbetweentasks)입니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">readonly</b></td>
            <td><i>boolean</i></td>
            <td>링크를 [읽기 전용](guides/readonly-mode.md)으로 표시합니다.</td>
        </tr>
        <tr>
            <td><b class="subproperty">editable</b></td>
            <td><i>boolean</i></td>
            <td>링크를 [편집 가능](guides/readonly-mode.md)으로 표시합니다.</td>
        </tr>
    </tbody>
</table>

## 예시

~~~js
var data = {
    tasks: [
        {id:1, text:"Project #1", start_date:"01-04-2020", duration:18},
         {id:2, text:"Task #1", start_date:"02-04-2020", duration:8, parent:1},
         {id:3, text:"Task #2", start_date:"11-04-2020", duration:8, parent:1}
    ],
    links:[
        {id:1, source:1, target:2, type:"1"},
        {id:2, source:2, target:3, type:"0"}
    ]
};
~~~

