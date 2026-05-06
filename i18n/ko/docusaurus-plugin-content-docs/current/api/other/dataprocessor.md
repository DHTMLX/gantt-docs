---
sidebar_label: dataprocessor
title: dataprocessor 구성
description: "dataprocessor 메서드 모음"
---

# dataprocessor

### Description

@short: dataprocessor 메서드 모음

### Details

DataProcessor의 새 인스턴스는 [createDataProcessor](api/method/createdataprocessor.md) 메서드를 사용하여 생성할 수 있습니다. 또는 [dataProcessor](api/method/dataprocessor.md) 생성자는 DataProcessor 인스턴스를 생성하는 레거시 방법을 제공합니다. 
**dataprocessor** 객체는 아래의 [methods](#methods) 및 [events](#events)를 갖습니다:

Methods

### Methods {#methods}

<ul id="attachEvent">
	<li>
		<b class="submethod">attachEvent (name, handler, settings): string</b> - DataProcessor의 API 이벤트에 핸들러를 연결합니다
		<ul><li><b><i>name</i></b> - (<i>string</i>) - 이벤트의 이름, 대소문자 구분 없이</li><li><b><i>handler</i></b> - (<i>Function</i>) - 핸들러 함수</li><li><b><i>settings?</i></b> - (<i>object</i>) - 선택적, 이벤트 핸들러의 설정을 포함하는 객체</li></ul>
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
		<b class="submethod">detachEvent (id): void</b> - attachEvent()로 이전에 연결된 이벤트에서 핸들러를 제거합니다
		<ul>
			<li><b><i>id</i></b> - (<i>string</i>) - 이벤트의 ID</li>
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

	// detach a listener
	dp.detachEvent(handlerId);
	~~~
</ul>

<ul id="getState">
	<li>
		<b class="submethod">getState (id): string</b> - 아이템의 상태를 반환합니다(업데이트되었는지 여부)
		<ul>
			<li><b><i>id</i></b> - (<i>string | number</i>) - 아이템의 ID</li>
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
		<b class="submethod">ignore (code): void</b> - DataProcessor를 트리거하지 않고 블록을 실행합니다
		<ul>
			<li><b><i>code</i></b> - (<i>Function</i>) - 데이터 수정 코드</li>
		</ul>
	</li>
</ul>

<ul>
	~~~js
	dp.ignore(() => {
		// 저장되지 않음
		gantt.addTask({
			id: 10,
			text: "Task #5",
			start_date: "03-02-2025",
			duration: 5
		});
	});
	~~~
<p>서버 측에서 변경 사항을 저장하고 싶지 않을 때 데이터를 추가하거나 삭제하는 작업을 여기에 배치할 수 있습니다.</p>
<i>dp.ignore() 메서드는 [gantt.silent()](api/method/silent.md)와 유사하게 작동합니다.</i>
</ul>

<ul id="setTransactionMode">
	<li>
		<b class="submethod">setTransactionMode (mode, total): void</b> - 데이터 전송 모드를 구성합니다
		<ul>
			<li><b><i>mode</i></b> - (<i>string</i>) - 데이터 전송 모드, "GET"|"POST"|"REST"|"JSON"|"REST-JSON"</li>
			<li><b><i>total</i></b> - (<i>boolean</i>) - 모든 데이터를 한 번에 전송할지 여부 또는 각 레코드를 별도 요청으로 보낼지 여부</li>
		</ul>
	</li>
</ul>

<ul>
~~~js
dp.setTransactionMode("POST", true);
~~~

<p>맞춤 HTTP 요청 헤더나 서버로 보낼 추가 데이터를 지정하려면 첫 번째 매개변수를 아래 속성을 가진 객체로 지정합니다:</p>

<ul>
	<li><b><i>mode</i></b> - (<i>string</i>) - 데이터 전송 모드, "GET", "POST", "REST", "JSON", "REST-JSON"</li>
	<li><b><i>headers</i></b> - (<i>object</i>) - 요청과 함께 전송되어야 하는 <code>"key":"value"</code> 쌍으로 정의된 헤더 집합</li>
	<li><b><i>payload</i></b> - (<i>object</i>) - 서버로 함께 전송될 추가 데이터, <code>"key":"value"</code> 쌍으로 설정</li>
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
		<b class="submethod">setUpdated (rowId, [mode, state]): void</b> - 항목의 업데이트 상태를 표시합니다
		<ul>
			<li><b><i>rowId</i></b> - (<i>string | number</i>) - 업데이트 상태를 설정할 아이템의 ID</li>
			<li><b><i>mode?</i></b> - (<i>boolean</i>) - 선택적, 기본값은 <code>true</code>로 "updated"를 의미, <code>false</code>는 "not updated"</li>
			<li><b><i>state?</i></b> - (<i>string</i>) - 선택적, 업데이트 모드 이름, 기본값은 <code>"updated"</code></li>
		</ul>
	</li>
</ul>

<ul>
~~~js
dp.setUpdated(1);
dp.setUpdated(2, true, "deleted");
~~~
</ul>
<ul id="getSyncState">
	<li>
		<b class="submethod">getSyncState (): boolean</b> - DataProcessor의 상태를 반환합니다(<i>true</i>는 모든 데이터가 저장되었음을 의미)
	</li>
</ul>

<ul>
~~~js
const state = dp.getSyncState();
~~~

<p>일부 레코드가 아직 저장되지 않았거나 "error" 응답을 받은 경우, 이 메서드는 <i>false</i>를 반환합니다.</p>
</ul>

<ul id="sendData">
	<li>
		<b class="submethod">sendData ([id]): void</b> - 아직 저장되지 않은 모든 데이터를 서버로 전송합니다
  <ul>
			<li><b><i>id</i></b> - (<i>string | number</i>) - 선택적, 아이템의 ID</li>
		</ul>
	</li>
</ul>

<ul>
~~~js
dp.sendData();
~~~

<p>ID가 제공되면 해당 아이템 하나만 서버로 전송됩니다.</p>
<p>매개변수를 주지 않고 호출하면 아직 저장되지 않은 모든 항목을 전송합니다.</p>
</ul>


### Events {#events} 

<ul id="onAfterUpdate">
	<li>
		<b class="submethod">onAfterUpdate (id, action, tid, response): void</b> - 서버 측 응답 수신 및 처리가 끝난 후 실행됩니다
		<ul>
			<li><b><i>id</i></b> - (<i>string | number</i>) - 업데이트된 아이템의 ID</li>
			<li><b><i>action</i></b> - (<i>string</i>) - 응답 상태(작업 유형)</li>
			<li><b><i>tid</i></b> - (<i>string</i>) - 새로운 ID(삽입 연산에만 해당)</li>
			<li><b><i>response</i></b> - (<i>mixed</i>) - 구문 분석된 응답을 포함하는 XML 노드 또는 JSON 객체</li>
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
<p><b>가능한 응답 상태:</b></p>
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
		<b class="submethod">onBeforeDataSending (id, state, data): void</b> - 서버로 데이터 전송 전에 실행됩니다
		<ul>
			<li><b><i>id</i></b> - (<i>string | number</i>) - 아이템의 ID</li>
			<li><b><i>state</i></b> - (<i>string</i>) - 아이템의 상태(작업 유형)</li>
			<li><b><i>data</i></b> - (<i>object</i>) - 서버로 전송될 직렬화된 데이터</li>
		</ul>
	</li>
</ul>

<ul>
~~~js
dp.attachEvent("onBeforeDataSending", (id, state, data) => {
	// 데이터 전송 전 사용자 정의 로직
	return true;
});
~~~
</ul>

<ul>
<p>이벤트는 각 데이터 업데이트 요청마다( <code>onBeforeUpdate</code> 이후)에 발생합니다.</p>
<p>이벤트 핸들러에서 <code>false</code>를 반환하면 서버로 데이터가 전송되는 것을 방지합니다.</p>

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
		<b class="submethod">onBeforeUpdate (id, state, data): void</b> - 레코드(또는 레코드들)를 업데이트하기 전에 실행됩니다
		<ul>
			<li><b><i>id</i></b> - (<i>string | number</i>) - 아이템의 ID</li>
			<li><b><i>state</i></b> - (<i>string</i>) - 아이템의 상태(작업 유형)</li>
			<li><b><i>data</i></b> - (<i>object</i>) - 서버로 전송될 데이터</li>
		</ul>
	</li>
</ul>

<ul>
~~~js
dp.attachEvent("onBeforeUpdate", (id, state, data) => {
	// 업데이트 전 사용자 정의 로직
	return true;
});
~~~
</ul>

<ul>
<p>이벤트는 각 업데이트 레코드에 대해 발생하며 <code>onBeforeDataSending</code> 이전에 호출됩니다.</p>
<p>이벤트 핸들러에서 <code>false</code>를 반환하면 서버로 데이터가 전송되지 않습니다.</p>

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
		<b class="submethod">onRowMark (id, state, mode, invalid): void</b> - 업데이트 항목의 마킹 시도를 차단하기 전 이벤트
		<ul>
			<li><b><i>id</i></b> - (<i>string | number</i>) - 오류가 발생한 항목의 ID</li>
			<li><b><i>state</i></b> - (<i>string</i>) - 아이템의 상태(작업 유형)</li>
			<li><b><i>mode</i></b> - (<i>boolean</i>) - <code>true</code>는 업데이트 마크를 추가, <code>false</code>는 제거</li>
			<li><b><i>invalid</i></b> - (<i>object</i>) - 오류에 대한 세부 정보(있다면)</li>
		</ul>
	</li>
</ul>

<ul>
~~~js
dp.attachEvent("onRowMark", (id, state, mode, invalid) => {
	// 항목 마킹 전 사용자 정의 로직
	return true;
});
~~~
</ul>

<ul>
<p>이벤트는 차단 가능하며, <code>false</code>를 반환하면 항목이 마킹되지 않습니다.</p>
</ul>

### Related API
- [createDataProcessor](api/method/createdataprocessor.md)
- [dataProcessor](api/method/dataprocessor.md)

### Related Guides
- [Server-Side Integration](guides/server-side.md)