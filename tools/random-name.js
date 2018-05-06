const parsedNames = require('../batch/parse-names');

const HumanNames = [
  'Arabic',
  'Celtic',
  'Chinese',
  'Egyptian',
  'English',
  'French',
  'German',
  'Greek',
  'Indian',
  'Japanese',
  'Mesoamerican',
  'Niger-Congo',
  'Norse',
  'Polynesian',
  'Roman',
  'Slavic',
  'Spanish'
]

const race = process.argv[2].toLowerCase();
const gender = process.argv[3].toLowerCase();

function raceKey(race, gender) {
  function capitalize(string) {
    const byDash = string.split('-');
    const capitalized = byDash.map((name) => {
      return name.charAt(0).toUpperCase() + name.slice(1);
    });
    return capitalized.join('-');
  }
  
  return `${capitalize(race)}, ${capitalize(gender)}`
}

function getHumanNames(gender) {
  const allHumanNames = HumanNames.map((name) => getRaceNames(name, gender));
  return allHumanNames.reduce((allNames, cultureNames) => {
    return allNames.concat(cultureNames)
  }, []);
}

function getRaceNames(race, gender) {
  return parsedNames[raceKey(race, gender)];
}

function chooseRandomly(names) {
  const randomChoice = Math.floor(Math.random() * names.length);
  return names[randomChoice];
}

if (race === 'human') {
  console.log(chooseRandomly(getHumanNames(gender)));
} else {
  console.log(chooseRandomly(getRaceNames(race, gender)));
}