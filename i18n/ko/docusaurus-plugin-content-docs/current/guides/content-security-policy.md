---
title: "콘텐츠 보안 정책 준수"
sidebar_label: "콘텐츠 보안 정책 준수"
---

# 콘텐츠 보안 정책 준수

콘텐츠 보안 정책(CSP)은 무단 JavaScript 실행을 방지하고 생성된 애플리케이션의 보안을 강화하는 데 사용되는 웹 표준입니다 [생성된 애플리케이션의 보안](guides/app-security.md).

**버전 7.0부터 CSP 지원이 Gantt 패키지에 포함되어 있습니다**. 이 라이브러리는 CSP(콘텐츠 보안 정책) 표준에 맞춰 dhtmlxGantt로 생성된 애플리케이션의 코드를 조정할 수 있도록 하는 [특별 구성](api/config/csp.md)을 제공합니다. 

~~~js
// the defult value is "auto"
gantt.config.csp = true;
...
gantt.init("gantt_here");
~~~

CSP 기능은 기본 gantt 위에 적용되며 주로 취약한 코드(날짜 포맷터와 파서)를 재정의합니다.
다만 인라인 스타일은 허용되어야 하며, 컴포넌트의 여러 곳에서 사용되기 때문입니다. 

**버전 v7.0 이전에는** CSP (*ext/dhtmlxgantt_csp.js*) 확장을 애플리케이션에서 CSP가 활성화된 경우 dhtmlxGantt와 함께 작동하도록 별도로 포함해야 했습니다. 

~~~html
<!-- include the *dhtmlxgantt_csp.js* after *dhtmlxgantt.js* -->
<script src="../codebase/ext/dhtmlxgantt_csp.js"></script>
~~~