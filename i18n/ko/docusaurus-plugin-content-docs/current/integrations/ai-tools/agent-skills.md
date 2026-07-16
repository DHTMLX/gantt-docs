---
sidebar_label: 에이전트 스킬
title: 에이전트 스킬
description: "DHTMLX Gantt에서 작동하는 AI 어시스턴트를 위한 에이전트 스킬 설치"
---

# 에이전트 스킬

AI 코딩 어시스턴트인 Claude Code나 Codex는 DHTMLX Gantt 코드를 생성할 수 있지만, 특수 API에서 자주 실수를 범합니다: 잘못된 프로퍼티 이름, 누락된 CSS 임포트, 잘못된 콜백 시그니처, 또는 호환되지 않는 데이터 패턴의 혼합. 에이전트 스킬은 코드를 작성하기 전에 어시스턴트가 올바른 패턴과 알려진 함정을 배우도록 하여 이를 해결합니다.

MCP 서버보다 실시간 API 참조를 제공하는 MCP 서버와 달리, 스킬은 통합 패턴, 의사 결정 포인트, 실패 방지에 중점을 둡니다.

**깃허브:** [DHTMLX/skills](https://github.com/DHTMLX/skills)

## 가능한 스킬 {#available-skills}

### DHTMLX JS Gantt

핵심 JavaScript Gantt를 순수 JavaScript 및 TypeScript 애플리케이션에 통합하는 것을 다룹니다. 이 스킬은 모든 배포 채널을 인식합니다 - 무료 패키지 `dhtmlx-gantt`(v10+용 커뮤니티 에디션은 MIT, v9.x 및 이하는 GPL 레거시 에디션), 평가 패키지 `@dhx/trial-gantt`, 상용 패키지 `@dhx/gantt`, 그리고 `<script>` / CDN 로딩을 포함하고 - 각 채널에 맞춰 설정, 데이터 및 테마 적용 가이드를 조정합니다.

규칙은 [GitHub 저장소](https://github.com/DHTMLX/skills/tree/main/dhtmlx-js-gantt)에서 확인하세요.

### DHTMLX React Gantt

React 애플리케이션에 `@dhtmlx/trial-react-gantt`와 `@dhx/react-gantt`의 통합을 다룹니다. 이 스킬은 래퍼별 설정, 데이터 소유권 및 지속성 패턴, 그리고 실수하기 쉬운 테마 적용 방법을 어시스턴트에게 가르치며, 실제 프로젝트에서 추출된 알려진 함정과 구체적인 해결책을 제시합니다.

규칙은 [GitHub 저장소](https://github.com/DHTMLX/skills/tree/main/dhtmlx-react-gantt)에서 확인하세요.

이 패턴들을 엔드투엔드로 적용한 실제 예를 보려면 [React Gantt Lovable Starter]를 참조하십시오 - Lovable에서 생성된 다중 프로젝트 플래너이며, 전체 빌드 레시피는 그 [`lovable/`](https://github.com/DHTMLX/react-gantt-lovable-starter/tree/main/lovable) 폴더에 있습니다.

### DHTMLX Angular Gantt

Angular 애플리케이션에 `@dhtmlx/trial-angular-gantt`와 `@dhx/angular-gantt`의 통합을 다룹니다. 이 스킬은 래퍼별 설정, 데이터 소유권 및 지속성 패턴(`data.save` / `data.batchSave`), 그리고 실수하기 쉬운 테마 적용 방식에 대해 어시스턴트에게 가르치며, 구체적인 수정으로 알려진 실패 모드를 제시합니다.

규칙은 [GitHub 저장소](https://github.com/DHTMLX/skills/tree/main/dhtmlx-angular-gantt)에서 확인하세요.

## 설치

```bash
npx skills add DHTMLX/skills --skill dhtmlx-js-gantt
npx skills add DHTMLX/skills --skill dhtmlx-react-gantt
npx skills add DHTMLX/skills --skill dhtmlx-angular-gantt
```

### 수동 설치

다음 저장소를 복제하거나 다운로드하고 관련 스킬 폴더(`dhtmlx-js-gantt`, `dhtmlx-react-gantt`, 또는 `dhtmlx-angular-gantt`)를 프로젝트의 skills 디렉터리에 복사합니다(예: Claude Code의 경우 `.claude/skills/`, Cursor의 경우 `.cursor/skills/`).

## MCP와 함께 사용하는 스킬

스킬과 MCP 서버는 보완적입니다. MCP는 어시스턴트에게 실시간 API 문서 - 메서드 시그니처, 프로퍼티 값, 구성 옵션 - 에 대한 접근을 제공합니다. 스킬은 일반적인 실수를 방지하는 통합 패턴을 가르칩니다. 최상의 결과를 얻으려면 둘 다 사용하는 것이 좋습니다. 설정 지침은 [DHTMLX MCP Server](integrations/ai-tools/mcp-server.md)를 참조하십시오.