---
title: "링크 속성"
sidebar_label: "링크 속성"
---

# 링크 속성

이 페이지에서는 링크 객체가 포함할 수 있는 모든 속성의 전체 목록을 확인할 수 있습니다.

작업 객체의 전체 속성 목록은 [작업 속성](guides/task-properties.md) 문서에 나와 있습니다.

## 필수 속성

<table>
  <tbody>
  <tr>
  <th>이름</th><th>유형</th><th>설명</th>
  </tr>
  <tr>
  <td><b class="subproperty">id</b></td>
  <td><i>string | number</i></td>
  <td>링크의 식별자</td>
  </tr>
  <tr>
  <td><b class="subproperty">source</b></td>
  <td><i>string | number</i></td>
  <td>의존성이 시작될 작업의 ID</td>
  </tr>
  <tr>
  <td><b class="subproperty">target</b></td>
  <td><i>string | number</i></td>
  <td>의존성이 끝나는 작업의 ID</td>
  </tr>
  <tr>
  <td><b class="subproperty">type</b></td>
  <td><i>string</i></td>
  <td>의존성 유형. 사용 가능한 값은 [links](api/config/links.md) 객체에 저장되어 있습니다. 기본값은 다음과 같습니다: <ul> <li><b>"0"</b> - 'finish_to_start'.</li> <li><b>"1"</b> - 'start_to_start'.</li> <li><b>"2"</b> - 'finish_to_finish'.</li> <li><b>"3"</b> - 'start_to_finish'.</li> </ul></td>
  </tr>
  </tbody>
</table>

의존성 유형을 기본값('0','1','2') 이외의 방식으로 저장하고자 한다면, [links](api/config/links.md) 객체의 관련 속성 값을 변경할 수 있습니다. 예:

~~~js
gantt.config.links.start_to_start = "start2start";
~~~

참고로, 이러한 값은 의존성 유형이 저장되는 방식에만 영향을 미치며, 시각화 동작에는 영향을 주지 않습니다. 

## 선택적 속성

<table>
  <tbody>
  <tr>
  <th>이름</th><th>유형</th><th>설명</th>
  </tr>
  <tr>
  <td><b class="subproperty">lag</b></td>
  <td><i>number</i></td>
  <td>[작업의 지연](guides/auto-scheduling.md#settinglagandleadtimesbetweentasks)</td>
  </tr>
  <tr>
  <td><b class="subproperty">readonly</b></td>
  <td><i>boolean</i></td>
  <td>링크를 [readonly](guides/readonly-mode.md)</td>
  </tr>
  <tr>
  <td><b class="subproperty">editable</b></td>
  <td><i>boolean</i></td>
  <td>링크를 [editable](guides/readonly-mode.md#details-of-the-editable_property-config-option)</td>
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