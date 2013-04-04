// Data
var data = [
	{color: "#fd8d3c", value: 50, opacity:1, label:"Cats"},
	{color: "#31a354", value: 20, opacity:1, label:"Dogs"},
	{color: "#756bb1", value: 50, opacity:1, label:"Mice"}
];

var gauge = new LInfog().gauge("#gauge1", 70, "#fd8d3c", 250, "Smart Cats");
var gauge2 = new LInfog().gauge("#gauge2", 40, "#3182bd", 150, "Friendly Dogs");
var gauge3 = new LInfog().pie("#gauge3", data, 300);