---
title: "Lizenzen von Drittanbietern"
sidebar_label: "Lizenzen von Drittanbietern"
---

# Lizenzen von Drittanbietern

Dieser Artikel enthält Hinweise zu Drittanbieter-Software und/oder zusätzliche Bedingungen und Konditionen für lizenzierte Drittanbieter-Softwarekomponenten, die in der DHTMLX Gantt-Bibliothek enthalten sind.

**Inter font** wird als primäre Schriftart in den meisten Themes verwendet. Die Schriftart wird dynamisch aus der dhtmlxgantt.css über eine CSS `@import`-Anweisung importiert. Die lokale Kopie der Inter-Schriftart, zusammen mit dem Urheberrechtshinweis und einer Kopie der Lizenz, ist in `/sources/less/fonts` der offiziellen Verteilung von DHTMLX Gantt enthalten.

**Roboto Google font**, die in unserem Material-Skin verwendet wird, ist standardmäßig nicht in der Bibliothek enthalten. Wird jedoch in der Regel manuell wie in unserer Dokumentation beschrieben hinzugefügt.

Zusätzlich verwenden wir einige Open-Source-Bibliotheken wie **Node.js Express module, body_parser und strip_tags** in unseren Beispielen (sie finden sich im Paket der Beispiele, backend/package.json). Sie gehören jedoch nicht zur Gantt-Bibliothek und dienen nur zu Demonstrationszwecken.

## Komponenten, die in der Kernbibliothek von Gantt verwendet werden

### Inter Schriftart

Copyright 2020 The Inter Project Authors ([https://github.com/rsms/inter](https://github.com/rsms/inter))

Diese Font-Software ist lizenziert unter der SIL Open Font License, Version 1.1.
Diese Lizenz ist unten aufgeführt, und ist auch mit einer FAQ unter:
[https://openfontlicense.org](https://openfontlicense.org)

#### SIL OPEN FONT LICENSE Version 1.1 - 26. Februar 2007

PREAMBLE
Die Ziele der Open Font License (OFL) sind es, weltweit die Entwicklung kollaborativer Schriftprojekte zu fördern, die Schriftgestaltung von akademischen und linguistischen Gemeinschaften zu unterstützen und einen freien und offenen Rahmen zu bieten, in dem Schriften geteilt und gemeinsam verbessert werden können.

Die OFL gestattet es, lizensierte Schriftarten zu verwenden, zu studieren, zu kopieren, zu mischen, einzubetten, zu modifizieren, weiterzugeben und modifizierte sowie unveränderte Kopien der Font Software zu verkaufen, unter den folgenden Bedingungen:

1) Weder die Font Software noch einzelne ihrer Komponenten in Original- oder Mod Versions dürfen separat verkauft werden.

2) Originale oder modifizierte Versionen der Font Software dürfen mit jeder Software gebündelt, weiterverteilt und/oder verkauft werden, vorausgesetzt, jede Kopie enthält den obigen Urheberrechtsvermerk und diese Lizenz. Diese können entweder als eigenständige Textdateien, menschenlesbare Header oder in den entsprechenden maschinenlesbaren Metadatenfeldern innerhalb von Text- oder Binärdateien enthalten sein, solange diese Felder vom Benutzer leicht eingesehen werden können.

3) Keine modifizierte Version der Font Software darf den reservierten Font Name(s) verwenden, es sei denn, der entsprechende Copyright-Inhaber hat ausdrücklich schriftliche Genehmigung erteilt. Diese Einschränkung gilt nur für den primären Schriftname, wie er dem Benutzer präsentiert wird.

4) Die Namen des Copyright-Inhabers oder des Autors der Font Software dürfen nicht verwendet werden, um eine modifizierte Version zu bewerben oder zu unterstützen, außer um den Beitrag des Copyright-Inhabers und des Autors anzuerkennen oder mit deren ausdrücklicher schriftlicher Erlaubnis.

5) Die Font Software, modifiziert oder unverändert, ganz oder teilweise, muss vollständig unter dieser Lizenz verbreitet werden und darf nicht unter einer anderen Lizenz verbreitet werden. Die Anforderung, dass Fonts unter dieser Lizenz bleiben, gilt nicht für Dokumente, die die Font Software verwenden.

TERMINATION
Diese Lizenz wird null und nichtig, wenn eine der oben genannten Bedingungen nicht erfüllt ist.

DISCLAIMER
DIE FONT SOFTWARE WIRD "WIE SIE IST" OHNE JEDWEDER GARANTIE JEGLICHER ART BEREITGESTELLT, AUSDRÜCKLICH ODER STILLSCHWEIGEND, EINSCHLIESSLICH, ABER NICHT BESCHRÄNKT AUF JEGLCHE GARANTIEN DER MARKTFÄHIGKEIT, EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND NICHTVERLETZUNG VON RECHT. IN KEINEM FALL IST DER COPYRIGHT-INHABER FÜR ANSPRÜCHE, SCHÄDEN ODER SONSTIGE VERPFLICHTUNGEN VERANTWORTLICH, OB AUS VERTRAGSRECHT, DELIKT ODER SONSTIGEM, AUS DEM VERWENDEN ODER ANDEREN VERHALTENS MIT DER FONT SOFTWARE.

### Roboto Google Font

Copyright 2020 DHTMLX

Unter der Apache License, Version 2.0 (die "Lizenz");
Sie dürfen diese Datei außer in Übereinstimmung mit der Lizenz nicht verwenden.
Sie erhalten eine Kopie der Lizenz unter

<p align="center">http://www.apache.org/licenses/LICENSE-2.0</p>

Sofern gesetzlich vorgeschrieben oder schriftlich vereinbart, wird Software, die unter der Lizenz verbreitet wird, "WIE SIE IST" bereitgestellt, OHNE JEGLICHE GARANTIE ODER BEDINGUNGEN JEGLICHER ART, einschließlich, aber nicht beschränkt auf GARANTIEN DER MARKTFÄHIGKEIT UND NICHTVERLETZUNG. IN KEINEM FALL SIND DIE AUTOREN ODER COPYRIGHT-INHABER FÜR ANSPRÜCHE, SCHÄDEN ODER SONSTIGE VERPFLICHTUNGEN VERANTWORTLICH, SEI ES AUS VERTRAGSRECHT, DELIKT ODER ANDEREN RECHTSGRÜNDEN, DIE AUS DEM VERWENDEN DER SOFTWARE ODER SONSTIGEN VERFASSUNGEN DARAUS RESULTIEREN.

## Komponenten, die in den Beispielsanwendungen verwendet werden

### body-parser

Die MIT-Lizenz

Copyright (c) 2014 Jonathan Ong &lt;me@jongleberry.com&gt;

Copyright (c) 2014-2015 Douglas Christopher Wilson &lt;doug@somethingdoug.com&gt;

Es wird hiermit kostenfrei jeder Person, die eine Kopie dieser Software und der zugehörigen Dokumentationsdateien (die "Software") erhält, die Erlaubnis erteilt, mit der Software uneingeschränkt zu handeln, einschließlich der Rechte zum Verwenden, Kopieren, Ändern, Mergen, Veröffentlichen, Verteilten, Unterlizenzieren und/oder Verkaufen von Kopien der Software, und Personen, denen die Software bereitgestellt wird, dies zu gestatten, vorbehaltlich der folgenden Bedingungen:

Der obige Urheberrechtshinweis und dieser Genehmigungsvermerk sind in alle Kopien oder wesentlichen Teile der Software aufzunehmen.

DIE SOFTWARE WIRD "WIE SIE IST" OHNE JEGLICHE GARANTIE ANGEBOTEN, EINSCHLIESSLICH JEGLICHER GARANTIEN DER MARKTFÄHIGKEIT, EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND NICHTVERLETZUNG. IN KEINEM FALL SIND DIE AUTORINNEN ODER COPYRIGHT-INHABER FÜR ANSPRÜCHE ODER SONSTIGE VERPFLICHTUNGEN VERANTWORTLICH, OB VERTRAGSRECHT, DELIKT ODER SONSTIGEM, DIE AUS DEM VERWENDEN DER SOFTWARE ODER SONSTIGEN VERHALTENS DER SOFTWARE ERGEBEN, VERANTWORTLICH.

### express

(The MIT License)

Copyright (c) 2009-2014 TJ Holowaychuk &lt;tj@vision-media.ca&gt;;

Copyright (c) 2013-2014 Roman Shtylman &lt;shtylman+expressjs@gmail.com&gt;;

Copyright (c) 2014-2015 Douglas Christopher Wilson &lt;doug@somethingdoug.com&gt;;

Es wird hiermit kostenfrei jeder Person, die eine Kopie dieser Software und der zugehörigen Dokumentationsdateien (die "Software") erhält, die Erlaubnis erteilt, mit der Software uneingeschränkt zu handeln, einschließlich der Rechte zum Verwenden, Kopieren, Ändern, Mergen, Veröffentlichen, Unterlizenzieren und/oder Verkaufen von Kopien der Software, und Personen, denen die Software bereitgestellt wird, dies zu gestatten, vorbehaltlich der folgenden Bedingungen:

Der obige Urheberrechtshinweis und dieser Genehmigungsvermerk sind in alle Kopien oder wesentlichen Teile der Software aufzunehmen.

DIE SOFTWARE WIRD "WIE SIE IST" OHNE JEGLICHE GARANTIE ANGEBOTEN, EINSCHLIESSLICH JEGLICHER GARANTIEN DER MARKTFÄHIGKEIT, EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND NICHTVERLETZUNG. IN KEINEM FALL SIND DIE AUTORINNEN ODER COPYRIGHT-INHABER FÜR ANSPRÜCHE ODER SONSTIGE VERPFLICHTUNGEN VERANTWORTLICH, OB VERTRAGSRECHT, DELIKT ODER SONSTIGEM, DIE AUS DEM VERWENDEN DER SOFTWARE ODER SONSTIGEN VERHALTENS DER SOFTWARE ERGEBEN, VERANTWORTLICH.

### striptags

The MIT License (MIT)

Copyright (c) [2017] [Eric Norris]

Es wird hiermit kostenfrei jeder Person, die eine Kopie dieser Software und der zugehörigen Dokumentationsdateien (die "Software") erhält, die Erlaubnis erteilt, mit der Software uneingeschränkt zu handeln, einschließlich der Rechte zum Verwenden, Kopieren, Ändern, Mergen, Veröffentlichen, Verteilten, Unterlizenzieren und/oder Verkaufen von Kopien der Software, und Personen, denen die Software bereitgestellt wird, dies zu gestatten, vorbehaltlich der folgenden Bedingungen:

Der obige Urheberrechtshinweis und dieser Genehmigungsvermerk sind in alle Kopien oder wesentlichen Teile der Software aufzunehmen.

DIE SOFTWARE WIRD "WIE SIE IST" OHNE JEGLICHE GARANTIE ANGEBOTEN, EINSCHLIESSLICH JEGLICHER GARANTIEN DER MARKTFÄHIGKEIT, EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND NICHTVERLETZUNG. IN KEINEM FALL SIND DIE AUTORINNEN ODER COPYRIGHT-INHABER FÜR ANSPRÜCHE ODER SONSTIGE VERPFLICHTUNGEN VERANTWORTLICH, OB VERTRAGSRECHT, DELIKT ODER SONSTIGEM, DIE AUS DEM VERWENDEN DER SOFTWARE ODER SONSTIGEN VERHALTENS DER SOFTWARE ERGEBEN, VERANTWORTLICH.