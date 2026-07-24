---
title: "애플리케이션 보안"
sidebar_label: "애플리케이션 보안"
---

# 애플리케이션 보안

DHTMLX Gantt는 다양한 웹 애플리케이션에 간편하게 Gantt 기능을 통합하기 위해 설계된 클라이언트 측 JavaScript 라이브러리입니다.  
따라서 우리는 Gantt의 기능적 가능성을 제한하지 않으며, 이는 애플리케이션의 보안을 강화할 수 있지만 동시에 사용 가능한 가능성을 감소시킬 수 있습니다.  
따라서 프로젝트 요구사항에 맞게 Gantt 기능의 대부분을 커스터마이즈할 수 있습니다.

그러나 DHTMLX Gantt는 자체적으로 SQL 인젝션이나 XSS, CSRF 공격 등 다양한 위협으로부터 귀하의 애플리케이션을 보호하는 방법을 제공하지 않는다는 점을 명심해야 합니다. 따라서 필요한 구성 설정을 제공하여 프로젝트의 안전성을 보장하는 것은 귀하의 책임입니다. 이 문서에서는 HTML 정화(sanitization)에 관한 관련 정보와 권고 사항을 제공합니다.

## 기본 보안 단계

사이버 보안은 복잡한 분야이며 단일 지침으로 다룰 수 없지만, 기본을 다루고 가장 자주 발생하는 위협을 완화하는 데 도움이 되는 실용적인 단계들을 따르기를 권장합니다.

**1. 애플리케이션에서 Content Security Policy (CSP) 사용**

다음과 같은 CSP 헤더를 추가하는 것만으로도 애플리케이션에서 XSS 코드가 실행되는 것을 막을 수 있습니다:

~~~
Content-Security-Policy: script-src 'self'
~~~

애플리케이션에 더 복잡한 정책이 필요할 수 있지만, 인라인 스크립트 실행을 비활성화하면 다수의 XSS 및 CSRF 공격을 차단할 수 있습니다.

**2. 백엔드에서 데이터베이스에 저장하기 전에 사용자 입력을 정화합니다**

새 레코드를 삽입할 때 값을 있는 그대로 저장하는 대신:

~~~
db.query("INSERT INTO gantt_tasks(text, start_date, duration, progress, parent)"
    + " VALUES (?,?,?,?,?)",
    [task.text, task.start_date, task.duration, task.progress, task.parent])
~~~

입력 값의 형식이 기대한 형식인지 확인하고 잠재적으로 악의적인 내용을 제거하고자 할 수 있습니다. Node.js를 사용하는 경우, 여러 라이브러리 중 하나를 이용해 이를 수행할 수 있습니다. 예를 들어 [DOMPurify](https://www.npmjs.com/package/dompurify):

~~~
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

...

db.query("INSERT INTO gantt_tasks(text, start_date, duration, progress, parent)"
    + " VALUES (?,?,?,?,?)",
    [task.text, task.start_date, task.duration, task.progress, task.parent]
        .map((input) => DOMPurify.sanitize(input)))
~~~

**3. 렌더링하기 전에 HTML 엔티티를 이스케이프합니다**

표시 가능한 값에 HTML 마크업이 포함되어 렌더링되는 것을 방지하려면, Gantt에 데이터를 공급하기 전에 사용자가 입력한 문자열에서 HTML 문자를 이스케이프해야 합니다. 예를 들어 [validator](https://www.npmjs.com/package/validator) 라이브러리를 사용하는 방법은 다음과 같습니다:

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

**4. SQL 데이터베이스를 다룰 때 문자열 값을 연결하여 SQL 쿼리를 생성하지 말고, 매개변수화된 쿼리나 ORM, 또는 쿼리 빌더를 사용하십시오**

이 항목은 SQL 인젝션 공격과 관련이 있습니다. 일반적으로 SQL 쿼리에서 escaping 되지 않거나 검증되지 않은 사용자 입력을 사용하지 않아야 합니다. 그렇게 해야 한다면 매개변수화된 쿼리로 코드를 재작성하거나 사용하는 SQL 공급자가 제공하는 이스케이프 기능을 사용하십시오.

**5. 마지막으로: 사이버 보안 전문가와 상담하고 귀사에서 채택한 보안 정책을 준수하십시오**

보안 작업은 완전히 끝나지 않는 경우가 많지만, 위의 단계들을 구현하고 회사 정책을 준수하며 보안 전문가의 검토를 받으면 웹에서 만날 수 있는 대부분의 위협을 피할 수 있습니다.

이제 기본이 다졌으니 Gantt에 특화된 부분으로 넘어가 보겠습니다.

## 클라이언트 측에서의 취약한 Gantt 영역

먼저, 클라이언트 측에서 Gantt와 같은 복잡한 기능을 통합할 때 주목할 세 가지 포인트를 강조합니다:

- DHTMLX Gantt는 클라이언트 측 라이브러리이므로 서버에서 로드된 모든 데이터가 원래 형태로 Gantt에 들어갑니다.
  데이터 세트가 서버 측에 저장되므로 애플리케이션의 주요 위협은 서버 측에서 발생합니다. 다만 백엔드 보호는 DHTMLX Gantt의 범위를 벗어납니다.
- 사이버 범죄자는 DevTools를 이용해 최종 사용자를 속여 악성 코드를 실행하게 만들 수 있으며, 이를 통해 어떤 보안 메커니즘도 우회할 수 있습니다. 태스크 텍스트에 붙여넣는 코드 역시 DevTools가 사용된 것처럼 작동합니다.
- 공격자가 Gantt 인스턴스 객체에 접근하면 어떤 보호 조치도 효과가 없게 됩니다. 이 경우 공격자는 원하시는 방식으로 Gantt 구성을 변경하고 제어할 수 있습니다.

다음은 DHTMLX Gantt의 잠재적 보안 이슈가 발생할 수 있는 취약한 영역 목록입니다:

- 최종 사용자가 입력하고 저장하는 데이터
- 표시되는 Gantt 데이터(텍스트 콘텐츠, 다양한 시각 요소)
- [custom HTML elements](guides/export.md#exporting-html-elements) that somehow interact with Gantt data
- Gantt 객체에 대한 접근

이러한 잠재적 문제를 실용적으로 고찰해 보겠습니다.

## Gantt 접근 격리

Gantt를 보호하기 위한 가능한 조치를 논의할 때, 가장 먼저 해야 할 일은 Gantt를 다른 크랙된 구성요소나 오해로 인한 잘못된 사용자들로부터 불법적으로 접근하는 것을 차단하는 데 있습니다(자기 XSS 공격).

:::note
If an attacker gains access to the app's configuration files (including the Gantt configuration file),
any protective measures against XSS attacks (if taken) can be ineffective, so we won't consider this scenario.
:::

애플리케이션이 완전히 로드되고 Gantt 인스턴스 객체에 공격자가 접근하면 Gantt의 구성 전체를 바꿔 버리거나 모든 함수를 재정의할 수 있습니다. 따라서 프로젝트에서 Gantt를 격리하는 방법을 알아두어야 합니다.

이를 위해 함수 내에서 별도의 Gantt 인스턴스를 생성해야 합니다. 여기서의 목표는 함수 안에서 실행되는 코드가 밖에서 접근할 수 없도록 만드는 것입니다.

또한 기본적으로 Gantt는 *gantt* 객체 안에 새 인스턴스를 생성합니다. 함수 내부에 새로운 변수를 추가하여 그 안에 Gantt 인스턴스를 넣고 외부에서 접근할 수 없도록 만들고 안전하게 보관하는 것이 중요합니다.  

~~~js
function addGantt(){
  const gantt = Gantt.getGanttInstance();
}
addGantt()
~~~

다른 이름의 Gantt 인스턴스를 사용하여 gantt 객체와의 혼동을 피할 수도 있습니다:

~~~js
function addGantt(){
  const protectedGantt = Gantt.getGanttInstance();
}
addGantt()
~~~

원하지 않는 접근으로부터 Gantt를 보호한 후에는 Gantt 차트에 데이터를 입력하고 표시하는 부분에 주의해야 합니다.

## Gantt에 데이터 입력

이는 사이버범죄자들이 귀하의 애플리케이션에서 Gantt 보안을 침해하기 위해 악용할 수 있는 민감한 영역입니다.

데이터 입력 영역은 XSS 공격의 주요 대상으로 간주됩니다. 우리의 Gantt 구성요소에서 데이터는 다음을 통해 변경될 수 있습니다:

- 라이트박스(lighbox)
- 인라인 에디터(inline editors)
- 커스텀 요소가 있는 모달 박스(modalbox)
- 타사 라이브러리
- 리소스 로드 타임라인의 리소스 할당
- 사용자 정의 데이터 입력이 필요한 추가 레이어(예: UI에 데이터를 입력할 수 있는 커스텀 솔루션)
- Gantt API를 사용하는 모든 커스텀 솔루션

태스크 객체에는 활성화된 기능에 따라 사용되는 [다양한 매개변수](guides/task-properties.md)가 있습니다. 편집 가능한 매개변수가 많을수록 입력 시 정화해야 할 매개변수도 많아집니다.

### 예제 고려

다음은 DHTMLX Gantt를 사용할 때 HTML 정화를 통해 XSS 공격으로부터 보호를 강화하기 위한 다양한 단계를 보여 주는 예제입니다.

**관련 샘플**: [XSS 공격 방지 예시(security, CSP)](https://snippet.dhtmlx.com/cdy9p0yl)

예제에서는 태스크의 이름을 편집하고, 날짜와 기간을 변경하며, 자원 할당을 수정하고 텍스트 메모를 추가할 수 있습니다. 시작 날짜와 기간은 라이트박스와 인라인 에디터를 통해서만 변경할 수 있습니다. 인라인 에디터에서는 **date** 및 **number** 타입이 명시적으로 지정됩니다. 라이트박스에서는 기간만 지정할 수 있으며 날짜는 드롭다운 목록에서 선택해야 합니다.

두 경우 모두 이러한 UI 요소에 악성 코드가 포함된 텍스트를 입력하는 것은 불가능합니다. DOM 요소 검사기를 통해 요소 타입을 변경하려고 하면 날짜나 기간에 대해 잘못된 값이 반환됩니다. 이는 오류를 일으키고 페이지를 다시 로드할 때까지 Gantt가 계속 동작하지 않는 원인이 되며, 그 사이에 서버로 데이터가 재전송되지도 않습니다.

다만 태스크 이름의 문자열 값은 여전히 취약점이 될 수 있으므로 값을 정화해야 합니다. 우리의 예제에서는 XSS 공격의 한 가지 변형과 이를 방지하는 한 가지 방법만을 보여 줍니다.

![](/img/preventing_xss_attack.png)

실제 프로젝트의 경우 가능한 모든 데이터 정화 옵션을 추가해야 합니다. 우리의 경우에는 단순히 "\<" 및 "\>" 문자를 대응하는 HTML 엔티티인 **`&lt;`** 와 **`&gt;`** 로 치환합니다. 이로써 태스크 텍스트 안에 HTML 요소가 표시될 가능성을 차단합니다.

위에 설명한 기호 치환은 **sanitizeText()** 함수에 다음과 같이 구현됩니다:

~~~
function sanitizeText(text){
    // uncomment to test XSS
    // return text

    // prevent XSS by disabling HTML elements
    return text.split("<").join("&lt;").split(">").join("&gt;");
}
~~~

이 함수는 이벤트 핸들러에서 호출됩니다: 라이트박스의 **onLightboxSave**와 인라인 에디터의 **onBeforeSave**에서 호출됩니다.

샘플에서는 커스텀 인라인 에디터나 커스텀 라이트박스 섹션을 사용하여 태스크에 텍스트 메모를 추가할 수도 있습니다. 두 경우 모두, 값이 렌더링되기 전에 이 커스텀 객체의 함수 내에서 정화를 구현할 수 있습니다( DOM 요소에서 변경이 반영되기 전에):

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

하지만 텍스트 메모를 보다 쉽게 제어하려면 **onLightboxSave**와 **onBeforeSave** 이벤트 핸들러를 사용하는 편이 더 쉽습니다:

~~~
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

또한 라이트박스에서 리소스 할당을 만드는 것도 가능합니다. Gantt가 입력 값을 반드시 **number** 타입으로만 제한하지 않는 만큼 문자열 값 사용도 가능해 XSS 공격의 가능성이 열려 있습니다.

리소스 값은 태스크의 속성에 기록되므로 **sanitizeResourceValues()** 함수가 이들 값 전체를 순회하며 자원 할당 값을 **sanitizeText()** 함수로 정화합니다:

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

**sanitizeResourceValues()** 는 **onLightboxSave** 이벤트 핸들러에서 호출됩니다:

~~~
protectedGantt.attachEvent("onLightboxSave", function(id, task, is_new) {
    sanitizeResourceValues(task)
    return true;
});
~~~

*Gantt 구성에서 다른 문자열 매개변수를 사용하는 경우에도 정화해야 합니다.*

우리의 예제에서 리소스 타임라인의 리소스 할당에 원하지 않는 내용을 입력하려고 하면, 숫자 값만 허용되며 다른 값 유형을 사용하는 경우 변경 내용이 저장되지 않습니다.

### 타사 도구를 통한 데이터 입력

우리의 Gantt 구성요소는 작업을 타사 폼, 도구, 라이브러리를 사용해 편집하는 등 커스터마이즈의 다양한 가능성을 제공합니다. 이 경우 Gantt API는 작업에 대해 작동하는 용도로 사용됩니다. 이러한 시나리오에서 데이터 정화에 대한 보편적인 조언을 제공하기는 어렵습니다. 커스터마이즈가 구현되는 방식에 따라 달라지기 때문입니다.

예제에는 태스크 이름 편집을 위한 커스텀 폼이 있습니다. 이 폼에는 텍스트를 이스케이프하기 위한 **sanitizeText()** 함수도 포함되어 있습니다:

~~~js
document.body.querySelector("[name='save']").onclick = function(){
    const newTaskName = document.body.querySelector("[name='text']").value;
    task.text = sanitizeText(newTaskName);
    protectedGantt.updateTask(task.id);
}
~~~

이들은 데이터 입력의 거의 모든 범주에 해당합니다. 데이터가 Gantt에 입력되면서 정화되면 일정 부분 필터링된 것이므로, XSS 공격은 Gantt 차트 내에서 비활성화되고 서버에 도달할 수 없게 됩니다.

## Gantt의 데이터 표시

다음으로 언급해야 할 취약 영역은 Gantt 차트에 데이터를 표시하는 부분입니다. 데이터 입력만큼 효율적이지는 않지만, 표시되는 데이터를 정화하는 것 역시 XSS 공격 체인을 막거나 중단하는 데 도움이 됩니다. 예를 들어 서버가 데이터를 공격당했더라도 Gantt에 대한 접근이 없다면 Gantt에서 XSS 공격이 차단됩니다.

가장 안전한 방식은 데이터를 표시하는 모든 Gantt 영역을 정화하는 것입니다. 이는 각 격자 열의 구성에서 템플릿을 사용하는 것을 전제로 하며, 모든 가능한 템플릿을 사용해야 콘텐츠에 XSS 공격 가능성이 포함될 수 있는 표시를 방지할 수 있습니다.

다만, Gantt 차트에서 데이터를 표시하는 데 있어 잠재적 문제를 해결하는 더 간단한 방법이 있습니다. 데이터가 사용자 입력이나 서버를 통해 Gantt 차트로 업로드될 수 있기 때문에 두 가지 데이터 흐름을 제한할 수 있습니다. 그러면 데이터에 악성 코드를 삽입할 가능성이 없어집니다.

서버에서 데이터를 로드할 때 태스크의 속성을 보호하는 방법이 있습니다. 이는 **onTaskLoading** 이벤트 핸들러에서 수행할 수 있습니다:

~~~
protectedGantt.attachEvent("onTaskLoading", function (task) {
    task.text = sanitizeText(task.text);
    if (task.notes) {
        task.notes = sanitizeText(task.notes);
    }
    sanitizeResourceValues(task);
    return true;
});
~~~

데이터를 로드하는 방법은 이 외에도 있을 수 있습니다. 예를 들어 태스크 객체가 서버로부터 독립적으로 전달되어 어떤 함수에 의해 처리된 후, 새로운 태스크가 Gantt 차트에 추가되거나 기존 태스크가 업데이트될 수 있습니다. 이 경우, 데이터를 Gantt로 로드하기 전에 이 함수 내에서 태스크를 정화해야 합니다.

다음과 같아 보일 수 있습니다:

~~~
let newTask = await loadFromServer(23);
sanitizeTaskProperties(newTask);
gantt.addTask(newTask);
~~~

어떤 사이버 범죄자가 사용자가 특정 웹 브라우저에서 요소 검사기를 이용해 Gantt DOM 요소에 악성 코드를 삽입하도록 시험해도 이를 피할 수는 없습니다. 다만 적용된 모든 변경은 다음 번에 Gantt가 다시 렌더링될 때 사라지고 서버에 저장되지 않습니다.

## 서버 측 이슈

클라이언트 측 유효성 검사는 쉽게 손상되거나 완전히 우회될 수 있으므로 보안 수단으로 의지해서는 안 됩니다. 이는 잘못된 입력에 대한 즉각적인 피드백을 제공하고 서버 응답을 기다리지 않도록 하기 위한 목적이며, 최종 유효성 검사는 서버에서 수행되어야 합니다.

백엔드는 들어오는 데이터, 사용자 접근 규칙 등을 적절히 검증/이스케이프/정화해야 합니다.

### SQL Injections

dhtmlxGantt는 100% 클라이언트 측 구성요소이므로 SQL 인젝션은 백엔드에서 개발자가 차단해야 합니다.

다음 두 가지 포인트를 고려해야 합니다:

- 라이트박스에는 기본 검증이 없으며, 이를 처리하지 않으면 편집 가능한 입력에 임의의 값을 입력할 수 있습니다
- 백엔드 API가 위험한 값을 수동으로 포함한 PUT/POST 요청으로 호출될 수 있어 클라이언트 측 UI를 우회할 수 있습니다

따라서 백엔드에 어떤 형태의 SQL 인젝션 차단이 필요합니다. 만약 [dhtmlxConnector](integrations/php/howtostart-connector.md)를 사용하고 관련 문서의 로딩-데이터베이스 부분에 표시된 표 구성처럼 값을 자동으로 이스케이프하도록 지정한다면 모든 값이 자동으로 이스케이프됩니다. 그렇지 않다면 사용 중인 플랫폼의 좋은 관행에 따라 안전한 CRUD 구현을 사용해야 합니다. 시작 가이드에 제시된 구현은 SQL 인젝션 측면에서 안전해야 합니다.

### CSRF Attacks

Gantt가 백엔드로 보낼 요청에 커스텀 권한 토큰 헤더를 추가하는 방법은 이 문서를 참조하십시오: [이 글](guides/server-side.md#custom-request-headers-and-parameters).

## CSP(Content Security Policy)

이 라이브러리는 dhtmlxGantt로 생성된 애플리케이션의 코드를 CSP(Content Security Policy) 표준에 맞게 조정할 수 있도록 하는 특별한 구성(config)을 제공합니다. 이는 다양한 코드 주입 공격을 방지하고 애플리케이션의 보안을 향상시키는 데 도움이 됩니다.

[dhtmlxGantt 애플리케이션에 CSP 표준을 적용하는 방법 읽기](api/config/csp.md).

## Framework Wrapper XSS Protection

v10.0부터 [React](integrations/react.md), [Vue](integrations/vue.md), [Angular](integrations/angular.md) 래퍼는 사용자 제공 템플릿 함수가 반환하는 문자열 값을 처리하여, 템플릿에서 오는 HTML이 기본적으로 안전하도록 만듭니다. 이는 템플릿이 비정제된 태스크/이벤트 데이터를 포함하더라도 적용됩니다. 해당 내용은 아래를 포함합니다:

- `templates` 프롭을 통해 전달된 함수들
- `config.columns[].template` 함수들
- `config.scales[].format` 함수들

동작은 `htmlTemplatePolicy` 컴포넌트 프롭으로 제어됩니다:

| 정책 | 동작 |
| --- | --- |
| `"basic-sanitize"` *(기본값)* | 반환된 HTML을 화이트리스트 방식으로 정화합니다: 안전한 서식(`b`, `i`, `span`, `div`, `mark`, ...), `class`, 한정된 인라인 스타일, `data-*` 속성, `contenteditable`, 안전한 `src`를 가진 `img`는 유지됩니다. `<script>`, 인라인 이벤트 핸들러(`on*`), 위험한 URL(`javascript:`, `vbscript:`, 비이미지 데이터 `data:`)은 제거됩니다. |
| `"escape"` | 문자열을 텍스트로 렌더링합니다 - HTML 태그는 보이는 문자로 바뀝니다. (그리드 트리 아이콘과 같은 내장 템플릿은 여전히 정화되어 그리드가 올바르게 렌더링됩니다.) |
| `"unsafe-html"` | 처리를 전혀 하지 않고 원시 문자열을 렌더링합니다 - pre-v10 동작으로, `dangerouslySetInnerHTML`과 동일합니다. 완전히 신뢰할 수 있는 출력에서만 사용하십시오. |
| `{ mode: "sanitize", sanitize }` | [DOMPurify](https://github.com/cure53/DOMPurify)와 같은 커스텀 정화기를 사용하도록 위임하여, 래퍼 의존성 없이 풍부한 HTML을 정화할 수 있게 합니다. |

`"basic-sanitize"`은 간단한 포맷, 레이블, 색상, 이미지에 대한 작은 의존성 없는 정화기이며, 완전한 범용 정화기는 아닙니다. 임의의 풍부한 HTML의 경우 템플릿에서 프레임워크 노드를 반환하는 방법을 선호하거나(아래 참조) 전용 정화기를 연결하는 것이 좋습니다.

### 프레임워크 노드 반환(풍부한 마크업에 권장)

커스텀 마크업을 렌더링하는 가장 안전한 방법은 HTML 문자열 대신 템플릿에서 프레임워크 요소를 반환하는 것입니다. React/Vue/Angular는 기본적으로 인터폴레이션된 값을 이스케이프하므로 HTML 정화가 필요하지 않습니다.

~~~tsx
<ReactGantt
  templates={{
    task_text: (start, end, task) => <span className="task-label"><b>{task.text}</b></span>
  }}
/>
~~~

### 템플릿별 원시 HTML

활성 정책에 관계없이 특정 템플릿에 대해 원시 HTML 문자열을 렌더링하려면 wrapper 패키지에서 export된 `allowRawHTML` 헬퍼로 래핑합니다. 그런 다음 사용자가 제공한 데이터를 정화해야 하므로 export된 `escapeHTML` 유틸리티를 사용합니다:

~~~js
import { allowRawHTML, escapeHTML } from "@dhx/react-gantt";

const templates = {
  task_text: allowRawHTML((start, end, task) => `<b>${escapeHTML(task.text)}</b>`)
};
~~~

### 전역 정책 선택

~~~jsx
// 모든 곳에서 원시 HTML 유지(pre-v10 동작)
<ReactGantt htmlTemplatePolicy="unsafe-html" />

// 풍부한 HTML에 DOMPurify 사용
import DOMPurify from "dompurify";
<ReactGantt htmlTemplatePolicy={{ mode: "sanitize", sanitize: (html) => DOMPurify.sanitize(html) }} />
~~~

자세한 내용은 [Migration notes](migration.md#91---100)를 참고하십시오.