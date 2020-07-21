/* Main Webapp Script (JavaScript) */
// Set Word list
var wordList = [];
function setWordList() {
	let wordListUncut = document.getElementById("wordList").value;
	console.log(wordListUncut);
	wordList = wordListUncut.split("\n");
	console.log(wordList);
}
// Set Puzzle Width & Height
var puzzleWidth = 20;
var puzzleHeight = 20;
function setSize() {
	let value = parseInt(document.getElementById("setWidth").value);
	if (value > 0) {
		puzzleWidth = value;
	} else {
		puzzleWidth = 20;
	}
	value = parseInt(document.getElementById("setHeight").value);
	if (value > 0) {
		puzzleHeight = value;
	} else {
		puzzleHeight = 20;
	}
	console.log("Puzzle Width Set: " + puzzleWidth);
	console.log("Puzzle Height Set: " + puzzleHeight);
}
// Set Puzzle Title
var puzzleTitle = "";
function setTitle() {
	puzzleTitle = parseInt(document.getElementById("puzzleTitle").value);
	console.log("Puzzle Title Set: " + puzzleTitle);
}
// Mark Display Image Button
var markImage = false;
function markImageButton() {
	markImage = !markImage;
	console.log("Mark Image Set: " + markImage);
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
