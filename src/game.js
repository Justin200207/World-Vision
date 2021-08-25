var minIn = 400;
var earnings = 0;
var introMessage = 0;
var endMessage = 0;
var year = 0;
var outMsg = new Array();	
var onMsg;	

class Child {
	constructor(p_name, startAge){
		this.name = p_name;
		this.average = 75;
		this.age = startAge;
		this.daysWork = 0;
		this.daysSchool = 0;
	}
}


window.onLoad = newGame();

function newGame(){
	child1 = new Child("Jin", 7);
	child2 = new Child("Liling", 5);

	document.getElementById("c1A").innerHTML = child1.age;
	document.getElementById("c1E").innerHTML = child1.average+"%";

	document.getElementById("c2A").innerHTML = child2.age;
	document.getElementById("c2E").innerHTML = child2.average+"%";

	document.getElementById("outText").innerHTML = "Hello! Welcome to the Game!<br>Click 'Start' to start!";
	document.getElementById("earnings").innerHTML = "Monthly Income: $"+earnings+"/$"+minIn;

	document.getElementById("submit").innerHTML = "Start";	
	document.getElementById("year").style.visibility = "hidden";
	document.getElementById("earnings").style.visibility = "hidden";
	disableSelects();

}

function nextText(){
	switch(introMessage){
		case 0:
			document.getElementById("submit").innerHTML = "Continue";	
			introMessage++;
			document.getElementById("outText").innerHTML = "This game was created to take a look at and bring awareness to the struggles in the lives of children working in sweatshops.";
			break;
		case 1:
			introMessage++;
			document.getElementById("outText").innerHTML = "You play the part of a mother with 2 children in China, stuggling to make ends meet despite both you and your husband working.";
			break;
		case 2:
			introMessage++;
			document.getElementById("outText").innerHTML = "To pay for your basic nessessities, you send your children to work. They must provide you atleast an additional $"+minIn/2+" each per month, totalling $"+minIn+", until they are 18 and able to move out. They both make $1.50 per hour and work 11 hour days.";
			break;
		case 3:
			introMessage++;
			document.getElementById("outText").innerHTML = "The game lasts 13 rounds, until your youngest child is 18. Each round, you chose how many days a week they work and how many days they attend school.";
			break;
		case 4:
			introMessage++;
			document.getElementById("outText").innerHTML = "Sending them to work increases income. Sending them to school increases.average, improving the chances of moving on past factory work at 18.";
			break;
		case 5:
			introMessage++;
			document.getElementById("outText").innerHTML = "You must try to balance income with school. You want the best for them, and overloading them with school and work is bad for their health and leads to stress.";
			break;
		case 6:
			introMessage++;
			document.getElementById("outText").innerHTML = "Your choices will directly affect their future, so chose wisely.";
			break;
		case 7:
			document.getElementById("submit").innerHTML = "Simulate";
			document.getElementById("earnings").style.visibility = "visible";
			document.getElementById("year").style.visibility = "visible";
			enableSelects();
			document.getElementById("submit").setAttribute("onClick", "startSim()");
			document.getElementById("outText").innerHTML = "To begin, set the number of days your children attend school and work each week and click 'Simulate'.";
			break;
	}
}

function startSim(){
	if(earnings<minIn){
		document.getElementById("outText").innerHTML = "You Won't make enough money. Increase the number of days one or both of the children work. Remember, they must make atleast $"+minIn+" combined a month.";
	}else{
		document.getElementById("outText").innerHTML = "Simulating...";
		document.getElementById("submit").disabled = true;
		disableSelects();

		child1.age++;
		child2.age++;
		if(child1.age<18){
			simulateYear(child1);
		}else if(child1.age==18){
			simulateYear(child1);
			getJob(child1);
			minIn/=2;
			document.getElementById("earnings").innerHTML = "Monthly Income: $"+earnings+"/$"+minIn;
			document.getElementById("c1DS").selectedIndex = child1.daysSchool;
			document.getElementById("c1DW").selectedIndex = child1.daysWork;
		}
		if(child2.age<18){
			simulateYear(child2);
		}else if(child2.age==18){
			simulateYear(child2);
			getJob(child2);
			document.getElementById("c2DS").selectedIndex = child2.daysSchool;
			document.getElementById("c2DW").selectedIndex = child2.daysWork;
		}
		setTimeout(outputSim, 1500);
	}
}

function endGame(){
	switch(endMessage){
		case 0:
			disableSelects()
			document.getElementById("submit").innerHTML = "Continue";	
			endMessage++;
			document.getElementById("outText").innerHTML = "Both of your children are now grown up. Depending on how much.average they recieved, they are either continuing life in the sweatshop or are moving on to bigger and better things.";
			break;
		case 1:
			endMessage++;
			document.getElementById("outText").innerHTML = "As demonstrated, it is extremely hard for children to balance working to help support thier family, with attending school to recieve a proper.average.";
			break;
		case 2:
			endMessage++;
			document.getElementById("outText").innerHTML = "Unfortunately for many, it is not a choice they can make, as their family needs the extra income to survive.";
			break;
		case 3:
			document.getElementById("submit").innerHTML = "Thank you!";
			document.getElementById("outText").innerHTML = "Please continue browsing the site to learn more and find out what you can do to help.";
			break;
	}
}

function nothing(){}

function outputSim(){
	document.getElementById("c1A").innerHTML = child1.age;
	document.getElementById("c1E").innerHTML = child1.average+"%";

	document.getElementById("c2A").innerHTML = child2.age;
	document.getElementById("c2E").innerHTML = child2.average+"%";

	year++;
	document.getElementById("year").innerHTML = "Year: "+year;

	onMsg = 0;
	document.getElementById("submit").setAttribute("onClick", "outPutMessages()");
	document.getElementById("submit").disabled = false;
	document.getElementById("submit").innerHTML = "Next";
	outPutMessages();
}

function outPutMessages(){
	if(outMsg[onMsg]!=null){
		document.getElementById("outText").innerHTML = outMsg[onMsg];
		onMsg+=1;
	}else{
		document.getElementById("outText").innerHTML = "Check your results and set the days worked and days at school for next year. Click 'Simulate' to continue.";

		document.getElementById("submit").disabled = false;
		enableSelects();
		outMsg = new Array();
		if(child1.age<18){
			earnings = (child1.daysWork*1.5*11*4) + (child2.daysWork*1.5*11*4);
		}else{
			earnings = (child2.daysWork*1.5*11*4);
		}
		document.getElementById("earnings").innerHTML = "Monthly Income: $"+earnings+"/$"+minIn;

		if(child2.age==18){
			document.getElementById("submit").setAttribute("onClick", "endGame()");
			endGame();
		}else{
			document.getElementById("submit").innerHTML = "Simulate";
			document.getElementById("submit").setAttribute("onClick", "startSim()");
		}
	}
}

function simulateYear(cld){
	switch(cld.daysWork){
		case 0:
			break;
		case 1:
		case 2:
			if(cld.age<13){
				cld.average-=8;
				outMsg.push(cld.name+" is only "+cld.age+" and, although it is nessessary, should not be working. Working this young retracts from childrens.average as well as harms their mental and physical health.");
			}
			break;
		case 3:
		case 4:
			if(cld.age<13){
				cld.average-=8;
				outMsg.push(cld.name+" is only "+cld.age+" and, although it is nessessary, should not be working. Working this young retracts from childrens.average as well as harms their mental and physical health.");
			}else if(cld.age<15){
				cld.average-=5;
				outMsg.push(cld.name+" is only "+cld.age+". Working too often, no matter how muc the money is needed, hinders cildrens.average.");
			}
			break;
		case 5:
		case 6:
			if(cld.age<13){
				cld.average-=8;
				outMsg.push(cld.name+" is only "+cld.age+" and, although it is nessessary, should not be working. Working this young retracts from childrens.average as well as harms their mental and physical health.");
			}else{
				cld.average-=5;
				outMsg.push(cld.name+" worked "+cld.daysWork+" days a week. Working too often, no matter how muc the money is needed, hinders cildrens.average.");
			}	
			break;
		case 7:
			if(cld.age<13){
				cld.average-=5;
				outMsg.push(cld.name+" is only "+cld.age+" and, although it is nessessary, should not be working. Working this young retracts from childrens.average as well as harms their mental and physical health.");
			}else{
			cld.average-=5;
		}
			break;
	}
	switch(cld.daysSchool){
		case 0:
			break;
		case 1:
			outMsg.push("You sent "+cld.name+" to school "+cld.daysSchool+" days a week. Going to school is the best way for kids to learn and improve future chances of success.");
			break;
		case 2:
			outMsg.push("You sent "+cld.name+" to school "+cld.daysSchool+" days a week. Going to school is the best way for kids to learn and improve future chances of success.");
			break;
		case 3:
			cld.average+=1;
			outMsg.push("You sent "+cld.name+" to school "+cld.daysSchool+" days a week. Going to school is the best way for kids to learn and improve future chances of success.");
			break;
		case 4:
			cld.average+=1;
			outMsg.push("You sent "+cld.name+" to school "+cld.daysSchool+" days a week. Going to school is the best way for kids to learn and improve future chances of success.");
			break;
		case 5:
			cld.average+=2;
			outMsg.push("You sent "+cld.name+" to school "+cld.daysSchool+" days a week. Going to school is the best way for kids to learn and improve future chances of success.");
			break;
		case 6:
			cld.average+=2;
			outMsg.push("You sent "+cld.name+" to school "+cld.daysSchool+" days a week. Going to school is the best way for kids to learn and improve future chances of success.");
			break;
		case 7:
			cld.average+=2;
			outMsg.push("You sent "+cld.name+" to school "+cld.daysSchool+" days a week.");
			break;
	}
	if(cld.daysWork+cld.daysSchool==7){
		outMsg.push(cld.name+" went to school and worked a combined 7 days a week. Overworking children can lead to health problems, both physically and mentally.");
	}
	if(cld.average>=100){
		cld.average=100;
	}
	if(cld.average<=0){
		cld.average=0;
	}
}

function getJob(cld){
	if(cld.average>=0 && cld.average<=50){
		outMsg.push(cld.name+" did not attend enough school meaning they did not recieve a good enough education to pursue a better career.");
		outMsg.push(cld.name+" will continue to work in the factory.");
		cld.daysWork = 6;
		cld.daysSchool = 0;
	}else if(cld.average>50 && cld.average<=60){
		outMsg.push(cld.name+" got some.average, but not enogh to move on.");
		outMsg.push(cld.name+" will continue to work in the factory. Hopefully their minimal education will allow them to pursue higher positions atleast within the factory.");
		cld.daysWork = 6;
		cld.daysSchool = 0;
	}else if(cld.average>60 && cld.average<=70){
		outMsg.push(cld.name+" got a decent education.");
		outMsg.push(cld.name+" is able to leave the factory and find a job much better than what they had in in the factory.");
		cld.daysWork = 5;
		cld.daysSchool = 0;
	}else if(cld.average>70 && cld.average<=85){
		outMsg.push(cld.name+" got a good education.");
		outMsg.push(cld.name+" leaves the factory and continues thier schooling at university.");
		outMsg.push("This allows "+cld.name+" to get a great job and live a happy life.");
		cld.daysWork = 2;
		cld.daysSchool = 5;
	}else if(cld.average>85 && cld.average<=100){
		outMsg.push(cld.name+" got an amazing education.");
		outMsg.push(cld.name+" is able to attend a top university, leaving the factory to get into the job of their dreams.");
		cld.daysWork = 2;
		cld.daysSchool = 5;
	}
}

function checkSchedule(over){
	child1.daysWork = document.getElementById("c1DW").selectedIndex;
	child2.daysWork = document.getElementById("c2DW").selectedIndex;
	child1.daysSchool = document.getElementById("c1DS").selectedIndex;
	child2.daysSchool = document.getElementById("c2DS").selectedIndex;
	if(child1.daysWork+child1.daysSchool>7){
		if(over==0){
			document.getElementById("c1DS").selectedIndex = 7-child1.daysWork;
			child1.daysSchool = 7-child1.daysWork;
		}else{
			document.getElementById("c1DW").selectedIndex = 7-child1.daysSchool;
			child1.daysWork = 7-child1.daysSchool;
		}	
	}
	if(child2.daysWork+child2.daysSchool>7){
		if(over==0){
			document.getElementById("c2DS").selectedIndex = 7-child2.daysWork;
			child2.daysSchool = 7-child2.daysWork;
		}else{
			document.getElementById("c2DW").selectedIndex = 7-child2.daysSchool;
			child2.daysWork = 7-child2.daysSchool;
		}	
	}
	if(child1.age<18){
		earnings = (child1.daysWork*1.5*11*4) + (child2.daysWork*1.5*11*4);
	}else{
		earnings = (child2.daysWork*1.5*11*4);
	}
	document.getElementById("earnings").innerHTML = "Monthly Income: $"+earnings+"/$"+minIn;
}

function disableSelects(){
	document.getElementById("c1DW").disabled = true;
	document.getElementById("c1DS").disabled = true;
	document.getElementById("c2DW").disabled = true;
	document.getElementById("c2DS").disabled = true;
}

function enableSelects(){
	document.getElementById("c1DW").disabled = false;
	document.getElementById("c1DS").disabled = false;
	document.getElementById("c2DW").disabled = false;
	document.getElementById("c2DS").disabled = false;
}
