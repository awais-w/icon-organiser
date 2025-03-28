// Define the structure of the API response
interface Definition {
  definition: string;
  synonyms?: string[];
  antonyms?: string[];
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms?: string[];
  antonyms?: string[];
}

interface ApiResponse {
  word: string;
  meanings: Meaning[];
}

// Function to get synonyms
const getSynonyms = async (word: string): Promise<string[]> => {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data: ApiResponse[] = await response.json();

    // Check if the response contains the expected structure
    if (Array.isArray(data)) {
      const synonyms: string[] = [];

      // Iterate through all meanings
      data[0]?.meanings.forEach((meaning: Meaning) => {
        // Iterate through all definitions in each meaning
        meaning.definitions.forEach((definition: Definition) => {
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
      } else {
        console.log("No synonyms found for the word:", word);
        return [];
      }
    } else {
      console.log("Unexpected API response structure:", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching synonyms:", error);
    return [];
  }
};

export default getSynonyms;

/* Example usage */
// getSynonyms("happy").then((synonyms) => {
//   console.log("Synonyms for 'happy':", synonyms);
// });
