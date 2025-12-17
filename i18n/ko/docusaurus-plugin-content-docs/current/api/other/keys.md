---
sidebar_label: keys
title: keys config
description: "간트 차트의 단축키를 정의합니다"
---

# keys

### Description

@short: 간트 차트의 단축키를 정의합니다

@signature: keys: GanttHotkeys

### Example

~~~jsx
gantt.keys.edit_save = 32;
gantt.init("gantt_here");
~~~

### Details

**keys** 객체는 다음과 같은 속성을 포함합니다:

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <tr>
  <th>
  속성
  </th>
  <th>
  설명
  </th>
  <th>
  기본값
  </th>
  <th>
  적용 가능한 뷰
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>edit_save</td>
  <td>편집 작업을 확인하는 데 사용되는 키보드 키의 숫자 코드입니다 (lightbox에서 'Save' 버튼을 클릭하는 대신 사용)</td>
  <td>13 ('Enter' 키)</td>
  <td>모든 뷰</td>
  </tr>
  <tr>
  <td>edit_cancel</td>
  <td>편집 작업을 취소하는 데 사용되는 키보드 키의 숫자 코드입니다 (lightbox에서 'Cancel' 버튼을 클릭하는 대신 사용)</td>
  <td>27 ('Escape' 키)</td>
  <td>모든 뷰</td>
  </tr>
  </tbody>
</table>

:::note

참고로, 모든 **keys** 속성은 'number' 데이터 타입을 사용합니다.
 
:::
