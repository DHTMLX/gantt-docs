--- 
sidebar_label: DHTMLX MCP 서버
title: DHTMLX MCP 서버
description: "MCP 서버를 사용하여 AI 코딩 도우미를 DHTMLX 문서에 연결합니다"
---

# DHTMLX MCP 서버

Claude, Cursor, 또는 ChatGPT와 같은 AI 코딩 도우미는 라이브러리 특정 API를 다룰 때 구식이거나 부정확한 코드를 생성할 수 있습니다. DHTMLX MCP 서버는 최신 문서 및 API 참조에 직접 접근할 수 있게 함으로써 이 문제를 해결합니다.

## MCP이란

Model Context Protocol (MCP)은 AI 어시스턴트에 특정 도구와 라이브러리에 대한 외부 컨텍스트를 제공하기 위한 표준입니다.

대형 언어 모델은 특정 시점까지의 데이터로 학습되며 최근 API 변경이나 신규 기능을 자동으로 반영하지 않습니다. DHTMLX MCP 서버는 RAG(Retrieval-Augmented Generation) 시스템을 통해 최신의, 완전한 문서를 노출함으로써 이 격차를 해소합니다.

**Server URL:** `https://docs.dhtmlx.com/mcp`

:::note
The DHTMLX MCP server is a shared service that covers all major DHTMLX products, not only Gantt. Configuration instructions in this section apply regardless of which DHTMLX component you are working with.
:::

If you use [React Gantt](integrations/react.md), pair MCP with the [React Gantt agent skill](integrations/ai-tools/agent-skills.md#available-skills).

## 지원되는 제품

연결되면 AI 도구가 현재 API를 기반으로 문서를 검색하고, 코드 스니펫을 생성하며, 다음 제품에 대한 구성 질문에 답할 수 있습니다:

- Gantt
- Scheduler
- Suite (Grid, Form, TreeGrid, and more)
- Kanban
- Pivot
- Spreadsheet
- Diagram
- RichText

## 개인정보 보호

MCP 서버는 호스팅된 서비스입니다. 로컬에서 실행되지 않으며 사용자의 파일에 접근하지 않습니다. 사용자의 개인정보는 저장되지 않습니다. 쿼리는 디버깅 및 서비스 개선을 위해 로깅될 수 있습니다. 엄격한 로그 비저장 정책이 적용되는 상용 옵션의 경우 `info@dhtmlx.com`으로 문의하세요.

## 설정 방법

아래에서 AI 도구를 선택하고 해당 지침을 따르세요.

### Claude Code

권장 방법은 CLI를 통해서입니다:

```bash
claude mcp add --transport http dhtmlx-mcp https://docs.dhtmlx.com/mcp
```

또는 아래를 수동으로 `mcp.json`에 추가하세요:

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

1. 설정 열기 (Mac에서 Cmd+Shift+J, Windows/Linux에서 Ctrl+Shift+J)
2. **Tools & MCP**로 이동
3. **Add Custom MCP**를 클릭
4. 다음 구성을 붙여넣기:

```json
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
```

연결 후에는 채팅에서 "Check DHTMLX docs for how to add a custom column to Gantt"와 같은 프롬프트를 바로 사용할 수 있습니다.

### Gemini CLI

구성 파일 `~/.gemini/settings.json`를 열고 추가하세요:

```json
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
```

변경을 적용하려면 Gemini CLI를 재시작하세요.

### Antigravity (Google)

1. 명령 팔레트 열기
2. "mcp add" 입력
3. "HTTP" 선택
4. URL 입력: `https://docs.dhtmlx.com/mcp`
5. 이름 입력: `dhtmlx-mcp`

### 기타 도구

대다수의 최신 AI 코딩 도구는 설정을 통해 MCP를 지원합니다. "Model Context Protocol", "Context Sources" 또는 이와 유사한 옵션을 찾아 `https://docs.dhtmlx.com/mcp`를 사용자 정의 소스로 추가하세요.

### ChatGPT

MCP를 ChatGPT와 통합하면 응답 속도가 느려질 수 있습니다(쿼리당 약 20초). 더 빠른 사용 경험을 원한다면 위에 나열된 도구 중 하나를 사용하는 것을 고려하세요.

ChatGPT를 구성하려면:

1. **Settings** → **Apps & Connectors**로 이동
2. **Advanced settings**를 클릭
3. **Developer mode**를 활성화
4. 연결자 화면으로 돌아가서 **Create** 버튼 클릭
5. 아래 정보를 입력:
   - Name: `dhtmlx-mcp`
   - URL: `https://docs.dhtmlx.com/mcp`
   - Authentication: `No authentication`
6. **Create**를 클릭

설정 후, 어떤 DHTMLX 구성 요소를 다룰 때도 ChatGPT에 DHTMLX MCP 서버를 참조하도록 요청할 수 있습니다.

## 최상의 결과를 위한 팁

프롬프트를 작성할 때 더 정확한 결과를 얻기 위해 DHTMLX 문서를 명시적으로 참조하세요. 예를 들면:

- "DHTMLX 문서를 사용하여 Gantt에서 행 높이를 어떻게 변경합니까?"
- "DHTMLX MCP에서 Gantt 작업 편집 구성을 확인하세요"

프롱프트가 더 구체적일수록 출력이 더 정확해집니다.