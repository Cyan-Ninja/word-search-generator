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
