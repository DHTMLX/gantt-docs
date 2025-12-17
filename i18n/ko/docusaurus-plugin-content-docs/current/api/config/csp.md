---
sidebar_label: csp
title: csp config
description: "날짜 포맷팅 메서드가 내부적으로 어떻게 구현되는지 제어합니다"
---

# csp

### Description

@short: 날짜 포맷팅 메서드가 내부적으로 어떻게 구현되는지 제어합니다

@signature: csp: boolean | string

### Example

~~~jsx
gantt.config.csp = true;
...
gantt.init("gantt_here");
~~~

**Default value:** "auto"

### Details

Salesforce Lightning과 같은 일부 런타임 환경에서는 dhtmlxGantt의 코드가 제대로 실행되지 않을 수 있습니다. 이는 보통 앱에 설정된 Content Security Policy(CSP) 때문입니다. CSP는 Gantt의 내부 고성능 날짜 포맷팅 메서드를 보안 위험으로 간주할 수 있습니다.

**csp** 설정은 날짜 포맷팅 코드가 어떻게 구현되는지를 선택할 수 있게 하여 이러한 차단을 방지하는 데 도움을 줍니다.

**gantt.date.date_to_str** 및 **gantt.date.str_to_date** 메서드를 처리하는 세 가지 방법이 있습니다:

- 기본값은 *auto*입니다.

~~~js
gantt.config.csp = "auto";
~~~

이 모드에서는 Gantt가 가능한 가장 빠른 날짜 포맷팅 코드를 사용하려 시도합니다. 만약 앱이 그 코드를 차단하면 호환 가능한 버전으로 전환합니다.

- *true*로 설정하면 Gantt가 항상 호환 가능한 코드를 사용하도록 강제할 수 있습니다.

~~~js
gantt.config.csp = true;
~~~

이렇게 하면 코드가 문제 없이 실행되지만, 약간 느려질 수 있습니다.

- 또는 *false*로 설정하여 항상 고성능 코드를 사용하도록 할 수 있습니다.

~~~js
gantt.config.csp = false;
~~~

단, 앱이 이 고성능 코드를 차단하면 dhtmlxGantt가 제대로 작동하지 않을 수 있습니다.

### Change log
- v7.0에 추가됨
- *true*로 설정 시 [lightbox](api/config/lightbox.md)가 Gantt 컨테이너 내부에 렌더링됩니다 (v7.1.13부터)

