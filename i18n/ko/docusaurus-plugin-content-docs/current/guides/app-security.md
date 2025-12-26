---
title: "애플리케이션 보안"
sidebar_label: "애플리케이션 보안"
---

# 애플리케이션 보안

DHTMLX Gantt는 다양한 웹 애플리케이션에 Gantt 기능을 원활하게 통합할 수 있도록 설계된 클라이언트 사이드 자바스크립트 라이브러리입니다.  
보안을 강화하기 위해 Gantt의 기능을 제한하지 않으며, 대신 대부분의 Gantt 기능을 프로젝트에 맞게 조정할 수 있도록 허용합니다.

하지만, DHTMLX Gantt 자체는 SQL 인젝션, XSS, CSRF 공격과 같은 위협에 대한 보호를 처리하지 않는다는 점을 기억해야 합니다.  
프로젝트의 보안은 애플리케이션을 어떻게 구성하고 보호하느냐에 달려 있습니다.  
이 문서에서는 HTML 정제에 대한 유용한 인사이트와 권장 사항을 제공합니다.

## 기본 보안 단계

사이버 보안은 광범위하고 복잡한 분야이므로 간단한 체크리스트로 모두 해결할 수는 없습니다.  
하지만, 실질적인 단계들을 따르면 기본적인 위험을 줄일 수 있습니다.

**1. 애플리케이션에서 Content Security Policy(CSP)를 사용하세요**

아래와 같은 CSP 헤더를 추가하면 앱에서 XSS 스크립트 실행을 차단할 수 있습니다:

~~~
Content-Security-Policy: script-src 'self'
~~~

앱에 따라 더 상세한 정책이 필요할 수 있지만, 인라인 스크립트 실행을 차단하면 많은 XSS 및 CSRF 공격을 예방할 수 있습니다.

**2. 사용자 입력을 데이터베이스에 저장하기 전에 백엔드에서 정제하세요**

새로운 레코드를 추가할 때, 사용자 입력을 그대로 저장하지 마세요:

~~~
db.query("INSERT INTO gantt_tasks(text, start_date, duration, progress, parent)"
    + " VALUES (?,?,?,?,?)",
    [task.text, task.start_date, task.duration, task.progress, task.parent])
~~~

입력 형식을 검증하고 유해한 내용을 제거하는 것이 좋습니다.  
예를 들어, Node.js에서는 [DOMPurify](https://www.npmjs.com/package/dompurify)와 같은 라이브러리를 사용할 수 있습니다:

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

**3. 데이터를 렌더링하기 전에 HTML 엔티티를 이스케이프하세요**

데이터를 표시할 때 HTML 마크업이 실행되지 않도록, 사용자가 입력한 HTML 문자를 Gantt에 전달하기 전에 반드시 이스케이프 처리하세요.  
[validator](https://www.npmjs.com/package/validator) 라이브러리를 사용한 예시는 다음과 같습니다:

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

**4. SQL 데이터베이스를 사용할 경우, 문자열을 연결하여 쿼리를 생성하지 말고 파라미터화된 쿼리, ORM 또는 Query Builder를 사용하세요**

이 방법은 SQL 인젝션 공격을 방지하는 데 도움이 됩니다.  
이스케이프 또는 검증되지 않은 사용자 입력을 SQL 쿼리에 직접 사용하지 마세요.  
현재 코드가 그렇다면, 파라미터화된 쿼리나 SQL 라이브러리에서 제공하는 이스케이프 함수를 사용하는 것으로 전환하세요.

**5. 마지막으로: 사이버 보안 전문가와 상담하고, 회사의 보안 정책을 준수하세요**

보안은 지속적인 과정입니다.  
이 단계를 따르고, 조직의 정책을 준수하며, 보안 전문가의 검토를 받으면 대부분의 일반적인 웹 위협을 최소화할 수 있습니다.

기본 사항을 살펴본 후, Gantt에 특화된 몇 가지 고려사항을 알아보겠습니다.

## 클라이언트 측에서 취약한 Gantt 영역

클라이언트 측에 Gantt와 같은 복잡한 기능을 추가할 때 주의해야 할 주요 사항은 다음과 같습니다:

- DHTMLX Gantt는 클라이언트에서 실행되므로 서버에서 로드된 모든 데이터를 그대로 사용합니다.  
데이터는 서버에 저장되므로 대부분의 위험은 서버에서 발생합니다. 하지만, 백엔드 보호는 DHTMLX Gantt의 범위를 벗어납니다.  
- 공격자는 DevTools(셀프-XSS 공격)를 통해 사용자가 악성 코드를 실행하도록 유도할 수 있습니다.  
태스크 텍스트에 붙여넣은 코드는 DevTools를 통해 입력된 것과 동일하게 동작합니다.  
- 공격자가 Gantt 인스턴스 객체에 접근하면 모든 보호를 우회할 수 있습니다.  
구성을 변경하거나 Gantt를 완전히 제어할 수 있습니다.

다음은 DHTMLX Gantt에서 보안 문제가 발생할 수 있는 취약한 영역입니다:

- 사용자가 입력 및 저장한 데이터  
- 표시되는 Gantt 데이터(텍스트 및 시각적 요소)  
- Gantt 데이터와 상호작용하는 [커스텀 HTML 요소](guides/export.md#exportinghtmlelements)  
- Gantt 객체 자체에 대한 접근

이러한 우려 사항을 좀 더 자세히 살펴보겠습니다.

## Gantt 접근 권한 격리

Gantt를 보호하는 첫 단계 중 하나는 손상된 컴포넌트나 속은 사용자(셀프-XSS)로부터 Gantt를 격리하는 것입니다.

:::note
만약 공격자가 앱의 구성 파일(여기에는 Gantt 구성 파일도 포함됨)에 접근한다면, 
XSS 공격에 대한 모든 보호 조치(실행된 경우)도 무력화될 수 있으므로, 이 시나리오는 고려하지 않습니다.
:::

앱이 완전히 로드된 후 공격자가 Gantt 인스턴스 객체에 접근할 수 있다면, 모든 것을 수정하고 함수를 덮어쓸 수 있습니다.  
따라서 프로젝트 내에서 Gantt를 격리하는 것이 중요합니다.

이를 위해 함수 내부에 별도의 Gantt 인스턴스를 생성하세요. 이렇게 하면 함수 내부의 코드는 외부에서 접근할 수 없습니다.

기본적으로 Gantt는 *gantt* 객체에 새 인스턴스를 생성합니다.  
함수 내부에서 *const* 또는 *let*을 사용하여 새 변수를 선언하고 Gantt 인스턴스를 그곳에 저장하면 외부 범위에서 숨길 수 있습니다.

~~~js
function addGantt(){
  const gantt = Gantt.getGanttInstance();
}
addGantt()
~~~

글로벌 gantt 객체와 혼동을 피하기 위해 다른 변수명을 사용할 수도 있습니다:

~~~js
function addGantt(){
  const protectedGantt = Gantt.getGanttInstance();
}
addGantt()
~~~

Gantt를 불필요한 접근으로부터 보호한 후에는, Gantt 차트에 데이터가 어떻게 입력되고 표시되는지에 집중해야 합니다.

## Gantt에 데이터 입력

이 영역은 공격자가 Gantt 보안을 위협하기 위해 악용할 수 있는 핵심 부분입니다.

데이터 입력 지점은 XSS 공격의 흔한 대상입니다.  
Gantt 컴포넌트에서는 다음을 통해 데이터가 수정될 수 있습니다:

- lightbox  
- 인라인 에디터  
- 커스텀 요소가 포함된 모달 박스  
- 서드파티 라이브러리  
- 리소스 로드 타임라인의 리소스 할당  
- 커스텀 입력 요소가 포함된 추가 레이어  
- Gantt API를 사용하여 데이터 입력이 가능한 모든 커스텀 솔루션(툴바, 커스텀 태스크 편집 폼 등)

태스크 객체에는 [다양한 속성](guides/task-properties.md)이 있으며, 활성화된 기능에 따라 사용됩니다.  
수정 가능한 속성이 많을수록 입력값을 꼼꼼하게 정제하는 것이 중요합니다.

### 예시 살펴보기

아래는 DHTMLX Gantt를 사용할 때 HTML 정제를 통해 XSS 공격으로부터 보호하는 다양한 방법을 보여주는 예시입니다.


**Related example:** [XSS 공격 방지 예제(security, csp)](https://snippet.dhtmlx.com/cdy9p0yl)


이 예제에서는 태스크 이름을 수정하고, 날짜와 기간을 조정하며, 리소스 할당을 변경하고, 텍스트 노트를 추가할 수 있습니다.  
시작 날짜와 기간 변경은 lightbox와 인라인 에디터로 제한됩니다. 두 인라인 에디터 모두 **date**와 **number** 타입을 명시적으로 지정합니다.  
lightbox 내에서는 기간만 직접 설정할 수 있고, 날짜는 드롭다운에서 선택해야 합니다.

어떤 인터페이스도 악성 코드가 포함된 텍스트 입력을 허용하지 않습니다.  
DOM 인스펙터로 요소 타입을 변경하려고 시도하면, 날짜나 기간에 대해 잘못된 값이 생성됩니다.  
이 경우 오류가 발생해 Gantt가 더 이상 동작하지 않으며, 페이지를 새로고침해야만 복구됩니다. 이 과정에서 차트가 다시 그려지지 않으므로 서버로 데이터가 전송되지 않습니다.

하지만, 태스크 이름은 **string** 타입을 사용하므로 XSS 공격에 취약할 수 있습니다.  
따라서 입력값 정제가 필요합니다. 예제에서는 한 가지 XSS 공격과 이를 방지하는 방법을 보여줍니다.

![](/img/preventing_xss_attack.png)

실제 프로젝트에서는 포괄적인 데이터 정제를 구현하는 것이 중요합니다.  
이 예시에서는 단순히 "\<"와 "\>" 문자를 각각 **`&lt;`** 및 **`&gt;`** HTML 엔티티로 대체합니다.  
이렇게 하면 태스크 텍스트 내에서 HTML 요소가 렌더링되는 것을 방지할 수 있습니다.

이 치환은 **sanitizeText()** 함수 내에서 이루어집니다:

~~~js
function sanitizeText(text){
    // uncomment to test XSS
    // return text

    // prevent XSS by disabling HTML elements
    return text.split("<").join("&lt;").split(">").join("&gt;");
}
~~~

이 함수는 이벤트 핸들러인 **onLightboxSave**(lightbox)와 **onBeforeSave**(인라인 에디터)에서 호출됩니다.

이 예제에서는 커스텀 인라인 에디터나 커스텀 lightbox 섹션을 사용하여 태스크에 텍스트 노트를 추가할 수 있습니다.  
정제는 이러한 커스텀 컴포넌트의 함수 내에서, 값을 렌더링하기 전과 DOM 요소에서 변경사항을 읽기 전에 적용할 수 있습니다:

~~~js
// 인라인 에디터의 경우:
set_value: function(value, id, column, node){
    node.firstChild.value = sanitizeText(value || "");
},
get_value: function(id, column, node){
    return sanitizeText(node.firstChild.value);
},

// lightbox의 경우:
set_value: function(node, value, task){
    node.value = sanitizeText(value || "");
},
get_value: function(node, task){
    return sanitizeText(node.value);
},
~~~

하지만, **onLightboxSave**와 **onBeforeSave** 이벤트 핸들러를 사용하여 텍스트 노트 정제를 처리하는 것이 더 간단합니다:

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

리소스 할당도 lightbox에서 편집할 수 있습니다. Gantt는 값이 **number** 타입만 되도록 제한하지 않으므로, 문자열 값이 허용되어 XSS 공격이 가능할 수 있습니다.

리소스 값은 태스크 속성에 저장되므로, **sanitizeResourceValues()** 함수는 모든 값을 반복하여 각 값을 **sanitizeText()**로 정제합니다:

~~~js
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

이 함수는 **onLightboxSave** 이벤트 핸들러 내에서 호출됩니다:

~~~js
protectedGantt.attachEvent("onLightboxSave", function(id, task, is_new) {
    sanitizeResourceValues(task)
    return true;
});
~~~

*Gantt 설정에서 사용되는 다른 모든 문자열 파라미터도 반드시 정제해야 합니다.*

이 예제에서 리소스 타임라인의 리소스 할당에 원치 않는 내용을 입력하려고 하면, 숫자 값만 허용됩니다. 숫자가 아닌 값은 저장되지 않습니다.

### 서드파티 도구를 통한 데이터 입력

DHTMLX Gantt는 서드파티 폼, 도구 또는 라이브러리를 통한 작업 편집을 포함하여 광범위한 커스터마이징 옵션을 제공합니다.  
이러한 경우에는 Gantt API가 작업 처리를 관리하므로, 데이터 정제(sanitizing)에 대한 보편적인 조언을 제공하기 어렵습니다. 이는 커스터마이징이 어떻게 구현되었는지에 따라 달라집니다.

아래 예제는 작업 이름을 편집하는 커스텀 폼을 포함하고 있으며, **sanitizeText()** 함수를 적용하여 텍스트를 이스케이프 처리합니다:

~~~js
document.body.querySelector("[name='save']").onclick = function(){
    const newTaskName = document.body.querySelector("[name='text']").value;
    task.text = sanitizeText(newTaskName);
    protectedGantt.updateTask(task.id);
}
~~~

이 예제는 데이터가 입력될 수 있는 대부분의 방식을 다룹니다. Gantt에 데이터가 입력될 때 정제하면 효과적으로 악성 데이터를 필터링하여 Gantt 차트 내에서 XSS 공격이 무력화되고, 악성 데이터가 서버로 전송되는 것을 방지할 수 있습니다.

## Gantt에서 데이터 표시

또 다른 고려 사항은 Gantt 차트에서 데이터가 어떻게 표시되는지입니다.  
표시되는 데이터를 정제하는 것은 입력을 정제하는 것만큼 효과적이지는 않지만, XSS 공격 체인을 차단하거나 중단하는 데 도움이 됩니다.  
예를 들어, 서버가 손상되었지만 Gantt 자체는 안전한 경우, 클라이언트 측에서의 정제는 악성 스크립트 실행을 차단할 수 있습니다.

가장 안전한 접근 방식은 Gantt에서 데이터가 표시되는 모든 부분을 정제하는 것입니다.  
이를 위해서는 [각 그리드 컬럼의 설정에서 템플릿을 사용](guides/specifying-columns.md#datamappingandtemplates)하고, [관련된 모든 템플릿](api/overview/templates-overview.md)을 적용하여 안전하지 않은 콘텐츠가 렌더링되지 않도록 해야 합니다.

하지만, 표시와 관련된 위험을 처리하는 더 간단한 방법은 두 가지 주요 데이터 소스(사용자 입력과 서버 데이터)를 통제하는 것입니다.  
들어오는 데이터를 정제함으로써 Gantt 차트에 악성 콘텐츠가 나타날 가능성을 줄일 수 있습니다.

예를 들어, 서버에서 작업을 불러올 때 **onTaskLoading** 이벤트를 사용하여 작업 속성을 정제할 수 있습니다:

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

서버에서 작업 객체를 별도로 받아와서 Gantt에 추가하거나 업데이트하기 전에 처리하는 등, 다른 데이터 로딩 방식이 있을 수 있습니다.  
이 경우에는 작업이 추가되기 전에 처리 함수 내에서 정제가 이루어져야 합니다:

~~~js
let newTask = await loadFromServer(23);
sanitizeTaskProperties(newTask);
gantt.addTask(newTask);
~~~

누군가 브라우저의 요소 검사기를 사용하여 Gantt의 DOM 요소에 직접 악성 코드를 삽입한다면, 이를 방지할 수는 없습니다.  
하지만, 이러한 변경 사항은 Gantt가 다시 렌더링될 때 사라지며, 서버에도 저장되지 않습니다.

## 서버 측 이슈

클라이언트 측 유효성 검사는 쉽게 우회되거나 비활성화될 수 있으므로 보안 목적으로만 의존해서는 안 됩니다.  
그 목적은 서버 응답을 기다리지 않고 잘못된 입력에 대해 즉각적인 피드백을 제공하는 데 있습니다.  
최종적인 유효성 검사와 보안 검사는 반드시 서버에서 이루어져야 합니다.

백엔드는 들어오는 데이터를 적절히 검증, 이스케이프, 정제하고, 사용자 접근 규칙을 적용해야 합니다.

### SQL 인젝션

dhtmlxGantt는 완전히 클라이언트 측 라이브러리이므로, SQL 인젝션 방지는 백엔드의 책임입니다.

다음 두 가지를 고려해야 합니다:

- lightbox에는 기본 유효성 검사가 포함되어 있지 않으므로, 별도로 처리하지 않으면 사용자가 편집 가능한 필드에 어떤 값이든 입력할 수 있습니다.
- 백엔드 API는 클라이언트 UI를 우회하여 PUT/POST 요청으로 악성 값을 직접 전달받을 수 있습니다.

따라서, 백엔드에서 SQL 인젝션 방지 기능을 반드시 구현해야 합니다.  
[dhtmlxConnector](integrations/php/howtostart-connector.md)를 사용하고, [문서](https://docs.dhtmlx.com/connector__php__basis.html#loadingfromdatabase)에 설명된 대로 테이블을 구성하면 값이 자동으로 이스케이프 처리됩니다.  
그 외의 경우에는 플랫폼에서 권장하는 안전한 CRUD 관행을 따라야 합니다. [시작 가이드](integrations/howtostart-guides.md)에 제시된 구현 예시는 SQL 인젝션에 안전하도록 설계되어 있습니다.

### CSRF 공격

Gantt가 백엔드로 전송하는 요청에 커스텀 인증 토큰 또는 헤더를 추가하는 방법에 대해서는 [이 문서](guides/server-side.md#customrequestheadersandparameters)를 참고하세요.

## 콘텐츠 보안 정책(Content Security Policy)

라이브러리에는 dhtmlxGantt 애플리케이션이 Content Security Policy(CSP) 표준을 준수하도록 조정할 수 있는 특별한 설정 옵션이 포함되어 있습니다.  
이는 다양한 코드 인젝션 공격을 방지하여 보안을 강화합니다.

[dhtmlxGantt 애플리케이션에 CSP를 적용하는 방법 자세히 알아보기](api/config/csp.md).

