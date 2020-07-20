/* Main Webapp Script (JavaScript) */
// Adding, Removing, and Listing Words

// Set Puzzle Width & Height
var puzzleWidth = 20;
var puzzleHeight = 20;
function setWidth() {
	puzzleWidth = document.getElementById("setWidth").innerHTML;
	console.log("Puzzle Width: " + puzzleWidth);
	console.log("Puzzle Height: " + puzzleHeight);
}
function setHeight() {
	puzzleHeight = document.getElementById("setHeight").innerHTML;
	console.log("Puzzle Width: " + puzzleWidth);
	console.log("Puzzle Height: " + puzzleHeight);
}
// Puzzle Generation Algorithm

// Show on Canvas
	// Context
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
	// Example Background Colour
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, c.width, c.height);
	// Example Text
ctx.fillStyle = "#000";
ctx.font = "64px Arial";
ctx.fillText("I will be your image!", 256, 512);
