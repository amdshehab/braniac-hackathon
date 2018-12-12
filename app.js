const express = require("express");
const csv = require("csv-parser");
const fs = require("fs");
const app = express();
var cors = require('cors')
app.use(cors())
const port = 3000;
const keyWordExtractor = require("./keyword-extractor");

(async () => {
    let headingKeyWordList = [];
    let bodyKeyWords = [];
    // const testText = "LDA stands for Latent Dirichlet Allocation";

    const articlesList = [];

    function createArticles() {
        return new Promise((res, rej) => {
            fs.createReadStream( //*your csv here*// )
                .pipe(csv())
                .on("data", function (data) {
                    // console.log(data);
                    articlesList.push(data);
                })
                .on("end", function (data) {
                    res();
                });
        });
    }

    await createArticles();

    const sortedList = articlesList
        .sort((a, b) => b.Views - a.Views)
        .slice(0, 100);

    function populateEngine() {
        for (let article of sortedList) {
            // console.log(article.Title);
            try {
                headingKeyWordList = keyWordExtractor.storeKeyWords(
                    article.Title,
                    headingKeyWordList
                );
                //perform the operation
            } catch (err) {
                // lol do nothing
            }
        }
    }

    populateEngine();

    const keyWords = headingKeyWordList.join(', ');

    const recommendedKeyWords = keyWordExtractor.storeKeyWords(keyWords)
    console.log(recommendedKeyWords.slice(0, 20).sort())
    
    app.get("/", (req, res) => res.send(headingKeyWordList));
    app.post("/get-headline-keywords", (req, res) => {
        res.send(recommendedKeyWords.slice(0, 20).sort());
    });
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
})();