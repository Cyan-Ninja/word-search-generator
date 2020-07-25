/* Main Webapp Script (JavaScript) */ // Working
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
var puzzleTable = [];
function generatePuzzle() {
	// Run All Set Commands
	setWordList();
	setSize();
	setTitle();
	// Create Array With Coordinates and Letter Fills
	puzzleTable = [];
	for (var y = 0; y < puzzleHeight; y++) {
		for (var x = 0; x < puzzleWidth; x++) {
			puzzleTable.push({x: x, y: y, l: ""});
		}
	}
	console.log("Starting Table:");
	console.log(puzzleTable);
	console.log(wordList);
	// For Each Word, Search and Test
	for (var wordItemNum = 0; wordItemNum < wordList.length; wordItemNum++) {
		word = wordList[wordItemNum];
		console.log("'" + word + "' 	Length: " + word.length);
		// While Loop To Check Coordinates and Directions Until Found
		var found = false;
		while (!found) {
			originTableItem = puzzleTable[Math.floor(Math.random() * puzzleTable.length)]; // Random Array Item For Coordinates
			originX = originTableItem.x;
			originY = originTableItem.y;
			console.log("Word: " + word + "  OriginXY: " + originX + ":" + originY);
			// Get Direction
			var directions = [];
			if (originY > word.length) {
				directions.push("N");
			}
			if (originX > word.length) {
				directions.push("W");
			}
			if (originY + word.length <= puzzleHeight) {
				directions.push("S");
			}
			if (originX + word.length <= puzzleWidth) {
				directions.push("E");
			}
			if ((originY > word.length) && (originX > word.length) && (document.getElementById("diagonalsCheck").checked)) {
				directions.push("NW");
			}
			if ((originY > word.length) && (originX + word.length <= puzzleWidth) && (document.getElementById("diagonalsCheck").checked)) {
				directions.push("NE");
			}
			if ((originY + word.length <= puzzleWidth) && (originX > word.length) && (document.getElementById("diagonalsCheck").checked)) {
				directions.push("SW");
			}
			if ((originY + word.length <= puzzleWidth) && (originX + word.length <= puzzleWidth) && (document.getElementById("diagonalsCheck").checked)) {
				directions.push("SE");
			}
			var direction = directions[Math.floor(Math.random() * directions.length)];
			var goX = 0;
			var goY = 0;
			if (direction == "N") {
				goY = -1;
			}
			if (direction == "W") {
				goX = 1;
			}
			if (direction == "S") {
				goY = 1;
			}
			if (direction == "E") {
				goY = -1;
			}
			if (direction == "NW") {
				goX = 1;
				goY = -1;
			}
			if (direction == "NE") {
				goX = -1;
				goY = -1;
			}
			if (direction == "SW") {
				goX = 1;
				goY = 1;
			}
			if (direction == "SE") {
				goX = -1;
				goY = 1;
			}
			//console.log("goX: " + goX + "  goY: " + goY + "   Dir: " + direction + "  Dirs: " + directions);
			// Test Each Letter's Validity
			var isOkay = true; // If True, All Letters Succeeded
			var letters = word.split("");
			for (var letterItemNum = 0; letterItemNum < letters.length; letterItemNum++) {
				var letter = letters[letterItemNum];
				var letterX = (goX * letterItemNum) + originX;
				var letterY = (goY * letterItemNum) + originY;
				//console.log("Testing Letter: " + letter + "  XY: " + letterX + ":" + letterY);
				if (letterX < 1 || letterX > puzzleWidth - 1 || letterY < 1 || letterY > puzzleHeight - 1) {
					isOkay = false;
				} else {
					for (var OriginTableItemNum = 0; OriginTableItemNum < puzzleTable.length; OriginTableItemNum++) {
						if (puzzleTable[OriginTableItemNum].x == letterX && puzzleTable[OriginTableItemNum].y == letterY) {
							// Continue Here
							if ((puzzleTable[OriginTableItemNum].l == "") || (puzzleTable[OriginTableItemNum].l == letter)) {
								// It Is Valid & Nothing Should Happen
							} else {
								isOkay = false; // It Is Not Valid & It Should Not Continue
							}
						}
					}
				}
			}
			console.log("Is Okay?: " + isOkay);
			// If They Are All Valid, 'isOkay' Is True & All Fills Be Set
			if (isOkay) {
				for (var letterItemNum = 0; letterItemNum < letters.length; letterItemNum++) {
					var letter = letters[letterItemNum];
					var letterX = (goX * letterItemNum) + originX;
					var letterY = (goY * letterItemNum) + originY;
					for (var OriginTableItemNum = 0; OriginTableItemNum < puzzleTable.length; OriginTableItemNum++) {
						if (puzzleTable[OriginTableItemNum].x == letterX && puzzleTable[OriginTableItemNum].y == letterY) {
							// Continue Here
							puzzleTable[OriginTableItemNum].l = letter;
						}
					}
				}
				found = true;
			}
		}
	}
	console.log("Ending Table:");
	console.log(puzzleTable);
	tempDisplay();

	/* List of Steps */
	/*
		Create Array With Objects With [X: n, Y: n, L: n] For Coordinates + Filled Letter
		For Each Word {
			While (Until Correct Coords+Direction is Found & Set or Too many Tries) {
				Choose Random Coordinate

				Get & Choose Directions (With 'goN's)

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
// TEMP: Script To Show Puzzle Table Array
function tempDisplay() {
	for (var i = 0; i < puzzleTable.length; i++) {
		if (puzzleTable[i].l == "") {
			puzzleTable[i].l = "█"; // It Is █ To Shown Empty Cells
		}
	}
	var html = "";
	var lastY = 0;
	for (var i = 0; i < puzzleTable.length; i++) {
		if (lastY != puzzleTable[i].y) {
			html += "<br>"
		}
		html += puzzleTable[i].l + " "; // Just Have " " Since Spaces Look Nicer
		lastY = puzzleTable[i].y;
	}
	document.getElementById("tempDisplay").innerHTML = html;
	document.getElementById("tempDisplay").style.fontFamily = "monospace";
}
generatePuzzle();
tempDisplay();
console.log("- Default Run -");
// Canvas
	// Context
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
	// Example Background Colour
ctx.fillStyle = "#044";
ctx.fillRect(0, 0, c.width, c.height);
	// Example Text
ctx.fillStyle = "#dee";
ctx.font = "64px Arial";
ctx.fillText("I will be your image!", 50, 100);
