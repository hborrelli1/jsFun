const { kitties } = require('./datasets/kitties');
const { clubs } = require('./datasets/clubs');
const { mods } = require('./datasets/mods');
const { cakes } = require('./datasets/cakes');
const { classrooms } = require('./datasets/classrooms');
const { breweries } = require('./datasets/breweries');
const { nationalParks } = require('./datasets/nationalParks');
const { books } = require('./datasets/books');
const { weather } = require('./datasets/weather');
const { instructors, cohorts } = require('./datasets/turing');
const { bosses, sidekicks } = require('./datasets/bosses');
const { constellations, stars } = require('./datasets/astronomy');
const { weapons, characters } = require('./datasets/ultima');
const { dinosaurs, humans, movies } = require('./datasets/dinosaurs');






// SINGLE DATASETS
// =================================================================

// DATASET: kitties from ./datasets/kitties
const kittyPrompts = {
  orangeKittyNames() {

    // Return an array of just the names of kitties who are orange e.g.
    // ['Tiger', 'Snickers']

    const result = kitties.reduce((acc, kitty) => {
      kitty.color === 'orange' && acc.push(kitty.name);
      return acc;
    },[]);

    return result;

    // Annotation:
    // Since we are returning a value that is not the entire
    // object, but an array of the names of kitties that are
    // orange, we can use a reducer function to test if the
    // kitty is orange. If so we push it to the array that is
    // set as the initial value.
  },

  sortByAge() {
    // Sort the kitties by their age

    const result = kitties.sort((a, b) => b.age - a.age);
    return result;

    // Annotation:
    // Since the test is looking for kitties sorted by age
    // in descending order. we can take b.age - a.age.
    // In order to get results in ascending order, the body
    // of the function would be `a.age - b.age`;
  },

  growUp() {
    // Return an array of kitties who have all grown up by 2 years e.g.
    // [{
    //   name: 'Felicia',
    //   age: 4,
    //   color: 'grey'
    // },
    // {
    //   name: 'Tiger',
    //   age: 7,
    //   color: 'orange'
    // },
    // ...etc]

    kitties.forEach(kitty => kitty.age += 2);
    const result = kitties;
    return result;
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: clubs from ./datasets/clubs
const clubPrompts = {
  membersBelongingToClubs() {
    // Create an object whose keys are the names of people, and whose values are
    // arrays that include the names of the clubs that person is a part of. e.g.
    // {
    //   Louisa: ['Drama', 'Art'],
    //   Pam: ['Drama', 'Art', 'Chess'],
    //   ...etc
    // }

    // Loop through each object.
    // Create an empty array if name doesn't exist as key
    // If it does, just add the club name to array(value)

    const result = clubs.reduce((acc, club) => {
      club.members.forEach(member => {
        (!acc[member]) && (acc[member] = []);
        acc[member].push(club.club);
      });

      return acc;
    }, {});
    return result;

    // Annotation:
    // Since our return should be an object, we can use
    // reduce. Within each loop of club objects, we then
    // create a forEach loop on each member to create those
    // key values with an empty array if it does not already
    // exist. Then within our reduce iterator, we push the
    // the club name into the array.
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: mods from ./datasets/mods
const modPrompts = {
  studentsPerMod() {
    // Return an array of objects where the keys are mod (the number of the module)
    // and studentsPerInstructor (how many students per instructor there are for that mod) e.g.
    // [
    //   { mod: 1, studentsPerInstructor: 9 },
    //   { mod: 2, studentsPerInstructor: 11 },
    //   { mod: 3, studentsPerInstructor: 10 },
    //   { mod: 4, studentsPerInstructor: 8 }
    // ]

    const result = mods.reduce((acc, modInfo) => {
      let newMod = {};
      newMod.mod = modInfo.mod;
      newMod.studentsPerInstructor = (modInfo.students / modInfo.instructors);
      acc.push(newMod);
      return acc;
    }, []);
    return result;

    // Annotation:
    // Foreach object create a new object containing
    // an object with keys of mod Number and students per
    // instructor.
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: cakes from ./datasets/cakes
const cakePrompts = {
  stockPerCake() {
    // Return an array of objects that include just the flavor of the cake and how
    // much of that cake is in stock e.g.
    // [
    //    { flavor: 'dark chocolate', inStock: 15 },
    //    { flavor: 'yellow', inStock: 14 },
    //    ..etc
    // ]

    const result = cakes.reduce((acc, cakeInfo) => {
      let newCake = {};
      newCake.flavor = cakeInfo.cakeFlavor;
      newCake.inStock = cakeInfo.inStock;

      acc.push(newCake);
      return acc;
    }, []);
    return result;

    // Annotation:
    // Since we need a new array of objects with different
    // values, we can use reduce. We define a new object
    // that takes in the new properties and values, is
    // then pushed into our return array.
  },

  onlyInStock() {
    // Return an array of only the cakes that are in stock
    // e.g.
    // [
    //   {
    //   cakeFlavor: 'dark chocolate',
    //   filling: null,
    //   frosting: 'dark chocolate ganache',
    //   toppings: ['dutch process cocoa', 'toasted sugar', 'smoked sea salt'],
    //   inStock: 15
    // },
    // {
    //   cakeFlavor: 'yellow',
    //   filling: 'citrus glaze',
    //   frosting: 'chantilly cream',
    //   toppings: ['berries', 'edible flowers'],
    //   inStock: 14
    // },
    // ..etc
    // ]

    const result = cakes.filter(cake => cake.inStock > 0);
    return result;

    // Annotation:
    // We can just filter through the cakes to find which
    // ones have an inStock value greater than 0.
  },

  totalInventory() {
    // Return the total amount of cakes in stock e.g.
    // 59

    const result = cakes.reduce((acc, cake) => {
      acc += cake.inStock;

      return acc;
    },0);
    return result;

    // Annotation:
    // we can use reduce to create an intial value of 0 and
    // add the inStock value of each cake.
  },

  allToppings() {
    // Return an array of all unique toppings (no duplicates) needed to bake
    // every cake in the dataset e.g.
    // ['dutch process cocoa', 'toasted sugar', 'smoked sea salt', 'berries', ..etc]

    const result = cakes.reduce((acc, cake) => {
      cake.toppings.forEach(topping => {
        (!acc.includes(topping)) && acc.push(topping);
      });

      return acc;
    },[]);
    return result;

    // Annotation:
    // To return a new array of all toppings, we can use
    // reduce. Within each reducer iteration, we do a
    // for loop to add the topping if it does not already
    // exist in the reducer returned array.
  },

  groceryList() {
    // I need to make a grocery list. Please give me an object where the keys are
    // each topping, and the values are the amount of that topping I need to buy e.g.
    // {
    //    'dutch process cocoa': 1,
    //    'toasted sugar': 3,
    //    'smoked sea salt': 3,
    //    'berries': 2,
    //    ...etc
    // }

    const result = cakes.reduce((acc, cake) => {
      cake.toppings.forEach(topping => {
        (!acc[topping]) && (acc[topping] = 0);
        acc[topping] += 1;
      });

      return acc;
    }, {});
    return result;

    // Annotation:
    // We can use reduce to return a new object where each
    // topping becomes a key value if it does not already.
    // Then we add 1 to each instance of the topping.
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: classrooms from ./datasets/classrooms
const classPrompts = {
  feClassrooms() {
    // Create an array of just the front-end classrooms. e.g.
    // [
    //   { roomLetter: 'A', program: 'FE', capacity: 32 },
    //   { roomLetter: 'C', program: 'FE', capacity: 27 },
    //   { roomLetter: 'E', program: 'FE', capacity: 22 },
    //   { roomLetter: 'G', program: 'FE', capacity: 29 }
    // ]

    const result = classrooms.filter(room => {
      return room.program === 'FE';
    });
    return result;

    // Annotation:
    // We can use filter to return an array of only
    // classrooms in the 'FE' program.
  },

  totalCapacities() {
    // Create an object where the keys are 'feCapacity' and 'beCapacity',
    // and the values are the total capacity for all classrooms in each program e.g.
    // {
    //   feCapacity: 110,
    //   beCapacity: 96
    // }

    const result = classrooms.reduce((acc, room) => {
      (room.program === 'FE')
        ? acc.feCapacity += room.capacity
        : acc.beCapacity += room.capacity;

      return acc;
    }, { 'feCapacity': 0, 'beCapacity': 0 });
    return result;

    // Annotation:
    // We can use reduce to return a new array with the
    // 'feCapacity' and 'beCapacity' keys. As we iterate
    // through each classroom, we can add the capacity
    // to the correct key/value pair.
  },

  sortByCapacity() {
    // Return the array of classrooms sorted by their capacity (least capacity to greatest)

    const result = classrooms.sort((a, b) => a.capacity - b.capacity);
    return result;

    // Annotation:
    // We can use .sort() to sort the classrooms by capacity.
  }
};

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

// DATASET: books from './datasets/books

const bookPrompts = {
  removeViolence() {
    // return an array of all book titles that are not horror or true crime. Eg:

    //  ['1984', 'The Great Gatsby', 'Lord of the Flies', 'Harry Potter and the Sorcerer\'s Stone',
    //   'The Hitchhiker\'s Guide to the Galaxy', 'Flowers for Algernon', 'Slaughterhouse-Five',
    //   'The Handmaid\'s Tale', 'The Metamorphosis', 'Brave New World', 'Life of Pi',
    //   'The Curious Incident of the Dog in the Night - Time', 'The Bell Jar',
    //   'Catch-22', 'Treasure Island']


    const result = books.reduce((acc, book) => {
      if ((book.genre !== 'Horror') && (book.genre !== 'True Crime')) {
        acc.push(book.title);
      }

      return acc;
    },[]);
    return result;

    // Annotation:
    // We can use reduce to return a new array of just books,
    // as long as their genre is not 'Horror' or 'True Crime'.

  },
  getNewBooks() {
    // return an array of objects containing all books that were
    // published in the 90's and 00's. Inlucde the title and the year Eg:

    // [{ title: 'Harry Potter and the Sorcerer\'s Stone', year: 1997 },
    //  { title: 'Life of Pi', year: 2001 },
    //  { title: 'The Curious Incident of the Dog in the Night-Time', year: 2003 }]

    const result = books.reduce((acc, book) => {
      if ((book.published >= 1990) && (book.published <= 2009)) {
        let bookInRange = {};
        bookInRange.title = book.title;
        bookInRange.year = book.published;
        acc.push(bookInRange);
      }

      return acc;
    },[]);
    return result;

    // Annotation:
    // We can use .reduce() to return an array containing objects
    // with title and year properties that are between the year
    // 1989 and 2011
  }

};


// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

// DATASET: weather from './datasets/weather

const weatherPrompts = {
  getAverageTemps() {
    // return an array of all the average temperatures. Eg:
    // [ 40, 40, 44.5, 43.5, 57, 35, 65.5, 62, 14, 46.5 ]

    const result = weather.reduce((acc, location) => {
      acc.push((location.temperature.high + location.temperature.low) / 2);

      return acc;
    },[]);
    return result;

    // Annotation:
    // We can use .reduce() to return an array of the average
    // temps by adding and then dividing them by 2.
  },

  findSunnySpots() {
    // Return an array of sentences of the locations that are sunny
    // and mostly sunny. Include the location and weather type. Eg:
    // [ 'Atlanta, Georgia is sunny.',
    // 'New Orleans, Louisiana is sunny.',
    // 'Raleigh, North Carolina is mostly sunny.' ]

    const result = weather.reduce((acc, location) => {
      const sunny = location.type === 'sunny';
      const mostlySunny = location.type === 'mostly sunny';
      if (sunny || mostlySunny) {
        acc.push(`${location.location} is ${location.type}.`);
      }

      return acc;
    }, []);
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  findHighestHumidity() {
    // Return the location with the highest humidity. Eg:
    // {
    //   location: 'Portland, Oregon',
    //   type: 'cloudy',
    //   humidity: 84,
    //   temperature: { high: 49, low: 38 }
    // }

    const result = weather.sort((a, b) => {
      return b.humidity - a.humidity;
    })[0];
    return result;

    // Annotation:
    // To return the locaiton with the highest humidity we can
    // sort by humidity and than return the first object.

  }
};

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------


// DATASET: nationalParks from ./datasets/nationalParks

const nationalParksPrompts = {
  getParkVisitList() {
    /// Return an object containing the names of which parks I need to visit
    // and the ones I have already visited eg:
    // {
    //   parksToVisit: ["Yellowstone", "Glacier", "Everglades"],
    //   parksVisited: ["Rocky Mountain", "Acadia", "Zion"]
    //}

    const result = nationalParks.reduce((acc, park) => {
      park.visited
        ? acc.parksVisited.push(park.name)
        : acc.parksToVisit.push(park.name);

      return acc;
    }, {
      parksToVisit: [],
      parksVisited: []
    });
    return result;

    // Annotation:
    // We can use reduce() to loop through each park.
    // Our initial value is an object with parksTOVisit
    // and parksVisited properties with empty arrays as values.
    // If the park has been visited push to parksVisited array.
    // If not push to parksToVisit array.
  },

  getParkInEachState() {
    // Return an array of objects where the key is the state and the value is its National Park
    // eg: [ { Colorado: 'Rocky Mountain' },
    // { Wyoming: 'Yellowstone' },
    // { Montana: 'Glacier' },
    // { Maine: 'Acadia' },
    // { Utah: 'Zion' },
    // { Florida: 'Everglades' } ]


    const result = nationalParks.reduce((acc, park) => {
      let newObject = {};
      newObject[park.location] = park.name;
      acc.push(newObject);

      return acc;
    }, []);
    return result;

    // Annotation:
    // We can use reduce with an initial value of an empty array.
    // For each park, push a new object into the accumulator.
    // Return the results.
  },

  getParkActivities() {
    // Return an array of all the activities I can do
    // in a National Park. Make sure to exclude duplicates. eg:
    // [ 'hiking',
    //   'shoeshoing',
    //   'camping',
    //   'fishing',
    //   'boating',
    //   'watching wildlife',
    //   'cross-country skiing',
    //   'swimming',
    //   'bird watching',
    //   'canyoneering',
    //   'backpacking',
    //   'rock climbing' ]

    const result = nationalParks.reduce((acc, park) => {
      park.activities.forEach(activity => {
        !acc.includes(activity) && acc.push(activity);
      });

      return acc;
    }, []);
    return result;

    // Annotation:
    // We can loop through each park. Within that loop,
    // We can loop through each activity.
    // If the accumulator does not include the activity,
    // then push the activity to the accumulator. Return results.
  }
};



// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: breweries from ./datasets/breweries
const breweryPrompts = {
  getBeerCount() {
    // Return the total beer count of all beers for every brewery e.g.
    // 40

    const result = breweries.reduce((beerCount, brewery) => {
      beerCount += brewery.beers.length;

      return beerCount;
    }, 0);
    return result;

    // Annotation:
    // We can loop through each brewery with reduce.
    // Then add the length of the beers array to the accumulator.
    // Return the results.
  },

  getBreweryBeerCount() {
    // Return an array of objects where each object has the name of a brewery
    // and the count of the beers that brewery has e.g.
    // [
    //  { name: 'Little Machine Brew', beerCount: 12 },
    //  { name: 'Ratio Beerworks', beerCount: 5},
    // ...etc.
    // ]

    const result = breweries.map(brewery => {
      let mapObj = {};
      mapObj.name = brewery.name;
      mapObj.beerCount = brewery.beers.length;
      return mapObj;
    });
    return result;

    // Annotation:
    // We can use map to loop through arrays, since we are
    // returning the same number of objects.
    // Within each iteration we can declare a new empty object.
    // THen set the values of the berwery in each iteration and
    // return the new object.
  },

  findHighestAbvBeer() {
    // Return the beer which has the highest ABV of all beers
    // e.g.
    // { name: 'Barrel Aged Nature\'s Sweater', type: 'Barley Wine', abv: 10.9, ibu: 40 }
    let allBeers = [];

    breweries.forEach(brewery => {
      return brewery.beers.forEach(beer => {
        allBeers.push(beer);
      });
    });

    result = allBeers.sort((a, b) => {
      return b.abv - a.abv;
    })[0];

    return result;

    // Annotation:
    // First we can grab all the beers and put them into an array.
    // Then we can sort them by ABV level and return the first one.
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DOUBLE DATASETS
// =================================================================

// DATASET: instructors, cohorts from ./datasets/turing
const turingPrompts = {
  studentsForEachInstructor() {
    // Return an array of instructors where each instructor is an object
    // with a name and the count of students in their module. e.g.
    // [
    //  { name: 'Pam', studentCount: 21 },
    //  { name: 'Robbie', studentCount: 18 }
    // ]

    const result = instructors.reduce((acc, instructor) => {
      let instructorToAdd = {};
      instructorToAdd.name = instructor.name;
      instructorToAdd.studentCount = cohorts.find(cohort => {
        return cohort.module === instructor.module;
      }).studentCount;

      acc.push(instructorToAdd);

      return acc;
    }, []);
    return result;

    // Annotation:
    // We can iterate through instructors using .reduce().
    // For each instructor we can create a new instructor object.
    // We set their name to their name value and then,
    // we can set the studentCount property to the value of a find
    // result that targets the found instructors studentCount.
  },

  studentsPerInstructor() {
    // Return an object of how many students per teacher there are in each cohort e.g.
    // {
    // cohort1806: 9,
    // cohort1804: 10.5
    // }

    const result = cohorts.reduce((acc, cohort) => {
      let instructorCount = instructors.filter(instructor => instructor.module === cohort.module).length;
      acc[`cohort${cohort.cohort}`] = cohort.studentCount / instructorCount;
      return acc;
    }, {});
    return result;

    // Annotation:
    // We can loop through each cohort. For each iteration
    // we can filter instructs by cohort module and get the
    // length. We can set a new property on our return value
    // from reduce to be an the cohort interpolated as
    // the property. We can set the value to
    // cohort.studentCount / instructorCount.
  },

  modulesPerTeacher() {
    // Return an object where each key is an instructor name and each value is
    // an array of the modules they can teach based on their skills. e.g.:
    // {
    //     Pam: [2, 4],
    //     Brittany: [2, 4],
    //     Nathaniel: [2, 4],
    //     Robbie: [4],
    //     Leta: [2, 4],
    //     Travis: [1, 2, 3, 4],
    //     Louisa: [1, 2, 3, 4],
    //     Christie: [1, 2, 3, 4],
    //     Will: [1, 2, 3, 4]
    //   }

    // loop through all instructors
    // forEach instruct.teaches, loop through each cohort.
    // If cohort.curriculum contains instructor.teaches.i
    // push cohort.module

    const result = instructors.reduce((acc, instructor) => {
      acc[instructor.name] = cohorts.reduce((acc2, cohort) => {
        cohort.curriculum.forEach(course => {
          if (instructor.teaches.includes(course) && !acc2.includes(cohort.module)) {
            acc2.push(cohort.module);
          }
        });
        return acc2;
      }, []);

      return acc;
    },{});
    return result;

    // Annotation:
    // In order to
  },

  curriculumPerTeacher() {
    // Return an object where each key is a curriculum topic and each value is
    // an array of instructors who teach that topic e.g.:
    // {
    //   html: [ 'Travis', 'Louisa' ],
    //   css: [ 'Travis', 'Louisa' ],
    //   javascript: [ 'Travis', 'Louisa', 'Christie', 'Will' ],
    //   recursion: [ 'Pam', 'Leta' ]
    // }

    const result = cohorts.reduce((curriculum, cohort) => {
      cohort.curriculum.forEach(topic => {
        if (!curriculum[topic]) {
          curriculum[topic] = instructors.reduce((names, instructor) => {
            (instructor.teaches.includes(topic)) && (names.push(instructor.name));

            return names;
          },[]);
        }
      });
      return curriculum;
    }, {});
    return result;

    // Annotation:
    // To get the desired results, we can use a reduce() method
    // to create a an object where the properties are the topics.
    // The first if statement only adds it if the topic is not already
    // a property. The value is set the results of another reduce() where it
    // pushes the instructor name, if the course property is included in
    // the instructors teaches array.
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: bosses, sidekicks from ./datasets/bosses
const bossPrompts = {
  bossLoyalty() {
    // Create an array of objects that each have the name of the boss and the sum
    // loyalty of all their sidekicks. e.g.:
    // [
    //   { bossName: 'Jafar', sidekickLoyalty: 3 },
    //   { bossName: 'Ursula', sidekickLoyalty: 20 },
    //   { bossName: 'Scar', sidekickLoyalty: 16 }
    // ]

    // LOop through each boss by key.
    // Create bossName and boss name as key value.
    // Loop through each bosses sidekicks.
    // Find loyalty of sidekick in sidekicks array.
    // Add all of bosses sidekicks loyalties value.
    // Place loyalty values as sideKickloyalty in og object.

    let bossNames = Object.keys(bosses);

    const result = bossNames.reduce((bossLoyalty, boss) => {
      boss = boss.charAt(0).toUpperCase() + boss.slice(1);

      let bossAttributes = {bossName: '', sidekickLoyalty: 0};
      bossAttributes.bossName = boss;

      bossAttributes.sidekickLoyalty = sidekicks.reduce((loyalty, sidekick) => {
        (sidekick.boss === boss) && (loyalty += sidekick.loyaltyToBoss);
        return loyalty;
      },0);
      bossLoyalty.push(bossAttributes);

      return bossLoyalty;
    },[]);

    return result;

    // Annotation:
    // Grab the keys of each Boss. Run .reduce() fn on boss names. Set an object
    // to hold values of bossname and sidekick loyalty. The value of sidekickLoyalty
    // Is another reduce function that loops through all sidekicks. If the
    // sidekick boss name is equal to the boss at hand, add the loyaltyToBoss
    // attributes. That value gets assigned to the sideKickloyalty property.
    // Then we push the new objects into our original reduce array.
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: constellations, stars } from ./datasets/astronomy
const astronomyPrompts = {
  starsInConstellations() {
    // Return an array of all the stars that appear in any of the constellations
    // listed in the constellations object e.g.
    // [
    //   { name: 'Rigel',
    //     visualMagnitude: 0.13,
    //     constellation: 'Orion',
    //     lightYearsFromEarth: 860,
    //     color: 'blue' },
    //   { name: 'Betelgeuse',
    //     visualMagnitude: 0.5,
    //     constellation: 'Orion',
    //     lightYearsFromEarth: 640,
    //     color: 'red' }
    // ]

    // Save constellatin keys.
    // for each constellation, run a loop.
    // and foreach star, run a test. If stars array contains a star with the name
    // equal to the star at hand, push star object into allStars array.

    let constellationKeys = Object.keys(constellations);

    const result = constellationKeys.reduce((allStars, star) => {
      foundStars.push()
      return foundStars;
    }, []);

    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  starsByColor() {
    // Return an object with keys of the different colors of the stars,
    // whose values are arrays containing the star objects that match e.g.
    // {
    //   blue: [{obj}, {obj}, {obj}, {obj}, {obj}],
    //   white: [{obj}, {obj}],
    //   yellow: [{obj}, {obj}],
    //   orange: [{obj}],
    //   red: [{obj}]
    // }

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  constellationsStarsExistIn() {
    // Return an array of the names of the constellations that the brightest stars are part of e.g.

    //  [ "Canis Major",
    //    "Carina",
    //    "Boötes",
    //    "Auriga",
    //    "Orion",
    //    "Lyra",
    //    "Canis Minor",
    //    "The Plow",
    //    "Orion",
    //    "The Little Dipper" ]


    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: charaters, weapons from ./datasets/ultima
const ultimaPrompts = {
  totalDamage() {

    // Return the sum of the amount of damage for all the weapons that our characters can use
    // Answer => 113

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  charactersByTotal() {

    // Return the sum damage and total range for each character as an object.
    // ex: [ { Avatar: { damage: 27, range: 24 }, { Iolo: {...}, ...}

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: dinosaurs, humans, movies from ./datasets/dinosaurs
const dinosaurPrompts = {
  countAwesomeDinosaurs() {
    // Return an object where each key is a movie title and each value is the
    // number of awesome dinosaurs in that movie. e.g.:
    // {
    //   'Jurassic Park': 5,
    //   'The Lost World: Jurassic Park': 8,
    //   'Jurassic Park III': 9,
    //   'Jurassic World': 11,
    //   'Jurassic World: Fallen Kingdom': 18
    // }

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  averageAgePerMovie() {
    /* Return an object where each key is a movie director's name and each value is
        an object whose key is a movie's title and whose value is the average age
        of the cast on the release year of that movie.
      e.g.:
      {
        'Steven Spielberg':
          {
            'Jurassic Park': 34,
            'The Lost World: Jurassic Park': 37
          },
        'Joe Johnston':
          {
            'Jurassic Park III': 44
          },
        'Colin Trevorrow':
          {
            'Jurassic World': 56
           },
        'J. A. Bayona':
          {
            'Jurassic World: Fallen Kingdom': 59
          }
      }
    */

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  uncastActors() {
    /*
    Return an array of objects that contain the names of humans who have not been cast in a Jurassic Park movie (yet), their nationality, and their imdbStarMeterRating. The object in the array should be sorted alphabetically by nationality.

    e.g.
      [{
        name: 'Justin Duncan',
        nationality: 'Alien',
        imdbStarMeterRating: 0
      },
      {
        name: 'Karin Ohman',
        nationality: 'Chinese',
        imdbStarMeterRating: 0
      },
      {
        name: 'Tom Wilhoit',
        nationality: 'Kiwi',
        imdbStarMeterRating: 1
      }, {
        name: 'Jeo D',
        nationality: 'Martian',
        imdbStarMeterRating: 0
      }]
    */

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  actorsAgesInMovies() {
    /*
    Return an array of objects for each human and the age(s) they were in the movie(s) they were cast in, as an array of age(s). Only include humans who were cast in at least one movie.

    e.g.
    [ { name: 'Sam Neill', ages: [ 46, 54 ] },
      { name: 'Laura Dern', ages: [ 26, 34 ] },
      { name: 'Jeff Goldblum', ages: [ 41, 45, 63, 66 ] },
      { name: 'Richard Attenborough', ages: [ 70, 74, 92, 95 ] },
      { name: 'Ariana Richards', ages: [ 14, 18 ] },
      { name: 'Joseph Mazello', ages: [ 10, 14 ] },
      { name: 'BD Wong', ages: [ 33, 55, 58 ] },
      { name: 'Chris Pratt', ages: [ 36, 39 ] },
      { name: 'Bryce Dallas Howard', ages: [ 34, 37 ] } ]
    */

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  }
};

module.exports = {
  breweryPrompts,
  turingPrompts,
  clubPrompts,
  bossPrompts,
  classPrompts,
  modPrompts,
  kittyPrompts,
  cakePrompts,
  astronomyPrompts,
  ultimaPrompts,
  nationalParksPrompts,
  weatherPrompts,
  bookPrompts,
  dinosaurPrompts
};
