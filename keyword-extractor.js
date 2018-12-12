const rake = require('node-rake')
const keyword_extractor = require("keyword-extractor");

module.exports = (function() {
    const keywords = [];

    function storeKeyWords(paragraph, storage) {
        if (!storage) {
            var extraction_result = keyword_extractor.extract(paragraph, {
                language: "english",
                remove_digits: true,
                return_changed_case: true,
                remove_duplicates: true
            });
            return extraction_result
        }
        const keywords = keyword_extractor.extract(paragraph, {
            language: "english",
            remove_digits: true,
            return_changed_case: true,
            remove_duplicates: true
        });
        const list = storage.concat(keywords);
        return list;
    }

    return {
        storeKeyWords
    }
})()

// const myStopwords = ['for', 'the', 'a', 'stands', 'test', 'man', 'woman'];
// const opts = {
//     stopwords: myStopwords
// };



