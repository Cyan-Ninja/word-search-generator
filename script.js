/* Main Webapp Script (JavaScript) */
// Set Word list
var wordList = [];
function setWordList() {
	let wordListUncut = document.getElementById("wordList").value;
	//console.log("Set Word List Uncut: '" + wordListUncut + "'");
	wordList = wordListUncut.split("\n");
	for (var i = 0; i < wordList.length; i++) {
		wordList[i] = wordList[i].replaceAll("[^a-zA-Z]", "").toUpperCase();
	}
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
	console.log("Set Puzzle Width: '" + puzzleWidth + "'");
	console.log("Set Puzzle Height: '" + puzzleHeight + "'");
}
// Set Puzzle Title
var puzzleTitle = "";
function setTitle() {
	puzzleTitle = document.getElementById("puzzleTitle").value;
	console.log("Set Puzzle Title: '" + puzzleTitle + "'");
}
// Mark Display Image Button
var markImage = false;
function markImageButton() {
	markImage = !markImage;
	console.log("Set Mark Image: '" + markImage + "'");
}
// Puzzle Generation Algorithm
	// Puzzle Table Array Search Function
function searchPuzzleTable() {

}
	// Actual Puzzle Generation Function
function generatePuzzle() {
	// Run All Set Commands
	setWordList();
	setSize();
	setTitle();
	// Create Array With Coordinates and Letter Fills
	var puzzleTable = [];
	for (var x = 0; x < puzzleWidth; x++) {
		for (var y = 0; y < puzzleHeight; y++) {
			puzzleTable.push({x: x, y: y, l: ""});
		}
	}
	console.log(puzzleTable);

	// For Each Word, Search and Test
	for (var i = 0; i < wordList.length; i++) {
		var word = wordList[i]; // Whole Word String
		console.log("Testing Word: '" + word + "'");

		// While Loop Choosing Coordinates Each Time
		let found = false; // True/False if Succeeded
		while (!found) {
			coordArrayItem = puzzleTable[Math.floor(Math.random() * puzzleTable.length)]; // Random Array Item For Coordinates
			console.log(coordArrayItem);
			let originX = coordArrayItem.x;
			let originY = coordArrayItem.y;

			// Test Which Directions It Can Go
			console.log(word.length);
				// Directions: N
				// HERE
				// Directions: E
				// HERE
				// Directions: S
				// HERE
				// Directions: W
				// HERE

			found = true; // TEMP: This is just so the browser doesn't freeze on the half-developed loop.
		}
	}

	/* List of Steps */
	/*
		Create Array With Objects With [X: n, Y: n, L: n] For Coordinates + Filled Letter
		For Each Word {
			While (Until Correct Coords+Direction is Found & Set or Too many Tries) {
				Choose Random Coordinate

				var directionsAvailable = [];
				Check If Can Go Direction-E
					Add To directionsAvailable if True
				Check If Can Go Direction-SE
					Add To directionsAvailable if True
				Check If Can Go Direction-S
					Add To directionsAvailable if True
				Check If Can Go Direction-SW
					Add To directionsAvailable if True
				Check If Can Go Direction-W
					Add To directionsAvailable if True
				Check If Can Go Direction-NW
					Add To directionsAvailable if True
				Check If Can Go Direction-N
					Add To directionsAvailable if True
				Check If Can Go Direction-NE
					Add To directionsAvailable if True

				While (directionsAvailable != []) {
					Choose An Available Direction From The Array
					Test Each Letter The Word Would Take Up to See if It Fails
						Succeeds: Add Those Letters To The First Array of All Coordinates and Letter Fills & Break From Current Main EachWord Loop
						Fails: Remove This Direction From The Array & The While Loop Loops Again, But Without This Direction
				}
				// If The Code Reaches Here, It Can't Find Any Correct Direction // It Will Loop The Coordinate Search Loop
				// NOTE: I May Implement A Feature That Will Stop The Whole Generation & Alert That It Failed to Find Any Possible Placement For A Word In This Run
			}
		}
		Fill In Every Blank Space
	*/
}
// Canvas
	// Context
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
	// Example Background Colour
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, c.width, c.height);
	// Example Text
ctx.fillStyle = "#000";
ctx.font = "64px Arial";
ctx.fillText("I will be your image!", 50, 100);
