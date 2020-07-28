// WARNING: BEFORE MEGA-REVISION
/* Main Webapp Script (JavaScript) */ // Working
// Set Word list
var wordList = [];
function setWordList() {
	let wordListUncut = document.getElementById("wordList").value.toUpperCase().replace(/[^A-Z\n]/g, "");
	wordList = wordListUncut.split("\n").filter(el => {return el != "";});
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
				if (document.getElementById("nCheck").checked) {
				directions.push("N");
				}
			}
			if (originX > word.length) {
				if (document.getElementById("wCheck").checked) {
				directions.push("W");
				}
			}
			if (originY + word.length <= puzzleHeight) {
				if (document.getElementById("sCheck").checked) {
				directions.push("S");
				}
			}
			if (originX + word.length <= puzzleWidth) {
				if (document.getElementById("eCheck").checked) {
				directions.push("E");
				}
			}
			if ((originY > word.length) && (originX > word.length)) {
				if (document.getElementById("nwCheck").checked) {
				directions.push("NW");
				}
			}
			if ((originY > word.length) && (originX + word.length <= puzzleWidth)) {
				if (document.getElementById("neCheck").checked) {
				directions.push("NE");
				}
			}
			if ((originY + word.length <= puzzleWidth) && (originX > word.length)) {
				if (document.getElementById("swCheck").checked) {
				directions.push("SW");
				}
			}
			if ((originY + word.length <= puzzleWidth) && (originX + word.length <= puzzleWidth)) {
				if (document.getElementById("seCheck").checked) {
				directions.push("SE");
				}
			}
			console.log(directions);
			if (directions.length == 0) {
				continue;
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
							// Actually Set The Letter
							puzzleTable[originTableItemNum].l = letter;
						}
					}
				}
				// Add Answer Line
				answerLines.push({sX: originX, sY: originY, eX: letterX, eY: letterY, gX: goX, gY: goY});
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
	wordListDisplay();
	textDisplay();
	printCanvas();
}
// Show Puzzle Table Array As Text
function textDisplay() {
	var html = "";
	var lastY = 0;
	for (var i = 0; i < puzzleTable.length; i++) {
		if (lastY != puzzleTable[i].y) {
			html += "<br>"
		}
		html += puzzleTable[i].l + " "; // Just Have " " Since Spaces Look Nicer
		lastY = puzzleTable[i].y;
	}
	document.getElementById("textDisplay").innerHTML = html;
	document.getElementById("textDisplay").style.fontFamily = "monospace";
}
// Show On Canvas & Get Output Downloads
function printCanvas() {
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	c.width = puzzleWidth * 50;
	c.height = puzzleHeight * 50 + 75;
	// Puzzle Text
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.textAlign = "center";
	ctx.fillStyle = "#000";
	if (document.getElementById("puzzleFont").value != "") {
		ctx.font = "25px " + document.getElementById("puzzleFont").value;
	} else {
		ctx.font = "25px Arial"
	}
	for (var originTableItemNum = 0; originTableItemNum < puzzleTable.length; originTableItemNum++) {
		var letterObject = puzzleTable[originTableItemNum];
		ctx.fillText(letterObject.l, 50 * letterObject.x + 25, 50 * letterObject.y + 100);
	}
	if (document.getElementById("puzzleFont").value != "") {
		ctx.font = "40px " + document.getElementById("puzzleFont").value;
	} else {
		ctx.font = "40px Arial"
	}
	ctx.fillText(puzzleTitle, c.width / 2, 50);
	var imagePng = c.toDataURL('image/png');
	document.getElementById("imageDownload").href = imagePng.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
	// Answered Top Section
	ctx.clearRect(0, 0, c.width, c.height);
	for (var i = 0; i < answerLines.length; i++) {
		var line = answerLines[i];
		ctx.strokeStyle = "rgb(255, 102, 102)";
		ctx.lineWidth = 40;
		ctx.beginPath();
		ctx.moveTo(50 * line.sX + 25, 50 * line.sY + 90.625);
		ctx.lineTo(50 * line.eX + 25, 50 * line.eY + 90.625);
		ctx.stroke();
		ctx.closePath();
		ctx.beginPath();
		ctx.arc(50 * line.sX + 25, 50 * line.sY + 90.625, 0.390625, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.closePath();
		ctx.beginPath();
		ctx.arc(50 * line.eX + 25, 50 * line.eY + 90.625, 0.390625, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.closePath();
	}
		// Text Part Again
	ctx.textAlign = "center";
	ctx.fillStyle = "#000";
	if (document.getElementById("puzzleFont").value != "") {
		ctx.font = "25px " + document.getElementById("puzzleFont").value;
	} else {
		ctx.font = "25px Arial"
	}
	for (var originTableItemNum = 0; originTableItemNum < puzzleTable.length; originTableItemNum++) {
		var letterObject = puzzleTable[originTableItemNum];
		ctx.fillText(letterObject.l, 50 * letterObject.x + 25, 50 * letterObject.y + 100);
	}
	if (document.getElementById("puzzleFont").value != "") {
		ctx.font = "40px " + document.getElementById("puzzleFont").value;
	} else {
		ctx.font = "40px Arial"
	}
	ctx.fillText(puzzleTitle, c.width / 2, 50);
	// Overlaying Section
	// Overlay
	var answeredImagePng = c.toDataURL('image/png');
	document.getElementById("answeredImageDownload").href = answeredImagePng.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
}
// Display List Of Words
function wordListDisplay() {
	var html = "";
	orderedWordList = JSON.parse(JSON.stringify(wordList));
	orderedWordList.sort();
	for (var i = 0; i < orderedWordList.length; i++) {
		html += orderedWordList[i] + "<br>";
	}
	document.getElementById("wordListDisplay").innerHTML = html;
}
