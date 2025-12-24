---
title: "Соответствие политике Content Security Policy (CSP)"
sidebar_label: "Соответствие политике Content Security Policy (CSP)"
---

# Соответствие политике Content Security Policy (CSP)


Content Security Policy (CSP) - это веб-стандарт, предназначенный для предотвращения несанкционированного выполнения JavaScript и повышения [безопасности создаваемых приложений](guides/app-security.md).

**Начиная с версии 7.0, поддержка CSP встроена в пакет Gantt**. Библиотека предлагает [специальную конфигурацию](api/config/csp.md), которая помогает адаптировать ваше приложение на dhtmlxGantt для соответствия требованиям CSP (Content Security Policy).

~~~js
// значение по умолчанию - "auto"
gantt.config.csp = true;
...
gantt.init("gantt_here");
~~~

Функция CSP работает поверх основного ядра Gantt и обновляет любой небезопасный код (в основном форматтеры и парсеры дат). Однако inline-стили должны быть разрешены, так как они широко используются внутри компонента.

**До версии 7.0** расширение CSP (*ext/dhtmlxgantt_csp.js*) необходимо было подключать отдельно, чтобы dhtmlxGantt работал корректно при активной политике Content Security Policy (CSP) в приложении.

~~~html
<!-- подключайте *dhtmlxgantt_csp.js* после *dhtmlxgantt.js* -->
<script src="../codebase/ext/dhtmlxgantt_csp.js"></script>
~~~

