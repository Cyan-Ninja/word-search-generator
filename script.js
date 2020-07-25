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
// Puzzle Generation Algorithm
var puzzleTable = [];
var answerLines = [];
function generatePuzzle() {
	// Run All Set Commands
	setWordList();
	setSize();
	setTitle();
	answerLines = [];
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
					for (var originTableItemNum = 0; originTableItemNum < puzzleTable.length; originTableItemNum++) {
						if (puzzleTable[originTableItemNum].x == letterX && puzzleTable[originTableItemNum].y == letterY) {
							// Continue Here
							if ((puzzleTable[originTableItemNum].l == "") || (puzzleTable[originTableItemNum].l == letter)) {
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
					for (var originTableItemNum = 0; originTableItemNum < puzzleTable.length; originTableItemNum++) {
						if (puzzleTable[originTableItemNum].x == letterX && puzzleTable[originTableItemNum].y == letterY) {
							// Continue Here
							puzzleTable[originTableItemNum].l = letter;
							answerLines.push({x: letterX, y: letterY});
						}
					}
				}

				found = true;
			}
		}
	}
	console.log("Ending Table:");
	console.log(puzzleTable);
	function fillEmptyLetters() {
		for (var i = 0; i < puzzleTable.length; i++) {
			if (puzzleTable[i].l == "") {
				let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "W", "Z"];
				puzzleTable[i].l = alphabet[Math.floor(Math.random() * alphabet.length)]
			}
		}
	}
	fillEmptyLetters();
	printCanvas();

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
// Show On Canvas & Get Output Downloads
function printCanvas() {
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.textAlign = "center";
	ctx.fillStyle = "#111";
	ctx.font = "32px Arial";
	for (var i = 0; i < answerLines.length; i++) {
		var line = answerLines[i];
		ctx.fillStyle = "#a11";
		ctx.font = "48px Arial";
		ctx.fillText("⚪", 1000/puzzleWidth * line.x + (500 / puzzleWidth), 1000/puzzleWidth * line.y + 131.25);
	}
	ctx.fillStyle = "#111";
	ctx.font = "32px Arial";
	for (var originTableItemNum = 0; originTableItemNum < puzzleTable.length; originTableItemNum++) {
		var letterObject = puzzleTable[originTableItemNum];
		ctx.fillText(letterObject.l, 1000/puzzleWidth * letterObject.x + (500 / puzzleWidth), 1000/puzzleWidth * letterObject.y + 125);
	}
	ctx.fillStyle = "#111";
	ctx.font = "64px Arial";
	console.log(1000/puzzleTitle.length);
	ctx.fillText(puzzleTitle, 500, 64);
	var answeredImagePng = c.toDataURL('image/png');
	document.getElementById("answeredImageDownload").href = answeredImagePng.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
}
	// Copy Text

	// Copy Markdown
