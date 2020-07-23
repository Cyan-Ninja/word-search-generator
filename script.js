/* Main Webapp Script (JavaScript) */
// Set Word list
var wordList = [];
function setWordList() {
	let wordListUncut = document.getElementById("wordList").value;
	wordList = wordListUncut.split("\n");
	for (var cWord = 0; cWord < wordList.length; cWord++) {
		wordList[cWord] = wordList[cWord].replaceAll(" ", "").toUpperCase(); // Remove Spaces & Uppercase All
		/*if (wordList[cWord] == "") { // Remove Empty Items
			wordList.splice(cWord, 1);
		}*/ // Not Being Used (At Least Yet)
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
	//console.log("Set Puzzle Width: '" + puzzleWidth + "'");
	//console.log("Set Puzzle Height: '" + puzzleHeight + "'");
}
// Set Puzzle Title
var puzzleTitle = "";
function setTitle() {
	puzzleTitle = document.getElementById("puzzleTitle").value;
	//console.log("Set Puzzle Title: '" + puzzleTitle + "'");
}
// Mark Display Image Button
var markImage = false;
function markImageButton() {
	markImage = !markImage;
	console.log("Set Mark Image: '" + markImage + "'");
}
// Puzzle Generation Algorithm
/*	// Puzzle Table Array Search Function
function searchPuzzleTable() {

}*/ // BUG: IS THIS NEEDED?
	// Actual Puzzle Generation Function
function generatePuzzle() {
	// Run All Set Commands
	setWordList();
	setSize();
	setTitle();
	// Create Array With Coordinates and Letter Fills
	var puzzleTable = [];
	for (var y = 0; y < puzzleHeight; y++) {
		for (var x = 0; x < puzzleWidth; x++) {
			puzzleTable.push({x: x, y: y, l: ""});
		}
	}
	console.log(puzzleTable);

	// For Each Word, Search and Test
	for (var cWord = 0; cWord < wordList.length - 1; cWord++) {
		var word = wordList[cWord]; // Whole Word String
		console.log("Testing: '" + word + "' Length: '" + word.length + "'");

		// While Loop Choosing Coordinates Each Time
		var found = false; // True/False if Succeeded
		while (!found) {
			found = false;
			coordArrayItem = puzzleTable[Math.floor(Math.random() * puzzleTable.length)]; // Random Array Item For Coordinates
			console.log(coordArrayItem);
			let originX = coordArrayItem.x;
			let originY = coordArrayItem.y;

			// Test And Choose A Direction
				// Testing Direction By Puzzle Boundaries
					// Directions: North
			let dirN = false;
			if (originY + 1 >= word.length) {
				dirN = true;
				//console.log("N");
			}
					// Directions: East
			let dirE = false;
			if (originX + 1 >= word.length) {
				dirE = true;
				//console.log("E");
			}
					// Directions: West
			let dirW = false;
			if (originX + word.length >= puzzleWidth) {
				dirW = true;
				//console.log("W");
			}
					// Directions: South
			let dirS = false;
			if (originY + word.length <= puzzleHeight) {
				dirS = true;
				//console.log("S");
			}
				// Choose Direction
					// Make Array Of Possible Directions
			var directions = [];
			if (dirN) {
				directions.push("N");
			}
			if (dirE) {
				directions.push("E");
			}
			if (dirW) {
				directions.push("W");
			}
			if (dirS) {
				directions.push("S");
			}
			if (dirN && dirE) {
				directions.push("NE")
			}
			if (dirN && dirW) {
				directions.push("NW")
			}
			if (dirS && dirE) {
				directions.push("SE")
			}
			if (dirS && dirW) {
				directions.push("SW")
			}
					// Choose Random Direction From Possible Directions Array
			var direction = directions[Math.floor(Math.random() * directions.length)];
			console.log("Directions: '" + directions + "' Chosen: '" + direction + "'");

			// Check If The Tiles it Will Take Up Won't Fit With That Word
			var goX = 0;
			var goY = 0;
			if (direction = "N") {
				goX = 0;
				goY = 1;
			}
			if (direction = "E") {
				goX = 1;
				goY = 0;
			}
			if (direction = "W") {
				goX = -1;
				goY = 0;
			}
			if (direction = "S") {
				goX = 0;
				goY = -1;
			}
			if (direction = "NE") {
				goY = 1;
				goX = 1;
			}
			if (direction = "NW") {
				goY = 1;
				goX = -1;
			}
			if (direction = "SE") {
				goY = -1;
				goX = 1;
			}
			if (direction = "SW") {
				goY = -1;
				goX = -1;
			}
			goX = 0 - goX;
			goY = 0 - goY;

				// Test If Letters Fit
			var letters = word.split("");
					// Function to Test Letter:Coord Fills Against Original Puzzle Table
			function testLetter(testL, testX, testY) {
				// Script To Find Items From Puzzle Table Array Based On Coordinates
				var originalLetter = "";
				for (var cOriginTable = 0; cOriginTable < puzzleTable.length; cOriginTable++) {
					if (puzzleTable[cOriginTable].x == testX && puzzleTable[cOriginTable].y == testY) {
						originalLetter = puzzleTable[cOriginTable].l;
					}
				}
				// Finding If It Is Different Or Empty
				if (originalLetter == "" || originalLetter == testL) {
					return true;
				} else {
					return false;
				}
			}
			var isOkay = true;
			//console.log("Letters: '" + letters + "'");
			for (var cToTest = 0; cToTest < letters.length; cToTest++) {
				console.log(((goX * cToTest) + originX) + " : . : " + ((goY * cToTest) + originY));
				console.log(cToTest);
				if (testLetter(letters[cToTest], ((goX * cToTest) + originX), ((goY * cToTest) + originY)) != true) {
					isOkay = false;
				}
			}
			// Actually Fill If All Letters Are Okay
			console.log("Is Still Okay: '" + isOkay + "'");
			var found = true;
			if (isOkay) {
				for (var letterItem = 0; letterItem < letters.length; letterItem++) {
					// Coordinates Of Current Letter
					letter = letters[letterItem];
					testX = (goX * letterItem) + originX;
					testY = (goY * letterItem) + originY;
					// Script To Find Items From Puzzle Table Array Based On Coordinates & Change Their Letter Fills
					for (var cPuzzleTableItem = 0; cPuzzleTableItem < puzzleTable.length; cPuzzleTableItem++) {
						if (puzzleTable[cPuzzleTableItem].x == testX && puzzleTable[cPuzzleTableItem].y == testY) {
							puzzleTable[cPuzzleTableItem].l = letter;
						}
					}

					console.log(testX + " : " + testY);
				}
				found = true;
			} else {
				//found = false;
			}
		}
		console.log(puzzleTable);
		// TEMP: Script To Show Puzzle Table Array
		for (var i = 0; i < puzzleTable.length; i++) {
			if (puzzleTable[i].l == "") {
				puzzleTable[i].l = "█";
			}
		}
		var html = "";
		var lastY = 0;
		for (var i = 0; i < puzzleTable.length; i++) {
			if (lastY != puzzleTable[i].y) {
				html += "<br>"
			}
			html += puzzleTable[i].l + " ";
			lastY = puzzleTable[i].y;
		}
		document.getElementById("tempDisplay").innerHTML = html;
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
