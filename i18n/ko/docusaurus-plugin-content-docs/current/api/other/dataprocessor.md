---
sidebar_label: dataprocessor
title: dataprocessor config
description: "dataprocessor 메서드 집합"
---

# dataprocessor

### Description

@short: Dataprocessor 메서드 집합


### Details

새로운 DataProcessor 인스턴스는 [createDataProcessor](api/method/createdataprocessor.md) 메서드를 사용하여 생성할 수 있습니다. 이전 방식으로는 [dataProcessor](api/method/dataprocessor.md) 생성자를 통해 인스턴스를 만들 수도 있습니다. <br>
**dataprocessor** 객체는 다음의 [메서드](#methods)와 [이벤트](#events)를 포함합니다:

### 메서드 {#methods}

<ul id="attachEvent">
  <li>
  <b>attachEvent (name, handler, settings): string</b> - DataProcessor API 이벤트에 핸들러를 추가합니다
  <ul>
  <li><b><i>name</i></b> - (<i>string</i>) - 이벤트 이름, 대소문자 구분 없음</li>
  <li><b><i>handler</i></b> - (<i>Function</i>) - 이벤트를 처리하는 함수</li>
  <li><b><i>settings?</i></b> - (<i>object</i>) - 선택적, 이벤트 핸들러 설정 객체</li>
  </ul>
  </li>
</ul>

<ul>
~~~js
const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST",
});

dp.attachEvent("onAfterUpdate", (id, action, tid, response) => {
    console.log("Updated task:", id);
});
~~~
</ul>

<ul id="detachEvent">
  <li>
  <b>detachEvent (id): void</b> - 이전에 추가된 이벤트 핸들러를 ID로 제거합니다
  <ul>
  <li><b><i>id</i></b> - (<i>string</i>) - 이벤트 핸들러 ID</li>
  </ul>
  </li>
</ul>

<ul>
~~~js
const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST",
});

const handlerId = dp.attachEvent("onAfterUpdate", (id, action, tid, response) => {
    console.log("Updated task:", id);
});

// 이벤트 리스너 제거
dp.detachEvent(handlerId);
~~~
</ul>

<ul id="getState">
  <li>
  <b class="submethod">getState (id): string</b> - 특정 항목의 상태(업데이트 여부)를 가져옵니다
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 항목의 ID</li>
  </ul>
  </li>
</ul>

<ul>
~~~js
const status = dp.getState(id);
~~~
</ul>

<ul id="ignore">
  <li>
  <b class="submethod">ignore (code): void</b> - DataProcessor 동작을 트리거하지 않고 코드 블록을 실행합니다
  <ul>
  <li><b><i>code</i></b> - (<i>Function</i>) - 데이터 변경 함수</li>
  </ul>
  </li>
</ul>

<ul>
~~~js
dp.ignore(() => {
    // 이 안의 변경사항은 저장되지 않습니다
    gantt.addTask({
        id: 10,
        text: "Task #5",
        start_date: "03-02-2025",
        duration: 5
    });
});
~~~

<p>서버에 변경사항을 저장하지 않고 데이터를 추가하거나 제거할 때 유용합니다.</p>
<i>dp.ignore() 메서드는 [gantt.silent()](api/method/silent.md)와 유사하게 동작합니다.</i>
</ul>

<ul id="setTransactionMode">
  <li>
  <b class="submethod">setTransactionMode (mode, total): void</b> - 서버에 데이터를 전송하는 방식을 설정합니다
  <ul>
  <li><b><i>mode</i></b> - (<i>string</i>) - 전송 방식, "GET", "POST", "REST", "JSON", "REST-JSON" 중 선택</li>
  <li><b><i>total</i></b> - (<i>boolean</i>) - 모든 데이터를 한 번에 보낼지, 각 레코드를 개별 전송할지 여부</li>
  </ul>
  </li>
</ul>

<ul>
~~~js
dp.setTransactionMode("POST", true);
~~~

<p>요청 시 커스텀 HTTP 헤더나 추가 데이터를 보내고 싶다면, 첫 번째 매개변수로 다음 속성을 가진 객체를 전달할 수 있습니다:</p>

<ul>
  <li><b><i>mode</i></b> - (<i>string</i>) - 데이터 전송 모드 예: "GET", "POST", "REST", "JSON", "REST-JSON"</li>
  <li><b><i>headers</i></b> - (<i>object</i>) - 요청에 포함할 헤더의 키-값 쌍</li>
  <li><b><i>payload</i></b> - (<i>object</i>) - 헤더와 함께 전송할 추가 키-값 쌍</li>
</ul>
~~~js
dp.setTransactionMode({
    mode: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Language": "fr-FR"
    },
    payload: {
        "user_id": "12"
    }
}, true);
~~~
</ul>

<ul id="setUpdated">
  <li>
  <b class="submethod">setUpdated (rowId, [mode, state]): void</b> - 항목을 업데이트된 상태로 표시하거나 해제합니다
  <ul>
  <li><b><i>rowId</i></b> - (<i>string | number</i>) - 항목 ID</li>
  <li><b><i>mode?</i></b> - (<i>boolean</i>) - 선택적, <code>true</code> (기본값)로 업데이트 표시, <code>false</code>로 미표시</li>
  <li><b><i>state?</i></b> - (<i>string</i>) - 선택적, 업데이트 상태 이름, 기본값은 <code>"updated"</code></li>
  </ul>
  </li>
</ul>

<ul>
~~~js
dp.setUpdated(1);
dp.setUpdated(2, true, "deleted");
~~~
</ul>


### 이벤트 {#events} 

<ul id="onAfterUpdate">
  <li>
  <b class="submethod">onAfterUpdate (id, action, tid, response): void</b> - 서버 응답을 받고 처리한 후 발생합니다
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 업데이트된 항목의 ID</li>
  <li><b><i>action</i></b> - (<i>string</i>) - 응답 상태 (작업 유형)</li>
  <li><b><i>tid</i></b> - (<i>string</i>) - 새 ID (삽입 작업에만 해당)</li>
  <li><b><i>response</i></b> - (<i>mixed</i>) - 파싱된 응답, XML 노드 또는 JSON 객체</li>
  </ul>
  </li>
</ul>

<ul>
~~~js
dp.attachEvent("onAfterUpdate", (id, action, tid, response) => {
    if (action === "error") {
        alert(`Server error: ${response.message}`);
    }
});
~~~
</ul>

<ul>
<p><b>가능한 응답 상태는 다음과 같습니다:</b></p>
<ul>
  <li><code>updated</code></li>
  <li><code>inserted</code></li>
  <li><code>deleted</code></li>
  <li><code>invalid</code></li>
  <li><code>error</code></li>
</ul>
</ul>

<ul id="onBeforeDataSending">
  <li>
  <b class="submethod">onBeforeDataSending (id, state, data): void</b> - 서버로 데이터를 보내기 직전에 발생합니다
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 항목 ID</li>
  <li><b><i>state</i></b> - (<i>string</i>) - 항목의 현재 상태 (작업 유형)</li>
  <li><b><i>data</i></b> - (<i>object</i>) - 전송될 직렬화된 데이터</li>
  </ul>
  </li>
</ul>

<ul>
~~~js
dp.attachEvent("onBeforeDataSending", (id, state, data) => {
    // 데이터 전송 전 커스텀 로직
    return true;
});
~~~
</ul>

<ul>
<p>이 이벤트는 각 데이터 업데이트 요청마다 발생합니다 (<code>onBeforeUpdate</code> 이후).</p>
<p>핸들러가 <code>false</code>를 반환하면 데이터는 서버로 전송되지 않습니다.</p>

<p><b>가능한 응답 상태:</b></p>
<ul>
  <li><code>updated</code></li>
  <li><code>inserted</code></li>
  <li><code>deleted</code></li>
  <li><code>invalid</code></li>
  <li><code>error</code></li>
</ul>
</ul>

<ul id="onBeforeUpdate">
  <li>
  <b class="submethod">onBeforeUpdate (id, state, data): void</b> - 레코드가 업데이트되기 전에 발생합니다
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 항목 ID</li>
  <li><b><i>state</i></b> - (<i>string</i>) - 항목 상태 (작업 유형)</li>
  <li><b><i>data</i></b> - (<i>object</i>) - 서버로 전송될 데이터</li>
  </ul>
  </li>
</ul>

<ul>
~~~js
dp.attachEvent("onBeforeUpdate", (id, state, data) => {
    // 업데이트 전 커스텀 로직
    return true;
});
~~~
</ul>

<ul>
<p>이 이벤트는 각 레코드가 업데이트될 때 발생하며, <code>onBeforeDataSending</code> 이전에 실행됩니다.</p>
<p><code>false</code>를 반환하면 데이터 전송이 중단됩니다.</p>

<p><b>가능한 응답 상태:</b></p>
<ul>
  <li><code>updated</code></li>
  <li><code>inserted</code></li>
  <li><code>deleted</code></li>
  <li><code>invalid</code></li>
  <li><code>error</code></li>
</ul>
</ul>

<ul id="onRowMark">
  <li>
  <b class="submethod">onRowMark (id, state, mode, invalid): void</b> - 업데이트된 항목에 마크를 하기 전에 발생합니다
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 오류와 관련된 항목 ID</li>
  <li><b><i>state</i></b> - (<i>string</i>) - 항목 상태 (작업 유형)</li>
  <li><b><i>mode</i></b> - (<i>boolean</i>) - <code>true</code>는 마크 추가, <code>false</code>는 마크 제거</li>
  <li><b><i>invalid</i></b> - (<i>object</i>) - 오류 상세 정보 (있을 경우)</li>
  </ul>
  </li>
</ul>

<ul>
~~~js
dp.attachEvent("onRowMark", (id, state, mode, invalid) => {
    // 항목에 마크하기 전 커스텀 로직
    return true;
});
~~~
</ul>

<ul>
<p>이 이벤트는 차단할 수 있습니다. <code>false</code>를 반환하면 해당 항목에 마크가 표시되지 않습니다.</p>
</ul>

### Related API
- [createDataProcessor](api/method/createdataprocessor.md)
- [dataProcessor](api/method/dataprocessor.md)

### Related Guides
- [Server-Side Integration](guides/server-side.md)

