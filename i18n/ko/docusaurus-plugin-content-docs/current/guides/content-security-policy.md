---
title: "Content Security Policy 준수"
sidebar_label: "Content Security Policy 준수"
---

Content Security Policy 준수
=========================

Content Security Policy(CSP)는 무단 JavaScript 실행을 방지하고 [생성된 앱의 보안성](guides/app-security.md)을 높이기 위해 설계된 웹 표준입니다.

**버전 7.0부터 CSP 지원이 Gantt 패키지에 내장되어 있습니다.** 이 라이브러리는 dhtmlxGantt 기반 애플리케이션이 CSP(Content Security Policy) 요구사항을 충족할 수 있도록 도와주는 [특별한 설정](api/config/csp.md)을 제공합니다.

~~~js
// 기본값은 "auto"입니다
gantt.config.csp = true;
...
gantt.init("gantt_here");
~~~

CSP 기능은 core gantt 위에서 동작하며, 보안에 취약한 코드(주로 날짜 포매터와 파서)를 업데이트합니다. 하지만 컴포넌트 전반에 걸쳐 인라인 스타일이 많이 사용되므로, 인라인 스타일은 허용되어야 합니다.

**v7.0 이전에는**, CSP가 활성화된 앱에서 dhtmlxGantt가 제대로 동작하려면 CSP 확장(*ext/dhtmlxgantt_csp.js*)을 별도로 추가해야 했습니다.

~~~html
<!-- *dhtmlxgantt.js* 다음에 *dhtmlxgantt_csp.js*를 포함하세요 -->
<script src="../codebase/ext/dhtmlxgantt_csp.js"></script>
~~~

