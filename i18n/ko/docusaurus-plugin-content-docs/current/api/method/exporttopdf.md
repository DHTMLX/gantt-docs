---
sidebar_label: exportToPDF
title: exportToPDF method
description: "Gantt 차트를 PDF 파일로 내보냅니다."
---

# exportToPDF

### Description

@short: Gantt 차트를 PDF 파일로 내보냅니다.

@signature: exportToPDF: (_export_?: any) =\> void

### Parameters

- `export` - (optional) *object* - 선택 사항, 내보내기 설정을 포함합니다 (아래 세부 사항 참조)

### Example

~~~jsx
gantt.exportToPDF();
 
//또는
gantt.exportToPDF({
  name: "mygantt.pdf"
});

gantt.exportToPDF({
    name:"mygantt.pdf",
    header:"<h1>My company</h1>",
    footer:"<h4>Bottom line</h4>",
    locale:"en",
    start:"01-04-2013",
    end:"11-04-2013",
    skin:'terrace',
    data:{ },
    server:"https://myapp.com/myexport/gantt",
    raw:true,
    callback: function(res){
        alert(res.url);
    }
});
~~~

### Details

:::note
note 이 메서드는 **export** 확장의 일부이므로, 반드시 [export_api](guides/extensions-list.md#exportservice) 플러그인을 활성화해야 합니다. 자세한 내용은 [Export to PDF and PNG](guides/export.md) 문서를 참고하세요. 
:::

:::note
note Gantt 버전 8.0 이전에서는 온라인 내보내기 서비스를 사용하기 위해 페이지에 **https://export.dhtmlx.com/gantt/api.js**를 포함해야 합니다. 예를 들어:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

[exportToPDF](api/method/exporttopdf.md) 메서드는 다양한 선택적 속성을 가진 객체 파라미터를 받습니다:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 내보낼 PDF 파일 이름</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>skin</b></td>
  <td>(<i>'terrace', 'skyblue', 'meadow', 'broadway'</i>) 내보내는 Gantt 차트에 적용할 테마</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>locale</b></td>
  <td>(<i>string</i>) 내보내는 Gantt 차트에 사용할 언어 설정</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>start</b></td>
  <td>(<i>string</i>) 내보내는 차트에 표시할 데이터 범위의 시작 날짜. 날짜 형식은 [date_format](api/config/date_format.md) 설정을 따릅니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>end</b></td>
  <td>(<i>string</i>) 내보내는 차트에 표시할 데이터 범위의 종료 날짜. 날짜 형식은 [date_format](api/config/date_format.md) 설정을 따릅니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>data</b></td>
  <td>(<i>object</i>) 내보내기에 사용할 커스텀 데이터 소스를 지정할 수 있습니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) 내보내는 PDF의 헤더에 포함할 HTML 콘텐츠</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) 내보내는 PDF의 푸터에 포함할 HTML 콘텐츠</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) 내보내기 요청을 처리하는 API 엔드포인트 URL. 로컬 내보내기 서비스에 사용할 수 있으며 기본값은 <strong>https://export.dhtmlx.com/gantt</strong>입니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>raw</b></td>
  <td>(<i>boolean</i>) true일 경우, 커스텀 요소를 포함하여 Gantt 마크업을 그대로 내보냅니다. 기본값은 <em>false</em>입니다. [자세한 내용](guides/export.md#exportingcustommarkupandstyles)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>callback</b></td>
  <td>(<i>function</i>) 생성된 PDF 파일 다운로드용 url 속성을 가진 JSON 객체를 받는 콜백 함수</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) 추가 설정으로 다음을 포함할 수 있습니다:
  <ul><li><b>format</b> - (<i>string</i>) 출력 파일 형식: <i>'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'</i></li><li><b>landscape</b> - (<i>boolean</i>) 세로 또는 가로 방향 설정; "format"이 지정된 경우에만 작동</li><li><b>width</b> - (<i>string|number|"content"</i>) 여러 페이지 내보내기 시 페이지 너비</li><li><b>height</b> - (<i>string|number|"content"</i>) 여러 페이지 내보내기 시 페이지 높이</li><li><b>merge_pages</b> - (<i>boolean</i>) 여러 페이지를 하나의 파일로 내보내기 활성화; false일 경우 모든 데이터를 커버하려면 여러 번 내보내기 필요</li><li><b>fixed_headers</b> - (<i>boolean</i>) 모든 페이지에 grid 및 timeline 헤더 표시; 기본값은 false이며 <b>merge_pages</b> 활성화 시에만 작동</li></ul></td>
  </tr>
  </tbody>
</table>

## 시간 제한


:::note
note 내보내기 서비스는 시간 제한을 적용합니다. 
:::

내보내기가 20초를 초과하면 프로세스가 취소되며 다음 오류가 표시됩니다:

~~~html
Error: Timeout trigger 20 seconds
~~~

많은 사용자가 동시에 Gantt 차트를 내보내면 처리 시간이 평소보다 길어질 수 있습니다. 하지만 각 사용자의 내보내기 시간은 별도로 추적됩니다.

:::note
note 대형 차트 내보내기에는 [standalone export module](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) 사용을 고려하세요. 이 모듈은 [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), 또는 [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 라이선스에 무료 포함되어 있거나, 별도로 [구매](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210)할 수 있습니다. 
:::


## 다중 페이지 내보내기


내보내기 모듈은 다음을 제어할 수 없음을 유념하세요:

- 페이지 분할 위치 제어 불가, 작업이 페이지를 나눠서 표시될 수 있음
- 모든 페이지에 스케일 표시 시 작업과 겹칠 수 있음
- 모든 페이지에 헤더와 푸터 표시 시 작업 행과 겹칠 수 있음

이러한 문제는 커스텀 솔루션이 필요합니다. 아래에 몇 가지 예시가 제공됩니다.

## 한 파일로 자동 다중 페이지 내보내기

여러 페이지를 하나의 파일로 내보내려면 온라인 내보내기 서비스([시간 제한](#timerestrictions) 적용) 또는 제한 없는 standalone [export module](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)을 사용할 수 있습니다.
**additional_settings** 내에 **merge_pages** 옵션을 설정하세요:

~~~js
gantt.exportToPDF({
    additional_settings: {
        merge_pages: true, /*!*/
        format: "A4"
    }
});
~~~

온라인 내보내기 서비스는 작은 차트에 적합합니다. 대형 차트는 부분적으로 내보내질 수 있으며, 이 경우 [수동으로 여러 번 내보내기](#manual_export)하거나 모든 데이터를 처리하여 모든 페이지를 포함하는 단일 파일을 생성하는 export 모듈을 사용할 수 있습니다.

:::note

**Related example:** [한 파일로 다중 페이지 내보내기](https://snippet.dhtmlx.com/2qzecnke)

:::

다중 페이지 내보내기는 한 페이지에 모든 데이터를 내보내는 것보다 시간이 더 걸립니다. 속도를 높이려면 줌 레벨을 주, 월, 년 단위로 조정하여 Gantt의 너비와 내보내기 시간을 줄이세요.

자세한 내용은 [관련 블로그 글](https://dhtmlx.com/blog/maintenance-release-pdf-export-module-gantt-0-6-4-scheduler-0-6-5-suite-8-3-10-kanban-1-5-12/#:~:text=Multipage%20Export%20in%20One%20PDF%20File)을 참조하세요.

### 수동으로 여러 번 내보내기 {#manual_export}

Gantt 차트는 일반적으로 표준 페이지 크기를 초과하므로 내보내기는 매번 가장 왼쪽 부분만 캡처합니다.
모든 데이터를 내보내려면 매번 차트를 왼쪽으로 이동시키며 여러 번 내보내야 합니다.

내보내는 파일에서 Gantt 차트를 이동시키려면 **header** 파라미터를 통해 **#gantt_here**에 다음 스타일 규칙을 추가하세요:

~~~js
const width = 1000;
const height = 1000;
const total_width = gantt.$task_bg.scrollWidth + gantt.$grid.scrollWidth;

for (let i = 0; i < total_width; i += width) {
  gantt.exportToPDF({
    header:`<style>#gantt_here{left:-${i}px;position: absolute;}</style>`,
    //raw: true,
    additional_settings:{
      width: width,
      height: height,
    }
  });
}
~~~

:::note

**Related example:** [지정 크기로 내보내기](https://snippet.dhtmlx.com/zbhc506m)

:::

특정 형식(예: 'A3')으로 내보낼 경우, 파일 형식은 밀리미터 단위이고 HTML 크기는 픽셀 단위입니다.
이동 값 계산을 위해 밀리미터를 픽셀로 변환해야 합니다:

~~~js
const widthMM = 297;
const width = widthMM / (25.4 inch / 96 PDF PPI);
~~~

:::note

**Related example:** [지정 형식으로 내보내기](https://snippet.dhtmlx.com/qt54zfuw)

:::

<br>
**참고:** 다중 페이지 Gantt를 내보낼 때 PDF 파일이 하나만 생성된다면, 브라우저가 팝업을 차단했을 가능성이 있습니다. 여러 내보내기가 동시에 팝업을 열기 때문입니다.
팝업 차단을 해제하고 다시 시도하세요.

![blocked_popup](/img/popup_blocked.png)


## 모든 페이지에 timeline 및 grid 헤더 표시하기

내보내는 파일의 각 페이지에 timeline 및 grid 헤더를 표시하려면 **additional_settings** 내에 **fixed_headers** 옵션을 활성화하세요.
이 옵션은 **merge_pages**가 활성화되어야 작동합니다:

~~~js
gantt.exportToPDF({
    additional_settings: {
        merge_pages: true,  /*!*/
        fixed_headers: true,  /*!*/
        format: "A4"
    }
});
~~~

:::note

**Related example:** [각 페이지에 헤더가 있는 다중 페이지 내보내기](https://snippet.dhtmlx.com/w905ht5t)

:::

:::note

**Related example:** [리소스 패널 뷰에서 각 페이지에 헤더가 있는 다중 페이지 내보내기](https://snippet.dhtmlx.com/xkmvduu5)

:::

별도의 설정 없이, 즉 여러 파일을 내보내고 수동으로 병합할 때는 다음 CSS를 사용하세요:

~~~css
.grid_cell .gantt_grid_scale,
.timeline_cell .gantt_task_scale {
  position: fixed;
  top:0;
  z-index:99999;
}
~~~

### Related API
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- [Export to PDF and PNG](guides/export.md)
- [How-tos](guides/how-to.md#howtoaddresourcechartorcustomstylesintheexportedpdffile)

