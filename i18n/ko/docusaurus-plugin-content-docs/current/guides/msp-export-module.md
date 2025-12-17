---
title: "MS Project용 내보내기 모듈"
sidebar_label: "MS Project용 내보내기 모듈"
---

MS Project용 내보내기 모듈
=================================

이 내보내기 모듈은 MS Project 및 Primavera 파일의 가져오기와 내보내기를 처리합니다. 이 모듈은 .NET Core 애플리케이션으로, dotnet 환경 또는 도커 이미지 내에서 실행할 수 있습니다.

PDF, PNG, Excel 또는 iCal 파일의 가져오기/내보내기는 지원하지 않습니다. 해당 형식이 필요하다면 [해당 내보내기 모듈](guides/pdf-export-module.md)이나 온라인 서버를 사용하시기 바랍니다.

## 설치 안내

애플리케이션을 실행하기 전에 [.NET Core 7 환경](https://learn.microsoft.com/en-us/dotnet/core/install/)이 설치되어 있는지 확인하세요. 설치가 완료되면, 클라이언트 영역의 Downloads 탭에서 MSP 내보내기 모듈을 다운로드할 수 있습니다. 참고용 스크린샷은 아래와 같습니다:

![MS export module download](/img/msp_export_module_download.png)

소스 코드를 실행하는 방법은 두 가지가 있습니다:

1. Visual Studio에서 실행 (Windows 전용)

이 방법은 Visual Studio 2022가 필요합니다. 이전 버전은 .NET Core 7을 지원하지 않습니다. 애플리케이션을 연 후, 오른쪽 패널에서 솔루션을 우클릭하고 Restore NuGet packages를 선택하세요. 이후 `http` 또는 `https` 버전 중 원하는 것을 실행할 수 있습니다.

2. 명령줄에서 실행

이 방법은 Windows와 Linux 모두에서 사용할 수 있습니다. 애플리케이션의 루트 폴더로 이동하여 다음 명령어로 패키지를 설치하세요:

~~~
dotnet restore
~~~

다음으로 "GanttToMSProject" 폴더로 이동하여 아래 명령어로 애플리케이션을 시작하세요:

~~~
dotnet run
~~~

애플리케이션을 배포하려면 다음 명령어를 사용하세요:

~~~
dotnet publish -c Release -o published
~~~

## 내보내기 모듈 테스트

내보내기 모듈을 테스트하는 방법은 두 가지가 있습니다:

1. 테스트 페이지 사용:

- [https://export.dhtmlx.com/test](https://export.dhtmlx.com/test) 페이지를 엽니다.
- 명령줄 출력에서 내보내기 모듈의 URL을 확인합니다. 예시:

~~~
Now listening on: http://localhost:5128
~~~

- 첫 번째 드롭다운에서 URL을 선택하고 **custom**을 선택합니다.
- 내보내기 모듈의 URL을 붙여넣습니다.

이제 버튼을 사용해 데이터를 내보낼 수 있습니다.

2. 스니펫 사용:

- [https://snippet.dhtmlx.com/kf16k0if](https://snippet.dhtmlx.com/kf16k0if) 페이지를 엽니다.

- 명령줄 출력에서 내보내기 모듈의 URL을 찾습니다. 예시:

~~~
Now listening on: http://localhost:5128
~~~

- 이 URL을 내보내기 함수의 server 파라미터에 추가합니다. 예:

~~~
gantt.exportToMSProject({
    server: "http://localhost:5128",
});
~~~

이제 버튼을 통해 데이터 내보내기가 정상적으로 동작합니다.

## 문제 해결

### PDF/PNG/Excel 내보내기가 동작하지 않음

MSP 내보내기 모듈은 `gantt.exportToMSProject` 및 `exportToPrimaveraP6` 메서드만 지원합니다. 아래와 같은 호출에는 동작하지 않습니다:

~~~
gantt.exportToPDF({server:"gantt-to-msproject-url"});
~~~

또한, `gantt.exportToMSProject()`를 파라미터 없이 호출하면 기본적으로 온라인 서비스 `export.dhtmlx.com`을 사용합니다.

### MPP 파일 내보내기

MSP 내보내기 모듈과 서버는 MSP 및 Primavera 파일의 가져오기와 내보내기를 위해 MPXJ 라이브러리에 의존합니다. 현재 MPP 파일 내보내기는 지원하지 않지만, XML 및 MPP 파일의 가져오기는 가능합니다. 자세한 내용은 [여기](https://www.mpxj.org/faq/)에서 확인할 수 있습니다.

### 대용량 파일 가져오기

대용량 파일을 가져오기 위해서는 요청 크기 제한을 해제해야 합니다. `GanttToMSProject/Controllers/MspConversionController.cs` 파일을 열고 `DisableRequestSizeLimit` 속성과 그 다음 줄의 주석을 해제하세요.

저장 후 서버를 재시작하면 대용량 파일 가져오기가 가능합니다. 테스트 결과 244Mb 파일을 가져오려면 최대 4Gb의 RAM이 필요할 수 있습니다.

### 도커 이미지 사용

도커 이미지를 빌드하려면 다음 명령어를 실행하세요:

~~~
docker build -t msp_export_module 
~~~

테스트를 위해 도커 이미지를 실행하려면 다음 명령어를 사용하세요:

~~~
docker run -p 65163:80 msp_export_module 
~~~

`Ctrl+C`로 컨테이너를 중지할 수 있습니다.

도커 이미지를 백그라운드에서 실행하려면 다음 명령어를 사용하세요:

~~~
docker run -p 65163:80 msp_export_module 
~~~
