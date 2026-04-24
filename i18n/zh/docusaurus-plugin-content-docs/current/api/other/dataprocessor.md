---
sidebar_label: dataprocessor
title: dataprocessor config
description: "一组 dataprocessor 方法"
---

# dataprocessor

### Description

@short: 一组 dataprocessor 方法


### Details

可以使用 [createDataProcessor](api/method/createdataprocessor.md) 方法创建一个新的 DataProcessor 实例。或者，使用 [dataProcessor](api/method/dataprocessor.md) 构造函数也提供了一种创建 DataProcessor 实例的旧式方式。 
**dataprocessor** 对象具备以下 [methods](#methods) 和 [events](#events)：

Methods

### Methods {#methods}

<ul id="attachEvent">
	<li>
		<b class="submethod">attachEvent (name, handler, settings): string</b> - 将处理程序附加到 DataProcessor 的一个 API 事件
		<ul><li><b><i>name</i></b> - (<i>string</i>) - 事件名称，忽略大小写</li><li><b><i>handler</i></b> - (<i>Function</i>) - 处理函数</li><li><b><i>settings?</i></b> - (<i>object</i>) - 可选，包含事件处理程序设置的对象</li></ul>
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
		<b class="submethod">detachEvent (id): void</b> - 取消附加到事件的处理程序（该事件之前通过 <b>attachEvent()</b> 方法附加）
		<ul>
			<li><b><i>id</i></b> - (<i>string</i>) - 事件的唯一标识符</li>
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
		<b class="submethod">getState (id): string</b> - 返回项的状态（已更新或未更新）
		<ul>
			<li><b><i>id</i></b> - (<i>string | number</i>) - 项的 ID</li>
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
		<b class="submethod">ignore (code): void</b> - 在不触发 DataProcessor 的情况下执行一段代码
		<ul>
			<li><b><i>code</i></b> - (<i>Function</i>) - 数据修改代码</li>
		</ul>
	</li>
</ul>

<ul>
	~~~js
	dp.ignore(() => {
		// won't be saved
		gantt.addTask({
			id: 10,
			text: "Task #5",
			start_date: "03-02-2025",
			duration: 5
		});
	});
	~~~
	<p>当你不想把这些改动保存到服务器端时，可以在这里放置数据添加和删除操作。</p>
	<i>The dp.ignore() method works similarly to [gantt.silent()](api/method/silent.md).</i>
</ul>

<ul id="setTransactionMode">
	<li>
		<b class="submethod">setTransactionMode (mode, total): void</b> - 配置数据发送模式
		<ul>
			<li><b><i>mode</i></b> - (<i>string</i>) - 数据发送模式，"GET"|"POST"|"REST"|"JSON"|"REST-JSON"</li>
			<li><b><i>total</i></b> - (<i>boolean</i>) - 定义，所有数据是否一次性发送，还是每条记录单独发送请求</li>
		</ul>
	</li>
</ul>

<ul>
~~~js
dp.setTransactionMode("POST", true);
~~~

<p>如要向服务器发送自定义 HTTP 请求头或附加数据，请将第一个参数指定为具有以下属性的对象：</p>

<ul>
	<li><b><i>mode</i></b> - (<i>string</i>) - 数据发送模式，"GET", "POST", "REST", "JSON", "REST-JSON"</li>
	<li><b><i>headers</i></b> - (<i>object</i>) - 一组头信息，呈现为 <code>"key":"value"</code> 对，应随请求一起发送</li>
	<li><b><i>payload</i></b> - (<i>object</i>) - 额外数据，以 <code>"key":"value"</code> 对的形式设置，应该与 headers 一起发送到服务器</li>
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
		<b class="submethod">setUpdated (rowId, [mode, state]): void</b> - 将项标记为已更新
		<ul>
			<li><b><i>rowId</i></b> - (<i>string | number</i>) - 要设置更新状态的项的 ID</li>
			<li><b><i>mode?</i></b> - (<i>boolean</i>) - 可选，<code>true</code>（默认）表示“已更新”，<code>false</code>表示“未更新”</li>
			<li><b><i>state?</i></b> - (<i>string</i>) - 可选，更新模式名称，默认为 <code>"updated"</code></li>
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
		<b class="submethod">getSyncState (): boolean</b> - 返回 DataProcessor 的状态（当所有数据都已保存时为 <i>true</i>）
	</li>
</ul>

<ul>
~~~js
const state = dp.getSyncState();
~~~

<p>如果某些记录尚未保存，或收到一个 "error" 响应，该方法将返回 <i>false</i>。</p>
</ul>

<ul id="sendData">
	<li>
		<b class="submethod">sendData ([id]): void</b> - 发送尚未保存到服务器端的所有数据
  <ul>
			<li><b><i>id</i></b> - (<i>string | number</i>) - 可选，项的 ID</li>
		</ul>
	</li>
</ul>

<ul>
~~~js
dp.sendData();
~~~

<p> 如果提供了 ID，则仅会将一个项发送到服务器端。</p>
<p> 未带参数调用时，该方法将发送所有尚未保存的项。</p>
</ul>


### Events {#events} 

<ul id="onAfterUpdate">
	<li>
		<b class="submethod">onAfterUpdate (id, action, tid, response): void</b> - 在收到并处理服务器端响应后触发
		<ul>
			<li><b><i>id</i></b> - (<i>string | number</i>) - 更新项的 ID</li>
			<li><b><i>action</i></b> - (<i>string</i>) - 响应状态（操作类型）</li>
			<li><b><i>tid</i></b> - (<i>string</i>) - 新的 ID（仅在插入操作时适用）</li>
			<li><b><i>response</i></b> - (<i>mixed</i>) - 包含解析后响应的 XML 节点或 JSON 对象</li>
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
<p><b>Possible response statuses:</b></p>
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
		<b class="submethod">onBeforeDataSending (id, state, data): void</b> - 在将数据发送到服务器之前触发
		<ul>
			<li><b><i>id</i></b> - (<i>string | number</i>) - 项的 ID</li>
			<li><b><i>state</i></b> - (<i>string</i>) - 项的状态（操作类型）</li>
			<li><b><i>data</i></b> - (<i>object</i>) - 将要发送到服务器的序列化数据</li>
		</ul>
	</li>
</ul>

<ul>
~~~js
dp.attachEvent("onBeforeDataSending", (id, state, data) => {
	// Custom logic before sending data
	return true;
});
~~~
</ul>

<ul>
<p>该事件在每次数据更新请求时触发（在 <code>onBeforeUpdate</code> 之后）。</p>
<p>从事件处理程序返回 <code>false</code> 将阻止数据发送到服务器。</p>

<p><b>Possible response statuses:</b></p>
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
		<b class="submethod">onBeforeUpdate (id, state, data): void</b> - 在更新记录（或多条记录）之前触发
		<ul>
			<li><b><i>id</i></b> - (<i>string | number</i>) - 项的 ID</li>
			<li><b><i>state</i></b> - (<i>string</i>) - 项的状态（操作类型）</li>
			<li><b><i>data</i></b> - (<i>object</i>) - 将要发送到服务器的数据</li>
		</ul>
	</li>
</ul>

<ul>
~~~js
dp.attachEvent("onBeforeUpdate", (id, state, data) => {
	// Custom logic before updating
	return true;
});
~~~
</ul>

<ul>
<p>此事件在每条记录更新时触发，并且在 <code>onBeforeDataSending</code> 之前。</p>
<p>返回 <code>false</code> 将阻止数据发送。</p>

<p><b>可能的响应状态:</b></p>
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
		<b class="submethod">onRowMark (id, state, mode, invalid): void</b> - 在为更新项添加标记之前触发
		<ul>
			<li><b><i>id</i></b> - (<i>string | number</i>) - 发生错误的项的 ID</li>
			<li><b><i>state</i></b> - (<i>string</i>) - 项的状态（操作类型）</li>
			<li><b><i>mode</i></b> - (<i>boolean</i>) - <code>true</code> 表示为添加更新标记，<code>false</code> 表示移除</li>
			<li><b><i>invalid</i></b> - (<i>object</i>) - 错误的详细信息（如有）</li>
		</ul>
	</li>
</ul>

<ul>
~~~js
dp.attachEvent("onRowMark", (id, state, mode, invalid) => {
    // 标记项之前的自定义逻辑
    return true;
});
~~~
</ul>

<ul>
<p>该事件是可被阻止的。返回 <code>false</code> 将阻止对该项进行标记。</p>
</ul>

### Related API
- [createDataProcessor](api/method/createdataprocessor.md)
- [dataProcessor](api/method/dataprocessor.md)

### Related Guides
- [Server-Side Integration](guides/server-side.md)