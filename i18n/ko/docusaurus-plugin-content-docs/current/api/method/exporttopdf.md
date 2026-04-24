---
sidebar_label: exportToPDF
title: exportToPDF 메서드
description: "Gantt 차트를 PDF 형식으로 내보냅니다"
---

# exportToPDF

### Description

@short: Gantt 차트를 PDF 형식으로 내보냅니다

@signature: exportToPDF: (_export_?: any) =\> void

### Parameters

- `export`	- object - optional, 내보내기 설정이 포함된 객체(세부 내용 참조)

### Example

~~~jsx
gantt.exportToPDF();
 
//또는
gantt.exportToPDF({
  name: "mygantt.pdf"
});

gantt.exportToPDF({
    name: "mygantt.pdf",
    header: "<h1>My company</h1>",
    footer: "<h4>Bottom line</h4>",
    locale: "en",
    start: "01-04-2026",
    end: "11-04-2026",
    skin: "terrace",
    data: { },
    server: "https://myapp.com/myexport/gantt",
    raw: true,
    callback: (res) => {
        alert(res.url);
    }
});
~~~

### Details

:::note
note 이 메서드는 **export** 확장의 일부이므로, 반드시 [export_api](guides/extensions-list.md#exportservice) 플러그인을 활성화해야 합니다. 자세한 내용은 [Export to PDF and PNG](guides/export.md) 문서를 참고하세요. 
:::

:::note
참고: Gantt 버전이 8.0 미만인 경우, 온라인 내보내기 서비스를 활성화하려면 페이지에 `https://export.dhtmlx.com/gantt/api.js`를 포함해야 합니다. 예:

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
			<td>(<i>string</i>) 출력 파일의 이름</td>
	</tr>
    <tr>
			<td class="webixdoc_links0"><b>skin</b></td>
			<td>(<i>'terrace', 'skyblue', 'meadow', 'broadway'</i>) 출력 Gantt 차트의 스킨</td>
	</tr>
    <tr>
			<td class="webixdoc_links0"><b>locale</b></td>
			<td>(<i>string</i>) 출력 Gantt 차트에 사용할 언어를 설정</td>
	</tr> 
    <tr>
			<td class="webixdoc_links0"><b>start</b></td>
			<td>(<i>string</i>) 출력 Gantt 차트에 표시될 데이터 범위의 시작 날짜를 설정합니다. 날짜 형식은 구성의 date_format 설정으로 정의됩니다</td>
	</tr>
    <tr>
			<td class="webixdoc_links0"><b>end</b></td>
			<td>(<i>string</i>) 출력 Gantt 차트에 표시될 데이터 범위의 끝 날짜를 설정합니다. 날짜 형식은 구성의 date_format 설정으로 정의됩니다</td>
	</tr>
    <tr>
			<td class="webixdoc_links0"><b>data</b></td>
			<td>(<i>object</i>) 출력 Gantt 차트에 표시될 사용자 정의 데이터 소스를 설정</td>
	</tr>
    <tr>
			<td class="webixdoc_links0"><b>header</b></td>
			<td>(<i>string</i>) 출력 PDF 이미지에 추가될 헤더를 지정합니다. 여기에 HTML을 자유롭게 사용할 수 있습니다</td>
	</tr>
     <tr>
			<td class="webixdoc_links0"><b>footer</b></td>
			<td>(<i>string</i>) 출력 PDF 이미지에 추가될 바닥글을 지정합니다. 여기에 HTML을 자유롭게 사용할 수 있습니다</td>
	</tr>
    <tr>
			<td class="webixdoc_links0"><b>server</b></td>
			<td>(<i>string</i>) 요청의 API 엔드포인트를 설정합니다. 로컬에 설치된 내보내기 서비스와 함께 사용할 수 있습니다. 기본값은 <strong>https://export.dhtmlx.com/gantt</strong>입니다</td>
	</tr>
    <tr>
			<td class="webixdoc_links0"><b>raw</b></td>
			<td>(<i>boolean</i>) 모든 Gantt 마크업을 원래 상태로, 커스텟 요소를 포함하여 내보낼지 여부를 정의합니다. 기본값은 <em>false</em>입니다. 
  	[자세한 내용 읽기](guides/export.md#exportingcustommarkupandstyles)</td>
	</tr>
	<tr>
			<td class="webixdoc_links0"><b>callback</b></td>
			<td>(<i>function</i>) 생성된 PDF 파일의 다운로드 URL을 받으려면 callback 속성을 사용할 수 있습니다. url 속성을 가진 JSON 객체를 수신합니다</td>
	</tr>
	<tr>
			<td class="webixdoc_links0"><b>additional_settings</b></td>
			<td>(<i>object</i>) 추가 설정이 포함된 객체. 객체는 다음 속성을 가질 수 있습니다:<ul><li><b>format</b> - (<i>string</i>) 출력 파일 형식:<i>"A0", "A1", "A2", "A3", "A4", "A5", "A6", "Legal", "Ledger", "Letter", "Tabloid"</i></li><li><b>landscape</b> - (<i>boolean</i>) 출력 파일의 세로/가로 방향. "format" 속성이 지정될 때만 작동합니다</li><li><b>width</b> - (<i>string|number|"content"</i>) 출력 페이지의 너비. 여러 페이지만 내보낼 때 사용됩니다</li><li><b>height</b> - (<i>string|number|"content"</i>) 출력 페이지의 높이. 여러 페이지를 내보낼 때 사용됩니다</li><li><b>merge_pages</b> - (<i>boolean</i>) <a href="#multi-page-export">멀티페이지 내보내기</a>를 하나의 파일에서 활성화합니다; false로 설정하면 모든 Gantt 데이터를 얻기 위해 여러 번 내보내야 합니다</li><li><b>fixed_headers</b> - (<i>boolean</i>) 각 페이지에 그리드 및 타임라인 헤더를 표시하도록 설정합니다; 기본값은 <i>false</i>이며, 활성화된 <b>merge_pages</b> 설정에서만 동작합니다</li><li><b>margins</b> - (<i>object</i>) 출력 PDF 파일의 위/아래/왼쪽/오른쪽 여백을 포함하는 객체. [자세한 내용 읽기](guides/export.md#margins-of-the-output-pdf-file)</li><li><b>header</b> - (<i>string</i>) 출력 PDF 파일의 각 페이지에 추가될 헤더를 지정합니다. [자세한 내용 읽기](guides/export.md#headerfooter-of-the-output-file)</li><li><b>footer</b> - (<i>string</i>) 출력 PDF 파일의 각 페이지에 추가될 바닥글을 지정합니다. [자세한 내용 읽기](guides/export.md#headerfooter-of-the-output-file)</li></ul></td>
	</tr>
  </tbody>
</table>

## 시간 제한

:::note
내보내기 서비스에는 시간 제한이 있습니다. 
:::

처리 시간이 20초를 초과하면 내보내기가 취소되고 다음과 같은 오류가 발생합니다:

~~~html
Error: Timeout trigger 20 seconds
~~~

여러 사용자가 동시에 Gantt를 내보내면 평균보다 시간이 더 걸릴 수 있습니다. 그러나 특정 사용자의 내보내기 요청에 소요된 시간은 개별적으로 계산됩니다.

### Multi-page export

다음과 같은 작업은 내보내기 모듈에 기술적으로 가능하지 않으므로 주의하십시오:

- 컷오프 위치를 제어하는 것(페이지 간에 작업이 중간에 잘릴 수 있음)
- 오버레이 없이 각 페이지에 스케일을 표시하는 것
- 각 페이지에 헤더와 푸터를 표시하는 것(작업 행과 겹치지 않도록)

따라서 위의 작업을 완료하려면 커스텀 솔루션이 필요합니다. 아래에 몇 가지 예를 제공합니다.

#### 하나의 파일로 자동으로 데이터 내보내기

다중 페이지 내보내기를 하나의 파일로 하려면 온라인 내보내기 서비스([time limitations](#time-restrictions)을 사용하거나) 독립 실행 모듈을 사용할 수 있습니다(제한 없음). 필요한 것은 **additional_settings** 객체의 merge_pages 속성을 사용하는 것뿐입니다:

~~~js
gantt.exportToPDF({
    additional_settings: {
        merge_pages: true, 
        format: "A4"
    }
});
~~~

내보내기 서비스는 차트가 그리 크지 않은 경우에 잘 맞습니다. 차트가 큰 경우 데이터가 부분적으로 내보내집니다. 이 경우 [다수의 데이터 내보내기를 수동으로 수행](#making-several-data-exports-manually)하거나 내보내기 모듈을 사용할 수 있습니다. 내보내기 모듈은 자체적으로 모든 데이터를 내보내고 모든 페이지를 하나의 파일로 제공합니다.

**관련 샘플**: [Multi-page export in one file ](https://snippet.dhtmlx.com/2qzecnke)

이 방법의 단점은 한 페이지에 모든 데이터를 내보내는 것보다 데이터 내보내는 데 더 많은 시간이 필요하다는 점입니다. Gantt 데이터를 내보내는 시간을 절약하려면 확대/축소 Zoom 레벨을 조정하고 데이터를 주 단위, 달 단위 또는 연도 단위로 렌더링하면 됩니다. 그때는 더 적은 너비를 차지하게 되어 내보내기를 덜 수행하게 됩니다.

다중 페이지 내보내기를 하나의 PDF 파일로 보는 상세 개요는 [관련 블로그 글](https://dhtmlx.com/blog/maintenance-release-pdf-export-module-gantt-0-6-4-scheduler-0-6-5-suite-8-3-10-kanban-1-5-12/#:~:text=Multipage%20Export%20in%20One%20PDF%20File)에서 확인할 수 있습니다.

#### 여러 데이터 내보내기를 수동으로 만들기

Gantt 차트의 크기가 표준 문서 크기를 거의 항상 초과하므로 한 번에 한 페이지 이상에 맞추려면 차트가 왼쪽으로 이동되면서 여러 번 내보내야 합니다. 내보내기될 때마다 Gantt의 좌측 부분만 PDF 문서에 내보내집니다. 따라서 다중 페이지 내보내기를 구현하려면 Gantt를 여러 번 내보내고 매번 왼쪽으로 시프트해야 합니다.

내보낸 파일에서 Gantt를 시프트하려면 헤더 매개변수의 **#gantt_here**에 아래 스타일 규칙을 추가해야 합니다:

~~~js
const width = 1000;
const height = 1000;
const total_width = gantt.$task_bg.scrollWidth + gantt.$grid.scrollWidth;

for (let i = 0; i < total_width; i += width) {
    gantt.exportToPDF({
        header:`<style>#gantt_here{left:-${i}px;position: absolute;}</style>`,
        //raw: true,
        additional_settings: {
            width: width,
            height: height,
        }
    });
}
~~~

**관련 샘플**: [Export to the file of defined sizes ](https://snippet.dhtmlx.com/zbhc506m)

참고로 특정 형식('A3' 등)으로 Gantt를 내보내려면 파일 형식은 밀리미터 단위로 정의되고 HTML의 크기는 픽셀 단위로 정의됩니다. 따라서 밀리미터에서 픽셀로 시프트 값을 변환해야 합니다.

~~~js
const widthMM = 297;
const width = widthMM / (25.4 inch / 96 PDF PPI);
~~~

**관련 샘플**: [Export to the file of defined format ](https://snippet.dhtmlx.com/qt54zfuw )

참고로, 다중 페이지 Gantt를 내보내고도 하나의 PDF 파일만 얻는 경우가 있습니다. 이는 브라우저가 팝업을 차단하기 때문이며, 팝업을 허용하고 다시 내보내기를 시도해야 합니다.

![blocked_popup](/img/popup_blocked.png)

#### Displaying timeline and grid headers on every page in the exported file

내보낸 파일의 모든 페이지에서 타임라인 및 그리드 헤더를 표시하도록 하려면 추가 설정 객체의 **fixed_headers** 속성을 사용합니다. 이 기능은 또한 **merge_pages** 속성이 활성화된 경우에만 작동합니다:

~~~js
gantt.exportToPDF({
    additional_settings: {
        merge_pages: true, 
        fixed_headers: true,  
        format: "A4"
    }
});
~~~

**관련 샘플**: [Multi-page export with timeline and grid headers on each page](https://snippet.dhtmlx.com/w905ht5t)

**관련 샘플**: [Multi-page export with timeline and grid headers on each page for the Resource panel view](https://snippet.dhtmlx.com/xkmvduu5)

필요 시 구성을 사용하지 않고도 작동하게 하려면 예를 들어 여러 내보내기 작업을 수행하고 파일을 수동으로 병합하는 경우 아래 스타일을 사용할 수 있습니다:

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
- [How-tos: How to add resource chart or custom styles in the exported PDF file](guides/how-to.md#how-to-add-resource-chart-or-custom-styles-in-the-exported-pdf-file)