---
sidebar_label: dataprocessor
title: конфигурация dataprocessor
description: "набор методов dataprocessor"
---

# dataprocessor

### Description

@short: Набор методов dataprocessor

### Details

Новый экземпляр DataProcessor можно создать с помощью метода [createDataProcessor](api/method/createdataprocessor.md). В качестве альтернативы конструктор [dataProcessor](api/method/dataprocessor.md) предоставляет устаревшее средство создания экземпляра DataProcessor.
Объект **dataprocessor** имеет следующие [методы](#methods) и [события](#events):

Методы

### Методы {#methods}

<ul id="attachEvent">
	<li>
		<b class="submethod">attachEvent (name, handler, settings): string</b> - прикрепляет обработчик к API-событию DataProcessor
		<ul><li><b><i>name</i></b> - (<i>string</i>) - имя события, регистронезависимое</li><li><b><i>handler</i></b> - (<i>Function</i>) - функция-обработчик</li><li><b><i>settings?</i></b> - (<i>object</i>) - опционально, объект параметров для обработчика события</li></ul>
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
		<b class="submethod">detachEvent (id): void</b> - отсоединяет обработчик от события (которое было подключено ранее методом <b>attachEvent()</b>)
		<ul>
			<li><b><i>id</i></b> - (<i>string</i>) - идентификатор события</li>
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
		<b class="submethod">getState (id): string</b> - возвращает состояние элемента (обновлён или нет)
		<ul>
			<li><b><i>id</i></b> - (<i>string | number</i>) - идентификатор элемента</li>
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
		<b class="submethod">ignore (code): void</b> - выполняет блок кода без триггера DataProcessor
		<ul>
			<li><b><i>code</i></b> - (<i>Function</i>) - код изменений данных</li>
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
<p>Вы можете разместить здесь операции добавления и удаления данных, когда не хотите сохранять эти изменения на сервере.</p>
<i>Метод dp.ignore() работает аналогично [gantt.silent()](api/method/silent.md).</i>
</ul>

<ul id="setTransactionMode">
	<li>
		<b class="submethod">setTransactionMode (mode, total): void</b> - настраивает режим отправки данных
		<ul>
			<li><b><i>mode</i></b> - (<i>string</i>) - режим отправки данных, "GET"|"POST"|"REST"|"JSON"|"REST-JSON"</li>
			<li><b><i>total</i></b> - (<i>boolean</i>) - определяет, отправляются ли все данные сразу целиком, или каждая запись отправляется отдельным запросом</li>
		</ul>
	</li>
</ul>

<ul>
~~~js
dp.setTransactionMode("POST", true);
~~~

<p>Чтобы отправлять на сервер собственные заголовки HTTP-запросов или дополнительные данные, укажите первый параметр как объект со следующими свойствами:</p>

<ul>
	<li><b><i>mode</i></b> - (<i>string</i>) - режим отправки данных, "GET", "POST", "REST", "JSON", "REST-JSON"</li>
	<li><b><i>headers</i></b> - (<i>object</i>) - набор заголовков, заданных как пары <code>"key":"value"</code>, которые должны быть отправлены с запросом</li>
	<li><b><i>payload</i></b> - (<i>object</i>) - дополнительные данные, заданные как пары <code>"key":"value"</code>, которые следует отправить на сервер вместе с заголовками</li>
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
		<b class="submethod">setUpdated (rowId, [mode, state]): void</b> - помечает элемент как обновлённый
		<ul>
			<li><b><i>rowId</i></b> - (<i>string | number</i>) - идентификатор элемента, для которого задаётся статус обновления</li>
			<li><b><i>mode?</i></b> - (<i>boolean</i>) - опционально, <code>true</code> (по умолчанию) для "обновлено", <code>false</code> для "не обновлено"</li>
			<li><b><i>state?</i></b> - (<i>string</i>) - опционально, имя режима обновления, <code>"updated"</code> по умолчанию</li>
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
	<li><b class="submethod">getSyncState (): boolean</b> - возвращает состояние DataProcessor (true, когда все данные сохранены)</li>
</ul>

<ul>
~~~js
const state = dp.getSyncState();
~~~

<p>Если некоторые записи ещё не сохранены или получили ответ с ошибкой, метод вернёт <i>false</i>.</p>
</ul>

<ul id="sendData">
	<li><b class="submethod">sendData ([id]): void</b> - отправляет на сервер все данные, которые ещё не сохранены<ul><li><b><i>id</i></b> - (<i>string | number</i>) - опционально, идентификатор элемента</li></ul></li>
</ul>

<ul>
~~~js
dp.sendData();
~~~

<p> Если указан ID, будет отправлён только один элемент.</p>
<p> При вызове без параметров метод отправит все элементы, которые ещё не сохранены.</p>
</ul>


### Events {#events} 

<ul id="onAfterUpdate">
	<li>
		<b class="submethod">onAfterUpdate (id, action, tid, response): void</b> - срабатывает после получения и обработки ответа сервера
		<ul>
			<li><b><i>id</i></b> - (<i>string | number</i>) - идентификатор обновлённого элемента</li>
			<li><b><i>action</i></b> - (<i>string</i>) - статус ответа (тип операции)</li>
			<li><b><i>tid</i></b> - (<i>string</i>) - новый идентификатор (применимо только к операциям вставки)</li>
			<li><b><i>response</i></b> - (<i>mixed</i>) - разобранный ответ в виде XML-узла или JSON-объекта</li>
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
<p><b>Возможные статусы ответа:</b></p>
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
		<b class="submethod">onBeforeDataSending (id, state, data): void</b> - срабатывает перед отправкой данных на сервер
		<ul>
			<li><b><i>id</i></b> - (<i>string | number</i>) - идентификатор элемента</li>
			<li><b><i>state</i></b> - (<i>string</i>) - состояние элемента (тип операции)</li>
			<li><b><i>data</i></b> - (<i>object</i>) - сериализованные данные, которые будут отправлены на сервер</li>
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
<p>Событие срабатывает для каждого запроса обновления данных (после <code>onBeforeUpdate</code>).</p>
<p>Возврат <code>false</code> из обработчика события запретит отправку данных на сервер.</p>

<p><b>Возможные статусы ответа:</b></p>
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
		<b class="submethod">onBeforeUpdate (id, state, data): void</b> - срабатывает перед обновлением записи(ей)
		<ul>
			<li><b><i>id</i></b> - (<i>string | number</i>) - идентификатор элемента</li>
			<li><b><i>state</i></b> - (<i>string</i>) - состояние элемента (тип операции)</li>
			<li><b><i>data</i></b> - (<i>object</i>) - данные, которые будут отправлены на сервер</li>
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
<p>Событие срабатывает для каждого обновления записи и перед <code>onBeforeDataSending</code>.</p>
<p>Возврат <code>false</code> из обработчика события запретит отправку данных на сервер.</p>

<p><b>Возможные статусы ответа:</b></p>
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
		<b class="submethod">onRowMark (id, state, mode, invalid): void</b> - срабатывает перед каждой попыткой пометить обновлённую запись
		<ul>
			<li><b><i>id</i></b> - (<i>string | number</i>) - идентификатор элемента, для которого возникает ошибка</li>
			<li><b><i>state</i></b> - (<i>string</i>) - состояние элемента (тип операции)</li>
			<li><b><i>mode</i></b> - (<i>boolean</i>) - <code>true</code> для добавления пометки обновления, <code>false</code> для её удаления</li>
			<li><b><i>invalid</i></b> - (<i>object</i>) - детали об ошибках, если таковые имеются</li>
		</ul>
	</li>
</ul>

<ul>
~~~js
dp.attachEvent("onRowMark", (id, state, mode, invalid) => {
	// Custom logic before marking an item
	return true;
});
~~~
</ul>

<ul>
<p>Событие можно заблокировать. Возврат <code>false</code> предотвратит пометку элемента.</p>
</ul>

### Related API
- [createDataProcessor](api/method/createdataprocessor.md)
- [dataProcessor](api/method/dataprocessor.md)

### Related Guides
- [Интеграция на стороне сервера](guides/server-side.md)