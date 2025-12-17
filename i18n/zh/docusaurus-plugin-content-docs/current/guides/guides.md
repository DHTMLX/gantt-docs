---
title: "指南"
sidebar_label: "指南"
---

指南
====

本节是文档的核心内容，提供了关于 dhtmlxGantt 的实用使用指导。内容以任务为中心，分为不同难度的操作手册，涵盖了基本操作流程与常见问题的解决方法。

你也可以查看 dhtmlxGantt 库 [Standard 和 PRO 版本的功能对比](guides/editions-comparison.md)。

<table cellspacing="0" cellpadding="5" border="0">
  <tbody>
  <tr>
  <td id="data" class='topics'><h4> 在页面上创建甘特图 </h4> <ul id="data_sublist" > <li>[dhtmlxGantt 설치 방법](guides/installation.md)</li> <li>[Initializing Gantt](guides/initializing-gantt-chart.md)</li> <li>[확장 기능 전체 목록](guides/extensions-list.md)</li> </ul></td>
  <td class='topic_description'>讲解如何安装和初始化 Gantt，以及可用扩展的列表。</td>
  </tr>
  <tr>
  <td id="data" class='topics'><h4> 前端如何开始使用 Gantt </h4> <ul id="data_sublist" > <li>[dhtmlxGantt를 Plain JS/HTML에서 사용하기](guides/initializing-gantt-chart.md)</li> <li>[dhtmlxGantt와 Angular 연동하기](integrations/angular/howtostart-angular.md)</li> <li>[dhtmlxGantt와 React 연동하기](integrations/react/quick-start.md)</li> <li>[dhtmlxGantt와 Vue.js 연동하기](integrations/vue/howtostart-vue.md)</li> <li>[dhtmlxGantt와 Svelte 연동](integrations/svelte/howtostart-svelte.md)</li> </ul></td>
  <td class='topic_description'>描述如何在前端构建和配置标准甘特图。</td>
  </tr>
  <tr>
  <td id="data" class='topics'><h4> 后端如何开始使用 Gantt </h4> <ul id="data_sublist" > <li>[dhtmlxGantt와 ASP.NET Core 사용하기](integrations/dotnet/howtostart-dotnet-core.md)</li> <li>[dhtmlxGantt와 ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)</li> <li>[dhtmlxGantt와 Node.js 연동하기](integrations/node/howtostart-nodejs.md)</li> <li>[dhtmlxGantt와 PHP: Laravel 연동](integrations/php/howtostart-php-laravel.md)</li> <li>[dhtmlxGantt와 PHP:Slim 연동하기](integrations/php/howtostart-php-slim4.md)</li> <li>[dhtmlxGantt와 Python](integrations/other/howtostart-python.md)</li> <li>[dhtmlxGantt와 Salesforce LWC 연동하기](integrations/salesforce/howtostart-salesforce.md)</li> <li>[dhtmlxGantt와 Ruby on Rails 연동하기](integrations/other/howtostart-ruby.md)</li> </ul></td>
  <td class='topic_description'>介绍如何在多种后端平台上构建标准 dhtmlxGantt 甘特图，并处理如数据库连接、数据加载、保存变更、任务排序和应用安全等常见任务。</td>
  </tr>
  <tr>
  <td id="data" class='topics'><h4> 配置甘特图 </h4> <ul id="data_sublist" > <li>[Configuration](guides/common-configuration.md)</li> <li>[간트 레이아웃](guides/layout-config.md)</li> <li>[리소스 관리](guides/resource-management.md)</li> <li>[이벤트 처리](guides/handling-events.md)</li> <li>[여러 개의 차트를 한 페이지에 표시하기](guides/multiple-gantts.md)</li> <li>[서버에서 Gantt 사용하기](guides/using-gantt-on-server.md)</li> </ul></td>
  <td class='topic_description'>讲解如何在服务器端创建甘特图、在页面上构建标准图表，并通过配置选项、自定义模板、绑定事件等方式使其生动起来。</td>
  </tr>
  <tr>
  <td id="manipulations" class='topics'><h4> 数据加载与保存 </h4> <ul id="manipulations_sublist"> <li>[데이터 로딩](guides/loading.md)</li> <li>[Server-Side Integration](guides/server-side.md)</li> <li>[성능: 개선 방법](guides/performance.md)</li> </ul></td>
  <td class='topic_description'>讨论将数据加载到甘特图中的不同方法，包括各种来源、格式和技术。</td>
  </tr>
  <tr>
  <td id="events" class='topics'><h4> 配置网格区域 </h4> <ul id="events_sublist"> <li>[컬럼 지정하기](guides/specifying-columns.md)</li> <li>[그리드에서 행 크기 조정하기](guides/resizing-rows.md)</li> <li>[트리 컬럼 구성하기](guides/tree-column.md)</li> <li>[작업 순서 변경하기](guides/reordering-tasks.md)</li> <li>[멀티 태스크 선택](guides/multiselection.md)</li> <li>[컬럼 정렬](guides/sorting.md)</li> <li>[작업 그룹화](guides/grouping.md)</li> <li>[작업 필터링](guides/filtering.md)</li> <li>[그리드에서 인라인 편집](guides/inline-editing.md)</li> </ul></td>
  <td class='topic_description'>聚焦于网格的操作:指定和配置列，自定义树形列，启用选择功能等。</td>
  </tr>
  <tr>
  <td id="lightbox" class='topics'><h4> 配置时间刻度 </h4> <ul id="lightbox_sublist"> <li>[스케일 설정하기](guides/configuring-time-scale.md) </li> <li>[줌(Zooming)](guides/zooming.md)</li> <li>[타임 슬롯 하이라이트하기](guides/highlighting-time-slots.md)</li> <li>[스케일 설정의 동적 변경](guides/dynamic-scale.md)</li> <li>[스케일에서 시간 단위 숨기기](guides/custom-scale.md)</li> <li>[수직 마커 추가하기](guides/markers.md)</li> <li>[RTL (오른쪽-왼쪽) 모드](guides/rtl-mode.md)</li> </ul></td>
  <td class='topic_description'>涵盖时间线设置:调整主刻度的格式、单位和步长，添加和配置次级刻度，突出显示特定日期等。</td>
  </tr>
  <tr>
  <td id="styling" class='topics'><h4> 配置 Lightbox（编辑表单） </h4> <ul id="styling_sublist"> <li>[Lightbox 요소 구성하기](guides/default-edit-form.md)</li> <li>[Lightbox 요소 작업하기](guides/lightbox-manipulations.md)</li> <li>[Custom Lightbox](guides/custom-edit-form.md)</li> <li>[커스텀 엘리먼트 생성하기](guides/custom-editor.md)</li> <li>[라이트박스의 버튼 변경하기](guides/custom-button.md)</li> </ul></td>
  <td class='topic_description'>讲解如何操作 Lightbox:添加或移除控件，获取和设置控件值，自定义 Lightbox 外观等。</td>
  </tr>
  <tr>
  <td id="customevent" class='topics'><h4> 配置任务 </h4> <ul id="customevent_sublist"> <li>[작업 유형](guides/task-types.md)</li> <li>[Task Object/Id](guides/task-object-operations.md)</li> <li>[Task Parent/Child](guides/task-tree-operations.md)</li> <li>[작업의 기본 작업](guides/crud-task.md)</li> <li>[예정되지 않은 작업](guides/unscheduled-tasks.md)</li> <li>[작업 분할](guides/split-tasks.md)</li> <li>[멀티 태스크 선택](guides/multiselection.md)</li> <li>[작업 시간 계산](guides/working-time.md)</li> <li>[Critical Path](guides/critical-path.md)</li> <li>[타임라인의 추가 요소](guides/inbuilt-baselines.md)</li> <li>[타임라인 영역의 커스텀 요소](guides/baselines.md)</li> <li>[Milestones](guides/milestones.md)</li> <li>[Gantt 요소의 툴팁](guides/tooltips.md)</li> <li>[작업 내용 표시](guides/text-block-for-task.md)</li> <li>[읽기 전용 모드](guides/readonly-mode.md)</li> <li>[Validation](guides/validation.md)</li> <li>[타임라인 내에서 작업 드래그하기](guides/dnd.md)</li> <li>[DnD로 작업 생성/선택하기](guides/advanced-dnd.md)</li> <li>[수동으로 예약된 요약 작업](guides/custom-projects-dates.md)</li> </ul></td>
  <td class='topic_description'>涵盖对任务对象的基本操作，如添加、删除、设置日期格式、过滤等。</td>
  </tr>
  <tr>
  <td id="internet" class='topics'><h4> 配置依赖关系 </h4> <ul id="internet_sublist"> <li>[링크 객체/ID 가져오기](guides/link-object-operations.md)</li> <li>[링크 추가/수정/삭제](guides/crud-dependency.md)</li> <li>[자동 스케줄링](guides/auto-scheduling.md)</li> </ul></td>
  <td class='topic_description'>聚焦于依赖对象的基本操作，包括添加、删除和获取依赖关系。</td>
  </tr>
  <tr>
  <td id="manipulations" class='topics'><h4> 数据导出与导入 </h4> <ul id="manipulations_sublist"> <li>[Export Service - 독립형 설치를 위한 시스템 요구 사항](guides/export-requirements.md)</li> <li>[Export to PDF and PNG](guides/export.md)</li> <li>[Export/Import for Excel, Export to iCal](guides/excel.md)</li> <li>[MS Project로부터의 내보내기 및 가져오기](guides/export-msproject.md)</li> <li>[Export and Import from Primavera P6](guides/export-primavera.md)</li> <li>[데이터를 XML 및 JSON으로 직렬화하기](guides/serialization.md)</li> <li>[Node.js에서 데이터 내보내기 및 가져오기](guides/export-nodejs.md)</li> </ul></td>
  <td class='topic_description'>探讨将甘特图数据以多种格式导出和导入的方法，以及如何将数据序列化为 XML 和 JSON。</td>
  </tr> 
  <tr>
  <td id="import" class='topics'><h4> 样式设置 </h4> <ul id="import_sublist"> <li>[CSS 문서](guides/css-overview.md)</li> <li>[스킨(Skins)](guides/skins.md)</li> <li>[간트 차트의 템플릿](guides/templates.md)</li> <li>[Tasks Coloring](guides/colouring-tasks.md)</li> <li>[링크 색상 및 스타일링](guides/colouring-lines.md)</li> <li>[Gantt 스타일 작업하기](guides/styling-guide.md)</li> </ul></td>
  <td class='topic_description'>介绍用于设置甘特图样式的格式和技术。</td>
  </tr>
  <tr>
  <td id="internet" class='topics'><h4> 日期处理 </h4> <ul id="internet_sublist"> <li>[날짜 형식 지정](guides/date-format.md)</li> <li>[날짜 작업](guides/date-operations.md)</li> </ul></td>
  <td class='topic_description'>讲解与甘特图中日期处理相关的重要主题，如日期与字符串的转换、日期格式中允许的字符等。</td>
  </tr>
  <tr>
  <td id="internet" class='topics'><h4> 通用功能 </h4> <ul id="internet_sublist"> <li>[로컬라이제이션](guides/localization.md)</li> <li>[전체 화면 모드](guides/fullscreen-mode.md)</li> <li>[Undo/Redo 기능](guides/undo-redo.md)</li> <li>[팝업 메시지 및 모달 박스](guides/message-boxes.md)</li> <li>[접근성](guides/accessibility.md)</li> <li>[키보드 내비게이션](guides/keyboard-navigation.md)</li> <li>[Content Security Policy 준수](guides/content-security-policy.md)</li> <li>[JQuery와의 통합](guides/jquery-integration.md)</li> </ul></td>
  <td class='topic_description'>提供在创建甘特图时可能用到的通用功能的指导。</td>
  </tr>
  <tr>
  <td id="data" class='topics'><h4> 实用技巧 </h4> <ul id="data_sublist" > <li>[How-tos](guides/how-to.md)</li> </ul></td>
  <td class='topic_description'>为配置甘特图中常见问题提供实用解决方案。</td>
  </tr>
  <tr>
  <td id="data" class='topics'><h4> 用户界面指南 </h4> <ul id="data_sublist" > <li>[](guides/overview.md)</li> </ul></td>
  <td class='topic_description'>从终端用户角度描述甘特图界面元素。</td>
  </tr>
  </tbody>
</table>
