	<!DOCTYPE HTML>
<html>
	<script src="./freid/scripts/freid.js" type="text/javascript" charset="utf-8"></script>
	<script src="./freid/scripts/jung.js" type="text/javascript" charset="utf-8"></script>
	<script src="./freid/scripts/berne.js" type="text/javascript" charset="utf-8"></script>
	<script src="./freid/scripts/webixcore.js" type="text/javascript" charset="utf-8"></script>
	<link rel="stylesheet" href="./freid/scripts/freid.css" type="text/css" media="screen" title="no title" charset="utf-8">

	
	<script src="../../gantt/codebase/dhtmlxgantt.js" type="text/javascript" charset="utf-8"></script>

	<script src="https://export.dhtmlx.com/gantt/api.js"></script>

	<script type="text/javascript">
		(function(){
			var n =1;
			var original = gantt.attachEvent;
			gantt.attachEvent = function(){
				gantt["_freid_"+n] = arguments[1];
				n++;
				return original.apply(this, arguments);
			}
		})();
	</script>

	<script src="../../gantt/sources/core/docs.js" type="text/javascript" charset="utf-8"></script>
	<script src="../index.php?action=freid" type="text/javascript" charset="utf-8"></script>

	<script type="text/javascript">
		function run_onload(){
			Freid.root = "";
			Freid.hideView = { };

			gantt.plugins({
				auto_scheduling: true,
				click_drag: true,
				critical_path: true,
				drag_timeline: true,
				fullscreen: true,
				keyboard_navigation: true,
				quick_info: true,
				tooltip: true,
				undo: true,
				grouping: true,
				marker: true,
				multiselect: true,
				overlay: true
			});
			//fill templates
			gantt.skin = "terrace";
			gantt.init("gantt_temp");
			Freid.analize();
		};
	</script>
	<body onload="run_onload()">
	<div style="border-bottom: 1px dashed #909090; margin-bottom: 10px; padding-bottom: 10px;">
		<input type='button' value='Generate Docs' onclick="Freid.generate('touch')">
		<input type='button' value='Log Patients' onclick="Berne.checkProblems();">
		<span class="logoinfo">docBuilder // drunix edition</span>
	</div>
	<div id="test_div" style='display:none;'></div>
	<div id="test_div2" style='display:none;'></div>
	<div id="test_div3" style='display:none;'></div>
	<div id="berne_report"></div>
	<div id="stat" style='float:right'></div>
	<table border="0" cellspacing="1" cellpadding="1">
		<td align="left" valign="top" id="views_here_id"></td>
		<td align="left" valign="top" id="methods_here_id"></td>
	</table>
	<div id="gantt_temp" style="position:absolute; width:50px;height:50px;top:-9999px; left:-9999px;"></div>
	</body>
</html> 