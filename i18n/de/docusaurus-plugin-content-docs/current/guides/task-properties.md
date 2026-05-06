---
title: "Aufgaben-Eigenschaften"
sidebar_label: "Aufgaben-Eigenschaften"
---

# Aufgaben-Eigenschaften

Auf dieser Seite finden Sie die vollständige Liste der Eigenschaften, die das Aufgabenobjekt enthalten kann.

Die vollständige Liste der Eigenschaften des Link-Objekts finden Sie im Artikel [Link-Eigenschaften](guides/link-properties.md).


## Erforderliche Eigenschaften

Diese Eigenschaften sind auf dem Client stets definiert. Gantt geht davon aus, dass die Eigenschaften beim Laden der Daten im Aufgabenobjekt angegeben werden, aber falls sie nicht angegeben sind, fügt Gantt sie selbst hinzu. Wenn Sie eine dieser Eigenschaften für die geladenen Aufgaben entfernen, wird Gantt Fehler melden.

<table>
  <tbody>
  <tr>
  <th>Name</th><th>Typ</th><th>Beschreibung</th>
  </tr>
  <tr>
  <td><b class="subproperty">id</b></td>
  <td><i>string | number</i></td>
  <td>Die Aufgaben-ID, automatisch generiert, falls sie nicht gesetzt ist</td>
  </tr>
  <tr>
  <td><b class="subproperty">start_date</b></td>
  <td><i>Date</i></td>
  <td>Das Datum, an dem eine Aufgabe voraussichtlich beginnt. [Datenladen](guides/loading.md#loadingtaskdates) Falls nicht angegeben, berechnet Gantt es anhand der Eigenschaften <b>end_date</b> und <b>duration</b>. Die Eigenschaft wird optional, wenn <b>unscheduled: true</b> gesetzt wird.</td>
  </tr>
  <tr>
  <td><b class="subproperty">end_date</b></td>
  <td><i>Date</i></td>
  <td>Das Datum, an dem eine Aufgabe voraussichtlich beendet wird. [Datenladen](guides/loading.md#loadingtaskdates) Falls nicht angegeben, berechnet Gantt es anhand der Eigenschaften <b>start_date</b> und <b>duration</b>. Die Eigenschaft wird optional, wenn <b>unscheduled: true</b> gesetzt wird.</td>
  </tr>
  <tr>
  <td><b class="subproperty">duration</b></td>
  <td><i>number</i></td>
  <td>Die Aufgaben-Dauer. [Datenladen](guides/loading.md#loadingtaskdates) Falls nicht angegeben, berechnet Gantt sie anhand der Eigenschaften <b>start_date</b> und <b>end_date</b>.</td>
  </tr>
  </tbody>
</table>


## Optionale Eigenschaften

Diese Eigenschaften können definiert sein oder auch nicht. Die Standardlogik und Vorlagen von Gantt verwenden diese Eigenschaften, sofern sie definiert sind.

<table>
  <tbody>
  <tr>
  <th>Name</th><th>Typ</th><th>Beschreibung</th>
  </tr>
  <tr>
  <td><b class="subproperty">auto_scheduling</b></td>
  <td><i>boolean</i></td>
  <td>Bestimmt, ob Gantt die automatische Terminplanung der Aufgabe durchführt (<i>true</i> oder nicht angegeben) oder nicht (<i>false</i>)</td>
  </tr>
  <tr>
  <td><b class="subproperty">bar_height</b></td>
  <td><i>number</i></td>
  <td>Setzt die Höhe des DOM-Elements der Aufgabe im Zeitstrahlbereich</td>
  </tr>
  <tr>
  <td><b class="subproperty">baselines</b></td>
  <td><i>Baseline[]</i></td>
  <td>Ein Array mit Baselines</td>
  </tr>
  <tr>
  <td><b class="subproperty">calendar_id</b></td>
  <td><i>number | string</i></td>
  <td>Setzt die ID des benutzerdefinierten Kalenders, der der Aufgabe zugewiesen wird. Der Name der Eigenschaft hängt vom Wert der Option [calendar_property](api/config/calendar_property.md) ab</td>
  </tr>
  <tr>
  <td><b class="subproperty">color</b></td>
  <td><i>string</i></td>
  <td>Setzt die Farbe der Aufgabe im Zeitstrahlbereich (d. h. setzt <b>background-color</b> für das <b>gantt_task_line</b>-Element der Aufgabe)</td>
  </tr>
  <tr>
  <td><b class="subproperty">constraint_date</b></td>
  <td><i>Date</i></td>
  <td>Das Datum der Aufgaben-Beschränkung. Es wird der Aufgabenobjekt hinzugefügt, wenn [Auto-Scheduling mit Zeitbeschränkungen aktiviert ist](api/config/auto_scheduling.md). Die Eigenschaft wird nicht verwendet, wenn [auto_scheduling_compatibility](api/config/auto_scheduling_compatibility.md) aktiviert ist.</td>
  </tr>
  <tr>
  <td><b class="subproperty">constraint_type</b></td>
  <td><i>string</i></td>
  <td>[Der Typ der Aufgaben-Beschränkung ("asap", "alap", "snet", "snlt", "fnet", "fnlt", "mso", "mfo")](guides/auto-scheduling.md#timeconstraintsfortasks). Er wird dem Aufgabenobjekt hinzugefügt, wenn Auto-Scheduling mit Zeitbeschränkungen aktiviert ist. Die Eigenschaft wird nicht verwendet, wenn [auto_scheduling_compatibility](api/config/auto_scheduling_compatibility.md) aktiviert ist.</td>
  </tr>
  <tr>
  <td><b class="subproperty">deadline</b></td>
  <td><i>Date</i></td>
  <td>Gibt das Fälligkeitsdatum der Aufgabe an. Eine [visuelle Anzeige](guides/inbuilt-baselines.md#deadlines-and-constraints) wird im Zeitstrahl angezeigt, wenn diese Eigenschaft gesetzt ist.</td>
  </tr>
  <tr>
  <td><b class="subproperty">editable</b></td>
  <td><i>boolean</i></td>
  <td>Definiert, ob die Aufgabe im schreibgeschützten Gantt bearbeitet werden kann ([editable](guides/readonly-mode.md#readonlymodefortheentiregantt)) in der Leseansicht von Gantt. Der Name der Eigenschaft hängt von der Option [editable_property](api/config/editable_property.md) ab</td>
  </tr>
  <tr>
  <td><b class="subproperty">group_id</b></td>
  <td><i>string | number</i></td>
  <td>Die ID der Gruppe. Sie wird den Aufgaben hinzugefügt, die nach einem Kriterium gruppiert wurden, falls die Eigenschaft für das Gruppieren der Aufgaben ([relation_property](guides/grouping.md#groupingtasks) in der groupBy()-Methode) als Objekt angegeben ist.</td>
  </tr>
  <tr>
  <td><b class="subproperty">hide_bar</b></td>
  <td><i>boolean</i></td>
  <td>Gibt an, ob eine Aufgabe (type:"task") oder Meilenstein (type:"milestone") im Zeitstrahlbereich versteckt werden soll</td>
  </tr>
  <tr>
  <td><b class="subproperty">key</b></td>
  <td><i>string | number</i></td>
  <td>Schlüssel der Gruppe. Er wird den Aufgaben hinzugefügt, die nach einem Kriterium gruppiert wurden, falls die Gruppierungs-Eigenschaft ([relation_property](guides/grouping.md#groupingtasks) in der groupBy()-Methode) als Array angegeben ist. Er wird auch zu den Aufgaben mit dem Namen der Gruppe hinzugefügt (z. B. zu den Aufgaben "High", "Normal", "Low", wenn Sie Aufgaben nach Priorität gruppiert haben. [Beispiel prüfen](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_tasks_grouping_save_tree_structure.html)).</td>
  </tr>
  <tr>
  <td><b class="subproperty">label</b></td>
  <td><i>string</i></td>
  <td>Die Gruppen-Bezeichnung. Sie wird den Aufgaben mit dem Namen der Gruppe hinzugefügt (z. B. wenn Sie Aufgaben nach Priorität gruppiert haben, erhält jede Gruppe einen Namen wie "High", "Normal", "Low". [Beispiel prüfen](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_tasks_grouping_save_tree_structure.html)).</td>
  </tr>
  <tr>
  <td><b class="subproperty">open</b></td>
  <td><i>boolean</i></td>
  <td>Gibt an, ob der Zweig der Aufgabe initial geöffnet sein soll (um Kindaufgaben anzuzeigen). Um den Zweig nach der Initialisierung von Gantt zu schließen/zu öffnen, verwenden Sie die entsprechenden Methoden: [close()](api/method/close.md) und [open()](api/method/open.md)</td>
  </tr>
  <tr>
  <td><b class="subproperty">parent</b></td>
  <td><i>number | string</i></td>
  <td>Die ID der übergeordneten Aufgabe. Wenn der angegebene Parent nicht existiert, wird die Aufgabe in Gantt nicht gerendert. Die ID der Stammaufgabe wird durch die [root_id](api/config/root_id.md)-Konfiguration festgelegt.</td>
  </tr>
  <tr>
  <td><b class="subproperty">progress</b></td>
  <td><i>number</i></td>
  <td>Der Fortschritt der Aufgabe (von 0 bis 1)</td>
  </tr>
  <tr>
  <td><b class="subproperty">progressColor</b></td>
  <td><i>string</i></td>
  <td>Die Farbe des Aufgabenfortschritts im Zeitstrahlbereich (ändert z. B. <b>background-color</b> des Elements <b>gantt_task_progress</b> des Fortschritts der Aufgabe)</td>
  </tr>
  <tr>
  <td><b class="subproperty">readonly</b></td>
  <td><i>boolean</i></td>
  <td>Definiert, ob die Aufgabe im schreibgeschützten Gantt als nur-lesbar behandelt wird ([readonly-mode](guides/readonly-mode.md#readonlymodeforspecifictaskslinks)). Der Name der Eigenschaft hängt von der Option [readonly_property](api/config/readonly_property.md) ab</td>
  </tr>
  <tr>
  <td><b class="subproperty">render</b></td>
  <td><i>string</i></td>
  <td>Legt fest, wie Unteraufgaben der Aufgabe angezeigt werden müssen. Werte: <i>"split" | ""</i>. Falls auf ["split"](guides/split-tasks.md) gesetzt, werden Unteraufgaben in einer Zeile angezeigt. Zusätzlich werden, wenn Sie die Eigenschaft [open_split_tasks](api/config/open_split_tasks.md) aktivieren, die Unteraufgaben nur dann in einer Zeile gerendert, wenn die Aufgabe zusammengeklappt ist.</td>
  </tr>
  <tr>
  <td><b class="subproperty">resource</b></td>
  <td><i>Array &lt;string&gt;</i></td>
  <td>Ein Array mit Ressourcen, die der Aufgabe zugewiesen sind. Es wird dem Aufgabenobjekt beim Importieren von MS Project/Primavera hinzugefügt</td>
  </tr>
  <tr>
  <td><b class="subproperty">rollup</b></td>
  <td><i>boolean</i></td>
  <td>Gibt an, ob eine Aufgabe (type:"task") oder Meilenstein (type:"milestone") [auf den übergeordneten Projekten erscheinen soll](guides/milestones.md#rolluptasksandmilestones).</td>
  </tr>
  <tr>
  <td><b class="subproperty">row_height</b></td>
  <td><i>number</i></td>
  <td>Legt die Höhe der Zeile der Aufgabe fest</td>
  </tr>
  <tr>
  <td><b class="subproperty">target</b></td>
  <td><i>string</i></td>
  <td>Die ID der Zielaufgabe. Die Eigenschaft zeigt denselben Wert wie die <b>$drop_target</b>-Eigenschaft an. Die Eigenschaft wird dem Aufgabenobjekt nur hinzugefügt, wenn Data Processor aktiviert ist, nachdem die Aufgabe aktualisiert wurde und die Daten an den Server gesendet wurden.</td>
  </tr>
  <tr>
  <td><b class="subproperty">text</b></td>
  <td><i>any</i></td>
  <td>Der Name der Aufgabe. Falls nötig können Sie jeden anderen Namen für diese Eigenschaft verwenden. Die Eigenschaft wird in Standardkonfigurationen verschiedener Teile von Gantt verwendet.</td>
  </tr>
  <tr>
  <td><b class="subproperty">textColor</b></td>
  <td><i>string</i></td>
  <td>Die Textfarbe der Aufgabe im Zeitstrahlbereich (d. h. setzt <b>color</b> für das <b>gantt_task_line</b>-Element der Aufgabentexte).</td>
  </tr>
  <tr>
  <td><b class="subproperty">type</b></td>
  <td><i>string</i></td>
  <td>Der Aufgabentyp. Die verfügbaren Werte sind im Objekt [types](api/config/types.md) hinterlegt: <ul> <li>["task"](guides/task-types.md#regular-tasks) – eine reguläre Aufgabe (<i>Standardwert</i>).</li> <li>["project"](guides/task-types.md#project-tasks) – eine Aufgabe, die beginnt, wenn ihre früheste Kindaufgabe beginnt, und endet, wenn ihre späteste Kindaufgabe endet. <i>Die Eigenschaften <b>start_date</b>, <b>end_date</b>, <b>duration</b> werden für solche Aufgaben ignoriert.</i> </li> <li>["milestone"](guides/task-types.md#milestones) – eine Null-Dauer-Aufgabe, die verwendet wird, um wichtige Projekttermine zu markieren. <i>Die Eigenschaften <b>duration</b>, <b>progress</b>, <b>end_date</b> werden für solche Aufgaben ignoriert.</i></li> </ul></td>
  </tr>
  <tr>
  <td><b class="subproperty">unscheduled</b></td>
  <td><i>boolean</i></td>
  <td>Definiert, ob die Aufgabe [unscheduled](guides/unscheduled-tasks.md) sein muss. Standardmäßig wird die unscheduled-Aufgabe im Zeitstrahlbereich nicht angezeigt; leere Werte werden in der Gitteransicht anstelle von Start- und Enddaten angezeigt.</td>
  </tr>
  </tbody>
</table>


## Dynamische Eigenschaften

Dynamische Eigenschaften werden auf dem Client erstellt und stellen den aktuellen Zustand einer Aufgabe oder einer Verknüpfung dar. Sie sollten nicht in der Datenbank gespeichert werden; Gantt ignoriert diese Eigenschaften, wenn sie in Ihrem JSON/XML angegeben sind.


<table>
  <tbody>
  <tr>
  <th>Name</th><th>Typ</th><th>Beschreibung</th>
  </tr>
  <tr>
  <td><b class="subproperty">[resource_property]</b></td>
  <td><i>string | Array &lt;any&gt;</i></td>
  <td>[resource_property](api/config/resource_property.md) Die Eigenschaft kann jeden anderen Namen haben. Diese Eigenschaft speichert die Ressourcen-ID, die mit <i>resourceGrid/Timeline/Histogram/Calendar.</i> verknüpft ist.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$auto_end_date</b></td>
  <td><i>Date</i></td>
  <td>Ein berechnetes Enddatum der Projektaufgabe basierend auf ihren Unteraufgaben. Hinzugefügt und aktualisiert, wenn „auto_scheduling“ deaktiviert ist.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$auto_start_date</b></td>
  <td><i>Date</i></td>
  <td>Ein berechnetes Startdatum der Projektaufgabe basierend auf ihren Unteraufgaben. Hinzugefügt und aktualisiert, wenn „auto_scheduling“ deaktiviert ist.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$calculate_duration</b></td>
  <td><i>boolean</i></td>
  <td>Ein System-Property, das in internen Berechnungen verwendet wird.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$custom_data</b></td>
  <td><i>object</i></td>
  <td>Ein Objekt, das benutzerdefinierte Eigenschaften einer Aufgabe enthält, die in den Methoden [importFromMSProject()](api/method/importfrommsproject.md) und [importFromPrimaveraP6()](api/method/importfromprimaverap6.md) definiert wurden</td>
  </tr>
  <tr>
  <td><b class="subproperty">$dataprocessor_class</b></td>
  <td><i>string</i></td>
  <td>Ein System-Property, das angibt, ob die Aufgabe aktualisiert wurde. Es wird dem Aufgabenobjekt hinzugefügt, wenn Data Processor aktiviert ist. Wenn der Wert der Eigenschaft <i>"updated"</i> ist, wird der Text der Aufgabe in der Gantt-Grid fett dargestellt, aber Sie können Ihre eigenen Stile über CSS definieren.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$drop_target</b></td>
  <td><i>string</i></td>
  <td>Die ID der Zielaufgabe. Eine temporäre Eigenschaft, die dem Aufgabenobjekt beim vertikalen Draggen der Aufgabe hinzugefügt wird.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$effective_calendar</b></td>
  <td><i>string</i></td>
  <td>Die ID des Kalenders (oder Ressourcen-Kalenders), der der Aufgabe zugewiesen ist. Eine System-Eigenschaft, die in internen Berechnungen verwendet wird.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$expanded_branch</b></td>
  <td><i>boolean</i></td>
  <td>Eine System-Eigenschaft, die anzeigt, ob die Aufgabe sichtbar ist, abhängig davon, ob die Eltern der Aufgabe erweitert sind oder nicht. Wenn mindestens ein Elternteil zusammengeklappt ist, ist die Aufgabe nicht sichtbar. Die Ausnahme gilt nur für aufgespaltene Aufgaben (Unteraufgaben).</td>
  </tr>
  <tr>
  <td><b class="subproperty">$has_child</b></td>
  <td><i>boolean</i></td>
  <td>Definiert, ob Gantt eine Anfrage an den Server senden soll, um die Unteraufgaben der ersten Ebene der Aufgabe zu laden. Die Eigenschaft wird verwendet, wenn die Eigenschaft [branch_loading](api/config/branch_loading.md) aktiviert ist. Der Name der Eigenschaft hängt von der Option [branch_loading_property](api/config/branch_loading_property.md) ab.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$index</b></td>
  <td><i>number</i></td>
  <td>Die globale vertikale Position der Aufgabe. Sie ist an die Aufgabe gebunden und ändert sich, wenn darunter oder darüber liegende Aufgaben geöffnet oder geschlossen werden. Wenn der Parent der Aufgabe zusammengeklappt ist, zeigt die Eigenschaft nicht die tatsächliche Position der Aufgabe.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$level</b></td>
  <td><i>number</i></td>
  <td>Die Ebene der Aufgabe in der Aufgaben-Hierarchie (Null-basierte Nummerierung)</td>
  </tr>
  <tr>
  <td><b class="subproperty">$local_index</b></td>
  <td><i>number</i></td>
  <td>Die vertikale Position der Aufgabe im Zweig (unter dem Parent). Sie ist nicht an die Aufgabe gebunden und ändert sich nicht, wenn darunter oder darüber liegende Aufgaben geöffnet oder geschlossen sind – sowohl innerhalb des Zweigs als auch global. Wenn der Parent der Aufgabe zusammengeklappt ist, zeigt die Eigenschaft nicht die tatsächliche Position der Aufgabe.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$new</b></td>
  <td><i>boolean</i></td>
  <td>Wird für eine neue Aufgabe hinzugefügt, wenn sie über die Methode [createTask](api/method/createtask.md) oder über die Schaltfläche "+" erstellt wird. Die Eigenschaft wird dem Aufgabenobjekt beim Öffnen des Lightbox-Fensters hinzugefügt und nach dem Speichern der Aufgabe wieder entfernt.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$no_end</b></td>
  <td><i>boolean</i></td>
  <td><b>Erforderlich</b>, eine System-Eigenschaft, die dem Aufgabenobjekt hinzugefügt wird. <i>True</i>, wenn die <b>end_date</b>-Eigenschaft nicht berechnet werden konnte (wenn beim Laden der <b>start_date</b>-Eigenschaft keine <b>duration</b> bzw. <b>end_date</b> vorhanden ist). In diesem Fall können Sie die Aufgabe nicht bewegen oder skalieren. Die <b>end_date</b>-Eigenschaft hängt vom <b>end_date</b> der Unteraufgaben (falls vorhanden) ab. Die <b>start_date</b>-Eigenschaft ist fest und ändert sich nicht. Auto-Scheduling funktioniert für eine solche Aufgabe nicht. Wenn die <b>$no_start</b>-Eigenschaft aktiviert ist, hängt die Aufgabe vollständig von den Daten ihrer Unteraufgaben oder dem Datum der ersten Aufgabe ab.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$no_start</b></td>
  <td><i>boolean</i></td>
  <td><b>Erforderlich</b>, eine System-Eigenschaft, die dem Aufgabenobjekt hinzugefügt wird. <i>True</i>, wenn die <b>start_date</b>-Eigenschaft nicht berechnet werden konnte (wenn die <b>end_date</b>-Eigenschaft geladen ist, aber weder <b>duration</b> noch <b>start_date</b> vorhanden ist). Die <b>start_date</b>-Eigenschaft hängt von den <b>start_date</b> der Unteraufgaben (falls vorhanden) oder vom Datum der ersten Aufgabe ab. Die <b>end_date</b>-Eigenschaft wird festgelegt und ändert sich nur, wenn das Startdatum der Unteraufgaben/erste Aufgabe größer als das Enddatum der Aufgabe ist. Auto-Scheduling funktioniert für eine solche Aufgabe nicht. Wenn die <b>$no_end</b>-Eigenschaft aktiviert ist, hängt die Aufgabe vollständig von den Daten ihrer Unteraufgaben oder dem Datum der ersten Aufgabe ab.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$open</b></td>
  <td><i>boolean</i></td>
  <td>Eine System-Eigenschaft, die angibt, ob die Aufgabe derzeit geöffnet ist (<i>true</i>). Wenn Sie den Wert der Eigenschaft ändern und Gantt neu zeichnen, wird die Aufgabe geöffnet oder geschlossen. Um den Status der Aufgabe zu ändern, können Sie außerdem die Methoden [open](api/method/open.md) oder [close](api/method/close.md) verwenden.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$raw</b></td>
  <td><i>object</i></td>
  <td>Ein Objekt mit den ursprünglichen Namen von Aufgabeneigenschaften, die aus [MS Project](guides/export-msproject.md) / [Primavera](guides/export-primavera.md) in das Export-Modul (Export-Server) importiert wurden. Die Eigenschaften erscheinen im <b>$raw</b>-Objekt, während die Datei in JSON-Format konvertiert wird, aber bevor sie in die von Gantt erwarteten Namen und Formate konvertiert werden.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$rendered_at</b></td>
  <td><i>string | number</i></td>
  <td>Die ID einer Zeile, in der der [Rollup-Artikel](guides/milestones.md#rolluptasksandmilestones) / [Split](guides/split-tasks.md) der Aufgabe gerendert wird. Dies ist die temporäre Eigenschaft, die im Objekt der Rollup-/Split-Aufgabe nur dann erscheint, wenn sie auf der Seite gerendert wurde.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$rendered_parent</b></td>
  <td><i>number | string</i></td>
  <td>Die ID des Elternteils, unter dem die Aufgabe gerendert wird (nicht die ID des echten Elternteils der Aufgabe). Die Eigenschaft wird in internen Berechnungen und bei der Gruppierung von Aufgaben verwendet.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$rendered_type</b></td>
  <td><i>string</i></td>
  <td>Der Typ der gerenderten Aufgabe (eine temporäre Eigenschaft).</td>
  </tr>
  <tr>
  <td><b class="subproperty">$resourceAssignments</b></td>
  <td><i>Array &lt;any&gt;</i></td>
  <td>Ein Array mit IDs von Ressourcen, die der Aufgabe zugewiesen sind (eine temporäre Eigenschaft). Die aktuellsten Daten befinden sich jedoch im Store der Ressourcen-Zuweisungen, nicht in dieser Eigenschaft.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$rollup</b></td>
  <td><i>Array &lt;string | number&gt;</i></td>
  <td>Ein Array mit IDs von Aufgaben und Meilensteinen, die [auf der aktuellen Aufgabe] erschienen sind</td>
  </tr>
  <tr>
  <td><b class="subproperty">$source</b></td>
  <td><i>Array &lt;string | number&gt;</i></td>
  <td><b>Erforderlich</b>, ein Array mit [IDs aller Verknüpfungen, die von der Aufgabe ausgehen](guides/link-object-operations.md#getting-the-links-related-to-a-certain-task)</td>
  </tr>
  <tr>
  <td><b class="subproperty">$split_subtask</b></td>
  <td><i>boolean</i></td>
  <td>Tritt auf, wenn die Aufgabe eine Unteraufgabe einer geteilten Aufgabe ist (d. h. sie ordnet sich in einer Zeile mit anderen Unteraufgaben an)</td>
  </tr>
  <tr>
  <td><b class="subproperty">$target</b></td>
  <td><i>Array &lt;string | number&gt;</i></td>
  <td><b>Erforderlich</b>, ein Array mit [IDs von Verknüpfungen, die in die Aufgabe hineinführen](guides/link-object-operations.md#getting-the-links-related-to-a-certain-task)</td>
  </tr>
  <tr>
  <td><b class="subproperty">$transparent</b></td>
  <td><i>boolean</i></td>
  <td>Eine temporäre Eigenschaft, die dem Aufgabenobjekt beim vertikalen Draggen hinzugefügt wird. Die Aufgabe wirkt im Raster beim vertikalen Draggen leicht transparent aufgrund dieser Eigenschaft.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$virtual</b></td>
  <td><i>boolean</i></td>
  <td>Sie wird Aufgaben hinzugefügt, die nach einem Kriterium gruppiert wurden. Nachdem die Gruppierung zurückgesetzt wurde, werden Aufgaben mit <b>$virtual: true</b> entfernt</td>
  </tr>
  <tr>
  <td><b class="subproperty">$wbs</b></td>
  <td><i>string</i></td>
  <td>Der WBS-Code der Aufgabe (eine temporäre Eigenschaft). Sie wird dem Aufgabenobjekt nach Anwendung der Methode [getWBSCode](api/method/getwbscode.md) hinzugefügt. Wenn sich der Code-Wert geändert hat (Elternelement oder Position der Aufgabe geändert), müssen Sie die Methode [getWBSCode](api/method/getwbscode.md) erneut aufrufen, um den aktualisierten Wert des Codes zu erhalten.</td>
  </tr>
  </tbody>
</table>

## Beispiel

~~~js
const data = {
  tasks: [
    { id: 1, text: "Project #1", start_date: "01-04-2025", duration: 18 },
    { id: 2, text: "Task #1", start_date: "02-04-2025", duration: 8, parent: 1 },
    { id: 3, text: "Task #2", start_date: "11-04-2025", duration: 8, parent: 1 }
  ],
  links: []
};
~~~