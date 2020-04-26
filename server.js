const cheerio = require("cheerio");
const axios = require("axios");

// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
            "fishing. . ." + 
            "\n***********************************\n");

// Making a request via axios for reddit's "webdev" board. We are sure to use old.reddit due to changes in HTML structure for the new reddit. The page's Response is passed as our promise argument.
axios.get("https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)").then(response => {

  // Load the Response into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  const $ = cheerio.load(response.data);

  const results = [];
  
  
  // iterate over each table row
  $("table .sortable").each((i, row) => {
      const name = $("td:nth-child(1) > a").attr("title");
      const image = $("td:nth-child(2) > a").attr("href");
      const price = $("td:nth-child(3)").text();
      const location = $("td:nth-child(4)").text();
      
      const collectible = `
        <div class="collectible">
            <img src="${image}">
            <h6 class="name">Name: ${name}</h6>
            <p class="price">Price: ${price}</p>
            <p class="location">Location: ${location}</p>
        </div>`

        // Save results in an object
        results.push({
            collectible
        // name,
        // image,
        // price
        });
    });

    // Log the results once you've looped through each of the elements found with cheerio
    console.log(results);
});
