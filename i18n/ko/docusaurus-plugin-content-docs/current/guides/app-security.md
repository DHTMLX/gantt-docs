---
title: "애플리케이션 보안"
sidebar_label: "애플리케이션 보안"
---

# 애플리케이션 보안

DHTMLX Gantt는 다양한 웹 애플리케이션에 Gantt 기능을 원활하게 통합하기 위해 설계된 클라이언트 측 JavaScript 라이브러리입니다. 
따라서 우리의 Gantt가 보안을 강화하는 동시에 애플리케이션에서 사용할 수 있는 가능성을 약간 감소시킬 수 있는 등의 보안 관련 기능을 제한하지 않으며, 
대부분의 Gantt 기능을 프로젝트 요구사항에 맞게 커스터마이즈할 수 있습니다.

다만 DHTMLX Gantt가 자체적으로 SQL 주입(SQL injections)이나 XSS 및 CSRF 공격과 같은 다양한 위협으로부터 애플리케이션을 보호하기 위한 수단을 제공하지는 않는다는 점을 염두에 두어야 합니다. 따라서 필요한 구성 설정을 제공하여 프로젝트의 안전을 확보하는 것은 여러분의 책임입니다. 이 문서에서는 HTML 정화에 관한 관련 정보와 권고사항을 제시합니다.

## 기본 보안 단계

사이버 보안은 복잡한 분야이며 한 가지 단계의 지침으로 충분히 다룰 수 없으므로, 기본을 다루고 가장 흔한 위협들을 완화하는 데 도움이 되는 실용적인 단계를 따라가길 권장합니다.

**1. 애플리케이션에서 CSP(Content Security Policy) 사용**

다음과 같이 CSP 헤더를 추가하는 것만으로도 애플리케이션에서 XSS 코드가 실행되는 것을 방지할 수 있습니다:

~~~
Content-Security-Policy: script-src 'self'
~~~

애플리케이션에 더 복잡한 정책이 필요할 수 있지만, 인라인 스크립트 실행을 비활성화하면 다수의 XSS 및 CSRF 공격을 예방할 수 있습니다.

**2. 백엔드에서 데이터베이스에 저장하기 전에 사용자 입력을 정화(Sanitize)하세요**

새 레코드를 삽입할 때 값을 있는 그대로 저장하지 말고, 형식이 기대하는 대로인지 확인하고 악의적 콘텐츠를 제거해야 할 수 있습니다.

~~~
db.query("INSERT INTO gantt_tasks(text, start_date, duration, progress, parent)"
    + " VALUES (?,?,?,?,?)",
    [task.text, task.start_date, task.duration, task.progress, task.parent])
~~~

Node.js를 사용하는 경우 다양한 라이브러리를 활용해 이 작업을 수행할 수 있습니다. 예를 들어 [DOMPurify](https://www.npmjs.com/package/dompurify) 같이 말이죠:

~~~
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

...

db.query("INSERT INTO gantt_tasks(text, start_date, duration, progress, parent)"
    + " VALUES (?,?,?,?,?)",
    [task.text, task.start_date, task.duration, task.progress, task.parent]
        .map((input) => DOMPurify.sanitize(input))
~~~

**3. 렌더링하기 전에 HTML 엔티티를 이스케이프(Escape)하세요**

렌더링 중에 실행될 HTML 마크업이 포함되지 않도록 표시 가능한 값이 HTML 태그를 포함하지 않도록 이스케이프해야 합니다. 예를 들어 [validator] 라이브러리를 사용하는 예시는 아래와 같습니다:

~~~
const validator = require('validator');
...

// GET /data

Promise.all([
  db.query("SELECT * FROM gantt_tasks"),
  db.query("SELECT * FROM gantt_links")
]).then(results => {
    let tasks = results[0],
        links = results[1];
 
    tasks.forEach((task) => {
        Object.entries(task).forEach(([key, value]) => {
            if(typeof value === "string") {
                task[key] = validator.escape(value); //#!
            }
        });
        task.open = true;
        task.start_date = task.start_date.format("YYYY-MM-DD hh:mm:ss");
    });

    links.forEach((link) => {
        Object.entries(link).forEach(([key, value]) => {
            if(typeof value === "string") {
                link[key] = validator.escape(value); //#!
            }
        });
    });
    
 
    res.send({
        tasks,
        links 
   });
~~~

**4. SQL 데이터베이스를 다룰 때는 문자열 값을 이어붙여 SQL 쿼리를 생성하는 것을 피하고, 매개변수화된 쿼리, ORM 또는 Query Builder를 사용하세요**

이 항목은 SQL 주입 공격에 관한 내용입니다. 일반적으로 SQL 쿼리에서 이스케이프되지 않았거나 검증되지 않은 사용자 입력을 절대 사용해서는 안 됩니다. 만약 그렇게 작성하고 있다면 매개변수화된 쿼리로 코드를 재작성하거나 사용하는 SQL 공급자가 제공하는 이스케이프 함수를 사용해 보세요.

**5. 마지막으로: 사이버 보안 전문가와 상의하고 회사가 채택한 보안 정책을 따르세요**

보안 작업은 결코 완전히 끝나지 않지만, 위 단계들을 구현하고 회사 정책을 따르며 보안 전문가의 검토를 받으면 웹에서 발견될 수 있는 대부분의 위협을 피할 수 있습니다.

이제 기본이 다뤄졌으니 Gantt에 특화된 내용으로 넘어가겠습니다.

## 클라이언트 측의 취약 영역 Gantt

먼저, Gantt와 같은 복잡한 기능을 클라이언트 측에 통합할 때 주의해야 할 세 가지 포인트를 강조합니다:

- DHTMLX Gantt는 클라이언트 측 라이브러리이므로 서버에서 로드된 모든 데이터가 원래 형태로 Gantt에 들어갑니다.
데이터 세트가 서버 측에 저장되므로 애플리케이션의 주요 위협은 그쪽에서 오게 됩니다. 하지만 백엔드를 보호하는 일은 DHTMLX Gantt를 넘어서는 문제입니다.
- 사이버 범죄자는 DevTools를 이용해 최종 사용자를 속여 악의 코드를 실행하게 하여 보안 메커니즘을 우회할 수 있습니다. 텍스트 작업에 붙여넣은 코드도 DevTools를 사용할 때와 동일하게 동작합니다.
- 공격자가 Gantt 인스턴스 객체에 접근하면 어떤 보호 조치도 효과가 없게 됩니다. 이 경우 공격자는 원하는 방식으로 Gantt 구성을 변경하고 완전히 제어할 수 있습니다.

이제 Gantt에서 잠재적 보안 문제를 기대할 수 있는 취약 영역 목록으로 넘어갑니다:

- 최종 사용자가 입력하고 저장한 데이터
- 표시되는 Gantt 데이터(텍스트 콘텐츠, 다양한 시각 요소)
- [custom HTML elements](guides/export.md#exporting-html-elements)가 Gantt 데이터와 상호 작용하는 방식
- Gantt 객체에 대한 접근

실용적 고려로 넘어갑시다.

## Gantt에 대한 접근 격리(Isolating access to Gantt)

Gantt를 보호하기 위한 가능한 조치를 논의할 때, 먼저 해야 할 일은 Gantt를 다른 크랙된 구성 요소나 잘못된 사용자의 접근으로부터 격리하는 것입니다(자체 XSS 공격).

:::note
공격자가 애플리케이션의 구성 파일(여기에 Gantt 구성 파일 포함)에 접근하게 되면, XSS 공격에 대한 보호 조치가 효과가 없게 될 수 있으므로 이 시나리오는 다루지 않겠습니다.
:::

애플리케이션이 완전히 로드되고 Gantt 인스턴스 객체에 공격자가 접근하게 되면, Gantt의 거의 모든 것을 바꿔 놓고 모든 기능을 재정의할 수 있습니다. 따라서 프로젝트에서 Gantt를 어떻게 격리할지 알아야 합니다. 

이를 위해 함수 안에 별도의 Gantt 인스턴스를 생성해야 합니다. 여기서의 목표는 함수 내부에서 실행되는 코드가 외부에서 접근할 수 없도록 만드는 것입니다. 

또한 기본적으로 Gantt는 *gantt* 객체에 새 인스턴스를 생성합니다. 함수 내부에 새 변수를 추가하고 그 안에 Gantt 인스턴스를 배치하기 위해서는 반드시 *const* 또는 *let* 키워드를 사용하여 함수 밖에서 접근할 수 없도록 만드는 것이 중요합니다. 

~~~js
function addGantt(){
  const gantt = Gantt.getGanttInstance();
}
addGantt()
~~~

또한 gantt 객체와의 혼동을 피하기 위해 Gantt 인스턴스에 다른 이름을 사용할 수도 있습니다:

~~~js
function addGantt(){
  const protectedGantt = Gantt.getGanttInstance();
}
addGantt()
~~~

원하지 않는 접근으로부터 Gantt를 보호했음을 확인한 후에는 Gantt 차트에 데이터 입력 및 표시에도 주의를 기울여야 합니다.

## Gantt에 데이터 입력

이는 사이버범죄자가 Gantt 보안을 침해하는 데 이용할 수 있는 민감한 지점입니다.

데이터 입력 영역은 XSS 공격의 주요 표적으로 간주됩니다. 우리 Gantt 구성 요소에서는 아래 경로로 데이터를 변경할 수 있습니다:

- lightbox
- inline editors
- custom elements가 포함된 modalbox
- 서드파티 라이브러리
- 리소스 로드 타임라인에서의 리소스 할당
- 데이터를 입력할 수 있는 커스텀 요소가 포함된 추가 레이어
- Gantt API를 사용하고 데이터 입력이 필요한 모든 커스텀 솔루션(예: 작업 편집용 도구 모음 또는 커스텀 폼)

작업 객체에는 활성화된 기능에 따라 사용되는 [다양한 매개변수들](guides/task-properties.md)이 있습니다. 편집 가능한 매개변수가 많을수록 데이터 입력 시 더 많은 매개변수를 정화해야 합니다.

### 예제 고찰

XSS 공격으로부터의 보호를 강화하기 위해 HTML 정화를 사용하는 다양한 단계를 Demonstrate하기 위한 예제를 준비했습니다. 

**관련 샘플**: [Example to prevent XSS attacks (security, CSP)](https://snippet.dhtmlx.com/cdy9p0yl)

우리의 예제에서는 작업 이름을 편집하고, 날짜와 기간을 바꾸며, 리소스 할당을 수정하고 텍스트 메모를 추가할 수 있습니다. 또한 시작 날짜와 기간은 라이트박스와 인라인 편집기를 통해서만 변경할 수 있습니다. 인라인 편집기에서는 **date**와 **number** 타입이 명시적으로 지정되어 있습니다. 라이트박스에서는 기간만 지정할 수 있고 날짜는 드롭다운 목록에서 선택해야 합니다.

두 경우 모두 이러한 UI 요소에 악의적 코드를 포함하는 텍스트를 삽입하는 것은 불가능합니다. DOM 요소 검사기를 통해 요소의 타입을 변경하려고 하면 날짜나 기간에 잘못된 값이 나타납니다. 이는 오류를 발생시키고 페이지를 다시 로드할 때까지 Gantt가 계속 작동하지 않으며, 화면이 다시 그려지지 않으므로 데이터가 서버로 전송되지 않습니다.

그러나 작업 이름에는 여전히 문자열(string) 값 타입을 사용하기 때문에 XSS 공격의 취약 지점이 될 수 있습니다. 따라서 입력 값을 정화해야 합니다. 우리 예제에서는 XSS 공격의 한 가지 변형과 그 방지 방법을 보여줍니다. 

![](/img/preventing_xss_attack.png)

실제 프로젝트의 경우 가능한 모든 데이터 정화 옵션을 추가해야 합니다. 우리의 경우에는 단순히 "\<"와 "\>" 기호를 해당 HTML 엔티티인 **`&lt;`** 와 **`&gt;`**로 치환합니다. 이를 통해 작업 텍스트 안에 HTML 요소를 표시하는 가능성을 차단합니다.

상술한 기호 치환은 아래와 같이 **sanitizeText()** 함수에 구현됩니다:

~~~
function sanitizeText(text){
    // uncomment to test XSS
    // return text

    // prevent XSS by disabling HTML elements
    return text.split("<").join("&lt;").split(">").join("&gt;");
}
~~~

이 함수는 이벤트 핸들러에서 호출됩니다: 라이트박스의 **onLightboxSave**와 인라인 편집기의 **onBeforeSave**에서 말이죠.

우리 샘플에서는 커스텀 인라인 편집기나 커스텀 라이트박스 섹션을 사용하여 작업에 텍스트 메모를 추가할 수 있습니다. 두 경우 모두 이러한 커스텀 객체의 함수 안에서(값이 렌더링되기 전, DOM 요소에서 변경값이 가져와졌을 때) 정화를 구현할 수 있습니다:

~~~js
 // for an inline editor:
 set_value: function(value, id, column, node){
     node.firstChild.value = sanitizeText(value || "");
 },
 get_value: function(id, column, node){
     return sanitizeText(node.firstChild.value);
 },
 
 // for the lightbox:
 set_value: function(node, value, task){
     node.value = sanitizeText(value || "");
 },
 get_value: function(node, task){
     return sanitizeText(node.value);
 },
~~~

다음으로는 텍스트 노트의 작업을 제어하는 것이 더 쉽습니다. **onLightboxSave** 및 **onBeforeSave** 이벤트 핸들러를 활용하면 됩니다: 

~~~js
protectedGantt.attachEvent("onLightboxSave", function(id, task, is_new){
    if (task.notes) {
        task.notes = sanitizeText(task.notes);
    }
    return true;
});

protectedGantt.ext.inlineEditors.attachEvent("onBeforeSave", function(state){
    if (state.columnName == "notes") {
        state.newValue = sanitizeText(state.newValue);
    }
    return true;
});
~~~

또한 라이트박스에서 리소스 할당도 가능합니다. Gantt가 입력 값을 반드시 **number** 타입으로만 제한하지 않으므로 문자열 값의 사용도 가능하며, 이는 XSS 공격의 가능성을 열어 줍니다.

리소스 값은 작업의 속성에 기록되며, 따라서 **sanitizeResourceValues()** 함수가 이 값들을 순회하며 **sanitizeText()** 함수를 사용해 리소스 할당 값을 정화합니다:

~~~
function sanitizeResourceValues(task){
    const resources = task[protectedGantt.config.resource_property];
    if (resources && resources.length) {
        resources.forEach(function (resource) {
               if (typeof resource.value == "string") {
                resource.value = sanitizeText(resource.value);
            }
        })
       }
}
~~~

**sanitizeResourceValues()**는 **onLightboxSave** 이벤트 핸들러에서 호출됩니다:

~~~js
protectedGantt.attachEvent("onLightboxSave", function(id, task, is_new) {
    sanitizeResourceValues(task)
    return true;
});
~~~

*Gantt 구성에서 다른 문자열 매개변수를 사용하는 경우에도 정화해야 합니다.*

우리 예제에서 자원 타임라인의 리소스 할당에 원치 않는 내용을 삽입하려고 하면, 숫자 값만 허용됩니다. 다른 값 유형을 사용할 경우 변경 내용은 저장되지 않습니다.

### 제3자 도구를 통한 데이터 입력

우리의 Gantt 구성 요소는 작업 편집에 제3자 양식, 도구 및 라이브러리를 사용하는 등 커스터마이즈의 많은 기회를 제공합니다. 이 경우 Gantt API를 사용하여 작업을 처리합니다. 이러한 상황에서는 커스터마이징 구현 방식에 따라 데이터 정화에 대한 일반적인 조언을 하기 어렵습니다.

우리 예제에는 작업 이름을 편집하기 위한 커스텀 양식이 있습니다. 이 양식에는 텍스트를 이스케이프하기 위한 **sanitizeText()** 함수도 포함되어 있습니다:

~~~js
document.body.querySelector("[name='save']").onclick = function(){
    const newTaskName = document.body.querySelector("[name='text']").value;
    task.text = sanitizeText(newTaskName);
    protectedGantt.updateTask(task.id);
}
~~~

이들은 데이터 입력의 거의 모든 범주에 해당합니다. 데이터가 Gantt에 입력될 때 정화된다면 어느 정도는 필터링된 상태가 됩니다. 그 결과 Gantt 차트 내의 XSS 공격은 비효과적이며 서버에 도달할 수 없게 됩니다.

## Gantt에 데이터 표시

다음으로 언급해야 할 취약 영역은 Gantt 차트에 데이터를 표시하는 부분입니다. 데이터 입력만큼은 효과적이지 않지만, 표시되는 데이터를 정화하는 것도 XSS 공격 체인을 차단하거나 중단하는 데 도움이 됩니다. 예를 들어 데이터가 서버의 공격으로 손상되었지만 Gantt에 접근 권한이 없다면, XSS 공격은 Gantt에서 차단될 수 있습니다.

가장 안전한 접근 방식은 데이터가 표시되는 모든 Gantt 영역을 정화하는 것입니다. 이는 각 그리드 열의 구성에 템플릿(template)을 사용하는 것을 전제로 합니다. [모든 가능한 템플릿(template)을 사용하는 것]이 XSS 공격 가능성이 있는 콘텐츠의 표시를 방지하는 데 필요합니다.

다만, Gantt 차트에서 데이터를 표시하는 문제에 대한 더 간단한 해결책도 있습니다. 데이터는 사용자 입력이나 서버로부터 Gantt 차트에 업로드될 수 있으므로, 두 가지 데이터 흐름을 제한하면 Gantt 콘텐츠에 영향을 주거나 악성 코드를 데이터에 삽입할 가능성을 차단할 수 있습니다.

서버에서 데이터를 로드하는 동안 작업 속성을 보호하는 것도 가능합니다. 이는 **onTaskLoading** 이벤트 핸들러에서 수행할 수 있습니다:

~~~js
protectedGantt.attachEvent("onTaskLoading", function (task) {
    task.text = sanitizeText(task.text);
    if (task.notes) {
        task.notes = sanitizeText(task.notes);
    }
    sanitizeResourceValues(task);
    return true;
});
~~~

또한 Gantt 차트에 데이터를 로드하는 다른 방법들도 있을 수 있습니다. 예를 들어 서버로부터 작업 객체가 별도로 올 수 있으며, 어떤 함수에 의해 처리될 수 있습니다. 그 후 새 작업이 Gantt 차트에 추가되거나 기존 작업이 업데이트됩니다. 이 경우 데이터가 Gantt에 로드되기 전에 이 함수 안에서 작업을 정화해야 합니다.

다음과 같은 모습일 수 있습니다:

~~~
let newTask = await loadFromServer(23);
sanitizeTaskProperties(newTask);
gantt.addTask(newTask);
~~~

특정 웹 브라우저에서 요소 검사기를 이용해 악성 코드를 Gantt DOM 요소에 삽입하도록 사용자를 속이는 사이버 범죄자가 있다면 이를 완전히 피하기 어렵습니다. 하지만 모든 적용된 변경사항은 차후에 Gantt가 다시 렌더링될 때 사라지며 서버에 저장되지 않습니다.

## 서버 측 문제

클라이언트 측 검증은 쉽게 악용되거나 완전히 우회될 수 있으므로 보안 수단으로 의존해서는 안 됩니다. 이는 잘못된 입력이 있을 경우 즉각적인 피드백을 사용자에게 제공하기 위한 것이며, 최종 검증은 서버에서 수행되어야 합니다.

백엔드는 들어오는 데이터와 사용자 접근 규칙 등을 올바르게 검증/이스케이프/정화해야 합니다.

### SQL 인젝션

dhtmlxGantt은 100% 클라이언트 측 컴포넌트이므로 SQL 인젝션은 개발자가 백엔드에서 막아야 합니다.

다음 두 가지를 고려해야 합니다:

- 라이트박스에는 기본적인 검증이 없으며, 이를 처리하지 않으면 편집 가능한 입력에 임의의 값을 입력할 수 있습니다.
- 백엔드 API는 클라이언트 측 UI를 우회하여 위험한 값을 포함한 PUT/POST 요청으로 직접 호출될 수 있습니다.

따라서 백엔드에서 어떤 방식으로든 SQL 인젝션 차단 기능이 필요합니다. [dhtmlxConnector](integrations/php/howtostart-connector.md)를 사용하고 관련 문서의 예시와 같이 테이블 구성을 지정하면 모든 값이 자동으로 이스케이프됩니다. 그렇지 않다면 사용하는 플랫폼의 모범 사례에 따라 안전한 CRUD 구현을 사용해야 합니다. 시작 가이드에 제시된 구현은 SQL 인젝션 측면에서 안전해야 합니다.

### CSRF Attacks

Gantt가 백엔드로 보낸 요청에 헤더의 커스텀 인증 토큰을 추가하는 방법은 [이 문서](guides/server-side.md#custom-request-headers-and-parameters)를 참조하여 확인하십시오.

## CSP(Content Security Policy)

라이브러리는 dhtmlxGantt로 생성된 애플리케이션의 코드를 CSP 표준에 맞추기 위해 조정할 수 있는 특별한 구성(config)을 제공합니다. 이는 다양한 코드 주입 공격을 방지하고 애플리케이션의 안전성을 향상시키는 데 도움이 됩니다. 

[다음과 같이 dhtmlxGantt 애플리케이션에 CSP 표준을 적용하는 방법에 대해 자세히 알아보기](api/config/csp.md).