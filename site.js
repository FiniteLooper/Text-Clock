//Global declarations
var $everything, isWebkit, timer, now, hour, minute, minuteStr, second, secondStr, morning;
//Global values
var debug=false, onClass="on", fadeSpeed=300, delayTime=30;

//on page load...
$(function(){
	$everything = $("#container").children("span");
	
	//fade everything in on a delay
	$everything.each(function(i,el){
		var delay=i*delayTime;
		setTimeout(function(){
			$(el).fadeTo(fadeSpeed,1);
		},delay);
	});
	
	//do first update when the intro animation is complete
	setTimeout(function(){
		$everything.filter(".label").addClass(onClass);//.fadeTo(fadeSpeed,1);
		//update everything initally
		tick();
		updateHours();
		updateMinutes();
		updateSeconds();
		
		//kick off the timer
		timer = setInterval(function(){
			tick();
		},1000);
	},($everything.length*delayTime));
});

//this is called once a second
function tick(){
	//get the time
	now = new Date();
	hour = now.getHours();
	minute = now.getMinutes();
	second = now.getSeconds();
	
	//convert minutes and seconds to strings
	minuteStr = minute.toString();
	secondStr = second.toString();
	
	//only update minutes & hours when needed
	if(second==0) updateMinutes();
	if(minute==0) updateHours();
	
	//always update the seconds
	updateSeconds();
	
	//put the time to the console
	if(debug && window.console) console.log(hour,minute,second,morning)
	
}

function updateSeconds(){
	var secondIDs;
	
	//set the current second
	if(secondStr.length > 1 && secondStr[0] != "1"){
		//twenties, thirties, forties, fifties
		secondIDs = "#seconds_tens"+secondStr[0];
		if(secondStr[1]!="0") secondIDs += ",#seconds"+secondStr[1];
	}else{
		//single digits and teens (1-19)
		if(secondStr[1]!="0" || secondStr=="10") secondIDs="#seconds"+secondStr;
	}
	
	//remove the previous active class on the seconds
	$everything.filter(".seconds").removeClass(onClass);
	
	//add the class to the correct element(s)
	$(secondIDs).addClass(onClass);
}

function updateMinutes(){
	var minuteIDs;
	
	//set the current minute
	if(minuteStr.length > 1 && minuteStr[0] != "1"){
		//twenties, thirties, forties, fifties
		minuteIDs = "#minutes_tens"+minuteStr[0];
		if(minuteStr[1]!="0") minuteIDs += ",#minutes"+minuteStr[1];
	}else if(minuteStr == "0"){
		//zero minutes
		minuteIDs = "#oclock";
	}else{
		//single digits and teens
		if(minuteStr.length==1) minuteIDs = "#oh,";
		if(minuteStr[1]!="0" || minuteStr=="10") minuteIDs += "#minutes"+minuteStr;
	}
	
	//remove the previous  active class on the minutes
	$everything.filter(".minutes, #oh, #oclock").removeClass(onClass);
	
	//add the class to the correct element(s)
	$(minuteIDs).addClass(onClass);
}

function updateHours(){
	var hourIDs;
	
	//set AM/PM
	morning = (hour < 12 || hour == 24) ? true : false;
	
	//convert to 12 hour time
	if(hour > 12) hour -= 12;
	
	//set the current hour
	hourIDs = "#hour"+hour;
	
	//set AM/PM
	if(morning){
		hourIDs += ",#am";
	}else{
		hourIDs += ",#pm";
	}
	
	//remove the previous active class on the hours and am/pm
	$everything.filter(".hours,#am,#pm").removeClass(onClass);
	
	//add the class to the correct elements
	$(hourIDs).addClass(onClass);
}