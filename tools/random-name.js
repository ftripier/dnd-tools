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

const BarbarianFirst = [
  'Moon',
  'Willow',
  'Vine',
  'Bluff',
  'Thunder',
  'Rock',
  'Crow',
  'Gold',
  'Iron',
  'Root',
  'Mountain',
  'Dragon',
  'Giant',
  'Wood',
  'Snow',
  'Ice',
  'Wilted',
  'Ox',
  'Bear',
  'Wolf',
  'Mammoth',
  'Tiger',
  'Dungeon',
  'Raging',
  'Dancing',
  'Twisting',
  'Singing',
  'Eternal'
]

const BarbarianGenericLast = [
  'Bough',
  'Waker',
  'Rider',
  'Hunter',
  'Crest',
  'Farmer',
  'Singer',
  'Whisper',
  'Scream',
  'Walker',
  'Spring',
  'Winter',
  'Summer',
  'Fall',
  'Brook',
  'River',
  'Ocean',
  'Tundra',
  'Plain',
  'Elk',
  'Bear',
  'Talent',
  'Roar',
  'Fight'
];

const BarbarianMaleLast = BarbarianGenericLast.concat([
  'King',
  'Father'
]);

const BarbarianFemaleLast = BarbarianGenericLast.concat([
  'Queen',
  'Mother'
]);

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

function generateBarbarianName(gender) {
  const firstName = chooseRandomly(BarbarianFirst);
  let lastName;
  if (gender === 'female') {
    lastName = chooseRandomly(BarbarianFemaleLast);
  } else if (gender === 'male') {
    lastName = chooseRandomly(BarbarianMaleLast);
  } else {
    lastName = chooseRandomly(BarbarianGenericLast);
  }

  return firstName + ' ' + lastName;
}

function pickName() {
  switch (race) {
    case 'human':
      return chooseRandomly(getHumanNames(gender));
    case 'barbarian':
      return generateBarbarianName(gender);
    default:
      return chooseRandomly(getRaceNames(race, gender));
  }
}

console.log(pickName());