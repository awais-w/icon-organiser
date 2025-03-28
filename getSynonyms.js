var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Function to get synonyms
const getSynonyms = (word) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const response = yield fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = yield response.json();
        // Check if the response contains the expected structure
        if (Array.isArray(data)) {
            const synonyms = [];
            // Iterate through all meanings
            (_a = data[0]) === null || _a === void 0 ? void 0 : _a.meanings.forEach((meaning) => {
                // Iterate through all definitions in each meaning
                meaning.definitions.forEach((definition) => {
                    if (Array.isArray(definition.synonyms)) {
                        synonyms.push(...definition.synonyms); // Collect synonyms
                    }
                });
                // Collect synonyms directly under the meaning
                if (Array.isArray(meaning.synonyms)) {
                    synonyms.push(...meaning.synonyms);
                }
            });
            // Remove duplicates by converting to a Set and back to an array
            const uniqueSynonyms = [...new Set(synonyms)];
            if (uniqueSynonyms.length > 0) {
                return uniqueSynonyms;
            }
            else {
                console.log("No synonyms found for the word:", word);
                return [];
            }
        }
        else {
            console.log("Unexpected API response structure:", data);
            return [];
        }
    }
    catch (error) {
        console.error("Error fetching synonyms:", error);
        return [];
    }
});
export default getSynonyms;
/* Example usage */
// getSynonyms("happy").then((synonyms) => {
//   console.log("Synonyms for 'happy':", synonyms);
// });
