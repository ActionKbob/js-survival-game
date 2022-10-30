export let archetypeMap = {
	"TestBlitter" :
	{
		components : [
			{
				type : "Transform",
				props : [
					{
						key : "x",
						value : 200
					},
					{
						key : "y",
						value : 400
					}
				]
			},
			{
				type : "Blitter",
				props : [
					{
						key : "frame",
						value : 1
					}
				]
			}
		]
	}
}

export default archetypeMap;