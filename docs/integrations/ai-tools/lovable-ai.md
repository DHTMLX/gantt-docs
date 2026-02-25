---
title: "Integration with Lovable AI"
sidebar_label: "Lovable AI"
---

# Integration with Lovable AI

This guide describes how to integrate DHTMLX React Gantt into a Lovable-generated application.  
It also explains how to improve generation quality using prompt context, Knowledge Base, and MCP.

## Prerequisites

- A Lovable account
- A GitHub repository connected to Lovable
- Node.js 18+
- npm

For platform-specific details, refer to the official Lovable documentation:
https://docs.lovable.dev/

## Generate a Base App in Lovable

Start with a standard admin-style layout and routes in Lovable using prompts.

For example, a prompt may look like this:

> Create an admin application.
> Requirements:
> - Each navigation item opens a separate route
> - The Dashboard includes KPI cards and a main content block with a Sales chart.

This results in a basic dashboard layout that can be used as a starting point for further integration.

![Lovable-generated admin dashboard layout](/img/lovable_admin_dashboard_layout.png)

You can work on the project directly in Lovable or locally via the connected Git repository, with changes synchronized in both directions.

## Adding DHX React Gantt component (Trial Version)

Add a DHTMLX React Gantt component to the application using a prompt.

For example:

> Replace the Sales chart with a DHTMLX React Gantt chart using @dhtmlx/trial-react-gantt.

![DHTMLX Gantt chart in Lovable dashboard](/img/lovable_gantt_dashboard.png)

## Ensuring Reliable AI Integration

When working with AI-generated code, the result depends on how well the model understands the target library.

For common frameworks, the model usually has enough prior knowledge to produce correct results. However, for more specialized components such as DHTMLX Gantt, the model may lack sufficient context about the API and expected data structures.

To ensure a more reliable integration, it is important to provide additional context instead of relying on default assumptions.

There are several practical ways to do this:

- **Prompts**
- **Knowledge Base**
- **MCP server**  

## Improve Lovable Output with Better Context

### Prompt-only context

Prompt-only guidance works well for small, targeted adjustments.

For example, you can explicitly instruct Lovable to configure the Gantt appearance through its config object:

> Update the DHTMLX React Gantt configuration:
> - Set row height to `40px` using `config.row_height`
> - Pass the config object into the ReactGantt component
>
> Example:
> ```jsx
> const config = {
>   row_height: 40
> };
>
> <ReactGantt config={config} />
> ```

However, it is difficult to determine which configuration details are required for correct behavior, and missing small but important parts of the API can lead to incomplete or inconsistent results.

### Knowledge Base context

Knowledge Base allows you to define reusable rules instead of repeating API details in every prompt.

For example, you can define Gantt configuration:

> Theme:
> - Gantt supports theming via the "theme" prop.
> - Allowed values: `"terrace"` (light) and `"dark"` (dark).
> - When the app has a global theme, map:
>   - light -> `"terrace"`
>   - dark  -> `"dark"`
> - Pass the mapped value to the Gantt as `theme={ganttTheme}`.
>
> Grid row height:
> - Set row height via the Gantt config object.
> - Use `config.row_height` (number, in pixels).
> - Pass the config into the ReactGantt component:
>
>   ```jsx
>   const config = { row_height: 40 };
>
>   <ReactGantt config={config} />
>   ```

![Lovable Knowledge Base with Gantt configuration rules](/img/lovable_knowledge_base_gantt_rules.png)

After adding this to the project Knowledge Base, Lovable can rely on it in future requests.

A prompt can then be much shorter and reference this shared context:

> Use the project Knowledge Base. Set the Gantt grid row height to 60.

![Gantt after applying Knowledge Base configuration in Lovable](/img/lovable_gantt_after_kb_update.png)

At the same time, the Knowledge Base has practical limits. Its total size is capped (around 100k characters), which makes it impossible to add full documentation for a large library like DHTMLX Gantt https://github.com/DHTMLX/gantt-docs

### MCP context

MCP is the most scalable option for larger integrations.

Instead of maintaining prompts or a limited Knowledge Base, Lovable can query an external documentation source and use it as the source of truth during code generation.

The most direct approach is to connect the official DHTMLX MCP server, which exposes the full and up-to-date Gantt API:
https://docs.dhtmlx.com/suite/guides/ai/

After connecting MCP in the project settings, Lovable can request documentation on demand when processing prompts.

![Adding DHTMLX MCP server in Lovable](/img/lovable_mcp_server_setup.png)

When a prompt explicitly references MCP, Lovable uses it to resolve configuration details more accurately. For example:

> Use the DHTMLX MCP server as the source of truth. Set the Gantt grid row height to 60 pixels.

With MCP-backed context, Lovable applies API-driven configuration instead of relying on assumptions or partial patterns.

This approach is especially useful for complex or evolving setups, where prompt-only instructions or a small Knowledge Base are not sufficient.

## Practical Usage

When working with Lovable, focus on small, targeted changes and validate results incrementally.

If the generated output is incomplete or inconsistent, provide additional context using Knowledge Base or MCP to guide the model toward correct API usage.
