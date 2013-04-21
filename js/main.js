


// Eingabestring prüfen und in Datumsobjekt umwandeln
function zeiteingabe (inString)
{
	var Zeitobj = new Date(0);
	var ZeitArray = new Array();
	
	if (inString.length == 5)
	{
		ZeitArray = inString.split(':');
		Zeitobj.setHours(ZeitArray[0]);
		Zeitobj.setMinutes(ZeitArray[1]);
		return Zeitobj;
	}
}

// Formulardaten auslesen
function auslesenDate (idString)
{
	var tmpvar;
	
	tmpvar = document.getElementById(idString).value;
	
	return zeiteingabe(tmpvar);
}

// Zeit auslesen (auch z.B 96:00 96h)
// Ausgabe in Milisekunden 
function auslesenZeit (idString)
{
	var Stunden;
	var Minuten;
	var ms = 0;
	
	var ZeitArray = new Array();
	
	var inString = document.getElementById(idString).value;
	
	if (inString.length == 5)
	{
		ZeitArray = inString.split(':');
		Stunden = ZeitArray[0];
		Minuten = ZeitArray[1];
		
		ms = hmsToms(Stunden, Minuten, 0);
		return ms;
	}
}


// Hauptfunktion
function main ()
{
	// Variablen
	var SysZeitObj = new Date();
	var gekommenZeitObj = new Date();
	var zuleistenZeit = 0;
	var gehenZeitObj = new Date(0);
	var PausenZeit = 0;
	var ms = 0;
	var Stunden = 0.0;
	var Minuten = 0.0;
	var Sekunden = 0.0;
	var Zeit = new Array();
	
	// 1. Step Formulardaten auslesen
	zuleistenZeit = auslesenZeit("tf_arbeiten");
	PausenZeit = auslesenZeit("tf_pause");
	
	////console.log("DEBUG: zuleisten: " + zuleistenZeit);
	
	//Stunden setzen
	Stunden = auslesenDate("tf_gekommen").getHours();
	gekommenZeitObj.setHours(Stunden);
	
	
	//Minuten setzen
	Minuten = auslesenDate("tf_gekommen").getMinutes();
	gekommenZeitObj.setMinutes(Minuten);
	
	//Sekunden auf null setzen 
	gekommenZeitObj.setSeconds(0);
	////console.log("DEBUG: gekommen: " + gekommenZeitObj.toLocaleString());
	
	
	// 2. Step Werte berechnen
	
	//gehen ausrechnen 
	ms = gekommenZeitObj.getTime() + zuleistenZeit + PausenZeit;
	gehenZeitObj.setTime(ms);
	////console.log( "DEBUG: gehen: " + gehenZeitObj.toLocaleString());
	
	//Restzeit ausrechnen
	ms = gehenZeitObj.getTime() - SysZeitObj.getTime();
	
	Zeit = msTohms(ms);
	Stunden = Zeit[0];
	Minuten = Zeit[1];
	Sekunden = Zeit[2]; 
	
	////console.log( "DEBUG: noch: " + Stunden + "h " + Minuten +"min " + Sekunden + "sec" );
	
	// 3. Step Werte ausgeben
	
	document.getElementById("countdown").innerHTML = (Stunden + "h " + Minuten +"min " + Sekunden + "sec");
	document.getElementById("gehenzeit").innerHTML = (gehenZeitObj.getHours() + ":" + gehenZeitObj.getMinutes()) + "Uhr";
}  

//Umrechnen h:m:s in ms
function hmsToms (h, min, sec) 
{
	var ms = 0;
	
	//Leere Variablen definieren

	if (h == "undefined" )
	{
	h = 0;
	}
	
	if (min == "undefined") 
	{
	min = 0;
	}
	
	if (sec == "undefined") 
	{
	sec = 0;
	}
	
	ms= (sec * 1000) + (min * 60000) + (h * 3600000);
	
	return ms;
}

//Umrechnen ms in h:m:s Ruckgabewert als Array 
function msTohms (ms)
{
	// Array für Rückgabe
	var hms = new Array();
	
	hms[0] = 0; //Stunden
	hms[1] = 0; //Minuten
	hms[2] = 0; //Sekunden
	
	hms[0] = Math.floor(ms / 3600000);
	hms[1] = Math.floor((ms - (hms[0] * 3600000)) / 60000);
	hms[2] = Math.floor((ms - ((hms[0] * 3600000) + (hms[1] * 60000))) / 1000);
	
	return hms;
}

//Zeitgeber
function takt ()
{
	
	window.setInterval("main()", 1000);
	
}	