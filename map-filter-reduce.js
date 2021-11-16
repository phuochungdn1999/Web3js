const array = [1, 2, 3, 4, 5];

const myArrayTime = array.map((value, index, array) => {
  //array : original array
  return value % 2;
});
// console.log(myArrayTime)
const songs = [
  { id: 1, name: "hello 1", artist: "hung 1", name1: "hello 2" },
  { id: 2, name: "hello 2", artist: "hung 2", name1: "hello 3" },
  { id: 3, name: "hello 3", artist: "hung 3", name1: "hello 4" },
  { id: 4, name: "hello 4", artist: "hung 4", name1: "hello 5" },
  { id: 5, name: "hello 5", artist: "hung 5", name1: "hello 6" },
];

const newSong = songs.map((song) => {
  const { artist, id, ...rest } = song;
  // console.log(artist)
  // console.log(id)
  // console.log(rest)
  return {
    ...rest,
    scrobbleCount: 0,
    spotifyUrl: "New Spotify",
  };
});

// console.log(newSong)

const myArray = [1, 2, 3, 4, 5, 6, 7];

const myNewArray = myArray.filter((value, index, array) => {
  return value % 2 === 0;
});
// console.log(myNewArray)

let kvArray = [
  { key: 1, value: 10 },
  { key: 2, value: 20 },
  { key: 3, value: 30 },
];

let reformattedArray = kvArray.map((obj) => {
  let rObj = {};
  // console.log( obj.key)
  rObj[obj.key] = obj.value;
  // console.log( rObj)
  return rObj;
});

// console.log(reformattedArray)

const ob1 = {
  name:"123123",
  okela:"456456"
}

function dump_props(obj, obj_name) {
  let result = '';
  for (let i in obj) {
    result += obj_name + '.' + i + ' = ' + obj[i] + '<br>';
  }
  result += '<hr>';
  return result;
}

// console.log(dump_props(ob1,"123123"))

arr = [1, 2, 5];
arr.every( (elem, index, arr) => {
  arr.push('new')
  // console.log(`[${arr}][${index}] -> ${elem}`)
  return elem < 4
})

// array-like object with random key ordering
const anObj = { 100: 'a', 2: 'b', 7: 'c' };
const key = Object.keys(anObj)[0];
// console.log(anObj[key])

var a = [{a:1}, {b:2},{c:3}];
var iterator = a.entries();

for (let [index,value] of iterator) {
  // console.log(index);
  // console.log(value);

}

function isBigEnough(value) {
  return value >= 10
}

let filtered = [12, 5, 8, 130, 44].filter(isBigEnough)
// console.log(filtered)
function isPrime(element, index, array) {
  let start = 2;
  while (start <= Math.sqrt(element)) {
    if (element % start++ < 1) {
      return false;
    }
  }
  return element > 1;
}

// console.log(!([4, 6, 8, 12].find(isPrime))===true);

// console.log([4, 5, 8, 12].find(isPrime)); // 5

const array1 = [0,1,,,,5,6];
array1.find(function(value, index) {
  // console.log('Visited index ', index, ' with value ', value);
});
array1.find(function(value, index) {
  // Delete element 5 on first iteration
  if (index === 0) {
    // console.log('Deleting array[5] with value ', array[5]);
    delete array1[5];
  }
  // Element 5 is still visited even though deleted
  // console.log('Visited index ', index, ' with value ', value);
});

// console.log([4, 6, 8, 9, 12].findIndex(isPrime))
// console.log([4, 6, 7, 9, 12].findIndex(isPrime))

const fruits = ["apple", "banana", "cantaloupe", "blueberries", "grapefruit"];

const index = fruits.findIndex(fruit => fruit === "cantaloupe");

// console.log(index); // 3
// console.log(fruits[index]);

function copy(obj) {
  const copy = Object.create(Object.getPrototypeOf(obj))
  // console.log(Object.getPrototypeOf(obj))
  // console.log(copy)
  const propNames = Object.getOwnPropertyNames(obj)
  // console.log(propNames)
  propNames.forEach(function(name) {
    // console.log(name)
    const desc = Object.getOwnPropertyDescriptor(obj, name)
    // console.log(desc)
    Object.defineProperty(copy, name, desc)
    // console.log(copy)
  })

  return copy
}

const obj1 = { a: 1, b: 2 }
const obj2 = copy(obj1)
// console.log(obj1)
// console.log(obj2)

var arr = ['a', , 'c'];
var sparseKeys = Object.keys(arr);
var denseKeys = [...arr.keys()];
// console.log(sparseKeys); // ['0', '2']
// console.log(denseKeys);
sparseKeys.forEach((element,index) => {
  // console.log(arr[element])
});

const target1 = Object.defineProperty({}, 'foo', {
  value: 1,
  writable: false
}); // target.foo is a read-only property
// console.log(target1.foo)

Object.assign(target1, { bar: 2 }, { foo2: 3, foo1: 3, foo3: 3 }, { baz: 4 });
// TypeError: "foo" is read-only
// The Exception is thrown when assigning target.foo
// console.log(target1)
// console.log(target1.bar);  // 2, the first source was copied successfully.
// console.log(target1.foo2); // 3, the first property of the second source was copied successfully.
// console.log(target1.foo);  // 1, exception is thrown here.
// console.log(target1.foo3); // undefined, assign method has finished, foo3 will not be copied.
// console.log(target1.baz);

function resolveLater(resolve, reject) {
  setTimeout(function() {
    resolve(10);
  }, 10000);
}
function rejectLater(resolve, reject) {
  setTimeout(function() {
    reject(new Error('Error'));
  }, 10000);
}

// var p1 = Promise.resolve('foo');
// var p2 = p1.then(function(a) {
//   // Return promise here, that will be resolved to 10 after 1 second
//   return new Promise(resolveLater);
// });
// p2.then(function(v) {
//   console.log('resolved', v);  // "resolved", 10
// }, function(e) {
//   // not called
//   console.error('rejected', e);
// });

// var p3 = p1.then(function() {
//   // Return promise here, that will be rejected with 'Error' after 1 second
//   return new Promise(rejectLater);
// });
// p3.then(function(v) {
//   // not called
//   console.log('resolved', v);
// }, function(e) {
//   console.error('rejected', e); // "rejected", 'Error'
// });


function checkMail() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve('Mail has arrived');
    } else {
      reject(new Error('Failed to arrive'));
    }
  });
}

// checkMail()
//   .then((mail) => {
//     console.log(mail);
//   })
//   .catch((err) => {
//     console.error(err);
//   })
//   .finally(() => {
//     console.log('Experiment completed');
//   });

const THRESHOLD_A = 8; // can use zero 0 to guarantee error

function tetheredGetNumber(resolve, reject) {
  try {
    setTimeout(
      function() {
        const randomInt = Date.now();
        const value = randomInt % 10;
        try {
          if(value >= THRESHOLD_A) {
            throw new Error(`Too large: ${value}`);
          }
        } catch(msg) {
          console.log(`err`, msg)
            reject(`Error in callback ${msg}`);
        }
      resolve(value);
      return;
    }, 500);
    // To experiment with error at set-up, uncomment the following 'throw'.
    // throw new Error("Bad setup");
  } catch(err) {
    reject(`Error during setup: ${err}`);
  }
  return;
}

function determineParity(value) {
  const isOdd = value % 2 ? true : false ;
  const parityInfo = { theNumber: value, isOdd: isOdd };
  console.log("123123")
  return parityInfo;
}

function troubleWithGetNumber(reason) {
  console.log("45646")
  console.error(`Trouble getting number: ${reason}`);
  throw -999; // must "throw" something, to maintain error state down the chain
}

function promiseGetWord(parityInfo) {
  // The "tetheredGetWord()" function gets "parityInfo" as closure variable.
  const tetheredGetWord = function(resolve,reject) {
    const theNumber = parityInfo.theNumber;
    const threshold_B = THRESHOLD_A - 1;
    if(theNumber >= threshold_B) {
      reject(`Still too large: ${theNumber}`);
    } else {
      parityInfo.wordEvenOdd = parityInfo.isOdd ? 'odd' : 'even';
      resolve(parityInfo);
    }
    return;
  }
  return new Promise(tetheredGetWord);
}

(new Promise(tetheredGetNumber))
  .then(determineParity,troubleWithGetNumber)
  .then(promiseGetWord)
  .then((info) => {
    console.log("Got: ",info.theNumber," , ", info.wordEvenOdd);
    return info;
  })
  .catch((reason) => {
    if(reason === -999) {
      console.error("Had previously handled error");
    }
    else {
      console.error(`Trouble with promiseGetWord(): ${reason}`);
    }
   })
  .finally((info) => console.log("All done"));