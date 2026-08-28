---
sidebar_label: DHTMLX Gantt 개요
title: DHTMLX Gantt 개요
slug: /
description: "DHTMLX Gantt의 기능, 에디션, 설치 옵션, 프레임워크 통합, API 문서, 샘플 및 프로젝트 계획 앱 개발을 위한 AI 도구를 탐색합니다."
---

import Link from '@docusaurus/Link';
import { FrameworkIcon } from '@site/src/components/FrameworkIcon';
 
**DHTMLX Gantt**은 가장 구성 가능한 JavaScript 차트로, TypeScript 정의를 포함합니다. 고급 계획 및 일정 인터페이스 구축을 위해 설계되었습니다. React, Angular, Vue 및 기타 프런트엔드 프레임워크와의 통합을 지원합니다. DHTMLX Gantt은 또한 DHTMLX MCP Server, Agent Skills, 그리고 구조화된 API를 통한 AI 지원 개발을 제공합니다. 

다음과 같은 비즈니스 애플리케이션에서 구성 가능한 시각적 타임라인이 필요할 때 사용할 수 있습니다: 프로젝트 관리, ERP, 건설, 제조, 현장 서비스, SaaS 등.

## 프레임워크별 빠른 시작

DHTMLX Gantt를 바닐라 JavaScript 위젯으로 사용하거나 현대 프레임워크에 통합할 수 있습니다. 선호하는 기술에 맞춘 단계별 가이드로 시작하세요:

<div className="framework-grid">

  <a className="framework-card" href="guides/initializing-gantt-chart/">
    <FrameworkIcon name="javascript" className="framework-icon" />
    <div className="framework-title">자바스크립트</div>
  </a>

  <a className="framework-card" href="integrations/react/quick-start/">
    <FrameworkIcon name="react" className="framework-icon" />
    <div className="framework-title">리액트</div>
  </a>

  <a className="framework-card" href="integrations/angular/quick-start/">
    <FrameworkIcon name="angular" className="framework-icon" />
    <div className="framework-title">앵귤러</div>
  </a>

  <a className="framework-card" href="integrations/vue/quick-start/">
    <FrameworkIcon name="vue" className="framework-icon" />
    <div className="framework-title">뷰</div>
  </a>

  <a className="framework-card" href="integrations/svelte/howtostart-svelte/">
    <FrameworkIcon name="svelte" className="framework-icon" />
    <div className="framework-title">스벨트</div>
  </a>

  <a className="framework-card" href="integrations/salesforce/howtostart-salesforce/">
    <FrameworkIcon name="salesforce" className="framework-icon" />
    <div className="framework-title">세일즈포스</div>
  </a>

</div>

React, Angular 및 Vue는 두 가지 통합 방식으로 지원됩니다:

- 공식 [React Gantt](integrations/react/quick-start.md), [Angular Gantt](integrations/angular/quick-start.md), 및 [Vue Gantt](integrations/vue/quick-start.md) 래퍼( PRO 및 평가 프로젝트에 권장 )
- 핵심 JavaScript Gantt 컴포넌트의 직접 통합과 [React](integrations/react/js-gantt-react.md), [Angular](integrations/angular/js-gantt-angular.md), [Vue](integrations/vue/js-gantt-vue.md) (Community 에디션)

## 라이브 데모

실행 중인 DHTMLX Gantt를 보려면 가장 인기 있는 데모를 확인해 보세요:

- [작업 및 링크가 있는 기본 Gantt 차트](https://docs.dhtmlx.com/gantt/samples/?sample=%2701_initialization/01_basic_init.html%27&filter=%27%27)
- [자동 스케줄링](https://docs.dhtmlx.com/gantt/samples/?sample=%2702_extensions/12_auto_scheduling.html%27&filter=%27%27) 및 [임계 경로](https://docs.dhtmlx.com/gantt/samples/?sample=%2702_extensions/03_critical_path.html%27&filter=%27%27) 예제
- 자원 관리: [다이어그램](https://docs.dhtmlx.com/gantt/samples/?sample=%2711_resources/04_resource_usage_diagram.html%27&filter=%27%27) 및 [히스토그램](https://docs.dhtmlx.com/gantt/samples/?sample=%2711_resources/09_resource_histogram.html%27&filter=%27%27)

![gantt_overview](/img/gantt_sample.png)

전체 샘플 보기를 통해 Gantt 기능의 전체 범위를 확인하세요.

프레임워크 지향 시작 포인트의 경우, [React](https://github.com/DHTMLX/react-gantt-examples), [Angular](https://github.com/DHTMLX/angular-gantt-examples), [Vue](https://github.com/DHTMLX/vue-gantt-examples)의 예제 저장소를 확인하세요.

:::note
일부 샘플은 PRO 기능을 시연하므로 커뮤니티 에디션 프로젝트에 재사용하기 전에 [Community vs PRO 비교](guides/editions-comparison.md)를 확인하세요.
:::

## 개발자 자료

- [설치 가이드](guides/installation.md) 커뮤니티, 체험판 및 PRO 설정 흐름
- [Community vs PRO 비교](guides/editions-comparison.md) 에디션 간 기능 차이
- 커뮤니티 에디션의 JavaScript Gantt의 공개 [npm 패키지](https://www.npmjs.com/package/dhtmlx-gantt)
- [GitHub 저장소](https://github.com/DHTMLX/gantt) 커뮤니티 에디션의 소스 코드 및 이슈 트래킹
- [API 참조](api/api-overview.md) 및 [샘플](https://docs.dhtmlx.com/gantt/samples/?sample=%2701_initialization/01_basic_init.html%27&filter=%27%27) 구현 세부 정보
- [What's New](whats-new.md) 릴리스 및 마이그레이션 노트

## Gantt 기능 하이라이트

DHTMLX Gantt에는 일정 엔진, 유연한 타임라인 및 리소스 도구가 포함됩니다.

### 프로젝트 일정 관리

핵심적으로 일정 엔진은 프로젝트 구조와 작업 시간을 처리합니다. 다룹니다:

- [작업 유형 및 종속성](guides/task-types.md).
- [작업 시간 구성](guides/working-time.md)으로 작업 및 프로젝트 달력과 자원별 달력( PRO 버전)을 포함.
- [자동 일정 작성](guides/auto-scheduling.md)으로 계획을 재계산( PRO 버전).
- [임계 경로](guides/critical-path.md)로 프로젝트 종료일을 이끄는 작업을 강조( PRO 버전).

### 그리드와 타임라인

컴포넌트는 왼쪽의 데이터 그리드와 오른쪽의 확대 가능한 시간 축을 결합합니다. 두 부분은 모두 광범위하게 구성 가능합니다:

- [유연한 레이아웃](guides/layout-config.md)으로 추가 그리드, 오른쪽 열 및 사용자 정의 패널.
- [구성 가능한 열](guides/specifying-columns.md)로 인라인 편집, 드래그 앤 드롭 및 키보드 탐색, [다중 선택](guides/multiselection.md) (PRO 버전).
- [사용자 정의 시간 축](guides/configuring-time-scale.md)으로 표시기 및 강조된 시간 슬롯.

### 고급 프로젝트 제어( PRO )

더 많은 기능이 필요한 팀을 위해 DHTMLX Gantt의 PRO 에디션은 세부 프로젝트 추적 도구를 제공합니다:

- [베이스라인](guides/inbuilt-baselines.md#baselines) 및 [마감일](guides/inbuilt-baselines.md#deadlines-and-constraints)로 계획일과 현재일 비교.
- [미할당 작업](guides/unscheduled-tasks.md) 및 [작업 분할](guides/split-tasks.md)로 불완료, 중단 또는 단계별 작업.

### 리소스 및 작업 부하 관리( PRO )

PRO 에디션은 전용 리소스 계층을 추가하여 간트 차트를 작업 일정 관리 및 작업 부하 가시성을 포함하는 계획 인터페이스로 만듭니다. 포함 내용:

- [리소스 할당](guides/resource-management.md#assigningresources)으로 리소스를 작업에 연결하여 정확한 일정 관리.
- [리소스 히스토그램](guides/resource-management.md#resource-histogram) 및 [리소스 부하 다이어그램](guides/resource-management.md#resourceloaddiagram)으로 팀의 작업 부하를 시각화.
- [리소스별 작업 그룹화](guides/resource-management.md#balancingresourceload)로 작업 부하를 추적하고 충돌을 파악하며 팀의 균형을 유지.

### 내보내기 및 생태계

팀은 종종 플랫폼 간 마이그레이션, 로컬 백업, 또는 다른 곳에서의 분석 실행이 필요합니다. DHTMLX Gantt은 외부 도구 및 출력 형식을 지원함으로써 통합됩니다:

- [PDF/PNG](guides/export.md) 및 [Excel](guides/excel.md)로 내보내기, [Node.js 내보내기 모듈](guides/export-requirements.md)을 포함.
- 지원되는 내보내기 서비스로 [MS Project](guides/export-msproject.md) 및 [Primavera](guides/export-primavera.md) 내보내기/가져오기.

### 상호 작용 및 편집

차트에서 직접 데이터 편집이 가능하며, 단순히 보기만 하는 것이 아닙니다. 이는 아래와 같이 지원됩니다:

- 커스텀 가능한 [라이트박스 편집기](guides/default-edit-form.md)로 작업 세부 정보를 조회하고 편집하며, 사용자 정의 필드와 버튼을 지원합니다.
- [퀵 정보](guides/quick-info.md) 팝업 및 [툴팁](guides/tooltips.md)으로 전체 양식을 열지 않고도 작업 세부 정보를 표시합니다.
- [드래그 앤 드롭 작업 생성 및 선택](guides/advanced-dnd.md), plus [마우스 드래그 타임라인 스크롤](api/config/drag_timeline.md).
- [키보드 탐색](guides/keyboard-navigation.md) 및 [접근성 지원](guides/accessibility.md).
- 안전한 편집을 위한 [되돌리기/다시 실행 기록](guides/undo-redo.md).

### 커스터마이징 및 스타일링

차트의 외관은 전체 테마에서 단일 작업 막대까지 모든 수준에서 조정 가능하며, 아래와 같이 구성됩니다:

- CSS 변수에 기반한 내장 [스킨](guides/skins.md) 세트, [깊은 커스터마이징](guides/custom-skins.md) 및 새로운 테마 생성 지원.
- [템플릿](guides/common-configuration.md#gantttemplatesobject)으로 작업, 링크 및 그리드 셀 렌더링 방식 재정의.
- 세밀한 [작업 색상 지정](guides/colouring-tasks.md) 및 [링크 스타일링](guides/colouring-lines.md)으로 특정 항목을 시각적으로 강조.
- [로컬라이제이션](guides/localization.md) 인터페이스 언어 및 날짜/시간 형식 지원.

## 에디션 및 라이선스

DHTMLX Gantt는 두 가지 에디션으로 제공됩니다: Community 및 PRO. 무료 Community 에디션으로 시작한 후 더 많은 기능, 공식 지원 및 완전한 Gantt 기반이 필요할 경우 PRO 에디션으로 업그레이드할 수 있습니다. 또한 공식 체험판을 통해 PRO 에디션을 바로 시작하거나 유료 라이선스로 시작할 수 있습니다. DHTMLX Gantt를 시작하기 위한 옵션은 다음과 같습니다:

- **[Community edition](https://dhtmlx.com/docs/products/dhtmlxGantt/open-source/).** 무료이며 MIT 라이선스로, DHTMLX Gantt v10+의 핵심 대화형 Gantt 기능을 다룹니다.
- **[Official trial](https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml).** PRO 기능 세트를 전체적으로 평가하고 체험 기간 동안 기술 지원을 제공합니다.
- **[PRO edition](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing).** 생산 환경에 맞춰져 있으며 고급 계획 기능, 공식 지원 및 상용 라이선스를 포함합니다.

에디션 간 정확한 기능 차이는 [Community vs PRO 비교](guides/editions-comparison.md)에서 확인하세요. 각 옵션의 설치 흐름은 [설치 가이드](guides/installation.md)를 참조하세요. 

:::note
이전 GPL 버전에서 마이그레이션 중인 경우 [마이그레이션 가이드](migration.md)를 사용하세요. DHTMLX Gantt v10 이상은 더 이상 GPL로 배포되지 않으며; GPL v2는 이전 버전에만 적용됩니다.
:::

## AI 코딩 도구

AI 기반 개발을 위해 코딩 도우미를 위한 DHTMLX Gantt 가이드를 시작으로 삼으세요:

- [AI Tools guide](integrations/ai-tools.md)
- [DHTMLX MCP Server guide](integrations/ai-tools/mcp-server.md)
- [Agent Skills guide](integrations/ai-tools/agent-skills.md)
- [Lovable AI integration guide](integrations/ai-tools/lovable-ai.md)

## 백엔드 통합

DHTMLX Gantt는 서버에서 RESTful API를 구현하여 어떤 백엔드와도 연결할 수 있습니다:

- 데이터는 일반적으로 [작업](guides/loading.md), [링크](guides/loading.md), [리소스](guides/resource-management.md) 및 [할당](guides/resource-management.md#connecting-resources-to-tasks)을 JSON으로 로드하고 저장합니다.
- 내장 [DataProcessor](guides/server-side.md)가 CRUD 연산을 서버로 라우팅하는 데 도움을 줍니다.
- CRUD 작업 및 데이터베이스 동기화를 다루는 인기 백엔드 플랫폼과 프레임워크용 튜토리얼이 있습니다([Node.js](integrations/node/howtostart-nodejs.md), [.NET Core](integrations/dotnet/howtostart-dotnet-core.md), [Laravel](integrations/php/howtostart-php-laravel.md) 등).

## What's next

처음 시작하는 경우 다음 순서를 따르세요:

1. 선호하는 프런트 엔드 프레임워크나 일반 JavaScript용 [How to start guide](integrations/howtostart-guides.md)를 참조하세요.
2. [grid columns](guides/specifying-columns.md), [working time calendars](guides/working-time.md), [scales](guides/configuring-time-scale.md), [editing behavior](guides/default-edit-form.md) 구성.
3. 백엔드에 연결하고 [DataProcessor](guides/server-side.md) 및 작업, 링크 및 리소스용 애플리케이션 엔드포인트를 설정.
4. [Guides](guides.md) 및 [API reference](api/api-overview.md)를 확인하여 템플릿, 이벤트 및 확장과 같은 더 깊은 커스터마이징을 확인하십시오.

이미 DHTMLX Gantt를 사용 중이고 이전 버전에서 업그레이드 중이라면, 릴리스 노트와 최신 기능 및 마이그레이션 가이드의 요약을 확인하기 위해 [What's New](whats-new.md)를 확인하세요.