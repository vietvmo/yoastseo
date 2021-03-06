import changePaperFactory from "../specHelpers/paperChanger";

import Paper from "../../src/values/Paper.js";
import Researcher from "../../src/researcher";

describe( "gets the sentence beginnings and the count of consecutive duplicates.", function() {
	const researcher = new Researcher( new Paper() );
	const changePaper = changePaperFactory( researcher );

	const getSentenceBeginnings = researcher.getResearch.bind( researcher, "getSentenceBeginnings" );

	it( "returns an object with sentence beginnings and counts for two sentences in English starting with different words.", function() {
		changePaper( { text: "How are you? Bye!", locale: "en_US" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "how" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 1 );
		expect( getSentenceBeginnings()[ 1 ].word ).toBe( "bye" );
		expect( getSentenceBeginnings()[ 1 ].count ).toBe( 1 );
	} );

	it( "returns an object with sentence beginnings and counts for two sentences in English starting with the same word.", function() {
		changePaper( { text: "Hey, hey! Hey.", locale: "en_US" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "hey" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 2 );
	} );

	it( "returns an object with sentence beginnings and counts for four sentences in English , the first two starting with the same word. The fourth is starting with the same word as the first two. " +
		"The count for this word should be reset.", function() {
		changePaper( { text: "Hey, hey! Hey. Bye. Hey.", locale: "en_US" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "hey" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 2 );
		expect( getSentenceBeginnings()[ 1 ].word ).toBe( "bye" );
		expect( getSentenceBeginnings()[ 1 ].count ).toBe( 1 );
		expect( getSentenceBeginnings()[ 2 ].word ).toBe( "hey" );
		expect( getSentenceBeginnings()[ 2 ].count ).toBe( 1 );
	} );

	it( "returns an object with sentence beginnings and counts for three sentences in English all starting with one of the exception words.", function() {
		changePaper( { text: "The boy, hey! The boy. The boy.", locale: "en_US" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "the boy" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 3 );
	} );

	it( "returns an object with sentence beginnings and counts for three sentences in English all starting with one of the exception words. The second word of all sentences is also in the list " +
		"of exception words, which should not matter.", function() {
		changePaper( { text: "One, two, three. One, two, three. One, two, three.", locale: "en_US" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "one two" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 3 );
	} );

	it( "returns an object with sentence beginnings and counts based on the default (English) when no locale is included.", function() {
		changePaper( { text: "The boy, hey! The boy. The boy." } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "the boy" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 3 );
	} );

	it( "returns only an exclusion word, if that is the only word in a sentences (English", function() {
		changePaper( { text: "A." } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "a" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 1 );
	} );

	it( "returns an object with sentence beginnings and counts based on the default (English) when a non-existing locale is included.", function() {
		changePaper( { text: "The boy, hey! The boy. The boy.", locale: "xx_yy" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "the boy" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 3 );
	} );

	it( "returns an object with sentence beginnings and counts for two sentences in French starting with different words.", function() {
		changePaper( { text: "Sur le pont d'Avignon. Libert??, ??galit??, fraternit??. ", locale: "fr_FR" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "sur" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 1 );
		expect( getSentenceBeginnings()[ 1 ].word ).toBe( "libert??" );
		expect( getSentenceBeginnings()[ 1 ].count ).toBe( 1 );
	} );

	it( "returns an object with sentence beginnings and counts for two sentences in French starting with the same word.", function() {
		changePaper( { text: "Bonjour, tout le monde! Bonjour.", locale: "fr_FR" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "bonjour" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 2 );
	} );

	it( "returns an object with sentence beginnings and counts for three sentences in French all starting with one of the exception words.", function() {
		changePaper( { text: "La vache qui rit. La vache qui pleure. La vache qui vole.", locale: "fr_FR" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "la vache" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 3 );
	} );

	it( "returns an object with sentence beginnings and counts for sentences in French that start with a character with a diacritic.", function() {
		changePaper( { text: "?? Paris, certaines prisons sont rest??es c??l??bres. ?? Paris, certaines prisons sont rest??es c??l??bres. ?? Paris, certaines prisons sont rest??es c??l??bres.", locale: "fr_FR" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "??" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 3 );
	} );

	it( "returns an object with sentence beginnings and counts for two sentences in German starting with different words.", function() {
		changePaper( { text: "Ich bin wie du. Auf wiedersehen. ", locale: "de_DE" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "ich" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 1 );
		expect( getSentenceBeginnings()[ 1 ].word ).toBe( "auf" );
		expect( getSentenceBeginnings()[ 1 ].count ).toBe( 1 );
	} );

	it( "returns an object with sentence beginnings and counts for two sentences in German starting with the same word.", function() {
		changePaper( { text: "Hallo, hallo! Hallo.", locale: "de_DE" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "hallo" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 2 );
	} );

	it( "returns an object with sentence beginnings and counts for three sentences in German all starting with one of the exception words.", function() {
		changePaper( { text: "Eine kleine Nachtmusik. Eine kleine Geige. Eine kleine Wolke.", locale: "de_DE" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "eine kleine" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 3 );
	} );

	it( "returns an object with sentence beginnings and counts for sentences in German that start with a character with a diacritic.", function() {
		changePaper( { text: "??sterreich ist ein sch??nes Land. ??sterreich ist ein sch??nes Land. ??sterreich ist ein sch??nes Land.", locale: "de_DE" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "??sterreich" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 3 );
	} );

	it( "returns an object with sentence beginnings and counts for two sentences in Spanish starting with different words.", function() {
		changePaper( { text: "Vamos a la playa. Muy buenos. ", locale: "es_ES" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "vamos" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 1 );
		expect( getSentenceBeginnings()[ 1 ].word ).toBe( "muy" );
		expect( getSentenceBeginnings()[ 1 ].count ).toBe( 1 );
	} );

	it( "returns an object with sentence beginnings and counts for two sentences in Spanish starting with the same word.", function() {
		changePaper( { text: "Que si, Que no. Que nunca te decides.", locale: "es_ES" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "que" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 2 );
	} );

	it( "returns an object with sentence beginnings and counts for three sentences in Spanish all starting with one of the exception words.", function() {
		changePaper( { text: "Aquellas peque??as cosas. Aquellas peque??as decisiones. Aquellas peque??as ideas.", locale: "es_ES" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "aquellas peque??as" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 3 );
	} );

	it( "returns an object with sentence beginnings and counts for sentences in Spanish that start with a character with a diacritic.", function() {
		changePaper( { text: "??frica es un gran continente. ??frica es un gran continente. ??frica es un gran continente.", locale: "es_ES" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "??frica" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 3 );
	} );

	it( "returns an object with sentence beginnings and counts for two sentences in Dutch starting with different words.", function() {
		changePaper( { text: "Hallo wereld. Hoe gaat het? ", locale: "nl_NL" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "hallo" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 1 );
		expect( getSentenceBeginnings()[ 1 ].word ).toBe( "hoe" );
		expect( getSentenceBeginnings()[ 1 ].count ).toBe( 1 );
	} );

	it( "returns an object with sentence beginnings and counts for two sentences in Dutch starting with the same word.", function() {
		changePaper( { text: "Hallo wereld. Hallo mensheid.", locale: "nl_NL" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "hallo" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 2 );
	} );

	it( "returns an object with sentence beginnings and counts for three sentences in Dutch all starting with one of the exception words.", function() {
		changePaper( { text: "Het is een nacht die je normaal alleen in films ziet. Het is een nacht die wordt bezongen in het mooiste lied. Het is een nacht waarvan ik dacht dat ik 'm nooit beleven zou", locale: "nl_NL" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "het is" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 3 );
	} );

	it( "returns an object with sentence beginnings and counts for two sentences in Italian starting with different words.", function() {
		changePaper( { text: "Volare, oh oh. Cantare, oh oh oh oh.", locale: "it_IT" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "volare" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 1 );
		expect( getSentenceBeginnings()[ 1 ].word ).toBe( "cantare" );
		expect( getSentenceBeginnings()[ 1 ].count ).toBe( 1 );
	} );

	it( "returns an object with sentence beginnings and counts for two sentences in Italian starting with the same word.", function() {
		changePaper( { text: "E che dici di stare lass??. E volavo, volavo felice pi?? in alto del sole ed ancora pi?? su.", locale: "it_IT" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "e" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 2 );
	} );

	it( "returns an object with sentence beginnings and counts for three sentences in Italian all starting with one of the exception words.", function() {
		changePaper( { text: "Una musica dolce. Una musica brutal. Una musica de cine.", locale: "it_IT" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "una musica" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 3 );
	} );

	it( "returns an object with sentence beginnings and counts for two sentences in Italian that start with a character with a diacritic.", function() {
		changePaper( { text: "?? freddo. ?? freddo.", locale: "it_IT" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "??" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 2 );
	} );

	it( "returns an object with sentence beginnings and counts for two sentences in Russian starting with the same word.", function() {
		changePaper( { text: "????????????????????, ??????! ????????????????????, ??????????????!", locale: "ru_RU" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "????????????????????" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 2 );
	} );

	it( "returns an object with sentence beginnings and counts for three sentences in Russian all starting with one of the exception words.", function() {
		changePaper( {
			text: "???????? ?????????????? ???? ????????????. ???????? ?????????????? ???? ??????????????????. ???????? ?????????????? ???????? ???? ????????????????????.",
			locale: "ru_RU",
		} );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "???????? ??????????????" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 3 );
	} );

	it( "returns an object with sentence beginnings and counts for two sentences in Russian starting with different words.", function() {
		changePaper( { text: "?????????? ?? ????????????. ?????? ?? ?????????? ?????????? ?? ?????????????", locale: "ru_RU" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "??????????" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 1 );
		expect( getSentenceBeginnings()[ 1 ].word ).toBe( "??????" );
		expect( getSentenceBeginnings()[ 1 ].count ).toBe( 1 );
	} );

	it( "returns an object with sentence beginnings and counts for two sentences in Polish starting with different words.", function() {
		changePaper( { text: "Najpierw zjem jab??ko. Potem zjem gruszk??. ", locale: "pl_PL" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "najpierw" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 1 );
		expect( getSentenceBeginnings()[ 1 ].word ).toBe( "potem" );
		expect( getSentenceBeginnings()[ 1 ].count ).toBe( 1 );
	} );

	it( "returns an object with sentence beginnings and counts for two sentences in Polish starting with the same word.", function() {
		changePaper( { text: "Zawsze ci?? widz??. Zawsze ci?? s??ysz??.", locale: "pl_PL" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "zawsze" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 2 );
	} );

	it( "returns an object with sentence beginnings and counts for three sentences in Polish all starting with one of the exception words.", function() {
		changePaper( { text: "To dziecko jest ??adne. To dziecko jest brzydkie. To dziecko jest ma??e.", locale: "pl_PL" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "to dziecko" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 3 );
	} );

	it( "returns an object with sentence beginnings and counts for three sentences in Polish that start with a character with a diacritic.", function() {
		changePaper( { text: "??ona mojego brata jest mi??a. ??ona mojej siostry jest pi??kna. ??ona moja jest najlepsza.", locale: "pl_PL" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "??ona" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 3 );
	} );

	it( "returns an object with sentence beginnings and counts for two sentences in Swedish starting with different words.", function() {
		changePaper( { text: "??r du os??ker, testa en kort frist??ende kurs hellre ??n ett program. Passar ??mnet dig kan du hoppa p?? ett program och tillgodor??kna dig kursen.", locale: "sv_SE" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "??r" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 1 );
		expect( getSentenceBeginnings()[ 1 ].word ).toBe( "passar" );
		expect( getSentenceBeginnings()[ 1 ].count ).toBe( 1 );
	} );

	it( "returns an object with sentence beginnings and counts for two sentences in Swedish starting with the same word.", function() {
		changePaper( { text: "Du ??r l??ng. Du ??r kort.", locale: "sv_SE" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "du" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 2 );
	} );

	it( "returns an object with sentence beginnings and counts for three sentences in Swedish all starting with one of the exception words.", function() {
		changePaper( { text: "Detta barn ??r litet. Detta barn ??r stort. Detta barn ??r lyckligt.", locale: "sv_SE" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "detta barn" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 3 );
	} );

	it( "returns an object with English sentence beginnings in lists", function() {
		changePaper( { text: "<ul><li>item 1</li><li>item 2</li><li>item 3</li><li>item 4</li></ul>" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "item", { locale: "en_US" } );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 4 );
	} );

	it( "returns an object with English sentence beginnings in tables", function() {
		changePaper( { text: "<table><td><tr>Sentence 1.</tr><tr>Sentence 2 that is longer.</tr><tr>Sentence 3 is shorter.</tr><tr>Sentence 4.</tr></td></table>" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "sentence", { locale: "en_US" } );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 4 );
	} );

	it( "returns an object with English sentence beginnings with paragraph tags - it should match over paragraphs", function() {
		changePaper( { text: "<p>Sentence 1. Sentence 2.</p><p>Sentence 3.</p>" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "sentence", { locale: "en_US" } );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 3 );
	} );

	it( "returns an object with English sentence beginnings in different capitalizations", function() {
		changePaper( { text: "Sentence 1. SENTENCE 2. Sentence 3." } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "sentence", { locale: "en_US" } );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 3 );
	} );

	it( "returns an empty string if only enters or whitespaces in a string", function() {
		changePaper( { text: "   \n</div>", locale: "en_US" } );
		expect( getSentenceBeginnings() ).toEqual( [] );
	} );

	it( "returns an empty array if there is no sentence", function() {
		changePaper( { text: "" } );
		expect( getSentenceBeginnings() ).toEqual( [] );
	} );

	it( "returns an empty array if there is a sentence with only whitespaces", function() {
		changePaper( { text: "&nbsp;", locale: "en_US" } );
		expect( getSentenceBeginnings() ).toEqual( [] );
	} );

	it( "returns an empty array if the sentence is empty after removing HTML tags.", function() {
		changePaper( { text: '<img class="alignnone wp-image-514079 size-full" src="https://yoast-mercury.s3.amazonaws.com/uploads/2015/10/Twitter_analytics_FI.png" alt="" width="1200" height="628" />' } );
		expect( getSentenceBeginnings() ).toEqual( [] );
	} );

	it( "returns matching sentences if there is an 'empty' sentence", function() {
		changePaper( { text: "\"A sentence with multiple terminators!\"). Test one. Test two. Test three." } );
		expect( getSentenceBeginnings() ).toContainEqual( { word: "test", count: 3, sentences: [ "Test one.", "Test two.", "Test three." ] } );
	} );

	it( "returns an object with three Spanish sentences starting with the same word when those words are preceded by different special characters in each sentence.", function() {
		changePaper( { text: "??Hola! ??Hola? (??Hola!)" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "hola", { locale: "es_ES" } );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 3 );
	} );

	it( "returns an object with sentence beginnings and counts for two sentences in English, when the sentences start with the same special character, but with different words.", function() {
		changePaper( { text: "(First sentence). (Second sentence).", locale: "en_US" } );
		expect( getSentenceBeginnings()[ 0 ].word ).toBe( "first" );
		expect( getSentenceBeginnings()[ 0 ].count ).toBe( 1 );
		expect( getSentenceBeginnings()[ 1 ].word ).toBe( "second" );
		expect( getSentenceBeginnings()[ 1 ].count ).toBe( 1 );
	} );
} );
