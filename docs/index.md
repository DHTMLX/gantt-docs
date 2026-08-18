---
sidebar_label: DHTMLX Gantt overview
title: DHTMLX Gantt overview
slug: /
description: "Explore DHTMLX Gantt features, editions, installation options, framework integrations, API docs, samples, and AI tools for building project planning apps."
---

import Link from '@docusaurus/Link';
import { FrameworkIcon } from '@site/src/components/FrameworkIcon';
 
**DHTMLX Gantt** is the most configurable JavaScript Gantt chart, complete with TypeScript definitions. It is designed for building advanced planning and scheduling interfaces. It integrates with React, Angular, Vue, and other frontend frameworks. DHTMLX Gantt also supports AI-assisted development through the DHTMLX MCP Server, Agent Skills, and a structured API. 

You can use it in project management, ERP, construction, manufacturing, field service, SaaS, and other business applications that require a configurable visual timeline.

## Quick start by framework

You can use DHTMLX Gantt as a vanilla JavaScript widget or integrate it into a modern framework. Start with a step-by-step guide suitable for your preferred technology:

<div className="framework-grid">

  <a className="framework-card" href="guides/initializing-gantt-chart/">
    <FrameworkIcon name="javascript" className="framework-icon" />
    <div className="framework-title">JavaScript</div>
  </a>

  <a className="framework-card" href="integrations/react/quick-start/">
    <FrameworkIcon name="react" className="framework-icon" />
    <div className="framework-title">React</div>
  </a>

  <a className="framework-card" href="integrations/angular/quick-start/">
    <FrameworkIcon name="angular" className="framework-icon" />
    <div className="framework-title">Angular</div>
  </a>

  <a className="framework-card" href="integrations/vue/quick-start/">
    <FrameworkIcon name="vue" className="framework-icon" />
    <div className="framework-title">Vue</div>
  </a>

  <a className="framework-card" href="integrations/svelte/howtostart-svelte/">
    <FrameworkIcon name="svelte" className="framework-icon" />
    <div className="framework-title">Svelte</div>
  </a>

  <a className="framework-card" href="integrations/salesforce/howtostart-salesforce/">
    <FrameworkIcon name="salesforce" className="framework-icon" />
    <div className="framework-title">Salesforce</div>
  </a>

</div>

React, Angular and Vue support two integration approaches:

- Official [React Gantt](integrations/react/quick-start.md), [Angular Gantt](integrations/angular/quick-start.md), and [Vue Gantt](integrations/vue/quick-start.md) wrappers (recommended for PRO and evaluation projects)
- Direct integration of the core JavaScript Gantt component with [React](integrations/react/js-gantt-react.md), [Angular](integrations/angular/js-gantt-angular.md), [Vue](integrations/vue/js-gantt-vue.md) (Community edition)

## Live demos

To see DHTMLX Gantt in action, explore some of the most popular demos:

- [Basic Gantt Chart with Tasks and Links](https://docs.dhtmlx.com/gantt/samples/?sample=%2701_initialization/01_basic_init.html%27&filter=%27%27)
- [Auto Scheduling](https://docs.dhtmlx.com/gantt/samples/?sample=%2702_extensions/12_auto_scheduling.html%27&filter=%27%27) and [Critical Path](https://docs.dhtmlx.com/gantt/samples/?sample=%2702_extensions/03_critical_path.html%27&filter=%27%27) examples
- Resource management: [Diagram](https://docs.dhtmlx.com/gantt/samples/?sample=%2711_resources/04_resource_usage_diagram.html%27&filter=%27%27) and [Histogram](https://docs.dhtmlx.com/gantt/samples/?sample=%2711_resources/09_resource_histogram.html%27&filter=%27%27)

![gantt_overview](/img/gantt_sample.png)

View [All Samples](https://docs.dhtmlx.com/gantt/samples/?sample=%2701_initialization/01_basic_init.html%27&filter=%27%27) to check the full range of Gantt features. 

For framework-oriented starting points, see the example repositories for [React](https://github.com/DHTMLX/react-gantt-examples), [Angular](https://github.com/DHTMLX/angular-gantt-examples), and [Vue](https://github.com/DHTMLX/vue-gantt-examples).

:::note
Some samples demonstrate PRO functionality, so check the [Community vs PRO comparison](guides/editions-comparison.md) before reusing them in a Community edition project.
:::

## Developer resources

- [Installation guide](guides/installation.md) for Community, trial, and PRO setup flows
- [Community vs PRO comparison](guides/editions-comparison.md) for feature differences between editions
- Public [npm package](https://www.npmjs.com/package/dhtmlx-gantt) of the JavaScript Gantt under the Community edition
- [GitHub repository](https://github.com/DHTMLX/gantt) for the source code of the Community edition and issue tracking
- [API reference](api/api-overview.md) and [samples](https://docs.dhtmlx.com/gantt/samples/?sample=%2701_initialization/01_basic_init.html%27&filter=%27%27) for implementation details
- [What's New](whats-new.md) for releases and migration notes

## Gantt feature highlights

DHTMLX Gantt includes a scheduling engine, a flexible timeline, and resource tools.

### Project scheduling

At its core, the scheduling engine handles project structure and working time. It covers:

- [Task types and dependencies](guides/task-types.md).
- [Working-time configuration](guides/working-time.md) with task and project calendars, plus resource-specific calendars (PRO version).
- [Auto scheduling](guides/auto-scheduling.md) to recalculate plans (PRO version).
- [Critical path](guides/critical-path.md) to highlight the tasks that drive the project finish date (PRO version).

### Grid and timeline

The component combines a data grid on the left with a zoomable time scale on the right. Both parts are extensively configurable:

- [Flexible layout](guides/layout-config.md) with additional grids, right-side columns, and custom panels.
- [Configurable columns](guides/specifying-columns.md) with inline editing, drag-and-drop, and keyboard navigation, plus [multi-selection](guides/multiselection.md) (PRO version).
- [Customizable time scale](guides/configuring-time-scale.md) with markers and highlighted time slots.

### Advanced project controls (PRO)

For teams that need more than a simple timeline, the PRO edition of DHTMLX Gantt provides tools for detailed project tracking:

- [Baselines](guides/inbuilt-baselines.md#baselines) and [deadlines](guides/inbuilt-baselines.md#deadlines-and-constraints) to compare planned dates with current ones.
- [Unscheduled tasks](guides/unscheduled-tasks.md) and [split tasks](guides/split-tasks.md) for incomplete, interrupted, or phased work.

### Resource and workload management (PRO)

The PRO edition also adds a dedicated resource layer, turning the Gantt chart into a planning interface that covers both task scheduling and workload visibility. It includes:

- [Resource assignments](guides/resource-management.md#assigningresources) that link resources to tasks for precise scheduling.
- [Resource histograms](guides/resource-management.md#resource-histogram) and [resource load diagrams](guides/resource-management.md#resourceloaddiagram) to visualize team workload.
- [Grouping tasks by resource](guides/resource-management.md#balancingresourceload) to track workloads, spot conflicts, and balance the team.

### Export and ecosystem

Teams often need to migrate between platforms, keep local backups, or run analytics elsewhere. DHTMLX Gantt integrates with external tools and output formats by supporting:

- Export to [PDF/PNG](guides/export.md) and [Excel](guides/excel.md), including a [Node.js export module](guides/export-requirements.md).
- Export/import to [MS Project](guides/export-msproject.md) and [Primavera](guides/export-primavera.md) via the supported export service.

### Interactivity and editing

Users can edit data directly in the chart, not just view it. This is supported through:

- A configurable [lightbox editor](guides/default-edit-form.md) for viewing and editing task details, with support for custom fields and buttons.
- [Quick info](guides/quick-info.md) popups and [tooltips](guides/tooltips.md) that surface task details without opening a full form.
- [Drag-and-drop task creation and selection](guides/advanced-dnd.md), plus [mouse-drag scrolling of the timeline](api/config/drag_timeline.md).
- [Keyboard navigation](guides/keyboard-navigation.md) and [accessibility support](guides/accessibility.md).
- [Undo/redo history](guides/undo-redo.md) for safe editing.

### Customization and styling

The chart's appearance can be adjusted at every level, from a full theme to a single task bar, through:

- A set of built-in [skins](guides/skins.md) based on CSS variables, with support for [deep customization](guides/custom-skins.md) and creating new themes.
- [Templates](guides/common-configuration.md#gantttemplatesobject) to override how tasks, links, and grid cells are rendered.
- Fine-grained [task coloring](guides/colouring-tasks.md) and [link styling](guides/colouring-lines.md) to visually highlight specific items.
- [Localization](guides/localization.md) support for interface language and date/time formats.

## Editions and licensing 

DHTMLX Gantt is available in two editions: **Community** and **PRO**. You can start with the free Community edition and upgrade to the PRO edition later if you need more features, official support, and a fully maintained Gantt foundation. You may also start directly with the PRO edition either through an **official trial** or with a paid license. Choose one of the following options to get started with DHTMLX Gantt:

- **[Community edition](https://dhtmlx.com/docs/products/dhtmlxGantt/open-source/).** Free and MIT-licensed, it covers the core interactive Gantt features for DHTMLX Gantt v10+.
- **[Official trial](https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml).** It lets you evaluate the full PRO feature set and receive technical support during the trial period.
- **[PRO edition](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing).** Built for production environments, it includes advanced planning features, official support and commercial licensing.

To see the exact feature differences between editions, check the [Community vs PRO comparison](guides/editions-comparison.md). For the setup flow of each option, see the [installation guide](guides/installation.md). 

:::note
If you are migrating from an earlier GPL version, use the [migration guide](migration.md). DHTMLX Gantt v10 and later are no longer released under GPL; GPL v2 applies only to earlier versions.
:::

## AI coding tools

For AI-assisted development, start with the DHTMLX Gantt guides created specifically for coding assistants:

- [AI Tools guide](integrations/ai-tools.md)
- [DHTMLX MCP Server guide](integrations/ai-tools/mcp-server.md)
- [Agent Skills guide](integrations/ai-tools/agent-skills.md)
- [Lovable AI integration guide](integrations/ai-tools/lovable-ai.md)

## Backend integration

DHTMLX Gantt lets you connect to any backend by implementing a RESTful API on the server:

- Data is typically loaded and saved as JSON for [tasks](guides/loading.md), [links](guides/loading.md), [resources](guides/resource-management.md), and [assignments](guides/resource-management.md#connecting-resources-to-tasks).
- The built-in [DataProcessor](guides/server-side.md) helps route create, update, and delete operations to your server.
- There are tutorials for popular backend platforms and frameworks ([Node.js](integrations/node/howtostart-nodejs.md), [.NET Core](integrations/dotnet/howtostart-dotnet-core.md), [Laravel](integrations/php/howtostart-php-laravel.md), etc.) that cover CRUD operations and best practices for syncing Gantt with your database.

## What's next

If you are just getting started, proceed as follows:

1. Refer to the [How to start guide](integrations/howtostart-guides.md) for your preferred front-end framework or plain JavaScript.
2. Configure [grid columns](guides/specifying-columns.md), [working time calendars](guides/working-time.md), [scales](guides/configuring-time-scale.md), and [editing behavior](guides/default-edit-form.md).
3. Connect to your backend, set up the [DataProcessor](guides/server-side.md) and application endpoints for tasks, links, and resources.
4. Explore [Guides](guides.md) and [API reference](api/api-overview.md) for deeper customization such as templates, events, and extensions.

If you are already using DHTMLX Gantt and upgrading from an earlier version, check [What's New](whats-new.md) for the release notes and a summary of the latest features and migration guides.

