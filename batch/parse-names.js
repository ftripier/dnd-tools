const fs = require('fs');
const cheerio = require('cheerio')

const nameHTML = fs.readFileSync('data/html/names.html');
const $ = cheerio.load(nameHTML)

const parsed = {};

const sections = $('h3');
const subsections = $('h4')

sections.each(function(index, element) {
  const sectionName = $(this).text();
  parsed[sectionName] = {};
  subsections.each(function(index, element) {
    const subsectionName = $(this).text();
    if (subsectionName.indexOf(sectionName) > -1) {
      const namesRows = $(this).next().find('tr');
      const names = namesRows.map(function(index, element) {
        const name = $(this).children().last();
        return name.text();
      }).toArray();
      parsed[subsectionName] = names.filter((name) => {
        return name != "Name";
      });
    }
  });
});

module.exports = parsed;
