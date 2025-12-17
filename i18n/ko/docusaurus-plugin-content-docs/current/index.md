---
sidebar_label: DHTMLX Gantt 개요
title: DHTMLX Gantt 개요
slug: /
description: "DHTMLX Gantt JavaScript 컴포넌트 개요. 빠른 시작 가이드, 자세한 설명서 및 API 참고 자료를 확인하고 라이브 데모를 사용해 보세요."
---

import Link from '@docusaurus/Link';
import { FrameworkIcon } from '@site/src/components/FrameworkIcon';


**DHTMLX Gantt**는 브라우저에서 프로젝트 타임라인을 표시하고 편집하기 위한 JavaScript 컴포넌트입니다.  
구성 가능한 그리드, 확대/축소 가능한 타임스케일, 그리고 근무 시간·종속 관계·제약 조건을 이해하는 스케줄링 엔진을 제공합니다.

이를 통해 프로젝트 관리 도구, 건설/제조 일정표, 필드 서비스 계획 등 시각적 프로젝트 타임라인이 필요한 다양한 애플리케이션을 구축할 수 있습니다.

DHTMLX Gantt는 Standard와 PRO 버전으로 제공됩니다. PRO 버전에는 자동 스케줄링, 크리티컬 패스, 리소스 관리, 동적 로딩 등 추가 기능이 포함됩니다.

---

## 프레임워크별 빠른 시작

DHTMLX Gantt는 순수 JavaScript 위젯으로 사용하거나 최신 프레임워크에 통합할 수 있습니다. 
아래에서 사용하는 스택에 맞는 단계별 "시작하기" 가이드를 선택하세요:

<div className="framework-grid">

  <a className="framework-card" href="guides/initializing-gantt-chart/">
  <FrameworkIcon name="javascript" className="framework-icon" />
  <div className="framework-title">JavaScript</div>
  <div className="framework-desc">
  Script 태그 또는 번들러 기반의 최소 설정. 간단한 페이지 또는 비프레임워크 앱에 적합합니다.
  </div>
  </a>

  <a className="framework-card" href="integrations/react/">
  <FrameworkIcon name="react" className="framework-icon" />
  <div className="framework-title">React</div>
  <div className="framework-desc">
  준비된 <code>ReactGantt</code> 컴포넌트를 props와 events로 사용하세요.
  </div>
  </a>

  <a className="framework-card" href="integrations/angular/howtostart-angular/">
  <FrameworkIcon name="angular" className="framework-icon" />
  <div className="framework-title">Angular</div>
  <div className="framework-desc">
  얇은 래퍼를 이용해 Angular 프로젝트에 Gantt를 통합할 수 있습니다.
  </div>
  </a>

  <a className="framework-card" href="integrations/vue/howtostart-vue/">
  <FrameworkIcon name="vue" className="framework-icon" />
  <div className="framework-title">Vue</div>
  <div className="framework-desc">
  작은 래퍼 컴포넌트와 반응형 props로 Vue 앱에 Gantt 차트를 추가하세요.
  </div>
  </a>

  <a className="framework-card" href="integrations/svelte/howtostart-svelte/">
  <FrameworkIcon name="svelte" className="framework-icon" />
  <div className="framework-title">Svelte</div>
  <div className="framework-desc">
  구성과 이벤트를 바인딩하는 간단한 컴포넌트로 Svelte에서 Gantt를 사용할 수 있습니다.
  </div>
  </a>

  <a className="framework-card" href="integrations/react/quick-start/">
  <FrameworkIcon name="react" className="framework-icon" />
  <div className="framework-title">React (통합)</div>
  <div className="framework-desc">
  Gantt 핵심 위젯을 직접 컴포넌트에 포함해 생명주기와 데이터 흐름을 완전히 제어할 수 있습니다.
  </div>
  </a>

  <a className="framework-card" href="integrations/salesforce/howtostart-salesforce/">
  <FrameworkIcon name="salesforce" className="framework-icon" />
  <div className="framework-title">Salesforce</div>
  <div className="framework-desc">
  Salesforce 앱에 Gantt를 포함하고, 조직 데이터를 연결해 CRM에서 프로젝트 타임라인을 관리합니다.
  </div>
  </a>

</div>

---

## 라이브 데모

DHTMLX Gantt를 직접 확인하려면 온라인 데모를 살펴보세요:

- [작업 및 링크가 포함된 기본 Gantt 차트](https://docs.dhtmlx.com/gantt/samples/?sample=%2701_initialization/01_basic_init.html%27&filter=%27%27)
- [자동 스케줄링](https://docs.dhtmlx.com/gantt/samples/?sample=%2702_extensions/12_auto_scheduling.html%27&filter=%27%27) 및 [크리티컬 패스](https://docs.dhtmlx.com/gantt/samples/?sample=%2702_extensions/03_critical_path.html%27&filter=%27%27)
- 리소스 관리: [사용량 다이어그램](https://docs.dhtmlx.com/gantt/samples/?sample=%2711_resources/04_resource_usage_diagram.html%27&filter=%27%27), [히스토그램](https://docs.dhtmlx.com/gantt/samples/?sample=%2711_resources/09_resource_histogram.html%27&filter=%27%27)
- [전체 샘플 목록](https://docs.dhtmlx.com/gantt/samples/)

---

## 주요 기능

DHTMLX Gantt는 스케줄링 엔진, 유연한 타임라인, 리소스 도구를 결합합니다. 
아래는 핵심 기능과 상세 설명으로 연결되는 섹션들입니다.

### 프로젝트 스케줄링

DHTMLX Gantt는 프로젝트 구조와 근무 시간을 이해하는 스케줄링 엔진을 제공합니다:

- [작업 유형](guides/task-types.md) 및 [종속 관계](guides/dependencies.md) - 세 가지 기본 유형(작업, 요약 작업, 마일스톤)
- 프로젝트, 작업, 리소스 수준의 [근무 시간 캘린더](guides/working-time/)
- [자동 스케줄링](guides/auto-scheduling/) 및 [크리티컬 패스](guides/critical-path/)

스케줄링 동작은 필요에 따라 MS Project와 유사하게 조정할 수 있습니다.

### 타임라인 & 그리드

왼쪽에는 데이터 그리드, 오른쪽에는 확대 가능한 타임스케일이 있으며 모두 고도로 커스터마이즈 가능합니다:

- 추가 그리드, 오른쪽 패널, 커스텀 패널을 포함한 유연한 [레이아웃](guides/layout-config/)
- 인라인 편집, [다중 선택](guides/multiselection/), 드래그 앤 드롭 등을 지원하는 [컬럼 설정](guides/specifying-columns/)
- [마커](guides/markers/) 및 [강조 표시된 시간 슬롯](guides/highlighting-time-slots/)이 포함된 커스터마이즈 가능한 [타임스케일](guides/configuring-time-scale/)

### 고급 프로젝트 제어

더 세밀한 프로젝트 관리를 위해 다음 기능을 제공합니다:

- [베이스라인](guides/inbuilt-baselines/#baselines) 및 [데드라인](guides/inbuilt-baselines/#deadlines-and-constraints)
- [일정 미지정 작업](guides/unscheduled-tasks/) 및 [분할 작업](guides/split-tasks/)
- [실행 취소/다시 실행](guides/undo-redo)

### 리소스 및 작업량 관리 (PRO)

PRO 버전에서는 리소스 관리 기능이 추가됩니다:

- 작업에 대한 [리소스 할당](guides/resource-management/#assigningresources)
- [리소스 히스토그램](guides/resource-management/#resource-histogram) 및 [부하 다이어그램](guides/resource-management/#resourceloaddiagram)
- [리소스 기준 작업 그룹화](guides/resource-management/#balancingresourceload)

이 기능을 통해 애플리케이션 내에서 기본적인 리소스 관리가 가능합니다.

### 내보내기 & 에코시스템

강력한 통합 및 내보내기 기능을 제공합니다:

- [PDF/PNG](guides/export/) 및 [Excel](guides/excel/) 내보내기 (Node.js 모듈 포함)
- [MS Project](guides/export-msproject/), [Primavera](guides/export-primavera/) 와의 연동

---

## 프레임워크 및 백엔드 통합

### 프론트엔드 통합

DHTMLX Gantt는 모든 최신 브라우저에서 동작하는 프레임워크 독립적인 바닐라 JS 컴포넌트입니다. 다음 방식으로 사용할 수 있습니다:

- 독립적인 JS 위젯으로 삽입
- [React](integrations/react), [Angular](integrations/angular/howtostart-angular), [Vue](integrations/vue/howtostart-vue), [Svelte](integrations/svelte/howtostart-svelte) 래퍼로 사용

**React**에서는 두 가지 옵션이 있습니다:

- [ReactGantt 공식 래퍼](integrations/react) - 선언형 props 기반 컴포넌트
- [저수준 React 통합 가이드](integrations/react/quick-start/)

**Angular**, **Vue**, **Svelte**는 "How to start" 가이드에서 얇은 래퍼 컴포넌트 구현 방법을 설명합니다.

### 백엔드 통합

백엔드에서는 Gantt가 REST 스타일 API와 통신합니다:

- 데이터는 보통 [JSON (tasks, links, resources, assignments)](guides/loading/) 형태입니다.
- 내장된 [DataProcessor](guides/server-side/)가 CRUD 라우팅을 돕습니다.
- [Node.js](integrations/node/howtostart-nodejs/), [.NET Core](integrations/dotnet/howtostart-dotnet-core/), [Laravel](integrations/php/howtostart-php-laravel/) 등 인기 백엔드용 튜토리얼 제공

이를 통해 기존 시스템이나 새로운 마이크로서비스에 쉽게 Gantt를 연결할 수 있습니다.

---

## 다음 단계

시작하는 경우:

1. 원하는 프레임워크 또는 JavaScript용 [시작 가이드](#quick-start-by-framework)를 따라 진행하세요. 
2. [그리드 컬럼](guides/specifying-columns/), [근무 시간 캘린더](guides/working-time/), [타임스케일](guides/configuring-time-scale/), [편집 동작](guides/default-edit-form/)을 조정하세요. 
3. [백엔드를 연결](integrations/howtostart-guides/#how-to-start-with-gantt-on-server-side)하고 
  [DataProcessor](guides/server-side/#customrouting) 및 REST 엔드포인트를 설정하세요. 
4. 더 깊은 커스터마이징을 위해 [Guides](guides/) 및 [API 참고서](api/api-overview/)를 살펴보세요.

이미 DHTMLX Gantt를 사용 중이며 이전 버전에서 업그레이드하는 경우, 최신 기능과 마이그레이션 가이드는 [What's new](whats-new/)에서 확인할 수 있습니다.
