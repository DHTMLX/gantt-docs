--- 
sidebar_label: DHTMLX MCP Server
title: DHTMLX MCP Server
description: "MCP 서버를 사용하여 DHTMLX 문서에 AI 코딩 어시스턴트를 연결"
---

# DHTMLX MCP 서버

Claude, Cursor, ChatGPT 등과 같은 AI 코딩 도우미는 라이브러리 특정 API를 다룰 때 구식이거나 부정확한 코드를 생성할 수 있습니다. DHTMLX MCP 서버는 최신 문서와 API 참조에 직접 접근할 수 있게 하여 이 문제를 해결합니다.

## MCP란

Model Context Protocol (MCP)은 AI 어시스턴트에게 특정 도구와 라이브러리에 대한 외부 컨텍스트를 제공하기 위한 표준입니다.

대형 언어 모델은 특정 날짜까지의 데이터로 학습되며 최근 API 변경 사항이나 신규 기능을 자동으로 반영하지 않습니다. DHTMLX MCP 서버는 RAG(Retrieval-Augmented Generation) 시스템을 통해 전체적이고 최신의 문서를 노출함으로써 이 격차를 연결합니다.

**Server URL:** `https://docs.dhtmlx.com/mcp`

:::note
DHTMLX MCP 서버는 Gantt뿐 아니라 모든 주요 DHTMLX 제품을 포괄하는 공유 서비스입니다. 이 섹션의 구성 지침은 사용 중인 DHTMLX 구성 요소에 관계없이 적용됩니다.
:::

MCP를 해당 에이전트 스킬과 페어링하세요: 순수 JavaScript 또는 TypeScript 프로젝트용 [JS Gantt 스킬](integrations/ai-tools/agent-skills.md#available-skills), [React Gantt 스킬](integrations/ai-tools/agent-skills.md#available-skills) (React Gantt 프로젝트용).

실제 MCP + Lovable의 사용 예를 보려면 [React Gantt Lovable Starter](https://github.com/DHTMLX/react-gantt-lovable-starter)와 그 [워크스루](integrations/ai-tools/lovable-starter-walkthrough.md)를 참조하세요.

## 지원되는 제품

연결되면 AI 도구가 문서를 검색하고, 현재 API를 기반으로 코드 스니펫을 생성하며, 다음 제품에 대한 구성 질문에 답할 수 있습니다:

- Gantt
- Scheduler
- Suite (그리드, 양식, TreeGrid 등)
- Kanban
- Pivot
- Spreadsheet
- Diagram
- RichText

## 개인정보 보호

MCP 서버는 호스팅 서비스입니다. 로컬에서 실행되지 않으며 사용자의 파일에 접근하지 않습니다. 사용자에 대한 개인 정보는 저장되지 않습니다. 쿼리는 디버깅 및 서비스 개선을 위해 로그될 수 있습니다. 엄격한 로그 비허용 정책으로 상용 옵션을 원하시면 `info@dhtmlx.com`으로 문의해 주세요.

## 설정

아래에서 AI 도구를 선택하고 해당 지침을 따르세요.

### Claude Code

권장 방법은 CLI를 사용하는 것입니다:

```bash
claude mcp add --transport http dhtmlx-mcp https://docs.dhtmlx.com/mcp
```

또는 수동으로 `mcp.json`에 다음 내용을 추가하세요:

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

1. 설정 열기(Cmd+Shift+J Mac, Ctrl+Shift+J Windows/Linux)
2. **Tools & MCP**로 이동
3. **Add Custom MCP**를 클릭
4. 아래 구성을 붙여넣기:

```json
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
```

연결 후 대화에서 "DHTMLX 문서를 확인하여 Gantt에 사용자 정의 열 추가 방법"과 같은 프롬프트를 직접 사용할 수 있습니다.

### Gemini CLI

구성 파일을 `~/.gemini/settings.json`에서 열고 추가하세요:

```json
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
```

변경 사항을 적용하려면 Gemini CLI를 재시작하세요.

### Antigravity (Google)

1. 명령 팔레트 열기
2. "mcp add" 입력
3. "HTTP" 선택
4. URL 입력: `https://docs.dhtmlx.com/mcp`
5. 이름 입력: `dhtmlx-mcp`

### 기타 도구

대부분의 최신 AI 코딩 도구는 설정을 통해 MCP를 지원합니다. "Model Context Protocol", "Context Sources" 또는 유사한 옵션을 찾아 `https://docs.dhtmlx.com/mcp`를 커스텀 소스로 추가하세요.

### ChatGPT

ChatGPT와의 MCP 통합은 응답 시간이 느려질 수 있습니다(쿼리당 약 20초). 더 빠른 사용 환경을 원하신다면 위에 나열된 도구 중 하나를 사용해 보십시오.

ChatGPT를 구성하려면:

1. **Settings** → **Apps & Connectors**로 이동
2. **Advanced settings** 클릭
3. **Developer mode** 활성화
4. 연결기 화면으로 돌아가 **Create** 버튼 클릭
5. 아래를 입력:
   - 이름: `dhtmlx-mcp`
   - URL: `https://docs.dhtmlx.com/mcp`
   - Authentication: `No authentication`
6. **Create** 클릭

설정 후 DHTMLX 구성 요소를 다룰 때 DHTMLX MCP 서버를 참조하도록 ChatGPT에 요청할 수 있습니다.

## 최적의 결과를 위한 팁

프롬프트를 작성할 때 더 정확한 결과를 얻기 위해 DHTMLX 문서를 명시적으로 참조하세요. 예를 들면:

- "DHTMLX 문서를 사용하여 Gantt의 행 높이를 어떻게 변경합니까?"
- "Gantt 작업 편집 구성은 DHTMLX MCP를 확인하십시오"

프롬프트가 더 구체적일수록 출력이 더 정확해집니다.