cards = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20",
"21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40",
"41","42","43","44","45","46","47","48","49","50","51","52"];

values = [1,2,3,4,5,6,7,8,9,10,10,10,10,1,2,3,4,5,6,7,8,9,10,10,10,10,
1,2,3,4,5,6,7,8,9,10,10,10,10,1,2,3,4,5,6,7,8,9,10,10,10,10]

pointsM = [];
pointsP = [];

inGame=true;

var image2;
var faceDownCard;

$(document).ready(function() {
	shuffleVec();
	newGame();	
});

function newGame(){
	
    var image1 = document.createElement("img");
    image2 = document.createElement("img");
    var image3 = document.createElement("img");
    var image4 = document.createElement("img");
    cardName = "Deck/"+cards[0]+".png"
    pointsP.push(values[0]);
    image1.src = cardName;
    shiftVect();
    cardName = "Deck/0.png"
    faceDownCard = "Deck/"+cards[0]+".png"
    pointsM.push(values[0]);
    image2.src = cardName;
    shiftVect();
    cardName = "Deck/"+cards[0]+".png"
    pointsP.push(values[0]);
    image3.src = cardName;
    shiftVect();
    cardName = "Deck/"+cards[0]+".png"
    pointsM.push(values[0]);
    image4.src = cardName;
    shiftVect();
    document.getElementById("playerZone").appendChild(image1);
    document.getElementById("playerZone").appendChild(image3);
    document.getElementById("dealerZone").appendChild(image2);
    document.getElementById("dealerZone").appendChild(image4);
	result = countVector(pointsM);
	if(result===1){
		image2.src = faceDownCard;
		alert("You lose");
		inGame = false;
	}else{
		result = countVector(pointsP);
		if(result===1){
			stop();
			inGame = false;
		}
	}
}

function shuffleVec(){
	var j, x, i;
    for (i = cards.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = cards[i];
        cards[i] = cards[j];
        cards[j] = x;
        x = values[i];
        values[i] = values[j];
        values[j] = x;
    }
}

function shiftVect(){
	cards.shift();
	values.shift();
}

function count(aux){
	total = 0;
	totalA = 0;
	aux.forEach(function(entry) {
    	if(entry === 1){
    		total = total + 11;
    		totalA = totalA + 1;
    	}else{
    		total = total + entry;
    	}
	});
	if(total>21){
		if(totalA>0){
			for (i = 0 - 1; i<totalA ; i++) {
				total = total-10;
				if(total<=21){
					i=totalA;
				}
			}
		}
	}
	return total;
}

function countVector(aux){
	total = count(aux);
	if(total===21){
		return 1;
	}else if(total>21){
		return 2;
	}else{
		return 3;
	}
}

function reinicio(){
	var ia=document.getElementById("playerZone");
 	while(ia.hasChildNodes())
		ia.removeChild(a.firstChild);	
 	var player=document.getElementById("dealerZone");
 	while(player.hasChildNodes())
		player.removeChild(a.firstChild);	
}


function arrastrando(ev){
	ev.dataTransfer.setData("Date", ev.target.id);
    ev.dropEffect = "move";
}

function sobre(ev){
	ev.preventDefault();
    ev.dataTransfer.dropEffect = "link" //move copy
}

function soltar2(ev){
	ev.preventDefault();
	if(inGame){
		cardName = "Deck/"+cards[0]+".png"
		pointsP.push(values[0]);
		shiftVect();
		var image = document.createElement("img");
		image.src = cardName;
		image.style.visibility = 'visible';
		image.ondragstart=arrastrando(event);
		document.getElementById("playerZone").appendChild(image);
		result = countVector(pointsP);
		if(result===1){
			stop();
			inGame = false;
		}else if(result===2){
			image2.src = faceDownCard;
			alert("You lose");
			inGame = false;
		}else{
			if(cards===0){
				alert("Se acabarion las cartas");
				stop();
			}
		}
	}

}

function stop(){
	if(inGame){
		total = 0;
		while (count(pointsM) < 17 && cards.length>0) {
			var image = document.createElement("img");
	    	cardName = "Deck/"+cards[0]+".png"
	    	pointsM.push(values[0]);
	    	image.src = cardName;
	    	shiftVect();
	    	document.getElementById("dealerZone").appendChild(image);
		}
		image2.src = faceDownCard;
		result = countVector(pointsM);
		if(result === 1){
			console.log("Maquina: "+total);
			alert("You lose");
		}else if(result===2){
			console.log("Maquina: "+total);
			alert("You win");
		}else{
			finalCheck();
		}
		inGame = false;
	}
}

function finalCheck(){
	totalM = count(pointsM);
	totalP = count(pointsP);
	if(totalP>totalM){
		alert("You win");
	}else{
		alert("You lose");
	}
}

function reinicio(){
	inGame = true
	pointsM = [];
	pointsP = [];
	var playerZone = document.getElementById("playerZone");
	if ( playerZone.hasChildNodes() )
	{
		while ( playerZone.childNodes.length >= 1 )
		{
			playerZone.removeChild( playerZone.firstChild );
		}
	}

	var dealerZone = document.getElementById("dealerZone");
	if ( dealerZone.hasChildNodes() )
	{
		while ( dealerZone.childNodes.length >= 1 )
		{
			dealerZone.removeChild( dealerZone.firstChild );
		}
	}

	if(cards.length<4){
		cards = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20",
		"21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40",
		"41","42","43","44","45","46","47","48","49","50","51","52"];

		values = [1,2,3,4,5,6,7,8,9,10,10,10,10,1,2,3,4,5,6,7,8,9,10,10,10,10,
		1,2,3,4,5,6,7,8,9,10,10,10,10,1,2,3,4,5,6,7,8,9,10,10,10,10]

		shuffleVec();
		newGame();
	}else{
		newGame();
	}
}