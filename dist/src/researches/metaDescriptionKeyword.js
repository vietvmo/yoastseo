import matchWords from "../stringProcessing/matchTextWithArray";
import getSentences from "../stringProcessing/getSentences";

/**
 * Replaces found keyword forms in the given description.
 *
 * @param {string} description the description to remove the matched keyword forms from.
 * @param {Object[]} matchedKeywordForms the matched keyword forms to remove from the description.
 * @param {Number} maxToRemove the maximum amount of matches of each individual keyword to remove.
 * @returns {string} the description with the keywords removed.
 */
const replaceFoundKeywordForms = function (description, matchedKeywordForms, maxToRemove) {
	// Replace matches so we do not match them for synonyms.
	matchedKeywordForms.forEach(keywordForm => keywordForm.matches.slice(0, maxToRemove).forEach(match => {
		description = description.replace(match, "");
	}));
	return description;
};

/**
 * Counts the number of full keyphrase matches in the given sentence. Takes synonyms into account.
 *
 * A full keyphrase is when all keywords in the keyphrase match.
 *
 * @param {string} sentence the sentence that needs to be analyzed.
 * @param {Object} topicForms the keyphrase (and its optional synonyms') word forms.
 * @param {string} locale the current locale
 * @returns {Number} the number of matched keyphrases in the sentence.
 */
const matchPerSentence = function (sentence, topicForms, locale) {
	// Focus keyphrase matches.
	const matchesKeyphrase = topicForms.keyphraseForms.map(keywordForms => matchWords(sentence, keywordForms, locale));

	// Count the number of matches that contain every word in the entire keyphrase.
	const fullKeyphraseMatches = Math.min(...matchesKeyphrase.map(match => match.count));

	// Replace all full keyphrase matches so we do not match them for synonyms.
	sentence = replaceFoundKeywordForms(sentence, matchesKeyphrase, fullKeyphraseMatches);

	// Keyphrase synonyms matches.
	const fullSynonymsMatches = topicForms.synonymsForms.map(synonymForms => {
		// Synonym keyphrase matches.
		const matches = synonymForms.map(keywordForms => matchWords(sentence, keywordForms, locale));
		// Count the number of matches that contain every word in the entire synonym keyphrase.
		const fullSynonymMatches = Math.min(...matches.map(match => match.count));
		// Replace all full matches so we do not match them for other synonyms.
		sentence = replaceFoundKeywordForms(sentence, matchesKeyphrase, fullSynonymMatches);
		return fullSynonymMatches;
	});

	return [fullKeyphraseMatches, ...fullSynonymsMatches].reduce((sum, count) => sum + count, 0);
};

/**
 * Counts the number of full keyphrase matches in the description.
 * Returns -1 if no description is specified in the given paper.
 *
 * @param {Paper} paper The paper object containing the description.
 * @param {Researcher} researcher the researcher object to gather researchers from.
 * @returns {Number} The number of keyphrase matches for the entire description.
 */
export default function (paper, researcher) {
	const description = paper.getDescription();
	const locale = paper.getLocale();

	const topicForms = researcher.getResearch("morphology");

	const sentences = getSentences(description);

	const sentenceMatches = sentences.map(sentence => matchPerSentence(sentence, topicForms, locale));

	return sentenceMatches.reduce((sum, count) => sum + count, 0);
}
//# sourceMappingURL=metaDescriptionKeyword.js.map
