/* Main Webapp Script (JavaScript) */
// Set Word list
var wordListUncut = "";
var wordList = [];
function setWordList() {

}
// Set Puzzle Width & Height
var puzzleWidth = 20;
var puzzleHeight = 20;
function setWidth() {
	let value = parseInt(document.getElementById("setWidth").value);
	console.log("Width Value: " + value);
	if (value > 0) {
		puzzleWidth = value;
	}
	console.log("Puzzle Width: " + puzzleWidth);
	console.log("Puzzle Height: " + puzzleHeight);
}
function setHeight() {
	puzzleHeight = document.getElementById("setHeight").value;
	console.log("Puzzle Width: " + puzzleWidth);
	console.log("Puzzle Height: " + puzzleHeight);
}
// Set PuzzleTitle
var puzzleTitle = "";
function setTitle() {
	puzzleTitle = document.getElementById("puzzleTitle").value;
	console.log("Puzzle Title: " + puzzleTitle);
}
// Puzzle Generation Algorithm
function generatePuzzle() {

}
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
