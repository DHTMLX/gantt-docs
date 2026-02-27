---
sidebar_label: DHTMLX MCP Server
title: DHTMLX MCP Server
description: "Connect AI coding assistants to DHTMLX documentation using the MCP server"
---

# DHTMLX MCP Server

AI coding assistants such as Claude, Cursor, or ChatGPT may produce outdated or inaccurate code when working with library-specific APIs. The DHTMLX MCP server addresses this by providing direct access to the current documentation and API reference.

## What is MCP

Model Context Protocol (MCP) is a standard for providing AI assistants with external context about specific tools and libraries.

Large language models are trained on data up to a certain date and do not automatically reflect recent API changes or new features. The DHTMLX MCP server bridges this gap by exposing the full and up-to-date documentation through a RAG (Retrieval-Augmented Generation) system.

**Server URL:** `https://docs.dhtmlx.com/mcp`

:::note
The DHTMLX MCP server is a shared service that covers all major DHTMLX products, not only Gantt. Configuration instructions in this section apply regardless of which DHTMLX component you are working with.
:::

## Supported Products

When connected, the AI tool can retrieve documentation, generate code snippets based on current APIs, and answer configuration questions for the following products:

- Gantt
- Scheduler
- Suite (Grid, Form, TreeGrid, and more)
- Kanban
- Pivot
- Spreadsheet
- Diagram
- RichText

## Privacy

The MCP server is a hosted service. It does not run locally and does not access your files. No personal information about users is stored. Queries may be logged for debugging and service improvement. For commercial options with strict no-logging policies, contact `info@dhtmlx.com`.

## Setting Up

Select your AI tool below and follow the corresponding instructions.

### Claude Code

The recommended way is through the CLI:

```bash
claude mcp add --transport http dhtmlx-mcp https://docs.dhtmlx.com/mcp
```

Alternatively, add the following to your `mcp.json` manually:

```json
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "type": "http",
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
```

### Cursor

1. Open Settings (Cmd+Shift+J on Mac, Ctrl+Shift+J on Windows/Linux)
2. Go to **Tools & MCP**
3. Click **Add Custom MCP**
4. Paste the following configuration:

```json
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
```

After connecting, you can use prompts such as "Check DHTMLX docs for how to add a custom column to Gantt" directly in the chat.

### Gemini CLI

Open the configuration file at `~/.gemini/settings.json` and add:

```json
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
```

Restart Gemini CLI to apply the changes.

### Antigravity (Google)

1. Open the command palette
2. Type "mcp add"
3. Select "HTTP"
4. Enter URL: `https://docs.dhtmlx.com/mcp`
5. Enter Name: `dhtmlx-mcp`

### Other Tools

Most modern AI coding tools support MCP through their settings. Look for "Model Context Protocol", "Context Sources", or a similar option and add `https://docs.dhtmlx.com/mcp` as a custom source.

### ChatGPT

Note that MCP integration with ChatGPT may result in slower response times (around 20 seconds per query). For a faster experience, consider using one of the tools listed above.

To configure ChatGPT:

1. Go to **Settings** → **Apps & Connectors**
2. Click **Advanced settings**
3. Enable **Developer mode**
4. Return to the Connectors screen and click the **Create** button
5. Fill in the following:
   - Name: `dhtmlx-mcp`
   - URL: `https://docs.dhtmlx.com/mcp`
   - Authentication: `No authentication`
6. Click **Create**

After setup, you can ask ChatGPT to consult the DHTMLX MCP server when working with any DHTMLX component.

## Tips for Best Results

When prompting, reference the DHTMLX documentation explicitly for more accurate results. For example:

- "Using DHTMLX docs, how do I change the row height in Gantt?"
- "Check DHTMLX MCP for Gantt task editing configuration"

The more specific the prompt, the more accurate the output will be.
