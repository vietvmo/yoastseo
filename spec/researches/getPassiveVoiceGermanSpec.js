import passiveVoice from "../../src/researches/getPassiveVoice.js";
import Paper from "../../src/values/Paper.js";

describe( "detecting passive voice in sentences with irregularParticiples", function() {
	it( "does not return passive for an irregular directly followed by 'sein'", function() {
		var paper = new Paper( "Ich werde geschwommen sein.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	} );
	it( "returns passive voice for an irregular not directly followed by 'sein'", function() {
		var paper = new Paper( "Es wird geschwommen worden sein.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	} );

	it( "does not return passive voice for an irregular directly followed by 'haben'", function() {
		var paper = new Paper( "Wir werden geschlossen haben.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	} );

	it( "returns passive voice for an irregular not directly followed by 'haben'", function() {
		var paper = new Paper( "Es wird geschlossen worden sein.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	} );

	it( "returns passive voice for an irregular without 'haben' or 'sein'", function() {
		var paper = new Paper( "Es wird geschlossen.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	} );
} );

describe( "detecting passive voice in sentences with regular participles", function() {
	it( "returns passive voice for a participle with 'ge' without 'haben' or 'sein'", function() {
		var paper = new Paper( "Es wird gekauft.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	} );

	it( "returns passive voice for a participle with 'ge' directly followed by 'haben'", function() {
		var paper = new Paper( "Es wird gekauft haben.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	} );
} );

describe( "not detecting passive voice in active sentences", function() {
	it( "does not return passive for a sentence without a passive auxiliary", function() {
		var paper = new Paper( "Es ist geschlossen.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	} );

	it( "filters out non-participles if they are followed by a punctuation mark", function() {
		var paper = new Paper( "Es wird geburtsakt.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	} );
} );

describe( "detecting passive voice in all passive verb tenses and moods", function() {
	it( "does return passive for Pr??sens Indikativ", function() {
		var paper = new Paper( "Es wird gekauft.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	} );

	it( "does return passive for Pr??sens Konjunktiv I", function() {
		var paper = new Paper( "Es wird werde gekauft.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	} );

	it( "does return passive for Pr??teritum Indikativ", function() {
		var paper = new Paper( "Es wurde gekauft.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	} );

	it( "does return passive for Pr??teritum Konjunktiv II", function() {
		var paper = new Paper( "Es w??rde gekauft.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	} );

	it( "does return passive for Perfekt Indikativ", function() {
		var paper = new Paper( "Es ist gekauft worden.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	} );

	it( "does return passive for Perfekt Konjunktiv I", function() {
		var paper = new Paper( "Es sei gekauft worden.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	} );

	it( "does return passive for Plusquamperfekt Indikativ", function() {
		var paper = new Paper( "Es war gekauft worden.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	} );

	it( "does return passive for Plusquamperfekt Konjunktiv II", function() {
		var paper = new Paper( "Es w??re gekauft worden.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	} );

	it( "does return passive for Futur I Indikativ", function() {
		var paper = new Paper( "Es wirst gekauft werden.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	} );

	it( "does return passive for Futur I Konjunktiv I", function() {
		var paper = new Paper( "Es werdest gekauft werden.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	} );

	it( "does return passive for Futur I Konjunktiv II", function() {
		var paper = new Paper( "Es w??rdest gekauft werden.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	} );

	it( "does return passive for Futur II Indikativ", function() {
		var paper = new Paper( "Es wird gekauft worden sein.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	} );

	it( "does return passive for Futur II Konjunktiv I", function() {
		var paper = new Paper( "Es werde gekauft worden sein.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	} );

	it( "does return passive for Futur II Konjunktiv II", function() {
		var paper = new Paper( "Es w??rde gekauft worden sein.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	} );
} );

describe( "not detecting passive voice in all active verb tenses and moods", function() {
	it( "does not return passive for Pr??sens Indikativ", function() {
		var paper = new Paper( "Er kauft.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	} );

	it( "does not return passive for Pr??sens Konjunktiv I", function() {
		var paper = new Paper( "Er kaufe.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	} );

	it( "does not return passive for Pr??teritum Indikativ", function() {
		var paper = new Paper( "Er kaufte.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	} );

	it( "does not return passive for Pr??teritum Konjunktiv II", function() {
		var paper = new Paper( "Er kaufte.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	} );

	it( "does not return passive for Perfekt Indikativ", function() {
		var paper = new Paper( "Er hat gekauft.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	} );

	it( "does not return passive for Perfekt Konjunktiv I", function() {
		var paper = new Paper( "Er habe gekauft.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	} );

	it( "does not return passive for Plusquamperfekt Indikativ", function() {
		var paper = new Paper( "Er hatte gekauft.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	} );

	it( "does not return passive for Plusquamperfekt Konjunktiv II", function() {
		var paper = new Paper( "Er h??tte gekauft.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	} );

	it( "does not return passive for Futur I Indikativ", function() {
		var paper = new Paper( "Er wird kaufen.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	} );

	it( "does not return passive for Futur I Konjunktiv I", function() {
		var paper = new Paper( "Er werde kaufen.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	} );

	it( "does not return passive for Futur I Konjunktiv II", function() {
		var paper = new Paper( "Er w??rde kaufen.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	} );

	it( "does not return passive for Futur II Indikativ", function() {
		var paper = new Paper( "Er wird gekauft haben.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	} );

	it( "does not return passive for Futur II Konjunktiv I", function() {
		var paper = new Paper( "Er werde gekauft haben.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	} );

	it( "does not return passive for Futur II Konjunktiv II", function() {
		var paper = new Paper( "Er w??rde gekauft haben.", { locale: "de_DE" } );
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	} );
} );
