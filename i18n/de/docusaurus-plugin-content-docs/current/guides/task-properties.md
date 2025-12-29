---
title: "Task-Eigenschaften"
sidebar_label: "Task-Eigenschaften"
---

# Task-Eigenschaften 

Diese Seite bietet eine vollständige Liste der Eigenschaften, die das Task-Objekt enthalten kann.

Die vollständige Liste der Eigenschaften des Link-Objekts finden Sie im Artikel [Link Properties](guides/link-properties.md).


## Erforderliche Eigenschaften

Diese Eigenschaften sind immer clientseitig definiert. Gantt erwartet, dass diese Eigenschaften im Task-Objekt beim Laden der Daten vorhanden sind. Falls sie fehlen, fügt Gantt sie automatisch hinzu. Das Entfernen einer dieser Eigenschaften aus geladenen Tasks führt zu Fehlern.

<table>
  <tbody>
  <tr>
  <th>Name</th><th>Typ</th><th>Beschreibung</th>
  </tr>
  <tr>
  <td><b class="subproperty">id</b></td>
  <td><i>string | number</i></td>
  <td>Die Task-ID, die automatisch generiert wird, falls nicht angegeben</td>
  </tr>
  <tr>
  <td><b class="subproperty">start_date</b></td>
  <td><i>Date</i></td>
  <td>Das geplante Startdatum der Aufgabe. [Wenn nicht angegeben, berechnet Gantt dieses basierend auf den Eigenschaften end_date und duration.](guides/loading.md#loadingtaskdates) Diese Eigenschaft ist optional, wenn <b>unscheduled: true</b> gesetzt ist.</td>
  </tr>
  <tr>
  <td><b class="subproperty">end_date</b></td>
  <td><i>Date</i></td>
  <td>Das geplante Abschlussdatum der Aufgabe. [Wenn nicht angegeben, berechnet Gantt dieses basierend auf den Eigenschaften start_date und duration.](guides/loading.md#loadingtaskdates) Diese Eigenschaft ist optional, wenn <b>unscheduled: true</b> gesetzt ist.</td>
  </tr>
  <tr>
  <td><b class="subproperty">duration</b></td>
  <td><i>number</i></td>
  <td>Die Dauer der Aufgabe. [Wenn nicht angegeben, berechnet Gantt diese basierend auf den Eigenschaften start_date und end_date.](guides/loading.md#loadingtaskdates)</td>
  </tr>
  </tbody>
</table>


## Optionale Eigenschaften

Diese Eigenschaften können vorhanden sein, müssen es aber nicht. Die Standardlogik und Templates in Gantt nutzen diese Eigenschaften, sofern sie verfügbar sind.

<table>
  <tbody>
  <tr>
  <th>Name</th><th>Typ</th><th>Beschreibung</th>
  </tr>
  <tr>
  <td><b class="subproperty">auto_scheduling</b></td>
  <td><i>boolean</i></td>
  <td>Legt fest, ob Gantt die automatische Terminplanung für die Aufgabe durchführen soll (<i>true</i> oder nicht angegeben) oder nicht (<i>false</i>)</td>
  </tr>
  <tr>
  <td><b class="subproperty">bar_height</b></td>
  <td><i>number</i></td>
  <td>Legt die Höhe des DOM-Elements der Aufgabe in der Zeitleiste fest</td>
  </tr>
  <tr>
  <td><b class="subproperty">baselines</b></td>
  <td><i>Baseline[]</i></td>
  <td>Ein Array, das die Baselines enthält</td>
  </tr>
  <tr>
  <td><b class="subproperty">calendar_id</b></td>
  <td><i>number | string</i></td>
  <td>Weist der Aufgabe die ID eines benutzerdefinierten Kalenders zu. Der Name der Eigenschaft hängt von der [calendar_property](https://docs.dhtmlx.com/gantt/api/config/calendar_property)-Option ab</td>
  </tr>
  <tr>
  <td><b class="subproperty">color</b></td>
  <td><i>string</i></td>
  <td>Legt die Farbe der Aufgabe in der Zeitleiste fest (betrifft die <b>background-color</b> des <b>gantt_task_line</b>-Elements)</td>
  </tr>
  <tr>
  <td><b class="subproperty">constraint_date</b></td>
  <td><i>Date</i></td>
  <td>Das Datum der Einschränkung für die Aufgabe, hinzugefügt, wenn [automatische Terminplanung mit Zeitbeschränkungen](https://docs.dhtmlx.com/gantt/desktop__auto_scheduling.html) aktiviert ist. Wird nicht verwendet, wenn [auto_scheduling_compatibility](https://docs.dhtmlx.com/gantt/api/config/auto_scheduling_compatibility) aktiviert ist.</td>
  </tr>
  <tr>
  <td><b class="subproperty">constraint_type</b></td>
  <td><i>string</i></td>
  <td>[Gibt den Typ der Aufgabenbeschränkung an ("asap", "alap", "snet", "snlt", "fnet", "fnlt", "mso", "mfo")](https://docs.dhtmlx.com/gantt/desktop__auto_scheduling.html#timeconstraintsfortasks). Wird hinzugefügt, wenn [automatische Terminplanung mit Zeitbeschränkungen](https://docs.dhtmlx.com/gantt/desktop__auto_scheduling.html) aktiviert ist. Wird nicht verwendet, wenn [auto_scheduling_compatibility](https://docs.dhtmlx.com/gantt/api/config/auto_scheduling_compatibility) aktiviert ist.</td>
  </tr>
  <tr>
  <td><b class="subproperty">deadline</b></td>
  <td><i>Date</i></td>
  <td>Legt das Fälligkeitsdatum für die Aufgabe fest. Ein [visueller Indikator](guides/inbuilt-baselines.md#deadlinesandconstraints) erscheint in der Zeitleiste, wenn dies gesetzt ist.</td>
  </tr>
  <tr>
  <td><b class="subproperty">editable</b></td>
  <td><i>boolean</i></td>
  <td>Legt fest, ob die Aufgabe in einem [schreibgeschützten](guides/readonly-mode.md#readonlymodefortheentiregantt) Gantt-Diagramm bearbeitet werden kann. Der Name der Eigenschaft hängt von der [editable_property](https://docs.dhtmlx.com/gantt/api/config/editable_property)-Option ab</td>
  </tr>
  <tr>
  <td><b class="subproperty">group_id</b></td>
  <td><i>string | number</i></td>
  <td>Die ID der Gruppe, zu der die Aufgabe gehört. Hinzugefügt, wenn Aufgaben nach einer Objekteigenschaft gruppiert werden, die in [relation_property](guides/grouping.md#groupingtasks) in der groupBy()-Methode angegeben ist.</td>
  </tr>
  <tr>
  <td><b class="subproperty">hide_bar</b></td>
  <td><i>boolean</i></td>
  <td>Legt fest, ob eine Aufgabe (type:"task") oder ein Meilenstein (type:"milestone") [in der Zeitleiste ausgeblendet werden soll](guides/milestones.md#hidingtasksandmilestones)</td>
  </tr>
  <tr>
  <td><b class="subproperty">key</b></td>
  <td><i>string | number</i></td>
  <td>Der Gruppenschlüssel, hinzugefügt, wenn Aufgaben nach einer Array-Eigenschaft in der [relation_property](guides/grouping.md#groupingtasks) in groupBy() gruppiert werden. Wird auch Aufgaben mit dem Gruppennamen hinzugefügt (z. B. "High", "Normal", "Low", wenn nach Priorität gruppiert). [Siehe Beispiel](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_tasks_grouping_save_tree_structure.html).</td>
  </tr>
  <tr>
  <td><b class="subproperty">label</b></td>
  <td><i>string</i></td>
  <td>Das Gruppenlabel, hinzugefügt zu Aufgaben mit dem Gruppennamen (z. B. "High", "Normal", "Low", wenn nach Priorität gruppiert). [Siehe Beispiel](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_tasks_grouping_save_tree_structure.html).</td>
  </tr>
  <tr>
  <td><b class="subproperty">open</b></td>
  <td><i>boolean</i></td>
  <td>Gibt an, ob der Aufgaben-Branch initial geöffnet ist, um untergeordnete Aufgaben anzuzeigen. Zum Umschalten nach der Initialisierung verwenden Sie die Methoden [close()](api/method/close.md) und [open()](api/method/open.md).</td>
  </tr>
  <tr>
  <td><b class="subproperty">parent</b></td>
  <td><i>number | string</i></td>
  <td>Die ID der übergeordneten Aufgabe. Aufgaben mit nicht existierenden Eltern werden nicht angezeigt. Die Root-Task-ID wird über die [root_id](api/config/root_id.md)-Konfiguration gesetzt.</td>
  </tr>
  <tr>
  <td><b class="subproperty">progress</b></td>
  <td><i>number</i></td>
  <td>Der Fortschrittswert der Aufgabe (zwischen 0 und 1)</td>
  </tr>
  <tr>
  <td><b class="subproperty">progressColor</b></td>
  <td><i>string</i></td>
  <td>Legt die Farbe der Fortschrittsanzeige der Aufgabe in der Zeitleiste fest (betrifft die <b>background-color</b> des <b>gantt_task_progress</b>-Elements)</td>
  </tr>
  <tr>
  <td><b class="subproperty">readonly</b></td>
  <td><i>boolean</i></td>
  <td>Gibt an, ob die Aufgabe [schreibgeschützt](guides/readonly-mode.md#readonlymodeforspecifictaskslinks) sein soll. Der Name der Eigenschaft hängt von der [readonly_property](api/config/readonly_property.md)-Option ab</td>
  </tr>
  <tr>
  <td><b class="subproperty">render</b></td>
  <td><i>string</i></td>
  <td>Steuert, wie Unteraufgaben angezeigt werden. Werte: <i>"split" | ""</i>. Wenn auf ["split"](guides/split-tasks.md) gesetzt, erscheinen Unteraufgaben in einer Zeile. Wenn die [open_split_tasks](api/config/open_split_tasks.md)-Eigenschaft aktiviert ist, werden Unteraufgaben nur dann in einer Zeile angezeigt, wenn die Aufgabe eingeklappt ist.</td>
  </tr>
  <tr>
  <td><b class="subproperty">resource</b></td>
  <td><i>Array &lt;string&gt;</i></td>
  <td>Ein Array von Ressourcen, die der Aufgabe zugewiesen sind. Wird hinzugefügt, wenn Daten aus MS Project oder Primavera importiert werden</td>
  </tr>
  <tr>
  <td><b class="subproperty">rollup</b></td>
  <td><i>boolean</i></td>
  <td>Gibt an, ob eine Aufgabe (type:"task") oder ein Meilenstein (type:"milestone") [im übergeordneten Projekt angezeigt werden soll](guides/milestones.md#rolluptasksandmilestones).</td>
  </tr>
  <tr>
  <td><b class="subproperty">row_height</b></td>
  <td><i>number</i></td>
  <td>Legt die Höhe der Aufgabenzeile fest</td>
  </tr>
  <tr>
  <td><b class="subproperty">target</b></td>
  <td><i>string</i></td>
  <td>Die Ziel-Task-ID. Diese Eigenschaft entspricht der <b>$drop_target</b>-Eigenschaft. Wird dem Task-Objekt nur hinzugefügt, wenn der Data Processor aktiviert ist, nach Task-Updates und Serverkommunikation.</td>
  </tr>
  <tr>
  <td><b class="subproperty">text</b></td>
  <td><i>any</i></td>
  <td>Der Name der Aufgabe. Sie können bei Bedarf einen anderen Eigenschaftsnamen verwenden. Diese Eigenschaft wird in den Standardkonfigurationen von Gantt verwendet.</td>
  </tr>
  <tr>
  <td><b class="subproperty">textColor</b></td>
  <td><i>string</i></td>
  <td>Legt die Textfarbe der Aufgabe in der Zeitleiste fest (betrifft die <b>color</b> des <b>gantt_task_line</b>-Elements)</td>
  </tr>
  <tr>
  <td><b class="subproperty">type</b></td>
  <td><i>string</i></td>
  <td>Der Aufgabentyp. Verfügbare Werte sind im Objekt [types](api/config/types.md) definiert: <ul> <li>["task"](guides/task-types.md#regulartasks) - eine normale Aufgabe (<i>Standard</i>).</li> <li>["project"](guides/task-types.md#projecttasks) - eine Aufgabe, die mit dem frühesten Kind beginnt und mit dem spätesten Kind endet. <i>Die Eigenschaften <b>start_date</b>, <b>end_date</b> und <b>duration</b> werden für diesen Typ ignoriert.</i> </li> <li>["milestone"](guides/task-types.md#milestones) - eine Aufgabe mit null Dauer, die wichtige Projektdaten markiert. <i>Die Eigenschaften <b>duration</b>, <b>progress</b> und <b>end_date</b> werden für diesen Typ ignoriert.</i></li> </ul></td>
  </tr>
  <tr>
  <td><b class="subproperty">unscheduled</b></td>
  <td><i>boolean</i></td>
  <td>Gibt an, ob die Aufgabe [ungeplant](guides/unscheduled-tasks.md) ist. Standardmäßig werden ungeplante Aufgaben nicht in der Zeitleiste angezeigt; stattdessen erscheinen leere Werte im Grid für Start- und Enddatum.</td>
  </tr>
  </tbody>
</table>


## Dynamische Eigenschaften

Dynamische Eigenschaften werden clientseitig erstellt, um den aktuellen Status einer Aufgabe oder eines Links darzustellen. Sie sind nicht zur Speicherung in der Datenbank gedacht, und Gantt ignoriert sie, wenn sie in Ihrem JSON oder XML enthalten sind.

<table>
  <tbody>
  <tr>
  <th>Name</th><th>Typ</th><th>Beschreibung</th>
  </tr>
  <tr>
  <td><b class="subproperty">[resource_property]</b></td>
  <td><i>string | Array &lt;any&gt;</i></td>
  <td>[Diese Eigenschaft kann beliebigen Namen haben](api/config/resource_property.md). Sie speichert die Ressourcen-ID, die mit <i>resourceGrid/Timeline/Histogram/Calendar</i> verknüpft ist.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$auto_end_date</b></td>
  <td><i>Date</i></td>
  <td>Ein berechnetes Enddatum für eine Projektaufgabe basierend auf deren Unteraufgaben. Wird hinzugefügt und aktualisiert, wenn "auto_scheduling" deaktiviert ist.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$auto_start_date</b></td>
  <td><i>Date</i></td>
  <td>Ein berechnetes Startdatum für eine Projektaufgabe basierend auf deren Unteraufgaben. Wird hinzugefügt und aktualisiert, wenn "auto_scheduling" deaktiviert ist.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$calculate_duration</b></td>
  <td><i>boolean</i></td>
  <td>Eine Systemeigenschaft, die intern für Berechnungen verwendet wird.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$custom_data</b></td>
  <td><i>object</i></td>
  <td>Enthält benutzerdefinierte Aufgabeneigenschaften, die während [importFromMSProject()](api/method/importfrommsproject.md) und [importFromPrimaveraP6()](api/method/importfromprimaverap6.md) definiert wurden</td>
  </tr>
  <tr>
  <td><b class="subproperty">$dataprocessor_class</b></td>
  <td><i>string</i></td>
  <td>Eine Systemeigenschaft, die angibt, ob die Aufgabe aktualisiert wurde. Wird hinzugefügt, wenn der Data Processor aktiviert ist. Ist sie auf <i>"updated"</i> gesetzt, erscheint der Text der Aufgabe fett im Grid, obwohl benutzerdefinierte CSS-Styles angewendet werden können.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$drop_target</b></td>
  <td><i>string</i></td>
  <td>Die ID der Zielaufgabe während des vertikalen Ziehens. Diese temporäre Eigenschaft wird beim Ziehen der Aufgabe hinzugefügt.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$effective_calendar</b></td>
  <td><i>string</i></td>
  <td>Die ID des Kalenders (oder Ressourcen-Kalenders), der der Aufgabe zugewiesen ist. Wird intern für Berechnungen verwendet.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$expanded_branch</b></td>
  <td><i>boolean</i></td>
  <td>Gibt an, ob die Aufgabe sichtbar ist, basierend darauf, ob die übergeordneten Branches expandiert sind. Ist ein Elternteil eingeklappt, wird die Aufgabe ausgeblendet, mit Ausnahme von Split-Tasks (Unteraufgaben).</td>
  </tr>
  <tr>
  <td><b class="subproperty">$has_child</b></td>
  <td><i>boolean</i></td>
  <td>Gibt an, ob Gantt das Laden von Unteraufgaben der ersten Ebene vom Server anfordern soll. Wird verwendet, wenn [branch_loading](api/config/branch_loading.md) aktiviert ist. Der Name der Eigenschaft hängt von der [branch_loading_property](api/config/branch_loading_property.md)-Option ab.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$index</b></td>
  <td><i>number</i></td>
  <td>Die globale vertikale Position der Aufgabe. Dieser Wert wird aktualisiert, wenn Aufgaben darüber oder darunter geöffnet oder geschlossen werden. Wenn der Elternteil eingeklappt ist, spiegelt dies nicht die tatsächliche Position wider.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$level</b></td>
  <td><i>number</i></td>
  <td>Die Hierarchieebene der Aufgabe (beginnend bei null)</td>
  </tr>
  <tr>
  <td><b class="subproperty">$local_index</b></td>
  <td><i>number</i></td>
  <td>Die vertikale Position der Aufgabe innerhalb ihres Eltern-Branches. Dieser Wert wird nicht mit globalen Öffnen/Schließen-Änderungen aktualisiert. Wenn der Elternteil eingeklappt ist, spiegelt dies nicht die tatsächliche Position wider.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$new</b></td>
  <td><i>boolean</i></td>
  <td>Wird hinzugefügt, wenn eine neue Aufgabe über [createTask()](api/method/createtask.md) oder die "+"-Schaltfläche erstellt wird. Ist vorhanden, solange die Lightbox geöffnet ist, und wird nach dem Speichern entfernt.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$no_end</b></td>
  <td><i>boolean</i></td>
  <td><b>Erforderliche</b> Systemeigenschaft, die hinzugefügt wird, wenn das <b>end_date</b> nicht berechnet werden kann (start_date ist gesetzt, aber keine duration oder end_date). In diesem Fall kann die Aufgabe nicht verschoben oder in der Größe verändert werden. Das <b>end_date</b> hängt von den Enddaten der Unteraufgaben ab, und <b>start_date</b> bleibt fixiert. Automatische Terminplanung ist deaktiviert. Wenn auch <b>$no_start</b> gesetzt ist, hängt die Aufgabe vollständig von Unteraufgaben oder ersten Aufgaben ab.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$no_start</b></td>
  <td><i>boolean</i></td>
  <td><b>Erforderliche</b> Systemeigenschaft, die hinzugefügt wird, wenn das <b>start_date</b> nicht berechnet werden kann (end_date ist gesetzt, aber keine duration oder start_date). Das <b>start_date</b> hängt vom Startdatum der Unteraufgaben oder der ersten Aufgabe ab. Das <b>end_date</b> bleibt fixiert, es sei denn, das Startdatum der Unteraufgaben/ersten Aufgabe überschreitet es. Automatische Terminplanung ist deaktiviert. Wenn auch <b>$no_end</b> gesetzt ist, hängt die Aufgabe vollständig von Unteraufgaben oder ersten Aufgaben ab.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$open</b></td>
  <td><i>boolean</i></td>
  <td>Eine Systemeigenschaft, die widerspiegelt, ob die Aufgabe aktuell geöffnet ist (<i>true</i>). Wenn Sie diesen Wert ändern und Gantt neu zeichnen, wird die Aufgabe geöffnet oder geschlossen. Alternativ können Sie [open()](api/method/open.md) oder [close()](api/method/close.md) verwenden.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$raw</b></td>
  <td><i>object</i></td>
  <td>Enthält die ursprünglichen Eigenschaftsnamen der Aufgabe, die von [MS Project](guides/export-msproject.md) oder [Primavera](guides/export-primavera.md) während der Exportverarbeitung importiert wurden. Diese erscheinen vor der Umwandlung ins von Gantt erwartete Format.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$rendered_at</b></td>
  <td><i>string | number</i></td>
  <td>Die Zeilen-ID, in der ein [Rollup-Element](https://docs.dhtmlx.com/gantt/desktop__milestones.html#rolluptasksandmilestones) oder eine [Split](https://docs.dhtmlx.com/gantt/desktop__split_tasks.html)-Aufgabe gerendert wird. Diese temporäre Eigenschaft erscheint nur, solange die Rollup/Split-Aufgabe angezeigt wird.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$rendered_parent</b></td>
  <td><i>number | string</i></td>
  <td>Die ID des Elternteils, unter dem die Aufgabe gerendert wird (nicht der tatsächliche Elternteil). Wird intern und für die Gruppierung von Aufgaben verwendet.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$rendered_type</b></td>
  <td><i>string</i></td>
  <td>Temporäre Eigenschaft, die den Typ der gerenderten Aufgabe angibt.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$resourceAssignments</b></td>
  <td><i>Array &lt;any&gt;</i></td>
  <td>Ein Array von Ressourcen-IDs, die der Aufgabe zugewiesen sind (temporär). Die genauesten Daten werden im Resource Assignments Store gespeichert.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$rollup</b></td>
  <td><i>Array &lt;string | number&gt;</i></td>
  <td>Ein Array von IDs für Aufgaben und Meilensteine, die [auf dieser Aufgabe angezeigt werden](guides/milestones.md#rolluptasksandmilestones)</td>
  </tr>
  <tr>
  <td><b class="subproperty">$source</b></td>
  <td><i>Array &lt;string | number&gt;</i></td>
  <td><b>Erforderlich</b>-ein Array von [IDs aller Links, die von der Aufgabe ausgehen](guides/link-object-operations.md#gettingthelinksrelatedtoacertaintask)</td>
  </tr>
  <tr>
  <td><b class="subproperty">$split_subtask</b></td>
  <td><i>boolean</i></td>
  <td>Vorhanden, wenn die Aufgabe eine Unteraufgabe einer Split-Aufgabe ist (wird in einer Zeile mit anderen Unteraufgaben angezeigt)</td>
  </tr>
  <tr>
  <td><b class="subproperty">$target</b></td>
  <td><i>Array &lt;string | number&gt;</i></td>
  <td><b>Erforderlich</b>-ein Array von [IDs von Links, die auf die Aufgabe zeigen](guides/link-object-operations.md#gettingthelinksrelatedtoacertaintask)</td>
  </tr>
  <tr>
  <td><b class="subproperty">$transparent</b></td>
  <td><i>boolean</i></td>
  <td>Temporäre Eigenschaft, die während des vertikalen Ziehens hinzugefügt wird, wodurch die Aufgabe im Grid leicht transparent erscheint.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$virtual</b></td>
  <td><i>boolean</i></td>
  <td>Wird für Aufgaben hinzugefügt, die nach bestimmten Kriterien gruppiert sind. Aufgaben mit <b>$virtual: true</b> werden entfernt, wenn die Gruppierung zurückgesetzt wird.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$wbs</b></td>
  <td><i>string</i></td>
  <td>Der WBS-Code der Aufgabe (temporär). Wird nach dem Aufruf von [getWBSCode()](api/method/getwbscode.md) hinzugefügt. Wenn sich der Code aufgrund von Änderungen an Eltern oder Positionen ändert, rufen Sie [getWBSCode()](api/method/getwbscode.md) erneut auf, um ihn zu aktualisieren.</td>
  </tr>
  </tbody>
</table>


## Beispiel

~~~js
const data = {
  tasks: [
    { id: 1, text: "Projekt #1", start_date: "01-04-2025", duration: 18 },
    { id: 2, text: "Aufgabe #1", start_date: "02-04-2025", duration: 8, parent: 1 },
    { id: 3, text: "Aufgabe #2", start_date: "11-04-2025", duration: 8, parent: 1 }
  ],
  links: []
};
~~~

