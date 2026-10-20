---
title: "내보내기 모듈: 시스템 요구사항"
sidebar_label: "시스템 요구사항"
---

# 내보내기 모듈: 시스템 요구사항

자체 서버에 [내보내기 모듈](guides/export-modules.md)을 설치하려면 시스템이 아래 각 모듈의 요구사항을 충족하는지 확인하십시오.

## PDF/PNG/Excel 서비스 {#pdfpngexcel-service}

### 개요

PDF/PNG/Excel로의 내보내기는 자바스크립트로 구축된 크로스 플랫폼 Node.js 애플리케이션입니다. 

소스 코드 형태와 Docker 이미지 형태로 배포됩니다.

### 시스템 요구사항

<table class="dp_table">
  <tr>
  <th><b>하드웨어</b></th><th><b>운영 체제</b></th><th><b>런타임</b></th>
  </tr>
  <tr>
  <td>- 1 CPU 코어(공유 가상 코어 가능) - 최소 500MB RAM</td>
  <td>- Linux - Windows - macOS</td>
  <td>- Node.js v20 이상 또는 Docker</td>
  </tr>
</table>


## MS Project 및 Primavera P6에서의 가져오기 및 내보내기 {#import-and-export-from-ms-project-and-primavera-p6}

### 개요

MS Project로의 내보내기는 C#으로 작성된 .NET Core Framework 애플리케이션이며 Windows, macOS, Linux에서 실행됩니다.

자체 서버나 어떤 클라우드 공급자에 배포할 수 있는 소스 코드를 제공해 드릴 수 있습니다.
소스 프로젝트는 MS Visual Studio 2022+와 호환됩니다.

### 시스템 요구사항

<table class="dp_table">
  <tr>
  <th><b>하드웨어</b></th><th><b>운영 체제</b></th><th><b>런타임</b></th>
  </tr>
  <tr>
  <td>- 1 CPU 코어(공유 가상 코어도 가능) - 최소 1000MB RAM</td>
  <td>- Windows - macOS - Linux</td>
  <td>- .NET Core 7.0+</td>
  </tr>
</table>