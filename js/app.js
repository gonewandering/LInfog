/* To create a gauge, initalize a new gauge instance as follows */
var gauge = new LInfog().gauge("#gauge1", 70, "#fd8d3c", 250, "Smart Cats");
var gauge2 = new LInfog().gauge("#gauge2", 40, "#3182bd", 150, "Friendly Dogs");

/* To create a pie chart, import a data set, as below, and init a new pie instance */
var data = [
	{color: "#fd8d3c", value: 50, opacity:1, label:"Cats"},
	{color: "#31a354", value: 20, opacity:1, label:"Dogs"},
	{color: "#756bb1", value: 50, opacity:1, label:"Mice"}
];

var pie = new LInfog().pie("#pie", data, 300);