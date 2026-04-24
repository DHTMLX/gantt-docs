---
sidebar_label: csp
title: csp 설정
description: "날짜 포맷팅 메서드의 내부 구현 정의"
---

# csp

### Description

@short: 날짜 포맷팅 메서드의 내부 구현 정의

@signature: csp: boolean | string

### Example

~~~jsx
gantt.config.csp = true;
...
gantt.init("gantt_here");
~~~

**Default value:** "auto"

### Details

일부 애플리케이션의 런타임 환경(예: Salesforce Lightning)은 종종 dhtmlxGantt 코드의 실행을 차단할 수 있습니다.
그 주된 원인은 애플리케이션에서 Content Security Policy를 명시하는 것입니다. 
CSP는 Gantt 내부의 고성능 날짜 포맷팅 메서드 실행을 안전하지 않은 것으로 해석할 수 있습니다. 

csp 구성은 구현 방식을 지정함으로써 Gantt 코드가 차단되는 것을 방지할 수 있게 해줍니다. 

날짜 포맷팅 메서드인 **gantt.date.date_to_str** 및 **gantt.date.str_to_date**의 내부 구현 방식에는 세 가지 모드가 있습니다:

- 기본값은 *auto* 모드로 설정됩니다. 

~~~js
gantt.config.csp = "auto";
~~~ 

이 모드에서는 가능하면 날짜 포맷팅 메서드에 대해 고성능 코드를 사용하려고 시도합니다. 애플리케이션 설정으로 인해 실제로 생산적인 코드의 실행이 차단될 경우 호환 가능한 코드가 사용됩니다.

- Gantt 코드를 항상 호환되도록 만들려면 옵션을 *true*로 설정할 수 있습니다.

~~~js
gantt.config.csp = true;
~~~ 

이 모드에서는 gantt 코드가 어떤 경우에도 작동하지만 성능 저하가 발생할 수 있습니다.

- 구성 값을 *false*로 지정하여 Gantt 코드를 고성능으로만 작동하도록 할 수도 있습니다.

~~~js
gantt.config.csp = false;
~~~ 

참고로, 애플리케이션 설정으로 인해 코드 구현이 차단되면 dhtmlxGantt의 작동이 중지됩니다.

### Change log
- v7.0에 추가되었습니다
- 속성이 *true*로 설정되면 [lightbox](api/config/lightbox.md)가 Gantt 컨테이너 내부에 렌더링됩니다( v7.1.13 부터)