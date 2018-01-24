links
=============
@short:stores the types of links dependencies
	

@type: object
@default:
{
	"finish_to_start":"0",
	"start_to_start":"1",
	"finish_to_finish":"2",
	"start_to_finish":"3"
}
@example:
var type1 = gantt.config.links.finish_to_start;

@template:	api_config
@descr:

- **"finish_to_start"** - the target task can't start before the source task ends (but it may start later).
- **"start_to_start"** - the target task can't start until the source task starts (but it may start later).
- **"finish_to_finish"** -  the target task can't end before the source task ends (but it may end later).
- **"start_to_finish"** - the target task can't end before the source task starts (but it may end later).


@related:
desktop/loading.md#specifyingdataproperties